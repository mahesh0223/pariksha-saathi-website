// Builds the exam hub page (/exams/<slug>/ and /hi/exams/<slug>/) as an HTML string from the server's
// sourced exam facts, official cut-offs and the exam's own notices. Plain .mjs so scripts/prerender.mjs
// and the React page (ExamHubPage.tsx, which injects the body) share ONE builder instead of
// hand-mirroring markup - the same arrangement as currentAffairsReading.mjs.
//
// Rule for this page: a number appears only with the official document it was read from and the date
// it was last checked against that document. Every block below ends in a "Source / Last verified"
// line built from the data's own sourceUrl/verifiedAt - the build check (scripts/check-public-pages.mjs)
// fails if a hub page is missing them.

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
};

const TYPE_LABEL = {
  en: { NOTIFICATION: 'notification', ADMIT_CARD: 'admit card', ANSWER_KEY: 'answer key', RESULT: 'result', DEADLINE: 'deadline' },
  hi: { NOTIFICATION: 'अधिसूचना', ADMIT_CARD: 'प्रवेश पत्र', ANSWER_KEY: 'उत्तर कुंजी', RESULT: 'परिणाम', DEADLINE: 'अंतिम तिथि' },
};

const CATEGORY_ORDER = ['UR', 'OBC', 'EWS', 'SC', 'ST', 'ESM', 'OH', 'HH', 'VH', 'Other PwD'];

// Cut-off tables are language-neutral data (a number per category per cycle), but the name of the
// stage/list each was published for is an English string in the data - translated here by exact match.
const SECTION_HI = {
  'Tier-I, all posts except JSO and SI Grade-II': 'टियर-I, JSO और SI ग्रेड-II को छोड़कर सभी पद',
};

