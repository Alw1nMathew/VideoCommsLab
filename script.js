/* =============================================
   THE BREW LAW — script.js
   ============================================= */

let currentItem  = null;
let currentStage = null;

/* ─── Item data ─────────────────────────────── */
const ITEMS = {
  coffee: {
    name: 'Coffee', icon: '☕',
    stage1: {
      question:     '[Stage 1 decision question for Coffee — add specific wording here]',
      optionA:      'A: [Correct option — add label here]  ✓',
      optionB:      'B: [Wrong option — add label here]  ✗',
      wrongMessage: '[Explain why this was the wrong choice at Stage 1 for Coffee]',
    },
    stage2: {
      question:     '[Stage 2 decision question for Coffee — add specific wording here]',
      optionA:      'A: [Correct option — add label here]  ✓',
      optionB:      'B: [Wrong option — add label here]  ✗',
      wrongMessage: '[Explain why this was the wrong choice at Stage 2 for Coffee]',
    },
  },
  yoghurt: {
    name: 'Yoghurt Bowl', icon: '🥣',
    stage1: {
      question:     '[Stage 1 decision question for Yoghurt Bowl — add specific wording here]',
      optionA:      'A: [Correct option — add label here]  ✓',
      optionB:      'B: [Wrong option — add label here]  ✗',
      wrongMessage: '[Explain why this was the wrong choice at Stage 1 for Yoghurt Bowl]',
    },
    stage2: {
      question:     '[Stage 2 decision question for Yoghurt Bowl — add specific wording here]',
      optionA:      'A: [Correct option — add label here]  ✓',
      optionB:      'B: [Wrong option — add label here]  ✗',
      wrongMessage: '[Explain why this was the wrong choice at Stage 2 for Yoghurt Bowl]',
    },
  },
  matcha: {
    name: 'Matcha', icon: '🍵',
    stage1: {
      question:     '[Stage 1 decision question for Matcha — add specific wording here]',
      optionA:      'A: [Correct option — add label here]  ✓',
      optionB:      'B: [Wrong option — add label here]  ✗',
      wrongMessage: '[Explain why this was the wrong choice at Stage 1 for Matcha]',
    },
    stage2: {
      question:     '[Stage 2 decision question for Matcha — add specific wording here]',
      optionA:      'A: [Correct option — add label here]  ✓',
      optionB:      'B: [Wrong option — add label here]  ✗',
      wrongMessage: '[Explain why this was the wrong choice at Stage 2 for Matcha]',
    },
  },
};

/* ─── Navigation ────────────────────────────── */
function showScreen(id) {
  /* Hide all screens by removing .active — CSS sets
     display:none on .screen (no .active), and
     display:block on .screen.active.
     The body grows/shrinks naturally with content. */
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  const el = document.getElementById('screen-' + id);
  if (!el) return;

  el.classList.add('active');
  window.scrollTo(0, 0);
  updateNav(id);
}

function updateNav(screenId) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const map = { menu: 'menu', 'how-it-works': 'how-it-works', bts: 'bts', about: 'about' };
  if (map[screenId]) {
    const btn = document.querySelector(`.nav-btn[data-target="${map[screenId]}"]`);
    if (btn) btn.classList.add('active');
  }
}

/* ─── Item flow ─────────────────────────────── */
function startItem(key) {
  currentItem  = key;
  currentStage = 1;
  renderStage(1);
}

function renderStage(num) {
  currentStage     = num;
  const item       = ITEMS[currentItem];
  const data       = num === 1 ? item.stage1 : item.stage2;

  set('stage-title',       item.icon + '  ' + item.name + ' — Stage ' + num);
  set('stage-video-label', '[ ' + item.name + ' — Stage ' + num + ' Video ]');
  set('stage-question',    data.question);
  set('stage-btn-a',       data.optionA);
  set('stage-btn-b',       data.optionB);
  set('stage-pill',        item.icon + '  ' + item.name);

  renderProgress('stage-progress', num);

  const hintText = num === 1
    ? 'Only one choice leads forward.\nWatch the video before deciding.'
    : '✓ Stage 1 — complete\n● Stage 2 — in progress';
  html('stage-hint',
    '<p>' + hintText.replace('\n', '</p><p>') + '</p>' +
    '<p class="hint-arrows">→ Correct: ' + (num === 1 ? 'Stage 2' : 'Outcome') + '<br>→ Wrong: End</p>');

  showScreen('item-stage');
}

function handleChoice(choice) {
  if (choice === 'A') {
    // Correct
    currentStage === 1 ? renderStage(2) : renderCorrect();
  } else {
    // Wrong
    renderWrong(currentStage);
  }
}

function renderCorrect() {
  const item = ITEMS[currentItem];
  set('correct-title',       item.icon + '  ' + item.name + ' — Outcome');
  set('correct-video-label', '[ ' + item.name + ' — Outcome Video (Success) ]');
  set('correct-pill',        item.icon + '  ' + item.name);
  html('correct-check',      '✓ Stage 1<br>✓ Stage 2<br>✓ Outcome');
  renderProgress('correct-progress', 3);
  showScreen('item-correct');
}

function renderWrong(stage) {
  const item = ITEMS[currentItem];
  const data = stage === 1 ? item.stage1 : item.stage2;

  set('wrong-tag',         item.icon + '  ' + item.name + ' — Stage ' + stage + ' failure');
  set('wrong-message',     data.wrongMessage);
  set('wrong-video-label', '[ ' + item.name + ' — Wrong Outcome Video (Stage ' + stage + ') ]');

  const btn = document.getElementById('wrong-retry-btn');
  btn.textContent = 'Try Stage ' + stage + ' Again';
  btn.onclick     = () => renderStage(stage);

  showScreen('item-wrong');
}

/* ─── Progress bar ──────────────────────────── */
function renderProgress(containerId, active) {
  const labels = ['Stage 1', 'Stage 2', 'Outcome'];
  const el = document.getElementById(containerId);
  if (!el) return;

  let track = '<div class="progress-track">';
  labels.forEach((_, i) => {
    const n    = i + 1;
    const cls  = n < active ? 'done' : n === active ? 'active' : '';
    track += '<div class="p-dot ' + cls + '"></div>';
    if (i < labels.length - 1) track += '<div class="p-line"></div>';
  });
  track += '</div>';

  let lbls = '<div class="progress-labels">';
  labels.forEach((lbl, i) => {
    const n   = i + 1;
    const cls = n < active ? 'done' : n === active ? 'active' : '';
    lbls += '<div class="p-label ' + cls + '">' + (n < active ? '✓ ' : '') + lbl + '</div>';
  });
  lbls += '</div>';

  el.innerHTML = track + lbls;
}

/* ─── Helpers ───────────────────────────────── */
function set(id, value) { const e = document.getElementById(id); if (e) e.textContent = value; }
function html(id, value) { const e = document.getElementById(id); if (e) e.innerHTML = value; }

/* ─── Init ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => showScreen('landing'));
