// Hindi exam terms as the Staff Selection Commission itself prints them in its Hindi notices (read from the page
// images of the five documents in HINDI_GLOSSARY_SOURCES on 23 Oct 2026; their text layers are font-corrupted, so
// nothing here was copied from extracted text). The website's and the app's Hindi exam pages use `hi`; the forms in
// `avoid` may appear only in page titles, h1 headings, link text and structured data (where students' search
// words matter), or in brackets straight after the official term, e.g. "नकारात्मक अंकन (नेगेटिव मार्किंग)".
// scripts/check-public-pages.mjs enforces that on the built Hindi exam pages.
//
// Where SSC prints a word two ways in one notice, `hi` is the form printed in that notice's scheme table or heading
// and `also` lists the others. Where SSC misprints a word in a table but prints the standard spelling elsewhere in
// the same notice (बुद्दिमत्ता / बुद्धिमता for बुद्धिमत्ता, अभिरूचि for अभिरुचि, "तर्क शक्ति" for तर्कशक्ति), the
// standard spelling is used. Abbreviations stay in Latin letters as students search them (CBE, PET, DEO, SC, OBC);
// SSC's own Devanagari abbreviations are listed for reference.

export const HINDI_GLOSSARY_READ_ON = '2026-10-23';

const NOTICE_BASE = 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/';

export const HINDI_GLOSSARY_SOURCES = {
  cgl2025: {
    hi: 'विज्ञप्ति: संयुक्त स्नातक स्तरीय परीक्षा, 2025',
    en: 'Combined Graduate Level Examination, 2025: notice (Hindi)',
    dated: '2025-06-09',
    url: `${NOTICE_BASE}notice_12062025.pdf`,
  },
  chsl2026: {
    hi: 'विज्ञप्ति: संयुक्त उच्चतर माध्यमिक (10+2) स्तरीय परीक्षा, 2026',
    en: 'Combined Higher Secondary (10+2) Level Examination, 2026: notice (Hindi)',
    dated: '2026-09-07',
    url: `${NOTICE_BASE}CHSL2026_hindi_notice_18092026.pdf`,
  },
  mts2025: {
    hi: 'विज्ञप्ति: मल्टी टास्किंग (गैर-तकनीकी) स्टाफ एवं हवलदार (सीबीआईसी एवं सीबीएन) परीक्षा, 2025',
    en: 'Multi-Tasking (Non-Technical) Staff and Havaldar (CBIC and CBN) Examination, 2025: notice (Hindi)',
    dated: '2025-06-26',
    url: `${NOTICE_BASE}Notice_09072025.pdf`,
  },
  gd2026: {
    hi: 'विज्ञप्ति: के.स.पु.ब. और एस.एस.एफ. में कांस्टेबल (जीडी) तथा असम राइफल्स में राइफलमैन (जीडी) परीक्षा, 2026',
    en: 'Constable (GD) in CAPFs and SSF and Rifleman (GD) in Assam Rifles Examination, 2026: notice (Hindi)',
    dated: '2025-12-01',
    url: `${NOTICE_BASE}Notice_08122025.pdf`,
  },
  gdResult2026: {
    hi: 'कांस्टेबल (जीडी) परीक्षा, 2026: पीईटी/पीएसटी के लिए अभ्यर्थियों को शॉर्टलिस्ट करना',
    en: 'Constable (GD) Examination, 2026: candidates shortlisted for PET/PST (result notice, Hindi)',
    dated: '2026-10-12',
    url: `${NOTICE_BASE}writeup_14102026.pdf`,
  },
};

