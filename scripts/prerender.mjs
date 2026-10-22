#!/usr/bin/env node
// Runs after `vite build` (see package.json's "build" script). This is a pure client-rendered SPA
// - without this step, every URL serves the same empty <div id="root"> shell and a search/AdSense
// crawler that doesn't execute JS (or budgets it low) sees no real content at all. This script
// fetches the live content API and writes a real, crawlable static HTML file for every article -
// full title/description/canonical/structured-data in <head>, full visible text in <body> - at
// the exact URL path the SPA itself uses. Cloudflare Pages serves a matching static file before
// falling back to the SPA's catch-all _redirects rule, so these are what a crawler (or a visitor
// with JS disabled) sees first; once the bundle loads, React mounts over the same DOM and the app
// becomes fully interactive, refetching live to stay current between rebuilds.
//
// Consequence worth remembering: this bakes content in at BUILD time. A reseed on the backend
// does not appear here until the site is rebuilt/redeployed too.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
// Plain .mjs (not .ts) specifically so this works on whatever Node version Cloudflare Pages'
// build image runs - an earlier version of this imported the .ts file directly, relying on
// Node's native TypeScript type-stripping (unflagged only on very recent Node), which silently
// broke production: the build never errors out visibly to us, Cloudflare just keeps serving the
// last successful deploy forever. These .mjs files are the single source of truth for the
// syllabus/lesson pages' EN/HI content either way, shared with the React components under
// src/pages/ - just without compile-time typing on the data shape.
import { currentAffairsDigest, learningNote } from '../src/data/currentAffairsReading.mjs';
import { knownCounterpartId, noticeGuidance } from '../src/data/examNoticeGuidance.mjs';
import { PUBLIC_PAGES, publicPageBody, publicPageMeta, publicPageStructuredData } from '../src/data/publicPages.mjs';
import { trustLinesHtml, trustStatsHtml } from '../src/data/trustLines.mjs';
import { EXAM_SYLLABI } from '../src/data/examSyllabi.mjs';
import { EXAM_JOB_PROFILES } from '../src/data/examJobProfiles.mjs';
import { shortenTitle } from '../src/lib/seoTitle.mjs';
import { PAGE_META, lessonSeoTitle, metaDescription, withSiteName } from '../src/lib/seoMeta.mjs';
import { linkExamNames } from '../src/lib/examLinks.mjs';
import { lessonQuestionListLink } from '../src/lib/questionTopicLink.mjs';
import { QUESTION_PAGES_GENERATED, QUESTION_TOPICS } from '../src/data/questionTopics.mjs';
import { QUESTION_SUBJECTS_HI } from '../src/data/lessonSubjects.mjs';
import { TOPIC_PAGE_SIZE, groupByTopic, questionIndexBody, questionIndexMeta, questionIndexPath, topicListBody, topicListMeta, topicListPath, topicListStructuredData } from '../src/lib/questionPage.mjs';
import { questionRedirectTarget } from '../src/lib/questionRedirects.mjs';
import { QUESTION_REDIRECTS } from '../src/data/questionRedirects.mjs';
import { EXAM_NAMES } from '../src/lib/examNames.mjs';
import { examHubBody, examHubMeta, examHubPath, examHubSlug, examHubStructuredData, hubItems } from '../src/lib/examHub.mjs';
import { relatedItemsHtml } from '../src/lib/relatedItems.mjs';
import { telegramCtaHtml } from '../src/lib/telegramCta.mjs';
import { TELEGRAM_PAGE_PATH, telegramPageBody, telegramPageMeta } from '../src/lib/telegramPage.mjs';
import { pyqPaperBody, pyqPaperMeta, pyqPaperStructuredData } from '../src/lib/pyqPage.mjs';
import { PYQ_INDEX_EXAMS, pyqIndexPath, pyqPaperPath } from '../src/lib/pyqPath.mjs';
import { homeVisitHint } from '../src/lib/officialLink.mjs';
import { examUpdatesBody, examUpdatesMeta, examUpdatesStructuredData } from '../src/lib/examUpdatesPage.mjs';
import { examUpdatesPath } from '../src/lib/examHubPath.mjs';
import { pyqIndexBody, pyqIndexMeta, pyqIndexStructuredData } from '../src/lib/pyqIndexPage.mjs';
import { reportQuestionLinkHtml } from '../src/lib/reportQuestion.mjs';
import { HUB_EXAM_IDS, hubExamIdForSlug, HUB_LINK_LABEL } from '../src/data/examHubExams.mjs';
import { LESSON_CATALOG } from '../src/data/lessonCatalog.mjs';
import { lessonAuthor, lessonClosing, lessonCredit, subjectBlurb } from '../src/lib/lessonCredit.mjs';
import { dailyPdfBand } from '../src/lib/dailyPdf.mjs';
import { DIRECTORY_EXAM_IDS, examDirectoryBody, examDirectoryMeta, examDirectoryPath, examDirectoryStructuredData, examsLinkHtml } from '../src/lib/examDirectory.mjs';
import { calendarRows, calendarSummary, examCalendarBody, examCalendarMeta, examCalendarPath } from '../src/lib/examCalendar.mjs';
import { GK_INSIGHTS_PUBLISHED, gkInsightsBody, gkInsightsMeta, gkInsightsPath } from '../src/lib/gkInsights.mjs';
import { PLAY_STORE_URL } from '../src/data/siteLinks.mjs';
import { typingTestMeta, typingTestPath, typingTestStaticHtml } from '../src/lib/typingPage.mjs';
import { TYPING_CHECKED } from '../src/data/typingTest.mjs';
// The exams whose pages link to the typing / data-entry practice (their notices prescribe a skill test).
const TYPING_TEST_EXAMS = ['ssc_cgl', 'ssc_chsl'];
import { TOPIC_LESSONS } from '../src/data/topicLessons.mjs';
import { socialLinksHtml } from '../src/data/socialLinks.mjs';
import { homeEntityJsonLd } from '../src/lib/siteEntity.mjs';
import { llmsTxt } from '../src/lib/llmsTxt.mjs';
import { llmsFullTxt } from '../src/lib/llmsFullTxt.mjs';

const DIST = join(process.cwd(), 'dist');
const SITE_URL = 'https://parikshasaathi.com';
// PRERENDER_API_BASE points a local build at a local backend for routes not deployed to production yet.
const API_BASE = process.env.PRERENDER_API_BASE ?? 'https://api.parikshasaathi.com';

// Every API call in this script goes through fetch(). A server deploy restarts the API for ~80-100 s, and a
// Cloudflare build that lands in that window used to die on an empty 502 body ("Unexpected end of JSON input" -
// it happened twice on 17 Oct 2026, the second time silently leaving the live site one commit behind). So API
// requests are retried on a network error, a timeout or a 5xx, every 20 s for up to ~2 minutes, before the
// build is allowed to fail. Non-API requests and 4xx answers pass straight through.
{
  const realFetch = globalThis.fetch;
  const ATTEMPTS = 7;
  const WAIT_MS = 20_000;
  globalThis.fetch = async (url, init = {}) => {
    if (!String(url).startsWith(API_BASE)) return realFetch(url, init);
    let lastError;
    for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
      try {
        const response = await realFetch(url, { ...init, signal: init.signal ?? AbortSignal.timeout(30_000) });
        if (response.status < 500) return response;
        lastError = new Error(`HTTP ${response.status}`);
      } catch (error) {
        lastError = error;
      }
      if (attempt < ATTEMPTS) {
        console.warn(`API ${url} failed (${lastError.message}); retrying in ${WAIT_MS / 1000}s (${attempt}/${ATTEMPTS - 1})`);
        await new Promise((resolve) => setTimeout(resolve, WAIT_MS));
      }
    }
    throw new Error(`API ${url} still failing after ${ATTEMPTS} attempts: ${lastError.message}`);
  };
}
const SITE_NAME = 'Pariksha Saathi';
// Real publish dates for static pages that have no per-entry date field of their own - taken from
// the git commit that actually shipped them (489ecf6 and 9232611), not guessed.
const SYLLABUS_PUBLISHED_DATE = '2026-10-01';
const JOB_PROFILE_PUBLISHED_DATE = '2026-10-13';
const IBPS_VS_SBI_PUBLISHED_DATE = '2026-10-01';

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Pulls everything a prerendered page's <head> must share with Vite's own index.html out of the
// built dist/index.html, so there is exactly one place (index.html) that decides fonts, PWA
// metadata and the entry script:
//   - sharedHead: the <!-- shared-head --> block (theme-color, font preloads, inline @font-face).
//   - css: the entry stylesheet's TEXT, inlined into a <style> on every page instead of linked -
//     at ~5 KB compressed, a separate render-blocking request costs more than it saves, and on a
//     slow 4G phone the extra round trip was most of the gap between HTML arrival and first paint.
//   - scriptTags: the entry <script type="module"> and the <link rel="modulepreload"> hints Vite
//     emitted for its statically imported chunks.
//   - manifestLink: the <link rel="manifest"> vite-plugin-pwa injected.
//   - shellHtml: Vite's index.html with the stylesheet inlined - becomes dist/spa.html.
//   - chunksFor(sourcePath): the hashed /assets/ URLs of a source module's chunk and its static
//     imports, from Vite's build manifest (vite.config.ts sets build.manifest). The static pages use
//     it to add a <link rel="modulepreload"> for their page component (and what it imports), so
//     those downloads start with the HTML rather than once the entry bundle has executed -
//     main.tsx's preloadRoute() then finds them already in flight, and React mounts that much sooner
//     over the markup already on screen.
function readBuiltAssets() {
  const html = readFileSync(join(DIST, 'index.html'), 'utf8');
  const script = html.match(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/)?.[0];
  const styleTag = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
  // HTML comments inside the block are documentation for index.html's reader - dropped here rather
  // than repeated in ~700 files.
  const sharedHead = html.match(/<!-- shared-head -->([\s\S]*?)<!-- \/shared-head -->/)?.[1]?.replace(/<!--[\s\S]*?-->\s*/g, '').trim();
  if (!script || !styleTag || !sharedHead) throw new Error('Could not find built script/style tags or the shared-head block in dist/index.html');
  const stylePath = join(DIST, styleTag[1]);
  const css = readFileSync(stylePath, 'utf8');
  const styleInline = `<style>${css}</style>`;
  const modulePreloads = [...html.matchAll(/<link rel="modulepreload"[^>]*>/g)].map((m) => m[0]);
  const manifestLink = html.match(/<link rel="manifest"[^>]*>/)?.[0] ?? '';
  // Kept on disk: the ~8,000 /q/ practice-question pages link it instead of inlining it (inlining 28 KB into
  // each would add ~200 MB to the deploy); every other page still inlines it for first paint.
  const manifest = JSON.parse(readFileSync(join(DIST, '.vite/manifest.json'), 'utf8'));
  // A module's chunk plus everything it statically imports (recursively), minus what the entry
  // already preloads: one <link> per URL the browser would otherwise discover a round trip later.
  const entryPreloaded = new Set(modulePreloads.map((tag) => tag.match(/href="([^"]+)"/)[1]));
  const chunksFor = (sourcePath, seen = new Set()) => {
    const chunk = manifest[sourcePath];
    if (!chunk) throw new Error(`dist/.vite/manifest.json has no chunk for ${sourcePath}`);
    const urls = [];
    // The entry (manifest key "index.html") is already the page's <script type="module">.
    if (!chunk.isEntry && !seen.has(chunk.file) && !entryPreloaded.has(`/${chunk.file}`)) {
      seen.add(chunk.file);
      urls.push(`/${chunk.file}`);
      for (const dep of chunk.imports ?? []) urls.push(...chunksFor(dep, seen));
    }
    return urls;
  };
  return {
    chunksFor,
    sharedHead,
    styleInline,
    styleLink: styleTag[0],
    scriptTags: [script, ...modulePreloads].join('\n    '),
    manifestLink,
    shellHtml: html.replace(styleTag[0], styleInline),
  };
}

// Current affairs and exam notices are genuine crawlable editorial content - not the gated,
// robots.txt-excluded app experience - so they get the same plain-article chrome as /learn/,
// /compare/* and /about/ (mirrors publicFrame() in src/data/publicPages.mjs and the live SPA's
// PublicContentLayout.tsx exactly) instead of the app shell's bottom tab bar and Account link.
// A reviewer or reader landing on a news capsule shouldn't see six links to app screens they
// can't use without onboarding first.
function publicContentFrame(innerHtml) {
  return `<div class="compare-page">
  <header class="pub-header">
    <div class="wrap pub-nav">
      <a class="pub-brand" href="/"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
      <nav class="pub-nav-links">
        <a href="/learn/">Lessons</a>
        <a href="/app/current-affairs/">Current affairs</a>
        <a href="/app/exam-notices/">Exam Notices</a>
      </nav>
      ${examsLinkHtml('en')}<a class="pub-cta" href="/onboarding/">Start studying</a>
    </div>
  </header>
  <main class="wrap public-content-main">${innerHtml}</main>
  <footer class="pub-footer">
    <div class="wrap pub-footer-links">
      <a href="/about/">About &amp; editorial standards</a>
      <a href="/privacy/">Privacy Policy</a>
      <a href="/terms/">Terms of Use</a>
      <a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
    ${socialLinksHtml()}</div>
  </footer>
</div>`;
}

function pill(text) {
  return `<span class="pill">${escapeHtml(text)}</span>`;
}

// Match the paused manual units in AdSlot.tsx.
function adSlot(_slot) { return ''; }

// Reused from the Play Store listing (public/assets/feature-graphic-1024x500.png) - matches
// src/hooks/useDocumentMeta.ts's DEFAULT_OG_IMAGE exactly, so a shared link looks the same
// whether it was crawled from the prerendered HTML or visited client-side.
const OG_IMAGE = `${SITE_URL}/assets/feature-graphic-1024x500.png`;

function page({ title, description, path, assets, bodyHtml, structuredData, type = 'article', lang = 'en', alternateLanguages, robots = 'index,follow', preload = [], inlineStyle = true, scripts = true }) {
  const fullTitle = withSiteName(title);
  const url = `${SITE_URL}${path}`;
  const ldEntries = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];
  const ld = ldEntries
    .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry).replaceAll('</', '<\\/')}</script>`)
    .join('\n    ');
  // Mirrors src/hooks/useDocumentMeta.ts's setAlternateLanguages exactly - lets Google serve
  // searchers the version in their language instead of treating EN/HI as duplicate pages.
  const hreflangLinks = (alternateLanguages ?? [])
    .map((alt) => `<link rel="alternate" hreflang="${alt.lang}" href="${SITE_URL}${alt.path}" />`)
    .join('\n    ');
  // Chunks this page is known to need (its lazy route component) - see chunksFor(). `crossorigin`
  // matches Vite's own module tags, so the preload and the later import() share one cache entry.
  const preloadLinks = preload.map((href) => `<link rel="modulepreload" crossorigin href="${href}">`).join('\n    ');
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/assets/icon-512.png" />
    <link rel="apple-touch-icon" href="/assets/icon-180.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="${robots}" />
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${url}" />
    ${hreflangLinks}
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="500" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    ${ld}
    ${assets.sharedHead}
    ${assets.manifestLink}
    <meta name="google-adsense-account" content="ca-pub-6818930282969815" />
    ${inlineStyle ? assets.styleInline : assets.styleLink}
    ${scripts ? assets.scriptTags : ''}
    ${preloadLinks}
  </head>
  <body>
    <div id="root">${bodyHtml}</div>
  </body>
</html>
`;
}

