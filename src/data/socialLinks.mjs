// The brand's own social profiles (owner confirmed both are theirs and active, 19 Oct 2026). One list for the
// visible footer links and the schema.org `sameAs` on the homepage, so the two can never disagree.
export const SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@ParikshaSathiApp' },
  { label: 'Instagram', href: 'https://www.instagram.com/parkishasathi/' },
];

export const SOCIAL_HREFS = SOCIAL_LINKS.map((link) => link.href);

/** Footer anchors for the static (prerendered) pages; rel="me" marks them as the site's own profiles. */
export function socialLinksHtml() {
  return SOCIAL_LINKS.map((link) => `<a href="${link.href}" target="_blank" rel="me noopener">${link.label}</a>`).join('');
}