// Terms used across the exam pages. `src` lists [source, pages] pairs where the form was read.
export const HINDI_GLOSSARY = [
  { en: 'candidate', hi: 'अभ्यर्थी', avoid: ['उम्मीदवार'], src: [['chsl2026', [1, 2, 4]], ['cgl2025', [21]], ['mts2025', [1, 2]], ['gd2026', [1, 2]]] },
  { en: 'qualifying (in nature)', hi: 'अर्हक', also: ['न्यूनतम अर्हक अंक (minimum qualifying marks)'], avoid: ['क्वालिफाइंग', 'क्वालीफाइंग'], src: [['chsl2026', [25, 35]], ['mts2025', [30]], ['gd2026', [25]]] },
  { en: 'syllabus', hi: 'पाठ्यक्रम', avoid: ['सिलेबस'], src: [['mts2025', [21]], ['gd2026', [18]], ['chsl2026', [27]]] },
  { en: 'scheme of examination', hi: 'परीक्षा की रूपरेखा', note: '"परीक्षा पैटर्न" is common usage and stays allowed.', src: [['mts2025', [20]], ['gd2026', [17]], ['cgl2025', [21]]] },
  { en: 'pay level', hi: 'वेतन स्तर', also: ['वेतन स्तर-4 (with the number, hyphenated)', 'वेतन मैट्रिक्स (Pay Matrix)', 'सातवें वेतन आयोग (7th CPC)'], avoid: ['पे लेवल', 'पे-लेवल'], src: [['chsl2026', [1, 2]], ['mts2025', [1, 2]], ['gd2026', [3]]] },
  { en: 'Group B / Group C', hi: "समूह 'ख' / समूह 'ग'", also: ['अराजपत्रित (non-gazetted)'], avoid: ['ग्रुप ‘B’', 'ग्रुप ‘C’', "ग्रुप 'B'", "ग्रुप 'C'"], src: [['cgl2025', [1, 2, 5]], ['chsl2026', [1]], ['mts2025', [1, 2]]] },
  { en: 'notice (an SSC exam notice)', hi: 'विज्ञप्ति', also: ['परीक्षा की विज्ञप्ति', 'राजपत्र अधिसूचना (a Gazette notification)'], note: 'SSC never calls its exam notice अधिसूचना; other bodies\' pages keep अधिसूचना.', src: [['chsl2026', [1, 8]], ['cgl2025', [1]], ['mts2025', [1]], ['gd2026', [1, 2]]] },
  { en: 'admit card', hi: 'प्रवेश पत्र', also: ['प्रवेश प्रमाण-पत्र'], avoid: ['एडमिट कार्ड'], src: [['gd2026', [23, 24]], ['cgl2025', [30]], ['chsl2026', [12, 31]], ['mts2025', [11, 25]]] },
  { en: 'answer key', hi: 'उत्तर कुंजी', also: ['अनंतिम उत्तर कुंजी (tentative)', 'अंतिम उत्तर कुंजी (final)'], avoid: ['आंसर की', 'आंसर-की'], src: [['chsl2026', [21]], ['mts2025', [21]], ['gd2026', [18]], ['cgl2025', [21]]] },
  { en: 'result', hi: 'परिणाम', also: ['अंतिम परिणाम (final result)'], avoid: ['रिज़ल्ट', 'रिजल्ट'], src: [['chsl2026', [2, 21]], ['mts2025', [12, 21]], ['gd2026', [2, 18]]] },
  { en: 'cut-off marks', hi: 'कट-ऑफ अंक', src: [['chsl2026', [21, 37]], ['gd2026', [17, 28]], ['gdResult2026', [2, 4]]] },
  { en: 'negative marking', hi: 'नकारात्मक अंकन', also: ['प्रत्येक गलत उत्तर के लिए 0.50 अंकों का नकारात्मक अंकन होगा (CHSL)', 'प्रत्येक गलत उत्तर के लिए 0.25 अंक काटा जाएगा (GD)'], avoid: ['नेगेटिव मार्किंग', 'माइनस मार्किंग'], src: [['chsl2026', [22, 25]], ['cgl2025', [22]], ['gd2026', [17]]] },
  { en: 'normalised marks', hi: 'सामान्यीकृत अंक', note: 'The notices use only the participle (अंक सामान्यीकृत किए जाएंगे); the noun सामान्यीकरण does not occur.', avoid: ['नॉर्मलाइज़ेशन', 'नॉर्मलाइजेशन', 'नॉर्मलाइज़'], src: [['chsl2026', [21]], ['mts2025', [21]], ['gd2026', [17]], ['cgl2025', [21]]] },
  { en: 'Computer Based Examination', hi: 'कंप्यूटर आधारित परीक्षा', also: ['(सीबीई)'], src: [['chsl2026', [1]], ['mts2025', [20]], ['gd2026', [1, 17]]] },
  { en: 'Tier / Session / Section / Part', hi: 'टियर / सत्र / खंड / भाग', also: ["भाग-क, भाग-ख, भाग-ग, भाग-घ (Constable GD's Parts A-D)"], src: [['cgl2025', [21, 22]], ['chsl2026', [22]], ['mts2025', [20]], ['gd2026', [17]]] },
  { en: 'Document Verification', hi: 'दस्तावेज़ सत्यापन', also: ['दस्तावेज सत्यापन'], src: [['chsl2026', [33]], ['mts2025', [26]], ['gd2026', [2, 25]]] },
  { en: 'Physical Efficiency Test / Physical Standard Test', hi: 'शारीरिक दक्षता परीक्षा / शारीरिक मानक परीक्षा', also: ['शारीरिक मानक परीक्षण (GD)', 'शारीरिक क्षमता परीक्षा / शारीरिक मापदंड परीक्षा (GD result notice)'], src: [['mts2025', [20, 22]], ['gd2026', [2, 18]], ['gdResult2026', [1]]] },
  { en: 'Detailed / Review Medical Examination', hi: 'विस्तृत चिकित्सा परीक्षा / समीक्षा चिकित्सा परीक्षा', src: [['gd2026', [2, 17]]] },
  { en: 'Ex-Servicemen', hi: 'भूतपूर्व सैनिक', also: ['भूपूसै / ईएसएम (abbreviations)'], avoid: ['(?<!भूत)पूर्व सैनिक'], src: [['chsl2026', [2, 5]], ['mts2025', [2, 5]], ['gd2026', [3, 4]], ['cgl2025', [5]]] },
  { en: 'Persons with Benchmark Disabilities', hi: 'बेंचमार्क दिव्यांगजन', also: ['प्रलिपिक (scribe)', 'प्रतिपूरक समय (compensatory time)'], avoid: ['विकलांग'], src: [['chsl2026', [2, 10, 11]], ['mts2025', [2]], ['gd2026', [12]]] },
  { en: 'SC / ST / OBC / EWS / UR', hi: 'अनुसूचित जाति / अनुसूचित जनजाति / अन्य पिछड़ा वर्ग / आर्थिक रूप से कमजोर वर्ग / अनारक्षित', also: ['अजा / अजजा / अपिव / आकव / अना (abbreviations)'], src: [['chsl2026', [2]], ['mts2025', [2]], ['gd2026', [3, 4]]] },
  { en: 'vacancies; tentative vacancies', hi: 'रिक्तियां; अनंतिम रिक्तियां', src: [['chsl2026', [2]], ['mts2025', [2]], ['gd2026', [2, 3]]] },
  { en: 'age limit; age relaxation', hi: 'आयु सीमा; आयु में छूट', also: ['आयु की गणना के लिए महत्वपूर्ण तिथि (crucial date)'], avoid: ['उम्र सीमा'], src: [['chsl2026', [5]], ['mts2025', [4]], ['gd2026', [4]]] },
  { en: 'essential educational qualification', hi: 'अनिवार्य शैक्षणिक योग्यता', also: ['शैक्षिक योग्यता'], src: [['chsl2026', [13]], ['mts2025', [12]], ['gd2026', [9]]] },
  { en: 'skill test; typing test', hi: 'कौशल परीक्षा; टंकण परीक्षा', note: 'Our own typing-practice tool keeps the name "टाइपिंग टेस्ट"; the exam stage is टंकण परीक्षा.', avoid: ['स्किल टेस्ट'], src: [['chsl2026', [23, 24, 25]]] },
  { en: 'Data Entry Speed Test', hi: 'डाटा प्रविष्टि गति परीक्षा', also: ['डाटा एंट्री ऑपरेटर के लिए कौशल परीक्षा (CHSL)'], avoid: ['डेटा एंट्री स्पीड टेस्ट'], src: [['cgl2025', [22]], ['chsl2026', [25]]] },
  { en: 'shift', hi: 'पाली', also: ['पालियों'], avoid: ['शिफ्ट', 'शिफ़्ट'], src: [['chsl2026', [21]], ['mts2025', [21]], ['cgl2025', [21]]] },
  { en: 'question paper', hi: 'प्रश्नपत्र', src: [['chsl2026', [22]], ['mts2025', [22]], ['gd2026', [30]]] },
  { en: 'merit list; final selection; allocation; preference', hi: 'मेरिट सूची; अंतिम चयन; आवंटन; वरीयता', also: ['योग्यता सूची'], src: [['chsl2026', [35, 36]], ['gd2026', [2, 26]], ['mts2025', [30, 31]]] },
  { en: 'application fee; last date', hi: 'आवेदन शुल्क; अंतिम तिथि', src: [['chsl2026', [16]], ['mts2025', [15]], ['gd2026', [1, 12]]] },
  { en: 'post; user department', hi: 'पद; प्रयोक्ता विभाग', src: [['chsl2026', [1, 2]], ['mts2025', [2, 4]]] },
  { en: 'objective multiple-choice questions', hi: 'वस्तुनिष्ठ प्रकार के बहुविकल्पीय प्रश्न', src: [['chsl2026', [22]], ['mts2025', [21]], ['gd2026', [17]]] },
];

