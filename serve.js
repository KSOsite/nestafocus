// Local static server for NestaFocus.

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8081;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const COMPRESSIBLE_EXTENSIONS = new Set([
  '.html', '.js', '.mjs', '.css', '.json', '.svg', '.txt', '.webmanifest', '.map',
]);

function acceptsGzip(header = '') {
  return header.split(',').some((encoding) => {
    const [name, ...parameters] = encoding.trim().toLowerCase().split(';');
    if (name !== 'gzip') return false;
    const quality = parameters.find((parameter) => parameter.trim().startsWith('q='));
    return !quality || Number(quality.trim().slice(2)) > 0;
  });
}

function sendFile(req, res, filePath, stats) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  const range = req.headers.range;
  if (range && (ext === '.mp3' || ext === '.mp4')) {
    const size = stats.size;
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : size - 1;

    if (start >= size || isNaN(start)) {
      res.writeHead(416, { 'Content-Range': `bytes */${size}` });
      res.end();
      return;
    }

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': contentType,
    });
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(filePath, { start, end }).pipe(res);
    return;
  }

  const hashedFilename = /(?:^|[.-])[a-f0-9]{8,}(?:[.-]|$)/i.test(path.basename(filePath));
  const headers = {
    'Content-Type': contentType,
    'Accept-Ranges': 'bytes',
    'Cache-Control': hashedFilename ? 'public, max-age=31536000, immutable' : 'no-cache',
  };
  const isCompressible = COMPRESSIBLE_EXTENSIONS.has(ext);
  if (isCompressible) headers.Vary = 'Accept-Encoding';
  const shouldCompress = stats.size >= 1024 && isCompressible &&
    acceptsGzip(req.headers['accept-encoding']);

  if (shouldCompress) {
    headers['Content-Encoding'] = 'gzip';
    res.writeHead(200, headers);
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
    return;
  }

  headers['Content-Length'] = stats.size;
  res.writeHead(200, headers);
  if (req.method === 'HEAD') res.end();
  else fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.resolve(ROOT, `.${urlPath}`);
  if (!filePath.startsWith(`${ROOT}${path.sep}`) && filePath !== ROOT) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (['GET', 'HEAD'].includes(req.method) &&
          /^\/(?:app\/)?(?:home|focus|ambient|settings)\/?$/i.test(urlPath)) {
        const indexPath = path.join(ROOT, 'index.html');
        fs.stat(indexPath, (indexErr, indexStats) => {
          if (indexErr || !indexStats.isFile()) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Unable to serve index.html');
            return;
          }
          sendFile(req, res, indexPath, indexStats);
        });
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + urlPath);
      return;
    }
    sendFile(req, res, filePath, stats);
  });
});

server.listen(PORT, () => {
  console.log(`NestaFocus running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${ROOT}`);
});
