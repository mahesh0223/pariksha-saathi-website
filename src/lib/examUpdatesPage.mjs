// One exam's admit card, result and answer-key notices (/exams/<exam>/admit-card-result/ and the /hi/ twin): every
// notice of that kind published on the site, newest first, each with our summary, the official link and the notice
// page; the other notices for the exam; the key dates from the cycle's fact sheet; and an FAQ ("Is the admit card
// out?") answered from those notices as of the build date. Plain HTML, no app script. A section with no notice says so
// plainly rather than padding. Data: the same /v1/exam-updates and /v1/exams/:id/facts the exam hub uses.
import { examsLinkHtml } from './examDirectory.mjs';
import { examHubPath, examUpdatesPath, formatHubDate } from './examHubPath.mjs';
import { hubTitleName } from './examHub.mjs';
import { homeVisitHint, homeVisitNote } from './officialLink.mjs';
import { PYQ_INDEX_EXAMS, pyqIndexPath } from './pyqPath.mjs';
import { socialLinksHtml } from '../data/socialLinks.mjs';
import { telegramCtaHtml } from './telegramCta.mjs';
import { metaDescription } from './seoMeta.mjs';
import { isSscExam, sscHindiLabels } from '../data/hindiGlossary.mjs';

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
const pick = (bilingual, lang) => bilingual?.[lang] ?? bilingual?.en ?? '';
const hostOf = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return '';
  }
};
// A summary cut to its first sentences, about 280 characters, never mid-word and never after an abbreviation
// ("Advt. No.", "Rs.") mistaken for a sentence end.
const ABBREVIATIONS = /\b(No|Nos|Advt|Rs|Dr|Mr|Mrs|Ms|Shri|Smt|St|Govt|Dept|vs|etc|i\.e|e\.g)\.$/i;
function excerpt(text, max = 280) {
  const s = String(text ?? '').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  let stop = -1;
  for (const m of cut.matchAll(/[.।](?=\s)/g)) {
    if (m[0] === '।' || !ABBREVIATIONS.test(cut.slice(0, m.index + 1))) stop = m.index;
  }
  return stop > 120 ? cut.slice(0, stop + 1) : `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
const newestFirst = (a, b) => String(b.lastVerifiedAt).localeCompare(String(a.lastVerifiedAt));

const T = {
  en: {
    title: (name) => `${name} Admit Card, Result and Answer Key: Official Notices`,
    h1: (name) => `${name} admit card, result and answer key`,
    description: (exam, cycle) => `Every ${exam} admit card, result and answer-key notice published on Pariksha Saathi, newest first, each linked to the official document, with the ${cycle} key dates from the official notice.`,
    lede: (exam, cycle, today) => `Every admit-card, result and answer-key notice for ${exam} that Pariksha Saathi has published, newest first. Each one links to our summary and to the official document. Below them are the other notices for this exam and the key dates from the ${cycle} notice. Last updated ${today}.`,
    back: (exam) => `${exam} exam page`,
    sections: { ADMIT_CARD: 'Admit card', RESULT: 'Result', ANSWER_KEY: 'Answer key' },
    none: { ADMIT_CARD: (cycle) => `There is no admit-card notice for ${cycle} on this site.`, RESULT: (cycle) => `There is no result notice for ${cycle} on this site.`, ANSWER_KEY: (cycle) => `There is no answer-key notice for ${cycle} on this site.` },
    firstStage: (stage, when) => `As per the notice, ${stage}: ${when}.`,
    pastKeys: (exam) => `Past answer keys: every ${exam} paper we have solved, with SSC's official answers`,
    others: 'Other notices for this exam',
    type: { NOTIFICATION: 'notification', ADMIT_CARD: 'admit card', ANSWER_KEY: 'answer key', RESULT: 'result', DEADLINE: 'deadline' },
    verified: 'verified',
    official: 'Official document',
    summary: 'Our summary and what it means for you',
    dates: 'Key dates',
    event: 'Event',
    date: 'Date',
    source: 'Source',
    lastVerified: 'last verified',
    span: (from, to) => (to ? `${from} to ${to}` : from),
    faqTitle: 'Frequently asked questions',
    faq: {
      admit: (exam) => `Is the ${exam} admit card out?`,
      result: (exam) => `Is the ${exam} result out?`,
      where: (exam) => `Where can I download the ${exam} admit card and result?`,
      yes: (title, date) => `Yes. The latest admit-card notice on this site: ${title} (${date}).`,
      yesResult: (title, date) => `Yes. The latest result notice on this site: ${title} (${date}).`,
      none: (kind, cycle, today, host) => `This site has no ${kind} notice for ${cycle} (checked ${today}). It is announced on the official website, ${host}; check there.`,
      whereA: (host) => `From the exam body's official website, ${host}, or the download portal it links to. Each notice on this page links the exact official document.`,
    },
    more: { hub: 'Exam pattern, syllabus, cut-offs and dates', all: 'All exam notices' },
    langSwitch: 'हिंदी में पढ़ें',
  },
  hi: {
    title: (name) => `${name} एडमिट कार्ड, रिज़ल्ट और आंसर की: आधिकारिक सूचनाएँ`,
    h1: (name) => `${name} एडमिट कार्ड, रिज़ल्ट और आंसर की`,
    description: (exam, cycle) => `Pariksha Saathi पर प्रकाशित ${exam} की हर एडमिट कार्ड, रिज़ल्ट और आंसर की सूचना, सबसे नई पहले, हर एक आधिकारिक दस्तावेज़ से जुड़ी, साथ में ${cycle} की आधिकारिक अधिसूचना की मुख्य तिथियाँ।`,
    lede: (exam, cycle, today) => `${exam} के प्रवेश पत्र, परिणाम और उत्तर कुंजी की हर सूचना जो Pariksha Saathi ने प्रकाशित की है, सबसे नई पहले। हर सूचना हमारे सारांश और आधिकारिक दस्तावेज़ से जुड़ी है। नीचे इस परीक्षा की अन्य सूचनाएँ और ${cycle} की अधिसूचना की मुख्य तिथियाँ हैं। अंतिम अपडेट ${today}।`,
    back: (exam) => `${exam} परीक्षा पेज`,
    sections: { ADMIT_CARD: 'प्रवेश पत्र (एडमिट कार्ड)', RESULT: 'परिणाम (रिज़ल्ट)', ANSWER_KEY: 'उत्तर कुंजी (आंसर की)' },
    none: { ADMIT_CARD: (cycle) => `इस साइट पर ${cycle} की कोई प्रवेश पत्र सूचना नहीं है।`, RESULT: (cycle) => `इस साइट पर ${cycle} की कोई परिणाम सूचना नहीं है।`, ANSWER_KEY: (cycle) => `इस साइट पर ${cycle} की कोई उत्तर कुंजी सूचना नहीं है।` },
    firstStage: (stage, when) => `अधिसूचना के अनुसार ${stage}: ${when}।`,
    pastKeys: (exam) => `पिछली उत्तर कुंजियाँ: ${exam} के हमारे हल किए हर प्रश्नपत्र, SSC के आधिकारिक उत्तरों सहित`,
    others: 'इस परीक्षा की अन्य सूचनाएँ',
    type: { NOTIFICATION: 'अधिसूचना', ADMIT_CARD: 'प्रवेश पत्र', ANSWER_KEY: 'उत्तर कुंजी', RESULT: 'परिणाम', DEADLINE: 'अंतिम तिथि' },
    verified: 'सत्यापित',
    official: 'आधिकारिक दस्तावेज़',
    summary: 'हमारा सारांश और आपके लिए इसका मतलब',
    dates: 'मुख्य तिथियाँ',
    event: 'घटना',
    date: 'तिथि',
    source: 'स्रोत',
    lastVerified: 'अंतिम सत्यापन',
    span: (from, to) => (to ? `${from} से ${to} तक` : from),
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    faq: {
      admit: (exam) => `क्या ${exam} का प्रवेश पत्र (एडमिट कार्ड) आ गया है?`,
      result: (exam) => `क्या ${exam} का परिणाम (रिज़ल्ट) आ गया है?`,
      where: (exam) => `${exam} का प्रवेश पत्र (एडमिट कार्ड) और परिणाम कहाँ से डाउनलोड करें?`,
      yes: (title, date) => `हाँ। इस साइट पर सबसे नई प्रवेश पत्र सूचना: ${title} (${date})।`,
      yesResult: (title, date) => `हाँ। इस साइट पर सबसे नई परिणाम सूचना: ${title} (${date})।`,
      none: (kind, cycle, today, host) => `इस साइट पर ${cycle} की कोई ${kind} सूचना नहीं है (${today} को देखा गया)। इसकी घोषणा आधिकारिक वेबसाइट ${host} पर होती है; वहीं देखें।`,
      whereA: (host) => `परीक्षा निकाय की आधिकारिक वेबसाइट ${host} से, या वहाँ दिए गए डाउनलोड पोर्टल से। इस पेज की हर सूचना सटीक आधिकारिक दस्तावेज़ से जुड़ी है।`,
    },
    more: { hub: 'परीक्षा पैटर्न, पाठ्यक्रम, कट-ऑफ और तिथियाँ', all: 'सभी परीक्षा सूचनाएँ' },
    langSwitch: 'Read in English',
  },
};

