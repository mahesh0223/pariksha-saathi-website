// Daily current-affairs PDF editions served from /pdf/. Newest first. Maintained by
// scripts/daily-pdf/make_pdf.py (npm run pdf:daily) - do not hand-edit the entries it writes.
// /daily-pdf redirects (public/_redirects) to /pdf/latest.pdf, which the script overwrites.
export const DAILY_PDF_EDITIONS = [
  { date: '2026-10-18', file: '/pdf/ParikshaSaathi_CA_2026-10-18.pdf', language: 'hi', items: 3, questions: 5, pages: 3, sizeKb: 304 },
  { date: '2026-10-17', file: '/pdf/ParikshaSaathi_CA_2026-10-17.pdf', language: 'hi', items: 6, questions: 5, pages: 4, sizeKb: 351 },
  { date: '2026-10-16', file: '/pdf/ParikshaSaathi_CA_2026-10-16.pdf', language: 'hi', items: 11, questions: 5, pages: 7, sizeKb: 418 },
  { date: '2026-10-15', file: '/pdf/ParikshaSaathi_CA_2026-10-15.pdf', language: 'hi', items: 14, questions: 5, pages: 8, sizeKb: 430 },
  { date: '2026-10-14', file: '/pdf/ParikshaSaathi_CA_2026-10-14.pdf', language: 'hi', items: 3, questions: 5, pages: 3, sizeKb: 298 },
  { date: '2026-10-13', file: '/pdf/ParikshaSaathi_CA_2026-10-13.pdf', language: 'hi', items: 13, questions: 5, pages: 8, sizeKb: 439 },
  { date: '2026-10-12', file: '/pdf/ParikshaSaathi_CA_2026-10-12.pdf', language: 'hi', items: 26, questions: 5, pages: 14, sizeKb: 564 },
];

// Monthly current-affairs capsules (English + Hindi), newest first. Written by
// scripts/capsule-pdf/make_capsule.py - do not hand-edit the entries it writes.
export const MONTHLY_CAPSULES = [
  { period: '2026-09', label: 'September 2026 (12-30 September)', language: 'en', file: '/pdf/ParikshaSaathi_Capsule_2026-09_en.pdf', items: 51, questions: 30, pages: 6, sizeKb: 139 },
  { period: '2026-09', label: 'सितंबर 2026 (12-30 सितंबर)', language: 'hi', file: '/pdf/ParikshaSaathi_Capsule_2026-09_hi.pdf', items: 51, questions: 30, pages: 5, sizeKb: 363 },
];
