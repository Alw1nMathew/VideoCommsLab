/**
 * THE BREW LAB — Branching Story Data
 * ======================================
 * Each item has a set of nodes that drive the interactive narrative.
 *
 * Node types:
 *   'intro'   — introduction, plays on load, "Begin" advances to next node
 *   'choice'  — shows the video, question, and two option buttons
 *   'fail'    — wrong-path outcome; offers retry or back-to-menu
 *   'success' — correct final outcome
 *
 * videoKey maps to a key in VIDEOS[item] inside videos.js.
 * stageIndex (0, 1, 2) drives the progress indicator.
 */

const STORIES = {

  /* ═══ COFFEE ═══════════════════════════════════════════════ */
  coffee: {
    name:    'Coffee',
    icon:    '&#9749;',
    tagline: 'Espresso-based preparation',
    stages:  ['Ingredients', 'Preparation', 'Outcome'],
    intro: {
      heading:     'The Scene',
      description: 'You are behind the counter of The Brew Lab. The machine is warmed up, the grinder is ready, and a customer has just ordered a coffee. Every decision you make determines whether they leave satisfied — or bewildered.'
    },
    nodes: {

      /* Intro clip plays, then auto-advances to spoon decision */
      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'The Brew Lab',
        videoKey:   'intro',
        text:       'A quiet afternoon. The espresso machine hums softly. Your first order: one coffee. The portafilter is in your hand.',
        next:       'step1'
      },

      /* Decision shown over frozen intro frame — no new video */
      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Ingredients',
        videoKey:   null,
        text:       'The portafilter is ready. How many spoons of coffee do you add?',
        question:   'How many spoons of coffee do you add to the portafilter?',
        options: [
          { label: 'One spoon &#8212; precise and measured',       next: 'step2_video' },
          { label: 'Two spoons &#8212; more flavour, surely',      next: 'fail1'       }
        ]
      },

      /* One spoon selected &#8212; plays "Just Enough Coffee" clip, then advances to liquid decision */
      step2_video: {
        type:       'intro',
        stageIndex: 1,
        title:      'Just Enough Coffee',
        videoKey:   'step1_correct',
        text:       'One precise spoon. The portafilter is loaded perfectly.',
        next:       'step2'
      },

      /* Decision shown over frozen "Just Enough" frame &#8212; no new video */
      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Preparation',
        videoKey:   null,
        text:       'The espresso shot is pulled. Now for the finish.',
        question:   'What do you add to complete the drink?',
        options: [
          { label: 'Add milk &#8212; steamed, smooth, velvety',   next: 'outcome_milk'  },
          { label: 'Add water &#8212; for a longer drink',         next: 'outcome_water' }
        ]
      },

      /* Two spoons &#8212; humorous fail, retry goes back to step1 (not intro) */
      fail1: {
        type:       'fail',
        stageIndex: 0,
        title:      'Way Too Much Coffee',
        videoKey:   'step1_wrong',
        badge:      '&#x2717; Too Much',
        badgeType:  'fail',
        message:    'Two spoons? The portafilter is overflowing, there are coffee grounds on the ceiling, and the customer has started filming. The machine is filing a complaint. In this establishment we use one spoon &#8212; and only one spoon.',
        retryNode:  'step1',
        retryLabel: '&#8592; Try the spoons again'
      },

      /* Milk outcome &#8212; success */
      outcome_milk: {
        type:       'success',
        stageIndex: 2,
        title:      'A Perfect Latte',
        videoKey:   'step2_milk',
        badge:      '&#x2713; Preparation Complete',
        badgeType:  'success',
        message:    'One precise spoon, a clean espresso shot, and perfectly steamed milk. The customer takes a sip and nods slowly. That\'s the nod. Every decision at every stage was correct. Process matters.'
      },

      /* Water outcome &#8212; also success, different message */
      outcome_water: {
        type:       'success',
        stageIndex: 2,
        title:      'A Classic Americano',
        videoKey:   'step2_water',
        badge:      '&#x2713; Preparation Complete',
        badgeType:  'success',
        message:    'One careful spoon, a clean espresso shot, hot water added with intention. The result is a solid Americano &#8212; longer, lighter, deliberate. A different drink, but a thoughtful one. Process still matters.'
      }

    }
  },

  /* ═══ YOGHURT BOWL ══════════════════════════════════════════ */
  yoghurt: {
    name:    'Yoghurt Bowl',
    icon:    '&#x1F963;',
    tagline: 'Assembly-based preparation',
    stages:  ['Ingredients', 'Assembly', 'Outcome'],
    intro: {
      heading:     'The Scene',
      description: 'A customer wants a yoghurt bowl — fresh, balanced, and beautifully assembled. The ingredients are laid out in front of you. The order matters. The choices matter. Let\'s begin.'
    },
    nodes: {

      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'Welcome to The Brew Lab',
        videoKey:   'intro',
        text:       'The counter is clean. Greek yoghurt, granola, fresh fruit, and honey are laid out. A customer is waiting for something light but considered. The quality is entirely in how you build it.',
        next:       'step1'
      },

      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Stage 1 — Ingredients',
        videoKey:   'step1_correct',
        text:       'Every great yoghurt bowl begins with its base. The choice here determines the texture and structure of everything that follows. Not all yoghurts are built the same.',
        question:   'What do you use as the base of the bowl?',
        options: [
          { label: 'Greek yoghurt — thick, creamy, and protein-rich',   next: 'step2' },
          { label: 'Regular yoghurt — thinner and easier to pour',      next: 'fail1' }
        ]
      },

      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Stage 2 — Assembly',
        videoKey:   'step1_correct',
        text:       'The base is set. Now the layering begins. Assembly order determines both the look and the experience of eating. One approach keeps each element at its best. The other does not.',
        question:   'How do you add the granola?',
        options: [
          { label: 'Sprinkle on top at the very end — stays crunchy',     next: 'success' },
          { label: 'Mix it into the yoghurt first — ensures coverage',    next: 'fail2'   }
        ]
      },

      fail1: {
        type:       'fail',
        stageIndex: 0,
        title:      'Watery Base',
        videoKey:   'step1_wrong',
        badge:      '&#x2717; Stage 1 Failed',
        badgeType:  'fail',
        message:    'The thin yoghurt cannot hold the toppings. Within seconds everything sinks and separates into a watery mess at the bottom of the bowl. The customer asks if this is supposed to be a smoothie.',
        retryNode:  'step1',
        retryLabel: '&#8592; Try Stage 1 Again'
      },

      fail2: {
        type:       'fail',
        stageIndex: 1,
        title:      'Soggy Granola',
        videoKey:   'step2_wrong',
        badge:      '&#x2717; Stage 2 Failed',
        badgeType:  'fail',
        message:    'Granola mixed directly into yoghurt absorbs moisture instantly. By the time the bowl reaches the customer it has become a thick paste. The texture is gone. Assembly order is not a suggestion — it is the craft.',
        retryNode:  'step2',
        retryLabel: '&#8592; Try Stage 2 Again'
      },

      success: {
        type:       'success',
        stageIndex: 2,
        title:      'Perfect Result',
        videoKey:   'step2_correct',
        badge:      '&#x2713; Preparation Complete',
        badgeType:  'success',
        message:    'A beautifully assembled yoghurt bowl. Creamy base, vibrant toppings, granola perfectly crunchy on top. Every layer considered, every decision correct. This is what care looks like in a bowl.'
      }

    }
  },

  /* ═══ MATCHA ════════════════════════════════════════════════ */
  matcha: {
    name:    'Matcha',
    icon:    '&#x1F375;',
    tagline: 'Blend-based preparation',
    stages:  ['Ingredients', 'Preparation', 'Outcome'],
    intro: {
      heading:     'The Scene',
      description: 'Matcha is ceremony in a cup. A customer has ordered something precise, clean, and intentional. The powder is in front of you. Temperature and technique are everything here.'
    },
    nodes: {

      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'Welcome to The Brew Lab',
        videoKey:   'intro',
        text:       'The matcha tin is open. The whisk is ready. A bamboo scoop, a small bowl, and the customer\'s expectation. Matcha is unforgiving — every variable matters from the first step.',
        next:       'step1'
      },

      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Stage 1 — Ingredients',
        videoKey:   'step1_correct',
        text:       'Water temperature is the most critical variable in matcha preparation. Get it wrong and there is no recovering it. The catechins that give matcha its characteristic flavour are extremely heat-sensitive.',
        question:   'What temperature water do you use to whisk the matcha powder?',
        options: [
          { label: '75&#176;C — below boiling, preserves the natural sweetness',     next: 'step2' },
          { label: '100&#176;C — boiling water, fully dissolves the powder',         next: 'fail1' }
        ]
      },

      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Stage 2 — Preparation',
        videoKey:   'step1_correct',
        text:       'The matcha is whisked into a smooth, frothy concentrate. Now comes the pour. The method of combining the matcha with the milk determines whether you get a silky layered drink or a split, clumped mess.',
        question:   'How do you bring the matcha and milk together?',
        options: [
          { label: 'Pour cold oat milk over ice, then layer the matcha shot over it',   next: 'success' },
          { label: 'Add the matcha concentrate directly into hot milk in the cup',       next: 'fail2'   }
        ]
      },

      fail1: {
        type:       'fail',
        stageIndex: 0,
        title:      'Burned Matcha',
        videoKey:   'step1_wrong',
        badge:      '&#x2717; Stage 1 Failed',
        badgeType:  'fail',
        message:    'Boiling water scorches the delicate catechins in matcha, turning what should be sweet and grassy into something acrid and unpleasant. The colour darkens and the aroma disappears. Temperature is not a suggestion — it is the preparation.',
        retryNode:  'step1',
        retryLabel: '&#8592; Try Stage 1 Again'
      },

      fail2: {
        type:       'fail',
        stageIndex: 1,
        title:      'Clumped and Split',
        videoKey:   'step2_wrong',
        badge:      '&#x2717; Stage 2 Failed',
        badgeType:  'fail',
        message:    'Adding matcha concentrate directly into hot milk causes it to clump and separate on contact. The drink is streaky and inconsistent. The customer can taste the instability. Method is everything.',
        retryNode:  'step2',
        retryLabel: '&#8592; Try Stage 2 Again'
      },

      success: {
        type:       'success',
        stageIndex: 2,
        title:      'Perfect Result',
        videoKey:   'step2_correct',
        badge:      '&#x2713; Preparation Complete',
        badgeType:  'success',
        message:    'A vibrant, silky matcha latte. Perfectly whisked at the right temperature, layered correctly over ice. The colour is luminous, the taste is balanced. Every decision made with precision.'
      }

    }
  }

};
