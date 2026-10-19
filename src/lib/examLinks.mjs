// Turns the exam names in a lesson's "Where this comes up" paragraph into links to those exams' pages.
// The lessons earn most of the site's non-brand search impressions; linking them to the exam pages (whose
// "exam pattern" searches sat at positions 16-35 in Oct 2026) passes that standing on and gives readers the
// next step. Shared by scripts/prerender.mjs and LessonArticlePage so the static and hydrated HTML match.
import { EXAM_NAMES } from './examNames.mjs';
import { examHubPath } from './examHubPath.mjs';
import { HUB_EXAM_IDS } from '../data/examHubExams.mjs';

// How the Hindi lessons write exam names that differ from the English short names.
const HINDI_NAMES = {
  ibps_clerk: ['IBPS क्लर्क'],
  sbi_clerk: ['SBI क्लर्क'],
  up_police: ['UP पुलिस'],
  bihar_police: ['बिहार पुलिस'],
  mp_police: ['MP पुलिस'],
  rajasthan_police: ['राजस्थान पुलिस'],
  rrb_group_d: ['RRB ग्रुप डी'],
  agniveer_army: ['अग्निवीर'],
};

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ALIASES = []; // [name, examId], longest first so "IBPS Clerk" wins over any shorter overlap
for (const id of HUB_EXAM_IDS) {
  if (EXAM_NAMES[id]) ALIASES.push([EXAM_NAMES[id], id]);
  for (const name of HINDI_NAMES[id] ?? []) ALIASES.push([name, id]);
}
ALIASES.sort((a, b) => b[0].length - a[0].length);
const ID_BY_NAME = new Map(ALIASES.map(([name, id]) => [escapeHtml(name), id]));
const PATTERN = new RegExp(`(?<![\\p{L}\\p{M}])(${ALIASES.map(([name]) => escapeRe(escapeHtml(name))).join('|')})(?![\\p{L}\\p{M}])`, 'gu');

/** Escaped HTML of `text` with the first mention of each exam linked to that exam's page in `lang`. */
export function linkExamNames(text, lang = 'en') {
  const seen = new Set();
  return escapeHtml(text ?? '').replace(PATTERN, (match) => {
    const id = ID_BY_NAME.get(match);
    if (!id || seen.has(id)) return match;
    seen.add(id);
    return `<a href="${examHubPath(id, lang)}">${match}</a>`;
  });
}
