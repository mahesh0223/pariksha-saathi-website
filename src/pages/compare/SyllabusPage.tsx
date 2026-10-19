import { Link } from 'react-router-dom';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { metaDescription } from '../../lib/seoMeta.mjs';
import { findSyllabusEntry } from '../../data/examSyllabi.mjs';
import { EmptyState } from '../../components/ui/Primitives';
import { HUB_LINK_LABEL, hubExamIdForSlug } from '../../data/examHubExams.mjs';
import { examHubPath } from '../../lib/examHubPath.mjs';
import './ComparePage.css';
import { SocialLinks } from '../../components/layout/SocialLinks';

const SITE_URL = 'https://parikshasaathi.com';

export function SyllabusPage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  const entry = findSyllabusEntry(slug);
  const content = entry?.[lang];
  const hubExamId = hubExamIdForSlug(slug);

  // Trailing slash matters here: Cloudflare Pages 308-redirects the slash-less form to this one,
  // and the prerendered HTML's canonical/sitemap already use it - this hook runs after hydration
  // and would otherwise overwrite that correct canonical with a redirecting, slash-less one.
  const enPath = `/compare/${slug}-syllabus/`;
  const hiPath = `/hi/compare/${slug}-syllabus/`;
  const path = lang === 'hi' ? hiPath : enPath;
  const homeHref = lang === 'hi' ? '/hi/' : '/';

  useDocumentMeta({
    title: content?.pageTitle ?? 'Syllabus & Exam Pattern',
    description: metaDescription(content?.lede),
    path,
    type: 'article',
    lang,
    alternateLanguages: entry
      ? [
          { lang: 'en', path: enPath },
          { lang: 'hi', path: hiPath },
          { lang: 'x-default', path: enPath },
        ]
      : undefined,
    structuredData: entry
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: content!.pageTitle,
            description: content!.lede,
            inLanguage: lang,
            // All 7 exams' syllabus pages shipped together in one pass on 2026-10-01 - the
            // real commit date, not a per-exam fabrication. Mirrors scripts/prerender.mjs.
            datePublished: '2026-10-01',
            author: { '@type': 'Person', name: 'Mahesh Srivastava' },
            publisher: { '@type': 'Organization', name: 'Pariksha Saathi' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: content!.backLabel, item: `${SITE_URL}${homeHref}` },
              { '@type': 'ListItem', position: 2, name: content!.pageTitle },
            ],
          },
        ]
      : undefined,
  });

  if (!entry || !content) {
    return (
      <div className="compare-page">
        <div className="wrap" style={{ paddingTop: 40 }}>
          <EmptyState>This syllabus page isn&rsquo;t available.</EmptyState>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-page">
      <header className="pub-header">
        <div className="wrap pub-nav">
          <Link className="pub-brand" to={homeHref}>
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

      <article className="wrap compare-article">
        <div className="compare-top-row">
          <Link to={homeHref} className="detail-back">
            &larr; {content.backLabel}
          </Link>
          <Link to={lang === 'hi' ? enPath : hiPath} className="compare-lang-switch">
            {lang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें'}
          </Link>
        </div>

        <h1>{content.pageTitle}</h1>
        <p className="compare-lede">{content.lede}</p>

        <h2>{content.stagesHeading}</h2>
        <div className="compare-table">
          {content.stages.map((s) => (
            <div className="compare-row" key={s.name}>
              <div className="compare-cell compare-label">{s.name}</div>
              <div className="compare-cell compare-both">{s.body}</div>
            </div>
          ))}
        </div>

        <h2>{content.subjectsHeading}</h2>
        <div className="compare-table">
          {content.subjects.map((s) => (
            <div className="compare-row" key={s.name}>
              <div className="compare-cell compare-label">{s.name}</div>
              <div className="compare-cell compare-both">{s.body}</div>
            </div>
          ))}
        </div>

        <p className="compare-note">
          {content.note}{' '}
          <a href={entry.officialUrl} target="_blank" rel="noreferrer">
            {content.noteLinkLabel}
          </a>
          .
        </p>
        {hubExamId && (
          <p className="compare-note">
            <a href={examHubPath(hubExamId, lang)}>{HUB_LINK_LABEL[lang]} &rarr;</a>
          </p>
        )}

        <h2>{content.recruitsHeading}</h2>
        <p>{content.recruitsBody}</p>

        <h2>{content.offerHeading}</h2>
        <p>{content.offerBody}</p>

        <h2>{content.sourceHeading}</h2>
        <ul className="compare-links">
          <li>
            <a href={entry.officialUrl} target="_blank" rel="noreferrer">
              {content.officialLinkLabel} &#8599;
            </a>
          </li>
          <li>
            <Link to="/app/exam-notices/">{content.examNoticesLinkLabel} &rarr;</Link>
          </li>
        </ul>

        <Link className="btn-primary-compare" to="/onboarding">
          {content.ctaLabel} &rarr;
        </Link>
      </article>

      <footer className="pub-footer">
        <div className="wrap">
          <div className="pub-footer-top">
            <div className="pub-footer-brand">
              <img src="/assets/icon-48.png" srcSet="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />
              Pariksha Saathi
            </div>
            <div className="pub-footer-links">
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/contact/">Contact</a>
            <SocialLinks /></div>
          </div>
          <p className="disclaimer">{content.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