function writePage(relPath, html) {
  const dir = join(DIST, relPath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
}

// Pages through every published current-affairs item in one language via `offset`, not a single
// `?limit=100` call - see the 2026-10-13 incident note at this function's call site in main().
// `limit=100` per page (the API's own hard cap) keeps this to one request per 100 items.
async function fetchAllCurrentAffairs(lang = 'en') {
  const PAGE_SIZE = 100;
  const all = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const page = await fetch(`${API_BASE}/v1/current-affairs?lang=${lang}&limit=${PAGE_SIZE}&offset=${offset}`).then((r) => r.json());
    all.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  return all;
}

// Build-time guard against the exact failure mode of the 2026-10-13 incident: fetches the
// sitemap this same script last deployed and fails the build if any URL that sitemap listed is
// missing from the one about to replace it. A real content removal should go through this check
// deliberately (temporarily allow-list the URL here with a comment explaining why), not slip
// through silently the way the 100-item cap did.
async function assertNoPublishedUrlWentMissing(newSitemapUrls) {
  // A build pointed at a local backend (PRERENDER_API_BASE) has different item ids from production, so
  // comparing it with the live sitemap would only ever report noise. The guard stays on for every build
  // that reads the production API, which is the only kind that gets deployed.
  if (process.env.PRERENDER_API_BASE) {
    console.log('Skipping the published-URL check: this build reads a local backend, not production.');
    return;
  }
  let previousXml;
  try {
    previousXml = await fetch(`${SITE_URL}/sitemap.xml`).then((r) => (r.ok ? r.text() : ''));
  } catch {
    previousXml = ''; // offline/first-ever build - nothing to compare against yet.
  }
  const previousUrls = new Set([...previousXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE_URL, '')));
  const newUrls = new Set(newSitemapUrls.map((u) => u.loc));
  // An old one-question page (/q/<slug>/) folded into its topic list on 22 Oct 2026 is not missing: functions/q/
  // answers it with a 301 to the same question (src/lib/questionRedirects.mjs).
  // Nor is a page that is still built but left out of the sitemap on purpose (a noindexed page, e.g. an admit-card
  // page with no notice yet): it does not 404.
  const stillBuilt = (u) => u.endsWith('/') && existsSync(join(DIST, u, 'index.html'));
  const missing = [...previousUrls].filter((u) => !newUrls.has(u) && !questionRedirectTarget(QUESTION_REDIRECTS, u) && !stillBuilt(u));
  if (missing.length > 0) {
    throw new Error(
      `Build check failed: ${missing.length} previously-published URL(s) are missing from the new sitemap - ` +
      `this would 404 at origin a page Google may have already indexed. First few: ${missing.slice(0, 5).join(', ')}`,
    );
  }
}

// Mirrors src/components/HomeIcons.tsx's <path> data exactly - see that file for the source of
// truth on each icon's shape. Kept as plain SVG strings here since this script can't import TSX.
const ICONS = {
  book: '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5c-.8 0-1.5-.7-1.5-1.5v-13Z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13Z"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  checkNote: '<rect x="4.5" y="3.5" width="15" height="17" rx="1.8"/><path d="M8 9.5l2.3 2.3L16 6"/><path d="M8 15.5h8"/>',
  browser: '<rect x="3.5" y="4.5" width="17" height="15" rx="1.8"/><path d="M3.5 8.5h17"/><circle cx="6.2" cy="6.5" r="0.5" fill="currentColor" stroke="none"/><circle cx="8" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>',
  globe: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16"/><path d="M12 4c2.5 2.2 2.5 13.8 0 16M12 4c-2.5 2.2-2.5 13.8 0 16"/>',
  newspaper: '<rect x="3.5" y="5.5" width="13" height="13" rx="1.5"/><path d="M6.5 9h7M6.5 12h7M6.5 15h4.5"/><path d="M16.5 8.5H19c.55 0 1 .45 1 1v8a1.5 1.5 0 0 1-1.5 1.5h-10"/>',
  bookmark: '<path d="M6 4h12v16l-6-4-6 4V4Z"/>',
  guest: '<circle cx="12" cy="8.2" r="3.2"/><path d="M5 19.5c1-3.4 3.9-5.3 7-5.3s6 1.9 7 5.3"/>',
  calendarFlag: '<rect x="4" y="5" width="16" height="15" rx="1.8"/><path d="M4 9.5h16"/><path d="M8 3.2v3M16 3.2v3"/><path d="M9 13v5M9 13c1.3-.9 2.7-.9 4 0s2.7.9 4 0v-2.4c-1.3.9-2.7.9-4 0s-2.7-.9-4 0V13Z"/>',
  quizBubble: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"/><path d="M10 9.3c0-1 .9-1.8 2-1.8s2 .7 2 1.7c0 1.5-2 1.6-2 3.1"/><circle cx="12" cy="14.4" r="0.6" fill="currentColor" stroke="none"/>',
  digest: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
};
function icon(name) {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
}

// Mirrors src/lib/seoNoticeTitle.ts exactly - see that file for why this exists (a <title>-tag-only
// prefix built from the structured examId/type fields, never touching the on-page <h1>). The exam
// names themselves are shared with it via src/lib/examNames.mjs.
const TYPE_LABELS = {
  ADMIT_CARD: 'Admit Card', RESULT: 'Result', ANSWER_KEY: 'Answer Key',
  NOTIFICATION: 'Notification', DEADLINE: 'Deadline',
};
const TYPE_SYNONYMS = {
  ADMIT_CARD: /call letter|admit card/i,
  RESULT: /\bresult\b|\bscores?\b/i,
  ANSWER_KEY: /answer key/i,
  DEADLINE: /deadline|last date|extended/i,
};
function seoNoticeTitle(examId, type, title, year) {
  const examName = EXAM_NAMES[examId];
  const typeLabel = TYPE_LABELS[type];
  if (!examName || !typeLabel) return title;
  const lower = title.toLowerCase();
  const hasExam = lower.includes(examName.toLowerCase());
  const hasType = lower.includes(typeLabel.toLowerCase()) || (TYPE_SYNONYMS[type]?.test(title) ?? false);
  const examPart = hasExam ? '' : `${examName} `;
  const typePart = hasType ? '' : `${typeLabel} ${year}: `;
  // Real notification titles (and the exam/type prefix just added) can run well past what
  // Google displays before truncating - cap it, never touching the on-page title this is built
  // from.
  return shortenTitle(`${examPart}${typePart}${title}`);
}

// Mirrors src/pages/HomePage.tsx's content arrays and markup - kept in sync by hand since this
// script can't import TSX. If HomePage.tsx's copy changes, update this too.
const HOME_FEATURES = [
  { icon: 'book', accent: 'navy', title: 'Study, then practice', body: 'Topic-wise lessons across Reasoning, Quant, English and General Awareness, each followed by practice in the real exam pattern — negative marking included.' },
  { icon: 'target', accent: 'terracotta', title: 'Three ways to practice', body: 'Topic-wise quizzes for one weak spot, sectional tests by subject, or full-length mocks spanning your whole exam.' },
  { icon: 'checkNote', accent: 'sage', title: 'Learn from your mistakes', body: 'Every wrong answer lands in your Mistake Notebook automatically, with the topic you should focus on next.' },
  { icon: 'browser', accent: 'amber', title: 'Works right in your browser', body: 'No installs — study on any device with progress saved locally and available whenever you come back.' },
  { icon: 'globe', accent: 'navy', title: 'English or Hindi', body: 'Switch languages any time — no reinstalling, no separate site.' },
  { icon: 'newspaper', accent: 'terracotta', title: 'Real current affairs', body: 'Dated current-affairs capsules and official exam notifications, each with a source you can check yourself.' },
  { icon: 'bookmark', accent: 'sage', title: 'Mistake Notebook & Bookmarks', body: 'Build your own revision list from anything you get wrong or want to revisit.' },
  { icon: 'guest', accent: 'amber', title: 'No account required', body: 'Study fully as a guest. Create a free account only if you want progress backed up across devices.' },
  { icon: 'calendarFlag', accent: 'navy', title: '90-Day Challenge', body: 'A day-by-day plan across Foundation, Drills and Mock Gauntlet phases, with badges for streaks and subject mastery.' },
  { icon: 'quizBubble', accent: 'terracotta', title: 'Weekly Current Affairs Quiz', body: 'A quiz built entirely from that week’s real current-affairs items, so revision and current-affairs practice happen together.' },
  { icon: 'digest', accent: 'sage', title: 'Daily Digest', body: 'A short daily reading list pulled from the latest current affairs and exam notices, with an estimated read time.' },
];

