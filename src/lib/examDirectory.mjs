// The "choose your exam" page (/exams/ and /hi/exams/) and the header button that reaches it from every public
// page. Plain .mjs so scripts/prerender.mjs and the React page share ONE builder (same arrangement as examHub.mjs).
// Every exam in the server catalog is listed; the links under it appear only for the pages that exist, so nothing
// here points at a page that is not built.
import { EXAM_NAMES } from './examNames.mjs';
import { examHubPath, examHubSlug } from './examHubPath.mjs';

export const EXAMS_LINK = {
  en: { href: '/exams/', label: 'Exams', title: 'Choose your exam' },
  hi: { href: '/hi/exams/', label: 'परीक्षाएँ', title: 'अपनी परीक्षा चुनें' },
};

// Header button, placed beside "Start studying". It sits outside the nav links on purpose: those are hidden on
// phones, and this one must be reachable everywhere.
export function examsLinkHtml(lang = 'en') {
  const l = EXAMS_LINK[lang] ?? EXAMS_LINK.en;
  return `<a class="pub-exams-link" href="${l.href}" aria-label="${l.title}">${l.label}</a>`;
}

// Order follows the server catalog (pariksha-saathi-server prisma/seed.js) so a new exam lands in its group.
const GROUPS = [
  { key: 'ssc', title: { en: 'SSC', hi: 'SSC' }, exams: ['ssc_cgl', 'ssc_chsl', 'ssc_mts', 'ssc_gd'] },
  { key: 'banking', title: { en: 'Banking', hi: 'बैंकिंग' }, exams: ['ibps_po', 'ibps_clerk', 'sbi_po', 'sbi_clerk'] },
  { key: 'railway', title: { en: 'Railways', hi: 'रेलवे' }, exams: ['rrb_ntpc', 'rrb_group_d', 'rrb_alp'] },
  { key: 'police', title: { en: 'State police', hi: 'राज्य पुलिस' }, exams: ['up_police', 'bihar_police', 'mp_police', 'rajasthan_police'] },
  { key: 'defence', title: { en: 'Defence', hi: 'रक्षा' }, exams: ['agniveer_army'] },
  { key: 'teaching', title: { en: 'Teaching', hi: 'शिक्षण' }, exams: ['ctet'] },
  { key: 'psc', title: { en: 'State PSC', hi: 'राज्य PSC' }, exams: ['uppsc', 'bpsc', 'mppsc', 'rpsc'] },
];

export const DIRECTORY_EXAM_IDS = GROUPS.flatMap((g) => g.exams);

export function examDirectoryPath(lang) {
  return EXAMS_LINK[lang === 'hi' ? 'hi' : 'en'].href;
}

const T = {
  en: {
    home: 'Home',
    switchLabel: 'हिंदी में पढ़ें',
    h1: 'Choose your exam',
    lede: (n) =>
      `${n} exams, each with its official pattern, marks, negative marking, dates and eligibility, copied from the exam body's own document and linked to it. Syllabus and job-profile pages are linked where they exist.`,
    pattern: 'Pattern, dates and eligibility',
    syllabus: 'Syllabus',
    jobProfile: 'Job profile and pay',
    soon: 'Page coming soon',
    practise: 'Practise in the app',
    calendar: 'Exam calendar: every official date across these exams, this month onwards',
    startTitle: 'Ready to practise?',
    startBody: 'Pick your exam and start with a free topic quiz. No account needed.',
    start: 'Start studying free',
    more: 'More exams are added as their official notifications are checked.',
  },
  hi: {
    home: 'होम',
    switchLabel: 'Read in English',
    h1: 'अपनी परीक्षा चुनें',
    lede: (n) =>
      `${n} परीक्षाएँ, हर एक का आधिकारिक पैटर्न, अंक, नेगेटिव मार्किंग, तिथियाँ और पात्रता, परीक्षा निकाय के अपने दस्तावेज़ से उतारी हुई और उसी से जुड़ी। जहाँ पाठ्यक्रम और जॉब-प्रोफ़ाइल पृष्ठ हैं, वहाँ उनके लिंक दिए हैं।`,
    pattern: 'पैटर्न, तिथियाँ और पात्रता',
    syllabus: 'पाठ्यक्रम',
    jobProfile: 'जॉब प्रोफ़ाइल और वेतन',
    soon: 'पृष्ठ जल्द आ रहा है',
    practise: 'ऐप में अभ्यास करें',
    calendar: 'परीक्षा कैलेंडर: इन परीक्षाओं की हर आधिकारिक तिथि, इस महीने से आगे',
    startTitle: 'अभ्यास शुरू करने के लिए तैयार?',
    startBody: 'अपनी परीक्षा चुनें और मुफ़्त टॉपिक क्विज़ से शुरुआत करें। खाते की ज़रूरत नहीं।',
    start: 'मुफ़्त पढ़ाई शुरू करें',
    more: 'आधिकारिक अधिसूचनाओं की जाँच होते ही और परीक्षाएँ जोड़ी जाती हैं।',
  },
};

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

