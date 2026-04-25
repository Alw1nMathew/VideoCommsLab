/* =============================================
   THE BREW LAB — script.js
   ============================================= */
 
let currentItem  = null;
let currentStage = null;
 
/* ─── Content data ─── */
const ITEMS = {
  coffee: {
    name: 'Coffee', icon: '☕',
    stage1: {
      question:     '[Stage 1 decision question for Coffee — add specific wording here]',
      optionA:      'A: [Correct option — add label here]',
      optionB:      'B: [Wrong option — add label here]',
      wrongMsg:     '[Explain why this was the wrong choice at Stage 1 for Coffee]',
    },
    stage2: {
      question:     '[Stage 2 decision question for Coffee — add specific wording here]',
      optionA:      'A: [Correct option — add label here]',
      optionB:      'B: [Wrong option — add label here]',
      wrongMsg:     '[Explain why this was the wrong choice at Stage 2 for Coffee]',
    },
  },
  yoghurt: {
    name: 'Yoghurt Bowl', icon: '🥣',
    stage1: {
      question:     '[Stage 1 decision question for Yoghurt Bowl — add specific wording here]',
      optionA:      'A: [Correct option — add label here]',
      optionB:      'B: [Wrong option — add label here]',
      wrongMsg:     '[Explain why this was the wrong choice at Stage 1 for Yoghurt Bowl]',
    },
    stage2: {
      question:     '[Stage 2 decision question for Yoghurt Bowl — add specific wording here]',
      optionA:      'A: [Correct option — add label here]',
      optionB:      'B: [Wrong option — add label here]',
      wrongMsg:     '[Explain why this was the wrong choice at Stage 2 for Yoghurt Bowl]',
    },
  },
  matcha: {
    name: 'Matcha', icon: '🍵',
    stage1: {
      question:     '[Stage 1 decision question for Matcha — add specific wording here]',
      optionA:      'A: [Correct option — add label here]',
      optionB:      'B: [Wrong option — add label here]',
      wrongMsg:     '[Explain why this was the wrong choice at Stage 1 for Matcha]',
    },
    stage2: {
      question:     '[Stage 2 decision question for Matcha — add specific wording here]',
      optionA:      'A: [Correct option — add label here]',
      optionB:      'B: [Wrong option — add label here]',
      wrongMsg:     '[Explain why this was the wrong choice at Stage 2 for Matcha]',
    },
  },
};
 
/* ─── Navigation ───
   Each page is a <div> that is either visible (no .hidden class)
   or invisible (.hidden = display:none).
   The body height equals whatever the one visible page needs.
   The browser handles scroll with zero intervention from us. */
 
const ALL_PAGES = [
  'landing','menu','howitworks','bts','about',
  'stage','correct','wrong'
];
 
function go(name) {
  ALL_PAGES.forEach(p => {
    const el = document.getElementById('pg-' + p);
    if (el) el.classList.add('hidden');
  });
 
  const target = document.getElementById('pg-' + name);
  if (!target) return;
  target.classList.remove('hidden');
 
  // Jump to very top of the document
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
 
  setNavActive(name);
}
 
function setNavActive(name) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const map = { menu:'menu', howitworks:'howitworks', bts:'bts', about:'about' };
  if (map[name]) {
    const btn = document.querySelector(`.nav-btn[data-screen="${map[name]}"]`);
    if (btn) btn.classList.add('active');
  }
}
 
/* ─── Item flow ─── */
function startItem(key) {
  currentItem  = key;
  currentStage = 1;
  showStage(1);
}
 
function showStage(num) {
  currentStage  = num;
  const item    = ITEMS[currentItem];
  const data    = num === 1 ? item.stage1 : item.stage2;
 
  $('stage-title',   item.icon + '  ' + item.name + ' — Stage ' + num);
  $('stage-vid-lbl', '[ ' + item.name + ' — Stage ' + num + ' Video ]');
  $('stage-question', data.question);
  $('btn-a', data.optionA);
  $('btn-b', data.optionB);
 
  buildProgress('stage-prog', num);
 
  $$('stage-hint',
    (num === 1
      ? '<p>Only one choice leads forward.<br>Watch the video before deciding.</p>'
      : '<p>✓ Stage 1 — complete</p><p>● Stage 2 — in progress</p>') +
    '<p class="hint-note">→ Correct: ' + (num === 1 ? 'Stage 2' : 'Outcome') + '<br>→ Wrong: End</p>'
  );
 
  go('stage');
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
  $('correct-title',   item.icon + '  ' + item.name + ' — Outcome');
  $('correct-vid-lbl', '[ ' + item.name + ' — Outcome Video (Success) ]');
  buildProgress('correct-prog', 3);
  $$('correct-check', '✓ Stage 1<br>✓ Stage 2<br>✓ Outcome');
  go('correct');
}
 
function showWrong(stage) {
  const item = ITEMS[currentItem];
  const data = stage === 1 ? item.stage1 : item.stage2;
 
  $('wrong-tag',     item.icon + '  ' + item.name + ' — Stage ' + stage);
  $('wrong-vid-lbl', '[ ' + item.name + ' — Wrong Outcome Video (Stage ' + stage + ') ]');
 
  const retryBtn = document.getElementById('wrong-retry');
  retryBtn.textContent = 'Try Stage ' + stage + ' Again';
  retryBtn.onclick = () => showStage(stage);
 
  go('wrong');
}
 
/* ─── Progress bar ─── */
function buildProgress(id, active) {
  const el = document.getElementById(id);
  if (!el) return;
  const steps = ['Stage 1', 'Stage 2', 'Outcome'];
 
  let track = '<div class="prog-track">';
  steps.forEach((_, i) => {
    const n = i + 1;
    const cls = n < active ? 'done' : n === active ? 'on' : '';
    track += `<div class="prog-dot ${cls}"></div>`;
    if (i < steps.length - 1) track += '<div class="prog-line"></div>';
  });
  track += '</div>';
 
  let labels = '<div class="prog-labels">';
  steps.forEach((lbl, i) => {
    const n = i + 1;
    const cls = n < active ? 'done' : n === active ? 'on' : '';
    labels += `<div class="prog-lbl ${cls}">${n < active ? '✓ ' : ''}${lbl}</div>`;
  });
  labels += '</div>';
 
  el.innerHTML = track + labels;
}
 
/* ─── Helpers ─── */
function $(id, val) { const e = document.getElementById(id); if (e) e.textContent = val; }
function $$(id, val){ const e = document.getElementById(id); if (e) e.innerHTML = val; }
 
/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => go('landing'));
