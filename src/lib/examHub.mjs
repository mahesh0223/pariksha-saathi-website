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
import { GK_INSIGHTS_EXAMS, GK_INSIGHTS_LINK } from './gkInsights.mjs';
import { formatHubDate, examHubSlug, examHubPath } from './examHubPath.mjs';
import { CONTACT_EMAIL } from './reportQuestion.mjs';
import { questionIndexPath, topicListPath } from './questionPage.mjs';
import { EXAM_HUB_EXTRAS, EXAM_HUB_TOPICS } from '../data/examHubExtras.mjs';
import { isSscExam, sscHindiLabels } from '../data/hindiGlossary.mjs';
import { QUESTION_SUBJECTS_HI } from '../data/lessonSubjects.mjs';
import { telegramCtaHtml } from './telegramCta.mjs';
import { MOCK_TEST_EXAMS, mockTestsPath } from './mockTestsPath.mjs';
import { PYQ_INDEX_EXAMS, pyqIndexPath, pyqPaperPathFor } from './pyqPath.mjs';
import { homeVisitHint } from './officialLink.mjs';
import { examUpdatesPath } from './examHubPath.mjs';
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
    pyqIntro: (n, papers) => `${n} question${n === 1 ? '' : 's'} from ${papers} official paper${papers === 1 ? '' : 's'}, each with the answer from the official key; questions that need a figure, and any the key cancelled, are left out. Each paper links to the exam body's own notice.`,
    pyqLanguage: { en: ' The questions are in English.', hi: ' The questions are in Hindi.' },
    // Questions in another language that are a section of their own (SSC GD's Part-D Hindi), not a translation.
    pyqAlsoIn: { hi: (n) => ` ${n} more, from the Hindi option of the paper's language part, are in Hindi.` },
    pyqCount: (n) => `${n} question${n === 1 ? '' : 's'}`,
    pyqSolved: 'solved paper with answers',
    mockTests: (exam) => `Free ${exam} mock tests in this official pattern`,
    pyqAll: (exam) => `All ${exam} previous year question papers with answers, by year`,
    pyqNotice: 'official notice',
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
    updatesLink: (exam) => `${exam} admit card, result and answer key: every notice`,
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
    syllabusHeading: 'Syllabus: subjects tested',
    syllabusIntro: 'The subjects in short, as the official syllabus lists them. The exam body\'s own notification is final.',
    syllabusMore: 'Full syllabus, stage by stage',
    officialSite: 'Official website',
    practiceHeading: 'Practice questions by section',
    practiceIntro: 'Free questions, each with its answer, in the subjects this exam tests. Every topic opens a list of question pages.',
    questionCount: (n) => `${n} question${n === 1 ? '' : 's'}`,
    allQuestions: 'All practice questions by topic',
    faq: 'Frequently asked questions',
    faqStages: { q: (name) => `What are the selection stages of ${name}?`, a: (cycle, stages) => `${stages}, as per the ${cycle} notification.` },
    faqSize: {
      q: (name) => `How many questions are in the ${name} first stage?`,
      a: (cycle, label, questions, marks, minutes) => `${label}: ${questions} questions for ${marks} marks in ${minutes} minutes, as per the ${cycle} notification.`,
    },
    faqNegative: { q: (name) => `Is there negative marking in ${name}?`, a: (cycle, label, text) => `${label}, as per the ${cycle} notification: ${text}` },
    faqAge: { q: (name) => `What is the age limit for ${name}?` },
    faqQualification: { q: (name) => `What qualification do I need for ${name}?` },
    faqDates: { q: (name) => `What are the ${name} first-stage exam dates?`, a: (cycle, label, from, to) => `${label}: ${to ? `${from} to ${to}` : from}, as per the ${cycle} notification.` },
    faqSubjects: { q: (name) => `Which subjects does the ${name} exam test?`, a: (subjects) => `The official syllabus lists: ${subjects}.` },
    faqNegativeStage: { q: (name, stage) => `Is there negative marking in ${name} ${stage}?` },
    faqQualifying: { q: (name) => `Which parts of the ${name} exam are qualifying?`, a: (cycle, list) => `As per the ${cycle} notification, these are qualifying: ${list}.` },
    faqFinalYear: {
      q: (name, degree) => (degree ? `Can final-year students apply for ${name}?` : `Can students awaiting their result apply for ${name}?`),
      a: (cycle, text) => `As per the ${cycle} notification: ${text}`,
    },
    faqQualifyingMarks: { q: (name) => `What are the minimum qualifying marks in ${name}?` },
    faqApply: {
      q: (name) => `When is the last date to apply for ${name}?`,
      row: (label, from, to, closed) => `${label}: ${from} to ${to}${closed ? ' (now closed)' : ''}.`,
      src: (cycle) => `As per the ${cycle} notification.`,
    },
    faqVacancies: { q: (name) => `How many vacancies are there in ${name}?`, a: (cycle, total, asOf) => `${total} tentative vacancies for ${cycle}${asOf ? `, as officially published on ${asOf}` : ''}.` },
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
    noNegative: 'कोई नकारात्मक अंकन नहीं',
    negativeNotStated: 'अधिसूचना में नहीं बताया गया',
    glance: 'एक नज़र में',
    stages: 'चयन के चरण',
    totalQuestions: 'प्रश्न',
    totalMarks: 'अंक',
    time: 'समय',
    negative: 'नकारात्मक अंकन',
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
    pyqIntro: (n, papers) => `${papers} आधिकारिक पेपर से ${n} प्रश्न, हर प्रश्न आधिकारिक उत्तर कुंजी के उत्तर के साथ; चित्र वाले प्रश्न और कुंजी में रद्द प्रश्न शामिल नहीं। हर पेपर परीक्षा निकाय की अपनी सूचना से जुड़ा है।`,
    pyqLanguage: { en: ' प्रश्न अंग्रेज़ी में हैं।', hi: ' प्रश्न हिंदी में हैं।' },
    pyqAlsoIn: { hi: (n) => ` भाषा वाले भाग के हिंदी विकल्प के ${n} और प्रश्न हिंदी में हैं।` },
    pyqCount: (n) => `${n} प्रश्न`,
    pyqSolved: 'उत्तर सहित हल प्रश्नपत्र (अंग्रेज़ी)',
    pyqSolvedWithHindi: 'उत्तर सहित हल प्रश्नपत्र (अंग्रेज़ी, हिंदी विकल्प सहित)',
    mockTests: (exam) => `${exam} के मुफ़्त मॉक टेस्ट, इसी आधिकारिक पैटर्न में`,
    pyqAll: (exam) => `${exam} के सभी पिछले वर्ष के प्रश्न पत्र, उत्तर सहित, वर्ष के क्रम में`,
    pyqNotice: 'आधिकारिक सूचना',
    cutoffs: 'वर्ष और श्रेणी के अनुसार कट-ऑफ अंक',
    cutoffNote: (max) => `अंक ${max} में से हैं। कट-ऑफ हर चक्र में बदलता है और अगले चक्र की गारंटी नहीं है; इससे बस यह समझें कि हर श्रेणी में प्रतिस्पर्धा कितनी रही है।`,
    category: 'श्रेणी',
    legend: {
      UR: 'अनारक्षित',
      reserved: 'आरक्षित श्रेणियाँ',
      ESM: 'भूतपूर्व सैनिक',
      disability: 'अस्थि, श्रवण और दृष्टि दिव्यांगता',
      'Other PwD': 'अन्य दिव्यांगजन',
      PwBD: 'बेंचमार्क दिव्यांगता वाले व्यक्ति',
      bracket: 'कोष्ठक वाले लेबल, जैसे (SA), (TSP) या (Female), परीक्षा निकाय की अपनी उप-सूचियाँ हैं, ठीक वैसे ही जैसे उसके कट-ऑफ दस्तावेज़ में छपी हैं।',
    },
    notices: 'ताज़ा सूचनाएँ',
    updatesLink: (exam) => `${exam} एडमिट कार्ड, रिज़ल्ट और आंसर की: हर सूचना`,
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
    syllabusHeading: 'पाठ्यक्रम (सिलेबस): परीक्षा के विषय',
    syllabusIntro: 'विषय संक्षेप में, जैसे आधिकारिक पाठ्यक्रम में दिए हैं। परीक्षा निकाय की अपनी अधिसूचना ही अंतिम है।',
    syllabusMore: 'पूरा सिलेबस, चरण के अनुसार',
    officialSite: 'आधिकारिक वेबसाइट',
    practiceHeading: 'खंड के अनुसार अभ्यास प्रश्न',
    practiceIntro: 'इस परीक्षा के विषयों के मुफ़्त प्रश्न, हर प्रश्न उत्तर सहित। हर टॉपिक पर क्लिक करने से उसके प्रश्नों की सूची खुलती है।',
    questionCount: (n) => `${n} प्रश्न`,
    allQuestions: 'टॉपिक के अनुसार सभी अभ्यास प्रश्न',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    faqStages: { q: (name) => `${name} में चयन के चरण कौन-से हैं?`, a: (cycle, stages) => `${cycle} की अधिसूचना के अनुसार: ${stages}।` },
    faqSize: {
      q: (name) => `${name} के पहले चरण में कितने प्रश्न होते हैं?`,
      a: (cycle, label, questions, marks, minutes) => `${label}: ${minutes} मिनट में ${marks} अंकों के ${questions} प्रश्न, ${cycle} की अधिसूचना के अनुसार।`,
    },
    faqNegative: { q: (name) => `क्या ${name} में नकारात्मक अंकन (नेगेटिव मार्किंग) है?`, a: (cycle, label, text) => `${label}, ${cycle} की अधिसूचना के अनुसार: ${text}` },
    faqAge: { q: (name) => `${name} की आयु सीमा क्या है?` },
    faqQualification: { q: (name) => `${name} के लिए कौन-सी योग्यता चाहिए?` },
    faqDates: { q: (name) => `${name} के पहले चरण की परीक्षा तिथियाँ क्या हैं?`, a: (cycle, label, from, to) => `${label}: ${to ? `${from} से ${to} तक` : from}, ${cycle} की अधिसूचना के अनुसार।` },
    faqSubjects: { q: (name) => `${name} परीक्षा में कौन-से विषय आते हैं?`, a: (subjects) => `आधिकारिक पाठ्यक्रम में ये विषय हैं: ${subjects}।` },
    faqNegativeStage: { q: (name, stage) => `क्या ${name} ${stage} में नकारात्मक अंकन (नेगेटिव मार्किंग) है?` },
    faqQualifying: { q: (name) => `${name} परीक्षा के कौन-से हिस्से अर्हक (क्वालिफाइंग) हैं?`, a: (cycle, list) => `${cycle} की अधिसूचना के अनुसार ये अर्हक हैं: ${list}।` },
    faqFinalYear: {
      q: (name, degree) => (degree ? `क्या अंतिम वर्ष के छात्र ${name} के लिए आवेदन कर सकते हैं?` : `क्या परिणाम की प्रतीक्षा कर रहे छात्र ${name} के लिए आवेदन कर सकते हैं?`),
      a: (cycle, text) => `${cycle} की अधिसूचना के अनुसार: ${text}`,
    },
    faqQualifyingMarks: { q: (name) => `${name} में न्यूनतम अर्हक अंक कितने हैं?` },
    faqApply: {
      q: (name) => `${name} के लिए आवेदन की अंतिम तिथि क्या है?`,
      row: (label, from, to, closed) => `${label}: ${from} से ${to} तक${closed ? ' (अब बंद)' : ''}।`,
      src: (cycle) => `${cycle} की अधिसूचना के अनुसार।`,
    },
    faqVacancies: { q: (name) => `${name} में कितनी रिक्तियाँ हैं?`, a: (cycle, total, asOf) => `${cycle} के लिए ${total} अनंतिम रिक्तियाँ${asOf ? `, ${asOf} को आधिकारिक रूप से प्रकाशित` : ''}।` },
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

