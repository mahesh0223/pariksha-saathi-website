// Lightweight slug list for route generation (App.tsx) - deliberately separate from
// examSyllabi.mjs, which carries the full bilingual syllabus content (~270 KB of source) and was
// being pulled into every single page's bundle just to build the /compare/*-syllabus route table,
// even though only SyllabusPage (loaded dynamically, per-exam) actually needs that content.
// Mirrors examJobProfileSlugs.mjs / topicSlugs.mjs. scripts/check-public-pages.mjs fails the build
// if this list drifts from examSyllabi.mjs.
export const EXAM_SYLLABUS_SLUGS = [
  'ssc-cgl',
  'ssc-mts',
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
];
