// How src/data/lessonCatalogHi.mjs (the slim Hindi lesson catalog behind /hi/learn/) is derived from
// topicLessons.mjs. Lives here so scripts/gen-lesson-catalog-hi.mjs (which writes the file) and
// scripts/check-public-pages.mjs (which fails the build when the file is stale) use the same rule.
//
// The card title is the Hindi page title. The card description is the lede's first sentence; when
// that sentence runs long (92 of 144 do), it is cut at the last clause boundary before 190 characters.
const MAX_FULL_SENTENCE = 200;
const CUT_AT = 190;

export function deriveHindiCatalogEntry(entry) {
  const lede = entry.hi.lede.trim();
  const dandaAt = lede.indexOf('।');
  let description = (dandaAt < 0 ? lede : lede.slice(0, dandaAt)).trim();
  if (description.length > MAX_FULL_SENTENCE) {
    const cut = Math.max(
      description.lastIndexOf(' — ', CUT_AT),
      description.lastIndexOf(': ', CUT_AT),
      description.lastIndexOf('; ', CUT_AT),
      description.lastIndexOf(', ', CUT_AT),
    );
    description = (cut > 60 ? description.slice(0, cut) : description.slice(0, CUT_AT).replace(/\s+\S*$/, '')).trim() + '…';
  } else {
    description += '।';
  }
  return { slug: entry.slug, title: entry.hi.pageTitle, description };
}