// SSC pages' Hindi says विज्ञप्ति for the notice (src/data/hindiGlossary.mjs).
const SSC_T_HI = sscHindiLabels(T.hi);
const labels = (lang, examId) => (lang === 'hi' && isSscExam(examId) ? SSC_T_HI : T[lang]);

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
// "26 April 2026 to 26 April 2026" read as a typo on a one-day exam: a range whose ends are the same day prints once.
function dateSpan(from, to, lang, t) {
  const start = formatHubDate(from, lang);
  return to && String(to).slice(0, 10) !== String(from).slice(0, 10) ? `${start} ${t.dateTo} ${formatHubDate(to, lang)}` : start;
}

// EXPERIMENT from 20 Oct 2026 (review 3 Nov; plan G1 in the Android repo's docs/plans/2026-10-17-working-plan.md): one
// quiet line under "At a glance" on four hubs only, pointing to the daily PDF and the Telegram channel through /go/
// redirects (public/_redirects) so Cloudflare's HTTP analytics counts the clicks. Compare with the other hubs' Telegram
// box and Referral Traffic; drop the line if it does not move them. Not exam-specific: the PDF is national current affairs.
export const NEXT_STEP_PILOT_HUBS = ['ssc_cgl', 'ssc_chsl', 'sbi_po', 'mppsc'];
const NEXT_STEP_T = {
  en: { lead: 'Current affairs free every morning:', pdf: "today's PDF", pdfNote: '(in Hindi)', telegram: 'on Telegram' },
  hi: { lead: 'हर सुबह मुफ़्त करेंट अफेयर्स:', pdf: 'आज का PDF', pdfNote: '', telegram: 'Telegram पर' },
};
export function nextStepLineHtml(examId, lang = 'en') {
  if (!NEXT_STEP_PILOT_HUBS.includes(examId)) return '';
  const n = NEXT_STEP_T[lang] ?? NEXT_STEP_T.en;
  return `<p class="hub-next">${n.lead} <a href="/go/hub-pdf" rel="nofollow">${n.pdf}</a>${n.pdfNote ? ` ${n.pdfNote}` : ''} &middot; <a href="/go/hub-telegram" rel="nofollow noopener" target="_blank">${n.telegram}</a></p>`;
}

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

