// Route path -> PUBLIC_PAGES key, for the entry bundle's route table and its preloadRoute() in
// App.tsx. Deliberately separate from publicPages.mjs, which carries every static page's copy, the
// lesson catalog in both languages and the Hindi landing page (~30 KB compressed) and belongs in
// PublicPage's own chunk, not in the entry every visitor downloads. Mirrors publicPageMeta(key).path
// the way examSyllabusSlugs.mjs mirrors examSyllabi.mjs; scripts/check-public-pages.mjs fails the
// build if the two drift.
//
// Why one map rather than a route list plus a regex: until 2026-10-17 App.tsx matched the preload
// with a hand-written regex of English paths. /hi/ was added to publicPages.mjs and to the route table
// but not to that regex, so the prerendered Hindi landing page mounted before its chunk had loaded
// and was replaced by a spinner for the whole download. Deriving both from this map makes that
// drift impossible.
export const PUBLIC_PAGE_ROUTES = {
  '/learn': 'learn',
  '/hi': 'hi',
  '/hi/learn': 'hi-learn',
  '/about': 'about',
  '/privacy': 'privacy',
  '/contact': 'contact',
  '/downloads': 'downloads',
  '/terms': 'terms',
  '/account-deletion': 'account-deletion',
};
