// The previous-year-question practice player (src/pages/pyq/PyqPracticePage.tsx): its address, and - for a question the
// API returns - the solved-paper page it comes from. Shared by the prerendered topic lists and the player.
import { examHubSlug } from './examHubPath.mjs';
import { pyqPaperSlug } from './pyqPapersBuild.mjs';

/** The noindexed player for a topic's previous-year questions, in English or Hindi. */
export const pyqPracticePath = (topicKey, lang = 'en') => `/app/pyq-practice/${encodeURIComponent(topicKey)}/${lang === 'hi' ? '?lang=hi' : ''}`;

/** The solved-paper page of a previous-year question (its pyq* fields, as the API gives them), or null. */
export function pyqPaperHref(q) {
  if (!q.pyqExamId || !q.pyqPaper || !q.pyqDate || !q.pyqShift) return null;
  return `/exams/${examHubSlug(q.pyqExamId)}/question-papers/${pyqPaperSlug({ paper: q.pyqPaper, date: q.pyqDate, shift: q.pyqShift })}/`;
}
