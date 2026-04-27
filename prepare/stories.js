/**
 * THE BREW LAB — Branching Story Data
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

      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'The Brew Lab',
        videoKey:   'intro',
        text:       'A quiet afternoon. The espresso machine hums softly. Your first order: one coffee. The portafilter is in your hand.',
        next:       'step1'
      },

      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Ingredients',
        videoKey:   null,
        text:       'The portafilter is ready. How many spoons of coffee do you add?',
        question:   'How many spoons of coffee do you add to the portafilter?',
        options: [
          { label: 'One spoon &#8212; precise and measured',  next: 'step2_video' },
          { label: 'Two spoons &#8212; more flavour, surely', next: 'fail1'       }
        ]
      },

      step2_video: {
        type:       'intro',
        stageIndex: 1,
        title:      'Just Enough Coffee',
        videoKey:   'step1_correct',
        text:       'One precise spoon. The portafilter is loaded perfectly.',
        next:       'step2'
      },

      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Preparation',
        videoKey:   null,
        text:       'The espresso shot is pulled. Now for the finish.',
        question:   'What do you add to complete the drink?',
        options: [
          { label: 'Add milk &#8212; steamed, smooth, velvety', next: 'outcome_milk'  },
          { label: 'Add water &#8212; for a longer drink',       next: 'outcome_water' }
        ]
      },

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

      outcome_milk: {
        type:       'success',
        stageIndex: 2,
        title:      'A Perfect Latte',
        videoKey:   'step2_milk',
        badge:      '&#x2713; Preparation Complete',
        badgeType:  'success',
        message:    'One precise spoon, a clean espresso shot, and perfectly steamed milk. The customer takes a sip and nods slowly. That\'s the nod. Every decision at every stage was correct. Process matters.'
      },

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

      /* VideoStart plays → advances to step1 choice */
      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'Welcome to The Brew Lab',
        videoKey:   'intro',
        text:       'The counter is clean. Greek yoghurt, granola, fresh fruit, and honey are laid out. A customer is waiting for something light but considered.',
        next:       'step1'
      },

      /* Stage 1 choice — shown over frozen start frame */
      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Stage 1 &#8212; Ingredients',
        videoKey:   'step1_correct',
        text:       'Every great yoghurt bowl begins with its base.',
        question:   'What do you add as the topping for Stage 1?',
        options: [
          { label: 'Oats &#8212; wholesome and textured',                    next: 'step2_video' },
          { label: 'Chopped brussels sprouts &#8212; interesting choice...', next: 'fail1'       }
        ]
      },

      /* Correct Stage 1 — plays step2 video then advances to Stage 2 choice */
      step2_video: {
        type:       'intro',
        stageIndex: 1,
        title:      'Good Choice',
        videoKey:   'step2_video',
        text:       'Oats added. The bowl is taking shape nicely.',
        next:       'step2'
      },

      /* Stage 2 choice — shown over frozen step2_video frame */
      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Stage 2 &#8212; Assembly',
        videoKey:   null,
        text:       'The base is set. Now the finishing touch.',
        question:   'What do you add to complete the bowl?',
        options: [
          { label: 'Fruit slices &#8212; fresh, vibrant, balanced',     next: 'success' },
          { label: 'Salami slices &#8212; an unconventional choice...', next: 'fail2'   }
        ]
      },

      fail1: {
        type:       'fail',
        stageIndex: 0,
        title:      'Nasty Choice',
        videoKey:   'step1_wrong',
        badge:      '&#x2717; Stage 1 Failed',
        badgeType:  'fail',
        message:    'Chopped brussels sprouts? The customer witnesses this and asks you to dump the entire bowl. Some ingredients belong in a stir-fry. Not here.',
        retryNode:  'step1',
        retryLabel: '&#8592; Try Stage 1 Again'
      },

      fail2: {
        type:       'fail',
        stageIndex: 1,
        title:      'Nasty Choice',
        videoKey:   'step2_wrong',
        badge:      '&#x2717; Stage 2 Failed',
        badgeType:  'fail',
        message:    'Salami slices? The customer witnesses this and asks you to dump the entire bowl. Some flavour combinations are worth exploring. This is not one of them.',
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
        message:    'A beautifully assembled yoghurt bowl. Every layer considered, every decision correct. This is what care looks like in a bowl.'
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

      /* VideoStart plays → advances to step1 choice */
      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'Welcome to The Brew Lab',
        videoKey:   'intro',
        text:       'The matcha tin is open. The whisk is ready. Matcha is unforgiving — every variable matters from the first step.',
        next:       'step1'
      },

      /* Stage 1 choice — shown over frozen VideoStart frame */
      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Stage 1 &#8212; Ingredients',
        videoKey:   null,
        text:       'Water temperature is the most critical variable in matcha preparation.',
        question:   'What temperature water do you use to whisk the matcha powder?',
        options: [
          { label: '75&#176;C &#8212; below boiling, preserves the natural sweetness', next: 'step1_correct_video' },
          { label: '100&#176;C &#8212; boiling water, fully dissolves the powder',     next: 'fail1'              }
        ]
      },

      /* Correct Stage 1 — plays Stage1Correct video, then advances to Stage 2 choice */
      step1_correct_video: {
        type:       'intro',
        stageIndex: 1,
        title:      'Perfect Temperature',
        videoKey:   'step1_correct',
        text:       '75°C — the catechins are preserved. The matcha is whisking beautifully.',
        next:       'step2'
      },

      /* Stage 2 choice — shown over frozen Stage1Correct frame */
      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Stage 2 &#8212; Preparation',
        videoKey:   null,
        text:       'The matcha concentrate is ready. Now comes the pour.',
        question:   'How do you bring the matcha and milk together?',
        options: [
          { label: 'Pour cold oat milk over ice, then layer the matcha shot over it', next: 'success' },
          { label: 'Add the matcha concentrate directly into hot milk in the cup',     next: 'fail2'   }
        ]
      },

      fail1: {
        type:       'fail',
        stageIndex: 0,
        title:      'Burned Matcha',
        videoKey:   'step1_wrong',
        badge:      '&#x2717; Stage 1 Failed',
        badgeType:  'fail',
        message:    'Boiling water scorches the delicate catechins in matcha, turning what should be sweet and grassy into something acrid and unpleasant. Temperature is not a suggestion — it is the preparation.',
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
        message:    'Adding matcha concentrate directly into hot milk causes it to clump and separate on contact. The drink is streaky and inconsistent. Method is everything.',
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
