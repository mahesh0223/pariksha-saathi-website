import { SOCIAL_LINKS } from '../../data/socialLinks.mjs';

/** The brand's YouTube and Instagram profiles, for the public footers (mirrors socialLinksHtml()). */
export function SocialLinks() {
  return (
    <>
      {SOCIAL_LINKS.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="me noopener">
          {link.label}
        </a>
      ))}
    </>
  );
}
