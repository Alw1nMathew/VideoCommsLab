/* =============================================
   THE BREW LAB — script.js
   Single scrolling page + game overlay
   ============================================= */

let currentItem  = null;
let currentStage = null;

/* ─── Item data ─── */
const ITEMS = {
  coffee: {
    name: 'Coffee', icon: '☕',
    stage1: {
      question: '[Stage 1 decision question for Coffee — add specific wording here]',
      optionA:  'A: [Correct option — add label here]',
      optionB:  'B: [Wrong option — add label here]',
      wrongMsg: '[Explain why this was the wrong choice at Stage 1 for Coffee]',
    },
    stage2: {
      question: '[Stage 2 decision question for Coffee — add specific wording here]',
      optionA:  'A: [Correct option — add label here]',
      optionB:  'B: [Wrong option — add label here]',
      wrongMsg: '[Explain why this was the wrong choice at Stage 2 for Coffee]',
    },
  },
  yoghurt: {
    name: 'Yoghurt Bowl', icon: '🥣',
    stage1: {
      question: '[Stage 1 decision question for Yoghurt Bowl — add specific wording here]',
      optionA:  'A: [Correct option — add label here]',
      optionB:  'B: [Wrong option — add label here]',
      wrongMsg: '[Explain why this was the wrong choice at Stage 1 for Yoghurt Bowl]',
    },
    stage2: {
      question: '[Stage 2 decision question for Yoghurt Bowl — add specific wording here]',
      optionA:  'A: [Correct option — add label here]',
      optionB:  'B: [Wrong option — add label here]',
      wrongMsg: '[Explain why this was the wrong choice at Stage 2 for Yoghurt Bowl]',
    },
  },
  matcha: {
    name: 'Matcha', icon: '🍵',
    stage1: {
      question: '[Stage 1 decision question for Matcha — add specific wording here]',
      optionA:  'A: [Correct option — add label here]',
      optionB:  'B: [Wrong option — add label here]',
      wrongMsg: '[Explain why this was the wrong choice at Stage 1 for Matcha]',
    },
    stage2: {
      question: '[Stage 2 decision question for Matcha — add specific wording here]',
      optionA:  'A: [Correct option — add label here]',
      optionB:  'B: [Wrong option — add label here]',
      wrongMsg: '[Explain why this was the wrong choice at Stage 2 for Matcha]',
    },
  },
};

/* ─── Overlay helpers ─── */
function showOvScreen(id) {
  ['ov-stage','ov-correct','ov-wrong'].forEach(s => {
    document.getElementById(s).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  // Scroll overlay panel back to top
  document.querySelector('.overlay-inner').scrollTop = 0;
}

function openGame(key) {
  currentItem  = key;
  currentStage = 1;
  showStage(1);
  document.getElementById('overlay').classList.remove('hidden');
  // Prevent background page from scrolling while overlay is open
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  document.getElementById('overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function restartItem() { openGame(currentItem); }

/* ─── Game flow ─── */
function showStage(num) {
  currentStage  = num;
  const item    = ITEMS[currentItem];
  const data    = num === 1 ? item.stage1 : item.stage2;

  $('stage-title', item.icon + '  ' + item.name + ' — Stage ' + num);
  $('stage-vid',   '[ ' + item.name + ' — Stage ' + num + ' Video ]');
  $('stage-q',     data.question);
  $('btn-a',       data.optionA);
  $('btn-b',       data.optionB);

  buildProgress('stage-prog', num);

  $$('stage-hint',
    (num === 1
      ? '<p>Only one choice leads forward.<br>Watch the video before deciding.</p>'
      : '<p>✓ Stage 1 — complete</p><p>● Stage 2 — in progress</p>') +
    '<p class="hint-note">→ Correct: ' + (num === 1 ? 'Stage 2' : 'Outcome') + '<br>→ Wrong: End</p>'
  );

  showOvScreen('ov-stage');
}

function choose(option) {
  if (option === 'A') {
    currentStage === 1 ? showStage(2) : showCorrect();
  } else {
    showWrong(currentStage);
  }
}

function showCorrect() {
  const item = ITEMS[currentItem];
  $('correct-title', item.icon + '  ' + item.name + ' — Outcome');
  $('correct-vid',   '[ ' + item.name + ' — Outcome Video (Success) ]');
  buildProgress('correct-prog', 3);
  $$('correct-check', '✓ Stage 1<br>✓ Stage 2<br>✓ Outcome');
  showOvScreen('ov-correct');
}

function showWrong(stage) {
  const item = ITEMS[currentItem];
  const data = stage === 1 ? item.stage1 : item.stage2;

  $('wrong-tag', item.icon + '  ' + item.name + ' — Stage ' + stage + ' failure');
  $('wrong-vid', '[ ' + item.name + ' — Wrong Outcome Video (Stage ' + stage + ') ]');

  const btn = document.getElementById('wrong-retry');
  btn.textContent = 'Try Stage ' + stage + ' Again';
  btn.onclick = () => showStage(stage);

  showOvScreen('ov-wrong');
}

/* ─── Progress bar ─── */
function buildProgress(id, active) {
  const el = document.getElementById(id);
  if (!el) return;
  const steps = ['Stage 1', 'Stage 2', 'Outcome'];

  let track = '<div class="prog-track">';
  steps.forEach((_, i) => {
    const n   = i + 1;
    const cls = n < active ? 'done' : n === active ? 'on' : '';
    track += `<div class="prog-dot ${cls}"></div>`;
    if (i < steps.length - 1) track += '<div class="prog-line"></div>';
  });
  track += '</div><div class="prog-labels">';
  steps.forEach((lbl, i) => {
    const n   = i + 1;
    const cls = n < active ? 'done' : n === active ? 'on' : '';
    track += `<div class="prog-lbl ${cls}">${n < active ? '✓ ' : ''}${lbl}</div>`;
  });
  track += '</div>';
  el.innerHTML = track;
}

/* ─── Nav highlight on scroll ─── */
function updateNavOnScroll() {
  const sections = ['menu','howitworks','bts','about'];
  const scrollY  = window.scrollY + 80;

  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (current) {
    const btn = document.querySelector(`.nav-btn[href="#${current}"]`);
    if (btn) btn.classList.add('active');
  }
}

window.addEventListener('scroll', updateNavOnScroll, { passive: true });

/* ─── Helpers ─── */
function $(id, val)  { const e = document.getElementById(id); if (e) e.textContent = val; }
function $$(id, val) { const e = document.getElementById(id); if (e) e.innerHTML   = val; }
