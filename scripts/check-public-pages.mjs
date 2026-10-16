import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
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
    assert(html.includes('hub-current-affairs'), `${urlPath}: missing the recent current-affairs block`);
    assert(html.includes('hreflang="hi"') && html.includes('hreflang="en"'), `${urlPath}: missing hreflang pair`);
    assert(sitemap.includes(`<loc>https://parikshasaathi.com${urlPath}</loc>`), `${urlPath}: not in the sitemap`);
  }
}
console.log(`Verified ${HUB_EXAM_IDS.length} exam hub page(s) in both languages: every block carries a linked source and a verification date.`);

// Every prerendered page lives at a trailing-slash URL and the host 308-redirects the slash-less form. An
// internal link without the slash therefore costs each crawler a redirect hop (Search Console reported 31
// "Page with redirect" URLs on 2026-10-16, all of this kind) - so no built page may carry one.
{
  const slashless = /href="\/(app\/exam-notices|app\/current-affairs|exams|learn|hi\/exams|hi\/learn|(?:hi\/)?compare\/[a-z0-9-]+)"/g;
  let offenders = 0;
  for (const file of files) {
    const hits = readFileSync(file, 'utf8').match(slashless);
    if (hits) {
      offenders += 1;
      if (offenders <= 5) console.error(`${file}: slash-less internal link(s): ${[...new Set(hits)].join(' ')}`);
    }
  }
  assert(offenders === 0, `${offenders} built page(s) link to a prerendered section without its trailing slash`);
  console.log('Verified that no built page links to a prerendered section without its trailing slash.');
}

// Every current-affairs item page links to its chronological neighbours (src/lib/relatedItems.mjs), so the
// archive is one crawlable chain rather than 150 leaves off the listing page.
{
  const itemPages = files.filter((f) => /\/app\/current-affairs\/[a-z0-9]+\/index\.html$/.test(f));
  assert(itemPages.length > 0, 'no current-affairs item pages were built');
  for (const file of itemPages) {
    const html = readFileSync(file, 'utf8');
    assert(html.includes('class="detail-related"'), `${file}: missing the surrounding-days block`);
    assert(html.includes('item-quiz-static'), `${file}: missing the static inline question`);
  }
  console.log(`Verified ${itemPages.length} current-affairs item page(s) carry their inline question and link to their neighbouring items.`);
}

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
console.log(`Verified the exam chooser (${DIRECTORY_EXAM_IDS.length} exams, both languages), the Exams button in every public header and the daily PDF link on the home page.`);