// The first stage's size, time, negative marking and dates - shared by the "At a glance" block and the FAQ.
function firstStageSummary(fact, lang, t) {
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
  // What the FAQ calls the first stage: its own name, or for alternative papers (CTET) the first paper's.
  const label = pick(fact.stages[0].partsAreAlternatives ? fact.stages[0].parts[0].name : fact.stages[0].name, lang);
  return { firstMcq, negativeTexts, firstTotals, firstMinutes, negativeGlance, firstDates, label };
}

const MAX_FAQ_QUALIFICATION = 360;
const sentence = (text, lang) => {
  const trimmed = String(text ?? '').trim();
  return /[.।?!)]$/.test(trimmed) ? trimmed : `${trimmed}${lang === 'hi' ? '।' : '.'}`;
};

// Questions and answers built only from the fact sheet - every answer restates a figure shown, with its source, in
// the blocks above - plus the syllabus subject names. Shown at the foot of the page and given as FAQPage data.
// A qualification row that speaks to applying before the final result (final-year students, results awaited).
const FINAL_YEAR = /final[- ](year|semester)|appearing|awaiting|result must have been declared/i;
// ...and whether it is a degree or course qualification, which decides how the question is put.
const DEGREE_LEVEL = /degree|graduat|bachelor|qualifying course/i;
// An application window among the dates (not a correction, modification or fee date).
const APPLY = /applications?\b/i;
const NOT_APPLY = /correction|modif|edit|fee|status/i;

