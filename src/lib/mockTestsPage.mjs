// One exam's mock tests (/exams/<exam>/mock-tests/ and the /hi/ twin): the page a search for "SSC CGL mock test" or
// "RRB NTPC mock test" should land on. Railway exams from 23 Oct 2026, every exam with a fact sheet from 24 Oct. For every stage whose pattern the notification fixes, the official pattern (sections, questions,
// time, negative marking) with its source and check date, and the numbered mocks of that stage, each opening the
// in-browser player (src/pages/mocks/MockTestPage.tsx). Plain HTML, no app script. Data: the server's
// GET /v1/exams/:examId/mocks?lang= (pariksha-saathi-server docs/REAL_PAPER.md), one call per language - a series can be
// shorter in Hindi when the Hindi bank is thinner.
import { examsLinkHtml } from './examDirectory.mjs';
import { examHubPath, formatHubDate } from './examHubPath.mjs';
import { EXAM_NAMES } from './examNames.mjs';
import { socialLinksHtml } from '../data/socialLinks.mjs';
import { telegramCtaHtml } from './telegramCta.mjs';
import { homeVisitHint } from './officialLink.mjs';
import { metaDescription } from './seoMeta.mjs';
import { mockPlayerPath, mockTestsPath } from './mockTestsPath.mjs';

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

const pick = (bilingual, lang) => bilingual?.[lang] ?? bilingual?.en ?? '';
// 0.3333... is how the fact sheet stores RRB's "one-third of the marks"; print it the way the notice does.
const fraction = (x) => (Math.abs(x - 1 / 3) < 1e-6 ? '1/3' : Math.abs(x - 0.25) < 1e-6 ? '1/4' : String(Math.round(x * 100) / 100));
const questionsIn = (stage) => stage.sections.reduce((n, s) => n + s.questionCount, 0);
// A stage whose mocks cover one part of it (SSC CGL Tier-II: Paper-I, Section-I) names that part; a part that only
// restates the stage (IBPS: "Preliminary Examination (Online)" / "Preliminary Examination (Objective Test)") does not.
const words = (name, n) => name.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/).slice(0, n).join(' ').toLowerCase();
const stageLabel = (stage, lang) => {
  const stageName = pick(stage.stageName, lang);
  const partName = pick(stage.partName, lang);
  const restates = !partName || partName === stageName || stageName.includes(partName)
    || words(partName, 2) === words(stageName, 2) || words(stageName, 99).includes(words(partName, 3));
  return restates ? stageName : `${stageName}, ${partName}`;
};

// Stages a notification lists but our mocks cannot follow, said plainly rather than left out silently.
const NOT_OFFERED = {
  rrb_alp: {
    en: 'CBT-2 has no mocks here: the notification does not give a subject-wise split of its Part-A questions, and we do not invent one.',
    hi: 'CBT-2 के मॉक यहाँ नहीं हैं: अधिसूचना इसके भाग-A के प्रश्नों का विषयवार बँटवारा नहीं देती, और हम अपनी ओर से बँटवारा नहीं गढ़ते।',
  },
};

function summary(examId, series) {
  const examName = series.examName ?? EXAM_NAMES[examId] ?? examId;
  const total = series.stages.reduce((n, s) => n + s.mockCount, 0);
  const negative = series.stages.find((s) => s.negativeMarksPerWrong != null)?.negativeMarksPerWrong ?? null;
  const englishInHindi = series.stages.some((s) => s.shownInEnglishFallback);
  return { examName, total, negative, englishInHindi, stages: series.stages };
}

