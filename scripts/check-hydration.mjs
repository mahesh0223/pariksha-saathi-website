// Loads every kind of hydrated page (the home page, an English and a Hindi lesson, a job profile;
// see PAGES) in headless Chrome and fails unless React HYDRATED the prerendered markup instead of
// rebuilding it (see src/main.tsx and homePageBody / lessonPageBody / jobProfilePageBody in
// scripts/prerender.mjs). The check is direct: a script injected before the page's own records the parsed <h1> and every
// element under #root the moment parsing ends (readyState "interactive" fires before any deferred
// module script runs), then after React has mounted it asserts those same nodes are still in the
// document, that React's fiber is attached to them, and that no hydration error or exception was
// reported. Needs Google Chrome (CHROME_PATH overrides the default locations); no other dependency.
//
//   npm run build && npm run check:hydration
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { serveDist } from './serve-dist.mjs';

const CHROME = process.env.CHROME_PATH ?? [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find(existsSync);
if (!CHROME) { console.error('check-hydration: Google Chrome not found; set CHROME_PATH'); process.exit(2); }
if (!existsSync('dist/index.html')) { console.error('check-hydration: dist/index.html missing - run `npm run build` first'); process.exit(2); }

// One page per hydrated route shape. The lesson and job-profile pages render inside App.tsx's
// Suspense boundary, so their hydration happens in React's follow-up pass (prerender.mjs wraps
// them in <!--$--> / <!--/$-->); the loop below waits for that pass like any other.
// percentages = a worked-examples lesson, indian-polity-and-constitution = a key-facts lesson (the two shapes
// lessonPageBody() has branches for); one job profile in each language.
const PAGES = ['/', '/learn/percentages/', '/hi/learn/percentages/', '/learn/indian-polity-and-constitution/', '/compare/ssc-cgl-job-profile/', '/hi/compare/ssc-cgl-job-profile/'];
for (const path of PAGES) {
  const file = `dist${path}index.html`;
  if (!existsSync(file)) { console.error(`check-hydration: ${file} missing - run \`npm run build\` first`); process.exit(2); }
}

const BEFORE_PAGE_SCRIPTS = `
  document.addEventListener('readystatechange', () => {
    if (document.readyState !== 'interactive' || window.__prerendered) return;
    const root = document.getElementById('root');
    const nodes = new WeakSet();
    const all = root ? root.querySelectorAll('*') : [];
    for (const el of all) nodes.add(el);
    window.__prerendered = { nodes, count: all.length, h1: document.querySelector('#root h1'), rootChild: root && root.firstElementChild };
  });
  window.__lcp = [];
  new PerformanceObserver((list) => { for (const e of list.getEntries()) window.__lcp.push(e); }).observe({ type: 'largest-contentful-paint', buffered: true });
`;
const INSPECT = `(() => {
  const p = window.__prerendered; const root = document.getElementById('root');
  if (!p || !root) return { error: 'no #root or no snapshot' };
  const h1 = document.querySelector('#root h1');
  const all = root.querySelectorAll('*');
  let kept = 0; for (const el of all) if (p.nodes.has(el)) kept++;
  const last = window.__lcp[window.__lcp.length - 1];
  const describe = (el) => el ? el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').join('.') : '') : null;
  return {
    prerenderedCount: p.count, nowCount: all.length, kept,
    h1Kept: !!h1 && h1 === p.h1, rootChildKept: root.firstElementChild === p.rootChild,
    reactAttached: !!h1 && Object.keys(h1).some((k) => k.startsWith('__reactFiber$')),
    lcp: last ? { element: describe(last.element), prerendered: !!last.element && p.nodes.has(last.element), startTime: Math.round(last.startTime) } : null,
  };
})()`;

class Cdp {
  constructor(ws) {
    this.ws = ws; this.nextId = 0; this.pending = new Map(); this.listeners = [];
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id) {
        const p = this.pending.get(msg.id); this.pending.delete(msg.id);
        if (msg.error) p.reject(new Error(`${msg.error.message} (${p.method})`)); else p.resolve(msg.result);
      } else for (const fn of this.listeners) fn(msg);
    });
  }
  send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = ++this.nextId;
      this.pending.set(id, { resolve, reject, method });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  on(fn) { this.listeners.push(fn); }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), 'ps-hydration-'));