function context({ examName, facts, notices, lang, now }) {
  const fact = facts[0];
  const name = hubTitleName(examName, fact, lang);
  const sorted = [...notices].sort(newestFirst);
  const byType = (type) => sorted.filter((n) => n.type === type);
  return {
    fact,
    name,
    sorted,
    admit: byType('ADMIT_CARD'),
    result: byType('RESULT'),
    answer: byType('ANSWER_KEY'),
    other: sorted.filter((n) => !['ADMIT_CARD', 'RESULT', 'ANSWER_KEY'].includes(n.type)),
    today: formatHubDate(now.toISOString().slice(0, 10), lang),
    host: hostOf(fact.sourceUrl),
  };
}

// SSC pages' Hindi says विज्ञप्ति for the notice (src/data/hindiGlossary.mjs).
const SSC_T_HI = sscHindiLabels(T.hi);
const labels = (lang, examId) => (lang === 'hi' && isSscExam(examId) ? SSC_T_HI : T[lang]);

export function examUpdatesMeta({ examName, facts, notices = [], lang = 'en', now = new Date() }) {
  const t = T[lang];
  const c = context({ examName, facts, notices, lang, now });
  return { title: t.title(c.name), h1: t.h1(c.name), description: metaDescription(t.description(examName, c.fact.cycleLabel)) };
}

