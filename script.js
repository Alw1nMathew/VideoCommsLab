/* =============================================
   THE BREW LAB — script.js
   ============================================= */

/* ── Parallax + nav + side dots ── */
var parallaxBg   = document.getElementById('parallax-bg');
var SECTION_IDS  = ['landing', 'story', 'menu', 'bts', 'team'];
/* Sections on a light background (dots and nav go dark) */
var LIGHT_SECTIONS = { story: true, bts: true };

window.addEventListener('scroll', function() {
  var scrollY = window.scrollY;

  /* Nav scroll style */
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', scrollY > 20);

  /* Parallax */
  if (parallaxBg) {
    parallaxBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
  }

  /* Find current section (nearest snap point above viewport center) */
  var viewMid = scrollY + window.innerHeight * 0.5;
  var cur = 'landing';
  SECTION_IDS.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && el.offsetTop <= viewMid) cur = id;
  });

  /* Top nav active */
  document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
  var activeBtn = document.querySelector('.nav-btn[href="#' + cur + '"]');
  if (activeBtn) activeBtn.classList.add('active');

  /* Side dots active */
  document.querySelectorAll('.side-dot').forEach(function(d) { d.classList.remove('active'); });
  var activeDot = document.querySelector('.side-dot[href="#' + cur + '"]');
  if (activeDot) activeDot.classList.add('active');

  /* Swap dot/nav colour for light sections */
  document.body.classList.toggle('section-light', !!LIGHT_SECTIONS[cur]);

}, { passive: true });

/* ════════════════════════════════════════════
   BTS CAROUSEL
════════════════════════════════════════════ */

var btsIndex  = 0;
var btsSlides = [];

(function initBts() {
  btsSlides = Array.from(document.querySelectorAll('.bts-slide'));
  if (!btsSlides.length) return;

  /* Build dots */
  var dotsEl = document.getElementById('bts-dots');
  if (dotsEl) {
    btsSlides.forEach(function(_, i) {
      var d = document.createElement('button');
      d.className   = 'bts-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.onclick     = function() { btsGoTo(i); };
      dotsEl.appendChild(d);
    });
  }

  /* Set total count */
  var totalEl = document.getElementById('bts-total');
  if (totalEl) totalEl.textContent = btsSlides.length;

  /* Keyboard arrow support when BTS section is in view */
  document.addEventListener('keydown', function(e) {
    var bts = document.getElementById('bts');
    if (!bts) return;
    var rect = bts.getBoundingClientRect();
    var inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
    if (!inView) return;
    if (e.key === 'ArrowLeft')  btsNav(-1);
    if (e.key === 'ArrowRight') btsNav(1);
  });
})();

function btsNav(dir) {
  btsGoTo((btsIndex + dir + btsSlides.length) % btsSlides.length);
}

function btsGoTo(i) {
  /* Pause any playing video on the departing slide */
  var oldVideo = btsSlides[btsIndex].querySelector('video');
  if (oldVideo) oldVideo.pause();

  btsSlides[btsIndex].classList.remove('active');
  btsIndex = i;
  btsSlides[btsIndex].classList.add('active');

  /* Update dots */
  document.querySelectorAll('.bts-dot').forEach(function(d, idx) {
    d.classList.toggle('active', idx === btsIndex);
  });

  /* Update counter */
  var curEl = document.getElementById('bts-cur');
  if (curEl) curEl.textContent = btsIndex + 1;
}

/* ════════════════════════════════════════════
   FULLSCREEN EXPERIENCE ENGINE
════════════════════════════════════════════ */

var expItem    = null;
var expNodeKey = null;

/* Open the experience for a menu item */
function openItem(key) {
  expItem    = key;
  expNodeKey = null;

  document.getElementById('exp-fs').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  goToExpNode('intro');
}

/* Close and clean up */
function closeExperience() {
  var video = document.getElementById('exp-video');
  video.pause();
  video.removeAttribute('src');
  video.load();

  hideExpOverlays();
  document.getElementById('exp-fs').classList.add('hidden');
  document.body.style.overflow = '';
}