const T = {
  en: {
    title: (s) => `${s.examName} Mock Test: ${s.total} Free Full Mocks in the Official Pattern (Hindi & English)`,
    h1: (s) => `${s.examName} mock tests in the official pattern`,
    description: (s, series) => `${s.total} free full-length ${s.examName} mock tests built to the pattern in the official notification (${series.cycleLabel}): the same sections, number of questions, time and negative marking. In English or Hindi, no sign-up.`,
    lede: (s, series) => `${s.total} free full-length mock tests for ${s.examName}, each built to the pattern in the official notification (${series.cycleLabel}): the same sections, number of questions, time limit and negative marking. Every mock keeps its questions, so you can retake it and compare scores, and no question repeats within a stage's series. Take them online in English or Hindi; no sign-up.`,
    back: (s) => `${s.examName} exam page`,
    stageTitle: (stage) => `${stageLabel(stage, 'en')}: ${stage.mockCount} mock test${stage.mockCount === 1 ? '' : 's'}`,
    thSection: 'Section',
    thQuestions: 'Questions',
    total: 'Total',
    shortNote: (n) => ` (${n} in our mocks)`,
    meta: (stage) => `Time: ${stage.durationMinutes} minutes${stage.sectionTimers ? ', each section timed on its own as the notification sets it' : ' for the whole paper'}.`,
    negative: (x) => (x == null ? 'Negative marking: not stated in the notification, so nothing is deducted in these mocks.' : `Negative marking: ${fraction(x)} mark deducted for each wrong answer; an unanswered question scores zero.`),
    source: 'Pattern from the official notification',
    checked: 'checked',
    mock: (n) => `Mock ${n}`,
    startHint: 'Each mock opens in your browser and starts its timer when you press Start.',
    howTitle: 'How these mocks are made',
    how: 'These are practice mocks in the official pattern, not the exam body\'s question papers: each mock is filled from the Pariksha Saathi question bank, topic by topic, in the official sections. The questions are written by Pariksha Saathi with AI assistance and fact-checked. The pattern figures are copied from the notification linked above.',
    error: 'Spotted an error?',
    tell: 'Tell us',
    faqTitle: 'Frequently asked questions',
    faq: (s) => [
      { q: `Are these ${s.examName} mock tests free?`, a: 'Yes. Every mock is free to take in your browser, with no sign-up and no payment.' },
      { q: `Is there negative marking in these ${s.examName} mocks?`, a: s.negative == null ? 'The notification does not state negative marking, so nothing is deducted.' : `Yes, as the notification states: ${fraction(s.negative)} mark is deducted for each wrong answer. An unanswered question scores zero.` },
      { q: `Are these previous year ${s.examName} papers?`, a: 'No. They are practice mocks in the official pattern, filled from the Pariksha Saathi question bank. We do not publish the exam body\'s question papers.' },
      { q: 'Can I take the mocks in Hindi?', a: s.englishInHindi ? 'Yes. Open the Hindi page and the mocks use Hindi questions; an English-language section stays in English, as in the exam, and a few topics with no Hindi questions yet are in English too.' : 'Yes. Open the Hindi page and every question in the mocks is in Hindi.' },
      { q: 'Do the mocks repeat questions?', a: 'No question repeats within a stage\'s series, and each mock is the same set of questions every time you take it, so a retake shows your real progress.' },
    ],
    moreTitle: (s) => `More for ${s.examName}`,
    more: { hub: 'Exam pattern, syllabus, cut-offs and latest notices', practice: 'Practice questions by topic', affairs: 'Daily current affairs' },
    langSwitch: { href: (id) => mockTestsPath(id, 'hi'), label: 'हिंदी में पढ़ें' },
    nav: { practice: 'Practice questions', affairs: 'Current affairs', start: 'Start studying' },
  },
  hi: {
    title: (s) => `${s.examName} मॉक टेस्ट: आधिकारिक पैटर्न में ${s.total} मुफ़्त पूरे मॉक (हिंदी और अंग्रेज़ी)`,
    h1: (s) => `${s.examName} मॉक टेस्ट, आधिकारिक पैटर्न में`,
    description: (s, series) => `आधिकारिक अधिसूचना (${series.cycleLabel}) के पैटर्न पर बने ${s.examName} के ${s.total} मुफ़्त पूरे मॉक टेस्ट: वही खंड, प्रश्नों की संख्या, समय और नकारात्मक अंकन। हिंदी या अंग्रेज़ी में, बिना साइन-अप।`,
    lede: (s, series) => `${s.examName} के ${s.total} मुफ़्त पूरे मॉक टेस्ट, हर एक आधिकारिक अधिसूचना (${series.cycleLabel}) के पैटर्न पर: वही खंड, प्रश्नों की संख्या, समय-सीमा और नकारात्मक अंकन। हर मॉक के प्रश्न तय रहते हैं, इसलिए दोबारा देकर अंकों की तुलना कर सकते हैं, और किसी चरण की शृंखला में कोई प्रश्न दोहराया नहीं जाता। हिंदी या अंग्रेज़ी में ऑनलाइन दें; साइन-अप की ज़रूरत नहीं।`,
    back: (s) => `${s.examName} परीक्षा पेज`,
    stageTitle: (stage) => `${stageLabel(stage, 'hi')}: ${stage.mockCount} मॉक टेस्ट`,
    thSection: 'खंड',
    thQuestions: 'प्रश्न',
    total: 'कुल',
    shortNote: (n) => ` (हमारे मॉक में ${n})`,
    meta: (stage) => (stage.sectionTimers ? `समय: ${stage.durationMinutes} मिनट, हर खंड का समय अलग, जैसा अधिसूचना में तय है।` : `समय: पूरे प्रश्नपत्र के लिए ${stage.durationMinutes} मिनट।`),
    negative: (x) => (x == null ? 'नकारात्मक अंकन: अधिसूचना में नहीं बताया गया, इसलिए इन मॉक में कुछ नहीं काटा जाता।' : `नकारात्मक अंकन: हर गलत उत्तर पर ${fraction(x)} अंक काटा जाता है; बिना उत्तर वाले प्रश्न पर शून्य।`),
    source: 'पैटर्न आधिकारिक अधिसूचना से',
    checked: 'जाँचा गया',
    mock: (n) => `मॉक ${n}`,
    startHint: 'हर मॉक आपके ब्राउज़र में खुलता है और "शुरू करें" दबाने पर उसका टाइमर चलता है।',
    howTitle: 'ये मॉक कैसे बने हैं',
    how: 'ये आधिकारिक पैटर्न में अभ्यास मॉक हैं, परीक्षा संस्था के प्रश्नपत्र नहीं: हर मॉक Pariksha Saathi के प्रश्न बैंक से, विषयवार, आधिकारिक खंडों में भरा गया है। प्रश्न Pariksha Saathi ने AI की सहायता से लिखे और तथ्य-जाँचे हैं। पैटर्न के आँकड़े ऊपर लिंक की गई अधिसूचना से लिए गए हैं।',
    error: 'कोई ग़लती दिखी?',
    tell: 'हमें बताएँ',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    faq: (s) => [
      { q: `क्या ${s.examName} के ये मॉक टेस्ट मुफ़्त हैं?`, a: 'हाँ। हर मॉक ब्राउज़र में मुफ़्त दिया जा सकता है, बिना साइन-अप और बिना भुगतान।' },
      { q: `क्या ${s.examName} के इन मॉक में नकारात्मक अंकन (नेगेटिव मार्किंग) है?`, a: s.negative == null ? 'अधिसूचना में नकारात्मक अंकन नहीं बताया गया, इसलिए कुछ नहीं काटा जाता।' : `हाँ, जैसा अधिसूचना में है: हर गलत उत्तर पर ${fraction(s.negative)} अंक काटा जाता है। बिना उत्तर वाले प्रश्न पर शून्य अंक।` },
      { q: `क्या ये ${s.examName} के पिछले वर्ष के प्रश्नपत्र हैं?`, a: 'नहीं। ये आधिकारिक पैटर्न में अभ्यास मॉक हैं, जो Pariksha Saathi के प्रश्न बैंक से भरे गए हैं। हम परीक्षा संस्था के प्रश्नपत्र प्रकाशित नहीं करते।' },
      { q: 'क्या मॉक हिंदी में दिए जा सकते हैं?', a: s.englishInHindi ? 'हाँ। हिंदी पेज से खोलने पर मॉक में हिंदी प्रश्न आते हैं; अंग्रेज़ी भाषा का खंड परीक्षा की तरह अंग्रेज़ी में रहता है, और जिन कुछ विषयों के हिंदी प्रश्न अभी नहीं हैं, वे भी अंग्रेज़ी में हैं।' : 'हाँ। हिंदी पेज से खोलने पर मॉक का हर प्रश्न हिंदी में होता है।' },
      { q: 'क्या मॉक में प्रश्न दोहराए जाते हैं?', a: 'किसी चरण की शृंखला में कोई प्रश्न दोहराया नहीं जाता, और हर मॉक हर बार प्रश्नों का वही सेट रहता है, इसलिए दोबारा देने पर आपकी असली प्रगति दिखती है।' },
    ],
    moreTitle: (s) => `${s.examName} के लिए और`,
    more: { hub: 'परीक्षा पैटर्न, पाठ्यक्रम, कट-ऑफ और ताज़ा सूचनाएँ', practice: 'विषयवार अभ्यास प्रश्न', affairs: 'रोज़ का करंट अफेयर्स' },
    langSwitch: { href: (id) => mockTestsPath(id, 'en'), label: 'Read in English' },
    nav: { practice: 'अभ्यास प्रश्न', affairs: 'करंट अफेयर्स', start: 'पढ़ाई शुरू करें' },
  },
};

