import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { examDirectoryBody, examDirectoryMeta, examDirectoryPath, examDirectoryStructuredData, EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { HUB_EXAM_IDS } from '../../data/examHubExams.mjs';
import { EXAM_SYLLABI } from '../../data/examSyllabi.mjs';
import { EXAM_JOB_PROFILE_SLUGS } from '../../data/examJobProfileSlugs.mjs';
import '../compare/ComparePage.css';
import './ExamDirectory.css';
import { SocialLinks } from '../../components/layout/SocialLinks';

export function ExamDirectoryPage({ lang }: { lang: 'en' | 'hi' }) {
  const meta = examDirectoryMeta(lang);
  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: examDirectoryPath(lang),
    type: 'website',
    lang,
    structuredData: examDirectoryStructuredData({ lang, hubIds: HUB_EXAM_IDS as string[], siteUrl: 'https://parikshasaathi.com' }),
    alternateLanguages: [
      { lang: 'en', path: examDirectoryPath('en') },
      { lang: 'hi', path: examDirectoryPath('hi') },
      { lang: 'x-default', path: examDirectoryPath('en') },
    ],
  });

  const body = examDirectoryBody({
    lang,
    hubIds: HUB_EXAM_IDS as string[],
    syllabusSlugs: (EXAM_SYLLABI as { slug: string }[]).map((e) => e.slug),
    jobProfileSlugs: EXAM_JOB_PROFILE_SLUGS as string[],
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
          <Link className="pub-cta" to="/onboarding/">
            {lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}
          </Link>
        </div>
      </header>
      <article className="wrap compare-article" dangerouslySetInnerHTML={{ __html: body }} />
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
