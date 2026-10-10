import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LESSON_CATALOG } from '../../data/lessonCatalog.mjs';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import type { TopicLessonEntry } from '../../data/topicLessons.mjs';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import '../compare/ComparePage.css';
import './LessonArticlePage.css';

const SITE_URL = 'https://parikshasaathi.com';

export function LessonArticlePage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  // topicLessons.mjs carries every topic's full bilingual content (~1.6MB) - loading it
  // dynamically, only once an actual lesson page mounts, keeps that weight out of every other
  // page's bundle (including the homepage, which links to all 124 of these without needing their
  // content). The prerendered static HTML this page replaces already has the real content baked
  // in, so this brief loading gap only affects the client-side re-render, never what a crawler or
  // no-JS visitor sees.
  const [entry, setEntry] = useState<TopicLessonEntry | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    import('../../data/topicLessons.mjs').then(({ findLessonEntry }) => {
      setEntry(findLessonEntry(slug));
      setLoaded(true);
    });
  }, [slug]);

  const content = entry?.[lang];
  const topicKey = LESSON_CATALOG.find((item) => item.slug === slug)?.topicKey;

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
            <img src="/assets/icon-512.png" alt="" />
            Pariksha Saathi
          </Link>
          <nav className="pub-nav-links"><Link to="/learn/">{lang === 'hi' ? 'विषय सूची' : 'Lesson library'}</Link>
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
        <p className="lesson-credit">{lang === 'hi' ? 'प्रकाशक: परीक्षा साथी।' : 'Published by Pariksha Saathi.'} <Link to="/about/">{lang === 'hi' ? 'संपादकीय मानक और सुधार' : 'Editorial standards & corrections'}</Link></p>
        <p><a href="#practice">{lang === 'hi' ? 'अभ्यास प्रश्नों पर जाएँ' : 'Jump to practice questions'} ↓</a></p>

        <h2>{content.conceptHeading}</h2>
        <ul className="lesson-concept-list">
          {content.conceptBody.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        <h2>{content.examplesHeading}</h2>
        {content.examples.map((ex, i) => (
          <div className="lesson-example" key={i}>
            <p className="lesson-example-q">
              <strong>
                {i + 1}. {ex.question}
              </strong>
            </p>
            <p className="lesson-solution-label">{content.solutionLabel}</p>
            <ol className="lesson-solution-steps">
              {ex.solution.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ol>
            <p className="lesson-answer">
              {content.answerLabel}: {ex.answer}
            </p>
          </div>
        ))}

        <h2 id="practice">{content.practiceHeading}</h2>
        <p>{content.practiceIntro}</p>
        <div className="lesson-practice-list">
          {content.practiceQuestions.map((q, i) => (
            <details className="lesson-practice-item" key={i}>
              <summary>
                {i + 1}. {q.question}
              </summary>
              <p>
                {content.answerLabel}: {q.answer}
              </p>
            </details>
          ))}
        </div>

        <h2>{content.relevantForHeading}</h2>
        <p>{content.relevantForBody}</p>

        <h2>{lang === 'hi' ? 'अगला कदम' : 'Keep practising'}</h2>
        <p>{lang === 'hi' ? 'ऊपर के प्रश्न हल करें और उत्तर से अपनी विधि जाँचें।' : 'Solve the questions above before opening the answers. Explain each step in your own words, then revisit any mistakes.'}</p>
        {topicKey ? <Link className="btn-primary-compare" to={`/app/practice/topic/${topicKey}?lang=${lang}`}>
          {lang === 'hi' ? 'इस विषय का क्विज़ शुरू करें' : 'Start this topic’s quiz'} →
        </Link> : <a className="btn-primary-compare" href="#practice">{lang === 'hi' ? 'अभ्यास प्रश्नों पर जाएँ' : 'Go to practice questions'} →</a>}
        <p><Link to="/learn/">{lang === 'hi' ? 'सभी विषय देखें' : 'Explore the lesson library'}</Link></p>
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
