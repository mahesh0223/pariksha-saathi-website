// Static HTML for the /q/ practice questions - one list per topic, paginated, with every question in full and its
// answer behind "Show answer" - and the index, built by scripts/prerender.mjs from src/data/question-pages/*.json.
// Until 22 Oct 2026 each question also had its own page (~8,000 of them: one question each, no clicks in Search
// Console, 87% of the sitemap). They were folded into the topic lists; each question keeps its slug as its anchor, and
// functions/q/ redirects an old /q/<slug>/ address to that anchor (src/lib/questionRedirects.mjs).
// Previous-year questions are not copied onto the lists (each is on its solved-paper page, and a second full copy would
// be duplicate content): a topic's first page summarises and links them, and /app/pyq-practice/ lets a student sit them.
// The Hindi-language topics (SSC GD's Part-D Hindi) have only previous-year questions, so their page is their lesson
// plus that summary.
// These pages carry no app JavaScript: everything on them is plain HTML and links.
import { examsLinkHtml } from './examDirectory.mjs';
import { socialLinksHtml } from '../data/socialLinks.mjs';
import { metaDescription } from './seoMeta.mjs';
import { reportQuestionLinkHtml } from './reportQuestion.mjs';
import { pyqPracticePath } from './pyqPractice.mjs';

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
    pyqCount: (n) => `${n} previous-year`,
    lessonTitle: (name) => `${name}: Lesson and Previous-Year Questions`,
    lessonLede: (name, n) => `The lesson on ${name}, and ${n} questions on it from official papers, each with the official answer and a worked explanation on its solved-paper page.`,
    pyqHeading: 'Previous-year questions on this topic',
    pyqIntro: (name, n) => `${n} question${n === 1 ? '' : 's'} on ${name} from official papers, each on its solved-paper page with the official answer and a worked explanation:`,
    pyqTeaser: (n) => `${n} previous-year question${n === 1 ? '' : 's'} on this topic from official papers`,
    pyqSeeBelow: 'see below',
    pyqPractise: 'Practise previous-year questions (20 at a time) →',
    pyqLatest: 'Latest',
    examples: 'Examples',
    summary: 'At a glance',
    pyqCredit: 'The previous-year questions and their answers are the exam body\'s own, from its papers and answer keys; the explanations were drafted with AI assistance by Pariksha Saathi and checked against the official answers.',
    shift: (s) => s,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    pyqCount: (n) => `${n} पिछले वर्ष के`,
    lessonTitle: (name) => `${name}: पाठ और पिछले वर्ष के प्रश्न`,
    lessonLede: (name, n) => `${name} का पाठ, और आधिकारिक प्रश्नपत्रों से इस विषय के ${n} प्रश्न, हर प्रश्न अपने हल प्रश्नपत्र पेज पर आधिकारिक उत्तर और समझाए गए हल के साथ।`,
    pyqHeading: 'इस विषय के पिछले वर्ष के प्रश्न',
    pyqIntro: (name, n) => `${name} पर आधिकारिक प्रश्नपत्रों से ${n} प्रश्न, हर प्रश्न अपने हल प्रश्नपत्र पेज पर आधिकारिक उत्तर और समझाए गए हल के साथ:`,
    pyqTeaser: (n) => `आधिकारिक प्रश्नपत्रों से इस विषय के पिछले वर्ष के ${n} प्रश्न`,
    pyqSeeBelow: 'नीचे देखें',
    pyqPractise: 'पिछले वर्ष के प्रश्नों का अभ्यास करें (एक बार में 20) →',
    pyqLatest: 'सबसे नए',
    // A Hindi page whose topic has previous-year questions only in English.
    pyqElsewhere: (n) => `इस विषय के पिछले वर्ष के ${n} प्रश्न आधिकारिक प्रश्नपत्रों से हैं, पर अंग्रेज़ी में।`,
    pyqPractiseEnglish: 'अंग्रेज़ी में अभ्यास करें →',
    examples: 'उदाहरण',
    summary: 'एक नज़र में',
    pyqCredit: 'पिछले वर्ष के प्रश्न और उनके उत्तर परीक्षा निकाय के अपने प्रश्नपत्रों और उत्तर कुंजियों से हैं; उनके हल Pariksha Saathi ने AI की सहायता से तैयार किए हैं और आधिकारिक उत्तरों से मिलाकर जाँचे हैं।',
    lessonCredit: 'यह पाठ एक AI सहायक (Claude) ने मानक हिंदी व्याकरण के आधार पर लिखा है और एक दूसरे, स्वतंत्र AI पाठ ने इसकी जाँच की है; किसी हिंदी शिक्षक ने अभी इसकी समीक्षा नहीं की है। किसी नियम पर भरोसा करने से पहले मानक व्याकरण पुस्तक से मिला लें।',
    shift: (s) => s.replace('Shift', 'पाली'),
    months: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  },
};
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const questionIndexPath = (lang) => (lang === 'hi' ? '/hi/q/' : '/q/');
export const topicListPath = (topic, lang, page = 1) => `${questionIndexPath(lang)}${topic.slug}/${page > 1 ? `page-${page}/` : ''}`;
/** Whether a topic has a page in this language: a list of questions, or (the Hindi-language topics) its lesson. */
export const topicHasPage = (topic, lang) => (topic?.[lang]?.count ?? 0) > 0 || Boolean(topic?.[lang]?.lessonPage);
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

