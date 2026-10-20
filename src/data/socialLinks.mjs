// The brand's own social profiles (owner confirmed YouTube and Instagram are theirs and active on 19 Oct 2026, and the
// Telegram channel - which the server's 07:00 digest posts to - on 20 Oct 2026). One list for the visible footer links
// and the schema.org `sameAs` on the homepage, so the two can never disagree.
export const TELEGRAM_CHANNEL_URL = 'https://t.me/parikshasaathiapp';
// The Join button on /telegram/ (the paid-promotion landing page). Set it to a named invite link from Manage Channel ->
// Invite Links (e.g. "Insta Ads") and Telegram counts the joins it brings; until then it is the public channel.
export const TELEGRAM_JOIN_URL = TELEGRAM_CHANNEL_URL;

export const SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@ParikshaSathiApp' },
  { label: 'Instagram', href: 'https://www.instagram.com/parkishasathi/' },
  { label: 'Telegram', href: TELEGRAM_CHANNEL_URL },
];

export const SOCIAL_HREFS = SOCIAL_LINKS.map((link) => link.href);

/** Footer anchors for the static (prerendered) pages; rel="me" marks them as the site's own profiles. */
export function socialLinksHtml() {
  return SOCIAL_LINKS.map((link) => `<a href="${link.href}" target="_blank" rel="me noopener">${link.label}</a>`).join('');
}