export function mockTestsMeta(examId, series, lang = 'en') {
  const t = T[lang];
  const s = summary(examId, series);
  return { title: t.title(s), h1: t.h1(s), description: metaDescription(t.description(s, series)) };
}

export function mockTestsFaq(examId, series, lang = 'en') {
  return T[lang].faq(summary(examId, series));
}

export function mockTestsBody(examId, series, lang = 'en') {
  const t = T[lang];
  const s = summary(examId, series);
  const hub = examHubPath(examId, lang);
  const stages = s.stages.map((stage) => `
    <section id="${esc(stage.stageKey)}">
      <h2>${esc(t.stageTitle(stage))}</h2>
      <div class="hub-table-wrap"><table class="hub-table">
        <thead><tr><th>${t.thSection}</th><th>${t.thQuestions}</th></tr></thead>
        <tbody>${stage.sections.map((sec) => `<tr><td>${esc(pick(sec.name, lang))}</td><td>${sec.questionCount}${sec.shortfall > 0 ? esc(t.shortNote(sec.questionCount - sec.shortfall)) : ''}</td></tr>`).join('')}
        <tr><td><strong>${t.total}</strong></td><td><strong>${questionsIn(stage)}</strong></td></tr></tbody>
      </table></div>
      <p class="hub-facts">${esc(t.meta(stage))} ${esc(t.negative(stage.negativeMarksPerWrong))}</p>
      <p class="hub-source">${t.source} (${esc(series.cycleLabel)}) <a href="${esc(series.sourceUrl)}" target="_blank" rel="noreferrer">&#8599;</a>${homeVisitHint(series.sourceUrl, lang)} · ${t.checked} ${esc(formatHubDate(series.verifiedAt, lang))}</p>
      <ol class="mock-grid">${Array.from({ length: stage.mockCount }, (_, i) => `<li><a href="${mockPlayerPath(examId, stage.stageKey, i + 1, lang)}" rel="nofollow">${esc(t.mock(i + 1))}</a></li>`).join('')}</ol>
    </section>`).join('');
  const notOffered = NOT_OFFERED[examId]?.[lang];
  return `<div class="compare-page">
  <header class="pub-header">
    <div class="wrap pub-nav">
      <a class="pub-brand" href="${lang === 'hi' ? '/hi/' : '/'}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
      <nav class="pub-nav-links"><a href="${lang === 'hi' ? '/hi/q/' : '/q/'}">${t.nav.practice}</a><a href="/app/current-affairs/">${t.nav.affairs}</a></nav>
      ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${t.nav.start}</a>
    </div>
  </header>
  <article class="wrap compare-article mock-tests">
    <div class="compare-top-row"><a href="${hub}" class="detail-back">&larr; ${esc(t.back(s))}</a><a class="compare-lang-switch" href="${t.langSwitch.href(examId)}">${t.langSwitch.label}</a></div>
    <h1>${esc(t.h1(s))}</h1>
    <p class="compare-lede">${esc(t.lede(s, series))}</p>
    <p class="hub-facts">${esc(t.startHint)}</p>
    ${stages}
    ${notOffered ? `<p class="hub-facts">${esc(notOffered)}</p>` : ''}
    <h2>${t.howTitle}</h2>
    <p>${esc(t.how)} ${t.error} <a href="/contact/">${t.tell}</a>.</p>
    <h2>${t.faqTitle}</h2>
    <div class="hub-faq">${t.faq(s).map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}</div>
    ${telegramCtaHtml(lang)}
    <h2>${esc(t.moreTitle(s))}</h2>
    <ul class="compare-links">
      <li><a href="${hub}">${t.more.hub}</a></li>
      <li><a href="${lang === 'hi' ? '/hi/q/' : '/q/'}">${t.more.practice}</a></li>
      <li><a href="/app/current-affairs/">${t.more.affairs}</a></li>
    </ul>
  </article>
  <footer class="pub-footer">
    <div class="wrap pub-footer-links">
      <a href="/about/">About &amp; editorial standards</a><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a><a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
    ${socialLinksHtml()}</div>
  </footer>
</div>`;
}

export function mockTestsStructuredData(examId, series, lang, siteUrl) {
  const meta = mockTestsMeta(examId, series, lang);
  const s = summary(examId, series);
  const path = mockTestsPath(examId, lang);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.h1,
      description: meta.description,
      url: `${siteUrl}${path}`,
      inLanguage: lang,
      about: { '@type': 'Thing', name: s.examName },
      publisher: { '@type': 'Organization', name: 'Pariksha Saathi', url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'hi' ? 'होम' : 'Home', item: `${siteUrl}${lang === 'hi' ? '/hi/' : '/'}` },
        { '@type': 'ListItem', position: 2, name: s.examName, item: `${siteUrl}${examHubPath(examId, lang)}` },
        { '@type': 'ListItem', position: 3, name: meta.h1, item: `${siteUrl}${path}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: mockTestsFaq(examId, series, lang).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
}
