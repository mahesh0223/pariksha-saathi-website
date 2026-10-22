// Static HTML for the /q/ practice questions - one list per topic, paginated, with every question in full and its
// answer behind "Show answer" - and the index, built by scripts/prerender.mjs from src/data/question-pages/*.json.
// Until 22 Oct 2026 each question also had its own page (~8,000 of them: one question each, no clicks in Search
// Console, 87% of the sitemap). They were folded into the topic lists; each question keeps its slug as its anchor, and
// functions/q/ redirects an old /q/<slug>/ address to that anchor (src/lib/questionRedirects.mjs).
// These pages carry no app JavaScript: everything on them is plain HTML and links.
import { examsLinkHtml } from './examDirectory.mjs';
import { socialLinksHtml } from '../data/socialLinks.mjs';
import { metaDescription } from './seoMeta.mjs';
import { reportQuestionLinkHtml } from './reportQuestion.mjs';

const SITE_URL = 'https://parikshasaathi.com';
export const TOPIC_PAGE_SIZE = 50;

const esc = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const L = {
  en: {
    home: 'Home', index: 'Practice questions', show: 'Show answer', correct: 'Correct answer', answer: 'Answer', solution: 'Solution',
    lesson: 'Read the lesson on this topic', practise: 'Practise this topic',
    otherLang: 'हिंदी में पढ़ें', standards: 'Editorial standards & corrections', page: 'Page', prev: '← Previous', next: 'Next →',
    listTitle: (name) => `${name}: Practice Questions with Answers`,
    listLede: (name, n) => `${n} practice questions on ${name}, with answers; most also have an explanation or a worked solution. Try each one before you open its answer.`,
    madeHeading: 'How these questions were made',
    indexTitle: 'Practice Questions with Answers, by Topic',
    indexLede: 'Each topic lists its questions in full, with the answer and, for most, an explanation or a worked solution. Pick a topic.',
    questions: (n) => `${n} questions`,
  },
  hi: {
    home: 'होम', index: 'अभ्यास प्रश्न', show: 'उत्तर देखें', correct: 'सही उत्तर', answer: 'उत्तर', solution: 'हल',
    lesson: 'इस विषय का पाठ पढ़ें', practise: 'इस विषय का अभ्यास करें',
    otherLang: 'Read in English', standards: 'संपादकीय मानक और सुधार', page: 'पृष्ठ', prev: '← पिछला', next: 'अगला →',
    listTitle: (name) => `${name}: उत्तर सहित अभ्यास प्रश्न`,
    listLede: (name, n) => `${name} पर उत्तर सहित ${n} अभ्यास प्रश्न; ज़्यादातर के साथ व्याख्या या पूरा हल भी है। उत्तर खोलने से पहले हर प्रश्न खुद हल करें।`,
    madeHeading: 'ये प्रश्न कैसे बने',
    indexTitle: 'विषय के अनुसार उत्तर सहित अभ्यास प्रश्न',
    indexLede: 'हर विषय में उसके सभी प्रश्न पूरे दिए हैं, उत्तर के साथ, और ज़्यादातर के साथ व्याख्या या पूरा हल भी। कोई विषय चुनें।',
    questions: (n) => `${n} प्रश्न`,
  },
};
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const questionIndexPath = (lang) => (lang === 'hi' ? '/hi/q/' : '/q/');
export const topicListPath = (topic, lang, page = 1) => `${questionIndexPath(lang)}${topic.slug}/${page > 1 ? `page-${page}/` : ''}`;
/** The topic-list page (1-based) that shows the question at this 0-based position in its topic's list. */
export const topicPageOf = (index) => Math.floor(index / TOPIC_PAGE_SIZE) + 1;

/** Questions grouped by topic key, each group in data order - the order the topic lists show them in. */
export function groupByTopic(questions) {
  const byTopic = new Map();
  for (const q of questions) {
    if (!byTopic.has(q.topicKey)) byTopic.set(q.topicKey, []);
    byTopic.get(q.topicKey).push(q);
  }
  return byTopic;
}

