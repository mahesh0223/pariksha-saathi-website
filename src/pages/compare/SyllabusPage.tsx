import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { findSyllabusEntry } from '../../data/examSyllabi.mjs';
import { EmptyState } from '../../components/ui/Primitives';
import './ComparePage.css';

const SITE_URL = 'https://parikshasaathi.com';

export function SyllabusPage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  const entry = findSyllabusEntry(slug);
  const content = entry?.[lang];

  // Trailing slash matters here: Cloudflare Pages 308-redirects the slash-less form to this one,
  // and the prerendered HTML's canonical/sitemap already use it - this hook runs after hydration
  // and would otherwise overwrite that correct canonical with a redirecting, slash-less one.
  const enPath = `/compare/${slug}-syllabus/`;
  const hiPath = `/hi/compare/${slug}-syllabus/`;
  const path = lang === 'hi' ? hiPath : enPath;
  // There's no Hindi homepage (out of scope here) - both languages link back to the one real
  // homepage rather than a dead /hi route.
  const homeHref = '/';

  useDocumentMeta({
    title: content?.pageTitle ?? 'Syllabus & Exam Pattern',
    description: content?.lede.slice(0, 155) ?? '',
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
            author: { '@type': 'Organization', name: 'Pariksha Saathi' },
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
            <img src="/assets/icon-512.png" alt="" />
            Pariksha Saathi
          </Link>
          <nav className="pub-nav-links">
            <Link to="/app/exam-notices">{lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices'}</Link>
          </nav>
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
            <Link to="/app/exam-notices">{content.examNoticesLinkLabel} &rarr;</Link>
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
              <img src="/assets/icon-512.png" alt="" />
              Pariksha Saathi
            </div>
            <div className="pub-footer-links">
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a>
              <a href="mailto:sriwastava2@gmail.com">Contact</a>
            </div>
          </div>
          <p className="disclaimer">{content.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
