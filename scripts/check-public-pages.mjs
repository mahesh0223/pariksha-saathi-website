import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { LESSON_CATALOG } from '../src/data/lessonCatalog.mjs';
import { TOPIC_LESSONS } from '../src/data/topicLessons.mjs';
import { TOPIC_SLUGS } from '../src/data/topicSlugs.mjs';
import { EXAM_JOB_PROFILES } from '../src/data/examJobProfiles.mjs';
import { EXAM_JOB_PROFILE_SLUGS } from '../src/data/examJobProfileSlugs.mjs';
import { HUB_EXAM_IDS } from '../src/data/examHubExams.mjs';
import { EXAM_SYLLABI } from '../src/data/examSyllabi.mjs';
import { EXAM_SYLLABUS_SLUGS } from '../src/data/examSyllabusSlugs.mjs';
import { LESSON_SUBJECTS } from '../src/data/lessonSubjects.mjs';
import { examHubPath } from '../src/lib/examHub.mjs';
import { DIRECTORY_EXAM_IDS, examDirectoryPath } from '../src/lib/examDirectory.mjs';
import { DAILY_PDF_EDITIONS } from '../src/data/downloads.mjs';
import { GENERATED_DIR, lessonModuleEntry } from './split-content.mjs';
assert.deepEqual(LESSON_CATALOG.map(x=>x.slug), TOPIC_SLUGS);
assert.deepEqual(EXAM_JOB_PROFILES.map(x=>x.slug), EXAM_JOB_PROFILE_SLUGS, 'examJobProfileSlugs.mjs is out of sync with examJobProfiles.mjs');
// The entry bundle routes from these slim lists instead of the content modules (see App.tsx) -
// a slug missing here is a page that prerenders fine but 404s once the SPA takes over.
assert.deepEqual(EXAM_SYLLABI.map(x=>x.slug), EXAM_SYLLABUS_SLUGS, 'examSyllabusSlugs.mjs is out of sync with examSyllabi.mjs');
assert.deepEqual([...new Set(LESSON_CATALOG.map(x=>x.subject))], LESSON_SUBJECTS, 'lessonSubjects.mjs is out of sync with lessonCatalog.mjs');
for (const entry of LESSON_CATALOG) {
  assert(!/[<>{}]/.test(entry.title + entry.description), `Invalid catalog text: ${entry.slug}`);
  for (const lang of ['', 'hi/']) assert(existsSync(`dist/${lang}learn/${entry.slug}/index.html`));
}
const library = readFileSync('dist/learn/index.html','utf8');
assert(library.includes('Percentages'));
assert(!library.includes('{f.title}'));
for (const slug of ['percentages', 'cubes-and-dice']) {
  const entry = TOPIC_LESSONS.find(x=>x.slug===slug);
  assert.equal(entry.en.examples.length, entry.hi.examples.length);
  assert.equal(entry.en.practiceQuestions.length, entry.hi.practiceQuestions.length);
  for (const lang of ['', 'hi/']) {
    const html = readFileSync(`dist/${lang}learn/${slug}/index.html`,'utf8');
    assert(html.includes('id="practice"'));
    const key = LESSON_CATALOG.find(x=>x.slug===slug).topicKey;
    assert(html.includes(key ? `/app/practice/topic/${key}` : 'href="#practice"'));
  }
}
// Per-entry content chunks (2026-10-16): src/data/generated/ must mirror the two source modules
// exactly (scripts/split-content.mjs; build and dev run it first, but a stale checkout must not
// pass), no monolithic lesson / job-profile data chunk may be back in the build, and every
// prerendered lesson and job-profile page must preload its own entry's chunk so the article is
// never replaced by a spinner while the data downloads (see src/lib/contentChunks.ts).
for (const [folder, entries, label, moduleEntry] of [['lessons', TOPIC_LESSONS, 'topicLessons.mjs', lessonModuleEntry], ['job-profiles', EXAM_JOB_PROFILES, 'examJobProfiles.mjs', (e) => e]]) {
  const dir = join(GENERATED_DIR, folder);
  assert(existsSync(dir), `${dir} is missing - run \`npm run generate\``);
  assert.deepEqual(readdirSync(dir).sort(), entries.map((e) => `${e.slug}.mjs`).sort(), `src/data/generated/${folder} is out of sync with ${label} - run \`npm run generate\``);
  for (const entry of entries) {
    const generated = (await import(join(dir, `${entry.slug}.mjs`))).default;
    assert.deepEqual(generated, JSON.parse(JSON.stringify(moduleEntry(entry))), `src/data/generated/${folder}/${entry.slug}.mjs differs from ${label} - run \`npm run generate\``);
  }
}
const builtChunks = readdirSync('dist/assets');
for (const monolith of ['topicLessons-', 'examJobProfiles-', 'generalAwarenessLessons-']) assert(!builtChunks.some((f) => f.startsWith(monolith)), `the whole-catalog ${monolith}*.js chunk is back in the build`);
const manifest = JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf8'));
for (const [entries, folder, pagePath, pageSource] of [
  [TOPIC_LESSONS, 'lessons', (slug, lang) => `dist/${lang}learn/${slug}/index.html`, 'src/pages/learn/LessonArticlePage.tsx'],
  [EXAM_JOB_PROFILES, 'job-profiles', (slug, lang) => `dist/${lang}compare/${slug}-job-profile/index.html`, 'src/pages/compare/JobProfilePage.tsx'],
]) {
  for (const entry of entries) {
    const chunk = manifest[`src/data/generated/${folder}/${entry.slug}.mjs`]?.file;
    assert(chunk, `no built chunk for src/data/generated/${folder}/${entry.slug}.mjs`);
    // One entry per chunk: a chunk carrying another slug's content would mean the split regressed into a shared chunk.
    const js = readFileSync(`dist/${chunk}`, 'utf8');
    assert(new RegExp(`slug["']?:\\s*["'\`]${entry.slug}["'\`]`).test(js), `dist/${chunk} does not carry ${entry.slug}`);
    assert(statSync(`dist/${chunk}`).size < 120_000, `dist/${chunk} is ${statSync(`dist/${chunk}`).size} bytes - more than one entry's worth of content?`);
    for (const lang of ['', 'hi/']) {
      const html = readFileSync(pagePath(entry.slug, lang), 'utf8');
      for (const source of [pageSource, `src/data/generated/${folder}/${entry.slug}.mjs`]) assert(html.includes(`<link rel="modulepreload" crossorigin href="/${manifest[source].file}">`), `${pagePath(entry.slug, lang)}: missing modulepreload for ${source}`);
    }
  }
}
console.log(`Verified ${TOPIC_LESSONS.length} lesson and ${EXAM_JOB_PROFILES.length} job-profile content chunks: generated modules in sync, one chunk per entry, preloaded by their pages.`);