// hubIds: exams that have an exam page; syllabusSlugs / jobProfileSlugs: the slugs of the pages that exist.
export function examDirectoryBody({ lang = 'en', hubIds = [], syllabusSlugs = [], jobProfileSlugs = [] }) {
  const t = T[lang] ?? T.en;
  const prefix = lang === 'hi' ? '/hi' : '';
  const otherPath = examDirectoryPath(lang === 'hi' ? 'en' : 'hi');
  let html = `<div class="compare-top-row"><a href="${lang === 'hi' ? '/hi/' : '/'}" class="detail-back">&larr; ${t.home}</a><a href="${otherPath}" class="compare-lang-switch">${t.switchLabel}</a></div>`;
  html += `<h1>${t.h1}</h1><p class="compare-lede">${esc(t.lede(DIRECTORY_EXAM_IDS.length))}</p>`;
  html += `<p class="exam-dir-calendar"><a href="${prefix}/exams/calendar/">${t.calendar} &rarr;</a></p>`;
  for (const group of GROUPS) {
    html += `<section class="exam-dir-group" id="${group.key}"><h2>${esc(group.title[lang] ?? group.title.en)}</h2><div class="exam-dir-grid">`;
    for (const examId of group.exams) {
      const slug = examHubSlug(examId);
      const links = [];
      if (hubIds.includes(examId)) links.push(`<a href="${examHubPath(examId, lang)}">${t.pattern}</a>`);
      if (syllabusSlugs.includes(slug)) links.push(`<a href="${prefix}/compare/${slug}-syllabus/">${t.syllabus}</a>`);
      if (jobProfileSlugs.includes(slug)) links.push(`<a href="${prefix}/compare/${slug}-job-profile/">${t.jobProfile}</a>`);
      const body = links.length
        ? `<ul class="exam-dir-links">${links.map((l) => `<li>${l}</li>`).join('')}</ul>`
        : `<p class="exam-dir-soon">${t.soon}</p>`;
      html += `<article class="exam-dir-card"><h3>${esc(EXAM_NAMES[examId] ?? examId)}</h3>${body}</article>`;
    }
    html += `</div></section>`;
  }
  html += `<p class="exam-dir-note">${t.more}</p>`;
  html += `<section class="exam-dir-start"><h2>${t.startTitle}</h2><p>${t.startBody}</p><a class="btn-primary-compare" href="/onboarding/">${t.start} &rarr;</a></section>`;
  return html;
}

export function examDirectoryMeta(lang = 'en') {
  return lang === 'hi'
    ? {
        title: 'अपनी परीक्षा चुनें: पैटर्न, पाठ्यक्रम और जॉब प्रोफ़ाइल',
        description: `SSC, बैंकिंग, रेलवे, राज्य पुलिस, CTET और राज्य PSC की ${DIRECTORY_EXAM_IDS.length} परीक्षाएँ: आधिकारिक पैटर्न, तिथियाँ, पात्रता, पाठ्यक्रम और जॉब प्रोफ़ाइल, हर आँकड़े के स्रोत के साथ।`,
      }
    : {
        title: 'Choose your exam: pattern, syllabus and job profile',
        description: `${DIRECTORY_EXAM_IDS.length} exams across SSC, banking, railways, state police, CTET and state PSC: official pattern, dates, eligibility, syllabus and job profile, each figure linked to its source.`,
      };
}

// schema.org for the directory: every exam with a hub page, as one ItemList. An answer engine asked "which exams
// does Pariksha Saathi cover?" then reads the list instead of inferring it from the page layout. Shared by
// scripts/prerender.mjs and ExamDirectoryPage.tsx, like the body.
export function examDirectoryStructuredData({ lang = 'en', hubIds = [], siteUrl }) {
  const meta = examDirectoryMeta(lang);
  const ids = DIRECTORY_EXAM_IDS.filter((id) => hubIds.includes(id));
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: meta.title,
      description: meta.description,
      url: `${siteUrl}${examDirectoryPath(lang)}`,
      inLanguage: lang,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: ids.length,
        itemListElement: ids.map((id, index) => ({ '@type': 'ListItem', position: index + 1, name: EXAM_NAMES[id], url: `${siteUrl}${examHubPath(id, lang)}` })),
      },
    },
  ];
}
