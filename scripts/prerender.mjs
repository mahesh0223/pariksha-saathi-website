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
  { to: '/app/home', label: 'Home' },
  { to: '/app/study', label: 'Study' },
  { to: '/app/practice', label: 'Practice' },
  { to: '/app/current-affairs', label: 'Affairs' },
  { to: '/app/exam-notices', label: 'Alerts' },
  { to: '/app/progress', label: 'Progress' },
];

function appShell(innerHtml) {
  const nav = NAV_TABS.map((t) => `<a class="app-nav-item" href="${t.to}">${t.label}</a>`).join('');
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

function page({ title, description, path, assets, bodyHtml, structuredData, type = 'article' }) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ld = structuredData ? JSON.stringify(structuredData).replaceAll('</', '<\\/') : null;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/assets/icon-512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary" />
    ${ld ? `<script type="application/ld+json">${ld}</script>` : ''}
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

async function main() {
  const assets = readBuiltAssets();
  const sitemapUrls = [
    { loc: '/', priority: '1.0' },
    { loc: '/onboarding', priority: '0.5' },
    { loc: '/app/current-affairs', priority: '0.9' },
    { loc: '/app/exam-notices', priority: '0.9' },
  ];

  // --- Current affairs ---
  const affairs = await fetch(`${API_BASE}/v1/current-affairs?lang=en&limit=100`).then((r) => r.json());

  const affairsListBody = appShell(`
    <div>
      <h1 class="review-title">Current Affairs</h1>
      ${affairs
        .map(
          (item) => `<a class="update-card-link" href="/app/current-affairs/${item.id}">
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
    </div>
  `);
  writePage('app/current-affairs', page({
    title: 'Current Affairs',
    description: 'Daily current-affairs capsules for SSC, IBPS and SBI exam prep, each dated and sourced so you can verify it yourself.',
    path: '/app/current-affairs',
    assets,
    bodyHtml: affairsListBody,
    type: 'website',
  }));

  for (const item of affairs) {
    const detailBody = appShell(`
      <article class="detail-page">
        <a href="/app/current-affairs" class="detail-back">&larr; Current Affairs</a>
        <div class="detail-meta">${escapeHtml(item.period)} &middot; ${item.editionDate.slice(0, 10)}</div>
        <h1>${escapeHtml(item.title)}</h1>
        <div class="detail-tags">${item.examTags.map(pill).join('')}</div>
        <p class="detail-body">${escapeHtml(item.summary)}</p>
        <div class="detail-source"><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">Official source: ${escapeHtml(item.sourceName)} &#8599;</a></div>
      </article>
    `);
    writePage(`app/current-affairs/${item.id}`, page({
      title: item.title,
      description: item.summary.slice(0, 155),
      path: `/app/current-affairs/${item.id}`,
      assets,
      bodyHtml: detailBody,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: item.title,
        description: item.summary,
        datePublished: item.editionDate,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: { '@type': 'Organization', name: SITE_NAME },
        about: item.examTags,
      },
    }));
    sitemapUrls.push({ loc: `/app/current-affairs/${item.id}`, priority: '0.7', lastmod: item.editionDate.slice(0, 10) });
  }

  // --- Exam notices ---
  const notices = await fetch(`${API_BASE}/v1/exam-updates`).then((r) => r.json());

  const noticesListBody = appShell(`
    <div>
      <h1 class="review-title">Exam Notices &amp; Alerts</h1>
      ${notices
        .map(
          (item) => `<a class="update-card-link" href="/app/exam-notices/${item.id}">
        <div class="card update-card">
          <div class="update-meta">${escapeHtml(item.type)} &middot; verified ${item.lastVerifiedAt.slice(0, 10)}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary.slice(0, 150))}${item.summary.length > 150 ? '…' : ''}</p>
          <span class="update-readmore">Read more &rarr;</span>
        </div>
      </a>`,
        )
        .join('\n')}
    </div>
  `);
  writePage('app/exam-notices', page({
    title: 'Exam Notices & Alerts',
    description: "Official SSC, IBPS and SBI exam notifications, admit card and result alerts, verified against each exam body's own site.",
    path: '/app/exam-notices',
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
        <a href="/app/exam-notices" class="detail-back">&larr; Exam Notices &amp; Alerts</a>
        <div class="detail-meta">${escapeHtml(item.type)} &middot; verified ${item.lastVerifiedAt.slice(0, 10)}</div>
        <h1>${escapeHtml(item.title)}</h1>
        <p class="detail-body">${escapeHtml(item.summary)}</p>
        ${dateRows ? `<div class="detail-dates"><h2>Important dates</h2><dl>${dateRows}</dl></div>` : ''}
        <div class="detail-source"><a href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noreferrer">Official notification &#8599;</a></div>
      </article>
    `);
    writePage(`app/exam-notices/${item.id}`, page({
      title: item.title,
      description: item.summary.slice(0, 155),
      path: `/app/exam-notices/${item.id}`,
      assets,
      bodyHtml: detailBody,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: item.title,
        description: item.summary,
        dateModified: item.lastVerifiedAt,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: { '@type': 'Organization', name: SITE_NAME },
      },
    }));
    sitemapUrls.push({ loc: `/app/exam-notices/${item.id}`, priority: '0.7', lastmod: item.lastVerifiedAt.slice(0, 10) });
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
