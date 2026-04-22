/* =============================================
   THE BREW LAB — script.js
   Navigation, game logic, dynamic content
   ============================================= */

// ──────────────────────────────────────────────
// GLOBAL STATE
// ──────────────────────────────────────────────
let currentItem  = null;   // 'coffee' | 'yoghurt' | 'matcha'
let currentStage = null;   // 1 | 2

// ──────────────────────────────────────────────
// ITEM DATA
// Replace placeholder strings with real content
// when the decision questions are finalised.
// ──────────────────────────────────────────────
const ITEMS = {

  coffee: {
    name: 'Coffee',
    icon: '☕',
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
    name: 'Yoghurt Bowl',
    icon: '🥣',
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
    name: 'Matcha',
    icon: '🍵',
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

// ──────────────────────────────────────────────
// SCREEN NAVIGATION
// ──────────────────────────────────────────────

/**
 * Show a screen by its ID suffix.
 * e.g. showScreen('menu')  →  shows  #screen-menu
 */
function showScreen(id) {
  // Fade out all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  const el = document.getElementById('screen-' + id);
  if (!el) { console.warn('Screen not found: screen-' + id); return; }

  // Screens that need flex centering
  const flexScreens = ['landing', 'item-wrong'];
  el.style.display = flexScreens.includes(id) ? 'flex' : 'block';

  // Trigger reflow so the animation replays
  void el.offsetWidth;
  el.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateNavHighlight(id);
}

/** Highlight the correct nav button for the active screen */
function updateNavHighlight(screenId) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const navMap = {
    'menu':         'menu',
    'how-it-works': 'how-it-works',
    'bts':          'bts',
    'about':        'about',
  };

  const target = navMap[screenId];
  if (target) {
    const btn = document.querySelector(`.nav-btn[data-target="${target}"]`);
    if (btn) btn.classList.add('active');
  }
}

// ──────────────────────────────────────────────
// ITEM FLOW
// ──────────────────────────────────────────────

/** Called when the user selects a menu item */
function startItem(itemKey) {
  currentItem  = itemKey;
  currentStage = 1;
  renderStage(1);
}

/** Render the shared stage screen with content for the given stage number */
function renderStage(stageNum) {
  currentStage = stageNum;
  const item      = ITEMS[currentItem];
  const stageData = stageNum === 1 ? item.stage1 : item.stage2;

  // Title
  setText('stage-title',       `${item.icon}  ${item.name} — Stage ${stageNum}`);

  // Video placeholder
  setText('stage-video-label', `[ ${item.name} — Stage ${stageNum} Video ]`);

  // Decision question
  setText('stage-question',    stageData.question);

  // Choice buttons
  setText('stage-btn-a',       stageData.optionA);
  setText('stage-btn-b',       stageData.optionB);

  // Sidebar
  renderProgressBar('stage-progress', stageNum);
  setText('stage-pill', `${item.icon}  ${item.name}`);

  const hint = stageNum === 1
    ? `Only one choice leads forward.<br>Watch the video before deciding.
       <div class="hint-arrows">→ Correct: Stage 2<br>→ Wrong: End</div>`
    : `✓ Stage 1 — complete<br>● Stage 2 — in progress
       <div class="hint-arrows">→ Correct: Outcome<br>→ Wrong: End</div>`;
  setHTML('stage-hint', hint);

  showScreen('item-stage');
}

/** Handle a choice on the current stage */
function handleChoice(choice) {
  if (choice === 'A') {
    // ── Correct ──
    if (currentStage === 1) {
      renderStage(2);
    } else {
      renderCorrectOutcome();
    }
  } else {
    // ── Wrong ──
    renderWrongOutcome(currentStage);
  }
}

/** Render the correct outcome screen */
function renderCorrectOutcome() {
  const item = ITEMS[currentItem];

  setText('correct-title',       `${item.icon}  ${item.name} — Outcome`);
  setText('correct-video-label', `[ ${item.name} — Outcome Video (Success) ]`);

  renderProgressBar('correct-progress', 3);
  setText('correct-pill', `${item.icon}  ${item.name}`);
  setHTML('correct-checklist', '✓ Stage 1<br>✓ Stage 2<br>✓ Outcome');

  showScreen('item-correct');
}

/** Render the wrong outcome screen (unique per stage) */
function renderWrongOutcome(stage) {
  const item      = ITEMS[currentItem];
  const stageData = stage === 1 ? item.stage1 : item.stage2;

  // Tag, title already in HTML
  setText('wrong-tag',         `${item.icon}  ${item.name} — Stage ${stage} failure`);
  setText('wrong-message',     stageData.wrongMessage);
  setText('wrong-video-label', `[ ${item.name} — Wrong Outcome Video (Stage ${stage}) ]`);

  // "Try Again" button re-starts from the failed stage
  const retryBtn = document.getElementById('wrong-retry-btn');
  retryBtn.textContent = `Try Stage ${stage} Again`;
  retryBtn.onclick     = () => renderStage(stage);

  showScreen('item-wrong');
}

// ──────────────────────────────────────────────
// PROGRESS BAR RENDERER
// ──────────────────────────────────────────────

/**
 * Renders a 3-step progress bar into the given container id.
 * activeStep: 1 = Stage 1, 2 = Stage 2, 3 = Outcome
 */
function renderProgressBar(containerId, activeStep) {
  const steps  = ['Stage 1', 'Stage 2', 'Outcome'];
  const el     = document.getElementById(containerId);
  if (!el) return;

  // ── Track (dots + lines) ──
  let trackHTML = '<div class="progress-track">';
  steps.forEach((_, i) => {
    const stepNum  = i + 1;
    const isDone   = stepNum < activeStep;
    const isActive = stepNum === activeStep;
    const cls      = isDone ? 'done' : isActive ? 'active' : '';
    trackHTML += `<div class="progress-dot ${cls}"></div>`;
    if (i < steps.length - 1) {
      trackHTML += '<div class="progress-line"></div>';
    }
  });
  trackHTML += '</div>';

  // ── Labels ──
  let labelsHTML = '<div class="progress-labels">';
  steps.forEach((label, i) => {
    const stepNum  = i + 1;
    const isDone   = stepNum < activeStep;
    const isActive = stepNum === activeStep;
    const cls      = isDone ? 'done' : isActive ? 'active' : '';
    labelsHTML += `<div class="progress-label ${cls}">${isDone ? '✓ ' : ''}${label}</div>`;
  });
  labelsHTML += '</div>';

  el.innerHTML = trackHTML + labelsHTML;
}

// ──────────────────────────────────────────────
// UTILITY HELPERS
// ──────────────────────────────────────────────

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHTML(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

// ──────────────────────────────────────────────
// INIT — show landing page on load
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Make sure all screens are hidden first
  document.querySelectorAll('.screen').forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });
  showScreen('landing');
});
