// The seven exams the landing page has always led with, as [examId, label]; each hero pill links
// to the exam's hub page (examHubPath) and the rest are one click away on /exams/. Shared by
// src/pages/HomePage.tsx and scripts/prerender.mjs so the two cannot disagree - the prerendered
// home page is hydrated, not re-rendered, so its markup must match the component node for node.
export const HERO_EXAMS = [
  ['ssc_cgl', 'SSC CGL'],
  ['ssc_mts', 'SSC MTS'],
  ['ssc_chsl', 'SSC CHSL'],
  ['ibps_po', 'IBPS PO'],
  ['ibps_clerk', 'IBPS Clerk'],
  ['sbi_po', 'SBI PO'],
  ['sbi_clerk', 'SBI Clerk'],
];
