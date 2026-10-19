// Search-snippet helpers shared by scripts/prerender.mjs and the React pages' useDocumentMeta calls, so the
// static HTML Google crawls and the head React writes after hydration always agree. Plain .mjs (with a .d.mts)
// for the same reason as seoTitle.mjs.

export const SITE_NAME = 'Pariksha Saathi';

// Other ways people type the name (Search Console, Oct 2026: "pariksha sathi" alone had 759 impressions and
// a 0.4% click rate). Declared as schema.org alternateName on the WebSite and Organization entries - the
// sanctioned way to tell Google about name variants - never stuffed into visible copy.
export const SITE_ALT_NAMES = ['Pariksha Sathi', 'परीक्षा साथी'];

// Titles and descriptions for the site's three busiest index pages, shared by prerender and the React pages.
export const PAGE_META = {
  home: {
    title: 'Pariksha Saathi: Free SSC, Bank, Railway & Police Exam Prep',
    description: 'Free Hindi and English prep for 21 government exams: SSC, IBPS, SBI, RRB, state police, CTET and state PSCs. Lessons, mock tests and daily current affairs.',
  },
  currentAffairs: {
    title: 'Daily Current Affairs for SSC, Bank & Railway Exams',
    description: 'Daily current affairs in Hindi and English for SSC, Bank, Railway and Police exams: each item dated, linked to its official source, with a quiz question.',
  },
  examNotices: {
    title: 'Admit Card, Result & Exam Date Alerts: SSC, Bank, RRB, Police',
    description: "Official notifications, admit cards, results and exam dates for SSC, IBPS, SBI, RRB, police, CTET and PSC exams, checked against each exam body's site.",
  },
};

/** "<title> | Pariksha Saathi", unless the title already carries the site name. */
export function withSiteName(title) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

/**
 * A meta description that never stops mid-word. Short text is returned as is (whitespace collapsed).
 * Longer text is cut after the last full sentence that ends between 100 characters and `max` (a shorter
 * opening sentence wastes the snippet); failing that,
 * at the last word boundary before `max - 1`, with an ellipsis.
 */
export function metaDescription(text, max = 155) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const window = clean.slice(0, max + 1);
  let best = -1;
  for (const m of window.matchAll(/[.!?।](?=\s)/g)) {
    if (m.index + 1 >= 100 && m.index + 1 <= max) best = m.index + 1;
  }
  if (best > 0) return clean.slice(0, best);
  let cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 40) cut = cut.slice(0, lastSpace);
  return `${cut.replace(/[,;:\-–—(]+$/, '').trimEnd()}…`;
}

// Search-facing <title> text for the lessons that already earn the most impressions but almost no clicks
// (Search Console, last 90 days to 17 Oct 2026, positions 6-11). Each title uses the words people search
// ("formula", "can be / can never be", "upstream") and promises only what the lesson contains -
// seoMeta.test.mjs checks every promised term against the lesson text. The on-page H1 keeps the lesson's
// own heading. English only: the Hindi titles already carry the Hindi query terms.
export const LESSON_SEO_TITLES = {
  'coding-decoding': { en: 'Coding-Decoding: Letter Shift Method & Solved Questions' },
  'compound-interest-half-yearly-quarterly': { en: 'Compound Interest Half-Yearly & Quarterly Formula' },
  'syllogism-possibility-cases': { en: "Syllogism Possibility: 'Can Be' and 'Can Never Be' Cases" },
  'ranking-and-order': { en: 'Ranking and Order: Position Formula & Solved Questions' },
  'boat-and-stream': { en: 'Boat and Stream Formula: Upstream & Downstream Questions' },
  'alphabet-series': { en: 'Alphabet Series: Letter Positions & Solved Questions' },
  'bankers-discount-true-discount': { en: "True Discount & Banker's Discount: Formula and Examples" },
  'wrong-number-series': { en: 'Wrong Number Series: Find the Wrong Term (Solved)' },
  'profit-and-loss': { en: 'Profit and Loss Formulas with Solved Questions' },
  'percentages': { en: 'Percentage Formulas & Successive Change: Solved Questions' },
  'data-sufficiency': { en: 'Data Sufficiency: Statement I & II Solved Questions' },
  'course-of-action': { en: 'Statement and Course of Action: Solved Questions' },
};

// The words each title above promises; the test requires every one to appear in that lesson's English text.
export const LESSON_SEO_TITLE_TERMS = {
  'coding-decoding': ['letter', 'shift'],
  'compound-interest-half-yearly-quarterly': ['formula', 'half-yearly', 'quarterly'],
  'syllogism-possibility-cases': ['possibility', 'can be', 'can never be'],
  'ranking-and-order': ['position', 'formula'],
  'boat-and-stream': ['formula', 'upstream', 'downstream'],
  'alphabet-series': ['position'],
  'bankers-discount-true-discount': ['true discount', "banker", 'formula'],
  'wrong-number-series': ['wrong'],
  'profit-and-loss': ['formula'],
  'percentages': ['formula', 'successive'],
  'data-sufficiency': ['statement i', 'statement ii'],
  'course-of-action': ['statement', 'course of action'],
};

/** The <title> text for a lesson page: the search-tuned title when one exists, else the lesson's own title. */
export function lessonSeoTitle(slug, lang, fallback) {
  return LESSON_SEO_TITLES[slug]?.[lang] ?? fallback;
}
