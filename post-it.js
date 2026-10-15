(() => {
  // ===== CONFIG =====
  const STORAGE_KEY = 'nestafocus_postits_v8';
  const OLD_STORAGE_KEYS = ['nestafocus_postits_v7', 'nestafocus_postits_v6'];
  const COLORS = [
    '#fce588',  // Jaune pastel
    '#ffc9c9',  // Rose pêche
    '#b2f2bb',  // Vert menthe
    '#a5d8ff',  // Bleu ciel
    '#e5d4ff',  // Lavande
    '#ffd8a8',  // Orange pêche
  ];
  const MIN_WIDTH = 160;
  const MIN_HEIGHT = 140;
  const DRAG_THRESHOLD = 3;
  const Z_NORMALIZE_THRESHOLD = 100000;
  const LONG_PRESS_DELAY = 600;

  // ===== STATE =====
  let notes = [];
  let layer = null;
  let trash = null;
  let saveTimer = 0;
  let draggedNote = null;
  let activeColorPicker = null;
  let isDraggingNote = false;

  // ===== SVG ICONS =====
  const ICONS = {
    postit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M16 2v4a2 2 0 0 0 2 2h-6"/><path d="M12 18v-6"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    visible: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    ghost: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'
  };

  // ===== STYLES =====
  const style = document.createElement('style');
  style.textContent = `
    /* ===== LAYER ===== */
    .nestafocus-postits-layer {
      position: fixed;
      inset: 0;
      z-index: 12;
      pointer-events: none;
      overflow: hidden;
      contain: strict;
    }
    
    .nestafocus-postits-layer > * {
      pointer-events: auto;
    }
    
    body[data-dashboard-mode="onboarding"] .nestafocus-postits-layer {
      display: none !important;
    }
    
    /* ===== POST-IT ===== */
    .nf-postit {
      position: absolute;
      width: ${MIN_WIDTH}px;
      min-height: ${MIN_HEIGHT}px;
      padding: 0;
      border: none;
      border-radius: 2px 2px 10px 2px;
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.12),
        0 4px 16px rgba(0, 0, 0, 0.08),
        inset 0 -28px 36px -24px rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transform-origin: top left;
      transition: 
        transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform, box-shadow;
      background: #fce588;
    }
    
    .nf-postit:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.16),
        0 8px 24px rgba(0, 0, 0, 0.12),
        inset 0 -28px 36px -24px rgba(0, 0, 0, 0.06);
    }
    
    .nf-postit::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 18px 18px 0;
      border-color: transparent rgba(0, 0, 0, 0.08) transparent transparent;
      pointer-events: none;
    }
    
    .nf-postit.is-dragging {
      cursor: grabbing;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      z-index: 1000 !important;
    }
    
    .nf-postit.dragging-to-trash {
      opacity: 0.3;
      transform: scale(0.95) !important;
    }
    
    /* ===== MODE FANTÔME ===== */
    .nf-postit.ghost {
      opacity: 0.25;
      filter: grayscale(0.3);
    }
    
    .nf-postit.ghost:hover {
      opacity: 0.5;
    }
    
    .nf-postit.ghost .nf-postit-body,
    .nf-postit.ghost .nf-postit-resizer,
    .nf-postit.ghost .nf-postit-color,
    .nf-postit.ghost .nf-postit-grip {
      pointer-events: none;
      user-select: none;
    }
    
    .nf-postit.ghost .nf-postit-color,
    .nf-postit.ghost .nf-postit-resizer {
      opacity: 0.3;
    }
    
    /* ===== HEADER ===== */
    .nf-postit-header {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.4rem 0.5rem 0.3rem;
      cursor: grab;
      user-select: none;
      flex-shrink: 0;
      transition: background 0.15s ease;
    }
    
    .nf-postit-header:active {
      background: rgba(0, 0, 0, 0.04);
    }
    
    .nf-postit.is-dragging .nf-postit-header {
      cursor: grabbing;
    }
    
    .nf-postit-grip {
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.06);
      margin-right: 0.25rem;
    }
    
    /* ===== BUTTONS ===== */
    .nf-postit-btn {
      appearance: none;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: transparent;
      color: rgba(0, 0, 0, 0.54);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    
    .nf-postit-btn:hover {
      background: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.87);
    }
    
    .nf-postit-btn:active {
      background: rgba(0, 0, 0, 0.12);
      transform: scale(0.92);
    }
    
    .nf-postit-btn svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 1.75;
      fill: none;
    }
    
    /* ===== COLOR PICKER ===== */
    .nf-color-picker {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 4px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
      padding: 0.5rem;
      display: flex;
      gap: 0.375rem;
      flex-wrap: wrap;
      max-width: 200px;
      z-index: 1001;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
    
    .nf-color-picker.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }
    
    .nf-color-swatch {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .nf-color-swatch:hover {
      transform: scale(1.15);
      border-color: rgba(0, 0, 0, 0.2);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
    
    .nf-color-swatch.active {
      border-color: rgba(0, 0, 0, 0.6);
      transform: scale(1.1);
    }
    
    /* ===== BODY ===== */
    .nf-postit-body {
      flex: 1;
      width: 100%;
      min-height: 100px;
      border: none;
      resize: none;
      background: transparent;
      color: rgba(0, 0, 0, 0.87);
      font: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 0.5rem;
      outline: none;
      cursor: text;
      pointer-events: auto;
    }
    
    .nf-postit-body::placeholder {
      color: rgba(0, 0, 0, 0.38);
    }
    
    .nf-postit-body:focus {
      color: rgba(0, 0, 0, 0.95);
    }
    
    /* ===== RESIZER ===== */
    .nf-postit-resizer {
      position: absolute;
      width: 18px;
      height: 18px;
      right: 0;
      bottom: 0;
      cursor: nwse-resize;
      pointer-events: auto;
      z-index: 2;
      transition: opacity 0.15s ease;
      opacity: 0;
    }
    
    .nf-postit:hover .nf-postit-resizer {
      opacity: 1;
    }
    
    .nf-postit-resizer::before {
      content: "";
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 12px;
      height: 12px;
      background-image: 
        linear-gradient(135deg, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 40%, transparent 40%, transparent 50%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3) 60%, transparent 60%, transparent 70%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.3) 80%, transparent 80%);
      border-radius: 1px;
      transition: opacity 0.15s ease;
    }
    
    .nf-postit-resizer:hover::before {
      background-image: 
        linear-gradient(135deg, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 40%, transparent 40%, transparent 50%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.5) 60%, transparent 60%, transparent 70%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.5) 80%, transparent 80%);
    }
    
    .nf-postit.is-resizing {
      transition: none !important;
      will-change: width, height;
      user-select: none;
    }
    
    .nf-postit.is-resizing .nf-postit-body {
      pointer-events: none;
      user-select: none;
    }
    
    /* ===== TRASH ===== */
    .nestafocus-trash {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      width: 56px;
      height: 56px;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      pointer-events: auto;
      z-index: 13;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px dashed transparent;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    
    .nestafocus-trash.visible {
      display: flex;
    }
    
    .nestafocus-trash:hover {
      background: rgba(211, 47, 47, 0.08);
      border-color: rgba(211, 47, 47, 0.24);
      box-shadow: 0 4px 16px rgba(211, 47, 47, 0.16);
    }
    
    .nestafocus-trash.highlight {
      background: rgba(211, 47, 47, 0.16);
      border-color: rgba(211, 47, 47, 0.48);
      transform: translateX(-50%) scale(1.15);
      box-shadow: 0 8px 24px rgba(211, 47, 47, 0.24);
    }
    
    .nestafocus-trash svg {
      width: 28px;
      height: 28px;
      stroke: rgba(0, 0, 0, 0.38);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nestafocus-trash:hover svg,
    .nestafocus-trash.highlight svg {
      stroke: #d32f2f;
      transform: scale(1.1);
    }
    
    .nestafocus-trash.highlight svg {
      transform: scale(1.2);
    }
    
    /* ===== TOOLBAR BUTTON ===== */
    .dash-button[data-nestafocus-postit-add] {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    
    .dash-button[data-nestafocus-postit-add].active {
      background-color: rgba(255, 82, 82, 0.12);
      box-shadow: inset 0 0 0 1px rgba(255, 82, 82, 0.32);
      color: #ff5252;
    }
    
    .dash-button[data-nestafocus-postit-add] svg {
      transition: transform 0.2s ease;
    }
    
    .dash-button[data-nestafocus-postit-add]:hover svg {
      transform: scale(1.1);
    }
    
    /* ===== BADGE ===== */
    .nf-postit-hidden-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      border-radius: 8px;
      background: #ff5252;
      color: white;
      font-size: 10px;
      font-weight: 700;
      line-height: 16px;
      text-align: center;
      pointer-events: none;
      display: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    
    .nf-postit-hidden-badge.visible {
      display: block;
    }
    
    /* ===== MISC ===== */
    .nf-postit-header, .nf-postit-btn, .nf-postit-resizer {
      -webkit-tap-highlight-color: transparent;
    }
  `;
  document.head.appendChild(style);

  // ===== INITIALIZATION =====
  function init() {
    migrateOldData();
    loadNotes();
    ensureLayer();
    updateTrashVisibility();
    mountAll();
    setupToolbarButton();
    setupEventListeners();
  }

  function migrateOldData() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    for (const oldKey of OLD_STORAGE_KEYS) {
      const oldData = localStorage.getItem(oldKey);
      if (oldData) {
        localStorage.setItem(STORAGE_KEY, oldData);
        console.log(`✅ Post-its migrés de ${oldKey} vers ${STORAGE_KEY}`);
        return;
      }
    }
  }

  function loadNotes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      notes = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(notes)) notes = [];
      
      notes = notes.map((note, index) => ({
        id: note.id || crypto.randomUUID(),
        x: note.x || 100,
        y: note.y || 100,
        text: note.text || '',
        color: note.color || COLORS[0],
        rot: note.rot || 0,
        z: note.z || index + 1,
        lastUsed: note.lastUsed || note.z || (Date.now() + index),
        width: note.width || MIN_WIDTH,
        height: note.height || MIN_HEIGHT,
        hidden: Boolean(note.hidden)
      }));
    } catch (e) {
      notes = [];
    }
  }

  function ensureLayer() {
    if (layer?.isConnected) return;
    layer = document.createElement('div');
    layer.className = 'nestafocus-postits-layer';
    layer.setAttribute('aria-label', 'Post-its');
    document.body.appendChild(layer);
  }

  function updateTrashVisibility() {
    const hasAnyNotes = notes.length > 0;
    
    if (hasAnyNotes) {
      ensureTrash();
      if (trash) trash.classList.add('visible');
    } else {
      if (trash) trash.classList.remove('visible');
    }
    
    updateHiddenBadge();
  }

  function updateHiddenBadge() {
    const btn = document.querySelector('[data-nestafocus-postit-add]');
    if (!btn) return;
    
    let badge = btn.querySelector('.nf-postit-hidden-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'nf-postit-hidden-badge';
      btn.appendChild(badge);
    }
    
    const ghostCount = notes.filter(n => n.hidden).length;
    if (ghostCount > 0) {
      badge.textContent = String(ghostCount);
      badge.classList.add('visible');
    } else {
      badge.classList.remove('visible');
    }
    
    btn.title = ghostCount > 0 
      ? `Post-it (Alt+N) — ${ghostCount} en mode fantôme (clic droit pour réactiver)`
      : 'Post-it (Alt+N)';
  }

  function ensureTrash() {
    if (trash?.isConnected) return;
    trash = document.createElement('div');
    trash.className = 'nestafocus-trash';
    trash.innerHTML = ICONS.trash;
    trash.setAttribute('aria-label', 'Glissez un post-it ici pour le supprimer');
    
    trash.addEventListener('pointerenter', () => {
      if (draggedNote) trash.classList.add('highlight');
    });
    trash.addEventListener('pointerleave', () => {
      trash.classList.remove('highlight');
    });
    
    trash.addEventListener('pointerup', () => {
      if (draggedNote) {
        removeNote(draggedNote.id);
        resetDragState();
      }
    });
    
    document.body.appendChild(trash);
  }

  function mountAll() {
    const sortedNotes = [...notes].sort((a, b) => (a.lastUsed || 0) - (b.lastUsed || 0));
    
    sortedNotes.forEach((note, index) => {
      note.z = index + 1;
    });
    
    sortedNotes.forEach(note => {
      const el = renderNote(note);
      if (el) {
        const clamped = clampPosition(note.x, note.y, el);
        note.x = clamped.x;
        note.y = clamped.y;
        el.style.left = `${clamped.x}px`;
        el.style.top = `${clamped.y}px`;
        el.style.zIndex = String(note.z);
        if (note.hidden) el.classList.add('ghost');
      }
    });
    saveNotes();
    updateTrashVisibility();
  }

  function setupToolbarButton() {
    const bar = document.getElementById('bottom-left') || document.getElementById('bottom-right');
    if (!bar) {
      const observer = new MutationObserver(() => {
        const newBar = document.getElementById('bottom-left') || document.getElementById('bottom-right');
        if (newBar && !newBar.querySelector('[data-nestafocus-postit-add]')) {
          createToolbarButton(newBar);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return;
    }
    
    if (!bar.querySelector('[data-nestafocus-postit-add]')) {
      createToolbarButton(bar);
    }
  }

  function createToolbarButton(bar) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dash-button';
    btn.dataset.nestafocusPostitAdd = 'true';
    btn.setAttribute('aria-label', 'Ajouter un post-it');
    btn.title = 'Post-it (Alt+N)';
    btn.innerHTML = ICONS.postit;
    
    // Clic gauche : ajouter un post-it
    btn.addEventListener('click', (e) => {
      if (e.shiftKey || e.altKey) return;
      const note = addNote();
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 300);
      
      setTimeout(() => {
        const el = layer?.querySelector(`[data-id="${note.id}"] .nf-postit-body`);
        if (el) {
          el.focus();
          const len = el.value.length;
          el.setSelectionRange(len, len);
        }
      }, 50);
    });
    
    // Clic droit : ré-afficher tous les fantômes
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      revealAllGhosts();
    });
    
    // Long press (mobile)
    let longPressTimer = null;
    btn.addEventListener('touchstart', () => {
      longPressTimer = setTimeout(() => {
        btn.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
      }, LONG_PRESS_DELAY);
    }, { passive: true });
    btn.addEventListener('touchend', () => {
      if (longPressTimer) clearTimeout(longPressTimer);
    });
    btn.addEventListener('touchmove', () => {
      if (longPressTimer) clearTimeout(longPressTimer);
    });
    
    bar.appendChild(btn);
    updateHiddenBadge();
  }

  function revealAllGhosts() {
    const ghostNotes = notes.filter(n => n.hidden);
    if (ghostNotes.length === 0) return;
    
    ghostNotes.forEach(note => {
      note.hidden = false;
      note.lastUsed = Date.now();
      const el = layer?.querySelector(`[data-id="${note.id}"]`);
      if (el) {
        el.classList.remove('ghost');
        const hideBtn = el.querySelector('.nf-postit-hide');
        if (hideBtn) {
          hideBtn.innerHTML = ICONS.visible;
          hideBtn.title = 'Passer en mode fantôme';
        }
      }
    });
    
    const allSorted = [...notes].sort((a, b) => (a.lastUsed || 0) - (b.lastUsed || 0));
    allSorted.forEach((note, index) => {
      note.z = index + 1;
      const el = layer?.querySelector(`[data-id="${note.id}"]`);
      if (el) el.style.zIndex = String(note.z);
    });
    
    saveNotes();
    updateTrashVisibility();
  }

  function setupEventListeners() {
    window.addEventListener('resize', debounce(() => {
      notes.forEach(note => {
        const el = layer?.querySelector(`[data-id="${note.id}"]`);
        if (!el) return;
        const clamped = clampPosition(note.x, note.y, el);
        note.x = clamped.x;
        note.y = clamped.y;
        el.style.left = `${clamped.x}px`;
        el.style.top = `${clamped.y}px`;
      });
      saveNotes();
    }, 100), { passive: true });

    document.addEventListener('keydown', (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      if (e.altKey && (e.key === 'n' || e.key === 'N')) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        if (document.body.dataset.dashboardMode === 'onboarding') return;
        e.preventDefault();
        const note = addNote();
        setTimeout(() => {
          const el = layer?.querySelector(`[data-id="${note.id}"] .nf-postit-body`);
          if (el) {
            el.focus();
            const len = el.value.length;
            el.setSelectionRange(len, len);
          }
        }, 50);
      }
    });

    document.addEventListener('pointermove', (e) => {
      if (!draggedNote || !trash) return;
      
      const trashRect = trash.getBoundingClientRect();
      const isOverTrash = (
        e.clientX >= trashRect.left &&
        e.clientX <= trashRect.right &&
        e.clientY >= trashRect.top &&
        e.clientY <= trashRect.bottom
      );
      
      trash.classList.toggle('highlight', isOverTrash);
    });

    document.addEventListener('click', (e) => {
      if (activeColorPicker && !e.target.closest('.nf-postit-color') && !e.target.closest('.nf-color-picker')) {
        activeColorPicker.classList.remove('show');
        activeColorPicker = null;
      }
    });
  }

  // ===== NOTE OPERATIONS =====
  function addNote(partial = {}) {
    const count = notes.length;
    const maxZ = Math.max(...notes.map(n => n.z || 0), 0);
    const note = {
      id: crypto.randomUUID(),
      x: partial.x ?? Math.round(window.innerWidth * 0.22 + (count % 5) * 28),
      y: partial.y ?? Math.round(window.innerHeight * 0.18 + (count % 4) * 32),
      text: partial.text || '',
      color: partial.color || COLORS[0],
      rot: partial.rot || Math.round((Math.random() * 6 - 3) * 10) / 10,
      z: maxZ + 1,
      lastUsed: Date.now(),
      width: partial.width || MIN_WIDTH,
      height: partial.height || MIN_HEIGHT,
      hidden: false
    };
    notes.push(note);
    const el = renderNote(note);
    if (el) {
      const clamped = clampPosition(note.x, note.y, el);
      note.x = clamped.x;
      note.y = clamped.y;
      el.style.left = `${clamped.x}px`;
      el.style.top = `${clamped.y}px`;
      el.style.zIndex = String(note.z);
    }
    saveNotes();
    updateTrashVisibility();
    return note;
  }

  function removeNote(id) {
    notes = notes.filter(n => n.id !== id);
    layer?.querySelector(`[data-id="${id}"]`)?.remove();
    saveNotes();
    updateTrashVisibility();
  }

  function toggleGhost(note) {
    note.hidden = !note.hidden;
    
    const el = layer?.querySelector(`[data-id="${note.id}"]`);
    if (el) {
      el.classList.toggle('ghost', note.hidden);
      const hideBtn = el.querySelector('.nf-postit-hide');
      if (hideBtn) {
        hideBtn.innerHTML = note.hidden ? ICONS.ghost : ICONS.visible;
        hideBtn.title = note.hidden ? 'Mode fantôme (clic pour réactiver)' : 'Passer en mode fantôme';
      }
    }
    
    if (!note.hidden) {
      note.lastUsed = Date.now();
      bringToFront(note);
    }
    
    saveNotes();
    updateTrashVisibility();
  }

  function setColor(note, color) {
    note.color = color;
    const el = layer?.querySelector(`[data-id="${note.id}"]`);
    if (el) {
      el.style.backgroundColor = color;
      // Update active state on swatches
      el.querySelectorAll('.nf-color-swatch').forEach(sw => {
        sw.classList.toggle('active', sw.dataset.color === color);
      });
    }
    saveNotes();
  }

  // ===== RENDERING =====
  function renderNote(note) {
    if (!layer) return;
    
    let el = layer.querySelector(`[data-id="${note.id}"]`);
    if (el) return el;

    el = document.createElement('article');
    el.className = 'nf-postit';
    el.dataset.id = note.id;
    el.style.left = `${note.x}px`;
    el.style.top = `${note.y}px`;
    el.style.backgroundColor = note.color || COLORS[0];
    el.style.transform = `rotate(${note.rot}deg)`;
    el.style.zIndex = String(note.z);
    el.style.width = `${note.width || MIN_WIDTH}px`;
    el.style.height = `${note.height || MIN_HEIGHT}px`;
    if (note.hidden) el.classList.add('ghost');

    el.innerHTML = `
      <div class="nf-postit-header">
        <span class="nf-postit-grip" aria-hidden="true"></span>
        <button type="button" class="nf-postit-btn nf-postit-color" title="Changer la couleur" aria-label="Changer la couleur">
          ${ICONS.palette}
          <div class="nf-color-picker">
            ${COLORS.map(color => `<div class="nf-color-swatch${color === note.color ? ' active' : ''}" style="background: ${color};" data-color="${color}"></div>`).join('')}
          </div>
        </button>
        <button type="button" class="nf-postit-btn nf-postit-hide" title="${note.hidden ? 'Mode fantôme (clic pour réactiver)' : 'Passer en mode fantôme'}" aria-label="Mode fantôme">
          ${note.hidden ? ICONS.ghost : ICONS.visible}
        </button>
      </div>
      <textarea class="nf-postit-body" placeholder="Écrire ici…" maxlength="2000">${escapeHtml(note.text || '')}</textarea>
      <div class="nf-postit-resizer" aria-hidden="true"></div>
    `;

    const body = el.querySelector('.nf-postit-body');
    const header = el.querySelector('.nf-postit-header');
    const colorBtn = el.querySelector('.nf-postit-color');
    const hideBtn = el.querySelector('.nf-postit-hide');
    const colorPicker = el.querySelector('.nf-color-picker');
    const resizer = el.querySelector('.nf-postit-resizer');

    // ===== GLOBAL : bringToFront sur TOUT clic dans le post-it =====
    el.addEventListener('pointerdown', () => {
      bringToFront(note);
    }, true);

    // ===== CLIC SUR UN FANTÔME = RÉACTIVATION =====
    el.addEventListener('click', (e) => {
      if (note.hidden) {
        toggleGhost(note);
        e.stopPropagation();
        e.preventDefault();
      }
    }, true);

    // ===== TEXT INPUT =====
    body.addEventListener('input', () => {
      note.text = body.value;
      saveNotes();
    });

    body.addEventListener('blur', () => {
      note.text = body.value;
      saveNotes();
    });

    // ===== COLOR PICKER =====
    colorBtn.addEventListener('click', (e) => {
      document.querySelectorAll('.nf-color-picker.show').forEach(picker => {
        if (picker !== colorPicker) {
          picker.classList.remove('show');
        }
      });
      colorPicker.classList.toggle('show');
      activeColorPicker = colorPicker.classList.contains('show') ? colorPicker : null;
      e.stopPropagation();
      e.preventDefault();
    });

    colorPicker.addEventListener('click', (e) => {
      const swatch = e.target.closest('.nf-color-swatch');
      if (swatch) {
        setColor(note, swatch.dataset.color);
        colorPicker.classList.remove('show');
        activeColorPicker = null;
        e.stopPropagation();
        e.preventDefault();
      }
    });

    // ===== HIDE TOGGLE (GHOST) =====
    hideBtn.addEventListener('click', (e) => {
      toggleGhost(note);
      e.stopPropagation();
      e.preventDefault();
    });

    // ===== DRAG TO MOVE (Header only) =====
    header.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      if (e.target.closest('.nf-postit-btn')) return;
      
      draggedNote = note;
      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = parseFloat(el.style.left);
      const startTop = parseFloat(el.style.top);
      isDraggingNote = true;
      let hasMoved = false;
      
      const onMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        
        if (!hasMoved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
          hasMoved = true;
          el.classList.add('is-dragging');
          header.setPointerCapture(e.pointerId);
        }
        
        if (hasMoved) {
          let nx = startLeft + dx;
          let ny = startTop + dy;
          const clamped = clampPosition(nx, ny, el);
          el.style.left = `${clamped.x}px`;
          el.style.top = `${clamped.y}px`;
          note.x = clamped.x;
          note.y = clamped.y;
          
          if (trash) {
            const trashRect = trash.getBoundingClientRect();
            const noteRect = el.getBoundingClientRect();
            const isOverTrash = (
              noteRect.right > trashRect.left &&
              noteRect.left < trashRect.right &&
              noteRect.bottom > trashRect.top &&
              noteRect.top < trashRect.bottom
            );
            trash.classList.toggle('highlight', isOverTrash);
            el.classList.toggle('dragging-to-trash', isOverTrash);
          }
        }
      };

      const onUp = () => {
        el.classList.remove('is-dragging', 'dragging-to-trash');
        if (header.hasPointerCapture(e.pointerId)) {
          header.releasePointerCapture(e.pointerId);
        }
        isDraggingNote = false;
        
        if (hasMoved && trash) {
          const trashRect = trash.getBoundingClientRect();
          const noteRect = el.getBoundingClientRect();
          const isOverTrash = (
            noteRect.right > trashRect.left &&
            noteRect.left < trashRect.right &&
            noteRect.bottom > trashRect.top &&
            noteRect.top < trashRect.bottom
          );
          
          if (isOverTrash) {
            removeNote(note.id);
          }
          trash.classList.remove('highlight');
        }
        
        draggedNote = null;
        if (hasMoved) saveNotes();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      e.preventDefault();
    });

    // ===== RESIZE (amélioré) =====
    resizer.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      isDraggingNote = true;
      el.classList.add('is-resizing');
      
      const startWidth = el.offsetWidth;
      const startHeight = el.offsetHeight;
      const startX = e.clientX;
      const startY = e.clientY;
      
      // Compenser la rotation du post-it
      const rotation = (note.rot || 0) * Math.PI / 180;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      
      const onResize = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        
        // Ajuster pour la rotation
        const adjustedDx = dx * cos + dy * sin;
        const adjustedDy = -dx * sin + dy * cos;
        
        const newWidth = Math.max(MIN_WIDTH, startWidth + adjustedDx);
        const newHeight = Math.max(MIN_HEIGHT, startHeight + adjustedDy);
        
        el.style.width = `${newWidth}px`;
        el.style.height = `${newHeight}px`;
        note.width = newWidth;
        note.height = newHeight;
      };

      const onUp = () => {
        el.classList.remove('is-resizing');
        saveNotes();
        isDraggingNote = false;
        try {
          resizer.releasePointerCapture(e.pointerId);
        } catch (err) {}
        window.removeEventListener('pointermove', onResize);
        window.removeEventListener('pointerup', onUp);
      };

      resizer.setPointerCapture(e.pointerId);
      window.addEventListener('pointermove', onResize);
      window.addEventListener('pointerup', onUp);
    });

    layer.appendChild(el);
    return el;
  }

  // ===== HELPERS =====
  function clampPosition(x, y, el) {
    const w = el?.offsetWidth || MIN_WIDTH;
    const h = el?.offsetHeight || MIN_HEIGHT;
    const maxX = Math.max(8, window.innerWidth - w - 8);
    const maxY = Math.max(8, window.innerHeight - h - 8);
    return {
      x: Math.min(Math.max(8, x), maxX),
      y: Math.min(Math.max(8, y), maxY),
    };
  }

  function bringToFront(note) {
    const maxZ = Math.max(...notes.map(n => n.z || 0), 0);
    if (maxZ > Z_NORMALIZE_THRESHOLD) {
      normalizeZIndexes();
    }
    
    const newMaxZ = Math.max(...notes.map(n => n.z || 0), 0);
    if (note.z === newMaxZ) {
      note.lastUsed = Date.now();
      saveNotes();
      return;
    }
    
    note.z = newMaxZ + 1;
    note.lastUsed = Date.now();
    
    const el = layer?.querySelector(`[data-id="${note.id}"]`);
    if (el) {
      el.style.zIndex = String(note.z);
    }
    
    saveNotes();
  }

  function normalizeZIndexes() {
    const sorted = [...notes].sort((a, b) => (a.z || 0) - (b.z || 0));
    sorted.forEach((note, index) => {
      note.z = index + 1;
      const el = layer?.querySelector(`[data-id="${note.id}"]`);
      if (el) el.style.zIndex = String(note.z);
    });
  }

  function saveNotes() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, 300);
  }

  function resetDragState() {
    draggedNote = null;
    
    layer?.querySelectorAll('.nf-postit').forEach(el => {
      el.classList.remove('dragging-to-trash', 'is-dragging');
    });
    
    if (trash) trash.classList.remove('highlight');
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ===== INIT =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();