const HOW_IT_WORKS = [
  { n: '1', title: 'Pick your exam(s)', body: 'Choose one or more of SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO or SBI Clerk. Add or change exams any time.' },
  { n: '2', title: 'Study, then practice', body: 'Work through topic-wise lessons, then practice the same topics as quizzes in the real exam pattern, negative marking included.' },
  { n: '3', title: 'Track and revise', body: 'Every wrong answer lands in your Mistake Notebook automatically, so revision stays focused on what you actually got wrong.' },
];

const EXAM_COVERAGE = [
  { name: 'SSC CGL', body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness. <a href="/compare/ssc-cgl-syllabus/">Full syllabus &amp; exam pattern &rarr;</a> · <a href="/compare/ssc-cgl-job-profile/">Job profile &amp; salary &rarr;</a>' },
  { name: 'SSC MTS', body: 'Focused lessons and practice across Numerical Ability, Reasoning and English, plus current-affairs coverage for General Awareness. <a href="/compare/ssc-mts-syllabus/">Full syllabus &amp; exam pattern &rarr;</a>' },
  { name: 'SSC CHSL', body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness. <a href="/compare/ssc-chsl-syllabus/">Full syllabus &amp; exam pattern &rarr;</a> · <a href="/compare/ssc-chsl-job-profile/">Job profile &amp; salary &rarr;</a>' },
  { name: 'IBPS PO', body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness. <a href="/compare/ibps-po-syllabus/">Full syllabus &amp; exam pattern &rarr;</a> · <a href="/compare/ibps-po-job-profile/">Job profile &amp; salary &rarr;</a>' },
  { name: 'IBPS Clerk', body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness. <a href="/compare/ibps-clerk-syllabus/">Full syllabus &amp; exam pattern &rarr;</a> · <a href="/compare/ibps-clerk-job-profile/">Job profile &amp; salary &rarr;</a>' },
  { name: 'SBI PO', body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking &amp; Economy Awareness. <a href="/compare/sbi-po-syllabus/">Full syllabus &amp; exam pattern &rarr;</a> · <a href="/compare/sbi-po-job-profile/">Job profile &amp; salary &rarr;</a>' },
  { name: 'SBI Clerk', body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for General &amp; Financial Awareness. <a href="/compare/sbi-clerk-syllabus/">Full syllabus &amp; exam pattern &rarr;</a> · <a href="/compare/sbi-clerk-job-profile/">Job profile &amp; salary &rarr;</a>' },
];

const FAQS = [
  { q: 'Is Pariksha Saathi free?', a: 'Yes. Every lesson, practice quiz, mock test and current-affairs capsule is free, with no paywalled content.' },
  { q: 'Do I need to create an account?', a: 'No. You can study fully as a guest, with progress saved locally on your device. Create a free account only if you want that progress backed up across devices.' },
  { q: 'Does it work offline?', a: 'The Android app does: lessons, quizzes and practice are bundled with it, so they keep working with patchy or no internet and sync again once you’re back online. This website needs an internet connection, but it saves your progress on your device between visits.' },
  { q: 'Is content available in Hindi?', a: 'Yes. Switch between English and Hindi any time, for the same content, without reinstalling or visiting a separate site.' },
  { q: 'Where does the current-affairs content come from?', a: 'Every current-affairs item and exam notification links to its original official source — PIB or the exam body’s own site — so you can verify it yourself.' },
  { q: 'Is Pariksha Saathi affiliated with SSC, IBPS or SBI?', a: 'No. Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body.' },
];

function homePageBody(affairsPreview, noticesPreview) {
  return `<div>
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="#top"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="#features">Features</a>
            <a href="/learn/">Learn</a>
            <a href="#current-affairs">Current Affairs</a>
            <a href="#faq">FAQ</a>
            <a href="/privacy/">Privacy</a>
            <a href="/hi/" lang="hi">हिंदी</a>
          </nav>
          ${examsLinkHtml('en')}<a class="pub-cta" href="/onboarding/">Start studying</a>
        </div>
      </header>
      <div id="top" class="hero">
        <div class="hero-rules"></div>
        <div class="wrap hero-grid">
          <div>
            <div class="eyebrow">SSC &middot; Banking &middot; Railways &middot; Police &middot; PSC</div>
            <h1>Exam prep that works even where <em>the signal doesn't.</em></h1>
            <p class="lede">Lessons, practice quizzes, mock tests, and real dated current affairs for SSC, banking, railway, state police, CTET and state PSC exams — free, right in your browser.</p>
            <div class="cta-row">
              <a class="btn-primary-cream" href="/onboarding/">Start studying free</a>
              <a class="btn-ghost-cream" href="#features">See what's inside</a>
            </div>
            <a class="hero-lang-switch" href="/hi/" lang="hi">यह पेज हिंदी में पढ़ें &rarr;</a>
            <div class="exam-pills">${[['ssc_cgl', 'SSC CGL'], ['ssc_mts', 'SSC MTS'], ['ssc_chsl', 'SSC CHSL'], ['ibps_po', 'IBPS PO'], ['ibps_clerk', 'IBPS Clerk'], ['sbi_po', 'SBI PO'], ['sbi_clerk', 'SBI Clerk']].map(([id, name]) => `<a href="${examHubPath(id, 'en')}">${name}</a>`).join('')}<a class="exam-pills-more" href="/exams/">More exams &rarr;</a></div>
            ${trustStatsHtml('en')}
            ${trustLinesHtml('en')}
          </div>
          <div class="phone-stack">
            <div class="phone-glow"></div>
            <div class="phone"><picture><source type="image/webp" srcset="/assets/screenshots/1-home-240.webp 240w, /assets/screenshots/1-home-480.webp 480w, /assets/screenshots/1-home-720.webp 720w" sizes="240px" /><img src="/assets/screenshots/1-home-480.jpg" srcset="/assets/screenshots/1-home-240.jpg 240w, /assets/screenshots/1-home-480.jpg 480w, /assets/screenshots/1-home-720.jpg 720w" sizes="240px" width="240" height="427" loading="lazy" decoding="async" alt="Pariksha Saathi home screen showing streak, and a weak-topic nudge" /></picture></div>
          </div>
        </div>
      </div>
      ${(() => {
        const b = dailyPdfBand();
        return b
          ? `<section id="daily-pdf" class="pub-section"><div class="wrap"><div class="daily-pdf-card"><div><div class="eyebrow">${escapeHtml(b.eyebrow)}</div><h2>${escapeHtml(b.title)}</h2><p>${escapeHtml(b.body)}</p></div><div class="daily-pdf-actions"><a class="pub-cta" href="${b.file}" download>${escapeHtml(b.buttonLabel)}</a><a href="${b.allHref}">${escapeHtml(b.allLabel)} &rarr;</a></div></div></div></section>`
          : '';
      })()}
      <section id="features" class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">What's inside</div>
            <h2>Everything you need to get exam-ready</h2>
            <p>Every feature below is built around one real constraint: aspirants studying on patchy connections, shared devices, and tight budgets.</p>
          </div>
          <div class="feature-grid">
            ${HOME_FEATURES.map((f) => `<div class="feature"><div class="mark mark-${f.accent}">${icon(f.icon)}</div><h3>${escapeHtml(f.title)}</h3><p>${escapeHtml(f.body)}</p></div>`).join('\n            ')}
          </div>
        </div>
      </section>
      <section class="pub-section pub-section-alt">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">How it works</div>
            <h2>Three steps, no installs</h2>
          </div>
          <div class="steps-grid">
            ${HOW_IT_WORKS.map((s) => `<div class="step"><div class="step-num">${s.n}</div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.body)}</p></div>`).join('\n            ')}
          </div>
        </div>
      </section>
      <section class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">Exam coverage</div>
            <h2>What's covered for each exam</h2>
          </div>
          <div class="exam-coverage-grid">
            ${EXAM_COVERAGE.map((e) => `<div class="exam-coverage-item"><h3>${escapeHtml(e.name)}</h3><p>${e.body}</p></div>`).join('\n            ')}
          </div>
          <p class="exam-coverage-note">Not sure whether to go for a bank-wide posting or State Bank of India specifically? <a href="/compare/ibps-po-vs-sbi-po/">See how IBPS PO and SBI PO actually differ &rarr;</a></p>
          <p><a href="/exams/">Browse all exams: SSC, banking, railways, state police, CTET and state PSC &rarr;</a></p>
          <p><a href="/exams/calendar/">Exam calendar: every official date across these exams, this month onwards &rarr;</a></p>
        </div>
      </section>
      <section id="topic-lessons" class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">Topic lessons</div>
            <h2>Lessons, free to read</h2>
            <p>The same topics the app teaches, as standalone lessons with worked solutions or key facts and practice questions — no account needed to read these.</p>
          </div>
          <div class="exam-coverage-grid">${[...new Set(LESSON_CATALOG.map(c => c.subject))].map(subject => `<div class="exam-coverage-item"><h3>${subject}</h3><p>${subjectBlurb(subject)}</p><a href="/learn/#${subject.toLowerCase().replaceAll(' ', '-')}">Browse ${subject} lessons →</a></div>`).join('')}</div>
          <p><a href="/learn/">Browse the complete lesson library →</a></p>
        </div>
      </section>

      <section id="current-affairs" class="pub-section pub-section-alt">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">Stay current</div>
            <h2>Latest current affairs</h2>
            <p>Dated, sourced capsules — updated regularly, each linking back to the original release.</p>
          </div>
          ${affairsPreview
            .map(
              (item) => `<a class="update-card-link" href="/app/current-affairs/${item.id}/">
          <div class="card update-card">
            <div class="update-meta">${escapeHtml(item.period)} &middot; ${item.editionDate.slice(0, 10)}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary.slice(0, 150))}${item.summary.length > 150 ? '…' : ''}</p>
            <div class="update-tags">${item.examTags.map(pill).join('')}</div>
            <span class="update-readmore">Read more &rarr;</span>
          </div>
        </a>`,
            )
            .join('\n          ')}
          <a class="update-readmore" href="/app/current-affairs/">See all current affairs &rarr;</a>
        </div>
      </section>
      <section class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">Don't miss a date</div>
            <h2>Latest exam notices &amp; alerts</h2>
            <p>Admit cards, results and deadlines, verified against each exam body's own site.</p>
          </div>
          ${noticesPreview
            .map(
              (item) => `<a class="update-card-link" href="/app/exam-notices/${item.id}/">
          <div class="card update-card">
            <div class="update-meta">${escapeHtml(item.type)} &middot; verified ${item.lastVerifiedAt.slice(0, 10)}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary.slice(0, 150))}${item.summary.length > 150 ? '…' : ''}</p>
            <span class="update-readmore">Read more &rarr;</span>
          </div>
        </a>`,
            )
            .join('\n          ')}
          <a class="update-readmore" href="/app/exam-notices/">See all exam notices &rarr;</a>
        </div>
      </section>
      <section id="faq" class="pub-section pub-section-alt">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </div>
          <div class="faq-list">
            ${FAQS.map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join('\n            ')}
          </div>
        </div>
      </section>
      <div class="wrap">${adSlot('8737623533')}</div>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links"><a href="/about/">About &amp; editorial standards</a>
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/account-deletion/">Delete Account</a>
              <a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
            ${socialLinksHtml()}</div>
          </div>
          <p class="disclaimer">Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body. For information about accounts, study progress and website data, see our <a href="/privacy/">Privacy Policy</a> for details.</p>
        </div>
      </footer>
      ${homePreviewJson(affairsPreview, noticesPreview)}
    </div>`;
}

// The same four-and-four preview items as machine-readable JSON, for src/pages/HomePage.tsx to
// seed react-query with (initialData) when React mounts over this markup - otherwise the two
// sections would re-render as "Loading…" and push the FAQ around until the live fetch landed.
// '<' is escaped so item text can never close the script element early.
function homePreviewJson(affairs, notices) {
  const json = JSON.stringify({ affairs, notices }).replaceAll('<', '\\u003c');
  return `<script type="application/json" id="home-preview">${json}</script>`;
}

