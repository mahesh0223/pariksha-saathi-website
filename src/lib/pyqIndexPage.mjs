// One exam's solved previous-year papers, listed by paper and shift (/exams/<exam>/question-papers/ and the /hi/ twin):
// the page a search for "SSC CGL previous year question papers" should land on. Each row links the shift's solved-paper
// page (src/lib/pyqPage.mjs); each paper links the exam body's answer-key notice. Plain HTML, no app script. The
// papers themselves are English - except a language part's Hindi option (SSC GD's Part-D Hindi), which is in Hindi - and
// the Hindi page says so. Data: src/data/pyqPapers.json.
import { examsLinkHtml } from './examDirectory.mjs';
import { examHubPath } from './examHubPath.mjs';
import { EXAM_NAMES } from './examNames.mjs';
import { GK_INSIGHTS_EXAMS, GK_INSIGHTS_LINK } from './gkInsights.mjs';
import { socialLinksHtml } from '../data/socialLinks.mjs';
import { telegramCtaHtml } from './telegramCta.mjs';
import { metaDescription } from './seoMeta.mjs';
import { pyqIndexPath, pyqPaperPath } from './pyqPath.mjs';
import { optionalQuestions, satQuestions } from './pyqSections.mjs';

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
};
const day = (iso, lang) => `${Number(iso.slice(8, 10))} ${MONTHS[lang][Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const num = (n) => n.toLocaleString('en-IN');
// A shift's count as a candidate sits it (one Part-D), and the questions of its Hindi option on top.
const satCount = (p) => satQuestions(p).length;
const hindiCount = (p) => optionalQuestions(p).filter((q) => q.languageCode === 'hi').length;

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

// The body that sets the paper and its answer key, for the wording "as SSC printed it".
const bodyOf = (examId) => (examId.startsWith('ssc_') ? 'SSC' : null);
// The cycle year in the paper's own name ("CGL 2019 Tier-I" -> 2019) - what people search for, even when that cycle's
// exam was held the next year.
const cycleYear = (paper) => Number(paper.paper.match(/\b(20\d{2})\b/)?.[1] ?? paper.date.slice(0, 4));

/** The exam's papers grouped by paper (newest cycle first), each group's shifts newest date first. */
export function pyqIndexGroups(papers) {
  const groups = [];
  for (const p of papers) {
    let g = groups.find((x) => x.paper === p.paper);
    if (!g) groups.push((g = { paper: p.paper, displayName: p.displayName, year: cycleYear(p), sourceUrl: p.sourceUrl, shifts: [] }));
    g.shifts.push(p);
  }
  for (const g of groups) g.shifts.sort((a, b) => b.date.localeCompare(a.date) || a.shift.localeCompare(b.shift, 'en', { numeric: true }));
  return groups.sort((a, b) => b.year - a.year || b.displayName.localeCompare(a.displayName));
}

function summary(examId, papers) {
  const groups = pyqIndexGroups(papers);
  const years = groups.map((g) => g.year);
  const min = Math.min(...years);
  const max = Math.max(...years);
  return {
    examName: EXAM_NAMES[examId] ?? examId,
    groups,
    shifts: papers.length,
    // Every paper of the exam has a printable PDF (scripts/paper-pdf/make_paper_pdfs.py): only then does the title say "PDF".
    pdf: papers.length > 0 && papers.every((p) => p.pdf),
    questions: papers.reduce((n, p) => n + p.questions.length, 0),
    hindi: papers.reduce((n, p) => n + hindiCount(p), 0),
    range: min === max ? String(min) : `${min}–${max}`,
  };
}

const anchor = (paper) => paper.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const T = {
  en: {
    title: (s) => `${s.examName} Previous Year Question Papers${s.pdf ? ' PDF' : ''} with Answers (${s.range}, ${s.shifts} Shifts)`,
    h1: (s) => `${s.examName} previous year question papers with answers`,
    description: (s) => `${s.shifts} solved ${s.examName} shifts from ${s.range}, ${num(s.questions)} questions in all, each with the official answer and a worked explanation, listed by paper and date. Free to read online.`,
    lede: (s, body) => `${s.shifts} shifts from ${s.groups.length} official ${s.examName} paper${s.groups.length === 1 ? '' : 's'}, ${num(s.questions)} questions in all${s.hindi ? `, ${num(s.hindi)} of them from the Hindi option of the paper's language part, in Hindi` : ''}. Every question is given as ${body ?? 'the exam body'} printed it, with the answer from ${body ? `${body}'s` : 'the'} official answer key and a worked explanation. Free to read online; no sign-up.`,
    back: (s) => `${s.examName} exam page`,
    groupLine: (g) => `${g.shifts.length} shift${g.shifts.length === 1 ? '' : 's'} · ${num(g.shifts.reduce((n, p) => n + p.questions.length, 0))} questions`,
    notice: 'official answer-key notice',
    thPaper: 'Date and shift',
    thQuestions: 'Questions with answers',
    thPdf: 'PDF',
    pdf: 'Download',
    count: (p) => `${p.questionsInPaper && p.questionsInPaper > satCount(p) ? `${satCount(p)} of ${p.questionsInPaper}` : satCount(p)}${hindiCount(p) ? ` + ${hindiCount(p)} in Hindi` : ''}`,
    howTitle: 'How these papers are made',
    how: (body) => `Questions, options and answers come from ${body ? `${body}'s` : 'the exam body\'s'} own answer-key documents, linked for each paper above. A question is left out when it needs a figure, is printed as an image, or was cancelled in the final key, so some shifts show fewer questions than the paper had. The explanations are drafted with AI assistance by Pariksha Saathi and checked against the official answers.`,
    error: 'Spotted an error?',
    tell: 'Tell us',
    faqTitle: 'Frequently asked questions',
    faq: (s, body) => [
      { q: `Which ${s.examName} papers are covered?`, a: s.groups.map((g) => `${g.displayName}: ${g.shifts.length} shift${g.shifts.length === 1 ? '' : 's'}`).join('; ') + '.' },
      { q: `Are these the official ${s.examName} question papers?`, a: `The questions and answers are transcribed from ${body ? `${body}'s` : 'the exam body\'s'} own answer-key documents, linked for each paper on this page. Pariksha Saathi is an independent project, not affiliated with ${body ?? 'the exam body'}; only the explanations are ours.` },
      { q: 'Why do some shifts have fewer questions than the paper?', a: 'Questions that need a figure, are printed as an image, or were cancelled in the final answer key are left out, because they cannot be reproduced faithfully as text. Each shift shows how many of the paper\'s questions it carries.' },
      { q: 'Can I download these papers as a PDF?', a: 'Each paper is a free web page rather than a PDF. To keep a copy, open the paper and use your browser\'s Print option with "Save as PDF".' },
    ],
    moreTitle: (s) => `More for ${s.examName}`,
    more: { hub: 'Exam pattern, syllabus, cut-offs and latest notices', practice: 'Practice questions by topic', affairs: 'Daily current affairs' },
    langSwitch: { href: (id) => pyqIndexPath(id, 'hi'), label: 'हिंदी में पढ़ें' },
    exams: 'Exams',
  },
  hi: {
    title: (s) => `${s.examName} पिछले वर्ष के प्रश्न पत्र${s.pdf ? ' PDF' : ''}, उत्तर सहित (${s.range}, ${s.shifts} शिफ़्ट)`,
    h1: (s) => `${s.examName} पिछले वर्ष के प्रश्न पत्र, उत्तर सहित`,
    description: (s) => `${s.range} के ${s.examName} की ${s.shifts} हल की हुई शिफ़्टें, कुल ${num(s.questions)} प्रश्न, हर प्रश्न आधिकारिक उत्तर और समझाए गए हल के साथ, पेपर और तारीख़ के क्रम में। ऑनलाइन मुफ़्त पढ़ें।`,
    lede: (s, body) => `${s.examName} के ${s.groups.length} आधिकारिक पेपर की ${s.shifts} ${s.shifts === 1 ? 'पाली' : 'पालियाँ'}, कुल ${num(s.questions)} प्रश्न। हर प्रश्न वैसे ही दिया गया है जैसे ${body ?? 'परीक्षा निकाय'} ने छापा, ${body ?? 'परीक्षा निकाय'} की आधिकारिक उत्तर कुंजी के उत्तर और समझाए गए हल के साथ। ${s.hindi ? `प्रश्न अंग्रेज़ी में हैं; भाषा वाले भाग के हिंदी विकल्प (SSC GD का भाग-घ) के ${num(s.hindi)} प्रश्न हिंदी में हैं।` : 'प्रश्न अंग्रेज़ी में हैं।'} ऑनलाइन मुफ़्त पढ़ें; साइन-अप की ज़रूरत नहीं।`,
    back: (s) => `${s.examName} परीक्षा पेज`,
    groupLine: (g) => `${g.shifts.length} ${g.shifts.length === 1 ? 'पाली' : 'पालियाँ'} · ${num(g.shifts.reduce((n, p) => n + p.questions.length, 0))} प्रश्न`,
    notice: 'आधिकारिक उत्तर-कुंजी सूचना',
    thPaper: 'तारीख़ और पाली',
    thQuestions: 'उत्तर सहित प्रश्न',
    thPdf: 'PDF',
    pdf: 'डाउनलोड',
    count: (p) => `${p.questionsInPaper && p.questionsInPaper > satCount(p) ? `${p.questionsInPaper} में से ${satCount(p)}` : satCount(p)}${hindiCount(p) ? ` + ${hindiCount(p)} हिंदी में` : ''}`,
    howTitle: 'ये प्रश्न पत्र कैसे तैयार किए गए',
    how: (body) => `प्रश्न, विकल्प और उत्तर ${body ?? 'परीक्षा निकाय'} के अपने उत्तर-कुंजी दस्तावेज़ों से लिए गए हैं, जिनका लिंक ऊपर हर पेपर के साथ है। जिस प्रश्न में चित्र चाहिए, जो छवि के रूप में छपा है या जो अंतिम कुंजी में रद्द हुआ, वह शामिल नहीं है, इसलिए कुछ पालियों में पेपर से कम प्रश्न दिखते हैं। हल Pariksha Saathi ने AI की सहायता से तैयार किए हैं और आधिकारिक उत्तरों से मिलाकर जाँचे हैं।`,
    error: 'कोई ग़लती दिखी?',
    tell: 'हमें बताएँ',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    faq: (s, body) => [
      { q: `${s.examName} के कौन-से पेपर शामिल हैं?`, a: s.groups.map((g) => `${g.displayName}: ${g.shifts.length} ${g.shifts.length === 1 ? 'पाली' : 'पालियाँ'}`).join('; ') + '।' },
      { q: `क्या ये ${s.examName} के आधिकारिक प्रश्न पत्र हैं?`, a: `प्रश्न और उत्तर ${body ?? 'परीक्षा निकाय'} के अपने उत्तर-कुंजी दस्तावेज़ों से लिए गए हैं, जिनका लिंक इस पेज पर हर पेपर के साथ है। Pariksha Saathi एक स्वतंत्र परियोजना है और ${body ?? 'परीक्षा निकाय'} से संबद्ध नहीं है; केवल हल हमारे हैं।` },
      { q: 'कुछ पालियों (शिफ़्ट) में पेपर से कम प्रश्न क्यों हैं?', a: 'जिन प्रश्नों में चित्र चाहिए, जो छवि के रूप में छपे हैं या जो अंतिम उत्तर कुंजी में रद्द हुए, वे शामिल नहीं हैं, क्योंकि उन्हें टेक्स्ट में ठीक-ठीक नहीं दिया जा सकता। हर पाली के आगे लिखा है कि पेपर के कितने प्रश्न उसमें हैं।' },
      { q: 'क्या ये प्रश्न पत्र PDF में डाउनलोड हो सकते हैं?', a: 'हर पेपर PDF नहीं, बल्कि एक मुफ़्त वेब पेज है। कॉपी रखने के लिए पेपर खोलें और ब्राउज़र के Print विकल्प में "Save as PDF" चुनें।' },
      { q: 'प्रश्न किस भाषा में हैं?', a: s.hindi ? `प्रश्न, विकल्प और हल अंग्रेज़ी में हैं; पेपर के भाषा वाले भाग के हिंदी विकल्प (जैसे SSC GD के भाग-घ का हिंदी विकल्प) के ${num(s.hindi)} प्रश्न और उनके हल हिंदी में हैं।` : 'प्रश्न, विकल्प और हल अंग्रेज़ी में हैं।' },
    ],
    moreTitle: (s) => `${s.examName} के लिए और`,
    more: { hub: 'परीक्षा पैटर्न, पाठ्यक्रम, कट-ऑफ और ताज़ा सूचनाएँ', practice: 'विषयवार अभ्यास प्रश्न', affairs: 'रोज़ का करंट अफेयर्स' },
    langSwitch: { href: (id) => pyqIndexPath(id, 'en'), label: 'Read in English' },
    exams: 'परीक्षाएँ',
  },
};

export function pyqIndexMeta(examId, papers, lang = 'en') {
  const t = T[lang];
  const s = summary(examId, papers);
  return { title: t.title(s), h1: t.h1(s), description: metaDescription(t.description(s)) };
}

export function pyqIndexFaq(examId, papers, lang = 'en') {
  return T[lang].faq(summary(examId, papers), bodyOf(examId));
}

export function pyqIndexBody(examId, papers, lang = 'en') {
  const t = T[lang];
  const s = summary(examId, papers);
  const body = bodyOf(examId);
  const hub = examHubPath(examId, lang);
  const gk = GK_INSIGHTS_EXAMS.includes(examId) ? GK_INSIGHTS_LINK[lang] : null;
  const tables = s.groups.map((g) => `
    <section id="${anchor(g.paper)}">
      <h2>${esc(g.displayName)}</h2>
      <p class="hub-source">${esc(t.groupLine(g))} · <a href="${esc(g.sourceUrl)}" target="_blank" rel="noreferrer">${t.notice} &#8599;</a></p>
      <div class="hub-table-wrap"><table class="hub-table pyq-index">
        <thead><tr><th>${t.thPaper}</th><th>${t.thQuestions}</th>${g.shifts.some((p) => p.pdf) ? `<th>${t.thPdf}</th>` : ''}</tr></thead>
        <tbody>${g.shifts.map((p) => `<tr><td><a href="${pyqPaperPath(p)}">${esc(day(p.date, lang))}, ${esc(lang === 'hi' ? p.shift.replace('Shift', 'पाली') : p.shift)}</a></td><td>${esc(t.count(p))}</td>${g.shifts.some((x) => x.pdf) ? `<td>${p.pdf ? `<a href="${esc(p.pdf.path)}" download>${t.pdf}</a> <span class="pyq-pdf-size">${p.pdf.sizeKb} KB</span>` : ''}</td>` : ''}</tr>`).join('')}</tbody>
      </table></div>
    </section>`).join('');
  return `<div class="compare-page">
  <header class="pub-header">
    <div class="wrap pub-nav">
      <a class="pub-brand" href="${lang === 'hi' ? '/hi/' : '/'}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
      <nav class="pub-nav-links"><a href="${lang === 'hi' ? '/hi/q/' : '/q/'}">${lang === 'hi' ? 'अभ्यास प्रश्न' : 'Practice questions'}</a><a href="/app/current-affairs/">${lang === 'hi' ? 'करंट अफेयर्स' : 'Current affairs'}</a></nav>
      ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}</a>
    </div>
  </header>
  <article class="wrap compare-article pyq-paper">
    <div class="compare-top-row"><a href="${hub}" class="detail-back">&larr; ${esc(t.back(s))}</a><a class="compare-lang-switch" href="${t.langSwitch.href(examId)}">${t.langSwitch.label}</a></div>
    <h1>${esc(t.h1(s))}</h1>
    <p class="compare-lede">${esc(t.lede(s, body))}</p>
    <nav class="pyq-jump">${s.groups.map((g) => `<a href="#${anchor(g.paper)}">${esc(g.displayName)}</a>`).join('')}</nav>
    ${tables}
    <h2>${t.howTitle}</h2>
    <p>${esc(t.how(body))} ${t.error} <a href="/contact/">${t.tell}</a>.</p>
    <h2>${t.faqTitle}</h2>
    <div class="hub-faq">${t.faq(s, body).map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}</div>
    ${telegramCtaHtml(lang)}
    <h2>${esc(t.moreTitle(s))}</h2>
    <ul class="compare-links">
      <li><a href="${hub}">${t.more.hub}</a></li>
      ${gk ? `<li><a href="${gk.href}">${esc(gk.label)}</a></li>` : ''}
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

export function pyqIndexStructuredData(examId, papers, lang, siteUrl) {
  const meta = pyqIndexMeta(examId, papers, lang);
  const s = summary(examId, papers);
  const path = pyqIndexPath(examId, lang);
  const ordered = s.groups.flatMap((g) => g.shifts);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: meta.h1,
      description: meta.description,
      url: `${siteUrl}${path}`,
      inLanguage: lang,
      about: { '@type': 'Thing', name: s.examName },
      publisher: { '@type': 'Organization', name: 'Pariksha Saathi', url: siteUrl },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: ordered.length,
        itemListElement: ordered.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: `${p.displayName}, ${day(p.date, 'en')}, ${p.shift}`, url: `${siteUrl}${pyqPaperPath(p)}` })),
      },
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
      mainEntity: pyqIndexFaq(examId, papers, lang).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
}
