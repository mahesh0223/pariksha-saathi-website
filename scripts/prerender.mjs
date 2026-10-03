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

import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { join } from 'node:path';
// Plain .mjs (not .ts) specifically so this works on whatever Node version Cloudflare Pages'
// build image runs - an earlier version of this imported the .ts file directly, relying on
// Node's native TypeScript type-stripping (unflagged only on very recent Node), which silently
// broke production: the build never errors out visibly to us, Cloudflare just keeps serving the
// last successful deploy forever. These .mjs files are the single source of truth for the
// syllabus/lesson pages' EN/HI content either way, shared with the React components under
// src/pages/ - just without compile-time typing on the data shape.
import { EXAM_SYLLABI } from '../src/data/examSyllabi.mjs';
import { TOPIC_LESSONS } from '../src/data/topicLessons.mjs';

const DIST = join(process.cwd(), 'dist');
const SITE_URL = 'https://parikshasaathi.com';
const API_BASE = 'https://api.parikshasaathi.com';
const SITE_NAME = 'Pariksha Saathi';

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function readBuiltAssets() {
  const html = readFileSync(join(DIST, 'index.html'), 'utf8');
  const script = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)?.[1];
  const style = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)?.[1];
  const adsense = html.match(/<script async src="(https:\/\/pagead2\.googlesyndication\.com[^"]+)"[^>]*><\/script>/)?.[1];
  if (!script || !style) throw new Error('Could not find built script/style tags in dist/index.html');
  return { script, style, adsense };
}

const NAV_TABS = [
  { to: '/app/home', label: 'Home', icon: '🏠' },
  { to: '/app/study', label: 'Study', icon: '📖' },
  { to: '/app/practice', label: 'Practice', icon: '📝' },
  { to: '/app/challenge', label: 'Goal', icon: '🏆' },
  { to: '/app/current-affairs-quiz', label: 'CA Quiz', icon: '🌍' },
  { to: '/app/current-affairs', label: 'Affairs', icon: '📰' },
  { to: '/app/exam-notices', label: 'Alerts', icon: '🔔' },
  { to: '/app/progress', label: 'Progress', icon: '📊' },
];

function appShell(innerHtml) {
  // Unlike the live SPA (AppShell.tsx), this static nav doesn't know which tab is "active" and
  // never has - so every label stays visible here rather than icon-only; a crawler/no-JS visitor
  // benefits from the extra text, and .app-bottom-nav's overflow-x:auto keeps this from breaking
  // layout if it doesn't all fit on one row.
  const nav = NAV_TABS.map(
    (t) =>
      `<a class="app-nav-item" href="${t.to}"><span class="app-nav-icon" aria-hidden="true">${t.icon}</span><span class="app-nav-label">${t.label}</span></a>`,
  ).join('');
  return `<div class="app-shell">
  <header class="app-topbar">
    <div class="wrap app-topbar-inner">
      <a href="/" class="app-brand"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</a>
      <a href="/app/account" class="app-account-link">Account</a>
    </div>
  </header>
  <main class="app-content wrap">${innerHtml}</main>
  <nav class="app-bottom-nav">${nav}</nav>
</div>`;
}

function pill(text) {
  return `<span class="pill">${escapeHtml(text)}</span>`;
}