// Mirrors src/pages/compare/IbpsPoVsSbiPoPage.tsx exactly - see that component for why each
// claim is phrased the way it is (hedged where the exact pattern can change notification to
// notification, linked to the official source either way).
function comparePageBody() {
  const rows = [
    {
      label: 'Conducted by',
      ibps: 'The Institute of Banking Personnel Selection (IBPS), on behalf of a group of participating public sector banks.',
      sbi: 'State Bank of India itself — SBI runs its own recruitment, using IBPS’s testing platform as a service provider.',
    },
    {
      label: 'Who you join',
      ibps: 'Not decided when you apply. Selected candidates are allotted to one of the participating banks based on merit and the preferences you submit.',
      sbi: 'State Bank of India, specifically. You know which bank you’re joining before you even apply.',
    },
    {
      label: 'Selection stages',
      ibps: 'Preliminary exam, Main exam, then an interview.',
      sbi: 'Preliminary exam, Main exam, then a Group Exercise and Interview.',
    },
  ];
  return `<div class="compare-page">
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="/"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/#features">Features</a>
            <a href="/app/exam-notices/">Exam Notices</a>
          </nav>
          ${examsLinkHtml('en')}<a class="pub-cta" href="/onboarding/">Start studying</a>
        </div>
      </header>
      <article class="wrap compare-article">
        <a href="/" class="detail-back">&larr; Home</a>
        <h1>IBPS PO vs SBI PO: What&rsquo;s Actually Different</h1>
        <p class="compare-lede">Both lead to the same job title — Probationary Officer at a public sector bank — which is exactly why the two get confused. They&rsquo;re run by different organisations, for different outcomes, and they&rsquo;re separate applications with separate forms and fees. Here&rsquo;s what actually distinguishes them.</p>
        <div class="compare-table">
          <div class="compare-row compare-row-head">
            <div class="compare-cell"></div>
            <div class="compare-cell">IBPS PO</div>
            <div class="compare-cell">SBI PO</div>
          </div>
          ${rows
            .map(
              (row) => `<div class="compare-row">
            <div class="compare-cell compare-label">${escapeHtml(row.label)}</div>
            <div class="compare-cell" data-label="IBPS PO: ">${escapeHtml(row.ibps)}</div>
            <div class="compare-cell" data-label="SBI PO: ">${escapeHtml(row.sbi)}</div>
          </div>`,
            )
            .join('\n          ')}
          <div class="compare-row">
            <div class="compare-cell compare-label">Can I apply to both?</div>
            <div class="compare-cell compare-both">Yes — they&rsquo;re separate recruitment cycles with separate notifications, forms and fees, so applying to one has no bearing on your eligibility for the other.</div>
          </div>
        </div>
        <p class="compare-note">Exact section-wise marks, number of questions and interview weightage can change from one notification to the next for either exam. Treat the structure above as the stable shape, and check that cycle&rsquo;s official notification for the exact current pattern — linked below for each.</p>
        <h2>What Pariksha Saathi offers for each</h2>
        <p>The same practice content either way: Reasoning, Quantitative Aptitude and English for Prelims and Mains, plus dated current-affairs capsules for Banking Awareness — free, with no paywalled mock tests. Select whichever one (or both) you&rsquo;re preparing for from the exam picker.</p>
        <h2>Official notifications</h2>
        <ul class="compare-links">
          <li><a href="https://www.ibps.in/index.php/management-trainees-xvi/" target="_blank" rel="noreferrer">IBPS PO/MT — official CRP page &#8599;</a></li>
          <li><a href="https://sbi.bank.in/web/careers/current-openings" target="_blank" rel="noreferrer">SBI PO — official SBI careers page &#8599;</a></li>
          <li><a href="/app/exam-notices/">Latest admit card, result and deadline alerts on Pariksha Saathi &rarr;</a></li>
        </ul>
        <a class="btn-primary-compare" href="/onboarding/">Start studying free &rarr;</a>
      </article>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links"><a href="/about/">About &amp; editorial standards</a>
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
            ${socialLinksHtml()}</div>
          </div>
          <p class="disclaimer">Pariksha Saathi is an independent project and is not affiliated with IBPS, SBI, or any government body. Figures and process details above are general and may change — always confirm against the official notification linked above.</p>
        </div>
      </footer>
    </div>`;
}

// Mirrors src/pages/compare/SyllabusPage.tsx exactly - one generic generator for all 7 exams x 2
// languages, driven by the same src/data/examSyllabi.ts imported at the top of this file (single
// source of truth, no hand-duplicated content to drift out of sync).
function syllabusPageBody(entry, lang) {
  const c = entry[lang];
  const homeHref = lang === 'hi' ? '/hi/' : '/';
  const enPath = `/compare/${entry.slug}-syllabus/`;
  const hiPath = `/hi/compare/${entry.slug}-syllabus/`;
  const otherLangHref = lang === 'hi' ? enPath : hiPath;
  const otherLangLabel = lang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें';
  const examNoticesLabel = lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices';
  const startStudyingLabel = lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying';
  const tableRows = (rows) =>
    rows
      .map((r) => `<div class="compare-row"><div class="compare-cell compare-label">${escapeHtml(r.name)}</div><div class="compare-cell compare-both">${escapeHtml(r.body)}</div></div>`)
      .join('\n          ');
  return `<div class="compare-page">
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="${homeHref}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/app/exam-notices/">${examNoticesLabel}</a>
          </nav>
          ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${startStudyingLabel}</a>
        </div>
      </header>
      <article class="wrap compare-article">
        <div class="compare-top-row">
          <a href="${homeHref}" class="detail-back">&larr; ${escapeHtml(c.backLabel)}</a>
          <a href="${otherLangHref}" class="compare-lang-switch">${otherLangLabel}</a>
        </div>
        <h1>${escapeHtml(c.pageTitle)}</h1>
        <p class="compare-lede">${escapeHtml(c.lede)}</p>
        <h2>${escapeHtml(c.stagesHeading)}</h2>
        <div class="compare-table">
          ${tableRows(c.stages)}
        </div>
        <h2>${escapeHtml(c.subjectsHeading)}</h2>
        <div class="compare-table">
          ${tableRows(c.subjects)}
        </div>
        <p class="compare-note">${escapeHtml(c.note)} <a href="${entry.officialUrl}" target="_blank" rel="noreferrer">${escapeHtml(c.noteLinkLabel)}</a>.</p>
        ${hubExamIdForSlug(entry.slug) ? `<p class="compare-note"><a href="${examHubPath(hubExamIdForSlug(entry.slug), lang)}">${escapeHtml(HUB_LINK_LABEL[lang])} &rarr;</a></p>` : ''}
        <h2>${escapeHtml(c.recruitsHeading)}</h2>
        <p>${escapeHtml(c.recruitsBody)}</p>
        <h2>${escapeHtml(c.offerHeading)}</h2>
        <p>${escapeHtml(c.offerBody)}</p>
        <h2>${escapeHtml(c.sourceHeading)}</h2>
        <ul class="compare-links">
          <li><a href="${entry.officialUrl}" target="_blank" rel="noreferrer">${escapeHtml(c.officialLinkLabel)} &#8599;</a></li>
          <li><a href="/app/exam-notices/">${escapeHtml(c.examNoticesLinkLabel)} &rarr;</a></li>
        </ul>
        <a class="btn-primary-compare" href="/onboarding/">${escapeHtml(c.ctaLabel)} &rarr;</a>
      </article>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links"><a href="/about/">About &amp; editorial standards</a>
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
            ${socialLinksHtml()}</div>
          </div>
          <p class="disclaimer">${escapeHtml(c.disclaimer)}</p>
        </div>
      </footer>
    </div>`;
}

// Mirrors src/pages/exams/ExamHubPage.tsx's frame exactly (header, article, footer); the article's
// content is built by src/lib/examHub.mjs, which both this script and the React page call.
function examHubPageBody(innerHtml, lang) {
  return `<div class="compare-page">
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="/"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/app/exam-notices/">${lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices'}</a>
          </nav>
          ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}</a>
        </div>
      </header>
      <article class="wrap compare-article">${innerHtml}</article>
      <footer class="pub-footer">
        <div class="wrap pub-footer-links">
          <a href="/about/">About &amp; editorial standards</a>
          <a href="/privacy/">Privacy Policy</a>
          <a href="/terms/">Terms of Use</a>
          <a href="/contact/">Contact</a>
          <a href="/downloads/">Daily PDF</a>
        ${socialLinksHtml()}</div>
      </footer>
    </div>`;
}

// Mirrors src/pages/compare/JobProfilePage.tsx exactly - driven by src/data/examJobProfiles.mjs,
// same single-source-of-truth pattern as syllabusPageBody above.
function jobProfilePageBody(entry, lang) {
  const c = entry[lang];
  const homeHref = lang === 'hi' ? '/hi/' : '/';
  const enPath = `/compare/${entry.slug}-job-profile/`;
  const hiPath = `/hi/compare/${entry.slug}-job-profile/`;
  const syllabusPath = lang === 'hi' ? `/hi/compare/${entry.slug}-syllabus/` : `/compare/${entry.slug}-syllabus/`;
  const otherLangHref = lang === 'hi' ? enPath : hiPath;
  const otherLangLabel = lang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें';
  const examNoticesLabel = lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices';
  const startStudyingLabel = lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying';
  const paragraphs = (items) => items.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n        ');
  const postsTable = c.posts
    ? `<h2>${escapeHtml(c.postsHeading)}</h2>
        <div class="compare-table">
          ${c.posts.map((post) => `<div class="compare-row"><div class="compare-cell compare-label">${escapeHtml(post.name)}</div><div class="compare-cell compare-both">${escapeHtml(post.body)}</div></div>`).join('\n          ')}
        </div>`
    : '';
  return `<div class="compare-page">
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="${homeHref}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/app/exam-notices/">${examNoticesLabel}</a>
          </nav>
          ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${startStudyingLabel}</a>
        </div>
      </header>
      <article class="wrap compare-article">
        <div class="compare-top-row">
          <a href="${homeHref}" class="detail-back">&larr; ${escapeHtml(c.backLabel)}</a>
          <a href="${otherLangHref}" class="compare-lang-switch">${otherLangLabel}</a>
        </div>
        <h1>${escapeHtml(c.pageTitle)}</h1>
        <p class="compare-lede">${escapeHtml(c.lede)}</p>
        <h2>${escapeHtml(c.profileHeading)}</h2>
        ${paragraphs(c.profileBody)}
        ${postsTable}
        ${c.promotionBody.length > 0 ? `<h2>${escapeHtml(c.promotionHeading)}</h2>\n        ${paragraphs(c.promotionBody)}` : ''}
        <h2>${escapeHtml(c.salaryHeading)}</h2>
        ${paragraphs(c.salaryBody)}
        ${c.perks.length > 0 ? `<h2>${escapeHtml(c.perksHeading)}</h2>
        <ul class="lesson-concept-list">
          ${c.perks.map((perk) => `<li>${escapeHtml(perk)}</li>`).join('\n          ')}
        </ul>` : ''}
        <p class="compare-note">${escapeHtml(c.note)} <a href="${entry.officialUrl}" target="_blank" rel="noreferrer">${escapeHtml(c.noteLinkLabel)}</a>.</p>
        <h2>${escapeHtml(c.recruitsHeading)}</h2>
        <p>${escapeHtml(c.recruitsBody)}</p>
        <h2>${escapeHtml(c.offerHeading)}</h2>
        <p>${escapeHtml(c.offerBody)}</p>
        <h2>${escapeHtml(c.sourceHeading)}</h2>
        <ul class="compare-links">
          <li><a href="${entry.officialUrl}" target="_blank" rel="noreferrer">${escapeHtml(c.officialLinkLabel)} &#8599;</a></li>
          <li><a href="${syllabusPath}">${escapeHtml(c.syllabusLinkLabel)} &rarr;</a></li>
          <li><a href="/app/exam-notices/">${escapeHtml(c.examNoticesLinkLabel)} &rarr;</a></li>
        </ul>
        <a class="btn-primary-compare" href="/onboarding/">${escapeHtml(c.ctaLabel)} &rarr;</a>
      </article>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links"><a href="/about/">About &amp; editorial standards</a>
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
            ${socialLinksHtml()}</div>
          </div>
          <p class="disclaimer">${escapeHtml(c.disclaimer)}</p>
        </div>
      </footer>
    </div>`;
}