const T = {
  en: {
    home: 'Home',
    switchLabel: 'हिंदी में पढ़ें',
    h1: (name) => `${name}: exam pattern, marks, negative marking, age limit and cut-off`,
    lede: (cycle, verified) =>
      `Every figure on this page is copied from an official document linked next to it, with the date we last checked it. Pattern, age limit and dates are from the ${cycle} notification; cut-offs are from the official result write-ups of earlier years. Last verified: ${verified}.`,
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
    cutoffs: 'Cut-off marks by year and category',
    cutoffNote: (max) => `Marks are out of ${max}. Cut-offs change every cycle and are no promise for the next one; use them to see how competitive each category has been.`,
    category: 'Category',
    cutoffLegend: 'UR: unreserved. OBC, EWS, SC, ST: reserved categories. ESM: ex-servicemen. OH, HH, VH: orthopaedic, hearing and visual disability. Other PwD: other persons with disabilities.',
    notices: 'Latest notices',
    allNotices: 'All exam notices',
    prepare: 'Prepare',
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
    h1: (name) => `${name}: परीक्षा पैटर्न, अंक, नेगेटिव मार्किंग, आयु सीमा और कट-ऑफ`,
    lede: (cycle, verified) =>
      `इस पृष्ठ का हर आँकड़ा उस आधिकारिक दस्तावेज़ से लिया गया है जिसका लिंक उसके साथ दिया है, और उसके साथ वह तारीख भी जब हमने उसे अंतिम बार जाँचा। पैटर्न, आयु सीमा और तिथियाँ ${cycle} की अधिसूचना से हैं; कट-ऑफ पिछले वर्षों के आधिकारिक परिणाम-विवरणों से हैं। अंतिम सत्यापन: ${verified}।`,
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
    cutoffs: 'वर्ष और श्रेणी के अनुसार कट-ऑफ अंक',
    cutoffNote: (max) => `अंक ${max} में से हैं। कट-ऑफ हर चक्र में बदलता है और अगले चक्र की गारंटी नहीं है; इससे बस यह समझें कि हर श्रेणी में प्रतिस्पर्धा कितनी रही है।`,
    category: 'श्रेणी',
    cutoffLegend: 'UR: अनारक्षित। OBC, EWS, SC, ST: आरक्षित श्रेणियाँ। ESM: पूर्व सैनिक। OH, HH, VH: अस्थि, श्रवण और दृष्टि दिव्यांगता। Other PwD: अन्य दिव्यांगजन।',
    notices: 'ताज़ा सूचनाएं',
    allNotices: 'सभी परीक्षा सूचनाएं',
    prepare: 'तैयारी करें',
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

export function formatHubDate(iso, lang) {
  const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number);
  return `${d} ${MONTHS[lang][m - 1]} ${y}`;
}

const marksText = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
const countText = (n) => n.toLocaleString('en-IN');
const pick = (bilingual, lang) => bilingual?.[lang] ?? bilingual?.en ?? '';

export function examHubSlug(examId) {
  return examId.replace(/_/g, '-');
}
export function examHubPath(examId, lang) {
  return `${lang === 'hi' ? '/hi' : ''}/exams/${examHubSlug(examId)}/`;
}

const sourceLine = (t, label, url, verifiedIso, lang) =>
  `<p class="hub-source">${t.sourceWord}: <a href="${esc(url)}" target="_blank" rel="noreferrer">${esc(label)} &#8599;</a>${t.noteSep}${t.verifiedWord}: ${esc(formatHubDate(verifiedIso, lang))}</p>`;

function sectionTotals(part) {
  return {
    questions: part.sections.reduce((n, s) => n + s.questions, 0),
    marks: part.sections.reduce((n, s) => n + s.marks, 0),
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
          `<tr><td>${esc(pick(s.name, lang))}</td><td>${s.questions}</td><td>${marksText(s.marksPerQuestion)}</td><td>${marksText(s.marks)}</td><td>${s.minutes ?? '&mdash;'}</td></tr>`,
      )
      .join('');
    html += `<div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>${t.section}</th><th>${t.questions}</th><th>${t.perQuestion}</th><th>${t.marks}</th><th>${t.minutes}</th></tr></thead><tbody>${rows}<tr class="hub-total"><td>${t.total}</td><td>${totals.questions}</td><td></td><td>${marksText(totals.marks)}</td><td>${part.durationMinutes ?? '&mdash;'}</td></tr></tbody></table></div>`;
  }
  const facts = [];
  if (part.durationMinutes) facts.push(t.duration(part.durationMinutes));
  if (part.durationNote) facts.push(esc(pick(part.durationNote, lang)));
  if (part.negativeMarking) facts.push(`<strong>${t.negative}:</strong> ${esc(pick(part.negativeMarking, lang))}`);
  if (part.qualifying) facts.push(t.qualifyingOnly);
  if (facts.length) html += `<p class="hub-facts">${facts.join(' ')}</p>`;
  if (part.notes?.length) html += `<ul class="hub-notes">${part.notes.map((n) => `<li>${esc(pick(n, lang))}</li>`).join('')}</ul>`;
  return html;
}

function cutoffTablesHtml(cutoffs, lang, t) {
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
      html += sourceLine(t, `${cycle} ${lang === 'hi' ? 'परिणाम-विवरण' : 'result write-up'}`, first.sourceUrl, first.verifiedAt, lang);
    }
  }
  return html;
}

