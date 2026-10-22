// Official-document links that need help to open. The Railway portal answers a document link opened cold with a
// "Request Rejected" page until its home page has been visited once in that browser (checked again 22 Oct 2026: a
// fresh session gets the rejection, the same session after one home-page visit gets the PDF). The link stays direct -
// it is the document - and every page that shows one carries a hint (check-public-pages.mjs enforces it). The Android
// app does the same (OfficialLinks.kt in the app repo); keep the two host lists in step.
export const NEEDS_HOME_VISIT = { 'rrb.indianrailways.gov.in': 'https://rrb.indianrailways.gov.in/' };

/** { host, home } when this link only opens after a home-page visit, else null. */
export function homeVisitFor(url) {
  let host = '';
  try {
    host = new URL(url).host;
  } catch {
    return null;
  }
  const home = NEEDS_HOME_VISIT[host];
  return home ? { host, home } : null;
}

/** An inline hint, in brackets, to follow such a link; empty for every other link. */
export function homeVisitHint(url, lang) {
  const hit = homeVisitFor(url);
  if (!hit) return '';
  return lang === 'hi'
    ? ` (यदि “Request Rejected” दिखे तो पहले <a href="${hit.home}" target="_blank" rel="noreferrer">${hit.host}</a> खोलें, फिर लिंक दोबारा खोलें।)`
    : ` (If it shows “Request Rejected”, open <a href="${hit.home}" target="_blank" rel="noreferrer">${hit.host}</a> first, then the link again.)`;
}

/** One sentence covering a list of links (a table), when any of them needs the home-page visit; else empty. */
export function homeVisitNote(urls, lang) {
  const hit = urls.map(homeVisitFor).find(Boolean);
  if (!hit) return '';
  return lang === 'hi'
    ? `${hit.host} के दस्तावेज़: यदि “Request Rejected” दिखे तो पहले <a href="${hit.home}" target="_blank" rel="noreferrer">${hit.host}</a> खोलें, फिर लिंक दोबारा खोलें।`
    : `Documents on ${hit.host}: if one shows “Request Rejected”, open <a href="${hit.home}" target="_blank" rel="noreferrer">${hit.host}</a> first, then the link again.`;
}
