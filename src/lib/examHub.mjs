// Builds the exam hub page (/exams/<slug>/ and /hi/exams/<slug>/) as an HTML string from the server's
// sourced exam facts, official cut-offs and the exam's own notices. Plain .mjs so scripts/prerender.mjs
// and the React page (ExamHubPage.tsx, which injects the body) share ONE builder instead of
// hand-mirroring markup - the same arrangement as currentAffairsReading.mjs.
//
// Rule for this page: a number appears only with the official document it was read from and the date
// it was last checked against that document. Every block below ends in a "Source / Last verified"
// line built from the data's own sourceUrl/verifiedAt - the build check (scripts/check-public-pages.mjs)
// fails if a hub page is missing them.

// Path/date helpers live in examHubPath.mjs (the entry bundle needs only those); re-exported here so
// existing importers of this module keep working.
import { formatHubDate, examHubSlug, examHubPath } from './examHubPath.mjs';
import { CONTACT_EMAIL } from './reportQuestion.mjs';
export { examHubSlug, examHubPath, formatHubDate };

const TYPE_LABEL = {
  en: { NOTIFICATION: 'notification', ADMIT_CARD: 'admit card', ANSWER_KEY: 'answer key', RESULT: 'result', DEADLINE: 'deadline' },
  hi: { NOTIFICATION: 'अधिसूचना', ADMIT_CARD: 'प्रवेश पत्र', ANSWER_KEY: 'उत्तर कुंजी', RESULT: 'परिणाम', DEADLINE: 'अंतिम तिथि' },
};

const CATEGORY_ORDER = ['UR', 'OBC', 'EWS', 'SC', 'ST', 'ESM', 'OH', 'HH', 'VH', 'Other PwD'];

// Cut-off tables are language-neutral data (a number per category per cycle), but the name of the
// stage/list each was published for is an English string in the data - translated here by exact match.
const SECTION_HI = {
  'Tier-I, all posts except JSO and SI Grade-II': 'टियर-I, JSO और SI ग्रेड-II को छोड़कर सभी पद',
  'Tier-I, LDC/JSA': 'टियर-I, LDC/JSA',
  'Tier-I, DEO/DEO Grade A in the named Ministries (science stream)': 'टियर-I, अधिसूचना में बताए मंत्रालयों में DEO/DEO ग्रेड A (विज्ञान वर्ग)',
  'Tier-I, DEO/DEO Grade A in other departments': 'टियर-I, अन्य विभागों में DEO/DEO ग्रेड A',
  'Tier-I, DEO/DEO Grade A (single list, 2024)': 'टियर-I, DEO/DEO ग्रेड A (2024 की एकल सूची)',
  'Final selection, Civil Police Constable (men and women)': 'अंतिम चयन, सिविल पुलिस आरक्षी (पुरुष और महिला)',
  'Final selection, PAC / Armed Police Constable (men)': 'अंतिम चयन, पी.ए.सी. / सशस्त्र पुलिस आरक्षी (पुरुष)',
  'Final selection, Special Security Force Constable (men)': 'अंतिम चयन, विशेष सुरक्षा बल आरक्षी (पुरुष)',
  'Final selection, Women Battalion Constable (women)': 'अंतिम चयन, महिला बटालियन आरक्षी (महिला)',
  'Final selection, Mounted Police Constable (men)': 'अंतिम चयन, घुड़सवार पुलिस आरक्षी (पुरुष)',
  'Prelims Paper I, main part': 'प्रारंभिक परीक्षा पेपर I, मुख्य सूची',
  'Prelims Paper I, provisional part': 'प्रारंभिक परीक्षा पेपर I, अनंतिम सूची',
  'Prelims, male posts': 'प्रारंभिक परीक्षा, पुरुष पद',
  'Prelims, female posts': 'प्रारंभिक परीक्षा, महिला पद',
};

