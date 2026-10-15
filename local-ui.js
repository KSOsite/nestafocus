(() => {
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
      --abyssal:#022a71;--tropical:#199cb8;--lavender:#855c9e;--mandarin:#f66624;--sand:#e3d594;
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

  const Howl = window.Howl;
  if (Howl?.prototype && !Howl.prototype.localMp3First) {
    const init = Howl.prototype.init;
    Howl.prototype.init = function (options) {
      if (Array.isArray(options?.src) && options.src.some((source) => source.includes('/resources/sounds/ambient/'))) {
        options = { ...options, src: options.src.slice().sort((left, right) => Number(right.endsWith('.mp3')) - Number(left.endsWith('.mp3'))) };
      }
      return init.call(this, options);
    };
    Object.defineProperty(Howl.prototype, 'localMp3First', { value: true });
  }

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
  const themeImage = '/resources/images/themes/abyssal-glow.svg';

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

    document.addEventListener('FlocusChangeDashboard', (event) => {
      const nextMode = event.detail; const nextWidget = `${nextMode}Theme`;
      if (['home', 'focus', 'ambient'].includes(nextMode) && !localStorage.getItem(`flocus_${nextWidget}_settings`)) {
        themes.updateTheme(themeKey);
      }
    });
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