// Mirrors src/pages/learn/LessonArticlePage.tsx exactly - driven by src/data/topicLessons.ts,
// same single-source-of-truth pattern as syllabusPageBody above.
function lessonPageBody(entry, lang) {
  const c = entry[lang];
  const topicKey = LESSON_CATALOG.find(item => item.slug === entry.slug)?.topicKey;
  const homeHref = lang === 'hi' ? '/hi/' : '/';
  const libraryHref = lang === 'hi' ? '/hi/learn/' : '/learn/';
  const enPath = `/learn/${entry.slug}/`;
  const hiPath = `/hi/learn/${entry.slug}/`;
  const otherLangHref = lang === 'hi' ? enPath : hiPath;
  const otherLangLabel = lang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें';
  const examNoticesLabel = lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices';
  const startStudyingLabel = lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying';
  const examples = c.examples
    .map(
      (ex, i) => `<div class="lesson-example">
          <p class="lesson-example-q"><strong>${i + 1}. ${escapeHtml(ex.question)}</strong></p>
          <p class="lesson-solution-label">${escapeHtml(c.solutionLabel)}</p>
          <ol class="lesson-solution-steps">
            ${ex.solution.map((step) => `<li>${escapeHtml(step)}</li>`).join('\n            ')}
          </ol>
          <p class="lesson-answer">${escapeHtml(c.answerLabel)}: ${escapeHtml(ex.answer)}</p>
        </div>`,
    )
    .join('\n        ');
  const keyFacts = c.keyFacts?.length
    ? `<h2>${escapeHtml(c.keyFactsHeading)}</h2>
        <ul class="lesson-concept-list">
          ${c.keyFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('\n          ')}
        </ul>`
    : '';
  const practice = c.practiceQuestions
    .map(
      (q, i) => `<details class="lesson-practice-item">
            <summary>${i + 1}. ${escapeHtml(q.question)}</summary>
            <p>${escapeHtml(c.answerLabel)}: ${escapeHtml(q.answer)}</p>
          </details>`,
    )
    .join('\n          ');
  return `<div class="compare-page">
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="${homeHref}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/app/exam-notices/">${examNoticesLabel}</a>
          </nav>
          ${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding/">${startStudyingLabel}</a>
        </div>
      </header>
      <article class="wrap compare-article">
        <div class="compare-top-row">
          <a href="${homeHref}" class="detail-back">&larr; ${escapeHtml(c.backLabel)}</a>
          <a href="${otherLangHref}" class="compare-lang-switch">${otherLangLabel}</a>
        </div>
        <h1>${escapeHtml(c.pageTitle)}</h1>
        <p class="compare-lede">${escapeHtml(c.lede)}</p>
        <p class="lesson-credit">${escapeHtml(lessonCredit(entry, lang).text)} <a href="/about/">${escapeHtml(lessonCredit(entry, lang).link)}</a></p>
        <p><a href="#practice">${lang === 'hi' ? 'अभ्यास प्रश्नों पर जाएँ' : 'Jump to practice questions'} ↓</a></p>
        <h2>${escapeHtml(c.conceptHeading)}</h2>
        <ul class="lesson-concept-list">
          ${c.conceptBody.map((line) => `<li>${escapeHtml(line)}</li>`).join('\n          ')}
        </ul>
        ${keyFacts}
        ${c.examples.length > 0 ? `<h2>${escapeHtml(c.examplesHeading)}</h2>` : ''}
        ${examples}
        <h2 id="practice">${escapeHtml(c.practiceHeading)}</h2>
        <p>${escapeHtml(c.practiceIntro)}</p>
        <div class="lesson-practice-list">
          ${practice}
        </div>
        ${(() => { const link = lessonQuestionListLink(entry.slug, lang); return link ? `<p><a href="${link.href}">${escapeHtml(link.label)}</a></p>` : ''; })()}
        <h2>${escapeHtml(c.relevantForHeading)}</h2>
        <p>${linkExamNames(c.relevantForBody, lang)}</p>
        <h2>${lang === 'hi' ? 'अगला कदम' : 'Keep practising'}</h2>
        <p>${escapeHtml(lessonClosing(entry, lang))}</p>
        <a class="btn-primary-compare" href="${topicKey ? `/app/practice/topic/${topicKey}?lang=${lang}` : '#practice'}">${lang === 'hi' ? (topicKey ? 'इस विषय का क्विज़ शुरू करें' : 'अभ्यास प्रश्नों पर जाएँ') : (topicKey ? 'Start this topic’s quiz' : 'Go to practice questions')} →</a>
        <p><a href="${libraryHref}">${lang === 'hi' ? 'सभी विषय देखें' : 'Explore the lesson library'}</a></p>
      </article>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links"><a href="/about/">About &amp; editorial standards</a>
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
            ${socialLinksHtml()}</div>
          </div>
          <p class="disclaimer">${escapeHtml(c.disclaimer)}</p>
        </div>
      </footer>
    </div>`;
}

