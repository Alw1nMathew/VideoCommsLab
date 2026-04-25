/* =============================================
   THE BREW LAB — script.js
   ============================================= */

let currentItem  = null;
let currentStage = null;

const ITEMS = {
  coffee: {
    name: 'Coffee', icon: '☕',
    stage1: { question: '[Stage 1 decision question for Coffee]', optionA: 'A: [Correct option]', optionB: 'B: [Wrong option]', wrongMsg: '[Explain why Stage 1 choice was wrong for Coffee]' },
    stage2: { question: '[Stage 2 decision question for Coffee]', optionA: 'A: [Correct option]', optionB: 'B: [Wrong option]', wrongMsg: '[Explain why Stage 2 choice was wrong for Coffee]' },
  },
  yoghurt: {
    name: 'Yoghurt Bowl', icon: '🥣',
    stage1: { question: '[Stage 1 decision question for Yoghurt Bowl]', optionA: 'A: [Correct option]', optionB: 'B: [Wrong option]', wrongMsg: '[Explain why Stage 1 choice was wrong for Yoghurt Bowl]' },
    stage2: { question: '[Stage 2 decision question for Yoghurt Bowl]', optionA: 'A: [Correct option]', optionB: 'B: [Wrong option]', wrongMsg: '[Explain why Stage 2 choice was wrong for Yoghurt Bowl]' },
  },
  matcha: {
    name: 'Matcha', icon: '🍵',
    stage1: { question: '[Stage 1 decision question for Matcha]', optionA: 'A: [Correct option]', optionB: 'B: [Wrong option]', wrongMsg: '[Explain why Stage 1 choice was wrong for Matcha]' },
    stage2: { question: '[Stage 2 decision question for Matcha]', optionA: 'A: [Correct option]', optionB: 'B: [Wrong option]', wrongMsg: '[Explain why Stage 2 choice was wrong for Matcha]' },
  },
};

/* ── Overlay ── */
function showOv(id) {
  ['ov-stage','ov-correct','ov-wrong'].forEach(s => document.getElementById(s).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  const panel = document.querySelector('.overlay-panel');
  if (panel) panel.scrollTop = 0;
}

function openGame(key) {
  currentItem = key;
  showStage(1);
  document.getElementById('overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  document.getElementById('overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function restartItem() { openGame(currentItem); }

/* ── Game flow ── */
function showStage(num) {
  currentStage = num;
  const item = ITEMS[currentItem];
  const data = num === 1 ? item.stage1 : item.stage2;

  $('stage-title', item.icon + '  ' + item.name + ' — Stage ' + num);
  $('stage-vid',   '[ ' + item.name + ' — Stage ' + num + ' Video ]');
  $('stage-q',     data.question);
  $('btn-a',       data.optionA);
  $('btn-b',       data.optionB);

  buildProg('stage-prog', num);
  $$('stage-hint',
    (num === 1
      ? '<p>Only one choice leads forward.<br>Watch the full video first.</p>'
      : '<p>✓ Stage 1 — complete</p><p>● Stage 2 — in progress</p>') +
    '<p class="hint-note">→ Correct: ' + (num === 1 ? 'Stage 2' : 'Outcome') + '<br>→ Wrong: End</p>'
  );
  showOv('ov-stage');
}

function choose(option) {
  option === 'A'
    ? (currentStage === 1 ? showStage(2) : showCorrect())
    : showWrong(currentStage);
}

function showCorrect() {
  const item = ITEMS[currentItem];
  $('correct-title', item.icon + '  ' + item.name + ' — Outcome');
  $('correct-vid',   '[ ' + item.name + ' — Outcome Video (Success) ]');
  buildProg('correct-prog', 3);
  $$('correct-check', '✓ Stage 1<br>✓ Stage 2<br>✓ Outcome');
  showOv('ov-correct');
}

function showWrong(stage) {
  const item = ITEMS[currentItem];
  $('wrong-tag', item.icon + '  ' + item.name + ' — Stage ' + stage + ' failure');
  $('wrong-vid', '[ ' + item.name + ' — Wrong Outcome Video (Stage ' + stage + ') ]');
  const btn = document.getElementById('wrong-retry');
  btn.textContent = 'Try Stage ' + stage + ' Again';
  btn.onclick = () => showStage(stage);
  showOv('ov-wrong');
}

/* ── Progress bar ── */
function buildProg(id, active) {
  const el = document.getElementById(id);
  if (!el) return;
  const steps = ['Stage 1', 'Stage 2', 'Outcome'];
  let t = '<div class="prog-track">';
  steps.forEach((_, i) => {
    const n = i + 1, cls = n < active ? 'done' : n === active ? 'on' : '';
    t += `<div class="prog-dot ${cls}"></div>`;
    if (i < 2) t += '<div class="prog-line"></div>';
  });
  t += '</div><div class="prog-labels">';
  steps.forEach((lbl, i) => {
    const n = i + 1, cls = n < active ? 'done' : n === active ? 'on' : '';
    t += `<div class="prog-lbl ${cls}">${n < active ? '✓ ' : ''}${lbl}</div>`;
  });
  el.innerHTML = t + '</div>';
}

/* ── Nav highlight on scroll ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);

  const ids = ['menu','howitworks','bts','about'];
  const y   = window.scrollY + 90;
  let cur   = '';
  ids.forEach(id => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (cur) { const btn = document.querySelector(`.nav-btn[href="#${cur}"]`); if (btn) btn.classList.add('active'); }
}, { passive: true });

/* ── Helpers ── */
function $(id, v)  { const e = document.getElementById(id); if (e) e.textContent = v; }
function $$(id, v) { const e = document.getElementById(id); if (e) e.innerHTML   = v; }