export function examUpdatesFaq({ examName, facts, notices = [], lang = 'en', now = new Date() }) {
  const t = labels(lang, facts[0]?.examId);
  const c = context({ examName, facts, notices, lang, now });
  const latest = (list, yes) => (list.length > 0 ? yes(list[0].title, formatHubDate(list[0].lastVerifiedAt, lang)) : null);
  return [
    { q: t.faq.admit(examName), a: latest(c.admit, t.faq.yes) ?? t.faq.none(t.type.ADMIT_CARD, c.fact.cycleLabel, c.today, c.host) },
    { q: t.faq.result(examName), a: latest(c.result, t.faq.yesResult) ?? t.faq.none(t.type.RESULT, c.fact.cycleLabel, c.today, c.host) },
    { q: t.faq.where(examName), a: t.faq.whereA(c.host) },
  ];
}

function noticeItem(n, lang, t) {
  return `<li><a href="/app/exam-notices/${esc(n.id)}/">${esc(n.title)}</a><span>${esc(t.type[n.type] ?? n.type)} · ${t.verified} ${esc(formatHubDate(n.lastVerifiedAt, lang))}</span><p class="hub-facts">${esc(excerpt(n.summary))}</p><p class="hub-source"><a href="${esc(n.officialUrl)}" target="_blank" rel="noreferrer">${t.official} &#8599;</a>${homeVisitHint(n.officialUrl, lang)} · <a href="/app/exam-notices/${esc(n.id)}/">${t.summary} &rarr;</a></p></li>`;
}