// Subject names of the four SSC exams, each exactly as that exam's own Hindi notice prints it in its scheme table
// (misprints normalised as described above). CGL's are from the 2025 notice: SSC has not published a Hindi CGL 2026
// notice, so Paper-III of Tier-II (General Studies (Finance and Economics), new in 2026) has no official Hindi yet
// and keeps our translation, marked `unofficial`.
export const SSC_SUBJECTS_HI = {
  ssc_cgl: {
    src: 'cgl2025', pages: [21, 22, 23],
    names: {
      'General Intelligence and Reasoning': 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति',
      'General Awareness': 'सामान्य जानकारी',
      'Quantitative Aptitude': 'परिमाणात्मक अभिरुचि',
      'English Comprehension': 'अंग्रेजी परिज्ञान',
      'Mathematical Abilities': 'गणितीय योग्यता',
      'Reasoning and General Intelligence': 'तर्कशक्ति एवं सामान्य बुद्धिमत्ता',
      'English Language and Comprehension': 'अंग्रेजी भाषा एवं परिज्ञान',
      'Computer Knowledge Test': 'कंप्यूटर ज्ञान परीक्षा',
      'Data Entry Speed Test': 'डाटा प्रविष्टि गति परीक्षा',
      Statistics: 'सांख्यिकी',
    },
    unofficial: { 'General Studies (Finance and Economics)': 'सामान्य अध्ययन (वित्त एवं अर्थशास्त्र)' },
  },
  ssc_chsl: {
    src: 'chsl2026', pages: [22, 23, 27],
    names: {
      'English Language (Basic Knowledge)': 'अंग्रेजी भाषा (मूलभूत जानकारी)',
      'General Intelligence': 'सामान्य बुद्धिमत्ता',
      'Quantitative Aptitude (Basic Arithmetic Skill)': 'संख्यात्मक अभिरुचि (सामान्य अंकगणितीय योग्यता)',
      'General Awareness': 'सामान्य जागरूकता',
      'Mathematical Abilities': 'गणितीय योग्यताएं',
      'Reasoning and General Intelligence': 'तर्कशक्ति और सामान्य बुद्धिमत्ता',
      'English Language and Comprehension': 'अंग्रेजी भाषा और परिज्ञान',
      'Computer Knowledge Test': 'कंप्यूटर ज्ञान परीक्षा',
      'Skill Test': 'कौशल परीक्षा',
      'Typing Test': 'टंकण परीक्षा',
    },
  },
  ssc_mts: {
    src: 'mts2025', pages: [20, 22],
    names: {
      'Numerical and Mathematical Ability': 'संख्यात्मक एवं गणितीय क्षमता',
      'Reasoning Ability and Problem Solving': 'तर्कशक्ति एवं समस्या समाधान',
      'General Awareness': 'सामान्य जानकारी',
      'English Language and Comprehension': 'अंग्रेजी भाषा एवं ज्ञान',
    },
  },
  ssc_gd: {
    src: 'gd2026', pages: [17, 18],
    names: {
      'General Intelligence and Reasoning': 'सामान्य बुद्धिमत्ता और तर्कशक्ति',
      'General Knowledge and General Awareness': 'सामान्य ज्ञान और सामान्य जागरूकता',
      'Elementary Mathematics': 'प्रारंभिक गणित',
      'English / Hindi': 'अंग्रेजी/हिंदी',
    },
  },
};

