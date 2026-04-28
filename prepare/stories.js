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
      description: 'You are behind the counter of The Brew Lab. Your custmer wants instant coffee'
    },
    nodes: {

      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'The Brew Lab',
        videoKey:   'intro',
        text:       'A quiet afternoon. Your first order: one coffee. The ingredients are in your hand.',
        next:       'step1'
      },

      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Ingredients',
        videoKey:   null,
        text:       'The ingredients are ready. How many spoons of coffee do you use?',
        question:   'How many spoons of coffee do you add to the cup?',
        options: [
          { label: 'One spoon &#8212; ',  next: 'step2_video' },
          { label: 'Two spoons &#8212; ', next: 'fail1'       }
        ]
      },

      step2_video: {
        type:       'intro',
        stageIndex: 1,
        title:      'Just Enough Coffee',
        videoKey:   'step1_correct',
        text:       'One precise spoon. The coffee is loaded perfectly.',
        next:       'step2'
      },

      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Preparation',
        videoKey:   null,
        text:       'The drink shot is almost done. Now for the finish.',
        question:   'What do you add to complete the drink?',
        options: [
          { label: 'Add milk &#8212; Instant Cappuccino', next: 'outcome_milk'  },
          { label: 'Add water &#8212; Instant Americano',       next: 'outcome_water' }
        ]
      },

      fail1: {
        type:       'fail',
        stageIndex: 0,
        title:      'Way Too Much Coffee',
        videoKey:   'step1_wrong',
        badge:      '&#x2717; Too Much',
        badgeType:  'fail',
        message:    'Two spoons? That is too much, Wont dissolve well and totaly uneconomical for The Brew Lab, In this establishment we use one spoon &#8212; and only one spoon.',
        retryNode:  'step1',
        retryLabel: '&#8592; Try again'
      },

      outcome_milk: {
        type:       'success',
        stageIndex: 2,
        title:      'Instant Cappuccino',
        videoKey:   'step2_milk',
        badge:      '&#x2713; Preparation Complete',
        badgeType:  'success',
        message:    'One precise spoon,  Every decision at every stage was correct. Process matters.'
      },

      outcome_water: {
        type:       'success',
        stageIndex: 2,
        title:      'Instant Americano',
        videoKey:   'step2_water',
        badge:      '&#x2713; Preparation Complete',
        badgeType:  'success',
        message:    'One careful spoon, a clean Americano shot, hot water added with intention. The result is a solid Americano &#8212; longer, lighter, deliberate. A different drink, but a thoughtful one. Process still matters.'
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
        text:       'The counter is clean. Greek yoghurt, granola, fresh fruit, and honey are laid out. A customer is waiting for something light but considered.',
        next:       'step1'
      },

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

      step2_video: {
        type:       'intro',
        stageIndex: 1,
        title:      'Good Choice',
        videoKey:   'step2_video',
        text:       'Oats added. The bowl is taking shape nicely.',
        next:       'step2'
      },

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

      intro: {
        type:       'intro',
        stageIndex: 0,
        title:      'Welcome to The Brew Lab',
        videoKey:   'intro',
        text:       'The matcha tin is open. The whisk is ready. Matcha is unforgiving — every variable matters from the first step.',
        next:       'step1'
      },

      step1: {
        type:       'choice',
        stageIndex: 0,
        title:      'Stage 1 &#8212; Ingredients',
        videoKey:   null,
        text:       'The milk you choose changes everything about the final drink. Some pairings bring out the natural sweetness of matcha. Others overpower it entirely.',
        question:   'Which milk would you like to use for your Matcha?',
        options: [
          { label: 'Coconut Milk', next: 'step1_correct_video' },
          { label: 'Lactose Milk', next: 'fail1'              }
        ]
      },

      step1_correct_video: {
        type:       'intro',
        stageIndex: 1,
        title:      'Perfect Choice',
        videoKey:   'step1_correct',
        text:       'Coconut milk — light, subtly sweet, and a perfect match for matcha\'s earthy notes.',
        next:       'step2'
      },

      step2: {
        type:       'choice',
        stageIndex: 1,
        title:      'Stage 2 &#8212; Preparation',
        videoKey:   null,
        text:       'The matcha concentrate is ready. A good sweetener should enhance the drink without masking the earthy notes of the matcha.',
        question:   'Which sweetener would you like to use?',
        options: [
          { label: 'Maple Syrup', next: 'success' },
          { label: 'Jam',         next: 'fail2'   }
        ]
      },

      fail1: {
        type:       'fail',
        stageIndex: 0,
        title:      'Wrong Milk',
        videoKey:   'step1_wrong',
        badge:      '&#x2717; Stage 1 Failed',
        badgeType:  'fail',
        message:    'Lactose milk is too heavy and overpowers the delicate grassy notes of matcha. The drink loses its balance completely — the customer can taste the clash. Coconut milk complements matcha. Lactose milk competes with it.',
        retryNode:  'step1',
        retryLabel: '&#8592; Try Stage 1 Again'
      },

      fail2: {
        type:       'fail',
        stageIndex: 1,
        title:      'Wrong Sweetener',
        videoKey:   'step2_wrong',
        badge:      '&#x2717; Stage 2 Failed',
        badgeType:  'fail',
        message:    'Jam introduces fruit pulp and an overpowering sweetness that completely overwhelms the matcha. The drink is murky, unbalanced, and the customer is visibly confused. A sweetener should elevate the drink — not bury it.',
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
        message:    'A vibrant, silky matcha latte. Coconut milk perfectly balanced, maple syrup enhancing without overpowering. The colour is luminous, the taste is clean and considered. Every decision made with precision.'
      }

    }
  }

};
