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

// Hindi names for the same subjects, as the Hindi landing page and /hi/learn/ show them. The spellings
// follow the Hindi syllabus pages (examSyllabi.mjs) so a reader sees one name for a subject everywhere.
export const LESSON_SUBJECTS_HI = {
  'Quantitative Aptitude': 'मात्रात्मक अभियोग्यता',
  Reasoning: 'तर्कशक्ति',
  English: 'अंग्रेज़ी (English)',
  'General Awareness': 'सामान्य जागरूकता',
  'State GK': 'राज्य सामान्य ज्ञान',
  'Teaching (CTET)': 'शिक्षण (CTET)',
};

// Hindi names for the subjects the /q/ practice-question pages group topics under (QUESTION_TOPICS[*].subject):
// the lesson subjects plus the server's subject names for topics that have no website lesson.
export const QUESTION_SUBJECTS_HI = {
  ...LESSON_SUBJECTS_HI,
  'Computer Knowledge': 'कंप्यूटर ज्ञान',
  'General Studies': 'सामान्य अध्ययन',
  Pedagogy: 'शिक्षाशास्त्र',
  Hindi: 'हिंदी',
};