const negativeText = (p, lang, t) => (p.negativeMarking === null || p.negativeMarking === undefined ? t.negativeNotStated : p.negativeMarking.perWrongAnswer > 0 ? pick(p.negativeMarking, lang) : t.noNegative);

export function examHubFaq({ examName, facts, lang = 'en', extras = EXAM_HUB_EXTRAS[facts[0]?.examId] ?? null, now = new Date() }) {
  const t = labels(lang, facts[0]?.examId);
  const fact = facts[0];
  const first = firstStageSummary(fact, lang, t);
  const faq = [{ q: t.faqStages.q(examName), a: t.faqStages.a(fact.cycleLabel, fact.stages.map((s) => pick(s.name, lang)).join(' → ')) }];
  if (first.firstTotals.questions > 0 && first.firstMinutes > 0) {
    faq.push({ q: t.faqSize.q(examName), a: t.faqSize.a(fact.cycleLabel, first.label, first.firstTotals.questions, marksText(first.firstTotals.marks), first.firstMinutes) });
  }
  if (first.firstMcq.length > 0) {
    const negative =
      new Set(first.negativeTexts).size <= 1
        ? sentence(first.negativeTexts[0], lang)
        : first.firstMcq.map((p, i) => `${pick(p.name, lang)}: ${sentence(first.negativeTexts[i], lang)}`).join(' ');
    faq.push({ q: t.faqNegative.q(examName), a: t.faqNegative.a(fact.cycleLabel, first.label, negative) });
  }
  // The same for each later stage that has objective papers (CGL Tier-II, IBPS Mains, NTPC CBT-2).
  for (const stage of fact.stages.slice(1)) {
    const mcq = (stage.parts ?? []).filter((p) => (p.sections?.length ?? 0) > 0 || p.kind === 'objective');
    // Asked only where the notice says something: "Not stated" for every paper answers nothing.
    if (mcq.every((p) => p.negativeMarking === null || p.negativeMarking === undefined)) continue;
    const texts = mcq.map((p) => negativeText(p, lang, t));
    const text = new Set(texts).size <= 1 ? sentence(texts[0], lang) : mcq.map((p, i) => `${pick(p.name, lang)}: ${sentence(texts[i], lang)}`).join(' ');
    const stageName = pick(stage.name, lang);
    faq.push({ q: t.faqNegativeStage.q(examName, stageName.replace(/\s*\([^)]*\)\s*$/, '')), a: t.faqNegative.a(fact.cycleLabel, stageName, text) });
  }
  // The parts the notification marks as qualifying.
  const qualifying = fact.stages.flatMap((s) =>
    (s.parts ?? []).filter((p) => p.qualifying).map((p) => (pick(s.name, lang) === pick(p.name, lang) ? pick(s.name, lang) : `${pick(s.name, lang)}: ${pick(p.name, lang)}`)),
  );
  if (qualifying.length > 0 && qualifying.length <= 6) faq.push({ q: t.faqQualifying.q(examName), a: t.faqQualifying.a(fact.cycleLabel, qualifying.join('; ')) });
  const el = fact.eligibility;
  faq.push({ q: t.faqAge.q(examName), a: [sentence(pick(el.ageNote, lang), lang), el.ageReferenceDate ? t.ageAsOn(formatHubDate(el.ageReferenceDate, lang)) : ''].filter(Boolean).join(' ') });
  // A long post-by-post table does not fit an answer; the eligibility block above has it.
  const qualification = el.qualification.map((row) => `${pick(row.posts, lang)}: ${sentence(pick(row.requirement, lang), lang)}`).join(' ');
  if (el.qualification.length > 0 && el.qualification.length <= 3 && qualification.length <= MAX_FAQ_QUALIFICATION) {
    faq.push({ q: t.faqQualification.q(examName), a: qualification });
  }
  // Applying before the final result - only where the notice's own qualification text says something about it.
  const finalYear = el.qualification.filter((row) => FINAL_YEAR.test(row.requirement?.en ?? ''));
  if (finalYear.length > 0) {
    const text = finalYear.map((row) => `${el.qualification.length > 1 ? `${pick(row.posts, lang)}: ` : ''}${sentence(pick(row.requirement, lang), lang)}`).join(' ');
    faq.push({ q: t.faqFinalYear.q(examName, finalYear.some((row) => DEGREE_LEVEL.test(row.requirement?.en ?? ''))), a: t.faqFinalYear.a(fact.cycleLabel, text) });
  }
  if (el.qualifyingMarks) faq.push({ q: t.faqQualifyingMarks.q(examName), a: sentence(pick(el.qualifyingMarks, lang), lang) });
  if (fact.vacancies?.total) {
    faq.push({ q: t.faqVacancies.q(examName), a: t.faqVacancies.a(fact.cycleLabel, countText(fact.vacancies.total), fact.vacancies.asOf ? formatHubDate(fact.vacancies.asOf, lang) : '') });
  }
  // The application window(s), saying so once a window has closed.
  const apply = (fact.dates ?? []).filter((d) => d.from && d.to && APPLY.test(d.label?.en ?? '') && !NOT_APPLY.test(d.label?.en ?? ''));
  if (apply.length > 0) {
    const today = now.toISOString().slice(0, 10);
    const rows = apply.map((d) => t.faqApply.row(pick(d.label, lang), formatHubDate(d.from, lang), formatHubDate(d.to, lang), String(d.to).slice(0, 10) < today));
    faq.push({ q: t.faqApply.q(examName), a: `${rows.join(' ')} ${t.faqApply.src(fact.cycleLabel)}` });
  }
  if (first.firstDates) {
    // The dates belong to the whole stage, not to one of its alternative papers.
    const { from, to } = first.firstDates;
    const sameDay = !to || String(to).slice(0, 10) === String(from).slice(0, 10);
    faq.push({ q: t.faqDates.q(examName), a: t.faqDates.a(fact.cycleLabel, pick(fact.stages[0].name, lang), formatHubDate(from, lang), sameDay ? null : formatHubDate(to, lang)) });
  }
  if (extras?.syllabus) faq.push({ q: t.faqSubjects.q(examName), a: t.faqSubjects.a(extras.syllabus[lang].map((s) => s.name).join('; ')) });
  return faq;
}

