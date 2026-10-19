// Static HTML for the /q/ practice-question pages (one per distinct question, see questionEligibility.mjs),
// their per-topic lists and the index - built by scripts/prerender.mjs from src/data/question-pages/*.json.
// These pages carry no app JavaScript: everything on them is plain HTML and links.
import { examsLinkHtml } from './examDirectory.mjs';
import { socialLinksHtml } from '../data/socialLinks.mjs';
import { shortenTitle } from './seoTitle.mjs';
import { metaDescription } from './seoMeta.mjs';
import { reportQuestionLinkHtml } from './reportQuestion.mjs';
import { questionSnippet } from './questionEligibility.mjs';

const SITE_URL = 'https://parikshasaathi.com';
export const TOPIC_PAGE_SIZE = 50;

const esc = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const L = {
  en: {
    home: 'Home', index: 'Practice questions', titleSuffix: ' – Answer', tryFirst: 'Try it yourself first; the answer and its explanation are below.',
    answerHeading: 'Answer and explanation', correct: 'Correct answer', answer: 'Answer', explanation: 'Explanation', solution: 'Solution',
    more: 'More questions on', all: (n) => `All ${n} questions on this topic`, lesson: 'Read the lesson on this topic', practise: 'Practise this topic',
    otherLang: 'हिंदी में पढ़ें', standards: 'Editorial standards & corrections', page: 'Page', prev: '← Previous', next: 'Next →',
    listTitle: (name) => `${name}: Practice Questions with Answers`,
    listLede: (name, n) => `${n} practice questions on ${name}. Each has its own page with the answer; most also show an explanation or a worked solution. Try each one before you look.`,
    indexTitle: 'Practice Questions with Answers, by Topic',
    indexLede: 'Every question below has its own page with the answer, and most with an explanation or a worked solution. Pick a topic.',
    questions: (n) => `${n} questions`,
  },
  hi: {
    home: 'होम', index: 'अभ्यास प्रश्न', titleSuffix: ' – उत्तर', tryFirst: 'पहले खुद हल करके देखें; उत्तर और उसकी व्याख्या नीचे है।',
    answerHeading: 'उत्तर और व्याख्या', correct: 'सही उत्तर', answer: 'उत्तर', explanation: 'व्याख्या', solution: 'हल',
    more: 'इस विषय के और प्रश्न:', all: (n) => `इस विषय के सभी ${n} प्रश्न`, lesson: 'इस विषय का पाठ पढ़ें', practise: 'इस विषय का अभ्यास करें',
    otherLang: 'Read in English', standards: 'संपादकीय मानक और सुधार', page: 'पृष्ठ', prev: '← पिछला', next: 'अगला →',
    listTitle: (name) => `${name}: उत्तर सहित अभ्यास प्रश्न`,
    listLede: (name, n) => `${name} पर ${n} अभ्यास प्रश्न। हर प्रश्न का अपना पृष्ठ है जिस पर उत्तर दिया है; ज़्यादातर पर व्याख्या या पूरा हल भी है। उत्तर देखने से पहले खुद हल करें।`,
    indexTitle: 'विषय के अनुसार उत्तर सहित अभ्यास प्रश्न',
    indexLede: 'नीचे हर प्रश्न का अपना पृष्ठ है जिस पर उत्तर दिया है, और ज़्यादातर पर व्याख्या या पूरा हल भी। कोई विषय चुनें।',
    questions: (n) => `${n} प्रश्न`,
  },
};
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const questionIndexPath = (lang) => (lang === 'hi' ? '/hi/q/' : '/q/');
export const questionPath = (q, lang) => `${questionIndexPath(lang)}${q.slug}/`;
export const topicListPath = (topic, lang, page = 1) => `${questionIndexPath(lang)}${topic.slug}/${page > 1 ? `page-${page}/` : ''}`;

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
      ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding">${lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}</a>
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

/** <title> text (the site name is appended by the page template) and meta description. */
export function questionPageMeta(q, lang) {
  return {
    title: `${shortenTitle(q.text, 48)}${L[lang].titleSuffix}`,
    description: metaDescription(`${L[lang].answer}: ${answerText(q)}. ${teachingText(q)}`),
  };
}

/**
 * Body of one question page. ctx: { topic (QUESTION_TOPICS entry), related: [q], credit: string, twinPath }.
 */
