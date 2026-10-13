import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { LESSON_CATALOG } from '../src/data/lessonCatalog.mjs';
import { TOPIC_LESSONS } from '../src/data/topicLessons.mjs';
import { TOPIC_SLUGS } from '../src/data/topicSlugs.mjs';
import { EXAM_JOB_PROFILES } from '../src/data/examJobProfiles.mjs';
import { EXAM_JOB_PROFILE_SLUGS } from '../src/data/examJobProfileSlugs.mjs';
assert.deepEqual(LESSON_CATALOG.map(x=>x.slug), TOPIC_SLUGS);
assert.deepEqual(EXAM_JOB_PROFILES.map(x=>x.slug), EXAM_JOB_PROFILE_SLUGS, 'examJobProfileSlugs.mjs is out of sync with examJobProfiles.mjs');
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
}
const sitemap=readFileSync('dist/sitemap.xml','utf8');
assert(!sitemap.includes('/onboarding'));
for(const [,url] of sitemap.matchAll(/<loc>https:\/\/parikshasaathi.com([^<]+)<\/loc>/g))assert(existsSync(`dist${url}index.html`),`Missing sitemap target: ${url}`);
const shell=readFileSync('dist/spa.html','utf8');
assert(!shell.includes('Exam prep that works'));
assert(readFileSync('dist/_redirects','utf8').includes('/spa  200'));
assert(readFileSync('dist/app/current-affairs/index.html','utf8').includes('daily-reading'));
console.log(`Verified ${files.length} HTML files, 124 bilingual lesson routes, catalog, sitemap, ad pause and practice links.`);

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
