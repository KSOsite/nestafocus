(() => {
  // Empêcher l'altération de l'URL de base par history.pushState / replaceState (évite les erreurs 404 sur les ressources)
  const origReplaceState = history.replaceState;
  const origPushState = history.pushState;
  history.replaceState = function(state, unused, url) {
    return;
  };
  history.pushState = function(state, unused, url) {
    return;
  };

  // ===== OPTIMISATION : PRÉCHARGEMENT DE LA POLICE INTER =====
  const preloadFont = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };
  preloadFont();

  // ===== CSS MINIFIÉ ET OPTIMISÉ =====
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --abyssal:#022a71;--tropical:#f66624;--lavender:#855c9e;--mandarin:#f66624;--sand:#e3d594;
      --fl-color-primary:var(--tropical);--fl-color-purple-300:var(--mandarin);
      --fl-color-purple-500:var(--mandarin);--fl-color-purple-600:var(--mandarin);
      --fl-color-purple-700:var(--mandarin);--fl-color-purple-900:var(--mandarin);
      --bs-primary:var(--tropical);--bs-purple:var(--mandarin);--bs-link-color:var(--tropical);
      --bs-link-hover-color:var(--sand);--bs-nav-pills-link-active-bg:var(--tropical);
      --bs-nav-pills-link-active-color:#101827;--bs-focus-ring-color:rgba(25,156,184,.25);
      --fl-dashBtnBg-color:rgba(2,42,113,.55);--fl-dashBtn-color:#fffdf6;--fl-accent-color:var(--tropical);
      accent-color:var(--tropical)
    }
    
    /* ===== LOGO NESTAFOCUS ===== */
    .nestafocus-brand-logo span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 0.3rem 0.8rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nestafocus-brand-logo svg {
      display: none !important;
    }

    /* ============================================
      ICÔNES SIDEBAR - Mode outline
      ============================================ */
    :is(settings-panel, #offcanvas) #settModal-tab .nav-link svg path[stroke] {
      stroke: var(--mandarin) !important;
      fill: #000 !important;
    }

    :is(settings-panel, #offcanvas) #settModal-tab .nav-link svg path:not([stroke]) {
      fill: var(--mandarin) !important;
    }
      
    .btn-primary {
      --bs-btn-color: #101827;
      --bs-btn-bg: var(--mandarin);
      --bs-btn-border-color: var(--mandarin);
      --bs-btn-hover-color: #101827;
      --bs-btn-hover-bg: #e8561c;
      --bs-btn-hover-border-color: #e8561c;
      --bs-btn-active-color: #101827;
      --bs-btn-active-bg: #d94e18;
      --bs-btn-active-border-color: #d94e18;
    }

    settings-panel .login-prompt-button,
    #offcanvas .login-prompt-button {
      --bs-btn-color: var(--mandarin) !important;
      --bs-btn-bg: rgb(246 102 36 / 12%) !important;
      --bs-btn-border-color: rgb(246 102 36 / 42%) !important;
      --bs-btn-hover-color: #ffffff !important;
      --bs-btn-hover-bg: var(--mandarin) !important;
      --bs-btn-hover-border-color: var(--mandarin) !important;
      --bs-btn-active-color: #ffffff !important;
      --bs-btn-active-bg: #e8561c !important;
      --bs-btn-active-border-color: #e8561c !important;
    }

    settings-panel .login-prompt a.btn-primary:hover,
    #offcanvas .login-prompt a.btn-primary:hover,
    settings-panel .login-prompt-button:hover,
    #offcanvas .login-prompt-button:hover {
      color: #ffffff !important;
      background-color: var(--mandarin) !important;
      border-color: var(--mandarin) !important;
    }

    .dash-mode::after {
      background: var(--mandarin) !important;
    }

    body[data-dashboard-mode="ambient"] .dash-mode svg[data-mode="ambient"],
    body[data-dashboard-mode="home"] .dash-mode svg[data-mode="home"],
    body[data-dashboard-mode="focus"] .dash-mode svg[data-mode="focus"] {
      color: #fffdf6 !important;
    }

    .dash-mode svg:hover {
      color: var(--mandarin) !important;
    }

    settings-panel .login .nav-tabs .nav-link.active,
    #offcanvas .login .nav-tabs .nav-link.active {
      --bs-nav-link-active-color: var(--mandarin) !important;
      --bs-nav-tabs-link-active-border-color: var(--mandarin) !important;
      color: var(--mandarin) !important;
      border-bottom-color: var(--mandarin) !important;
    }

    settings-panel .login .nav-tabs .nav-link:hover,
    #offcanvas .login .nav-tabs .nav-link:hover {
      color: var(--mandarin) !important;
    }

    settings-panel #Profile .btn-primary,
    #offcanvas #Profile .btn-primary,
    settings-panel .account .btn-primary,
    #offcanvas .account .btn-primary {
      background-color: var(--mandarin) !important;
      border-color: var(--mandarin) !important;
      color: #ffffff !important;
    }

    settings-panel #Profile .btn-primary:hover,
    #offcanvas #Profile .btn-primary:hover,
    settings-panel .account .btn-primary:hover,
    #offcanvas .account .btn-primary:hover {
      background-color: #e8561c !important;
      border-color: #e8561c !important;
      color: #ffffff !important;
    }

    settings-panel #settModal-tab .login-prompt a:not(.btn),
    #offcanvas #settModal-tab .login-prompt a:not(.btn) {
      color: var(--mandarin) !important;
    }

    settings-panel #settModal-tab .login-prompt a:not(.btn):hover,
    #offcanvas #settModal-tab .login-prompt a:not(.btn):hover {
      color: #e8561c !important;
    }

    .btn-outline-info {
      --bs-btn-color: var(--tropical);
      --bs-btn-border-color: var(--tropical);
      --bs-btn-hover-color: #101827;
      --bs-btn-hover-bg: var(--tropical);
      --bs-btn-hover-border-color: var(--tropical);
      --bs-btn-active-color: #101827;
      --bs-btn-active-bg: var(--tropical);
      --bs-btn-active-border-color: var(--tropical);
    }

    #onboarding .email-cta {
      border: 1px solid var(--tropical);
      border-radius: 14px;
      background: linear-gradient(105deg, rgba(25, 156, 184, 0.2), rgba(246, 102, 36, 0.16)) !important;
      box-shadow: 0 0 18px rgba(25, 156, 184, 0.22), inset 0 0 12px rgba(25, 156, 184, 0.1);
      color: #fffdf6 !important;
      font-weight: 600;
    }

    #onboarding .email-cta:hover {
      border-color: var(--sand);
      background: linear-gradient(105deg, rgba(25, 156, 184, 0.28), rgba(246, 102, 36, 0.22)) !important;
    }

    #onboarding .go-to-dash-btn,
    #onboarding .login-btn-wrapper .btn-link,
    #onboarding .btn-link {
      color: #55c8d1 !important;
      text-decoration-color: currentColor;
      text-underline-offset: 3px;
    }

    #onboarding .go-to-dash-btn {
      font-weight: 600;
    }

    #onboarding .go-to-dash-btn:hover,
    #onboarding .login-btn-wrapper .btn-link:hover,
    #onboarding .btn-link:hover {
      color: var(--mandarin) !important;
    }

    #onboarding .btn-primary {
      border-color: var(--mandarin) !important;
      background-color: var(--mandarin) !important;
      color: #101827 !important;
      font-weight: 700;
      box-shadow: 0 8px 22px rgba(246, 102, 36, 0.22);
    }

    #onboarding .nav.nav-pills .nav-link.active {
      border-color: var(--tropical);
      background: rgba(25, 156, 184, 0.16);
      color: #fffdf6;
    }

    #onboarding .gsi-btn-holder {
      border-radius: 12px;
      outline: 1px solid var(--tropical);
      outline-offset: 2px;
      box-shadow: 0 0 16px rgba(25, 156, 184, 0.26);
    }

    .form-check-input:checked {
      background-color: var(--tropical);
      border-color: var(--tropical);
    }

    settings-panel .nav-pills .nav-link.active,
    settings-panel .theme-pill.active,
    #offcanvas .nav-pills .nav-link.active,
    #offcanvas .theme-pill.active {
      border-color: rgba(246, 102, 36, 0.42) !important;
      background-color: rgba(246, 102, 36, 0.18) !important;
      color: var(--mandarin) !important;
      box-shadow: inset 0 0 0 1px rgba(246, 102, 36, 0.16);
    }

    settings-panel .theme-mode-nav .nav-link.active,
    #offcanvas .theme-mode-nav .nav-link.active {
      border-color: rgba(246, 102, 36, 0.38) !important;
      background-color: rgba(246, 102, 36, 0.17) !important;
      color: var(--mandarin) !important;
    }

    settings-panel #settModal-tab .nav-link.active,
    #offcanvas #settModal-tab .nav-link.active {
      border-color: rgba(246, 102, 36, 0.35) !important;
      background-color: rgba(246, 102, 36, 0.14) !important;
      color: var(--mandarin) !important;
    }

    settings-panel .form-check-input:checked,
    settings-panel input[type="range"],
    #offcanvas .form-check-input:checked,
    #offcanvas input[type="range"] {
      accent-color: var(--mandarin) !important;
    }

    settings-panel .badge-new,
    #offcanvas .badge-new {
      display: none !important;
    }

    #bottom-left .dash-button,
    #bottom-right .dash-button {
      background-color: rgba(2, 42, 113, 0.55);
      color: #fffdf6;
    }

    .tasks-header-icon,
    .notepad-header-icon {
      border-color: var(--tropical) !important;
      background-color: rgba(25, 156, 184, 0.18) !important;
      color: var(--tropical) !important;
    }

    #bottom-left .dash-button.active,
    #bottom-right .dash-button.active {
      background-color: rgba(246, 102, 36, 0.18);
      box-shadow: inset 0 0 0 1px rgba(246, 102, 36, 0.38);
      color: var(--mandarin);
    }

    pomodoro-timer .pomodoro-start,
    pomodoro-timer .pomodoro-stop,
    pomodoro-timer .skip-break,
    pomodoro-timer .task-finish,
    pomodoro-timer .pip-button {
      background-color: rgba(2, 42, 113, 0.58);
      color: #fffdf6;
    }

    body[data-dashboard-mode="focus"] flocus-timedisplay .text-clock,
    pomodoro-timer flocus-timedisplay .text-clock {
      font-size: clamp(4.5rem, 10vw, 8rem) !important;
      line-height: 0.92 !important;
      font-weight: 700 !important;
      letter-spacing: -0.04em !important;
    }

    body[data-dashboard-mode="focus"] pomodoro-timer .pomodoro-durations {
      transform: scale(1.15);
      margin-bottom: 1.5rem;
    }

    .dash-button[data-fl-target="stats"],
    #settModal-stats-tab,
    #settModal-stats,
    [data-bs-target="#settModal-stats"],
    [aria-controls="settModal-stats"] {
      display: none !important;
    }

    flocus-sounds .play-button {
      background: var(--mandarin) !important;
      color: #101827 !important;
    }

    flocus-sounds .reset-button {
      background: var(--tropical) !important;
      color: #101827 !important;
    }

    flocus-sounds .sound button {
      color: #fffdf6;
    }

    body[data-dashboard-mode="onboarding"],
    body[data-dashboard-mode="home"],
    body[data-dashboard-mode="focus"],
    body[data-dashboard-mode="ambient"] {
      background-color: transparent !important;
    }

    .nav-pills .nav-link.active,
    .theme-mode-nav .nav-link.active {
      background-color: var(--tropical);
      color: #101827;
    }

    flocus-timedisplay .text-clock {
      color: #fff !important;
    }

    #onboarding .onboarding-bg-wrapper {
      border: 1px solid rgba(227, 213, 148, 0.24);
      background: linear-gradient(145deg, rgba(2, 42, 113, 0.82), rgba(16, 24, 39, 0.84) 62%, rgba(133, 92, 158, 0.48));
      box-shadow: 0 28px 84px rgba(2, 42, 113, 0.28), inset 0 1px rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(24px) saturate(120%);
    }

    flocus-sounds .soundscapes-wrapper,
    settings-panel #offcanvas,
    #settingsModal .modal-content {
      border-color: rgba(227, 213, 148, 0.24);
    }

    plus-badge,
    .tag[data-tag="free"],
    .tag[data-tag="Free"],
    .tag[data-tag="plus"],
    .tag[data-tag="Plus"],
    flocus-sounds .emoji,
    .playlist-label .emoji {
      display: none !important;
    }

    flocus-sounds .sound-mark,
    .playlist-label .sound-mark {
      align-items: center;
      background: #e7efea;
      border-radius: 6px;
      color: #30493f;
      display: inline-flex;
      font-size: 0.65rem;
      font-weight: 700;
      justify-content: center;
      line-height: 1;
      margin-right: 0.375rem;
    }

    flocus-sounds .sound-mark {
      aspect-ratio: 1;
      flex: 0 0 25px;
    }

    .playlist-label .sound-mark {
      flex: 0 0 auto;
    }

    #settModal-whatsnew-tab,
    #settModal-whatsnew,
    [data-bs-target="#settModal-whatsnew"],
    [aria-controls="settModal-whatsnew"] {
      display: none !important;
    }

    .apply-all-modes {
      transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    }

    .apply-all-modes:hover,
    .apply-all-modes:focus-visible {
      background-color: var(--mandarin) !important;
      border-color: var(--mandarin) !important;
      color: #101827 !important;
      box-shadow: 0 4px 14px rgba(246, 102, 36, 0.35) !important;
    }

    html, body {
      overflow-x: hidden !important;
      max-width: 100vw !important;
    }

    [class*="claude"],
    [id*="claude"],
    [class*="anthropic"],
    [data-testid*="claude"],
    [src*="anthropic"],
    [src*="claude"] {
      display: none !important;
    }

    body > div[style*="position: fixed"][style*="bottom"][style*="right"]:not([class]),
    body > div[style*="z-index: 9999"],
    .antigravity-widget,
    #antigravity-widget {
      display: none !important;
    }

    #settModal-tab .nav-link .badge,
    #settModal-tab .nav-link [class*="badge"],
    #settModal-tab .nav-link [class*="dot"],
    #settModal-tab .nav-link [class*="notification"],
    .settings-sidebar [class*="badge"],
    .settings-sidebar [class*="dot"][class*="notif"] {
      display: none !important;
    }

    body[data-dashboard-mode="onboarding"] [class*="version"],
    body[data-dashboard-mode="onboarding"] [class*="build"],
    #onboarding [class*="version"],
    .version-tag,
    .build-info {
      display: none !important;
    }

    flocus-sounds [class*="spotify-prompt"],
    flocus-sounds [class*="connect-spotify"],
    flocus-sounds .spotify-login,
    flocus-sounds .spotify-cta,
    [class*="spotify-web-player-prompt"],
    .spotify-prompt {
      display: none !important;
    }

    settings-panel .login-prompt-wrapper,
    settings-panel .signed-out-prompt,
    #offcanvas .login-prompt-wrapper,
    #offcanvas .signed-out-prompt {
      display: none !important;
    }

    @media (max-width: 768px) {
      .nestafocus-brand-logo span {
        font-size: 1.15rem !important;
        padding: 0.22rem 0.55rem 0.22rem 0.4rem !important;
      }
      #bottom-left, #bottom-right {
        gap: 6px !important;
      }
      #bottom-left .dash-button,
      #bottom-right .dash-button {
        width: 36px !important;
        height: 36px !important;
      }
    }
    @media (max-width: 480px) {
      .nestafocus-brand-logo span {
        font-size: 1rem !important;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== TABLE DE CORRESPONDANCE DES HASH AMBIANTS =====
  const SOUND_HASH_MAP = {
  "4727b2031ce204388849.mp3": "AirConditioner",
  "d82609962df4eb5975a2.mp3": "AirplaneCabin",
  "8a4187dc126699b9ce0c.mp3": "AirportTerminal",
  "bbfcd4ad25899ad7e164.mp3": "BirdsInWoods",
  "57b6029882984e8958ac.mp3": "BowlingAlley",
  "756d1ff4de368af550c6.mp3": "BrownNoise",
  "60ab645cc7610765b8e1.mp3": "Campfire",
  "fe0d29eaf53d43d7a158.mp3": "CatPurr",
  "2a0ccf3fac23ccffe820.mp3": "CentralPark",
  "f32d9a5b1a26cd8c79cd.mp3": "ClockTicking",
  "702fd7555a2507e595bd.mp3": "CommuterTrain",
  "d10b24ca5c3c126051e2.mp3": "CountrysideMorning",
  "0cc13b0da5899e05f1bd.mp3": "DeepSea",
  "d9118834468455485ec6.mp3": "ExamHall",
  "22b7f37778b17d7b4550.mp3": "Fireplace",
  "4dfc50e9e0db607091e1.mp3": "HeavyRain",
  "8758dc2a2c253cbf633d.mp3": "HomeKitchen",
  "ae331f96d9fd260eba0f.mp3": "JapaneseLibrary",
  "5fafa2f880d6023e564d.mp3": "LaptopKeyboard",
  "d3f3e7e9dbbcb0c0fafd.mp3": "LightRain",
  "0df98d229d06fe5716ff.mp3": "LightRainOnTent",
  "4e06a1f72e4f2a1c9f8a.mp3": "NYCMorning",
  "3d77f4dfcf856e550ff5.mp3": "Office",
  "2330697166645370d78a.mp3": "OuterSpaceRumble",
  "42df10e3ae8d83f524cd.mp3": "PinkNoise",
  "2672781d7fe01d928e83.mp3": "RecordPlayerStatic",
  "d09ad6ae1e94faab79c0.mp3": "RoomFan",
  "fa85f665f53784ea69d8.mp3": "StreetCafe",
  "b00b51d904a8c3960608.mp3": "SummerNight",
  "63d51140cd773192744a.mp3": "Thunderstorm",
  "e2743193a74ae7792dc1.mp3": "Underwater",
  "109a767a3458149c978d.mp3": "Waterfall",
  "018e1a19e38426e0a31e.mp3": "WavesAlpha",
  "e5608b38b7a0608cecd6.mp3": "WavesBeta",
  "e73647855d09b3cdc481.mp3": "WavesDelta",
  "c262640e6e19d2a34b8d.mp3": "WavesGamma",
  "b30c47f9bcfe96928ae4.mp3": "WavesTheta",
  "4d5396d64b052832f108.mp3": "Whales",
  "ab8bb4f562134c4299cd.mp3": "WhiteNoise",
  "834ed376e82c7bc432c4.mp3": "Wind",
  "5b6c53247db27e79041f.mp3": "cafe",
  "9a8f84499b6f6e898daa.mp3": "ocean",
  "7095ceb8eeda6eeff06d.mp3": "rain",
  "c335457062e55d1b089a.mp4": "AirConditioner",
  "4589a23538eaf05ce8b0.mp4": "AirplaneCabin",
  "35d3b17e9de353a78191.mp4": "AirportTerminal",
  "ee95b49efd6ad4bb0e76.mp4": "BirdsInWoods",
  "aaac76a7ad84832a4ddc.mp4": "BowlingAlley",
  "5a0bdbbe77e36124a99f.mp4": "BrownNoise",
  "8869d7cd9885043fd19d.mp4": "Campfire",
  "18bb259c0450a0a97a52.mp4": "CatPurr",
  "d861bc4b027d5b20fccc.mp4": "CentralPark",
  "6ec75011bb66cd40c6f8.mp4": "ClockTicking",
  "62c09e0f5a5108f57771.mp4": "CommuterTrain",
  "98725fc0466f1f3bcf2a.mp4": "CountrysideMorning",
  "873a312f6345ce7445ea.mp4": "DeepSea",
  "dd0075199096b75cc12c.mp4": "ExamHall",
  "b2e5a438a0628dc46bbc.mp4": "Fireplace",
  "7343d73f0cc81523d777.mp4": "HeavyRain",
  "20dcc9d36f5208005751.mp4": "HomeKitchen",
  "086407010f0fa0185e93.mp4": "JapaneseLibrary",
  "40db59bcdc35227f9ab7.mp4": "LaptopKeyboard",
  "007c2304812dfe2d8c23.mp4": "LightRain",
  "fd9d7ad217127a1045d5.mp4": "LightRainOnTent",
  "5582a831d396a919b80a.mp4": "NYCMorning",
  "7a21d9739c6cecac1b2f.mp4": "Office",
  "4d287a41c241c115260e.mp4": "OuterSpaceRumble",
  "b9b396eadc57973cdb16.mp4": "PinkNoise",
  "6bda7502213c9f4e97c9.mp4": "RecordPlayerStatic",
  "bd076de7acfce400fc20.mp4": "RoomFan",
  "df4507abb47894974578.mp4": "StreetCafe",
  "95be410e94c8bb50202a.mp4": "SummerNight",
  "fe6a6111651c344bbb15.mp4": "Thunderstorm",
  "fde61c90bce68f302bb3.mp4": "Underwater",
  "78bc0224b484c58296d2.mp4": "Waterfall",
  "21f2ce8e7319a0048045.mp4": "WavesAlpha",
  "5f60a5e0f0fcdd31d896.mp4": "WavesBeta",
  "65f215f3004d1e3bb56f.mp4": "WavesDelta",
  "a81ebbfee4922837b621.mp4": "WavesGamma",
  "53c331c2c7d18131bd40.mp4": "WavesTheta",
  "50e0923c6d5d97233e14.mp4": "Whales",
  "58f73b9499449cd4f448.mp4": "WhiteNoise",
  "100b85ee78116284346b.mp4": "Wind",
  "fc2c4fc3853f288086c0.mp4": "cafe",
  "5d07b7bec8e7d6bbc1c1.mp4": "ocean",
  "887b357a1948acfba037.mp4": "rain"
};

  // ===== AMBIENT AUDIO SYNTHESIZER (PROCEDURAL WAV BLOBS) =====
  const createAmbientWavUrl = (() => {
    const cache = {};
    return (rawPath) => {
      let name = String(rawPath || 'noise');
      // Resolve hash to sound name
      for (const [hashFile, soundName] of Object.entries(SOUND_HASH_MAP)) {
        if (name.includes(hashFile)) {
          name = soundName;
          break;
        }
      }
      const key = name.toLowerCase();
      if (cache[key]) return cache[key];
      
      const sampleRate = 22050;
      const duration = 4.0;
      const numSamples = Math.floor(sampleRate * duration);
      const buffer = new ArrayBuffer(44 + numSamples * 2);
      const view = new DataView(buffer);
      
      view.setUint32(0, 0x52494646, false); // "RIFF"
      view.setUint32(4, 36 + numSamples * 2, true);
      view.setUint32(8, 0x57415645, false); // "WAVE"
      view.setUint32(12, 0x666d7420, false); // "fmt "
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true); // PCM
      view.setUint16(22, 1, true); // Mono
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      view.setUint32(36, 0x64617461, false); // "data"
      view.setUint32(40, numSamples * 2, true);
      
      let last = 0;
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < numSamples; i++) {
        let sample = 0;
        const white = Math.random() * 2 - 1;
        const t = i / sampleRate;
        
        if (key.includes('thunder')) {
          b0 = 0.99886 * b0 + white * 0.0555;
          b1 = 0.99332 * b1 + white * 0.075;
          const rain = (b0 + b1) * 0.15;
          const thunderRumble = Math.sin(2 * Math.PI * 45 * t) * (Math.sin(2 * Math.PI * 0.3 * t) > 0.7 ? 0.35 : 0.05);
          sample = rain + thunderRumble;
        } else if (key.includes('heavyrain')) {
          b0 = 0.99886 * b0 + white * 0.06;
          b1 = 0.99332 * b1 + white * 0.09;
          sample = (b0 + b1 + white * 0.4) * 0.14;
        } else if (key.includes('lightrain') || key.includes('tent')) {
          b0 = 0.99886 * b0 + white * 0.04;
          sample = (b0 + white * 0.2) * 0.07;
        } else if (key.includes('rain')) {
          b0 = 0.99886 * b0 + white * 0.0555;
          b1 = 0.99332 * b1 + white * 0.075;
          sample = (b0 + b1 + white * 0.3) * 0.09;
        } else if (key.includes('waterfall')) {
          last = (last + 0.1 * white) / 1.1;
          sample = last * 0.6;
        } else if (key.includes('ocean') || key.includes('deepsea') || key.includes('underwater')) {
          last = (last + 0.015 * white) / 1.015;
          const swell = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.22 * t);
          sample = last * 2.2 * swell;
        } else if (key.includes('fire') || key.includes('camp')) {
          last = (last + 0.02 * white) / 1.02;
          const crackle = Math.random() < 0.005 ? (Math.random() * 0.9 - 0.2) : 0;
          sample = (last * 1.1 + crackle) * 0.35;
        } else if (key.includes('fan') || key.includes('airconditioner')) {
          last = (last + 0.02 * white) / 1.02;
          const hum = Math.sin(2 * Math.PI * 120 * t) * 0.08;
          sample = (last * 0.6) + hum;
        } else if (key.includes('wind')) {
          const gust = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.15 * t);
          last = (last + 0.025 * white) / 1.025;
          sample = last * 0.8 * gust;
        } else if (key.includes('clock')) {
          const isTick = (i % Math.floor(sampleRate * 0.5)) < 120;
          sample = isTick ? (Math.sin(2 * Math.PI * 1800 * t) * 0.4) : 0;
        } else if (key.includes('keyboard')) {
          const isClick = Math.random() < 0.001;
          sample = isClick ? (Math.random() * 0.7 - 0.35) : 0;
        } else if (key.includes('birds') || key.includes('countryside') || key.includes('park')) {
          last = (last + 0.01 * white) / 1.01;
          const chirp = Math.sin(2 * Math.PI * (2400 + 400 * Math.sin(2 * Math.PI * 6 * t)) * t) * (Math.random() < 0.003 ? 0.3 : 0);
          sample = (last * 0.2) + chirp;
        } else if (key.includes('waves') || key.includes('gamma') || key.includes('beta') || key.includes('alpha') || key.includes('theta') || key.includes('delta')) {
          const diff = key.includes('gamma') ? 40 : key.includes('beta') ? 20 : key.includes('alpha') ? 10 : key.includes('theta') ? 6 : 2;
          const tone = (Math.sin(2 * Math.PI * 200 * t) + Math.sin(2 * Math.PI * (200 + diff) * t)) * 0.15;
          last = (last + 0.01 * white) / 1.01;
          sample = (last * 0.25) + tone;
        } else if (key.includes('brown')) {
          last = (last + 0.02 * white) / 1.02;
          sample = last * 1.5;
        } else if (key.includes('pink')) {
          b0 = 0.99886 * b0 + white * 0.0555;
          b1 = 0.99332 * b1 + white * 0.075;
          sample = (b0 + b1) * 0.3;
        } else if (key.includes('white')) {
          sample = white * 0.08;
        } else {
          last = (last + 0.025 * white) / 1.025;
          sample = last * 0.5;
        }
        
        const val = Math.max(-1, Math.min(1, sample));
        view.setInt16(44 + i * 2, val < 0 ? val * 0x8000 : val * 0x7FFF, true);
      }
      const blob = new Blob([buffer], { type: 'audio/wav' });
      cache[key] = URL.createObjectURL(blob);
      return cache[key];
    };
  })();

  const setupHowlAudioPatcher = () => {
    const H = window.Howl;
    if (H?.prototype && !H.prototype.nestaAudioPatched) {
      const origInit = H.prototype.init;
      H.prototype.init = function (options) {
        if (options?.src) {
          const list = Array.isArray(options.src) ? options.src : [options.src];
          const needsSynth = list.some((s) => typeof s === 'string' && (s.includes('resources/sounds/ambient/') || !s.includes('.')));
          if (needsSynth) {
            const first = list.find((s) => typeof s === 'string') || 'ambient';
            options = { ...options, src: [createAmbientWavUrl(first)], format: ['wav'] };
          }
        }
        return origInit.call(this, options);
      };
      Object.defineProperty(H.prototype, 'nestaAudioPatched', { value: true });
    }
  };
  setupHowlAudioPatcher();
  const howlChecker = setInterval(() => {
    if (window.Howl?.prototype?.nestaAudioPatched) {
      clearInterval(howlChecker);
    } else {
      setupHowlAudioPatcher();
    }
  }, 100);

  // ===== SUPPORT DES THEMES VIDEO LOCAUX =====
  const patchVideoThemes = () => {
    const catalog = window.Flocus?.themes?.catalog;
    if (!catalog) return;
    const vThemes = [
      { id: 'loficafe-animated', defaultSrc: 'resources/images/themes/f578c6b4e6af48261e67.mp4' },
      { id: 'Fireplace-animated', defaultSrc: 'resources/images/themes/5f776353fd8c17bd56ca.mp4' },
      { id: 'winter-animated', defaultSrc: 'resources/images/themes/6023b8988a11db1d420c.mp4' }
    ];
    vThemes.forEach(({ id, defaultSrc }) => {
      const t = catalog[id];
      if (t) {
        t.type = 'video';
        t.isPlus = false;
        t.src = defaultSrc;
      }
    });
  };
  patchVideoThemes();
  const themeChecker = setInterval(() => {
    if (window.Flocus?.themes?.catalog?.['loficafe-animated']) {
      patchVideoThemes();
      clearInterval(themeChecker);
    }
  }, 100);

  const accounts = window.Flocus?.accounts;
  if (accounts?.userAuthFailed && !accounts.userAuthFailed.localGuestGuard) {
    const userAuthFailed = accounts.userAuthFailed;
    accounts.userAuthFailed = function (...args) {
      if (!this.settings?.token) return;
      return userAuthFailed.apply(this, args);
    };
    Object.defineProperty(accounts.userAuthFailed, 'localGuestGuard', { value: true });
  }

  const flocus = window.Flocus;
  const themes = flocus?.themes;
  const themeKey = 'AbyssalGlow';
  const themeName = 'Abyssal Glow';
  const themeImage = 'resources/images/themes/abyssal-glow.svg';

  if (themes?.catalog) {
    themes.catalog[themeKey] ||= {
      name: themeName, type: 'image', category: 'gradients', showOnAmbient: true, opacity: 0.1, isPlus: false,
      image: themeImage, thumb: themeImage,
      filters: { type: 'Gradient', brightness: 'Dark', color: 'Blue, Cyan, Orange/Yellow, Purple' }
    };

    const addThemeTile = () => {
      const themeHolder = themes.themeHolder;
      if (!themeHolder) return false;
      const selectDefaultIfUnset = () => {
        const widgetGroup = themeHolder.dataset.widget;
        if (widgetGroup && !localStorage.getItem(`flocus_${widgetGroup}_settings`)) themes.selectThemeValue(themeKey);
      };
      if (themeHolder.querySelector(`[data-name="${themeKey}"]`)) { selectDefaultIfUnset(); return true; }

      const themeRow = themeHolder.querySelector('.theme-group[data-category="gradients"] .theme-row');
      if (!themeRow) return false;

      const theme = themes.catalog[themeKey];
      const label = document.createElement('label');
      label.className = 'theme form-check-label label-with-image';
      label.dataset.name = themeKey; label.dataset.category = theme.category;
      label.dataset.ambient = 'true'; label.dataset.type = theme.filters.type;
      label.dataset.brightness = theme.filters.brightness; label.dataset.color = theme.filters.color;
      label.htmlFor = `theme-radio-${themeKey}`;

      const input = document.createElement('input');
      input.className = 'form-check-input'; input.type = 'radio';
      input.name = themes.pickerMode || 'homeTheme'; input.id = `theme-radio-${themeKey}`;
      input.value = themeKey;
      input.addEventListener('change', themes.onThemeInputChange.bind(themes));
      input.addEventListener('change', themes.onThemeSaveGate.bind(themes));

      const tags = document.createElement('div'); tags.className = 'tags';
      const thumbnail = document.createElement('img');
      thumbnail.className = 'theme-thumb option-image'; thumbnail.src = theme.thumb; thumbnail.alt = '';
      const name = document.createElement('span'); name.textContent = theme.name;

      label.append(input, tags, thumbnail, name);
      themeRow.appendChild(label);
      themes.syncRadios();
      selectDefaultIfUnset();
      return true;
    };

    if (!addThemeTile()) {
      const observer = new MutationObserver(() => { if (addThemeTile()) observer.disconnect(); });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (themes?.catalog?.[themeKey] && flocus?.settingsPanel) {
    const migrationKey = 'abyssal-da-applied-v2';
    if (!localStorage.getItem(migrationKey)) {
      ['homeTheme', 'focusTheme', 'ambientTheme'].forEach((widgetGroup) => {
        const groupSettings = { ...flocus.settingsPanel.getSavedSettings(widgetGroup), [widgetGroup]: themeKey };
        flocus.settingsPanel.updateSavedSettings(new CustomEvent('AbyssalThemeDefault', {
          detail: { widgetGroup, target: { name: widgetGroup, value: themeKey, type: 'radio' } }
        }));
        localStorage.setItem(`flocus_${widgetGroup}_settings`, JSON.stringify(groupSettings));
        flocus.settingsPanel.allSettings[widgetGroup] = groupSettings;
      });
      localStorage.removeItem('flocus_abyssal_da_v1');
      localStorage.setItem(migrationKey, '1');
    }

    const mode = document.body.dataset.dashboardMode;
    const activeMode = ['home', 'focus', 'ambient'].includes(mode) ? mode : flocus.startDestination || 'home';
    const widgetGroup = `${activeMode}Theme`;
    const savedTheme = flocus.settingsPanel.getSavedSettings()[widgetGroup]?.[widgetGroup];
    const hasSavedTheme = localStorage.getItem(`flocus_${widgetGroup}_settings`);
    themes.updateTheme(hasSavedTheme ? savedTheme || themeKey : themeKey);

    const selectDefaultThemeForPicker = () => {
      const activeWidget = themes.themeHolder?.dataset.widget;
      if (activeWidget && !localStorage.getItem(`flocus_${activeWidget}_settings`)) themes.selectThemeValue(themeKey);
    };

    // Mode switch event handled
document.addEventListener('shown.bs.tab', selectDefaultThemeForPicker);
    document.addEventListener('shown.bs.offcanvas', selectDefaultThemeForPicker);
  }

  const emojiPattern = /[\u{1F000}-\u{1FAFF}\u2600-\u27BF\uFE0F\u200D]/gu;
  const textSelectors = '#onboarding h1, .eta-success';

  function replaceSoundEmoji(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const items = []; const selector = 'flocus-sounds .sound, .playlist-label';
    if (node.matches(selector)) items.push(node);
    items.push(...node.querySelectorAll(selector));
    items.forEach((item) => {
      const emoji = item.querySelector('.emoji');
      if (!emoji) return;
      const nameElement = item.querySelector('.name') || item.querySelector('.theme-thumb')?.nextElementSibling;
      const name = nameElement?.textContent.trim() || item.dataset.sound || '';
      const initials = name.split(/[\s:]+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase();
      const mark = document.createElement('span');
      mark.className = emoji.classList.contains('theme-thumb') ? 'theme-thumb sound-mark' : 'sound-mark';
      mark.setAttribute('aria-hidden', 'true'); mark.textContent = initials;
      emoji.replaceWith(mark);
      if (item.matches('flocus-sounds .sound')) {
        const control = item.querySelector('button');
        if (control && !control.hasAttribute('aria-label')) control.setAttribute('aria-label', name);
      }
    });
  }

  function cleanText(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      walker.currentNode.textContent = walker.currentNode.textContent.replace(emojiPattern, '').replace(/[ \t]+$/g, '');
    }
  }

  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (parent?.closest(textSelectors)) {
        node.textContent = node.textContent.replace(emojiPattern, '').replace(/[ \t]+$/g, '');
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.matches(textSelectors)) cleanText(node);
    node.querySelectorAll(textSelectors).forEach(cleanText);
  }

  function sanitizeFlocus(root) {
    if (!root) return;
    const whatsNewTab = root.querySelector?.('#settModal-whatsnew-tab') || document.getElementById('settModal-whatsnew-tab');
    if (whatsNewTab) whatsNewTab.remove();
    const whatsNewPane = root.querySelector?.('#settModal-whatsnew') || document.getElementById('settModal-whatsnew');
    if (whatsNewPane) whatsNewPane.remove();

    const supportPane = root.querySelector?.('#settModal-support') || document.getElementById('settModal-support');
    if (supportPane && !supportPane.dataset.customizedSupport) {
      supportPane.dataset.customizedSupport = 'true';
      supportPane.innerHTML = `
        <div class="settings-header"><h3>Support</h3></div>
        <div class="settings-group support" style="padding:2rem 1rem;text-align:center">
          <p style="font-size:1.25rem;font-weight:500;color:var(--fl-color-primary,inherit);margin:0">En construction</p>
        </div>
      `;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      if (currentNode.nodeValue && /Flocus/i.test(currentNode.nodeValue)) {
        currentNode.nodeValue = currentNode.nodeValue.replace(/FLOCUS/g, 'NESTAFOCUS').replace(/Flocus/g, 'NestaFocus').replace(/flocus/g, 'nestafocus');
      }
    }

    const links = root.querySelectorAll ? root.querySelectorAll('a') : [];
    links.forEach((a) => {
      const href = a.getAttribute('href');
      if (href && (href.includes('flocus.com') || href.includes('discord.gg') || href.includes('mailto:support@flocus.com'))) {
        a.removeAttribute('href'); a.removeAttribute('target');
        a.style.cursor = 'default'; a.style.pointerEvents = 'none';
        a.onclick = (e) => { e.preventDefault(); e.stopPropagation(); return false; };
      }
    });

    const statsBtn = root.querySelector?.('.dash-button[data-fl-target="stats"]') || document.querySelector('.dash-button[data-fl-target="stats"]');
    if (statsBtn) statsBtn.remove();
    const statsTab = root.querySelector?.('#settModal-stats-tab') || document.getElementById('settModal-stats-tab');
    if (statsTab) statsTab.remove();
    const statsPane = root.querySelector?.('#settModal-stats') || document.getElementById('settModal-stats');
    if (statsPane) statsPane.remove();

    const renderBeautifulLogo = (el) => {
      if (el.dataset.nestafocusReplaced) return;
      el.dataset.nestafocusReplaced = 'true';
      const wrapper = document.createElement('div');
      wrapper.className = 'logo nestafocus-brand-logo';
      wrapper.innerHTML = '<span>NestaFocus</span>';
      el.replaceWith(wrapper);
    };

    const logos = root.querySelectorAll ? root.querySelectorAll('svg.logo, .logo svg, svg[viewBox="0 0 710.4 206.1"]') : [];
    logos.forEach(renderBeautifulLogo);
    if (root.matches && (root.matches('svg.logo') || root.getAttribute?.('viewBox') === '0 0 710.4 206.1')) {
      renderBeautifulLogo(root);
    }

    if (document.title && /Flocus/i.test(document.title)) {
      document.title = document.title.replace(/Flocus/gi, 'NestaFocus');
    }
  }

  try {
    let rawTitle = document.title.replace(/Flocus/gi, 'NestaFocus');
    Object.defineProperty(document, 'title', {
      get() { return rawTitle; },
      set(val) { rawTitle = String(val).replace(/Flocus/gi, 'NestaFocus'); const titleEl = document.querySelector('title'); if (titleEl) titleEl.textContent = rawTitle; },
      configurable: true
    });
  } catch (e) {}

  cleanNode(document.body);
  replaceSoundEmoji(document.body);
  sanitizeFlocus(document.body);

  new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        cleanNode(node); replaceSoundEmoji(node);
        if (node.nodeType === Node.ELEMENT_NODE) sanitizeFlocus(node);
      });
      if (record.type === 'characterData') cleanNode(record.target);
    });
  }).observe(document.body, { childList: true, characterData: true, subtree: true });
})();



