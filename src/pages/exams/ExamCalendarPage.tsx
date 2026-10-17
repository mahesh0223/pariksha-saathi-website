import { Link } from 'react-router-dom';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { getExamFacts } from '../../api/examFacts';
import { getExamUpdates } from '../../api/examUpdates';
import { Spinner } from '../../components/ui/Primitives';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { calendarRows, calendarSummary, examCalendarBody, examCalendarMeta, examCalendarPath } from '../../lib/examCalendar.mjs';
import { HUB_EXAM_IDS } from '../../data/examHubExams.mjs';
import type { ExamFact, ExamUpdateNotice } from '../../types/api';
import '../compare/ComparePage.css';
import './ExamHub.css';
import './ExamDirectory.css';

/**
 * The exam calendar, client-side: the same builder the prerender uses (src/lib/examCalendar.mjs) over the
 * same data - every hub exam's fact sheet plus its notices - so a student who navigates here inside the app
 * sees exactly what the static page shows. Fixed dates only, each linked to its official document.
 */
export function ExamCalendarPage({ lang }: { lang: 'en' | 'hi' }) {
  const ids = HUB_EXAM_IDS as string[];
  const factsQueries = useQueries({
    queries: ids.map((examId) => ({ queryKey: ['exam-facts', examId], queryFn: () => getExamFacts(examId) })),
  });
  const enNotices = useQuery({ queryKey: ['exam-calendar-notices', 'en'], queryFn: () => getExamUpdates(ids, 'en') });
  const hiNotices = useQuery({ queryKey: ['exam-calendar-notices', 'hi'], queryFn: () => getExamUpdates(ids, 'hi'), enabled: lang === 'hi' });

  const loading = factsQueries.some((q) => q.isLoading) || enNotices.isLoading || (lang === 'hi' && hiNotices.isLoading);

  const factsByExam: Record<string, ExamFact[]> = {};
  ids.forEach((examId, index) => {
    factsByExam[examId] = factsQueries[index].data ?? [];
  });
  // Per exam, Hindi notices when they exist, else the English ones - the same fallback the hub pages use.
  const byExam = (notices: ExamUpdateNotice[] | undefined) => {
    const grouped: Record<string, ExamUpdateNotice[]> = {};
    for (const notice of notices ?? []) {
      if (!grouped[notice.examId]) grouped[notice.examId] = [];
      grouped[notice.examId].push(notice);
    }
    return grouped;
  };
  const enByExam = byExam(enNotices.data);
  const hiByExam = byExam(hiNotices.data);
  const noticesByExam: Record<string, ExamUpdateNotice[]> = {};
  for (const examId of ids) {
    noticesByExam[examId] = lang === 'hi' && (hiByExam[examId]?.length ?? 0) > 0 ? hiByExam[examId] : enByExam[examId] ?? [];
  }

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const groups = calendarRows({ factsByExam, noticesByExam, lang, today });
  const summary = calendarSummary(groups);
  const meta = examCalendarMeta(lang, summary);

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: examCalendarPath(lang),
    type: 'website',
    lang,
    alternateLanguages: [
      { lang: 'en', path: examCalendarPath('en') },
      { lang: 'hi', path: examCalendarPath('hi') },
      { lang: 'x-default', path: examCalendarPath('en') },
    ],
  });

  const body = examCalendarBody({ groups, lang });

  return (
    <div className="compare-page">
      <header className="pub-header">
        <div className="wrap pub-nav">
          <Link className="pub-brand" to={lang === 'hi' ? '/hi/' : '/'}>
            <img src="/assets/icon-48.png" srcSet="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />
            Pariksha Saathi
          </Link>
          <nav className="pub-nav-links">
            <Link to="/app/exam-notices/">{lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices'}</Link>
          </nav>
          <Link className="pub-exams-link" to={EXAMS_LINK[lang].href} aria-label={EXAMS_LINK[lang].title}>
            {EXAMS_LINK[lang].label}
          </Link>
          <Link className="pub-cta" to="/onboarding">
            {lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}
          </Link>
        </div>
      </header>
      {loading ? (
        <div className="wrap compare-article">
          <Spinner />
        </div>
      ) : (
        <article className="wrap compare-article" dangerouslySetInnerHTML={{ __html: body }} />
      )}
      <footer className="pub-footer">
        <div className="wrap pub-footer-links">
          <Link to="/about/">About &amp; editorial standards</Link>
          <Link to="/privacy/">Privacy Policy</Link>
          <Link to="/terms/">Terms of Use</Link>
          <Link to="/contact/">Contact</Link>
          <Link to="/downloads/">Daily PDF</Link>
        </div>
      </footer>
    </div>
  );
}
