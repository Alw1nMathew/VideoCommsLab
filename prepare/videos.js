/**
 * THE BREW LAB — Video URLs
 */

const VIDEOS = {

  /* ── COFFEE ─────────────────────────────────────────────── */
  coffee: {
    intro:         'https://res.cloudinary.com/dk59ei1bg/video/upload/v1777277993/Coffee_Intro_Clip_Compressed_mbwwyy.mp4',
    step1_correct: 'https://res.cloudinary.com/dk59ei1bg/video/upload/v1777278831/Step_2__Just_Enough_Coffee.mp4_Compressed_fy0mqy.mp4',
    step1_wrong:   'https://res.cloudinary.com/dk59ei1bg/video/upload/v1777278836/Step_2__Too_Much_Coffee.mp4_Compressed_rf1jog.mp4',
    step2_milk:    'https://res.cloudinary.com/dk59ei1bg/video/upload/v1777278927/Step_3__Add_Milk_and_Stir.mp4_Compressed_dg8bha.mp4',
    step2_water:   'https://res.cloudinary.com/dk59ei1bg/video/upload/v1777278924/Step_3__Add_Water_and_Stir.mp4_Compressed_vbldpt.mp4',
  },

  /* ── YOGHURT BOWL ───────────────────────────────────────── */
  yoghurt: {
    // Plays when user first selects Yoghurt Bowl
    intro:         'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777306119/yoghurt_bowl_start_kbh4t7.mp4',

    // Plays during Stage 1 (oats choice screen)
    step1_correct: 'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307465/yoghurt_bowl_step_1_os6tmf.mp4',

    // Plays when wrong choice at Stage 1 (brussels sprouts)
    step1_wrong:   'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307475/yoghurt_bowl_failure_jf25md.mp4',

    // Plays for the success outcome
    step2_correct: 'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307576/yoghurt_bowl_success_qk2ule.mp4',

    // Plays when wrong choice at Stage 2 (salami) — same failure video
    step2_wrong:   'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307475/yoghurt_bowl_failure_jf25md.mp4',
  },

  /* ── MATCHA ─────────────────────────────────────────────── */
  matcha: {
    // Plays when user first selects Matcha
    intro:         'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307713/VideoStart_fvpruw.mp4',

    // Plays during Stage 1 (75°C correct choice screen)
    step1_correct: 'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307709/Stage1Correct_hsikvl.mp4',

    // Plays when wrong choice at Stage 1 (100°C / boiling)
    step1_wrong:   'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307710/Stage1Fail_y7u7rg.mp4',

    // Plays for the success outcome
    step2_correct: 'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307712/Stage2Outcome_lm99sg.mp4',

    // Plays when wrong choice at Stage 2 (wrong milk method)
    step2_wrong:   'https://res.cloudinary.com/dpj3gpqs5/video/upload/v1777307711/Stage2Fail_og5bqb.mp4',
  },

};
