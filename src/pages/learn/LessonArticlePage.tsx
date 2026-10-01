import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { findLessonEntry } from '../../data/topicLessons.mjs';
import { EmptyState } from '../../components/ui/Primitives';
import '../compare/ComparePage.css';
import './LessonArticlePage.css';

const SITE_URL = 'https://parikshasaathi.com';

export function LessonArticlePage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  const entry = findLessonEntry(slug);
  const content = entry?.[lang];

  const enPath = `/learn/${slug}`;
  const hiPath = `/hi/learn/${slug}`;
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

        <h2>{content.practiceHeading}</h2>
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

        <h2>{content.offerHeading}</h2>
        <p>{content.offerBody}</p>

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
