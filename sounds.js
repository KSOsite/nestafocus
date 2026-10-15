// ============================================
// SOUNDS STUDIO - Fichier unique complet
// Icônes + CSS + Composant
// ============================================
(() => {
  'use strict';
  
  const STORAGE_KEY = 'nestafocus_sounds_v3';
  const PRESETS_KEY = 'nestafocus_sound_presets_v3';
  const FAVORITES_KEY = 'nestafocus_music_favorites_v1';
  const MAX_ACTIVE = 5;
  
  // ============================================
  // ICÔNES SVG
  // ============================================
  const ICONS = {
    // === Sons ===
    rain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 13v8"/><path d="M8 13v8"/><path d="M12 15v8"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>',
    ocean: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
    cafe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>',
    airplane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    exam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" x2="15" y1="13" y2="13"/><line x1="9" x2="15" y1="17" y2="17"/><line x1="9" x2="13" y1="9" y2="9"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    taxi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4"/><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>',
    rainLight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 13v8"/><path d="M8 13v8"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>',
    rainHeavy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>',
    thunderstorm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/></svg>',
    fireplace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    campfire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3"/><path d="m5.636 5.636 2.122 2.122"/><path d="m18.364 5.636-2.122 2.122"/><path d="M10 17h4"/><path d="M6 21h12"/><path d="M8 17c0-4 4-6 4-10 0 4 4 6 4 10"/></svg>',
    office: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
    wind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>',
    whiteNoise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2l2-6 2 12 2-9 2 6 2-3 2 2 2-4 2 6 2-3 2 1"/></svg>',
    pinkNoise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    brownNoise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h3l3-6 3 12 3-9 3 6"/></svg>',
    binaural: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="3"/><circle cx="15" cy="12" r="3"/><path d="M9 15v3"/><path d="M15 15v3"/><path d="M9 6v3"/><path d="M15 6v3"/></svg>',
    streetCafe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/></svg>',
    countryside: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    deepSea: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/><circle cx="12" cy="12" r="2"/></svg>',
    airConditioner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2"/><path d="M6 6h.01"/><path d="M10 6h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6 14v6"/><path d="M12 14v6"/><path d="M18 14v6"/></svg>',
    fan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 10c0-3 2-5 4-5s3 1 3 3-2 3-5 3"/><path d="M14 12c3 0 5 2 5 4s-1 3-3 3-3-2-3-5"/><path d="M12 14c0 3-2 5-4 5s-3-1-3-3 2-3 5-3"/><path d="M10 12c-3 0-5-2-5-4s1-3 3-3 3 2 3 5"/></svg>',
    summerNight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    park: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 12h6v9h6v-9h6z"/></svg>',
    airport: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12h-8"/><path d="M3 12h4"/><circle cx="14" cy="12" r="3"/><path d="M14 9V6"/><path d="M14 15v3"/></svg>',
    underwater: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
    birds: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>',
    waterfall: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16"/><path d="M4 8h16"/><path d="M8 12h8"/><path d="M10 16h4"/><path d="M11 20h2"/></svg>',
    rainTent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 21 12 3l8.5 18"/><path d="M12 3v18"/><path d="M6 12h12"/><path d="M8 8h8"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M6 10h0"/><path d="M10 10h0"/><path d="M14 10h0"/><path d="M18 10h0"/><path d="M6 14h0"/><path d="M18 14h0"/><path d="M10 14h4"/></svg>',
    whales: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M4 18c4 0 8-2 8-6"/><path d="M20 18c-4 0-8-2-8-6"/><circle cx="9" cy="7" r="1"/></svg>',
    kitchen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
    bowling: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="12" cy="14" r="1"/></svg>',
    recordPlayer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><path d="M12 12 20 4"/><circle cx="20" cy="4" r="1"/></svg>',
    outerSpace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m5 5 2 2"/><path d="m17 17 2 2"/><path d="m19 5-2 2"/><path d="m7 17-2 2"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    cat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>',
    
    // === UI ===
    headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    dice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 8h.01"/><path d="M16 8h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/><path d="M12 12h.01"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    musicNote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>',
    
    // === Plateformes ===
    spotify: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    youtubeMusic: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zM9.684 15.072V8.928L15.144 12l-5.46 3.072z"/></svg>',
    appleMusic: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.5 3.5c-.5-.1-1-.2-1.5-.2-2.9 0-5.3 2.1-5.7 4.9-.1.4-.1.8-.1 1.2v6.1c-.6-.4-1.4-.6-2.2-.6-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-6.1c.6.4 1.4.6 2.2.6 2.2 0 4-1.8 4-4 0-2-1.5-3.6-3.4-3.9z"/></svg>',
    soundcloud: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M1.175 12.225c-.051 0-.094.046-.101.096l-.203 2.766.203 2.644c.007.05.05.096.101.096s.095-.046.101-.096l.234-2.644-.234-2.766c-.006-.05-.05-.096-.101-.096zm1.09-1.318c-.066 0-.118.058-.125.122l-.271 4.076.271 2.604c.007.064.059.122.125.122s.118-.058.125-.122l.305-2.604-.305-4.076c-.007-.064-.059-.122-.125-.122zm1.148-.767c-.077 0-.14.068-.147.144l-.298 4.857.298 2.567c.007.076.07.144.147.144s.14-.068.147-.144l.317-2.567-.317-4.857c-.007-.076-.07-.144-.147-.144zm1.194-.565c-.089 0-.161.078-.169.166l-.318 5.422.318 2.53c.008.088.08.166.169.166s.161-.078.169-.166l.335-2.53-.335-5.422c-.008-.088-.08-.166-.169-.166zm1.262-.223c-.101 0-.183.09-.191.189l-.339 5.645.339 2.513c.008.099.09.189.191.189s.183-.09.191-.189l.346-2.513-.346-5.645c-.008-.099-.09-.189-.191-.189zm1.273 5.84l.353 2.498c.008.109.1.209.211.209s.203-.1.211-.209l.36-2.498-.36-5.757c-.008-.109-.1-.209-.211-.209s-.203.1-.211.209l-.353 5.757zm1.351.067l.367 2.444c.008.12.111.231.234.231s.226-.111.234-.231l.374-2.444-.374-5.91c-.008-.12-.111-.231-.234-.231s-.226.111-.234.231l-.367 5.91zm1.396.054l.381 2.396c.009.131.121.253.255.253s.246-.122.255-.253l.388-2.396-.388-6.06c-.009-.131-.121-.253-.255-.253s-.246.122-.255.253l-.381 6.06zm1.42.03l.388 2.366c.009.141.131.273.277.273s.268-.132.277-.273l.395-2.366-.395-6.09c-.009-.141-.131-.273-.277-.273s-.268.132-.277.273l-.388 6.09zM15.75 3.5c-.9 0-1.8.2-2.6.5-.2.1-.3.3-.3.5v10.6c0 .2.1.4.4.5.5.1 1 .1 1.5.1 4.4 0 8-3.6 8-8s-3.6-8-7-8z"/></svg>',
    amazonMusic: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-1.5 14.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5c0-1.4 1.1-2.5 2.5-2.5.5 0 1 .1 1.3.4V8.7l5.3-1.1v6.9c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5c0-1.4 1.1-2.5 2.5-2.5.5 0 1 .1 1.3.4v-1.9l-2.9.6v2.9z"/></svg>',
  };
  
  // ============================================
  // MAPPING SON → ICÔNE
  // ============================================
  const SOUND_ICON_MAP = {
    rain: 'rain',
    ocean: 'ocean',
    cafe: 'cafe',
    AirplaneCabin: 'airplane',
    ExamHall: 'exam',
    CommuterTrain: 'train',
    JapaneseLibrary: 'library',
    NYCMorning: 'taxi',
    LightRain: 'rainLight',
    HeavyRain: 'rainHeavy',
    Thunderstorm: 'thunderstorm',
    Fireplace: 'fireplace',
    Campfire: 'campfire',
    Office: 'office',
    Wind: 'wind',
    WhiteNoise: 'whiteNoise',
    PinkNoise: 'pinkNoise',
    BrownNoise: 'brownNoise',
    WavesGamma: 'binaural',
    WavesBeta: 'binaural',
    WavesAlpha: 'binaural',
    WavesTheta: 'binaural',
    WavesDelta: 'binaural',
    StreetCafe: 'streetCafe',
    CountrysideMorning: 'countryside',
    DeepSea: 'deepSea',
    AirConditioner: 'airConditioner',
    RoomFan: 'fan',
    SummerNight: 'summerNight',
    CentralPark: 'park',
    AirportTerminal: 'airport',
    Underwater: 'underwater',
    BirdsInWoods: 'birds',
    Waterfall: 'waterfall',
    LightRainOnTent: 'rainTent',
    LaptopKeyboard: 'keyboard',
    Whales: 'whales',
    HomeKitchen: 'kitchen',
    BowlingAlley: 'bowling',
    RecordPlayerStatic: 'recordPlayer',
    OuterSpaceRumble: 'outerSpace',
    ClockTicking: 'clock',
    CatPurr: 'cat',
  };
  
  // ============================================
  // PLAYLISTS PRÉDÉFINIES
  // ============================================
  const PLAYLISTS = {
    lofi: { name: 'Lofi', uri: 'spotify:playlist:4Zjli1P13J5mmSCD5iKAXK' },
    rainylofi: { name: 'Rainy Day Lofi', uri: 'spotify:playlist:0owPbYZr8bqzFfpzLmP8UV' },
    pariscafe: { name: 'Paris Café', uri: 'spotify:playlist:0VvruOaNjMu1B57ZefMf7B' },
    flocuspicks: { name: 'Focus Picks', uri: 'spotify:playlist:4wTxU32MgaTXDz1JlcH08C' },
    relaxingpiano: { name: 'Relaxing Piano', uri: 'spotify:playlist:1IE734A2agfLVvkOcL02Al' },
    games: { name: 'Video Game Music', uri: 'spotify:playlist:022leh1qff2ArTYAAocO9i' },
    jazzhop: { name: 'Jazzhop', uri: 'spotify:playlist:2kzTQa3FcDDlJhhITcIBpX' },
    holidaylofi: { name: 'Holiday Lofi', uri: 'spotify:playlist:0MjjGoktVwQ9npk9almPWn' },
  };
  
  // ============================================
  // CSS (injecté dans le head)
  // ============================================
  const STYLE_ID = 'nestafocus-sounds-styles';
  
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* ===== OVERLAY ===== */
      .sounds-studio-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(8px);
        z-index: 999;
        opacity: 0; visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .sounds-studio-overlay.show { opacity: 1; visibility: visible; }
      
      /* ===== MODAL ===== */
      .sounds-studio {
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%,-50%) scale(0.95);
        width: min(900px, 92vw); height: min(680px, 88vh);
        background: rgba(20,20,25,0.85);
        backdrop-filter: blur(24px) saturate(120%);
        -webkit-backdrop-filter: blur(24px) saturate(120%);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        z-index: 1000;
        display: flex; flex-direction: column;
        overflow: hidden;
        opacity: 0; visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease, transform 0.25s cubic-bezier(0.4,0,0.2,1);
        box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #fff;
      }
      .sounds-studio.show {
        opacity: 1; visibility: visible;
        transform: translate(-50%,-50%) scale(1);
      }
      
      /* ===== HEADER ===== */
      .ss-header {
        display: flex; align-items: center; gap: 0.75rem;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
      }
      .ss-header-icon {
        width: 36px; height: 36px;
        border-radius: 10px;
        background: linear-gradient(135deg,#f66624,#ff8a4c);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 4px 12px rgba(246,102,36,0.3);
      }
      .ss-header-icon svg { width: 20px; height: 20px; stroke: #fff; }
      .ss-header-text { flex: 1; min-width: 0; }
      .ss-header-text h2 {
        font-size: 1.125rem; font-weight: 700;
        margin: 0; letter-spacing: -0.02em; color: #fff;
      }
      .ss-header-text p {
        font-size: 0.8125rem; color: rgba(255,255,255,0.5);
        margin: 0.125rem 0 0 0;
      }
      .ss-close {
        width: 32px; height: 32px;
        border-radius: 8px;
        background: rgba(255,255,255,0.05);
        border: none;
        color: rgba(255,255,255,0.6);
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }
      .ss-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
      .ss-close svg { width: 18px; height: 18px; }
      
      /* ===== TABS ===== */
      .ss-tabs {
        display: flex; gap: 0.25rem;
        padding: 0 1.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
      }
      .ss-tab {
        position: relative;
        padding: 0.875rem 1rem;
        background: transparent; border: none;
        color: rgba(255,255,255,0.5);
        font-size: 0.875rem; font-weight: 600;
        font-family: inherit; cursor: pointer;
        transition: color 0.15s ease;
        display: flex; align-items: center; gap: 0.5rem;
      }
      .ss-tab:hover { color: rgba(255,255,255,0.8); }
      .ss-tab.active { color: #fff; }
      .ss-tab.active::after {
        content: ""; position: absolute;
        bottom: -1px; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg,#f66624,#ff8a4c);
        border-radius: 2px 2px 0 0;
      }
      .ss-tab svg { width: 16px; height: 16px; }
      
      .ss-tab-content { display: none; flex: 1; overflow: hidden; flex-direction: column; }
      .ss-tab-content.active { display: flex; }
      
      /* ===== TOOLBAR ===== */
      .ss-toolbar {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
        display: flex; flex-direction: column; gap: 0.75rem;
      }
      .ss-search {
        display: flex; align-items: center; gap: 0.5rem;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        padding: 0.5rem 0.75rem;
        transition: border-color 0.15s ease;
      }
      .ss-search:focus-within { border-color: rgba(246,102,36,0.5); }
      .ss-search svg { width: 16px; height: 16px; stroke: rgba(255,255,255,0.4); flex-shrink: 0; }
      .ss-search input {
        flex: 1; background: transparent; border: none; outline: none;
        color: #fff; font-size: 0.875rem; font-family: inherit;
      }
      .ss-search input::placeholder { color: rgba(255,255,255,0.35); }
      .ss-filters { display: flex; gap: 0.375rem; flex-wrap: wrap; }
      .ss-chip {
        padding: 0.375rem 0.75rem;
        border-radius: 100px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.6);
        font-size: 0.75rem; font-weight: 500;
        cursor: pointer; transition: all 0.15s ease;
        white-space: nowrap;
      }
      .ss-chip:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); }
      .ss-chip.active {
        background: linear-gradient(135deg,#f66624,#ff8a4c);
        border-color: transparent; color: #fff;
        box-shadow: 0 2px 8px rgba(246,102,36,0.3);
      }
      
      /* ===== BODY ===== */
      .ss-body {
        flex: 1; overflow-y: auto;
        padding: 1rem 1.5rem;
        display: flex; flex-direction: column; gap: 1rem;
      }
      .ss-body::-webkit-scrollbar { width: 6px; }
      .ss-body::-webkit-scrollbar-track { background: transparent; }
      .ss-body::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.15); border-radius: 3px;
      }
      .ss-body::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
      
      /* ===== GRILLE ===== */
      .ss-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(140px,1fr));
        gap: 0.75rem;
      }
      .ss-sound {
        position: relative;
        display: flex; flex-direction: column; align-items: center;
        gap: 0.5rem; padding: 1rem 0.75rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        text-align: center; user-select: none;
      }
      .ss-sound:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(255,255,255,0.12);
        transform: translateY(-2px);
      }
      .ss-sound.active {
        background: linear-gradient(135deg,rgba(246,102,36,0.15),rgba(255,138,76,0.1));
        border-color: rgba(246,102,36,0.5);
        box-shadow: 0 4px 16px rgba(246,102,36,0.2);
      }
      .ss-sound.active::after {
        content: ""; position: absolute; inset: -1px;
        border-radius: 12px;
        border: 1px solid rgba(246,102,36,0.5);
        animation: ss-pulse 2s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes ss-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      .ss-sound-icon {
        width: 40px; height: 40px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 10px;
        background: rgba(255,255,255,0.05);
        transition: all 0.2s ease;
      }
      .ss-sound.active .ss-sound-icon { background: rgba(246,102,36,0.2); }
      .ss-sound-icon svg {
        width: 22px; height: 22px;
        stroke: rgba(255,255,255,0.7); fill: none; stroke-width: 1.75;
        transition: stroke 0.2s ease;
      }
      .ss-sound.active .ss-sound-icon svg { stroke: #ff8a4c; }
      .ss-sound-name {
        font-size: 0.75rem; font-weight: 500;
        color: rgba(255,255,255,0.8); line-height: 1.3;
        max-width: 100%; overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .ss-sound.active .ss-sound-name { color: #fff; font-weight: 600; }
      
      /* ===== ACTIFS ===== */
      .ss-active-section {
        display: flex; flex-direction: column; gap: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(255,255,255,0.06);
      }
      .ss-active-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0.25rem;
      }
      .ss-active-header h3 {
        font-size: 0.75rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.08em;
        color: rgba(255,255,255,0.4); margin: 0;
      }
      .ss-active-count {
        font-size: 0.6875rem; font-weight: 600;
        color: rgba(255,255,255,0.5);
        padding: 0.125rem 0.5rem;
        border-radius: 100px;
        background: rgba(255,255,255,0.05);
      }
      .ss-active-count.max { color: #ff8a4c; background: rgba(246,102,36,0.15); }
      .ss-active-list { display: flex; flex-direction: column; gap: 0.375rem; }
      .ss-active-item {
        display: flex; align-items: center; gap: 0.75rem;
        padding: 0.5rem 0.75rem;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 10px;
        animation: ss-slide-in 0.25s ease;
      }
      @keyframes ss-slide-in {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ss-active-icon {
        width: 28px; height: 28px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 8px;
        background: rgba(246,102,36,0.15);
        flex-shrink: 0;
      }
      .ss-active-icon svg {
        width: 16px; height: 16px;
        stroke: #ff8a4c; fill: none; stroke-width: 1.75;
      }
      .ss-active-name {
        flex: 1; font-size: 0.8125rem; font-weight: 500;
        color: #fff; min-width: 0;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .ss-active-volume {
        width: 100px; height: 4px;
        border-radius: 2px;
        background: rgba(255,255,255,0.1);
        position: relative; cursor: pointer; flex-shrink: 0;
      }
      .ss-active-volume-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        border-radius: 2px;
        background: linear-gradient(90deg,#f66624,#ff8a4c);
        transition: width 0.1s ease; pointer-events: none;
      }
      .ss-active-volume-thumb {
        position: absolute; top: 50%;
        transform: translate(-50%,-50%);
        width: 12px; height: 12px;
        border-radius: 50%; background: #fff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        pointer-events: none; opacity: 0;
        transition: opacity 0.15s ease;
      }
      .ss-active-volume:hover .ss-active-volume-thumb { opacity: 1; }
      .ss-active-remove {
        width: 24px; height: 24px;
        border-radius: 6px; background: transparent; border: none;
        color: rgba(255,255,255,0.4); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s ease; flex-shrink: 0;
      }
      .ss-active-remove:hover { background: rgba(255,59,48,0.15); color: #ff3b30; }
      .ss-active-remove svg { width: 14px; height: 14px; }
      .ss-empty {
        padding: 2rem 1rem; text-align: center;
        color: rgba(255,255,255,0.3); font-size: 0.8125rem;
      }
      
      /* ===== FOOTER ===== */
      .ss-footer {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid rgba(255,255,255,0.06);
        background: rgba(0,0,0,0.2);
        flex-shrink: 0;
      }
      .ss-btn {
        display: inline-flex; align-items: center; gap: 0.5rem;
        padding: 0.625rem 1rem; border-radius: 10px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.8);
        font-size: 0.8125rem; font-weight: 500;
        font-family: inherit; cursor: pointer;
        transition: all 0.15s ease; white-space: nowrap;
      }
      .ss-btn:hover:not(:disabled) {
        background: rgba(255,255,255,0.1); color: #fff;
        border-color: rgba(255,255,255,0.15);
      }
      .ss-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .ss-btn.primary {
        background: linear-gradient(135deg,#f66624,#ff8a4c);
        border-color: transparent; color: #fff;
        box-shadow: 0 4px 12px rgba(246,102,36,0.3);
      }
      .ss-btn.primary:hover:not(:disabled) {
        background: linear-gradient(135deg,#ff7a3d,#ff9a5c);
        box-shadow: 0 6px 16px rgba(246,102,36,0.4);
      }
      .ss-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
      .ss-btn-spacer { flex: 1; }
      
      /* ===== PRESETS ===== */
      .ss-preset-menu {
        position: absolute; bottom: 100%; left: 0;
        margin-bottom: 0.5rem; min-width: 220px;
        background: rgba(30,30,35,0.98);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 0.5rem;
        box-shadow: 0 12px 32px rgba(0,0,0,0.5);
        opacity: 0; visibility: hidden;
        transform: translateY(4px);
        transition: all 0.2s ease;
        z-index: 10;
      }
      .ss-preset-menu.show {
        opacity: 1; visibility: visible; transform: translateY(0);
      }
      .ss-preset-item {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.5rem 0.625rem; border-radius: 8px;
        cursor: pointer; transition: background 0.15s ease;
        font-size: 0.8125rem;
      }
      .ss-preset-item:hover { background: rgba(255,255,255,0.08); }
      .ss-preset-item-icon { display: flex; gap: 0.125rem; flex-shrink: 0; }
      .ss-preset-item-icon svg {
        width: 14px; height: 14px;
        stroke: #ff8a4c; fill: none; stroke-width: 2;
      }
      .ss-preset-item-name {
        flex: 1; color: #fff;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .ss-preset-item-remove {
        width: 20px; height: 20px; border-radius: 5px;
        background: transparent; border: none;
        color: rgba(255,255,255,0.3); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .ss-preset-item-remove:hover { background: rgba(255,59,48,0.15); color: #ff3b30; }
      .ss-preset-item-remove svg { width: 12px; height: 12px; }
      .ss-preset-empty {
        padding: 1rem; text-align: center;
        color: rgba(255,255,255,0.4); font-size: 0.75rem;
      }
      
      /* ===== MUSIC LAYOUT ===== */
      .ss-music-layout {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 1rem; padding: 1rem 1.5rem;
        flex: 1; overflow: hidden; min-height: 0;
      }
      .ss-music-left, .ss-music-right {
        display: flex; flex-direction: column; gap: 1rem;
        min-height: 0; overflow-y: auto;
      }
      .ss-music-right { overflow: hidden; }
      .ss-section { display: flex; flex-direction: column; gap: 0.75rem; }
      .ss-section-header {
        display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
      }
      .ss-section-header h3 {
        font-size: 0.8125rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.06em;
        color: rgba(255,255,255,0.5); margin: 0;
      }
      .ss-count {
        font-size: 0.6875rem; color: rgba(255,255,255,0.4);
        padding: 0.125rem 0.5rem; border-radius: 100px;
        background: rgba(255,255,255,0.05);
      }
      .ss-playlists-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(120px,1fr));
        gap: 0.5rem;
      }
      .ss-playlist {
        display: flex; flex-direction: column; align-items: center;
        gap: 0.375rem; padding: 0.75rem 0.5rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 10px; cursor: pointer;
        transition: all 0.15s ease; text-align: center;
      }
      .ss-playlist:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(255,255,255,0.12);
        transform: translateY(-2px);
      }
      .ss-playlist.active {
        background: linear-gradient(135deg,rgba(246,102,36,0.15),rgba(255,138,76,0.1));
        border-color: rgba(246,102,36,0.5);
      }
      .ss-playlist-icon {
        width: 36px; height: 36px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 10px;
        background: rgba(255,255,255,0.05);
      }
      .ss-playlist.active .ss-playlist-icon { background: rgba(246,102,36,0.2); }
      .ss-playlist-icon svg { width: 20px; height: 20px; fill: rgba(255,255,255,0.7); }
      .ss-playlist.active .ss-playlist-icon svg { fill: #ff8a4c; }
      .ss-playlist-name {
        font-size: 0.6875rem; font-weight: 500;
        color: rgba(255,255,255,0.8); line-height: 1.3;
        max-width: 100%; overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .ss-playlist.active .ss-playlist-name { color: #fff; font-weight: 600; }
      
      /* ===== URL FORM ===== */
      .ss-url-form { display: flex; gap: 0.5rem; }
      .ss-url-input {
        flex: 1; padding: 0.625rem 0.875rem;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px; color: #fff;
        font-size: 0.8125rem; font-family: inherit;
        outline: none; transition: border-color 0.15s ease;
        min-width: 0;
      }
      .ss-url-input:focus { border-color: rgba(246,102,36,0.5); }
      .ss-url-input::placeholder { color: rgba(255,255,255,0.35); }
      .ss-url-btn {
        display: inline-flex; align-items: center; gap: 0.375rem;
        padding: 0.625rem 1rem; border-radius: 10px;
        background: linear-gradient(135deg,#f66624,#ff8a4c);
        border: none; color: #fff;
        font-size: 0.8125rem; font-weight: 600;
        font-family: inherit; cursor: pointer;
        transition: all 0.15s ease; white-space: nowrap;
        box-shadow: 0 4px 12px rgba(246,102,36,0.3);
      }
      .ss-url-btn:hover {
        background: linear-gradient(135deg,#ff7a3d,#ff9a5c);
        box-shadow: 0 6px 16px rgba(246,102,36,0.4);
      }
      .ss-url-btn svg { width: 14px; height: 14px; }
      .ss-url-error { font-size: 0.75rem; color: #ff6b6b; padding: 0.25rem 0; }
      .ss-url-success { font-size: 0.75rem; color: #4ade80; padding: 0.25rem 0; }
      
      /* ===== FAVORITES ===== */
      .ss-favorites { display: flex; flex-direction: column; gap: 0.375rem; }
      .ss-favorite {
        display: flex; align-items: center; gap: 0.625rem;
        padding: 0.5rem 0.625rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 8px; cursor: pointer;
        transition: all 0.15s ease;
      }
      .ss-favorite:hover {
        background: rgba(255,255,255,0.06);
        border-color: rgba(255,255,255,0.12);
      }
      .ss-favorite-platform {
        width: 24px; height: 24px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
        flex-shrink: 0;
      }
      .ss-favorite-platform svg { width: 14px; height: 14px; fill: rgba(255,255,255,0.7); }
      .ss-favorite-name {
        flex: 1; font-size: 0.8125rem; color: #fff;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .ss-favorite-remove {
        width: 20px; height: 20px; border-radius: 5px;
        background: transparent; border: none;
        color: rgba(255,255,255,0.3); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .ss-favorite-remove:hover { background: rgba(255,59,48,0.15); color: #ff3b30; }
      .ss-favorite-remove svg { width: 12px; height: 12px; }
      
      /* ===== PLAYER ===== */
      .ss-player-wrapper {
        flex: 1; min-height: 0;
        display: flex; flex-direction: column;
        border-radius: 12px; overflow: hidden;
        background: rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.06);
      }
      .ss-player-header {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.625rem 0.875rem;
        background: rgba(0,0,0,0.2);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
      }
      .ss-player-header svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }
      .ss-player-title {
        flex: 1; font-size: 0.75rem; font-weight: 600;
        color: #fff; overflow: hidden;
        text-overflow: ellipsis; white-space: nowrap;
      }
      .ss-player-close {
        width: 20px; height: 20px; border-radius: 5px;
        background: transparent; border: none;
        color: rgba(255,255,255,0.4); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      .ss-player-close:hover { background: rgba(255,255,255,0.08); color: #fff; }
      .ss-player-close svg { width: 12px; height: 12px; }
      .ss-player-iframe-wrapper {
        flex: 1; min-height: 0; position: relative; overflow: hidden;
      }
      .ss-player-iframe-wrapper iframe {
        position: absolute; inset: 0;
        width: 100%; height: 100%; border: 0;
      }
      .ss-player-empty {
        flex: 1; display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 0.5rem; color: rgba(255,255,255,0.3);
        font-size: 0.8125rem; text-align: center; padding: 1.5rem;
      }
      .ss-player-empty svg {
        width: 32px; height: 32px;
        stroke: rgba(255,255,255,0.2); fill: none; stroke-width: 1.5;
      }
      
      /* ===== TOOLBAR BUTTON ===== */
      .dash-button[data-nestafocus-sounds] {
        position: relative;
        transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
      }
      .dash-button[data-nestafocus-sounds].active {
        background-color: rgba(246,102,36,0.15);
        box-shadow: inset 0 0 0 1px rgba(246,102,36,0.4);
        color: #ff8a4c;
      }
      .dash-button[data-nestafocus-sounds].active svg { color: #ff8a4c; }
      .dash-button[data-nestafocus-sounds] svg { transition: transform 0.2s ease; }
      .dash-button[data-nestafocus-sounds]:hover svg { transform: scale(1.1); }
      .ss-active-badge {
        position: absolute; top: -2px; right: -2px;
        min-width: 16px; height: 16px; padding: 0 4px;
        border-radius: 8px;
        background: linear-gradient(135deg,#f66624,#ff8a4c);
        color: #fff; font-size: 10px; font-weight: 700;
        line-height: 16px; text-align: center;
        pointer-events: none; display: none;
        box-shadow: 0 2px 6px rgba(246,102,36,0.5);
      }
      .ss-active-badge.visible { display: block; }
      
      /* ===== RESPONSIVE ===== */
      @media (max-width: 768px) {
        .sounds-studio {
          width: 100vw; height: 100vh;
          max-width: 100vw; max-height: 100vh;
          border-radius: 0; top: 0; left: 0;
          transform: translate(0,0) scale(1);
        }
        .sounds-studio.show { transform: translate(0,0) scale(1); }
        .ss-grid { grid-template-columns: repeat(auto-fill,minmax(110px,1fr)); gap: 0.5rem; }
        .ss-sound { padding: 0.75rem 0.5rem; }
        .ss-sound-icon { width: 36px; height: 36px; }
        .ss-sound-icon svg { width: 20px; height: 20px; }
        .ss-active-volume { width: 60px; }
        .ss-music-layout { grid-template-columns: 1fr; grid-template-rows: auto 1fr; padding: 0.75rem; }
        .ss-playlists-grid { grid-template-columns: repeat(auto-fill,minmax(90px,1fr)); }
        .ss-url-form { flex-direction: column; }
        .ss-url-btn { width: 100%; justify-content: center; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // ============================================
  // STATE
  // ============================================
  let sounds = {};
  let activeSounds = [];
  let presets = [];
  let favorites = [];
  let currentCategory = 'all';
  let currentTab = 'sounds';
  let searchQuery = '';
  let isPlaying = false;
  let currentAudio = {};
  let currentIframe = null;
  
  // ============================================
  // UTILS
  // ============================================
  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }
  
  function getIcon(id) {
    const iconKey = SOUND_ICON_MAP[id] || 'headphones';
    return ICONS[iconKey] || '';
  }
  
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  function getPlatformIcon(p) {
    return {
      spotify: ICONS.spotify,
      youtube: ICONS.youtube,
      youtubeMusic: ICONS.youtubeMusic,
      appleMusic: ICONS.appleMusic,
      soundcloud: ICONS.soundcloud,
      amazonMusic: ICONS.amazonMusic,
    }[p] || ICONS.musicNote;
  }
  
  function getPlatformName(p) {
    return {
      spotify: 'Spotify', youtube: 'YouTube',
      youtubeMusic: 'YouTube Music', appleMusic: 'Apple Music',
      soundcloud: 'SoundCloud', amazonMusic: 'Amazon Music',
    }[p] || 'Musique';
  }
  
  function getPlatformColor(p) {
    return {
      spotify: '#1DB954', youtube: '#FF0000',
      youtubeMusic: '#FF0000', appleMusic: '#FA243C',
      soundcloud: '#FF5500', amazonMusic: '#25D1DA',
    }[p] || '#f66624';
  }
  
  function detectPlatform(url) {
    if (typeof url !== 'string') return null;
    const u = url.trim();
    
    if (u.includes('open.spotify.com') || u.startsWith('spotify:')) {
      let uri = u;
      if (u.includes('open.spotify.com')) {
        const m = u.match(/(?:playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
        if (m) {
          const type = u.includes('/playlist/') ? 'playlist' : u.includes('/album/') ? 'album' : u.includes('/track/') ? 'track' : 'artist';
          uri = `spotify:${type}:${m[1]}`;
        }
      }
      return { platform: 'spotify', uri };
    }
    
    if (u.includes('music.youtube.com')) return { platform: 'youtubeMusic', uri: u };
    
    if (u.includes('youtube.com') || u.includes('youtu.be')) {
      const vm = u.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
      const lm = u.match(/[?&]list=([a-zA-Z0-9_-]+)/);
      if (lm) return { platform: 'youtube', uri: `https://www.youtube.com/embed/?listType=playlist&list=${lm[1]}` };
      if (vm) return { platform: 'youtube', uri: `https://www.youtube.com/embed/${vm[1]}` };
    }
    
    if (u.includes('music.apple.com')) {
      return { platform: 'appleMusic', uri: u.replace('music.apple.com', 'embed.music.apple.com') + '?theme=dark' };
    }
    
    if (u.includes('soundcloud.com')) {
      return { platform: 'soundcloud', uri: `https://w.soundcloud.com/player/?url=${encodeURIComponent(u)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true` };
    }
    
    if (u.includes('music.amazon.')) {
      const m = u.match(/music\.amazon\.[a-z.]+\/(?:[\w-]+\/)?(?:playlists|albums|tracks)\/([a-zA-Z0-9-]+)/);
      if (m) {
        const domain = u.match(/music\.amazon\.[a-z.]+/)[0];
        return { platform: 'amazonMusic', uri: `https://${domain}/embed/${m[1]}` };
      }
    }
    
    return null;
  }
  
  // ============================================
  // PERSISTENCE
  // ============================================
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        activeSounds = Array.isArray(data.active) ? data.active : [];
      }
    } catch (e) { activeSounds = []; }
    
    try {
      const raw = localStorage.getItem(PRESETS_KEY);
      if (raw) {
        presets = JSON.parse(raw);
        if (!Array.isArray(presets)) presets = [];
      }
    } catch (e) { presets = []; }
    
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) {
        favorites = JSON.parse(raw);
        if (!Array.isArray(favorites)) favorites = [];
      }
    } catch (e) { favorites = []; }
  }
  
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ active: activeSounds })); } catch (e) {}
  }
  function savePresets() {
    try { localStorage.setItem(PRESETS_KEY, JSON.stringify(presets)); } catch (e) {}
  }
  function saveFavorites() {
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch (e) {}
  }
  
  // ============================================
  // AUDIO
  // ============================================
  function playSound(id) {
    if (!window.Howl) return;
    const sound = sounds[id];
    if (!sound || !sound.src) return;
    if (!currentAudio[id]) {
      currentAudio[id] = new Howl({ src: [sound.src], loop: true, volume: 0.5 });
    }
    currentAudio[id].play();
    isPlaying = true;
    updatePlayButton();
  }
  
  function setVolume(id, volume) {
    if (currentAudio[id]) currentAudio[id].volume(volume);
  }
  
  function stopAll() {
    Object.values(currentAudio).forEach(a => a.stop());
    Object.keys(currentAudio).forEach(k => delete currentAudio[k]);
    isPlaying = false;
    updatePlayButton();
  }
  
  function pauseAll() {
    Object.values(currentAudio).forEach(a => a.pause());
    isPlaying = false;
    updatePlayButton();
  }
  
  function playAll() {
    activeSounds.forEach(({ id, volume }) => {
      playSound(id);
      setVolume(id, volume);
    });
    isPlaying = true;
    updatePlayButton();
  }
  
  // ============================================
  // UI BUILD
  // ============================================
  function buildUI() {
    const overlay = document.createElement('div');
    overlay.className = 'sounds-studio-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'sounds-studio';
    modal.innerHTML = `
      <div class="ss-header">
        <div class="ss-header-icon">${ICONS.headphones}</div>
        <div class="ss-header-text">
          <h2>Studio</h2>
          <p>Sons d'ambiance + Musique</p>
        </div>
        <button class="ss-close" type="button" aria-label="Fermer">${ICONS.close}</button>
      </div>
      
      <div class="ss-tabs" role="tablist">
        <button class="ss-tab active" data-tab="sounds" type="button">${ICONS.headphones}<span>Sons</span></button>
        <button class="ss-tab" data-tab="music" type="button">${ICONS.musicNote}<span>Ma Musique</span></button>
      </div>
      
      <div class="ss-tab-content active" data-tab-content="sounds">
        <div class="ss-toolbar">
          <div class="ss-search">
            ${ICONS.search}
            <input type="text" placeholder="Rechercher un son…" />
          </div>
          <div class="ss-filters">
            <button class="ss-chip active" data-category="all" type="button">Tous</button>
            <button class="ss-chip" data-category="Nature" type="button">Nature</button>
            <button class="ss-chip" data-category="Weather" type="button">Météo</button>
            <button class="ss-chip" data-category="Interior" type="button">Intérieur</button>
            <button class="ss-chip" data-category="Lifestyle" type="button">Lifestyle</button>
            <button class="ss-chip" data-category="Focus" type="button">Focus</button>
            <button class="ss-chip" data-category="Niche" type="button">Niche</button>
          </div>
        </div>
        <div class="ss-body">
          <div class="ss-grid" data-sounds-grid></div>
          <div class="ss-active-section">
            <div class="ss-active-header">
              <h3>Sons actifs</h3>
              <span class="ss-active-count" data-active-count>0 / ${MAX_ACTIVE}</span>
            </div>
            <div class="ss-active-list" data-active-list></div>
          </div>
        </div>
        <div class="ss-footer">
          <button class="ss-btn primary" type="button" data-action="play-pause">
            ${ICONS.play}<span>Play</span>
          </button>
          <button class="ss-btn" type="button" data-action="stop" disabled>
            ${ICONS.stop}<span>Stop</span>
          </button>
          <button class="ss-btn" type="button" data-action="surprise">
            ${ICONS.dice}<span>Surprise</span>
          </button>
          <div class="ss-btn-spacer"></div>
          <div style="position: relative;">
            <button class="ss-btn" type="button" data-action="presets">
              ${ICONS.save}<span>Presets</span>
            </button>
            <div class="ss-preset-menu" data-preset-menu></div>
          </div>
        </div>
      </div>
      
      <div class="ss-tab-content" data-tab-content="music">
        <div class="ss-music-layout">
          <div class="ss-music-left">
            <div class="ss-section">
              <div class="ss-section-header"><h3>Playlists</h3></div>
              <div class="ss-playlists-grid" data-playlists-grid></div>
            </div>
            <div class="ss-section">
              <div class="ss-section-header"><h3>Ajouter une musique</h3></div>
              <div class="ss-url-form">
                <input type="text" class="ss-url-input" placeholder="Lien Spotify, YouTube, Apple Music…" data-url-input />
                <button class="ss-url-btn" type="button" data-url-btn>${ICONS.plus}<span>Ajouter</span></button>
              </div>
              <div data-url-message></div>
            </div>
            <div class="ss-section" data-favorites-section style="display: none;">
              <div class="ss-section-header">
                <h3>Favoris</h3>
                <span class="ss-count" data-favorites-count>0</span>
              </div>
              <div class="ss-favorites" data-favorites-list></div>
            </div>
          </div>
          <div class="ss-music-right">
            <div class="ss-player-wrapper" data-player-wrapper>
              <div class="ss-player-empty">
                ${ICONS.headphones}
                <div>Sélectionnez une playlist ou collez un lien</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    return { overlay, modal };
  }
  
  // ============================================
  // RENDER
  // ============================================
  function renderGrid() {
    const grid = document.querySelector('[data-sounds-grid]');
    if (!grid) return;
    const q = searchQuery.toLowerCase().trim();
    const filtered = Object.entries(sounds).filter(([id, s]) => {
      if (id === 'none') return false;
      if (currentCategory !== 'all' && !(s.tags || []).includes(currentCategory)) return false;
      if (q && !s.name.toLowerCase().includes(q)) return false;
      return true;
    });
    if (!filtered.length) {
      grid.innerHTML = '<div class="ss-empty" style="grid-column:1/-1">Aucun son trouvé</div>';
      return;
    }
    grid.innerHTML = filtered.map(([id, s]) => {
      const active = activeSounds.some(a => a.id === id);
      return `<div class="ss-sound${active ? ' active' : ''}" data-sound-id="${id}" role="button" tabindex="0">
        <div class="ss-sound-icon">${getIcon(id)}</div>
        <div class="ss-sound-name">${escapeHtml(s.name)}</div>
      </div>`;
    }).join('');
  }
  
  function renderActiveList() {
    const list = document.querySelector('[data-active-list]');
    const count = document.querySelector('[data-active-count]');
    if (!list || !count) return;
    count.textContent = `${activeSounds.length} / ${MAX_ACTIVE}`;
    count.classList.toggle('max', activeSounds.length >= MAX_ACTIVE);
    if (!activeSounds.length) {
      list.innerHTML = '<div class="ss-empty">Aucun son actif. Cliquez sur un son pour l\'ajouter.</div>';
      return;
    }
    list.innerHTML = activeSounds.map(({ id, volume }) => {
      const s = sounds[id];
      if (!s) return '';
      return `<div class="ss-active-item" data-active-id="${id}">
        <div class="ss-active-icon">${getIcon(id)}</div>
        <div class="ss-active-name">${escapeHtml(s.name)}</div>
        <div class="ss-active-volume" data-volume-id="${id}">
          <div class="ss-active-volume-fill" style="width:${volume * 100}%"></div>
          <div class="ss-active-volume-thumb" style="left:${volume * 100}%"></div>
        </div>
        <button class="ss-active-remove" type="button" data-remove-id="${id}">${ICONS.close}</button>
      </div>`;
    }).join('');
  }
  
  function renderPresetMenu() {
    const menu = document.querySelector('[data-preset-menu]');
    if (!menu) return;
    if (!presets.length) {
      menu.innerHTML = `<div class="ss-preset-empty">Aucun preset</div>
        <div class="ss-preset-item" data-action="save-preset">
          <div class="ss-preset-item-icon">${ICONS.save}</div>
          <div class="ss-preset-item-name">Sauvegarder le mix actuel</div>
        </div>`;
      return;
    }
    menu.innerHTML = presets.map((p, i) => {
      const icons = p.sounds.slice(0, 3).map(id => getIcon(id)).join('');
      return `<div class="ss-preset-item" data-preset-index="${i}">
        <div class="ss-preset-item-icon">${icons}</div>
        <div class="ss-preset-item-name">${escapeHtml(p.name)}</div>
        <button class="ss-preset-item-remove" type="button" data-remove-preset="${i}">${ICONS.close}</button>
      </div>`;
    }).join('') + `<div class="ss-preset-item" data-action="save-preset" style="border-top:1px solid rgba(255,255,255,0.06);margin-top:0.25rem;padding-top:0.75rem;">
      <div class="ss-preset-item-icon">${ICONS.save}</div>
      <div class="ss-preset-item-name">Sauvegarder le mix actuel</div>
    </div>`;
  }
  
  function renderPlaylists() {
    const grid = document.querySelector('[data-playlists-grid]');
    if (!grid) return;
    grid.innerHTML = Object.entries(PLAYLISTS).map(([id, pl]) => {
      const active = currentIframe?.platform === 'spotify' && currentIframe?.uri?.includes(pl.uri.split(':').pop());
      return `<div class="ss-playlist${active ? ' active' : ''}" data-playlist-id="${id}">
        <div class="ss-playlist-icon">${ICONS.spotify}</div>
        <div class="ss-playlist-name">${escapeHtml(pl.name)}</div>
      </div>`;
    }).join('');
  }
  
  function renderFavorites() {
    const list = document.querySelector('[data-favorites-list]');
    const count = document.querySelector('[data-favorites-count]');
    const section = document.querySelector('[data-favorites-section]');
    if (!list || !count || !section) return;
    count.textContent = String(favorites.length);
    section.style.display = favorites.length > 0 ? '' : 'none';
    list.innerHTML = favorites.map((fav, i) => `
      <div class="ss-favorite" data-favorite-index="${i}">
        <div class="ss-favorite-platform">${getPlatformIcon(fav.platform)}</div>
        <div class="ss-favorite-name">${escapeHtml(fav.name)}</div>
        <button class="ss-favorite-remove" type="button" data-remove-favorite="${i}">${ICONS.close}</button>
      </div>
    `).join('');
  }
  
  function renderPlayer() {
    const wrapper = document.querySelector('[data-player-wrapper]');
    if (!wrapper) return;
    if (!currentIframe) {
      wrapper.innerHTML = `<div class="ss-player-empty">${ICONS.headphones}<div>Sélectionnez une playlist ou collez un lien</div></div>`;
      return;
    }
    const color = getPlatformColor(currentIframe.platform);
    wrapper.innerHTML = `
      <div class="ss-player-header" style="color:${color}">
        ${getPlatformIcon(currentIframe.platform)}
        <div class="ss-player-title">${escapeHtml(currentIframe.title || getPlatformName(currentIframe.platform))}</div>
        <button class="ss-player-close" type="button" data-close-player>${ICONS.close}</button>
      </div>
      <div class="ss-player-iframe-wrapper">
        <iframe src="${currentIframe.uri}" allow="autoplay; encrypted-media; clipboard-write; picture-in-picture" allowfullscreen loading="lazy"></iframe>
      </div>
    `;
  }
  
  function updatePlayButton() {
    const btn = document.querySelector('[data-action="play-pause"]');
    if (!btn) return;
    const hasActive = activeSounds.length > 0;
    const playing = isPlaying && hasActive;
    btn.innerHTML = `${playing ? ICONS.pause : ICONS.play}<span>${playing ? 'Pause' : 'Play'}</span>`;
    btn.disabled = !hasActive;
    const stopBtn = document.querySelector('[data-action="stop"]');
    if (stopBtn) stopBtn.disabled = !hasActive;
  }
  
  function updateActiveBadge() {
    const btn = document.querySelector('[data-nestafocus-sounds]');
    if (!btn) return;
    let badge = btn.querySelector('.ss-active-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'ss-active-badge';
      btn.appendChild(badge);
    }
    if (activeSounds.length > 0) {
      badge.textContent = String(activeSounds.length);
      badge.classList.add('visible');
      btn.classList.add('active');
    } else {
      badge.classList.remove('visible');
      btn.classList.remove('active');
    }
  }
  
  // ============================================
  // ACTIONS
  // ============================================
  function addSound(id) {
    if (activeSounds.some(a => a.id === id)) return;
    if (activeSounds.length >= MAX_ACTIVE) {
      const c = document.querySelector('[data-active-count]');
      if (c) { c.style.animation = 'ss-pulse 0.5s ease 3'; setTimeout(() => { c.style.animation = ''; }, 1500); }
      return;
    }
    if (!sounds[id]) return;
    activeSounds.push({ id, volume: 0.5 });
    saveState(); renderGrid(); renderActiveList(); updatePlayButton(); updateActiveBadge();
    if (isPlaying) { playSound(id); setVolume(id, 0.5); }
  }
  
  function removeSound(id) {
    activeSounds = activeSounds.filter(a => a.id !== id);
    saveState(); renderGrid(); renderActiveList(); updatePlayButton(); updateActiveBadge();
    if (currentAudio[id]) { currentAudio[id].stop(); delete currentAudio[id]; }
    if (!activeSounds.length) { isPlaying = false; updatePlayButton(); }
  }
  
  function updateVolume(id, vol) {
    const item = activeSounds.find(a => a.id === id);
    if (!item) return;
    item.volume = vol; setVolume(id, vol); saveState();
    const c = document.querySelector(`[data-volume-id="${id}"]`);
    if (c) {
      const f = c.querySelector('.ss-active-volume-fill');
      const t = c.querySelector('.ss-active-volume-thumb');
      if (f) f.style.width = `${vol * 100}%`;
      if (t) t.style.left = `${vol * 100}%`;
    }
  }
  
  function surpriseMe() {
    const avail = Object.entries(sounds).filter(([id]) => id !== 'none');
    if (!avail.length) return;
    activeSounds.forEach(({ id }) => { if (currentAudio[id]) { currentAudio[id].stop(); delete currentAudio[id]; } });
    activeSounds = [];
    const count = Math.min(3, avail.length);
    const shuffled = [...avail].sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) activeSounds.push({ id: shuffled[i][0], volume: 0.5 });
    saveState(); renderGrid(); renderActiveList(); updatePlayButton(); updateActiveBadge(); playAll();
  }
  
  function savePreset() {
    if (!activeSounds.length) return;
    const name = prompt('Nom du preset :');
    if (!name) return;
    presets.push({
      name: name.trim().slice(0, 40),
      sounds: activeSounds.map(a => a.id),
      volumes: activeSounds.reduce((acc, a) => ({ ...acc, [a.id]: a.volume }), {}),
      createdAt: Date.now(),
    });
    savePresets(); renderPresetMenu();
  }
  
  function loadPreset(i) {
    const p = presets[i];
    if (!p) return;
    activeSounds.forEach(({ id }) => { if (currentAudio[id]) { currentAudio[id].stop(); delete currentAudio[id]; } });
    activeSounds = [];
    p.sounds.forEach(id => {
      if (sounds[id]) activeSounds.push({ id, volume: p.volumes?.[id] ?? 0.5 });
    });
    saveState(); renderGrid(); renderActiveList(); updatePlayButton(); updateActiveBadge(); playAll();
    document.querySelector('[data-preset-menu]')?.classList.remove('show');
  }
  
  function deletePreset(i) {
    presets.splice(i, 1); savePresets(); renderPresetMenu();
  }
  
  function loadPlaylist(id) {
    const pl = PLAYLISTS[id];
    if (!pl) return;
    const spotifyId = pl.uri.split(':').pop();
    currentIframe = {
      platform: 'spotify',
      uri: `https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator&theme=0`,
      title: pl.name,
    };
    renderPlaylists(); renderPlayer();
  }
  
  function loadFromUrl(url) {
    const message = document.querySelector('[data-url-message]');
    const detected = detectPlatform(url);
    if (!detected) {
      if (message) {
        message.innerHTML = '<div class="ss-url-error">Format non reconnu.</div>';
        setTimeout(() => { message.innerHTML = ''; }, 4000);
      }
      return;
    }
    let embedUri = detected.uri;
    const title = getPlatformName(detected.platform);
    if (detected.platform === 'spotify') {
      const m = detected.uri.match(/spotify:(playlist|album|track|artist):([a-zA-Z0-9]+)/);
      if (m) embedUri = `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`;
    }
    currentIframe = { platform: detected.platform, uri: embedUri, title };
    if (message) {
      message.innerHTML = `<div class="ss-url-success">✓ ${getPlatformName(detected.platform)} détecté</div>`;
      setTimeout(() => { message.innerHTML = ''; }, 3000);
    }
    renderPlayer();
  }
  
  function removeFavorite(i) {
    favorites.splice(i, 1); saveFavorites(); renderFavorites();
  }
  
  function loadFavorite(i) {
    const fav = favorites[i];
    if (fav) loadFromUrl(fav.url);
  }
  
  // ============================================
  // EVENTS
  // ============================================
  function setupEvents(modal, overlay) {
    const close = () => {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      const btn = document.querySelector('[data-nestafocus-sounds]');
      if (btn) btn.classList.remove('active');
    };
    
    modal.querySelector('.ss-close')?.addEventListener('click', close);
    overlay.addEventListener('click', close);
    
    const keyHandler = (e) => {
      if (!modal.classList.contains('show')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const btn = modal.querySelector('[data-action="play-pause"]');
        if (btn && !btn.disabled) btn.click();
      }
    };
    document.addEventListener('keydown', keyHandler);
    modal._keyHandler = keyHandler;
    
    modal.querySelectorAll('.ss-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        if (target === currentTab) return;
        currentTab = target;
        modal.querySelectorAll('.ss-tab').forEach(t => t.classList.toggle('active', t === tab));
        modal.querySelectorAll('.ss-tab-content').forEach(c => c.classList.toggle('active', c.dataset.tabContent === target));
        if (target === 'music') { renderPlaylists(); renderFavorites(); renderPlayer(); }
      });
    });
    
    const search = modal.querySelector('.ss-search input');
    if (search) search.addEventListener('input', debounce((e) => { searchQuery = e.target.value; renderGrid(); }, 150));
    
    modal.querySelectorAll('.ss-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        modal.querySelectorAll('.ss-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.dataset.category;
        renderGrid();
      });
    });
    
    modal.querySelector('[data-sounds-grid]')?.addEventListener('click', (e) => {
      const el = e.target.closest('[data-sound-id]');
      if (!el) return;
      const id = el.dataset.soundId;
      if (activeSounds.some(a => a.id === id)) removeSound(id); else addSound(id);
    });
    
    modal.querySelector('[data-action="play-pause"]')?.addEventListener('click', () => {
      if (isPlaying) pauseAll(); else playAll();
    });
    modal.querySelector('[data-action="stop"]')?.addEventListener('click', stopAll);
    modal.querySelector('[data-action="surprise"]')?.addEventListener('click', surpriseMe);
    
    const presetBtn = modal.querySelector('[data-action="presets"]');
    const presetMenu = modal.querySelector('[data-preset-menu]');
    presetBtn?.addEventListener('click', (e) => {
      e.stopPropagation(); renderPresetMenu(); presetMenu.classList.toggle('show');
    });
    presetMenu?.addEventListener('click', (e) => {
      e.stopPropagation();
      const rm = e.target.closest('[data-remove-preset]');
      if (rm) { deletePreset(parseInt(rm.dataset.removePreset)); return; }
      const sv = e.target.closest('[data-action="save-preset"]');
      if (sv) { savePreset(); return; }
      const item = e.target.closest('[data-preset-index]');
      if (item) loadPreset(parseInt(item.dataset.presetIndex));
    });
    document.addEventListener('click', (e) => {
      if (presetMenu?.classList.contains('show')) {
        if (!e.target.closest('[data-action="presets"]') && !e.target.closest('[data-preset-menu]')) {
          presetMenu.classList.remove('show');
        }
      }
    });
    
    modal.querySelector('[data-active-list]')?.addEventListener('pointerdown', (e) => {
      const vel = e.target.closest('[data-volume-id]');
      if (!vel) return;
      e.preventDefault();
      const id = vel.dataset.volumeId;
      const rect = vel.getBoundingClientRect();
      const handler = (ev) => {
        const x = Math.max(0, Math.min(ev.clientX - rect.left, rect.width));
        updateVolume(id, x / rect.width);
      };
      handler(e);
      window.addEventListener('pointermove', handler);
      window.addEventListener('pointerup', () => window.removeEventListener('pointermove', handler), { once: true });
    });
    modal.querySelector('[data-active-list]')?.addEventListener('click', (e) => {
      const rm = e.target.closest('[data-remove-id]');
      if (rm) removeSound(rm.dataset.removeId);
    });
    
    modal.querySelector('[data-playlists-grid]')?.addEventListener('click', (e) => {
      const pl = e.target.closest('[data-playlist-id]');
      if (pl) loadPlaylist(pl.dataset.playlistId);
    });
    
    const urlInput = modal.querySelector('[data-url-input]');
    const urlBtn = modal.querySelector('[data-url-btn]');
    if (urlBtn && urlInput) {
      const go = () => { const url = urlInput.value.trim(); if (!url) return; loadFromUrl(url); urlInput.value = ''; };
      urlBtn.addEventListener('click', go);
      urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
    }
    
    modal.querySelector('[data-favorites-list]')?.addEventListener('click', (e) => {
      const rm = e.target.closest('[data-remove-favorite]');
      if (rm) { removeFavorite(parseInt(rm.dataset.removeFavorite)); return; }
      const fav = e.target.closest('[data-favorite-index]');
      if (fav) loadFavorite(parseInt(fav.dataset.favoriteIndex));
    });
    
    modal.querySelector('[data-player-wrapper]')?.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-player]')) {
        currentIframe = null;
        renderPlayer();
      }
    });
  }
  
  // ============================================
  // COMPOSANT
  // ============================================
  class SoundsStudio extends HTMLElement {
    constructor() {
      super();
      this._initialized = false;
    }
    
    connectedCallback() {
      if (this._initialized) return;
      this._initialized = true;
      
      injectStyles();
      this._loadSounds();
      loadState();
      
      const { overlay, modal } = buildUI();
      this._overlay = overlay;
      this._modal = modal;
      
      renderGrid();
      renderActiveList();
      updatePlayButton();
      updateActiveBadge();
      
      setupEvents(modal, overlay);
      this._createToolbarButton();
    }
    
    _loadSounds() {
      const src = window.Flocus?.newMusic?.sounds;
      if (src) {
        sounds = {};
        for (const [id, s] of Object.entries(src)) {
          if (id === 'none') continue;
          sounds[id] = {
            name: s.name,
            src: s.src,
            emoji: s.emoji,
            tags: s.tags || [],
          };
        }
      } else {
        sounds = {};
      }
    }
    
    _createToolbarButton() {
      const addBtn = (bar) => {
        if (bar.querySelector('[data-nestafocus-sounds]')) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dash-button';
        btn.dataset.nestafocusSounds = 'true';
        btn.setAttribute('aria-label', 'Ouvrir le Studio');
        btn.title = 'Studio — Sons + Musique';
        btn.innerHTML = ICONS.headphones;
        btn.addEventListener('click', () => this.open());
        bar.appendChild(btn);
      };
      const bar = document.getElementById('bottom-left') || document.getElementById('bottom-right');
      if (bar) {
        addBtn(bar);
      } else {
        const obs = new MutationObserver(() => {
          const b = document.getElementById('bottom-left') || document.getElementById('bottom-right');
          if (b) { addBtn(b); obs.disconnect(); }
        });
        obs.observe(document.body, { childList: true, subtree: true });
      }
    }
    
    open() {
      this._overlay.classList.add('show');
      this._modal.classList.add('show');
      const btn = document.querySelector('[data-nestafocus-sounds]');
      if (btn) btn.classList.add('active');
      setTimeout(() => this._modal.querySelector('.ss-search input')?.focus(), 100);
    }
    
    close() {
      this._overlay.classList.remove('show');
      this._modal.classList.remove('show');
      const btn = document.querySelector('[data-nestafocus-sounds]');
      if (btn) btn.classList.remove('active');
    }
    
    disconnectedCallback() {
      if (this._modal?._keyHandler) document.removeEventListener('keydown', this._modal._keyHandler);
    }
  }
  
  customElements.define('sounds-studio', SoundsStudio);
  window.SoundsStudio = SoundsStudio;
})();