function htmlFiles(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?htmlFiles(join(dir,e.name)):e.name.endsWith('.html')?[join(dir,e.name)]:[]); }
const files=htmlFiles('dist');
for (const file of files) {
  const html=readFileSync(file,'utf8');
  assert(!html.includes('pagead2.googlesyndication.com'),`Unexpected ad runtime: ${file}`);
  assert(!html.includes('class="adsbygoogle'),`Unexpected ad unit: ${file}`);
  assert(html.includes('google-adsense-account'),`Missing verification: ${file}`);
  for (const [,src] of html.matchAll(/(?:src|href)="(\/assets\/[^"#]+)"/g)) assert(existsSync(`dist${src}`),`${file}: missing ${src}`);
  for (const [,set] of html.matchAll(/srcset="([^"]+)"/g)) for (const src of set.split(',').map(s=>s.trim().split(/\s+/)[0])) assert(existsSync(`dist${src}`),`${file}: missing ${src} (srcset)`);
  // Performance contract (2026-10-16): fonts self-hosted and declared inline, the entry CSS inlined
  // rather than linked, and the PWA manifest on every page - see index.html's shared-head block.
  assert(!html.includes('fonts.googleapis.com'),`Google Fonts request crept back in: ${file}`);
  assert(html.includes('/fonts/fraunces-latin-v') && html.includes('@font-face'),`Missing inline @font-face: ${file}`);
  assert(!/<link rel="stylesheet"[^>]*\/assets\//.test(html),`Entry stylesheet is linked instead of inlined: ${file}`);
  assert(html.includes('rel="manifest"'),`Missing web manifest link: ${file}`);
  // 2026-10-16: the rupee sign must come from the system font - U+20B9 in a web font's unicode-range made every
  // lesson and job-profile page (English ones included) download the 24 KB latin-ext and 79 KB Devanagari files
  // before the JavaScript could run. Same for the "read in Hindi" link, see ComparePage.css.
  for (const [, range] of html.matchAll(/unicode-range:([^;}]+)/g)) {
    for (const part of range.split(',')) {
      const [lo, hi = lo] = part.trim().replace(/^U\+/i, '').split('-').map((h) => parseInt(h.replace(/\?/g, 'F'), 16));
      assert(!(lo <= 0x20b9 && 0x20b9 <= hi), `${file}: a web font's unicode-range covers U+20B9 (₹) again: ${part.trim()}`);
    }
  }
  assert(!/\.compare-lang-switch\{[^}]*Devanagari/.test(html), `${file}: the language-switch link is back on the Devanagari web font`);
}
for (const [,href] of readFileSync('dist/index.html','utf8').matchAll(/href="(\/fonts\/[^"]+)"/g)) assert(existsSync(`dist${href}`),`missing font ${href}`);
assert(readFileSync('dist/index.html','utf8').includes('id="home-preview"'),'home page is missing its baked preview JSON');
// Service worker: generated after prerendering (scripts/prerender.mjs), precaches the shell and never touches PDFs.
assert(existsSync('dist/sw.js') && existsSync('dist/manifest.webmanifest'),'service worker or manifest missing');
const sw=readFileSync('dist/sw.js','utf8');
for (const url of ['index.html','spa.html','learn/index.html','exams/index.html','fonts/fraunces-latin-v']) assert(sw.includes(url),`sw.js does not precache ${url}`);
assert(!/"pdf\//.test(sw) && !sw.includes('.pdf"'),'sw.js precaches a PDF');
assert(existsSync('dist/_headers') && readFileSync('dist/_headers','utf8').includes('/assets/*'),'_headers missing the immutable /assets/* rule');
const sitemap=readFileSync('dist/sitemap.xml','utf8');
assert(!sitemap.includes('/onboarding'));
for(const [,url] of sitemap.matchAll(/<loc>https:\/\/parikshasaathi.com([^<]+)<\/loc>/g))assert(existsSync(`dist${url}index.html`),`Missing sitemap target: ${url}`);
const shell=readFileSync('dist/spa.html','utf8');
assert(!shell.includes('Exam prep that works'));
assert(readFileSync('dist/_redirects','utf8').includes('/spa  200'));
assert(readFileSync('dist/app/current-affairs/index.html','utf8').includes('daily-reading'));
console.log(`Verified ${files.length} HTML files, ${LESSON_CATALOG.length} bilingual lesson routes, catalog, sitemap, ad pause, practice links, inline fonts/CSS, service worker and _headers.`);

assert(existsSync('dist/404.html'));
assert(!readFileSync('dist/_redirects','utf8').includes('/*  /spa'));

// Standing policy since 2026-10-13 (a real incident: a 44-item afternoon batch landed with only
// 21 having a "learning context" note, reviving the thin/replicated-content risk an AdSense audit
// had specifically flagged): every current-affairs item published FROM THAT DATE ON must carry a
// genuine note before it goes live - no exceptions, and no forcing a shaky one just to pass this
// check (see currentAffairsReading.mjs's own comment on when a note is and isn't warranted).
// Earlier items are grandfathered - this isn't a mandate to backfill the whole archive, just a
// gate on what gets published next. If this ever fails, the fix is to write the missing note (or
// hold the item back), not to loosen this check.
const POLICY_EFFECTIVE_DATE = '2026-10-13';
const noNoteSinceGate = [];
for (const dir of readdirSync('dist/app/current-affairs', { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const file = `dist/app/current-affairs/${dir.name}/index.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, 'utf8');
  const dateMatch = html.match(/"datePublished":"(\d{4}-\d{2}-\d{2})/);
  if (!dateMatch) continue; // not a dated article page (e.g. a stray non-item file)
  if (dateMatch[1] < POLICY_EFFECTIVE_DATE) continue; // grandfathered
  if (!html.includes('class="news-learning"')) noNoteSinceGate.push(`${dir.name} (${dateMatch[1]})`);
}
assert(
  noNoteSinceGate.length === 0,
  `${noNoteSinceGate.length} current-affairs item(s) published on/after ${POLICY_EFFECTIVE_DATE} have no learning note, violating the standing policy: ${noNoteSinceGate.join(', ')}`,
);

// Exam hub pages: a number never appears without its official source and the date it was last checked,
// so every hub page must carry linked, dated source lines, real tables, a language twin and a sitemap entry.
for (const examId of HUB_EXAM_IDS) {
  for (const lang of ['en', 'hi']) {
    const urlPath = examHubPath(examId, lang);
    const html = readFileSync(`dist${urlPath}index.html`, 'utf8');
    const sourceLines = [...html.matchAll(/<p class="hub-source">([^]*?)<\/p>/g)].map((m) => m[1]);
    // pattern, eligibility and dates always carry one; vacancies and each cut-off table add more when present.
    assert(sourceLines.length >= 3, `${urlPath}: expected a source line under every block, found ${sourceLines.length}`);
    for (const line of sourceLines) {
      assert(/href="https?:\/\//.test(line), `${urlPath}: a source line has no link: ${line.slice(0, 80)}`);
      assert(/\d{4}/.test(line), `${urlPath}: a source line has no verification date: ${line.slice(0, 80)}`);
    }
    assert(html.includes('<table class="hub-table">'), `${urlPath}: no pattern table`);
    assert(html.includes('hreflang="hi"') && html.includes('hreflang="en"'), `${urlPath}: missing hreflang pair`);
    assert(sitemap.includes(`<loc>https://parikshasaathi.com${urlPath}</loc>`), `${urlPath}: not in the sitemap`);
  }
}
console.log(`Verified ${HUB_EXAM_IDS.length} exam hub page(s) in both languages: every block carries a linked source and a verification date.`);

// AI-drafted General Awareness lessons must say so: no human byline on text a human has not line-edited, and
// a visible key-facts list and practice questions on every page in both languages.
const aiLessons = TOPIC_LESSONS.filter((entry) => entry.credit === 'ai-assisted');
assert(aiLessons.length > 0, 'expected the General Awareness lessons to be present');
for (const entry of aiLessons) {
  for (const lang of ['', 'hi/']) {
    const html = readFileSync(`dist/${lang}learn/${entry.slug}/index.html`, 'utf8');
    assert(!/Written by Mahesh Srivastava|लेखक: महेश श्रीवास्तव/.test(html), `${lang}learn/${entry.slug}: human byline on an AI-drafted lesson`);
    assert(/AI assistance|AI की सहायता/.test(html), `${lang}learn/${entry.slug}: missing the AI-assistance credit`);
    assert(html.includes('lesson-concept-list') && html.includes('lesson-practice-item'), `${lang}learn/${entry.slug}: missing key facts or practice questions`);
  }
}
console.log(`Verified ${aiLessons.length} AI-drafted lesson(s) in both languages: credit line present, no human byline.`);

// Every public page reaches the exam chooser from its header (the nav links are hidden on phones, so the button
// sits outside them), the chooser lists every exam and links only to pages that were built, and the home page
// carries the latest daily current-affairs PDF.
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('class="pub-header"')) assert(html.includes('class="pub-exams-link"'), `${file}: header has no Exams button`);
}
for (const lang of ['en', 'hi']) {
  const dirPath = examDirectoryPath(lang);
  const dirHtml = readFileSync(`dist${dirPath}index.html`, 'utf8');
  assert(sitemap.includes(`<loc>https://parikshasaathi.com${dirPath}</loc>`), `${dirPath}: not in the sitemap`);
  for (const examId of HUB_EXAM_IDS) assert(dirHtml.includes(`href="${examHubPath(examId, lang)}"`), `${dirPath}: missing the hub link for ${examId}`);
  for (const [, href] of dirHtml.matchAll(/<a href="(\/[^"#]*)"/g)) {
    if (/^\/(hi\/)?(exams|compare)\//.test(href)) assert(existsSync(`dist${href}index.html`), `${dirPath}: links to a page that was not built: ${href}`);
  }
  const names = [...dirHtml.matchAll(/<article class="exam-dir-card">/g)].length;
  assert.equal(names, DIRECTORY_EXAM_IDS.length, `${dirPath}: expected ${DIRECTORY_EXAM_IDS.length} exams, found ${names}`);
}
const home = readFileSync('dist/index.html', 'utf8');
const latestPdf = DAILY_PDF_EDITIONS[0];
assert(home.includes(`href="${latestPdf.file}"`), 'home page is missing the latest daily PDF link');
assert(existsSync(`dist${latestPdf.file}`), `the latest daily PDF is not in dist: ${latestPdf.file}`);
assert(home.includes('href="/exams/"'), 'home page does not link to the exam chooser');
// Hydration contract (2026-10-16): src/main.tsx HYDRATES the prerendered home page, so #root must hold exactly the
// DOM HomePage.tsx renders - no whitespace-only text nodes between elements, CTAs as <a>, and nothing that is not a
// component node (the preview JSON sits after #root). `npm run check:hydration` runs the real thing in Chrome; this is
// the static guard that catches the common regressions without a browser.
const homeRootStart = home.indexOf('<div id="root">') + '<div id="root">'.length;
const homeRootEnd = home.indexOf('<script type="application/json" id="home-preview">');
assert(homeRootStart > '<div id="root">'.length && homeRootEnd > homeRootStart, 'home page: #root or the preview JSON after it is missing');
const homeRoot = home.slice(homeRootStart, homeRootEnd);
assert(homeRoot.endsWith('</div>') && homeRoot.length > 5000, 'home page: the preview JSON must directly follow #root, outside it');
const stray = homeRoot.match(/>\s+</);
assert(!stray, `home page: whitespace between elements inside #root breaks hydration (near "${homeRoot.slice(Math.max(0, stray?.index - 60), stray?.index + 20)}")`);
assert(!homeRoot.includes('<button'), 'home page: a <button> inside #root; HomePage.tsx renders its CTAs as <a href="/onboarding">');
assert(homeRoot.includes('<a class="pub-cta" href="/onboarding">Start studying</a>') && homeRoot.includes('<a class="btn-primary-cream" href="/onboarding">Start studying free</a>'), 'home page: the Start studying CTAs are not the <a href="/onboarding"> links HomePage.tsx renders');
assert(/<div class="card card-raised update-card">/.test(homeRoot), 'home page: preview cards must carry the same classes as the Card component (card card-raised update-card)');
console.log('Verified the home page hydration contract statically (no whitespace text nodes in #root, anchors for CTAs, preview JSON outside #root).');
console.log(`Verified the exam chooser (${DIRECTORY_EXAM_IDS.length} exams, both languages), the Exams button in every public header and the daily PDF link on the home page.`);
