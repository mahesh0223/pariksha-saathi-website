// Caps a <title>-tag string to a length that won't truncate in Google's search results (~60
// characters once " | Pariksha Saathi" is appended, so a ~42-char budget for the title itself).
// Never touches the on-page H1 or structured-data headline, which stay as the full, authentic
// wording - this exists only for pages whose real title (a government notification, a press
// release headline) regularly runs well past that, same reasoning as src/lib/seoNoticeTitle.ts.
// Plain .mjs (not .ts) so scripts/prerender.mjs can import it directly alongside the .tsx pages -
// see that file's own header comment for why it can't import .tsx sources.
export function shortenTitle(title, maxLen = 42) {
  if (title.length <= maxLen) return title;
  let cut = title.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  cut = cut.replace(/[,;:.\-–—]+$/, '').trimEnd();
  return `${cut}…`;
}
