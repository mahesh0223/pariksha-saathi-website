import { useEffect, useState } from 'react';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import type { TopicLessonEntry } from '../../data/topicLessons.mjs';
import { chunkStore } from '../../lib/contentChunks';
import { lessonAuthor, lessonClosing, lessonCredit } from '../../lib/lessonCredit.mjs';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import '../compare/ComparePage.css';
import './LessonArticlePage.css';

const SITE_URL = 'https://parikshasaathi.com';

// One chunk per lesson (src/data/generated/lessons/, written by scripts/split-content.mjs from
// topicLessons.mjs) - see lib/contentChunks.ts. App.tsx's preloadRoute() calls preloadLesson so
// the entry is in hand before React mounts on a prerendered page.
const lessons = chunkStore(import.meta.glob<{ default: TopicLessonEntry }>('../../data/generated/lessons/*.mjs'));
export const preloadLesson = lessons.preload;

// HYDRATED: src/main.tsx calls hydrateRoot on /learn/<slug>/ and /hi/learn/<slug>/, so the markup
// below must match lessonPageBody() in scripts/prerender.mjs node for node (React 19 rebuilds the
// whole tree on any mismatch). Hence the single template strings where prose and a value meet:
// `{a}: {b}` would be three DOM text nodes where the HTML has one. Change both files together and
// run `npm run check:hydration`. See README.md, "Performance and offline contract".
export function LessonArticlePage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  // This page downloads ~5-10 KB brotli (its own lesson's chunk), not the whole catalog. On a
  // prerendered page the chunk was fetched before React mounted (App.tsx's preloadRoute), so the
  // initial state already holds the entry and the real article is never replaced by the spinner
  // below - that only shows on a client-side navigation to another lesson, where nothing is on
  // screen yet. `null` means the chunk arrived but no such lesson exists.
  const [state, setState] = useState<{ slug: string; entry: TopicLessonEntry | null } | undefined>(() => {
    const entry = lessons.peek(slug);
    return entry === undefined ? undefined : { slug, entry };
  });
  const loaded = state?.slug === slug;
  const entry = loaded ? state.entry ?? undefined : undefined;

  useEffect(() => {
    if (loaded) return;
    let cancelled = false;
    lessons.preload(slug).then((e) => {
      if (!cancelled) setState({ slug, entry: e });
    });
    return () => {
      cancelled = true;
    };
  }, [slug, loaded]);

  const content = entry?.[lang];
  // The practice-quiz link's key: scripts/split-content.mjs copies it from the lesson catalog into
  // the entry's own chunk, so this page does not need the whole catalog.
  const topicKey = entry?.topicKey;

  // Trailing slash matters here: Cloudflare Pages 308-redirects the slash-less form to this one,
  // and the prerendered HTML's canonical/sitemap already use it - this hook runs after hydration
  // and would otherwise overwrite that correct canonical with a redirecting, slash-less one.
  const enPath = `/learn/${slug}/`;
  const hiPath = `/hi/learn/${slug}/`;
  const path = lang === 'hi' ? hiPath : enPath;
  const homeHref = '/';

  useDocumentMeta({
    title: content?.pageTitle ?? 'Topic Lesson',
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
            '@type': 'LearningResource',
            headline: content!.pageTitle,
            description: content!.lede,
            inLanguage: lang,
            learningResourceType: 'lesson',
            datePublished: entry!.publishedDate,
            author: lessonAuthor(entry!),
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
          <EmptyState>This lesson isn&rsquo;t available.</EmptyState>
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
          <nav className="pub-nav-links"><Link to="/learn/">{lang === 'hi' ? 'विषय सूची' : 'Lesson library'}</Link>
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
        <p className="lesson-credit">{`${lessonCredit(entry, lang).text} `}<Link to="/about/">{lessonCredit(entry, lang).link}</Link></p>
        <p><a href="#practice">{`${lang === 'hi' ? 'अभ्यास प्रश्नों पर जाएँ' : 'Jump to practice questions'} ↓`}</a></p>

        <h2>{content.conceptHeading}</h2>
        <ul className="lesson-concept-list">
          {content.conceptBody.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        {content.keyFacts && content.keyFacts.length > 0 && (
          <>
            <h2>{content.keyFactsHeading}</h2>
            <ul className="lesson-concept-list">
              {content.keyFacts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </>
        )}

        {content.examples.length > 0 && <h2>{content.examplesHeading}</h2>}
        {content.examples.map((ex, i) => (
          <div className="lesson-example" key={i}>
            <p className="lesson-example-q">
              <strong>{`${i + 1}. ${ex.question}`}</strong>
            </p>
            <p className="lesson-solution-label">{content.solutionLabel}</p>
            <ol className="lesson-solution-steps">
              {ex.solution.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ol>
            <p className="lesson-answer">{`${content.answerLabel}: ${ex.answer}`}</p>
          </div>
        ))}

        <h2 id="practice">{content.practiceHeading}</h2>
        <p>{content.practiceIntro}</p>
        <div className="lesson-practice-list">
          {content.practiceQuestions.map((q, i) => (
            <details className="lesson-practice-item" key={i}>
              <summary>{`${i + 1}. ${q.question}`}</summary>
              <p>{`${content.answerLabel}: ${q.answer}`}</p>
            </details>
          ))}
        </div>

        <h2>{content.relevantForHeading}</h2>
        <p>{content.relevantForBody}</p>

        <h2>{lang === 'hi' ? 'अगला कदम' : 'Keep practising'}</h2>
        <p>{lessonClosing(entry, lang)}</p>
        {topicKey ? <Link className="btn-primary-compare" to={`/app/practice/topic/${topicKey}?lang=${lang}`}>
          {`${lang === 'hi' ? 'इस विषय का क्विज़ शुरू करें' : 'Start this topic’s quiz'} →`}
        </Link> : <a className="btn-primary-compare" href="#practice">{`${lang === 'hi' ? 'अभ्यास प्रश्नों पर जाएँ' : 'Go to practice questions'} →`}</a>}
        <p><Link to="/learn/">{lang === 'hi' ? 'सभी विषय देखें' : 'Explore the lesson library'}</Link></p>
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