// Mirrors AdSlot.tsx's markup exactly - Auto ads is off account-wide, so this static <ins> (matched
// by React hydrating the same DOM node) is what actually gets an ad, and only on this fixed set of
// real content pages, never on an interactive app screen. See index.html's AdSense comment.
function adSlot(slot) {
  return `<ins class="adsbygoogle ad-slot" style="display:block" data-ad-client="ca-pub-6818930282969815" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
}

// Reused from the Play Store listing (public/assets/feature-graphic-1024x500.png) - matches
// src/hooks/useDocumentMeta.ts's DEFAULT_OG_IMAGE exactly, so a shared link looks the same
// whether it was crawled from the prerendered HTML or visited client-side.
const OG_IMAGE = `${SITE_URL}/assets/feature-graphic-1024x500.png`;

const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" />`;

function page({ title, description, path, assets, bodyHtml, structuredData, type = 'article', lang = 'en', alternateLanguages }) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
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
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/assets/icon-512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    ${FONT_LINKS}
    ${assets.adsense ? `<script async src="${assets.adsense}" crossorigin="anonymous"></script>` : ''}
    <script type="module" crossorigin src="${assets.script}"></script>
    <link rel="stylesheet" crossorigin href="${assets.style}">
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
// prefix built from the structured examId/type fields, never touching the on-page <h1>).
const EXAM_NAMES = {
  ssc_cgl: 'SSC CGL', ssc_chsl: 'SSC CHSL', ssc_mts: 'SSC MTS',
  ibps_po: 'IBPS PO', ibps_clerk: 'IBPS Clerk', sbi_po: 'SBI PO', sbi_clerk: 'SBI Clerk',
};
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
  return `${examPart}${typePart}${title}`;
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

const TRUST_STATS = [
  { value: '7', label: 'exams covered' },
  { value: '100%', label: 'free, no paywall' },
  { value: 'EN / HI', label: 'both languages' },
  { value: 'Offline', label: 'after first visit' },
];

const HOW_IT_WORKS = [
  { n: '1', title: 'Pick your exam(s)', body: 'Choose one or more of SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO or SBI Clerk. Add or change exams any time.' },
  { n: '2', title: 'Study, then practice', body: 'Work through topic-wise lessons, then practice the same topics as quizzes in the real exam pattern, negative marking included.' },
  { n: '3', title: 'Track and revise', body: 'Every wrong answer lands in your Mistake Notebook automatically, so revision stays focused on what you actually got wrong.' },
];

const EXAM_COVERAGE = [
  { name: 'SSC CGL', body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness. <a href="/compare/ssc-cgl-syllabus">Full syllabus &amp; exam pattern &rarr;</a>' },
  { name: 'SSC MTS', body: 'Focused lessons and practice across Numerical Ability, Reasoning and English, plus current-affairs coverage for General Awareness. <a href="/compare/ssc-mts-syllabus">Full syllabus &amp; exam pattern &rarr;</a>' },
  { name: 'SSC CHSL', body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness. <a href="/compare/ssc-chsl-syllabus">Full syllabus &amp; exam pattern &rarr;</a>' },
  { name: 'IBPS PO', body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness. <a href="/compare/ibps-po-syllabus">Full syllabus &amp; exam pattern &rarr;</a>' },
  { name: 'IBPS Clerk', body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness. <a href="/compare/ibps-clerk-syllabus">Full syllabus &amp; exam pattern &rarr;</a>' },
  { name: 'SBI PO', body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking &amp; Economy Awareness. <a href="/compare/sbi-po-syllabus">Full syllabus &amp; exam pattern &rarr;</a>' },
  { name: 'SBI Clerk', body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for General &amp; Financial Awareness. <a href="/compare/sbi-clerk-syllabus">Full syllabus &amp; exam pattern &rarr;</a>' },
];

const FAQS = [
  { q: 'Is Pariksha Saathi free?', a: 'Yes. Every lesson, practice quiz, mock test and current-affairs capsule is free, with no paywalled content.' },
  { q: 'Do I need to create an account?', a: 'No. You can study fully as a guest, with progress saved locally on your device. Create a free account only if you want that progress backed up across devices.' },
  { q: 'Does it work offline?', a: 'Yes, after your first visit. Lessons, quizzes and practice keep working with patchy or no internet, and sync again once you’re back online.' },
  { q: 'Is content available in Hindi?', a: 'Yes. Switch between English and Hindi any time, for the same content, without reinstalling or visiting a separate site.' },
  { q: 'Where does the current-affairs content come from?', a: 'Every current-affairs item and exam notification links to its original official source — PIB or the exam body’s own site — so you can verify it yourself.' },
  { q: 'Is Pariksha Saathi affiliated with SSC, IBPS or SBI?', a: 'No. Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body.' },
];

function homePageBody(affairsPreview, noticesPreview) {
  return `<div>
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="#top"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="#features">Features</a>
            <a href="#current-affairs">Current Affairs</a>
            <a href="#faq">FAQ</a>
            <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy</a>
          </nav>
          <a class="pub-cta" href="/onboarding">Start studying</a>
        </div>
      </header>
      <div id="top" class="hero">
        <div class="hero-rules"></div>
        <div class="wrap hero-grid">
          <div>
            <div class="eyebrow">SSC &middot; IBPS &middot; SBI</div>
            <h1>Exam prep that works even where <em>the signal doesn't.</em></h1>
            <p class="lede">Lessons, practice quizzes, mock tests, and real dated current affairs for SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk — free, right in your browser.</p>
            <div class="cta-row">
              <a class="btn-primary-cream" href="/onboarding">Start studying free</a>
              <a class="btn-ghost-cream" href="#features">See what's inside</a>
            </div>
            <div class="exam-pills"><span>SSC CGL</span><span>SSC MTS</span><span>SSC CHSL</span><span>IBPS PO</span><span>IBPS Clerk</span><span>SBI PO</span><span>SBI Clerk</span></div>
            <div class="trust-bar">
              ${TRUST_STATS.map((s) => `<div class="trust-stat"><div class="trust-value">${escapeHtml(s.value)}</div><div class="trust-label">${escapeHtml(s.label)}</div></div>`).join('\n              ')}
            </div>
          </div>
          <div class="phone-stack">
            <div class="phone-glow"></div>
            <div class="phone"><img src="/assets/screenshots/1-home.jpg" alt="Pariksha Saathi home screen showing streak, and a weak-topic nudge" /></div>
          </div>
        </div>
      </div>
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
          <p class="exam-coverage-note">Not sure whether to go for a bank-wide posting or State Bank of India specifically? <a href="/compare/ibps-po-vs-sbi-po">See how IBPS PO and SBI PO actually differ &rarr;</a></p>
        </div>
      </section>
      <section class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">Topic lessons</div>
            <h2>Worked examples, free to read</h2>
            <p>The same topics the app teaches, as standalone lessons with fully worked solutions — no account needed to read these.</p>
          </div>
          <div class="exam-coverage-grid">
            <div class="exam-coverage-item">
              <h3>Percentages</h3>
              <p>The concept, four worked examples, and a few to try yourself. <a href="/learn/percentages">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Profit and Loss</h3>
              <p>Builds on percentages — CP, SP, discount and marked price, worked out. <a href="/learn/profit-and-loss">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Simple &amp; Compound Interest</h3>
              <p>The one distinction that matters, plus a shortcut worth memorising. <a href="/learn/simple-compound-interest">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Blood Relations</h3>
              <p>A clear approach to tracing relationships, not just answers to memorise. <a href="/learn/blood-relations">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Time, Speed and Distance</h3>
              <p>Unit conversion and the average-speed trap, with trains thrown in. <a href="/learn/time-speed-distance">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Coding-Decoding</h3>
              <p>Four rule-types that cover almost everything actually asked. <a href="/learn/coding-decoding">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Syllogism</h3>
              <p>Pure logic, not real-world knowledge — the Venn-diagram approach that works. <a href="/learn/syllogism">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Ratio and Proportion</h3>
              <p>The foundation for ages, mixtures and partnership questions. <a href="/learn/ratio-and-proportion">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Direction Sense</h3>
              <p>Plot it on a grid and it turns into simple coordinate geometry. <a href="/learn/direction-sense">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Spotting Errors</h3>
              <p>A handful of recurring grammar rules, not obscure trivia. <a href="/learn/spotting-errors">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Average</h3>
              <p>The formula reversed — going from average back to sum. <a href="/learn/average">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Number Series</h3>
              <p>Pattern recognition, narrowed down to the four types that actually come up. <a href="/learn/number-series">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Synonyms and Antonyms</h3>
              <p>Why context, not vocabulary size, is usually what decides the answer. <a href="/learn/synonyms-and-antonyms">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Time and Work</h3>
              <p>Convert everyone to a daily rate, combine, then convert back. <a href="/learn/time-and-work">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Analogy</h3>
              <p>Name the relationship precisely before you look at the options. <a href="/learn/analogy">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>One Word Substitution</h3>
              <p>A narrow, learnable vocabulary list — the same few dozen words repeat. <a href="/learn/one-word-substitution">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Mixture and Alligation</h3>
              <p>The weighted-average formula, run backwards to find a ratio. <a href="/learn/mixture-and-alligation">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Seating Arrangement</h3>
              <p>Sketch the row, fill in what&rsquo;s forced, then eliminate the rest. <a href="/learn/seating-arrangement">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Sentence Improvement</h3>
              <p>The same grammar rules as Spotting Errors, in a pick-the-fix format. <a href="/learn/sentence-improvement">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Mensuration</h3>
              <p>Picking the right formula and plugging in carefully. <a href="/learn/mensuration">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Inequality</h3>
              <p>Chains of coded symbols, and the counterexample trick for ruling conclusions out. <a href="/learn/inequality">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Active and Passive Voice</h3>
              <p>A mechanical three-step transformation, applied consistently across tenses. <a href="/learn/active-passive-voice">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Simplification</h3>
              <p>BODMAS order, not left-to-right — a speed test more than a difficulty test. <a href="/learn/simplification">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Calendar</h3>
              <p>Counting odd days, and the century-year leap-year exception. <a href="/learn/calendar">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Direct and Indirect Speech</h3>
              <p>Tense shifts, pronoun changes, and how questions convert differently. <a href="/learn/direct-indirect-speech">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Partnership</h3>
              <p>Why profit splits by capital &times; time, not capital alone. <a href="/learn/partnership">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Clock</h3>
              <p>A disguised speed problem &mdash; two hands moving at fixed rates. <a href="/learn/clock">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Para Jumbles</h3>
              <p>Following the pronoun and connector chain to the one order that works. <a href="/learn/para-jumbles">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Boat and Stream</h3>
              <p>Time, Speed and Distance in a different costume &mdash; convert, then apply. <a href="/learn/boat-and-stream">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Alphabet Series</h3>
              <p>Number Series with letters &mdash; convert to positions and solve the same way. <a href="/learn/alphabet-series">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Cloze Test</h3>
              <p>Grammar plus meaning &mdash; reading the whole passage before picking an answer. <a href="/learn/cloze-test">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>LCM and HCF</h3>
              <p>Prime factorization, plus the one shortcut connecting the two. <a href="/learn/lcm-and-hcf">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Classification</h3>
              <p>Finding the exact rule the majority share, not just a hunch. <a href="/learn/classification">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Degrees of Comparison</h3>
              <p>Matching an adjective&rsquo;s form to how many things are being compared. <a href="/learn/degrees-of-comparison">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Problems on Ages</h3>
              <p>Algebra in disguise &mdash; one variable, carried through every condition. <a href="/learn/problems-on-ages">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Venn Diagram</h3>
              <p>Inclusion-exclusion &mdash; add the groups, subtract what got counted twice. <a href="/learn/venn-diagram">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Prepositions</h3>
              <p>Fixed pairings to learn like vocabulary, plus a size-based pattern for time and place. <a href="/learn/prepositions">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Permutation and Combination</h3>
              <p>One question decides the formula: does the order of arrangement matter? <a href="/learn/permutation-and-combination">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Ranking and Order</h3>
              <p>One small formula connecting rank from the top, the bottom, and the total. <a href="/learn/ranking-and-order">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Idioms and Phrases</h3>
              <p>Pure recognition &mdash; fixed phrases that can&rsquo;t be worked out from their words. <a href="/learn/idioms-and-phrases">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Probability</h3>
              <p>Careful counting &mdash; favorable outcomes over total outcomes. <a href="/learn/probability">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Statement and Assumption</h3>
              <p>The "if this were false, would it still make sense?" test. <a href="/learn/statement-and-assumption">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Articles</h3>
              <p>"A"/"an" vs "the" &mdash; specific and identified, or just any one example? <a href="/learn/articles">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Pipes and Cisterns</h3>
              <p>Time and Work with a twist &mdash; an outlet pipe gets a negative rate. <a href="/learn/pipes-and-cisterns">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Statement and Conclusion</h3>
              <p>A conclusion only counts if it&rsquo;s a direct restatement, nothing borrowed. <a href="/learn/statement-and-conclusion">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Homophones</h3>
              <p>Words that sound identical &mdash; spelling and meaning are the only tell. <a href="/learn/homophones">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Number System</h3>
              <p>Divisibility shortcuts, plus how remainders behave under addition and multiplication. <a href="/learn/number-system">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Data Sufficiency</h3>
              <p>Judging whether the data is enough &mdash; not computing the final answer. <a href="/learn/data-sufficiency">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Phrasal Verbs</h3>
              <p>Learned the same way as idioms &mdash; one verb-plus-particle combination at a time. <a href="/learn/phrasal-verbs">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Surds and Indices</h3>
              <p>A handful of fixed rules for combining powers of the same base. <a href="/learn/surds-and-indices">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Floor-Based Puzzles</h3>
              <p>Seating Arrangement turned on its side &mdash; the same method, vertically. <a href="/learn/floor-puzzle">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Spelling Correction</h3>
              <p>The correct spelling of one intended word, not a choice between different words. <a href="/learn/spelling-correction">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Data Interpretation</h3>
              <p>Ordinary percentage and average arithmetic, read carefully off a table. <a href="/learn/data-interpretation">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Course of Action</h3>
              <p>Judging whether a response is practical and proportionate, not just well-intentioned. <a href="/learn/course-of-action">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Tag Questions</h3>
              <p>One flip rule &mdash; positive statement, negative tag &mdash; plus matching the auxiliary verb. <a href="/learn/tag-questions">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Quadratic Equations</h3>
              <p>Solve two equations, compare every pair of roots, then read off the relationship. <a href="/learn/quadratic-equations">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Input-Output</h3>
              <p>Apply a fixed machine rule step by step, then read off a position. <a href="/learn/input-output">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Fill in the Blanks</h3>
              <p>Reading the whole sentence for the fixed collocation the blank is testing. <a href="/learn/fill-in-the-blanks">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Approximation</h3>
              <p>Round every number first &mdash; the goal is close, not exact. <a href="/learn/approximation">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Statement and Argument</h3>
              <p>Judging whether a reason is specific and weighty, not just plausible-sounding. <a href="/learn/statement-and-argument">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Para Completion</h3>
              <p>Continuing a paragraph&rsquo;s direction without overreaching or contradicting it. <a href="/learn/para-completion">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Problems on Trains</h3>
              <p>The same Time-Speed-Distance method, plus the train&rsquo;s own length. <a href="/learn/problems-on-trains">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Mathematical Operations</h3>
              <p>Substitute the swapped symbols first, then apply the usual order of operations. <a href="/learn/mathematical-operations">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Commonly Confused Words</h3>
              <p>Affect vs effect, principal vs principle &mdash; learned by meaning, not spelling. <a href="/learn/commonly-confused-words">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Races and Games</h3>
              <p>&quot;Start&quot; and &quot;beats by&quot; &mdash; comparing how far each runner has gone. <a href="/learn/races-and-games">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Word Formation</h3>
              <p>Careful letter-by-letter accounting, not a guessing game. <a href="/learn/word-formation">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Reading Comprehension</h3>
              <p>Every answer comes from the passage itself, not outside knowledge. <a href="/learn/reading-comprehension">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Simple Equations</h3>
              <p>The hard part is translating the sentence into algebra, not solving it. <a href="/learn/simple-equations">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Cause and Effect</h3>
              <p>Deciding whether one statement causes the other, or neither. <a href="/learn/cause-and-effect">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Sentence Rearrangement</h3>
              <p>Reassembling one sentence&rsquo;s fragments, not a paragraph&rsquo;s sentences. <a href="/learn/sentence-rearrangement">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Height and Distance</h3>
              <p>One right triangle, one of three standard angles &mdash; 30&deg;, 45&deg;, or 60&deg;. <a href="/learn/height-and-distance">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Scheduling Puzzle</h3>
              <p>Seating Arrangement&rsquo;s method, applied to a calendar instead of a row. <a href="/learn/scheduling-puzzle">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Punctuation</h3>
              <p>Fixed, learnable rules for commas, apostrophes, and semicolons. <a href="/learn/punctuation">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Chain Rule</h3>
              <p>Three or more quantities at once &mdash; chain the ratios, don&rsquo;t guess. <a href="/learn/chain-rule">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Coded Relationships</h3>
              <p>Blood relations with a symbol key &mdash; decode, then trace the family tree. <a href="/learn/coded-relationships">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Collective Nouns</h3>
              <p>A pride of lions, a pack of wolves &mdash; fixed terms, learned like vocabulary. <a href="/learn/collective-nouns">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Geometry: Lines, Angles and Triangles</h3>
              <p>The angle sum of a triangle, and how an exterior angle relates to it. <a href="/learn/geometry-lines-angles-triangles">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Wrong Number Series</h3>
              <p>Number Series in reverse &mdash; spot the term that breaks the pattern. <a href="/learn/wrong-number-series">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Determiners</h3>
              <p>Much vs many, few vs a few &mdash; countable, uncountable, positive, negative. <a href="/learn/determiners">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Mean, Median and Mode</h3>
              <p>Three different &quot;typical values&quot; &mdash; a sum, a sort, and a count. <a href="/learn/mean-median-mode">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Double Row Seating</h3>
              <p>Two rows facing each other &mdash; Seating Arrangement, doubled. <a href="/learn/double-row-seating">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Sentence Transformation</h3>
              <p>Simple, compound, or complex &mdash; same meaning, different structure. <a href="/learn/sentence-transformation">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Trigonometric Ratios and Identities</h3>
              <p>sin&sup2;&theta; + cos&sup2;&theta; = 1, and what it unlocks &mdash; directly, not word problems. <a href="/learn/trigonometric-ratios-identities">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Comparison Puzzles</h3>
              <p>Taller, shorter, heavier &mdash; merge the clues into one ordered chain. <a href="/learn/comparison-puzzles">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Subject-Verb Agreement</h3>
              <p>Finding the true subject, even when a phrase gets in the way. <a href="/learn/subject-verb-agreement">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Compound Interest: Half-Yearly &amp; Quarterly</h3>
              <p>Same formula &mdash; just adjust the rate and the number of periods first. <a href="/learn/compound-interest-half-yearly-quarterly">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Cubes and Dice</h3>
              <p>One fact &mdash; opposite faces sum to 7 &mdash; unlocks almost every question. <a href="/learn/cubes-and-dice">Read the lesson &rarr;</a></p>
            </div>
            <div class="exam-coverage-item">
              <h3>Infinitives and Gerunds</h3>
              <p>A short, fixed list of verbs to learn &mdash; enjoy reading, decide to accept. <a href="/learn/infinitives-and-gerunds">Read the lesson &rarr;</a></p>
            </div>
          </div>
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
            <div class="pub-footer-brand"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links">
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a>
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/account-deletion.html">Delete Account</a>
              <a href="mailto:sriwastava2@gmail.com">Contact</a>
            </div>
          </div>
          <p class="disclaimer">Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body. We don't sell or share your data with advertisers — ads on this site are served by Google AdSense; see our <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a> for details.</p>
        </div>
      </footer>
    </div>`;
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
          <a class="pub-brand" href="/"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/#features">Features</a>
            <a href="/app/exam-notices">Exam Notices</a>
          </nav>
          <a class="pub-cta" href="/onboarding">Start studying</a>
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
          <li><a href="/app/exam-notices">Latest admit card, result and deadline alerts on Pariksha Saathi &rarr;</a></li>
        </ul>
        <a class="btn-primary-compare" href="/onboarding">Start studying free &rarr;</a>
      </article>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links">
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a>
              <a href="mailto:sriwastava2@gmail.com">Contact</a>
            </div>
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
  const homeHref = '/';
  const enPath = `/compare/${entry.slug}-syllabus`;
  const hiPath = `/hi/compare/${entry.slug}-syllabus`;
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
          <a class="pub-brand" href="${homeHref}"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/app/exam-notices">${examNoticesLabel}</a>
          </nav>
          <a class="pub-cta" href="/onboarding">${startStudyingLabel}</a>
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
        <h2>${escapeHtml(c.recruitsHeading)}</h2>
        <p>${escapeHtml(c.recruitsBody)}</p>
        <h2>${escapeHtml(c.offerHeading)}</h2>
        <p>${escapeHtml(c.offerBody)}</p>
        <h2>${escapeHtml(c.sourceHeading)}</h2>
        <ul class="compare-links">
          <li><a href="${entry.officialUrl}" target="_blank" rel="noreferrer">${escapeHtml(c.officialLinkLabel)} &#8599;</a></li>
          <li><a href="/app/exam-notices">${escapeHtml(c.examNoticesLinkLabel)} &rarr;</a></li>
        </ul>
        <a class="btn-primary-compare" href="/onboarding">${escapeHtml(c.ctaLabel)} &rarr;</a>
      </article>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links">
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a>
              <a href="mailto:sriwastava2@gmail.com">Contact</a>
            </div>
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
  const homeHref = '/';
  const enPath = `/learn/${entry.slug}`;
  const hiPath = `/hi/learn/${entry.slug}`;
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
          <a class="pub-brand" href="${homeHref}"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="/app/exam-notices">${examNoticesLabel}</a>
          </nav>
          <a class="pub-cta" href="/onboarding">${startStudyingLabel}</a>
        </div>
      </header>
      <article class="wrap compare-article">
        <div class="compare-top-row">
          <a href="${homeHref}" class="detail-back">&larr; ${escapeHtml(c.backLabel)}</a>
          <a href="${otherLangHref}" class="compare-lang-switch">${otherLangLabel}</a>
        </div>
        <h1>${escapeHtml(c.pageTitle)}</h1>
        <p class="compare-lede">${escapeHtml(c.lede)}</p>
        <h2>${escapeHtml(c.conceptHeading)}</h2>
        <ul class="lesson-concept-list">
          ${c.conceptBody.map((line) => `<li>${escapeHtml(line)}</li>`).join('\n          ')}
        </ul>
        <h2>${escapeHtml(c.examplesHeading)}</h2>
        ${examples}
        <h2>${escapeHtml(c.practiceHeading)}</h2>
        <p>${escapeHtml(c.practiceIntro)}</p>
        <div class="lesson-practice-list">
          ${practice}
        </div>
        <h2>${escapeHtml(c.relevantForHeading)}</h2>
        <p>${escapeHtml(c.relevantForBody)}</p>
        <h2>${escapeHtml(c.offerHeading)}</h2>
        <p>${escapeHtml(c.offerBody)}</p>
        <a class="btn-primary-compare" href="/onboarding">${escapeHtml(c.ctaLabel)} &rarr;</a>
      </article>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-512.png" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links">
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a>
              <a href="mailto:sriwastava2@gmail.com">Contact</a>
            </div>
          </div>
          <p class="disclaimer">${escapeHtml(c.disclaimer)}</p>
        </div>
      </footer>
    </div>`;
}

async function main() {
  const assets = readBuiltAssets();

  // Fetched before the homepage is written, not after - the homepage's "Latest current affairs"/
  // "Latest exam notices" sections preview the same live data the list pages below use in full.
  const affairs = await fetch(`${API_BASE}/v1/current-affairs?lang=en&limit=100`).then((r) => r.json());
  const notices = await fetch(`${API_BASE}/v1/exam-updates`).then((r) => r.json());

  // --- Homepage --- the SPA's own dist/index.html is otherwise just an empty <div id="root">
  // until React mounts - the single most important page to have real content in, since it's what
  // AdSense's own site review (and every other crawler) checks first for the domain overall.
  writeFileSync(join(DIST, 'index.html'), page({
    title: 'Pariksha Saathi',
    description: 'Free, offline-first exam prep for SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk. Study, practice, and take mock tests right in your browser.',
    path: '/',
    assets,
    bodyHtml: homePageBody(affairs.slice(0, 4), notices.slice(0, 4)),
    type: 'website',
    // Mirrors src/pages/HomePage.tsx's useDocumentMeta call exactly.
    structuredData: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      { '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/assets/icon-512.png` },
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
    description: 'IBPS PO and SBI PO both lead to a Probationary Officer role at a public sector bank, but they’re run by different organisations with different outcomes. Here’s how they actually differ.',
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
        author: { '@type': 'Organization', name: SITE_NAME },
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
    { loc: '/onboarding', priority: '0.5', lastmod: BUILD_DATE },
    { loc: '/compare/ibps-po-vs-sbi-po/', priority: '0.6', lastmod: BUILD_DATE },
    // Trailing slash on every prerendered route: Cloudflare Pages 308-redirects the slash-less
    // form to this one (it resolves {path}/index.html), so this is what actually serves with no
    // extra hop - keeping canonical/sitemap/OG URLs in that same form throughout this file.
    { loc: '/app/current-affairs/', priority: '0.9', lastmod: BUILD_DATE },
    { loc: '/app/exam-notices/', priority: '0.9', lastmod: BUILD_DATE },
  ];

  // --- Syllabus & exam pattern pages --- one per exam x language (14 total), all driven by
  // src/data/examSyllabi.ts. Mirrors src/pages/compare/SyllabusPage.tsx exactly.
  for (const entry of EXAM_SYLLABI) {
    for (const lang of ['en', 'hi']) {
      const c = entry[lang];
      const relPath = lang === 'hi' ? `hi/compare/${entry.slug}-syllabus` : `compare/${entry.slug}-syllabus`;
      const urlPath = `/${relPath}/`;
      const enPath = `/compare/${entry.slug}-syllabus`;
      const hiPath = `/hi/compare/${entry.slug}-syllabus`;
      writePage(relPath, page({
        title: c.pageTitle,
        description: c.lede.slice(0, 155),
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
            author: { '@type': 'Organization', name: SITE_NAME },
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
      sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: BUILD_DATE });
    }
  }

  // --- Topic lesson pages --- one per topic x language, driven by src/data/topicLessons.ts.
  // Mirrors src/pages/learn/LessonArticlePage.tsx exactly.
  for (const entry of TOPIC_LESSONS) {
    for (const lang of ['en', 'hi']) {
      const c = entry[lang];
      const relPath = lang === 'hi' ? `hi/learn/${entry.slug}` : `learn/${entry.slug}`;
      const urlPath = `/${relPath}/`;
      const enPath = `/learn/${entry.slug}`;
      const hiPath = `/hi/learn/${entry.slug}`;
      writePage(relPath, page({
        title: c.pageTitle,
        description: c.lede.slice(0, 155),
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
            author: { '@type': 'Organization', name: SITE_NAME },
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
      sitemapUrls.push({ loc: urlPath, priority: lang === 'en' ? '0.7' : '0.6', lastmod: BUILD_DATE });
    }
  }

  // --- Current affairs ---
  const affairsListBody = appShell(`
    <div>
      <h1 class="review-title">Current Affairs</h1>
      ${affairs
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
        .join('\n')}
      ${affairs.length > 0 ? adSlot('9595409633') : ''}
    </div>
  `);
  writePage('app/current-affairs', page({
    title: 'Current Affairs',
    description: 'Daily current-affairs capsules for SSC, IBPS and SBI exam prep, each dated and sourced so you can verify it yourself.',
    path: '/app/current-affairs/',
    assets,
    bodyHtml: affairsListBody,
    type: 'website',
  }));

  for (const item of affairs) {
    const detailBody = appShell(`
      <article class="detail-page">
        <a href="/app/current-affairs/" class="detail-back">&larr; Current Affairs</a>
        <div class="detail-meta">${escapeHtml(item.period)} &middot; ${item.editionDate.slice(0, 10)}</div>
        <h1>${escapeHtml(item.title)}</h1>
        <div class="detail-tags">${item.examTags.map(pill).join('')}</div>
        <p class="detail-body">${escapeHtml(item.summary)}</p>
        <div class="detail-source"><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">Official source: ${escapeHtml(item.sourceName)} &#8599;</a></div>
        ${adSlot('4454763597')}
      </article>
    `);
    writePage(`app/current-affairs/${item.id}`, page({
      title: item.title,
      description: item.summary.slice(0, 155),
      path: `/app/current-affairs/${item.id}/`,
      assets,
      bodyHtml: detailBody,
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: item.title,
          description: item.summary,
          datePublished: item.editionDate,
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
    sitemapUrls.push({ loc: `/app/current-affairs/${item.id}/`, priority: '0.7', lastmod: item.editionDate.slice(0, 10) });
  }

  // --- Exam notices --- (fetched above, alongside `affairs`, for the homepage preview)
  const noticesListBody = appShell(`
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
    title: 'SSC, IBPS & SBI Admit Card & Result Alerts',
    description: "Official SSC, IBPS and SBI exam notifications, admit card and result alerts, verified against each exam body's own site.",
    path: '/app/exam-notices/',
    assets,
    bodyHtml: noticesListBody,
    type: 'website',
  }));

  for (const item of notices) {
    const dateRows = Object.entries(item.importantDates ?? {})
      .map(([label, value]) => `<div class="detail-date-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join('');
    const detailBody = appShell(`
      <article class="detail-page">
        <a href="/app/exam-notices/" class="detail-back">&larr; Exam Notices &amp; Alerts</a>
        <div class="detail-meta">${escapeHtml(item.type)} &middot; verified ${item.lastVerifiedAt.slice(0, 10)}</div>
        <h1>${escapeHtml(item.title)}</h1>
        <p class="detail-body">${escapeHtml(item.summary)}</p>
        ${dateRows ? `<div class="detail-dates"><h2>Important dates</h2><dl>${dateRows}</dl></div>` : ''}
        <div class="detail-source"><a href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noreferrer">Official notification &#8599;</a></div>
        ${adSlot('5664651910')}
      </article>
    `);
    writePage(`app/exam-notices/${item.id}`, page({
      title: seoNoticeTitle(item.examId, item.type, item.title, item.lastVerifiedAt.slice(0, 4)),
      description: item.summary.slice(0, 155),
      path: `/app/exam-notices/${item.id}/`,
      assets,
      bodyHtml: detailBody,
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: item.title,
          description: item.summary,
          dateModified: item.lastVerifiedAt,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Exam Notices & Alerts', item: `${SITE_URL}/app/exam-notices/` },
            { '@type': 'ListItem', position: 3, name: item.title },
          ],
        },
      ],
    }));
    sitemapUrls.push({ loc: `/app/exam-notices/${item.id}/`, priority: '0.7', lastmod: item.lastVerifiedAt.slice(0, 10) });
  }

  // --- sitemap.xml ---
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

  console.log(
    `Prerendered ${affairs.length} current-affairs pages and ${notices.length} exam-notice pages, plus 2 list pages and a ${sitemapUrls.length}-url sitemap.xml.`,
  );
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
