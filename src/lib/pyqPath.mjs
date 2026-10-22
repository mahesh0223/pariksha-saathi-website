// Path of a solved previous-year paper page - kept tiny so the exam hub can link papers without importing the papers.
import { examHubSlug } from './examHubPath.mjs';
import { PYQ_PAPER_INDEX } from '../data/pyqPaperIndex.mjs';

export const pyqPaperPath = ({ examId, slug }) => `/exams/${examHubSlug(examId)}/question-papers/${slug}/`;

/** The exam's list of solved papers (src/lib/pyqIndexPage.mjs), in English or Hindi. */
export const pyqIndexPath = (examId, lang = 'en') => `${lang === 'hi' ? '/hi' : ''}/exams/${examHubSlug(examId)}/question-papers/`;

/** Exams with at least one solved paper - the ones that get a list page. */
export const PYQ_INDEX_EXAMS = [...new Set(PYQ_PAPER_INDEX.map((p) => p.examId))];

/** The solved-paper page for a paper as the server's /pyq-summary names it, or null when there is none. */
export function pyqPaperPathFor(examId, { paper, date, shift }) {
  const entry = PYQ_PAPER_INDEX.find((p) => p.examId === examId && p.paper === paper && p.date === date && p.shift === shift);
  return entry ? pyqPaperPath(entry) : null;
}