// The newest cycle's fact sheet drives the page; `facts` is newest-first, as the API returns it.
// `extras` (src/data/examHubExtras.mjs) adds the syllabus summary and practice links; it defaults to the exam's own entry.
export function examHubBody({ examName, facts, cutoffs = [], notices = [], items = [], lang = 'en', links = {}, pyq = null, liveMock = null, playStoreUrl = '', now = new Date(), extras = EXAM_HUB_EXTRAS[facts[0]?.examId] ?? null }) {
  const t = labels(lang, facts[0]?.examId);
  const fact = facts[0];
  const verifiedDates = [fact.verifiedAt, ...cutoffs.map((c) => c.verifiedAt)].map((d) => String(d).slice(0, 10));
  const lastVerified = verifiedDates.sort().at(-1);
  const otherPath = examHubPath(fact.examId, lang === 'hi' ? 'en' : 'hi');
  const report = { examName, page: `https://parikshasaathi.com${examHubPath(fact.examId, lang)}` };

  const { firstTotals, firstMinutes, negativeGlance, firstDates } = firstStageSummary(fact, lang, t);

  const glance = [
    [t.stages, esc(fact.stages.map((s) => pick(s.name, lang)).join(' → '))],
    // A first stage whose duration depends on the category (Agniveer CEE: 1 hour or 2 hours) carries a
    // durationNote and no minutes: show a dash rather than "0 min".
    [`${t.firstStage}: ${t.totalQuestions} / ${t.totalMarks} / ${t.time}`, `${firstTotals.questions > 0 ? firstTotals.questions : '&mdash;'} / ${marksText(firstTotals.marks)} / ${firstMinutes > 0 ? `${firstMinutes} ${lang === 'hi' ? 'मिनट' : 'min'}` : '&mdash;'}`],
    [t.negative, esc(negativeGlance)],
  ];
  if (firstDates) glance.push([t.firstStageDates, esc(dateSpan(firstDates.from, firstDates.to, lang, t))]);
  if (fact.vacancies) {
    glance.push([t.vacancies, `${countText(fact.vacancies.total)} (${t.vacanciesAsOf(esc(formatHubDate(fact.vacancies.asOf, lang)))})`]);
  }

  let html = `<div class="compare-top-row"><a href="/" class="detail-back">&larr; ${t.home}</a><a href="${esc(otherPath)}" class="compare-lang-switch">${t.switchLabel}</a></div>`;
  const hasCutoffs = cutoffs.length > 0;
  html += `<h1>${esc(t.h1(hubTitleName(examName, fact, lang), hasCutoffs))}</h1>`;
  html += `<p class="compare-lede">${esc(t.lede(fact.cycleLabel, formatHubDate(lastVerified, lang), hasCutoffs))}</p>`;

  html += `<h2>${t.glance}</h2><dl class="hub-glance">${glance.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  html += nextStepLineHtml(fact.examId, lang);
  html += liveMockLineHtml(liveMock, playStoreUrl, lang, now);

  html += `<h2>${t.pattern}</h2>`;
  for (const stage of fact.stages) {
    html += `<h3>${esc(pick(stage.name, lang))}</h3>`;
    if (stage.appliesTo) html += `<p class="hub-applies"><strong>${t.appliesTo}:</strong> ${esc(pick(stage.appliesTo, lang))}</p>`;
    html += stage.parts.map((p) => partHtml(p, lang, t)).join('');
  }
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang, { ...report, block: t.pattern });
  // Railway exams have no papers to practise from: their numbered mocks in this very pattern (src/lib/mockTestsPage.mjs).
  if (MOCK_TEST_EXAMS.includes(fact.examId)) html += `<p class="hub-mock-link"><a href="${mockTestsPath(fact.examId, lang)}">${esc(t.mockTests(examName))} &rarr;</a></p>`;

  // The subjects as the syllabus page gives them (no exam figures - those stay in the sourced blocks), linked to that
  // page and to the exam body's site.
  if (extras?.syllabus) {
    html += `<h2>${t.syllabusHeading}</h2><p class="hub-facts">${t.syllabusIntro}</p><dl class="hub-syllabus">${extras.syllabus[lang]
      .map((s) => `<div><dt>${esc(s.name)}</dt><dd>${esc([].concat(s.body).join(' '))}</dd></div>`)
      .join('')}</dl><p class="hub-facts">${links.syllabusPath ? `<a href="${esc(links.syllabusPath)}">${t.syllabusMore} &rarr;</a>${t.noteSep}` : ''}<a href="${esc(extras.syllabus.officialUrl)}" target="_blank" rel="noreferrer">${t.officialSite} &#8599;</a></p>`;
  }

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
        : esc(dateSpan(d.from, d.to, lang, t));
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
    // The summary counts one language (the server's default is English); say so when it is not the page's.
    const pyqLanguage = (pyq.languageCode && pyq.languageCode !== lang ? (t.pyqLanguage[pyq.languageCode] ?? '') : '')
      + Object.entries(pyq.inOtherLanguages ?? {}).map(([code, n]) => t.pyqAlsoIn?.[code]?.(n) ?? '').join('');
    html += `<h2>${t.pyq}</h2><p class="hub-facts">${esc(t.pyqIntro(pyq.total, pyq.papers.length) + pyqLanguage)}</p>`;
    if (PYQ_INDEX_EXAMS.includes(fact.examId)) html += `<p><a href="${pyqIndexPath(fact.examId, lang)}">${esc(t.pyqAll(examName))} &rarr;</a></p>`;
    html += `<ul class="hub-notices hub-pyq">${pyq.papers
      .map(
        (p) =>
          // The paper links to its solved-paper page when there is one; the exam body's notice is always linked.
          (() => {
            const solved = pyqPaperPathFor(fact.examId, p);
            const name = `${esc(p.paper)}${p.shift ? ` · ${esc(p.shift)}` : ''}`;
            const notice = `<a href="${esc(p.sourceUrl)}" rel="noopener">${t.pyqNotice} &#8599;</a>`;
            return solved
              ? `<li><a href="${solved}">${name} · ${(p.inOtherLanguages?.hi && t.pyqSolvedWithHindi) || t.pyqSolved}</a><span>${esc(t.pyqCount(p.count))}${t.noteSep}${esc(formatHubDate(p.date, lang))}${t.noteSep}${notice}</span></li>`
              : `<li><a href="${esc(p.sourceUrl)}" rel="noopener">${name}</a><span>${esc(t.pyqCount(p.count))}${t.noteSep}${esc(formatHubDate(p.date, lang))}</span></li>`;
          })(),
      )
      .join('')}</ul>`;
    // The data page counted from these same papers' General Awareness questions (SSC exams only).
    if (GK_INSIGHTS_EXAMS.includes(fact.examId)) html += `<p><a href="${GK_INSIGHTS_LINK[lang === 'hi' ? 'hi' : 'en'].href}">${esc(GK_INSIGHTS_LINK[lang === 'hi' ? 'hi' : 'en'].label)} &rarr;</a></p>`;
  }

  // Practice: the /q/ topic lists for each subject the syllabus tests, largest topics first.
  const practice = (extras?.practice ?? [])
    .map(({ group, keys }) => ({ group, topics: keys.map((key) => EXAM_HUB_TOPICS[key]).filter((topic) => topic && topic[lang].count > 0) }))
    .filter((g) => g.topics.length > 0);
  if (practice.length > 0) {
    html += `<h2>${t.practiceHeading}</h2><p class="hub-facts">${t.practiceIntro}</p>`;
    for (const { group, topics } of practice) {
      html += `<h3>${esc(lang === 'hi' ? (QUESTION_SUBJECTS_HI[group] ?? group) : group)}</h3><ul class="hub-topic-links">${topics
        .map((topic) => `<li><a href="${topicListPath(topic, lang)}">${esc(topic[lang].name)} <span>${esc(t.questionCount(topic[lang].count))}</span></a></li>`)
        .join('')}</ul>`;
    }
    html += `<p><a href="${questionIndexPath(lang)}">${t.allQuestions} &rarr;</a></p>`;
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
  html += `<p><a href="${examUpdatesPath(fact.examId, lang)}">${esc(t.updatesLink(examName))} &rarr;</a></p>`;

  // The five most recent current-affairs items for this exam (see hubItems) - fresh, dated, linked
  // content on the site's strongest pages, and the crawl path by which new items get found.
  if (items.length > 0) {
    html += `<h2>${t.currentAffairs}</h2><ul class="hub-notices hub-current-affairs">${items
      .map((i) => `<li><a href="/app/current-affairs/${esc(i.id)}/">${esc(i.title)}</a><span>${esc(formatHubDate(i.editionDate, lang))}</span></li>`)
      .join('')}</ul><p><a href="/app/current-affairs/">${t.allCurrentAffairs} &rarr;</a></p>`;
  }
  html += telegramCtaHtml(lang);

  html += `<h2>${t.prepare}</h2><ul class="compare-links">`;
  html += `<li><a href="${lang === 'hi' ? '/hi' : ''}/exams/calendar/">${t.calendar}</a></li>`;
  if (links.syllabusPath) html += `<li><a href="${esc(links.syllabusPath)}">${t.syllabus}</a></li>`;
  if (links.typingTestPath) html += `<li><a href="${esc(links.typingTestPath)}">${t.typing}</a></li>`;
  if (links.jobProfilePath) html += `<li><a href="${esc(links.jobProfilePath)}">${t.jobProfile}</a></li>`;
  html += `<li><a href="/learn/">${t.lessons}</a></li><li><a href="/onboarding/">${t.practice}</a></li></ul>`;

  html += `<h2>${t.faq}</h2><div class="hub-faq">${examHubFaq({ examName, facts, lang, extras, now })
    .map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`)
    .join('')}</div>`;
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang, { ...report, block: t.faq });

  html += `<h2>${t.howMade}</h2><p>${t.howMadeBody} <a href="/contact/">${t.contact}</a> &middot; <a href="/about/">${t.standards}</a></p>`;
  return html;
}

