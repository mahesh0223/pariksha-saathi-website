import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { gkInsightsBody, gkInsightsMeta, gkInsightsPath } from '../../lib/gkInsights.mjs';
import '../compare/ComparePage.css';
import './ExamHub.css';
import './ExamDirectory.css';
import { SocialLinks } from '../../components/layout/SocialLinks';

/**
 * "What SSC asks in General Awareness", client-side: the same builder the prerender uses (src/lib/gkInsights.mjs) over
 * the same generated data (src/data/gkInsights.mjs), so a student who navigates here inside the app sees exactly what
 * the static page shows.
 */
export function GkInsightsPage({ lang }: { lang: 'en' | 'hi' }) {
  const meta = gkInsightsMeta(lang);
  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: gkInsightsPath(lang),
    type: 'article',
    lang,
    alternateLanguages: [
      { lang: 'en', path: gkInsightsPath('en') },
      { lang: 'hi', path: gkInsightsPath('hi') },
      { lang: 'x-default', path: gkInsightsPath('en') },
    ],
  });

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
      <article className="wrap compare-article" dangerouslySetInnerHTML={{ __html: gkInsightsBody(lang) }} />
      <footer className="pub-footer">
        <div className="wrap pub-footer-links">
          <Link to="/about/">About &amp; editorial standards</Link>
          <Link to="/privacy/">Privacy Policy</Link>
          <Link to="/terms/">Terms of Use</Link>
          <Link to="/contact/">Contact</Link>
          <Link to="/downloads/">Daily PDF</Link>
        <SocialLinks /></div>
      </footer>
    </div>
  );
}