export function questionPageBody(q, lang, ctx) {
  const t = L[lang];
  const name = ctx.topic[lang].name;
  const options = q.kind === 'bank'
    ? `<ol class="question-options" type="A">${q.options.map((o) => `<li>${esc(o)}</li>`).join('')}</ol>`
    : '';
  let teaching = '';
  if (q.kind === 'bank') teaching = `<h3>${t.explanation}</h3><p>${esc(q.explanation)}</p>`;
  if (q.kind === 'example' && q.solution?.length) teaching = `<h3>${t.solution}</h3><ol class="lesson-solution-steps">${q.solution.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`;
  const related = ctx.related.length
    ? `<h2>${t.more} ${esc(name)}</h2><ul class="lesson-concept-list">${ctx.related.map((r) => `<li><a href="${questionPath(r, lang)}">${esc(questionSnippet(r.text))}</a></li>`).join('')}</ul>`
    : '';
  const lessonLink = ctx.topic.lessonSlug ? `<a href="${lang === 'hi' ? '/hi' : ''}/learn/${ctx.topic.lessonSlug}/">${t.lesson} →</a>` : '';
  const page = `${SITE_URL}${questionPath(q, lang)}`;
  return frame(lang, `<article class="wrap compare-article question-page">
    <div class="compare-top-row">
      <a href="${topicListPath(ctx.topic, lang)}" class="detail-back">&larr; ${esc(name)}</a>
      ${ctx.twinPath ? `<a href="${ctx.twinPath}" class="compare-lang-switch" lang="${lang === 'hi' ? 'en' : 'hi'}">${t.otherLang}</a>` : ''}
    </div>
    <p class="compare-lede">${esc(ctx.topic.subject ?? '')}${ctx.topic.subject ? ' · ' : ''}${esc(name)}</p>
    <h1>${esc(q.text)}</h1>
    ${options}
    <p><em>${t.tryFirst}</em></p>
    <section class="news-learning">
      <h2>${t.answerHeading}</h2>
      <p><strong>${q.kind === 'bank' ? t.correct : t.answer}:</strong> ${esc(answerText(q))}</p>
      ${teaching}
    </section>
    <p class="lesson-credit">${esc(ctx.credit)} <a href="/about/">${t.standards}</a></p>
    <p>${reportQuestionLinkHtml({ id: q.id ?? q.slug, topicKey: q.topicKey, languageCode: lang }, lang, page)}</p>
    ${related}
    <p><a href="${topicListPath(ctx.topic, lang)}">${t.all(ctx.topic[lang].count)} →</a></p>
    <p class="question-ctas"><a class="btn-primary-compare" href="/app/practice/topic/${encodeURIComponent(q.topicKey)}?lang=${lang}">${t.practise} →</a> ${lessonLink}</p>
  </article>`);
}

export function questionPageStructuredData(q, lang, ctx) {
  const url = `${SITE_URL}${questionPath(q, lang)}`;
  const name = ctx.topic[lang].name;
  const question = {
    '@type': 'Question',
    eduQuestionType: q.kind === 'bank' ? 'Multiple choice' : 'Short answer',
    text: q.text,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answerText(q),
      ...(teachingText(q) ? { answerExplanation: { '@type': 'Comment', text: teachingText(q) } } : {}),
    },
    ...(q.kind === 'bank'
      ? { suggestedAnswer: q.options.map((o, i) => ({ '@type': 'Answer', position: i, text: o })).filter((_, i) => i !== q.correctOptionIndex) }
      : {}),
  };
  return [
    { '@context': 'https://schema.org', '@type': 'Quiz', name: questionPageMeta(q, lang).title, url, inLanguage: lang, about: { '@type': 'Thing', name }, hasPart: [question] },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: L[lang].home, item: `${SITE_URL}${lang === 'hi' ? '/hi/' : '/'}` },
        { '@type': 'ListItem', position: 2, name: L[lang].index, item: `${SITE_URL}${questionIndexPath(lang)}` },
        { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}${topicListPath(ctx.topic, lang)}` },
        { '@type': 'ListItem', position: 4, name: shortenTitle(q.text, 60), item: url },
      ],
    },
  ];
}

export function topicListMeta(topic, lang, page, pages) {
  const t = L[lang];
  const name = topic[lang].name;
  return {
    title: `${t.listTitle(name)}${pages > 1 ? ` (${t.page} ${page})` : ''}`,
    description: metaDescription(t.listLede(name, topic[lang].count)),
  };
}

export function topicListBody(topic, lang, items, page, pages) {
  const t = L[lang];
  const name = topic[lang].name;
  const start = (page - 1) * TOPIC_PAGE_SIZE;
  const nav = pages > 1
    ? `<p class="question-pager">${page > 1 ? `<a href="${topicListPath(topic, lang, page - 1)}">${t.prev}</a> ` : ''}${t.page} ${page} / ${pages}${page < pages ? ` <a href="${topicListPath(topic, lang, page + 1)}">${t.next}</a>` : ''}</p>`
    : '';
  const otherLang = lang === 'hi' ? 'en' : 'hi';
  const twin = topic[otherLang].count > 0 ? `<a href="${topicListPath(topic, otherLang)}" class="compare-lang-switch" lang="${otherLang}">${t.otherLang}</a>` : '';
  const lessonLink = topic.lessonSlug ? `<p><a href="${lang === 'hi' ? '/hi' : ''}/learn/${topic.lessonSlug}/">${t.lesson} →</a></p>` : '';
  return frame(lang, `<article class="wrap compare-article question-list">
    <div class="compare-top-row"><a href="${questionIndexPath(lang)}" class="detail-back">&larr; ${t.index}</a>${twin}</div>
    <h1>${esc(t.listTitle(name))}</h1>
    <p class="compare-lede">${esc(t.listLede(name, topic[lang].count))}</p>
    ${lessonLink}
    ${nav}
    <ol class="lesson-concept-list" start="${start + 1}">${items.map((q) => `<li><a href="${questionPath(q, lang)}">${esc(questionSnippet(q.text))}</a></li>`).join('')}</ol>
    ${nav}
    <p class="question-ctas"><a class="btn-primary-compare" href="/app/practice/topic/${encodeURIComponent(items[0]?.topicKey ?? '')}?lang=${lang}">${t.practise} →</a></p>
  </article>`);
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