// What a hub's title and H1 call the exam: its name plus the cycle the fact sheet covers, the way people search for it
// ("SSC CGL 2026"). Keyed by the fact sheet's own cycle label, so a hub whose sheet moves to a new cycle drops back to
// the bare name - never a stale year - until a row is added here. The year is not always the one in the label: the IBPS
// cycle labelled "vacancies of 2027-28" was notified and is being examined in 2026, and SBI's "2026-27" adverts in 2026.
const HUB_TITLE_NAME = {
  ssc_cgl: { 'CGL 2026': { en: 'SSC CGL 2026' } },
  ssc_chsl: { 'CHSL 2026': { en: 'SSC CHSL 2026' } },
  ssc_mts: { 'MTS 2025': { en: 'SSC MTS 2025' } },
  ssc_gd: { 'Constable (GD) 2026': { en: 'SSC GD 2026' } },
  ibps_po: { 'CRP PO/MT-XVI (vacancies of 2027-28)': { en: 'IBPS PO 2026' } },
  ibps_clerk: { 'CRP CSA-XVI (Clerk, vacancies of 2027-28)': { en: 'IBPS Clerk 2026' } },
  sbi_po: { 'PO 2026-27': { en: 'SBI PO 2026' } },
  sbi_clerk: { 'JA 2026-27': { en: 'SBI Clerk 2026' } },
  rrb_ntpc: { 'CEN 06/2026 and CEN 07/2026': { en: 'RRB NTPC 2026' } },
  rrb_alp: { 'CEN 01/2026': { en: 'RRB ALP 2026' } },
  rrb_group_d: { 'CEN 09/2025 (Level 1)': { en: 'RRB Group D 2025' } },
  agniveer_army: { 'Recruiting Year 2025-26': { en: 'Agniveer 2025-26' } },
  ctet: { 'CTET 22nd edition (Dec 2026)': { en: 'CTET December 2026', hi: 'CTET दिसंबर 2026' } },
  up_police: { 'Constable Recruitment 2025': { en: 'UP Police Constable 2025', hi: 'UP Police कांस्टेबल 2025' } },
  bihar_police: { 'Advt. No. 01/2025 (Constable, Bihar Police and Bihar Special Armed Police)': { en: 'Bihar Police Constable 2025', hi: 'Bihar Police कांस्टेबल 2025' } },
  mp_police: { 'Police Constable (G.D.) Recruitment Test 2026': { en: 'MP Police Constable 2026', hi: 'MP Police कांस्टेबल 2026' } },
  rajasthan_police: { 'Constable Recruitment 2025': { en: 'Rajasthan Police Constable 2025', hi: 'Rajasthan Police कांस्टेबल 2025' } },
  bpsc: { '72nd CCE 2026': { en: 'BPSC 72nd CCE 2026', hi: 'BPSC 72वीं CCE 2026' } },
  mppsc: { 'State Service Exam 2026': { en: 'MPPSC 2026' } },
  rpsc: { 'RAS 2026': { en: 'RPSC RAS 2026' } },
  uppsc: { 'PCS 2026': { en: 'UPPSC PCS 2026' } },
};

