(() => {
  'use strict';

  const STATE_KEY = 'nestafocus_soundroom_v1';
  const PRESETS_KEY = 'nestafocus_soundroom_presets_v1';
  const FAVORITES_KEY = 'nestafocus_soundroom_favorites_v1';
  const MAX_ACTIVE = 5;
  const SOUND_ID_ALIASES = { cc0_cafe: 'cafe' };
  const CATEGORY_NAMES = {
    Nature: 'Nature',
    Weather: 'Météo',
    Interior: 'Intérieur',
    Lifestyle: 'Vie quotidienne',
    Focus: 'Concentration',
    Niche: 'Autres',
  };
  const PLAYLISTS = [
    ['Lofi', '4Zjli1P13J5mmSCD5iKAXK'],
    ['Rainy Day Lofi', '0owPbYZr8bqzFfpzLmP8UV'],
    ['Paris Café', '0VvruOaNjMu1B57ZefMf7B'],
    ['Focus Picks', '4wTxU32MgaTXDz1JlcH08C'],
    ['Piano relaxant', '1IE734A2agfLVvkOcL02Al'],
    ['Jazzhop', '2kzTQa3FcDDlJhhITcIBpX'],
  ];
  const CC0_SOUNDS = [
    { id: 'cc0_rain_indoor', name: 'Rain from Indoors', title: 'Rain from Indoors', creator: 'samesamesame', source: 'https://freesound.org/people/samesamesame/sounds/242889', src: 'resources/sounds/cc0/rain-indoor.mp3', tags: ['Weather'] },
    { id: 'cc0_short_rain', name: 'Short Rain Loop', title: 'Short Rain Loop', creator: 'dmk67', source: 'https://freesound.org/people/dmk67/sounds/392980', src: 'resources/sounds/cc0/short-rain.mp3', tags: ['Weather'] },
    { id: 'cc0_ocean_waves', name: 'Ocean Waves', title: 'Ocean waves', creator: 'Rmutt', source: 'https://freesound.org/people/Rmutt/sounds/148283', src: 'resources/sounds/cc0/ocean-waves.mp3', tags: ['Nature'] },
    { id: 'cc0_fireplace', name: 'Fireplace Crackles', title: 'Fireplace Crackles', creator: 'WavJunction.com', source: 'https://freesound.org/people/WavJunction.com/sounds/512685', src: 'resources/sounds/cc0/fireplace.mp3', tags: ['Interior'] },
    { id: 'cafe', name: 'Bustling Café', title: 'People talking at cafe', creator: 'priesjensen', source: 'https://freesound.org/people/priesjensen/sounds/482990', src: 'resources/sounds/cc0/cafe.mp3', tags: ['Lifestyle'] },
    { id: 'AirplaneCabin', name: 'Airplane Cabin', title: 'Airliner, Jet, Interior Ambience, Idle in flight', creator: 'Kinoton', source: 'https://freesound.org/people/Kinoton/sounds/438972', src: 'resources/sounds/cc0/airplane-cabin.mp3', tags: ['Lifestyle'] },
    { id: 'ExamHall', name: 'Exam Hall', title: 'Murmur of kids entering a classroom with footsteps', creator: 'SSE Library', source: 'https://archive.org/details/SSE_Library_AMBIENCE', src: 'resources/sounds/cc0/classroom-ambience.mp3', tags: ['Interior'] },
    { id: 'cc0_countryside', name: 'Countryside', title: 'Countryside', creator: 'brunoboselli', source: 'https://freesound.org/people/brunoboselli/sounds/458113', src: 'resources/sounds/cc0/countryside.mp3', tags: ['Nature'] },
    { id: 'cc0_train', name: 'Train Interior', title: 'Train interior', creator: 'Yoyodaman234', source: 'https://freesound.org/people/Yoyodaman234/sounds/341208', src: 'resources/sounds/cc0/train-interior.mp3', tags: ['Lifestyle'] },
    { id: 'cc0_birds', name: 'Birds in Spring', title: 'Birds in Spring', creator: 'BurghRecords', source: 'https://freesound.org/people/BurghRecords/sounds/463903', src: 'resources/sounds/cc0/birds-spring.mp3', tags: ['Nature'] },
    { id: 'cc0_crickets', name: 'Crickets at Night', title: 'Crickets', creator: 'FunkApache', source: 'https://freesound.org/people/FunkApache/sounds/393389', src: 'resources/sounds/cc0/crickets.mp3', tags: ['Nature'] },
    { id: 'cc0_keyboard', name: 'Computer Keyboard', title: 'Computer keyboard loop', creator: 'cabled_mess', source: 'https://freesound.org/people/cabled_mess/sounds/361639', src: 'resources/sounds/cc0/keyboard.mp3', tags: ['Focus'] },
    { id: 'cc0_airport', name: 'Airport Ambience', title: 'Airport ambience', creator: 'Lowcat_Sound', source: 'https://freesound.org/people/Lowcat_Sound/sounds/535074', src: 'resources/sounds/cc0/airport.mp3', tags: ['Lifestyle'] },
    { id: 'cc0_whales', name: 'Diving with Whales', title: 'Diving with whales', creator: 'KEVOY', source: 'https://freesound.org/people/KEVOY/sounds/82325', src: 'resources/sounds/cc0/diving-whales.mp3', tags: ['Nature'] },
    { id: 'cc0_bowling', name: 'Bowling Alley', title: 'Bowling Alley Ambience', creator: 'moviebuffgavin', source: 'https://freesound.org/people/moviebuffgavin/sounds/398078', src: 'resources/sounds/cc0/bowling.mp3', tags: ['Niche'] },
    { id: 'cc0_air_conditioner', name: 'Air Conditioner Fan', title: 'Air Conditioner Fan Hum', creator: 'MATRIXXX_', source: 'https://freesound.org/people/MATRIXXX_/sounds/515859', src: 'resources/sounds/cc0/air-conditioner.mp3', tags: ['Interior'] },
    { id: 'cc0_kitchen', name: 'Diner Kitchen', title: 'Diner kitchen', creator: 'ViaTorci', source: 'https://freesound.org/people/ViaTorci/sounds/66790', src: 'resources/sounds/cc0/diner-kitchen.mp3', tags: ['Interior'] },
    { id: 'cc0_vinyl', name: 'Vinyl Record Crackle', title: 'Vinyl Record Crackle Loop', creator: 'OwlStorm', source: 'https://freesound.org/people/OwlStorm/sounds/371583', src: 'resources/sounds/cc0/vinyl-crackle.mp3', tags: ['Niche'] },
    { id: 'cc0_clock', name: 'Ticking Clock', title: 'Loopable Ticking Clock', creator: 'OwlStorm', source: 'https://freesound.org/people/OwlStorm/sounds/212181', src: 'resources/sounds/cc0/ticking-clock.mp3', tags: ['Interior'] },
    { id: 'cc0_static', name: 'Radio Static', title: 'Hard static loop', creator: 'dotY21', source: 'https://freesound.org/people/dotY21/sounds/395804', src: 'resources/sounds/cc0/radio-static.mp3', tags: ['Focus', 'Niche'] },
    { id: 'cc0_city', name: 'Boston Street Morning', title: 'Boston Street Morning.wav', creator: 'Dlam1991', source: 'https://freesound.org/people/Dlam1991/sounds/234080', src: 'resources/sounds/cc0/boston-morning.mp3', tags: ['Lifestyle'] },
    { id: 'cc0_campfire', name: 'Campfire Loop', title: 'Ambiance_Campfire_Loop_Stereo.wav', creator: 'Nox_Sound', source: 'https://freesound.org/people/Nox_Sound/sounds/558967', src: 'resources/sounds/cc0/campfire.mp3', tags: ['Nature'] },
    { id: 'cc0_wind', name: 'Wind in the Trees', title: 'wind_forest_08_strong_l_01.wav', creator: 'teadrinker', source: 'https://freesound.org/people/teadrinker/sounds/403051', src: 'resources/sounds/cc0/wind-trees.mp3', tags: ['Nature', 'Weather'] },
  ].map((sound) => ({
    ...sound,
    sourceUrl: sound.source,
    description: `${sound.title} — ${sound.creator} · CC0 1.0`,
    license: 'CC0 1.0',
    openSource: true,
    player: null,
  }));
  const ICONS = {
    sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4m4-8v12m4-15v18m4-14v10m4-7v4"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 10 6-10 6z" fill="currentColor" stroke="none"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6v12m8-12v12"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" stroke="none"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4 4"/></svg>',
    music: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13M9 18c0 1.1-1.3 2-3 2s-3-.9-3-2 1.3-2 3-2 3 .9 3 2Zm11-2c0 1.1-1.3 2-3 2s-3-.9-3-2 1.3-2 3-2 3 .9 3 2Z"/></svg>',
    timer: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6m-3 0v3"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m16 3 4 4-4 4M4 7h3c5 0 5 10 10 10h3m-4-4 4 4-4 4M4 17h3c1.4 0 2.4-1.1 3.2-2.6M14 9.6c.8-1.5 1.8-2.6 3.2-2.6h3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2-2A5 5 0 0 0 12 3.9l-1.1 1.1M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>',
  };
  const icon = (name) => ICONS[name] || ICONS.sound;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));

  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error(`Studio : impossible de lire ${key}.`, error);
      return fallback;
    }
  }

  function parseMusicUrl(value) {
    if (typeof value !== 'string') return null;
    const raw = value.trim();
    const spotifyUri = raw.match(/^spotify:(playlist|album|track|artist):([a-zA-Z0-9]+)$/);
    if (spotifyUri) {
      return { platform: 'Spotify', title: 'Spotify', url: raw, embed: `https://open.spotify.com/embed/${spotifyUri[1]}/${spotifyUri[2]}` };
    }
    let url;
    try {
      url = new URL(raw);
    } catch {
      return null;
    }
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    if (host === 'open.spotify.com') {
      const match = url.pathname.match(/^\/(?:intl-[a-z]{2}(?:-[a-z]{2})?\/)?(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
      if (!match) return null;
      return { platform: 'Spotify', title: 'Spotify', url: url.href, embed: `https://open.spotify.com/embed/${match[1]}/${match[2]}` };
    }
    if (['youtube.com', 'www.youtube.com', 'music.youtube.com', 'youtu.be'].includes(host)) {
      const videoId = host === 'youtu.be'
        ? url.pathname.slice(1).split('/')[0]
        : url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/)?.[1];
      const playlistId = url.searchParams.get('list');
      if (videoId && !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return null;
      if (!videoId && !playlistId) return null;
      const embed = videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}${playlistId ? `?list=${encodeURIComponent(playlistId)}` : ''}`
        : `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}`;
      return { platform: host === 'music.youtube.com' ? 'YouTube Music' : 'YouTube', title: 'YouTube', url: url.href, embed };
    }
    if (host === 'music.apple.com') {
      if (!/^\/[a-z]{2}\//i.test(url.pathname)) return null;
      url.hostname = 'embed.music.apple.com';
      url.search = '';
      return { platform: 'Apple Music', title: 'Apple Music', url: raw, embed: url.href };
    }
    if (['soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com'].includes(host)) {
      if (url.pathname === '/') return null;
      return {
        platform: 'SoundCloud',
        title: 'SoundCloud',
        url: url.href,
        embed: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url.href)}&color=%23f66624&auto_play=false`,
      };
    }
    if (['deezer.com', 'www.deezer.com'].includes(host)) {
      const match = url.pathname.match(/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?(track|album|playlist)\/(\d+)/i);
      if (!match) return null;
      return {
        platform: 'Deezer',
        title: 'Deezer',
        url: url.href,
        embed: `https://widget.deezer.com/widget/dark/${match[1]}/${match[2]}`,
      };
    }
    if (['tidal.com', 'www.tidal.com', 'listen.tidal.com'].includes(host)) {
      const match = url.pathname.match(/^\/(?:browse\/)?(track|album|playlist)\/([a-zA-Z0-9-]+)/i);
      if (!match) return null;
      const type = { track: 'tracks', album: 'albums', playlist: 'playlists' }[match[1].toLowerCase()];
      return {
        platform: 'Tidal',
        title: 'Tidal',
        url: url.href,
        embed: `https://embed.tidal.com/${type}/${match[2]}`,
      };
    }
    if (/^music\.amazon\.(?:com|ca|co\.uk|com\.au|com\.br|de|es|fr|it|co\.jp)$/.test(host)) {
      const match = url.pathname.match(/^\/(?:[\w-]+\/)?(?:playlists|user-playlists|albums|tracks)\/([a-zA-Z0-9-]+)/);
      if (!match) return null;
      return { platform: 'Amazon Music', title: 'Amazon Music', url: url.href, embed: `https://${host}/embed/${encodeURIComponent(match[1])}` };
    }
    return null;
  }

  class SoundsStudio extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.sounds = {};
      this.selected = [];
      this.presets = [];
      this.favorites = [];
      this.category = 'all';
      this.query = '';
      this.playing = false;
      this.masterVolume = 0.8;
      this.currentTrack = null;
      this.timerDuration = 0;
      this.timerEndsAt = 0;
      this._keyHandler = (event) => {
        if (event.key !== 'Escape') return;
        if (this.hasAttribute('island-expanded')) this.removeAttribute('island-expanded');
        else this.close();
      };
      this._outsideHandler = (event) => {
        if (!event.composedPath().includes(this)) {
          this.close();
          this.removeAttribute('island-expanded');
        }
      };
      this._resizeHandler = () => {
        if (this.hasAttribute('open')) this.positionPopover();
      };
    }

    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      this.music = window.Flocus?.newMusic;
      const freeSounds = Object.fromEntries(
        Object.entries(this.music?.sounds || {}).filter(([id, sound]) => id !== 'none' && !sound.isPlus)
      );
      this.sounds = {
        ...freeSounds,
        ...Object.fromEntries(CC0_SOUNDS.map((sound) => [sound.id, { ...sound }])),
      };
      this.restoreState();
      this.render();
      this.bindEvents();
      this.addToolbarButton();
      document.addEventListener('keydown', this._keyHandler);
      document.addEventListener('pointerdown', this._outsideHandler);
      window.addEventListener('resize', this._resizeHandler);
      this.clockInterval = setInterval(() => this.updateIslandClock(), 1000);
      this.renderSounds();
      this.renderMix();
      this.renderPresets();
      this.renderFavorites();
      this.updateIslandClock();
    }

    restoreState() {
      const saved = readStorage(STATE_KEY, null) || readStorage('nestafocus_sounds_v4', {});
      const masterVolume = Number(saved?.masterVolume);
      if (Number.isFinite(masterVolume)) this.masterVolume = Math.max(0, Math.min(1, masterVolume));
      const active = Array.isArray(saved?.active) ? saved.active : [];
      this.selected = active
        .map((item) => item && { ...item, id: SOUND_ID_ALIASES[item.id] || item.id })
        .filter((item) => item && this.sounds[item.id])
        .filter((item, index, items) => items.findIndex((other) => other.id === item.id) === index)
        .slice(0, MAX_ACTIVE)
        .map((item) => {
          const volume = Number(item.volume);
          return { id: item.id, volume: Number.isFinite(volume) ? Math.max(0, Math.min(1, volume)) : 0.5 };
        });
      this.presets = this.readList(PRESETS_KEY, 'nestafocus_sound_presets_v3').map((preset) => {
        const sounds = Array.isArray(preset?.sounds)
          ? [...new Set(preset.sounds.map((id) => SOUND_ID_ALIASES[id] || id))]
          : [];
        const volumes = { ...(preset?.volumes || {}) };
        if (Object.prototype.hasOwnProperty.call(volumes, 'cc0_cafe')) {
          if (!Object.prototype.hasOwnProperty.call(volumes, 'cafe')) volumes.cafe = volumes.cc0_cafe;
          delete volumes.cc0_cafe;
        }
        return { ...preset, sounds, volumes };
      });
      this.favorites = this.readList(FAVORITES_KEY, 'nestafocus_music_favorites_v1');
    }

    readList(key, ...legacyKeys) {
      for (const storageKey of [key, ...legacyKeys]) {
        const value = readStorage(storageKey, null);
        if (Array.isArray(value)) return value;
      }
      return [];
    }

    persist(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`Studio : impossible d'enregistrer ${key}.`, error);
        this.setStatus('Enregistrement impossible sur cet appareil.', true);
        return false;
      }
    }

    saveState() {
      this.persist(STATE_KEY, { active: this.selected, masterVolume: this.masterVolume });
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host{--abyss:#022a71;--ink:#101827;--orange:#f66624;--sand:#e3d594;--purple:#855c9e;--paper:#fffdf6;position:fixed;inset:0;z-index:5000;pointer-events:none;color:var(--paper);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
          *{box-sizing:border-box}[hidden]{display:none!important}button,input{font:inherit}button{color:inherit}
          .popover{position:fixed;z-index:2;display:flex;width:min(560px,calc(100vw - 24px));height:min(650px,calc(100dvh - 100px));flex-direction:column;overflow:hidden;padding:20px 22px 18px;border:1px solid rgba(227,213,148,.33);border-radius:20px;background:linear-gradient(145deg,rgba(2,42,113,.97),rgba(16,24,39,.98) 78%);box-shadow:0 20px 70px rgba(0,0,0,.4),inset 0 1px rgba(255,255,255,.09);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(7px);transition:opacity .16s ease,transform .16s ease,visibility .16s}
          :host([open]) .popover{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}
          .panel-head{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:31px}
          .panel-brand{display:flex;align-items:center;gap:9px}.brand-mark{display:grid;width:29px;height:29px;place-items:center;border:1px solid rgba(227,213,148,.34);border-radius:9px;background:rgba(227,213,148,.09);color:var(--sand)}
          .brand-mark svg{width:16px;height:16px}.brand-name{font-size:11px;font-weight:700;letter-spacing:.025em}.brand-caption{margin-top:3px;color:rgba(255,253,246,.54);font-size:8px}
          .head-actions{display:flex;align-items:center;gap:7px}.tab-nav{display:flex;gap:3px;padding:3px;border:1px solid rgba(255,253,246,.1);border-radius:9px;background:rgba(0,0,0,.12)}
          .tab-nav button{padding:5px 8px;border:0;border-radius:6px;background:transparent;color:rgba(255,253,246,.63);cursor:pointer;font-size:8px}
          .tab-nav button[aria-selected="true"]{background:rgba(246,102,36,.2);color:#ffd4bd}
          .icon-button{display:grid;width:28px;height:28px;place-items:center;border:1px solid rgba(255,253,246,.11);border-radius:8px;background:rgba(255,253,246,.04);color:rgba(255,253,246,.76);cursor:pointer}
          .icon-button svg{width:14px;height:14px}
          .page{display:flex;flex:1;min-height:0;flex-direction:column;padding-top:12px}.page[hidden]{display:none}
          .intro{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
          .intro-title{margin:0;color:var(--paper);font-size:11px;font-weight:600}.intro-caption{margin:3px 0 0;color:rgba(255,253,246,.5);font-size:8px}
          .random{display:flex;align-items:center;gap:5px;padding:5px 8px;border:1px solid rgba(246,102,36,.4);border-radius:8px;background:rgba(246,102,36,.12);color:#ffc19f;cursor:pointer;font-size:8px}
          .random svg{width:12px;height:12px}
          .search{display:flex;align-items:center;gap:7px;height:32px;padding:0 9px;border:1px solid rgba(255,253,246,.13);border-radius:8px;background:rgba(0,0,0,.15);color:rgba(255,253,246,.5)}
          .search svg{width:13px;height:13px}.search input,.link-form input{width:100%;min-width:0;border:0;outline:0;background:transparent;color:var(--paper);font-size:9px}
          .search input::placeholder,.link-form input::placeholder{color:rgba(255,253,246,.43)}
          .categories{display:flex;flex-wrap:wrap;gap:5px;overflow:visible;margin:8px 0 7px;padding-bottom:2px}
          .chip{flex:0 0 auto;padding:5px 8px;border:1px solid rgba(255,253,246,.12);border-radius:999px;background:transparent;color:rgba(255,253,246,.65);cursor:pointer;font-size:8px}
          .chip.active{border-color:rgba(246,102,36,.6);background:rgba(246,102,36,.14);color:#ffd2bb}
          .source-link{color:#a7d6d5;text-decoration:underline;text-underline-offset:2px}
          .sound-list{display:grid;flex:1;grid-template-columns:repeat(2,minmax(0,1fr));align-content:start;gap:5px;overflow:auto;min-height:65px;padding:1px 2px 6px 0;scrollbar-color:rgba(227,213,148,.3) transparent;scrollbar-width:thin}
          .sound{display:grid;min-width:0;min-height:38px;grid-template-columns:25px minmax(0,1fr) 18px;align-items:center;gap:7px;padding:5px 7px;border:1px solid rgba(255,253,246,.1);border-radius:8px;background:rgba(255,253,246,.045);cursor:pointer;text-align:left;transition:background .12s,border-color .12s}
          .sound:hover{border-color:rgba(227,213,148,.38);background:rgba(255,253,246,.09)}.sound.selected{border-color:rgba(246,102,36,.58);background:rgba(246,102,36,.12)}
          .sound-mark{display:grid;width:24px;height:24px;place-items:center;border-radius:7px;background:rgba(2,42,113,.6);color:#92cbd1}
          .sound-mark svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
          .sound.selected .sound-mark{background:rgba(246,102,36,.16);color:#ffb186}
          .sound-copy{min-width:0}          .sound-name{display:block;overflow:hidden;color:var(--paper);font-size:9px;font-weight:550;text-overflow:ellipsis;white-space:nowrap}
          .sound-meta{display:block;overflow:hidden;margin-top:3px;color:rgba(255,253,246,.58);font-size:8px;text-overflow:ellipsis;white-space:nowrap}
          .sound-license{display:inline-block;margin-left:5px;padding:1px 4px;border:1px solid rgba(167,214,213,.34);border-radius:999px;color:#a7d6d5;font-size:7px;line-height:1.2}
          .sound-action{display:grid;width:17px;height:17px;place-items:center;color:rgba(255,253,246,.6)}
          .sound-action svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
          .empty{grid-column:1/-1;margin:0;padding:16px 8px;color:rgba(255,253,246,.56);font-size:9px;text-align:center}
          .mix{flex:0 0 auto;margin-top:6px;padding-top:8px;border-top:1px solid rgba(255,253,246,.11)}
          .mix-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
          .mix-title{margin:0;color:rgba(255,253,246,.82);font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
          .mix-count{color:rgba(255,253,246,.6);font-size:9px}
          .mix-list{display:flex;max-height:76px;flex-direction:column;gap:4px;overflow:auto}
          .mix-empty{margin:0;padding:4px 0;color:rgba(255,253,246,.46);font-size:8px}
          .mix-row{display:grid;grid-template-columns:17px minmax(0,1fr) 66px 20px;align-items:center;gap:6px;min-height:25px;padding:2px 5px;border:1px solid rgba(255,253,246,.09);border-radius:7px;background:rgba(0,0,0,.1)}
          .mix-row-icon svg{width:12px;height:12px;fill:none;stroke:#9bcbd0;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
          .mix-row-name{overflow:hidden;color:rgba(255,253,246,.8);font-size:8px;text-overflow:ellipsis;white-space:nowrap}
          .mix-row input{width:100%;height:13px;accent-color:var(--orange);cursor:pointer}
          .remove{display:grid;width:18px;height:18px;place-items:center;border:0;border-radius:5px;background:transparent;color:rgba(255,253,246,.48);cursor:pointer;font-size:13px}
          .preset-tools{display:flex;align-items:center;gap:6px;min-height:21px;margin-top:5px}
          .preset-tools>span{flex:0 0 auto;color:rgba(255,253,246,.48);font-size:7px}
          .preset-save{flex:0 0 auto;padding:4px 6px;border:1px solid rgba(227,213,148,.22);border-radius:6px;background:rgba(227,213,148,.06);color:var(--sand);cursor:pointer;font-size:7px}
          .preset-save:disabled{cursor:not-allowed;opacity:.4}
          .preset-list{display:flex;min-width:0;gap:4px;overflow-x:auto;scrollbar-width:none}.preset-list::-webkit-scrollbar{display:none}
          .preset-list .favorite{flex:0 0 auto;padding:3px 4px}
          .preset-form{display:flex;gap:5px;margin-top:5px}.preset-form input{flex:1;min-width:0;padding:5px 7px;border:1px solid rgba(255,253,246,.13);border-radius:6px;background:rgba(0,0,0,.12);color:var(--paper);font-size:8px}
          .preset-form button{padding:4px 6px;border:1px solid rgba(255,253,246,.13);border-radius:6px;background:rgba(255,253,246,.05);color:var(--paper);cursor:pointer;font-size:7px}
          .controls{display:flex;align-items:center;gap:8px;margin-top:8px}
          .master{display:flex;flex:1;align-items:center;gap:6px;min-width:0;color:rgba(255,253,246,.69);font-size:8px}
          .master input{flex:1;min-width:20px;height:14px;accent-color:var(--orange);cursor:pointer}.master output{width:23px;color:var(--sand);font-size:8px;text-align:right}
          .transport{display:flex;align-items:center;gap:5px}.transport button{display:grid;width:26px;height:26px;place-items:center;border:1px solid rgba(255,253,246,.15);border-radius:8px;background:rgba(255,253,246,.05);color:var(--paper);cursor:pointer}
          .transport button.primary{border-color:var(--orange);background:var(--orange);color:var(--ink)}.transport button:disabled{cursor:not-allowed;opacity:.38}.transport svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
          .timer{display:flex;align-items:center;gap:8px;margin-top:8px}
          .timer-label{display:flex;align-items:center;gap:5px;flex:0 0 auto;color:rgba(255,253,246,.65);font-size:8px}.timer-label svg{width:12px;height:12px;fill:none;stroke:var(--sand);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
          .timer-display{margin-left:auto;color:var(--sand);font-size:8px;font-variant-numeric:tabular-nums}
          .timer-options{display:flex;gap:3px}          .timer-options button{padding:4px 6px;border:1px solid rgba(255,253,246,.11);border-radius:6px;background:transparent;color:rgba(255,253,246,.66);cursor:pointer;font-size:8px}
          .timer-options button.active{border-color:rgba(246,102,36,.55);background:rgba(246,102,36,.15);color:#ffc29f}
          .status{min-height:12px;margin:5px 0 0;color:#e3d594;font-size:8px;line-height:1.4}.status.error{color:#ff9a87}
          .music-page{gap:9px}.music-heading{margin-bottom:8px}.music-heading strong{display:block;color:var(--paper);font-size:11px;font-weight:600}.music-heading span{display:block;margin-top:3px;color:rgba(255,253,246,.5);font-size:8px}
          .link-form{display:flex;gap:6px;padding:5px 5px 5px 9px;border:1px solid rgba(255,253,246,.13);border-radius:8px;background:rgba(0,0,0,.14)}
          .link-form button{display:flex;align-items:center;gap:4px;padding:0 8px;border:0;border-radius:6px;background:var(--orange);color:var(--ink);cursor:pointer;font-size:8px;font-weight:650;white-space:nowrap}
          .link-form button svg{width:11px;height:11px}.playlist-heading{margin:8px 0 5px;color:rgba(255,253,246,.6);font-size:8px;font-weight:650}
          .playlists{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}
          .playlist{display:flex;align-items:center;gap:7px;min-width:0;min-height:34px;padding:5px 7px;border:1px solid rgba(255,253,246,.1);border-radius:7px;background:rgba(255,253,246,.045);cursor:pointer;text-align:left}
          .playlist:hover{background:rgba(255,253,246,.09)}.playlist-mark{display:grid;width:22px;height:22px;flex:0 0 22px;place-items:center;border-radius:6px;background:rgba(133,92,158,.28);color:#dec9e9}
          .playlist-mark svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
          .playlist-copy{overflow:hidden}.playlist-copy strong{display:block;overflow:hidden;color:rgba(255,253,246,.86);font-size:8px;font-weight:550;text-overflow:ellipsis;white-space:nowrap}
          .playlist-copy small{display:block;margin-top:2px;color:rgba(255,253,246,.42);font-size:7px}
          .music-bottom{display:grid;flex:1;min-height:180px;grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:8px;overflow:hidden;margin-top:7px;padding-top:7px;border-top:1px solid rgba(255,253,246,.11)}
          .music-bottom>section{min-width:0;min-height:0;overflow:auto}.music-bottom>section:first-child{max-height:64px}.music-bottom h3{margin:0 0 5px;color:rgba(255,253,246,.61);font-size:8px;font-weight:650}
          .favorite-list{display:flex;flex-wrap:wrap;gap:4px}.favorite{display:inline-flex;align-items:center;gap:4px;max-width:100%;padding:3px 5px;border:1px solid rgba(255,253,246,.12);border-radius:6px;background:rgba(255,253,246,.04)}
          .favorite button{max-width:112px;overflow:hidden;border:0;background:transparent;color:rgba(255,253,246,.75);cursor:pointer;font-size:7px;text-overflow:ellipsis;white-space:nowrap}
          .favorite button:last-child{padding:0 2px;color:rgba(255,253,246,.42)}
          .music-player{display:flex;min-height:0;flex-direction:column;gap:5px;overflow:hidden}
          .music-player-heading{display:flex;align-items:center;justify-content:space-between;color:rgba(255,253,246,.8);font-size:8px}
          .favorite-name{width:100%;padding:6px 8px;border:1px solid rgba(255,253,246,.13);border-radius:7px;background:rgba(0,0,0,.12);color:var(--paper);font-size:8px}
          .save-favorite{display:flex;align-items:center;gap:4px;align-self:flex-start;padding:5px 7px;border:1px solid rgba(227,213,148,.26);border-radius:7px;background:rgba(227,213,148,.08);color:var(--sand);cursor:pointer;font-size:7px}
          .save-favorite svg{width:11px;height:11px}
          .music-player iframe{flex:1;width:100%;min-height:100px;border:1px solid rgba(255,253,246,.12);border-radius:9px;background:#101827}
          .music-empty{display:flex;flex:1;align-items:center;justify-content:center;gap:8px;padding:8px;border:1px dashed rgba(255,253,246,.15);border-radius:8px;color:rgba(255,253,246,.48);font-size:8px;text-align:center}
          .music-empty svg{width:15px;height:15px;flex:0 0 15px;color:var(--sand)}
          .island-wrap{position:fixed;z-index:3;top:54px;left:50%;width:min(330px,calc(100vw - 28px));pointer-events:auto;transform:translateX(-50%)}
          .island-pill{display:flex;width:100%;min-height:39px;align-items:center;gap:9px;padding:6px 11px;border:1px solid rgba(227,213,148,.3);border-radius:999px;background:linear-gradient(110deg,#101827,#022a71);box-shadow:0 7px 30px rgba(0,0,0,.24),inset 0 1px rgba(255,255,255,.08);color:var(--paper);cursor:pointer}
          .island-mark{display:grid;width:23px;height:23px;flex:0 0 23px;place-items:center;border-radius:50%;background:rgba(246,102,36,.18);color:var(--orange)}
          .island-mark svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
          .island-copy{display:flex;flex:1;align-items:center;justify-content:space-between;gap:8px;min-width:0}
          .island-track{overflow:hidden;color:rgba(255,253,246,.9);font-size:9px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}
          .island-clock{flex:0 0 auto;color:var(--sand);font-size:8px;font-variant-numeric:tabular-nums}
          .island-bars{display:flex;height:15px;align-items:center;gap:2px}.island-bars i{width:2px;height:var(--bar);border-radius:2px;background:var(--orange);opacity:.55}
          :host([playing]) .island-bars i{animation:island-wave .65s ease-in-out infinite alternate;animation-delay:var(--delay)}
          @keyframes island-wave{to{transform:scaleY(.35);opacity:1}}
          .island-expanded{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;overflow:hidden;max-height:0;padding:0 14px;border:1px solid transparent;border-radius:0 0 15px 15px;background:#101827;opacity:0;transition:max-height .2s ease,padding .2s ease,opacity .18s ease}
          :host([island-expanded]) .island-pill{border-radius:15px 15px 0 0}
          :host([island-expanded]) .island-expanded{max-height:104px;padding:11px 14px 12px;border-color:rgba(227,213,148,.3);border-top:0;opacity:1}
          .island-detail-title{overflow:hidden;color:var(--paper);font-size:9px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}
          .island-detail-sub{margin-top:3px;color:rgba(255,253,246,.62);font-size:8px}
          .island-detail-times{display:flex;align-items:center;gap:10px;color:var(--sand);font-size:8px;white-space:nowrap}
          .island-detail-times span+span{padding-left:9px;border-left:1px solid rgba(255,253,246,.16)}
          .island-actions{display:flex;align-items:center;gap:5px}
          .island-actions button{display:grid;width:24px;height:24px;place-items:center;border:1px solid rgba(255,253,246,.13);border-radius:7px;background:rgba(255,253,246,.06);color:var(--paper);cursor:pointer}
          .island-actions button:disabled{cursor:not-allowed;opacity:.38}
          .island-actions button svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
          :host(:not([has-audio])) .island-wrap{display:none}
          .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
          @media(min-width:761px){
            .page[data-page="sounds"]{display:grid;grid-template-columns:minmax(0,1fr) 224px;grid-template-rows:auto auto auto minmax(0,1fr);grid-template-areas:"intro intro" "search mix" "categories mix" "catalog mix";column-gap:16px;row-gap:9px;padding-top:17px}
            .intro{grid-area:intro;margin:0 0 3px}.intro-title{font-size:15px}.intro-caption{font-size:11px}
            .random{gap:7px;padding:8px 10px;font-size:10px}.random svg{width:14px;height:14px}
            .search{grid-area:search;height:40px;padding:0 11px;border-radius:10px}.search input{font-size:12px}.search svg{width:15px;height:15px}
            .categories{grid-area:categories;gap:7px;margin:0;padding:2px 0 5px}.chip{padding:7px 10px;font-size:10px}
            .sound-list{grid-area:catalog;grid-template-columns:minmax(0,1fr);gap:7px;min-height:0;padding:1px 3px 6px 0}
            .sound{min-height:50px;grid-template-columns:30px minmax(0,1fr) 20px;gap:10px;padding:8px 10px;border-radius:11px}
            .sound-mark{width:29px;height:29px;border-radius:9px}.sound-mark svg{width:16px;height:16px}
            .sound-name{font-size:12px}.sound-meta{margin-top:4px;font-size:10px}
            .sound-action{width:20px;height:20px}.sound-action svg{width:15px;height:15px}
            .mix{grid-area:mix;display:flex;min-width:0;min-height:0;flex-direction:column;overflow:auto;margin:0;padding:15px 13px;border:1px solid rgba(255,253,246,.11);border-radius:15px;background:rgba(0,0,0,.13)}
            .mix-head{margin-bottom:9px}.mix-title{font-size:12px}.mix-count{font-size:11px}
            .mix-list{max-height:none;flex:1;gap:6px}.mix-empty{font-size:10px}
            .mix-row{grid-template-columns:18px minmax(0,1fr) 64px 21px;gap:6px;min-height:34px;padding:4px 6px;border-radius:9px}
            .mix-row-name{font-size:10px}.mix-row input{height:16px}.remove{width:20px;height:20px;font-size:15px}
            .controls{gap:8px;margin-top:13px}.master{gap:7px;font-size:10px}.master output{width:30px;font-size:10px}
            .transport{gap:6px}.transport button{width:32px;height:32px;border-radius:9px}.transport svg{width:15px;height:15px}
            .preset-tools{flex-wrap:wrap;gap:7px;min-height:26px;margin-top:12px}.preset-tools>span{font-size:9px}
            .preset-save{padding:6px 8px;font-size:9px}.preset-list{flex-basis:100%;gap:6px}.preset-list .favorite{padding:5px 6px}
            .preset-form{gap:7px;margin-top:8px}.preset-form input,.preset-form button{padding:7px 9px;font-size:10px}
            .timer{display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:13px}
            .timer-label{grid-column:1;grid-row:1;gap:7px;font-size:10px}.timer-label svg{width:15px;height:15px}
            .timer-display{grid-column:2;grid-row:1;font-size:11px}
            .timer-options{grid-column:1/-1;grid-row:2;gap:5px}.timer-options button{flex:1;padding:6px 5px;font-size:10px}
            .status{min-height:15px;margin-top:9px;font-size:10px}
            .music-page{gap:11px;padding-top:18px}.music-heading{margin-bottom:0}.music-heading strong{font-size:16px}.music-heading span{font-size:11px}
            .link-form{gap:8px;padding:7px 7px 7px 12px;border-radius:10px}.link-form input{font-size:12px}.link-form button{gap:6px;padding:0 11px;font-size:10px}
            .link-form button svg{width:14px;height:14px}
            .service-section{display:flex;flex-direction:column;gap:7px}.service-title{color:rgba(255,253,246,.7);font-size:10px;font-weight:650}
            .service-list{display:flex;flex-wrap:wrap;gap:6px}.service-list span{padding:5px 8px;border:1px solid rgba(255,253,246,.12);border-radius:999px;background:rgba(255,253,246,.04);color:rgba(255,253,246,.75);font-size:10px}
            .service-note{margin:0;color:rgba(255,253,246,.48);font-size:9px;line-height:1.45}
            .playlist-heading{margin:6px 0 0;font-size:10px}.playlists{gap:7px}.playlist{min-height:42px;padding:7px 9px;border-radius:9px}.playlist-mark{width:28px;height:28px;flex-basis:28px}
            .playlist-mark svg{width:15px;height:15px}.playlist-copy strong{font-size:10px}.playlist-copy small{font-size:9px}
            .music-bottom{gap:10px;margin-top:2px;padding-top:11px}.music-bottom>section:first-child{max-height:72px}.music-bottom h3{margin-bottom:8px;font-size:10px}
            .favorite{gap:5px;padding:5px 7px;border-radius:8px}.favorite button{font-size:9px}.favorite button:last-child{font-size:12px}
            .music-player{gap:8px}.music-player-heading{font-size:10px}.favorite-name{padding:8px 10px;font-size:10px}
            .save-favorite{gap:6px;padding:7px 9px;font-size:9px}.save-favorite svg{width:13px;height:13px}
            .music-player iframe{min-height:160px;border-radius:11px}.music-empty{gap:10px;font-size:10px}.music-empty svg{width:18px;height:18px;flex-basis:18px}
          }
          @media(max-width:760px){
            .popover{top:68px!important;right:12px;left:12px;width:auto;height:min(460px,calc(100dvh - 88px))!important;padding:15px 14px 12px;border-radius:16px}
            .page{padding-top:11px}.intro-title{font-size:13px}.intro-caption{font-size:10px}
            .random{gap:6px;padding:7px 9px;font-size:9px}.random svg{width:13px;height:13px}
            .search{height:38px}.search input{font-size:11px}
            .categories{gap:6px;margin:8px 0 8px}.chip{padding:6px 9px;font-size:9px}
            .sound-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;min-height:55px}
            .sound{min-height:43px;grid-template-columns:25px minmax(0,1fr) 18px;gap:6px;padding:6px 7px}
            .sound-mark{width:24px;height:24px}.sound-name{font-size:10px}.sound-meta{font-size:8px}
            .mix{margin-top:8px;padding-top:10px}.mix-list{max-height:64px;gap:5px}.mix-row{min-height:28px;grid-template-columns:18px minmax(0,1fr) 66px 20px}
            .mix-row-name{font-size:9px}.controls{gap:7px;margin-top:9px}.master{font-size:9px}.transport button{width:30px;height:30px}
            .preset-tools{gap:6px;min-height:24px;margin-top:8px}.preset-tools>span{font-size:8px}.preset-save{padding:5px 7px;font-size:8px}
            .timer{gap:6px;margin-top:8px}.timer-label{gap:5px;font-size:9px}.timer-options{gap:4px}.timer-options button{padding:5px 6px;font-size:9px}.timer-display{font-size:9px}
            .status{min-height:14px;margin-top:6px;font-size:9px}
            .island-wrap{top:54px;width:min(310px,calc(100vw - 28px))}            .music-page{gap:9px;overflow-y:auto;scrollbar-width:thin}.music-heading strong{font-size:14px}.music-heading span{font-size:10px}
            .link-form{gap:5px;padding:6px 6px 6px 9px}.link-form input{font-size:10px}.link-form button{padding:0 8px;font-size:9px}
            .service-section{display:flex;flex-direction:column;gap:6px}.service-title{font-size:9px;font-weight:650;color:rgba(255,253,246,.7)}
            .service-list{display:flex;flex-wrap:nowrap;gap:5px;overflow-x:auto;padding-bottom:3px;scrollbar-width:thin}.service-list span{flex:0 0 auto;padding:4px 7px;border:1px solid rgba(255,253,246,.12);border-radius:999px;background:rgba(255,253,246,.04);color:rgba(255,253,246,.75);font-size:8px}
            .service-note{display:none}
            .playlists{display:flex;gap:5px;overflow-x:auto;padding-bottom:3px;scrollbar-width:thin}.playlist{min-height:34px;flex:0 0 140px;padding:5px 7px}.playlist-mark{width:23px;height:23px;flex-basis:23px}.playlist-copy strong{font-size:9px}.playlist-copy small{font-size:8px}
            :host([open]) .island-wrap{top:calc(68px + min(460px, 100dvh - 88px) + 8px)}
            .music-bottom{flex:1;min-height:200px;gap:8px;margin-top:4px;padding-top:7px}.music-bottom>section:first-child{max-height:54px}.music-bottom h3{font-size:9px}.music-player iframe{min-height:100px}
          }
          @media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
        </style>
        <section class="popover" data-popover aria-label="Studio sonore">
          <header class="panel-head">
            <div class="panel-brand"><span class="brand-mark">${icon('sound')}</span><div><div class="brand-name">Studio sonore</div><div class="brand-caption">Votre ambiance, sans quitter le focus</div></div></div>
            <div class="head-actions">
              <nav class="tab-nav" aria-label="Contenu du Studio"><button type="button" data-tab="sounds" aria-selected="true">Ambiance</button><button type="button" data-tab="music" aria-selected="false">Musique</button></nav>
              <button type="button" class="icon-button" data-close aria-label="Fermer le Studio">${icon('close')}</button>
            </div>
          </header>
          <section class="page" data-page="sounds">
            <div class="intro"><div><h2 class="intro-title">Composer une ambiance</h2><p class="intro-caption">${Object.keys(this.sounds).length} sons gratuits · jusqu’à cinq en même temps · <a class="source-link" href="resources/sounds/cc0/SOURCES.txt" target="_blank" rel="noopener">${CC0_SOUNDS.length} sources CC0</a></p></div><button class="random" type="button" data-surprise>${icon('shuffle')}<span>Surprendre</span></button></div>
            <label class="search">${icon('search')}<input type="search" placeholder="Rechercher un son" aria-label="Rechercher un son" data-search></label>
            <div class="categories" data-categories aria-label="Filtrer par catégorie"></div>
            <div class="sound-list" data-sound-list></div>
            <section class="mix"><div class="mix-head"><h3 class="mix-title">Votre mix</h3><span class="mix-count" data-mix-count>0 / ${MAX_ACTIVE}</span></div><div class="mix-list" data-mix-list></div>
              <div class="controls"><label class="master"><span>Volume</span><input type="range" min="0" max="1" step="0.01" value="${this.masterVolume}" data-master aria-label="Volume général"><output data-master-value>80%</output></label>
                <div class="transport"><button type="button" data-stop aria-label="Arrêter et vider le mix" disabled>${icon('stop')}</button><button type="button" class="primary" data-play aria-label="Lancer le mix" disabled>${icon('play')}</button></div>
              </div>
              <div class="preset-tools"><span>Mes mix</span><button class="preset-save" type="button" data-save-preset disabled>Enregistrer</button><div class="preset-list" data-preset-list></div></div>
              <form class="preset-form" data-preset-form hidden><label class="sr-only" for="studio-preset-name">Nom du mix</label><input id="studio-preset-name" required maxlength="40" placeholder="Nom du mix"><button type="submit">OK</button><button type="button" data-cancel-preset aria-label="Annuler">×</button></form>
              <div class="timer"><span class="timer-label">${icon('timer')}<span>Arrêt auto.</span></span><div class="timer-options" aria-label="Durée de la session"><button type="button" data-timer="0" class="active">Libre</button><button type="button" data-timer="25">25m</button><button type="button" data-timer="50">50m</button><button type="button" data-timer="90">90m</button></div><span class="timer-display" data-timer-display>--:--</span></div>
              <p class="status" role="status" aria-live="polite" data-status></p>
            </section>
          </section>
          <section class="page music-page" data-page="music" hidden>
            <div class="music-heading"><strong>Vos plateformes musicales</strong><span>Retrouvez vos services favoris dans le Studio.</span></div>
            <form class="link-form" data-link-form><input type="url" required placeholder="Collez un lien Spotify, Deezer, Tidal…" aria-label="Lien de musique"><button type="submit">${icon('link')}<span>Intégrer</span></button></form>
            <div class="service-section"><div class="service-title">Lecteurs compatibles</div><div class="service-list"><span>Spotify</span><span>Deezer</span><span>Tidal</span><span>YouTube Music</span><span>Apple Music</span><span>SoundCloud</span><span>Amazon Music</span></div><p class="service-note">Le lecteur officiel s’affiche ici. La lecture peut nécessiter un compte ou une connexion au service.</p></div>
            <p class="status" role="status" aria-live="polite" data-music-status></p>
            <div class="playlist-heading">Sélections à découvrir</div><div class="playlists" data-playlists></div>
            <div class="music-bottom"><section><h3>Vos favoris</h3><div class="favorite-list" data-favorites></div></section><section class="music-player" data-player><div class="music-empty">${icon('music')}<span>Le lecteur apparaîtra ici.</span></div></section></div>
          </section>
        </section>
        <aside class="island-wrap" aria-label="Lecture en cours">
          <button type="button" class="island-pill" data-island-toggle aria-expanded="false">
            <span class="island-mark">${icon('sound')}</span><span class="island-copy"><span class="island-track" data-island-track>Son en cours</span><span class="island-clock" data-site-clock>--:--</span></span>
            <span class="island-bars" aria-hidden="true">${[7, 11, 5, 14, 8, 12, 6].map((height, index) => `<i style="--bar:${height}px;--delay:${index * -.08}s"></i>`).join('')}</span>
          </button>
          <div class="island-expanded">
            <div><div class="island-detail-title" data-island-detail>Votre mix sonore</div><div class="island-detail-sub" data-island-clock-label>HORLOGE DU SITE</div></div>
            <div class="island-detail-times"><span data-island-site-time>--:--</span><span data-island-audio-time>Sans limite</span></div>
            <div class="island-detail-sub" data-island-audio-label>SON AMBIANT</div>
            <div class="island-actions"><button type="button" data-island-stop aria-label="Arrêter le mix">${icon('stop')}</button><button type="button" data-island-play aria-label="Mettre en pause">${icon('pause')}</button><button type="button" data-island-open aria-label="Ouvrir le Studio">${icon('sound')}</button></div>
          </div>
        </aside>`;
      this.renderCategories();
      this.renderPlaylists();
    }

    bindEvents() {
      this.shadowRoot.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        if (button.matches('[data-close]')) this.close();
        if (button.matches('[data-tab]')) this.switchTab(button.dataset.tab);
        if (button.matches('[data-category]')) this.setCategory(button.dataset.category);
        if (button.matches('[data-sound-id]')) this.toggleSound(button.dataset.soundId);
        if (button.matches('[data-remove]')) this.toggleSound(button.dataset.remove);
        if (button.matches('[data-play], [data-island-play]')) this.togglePlayback();
        if (button.matches('[data-stop], [data-island-stop]')) this.stopMix();
        if (button.matches('[data-surprise]')) this.addRandomSound();
        if (button.matches('[data-timer]')) this.startTimer(Number(button.dataset.timer));
        if (button.matches('[data-island-toggle]')) {
          const expanded = !this.hasAttribute('island-expanded');
          this.toggleAttribute('island-expanded', expanded);
          button.setAttribute('aria-expanded', String(expanded));
        }
        if (button.matches('[data-island-open]')) this.open();
        if (button.matches('[data-save-preset]')) {
          const form = this.shadowRoot.querySelector('[data-preset-form]');
          form.hidden = false;
          form.querySelector('input').focus();
        }
        if (button.matches('[data-cancel-preset]')) this.shadowRoot.querySelector('[data-preset-form]').hidden = true;
        if (button.matches('[data-preset]')) this.loadPreset(Number(button.dataset.preset));
        if (button.matches('[data-delete-preset]')) this.removePreset(Number(button.dataset.deletePreset));
        if (button.matches('[data-playlist]')) this.loadMusic(`https://open.spotify.com/playlist/${button.dataset.playlist}`);
        if (button.matches('[data-favorite]')) this.loadMusic(this.favorites[Number(button.dataset.favorite)]?.url);
        if (button.matches('[data-delete-favorite]')) this.removeFavorite(Number(button.dataset.deleteFavorite));
        if (button.matches('[data-save-favorite]')) this.saveFavorite();
      });

      this.shadowRoot.addEventListener('input', (event) => {
        if (event.target.matches('[data-search]')) {
          this.query = event.target.value.trim().toLocaleLowerCase();
          this.renderSounds();
        }
        if (event.target.matches('[data-volume-id]')) this.setVolume(event.target.dataset.volumeId, Number(event.target.value));
        if (event.target.matches('[data-master]')) this.setMasterVolume(Number(event.target.value));
      });

      this.shadowRoot.querySelector('[data-preset-form]').addEventListener('submit', (event) => {
        event.preventDefault();
        const input = event.currentTarget.querySelector('input');
        const name = input.value.trim().slice(0, 40);
        if (!name || !this.selected.length) return;
        this.presets.push({
          name,
          sounds: this.selected.map(({ id }) => id),
          volumes: Object.fromEntries(this.selected.map(({ id, volume }) => [id, volume])),
        });
        this.persist(PRESETS_KEY, this.presets);
        input.value = '';
        event.currentTarget.hidden = true;
        this.renderPresets();
      });

      this.shadowRoot.querySelector('[data-link-form]').addEventListener('submit', (event) => {
        event.preventDefault();
        this.loadMusic(event.currentTarget.querySelector('input').value);
      });
    }

    renderCategories() {
      const categories = ['all', ...new Set(Object.values(this.sounds).flatMap((sound) => sound.tags || []))];
      this.shadowRoot.querySelector('[data-categories]').innerHTML = categories.map((category) => {
        const label = category === 'all' ? 'Tout' : CATEGORY_NAMES[category] || category;
        return `<button class="chip${category === this.category ? ' active' : ''}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(label)}</button>`;
      }).join('');
    }

    setCategory(category) {
      this.category = category;
      this.renderCategories();
      this.renderSounds();
    }

    renderSounds() {
      const entries = Object.entries(this.sounds).filter(([id, sound]) => {
        if (id === 'none') return false;
        const categoryMatch = this.category === 'all' || (sound.tags || []).includes(this.category);
        return categoryMatch && `${sound.name} ${sound.description || ''}`.toLocaleLowerCase().includes(this.query);
      });
      this.shadowRoot.querySelector('[data-sound-list]').innerHTML = entries.length
        ? entries.map(([id, sound]) => {
          const active = this.selected.some((item) => item.id === id);
          const category = (sound.tags || []).map((tag) => CATEGORY_NAMES[tag] || tag).join(' · ');
          const title = sound.sourceUrl ? `${sound.title || sound.name} — ${sound.creator} · ${sound.license}` : sound.name;
          return `<button type="button" class="sound${active ? ' selected' : ''}" data-sound-id="${escapeHtml(id)}" aria-pressed="${active}" title="${escapeHtml(title)}">
            <span class="sound-mark">${icon('sound')}</span><span class="sound-copy"><span class="sound-name">${escapeHtml(sound.name)}</span><span class="sound-meta">${escapeHtml(category)}${sound.license ? '<span class="sound-license">CC0</span>' : ''}</span></span><span class="sound-action">${active ? icon('check') : icon('plus')}</span>
          </button>`;
        }).join('')
        : '<p class="empty">Aucun son ne correspond à cette recherche.</p>';
    }

    renderMix() {
      const list = this.shadowRoot.querySelector('[data-mix-list]');
      list.innerHTML = this.selected.length
        ? this.selected.map(({ id, volume }) => `<div class="mix-row">
            <span class="mix-row-icon">${icon('sound')}</span><span class="mix-row-name">${escapeHtml(this.sounds[id]?.name || id)}</span>
            <label><span class="sr-only">Volume ${escapeHtml(this.sounds[id]?.name || id)}</span><input type="range" min="0" max="1" step="0.01" value="${volume}" data-volume-id="${escapeHtml(id)}"></label>
            <button class="remove" type="button" data-remove="${escapeHtml(id)}" aria-label="Retirer ${escapeHtml(this.sounds[id]?.name || id)}">×</button>
          </div>`).join('')
        : '<p class="mix-empty">Ajoutez un son pour commencer.</p>';
      this.shadowRoot.querySelector('[data-mix-count]').textContent = `${this.selected.length} / ${MAX_ACTIVE}`;
      this.shadowRoot.querySelector('[data-master]').value = String(this.masterVolume);
      this.shadowRoot.querySelector('[data-master-value]').textContent = `${Math.round(this.masterVolume * 100)}%`;
      this.shadowRoot.querySelector('[data-play]').disabled = !this.selected.length;
      this.shadowRoot.querySelector('[data-stop]').disabled = !this.selected.length;
      this.shadowRoot.querySelector('[data-save-preset]').disabled = !this.selected.length;
      this.shadowRoot.querySelector('[data-play]').innerHTML = icon(this.playing ? 'pause' : 'play');
      this.shadowRoot.querySelector('[data-play]').setAttribute('aria-label', this.playing ? 'Mettre le mix en pause' : 'Lancer le mix');
      this.shadowRoot.querySelector('[data-island-play]').innerHTML = icon(this.playing ? 'pause' : 'play');
      this.shadowRoot.querySelector('[data-island-play]').setAttribute('aria-label', this.playing ? 'Mettre le mix en pause' : 'Reprendre le mix');
      this.shadowRoot.querySelectorAll('[data-timer]').forEach((button) => {
        button.classList.toggle('active', Number(button.dataset.timer) === this.timerDuration);
      });
      this.updateTimerDisplay();
      this.updateIsland();
      this.updateToolbarButton();
    }

    renderPresets() {
      const list = this.shadowRoot.querySelector('[data-preset-list]');
      list.innerHTML = this.presets.length
        ? this.presets.map((preset, index) => `<span class="favorite"><button type="button" data-preset="${index}">${escapeHtml(preset.name)}</button><button type="button" data-delete-preset="${index}" aria-label="Supprimer ${escapeHtml(preset.name)}">×</button></span>`).join('')
        : '<span class="mix-empty">Aucun mix enregistré.</span>';
    }

    renderPlaylists() {
      this.shadowRoot.querySelector('[data-playlists]').innerHTML = PLAYLISTS.map(([name, id]) =>
        `<button type="button" class="playlist" data-playlist="${id}"><span class="playlist-mark">${icon('music')}</span><span class="playlist-copy"><strong>${escapeHtml(name)}</strong><small>Spotify</small></span></button>`
      ).join('');
    }

    renderFavorites() {
      this.shadowRoot.querySelector('[data-favorites]').innerHTML = this.favorites.length
        ? this.favorites.map((favorite, index) => `<span class="favorite"><button type="button" data-favorite="${index}" title="${escapeHtml(favorite.url)}">${escapeHtml(favorite.name)}</button><button type="button" data-delete-favorite="${index}" aria-label="Supprimer ${escapeHtml(favorite.name)}">×</button></span>`).join('')
        : '<span class="mix-empty">Aucun favori.</span>';
    }

    toggleSound(id) {
      const existing = this.selected.find((item) => item.id === id);
      if (existing) {
        this.sounds[id]?.player?.stop();
        this.selected = this.selected.filter((item) => item.id !== id);
        if (!this.selected.length) {
          this.playing = false;
          this.clearTimer();
        }
      } else {
        const sound = this.sounds[id];
        if (!sound) return;
        if (this.selected.length >= MAX_ACTIVE) {
          this.setStatus(`Vous pouvez superposer jusqu’à ${MAX_ACTIVE} sons.`);
          return;
        }
        const studioAlreadyPlaying = this.selected.some(({ id: activeId }) => this.sounds[activeId]?.player?.playing());
        if (!studioAlreadyPlaying) this.stopBackgroundAudio();
        this.selected.push({ id, volume: 0.5 });
        this.playing = true;
        this.playSound(id, 0.5);
      }
      this.saveState();
      this.renderSounds();
      this.renderMix();
      this.renderPresets();
    }

    stopBackgroundAudio() {
      const music = this.music;
      if (!music) return;
      const activeIds = Array.isArray(music.activeSounds) ? [...music.activeSounds] : [];
      Object.values(music.sounds || {}).forEach((sound) => sound.player?.stop());
      if (Array.isArray(music.activeSounds)) music.activeSounds.length = 0;
      music.soundName = 'none';
      if (music.elementEmoji && music.sounds?.none) {
        music.elementEmoji.style.opacity = '1';
        music.elementEmoji.textContent = music.sounds.none.emoji;
      }
      if (music.settingsPlayButton) music.settingsPlayButton.textContent = 'Play';
      music.popup?.querySelectorAll('[data-sound]').forEach((button) => {
        if (activeIds.includes(button.dataset.sound)) button.dataset.active = 'false';
      });
      music.playSoundsButton?.classList.remove('paused');
    }

    playSound(id, volume) {
      const sound = this.sounds[id];
      if (!sound || (!sound.openSource && !this.music?.playSound)) {
        this.setStatus('Le moteur audio du site est indisponible.', true);
        return;
      }
      try {
        if (sound.openSource) {
          if (typeof window.Howl !== 'function') {
            this.playing = this.selected.some(({ id: activeId }) => this.sounds[activeId]?.player?.playing());
            this.setStatus('Le lecteur audio du navigateur est indisponible.', true);
            return;
          }
          if (!sound.player) {
            sound.player = new window.Howl({
              src: [sound.src],
              format: ['mp3'],
              loop: true,
              html5: true,
              preload: false,
            });
          }
          this.watchSoundErrors(id, sound);
          sound.player.volume(volume * this.masterVolume);
          if (!sound.player.playing()) sound.player.play();
          return;
        }
        if (!sound.player || !sound.player.playing()) this.music.playSound(id);
        this.watchSoundErrors(id, sound);
        sound.player?.volume(volume * this.masterVolume);
      } catch (error) {
        console.error(`Studio : lecture impossible pour ${id}.`, error);
        this.playing = this.selected.some(({ id: activeId }) => this.sounds[activeId]?.player?.playing());
        this.setStatus(`Impossible de lancer « ${sound.name} ».`, true);
      }
    }

    watchSoundErrors(id, sound) {
      if (!sound.player?.once || sound._soundRoomListeners) return;
      sound.player.once('loaderror', (_, error) => {
        console.error(`Studio : chargement impossible pour ${id}.`, error);
        sound._soundRoomListeners = false;
        if (sound.openSource) {
          sound.player?.unload();
          sound.player = null;
        }
        this.playing = this.selected.some(({ id: activeId }) => this.sounds[activeId]?.player?.playing());
        this.setStatus(`Impossible de charger le son « ${sound.name} ».`, true);
        this.renderMix();
      });
      sound.player.once('playerror', (_, error) => {
        console.error(`Studio : lecture bloquée pour ${id}.`, error);
        sound._soundRoomListeners = false;
        this.playing = this.selected.some(({ id: activeId }) => this.sounds[activeId]?.player?.playing());
        this.setStatus(`La lecture du son « ${sound.name} » a été bloquée.`, true);
        this.renderMix();
      });
      sound._soundRoomListeners = true;
    }

    setVolume(id, volume) {
      const item = this.selected.find((sound) => sound.id === id);
      if (!item) return;
      item.volume = volume;
      this.sounds[id]?.player?.volume(volume * this.masterVolume);
      this.saveState();
    }

    setMasterVolume(volume) {
      this.masterVolume = volume;
      this.selected.forEach(({ id, volume: layerVolume }) => this.sounds[id]?.player?.volume(layerVolume * volume));
      this.shadowRoot.querySelector('[data-master-value]').textContent = `${Math.round(volume * 100)}%`;
      this.saveState();
    }

    addRandomSound() {
      const available = Object.entries(this.sounds).filter(([id, sound]) =>
        id !== 'none' && !this.selected.some((item) => item.id === id)
      );
      if (!available.length) {
        this.setStatus('Tous les sons disponibles sont déjà dans le mix.');
        return;
      }
      const [id] = available[Math.floor(Math.random() * available.length)];
      this.toggleSound(id);
    }

    togglePlayback() {
      if (!this.selected.length) return;
      this.playing = !this.playing;
      this.selected.forEach(({ id, volume }) => {
        const player = this.sounds[id]?.player;
        if (this.playing) this.playSound(id, volume);
        else player?.pause();
      });
      this.renderMix();
    }

    stopMix() {
      this.clearTimer();
      this.selected.forEach(({ id }) => this.sounds[id]?.player?.stop());
      this.selected = [];
      this.playing = false;
      this.saveState();
      this.renderSounds();
      this.renderMix();
      this.renderPresets();
    }

    clearTimer() {
      clearInterval(this.timerInterval);
      clearTimeout(this.timerFadeTimeout);
      this.timerInterval = null;
      this.timerFadeTimeout = null;
      this.timerDuration = 0;
      this.timerEndsAt = 0;
    }

    startTimer(minutes) {
      this.clearTimer();
      if (minutes && !this.selected.length) {
        this.setStatus('Ajoutez un son avant de lancer le compte à rebours.');
        this.renderMix();
        return;
      }
      this.timerDuration = minutes;
      this.timerEndsAt = minutes ? Date.now() + minutes * 60 * 1000 : 0;
      if (minutes) {
        this.timerInterval = setInterval(() => {
          if (Date.now() >= this.timerEndsAt) {
            this.clearTimer();
            this.selected.forEach(({ id }) => {
              const player = this.sounds[id]?.player;
              if (!player?.playing()) return;
              const current = player.volume();
              if (typeof player.fade === 'function') player.fade(current, 0, 4000);
            });
            this.setStatus('La session se termine en douceur.');
            this.timerFadeTimeout = setTimeout(() => this.stopMix(), 4000);
          } else this.updateTimerDisplay();
        }, 1000);
      }
      this.renderMix();
    }

    updateTimerDisplay() {
      const display = this.shadowRoot.querySelector('[data-timer-display]');
      if (!display) return;
      if (!this.timerEndsAt) {
        display.textContent = '--:--';
        return;
      }
      const remaining = Math.max(0, Math.ceil((this.timerEndsAt - Date.now()) / 1000));
      display.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
    }

    loadPreset(index) {
      const preset = this.presets[index];
      if (!preset) return;
      const availableIds = (preset.sounds || [])
        .filter((id) => this.sounds[id])
        .slice(0, MAX_ACTIVE);
      if (!availableIds.length) {
        this.setStatus('Ce mix ne contient aucun son gratuit disponible.', true);
        return;
      }
      this.selected.forEach(({ id }) => this.sounds[id]?.player?.stop());
      this.selected = availableIds.map((id) => {
        const volume = Number(preset.volumes?.[id]);
        return { id, volume: Number.isFinite(volume) ? Math.max(0, Math.min(1, volume)) : 0.5 };
      });
      this.playing = this.selected.length > 0;
      this.selected.forEach(({ id, volume }) => this.playSound(id, volume));
      this.saveState();
      this.renderSounds();
      this.renderMix();
    }

    removePreset(index) {
      this.presets.splice(index, 1);
      this.persist(PRESETS_KEY, this.presets);
      this.renderPresets();
    }

    loadMusic(value) {
      const track = parseMusicUrl(value || '');
      if (!track) {
        this.setStatus('Lien non reconnu. Utilisez un lien Spotify, Deezer, Tidal, YouTube, Apple Music, SoundCloud ou Amazon Music.', true);
        return;
      }
      this.currentTrack = track;
      this.renderMusicPlayer();
      this.updateIsland();
      this.setStatus(`${track.platform} est prêt.`);
    }

    renderMusicPlayer() {
      const player = this.shadowRoot.querySelector('[data-player]');
      if (!this.currentTrack) return;
      player.innerHTML = `<div class="music-player-heading"><span>${escapeHtml(this.currentTrack.platform)}</span><button class="save-favorite" type="button" data-save-favorite>${icon('plus')}<span>Favori</span></button></div>
        <input class="favorite-name" type="text" maxlength="60" placeholder="Nommer ce favori" aria-label="Nom du favori" data-favorite-name>
        <iframe title="Lecteur ${escapeHtml(this.currentTrack.title)}" src="${escapeHtml(this.currentTrack.embed)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; clipboard-write; picture-in-picture" allowfullscreen></iframe>`;
    }

    saveFavorite() {
      if (!this.currentTrack) return;
      if (this.favorites.some((favorite) => favorite.url === this.currentTrack.url)) {
        this.setStatus('Ce lien est déjà dans vos favoris.');
        return;
      }
      const input = this.shadowRoot.querySelector('[data-favorite-name]');
      const fallbackName = `${this.currentTrack.platform} · ${this.currentTrack.url.split('/').filter(Boolean).pop() || 'Ma musique'}`;
      this.favorites.unshift({
        url: this.currentTrack.url,
        platform: this.currentTrack.platform,
        name: input.value.trim().slice(0, 60) || fallbackName,
      });
      this.favorites = this.favorites.slice(0, 30);
      if (this.persist(FAVORITES_KEY, this.favorites)) {
        input.value = '';
        this.renderFavorites();
        this.setStatus('Ajouté à vos favoris.');
      }
    }

    removeFavorite(index) {
      this.favorites.splice(index, 1);
      this.persist(FAVORITES_KEY, this.favorites);
      this.renderFavorites();
    }

    switchTab(name) {
      this.shadowRoot.querySelectorAll('[data-tab]').forEach((button) => {
        button.setAttribute('aria-selected', String(button.dataset.tab === name));
      });
      this.shadowRoot.querySelectorAll('[data-page]').forEach((page) => {
        page.hidden = page.dataset.page !== name;
      });
      this.positionPopover();
    }

    setStatus(message, isError = false) {
      const musicPage = this.shadowRoot.querySelector('[data-page="music"]');
      const status = this.shadowRoot.querySelector(musicPage && !musicPage.hidden ? '[data-music-status]' : '[data-status]');
      if (!status) return;
      status.textContent = message;
      status.classList.toggle('error', isError);
      clearTimeout(this._statusTimer);
      this._statusTimer = setTimeout(() => {
        status.textContent = '';
        status.classList.remove('error');
      }, 5000);
    }

    addToolbarButton() {
      const addButton = (bar) => {
        if (bar.querySelector('[data-nestafocus-sounds]')) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'dash-button';
        button.dataset.nestafocusSounds = 'true';
        button.setAttribute('aria-label', 'Ouvrir le Studio sonore');
        button.title = 'Studio sonore — Ambiance et musique';
        button.innerHTML = icon('sound');
        button.addEventListener('click', () => this.hasAttribute('open') ? this.close() : this.open());
        bar.appendChild(button);
      };
      const findBar = () => document.getElementById('bottom-left') || document.getElementById('bottom-right');
      const bar = findBar();
      if (bar) addButton(bar);
      else {
        const observer = new MutationObserver(() => {
          const target = findBar();
          if (!target) return;
          addButton(target);
          observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        this._toolbarObserver = observer;
      }
    }

    positionPopover() {
      const popover = this.shadowRoot.querySelector('[data-popover]');
      const button = document.querySelector('[data-nestafocus-sounds]');
      if (!popover || !button) return;
      const rect = button.getBoundingClientRect();
      if (window.innerWidth <= 760) {
        popover.style.top = '68px';
        popover.style.right = '12px';
        popover.style.bottom = 'auto';
        popover.style.left = '12px';
        popover.style.height = `${Math.max(300, Math.min(460, window.innerHeight - 100))}px`;
        return;
      }
      popover.style.top = 'auto';
      const bottom = Math.max(18, window.innerHeight - rect.top + 9);
      const panelHeight = Math.min(650, window.innerHeight - 100);
      const panelWidth = popover.getBoundingClientRect().width;
      const maxLeft = window.innerWidth - panelWidth - 12;
      let left = Math.max(12, Math.min(rect.left, maxLeft));
      const clock = document.querySelector('flocus-timedisplay .text-clock')?.getBoundingClientRect();
      const panelTop = window.innerHeight - bottom - panelHeight;
      if (clock && panelTop < clock.bottom && panelTop + panelHeight > clock.top
        && left < clock.right && left + panelWidth > clock.left) {
        const alternatives = [clock.left - panelWidth - 16, clock.right + 16]
          .filter((candidate) => candidate >= 12 && candidate <= maxLeft);
        if (alternatives.length) left = alternatives.sort((a, b) => Math.abs(a - rect.left) - Math.abs(b - rect.left))[0];
      }
      popover.style.bottom = `${bottom}px`;
      popover.style.left = `${left}px`;
      popover.style.right = 'auto';
      popover.style.height = `${panelHeight}px`;
    }

    updateIslandClock() {
      const clock = document.querySelector('flocus-timedisplay .text-clock');
      const text = clock?.textContent?.trim().replace(/\s+/g, ' ') || '--:--';
      const mode = document.body.dataset.dashboardMode === 'focus' ? 'MINUTEUR FOCUS' : 'HORLOGE DU SITE';
      const clockDisplay = this.shadowRoot.querySelector('[data-site-clock]');
      const islandClock = this.shadowRoot.querySelector('[data-island-site-time]');
      const label = this.shadowRoot.querySelector('[data-island-clock-label]');
      if (clockDisplay) clockDisplay.textContent = text;
      if (islandClock) islandClock.textContent = text;
      if (label) label.textContent = mode;
      const timer = this.shadowRoot.querySelector('[data-island-audio-time]');
      if (timer) timer.textContent = this.timerEndsAt ? this.shadowRoot.querySelector('[data-timer-display]').textContent : 'Sans limite';
    }

    updateIsland() {
      const hasAudio = this.selected.length > 0 || Boolean(this.currentTrack);
      this.toggleAttribute('has-audio', hasAudio);
      this.toggleAttribute('playing', this.playing);
      if (!hasAudio) {
        this.removeAttribute('island-expanded');
        this.shadowRoot.querySelector('[data-island-toggle]').setAttribute('aria-expanded', 'false');
      }
      const names = this.selected.map(({ id }) => this.sounds[id]?.name).filter(Boolean);
      const title = names.length ? names.join(' · ') : this.currentTrack?.platform || 'Studio sonore';
      this.shadowRoot.querySelector('[data-island-track]').textContent = title;
      this.shadowRoot.querySelector('[data-island-detail]').textContent = title;
      this.shadowRoot.querySelector('[data-island-audio-label]').textContent = this.currentTrack && !names.length ? 'MUSIQUE' : this.playing ? 'SON AMBIANT · EN COURS' : 'SON AMBIANT · EN PAUSE';
      const toggle = this.shadowRoot.querySelector('[data-island-toggle]');
      toggle.setAttribute('aria-label', this.hasAttribute('island-expanded') ? 'Réduire le lecteur' : `Afficher le lecteur${title ? ` : ${title}` : ''}`);
      this.shadowRoot.querySelector('[data-island-stop]').disabled = !this.selected.length;
      this.shadowRoot.querySelector('[data-island-play]').disabled = !this.selected.length;
      this.updateIslandClock();
    }

    open() {
      this._previousFocus = document.activeElement;
      this.positionPopover();
      this.setAttribute('open', '');
      this.shadowRoot.querySelector('[data-close]').focus();
      this.updateToolbarButton();
    }

    close() {
      this.removeAttribute('open');
      this.removeAttribute('island-expanded');
      this.shadowRoot.querySelector('[data-island-toggle]')?.setAttribute('aria-expanded', 'false');
      this._previousFocus?.focus?.();
      this.updateToolbarButton();
    }

    updateToolbarButton() {
      const button = document.querySelector('[data-nestafocus-sounds]');
      if (!button) return;
      button.classList.toggle('active', this.playing || this.hasAttribute('open'));
      button.setAttribute('aria-label', this.selected.length
        ? `Ouvrir le Studio sonore, ${this.selected.length} sons actifs`
        : 'Ouvrir le Studio sonore');
    }

    disconnectedCallback() {
      document.removeEventListener('keydown', this._keyHandler);
      document.removeEventListener('pointerdown', this._outsideHandler);
      window.removeEventListener('resize', this._resizeHandler);
      this._toolbarObserver?.disconnect();
      clearTimeout(this._statusTimer);
      clearInterval(this.clockInterval);
      this.clearTimer();
    }
  }

  const outerStyle = document.createElement('style');
  outerStyle.textContent = `
    .dash-button[data-nestafocus-sounds] svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .dash-button[data-nestafocus-sounds].active{color:#f66624!important}
  `;
  document.head.appendChild(outerStyle);

  customElements.define('sounds-studio', SoundsStudio);
  window.SoundsStudio = SoundsStudio;
})();
