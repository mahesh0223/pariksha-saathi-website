import { useEffect, useState } from 'react';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { metaDescription } from '../../lib/seoMeta.mjs';
import type { ExamJobProfileEntry } from '../../data/examJobProfiles.mjs';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import './ComparePage.css';

const SITE_URL = 'https://parikshasaathi.com';

export function JobProfilePage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  // examJobProfiles.mjs carries all 6 exams' full bilingual content - loading it dynamically,
  // only once an actual job-profile page mounts, keeps that weight out of every other page's
  // bundle (including the homepage, which links to all 6 without needing their content). Mirrors
  // src/pages/learn/LessonArticlePage.tsx's identical treatment of the much larger topicLessons.mjs.
  const [entry, setEntry] = useState<ExamJobProfileEntry | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    import('../../data/examJobProfiles.mjs').then(({ findJobProfileEntry }) => {
      setEntry(findJobProfileEntry(slug));
      setLoaded(true);
    });
  }, [slug]);

  const content = entry?.[lang];

  // Trailing slash matters here: Cloudflare Pages 308-redirects the slash-less form to this one,
  // and the prerendered HTML's canonical/sitemap already use it - this hook runs after hydration
  // and would otherwise overwrite that correct canonical with a redirecting, slash-less one.
  const enPath = `/compare/${slug}-job-profile/`;
  const hiPath = `/hi/compare/${slug}-job-profile/`;
  const syllabusPath = lang === 'hi' ? `/hi/compare/${slug}-syllabus/` : `/compare/${slug}-syllabus/`;
  const path = lang === 'hi' ? hiPath : enPath;
  const homeHref = lang === 'hi' ? '/hi/' : '/';

  useDocumentMeta({
    title: content?.pageTitle ?? 'Job Profile & Salary',
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
            // All 6 job-profile pages shipped together on 2026-10-13 - the real ship date,
            // not a per-exam fabrication. Mirrors scripts/prerender.mjs.
            datePublished: '2026-10-13',
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

  if (!loaded) {
    return (
      <div className="compare-page">
        <div className="wrap" style={{ paddingTop: 40 }}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!entry || !content) {
    return (
      <div className="compare-page">
        <div className="wrap" style={{ paddingTop: 40 }}>
          <EmptyState>This job profile page isn&rsquo;t available.</EmptyState>
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

        <h2>{content.profileHeading}</h2>
        {content.profileBody.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {content.posts && (
          <>
            <h2>{content.postsHeading}</h2>
            <div className="compare-table">
              {content.posts.map((post) => (
                <div className="compare-row" key={post.name}>
                  <div className="compare-cell compare-label">{post.name}</div>
                  <div className="compare-cell compare-both">{post.body}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {content.promotionBody.length > 0 && (
          <>
            <h2>{content.promotionHeading}</h2>
            {content.promotionBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </>
        )}

        <h2>{content.salaryHeading}</h2>
        {content.salaryBody.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {content.perks.length > 0 && (
          <>
            <h2>{content.perksHeading}</h2>
            <ul className="lesson-concept-list">
              {content.perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </>
        )}

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
            <Link to={syllabusPath}>{content.syllabusLinkLabel} &rarr;</Link>
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
            </div>
          </div>
          <p className="disclaimer">{content.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