// Post titles as the CGL 2025 posts table (pp. 2-3) and the CHSL 2026 notice (pp. 1-3, 13) print them.
export const SSC_POSTS_HI = {
  'Assistant Section Officer': 'सहायक अनुभाग अधिकारी',
  'Inspector of Income Tax': 'आयकर निरीक्षक',
  'Inspector (Central Excise)': 'निरीक्षक (केंद्रीय उत्पाद शुल्क)',
  'Inspector (Preventive Officer)': 'निरीक्षक (निवारक अधिकारी)',
  'Inspector (Examiner)': 'निरीक्षक (परीक्षक)',
  'Assistant Enforcement Officer': 'सहायक प्रवर्तन अधिकारी',
  'Sub-Inspector': 'उप निरीक्षक',
  'Inspector (Posts)': 'डाक निरीक्षक',
  'Junior Statistical Officer': 'कनिष्ठ सांख्यिकीय अधिकारी',
  'Statistical Investigator Grade-II': 'सांख्यिकीय अन्वेषक ग्रेड-II',
  Auditor: 'लेखापरीक्षक',
  Accountant: 'लेखाकार',
  'Junior Accountant': 'कनिष्ठ लेखाकार',
  'Postal Assistant / Sorting Assistant': 'डाक सहायक / छंटनी सहायक',
  'Senior Secretariat Assistant / Upper Division Clerk': 'वरिष्ठ सचिवालय सहायक / प्रवर श्रेणी लिपिक',
  'Tax Assistant': 'कर सहायक',
  'Lower Division Clerk / Junior Secretariat Assistant': 'अवर श्रेणी लिपिक / कनिष्ठ सचिवालय सहायक',
  'Data Entry Operator': 'डाटा एंट्री ऑपरेटर',
  'Multi-Tasking Staff (Non-Technical)': 'मल्टी टास्किंग (गैर-तकनीकी) स्टाफ',
  Havaldar: 'हवलदार',
  'Constable (GD)': 'कांस्टेबल (जीडी)',
  'Rifleman (GD)': 'राइफलमैन (जीडी)',
};