// The newest cycle's fact sheet drives the page; `facts` is newest-first, as the API returns it.
export function examHubBody({ examName, facts, cutoffs = [], notices = [], lang = 'en', links = {} }) {
  const t = T[lang];
  const fact = facts[0];
  const verifiedDates = [fact.verifiedAt, ...cutoffs.map((c) => c.verifiedAt)].map((d) => String(d).slice(0, 10));
  const lastVerified = verifiedDates.sort().at(-1);
  const otherPath = examHubPath(fact.examId, lang === 'hi' ? 'en' : 'hi');

  const firstPart = fact.stages[0].parts[0];
  const firstTotals = sectionTotals(firstPart);
  const firstDates = fact.dates.find((d) => d.role === 'firstStage' && d.from && d.to);

  const glance = [
    [t.stages, esc(fact.stages.map((s) => pick(s.name, lang)).join(' → '))],
    [`${t.firstStage}: ${t.totalQuestions} / ${t.totalMarks} / ${t.time}`, `${firstTotals.questions} / ${marksText(firstTotals.marks)} / ${firstPart.durationMinutes} ${lang === 'hi' ? 'मिनट' : 'min'}`],
    [t.negative, esc(firstPart.negativeMarking ? pick(firstPart.negativeMarking, lang) : '—')],
  ];
  if (firstDates) glance.push([t.firstStageDates, `${esc(formatHubDate(firstDates.from, lang))} ${t.dateTo} ${esc(formatHubDate(firstDates.to, lang))}`]);
  if (fact.vacancies) {
    glance.push([t.vacancies, `${countText(fact.vacancies.total)} (${t.vacanciesAsOf(esc(formatHubDate(fact.vacancies.asOf, lang)))})`]);
  }

  let html = `<div class="compare-top-row"><a href="/" class="detail-back">&larr; ${t.home}</a><a href="${esc(otherPath)}" class="compare-lang-switch">${t.switchLabel}</a></div>`;
  html += `<h1>${esc(t.h1(examName))}</h1>`;
  html += `<p class="compare-lede">${esc(t.lede(fact.cycleLabel, formatHubDate(lastVerified, lang)))}</p>`;

  html += `<h2>${t.glance}</h2><dl class="hub-glance">${glance.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

  html += `<h2>${t.pattern}</h2>`;
  for (const stage of fact.stages) {
    html += `<h3>${esc(pick(stage.name, lang))}</h3>`;
    if (stage.appliesTo) html += `<p class="hub-applies"><strong>${t.appliesTo}:</strong> ${esc(pick(stage.appliesTo, lang))}</p>`;
    html += stage.parts.map((p) => partHtml(p, lang, t)).join('');
  }
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang);

  const el = fact.eligibility;
  html += `<h2>${t.eligibility}</h2><p>${esc(pick(el.ageNote, lang))} ${esc(t.ageAsOn(formatHubDate(el.ageReferenceDate, lang)))}</p>`;
  html += `<div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>${t.posts}</th><th>${t.requirement}</th></tr></thead><tbody>${el.qualification
    .map((q) => `<tr><td>${esc(pick(q.posts, lang))}</td><td>${esc(pick(q.requirement, lang))}</td></tr>`)
    .join('')}</tbody></table></div>`;
  if (el.qualifyingMarks) html += `<p class="hub-facts">${esc(pick(el.qualifyingMarks, lang))}</p>`;
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang);

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
  html += sourceLine(t, fact.noticeTitle, fact.sourceUrl, fact.verifiedAt, lang);
  if (fact.vacancies) html += sourceLine(t, `${t.vacancies}`, fact.vacancies.sourceUrl, fact.verifiedAt, lang);

  if (cutoffs.length > 0) {
    html += `<h2>${t.cutoffs}</h2>${cutoffTablesHtml(cutoffs, lang, t)}<p class="hub-facts">${t.cutoffLegend}</p>`;
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

  html += `<h2>${t.prepare}</h2><ul class="compare-links">`;
  if (links.syllabusPath) html += `<li><a href="${esc(links.syllabusPath)}">${t.syllabus}</a></li>`;
  if (links.jobProfilePath) html += `<li><a href="${esc(links.jobProfilePath)}">${t.jobProfile}</a></li>`;
  html += `<li><a href="/learn/">${t.lessons}</a></li><li><a href="/onboarding">${t.practice}</a></li></ul>`;

  html += `<h2>${t.howMade}</h2><p>${t.howMadeBody} <a href="/contact/">${t.contact}</a> &middot; <a href="/about/">${t.standards}</a></p>`;
  return html;
}

export function examHubMeta({ examName, facts, cutoffs = [], lang = 'en' }) {
  const t = T[lang];
  const fact = facts[0];
  const lastVerified = [fact.verifiedAt, ...cutoffs.map((c) => c.verifiedAt)].map((d) => String(d).slice(0, 10)).sort().at(-1);
  const title = lang === 'hi' ? `${examName} परीक्षा पैटर्न, अंक और कट-ऑफ` : `${examName} exam pattern, marks & cut-off`;
  const description =
    lang === 'hi'
      ? `${examName} का आधिकारिक पैटर्न, नेगेटिव मार्किंग, समय, आयु सीमा, तिथियाँ और कट-ऑफ, हर आँकड़े के साथ उसका स्रोत और ${formatHubDate(lastVerified, lang)} का सत्यापन।`
      : `${examName} official pattern, negative marking, timing, age limit, dates and cut-offs, each figure linked to its source and last verified on ${formatHubDate(lastVerified, lang)}.`;
  return { title, description, lastVerified, h1: t.h1(examName) };
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