/** The hub's exam name with its cycle ("SSC CGL 2026"), or the bare name when this cycle has no row above. */
export function hubTitleName(examName, fact, lang = 'en') {
  const row = HUB_TITLE_NAME[fact.examId]?.[fact.cycleLabel];
  return row ? (row[lang] ?? row.en) : examName;
}

// "Tier 1 & 2" / "CBT 1 & 2" / "Prelims & Mains", read from the fact sheet's own stage names - the way searches
// qualify a pattern. Nothing for single-stage exams.
function stageLabel(fact, lang) {
  const names = (fact.stages ?? []).map((s) => s.name?.en ?? '').join(' | ');
  const hi = lang === 'hi';
  if (/Tier-I\b/.test(names) && /Tier-II\b/.test(names)) return hi ? 'टियर 1 और 2' : 'Tier 1 & 2';
  if (/CBT-1\b/.test(names) && /CBT-2\b/.test(names)) return hi ? 'CBT 1 और 2' : 'CBT 1 & 2';
  if (/Preliminary/.test(names) && /Main/.test(names)) return hi ? 'प्रीलिम्स और मेन्स' : 'Prelims & Mains';
  return '';
}

export function examHubMeta({ examName, facts, cutoffs = [], lang = 'en' }) {
  const t = T[lang];
  const fact = facts[0];
  const lastVerified = [fact.verifiedAt, ...cutoffs.map((c) => c.verifiedAt)].map((d) => String(d).slice(0, 10)).sort().at(-1);
  const hasCutoffs = cutoffs.length > 0;
  const hasSyllabus = Boolean(EXAM_HUB_EXTRAS[fact.examId]?.syllabus);
  const syllabus = hasSyllabus ? (lang === 'hi' ? ' सिलेबस,' : ' syllabus,') : '';
  const name = hubTitleName(examName, fact, lang);
  const stage = stageLabel(fact, lang);
  const title =
    lang === 'hi'
      ? `${name}: ${stage ? `${stage} ` : ''}परीक्षा पैटर्न${hasSyllabus ? ', सिलेबस' : ''} और ${hasCutoffs ? 'कट-ऑफ' : 'आयु सीमा'}`
      : `${name}: ${stage ? `${stage} ` : ''}Exam Pattern${hasSyllabus ? ', Syllabus' : ''} & ${hasCutoffs ? 'Cut-off' : 'Age Limit'}`;
  const description =
    lang === 'hi'
      ? `${name} का आधिकारिक पैटर्न,${syllabus} नेगेटिव मार्किंग, समय, आयु सीमा, तिथियाँ${hasCutoffs ? ' और कट-ऑफ' : ''}, हर आँकड़े के साथ उसका स्रोत और ${formatHubDate(lastVerified, lang)} का सत्यापन।`
      : `${name} official pattern,${syllabus} negative marking, timing, age limit, dates${hasCutoffs ? ' and cut-offs' : ''}, each figure linked to its source and last verified on ${formatHubDate(lastVerified, lang)}.`;
  return { title, description, lastVerified, h1: t.h1(name, hasCutoffs) };
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
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: examHubFaq({ examName, facts, lang }).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
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
