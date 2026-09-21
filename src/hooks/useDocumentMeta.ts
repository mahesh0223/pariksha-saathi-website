import { useEffect } from 'react';

const SITE_NAME = 'Pariksha Saathi';
const SITE_URL = 'https://parikshasaathi.com';

interface DocumentMetaOptions {
  title: string;
  description: string;
  path: string; // e.g. "/app/current-affairs/abc123"
  type?: 'website' | 'article';
  structuredData?: object;
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

function setStructuredData(data: object | undefined) {
  const existing = document.getElementById('structured-data');
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Every page that represents real, shareable content (an article, a notice, the homepage) should
// carry its own title/description/canonical rather than reusing index.html's site-wide defaults -
// this drives what search results and shared links actually show. The prerender script
// (scripts/prerender.mjs) bakes the same tags into the static HTML for crawlers that don't run
// JS; this hook keeps them correct for real browsers navigating client-side afterward, and is the
// only mechanism at all for pages that only ever exist client-side (the app's non-content screens).
export function useDocumentMeta({ title, description, path, type = 'website', structuredData }: DocumentMetaOptions) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('name', 'twitter:card', 'summary');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setCanonical(url);
    setStructuredData(structuredData);
  }, [title, description, path, type, structuredData]);
}