const T = {
  en: {
    home: 'Home',
    switchLabel: 'हिंदी में पढ़ें',
    h1: (name, hasCutoffs = true) => `${name}: exam pattern, marks, negative marking, age limit${hasCutoffs ? ' and cut-off' : ''}`,
    lede: (cycle, verified, hasCutoffs = true) =>
      `Every figure on this page is copied from an official document linked next to it, with the date we last checked it. Pattern, age limit and dates are from the ${cycle} notification${hasCutoffs ? '; cut-offs are from the official result write-ups of earlier years' : ''}. Last verified: ${verified}.`,
    noNegative: 'No negative marking',
    negativeNotStated: 'Not stated in the notice',
    glance: 'At a glance',
    stages: 'Selection stages',
    totalQuestions: 'Questions',
    totalMarks: 'Marks',
    time: 'Time',
    negative: 'Negative marking',
    vacancies: 'Tentative vacancies',
    vacanciesAsOf: (d) => `as on ${d}`,
    firstStage: 'First stage',
    firstStageDates: 'First stage dates',
    pattern: 'Exam pattern',
    section: 'Section',
    questions: 'Questions',
    perQuestion: 'Marks each',
    marks: 'Marks',
    minutes: 'Time (min)',
    total: 'Total',
    duration: (m) => `Time allowed: ${m} minutes.`,
    qualifyingOnly: 'This part is qualifying only: it does not add to the merit score.',
    appliesTo: 'Applies to',
    eligibility: 'Age limit and qualification',
    ageAsOn: (d) => `Age is counted as on ${d}.`,
    posts: 'Posts',
    requirement: 'Requirement',
    dates: 'Important dates',
    event: 'Event',
    date: 'Date',
    dateSource: 'Source',
    dateTo: 'to',
    officialNotice: 'official notice',
    pyq: 'Previous-year questions',
    pyqIntro: (n, papers) => `${n} question${n === 1 ? '' : 's'} transcribed from ${papers} official paper${papers === 1 ? '' : 's'} and checked against the official answer keys; cancelled questions left out. Practise them in the app with "Previous-year questions only".`,
    pyqCount: (n) => `${n} question${n === 1 ? '' : 's'}`,
    cutoffs: 'Cut-off marks by year and category',
    cutoffNote: (max) => `Marks are out of ${max}. Cut-offs change every cycle and are no promise for the next one; use them to see how competitive each category has been.`,
    category: 'Category',
    legend: {
      UR: 'unreserved',
      reserved: 'reserved categories',
      ESM: 'ex-servicemen',
      disability: 'orthopaedic, hearing and visual disability',
      'Other PwD': 'other persons with disabilities',
      PwBD: 'persons with benchmark disabilities',
      bracket: 'Labels in brackets, such as (SA), (TSP) or (Female), are the exam body\'s own sub-lists exactly as printed in its cut-off document.',
    },
    notices: 'Latest notices',
    allNotices: 'All exam notices',
    currentAffairs: 'Recent current affairs for this exam',
    allCurrentAffairs: 'All current affairs',
    prepare: 'Prepare',
    calendar: 'Exam calendar: official dates across every exam',
    typing: 'Typing and data entry practice with the official time limits',
    syllabus: 'Syllabus and subjects tested',
    jobProfile: 'Job profile and salary',
    lessons: 'Free lessons',
    practice: 'Start practising',
    sourceWord: 'Source',
    verifiedWord: 'Last verified',
    howMade: 'How this page is made',
    howMadeBody: 'These facts are transcribed from the official documents linked above and checked against them on the date shown. If anything here differs from the official notification, the official notification is right. Please tell us through the Contact page. See also our editorial standards.',
    contact: 'Contact',
    standards: 'Editorial standards',
    noteSep: ' · ',
  },
  hi: {
    home: 'होम',
    switchLabel: 'Read in English',
    h1: (name, hasCutoffs = true) => `${name}: परीक्षा पैटर्न, अंक, नेगेटिव मार्किंग, आयु सीमा${hasCutoffs ? ' और कट-ऑफ' : ''}`,
    lede: (cycle, verified, hasCutoffs = true) =>
      `इस पृष्ठ का हर आँकड़ा उस आधिकारिक दस्तावेज़ से लिया गया है जिसका लिंक उसके साथ दिया है, और उसके साथ वह तारीख भी जब हमने उसे अंतिम बार जाँचा। पैटर्न, आयु सीमा और तिथियाँ ${cycle} की अधिसूचना से हैं${hasCutoffs ? '; कट-ऑफ पिछले वर्षों के आधिकारिक परिणाम-विवरणों से हैं' : ''}। अंतिम सत्यापन: ${verified}।`,
    noNegative: 'कोई नेगेटिव मार्किंग नहीं',
    negativeNotStated: 'अधिसूचना में नहीं बताया गया',
    glance: 'एक नज़र में',
    stages: 'चयन के चरण',
    totalQuestions: 'प्रश्न',
    totalMarks: 'अंक',
    time: 'समय',
    negative: 'नेगेटिव मार्किंग',
    vacancies: 'अनंतिम रिक्तियाँ',
    vacanciesAsOf: (d) => `${d} की स्थिति में`,
    firstStage: 'पहला चरण',
    firstStageDates: 'पहले चरण की तिथियाँ',
    pattern: 'परीक्षा पैटर्न',
    section: 'खंड',
    questions: 'प्रश्न',
    perQuestion: 'प्रति प्रश्न अंक',
    marks: 'अंक',
    minutes: 'समय (मिनट)',
    total: 'कुल',
    duration: (m) => `निर्धारित समय: ${m} मिनट।`,
    qualifyingOnly: 'यह भाग केवल अर्हक है: इसके अंक मेरिट में नहीं जुड़ते।',
    appliesTo: 'किनके लिए',
    eligibility: 'आयु सीमा और योग्यता',
    ageAsOn: (d) => `आयु की गणना ${d} को की जाती है।`,
    posts: 'पद',
    requirement: 'आवश्यकता',
    dates: 'महत्वपूर्ण तिथियाँ',
    event: 'घटना',
    date: 'तिथि',
    dateSource: 'स्रोत',
    dateTo: 'से',
    officialNotice: 'आधिकारिक सूचना',
    pyq: 'पिछले वर्षों के प्रश्न',
    pyqIntro: (n, papers) => `${papers} आधिकारिक पेपर से ${n} प्रश्न, आधिकारिक उत्तर कुंजी से जाँचे हुए; रद्द प्रश्न शामिल नहीं। ऐप में "सिर्फ़ पिछले वर्षों के प्रश्न" टॉगल से अभ्यास करें।`,
    pyqCount: (n) => `${n} प्रश्न`,
    cutoffs: 'वर्ष और श्रेणी के अनुसार कट-ऑफ अंक',
    cutoffNote: (max) => `अंक ${max} में से हैं। कट-ऑफ हर चक्र में बदलता है और अगले चक्र की गारंटी नहीं है; इससे बस यह समझें कि हर श्रेणी में प्रतिस्पर्धा कितनी रही है।`,
    category: 'श्रेणी',
    legend: {
      UR: 'अनारक्षित',
      reserved: 'आरक्षित श्रेणियाँ',
      ESM: 'पूर्व सैनिक',
      disability: 'अस्थि, श्रवण और दृष्टि दिव्यांगता',
      'Other PwD': 'अन्य दिव्यांगजन',
      PwBD: 'बेंचमार्क दिव्यांगता वाले व्यक्ति',
      bracket: 'कोष्ठक वाले लेबल, जैसे (SA), (TSP) या (Female), परीक्षा निकाय की अपनी उप-सूचियाँ हैं, ठीक वैसे ही जैसे उसके कट-ऑफ दस्तावेज़ में छपी हैं।',
    },
    notices: 'ताज़ा सूचनाएँ',
    allNotices: 'सभी परीक्षा सूचनाएँ',
    currentAffairs: 'इस परीक्षा के लिए हाल के करेंट अफेयर्स',
    allCurrentAffairs: 'सभी करेंट अफेयर्स',
    prepare: 'तैयारी करें',
    calendar: 'परीक्षा कैलेंडर: सभी परीक्षाओं की आधिकारिक तिथियाँ',
    typing: 'आधिकारिक समय-सीमा के साथ टाइपिंग और डेटा एंट्री अभ्यास',
    syllabus: 'पाठ्यक्रम और परीक्षित विषय',
    jobProfile: 'जॉब प्रोफ़ाइल और वेतन',
    lessons: 'मुफ़्त पाठ',
    practice: 'अभ्यास शुरू करें',
    sourceWord: 'स्रोत',
    verifiedWord: 'अंतिम सत्यापन',
    howMade: 'यह पृष्ठ कैसे बना है',
    howMadeBody: 'ये तथ्य ऊपर लिंक किए आधिकारिक दस्तावेज़ों से उतारे गए हैं और दी गई तारीख को उनसे मिलाए गए हैं। यदि यहाँ कुछ भी आधिकारिक अधिसूचना से अलग दिखे, तो आधिकारिक अधिसूचना ही सही है। कृपया संपर्क पृष्ठ से हमें बताएँ। हमारे संपादकीय मानक भी देखें।',
    contact: 'संपर्क',
    standards: 'संपादकीय मानक',
    noteSep: ' · ',
  },
};

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const marksText = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
// Some bodies print marks per test, not per question (IBPS PO Prelims: 35 questions for 30 marks). The per-question
// figure is then not a clean number, and a rounded 0.86 on the page would read as something the notice says.
const perQuestionText = (n) => (n == null ? '&mdash;' : Math.abs(n * 100 - Math.round(n * 100)) < 1e-6 ? marksText(Math.round(n * 100) / 100) : '&mdash;');
const countText = (n) => n.toLocaleString('en-IN');
const pick = (bilingual, lang) => bilingual?.[lang] ?? bilingual?.en ?? '';

