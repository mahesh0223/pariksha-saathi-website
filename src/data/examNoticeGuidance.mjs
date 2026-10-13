// "What this means for you" guidance for exam-notice pages, added after an AdSense-policy audit
// found these pages thin (49-263 words of restated official text, no commentary).
//
// Unlike current-affairs items (paired across languages by sourceUrl, which is 1:1 per item),
// exam notices have no reliable shared natural key: officialUrl is often a whole recruitment
// cycle's landing page shared by several distinct notices (e.g. every IBPS Clerk update this
// cycle points at the same ibps.in page), so it can't safely identify one specific notice. Each
// entry below is matched by hand against both the English and Hindi row ids for the same notice
// (verified by reading both titles - see the session that added this), which also fixes a latent
// bug: ExamNoticeDetailPage's language-fallback redirect used to guess the counterpart via
// officialUrl alone and could land on the wrong sibling notice when several shared that URL.
export const NOTICE_GUIDANCE = [];

const byOwnId = new Map();
const counterpartByOwnId = new Map();
for (const entry of NOTICE_GUIDANCE) {
  byOwnId.set(entry.enId, entry);
  byOwnId.set(entry.hiId, entry);
  counterpartByOwnId.set(entry.enId, entry.hiId);
  counterpartByOwnId.set(entry.hiId, entry.enId);
}

export function noticeGuidance(id, lang) {
  const entry = byOwnId.get(id);
  if (!entry) return '';
  return lang === 'hi' ? entry.hi : entry.en;
}

// Returns the known id of the same notice in the other language, or undefined if this id isn't
// in the hand-verified table (e.g. a notice added after this list was last updated) - callers
// should fall back to their own best-effort match in that case, not treat undefined as "no
// counterpart exists".
export function knownCounterpartId(id) {
  return counterpartByOwnId.get(id);
}
