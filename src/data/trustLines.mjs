// The landing page's trust strip - one source for src/pages/HomePage.tsx, scripts/prerender.mjs's
// homePageBody, the Hindi landing page (hindiHome.mjs) and the "What you can count on" list on
// /about/, so the copies cannot drift (the stats used to live in both HomePage.tsx and prerender.mjs).
//
// Every line is a claim that is true today and nothing more (decision of 2026-10-15, recorded in the
// roadmap): we do NOT promise "no ads" or "no upsell" while AdSense, AdMob and a Premium tier remain
// options in docs/marketing-plan-2026-10.md. scripts/check-public-pages.mjs fails the build if an
// ads promise appears in the strip. Change the wording here only with the publisher's sign-off.
import { DIRECTORY_EXAM_IDS } from '../lib/examDirectory.mjs';

export const TRUST_STATS = {
  en: [
    { value: String(DIRECTORY_EXAM_IDS.length), label: 'exams covered' },
    { value: '100%', label: 'free, no paywall' },
    { value: 'EN / HI', label: 'both languages' },
    { value: 'Offline', label: 'in the Android app' },
  ],
  hi: [
    { value: String(DIRECTORY_EXAM_IDS.length), label: 'परीक्षाएँ शामिल' },
    { value: '100%', label: 'मुफ़्त, कोई पेवॉल नहीं' },
    { value: 'EN / HI', label: 'दोनों भाषाएँ' },
    { value: 'ऑफ़लाइन', label: 'Android ऐप में' },
  ],
};

// Plain text only (no &, <, >, quotes) - check-public-pages.mjs looks for these lines verbatim in the built HTML.
export const TRUST_LINES = {
  en: [
    'No calls: we never ask for your phone number.',
    'No loan or EMI upsell.',
    'No account needed to read.',
    'Every exam fact and news item linked to its official source.',
  ],
  hi: [
    'कोई फ़ोन कॉल नहीं: हम आपका नंबर माँगते ही नहीं।',
    'लोन या EMI का कोई ऑफ़र नहीं।',
    'पढ़ने के लिए खाता ज़रूरी नहीं।',
    'हर परीक्षा-तथ्य और ख़बर अपने आधिकारिक स्रोत से लिंक।',
  ],
};

export const TRUST_LINES_LABEL = { en: 'What you can count on', hi: 'जिस पर आप भरोसा कर सकते हैं' };

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function trustStatsHtml(lang = 'en') {
  const stats = TRUST_STATS[lang] ?? TRUST_STATS.en;
  return `<div class="trust-bar">${stats
    .map((s) => `<div class="trust-stat"><div class="trust-value">${esc(s.value)}</div><div class="trust-label">${esc(s.label)}</div></div>`)
    .join('')}</div>`;
}

export function trustLinesHtml(lang = 'en') {
  const lines = TRUST_LINES[lang] ?? TRUST_LINES.en;
  return `<ul class="trust-lines" aria-label="${esc(TRUST_LINES_LABEL[lang] ?? TRUST_LINES_LABEL.en)}">${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`;
}