// The Railway portal answers a link opened cold with a "Request Rejected" page until its home page has been
// visited once in that browser. The source stays a direct link (it is the document), with a hint for that case.
const NEEDS_HOME_VISIT = { 'rrb.indianrailways.gov.in': 'https://rrb.indianrailways.gov.in/' };

function homeVisitHint(url, lang) {
  let host = '';
  try {
    host = new URL(url).host;
  } catch {
    return '';
  }
  const home = NEEDS_HOME_VISIT[host];
  if (!home) return '';
  return lang === 'hi'
    ? ` (यदि “Request Rejected” दिखे तो पहले <a href="${home}" target="_blank" rel="noreferrer">${host}</a> खोलें, फिर लिंक दोबारा खोलें।)`
    : ` (If it shows “Request Rejected”, open <a href="${home}" target="_blank" rel="noreferrer">${host}</a> first, then the link again.)`;
}

// Every source line ends in "Report an error": a mailto with the exam, the block, the page and the document
// already filled in, so a reader who spots a figure that differs from the official notice can say so in one tap
// (same arrangement as "Report this question", src/lib/reportQuestion.mjs).
const REPORT_LABEL = { en: 'Report an error', hi: 'गलती बताएँ' };
export function hubReportMailto({ examName, block, page, sourceUrl, verifiedIso }) {
  const subject = `Exam page error: ${examName} - ${block}`;
  const lines = [`Page: ${page}`, `Block: ${block}`, `Source document: ${sourceUrl}`, `Last checked: ${String(verifiedIso ?? '').slice(0, 10)}`, '', 'What is wrong, and what does the official document say instead?', ''];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
const sourceLine = (t, label, url, verifiedIso, lang, report) =>
  `<p class="hub-source">${t.sourceWord}: <a href="${esc(url)}" target="_blank" rel="noreferrer">${esc(label)} &#8599;</a>${t.noteSep}${t.verifiedWord}: ${esc(formatHubDate(verifiedIso, lang))}${homeVisitHint(url, lang)}${
    report ? `${t.noteSep}<a class="hub-report" href="${esc(hubReportMailto({ ...report, sourceUrl: url, verifiedIso }))}">${REPORT_LABEL[lang] ?? REPORT_LABEL.en}</a>` : ''
  }</p>`;

function sectionTotals(part) {
  return {
    questions: part.sections.reduce((n, s) => n + s.questions, 0),
    // A notice can print one total for the whole test and no marks per section (SBI PO Prelims): the part then
    // carries that total and the section rows show a dash.
    marks: part.sections.some((s) => s.marks == null) ? part.marks : part.sections.reduce((n, s) => n + s.marks, 0),
  };
}

function partHtml(part, lang, t) {
  const totals = sectionTotals(part);
  let html = `<h4>${esc(pick(part.name, lang))}</h4>`;
  if (part.appliesTo) html += `<p class="hub-applies"><strong>${t.appliesTo}:</strong> ${esc(pick(part.appliesTo, lang))}</p>`;
  if (part.sections.length > 0) {
    const rows = part.sections
      .map(
        (s) =>
          `<tr><td>${esc(pick(s.name, lang))}</td><td>${s.questions}</td><td>${perQuestionText(s.marksPerQuestion)}</td><td>${s.marks == null ? '&mdash;' : marksText(s.marks)}</td><td>${s.minutes ?? '&mdash;'}</td></tr>`,
      )
      .join('');
    html += `<div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>${t.section}</th><th>${t.questions}</th><th>${t.perQuestion}</th><th>${t.marks}</th><th>${t.minutes}</th></tr></thead><tbody>${rows}<tr class="hub-total"><td>${t.total}</td><td>${totals.questions}</td><td></td><td>${marksText(totals.marks)}</td><td>${part.durationMinutes ?? '&mdash;'}</td></tr></tbody></table></div>`;
  }
  const facts = [];
  if (part.durationMinutes) facts.push(t.duration(part.durationMinutes));
  if (part.sections.length === 0 && part.marks) facts.push(`${t.marks}: ${marksText(part.marks)}.`);
  if (part.durationNote) facts.push(esc(pick(part.durationNote, lang)));
  if (part.negativeMarking) facts.push(`<strong>${t.negative}:</strong> ${esc(pick(part.negativeMarking, lang))}`);
  else if (part.sections.length > 0) facts.push(`<strong>${t.negative}:</strong> ${t.negativeNotStated}.`);
  if (part.qualifying) facts.push(t.qualifyingOnly);
  if (facts.length) html += `<p class="hub-facts">${facts.join(' ')}</p>`;
  if (part.notes?.length) html += `<ul class="hub-notes">${part.notes.map((n) => `<li>${esc(pick(n, lang))}</li>`).join('')}</ul>`;
  return html;
}

// One line explaining only the categories that appear in the tables, so a bank page does not carry
// "ESM" and "VH" definitions for columns it does not show.
function legendText(categories, lang, t) {
  const present = (names) => names.filter((n) => categories.includes(n));
  const parts = [];
  if (categories.includes('UR')) parts.push(`UR: ${t.legend.UR}`);
  const reserved = present(['OBC', 'EWS', 'SC', 'ST']);
  if (reserved.length) parts.push(`${reserved.join(', ')}: ${t.legend.reserved}`);
  if (categories.includes('ESM')) parts.push(`ESM: ${t.legend.ESM}`);
  const disability = present(['OH', 'HH', 'VH']);
  if (disability.length) parts.push(`${disability.join(', ')}: ${t.legend.disability}`);
  for (const key of ['Other PwD', 'PwBD']) if (categories.includes(key)) parts.push(`${key}: ${t.legend[key]}`);
  let text = parts.length ? `${parts.join('. ')}.` : '';
  if (categories.some((c) => c.includes('('))) text += `${text ? ' ' : ''}${t.legend.bracket}`;
  return text;
}

// "Next live mock" (GET /v1/live-mocks/next): the weekly all-India mock lives in the Android app only, so the line
// renders only once the public Play listing exists (PLAY_STORE_URL in src/data/siteLinks.mjs - the plan's rule that
// no app call-to-action ships before a production URL does), and only for a mock that has not started yet at build
// time. Times are IST, the slot's own clock.
const LIVE_MOCK_T = {
  en: { label: 'Weekly live mock', shape: (q, m) => `${q} questions in ${m} minutes, one paper for everyone`, cta: 'Sit it in the Android app' },
  hi: { label: 'साप्ताहिक लाइव मॉक', shape: (q, m) => `${m} मिनट में ${q} प्रश्न, सबके लिए एक ही पेपर`, cta: 'Android ऐप में दें' },
};
export function liveMockLineHtml(liveMock, playStoreUrl, lang = 'en', now = new Date()) {
  if (!liveMock || !playStoreUrl) return '';
  const starts = new Date(liveMock.startsAt);
  const ends = new Date(liveMock.endsAt);
  if (Number.isNaN(starts.getTime()) || starts.getTime() <= now.getTime()) return '';
  const tz = { timeZone: 'Asia/Kolkata' };
  const day = new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { ...tz, weekday: 'long' }).format(starts);
  const date = formatHubDate(starts.toLocaleDateString('en-CA', tz), lang);
  const clock = (d) => d.toLocaleTimeString('en-GB', { ...tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const lt = LIVE_MOCK_T[lang] ?? LIVE_MOCK_T.en;
  return `<p class="hub-live-mock"><strong>${lt.label}:</strong> ${esc(day)}, ${esc(date)}, ${clock(starts)}&ndash;${clock(ends)} IST &middot; ${esc(lt.shape(liveMock.questionCount, liveMock.durationMinutes))} &middot; <a href="${esc(playStoreUrl)}" rel="noopener">${lt.cta} &rarr;</a></p>`;
}

function cutoffTablesHtml(cutoffs, lang, t, report) {
  const bySection = new Map();
  for (const row of cutoffs) {
    if (!bySection.has(row.section)) bySection.set(row.section, []);
    bySection.get(row.section).push(row);
  }
  let html = '';
  for (const [section, rows] of bySection) {
    const cycles = [...new Set(rows.map((r) => r.cycleLabel))].sort().reverse();
    const categories = [...new Set(rows.map((r) => r.category))].sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a);
      const ib = CATEGORY_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
    });
    const cell = (category, cycle) => {
      const row = rows.find((r) => r.category === category && r.cycleLabel === cycle);
      return row ? row.targetScore.toFixed(2) : '&mdash;';
    };
    const maxScore = rows[0].maxScore;
    const label = lang === 'hi' ? (SECTION_HI[section] ?? section) : section;
    html += `<h3>${esc(label)}</h3><p class="hub-facts">${t.cutoffNote(marksText(maxScore))}</p>`;
    html += `<div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>${t.category}</th>${cycles.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${categories
      .map((cat) => `<tr><td>${esc(cat)}</td>${cycles.map((c) => `<td>${cell(cat, c)}</td>`).join('')}</tr>`)
      .join('')}</tbody></table></div>`;
    for (const cycle of cycles) {
      const first = rows.find((r) => r.cycleLabel === cycle);
      html += sourceLine(t, `${cycle} ${lang === 'hi' ? 'परिणाम-विवरण' : 'result write-up'}`, first.sourceUrl, first.verifiedAt, lang, report && { ...report, block: `${t.cutoffs} (${section}, ${cycle})` });
    }
  }
  return html;
}