const site = await serveDist();
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--window-size=412,915', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let failed = false;
try {
  const wsUrl = await new Promise((resolve, reject) => {
    let err = '';
    chrome.stderr.on('data', (chunk) => { err += chunk; const m = err.match(/DevTools listening on (ws:\/\/\S+)/); if (m) resolve(m[1]); });
    chrome.on('exit', (code) => reject(new Error(`Chrome exited with ${code}: ${err.slice(-500)}`)));
    setTimeout(() => reject(new Error('Chrome did not expose a DevTools endpoint in 15 s')), 15000);
  });
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => { ws.addEventListener('open', resolve); ws.addEventListener('error', reject); });
  const cdp = new Cdp(ws);
  for (const path of PAGES) {
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    const s = (method, params) => cdp.send(method, params, sessionId);
    const problems = [];
    const notes = [];
    let loaded = false;
    cdp.on((msg) => {
      if (msg.sessionId !== sessionId) return;
      if (msg.method === 'Runtime.exceptionThrown') problems.push(`exception: ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`);
      if (msg.method === 'Runtime.consoleAPICalled' && (msg.params.type === 'error' || msg.params.type === 'warning')) {
        const text = msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ');
        const isHydration = /hydrat|Minified React error|did not match|server rendered HTML/i.test(text);
        (isHydration ? problems : notes).push(`console.${msg.params.type}: ${text.slice(0, isHydration ? 4000 : 400)}`);
      }
      if (msg.method === 'Page.loadEventFired') loaded = true;
    });
    await s('Runtime.enable');
    await s('Page.enable');
    await s('Page.addScriptToEvaluateOnNewDocument', { source: BEFORE_PAGE_SCRIPTS });
    await s('Page.navigate', { url: `http://127.0.0.1:${site.port}${path}` });
    const deadline = Date.now() + 15000;
    let result;
    // React mounts from a scheduled task after the module runs (and hydrates a Suspense boundary's
    // content in a later, low-priority pass); wait until a fiber is attached to the <h1> or time runs out.
    do {
      await sleep(200);
      result = (await s('Runtime.evaluate', { expression: INSPECT, returnByValue: true })).result.value;
    } while (!(loaded && result?.reactAttached) && Date.now() < deadline);
    await sleep(500); // let any recoverable error surface
    if (!result || result.error) problems.push(`inspection failed: ${result?.error ?? 'no result'}`);
    else {
      if (!result.reactAttached) problems.push('React never attached to the prerendered <h1> (did it mount at all?)');
      if (!result.h1Kept) problems.push('the <h1> in the document is not the prerendered one - React rebuilt the DOM instead of hydrating it');
      if (!result.rootChildKept) problems.push('#root\'s first child was replaced - React rebuilt the DOM instead of hydrating it');
      if (result.kept < result.prerenderedCount * 0.9) problems.push(`only ${result.kept} of ${result.prerenderedCount} prerendered elements survived the mount`);
    }
    for (const n of notes) console.log(`  (note) ${n}`);
    if (result && !result.error) console.log(`${path}: ${result.kept}/${result.prerenderedCount} prerendered elements kept (${result.nowCount} now), h1 kept: ${result.h1Kept}, React attached: ${result.reactAttached}, LCP: ${result.lcp ? `${result.lcp.element} at ${result.lcp.startTime} ms (prerendered: ${result.lcp.prerendered})` : 'no entry'}`);
    if (problems.length) {
      failed = true;
      console.error(`check-hydration FAILED on ${path}:`);
      for (const p of problems) console.error(`  - ${p}`);
    }
    await cdp.send('Target.closeTarget', { targetId }).catch(() => {});
  }
  if (!failed) console.log(`check-hydration OK: React hydrated all ${PAGES.length} prerendered pages without a mismatch.`);
  await cdp.send('Browser.close').catch(() => {});
} catch (error) {
  failed = true;
  console.error(`check-hydration FAILED: ${error.message}`);
} finally {
  // Browser.close above asks Chrome to quit; wait for it so the profile directory is no longer being written.
  await new Promise((resolve) => { if (chrome.exitCode !== null) resolve(); else { chrome.once('exit', resolve); chrome.kill(); setTimeout(resolve, 3000); } });
  await site.close();
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* a leftover temp profile is harmless */ }
}
process.exit(failed ? 1 : 0);