// SSC calls its exam notice विज्ञप्ति, never अधिसूचना, so an SSC page's Hindi labels say विज्ञप्ति; every other body's
// page keeps अधिसूचना. sscHindiLabels maps every string in a label set, and every string its functions return.
export const isSscExam = (examId) => String(examId ?? '').startsWith('ssc_');
const sscNoticeWord = (s) => s.replace(/अधिसूचनाओं/g, 'विज्ञप्तियों').replace(/अधिसूचना/g, 'विज्ञप्ति');
const mapStrings = (value, fn) =>
  typeof value === 'string' ? fn(value)
    : typeof value === 'function' ? (...args) => mapStrings(value(...args), fn)
      : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, fn)]))
        : value;
export const sscHindiLabels = (labels) => mapStrings(labels, sscNoticeWord);

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// One matcher per avoided form. A form written straight after its official term in brackets is allowed:
// "नकारात्मक अंकन (नेगेटिव मार्किंग)".
export const HINDI_GLOSSARY_AVOID = HINDI_GLOSSARY.flatMap((entry) =>
  (entry.avoid ?? []).map((form) => ({
    form: form.replace('(?<!भूत)', ''),
    official: entry.hi,
    re: new RegExp(`(?<!\\(\\s*)${form.startsWith('(?<!') ? form : escape(form)}`, 'g'),
  })),
);

// Text of a built page that the glossary applies to: everything visible except the title, h1, link text,
// scripts and styles.
export function glossaryCheckedText(html) {
  return html
    .replace(/<(script|style|title|h1|a)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<head\b[\s\S]*?<\/head>/i, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

// The avoided forms found in a built page's checked text, each with a little context.
export function glossaryViolations(html) {
  const text = glossaryCheckedText(html);
  const found = [];
  for (const { form, official, re } of HINDI_GLOSSARY_AVOID) {
    for (const m of text.matchAll(re)) {
      found.push({ form, official, context: text.slice(Math.max(0, m.index - 40), m.index + form.length + 40) });
    }
  }
  return found;
}