// The newest cycle's fact sheet drives the page; `facts` is newest-first, as the API returns it.
export function examHubBody({ examName, facts, cutoffs = [], notices = [], items = [], lang = 'en', links = {}, pyq = null, liveMock = null, playStoreUrl = '', now = new Date() }) {
  const t = T[lang];
  const fact = facts[0];
  const verifiedDates = [fact.verifiedAt, ...cutoffs.map((c) => c.verifiedAt)].map((d) => String(d).slice(0, 10));
  const lastVerified = verifiedDates.sort().at(-1);
  const otherPath = examHubPath(fact.examId, lang === 'hi' ? 'en' : 'hi');
  const report = { examName, page: `https://parikshasaathi.com${examHubPath(fact.examId, lang)}` };

  // The first stage can be one paper (Tier-I) or several sessions on one day (MTS): count them together.
  // CTET's Paper I and the two Paper II options are alternatives, not sessions: show one paper, not their sum.
  const firstParts = fact.stages[0].partsAreAlternatives ? fact.stages[0].parts.slice(0, 1) : fact.stages[0].parts;
  // An 'objective' part with no section table (BPSC Prelims: 150 marks, question count not printed) counts
  // toward marks and time but contributes no question count.
  const firstMcq = firstParts.filter((p) => p.sections.length > 0 || p.kind === 'objective');
  const firstTotals = firstMcq.reduce(
    (acc, p) => {
      const part = p.sections.length > 0 ? sectionTotals(p) : { questions: 0, marks: p.marks ?? 0 };
      return { questions: acc.questions + part.questions, marks: acc.marks + part.marks };
    },
    { questions: 0, marks: 0 },
  );
  const firstMinutes = firstParts.reduce((n, p) => n + (p.durationMinutes ?? 0), 0);
  const negativeTexts = firstMcq.map((p) => (p.negativeMarking === null || p.negativeMarking === undefined ? t.negativeNotStated : p.negativeMarking.perWrongAnswer > 0 ? pick(p.negativeMarking, lang) : t.noNegative));
  const negativeGlance =
    new Set(negativeTexts).size <= 1
      ? (negativeTexts[0] ?? '—')
      : firstMcq.map((p, i) => `${pick(p.name, lang)}: ${negativeTexts[i]}`).join(' ');
  const firstDates = fact.dates.find((d) => d.role === 'firstStage' && d.from && d.to);

  const glance = [
    [t.stages, esc(fact.stages.map((s) => pick(s.name, lang)).join(' → '))],
    // A first stage whose duration depends on the category (Agniveer CEE: 1 hour or 2 hours) carries a
    // durationNote and no minutes: show a dash rather than "0 min".
    [`${t.firstStage}: ${t.totalQuestions} / ${t.totalMarks} / ${t.time}`, `${firstTotals.questions > 0 ? firstTotals.questions : '&mdash;'} / ${marksText(firstTotals.marks)} / ${firstMinutes > 0 ? `${firstMinutes} ${lang === 'hi' ? 'मिनट' : 'min'}` : '&mdash;'}`],
    [t.negative, esc(negativeGlance)],
  ];
  if (firstDates) glance.push([t.firstStageDates, `${esc(formatHubDate(firstDates.from, lang))} ${t.dateTo} ${esc(formatHubDate(firstDates.to, lang))}`]);
  if (fact.vacancies) {
    glance.push([t.vacancies, `${countText(fact.vacancies.total)} (${t.vacanciesAsOf(esc(formatHubDate(fact.vacancies.asOf, lang)))})`]);
  }

  let html = `<div class="compare-top-row"><a href="/" class="detail-back">&larr; ${t.home}</a><a href="${esc(otherPath)}" class="compare-lang-switch">${t.switchLabel}</a></div>`;
  const hasCutoffs = cutoffs.length > 0;
  html += `<h1>${esc(t.h1(examName, hasCutoffs))}</h1>`;
  html += `<p class="compare-lede">${esc(t.lede(fact.cycleLabel, formatHubDate(lastVerified, lang), hasCutoffs))}</p>`;

  html += `<h2>${t.glance}</h2><dl class="hub-glance">${glance.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  html += liveMockLineHtml(liveMock, playStoreUrl, lang, now);

  html += `<h2>${t.pattern}</h2>`;
  for (const stage of fact.stages) {
    html += `<h3>${esc(pick(stage.name, lang))}</h3>`;
    if (stage.appliesTo) html += `<p class="hub-applies"><strong>${t.appliesTo}:</strong> ${esc(pick(stage.appliesTo, lang))}</p>`;
    html += stage.parts.map((p) => partHtml(p, lang, t)).join('');
  }
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang, { ...report, block: t.pattern });

  const el = fact.eligibility;
  html += `<h2>${t.eligibility}</h2><p>${esc(pick(el.ageNote, lang))}${el.ageReferenceDate ? ` ${esc(t.ageAsOn(formatHubDate(el.ageReferenceDate, lang)))}` : ''}</p>`;
  html += `<div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>${t.posts}</th><th>${t.requirement}</th></tr></thead><tbody>${el.qualification
    .map((q) => `<tr><td>${esc(pick(q.posts, lang))}</td><td>${esc(pick(q.requirement, lang))}</td></tr>`)
    .join('')}</tbody></table></div>`;
  if (el.qualifyingMarks) html += `<p class="hub-facts">${esc(pick(el.qualifyingMarks, lang))}</p>`;
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang, { ...report, block: t.eligibility });

  html += `<h2>${t.dates}</h2><div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>${t.event}</th><th>${t.date}</th><th>${t.dateSource}</th></tr></thead><tbody>${fact.dates
    .map((d) => {
      const when = d.text
        ? esc(pick(d.text, lang))
        : d.to
          ? `${esc(formatHubDate(d.from, lang))} ${t.dateTo} ${esc(formatHubDate(d.to, lang))}`
          : esc(formatHubDate(d.from, lang));
      return `<tr><td>${esc(pick(d.label, lang))}</td><td>${when}</td><td><a href="${esc(d.sourceUrl ?? fact.sourceUrl)}" target="_blank" rel="noreferrer">${t.officialNotice} &#8599;</a></td></tr>`;
    })
    .join('')}</tbody></table></div>`;
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang, { ...report, block: t.dates });
  if (fact.vacancies) html += sourceLine(t, `${t.vacancies}`, fact.vacancies.sourceUrl, fact.verifiedAt, lang, { ...report, block: t.vacancies });

  if (cutoffs.length > 0) {
    html += `<h2>${t.cutoffs}</h2>${cutoffTablesHtml(cutoffs, lang, t, report)}<p class="hub-facts">${esc(legendText([...new Set(cutoffs.map((c) => c.category))], lang, t))}</p>`;
  }

  // Previous-year questions: one row per official paper and shift, each linked to the official paper/key it
  // was transcribed from (GET /v1/exams/:id/pyq-summary). Rendered only once at least one paper exists - which,
  // until the owner supplies the first paper and answer key, is no exam (server docs/PYQ.md).
  if (pyq && pyq.total > 0 && Array.isArray(pyq.papers) && pyq.papers.length > 0) {
    html += `<h2>${t.pyq}</h2><p class="hub-facts">${esc(t.pyqIntro(pyq.total, pyq.papers.length))}</p><ul class="hub-notices hub-pyq">${pyq.papers
      .map(
        (p) =>
          `<li><a href="${esc(p.sourceUrl)}" rel="noopener">${esc(p.paper)}${p.shift ? ` · ${esc(p.shift)}` : ''}</a><span>${esc(t.pyqCount(p.count))}${t.noteSep}${esc(formatHubDate(p.date, lang))}</span></li>`,
      )
      .join('')}</ul>`;
  }

  if (notices.length > 0) {
    html += `<h2>${t.notices}</h2><ul class="hub-notices">${notices
      .slice(0, 8)
      .map(
        (n) =>
          `<li><a href="/app/exam-notices/${esc(n.id)}/">${esc(n.title)}</a><span>${esc(TYPE_LABEL[lang][n.type] ?? n.type)}${t.noteSep}${esc(formatHubDate(n.lastVerifiedAt, lang))}</span></li>`,
      )
      .join('')}</ul><p><a href="/app/exam-notices/">${t.allNotices} &rarr;</a></p>`;
  }

  // The five most recent current-affairs items for this exam (see hubItems) - fresh, dated, linked
  // content on the site's strongest pages, and the crawl path by which new items get found.
  if (items.length > 0) {
    html += `<h2>${t.currentAffairs}</h2><ul class="hub-notices hub-current-affairs">${items
      .map((i) => `<li><a href="/app/current-affairs/${esc(i.id)}/">${esc(i.title)}</a><span>${esc(formatHubDate(i.editionDate, lang))}</span></li>`)
      .join('')}</ul><p><a href="/app/current-affairs/">${t.allCurrentAffairs} &rarr;</a></p>`;
  }

  html += `<h2>${t.prepare}</h2><ul class="compare-links">`;
  html += `<li><a href="${lang === 'hi' ? '/hi' : ''}/exams/calendar/">${t.calendar}</a></li>`;
  if (links.syllabusPath) html += `<li><a href="${esc(links.syllabusPath)}">${t.syllabus}</a></li>`;
  if (links.typingTestPath) html += `<li><a href="${esc(links.typingTestPath)}">${t.typing}</a></li>`;
  if (links.jobProfilePath) html += `<li><a href="${esc(links.jobProfilePath)}">${t.jobProfile}</a></li>`;
  html += `<li><a href="/learn/">${t.lessons}</a></li><li><a href="/onboarding">${t.practice}</a></li></ul>`;

  html += `<h2>${t.howMade}</h2><p>${t.howMadeBody} <a href="/contact/">${t.contact}</a> &middot; <a href="/about/">${t.standards}</a></p>`;
  return html;
}

export function examHubMeta({ examName, facts, cutoffs = [], lang = 'en' }) {
  const t = T[lang];
  const fact = facts[0];
  const lastVerified = [fact.verifiedAt, ...cutoffs.map((c) => c.verifiedAt)].map((d) => String(d).slice(0, 10)).sort().at(-1);
  const hasCutoffs = cutoffs.length > 0;
  const title =
    lang === 'hi'
      ? `${examName} परीक्षा पैटर्न, अंक${hasCutoffs ? ' और कट-ऑफ' : ' और आयु सीमा'}`
      : `${examName} exam pattern, marks${hasCutoffs ? ' & cut-off' : ' & age limit'}`;
  const description =
    lang === 'hi'
      ? `${examName} का आधिकारिक पैटर्न, नेगेटिव मार्किंग, समय, आयु सीमा, तिथियाँ${hasCutoffs ? ' और कट-ऑफ' : ''}, हर आँकड़े के साथ उसका स्रोत और ${formatHubDate(lastVerified, lang)} का सत्यापन।`
      : `${examName} official pattern, negative marking, timing, age limit, dates${hasCutoffs ? ' and cut-offs' : ''}, each figure linked to its source and last verified on ${formatHubDate(lastVerified, lang)}.`;
  return { title, description, lastVerified, h1: t.h1(examName, hasCutoffs) };
}

export function examHubStructuredData({ examName, facts, cutoffs = [], lang = 'en', siteUrl }) {
  const meta = examHubMeta({ examName, facts, cutoffs, lang });
  const t = T[lang];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.h1,
      description: meta.description,
      inLanguage: lang,
      dateModified: meta.lastVerified,
      publisher: { '@type': 'Organization', name: 'Pariksha Saathi' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.home, item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: examName },
      ],
    },
  ];
}

// Which current-affairs items belong on an exam's hub. The feed's exam tags are coarse (General,
// SSC, Banking), so SSC exams show SSC-tagged items, the bank exams Banking-tagged ones, and every
// other exam the whole feed - the newest `count` in the page's language, newest first.
export function hubItemTag(examId) {
  if (examId.startsWith('ssc_')) return 'SSC';
  if (['ibps_po', 'ibps_clerk', 'sbi_po', 'sbi_clerk'].includes(examId)) return 'Banking';
  return null;
}

export function hubItems(examId, items, count = 5) {
  const tag = hubItemTag(examId);
  const pool = tag ? items.filter((i) => Array.isArray(i.examTags) && i.examTags.includes(tag)) : items;
  return [...pool].sort((a, b) => (a.editionDate < b.editionDate ? 1 : a.editionDate > b.editionDate ? -1 : 0)).slice(0, count);
}
