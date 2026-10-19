// Which practice questions get their own public page (/q/<slug>/), decided at generation time by
// scripts/gen-question-pages.mjs - never in the production API, whose 256 MB machine was OOM-killed on
// 19 Oct 2026 when it tried to do this in-process.
//
// The owner's call (19 Oct 2026): pages for DISTINCT questions only. Most of the bank is template variants -
// 1,999 English questions share "Three of the following four belong to a group...", and others swap only
// names ("Sunita is Rahul's mother..."), letters ("D = G <= F < E") or a quoted sentence ("Change ... to
// passive voice: '...'") - and thousands of near-identical pages are what Google's "scaled content abuse"
// spam policy targets. A bank question qualifies when
//   - its shape (questionShape) is used by at most SHAPE_MAX_USES published questions of its language and topic;
//   - its explanation is longer than MIN_EXPLANATION_CHARS - the page has to teach, not just state an answer;
//   - it is not a current-affairs quiz question (each already shows on its item's own page);
//   - it is not one of the GK questions the 15 Oct fact-check flagged as wrong;
//   - in Hindi, which has no capitals to find names by, a question with an English twin qualifies only if
//     that twin does.

export const SHAPE_MAX_USES = 3;
export const MIN_EXPLANATION_CHARS = 81;

/** A question's template shape: the parts a template swaps are masked, runs of masks collapsed, 60 characters. */
export function questionShape(text) {
  return String(text)
    .replace(/[‘'"“][^‘'"“”’]{2,}[’'"”]/g, '#') // quoted sentences or words
    .replace(/₹|Rs\.?/g, '')
    .replace(/\p{Nd}+(?:\.\p{Nd}+)?/gu, '#') // numbers, any script
    .replace(/\b[A-Z][a-z]+(?:'s)?\b/g, '#') // capitalised words: names, places
    .replace(/\b[A-Z]\b/g, '#') // single-letter variables
    .replace(/[<>=≤≥+\-−×÷]+/g, '#') // comparison and arithmetic signs
    .replace(/#(?:[\s,#]*#)*/g, '#')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);
}

/**
 * Selection over ONE topic's published rows in one language: { id, topicKey, text, explLen, pairKey }.
 * `excluded` holds "lang|text" keys; `eligibleTwinPairKeys` (Hindi only) the pair keys whose English twin passed.
 */
export function selectEligible(rows, languageCode, excluded = new Set(), eligibleTwinPairKeys = null) {
  const uses = new Map();
  for (const row of rows) {
    const shape = questionShape(row.text);
    uses.set(shape, (uses.get(shape) ?? 0) + 1);
  }
  return rows
    .filter((row) => !String(row.topicKey).startsWith('CURRENT_AFFAIRS_'))
    .filter((row) => uses.get(questionShape(row.text)) <= SHAPE_MAX_USES)
    .filter((row) => Number(row.explLen) >= MIN_EXPLANATION_CHARS)
    .filter((row) => !excluded.has(`${languageCode}|${row.text}`))
    .filter((row) => !eligibleTwinPairKeys || !row.pairKey || eligibleTwinPairKeys.has(row.pairKey));
}

/** First `max` characters of a question, cut at a word, for list and "more questions" links. */
export function questionSnippet(text, max = 140) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > 60 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

/** URL slug of a topic key: SYLLOGISM_POSSIBILITY -> syllogism-possibility. */
export function topicSlug(topicKey) {
  return String(topicKey).toLowerCase().replace(/_/g, '-');
}