export function examUpdatesBody({ examName, facts, notices = [], lang = 'en', now = new Date() }) {
  const t = labels(lang, facts[0]?.examId);
  const c = context({ examName, facts, notices, lang, now });
  const { fact } = c;
  const hub = examHubPath(fact.examId, lang);
  const first = (fact.dates ?? []).find((d) => d.role === 'firstStage');
  const firstWhen = first ? (first.text ? pick(first.text, lang) : first.from ? t.span(formatHubDate(first.from, lang), first.to && String(first.to).slice(0, 10) !== String(first.from).slice(0, 10) ? formatHubDate(first.to, lang) : null) : '') : '';
  const firstStageLine = first && firstWhen ? ` ${t.firstStage(pick(first.label ?? fact.stages[0].name, lang), firstWhen)}` : '';

  const section = (type, list) => {
    let html = `<h2>${t.sections[type]}</h2>`;
    if (list.length > 0) html += `<ul class="hub-notices">${list.map((n) => noticeItem(n, lang, t)).join('')}</ul>`;
    else html += `<p class="hub-facts">${esc(t.none[type](fact.cycleLabel))}${type === 'ADMIT_CARD' ? esc(firstStageLine) : ''}</p>`;
    if (type === 'ANSWER_KEY' && PYQ_INDEX_EXAMS.includes(fact.examId)) html += `<p><a href="${pyqIndexPath(fact.examId, lang)}">${esc(t.pastKeys(examName))} &rarr;</a></p>`;
    return html;
  };

  const dates = fact.dates ?? [];
  const dateRows = dates
    .map((d) => {
      const when = d.text ? esc(pick(d.text, lang)) : esc(t.span(formatHubDate(d.from, lang), d.to && String(d.to).slice(0, 10) !== String(d.from).slice(0, 10) ? formatHubDate(d.to, lang) : null));
      return `<tr><td>${esc(pick(d.label, lang))}</td><td>${when}</td><td><a href="${esc(d.sourceUrl ?? fact.sourceUrl)}" target="_blank" rel="noreferrer">${t.official} &#8599;</a></td></tr>`;
    })
    .join('');
  const visit = homeVisitNote([fact.sourceUrl, ...dates.map((d) => d.sourceUrl).filter(Boolean)], lang);

  return `<div class="compare-page">
  <header class="pub-header">
    <div class="wrap pub-nav">
      <a class="pub-brand" href="${lang === 'hi' ? '/hi/' : '/'}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
      <nav class="pub-nav-links"><a href="/app/exam-notices/">${lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices'}</a><a href="/app/current-affairs/">${lang === 'hi' ? 'करंट अफेयर्स' : 'Current affairs'}</a></nav>
      ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}</a>
    </div>
  </header>
  <article class="wrap compare-article">
    <div class="compare-top-row"><a href="${hub}" class="detail-back">&larr; ${esc(t.back(examName))}</a><a class="compare-lang-switch" href="${examUpdatesPath(fact.examId, lang === 'hi' ? 'en' : 'hi')}">${t.langSwitch}</a></div>
    <h1>${esc(t.h1(c.name))}</h1>
    <p class="compare-lede">${esc(t.lede(examName, fact.cycleLabel, c.today))}</p>
    ${section('ADMIT_CARD', c.admit)}
    ${section('RESULT', c.result)}
    ${section('ANSWER_KEY', c.answer)}
    ${c.other.length > 0 ? `<h2>${t.others}</h2><ul class="hub-notices">${c.other.map((n) => noticeItem(n, lang, t)).join('')}</ul>` : ''}
    ${dateRows ? `<h2>${t.dates}</h2><div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>${t.event}</th><th>${t.date}</th><th>${t.official}</th></tr></thead><tbody>${dateRows}</tbody></table></div>` : ''}
    <p class="hub-source">${t.source}: <a href="${esc(fact.sourceUrl)}" target="_blank" rel="noreferrer">${esc(fact.noticeTitle)} &#8599;</a> · ${t.lastVerified} ${esc(formatHubDate(fact.verifiedAt, lang))}</p>
    ${visit ? `<p class="exam-dir-note">${visit}</p>` : ''}
    ${telegramCtaHtml(lang)}
    <h2>${t.faqTitle}</h2>
    <div class="hub-faq">${examUpdatesFaq({ examName, facts, notices, lang, now }).map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}</div>
    <ul class="compare-links">
      <li><a href="${hub}">${t.more.hub}</a></li>
      <li><a href="/app/exam-notices/">${t.more.all}</a></li>
    </ul>
  </article>
  <footer class="pub-footer">
    <div class="wrap pub-footer-links">
      <a href="/about/">About &amp; editorial standards</a><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a><a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
    ${socialLinksHtml()}</div>
  </footer>
</div>`;
}

export function examUpdatesStructuredData({ examName, facts, notices = [], lang = 'en', siteUrl, now = new Date() }) {
  const meta = examUpdatesMeta({ examName, facts, notices, lang, now });
  const fact = facts[0];
  const path = examUpdatesPath(fact.examId, lang);
  return [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: meta.h1, description: meta.description, url: `${siteUrl}${path}`, inLanguage: lang, dateModified: now.toISOString().slice(0, 10), publisher: { '@type': 'Organization', name: 'Pariksha Saathi', url: siteUrl } },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'hi' ? 'होम' : 'Home', item: `${siteUrl}${lang === 'hi' ? '/hi/' : '/'}` },
        { '@type': 'ListItem', position: 2, name: examName, item: `${siteUrl}${examHubPath(fact.examId, lang)}` },
        { '@type': 'ListItem', position: 3, name: meta.h1, item: `${siteUrl}${path}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: examUpdatesFaq({ examName, facts, notices, lang, now }).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
}
