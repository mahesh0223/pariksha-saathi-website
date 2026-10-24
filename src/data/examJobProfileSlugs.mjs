// Lightweight slug list for route generation (App.tsx) - deliberately separate from
// examJobProfiles.mjs, which carries the full bilingual job-profile content and would otherwise
// be pulled into every single page's bundle just to build the /compare/*-job-profile route table,
// even though only JobProfilePage (loaded dynamically, per-exam) actually needs that content.
// Mirrors topicSlugs.mjs's identical role for topicLessons.mjs.
export const EXAM_JOB_PROFILE_SLUGS = [
  'ssc-cgl',
  'ssc-chsl',
  'ibps-po',
  'ibps-clerk',
  'sbi-po',
  'sbi-clerk',
  'ssc-gd',
  'ctet',
  'rrb-ntpc',
  'rrb-group-d',
  'rrb-alp',
  'up-police',
  'bihar-police',
  'mp-police',
  'rajasthan-police',
  'bpsc',
  'mppsc',
  'rpsc',
  'bssc-inter',
  'rajasthan-patwari',
  'dsssb-tgt',
];
