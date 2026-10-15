// Short exam names keyed by the server's Exam.id - used only to build <title>-tag prefixes for
// exam notices (see seoNoticeTitle.ts / scripts/prerender.mjs). Plain .mjs so the prerender
// script and the React app share one list instead of hand-mirroring it; add a new exam here
// when the server catalog (pariksha-saathi-server prisma/seed.js) gains one, otherwise its
// notices silently lose the exam-name prefix in search-result titles.
export const EXAM_NAMES = {
  ssc_cgl: 'SSC CGL',
  ssc_chsl: 'SSC CHSL',
  ssc_mts: 'SSC MTS',
  ibps_po: 'IBPS PO',
  ibps_clerk: 'IBPS Clerk',
  sbi_po: 'SBI PO',
  sbi_clerk: 'SBI Clerk',
  rrb_ntpc: 'RRB NTPC',
  rrb_group_d: 'RRB Group D',
  rrb_alp: 'RRB ALP',
  ssc_gd: 'SSC GD',
  agniveer_army: 'Agniveer',
  ctet: 'CTET',
  up_police: 'UP Police',
  bihar_police: 'Bihar Police',
  mp_police: 'MP Police',
  rajasthan_police: 'Rajasthan Police',
  uppsc: 'UPPSC',
  bpsc: 'BPSC',
  mppsc: 'MPPSC',
  rpsc: 'RPSC',
};
