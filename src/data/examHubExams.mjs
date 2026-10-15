// Exams that have a sourced hub page (/exams/<slug>/ and /hi/exams/<slug>/). An exam belongs here once
// the server has published its fact sheet (pariksha-saathi-server prisma/seed-data/exam-facts/) - the
// prerender step fails the build if a listed exam has none, so a hub can never ship empty. The hub URL
// slug is the server's exam id with dashes (ssc_cgl -> ssc-cgl), which is also the slug the existing
// /compare/<slug>-syllabus pages already use.
export const HUB_EXAM_IDS = [
  'ssc_cgl',
  'ssc_chsl',
  'ssc_mts',
  'ssc_gd',
  'ibps_po',
  'ibps_clerk',
  'sbi_po',
  'sbi_clerk',
  'rrb_ntpc',
  'rrb_group_d',
  'rrb_alp',
  'ctet',
  'up_police',
  'bihar_police',
  'mp_police',
  'rajasthan_police',
  'bpsc',
  'mppsc',
  'rpsc',
];

export function hubExamIdForSlug(slug) {
  const examId = slug.replace(/-/g, '_');
  return HUB_EXAM_IDS.includes(examId) ? examId : undefined;
}

// Shown on the syllabus page when the exam has a hub.
export const HUB_LINK_LABEL = {
  en: 'See the exact marks, timing, negative marking, age limit and cut-offs for this exam',
  hi: 'इस परीक्षा के सटीक अंक, समय, नेगेटिव मार्किंग, आयु सीमा और कट-ऑफ देखें',
};