function frame(lang, inner) {
  const home = lang === 'hi' ? '/hi/' : '/';
  return `<div class="compare-page">
  <header class="pub-header">
    <div class="wrap pub-nav">
      <a class="pub-brand" href="${home}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
      <nav class="pub-nav-links">
        <a href="${lang === 'hi' ? '/hi/learn/' : '/learn/'}">${lang === 'hi' ? 'पाठ' : 'Lessons'}</a>
        <a href="${questionIndexPath(lang)}">${esc(L[lang].index)}</a>
        <a href="/app/current-affairs/">${lang === 'hi' ? 'करेंट अफेयर्स' : 'Current affairs'}</a>
      </nav>
      ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}</a>
    </div>
  </header>
  ${inner}
  <footer class="pub-footer">
    <div class="wrap pub-footer-links">
      <a href="/about/">${lang === 'hi' ? 'परिचय और संपादकीय मानक' : 'About &amp; editorial standards'}</a>
      <a href="/privacy/">${lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</a>
      <a href="/terms/">${lang === 'hi' ? 'उपयोग की शर्तें' : 'Terms of Use'}</a>
      <a href="/contact/">${lang === 'hi' ? 'संपर्क' : 'Contact'}</a><a href="/downloads/">${lang === 'hi' ? 'दैनिक PDF' : 'Daily PDF'}</a>
    ${socialLinksHtml()}</div>
  </footer>
</div>`;
}

/** The answer as text: "(B) 42" for a multiple-choice question, the lesson's own answer otherwise. */
function answerText(q) {
  if (q.kind === 'bank') return `(${LETTERS[q.correctOptionIndex]}) ${q.options[q.correctOptionIndex]}`;
  return q.answer;
}

function teachingText(q) {
  if (q.kind === 'bank') return q.explanation;
  if (q.kind === 'example') return (q.solution ?? []).join(' ');
  return '';
}

const paragraphs = (text) => String(text).split(/\n+/).filter((p) => p.trim()).map((p) => `<p>${esc(p)}</p>`).join('');

function questionItem(q, number, lang, pageUrl) {
  const t = L[lang];
  const options = q.kind === 'bank'
    ? `<ol class="pyq-opts">${q.options.map((o, i) => `<li><b>${LETTERS[i]}</b> ${esc(o)}</li>`).join('')}</ol>`
    : '';
  let teaching = '';
  if (q.kind === 'bank' && q.explanation) teaching = `<p>${esc(q.explanation)}</p>`;
  if (q.kind === 'example' && q.solution?.length) teaching = `<p><strong>${t.solution}:</strong></p><ol class="lesson-solution-steps">${q.solution.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`;
  const report = reportQuestionLinkHtml({ id: q.id ?? q.slug, topicKey: q.topicKey, languageCode: lang }, lang, `${pageUrl}#${q.slug}`);
  return `
      <li class="pyq-q" id="${esc(q.slug)}">
        <div class="pyq-num">Q.${number}</div>
        <div class="pyq-text">${paragraphs(q.text)}</div>
        ${options}
        <details class="pyq-answer"><summary>${t.show}</summary>
          <p class="pyq-correct">${q.kind === 'bank' ? t.correct : t.answer}: ${esc(answerText(q))}</p>
          ${teaching}
          <p class="pyq-topic">${report}</p>
        </details>
      </li>`;
}

export function topicListMeta(topic, lang, page, pages) {
  const t = L[lang];
  const name = topic[lang].name;
  return {
    title: `${t.listTitle(name)}${pages > 1 ? ` (${t.page} ${page})` : ''}`,
    description: metaDescription(t.listLede(name, topic[lang].count)),
  };
}

/**
 * One page of a topic's questions, in full. creditFor(q) gives the credit line for a question (the bank's own
 * attribution, or the lesson's credit); each distinct credit is shown once, above the questions.
 */
