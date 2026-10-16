// The distinct subjects in lessonCatalog.mjs, in catalog order - what the landing page's "Topic
// lessons" section lists. Kept as its own tiny module so HomePage.tsx (in the entry bundle every
// visitor downloads) doesn't have to import the whole 27 KB catalog just to derive six headings.
// scripts/check-public-pages.mjs fails the build if this list drifts from the catalog.
export const LESSON_SUBJECTS = [
  'Quantitative Aptitude',
  'Reasoning',
  'English',
  'General Awareness',
  'State GK',
  'Teaching (CTET)',
];
