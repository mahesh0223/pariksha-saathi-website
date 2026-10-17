import { useLanguage } from '../state/LanguageContext';
import type { Question } from '../types/api';
import './PyqBadge.css';

type PyqFields = Pick<Question, 'pyqPaper' | 'pyqDate' | 'pyqShift'>;

/** "Asked in CGL 2024 Tier-I · 12 Sept 2024 · Shift 1", or null for a question that is not a previous-year question. */
export function pyqLabel(question: PyqFields, language: string): string | null {
  const paper = question.pyqPaper?.trim();
  if (!paper) return null;
  let date = question.pyqDate?.trim() || null;
  if (date) {
    const parsed = new Date(`${date}T00:00:00Z`);
    if (!Number.isNaN(parsed.getTime())) {
      date = parsed.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    }
  }
  const detail = [paper, date, question.pyqShift?.trim() || null].filter(Boolean).join(' · ');
  return language === 'hi' ? `${detail} में पूछा गया` : `Asked in ${detail}`;
}

/** Renders nothing on an ordinary question - only a real previous-year question carries a paper (see the server's docs/PYQ.md). */
export function PyqBadge({ question }: { question: PyqFields }) {
  const { language } = useLanguage();
  const label = pyqLabel(question, language);
  if (!label) return null;
  return <span className="pyq-badge">{label}</span>;
}
