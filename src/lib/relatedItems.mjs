// "Current affairs from the surrounding days" on every item page - the two items published just
// before and the two just after, in the page's own language. Before this, each of the ~150 item
// pages per language was a leaf reachable only from the one listing page and the sitemap, and
// Search Console (16 Oct 2026) showed 140 of them "Discovered - currently not indexed". Linking
// each item to its neighbours turns the archive into one crawlable chain and gives every page a
// few more words that are specific to it. Shared by the prerender and the React page so both
// render the same markup.
import { formatHubDate } from './examHub.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const byDate = (a, b) => (a.editionDate < b.editionDate ? -1 : a.editionDate > b.editionDate ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

/** The `count` chronological neighbours of `item` within `items` (same language), oldest first. */
export function relatedItems(items, item, count = 4) {
  const sorted = items.filter((i) => i.id !== item.id).sort(byDate);
  let firstAfter = sorted.findIndex((i) => byDate(i, item) > 0);
  if (firstAfter === -1) firstAfter = sorted.length;
  const half = Math.ceil(count / 2);
  let after = sorted.slice(firstAfter, firstAfter + half);
  let before = sorted.slice(Math.max(0, firstAfter - (count - after.length)), firstAfter);
  if (before.length + after.length < count) after = sorted.slice(firstAfter, firstAfter + (count - before.length));
  return [...before, ...after];
}

const TEXT = {
  en: { title: 'Current affairs from the surrounding days', all: 'All current affairs' },
  hi: { title: 'आस-पास के दिनों के करेंट अफेयर्स', all: 'सभी करेंट अफेयर्स' },
};

export function relatedItemsHtml(items, item, lang = 'en') {
  const related = relatedItems(items, item);
  if (related.length === 0) return '';
  const t = TEXT[lang] ?? TEXT.en;
  const rows = related
    .map((i) => `<li><a href="/app/current-affairs/${esc(i.id)}/">${esc(i.title)}</a><span>${esc(formatHubDate(i.editionDate, lang))}</span></li>`)
    .join('');
  return `<section class="detail-related"><h2>${t.title}</h2><ul>${rows}</ul><p><a href="/app/current-affairs/">${t.all} &rarr;</a></p></section>`;
}