export function topicListBody(topic, lang, items, page, pages, creditFor) {
  const t = L[lang];
  const name = topic[lang].name;
  const start = (page - 1) * TOPIC_PAGE_SIZE;
  const pageUrl = `${SITE_URL}${topicListPath(topic, lang, page)}`;
  const nav = pages > 1
    ? `<p class="question-pager">${page > 1 ? `<a href="${topicListPath(topic, lang, page - 1)}">${t.prev}</a> ` : ''}${t.page} ${page} / ${pages}${page < pages ? ` <a href="${topicListPath(topic, lang, page + 1)}">${t.next}</a>` : ''}</p>`
    : '';
  const otherLang = lang === 'hi' ? 'en' : 'hi';
  const twin = topic[otherLang].count > 0 ? `<a href="${topicListPath(topic, otherLang)}" class="compare-lang-switch" lang="${otherLang}">${t.otherLang}</a>` : '';
  const lessonLink = topic.lessonSlug ? `<p><a href="${lang === 'hi' ? '/hi' : ''}/learn/${topic.lessonSlug}/">${t.lesson} →</a></p>` : '';
  const credits = [...new Set(items.map(creditFor).filter(Boolean))];
  return frame(lang, `<article class="wrap compare-article question-list">
    <div class="compare-top-row"><a href="${questionIndexPath(lang)}" class="detail-back">&larr; ${t.index}</a>${twin}</div>
    ${topic.subject ? `<p class="compare-lede">${esc(topic.subject)}</p>` : ''}
    <h1>${esc(t.listTitle(name))}</h1>
    <p class="compare-lede">${esc(t.listLede(name, topic[lang].count))}</p>
    ${lessonLink}
    ${nav}
    <ol class="pyq-list">${items.map((q, i) => questionItem(q, start + i + 1, lang, pageUrl)).join('')}
    </ol>
    ${nav}
    <section class="question-credits"><h2>${t.madeHeading}</h2>${credits.map((c) => `<p class="lesson-credit">${esc(c)}</p>`).join('')}<p><a href="/about/">${t.standards}</a></p></section>
    <p class="question-ctas"><a class="btn-primary-compare" href="/app/practice/topic/${encodeURIComponent(items[0]?.topicKey ?? '')}?lang=${lang}">${t.practise} →</a></p>
  </article>`);
}

/** Quiz markup for the questions on one topic page, plus the breadcrumb. */
export function topicListStructuredData(topic, lang, items, page, pages) {
  const url = `${SITE_URL}${topicListPath(topic, lang, page)}`;
  const name = topic[lang].name;
  const hasPart = items.map((q) => ({
    '@type': 'Question',
    eduQuestionType: q.kind === 'bank' ? 'Multiple choice' : 'Short answer',
    text: q.text,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answerText(q),
      ...(teachingText(q) ? { answerExplanation: { '@type': 'Comment', text: teachingText(q) } } : {}),
    },
  }));
  return [
    { '@context': 'https://schema.org', '@type': 'Quiz', name: topicListMeta(topic, lang, page, pages).title, url, inLanguage: lang, about: { '@type': 'Thing', name }, hasPart },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: L[lang].home, item: `${SITE_URL}${lang === 'hi' ? '/hi/' : '/'}` },
        { '@type': 'ListItem', position: 2, name: L[lang].index, item: `${SITE_URL}${questionIndexPath(lang)}` },
        { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}${topicListPath(topic, lang)}` },
      ],
    },
  ];
}

export function questionIndexMeta(lang) {
  return { title: L[lang].indexTitle, description: metaDescription(L[lang].indexLede) };
}

/** topics: [{ key, ...QUESTION_TOPICS entry }] with a count in this language, grouped by subject. */
export function questionIndexBody(topics, lang) {
  const t = L[lang];
  const bySubject = new Map();
  for (const topic of topics) {
    const subject = topic.subject ?? (lang === 'hi' ? 'अन्य' : 'Other');
    if (!bySubject.has(subject)) bySubject.set(subject, []);
    bySubject.get(subject).push(topic);
  }
  const sections = [...bySubject].map(([subject, list]) => `<section class="library-section"><h2>${esc(subject)}</h2><div class="library-grid">${list
    .sort((a, b) => b[lang].count - a[lang].count)
    .map((topic) => `<article class="library-card"><h3><a href="${topicListPath(topic, lang)}">${esc(topic[lang].name)}</a></h3><p>${t.questions(topic[lang].count)}</p></article>`)
    .join('')}</div></section>`).join('');
  return frame(lang, `<article class="wrap compare-article">
    <div class="compare-top-row"><a href="${lang === 'hi' ? '/hi/' : '/'}" class="detail-back">&larr; ${t.home}</a><a href="${questionIndexPath(lang === 'hi' ? 'en' : 'hi')}" class="compare-lang-switch" lang="${lang === 'hi' ? 'en' : 'hi'}">${t.otherLang}</a></div>
    <h1>${esc(t.indexTitle)}</h1>
    <p class="compare-lede">${esc(t.indexLede)}</p>
    ${sections}
  </article>`);
}