const fmtDate = (iso, lang) => `${Number(iso.slice(8, 10))} ${L[lang].months[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

/**
 * A topic's previous-year questions (topic.pyq, from scripts/gen-question-pages.mjs): how many, from which papers, the
 * latest few linked to their place on the solved-paper pages, and the practice player. On a Hindi page whose topic has
 * them only in English, a short note that says so and offers the English practice.
 */
export function pyqTopicSectionHtml(topicKey, topic, lang) {
  const t = L[lang];
  const own = topic.pyq?.[lang];
  if (!own) {
    const english = lang === 'hi' ? topic.pyq?.en : null;
    if (!english) return '';
    const list = topicHasPage(topic, 'en') ? ` <a href="${topicListPath(topic, 'en')}#previous-year-questions" lang="en">${esc(topic.en.name)} &rarr;</a>` : '';
    return `
    <section class="pyq-topic" id="previous-year-questions">
      <h2>${t.pyqHeading}</h2>
      <p>${esc(t.pyqElsewhere(english.count))}${list}</p>
      <p><a class="btn-primary-compare" href="${pyqPracticePath(topicKey, 'en')}">${t.pyqPractiseEnglish}</a></p>
    </section>`;
  }
  const stop = lang === 'hi' ? '।' : '.';
  const groups = own.groups.map((g) => `<a href="${g.href}">${esc(g.name)}</a> (${g.count})`).join(', ');
  const latest = own.latest
    .map((q) => `<li><a href="${q.href}">${esc(q.snippet)}</a> <span class="pyq-latest-meta">${esc(q.paper)} · ${fmtDate(q.date, lang)} · ${esc(t.shift(q.shift))}</span></li>`)
    .join('');
  return `
    <section class="pyq-topic" id="previous-year-questions">
      <h2>${t.pyqHeading}</h2>
      <p>${esc(t.pyqIntro(topic[lang].name, own.count))} ${groups}${stop}</p>
      <p><a class="btn-primary-compare" href="${pyqPracticePath(topicKey, lang)}">${t.pyqPractise}</a></p>
      <h3>${t.pyqLatest}</h3>
      <ul class="pyq-latest">${latest}</ul>
    </section>`;
}

/** The server lesson that is a Hindi-language topic's page (src/data/question-pages/topic-lessons.json). */
function topicLessonHtml(lesson, lang) {
  const t = L[lang];
  return `
    <section class="topic-lesson">
      <h2>${esc(lesson.title)}</h2>
      ${String(lesson.explanation).split(/\n{2,}/).filter((p) => p.trim()).map((p) => `<p>${esc(p)}</p>`).join('')}
      ${lesson.examples?.length ? `<h3>${t.examples}</h3><ul>${lesson.examples.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
      ${lesson.revisionSummary ? `<h3>${t.summary}</h3><p>${esc(lesson.revisionSummary)}</p>` : ''}
    </section>`;
}

export function topicListMeta(topic, lang, page, pages) {
  const t = L[lang];
  const name = topic[lang].name;
  if (topic[lang].count === 0) {
    return { title: t.lessonTitle(name), description: metaDescription(t.lessonLede(name, topic.pyq?.[lang]?.count ?? 0)) };
  }
  return {
    title: `${t.listTitle(name)}${pages > 1 ? ` (${t.page} ${page})` : ''}`,
    description: metaDescription(t.listLede(name, topic[lang].count)),
  };
}

/**
 * One page of a topic's questions, in full, with the topic's previous-year questions summarised and linked on its
 * first page. creditFor(q) gives the credit line for a question (the bank's own attribution, or the lesson's credit);
 * each distinct credit is shown once, below the questions. A topic with no list (the Hindi-language topics) passes
 * its lesson instead and no items.
 */
