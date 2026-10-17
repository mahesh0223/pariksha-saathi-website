// The exam calendar (/exams/calendar/ and /hi/exams/calendar/): one dated table across every hub exam,
// built ONLY from dates the exam bodies themselves fixed - ExamFact.dates (from the notification) and the
// importantDates of published notices - each row linked to the document it was read from. Plain .mjs so
// scripts/prerender.mjs and the React page share one builder (same arrangement as examDirectory.mjs).
import { EXAM_NAMES } from './examNames.mjs';
import { MONTHS, examHubPath, formatHubDate } from './examHubPath.mjs';

export const CALENDAR_LINK = {
  en: { href: '/exams/calendar/', label: 'Exam calendar' },
  hi: { href: '/hi/exams/calendar/', label: 'परीक्षा कैलेंडर' },
};

export function examCalendarPath(lang) {
  return CALENDAR_LINK[lang === 'hi' ? 'hi' : 'en'].href;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// A date the body itself calls tentative, proposed or expected is a plan, not a fixture. We do not
// publish guesses - such rows stay out until the body fixes the date (working plan T10).
export const UNCERTAIN_DATE = /\b(tentative(?:ly)?|proposed|expected|likely|probable|indicative)\b|अनुमानित|प्रस्तावित|संभावित|सम्भावित/i;

const T = {
  en: {
    exams: 'Exams',
    switchLabel: 'हिंदी में पढ़ें',
    h1: 'Exam calendar',
    lede: (n, exams) =>
      `${n} dated steps across ${exams} exams - application windows, exam days, admit cards, results - each copied from the exam body's own notice or calendar and linked to it. Only dates the body has fixed: anything it calls tentative or proposed is left out until it is.`,
    date: 'Date',
    exam: 'Exam',
    step: 'What happens',
    source: 'Source',
    range: (a, b) => `${a} to ${b}`,
    checked: 'checked',
    official: 'Official document',
    empty: 'No fixed dates on record from this month onwards yet. New notices add rows as soon as they are checked.',
    note: 'This month onwards only. The source of each row is the document the date was read from; "checked" is the day we last compared the row against it. Dates already past this month stay listed so you can see what just closed.',
  },
  hi: {
    exams: 'परीक्षाएँ',
    switchLabel: 'Read in English',
    h1: 'परीक्षा कैलेंडर',
    lede: (n, exams) =>
      `${exams} परीक्षाओं के ${n} तय चरण - आवेदन अवधि, परीक्षा तिथि, प्रवेश पत्र, परिणाम - हर एक परीक्षा निकाय की अपनी सूचना या कैलेंडर से उतारा हुआ और उसी से जुड़ा। सिर्फ़ वे तिथियाँ जो निकाय ने तय कर दी हैं: जिसे वह अनुमानित या प्रस्तावित कहता है, वह तय होने तक यहाँ नहीं है।`,
    date: 'तिथि',
    exam: 'परीक्षा',
    step: 'क्या होगा',
    source: 'स्रोत',
    range: (a, b) => `${a} से ${b} तक`,
    checked: 'जाँचा',
    official: 'आधिकारिक दस्तावेज़',
    empty: 'इस महीने से आगे की कोई तय तिथि अभी दर्ज नहीं। नई सूचनाएँ जाँचते ही पंक्तियाँ जुड़ती हैं।',
    note: 'सिर्फ़ इस महीने से आगे। हर पंक्ति का स्रोत वही दस्तावेज़ है जिससे तिथि पढ़ी गई; "जाँचा" वह दिन है जब हमने पंक्ति को उससे आख़िरी बार मिलाया। इस महीने की बीती तिथियाँ भी दिखती हैं ताकि पता रहे क्या अभी बंद हुआ।',
  },
};

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function monthLabel(key, lang) {
  const [y, m] = key.split('-').map(Number);
  return `${(MONTHS[lang] ?? MONTHS.en)[m - 1]} ${y}`;
}

/**
 * Rows grouped by month, this month onwards, newest-first within nothing - oldest date first.
 * factsByExam: examId -> ExamFact[] (newest first, as the API returns); noticesByExam: examId -> notices
 * in the page's language; today: "YYYY-MM-DD" (IST for the build). A row needs a real YYYY-MM-DD, a label
 * free of tentative/proposed wording, and a source URL; duplicates (same exam, date and label) collapse.
 */
export function calendarRows({ factsByExam = {}, noticesByExam = {}, lang = 'en', today }) {
  const windowStart = `${String(today).slice(0, 7)}-01`;
  const rows = [];
  const seen = new Set();
  const push = (row) => {
    if (!row.sourceUrl) return;
    const key = `${row.examId}|${row.date}|${row.label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    rows.push(row);
  };

  for (const [examId, facts] of Object.entries(factsByExam)) {
    const fact = Array.isArray(facts) ? facts[0] : null;
    if (!fact) continue;
    for (const d of fact.dates ?? []) {
      if (!d || !ISO_DATE.test(String(d.from ?? ''))) continue;
      const label = d.label?.[lang] ?? d.label?.en;
      if (!label) continue;
      if (UNCERTAIN_DATE.test(label) || UNCERTAIN_DATE.test(d.label?.en ?? '') || UNCERTAIN_DATE.test(d.text?.en ?? '')) continue;
      const to = ISO_DATE.test(String(d.to ?? '')) ? d.to : null;
      if ((to ?? d.from) < windowStart) continue;
      push({ examId, date: d.from, to, label, sourceUrl: d.sourceUrl ?? fact.sourceUrl, verifiedAt: String(fact.verifiedAt).slice(0, 10), origin: 'fact' });
    }
  }

  for (const [examId, notices] of Object.entries(noticesByExam)) {
    for (const notice of notices ?? []) {
      for (const [label, value] of Object.entries(notice.importantDates ?? {})) {
        if (!ISO_DATE.test(String(value)) || UNCERTAIN_DATE.test(label) || value < windowStart) continue;
        push({ examId, date: value, to: null, label, sourceUrl: notice.officialUrl, verifiedAt: String(notice.lastVerifiedAt).slice(0, 10), origin: 'notice' });
      }
    }
  }

  const name = (examId) => EXAM_NAMES[examId] ?? examId;
  rows.sort((a, b) => a.date.localeCompare(b.date) || name(a.examId).localeCompare(name(b.examId)) || a.label.localeCompare(b.label));

  const groups = [];
  for (const row of rows) {
    const key = row.date.slice(0, 7);
    let group = groups.at(-1);
    if (!group || group.key !== key) {
      group = { key, label: monthLabel(key, lang), rows: [] };
      groups.push(group);
    }
    group.rows.push(row);
  }
  return groups;
}

export function calendarSummary(groups) {
  const rows = groups.flatMap((g) => g.rows);
  return {
    total: rows.length,
    examCount: new Set(rows.map((r) => r.examId)).size,
    lastVerified: rows.map((r) => r.verifiedAt).sort().at(-1),
  };
}

export function examCalendarBody({ groups, lang = 'en' }) {
  const t = T[lang] ?? T.en;
  const { total, examCount } = calendarSummary(groups);
  const otherPath = examCalendarPath(lang === 'hi' ? 'en' : 'hi');
  let html = `<div class="compare-top-row"><a href="${lang === 'hi' ? '/hi/exams/' : '/exams/'}" class="detail-back">&larr; ${t.exams}</a><a href="${otherPath}" class="compare-lang-switch">${t.switchLabel}</a></div>`;
  html += `<h1>${t.h1}</h1><p class="compare-lede">${esc(t.lede(total, examCount))}</p>`;
  if (total === 0) html += `<p class="exam-dir-note">${esc(t.empty)}</p>`;
  for (const group of groups) {
    html += `<h2 class="calendar-month">${esc(group.label)}</h2><div class="hub-table-wrap"><table class="hub-table calendar-table"><thead><tr><th>${t.date}</th><th>${t.exam}</th><th>${t.step}</th><th>${t.source}</th></tr></thead><tbody>`;
    for (const row of group.rows) {
      const when = row.to && row.to !== row.date ? t.range(formatHubDate(row.date, lang), formatHubDate(row.to, lang)) : formatHubDate(row.date, lang);
      html += `<tr><td class="cal-date">${esc(when)}</td><td><a href="${examHubPath(row.examId, lang)}">${esc(EXAM_NAMES[row.examId] ?? row.examId)}</a></td><td>${esc(row.label)}</td><td class="cal-source"><a href="${esc(row.sourceUrl)}" rel="noopener">${t.official}</a><br><span>${t.checked} ${esc(row.verifiedAt)}</span></td></tr>`;
    }
    html += `</tbody></table></div>`;
  }
  html += `<p class="exam-dir-note">${esc(t.note)}</p>`;
  return html;
}

export function examCalendarMeta(lang, { total, examCount }) {
  return lang === 'hi'
    ? {
        title: 'परीक्षा कैलेंडर: SSC, बैंकिंग, रेलवे, पुलिस और PSC की आधिकारिक तिथियाँ',
        description: `इस महीने से आगे ${examCount} परीक्षाओं की ${total} तय तिथियाँ, हर एक उसी आधिकारिक सूचना से जुड़ी जिससे वह पढ़ी गई। कोई अनुमानित तिथि नहीं।`,
      }
    : {
        title: 'Exam calendar: official dates for SSC, banking, railway, police and PSC exams',
        description: `${total} fixed dates across ${examCount} exams this month onwards, each linked to the official notice it was read from. No tentative dates.`,
      };
}
