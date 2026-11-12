(() => {
  'use strict';

  const STORAGE_KEY = 'nestafocus_productivity_v1';
  const TASKS_MIGRATED_KEY = 'nestafocus_tasks_migrated_v1';
  const icons = {
    tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 6 2 2 4-4"/><path d="M8 12h10M8 18h10"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>',
  };
  const allowedTags = new Set([
    'A', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'DEL', 'DIV', 'EM', 'H1', 'H2',
    'I', 'LI', 'OL', 'P', 'PRE', 'S', 'STRONG', 'U', 'UL',
  ]);
  const priorityOrder = { high: 0, normal: 1, low: 2 };

  let state = { version: 1, tasks: [], notes: [] };
  let activeView = 'tasks';
  let activeNoteId = null;
  let taskFilter = 'active';
  let taskQuery = '';
  let noteQuery = '';
  let app;
  let overlay;
  let saveTimer = 0;
  let saveBlocked = false;
  let storageErrorMessage = '';
  let tasksButton;
  let notesButton;

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  function reportStorageError(message, error) {
    storageErrorMessage = message;
    console.error(`[NestaFocus productivity] ${message}`, error);
    const status = app?.querySelector('[data-save-status]');
    if (status) {
      status.textContent = message;
      status.classList.add('is-error');
    }
  }

  function parseStorage(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (error) {
      reportStorageError(`Could not read existing data from "${key}". The original data has been left untouched.`, error);
      return null;
    }
  }

  function safeLink(value) {
    try {
      const url = new URL(value, location.href);
      return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : '';
    } catch (error) {
      return '';
    }
  }

  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.nodeValue || '');
    if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();

    const output = document.createDocumentFragment();
    if (!allowedTags.has(node.tagName)) {
      node.childNodes.forEach((child) => output.appendChild(cleanNode(child)));
      return output;
    }

    const element = document.createElement(node.tagName.toLowerCase());
    if (node.tagName === 'A') {
      const href = safeLink(node.getAttribute('href') || '');
      if (href) {
        element.setAttribute('href', href);
        element.setAttribute('rel', 'noopener noreferrer');
      }
    }
    node.childNodes.forEach((child) => element.appendChild(cleanNode(child)));
    output.appendChild(element);
    return output;
  }

  function sanitizeHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = String(html || '');
    const clean = document.createElement('div');
    template.content.childNodes.forEach((node) => clean.appendChild(cleanNode(node)));
    return clean.innerHTML;
  }

  function wrapInlineText(text, attributes = {}) {
    let html = escapeHtml(text).replace(/\n/g, '<br>');
    if (attributes.code) html = `<code>${html}</code>`;
    if (attributes.bold) html = `<strong>${html}</strong>`;
    if (attributes.italic) html = `<em>${html}</em>`;
    if (attributes.underline) html = `<u>${html}</u>`;
    if (attributes.strike) html = `<s>${html}</s>`;
    if (attributes.link) {
      const href = safeLink(attributes.link);
      if (href) html = `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${html}</a>`;
    }
    return html;
  }

  function deltaToHtml(delta) {
    if (typeof delta === 'string') return `<p>${escapeHtml(delta).replace(/\n/g, '<br>')}</p>`;
    if (!Array.isArray(delta?.ops)) return '';

    const blocks = [];
    let line = '';
    for (const operation of delta.ops) {
      if (typeof operation.insert !== 'string') continue;
      const attributes = operation.attributes || {};
      const parts = operation.insert.split('\n');
      parts.forEach((part, index) => {
        if (part) line += wrapInlineText(part, attributes);
        if (index < parts.length - 1) {
          if (attributes.header === 1) blocks.push(`<h1>${line || '<br>'}</h1>`);
          else if (attributes.header === 2) blocks.push(`<h2>${line || '<br>'}</h2>`);
          else if (attributes.blockquote) blocks.push(`<blockquote>${line || '<br>'}</blockquote>`);
          else if (attributes['code-block']) blocks.push(`<pre><code>${line || ''}</code></pre>`);
          else if (attributes.list === 'ordered') blocks.push(`<ol><li>${line || '<br>'}</li></ol>`);
          else if (attributes.list) blocks.push(`<ul><li>${line || '<br>'}</li></ul>`);
          else blocks.push(`<p>${line || '<br>'}</p>`);
          line = '';
        }
      });
    }
    if (line) blocks.push(`<p>${line}</p>`);
    return blocks.join('');
  }

  function migrateLegacyTasks() {
    const savedTasks = parseStorage('flocus_taskData');
    const savedSettings = parseStorage('flocus_priorities_settings');
    const storedTasks = Array.isArray(savedTasks) ? savedTasks : (Array.isArray(savedSettings) ? savedSettings : []);
    const liveTasks = [...document.querySelectorAll('.tasks-list flocus-listitem')]
      .filter((task) => !task.isPlaceholder)
      .map((task) => ({
        ulid: task.ulid || task.dataset.ulid,
        name: task.name || task.taskText?.value || task.textContent?.trim(),
        completed: task.completed,
        emoji: task.emoji,
        tag: task.tag,
        duration: task.duration,
        order: task.order,
        parentUlid: task.parentUlid || task.dataset.parentUlid,
      }));
    const sourceTasks = liveTasks.length ? liveTasks : storedTasks;

    return sourceTasks
      .filter((task) => task && !task.isPlaceholder && String(task.name || task.title || task.text || '').trim())
      .map((task, index) => ({
        id: String(task.ulid || task.id || crypto.randomUUID()),
        title: String(task.name || task.title || task.text || '').trim(),
        emoji: String(task.emoji || ''),
        completed: Boolean(task.completed),
        priority: ['high', 'normal', 'low'].includes(task.priority) ? task.priority : 'normal',
        dueDate: '',
        parentId: String(task.parentUlid || task.parentId || ''),
        tag: String(task.tag || ''),
        duration: Number(task.duration) || 0,
        order: Number(task.order) || index,
        createdAt: Number(task.updatedAt || task.createdAt) || Date.now() - index,
      }));
  }

  function migrateLegacyNote() {
    const raw = localStorage.getItem('notepad');
    if (!raw) return [];
    let legacy;
    try {
      legacy = JSON.parse(raw);
    } catch (error) {
      reportStorageError('Could not read the existing note. The original data has been left untouched.', error);
      return [];
    }

    const body = sanitizeHtml(deltaToHtml(legacy));
    if (!body) return [];
    const now = Date.now();
    return [{
      id: crypto.randomUUID(),
      title: 'My notes',
      body,
      createdAt: now,
      updatedAt: now,
    }];
  }

  function normalizeState(value) {
    if (!value || typeof value !== 'object' || !Array.isArray(value.tasks) || !Array.isArray(value.notes)) {
      throw new Error('Stored workspace has an invalid shape.');
    }
    return {
      version: 1,
      tasks: value.tasks.filter((task) => task && typeof task.title === 'string').map((task) => ({
        id: String(task.id || crypto.randomUUID()),
        title: task.title,
        emoji: String(task.emoji || ''),
        completed: Boolean(task.completed),
        priority: ['high', 'normal', 'low'].includes(task.priority) ? task.priority : 'normal',
        dueDate: /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate || '') ? task.dueDate : '',
        parentId: String(task.parentId || ''),
        tag: String(task.tag || ''),
        duration: Number(task.duration) || 0,
        order: Number(task.order) || 0,
        createdAt: Number(task.createdAt) || Date.now(),
      })),
      notes: value.notes.filter((note) => note && typeof note.body === 'string').map((note) => ({
        id: String(note.id || crypto.randomUUID()),
        title: String(note.title || 'Untitled note'),
        body: sanitizeHtml(note.body),
        createdAt: Number(note.createdAt) || Date.now(),
        updatedAt: Number(note.updatedAt) || Date.now(),
      })),
    };
  }

  function loadState() {
    let stored;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      saveBlocked = true;
      reportStorageError('Local storage is unavailable. Changes cannot be saved.', error);
      return;
    }

    if (stored) {
      try {
        state = normalizeState(JSON.parse(stored));
      } catch (error) {
        saveBlocked = true;
        reportStorageError('Saved workspace could not be read. Existing data has been left untouched.', error);
      }
      return;
    }

    state.tasks = migrateLegacyTasks();
    state.notes = migrateLegacyNote();
    if (state.tasks.length) {
      try {
        localStorage.setItem(TASKS_MIGRATED_KEY, '1');
      } catch (error) {
        reportStorageError('Could not mark existing tasks as migrated.', error);
      }
    }
    if (state.tasks.length || state.notes.length) saveState();
  }

  function migrateTasksOnFirstOpen() {
    if (saveBlocked) return;
    try {
      if (localStorage.getItem(TASKS_MIGRATED_KEY)) return;
      const imported = migrateLegacyTasks();
      if (!imported.length) return;
      const knownIds = new Set(state.tasks.map((task) => task.id));
      const missingTasks = imported.filter((task) => !knownIds.has(task.id));
      if (missingTasks.length) state.tasks.unshift(...missingTasks);
      localStorage.setItem(TASKS_MIGRATED_KEY, '1');
      if (missingTasks.length) saveState();
    } catch (error) {
      saveBlocked = true;
      reportStorageError('Could not migrate your existing tasks.', error);
    }
  }

  function saveState() {
    if (saveBlocked) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const status = app?.querySelector('[data-save-status]');
      if (status) {
        status.textContent = 'All changes saved';
        status.classList.remove('is-error');
      }
    } catch (error) {
      saveBlocked = true;
      reportStorageError('Could not save your workspace. Free up browser storage and reload to try again.', error);
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    const status = app?.querySelector('[data-save-status]');
    if (status) {
      status.textContent = 'Saving…';
      status.classList.remove('is-error');
    }
    saveTimer = setTimeout(saveState, 300);
  }

  function buildApp() {
    overlay = document.createElement('div');
    overlay.className = 'nf-productivity-overlay';
    overlay.id = 'nf-productivity-overlay';
    overlay.innerHTML = `
      <section class="nf-productivity-app" role="dialog" aria-modal="true" aria-labelledby="nf-productivity-title">
        <header class="nf-productivity-header">
          <div class="nf-productivity-brand">
            <span class="nf-productivity-mark">${icons.tasks}</span>
            <div><h1 id="nf-productivity-title">Your workspace</h1><p>Tasks and notes, together in one place.</p></div>
          </div>
          <div class="nf-productivity-header-actions">
            <nav class="nf-productivity-tabs" role="tablist" aria-label="Workspace sections">
              <button type="button" role="tab" id="nf-tasks-tab" aria-controls="nf-tasks-panel" class="is-active" data-view="tasks" aria-selected="true">${icons.tasks}<span>Tasks</span></button>
              <button type="button" role="tab" id="nf-notes-tab" aria-controls="nf-notes-panel" data-view="notes" aria-selected="false">${icons.notes}<span>Notes</span></button>
            </nav>
            <button type="button" class="nf-productivity-close" data-action="close" aria-label="Close workspace">${icons.close}</button>
          </div>
        </header>
        <main class="nf-productivity-main">
          <section class="nf-productivity-view is-active" id="nf-tasks-panel" role="tabpanel" aria-labelledby="nf-tasks-tab" data-view-panel="tasks" aria-label="Tasks">
            <div class="nf-tasks-top">
              <div><span class="nf-eyebrow">MAKE SPACE FOR WHAT MATTERS</span><h2>Tasks</h2><p data-task-summary>Keep your next steps clear and manageable.</p></div>
              <div class="nf-task-progress" aria-label="Task completion"><span data-progress-label>0%</span><div><i data-progress-bar></i></div></div>
            </div>
            <form class="nf-task-add" data-form="task">
              <span class="nf-task-add-icon">${icons.plus}</span>
              <input name="title" type="text" maxlength="160" placeholder="What needs to get done?" aria-label="New task" required>
              <select name="priority" aria-label="Task priority"><option value="normal">Normal</option><option value="high">High priority</option><option value="low">Low priority</option></select>
              <button type="submit">Add task</button>
            </form>
            <div class="nf-task-toolbar">
              <div class="nf-task-filters" role="group" aria-label="Filter tasks">
                <button type="button" data-filter="active">To do <span data-count-active>0</span></button>
                <button type="button" data-filter="all">All <span data-count-all>0</span></button>
                <button type="button" data-filter="done">Completed <span data-count-done>0</span></button>
              </div>
              <label class="nf-search"><span class="nf-sr-only">Search tasks</span><span aria-hidden="true">⌕</span><input type="search" data-task-search placeholder="Search tasks"></label>
            </div>
            <div class="nf-task-list" data-task-list></div>
            <footer class="nf-productivity-footer"><span data-save-status aria-live="polite">Saved on this device</span><button type="button" class="nf-text-button" data-action="clear-completed">Clear completed</button></footer>
          </section>
          <section class="nf-productivity-view nf-notes-view" id="nf-notes-panel" role="tabpanel" aria-labelledby="nf-notes-tab" data-view-panel="notes" aria-label="Notes" hidden>
            <aside class="nf-notes-sidebar">
              <div class="nf-notes-sidebar-head"><div><span class="nf-eyebrow">YOUR THOUGHTS</span><h2>Notes</h2></div><button type="button" class="nf-icon-button" data-action="new-note" aria-label="Create a note" title="Create a note">${icons.plus}</button></div>
              <label class="nf-search nf-notes-search"><span class="nf-sr-only">Search notes</span><span aria-hidden="true">⌕</span><input type="search" data-note-search placeholder="Find a note"></label>
              <div class="nf-note-list" data-note-list></div>
              <div class="nf-notes-sidebar-foot">Private notes saved in this browser.</div>
            </aside>
            <div class="nf-note-editor" data-note-editor></div>
          </section>
        </main>
      </section>
    `;
    document.body.appendChild(overlay);
    app = overlay.querySelector('.nf-productivity-app');
    if (storageErrorMessage) {
      const status = app.querySelector('[data-save-status]');
      status.textContent = storageErrorMessage;
      status.classList.add('is-error');
    }
    overlay.addEventListener('click', handleClick);
    overlay.addEventListener('submit', handleSubmit);
    overlay.addEventListener('input', handleInput);
    overlay.addEventListener('change', handleChange);
    overlay.addEventListener('keydown', handleKeydown);
    overlay.addEventListener('paste', handlePaste);
    overlay.addEventListener('focusout', handleFocusout);
    renderTasks();
    renderNotes();
    renderNoteEditor();
  }

  function updateView(view) {
    activeView = view;
    overlay.querySelectorAll('[data-view]').forEach((button) => {
      const selected = button.dataset.view === view;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', String(selected));
    });
    overlay.querySelectorAll('[data-view-panel]').forEach((panel) => {
      const selected = panel.dataset.viewPanel === view;
      panel.classList.toggle('is-active', selected);
      panel.hidden = !selected;
    });
    if (view === 'notes') {
      const editor = app.querySelector('[data-note-title]');
      (editor || app.querySelector('[data-action="new-note"]')).focus();
    } else {
      app.querySelector('[name="title"]').focus();
    }
  }

  function openWorkspace(view) {
    if (!overlay) return;
    if (view === 'tasks') migrateTasksOnFirstOpen();
    if (!overlay.classList.contains('is-open')) {
      overlay.classList.add('is-open');
      document.body.classList.add('nf-productivity-open');
    }
    updateView(view);
    tasksButton?.classList.toggle('active', view === 'tasks');
    notesButton?.classList.toggle('active', view === 'notes');
  }

  function closeWorkspace() {
    clearTimeout(saveTimer);
    saveState();
    overlay.classList.remove('is-open');
    document.body.classList.remove('nf-productivity-open');
    tasksButton?.classList.remove('active');
    notesButton?.classList.remove('active');
  }

  function addTask(title, priority) {
    const cleanTitle = String(title || '').trim();
    if (!cleanTitle) return;
    state.tasks.unshift({
      id: crypto.randomUUID(),
      title: cleanTitle,
      emoji: '',
      completed: false,
      priority: ['high', 'normal', 'low'].includes(priority) ? priority : 'normal',
      dueDate: '',
      parentId: '',
      tag: '',
      duration: 0,
      order: Date.now(),
      createdAt: Date.now(),
    });
    taskFilter = 'active';
    saveState();
    renderTasks();
    app.querySelector('[name="title"]').focus();
  }

  function taskMatchesFilter(task) {
    if (taskFilter === 'active') return !task.completed;
    if (taskFilter === 'done') return task.completed;
    return true;
  }

  function renderTasks() {
    if (!app) return;
    const activeCount = state.tasks.filter((task) => !task.completed).length;
    const completedCount = state.tasks.length - activeCount;
    const progress = state.tasks.length ? Math.round((completedCount / state.tasks.length) * 100) : 0;
    app.querySelector('[data-task-summary]').textContent = state.tasks.length
      ? `${activeCount} left · ${completedCount} completed`
      : 'A calmer plan starts with one small step.';
    app.querySelector('[data-progress-label]').textContent = `${progress}%`;
    app.querySelector('[data-progress-bar]').style.width = `${progress}%`;
    app.querySelector('[data-count-active]').textContent = activeCount;
    app.querySelector('[data-count-all]').textContent = state.tasks.length;
    app.querySelector('[data-count-done]').textContent = completedCount;
    app.querySelectorAll('[data-filter]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === taskFilter);
      button.setAttribute('aria-pressed', String(button.dataset.filter === taskFilter));
    });

    const query = taskQuery.trim().toLowerCase();
    const existingIds = new Set(state.tasks.map((task) => task.id));
    const visibleTasks = state.tasks
      .filter((task) => taskMatchesFilter(task) && (!query || `${task.title} ${task.tag}`.toLowerCase().includes(query)))
      .sort((a, b) => Number(a.completed) - Number(b.completed) ||
        priorityOrder[a.priority] - priorityOrder[b.priority] ||
        (a.order || 0) - (b.order || 0) ||
        (b.createdAt || 0) - (a.createdAt || 0));
    const list = app.querySelector('[data-task-list]');
    if (!visibleTasks.length) {
      const emptyTitle = query ? 'No matching tasks' : (taskFilter === 'done' ? 'Nothing completed yet' : 'You’re all caught up');
      const emptyText = query ? 'Try another search.' : (taskFilter === 'done' ? 'Completed tasks will show up here.' : 'Add a task above to get started.');
      list.innerHTML = `<div class="nf-empty-state"><span class="nf-empty-icon">${icons.tasks}</span><strong>${emptyTitle}</strong><p>${emptyText}</p></div>`;
      return;
    }

    list.innerHTML = visibleTasks.map((task) => `
      <article class="nf-task-row${task.completed ? ' is-completed' : ''}${task.parentId && existingIds.has(task.parentId) ? ' is-subtask' : ''}" data-task-id="${escapeHtml(task.id)}">
        <label class="nf-task-check"><input type="checkbox" data-task-field="completed" aria-label="Mark ${escapeHtml(task.title)} complete"${task.completed ? ' checked' : ''}><span></span></label>
        <div class="nf-task-content">
          <div class="nf-task-title-wrap">${task.emoji ? `<span class="nf-task-emoji" aria-hidden="true">${escapeHtml(task.emoji)}</span>` : ''}<input class="nf-task-title" type="text" maxlength="160" data-task-field="title" aria-label="Task title" placeholder="${task.parentId ? 'Subtask title' : 'Task title'}" value="${escapeHtml(task.title)}"></div>
          <div class="nf-task-meta">
            ${task.tag ? `<span class="nf-task-tag">${escapeHtml(task.tag)}</span>` : ''}
            ${task.duration ? `<span>${Math.round(task.duration / 60)} min</span>` : ''}
            <input class="nf-task-date" type="date" data-task-field="dueDate" value="${escapeHtml(task.dueDate)}" aria-label="Due date">
          </div>
        </div>
        <select class="nf-task-priority priority-${task.priority}" data-task-field="priority" aria-label="Priority">
          <option value="high"${task.priority === 'high' ? ' selected' : ''}>High</option>
          <option value="normal"${task.priority === 'normal' ? ' selected' : ''}>Normal</option>
          <option value="low"${task.priority === 'low' ? ' selected' : ''}>Low</option>
        </select>
        <button type="button" class="nf-icon-button nf-task-add-subtask" data-action="add-subtask" aria-label="Add subtask to ${escapeHtml(task.title)}" title="Add subtask">${icons.plus}</button>
        <button type="button" class="nf-icon-button nf-task-delete" data-action="delete-task" aria-label="Delete ${escapeHtml(task.title)}" title="Delete task">${icons.trash}</button>
      </article>
    `).join('');
  }

  function createNote() {
    const now = Date.now();
    const note = { id: crypto.randomUUID(), title: '', body: '<p><br></p>', createdAt: now, updatedAt: now };
    state.notes.unshift(note);
    activeNoteId = note.id;
    saveState();
    renderNotes();
    renderNoteEditor();
    app.querySelector('[data-note-title]')?.focus();
  }

  function selectedNote() {
    return state.notes.find((note) => note.id === activeNoteId) || null;
  }

  function notePreview(html) {
    const parsed = new DOMParser().parseFromString(sanitizeHtml(html), 'text/html');
    return (parsed.body.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function renderNotes() {
    if (!app) return;
    const query = noteQuery.trim().toLowerCase();
    const notes = [...state.notes]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((note) => !query || `${note.title} ${notePreview(note.body)}`.toLowerCase().includes(query));
    const list = app.querySelector('[data-note-list]');
    if (!notes.length) {
      list.innerHTML = `<div class="nf-notes-empty">${query ? 'No notes found.' : 'Your notes will appear here.'}</div>`;
      return;
    }
    list.innerHTML = notes.map((note) => {
      const title = note.title.trim() || 'Untitled note';
      const preview = notePreview(note.body) || 'No additional text';
      return `<button type="button" class="nf-note-item${note.id === activeNoteId ? ' is-active' : ''}" data-note-id="${escapeHtml(note.id)}"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(preview)}</span><time>${new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time></button>`;
    }).join('');
  }

  function renderNoteEditor() {
    if (!app) return;
    const panel = app.querySelector('[data-note-editor]');
    const note = selectedNote();
    if (!note) {
      panel.innerHTML = `<div class="nf-note-welcome"><span class="nf-empty-icon">${icons.notes}</span><h3>A space for your thoughts</h3><p>Keep ideas, plans, and little reminders close by.</p><button type="button" data-action="new-note">${icons.plus} Create your first note</button></div>`;
      return;
    }
    panel.innerHTML = `
      <div class="nf-note-editor-head">
        <input type="text" data-note-title maxlength="100" aria-label="Note title" placeholder="Untitled note" value="${escapeHtml(note.title)}">
        <button type="button" class="nf-icon-button" data-action="delete-note" aria-label="Delete note" title="Delete note">${icons.trash}</button>
      </div>
      <div class="nf-note-toolbar" role="toolbar" aria-label="Text formatting">
        <button type="button" data-command="bold" aria-label="Bold" title="Bold"><strong>B</strong></button>
        <button type="button" data-command="italic" aria-label="Italic" title="Italic"><em>I</em></button>
        <button type="button" data-command="underline" aria-label="Underline" title="Underline"><u>U</u></button>
        <span></span>
        <button type="button" data-command="insertUnorderedList" aria-label="Bulleted list" title="Bulleted list">• List</button>
        <button type="button" data-command="insertOrderedList" aria-label="Numbered list" title="Numbered list">1. List</button>
        <button type="button" data-command="formatBlock" data-command-value="blockquote" aria-label="Quote" title="Quote">“ ”</button>
      </div>
      <div class="nf-note-content" data-note-content contenteditable="true" role="textbox" aria-multiline="true" aria-label="Note content">${sanitizeHtml(note.body)}</div>
      <footer class="nf-note-footer"><span data-save-status aria-live="polite">Saved on this device</span><span data-note-count>0 words · 0 characters</span></footer>
    `;
    updateNoteCount();
  }

  function updateNoteCount() {
    const editor = app?.querySelector('[data-note-content]');
    const count = app?.querySelector('[data-note-count]');
    if (!editor || !count) return;
    const text = editor.innerText.trim();
    const words = text ? text.split(/\s+/).length : 0;
    count.textContent = `${words} ${words === 1 ? 'word' : 'words'} · ${text.length} characters`;
  }

  function updateTaskField(row, field, value) {
    const task = state.tasks.find((item) => item.id === row.dataset.taskId);
    if (!task) return;
    if (field === 'completed') task.completed = Boolean(value);
    else if (field === 'title') task.title = String(value).trimStart().slice(0, 160);
    else if (field === 'priority' && ['high', 'normal', 'low'].includes(value)) task.priority = value;
    else if (field === 'dueDate' && (!value || /^\d{4}-\d{2}-\d{2}$/.test(value))) task.dueDate = value;
    task.updatedAt = Date.now();
    if (field === 'completed' || field === 'priority' || field === 'dueDate') {
      saveState();
      renderTasks();
    } else {
      scheduleSave();
    }
  }

  function handleClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target === overlay || target.closest('[data-action="close"]')) {
      closeWorkspace();
      return;
    }
    const viewButton = target.closest('[data-view]');
    if (viewButton) {
      updateView(viewButton.dataset.view);
      return;
    }
    const filterButton = target.closest('[data-filter]');
    if (filterButton) {
      taskFilter = filterButton.dataset.filter;
      renderTasks();
      return;
    }
    const noteButton = target.closest('[data-note-id]');
    if (noteButton) {
      activeNoteId = noteButton.dataset.noteId;
      renderNotes();
      renderNoteEditor();
      app.querySelector('[data-note-title]')?.focus();
      return;
    }
    const commandButton = target.closest('[data-command]');
    if (commandButton) {
      const editor = app.querySelector('[data-note-content]');
      editor?.focus();
      const command = commandButton.dataset.command;
      const value = commandButton.dataset.commandValue;
      if (command === 'formatBlock') document.execCommand(command, false, `<${value}>`);
      else document.execCommand(command, false);
      handleNoteInput();
      return;
    }
    const action = target.closest('[data-action]')?.dataset.action;
    if (action === 'new-note') createNote();
    if (action === 'add-subtask') {
      const parent = state.tasks.find((task) => task.id === target.closest('[data-task-id]')?.dataset.taskId);
      if (!parent) return;
      const subtask = {
        id: crypto.randomUUID(),
        title: '',
        emoji: '',
        completed: false,
        priority: parent.priority,
        dueDate: parent.dueDate,
        parentId: parent.id,
        tag: parent.tag,
        duration: 0,
        order: Date.now(),
        createdAt: Date.now(),
      };
      state.tasks.push(subtask);
      saveState();
      renderTasks();
      app.querySelector(`[data-task-id="${subtask.id}"] [data-task-field="title"]`)?.focus();
    }
    if (action === 'delete-task') {
      const row = target.closest('[data-task-id]');
      state.tasks = state.tasks.filter((task) => task.id !== row?.dataset.taskId);
      saveState();
      renderTasks();
    }
    if (action === 'delete-note') {
      state.notes = state.notes.filter((note) => note.id !== activeNoteId);
      activeNoteId = state.notes[0]?.id || null;
      saveState();
      renderNotes();
      renderNoteEditor();
    }
    if (action === 'clear-completed') {
      state.tasks = state.tasks.filter((task) => !task.completed);
      saveState();
      renderTasks();
    }
  }

  function handleSubmit(event) {
    if (event.target.dataset.form !== 'task') return;
    event.preventDefault();
    const form = event.target;
    addTask(form.elements.title.value, form.elements.priority.value);
    form.reset();
  }

  function handleInput(event) {
    const target = event.target;
    if (target.matches('[data-task-search]')) {
      taskQuery = target.value;
      renderTasks();
      const search = app.querySelector('[data-task-search]');
      search.focus();
      search.setSelectionRange(taskQuery.length, taskQuery.length);
      return;
    }
    if (target.matches('[data-note-search]')) {
      noteQuery = target.value;
      renderNotes();
      return;
    }
    if (target.matches('[data-task-field="title"]')) {
      updateTaskField(target.closest('[data-task-id]'), 'title', target.value);
      return;
    }
    if (target.matches('[data-note-title]')) {
      const note = selectedNote();
      if (!note) return;
      note.title = target.value.slice(0, 100);
      note.updatedAt = Date.now();
      renderNotes();
      scheduleSave();
      return;
    }
    if (target.matches('[data-note-content]')) handleNoteInput();
  }

  function handleChange(event) {
    const target = event.target;
    const field = target.dataset.taskField;
    if (field) {
      updateTaskField(target.closest('[data-task-id]'), field, field === 'completed' ? target.checked : target.value);
    }
  }

  function handleNoteInput() {
    const note = selectedNote();
    const editor = app.querySelector('[data-note-content]');
    if (!note || !editor) return;
    note.body = sanitizeHtml(editor.innerHTML);
    note.updatedAt = Date.now();
    updateNoteCount();
    scheduleSave();
  }

  function handlePaste(event) {
    if (!event.target.matches?.('[data-note-content]')) return;
    const clipboard = event.clipboardData;
    if (!clipboard) return;
    event.preventDefault();
    const html = clipboard.getData('text/html');
    const text = clipboard.getData('text/plain');
    const content = html ? sanitizeHtml(html) : escapeHtml(text).replace(/\n/g, '<br>');
    document.execCommand('insertHTML', false, content);
    handleNoteInput();
  }

  function handleFocusout(event) {
    if (event.target.matches?.('[data-note-content]')) {
      event.target.innerHTML = sanitizeHtml(event.target.innerHTML);
    }
  }

  function handleKeydown(event) {
    if (event.target.matches?.('[data-view]') && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      const nextView = event.target.dataset.view === 'tasks' ? 'notes' : 'tasks';
      updateView(nextView);
      app.querySelector(`[data-view="${nextView}"]`).focus();
      return;
    }
    if (event.key === 'Escape') {
      closeWorkspace();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && activeView === 'tasks') {
      event.preventDefault();
      app.querySelector('[name="title"]').focus();
    }
  }

  function bindButton(button, view, label, icon) {
    if (!button || button.dataset.nfProductivityBound) return Boolean(button);
    button.dataset.nfProductivityBound = view;
    button.innerHTML = icon;
    button.setAttribute('aria-label', label);
    button.title = `${label} — open workspace`;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (overlay?.classList.contains('is-open') && activeView === view) closeWorkspace();
      else openWorkspace(view);
    }, true);
    return true;
  }

  function bindLegacyButtons() {
    const flocus = window.Flocus;
    const taskReady = bindButton(flocus?.priorities?.button, 'tasks', 'Tasks', icons.tasks);
    const noteHost = document.querySelector('flocus-notepad');
    const noteReady = bindButton(noteHost?.button, 'notes', 'Notes', icons.notes);
    tasksButton = flocus?.priorities?.button || tasksButton;
    notesButton = noteHost?.button || notesButton;
    return taskReady && noteReady;
  }

  function init() {
    loadState();
    buildApp();
    if (bindLegacyButtons()) return;

    const observer = new MutationObserver(() => {
      if (bindLegacyButtons()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