export function topicListBody(topicKey, topic, lang, items, page, pages, creditFor, lesson = null) {
  const t = L[lang];
  const name = topic[lang].name;
  const start = (page - 1) * TOPIC_PAGE_SIZE;
  const pageUrl = `${SITE_URL}${topicListPath(topic, lang, page)}`;
  const nav = pages > 1
    ? `<p class="question-pager">${page > 1 ? `<a href="${topicListPath(topic, lang, page - 1)}">${t.prev}</a> ` : ''}${t.page} ${page} / ${pages}${page < pages ? ` <a href="${topicListPath(topic, lang, page + 1)}">${t.next}</a>` : ''}</p>`
    : '';
  const otherLang = lang === 'hi' ? 'en' : 'hi';
  const twin = topicHasPage(topic, otherLang) ? `<a href="${topicListPath(topic, otherLang)}" class="compare-lang-switch" lang="${otherLang}">${t.otherLang}</a>` : '';
  const lessonLink = topic.lessonSlug ? `<p><a href="${lang === 'hi' ? '/hi' : ''}/learn/${topic.lessonSlug}/">${t.lesson} →</a></p>` : '';
  const pyq = page === 1 ? pyqTopicSectionHtml(topicKey, topic, lang) : '';
  const own = topic.pyq?.[lang];
  const top = `
    <div class="compare-top-row"><a href="${questionIndexPath(lang)}" class="detail-back">&larr; ${t.index}</a>${twin}</div>
    ${topic.subject ? `<p class="compare-lede">${esc(topic.subject)}</p>` : ''}`;
  if (items.length === 0) {
    return frame(lang, `<article class="wrap compare-article question-list">${top}
    <h1>${esc(t.lessonTitle(name))}</h1>
    <p class="compare-lede">${esc(t.lessonLede(name, own?.count ?? 0))}</p>
    ${lesson ? topicLessonHtml(lesson, lang) : ''}
    ${pyq}
    <section class="question-credits"><h2>${t.madeHeading}</h2>${lesson && t.lessonCredit ? `<p class="lesson-credit">${esc(t.lessonCredit)}</p>` : ''}<p class="lesson-credit">${esc(t.pyqCredit)}</p><p><a href="/about/">${t.standards}</a></p></section>
  </article>`);
  }
  const credits = [...new Set(items.map(creditFor).filter(Boolean))];
  const teaser = pyq && own ? `<p class="pyq-teaser">${esc(t.pyqTeaser(own.count))}: <a href="#previous-year-questions">${t.pyqSeeBelow}</a></p>` : '';
  return frame(lang, `<article class="wrap compare-article question-list">${top}
    <h1>${esc(t.listTitle(name))}</h1>
    <p class="compare-lede">${esc(t.listLede(name, topic[lang].count))}</p>
    ${lessonLink}
    ${teaser}
    ${nav}
    <ol class="pyq-list">${items.map((q, i) => questionItem(q, start + i + 1, lang, pageUrl)).join('')}
    </ol>
    ${nav}
    ${pyq}
    <section class="question-credits"><h2>${t.madeHeading}</h2>${credits.map((c) => `<p class="lesson-credit">${esc(c)}</p>`).join('')}<p><a href="/about/">${t.standards}</a></p></section>
    <p class="question-ctas"><a class="btn-primary-compare" href="/app/practice/topic/${encodeURIComponent(topicKey)}?lang=${lang}">${t.practise} →</a></p>
  </article>`);
}

/** Quiz markup for the questions on one topic page, plus the breadcrumb (a lesson page has only the breadcrumb). */
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
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: L[lang].home, item: `${SITE_URL}${lang === 'hi' ? '/hi/' : '/'}` },
      { '@type': 'ListItem', position: 2, name: L[lang].index, item: `${SITE_URL}${questionIndexPath(lang)}` },
      { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}${topicListPath(topic, lang)}` },
    ],
  };
  if (items.length === 0) return [breadcrumb];
  return [
    { '@context': 'https://schema.org', '@type': 'Quiz', name: topicListMeta(topic, lang, page, pages).title, url, inLanguage: lang, about: { '@type': 'Thing', name }, hasPart },
    breadcrumb,
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
    .sort((a, b) => b[lang].count + (b.pyq?.[lang]?.count ?? 0) - a[lang].count - (a.pyq?.[lang]?.count ?? 0))
    .map((topic) => `<article class="library-card"><h3><a href="${topicListPath(topic, lang)}">${esc(topic[lang].name)}</a></h3><p>${[topic[lang].count > 0 ? t.questions(topic[lang].count) : '', topic.pyq?.[lang] ? t.pyqCount(topic.pyq[lang].count) : ''].filter(Boolean).join(' · ')}</p></article>`)
    .join('')}</div></section>`).join('');
  return frame(lang, `<article class="wrap compare-article">
    <div class="compare-top-row"><a href="${lang === 'hi' ? '/hi/' : '/'}" class="detail-back">&larr; ${t.home}</a><a href="${questionIndexPath(lang === 'hi' ? 'en' : 'hi')}" class="compare-lang-switch" lang="${lang === 'hi' ? 'en' : 'hi'}">${t.otherLang}</a></div>
    <h1>${esc(t.indexTitle)}</h1>
    <p class="compare-lede">${esc(t.indexLede)}</p>
    ${sections}
  </article>`);
}
