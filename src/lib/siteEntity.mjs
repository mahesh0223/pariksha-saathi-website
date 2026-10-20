// The site as one entity, for search engines and AI answer engines (ChatGPT, Gemini, Perplexity, Copilot) that
// decide what Pariksha Saathi is from its schema.org markup. ONE definition, shared by the prerendered home page
// (scripts/prerender.mjs) and the React home page (src/pages/HomePage.tsx, whose useDocumentMeta replaces the
// prerendered JSON-LD once it mounts), so the two can never describe the site differently.
// Only claims that are true today: the description repeats the home page's own FAQ ("Is Pariksha Saathi free?" -
// yes, no paywalled content) and its sourcing promise; the app entity appears only once the Play listing is public.
import { SITE_ALT_NAMES } from './seoMeta.mjs';
import { EXAM_NAMES } from './examNames.mjs';
import { SOCIAL_HREFS } from '../data/socialLinks.mjs';
import { PLAY_STORE_URL } from '../data/siteLinks.mjs';
import { HUB_EXAM_IDS } from '../data/examHubExams.mjs';

export const SITE_URL = 'https://parikshasaathi.com';
export const SITE_NAME = 'Pariksha Saathi';
export const SITE_DESCRIPTION =
  'Free Hindi and English preparation for Indian government job exams - SSC, banking (IBPS, SBI), railways (RRB), ' +
  'state police, CTET, Agniveer and state PSCs - with every exam fact, current-affairs item and exam notice linked to ' +
  'its official source. An independent project, not affiliated with any exam body or government department.';

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: SITE_ALT_NAMES,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'hi'],
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: SITE_ALT_NAMES,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/icon-512.png`,
    description: SITE_DESCRIPTION,
    areaServed: { '@type': 'Country', name: 'India' },
    knowsLanguage: ['en', 'hi'],
    knowsAbout: HUB_EXAM_IDS.map((id) => EXAM_NAMES[id]),
    sameAs: PLAY_STORE_URL ? [...SOCIAL_HREFS, PLAY_STORE_URL] : SOCIAL_HREFS,
  };
}

// The Android app, described only once it can be installed (PLAY_STORE_URL is empty while the app is in closed
// testing): an answer engine that recommends an app nobody can download sends readers to a dead end.
export function mobileAppJsonLd() {
  if (!PLAY_STORE_URL) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: SITE_NAME,
    alternateName: SITE_ALT_NAMES,
    operatingSystem: 'Android',
    applicationCategory: 'EducationalApplication',
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'hi'],
    installUrl: PLAY_STORE_URL,
    url: PLAY_STORE_URL,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

/** WebSite + Organization (+ MobileApplication once the app is public), for the home page. */
export function homeEntityJsonLd() {
  const app = mobileAppJsonLd();
  return app ? [websiteJsonLd(), organizationJsonLd(), app] : [websiteJsonLd(), organizationJsonLd()];
}