/* Navigate to a story node */
function goToExpNode(nodeKey) {
  expNodeKey = nodeKey;

  var story   = STORIES[expItem];
  var node    = story.nodes[nodeKey];
  var skipBtn = document.getElementById('exp-skip-btn');

  hideExpOverlays();

  /* Nodes with no videoKey: keep current video visible and show decision immediately */
  if (!node.videoKey) {
    skipBtn.style.display = 'none';
    setTimeout(onVideoEnded, 60);
    return;
  }

  /* Outcome nodes: hide skip so the video plays through */
  if (node.type === 'success' || node.type === 'fail') {
    skipBtn.style.display = 'none';
  } else {
    skipBtn.style.display = 'block';
  }

  var url = (VIDEOS[expItem] && VIDEOS[expItem][node.videoKey]) || '';
  loadExpVideo(url, node.title + ' \u2014 ' + story.name);
}

/* Load (or placeholder) a video and wire up the ended handler */
function loadExpVideo(url, label) {
  var video = document.getElementById('exp-video');
  var ph    = document.getElementById('exp-ph');

  video.onended = onVideoEnded;

  if (url) {
    ph.classList.add('hidden');
    video.style.display = 'block';
    if (video.src !== url) {
      video.src = url;
      video.load();
    }
    video.play().catch(function() {});
  } else {
    /* No URL yet — show placeholder, "Continue" triggers onVideoEnded */
    video.style.display = 'none';
    ph.classList.remove('hidden');
    document.getElementById('exp-ph-label').textContent = label;
  }
}

/* Called when video ends (or user skips / clicks Continue on placeholder) */
function onVideoEnded() {
  var story = STORIES[expItem];
  var node  = story.nodes[expNodeKey];

  if (node.type === 'intro') {
    /* Intro node: advance automatically to next node */
    goToExpNode(node.next);
    return;
  }

  if (node.type === 'choice') {
    showDecisionOverlay(node);
    return;
  }

  if (node.type === 'success' || node.type === 'fail') {
    showOutcomeOverlay(node);
  }
}

/* Show the decision choices over the paused video */
function showDecisionOverlay(node) {
  var story = STORIES[expItem];
  document.getElementById('exp-decision-label').textContent   = story.name + ' \u2014 ' + story.stages[node.stageIndex];
  document.getElementById('exp-decision-question').textContent = node.question;

  var row = document.getElementById('exp-choice-row');
  row.innerHTML = node.options.map(function(opt) {
    return '<button class="exp-choice-btn" onclick="pickExpChoice(\'' + opt.next + '\')">' + opt.label + '</button>';
  }).join('');

  document.getElementById('exp-decision').classList.remove('hidden');
  document.getElementById('exp-skip-btn').style.display = 'none';
}

/* User picks a choice */
function pickExpChoice(nextNodeKey) {
  document.getElementById('exp-decision').classList.add('hidden');
  goToExpNode(nextNodeKey);
}

/* Show outcome panel (success or fail) over the video */
function showOutcomeOverlay(node) {
  var badge = document.getElementById('exp-outcome-badge');
  badge.innerHTML = node.badge;
  badge.className = 'exp-oc-badge exp-oc-badge-' + node.badgeType;

  document.getElementById('exp-outcome-title').textContent = node.title;
  document.getElementById('exp-outcome-msg').textContent   = node.message;

  var actions = document.getElementById('exp-oc-actions');
  if (node.type === 'success') {
    actions.innerHTML =
      '<button class="btn-ghost" onclick="goToExpNode(\'intro\')">&#8592; Try Again</button>' +
      '<button class="btn-primary" onclick="closeExperience()">Back to Menu</button>';
  } else {
    actions.innerHTML =
      '<button class="btn-ghost" onclick="goToExpNode(\'' + node.retryNode + '\')">' + node.retryLabel + '</button>' +
      '<button class="btn-primary" onclick="closeExperience()">Back to Menu</button>';
  }

  document.getElementById('exp-outcome').classList.remove('hidden');
}

/* Hide all overlays inside the experience */
function hideExpOverlays() {
  document.getElementById('exp-decision').classList.add('hidden');
  document.getElementById('exp-outcome').classList.add('hidden');
  document.getElementById('exp-skip-btn').style.display = 'block';
}
