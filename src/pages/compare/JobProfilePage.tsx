import { useEffect, useState } from 'react';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import type { ExamJobProfileEntry } from '../../data/examJobProfiles.mjs';
import { chunkStore } from '../../lib/contentChunks';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import './ComparePage.css';

const SITE_URL = 'https://parikshasaathi.com';

// One chunk per exam (src/data/generated/job-profiles/, written by scripts/split-content.mjs from
// examJobProfiles.mjs) - see lib/contentChunks.ts and the matching code in LessonArticlePage.tsx.
const jobProfiles = chunkStore(import.meta.glob<{ default: ExamJobProfileEntry }>('../../data/generated/job-profiles/*.mjs'));
export const preloadJobProfile = jobProfiles.preload;

// HYDRATED: src/main.tsx calls hydrateRoot on /compare/<slug>-job-profile/ and its /hi/ variant, so
// the markup below must match jobProfilePageBody() in scripts/prerender.mjs node for node - hence
// the single template strings where prose and a value meet (`{a} →` would be two text nodes where
// the HTML has one). Change both files together and run `npm run check:hydration`.
export function JobProfilePage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  // Each exam's bilingual job profile is its own chunk, preloaded before React mounts on the
  // prerendered page so the article is never replaced by a spinner - see
  // src/pages/learn/LessonArticlePage.tsx and src/lib/contentChunks.ts for the full story.
  const [state, setState] = useState<{ slug: string; entry: ExamJobProfileEntry | null } | undefined>(() => {
    const entry = jobProfiles.peek(slug);
    return entry === undefined ? undefined : { slug, entry };
  });
  const loaded = state?.slug === slug;
  const entry = loaded ? state.entry ?? undefined : undefined;

  useEffect(() => {
    if (loaded) return;
    let cancelled = false;
    jobProfiles.preload(slug).then((e) => {
      if (!cancelled) setState({ slug, entry: e });
    });
    return () => {
      cancelled = true;
    };
  }, [slug, loaded]);

  const content = entry?.[lang];

  // Trailing slash matters here: Cloudflare Pages 308-redirects the slash-less form to this one,
  // and the prerendered HTML's canonical/sitemap already use it - this hook runs after hydration
  // and would otherwise overwrite that correct canonical with a redirecting, slash-less one.
  const enPath = `/compare/${slug}-job-profile/`;
  const hiPath = `/hi/compare/${slug}-job-profile/`;
  const syllabusPath = lang === 'hi' ? `/hi/compare/${slug}-syllabus/` : `/compare/${slug}-syllabus/`;
  const path = lang === 'hi' ? hiPath : enPath;
  const homeHref = '/';

  useDocumentMeta({
    title: content?.pageTitle ?? 'Job Profile & Salary',
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
            <Link to="/app/exam-notices">{lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices'}</Link>
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
          <Link to={homeHref} className="detail-back">{`← ${content.backLabel}`}</Link>
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
          {`${content.note} `}
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
              {`${content.officialLinkLabel} ↗`}
            </a>
          </li>
          <li>
            <Link to={syllabusPath}>{`${content.syllabusLinkLabel} →`}</Link>
          </li>
          <li>
            <Link to="/app/exam-notices">{`${content.examNoticesLinkLabel} →`}</Link>
          </li>
        </ul>

        <Link className="btn-primary-compare" to="/onboarding">
          {`${content.ctaLabel} →`}
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
              <a href="/about/">About &amp; editorial standards</a>
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/contact/">Contact</a>
              <a href="/downloads/">Daily PDF</a>
            </div>
          </div>
          <p className="disclaimer">{content.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
