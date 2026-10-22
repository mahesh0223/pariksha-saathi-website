// Old one-question pages (/q/<slug>/ and /hi/q/<slug>/, built until 22 Oct 2026) -> the same question on its topic
// list, as /q/<topic>/page-N/#<slug>. Import-free on purpose: the Cloudflare Pages Functions in functions/q/ and
// functions/hi/q/ bundle this with the map in src/data/questionRedirects.mjs (scripts/gen-question-redirects.mjs
// writes it from src/lib/questionRedirectsBuild.mjs; check:public fails if it is stale).

/**
 * map: { topics: [topicSlug], en: { questionSlug: 'topicIndex.page' }, hi: { ... } }.
 * Returns the redirect target for an old question-page path, or null for anything else (the index, a topic list).
 */
export function questionRedirectTarget(map, pathname) {
  const m = /^\/(hi\/)?q\/([a-z0-9-]+)\/?$/.exec(pathname);
  if (!m) return null;
  const lang = m[1] ? 'hi' : 'en';
  if (!Object.hasOwn(map[lang], m[2])) return null;
  const [topicIndex, page] = map[lang][m[2]].split('.').map(Number);
  return `${lang === 'hi' ? '/hi' : ''}/q/${map.topics[topicIndex]}/${page > 1 ? `page-${page}/` : ''}#${m[2]}`;
}

/** The Pages Function body: a permanent redirect for an old question page, the static file for everything else. */
export function questionRedirectResponse(context, map) {
  const url = new URL(context.request.url);
  const target = questionRedirectTarget(map, url.pathname);
  return target ? Response.redirect(`${url.origin}${target}`, 301) : context.next();
}
