import { useEffect } from 'react';

const SITE_NAME = 'Pariksha Saathi';
const SITE_URL = 'https://parikshasaathi.com';
// Reused from the Play Store listing (public/assets/feature-graphic-1024x500.png) - already
// on-brand and at a social-card-friendly ratio, so sharing a link gets a real preview image
// instead of a blank one.
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/feature-graphic-1024x500.png`;

interface DocumentMetaOptions {
  title: string;
  description: string;
  path: string; // e.g. "/app/current-affairs/abc123"
  type?: 'website' | 'article';
  robots?: string;
  structuredData?: object | object[];
  /** BCP 47 tag for this page's own content, e.g. "hi". Defaults to "en" (matches index.html). */
  lang?: string;
  /** Other language versions of this same page, for hreflang - e.g. the English page passes its
   * Hindi counterpart's path and vice versa, so Google can serve searchers the version in their
   * language instead of treating them as duplicate/competing pages. */
  alternateLanguages?: { lang: string; path: string }[];
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function setAlternateLanguages(alternates: { lang: string; path: string }[] | undefined) {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  if (!alternates?.length) return;
  for (const alt of alternates) {
    const el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', alt.lang);
    el.setAttribute('href', `${SITE_URL}${alt.path}`);
    el.dataset.hreflang = 'true';
    document.head.appendChild(el);
  }
}

// Accepts one object or several (e.g. an Article plus a BreadcrumbList) - each gets its own
// <script> tag, which is valid JSON-LD and avoids wrapping everything in an artificial @graph.
function setStructuredData(data: object | object[] | undefined) {
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  if (!data) return;
  for (const entry of Array.isArray(data) ? data : [data]) {
    const script = document.createElement('script');
    script.dataset.structuredData = 'true';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
  }
}

// Every page that represents real, shareable content (an article, a notice, the homepage) should
// carry its own title/description/canonical rather than reusing index.html's site-wide defaults -
// this drives what search results and shared links actually show. The prerender script
// (scripts/prerender.mjs) bakes the same tags into the static HTML for crawlers that don't run
// JS; this hook keeps them correct for real browsers navigating client-side afterward, and is the
// only mechanism at all for pages that only ever exist client-side (the app's non-content screens).
export function useDocumentMeta({
  title,
  description,
  path,
  type = 'website',
  robots = 'index,follow',
  structuredData,
  lang = 'en',
  alternateLanguages,
}: DocumentMetaOptions) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMetaTag('name', 'robots', robots);
    document.documentElement.lang = lang;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);
    setMetaTag('property', 'og:image:width', '1024');
    setMetaTag('property', 'og:image:height', '500');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', DEFAULT_OG_IMAGE);
    setCanonical(url);
    setStructuredData(structuredData);
    setAlternateLanguages(alternateLanguages);

    return () => {
      // Reset to the document's default language when this page unmounts (e.g. navigating from a
      // Hindi page to an English one) - otherwise the <html lang> sticks past this page's own life.
      document.documentElement.lang = 'en';
    };
  }, [title, description, path, type, robots, structuredData, lang, alternateLanguages]);
}