async function main() {
  const assets = readBuiltAssets();
  // The SPA shell for client-side-only routes (see public/_redirects): Vite's index.html with the
  // stylesheet inlined, before index.html itself is overwritten with the prerendered home page.
  writeFileSync(join(DIST, 'spa.html'), assets.shellHtml, 'utf8');
  writeFileSync(join(DIST, '404.html'), page({ title: 'Page not found', description: 'This page does not exist on Pariksha Saathi.', path: '/404', assets, type: 'website', robots: 'noindex,follow', bodyHtml: '<main class="wrap compare-article"><h1>Page not found</h1><p><a href="/learn/">Browse the lesson library</a> or <a href="/">return home</a>.</p></main>' }));
  writePage('onboarding', page({ title: 'Choose Your Exam', description: 'Choose your exams to personalise your study plan.', path: '/onboarding/', assets, type: 'website', robots: 'noindex,follow', bodyHtml: '<main class="wrap onboarding"><h1>Which exams are you preparing for?</h1><p>Choose your exams to personalise your study plan.</p><noscript>Enable JavaScript to select exams, or <a href="/learn/">read the public lessons</a>.</noscript></main>' }));

  // Fetched before the homepage is written, not after - the homepage's "Latest current affairs"/
  // "Latest exam notices" sections preview the same live data the list pages below use in full.
  //
  // A single `?limit=100` fetch used to be the whole story here, before a real incident
  // (2026-10-13): once the published total grew past 100, the API's own hard cap
  // (Math.min(limit, 100) in src/routes/public.js) silently truncated the response to the 100
  // newest items, so the oldest ones got no static page on the next build - a URL Google had
  // already indexed started 404ing at origin with no warning, while Cloudflare's edge cache
  // masked it for days by still serving the old cached 200. Page through `offset` instead so
  // every published item always gets prerendered, no matter how many there are.
  const affairs = await fetchAllCurrentAffairs();
  const affairsHi = await fetchAllCurrentAffairs('hi');
  const notices = await fetch(`${API_BASE}/v1/exam-updates`).then((r) => r.json());
  // Hindi rows have their own ids, and the app's Hindi UI shares/opens /app/exam-notices/<hindi id>/ - which
  // 404ed on a hard load until 17 Oct 2026 because only the English rows got a static page (the Hindi hub
  // pages' "recent notices" linked to those ids too). Prerendered below alongside the English pages.
  const noticesHi = await fetch(`${API_BASE}/v1/exam-updates?lang=hi`).then((r) => r.json());

  // --- Homepage --- the SPA's own dist/index.html is otherwise just an empty <div id="root">
  // until React mounts - the single most important page to have real content in, since it's what
  // AdSense's own site review (and every other crawler) checks first for the domain overall.
  writeFileSync(join(DIST, 'index.html'), page({
    // Was literally 'Pariksha Saathi' (the bare brand name, via the title===SITE_NAME special
    // case that skips the "| Pariksha Saathi" suffix) - the single highest-authority page on the
    // site had a title with zero keywords or value proposition in it. Mirrors
    // src/pages/HomePage.tsx's useDocumentMeta call.
    title: PAGE_META.home.title,
    description: PAGE_META.home.description,
    path: '/',
    assets,
    bodyHtml: homePageBody(affairs.slice(0, 4), notices.slice(0, 4)),
    type: 'website',
    // Mirrors src/pages/HomePage.tsx's useDocumentMeta call: the Hindi landing page is /hi/ (publicPages.mjs).
    alternateLanguages: [
      { lang: 'en', path: '/' },
      { lang: 'hi', path: '/hi/' },
      { lang: 'x-default', path: '/' },
    ],
    // Mirrors src/pages/HomePage.tsx's useDocumentMeta call exactly.
    structuredData: [
      ...homeEntityJsonLd(), // WebSite + Organization (+ the app once it is public), shared with HomePage.tsx
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }), 'utf8');

  // --- IBPS PO vs SBI PO comparison --- mirrors src/pages/compare/IbpsPoVsSbiPoPage.tsx exactly.
  // Kept in sync by hand, same as every other page this script prerenders.
  writePage('compare/ibps-po-vs-sbi-po', page({
    title: 'IBPS PO vs SBI PO: What’s Actually Different',
    description: 'IBPS PO and SBI PO lead to a Probationary Officer role at different public sector banks, with different outcomes — here’s how they differ.',
    path: '/compare/ibps-po-vs-sbi-po/',
    assets,
    bodyHtml: comparePageBody(),
    type: 'article',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'IBPS PO vs SBI PO: What’s Actually Different',
        description: 'A comparison of how IBPS PO and SBI PO recruitment are conducted, who they recruit for, and how their selection stages differ.',
        datePublished: IBPS_VS_SBI_PUBLISHED_DATE,
        author: { '@type': 'Person', name: 'Mahesh Srivastava' },
        publisher: { '@type': 'Organization', name: SITE_NAME },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'IBPS PO vs SBI PO' },
        ],
      },
    ],
  }));

  // This build's date, used as lastmod for pages whose content changes on every rebuild (the
  // homepage's "Latest" previews, and the two list pages) - not exact, but far more useful to a
  // crawler deciding what to recrawl than no lastmod at all.
  const BUILD_DATE = new Date().toISOString().slice(0, 10);

  const sitemapUrls = [
    { loc: '/', priority: '1.0', lastmod: BUILD_DATE },

    { loc: '/compare/ibps-po-vs-sbi-po/', priority: '0.6', lastmod: IBPS_VS_SBI_PUBLISHED_DATE },
    // Trailing slash on every prerendered route: Cloudflare Pages 308-redirects the slash-less
    // form to this one (it resolves {path}/index.html), so this is what actually serves with no
    // extra hop - keeping canonical/sitemap/OG URLs in that same form throughout this file.
    { loc: '/app/current-affairs/', priority: '0.9', lastmod: BUILD_DATE },
    { loc: '/app/exam-notices/', priority: '0.9', lastmod: BUILD_DATE },
  ];

  // Every key in PUBLIC_PAGES, including the Hindi landing page (/hi/) and Hindi lesson library (/hi/learn/);
  // publicPageMeta supplies the path, lang and hreflang pair for each.
  // Every one of them renders through src/pages/PublicPage.tsx, so each page preloads that chunk.
  const publicPageChunks = assets.chunksFor('src/pages/PublicPage.tsx');
  for (const key of Object.keys(PUBLIC_PAGES)) {
    const meta = publicPageMeta(key);
    writePage(meta.path.slice(1, -1), page({ ...meta, assets, bodyHtml: publicPageBody(key), preload: publicPageChunks, type: 'website', structuredData: publicPageStructuredData(key) }));
    sitemapUrls.push({ loc: meta.path, priority: key === 'hi' ? '0.9' : '0.7' });
  }

  // --- Syllabus & exam pattern pages --- one per exam x language (14 total), all driven by
  // src/data/examSyllabi.ts. Mirrors src/pages/compare/SyllabusPage.tsx exactly.
  for (const entry of EXAM_SYLLABI) {
    for (const lang of ['en', 'hi']) {
      const c = entry[lang];
      const relPath = lang === 'hi' ? `hi/compare/${entry.slug}-syllabus` : `compare/${entry.slug}-syllabus`;
      const urlPath = `/${relPath}/`;
      // Trailing slash to match urlPath/canonical above - these only feed hreflang below, but an
      // hreflang href that doesn't match the target page's own canonical is a signal mismatch.
      const enPath = `/compare/${entry.slug}-syllabus/`;
      const hiPath = `/hi/compare/${entry.slug}-syllabus/`;
      writePage(relPath, page({
        title: c.pageTitle,
        description: metaDescription(c.lede),
        path: urlPath,
        assets,
        bodyHtml: syllabusPageBody(entry, lang),
        type: 'article',
        lang,
        alternateLanguages: [
          { lang: 'en', path: enPath },
          { lang: 'hi', path: hiPath },
          { lang: 'x-default', path: enPath },
        ],
        structuredData: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: c.pageTitle,
            description: c.lede,
            inLanguage: lang,
            // All 7 exams' syllabus pages shipped together in one pass - a real date, not per-exam.
            datePublished: SYLLABUS_PUBLISHED_DATE,
            author: { '@type': 'Person', name: 'Mahesh Srivastava' },
            publisher: { '@type': 'Organization', name: SITE_NAME },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: c.backLabel, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: c.pageTitle },
            ],
          },
        ],
      }));
      sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: SYLLABUS_PUBLISHED_DATE });
    }
  }

  // --- Job profile & salary pages --- one per exam x language (12 total), all driven by
  // src/data/examJobProfiles.mjs. Mirrors src/pages/compare/JobProfilePage.tsx exactly.
  for (const entry of EXAM_JOB_PROFILES) {
    for (const lang of ['en', 'hi']) {
      const c = entry[lang];
      const relPath = lang === 'hi' ? `hi/compare/${entry.slug}-job-profile` : `compare/${entry.slug}-job-profile`;
      const urlPath = `/${relPath}/`;
      // Trailing slash to match urlPath/canonical above - see the matching comment on the
      // syllabus loop above for why this specifically matters.
      const enPath = `/compare/${entry.slug}-job-profile/`;
      const hiPath = `/hi/compare/${entry.slug}-job-profile/`;
      writePage(relPath, page({
        title: c.pageTitle,
        description: metaDescription(c.lede),
        path: urlPath,
        assets,
        bodyHtml: jobProfilePageBody(entry, lang),
        type: 'article',
        lang,
        alternateLanguages: [
          { lang: 'en', path: enPath },
          { lang: 'hi', path: hiPath },
          { lang: 'x-default', path: enPath },
        ],
        structuredData: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: c.pageTitle,
            description: c.lede,
            inLanguage: lang,
            // All 6 job-profile pages shipped together in one pass - a real date, not per-exam.
            datePublished: JOB_PROFILE_PUBLISHED_DATE,
            author: { '@type': 'Person', name: 'Mahesh Srivastava' },
            publisher: { '@type': 'Organization', name: SITE_NAME },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: c.backLabel, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: c.pageTitle },
            ],
          },
        ],
      }));
      sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: JOB_PROFILE_PUBLISHED_DATE });
    }
  }

  // --- Topic lesson pages --- one per topic x language, driven by src/data/topicLessons.ts.
  // Mirrors src/pages/learn/LessonArticlePage.tsx exactly.
  for (const entry of TOPIC_LESSONS) {
    for (const lang of ['en', 'hi']) {
      const c = entry[lang];
      const relPath = lang === 'hi' ? `hi/learn/${entry.slug}` : `learn/${entry.slug}`;
      const urlPath = `/${relPath}/`;
      // Trailing slash to match urlPath/canonical above - these only feed hreflang below, but an
      // hreflang href that doesn't match the target page's own canonical is a signal mismatch.
      const enPath = `/learn/${entry.slug}/`;
      const hiPath = `/hi/learn/${entry.slug}/`;
      writePage(relPath, page({
        title: lessonSeoTitle(entry.slug, lang, c.pageTitle),
        description: metaDescription(c.lede),
        path: urlPath,
        assets,
        bodyHtml: lessonPageBody(entry, lang),
        type: 'article',
        lang,
        alternateLanguages: [
          { lang: 'en', path: enPath },
          { lang: 'hi', path: hiPath },
          { lang: 'x-default', path: enPath },
        ],
        structuredData: [
          {
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            headline: c.pageTitle,
            description: c.lede,
            inLanguage: lang,
            learningResourceType: 'lesson',
            datePublished: entry.publishedDate,
            author: lessonAuthor(entry),
            publisher: { '@type': 'Organization', name: SITE_NAME },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: c.backLabel, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: c.pageTitle },
            ],
          },
        ],
      }));
      sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: entry.publishedDate });
    }
  }

  // --- Exam hub pages --- one per listed exam x language, built from the server's sourced exam facts
  // and official cut-offs (src/lib/examHub.mjs). An exam listed in HUB_EXAM_IDS with no published fact
  // sheet fails the build: a hub must never ship empty or fall back to unsourced numbers.
  // The next weekly live mock, once for every hub (rendered only when PLAY_STORE_URL is set - see liveMockLineHtml).
  const liveMockNext = await fetch(`${API_BASE}/v1/live-mocks/next`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  // Collected across the hub loop for the exam calendar (src/lib/examCalendar.mjs) below.
  const calendarFacts = {};
  const calendarNotices = { en: {}, hi: {} };
  const hubSummaries = {}; // per hub, for /llms.txt: whether it shows cut-offs, and when its facts were last verified
  const fullFacts = []; // per hub, for /llms-full.txt: the fact sheet and cut-offs the page shows
  const cutoffsByExam = {}; // per hub, for the solved-paper pages' "compare with the official cut-off" block
  for (const examId of HUB_EXAM_IDS) {
    const facts = await fetch(`${API_BASE}/v1/exams/${examId}/facts`).then((r) => r.json());
    if (!Array.isArray(facts) || facts.length === 0) {
      throw new Error(`Build check failed: ${examId} is listed in HUB_EXAM_IDS but the API has no published fact sheet for it`);
    }
    calendarFacts[examId] = facts;
    const cutoffs = await fetch(`${API_BASE}/v1/exams/${examId}/cutoffs`).then((r) => r.json());
    cutoffsByExam[examId] = cutoffs;
    // Previous-year question counts per official paper - zero for every exam until the owner supplies a
    // paper (server docs/PYQ.md). A server that does not have the route yet answers 404; that must not
    // fail the build, it just renders no block.
    const pyq = await fetch(`${API_BASE}/v1/exams/${examId}/pyq-summary`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    const examName = EXAM_NAMES[examId] ?? examId;
    const slug = examHubSlug(examId);
    const enNotices = await fetch(`${API_BASE}/v1/exam-updates?examIds=${examId}&lang=en`).then((r) => r.json());
    const hiNotices = await fetch(`${API_BASE}/v1/exam-updates?examIds=${examId}&lang=hi`).then((r) => r.json());
    calendarNotices.en[examId] = enNotices;
    calendarNotices.hi[examId] = hiNotices.length > 0 ? hiNotices : enNotices;
    const hasSyllabus = EXAM_SYLLABI.some((e) => e.slug === slug);
    const hasJobProfile = EXAM_JOB_PROFILES.some((e) => e.slug === slug);
    hubSummaries[examId] = { hasCutoffs: cutoffs.length > 0, lastVerified: examHubMeta({ examName, facts, cutoffs, lang: 'en' }).lastVerified };
    fullFacts.push({ examId, examName, facts, cutoffs, hasNotices: enNotices.length > 0 });
    for (const lang of ['en', 'hi']) {
      const prefix = lang === 'hi' ? '/hi' : '';
      const links = {
        syllabusPath: hasSyllabus ? `${prefix}/compare/${slug}-syllabus/` : undefined,
        jobProfilePath: hasJobProfile ? `${prefix}/compare/${slug}-job-profile/` : undefined,
        typingTestPath: TYPING_TEST_EXAMS.includes(examId) ? typingTestPath(lang) : undefined,
      };
      const notices = lang === 'hi' && hiNotices.length > 0 ? hiNotices : enNotices;
      const meta = examHubMeta({ examName, facts, cutoffs, lang });
      const urlPath = examHubPath(examId, lang);
      writePage(urlPath.replace(/^\/|\/$/g, ''), page({
        title: meta.title,
        description: meta.description,
        path: urlPath,
        assets,
        bodyHtml: examHubPageBody(examHubBody({ examName, facts, cutoffs, notices, items: hubItems(examId, lang === 'hi' ? affairsHi : affairs), lang, links, pyq, liveMock: liveMockNext?.mock ?? null, playStoreUrl: PLAY_STORE_URL }), lang),
        type: 'article',
        lang,
        alternateLanguages: [
          { lang: 'en', path: examHubPath(examId, 'en') },
          { lang: 'hi', path: examHubPath(examId, 'hi') },
          { lang: 'x-default', path: examHubPath(examId, 'en') },
        ],
        structuredData: examHubStructuredData({ examName, facts, cutoffs, lang, siteUrl: SITE_URL }),
      }));
      sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.8' : '0.7', lastmod: meta.lastVerified });

      // The exam's admit card, result and answer-key page (src/lib/examUpdatesPage.mjs), from the same notices. With no
      // notice yet it would only repeat the hub's dates and FAQ, so it is built (the hub links it) but kept out of
      // search and the sitemap until the first notice arrives (22 Oct 2026).
      const updatesPath = examUpdatesPath(examId, lang);
      const updatesArgs = { examName, facts, notices, lang };
      const updatesIndexable = notices.length > 0;
      const updatesMeta = examUpdatesMeta(updatesArgs);
      writePage(updatesPath.replace(/^\/|\/$/g, ''), page({
        title: updatesMeta.title,
        description: updatesMeta.description,
        path: updatesPath,
        assets,
        lang,
        type: 'website',
        scripts: false,
        robots: updatesIndexable ? 'index,follow' : 'noindex,follow',
        alternateLanguages: [
          { lang: 'en', path: examUpdatesPath(examId, 'en') },
          { lang: 'hi', path: examUpdatesPath(examId, 'hi') },
          { lang: 'x-default', path: examUpdatesPath(examId, 'en') },
        ],
        bodyHtml: examUpdatesBody(updatesArgs),
        structuredData: examUpdatesStructuredData({ ...updatesArgs, siteUrl: SITE_URL }),
      }));
      if (updatesIndexable) sitemapUrls.push({ loc: updatesPath, priority: lang === 'en' ? '0.7' : '0.6' });
    }
  }

  // --- Exam directory (/exams/, /hi/exams/): the "choose your exam" page every header links to. ---
  const directoryLastmod = sitemapUrls.filter((u) => u.loc.includes('/exams/')).map((u) => u.lastmod).filter(Boolean).sort().at(-1);
  for (const lang of ['en', 'hi']) {
    const meta = examDirectoryMeta(lang);
    const urlPath = examDirectoryPath(lang);
    writePage(urlPath.replace(/^\/|\/$/g, ''), page({
      title: meta.title,
      description: meta.description,
      path: urlPath,
      assets,
      bodyHtml: examHubPageBody(
        examDirectoryBody({
          lang,
          hubIds: HUB_EXAM_IDS,
          syllabusSlugs: EXAM_SYLLABI.map((e) => e.slug),
          jobProfileSlugs: EXAM_JOB_PROFILES.map((e) => e.slug),
        }),
        lang,
      ),
      type: 'website',
      lang,
      structuredData: examDirectoryStructuredData({ lang, hubIds: HUB_EXAM_IDS, siteUrl: SITE_URL }),
      alternateLanguages: [
        { lang: 'en', path: examDirectoryPath('en') },
        { lang: 'hi', path: examDirectoryPath('hi') },
        { lang: 'x-default', path: examDirectoryPath('en') },
      ],
    }));
    sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.9' : '0.8', lastmod: directoryLastmod });
  }

  // --- SSC typing / data-entry practice (/typing-test/, /hi/typing-test/). Its standards are typed into
  // src/data/typingTest.mjs from the notices; before writing the page, prove they still match the published fact
  // sheets, so a new notice with different numbers fails the build instead of leaving the page wrong.
  {
    const skillNotes = (examId) =>
      (calendarFacts[examId]?.[0]?.stages ?? []).flatMap((st) => st.parts).filter((p) => p.kind === 'skill').flatMap((p) => p.notes ?? []).map((n) => n.en).join(' ');
    const expectations = [
      ['ssc_cgl', 'about 2,000 key depressions'],
      ['ssc_cgl', '20% (UR), 25% (OBC/EWS) and 30%'],
      ['ssc_chsl', '15,000 key depressions per hour'],
      ['ssc_chsl', '8,000 key depressions per hour'],
      ['ssc_chsl', '35 words per minute in English or 30 words per minute in Hindi'],
    ];
    for (const [examId, phrase] of expectations) {
      if (!skillNotes(examId).includes(phrase)) {
        throw new Error(`Build check failed: the ${examId} fact sheet no longer says "${phrase}" - update src/data/typingTest.mjs from the new notice`);
      }
    }
    for (const lang of ['en', 'hi']) {
      const meta = typingTestMeta(lang);
      const urlPath = typingTestPath(lang);
      writePage(urlPath.replace(/^\/|\/$/g, ''), page({
        title: meta.title,
        description: meta.description,
        path: urlPath,
        assets,
        bodyHtml: examHubPageBody(typingTestStaticHtml(lang), lang),
        type: 'website',
        lang,
        alternateLanguages: [
          { lang: 'en', path: typingTestPath('en') },
          { lang: 'hi', path: typingTestPath('hi') },
          { lang: 'x-default', path: typingTestPath('en') },
        ],
      }));
      sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.8' : '0.7', lastmod: TYPING_CHECKED });
    }
  }

  // --- Exam calendar (/exams/calendar/, /hi/exams/calendar/): every fixed date across the hub exams, this
  // month onwards, from the fact sheets and notices fetched above - nothing tentative, every row sourced
  // (src/lib/examCalendar.mjs; check-public-pages.mjs verifies each row). "Today" is the IST build date.
  const calendarToday = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  for (const lang of ['en', 'hi']) {
    const groups = calendarRows({ factsByExam: calendarFacts, noticesByExam: calendarNotices[lang], lang, today: calendarToday });
    const summary = calendarSummary(groups);
    const meta = examCalendarMeta(lang, summary);
    const urlPath = examCalendarPath(lang);
    writePage(urlPath.replace(/^\/|\/$/g, ''), page({
      title: meta.title,
      description: meta.description,
      path: urlPath,
      assets,
      bodyHtml: examHubPageBody(examCalendarBody({ groups, lang }), lang),
      type: 'website',
      lang,
      alternateLanguages: [
        { lang: 'en', path: examCalendarPath('en') },
        { lang: 'hi', path: examCalendarPath('hi') },
        { lang: 'x-default', path: examCalendarPath('en') },
      ],
    }));
    sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.8' : '0.7', lastmod: summary.lastVerified ?? calendarToday });
  }

  // --- What SSC asks in General Awareness (/exams/ssc-gk-topics/, /hi/exams/ssc-gk-topics/): a data page counted from
  // the SSC previous-year papers we publish (src/lib/gkInsights.mjs over src/data/gkInsights.mjs; regenerate the data
  // with scripts/gen-gk-insights.mjs when papers are added). check-public-pages.mjs verifies it.
  for (const lang of ['en', 'hi']) {
    const meta = gkInsightsMeta(lang);
    const urlPath = gkInsightsPath(lang);
    writePage(urlPath.replace(/^\/|\/$/g, ''), page({
      title: meta.title,
      description: meta.description,
      path: urlPath,
      assets,
      bodyHtml: examHubPageBody(gkInsightsBody(lang), lang),
      type: 'article',
      lang,
      alternateLanguages: [
        { lang: 'en', path: gkInsightsPath('en') },
        { lang: 'hi', path: gkInsightsPath('hi') },
        { lang: 'x-default', path: gkInsightsPath('en') },
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.title,
        description: meta.description,
        inLanguage: lang,
        datePublished: GK_INSIGHTS_PUBLISHED,
        author: { '@type': 'Person', name: 'Mahesh Srivastava' },
        publisher: { '@type': 'Organization', name: SITE_NAME },
      },
    }));
    sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: GK_INSIGHTS_PUBLISHED });
  }

  // --- Current affairs ---
  const affairsListBody = publicContentFrame(currentAffairsDigest(affairs));
  writePage('app/current-affairs', page({
    title: PAGE_META.currentAffairs.title,
    description: PAGE_META.currentAffairs.description,
    path: '/app/current-affairs/',
    assets,
    bodyHtml: affairsListBody,
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: PAGE_META.currentAffairs.title,
      description: PAGE_META.currentAffairs.description,
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
  }));

  // Every item gets a static page in BOTH languages. English and Hindi rows of one event have
  // different ids, so a Hindi item's URL (shared from the Hindi UI, or opened by a Hindi-locale
  // reader) has no file - and 404s on a hard load - unless it is generated here too. The two
  // rows of an event share one sourceUrl, which is how each page finds its hreflang twin.
  const ITEM_TEXT = {
    en: { back: 'Current Affairs', source: 'Official source', collection: 'Read the daily collection →', standards: 'Editorial standards &amp; corrections', quiz: 'Test yourself', reveal: 'Show the answer', answer: 'Answer' },
    hi: { back: 'समसामयिकी', source: 'आधिकारिक स्रोत', collection: 'दैनिक संग्रह पढ़ें →', standards: 'संपादकीय मानक और सुधार', quiz: 'खुद को परखें', reveal: 'उत्तर देखें', answer: 'उत्तर' },
  };
  // The item's own MCQ, rendered statically so the question, options and explanation are part of the
  // page a crawler sees (the React ItemQuestions widget replaces this with the interactive version on
  // load). Every published item has one in both languages - the seed enforces it - so a missing
  // question is a build error, not a silent omission.
  async function itemQuizHtml(item, t) {
    const questions = await fetch(`${API_BASE}/v1/current-affairs/${item.id}/questions`).then((r) => r.json());
    if (!Array.isArray(questions) || questions.length === 0) throw new Error(`Build check failed: current-affairs item ${item.id} (${item.languageCode}) has no inline question`);
    const q = questions[0];
    return `<section class="item-quiz item-quiz-static"><h2>${t.quiz}</h2><p class="item-quiz-text">${escapeHtml(q.text)}</p><ol class="item-quiz-static-options">${q.options
      .map((o) => `<li>${escapeHtml(o)}</li>`)
      .join('')}</ol><details class="item-quiz-static-answer"><summary>${t.reveal}</summary><p><strong>${t.answer}:</strong> ${escapeHtml(q.options[q.correctOptionIndex])}</p><p>${escapeHtml(q.explanation)}</p></details>${reportQuestionLinkHtml(q, item.languageCode === 'hi' ? 'hi' : 'en', `current affairs item ${item.id}`)}</section>`;
  }
  const itemsByLanguage = [
    { lang: 'en', items: affairs, twins: new Map(affairsHi.map((i) => [i.sourceUrl, i])) },
    { lang: 'hi', items: affairsHi, twins: new Map(affairs.map((i) => [i.sourceUrl, i])) },
  ];
  for (const { lang, items, twins } of itemsByLanguage) {
    const t = ITEM_TEXT[lang];
    for (const item of items) {
      const itemPath = `/app/current-affairs/${item.id}/`;
      const twin = twins.get(item.sourceUrl);
      const twinPath = twin ? `/app/current-affairs/${twin.id}/` : undefined;
      const enPath = lang === 'en' ? itemPath : twinPath;
      const detailBody = publicContentFrame(`
      <article class="detail-page">
        <a href="/app/current-affairs/" class="detail-back">&larr; ${t.back}</a>
        <div class="detail-meta">${escapeHtml(item.period)} &middot; ${item.editionDate.slice(0, 10)}</div>
        <h1>${escapeHtml(item.title)}</h1>
        <div class="detail-tags">${item.examTags.map(pill).join('')}</div>
        <p class="detail-body">${escapeHtml(item.summary)}</p>
        <div class="detail-source"><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">${t.source}: ${escapeHtml(item.sourceName)} &#8599;</a></div>
        ${learningNote(item, lang)}
        ${await itemQuizHtml(item, t)}
        ${telegramCtaHtml(lang)}
        ${relatedItemsHtml(items, item, lang)}
        <p><a href="/app/current-affairs/">${t.collection}</a> · <a href="/about/">${t.standards}</a></p>
      </article>
    `);
      writePage(`app/current-affairs/${item.id}`, page({
        title: shortenTitle(item.title),
        description: metaDescription(item.summary),
        path: itemPath,
        assets,
        bodyHtml: detailBody,
        lang,
        alternateLanguages: twin
          ? [
              { lang, path: itemPath },
              { lang: lang === 'en' ? 'hi' : 'en', path: twinPath },
              { lang: 'x-default', path: enPath },
            ]
          : undefined,
        structuredData: [
          {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: item.title,
            description: item.summary,
            datePublished: item.editionDate,
            inLanguage: lang,
            author: { '@type': 'Organization', name: SITE_NAME },
            publisher: { '@type': 'Organization', name: SITE_NAME },
            about: item.examTags,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Current Affairs', item: `${SITE_URL}/app/current-affairs/` },
              { '@type': 'ListItem', position: 3, name: item.title },
            ],
          },
        ],
      }));
      sitemapUrls.push({ loc: itemPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: item.editionDate.slice(0, 10) });
    }
  }

  // --- Exam notices --- (fetched above, alongside `affairs`, for the homepage preview)
  const noticesListBody = publicContentFrame(`
    <div>
      <h1 class="review-title">Exam Notices &amp; Alerts</h1>
      ${notices
        .map(
          (item) => `<a class="update-card-link" href="/app/exam-notices/${item.id}/">
        <div class="card update-card">
          <div class="update-meta">${escapeHtml(item.type)} &middot; verified ${item.lastVerifiedAt.slice(0, 10)}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary.slice(0, 150))}${item.summary.length > 150 ? '…' : ''}</p>
          <span class="update-readmore">Read more &rarr;</span>
        </div>
      </a>`,
        )
        .join('\n')}
      ${notices.length > 0 ? adSlot('2732375973') : ''}
    </div>
  `);
  writePage('app/exam-notices', page({
    title: PAGE_META.examNotices.title,
    description: PAGE_META.examNotices.description,
    path: '/app/exam-notices/',
    assets,
    bodyHtml: noticesListBody,
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: PAGE_META.examNotices.title,
      description: PAGE_META.examNotices.description,
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
  }));

  const NOTICE_TEXT = {
    en: { back: 'Exam Notices &amp; Alerts', verified: 'verified', dates: 'Important dates', guidance: 'What this means for you', official: 'Official notification', crumb: 'Exam Notices & Alerts', updates: (exam) => `All ${exam} admit card, result and answer-key notices` },
    hi: { back: 'परीक्षा सूचनाएं', verified: 'सत्यापित', dates: 'महत्वपूर्ण तिथियाँ', guidance: 'आपके लिए इसका क्या मतलब है', official: 'आधिकारिक अधिसूचना', crumb: 'परीक्षा सूचनाएं', updates: (exam) => `${exam} की सभी एडमिट कार्ड, रिज़ल्ट और आंसर की सूचनाएँ` },
  };
  for (const [lang, list] of [['en', notices], ['hi', noticesHi]]) for (const item of list) {
    const t = NOTICE_TEXT[lang];
    // The hand-verified pairing table (examNoticeGuidance.mjs) is the only safe way to find the twin - see its
    // comment on why officialUrl cannot identify one notice. No known twin: no hreflang, same as before.
    const twinId = knownCounterpartId(item.id);
    const itemPath = `/app/exam-notices/${item.id}/`;
    const twinPath = twinId ? `/app/exam-notices/${twinId}/` : undefined;
    const dateRows = Object.entries(item.importantDates ?? {})
      .map(([label, value]) => `<div class="detail-date-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join('');
    const detailBody = publicContentFrame(`
      <article class="detail-page">
        <a href="/app/exam-notices/" class="detail-back">&larr; ${t.back}</a>
        <div class="detail-meta">${escapeHtml(item.type)} &middot; ${t.verified} ${item.lastVerifiedAt.slice(0, 10)}</div>
        <h1>${escapeHtml(item.title)}</h1>
        <p class="detail-body">${escapeHtml(item.summary)}</p>
        ${dateRows ? `<div class="detail-dates"><h2>${t.dates}</h2><dl>${dateRows}</dl></div>` : ''}
        ${noticeGuidance(item.id, lang) ? `<section class="news-learning"><h2>${t.guidance}</h2><p>${escapeHtml(noticeGuidance(item.id, lang))}</p></section>` : ''}
        <div class="detail-source"><a href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noreferrer">${t.official} &#8599;</a>${homeVisitHint(item.officialUrl, lang)}</div>
        ${HUB_EXAM_IDS.includes(item.examId) ? `<p><a href="${examUpdatesPath(item.examId, lang)}">${escapeHtml(t.updates(EXAM_NAMES[item.examId] ?? item.examId))} &rarr;</a></p>` : ''}
        ${telegramCtaHtml(lang)}
        ${adSlot('5664651910')}
      </article>
    `);
    writePage(`app/exam-notices/${item.id}`, page({
      title: lang === 'hi' ? shortenTitle(item.title) : seoNoticeTitle(item.examId, item.type, item.title, item.lastVerifiedAt.slice(0, 4)),
      description: metaDescription(item.summary),
      path: itemPath,
      assets,
      bodyHtml: detailBody,
      lang,
      alternateLanguages: twinPath
        ? [
            { lang, path: itemPath },
            { lang: lang === 'en' ? 'hi' : 'en', path: twinPath },
            { lang: 'x-default', path: lang === 'en' ? itemPath : twinPath },
          ]
        : undefined,
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: item.title,
          description: item.summary,
          dateModified: item.lastVerifiedAt,
          inLanguage: lang,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: t.crumb, item: `${SITE_URL}/app/exam-notices/` },
            { '@type': 'ListItem', position: 3, name: item.title },
          ],
        },
      ],
    }));
    sitemapUrls.push({ loc: itemPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: item.lastVerifiedAt.slice(0, 10) });
  }

  // --- Practice questions (/q/, /hi/q/) --- every question in full on its topic's list (50 a page, answers behind
  // "Show answer"), from src/data/question-pages/*.json (scripts/gen-question-pages.mjs), plus an index. Until 22 Oct
  // 2026 each question also had its own page; functions/q/ now 301s those addresses to the question's anchor here.
  // Plain HTML: the stylesheet is linked rather than inlined and no app JavaScript loads.
  const topicFor = (key, lang) => {
    const topic = QUESTION_TOPICS[key];
    return { ...topic, subject: lang === 'hi' ? (QUESTION_SUBJECTS_HI[topic.subject] ?? topic.subject) : topic.subject };
  };
  let questionCount = 0;
  for (const lang of ['en', 'hi']) {
    const otherLang = lang === 'hi' ? 'en' : 'hi';
    const questions = JSON.parse(readFileSync(new URL(`../src/data/question-pages/${lang}.json`, import.meta.url), 'utf8'));
    questionCount += questions.length;
    const creditFor = (q) => {
      if (q.kind === 'bank') return q.attribution;
      const lesson = q.lessonSlug ? TOPIC_LESSONS.find((entry) => entry.slug === q.lessonSlug) : null;
      return lessonCredit(lesson, lang).text;
    };
    for (const [topicKey, list] of groupByTopic(questions)) {
      const topic = topicFor(topicKey, lang);
      const pages = Math.ceil(list.length / TOPIC_PAGE_SIZE);
      for (let p = 1; p <= pages; p++) {
        const path = topicListPath(topic, lang, p);
        const items = list.slice((p - 1) * TOPIC_PAGE_SIZE, p * TOPIC_PAGE_SIZE);
        const otherHasList = (QUESTION_TOPICS[topicKey][otherLang]?.count ?? 0) > 0;
        writePage(path.slice(1, -1), page({
          ...topicListMeta(topic, lang, p, pages),
          path,
          assets,
          lang,
          type: 'website',
          inlineStyle: false,
          scripts: false,
          bodyHtml: topicListBody(topic, lang, items, p, pages, creditFor),
          structuredData: topicListStructuredData(topic, lang, items, p, pages),
          alternateLanguages: p === 1 && otherHasList
            ? [{ lang, path }, { lang: otherLang, path: topicListPath(topic, otherLang) }, { lang: 'x-default', path: topicListPath(topic, 'en') }]
            : undefined,
        }));
        sitemapUrls.push({ loc: path, priority: '0.6', lastmod: QUESTION_PAGES_GENERATED });
      }
    }
    const indexTopics = Object.keys(QUESTION_TOPICS).filter((key) => QUESTION_TOPICS[key][lang].count > 0).map((key) => topicFor(key, lang));
    writePage(questionIndexPath(lang).slice(1, -1), page({
      ...questionIndexMeta(lang),
      path: questionIndexPath(lang),
      assets,
      lang,
      type: 'website',
      inlineStyle: false,
      scripts: false,
      bodyHtml: questionIndexBody(indexTopics, lang),
      alternateLanguages: [{ lang: 'en', path: questionIndexPath('en') }, { lang: 'hi', path: questionIndexPath('hi') }, { lang: 'x-default', path: questionIndexPath('en') }],
    }));
    sitemapUrls.push({ loc: questionIndexPath(lang), priority: '0.7', lastmod: QUESTION_PAGES_GENERATED });
  }

  // --- /telegram/: the landing page for paid promotion of the Telegram channel (src/lib/telegramPage.mjs). Plain HTML,
  // no app script, with the newest edition's first headlines (in the order the daily PDF uses) as proof it is live.
  {
    const newest = affairsHi.reduce((max, item) => (item.editionDate > max ? item.editionDate : max), '').slice(0, 10);
    const latest = affairsHi.filter((item) => item.editionDate.startsWith(newest));
    writePage(TELEGRAM_PAGE_PATH.slice(1, -1), page({
      ...telegramPageMeta(),
      path: TELEGRAM_PAGE_PATH,
      assets,
      lang: 'hi',
      type: 'website',
      scripts: false,
      bodyHtml: telegramPageBody(latest),
    }));
    sitemapUrls.push({ loc: TELEGRAM_PAGE_PATH, priority: '0.5', lastmod: newest });
  }

  // --- Solved previous-year papers (/exams/<exam>/question-papers/<paper>/): src/lib/pyqPage.mjs, data from
  // scripts/gen-pyq-pages.mjs. Plain HTML, English (the papers' language), no app script.
  // Each paper with a printable PDF (scripts/paper-pdf/make_paper_pdfs.py, one exam at a time) carries it as `pdf`:
  // { path, pages, sizeKb }, so its page and its exam's list link it.
  const pyqPdfsFile = new URL('../src/data/pyqPdfs.json', import.meta.url);
  const pyqPdfs = existsSync(pyqPdfsFile) ? JSON.parse(readFileSync(pyqPdfsFile, 'utf8')) : {};
  const pyqPapers = JSON.parse(readFileSync(new URL('../src/data/pyqPapers.json', import.meta.url), 'utf8'))
    .map((paper) => (pyqPdfs[paper.slug] ? { ...paper, pdf: pyqPdfs[paper.slug] } : paper));
  for (const paper of pyqPapers) {
    const path = pyqPaperPath(paper);
    const meta = pyqPaperMeta(paper);
    writePage(path.slice(1, -1), page({
      title: meta.title,
      description: meta.description,
      path,
      assets,
      lang: 'en',
      type: 'article',
      scripts: false,
      bodyHtml: pyqPaperBody(paper, cutoffsByExam[paper.examId] ?? []),
      structuredData: pyqPaperStructuredData(paper, SITE_URL),
    }));
    sitemapUrls.push({ loc: path, priority: '0.7' });
  }

  // --- One list of solved papers per exam (/exams/<exam>/question-papers/ and /hi/...): src/lib/pyqIndexPage.mjs.
  for (const examId of PYQ_INDEX_EXAMS) {
    const papers = pyqPapers.filter((p) => p.examId === examId);
    for (const lang of ['en', 'hi']) {
      const path = pyqIndexPath(examId, lang);
      const meta = pyqIndexMeta(examId, papers, lang);
      writePage(path.slice(1, -1), page({
        title: meta.title,
        description: meta.description,
        path,
        assets,
        lang,
        type: 'website',
        scripts: false,
        alternateLanguages: [
          { lang: 'en', path: pyqIndexPath(examId, 'en') },
          { lang: 'hi', path: pyqIndexPath(examId, 'hi') },
          { lang: 'x-default', path: pyqIndexPath(examId, 'en') },
        ],
        bodyHtml: pyqIndexBody(examId, papers, lang),
        structuredData: pyqIndexStructuredData(examId, papers, lang, SITE_URL),
      }));
      sitemapUrls.push({ loc: path, priority: lang === 'en' ? '0.8' : '0.7' });
    }
  }

  // --- /llms.txt: the Markdown map of the site for AI answer engines (src/lib/llmsTxt.mjs), from this build's data.
  writeFileSync(
    join(DIST, 'llms.txt'),
    llmsTxt({
      hubs: hubSummaries,
      papers: pyqPapers.map((paper) => ({ ...paper, questions: paper.questions.length })),
      affairsCount: affairs.length,
      noticesCount: notices.length,
      lessonCount: LESSON_CATALOG.length,
      questionCount,
    }),
    'utf8',
  );
  // --- /llms-full.txt: every exam page's facts in one file (src/lib/llmsFullTxt.mjs), in directory order.
  writeFileSync(
    join(DIST, 'llms-full.txt'),
    llmsFullTxt({ exams: DIRECTORY_EXAM_IDS.map((id) => fullFacts.find((x) => x.examId === id)).filter(Boolean), generated: new Date().toISOString().slice(0, 10) }),
    'utf8',
  );

  // --- sitemap.xml ---
  await assertNoPublishedUrlWentMissing(sitemapUrls);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url><loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  // --- Service worker --- regenerated now that every page exists. vite-plugin-pwa also writes one
  // during `vite build`, but that copy predates everything this script produced: the precache
  // entries for /learn/, /exams/ etc. would be missing and the home page's revision hash would be
  // Vite's empty shell's, so a content-only rebuild (new current affairs, same JS) would never
  // reach visitors who already had the old worker. Running the same plugin again here computes the
  // manifest from the final files. See vite.config.ts for what is precached.
  await regenerateServiceWorker();

  console.log(
    `Prerendered ${affairs.length} English + ${affairsHi.length} Hindi current-affairs pages and ${notices.length} English + ${noticesHi.length} Hindi exam-notice pages, plus ${Object.keys(PUBLIC_PAGES).length} static pages, ${questionCount} practice questions on their topic lists and a ${sitemapUrls.length}-url sitemap.xml.`,
  );
}

async function regenerateServiceWorker() {
  process.env.PWA_PRERENDERED = '1'; // tells vite.config.ts the prerendered pages now exist
  const { resolveConfig } = await import('vite');
  const config = await resolveConfig({ logLevel: 'warn' }, 'build');
  const pwa = config.plugins.find((plugin) => plugin.name === 'vite-plugin-pwa')?.api;
  if (!pwa) throw new Error('vite-plugin-pwa is not in vite.config.ts - the service worker would be stale');
  await pwa.generateSW();
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
