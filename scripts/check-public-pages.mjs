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
import { examHubPath, NEXT_STEP_PILOT_HUBS } from '../src/lib/examHub.mjs';
import { EXAM_HUB_EXTRAS } from '../src/data/examHubExtras.mjs';
import { TELEGRAM_CHANNEL_URL, TELEGRAM_JOIN_URL } from '../src/data/socialLinks.mjs';
import { pyqIndexSource } from '../src/lib/pyqPapersBuild.mjs';
import { PYQ_INDEX_EXAMS, pyqIndexPath, pyqPaperPath } from '../src/lib/pyqPath.mjs';
import { examHubExtrasSource } from '../src/lib/examHubExtrasBuild.mjs';
import { DIRECTORY_EXAM_IDS, examDirectoryPath } from '../src/lib/examDirectory.mjs';
import { examCalendarPath } from '../src/lib/examCalendar.mjs';
import { GK_INSIGHTS_EXAMS, GK_INSIGHTS_SUMMARY, gkInsightsPath } from '../src/lib/gkInsights.mjs';
import { GK_INSIGHTS } from '../src/data/gkInsights.mjs';
import { PYQ_PAPER_INDEX } from '../src/data/pyqPaperIndex.mjs';
import { PLAY_STORE_URL } from '../src/data/siteLinks.mjs';
import { typingTestPath } from '../src/lib/typingPage.mjs';
import { TYPING_MODES, TYPING_SOURCES } from '../src/data/typingTest.mjs';
import { DAILY_PDF_EDITIONS } from '../src/data/downloads.mjs';
import { LESSON_CATALOG_HI } from '../src/data/lessonCatalogHi.mjs';
import { deriveHindiCatalogEntry } from '../src/lib/lessonCatalogHi.mjs';
import { PUBLIC_PAGES, publicPageMeta, SITE_SHOWS_ADS } from '../src/data/publicPages.mjs';
import { PUBLIC_PAGE_ROUTES } from '../src/data/publicPageRoutes.mjs';
import { TRUST_LINES } from '../src/data/trustLines.mjs';
import { NOTICE_GUIDANCE } from '../src/data/examNoticeGuidance.mjs';
assert.deepEqual(LESSON_CATALOG.map(x=>x.slug), TOPIC_SLUGS);
assert.deepEqual(EXAM_JOB_PROFILES.map(x=>x.slug), EXAM_JOB_PROFILE_SLUGS, 'examJobProfileSlugs.mjs is out of sync with examJobProfiles.mjs');
// The entry bundle routes from these slim lists instead of the content modules (see App.tsx) -
// a slug missing here is a page that prerenders fine but 404s once the SPA takes over.
assert.deepEqual(EXAM_SYLLABI.map(x=>x.slug), EXAM_SYLLABUS_SLUGS, 'examSyllabusSlugs.mjs is out of sync with examSyllabi.mjs');
assert.deepEqual([...new Set(LESSON_CATALOG.map(x=>x.subject))], LESSON_SUBJECTS, 'lessonSubjects.mjs is out of sync with lessonCatalog.mjs');
// The route table and preloadRoute() in App.tsx both come from this map (2026-10-17: /hi/ was in the route table
// but not in the preload list, so the prerendered Hindi landing page was swapped for a spinner while its chunk
// downloaded). A key here must be a page publicPages.mjs builds, at the path it builds it.
assert.deepEqual(
  PUBLIC_PAGE_ROUTES,
  Object.fromEntries(Object.keys(PUBLIC_PAGES).map((key) => [publicPageMeta(key).path.replace(/\/$/, ''), key])),
  'publicPageRoutes.mjs is out of sync with publicPages.mjs',
);
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
  // Exception: the ~8,000 /q/ practice-question pages link the stylesheet (inlining 28 KB into each would add
  // ~200 MB to the deploy) and load no app JavaScript - checked in the /q/ block below.
  const isQuestionPage = /dist\/(hi\/)?q\//.test(file);
  if (!isQuestionPage) assert(!/<link rel="stylesheet"[^>]*\/assets\//.test(html),`Entry stylesheet is linked instead of inlined: ${file}`);
  assert(html.includes('rel="manifest"'),`Missing web manifest link: ${file}`);
}
// /q/ practice-question pages (src/lib/questionPage.mjs): plain HTML with a linked stylesheet, no app JavaScript,
// a canonical, an answer section and a credit line on every question page, and one page per entry in the data.
{
  const qFiles = files.filter((f) => /dist\/(hi\/)?q\//.test(f));
  for (const file of qFiles) {
    const html = readFileSync(file, 'utf8');
    assert(/<link rel="stylesheet"[^>]*\/assets\//.test(html), `Question page has no stylesheet: ${file}`);
    assert(!/<script type="module"/.test(html), `Question page loads app JavaScript: ${file}`);
    assert(/<link rel="canonical" href="https:\/\/parikshasaathi\.com\/(hi\/)?q\//.test(html), `Question page without a /q/ canonical: ${file}`);
  }
  for (const lang of ['en', 'hi']) {
    const data = JSON.parse(readFileSync(`src/data/question-pages/${lang}.json`, 'utf8'));
    for (const q of data) {
      const file = `dist/${lang === 'hi' ? 'hi/' : ''}q/${q.slug}/index.html`;
      assert(existsSync(file), `Missing question page ${file}`);
      const html = readFileSync(file, 'utf8');
      assert(html.includes('class="news-learning"') && html.includes('class="lesson-credit"'), `Question page without its answer section or credit: ${file}`);
    }
  }
  console.log(`Verified ${qFiles.length} /q/ pages: linked stylesheet, no app JavaScript, canonical, answer section and credit line.`);
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

// The hub's syllabus summary and practice links come from a generated module; it must match its sources.
assert(
  readFileSync('src/data/examHubExtras.mjs', 'utf8') === examHubExtrasSource(),
  'src/data/examHubExtras.mjs is stale (the syllabus pages or question topics changed): run node scripts/gen-exam-hub-extras.mjs and commit it',
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
      // Every sourced block can be challenged in one tap (src/lib/examHub.mjs hubReportMailto).
      assert(/class="hub-report" href="mailto:[^"]*subject=Exam%20page%20error/.test(line), `${urlPath}: a source line has no "Report an error" link: ${line.slice(0, 80)}`);
    }
    // The live-mock line is an app call-to-action: it may only appear once a public Play listing exists.
    if (!PLAY_STORE_URL) assert(!html.includes('class="hub-live-mock"'), `${urlPath}: live-mock line rendered without a public Play Store URL`);
    assert(html.includes('<table class="hub-table">'), `${urlPath}: no pattern table`);
    assert(html.includes('hub-current-affairs'), `${urlPath}: missing the recent current-affairs block`);
    assert(html.includes('hreflang="hi"') && html.includes('hreflang="en"'), `${urlPath}: missing hreflang pair`);
    assert(sitemap.includes(`<loc>https://parikshasaathi.com${urlPath}</loc>`), `${urlPath}: not in the sitemap`);
    // Syllabus summary, practice links and FAQ (src/lib/examHub.mjs): practice links must land on built /q/ lists, and
    // the FAQ must be on the page as well as in the FAQPage data.
    if (EXAM_HUB_EXTRAS[examId]?.syllabus) assert(html.includes('<dl class="hub-syllabus">'), `${urlPath}: no syllabus summary`);
    const topicLinks = [...html.matchAll(/<ul class="hub-topic-links">([^]*?)<\/ul>/g)].flatMap((m) => [...m[1].matchAll(/href="([^"]+)"/g)].map((h) => h[1]));
    if (EXAM_HUB_EXTRAS[examId]?.practice.length) assert(topicLinks.length > 0, `${urlPath}: no practice links`);
    for (const href of topicLinks) assert(existsSync(`dist${href}index.html`), `${urlPath}: practice link ${href} has no built page`);
    assert(html.includes('<div class="hub-faq">') && html.includes('"@type":"FAQPage"'), `${urlPath}: FAQ block or FAQPage data missing`);
    // Previous-year questions, when a hub has any: every paper row links to the official paper/key it came from.
    const pyqBlock = html.match(/<ul class="hub-notices hub-pyq">([^]*?)<\/ul>/);
    if (pyqBlock) {
      for (const li of pyqBlock[1].matchAll(/<li>([^]*?)<\/li>/g)) {
        assert(/href="https?:\/\//.test(li[1]), `${urlPath}: a previous-year paper row has no official source link: ${li[1].slice(0, 80)}`);
      }
    }
  }
}
console.log(`Verified ${HUB_EXAM_IDS.length} exam hub page(s) in both languages: every block carries a linked source and a verification date.`);

// Exam calendar: a date never appears without the official document it was read from and the day it was
// checked, and nothing tentative gets in (src/lib/examCalendar.mjs filters; this proves the output).
for (const lang of ['en', 'hi']) {
  const urlPath = examCalendarPath(lang);
  const file = `dist${urlPath}index.html`;
  assert(existsSync(file), `${urlPath}: calendar page not built`);
  const html = readFileSync(file, 'utf8');
  const rows = [...html.matchAll(/<tr><td class="cal-date">([^]*?)<\/tr>/g)].map((m) => m[1]);
  assert(rows.length > 0, `${urlPath}: the calendar has no rows`);
  for (const row of rows) {
    assert(/<td class="cal-source"><a href="https?:\/\//.test(row), `${urlPath}: a calendar row has no official source link: ${row.slice(0, 100)}`);
    assert(/\d{4}-\d{2}-\d{2}<\/span>/.test(row), `${urlPath}: a calendar row has no checked date: ${row.slice(0, 100)}`);
    // The words are judged in what the reader sees, not in link targets: an official PDF's own file name can say
    // "Tentative_dates" (RRB ALP CEN 01/2025) while the row it backs is a fixed date.
    const visible = row.replace(/\s(?:href|title)="[^"]*"/g, '');
    assert(!/tentative|proposed|अनुमानित|प्रस्तावित/i.test(visible), `${urlPath}: a tentative/proposed date slipped into the calendar: ${row.slice(0, 100)}`);
  }
  assert(html.includes('hreflang="hi"') && html.includes('hreflang="en"'), `${urlPath}: missing hreflang pair`);
  assert(sitemap.includes(`<loc>https://parikshasaathi.com${urlPath}</loc>`), `${urlPath}: not in the sitemap`);
  // Every hub links to the calendar and the calendar links back to every exam it lists.
  for (const examId of HUB_EXAM_IDS) {
    const hub = readFileSync(`dist${examHubPath(examId, lang)}index.html`, 'utf8');
    assert(hub.includes(`href="${urlPath}"`), `${examHubPath(examId, lang)}: missing the exam-calendar link`);
  }
  console.log(`Verified the ${lang} exam calendar: ${rows.length} row(s), each with an official source and a checked date; linked from every hub.`);
}

// "What SSC asks in General Awareness": both pages built from data that covers every SSC paper we publish (re-run
// scripts/gen-gk-insights.mjs after adding papers), with its totals on the page, and linked from the four SSC hubs.
{
  const published = PYQ_PAPER_INDEX.filter((p) => GK_INSIGHTS_EXAMS.includes(p.examId)).length;
  assert.equal(GK_INSIGHTS.filesRead, published, `src/data/gkInsights.mjs covers ${GK_INSIGHTS.filesRead} SSC papers but ${published} are published: run node scripts/gen-gk-insights.mjs`);
  for (const lang of ['en', 'hi']) {
    const urlPath = gkInsightsPath(lang);
    const file = `dist${urlPath}index.html`;
    assert(existsSync(file), `${urlPath}: GK insights page not built`);
    const html = readFileSync(file, 'utf8');
    assert(html.includes(GK_INSIGHTS_SUMMARY.total.toLocaleString('en-IN')) && html.includes(String(GK_INSIGHTS_SUMMARY.paperCount)), `${urlPath}: totals missing`);
    assert(html.includes('hreflang="hi"') && html.includes('hreflang="en"'), `${urlPath}: missing hreflang pair`);
    assert(sitemap.includes(`<loc>https://parikshasaathi.com${urlPath}</loc>`), `${urlPath}: not in the sitemap`);
    for (const examId of GK_INSIGHTS_EXAMS) {
      const hub = readFileSync(`dist${examHubPath(examId, lang)}index.html`, 'utf8');
      assert(hub.includes(`href="${urlPath}"`), `${examHubPath(examId, lang)}: missing the GK insights link`);
    }
  }
  console.log(`Verified the GK insights page in both languages: ${GK_INSIGHTS_SUMMARY.total} questions from ${GK_INSIGHTS_SUMMARY.paperCount} papers, data current with ${published} published SSC papers, linked from the SSC hubs.`);
}

// SSC typing / data-entry practice: both pages built, every official standard and source on them, linked from the
// CGL and CHSL exam pages (src/lib/typingPage.mjs, src/data/typingTest.mjs).
for (const lang of ['en', 'hi']) {
  const urlPath = typingTestPath(lang);
  const file = `dist${urlPath}index.html`;
  assert(existsSync(file), `${urlPath}: typing practice page not built`);
  const html = readFileSync(file, 'utf8');
  assert(html.includes('id="typing-test-app"'), `${urlPath}: no mount point for the live test`);
  for (const source of Object.values(TYPING_SOURCES)) assert(html.includes(`href="${source.url}"`), `${urlPath}: source ${source.url} not linked`);
  for (const mode of TYPING_MODES) for (const rule of mode.rules[lang]) assert(html.includes(rule.replaceAll('&', '&amp;').replaceAll('"', '&quot;')), `${urlPath}: official standard missing: ${rule.slice(0, 60)}`);
  assert(html.includes('hreflang="hi"') && html.includes('hreflang="en"'), `${urlPath}: missing hreflang pair`);
  assert(sitemap.includes(`<loc>https://parikshasaathi.com${urlPath}</loc>`), `${urlPath}: not in the sitemap`);
  for (const examId of ['ssc_cgl', 'ssc_chsl']) {
    assert(readFileSync(`dist${examHubPath(examId, lang)}index.html`, 'utf8').includes(`href="${urlPath}"`), `${examHubPath(examId, lang)}: missing the typing practice link`);
  }
  console.log(`Verified the ${lang} typing practice page: ${TYPING_MODES.length} tests with their official standards and sources, linked from the CGL and CHSL pages.`);
}

// Every prerendered page lives at a trailing-slash URL and the host 308-redirects the slash-less form. An
// internal link without the slash therefore costs each crawler a redirect hop (Search Console reported 31
// "Page with redirect" URLs on 2026-10-16, all of this kind) - so no built page may carry one.
{
  const slashless = /href="\/(hi|app\/exam-notices|app\/current-affairs|(?:hi\/)?(?:exams|learn)|(?:hi\/)?(?:compare|learn|exams)\/[a-z0-9-]+)"/g;
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
    assert(html.includes('<aside class="tg-cta">'), `${file}: missing the Telegram box`);
  }
  console.log(`Verified ${itemPages.length} current-affairs item page(s) carry their inline question and link to their neighbouring items.`);
}

// The Telegram box (src/lib/telegramCta.mjs) on the pages people read for current affairs and notices, linking the
// channel the server's 07:00 digest posts to.
{
  const tgPages = files.filter((f) => /\/app\/exam-notices\/[a-z0-9]+\/index\.html$/.test(f) || f === 'dist/downloads/index.html');
  for (const examId of HUB_EXAM_IDS) for (const lang of ['en', 'hi']) tgPages.push(`dist${examHubPath(examId, lang)}index.html`);
  for (const file of tgPages) {
    const html = readFileSync(file, 'utf8');
    assert(html.includes('<aside class="tg-cta">') && html.includes(`href="${TELEGRAM_CHANNEL_URL}"`), `${file}: missing the Telegram box`);
  }
  console.log(`Verified the Telegram box on ${tgPages.length} notice, exam and downloads page(s) (and every current-affairs item page above).`);
  // The paid-promotion landing page: built, fast (no app script), the Join button, the newest headlines, in the sitemap.
  const landing = readFileSync('dist/telegram/index.html', 'utf8');
  assert(landing.includes(`class="tg-join" href="${TELEGRAM_JOIN_URL}"`), '/telegram/: no Join button to the channel');
  assert(landing.includes('class="tg-latest"'), '/telegram/: no latest-edition headlines');
  assert(!/<script[^>]+src="\/assets\//.test(landing), '/telegram/: loads the app script; it must stay plain HTML');
  assert(sitemap.includes('<loc>https://parikshasaathi.com/telegram/</loc>'), '/telegram/: not in the sitemap');
  console.log('Verified /telegram/: plain HTML, Join button, latest headlines, in the sitemap.');
}

// Solved previous-year papers (src/lib/pyqPage.mjs): every published question of each paper is on its page with an
// answer, the exam body's notice is linked, the page is in the sitemap, and the small hub index matches the data.
{
  const papers = JSON.parse(readFileSync('src/data/pyqPapers.json', 'utf8'));
  assert(readFileSync('src/data/pyqPaperIndex.mjs', 'utf8') === pyqIndexSource(papers), 'src/data/pyqPaperIndex.mjs does not match pyqPapers.json: re-run node scripts/gen-pyq-pages.mjs');
  for (const paper of papers) {
    const path = pyqPaperPath(paper);
    const html = readFileSync(`dist${path}index.html`, 'utf8');
    assert((html.match(/<li class="pyq-q"/g) ?? []).length === paper.questions.length, `${path}: expected ${paper.questions.length} questions`);
    assert((html.match(/class="pyq-correct"/g) ?? []).length === paper.questions.length, `${path}: a question has no answer`);
    assert(html.includes(`href="${paper.sourceUrl}"`), `${path}: the exam body's notice is not linked`);
    assert(sitemap.includes(`<loc>https://parikshasaathi.com${path}</loc>`), `${path}: not in the sitemap`);
    assert(!/<script[^>]+src="\/assets\//.test(html), `${path}: loads the app script; it must stay plain HTML`);
  }
  console.log(`Verified ${papers.length} solved previous-year paper page(s): every question with its answer, the official notice linked, in the sitemap.`);
}

// One list of solved papers per exam (src/lib/pyqIndexPage.mjs, from 22 Oct 2026): it links every shift and every
// paper's answer-key notice, pairs EN/HI by hreflang, is in the sitemap, stays plain HTML, and is linked from each
// shift page and from the exam hub. No _redirects rule may shadow it (one sent these URLs to the hub until then).
{
  const papers = JSON.parse(readFileSync('src/data/pyqPapers.json', 'utf8'));
  assert(!/^\/exams\/[^\s]*question-papers/m.test(readFileSync('dist/_redirects', 'utf8')), '_redirects has a rule for /exams/.../question-papers - it would hide the list pages');
  for (const examId of PYQ_INDEX_EXAMS) {
    const own = papers.filter((p) => p.examId === examId);
    for (const lang of ['en', 'hi']) {
      const path = pyqIndexPath(examId, lang);
      const html = readFileSync(`dist${path}index.html`, 'utf8');
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
      assert(title.includes(lang === 'hi' ? 'पिछले वर्ष के प्रश्न पत्र' : 'Previous Year Question Papers'), `${path}: title "${title}" lacks the search phrase`);
      for (const p of own) assert(html.includes(`href="${pyqPaperPath(p)}"`), `${path}: does not link ${p.slug}`);
      for (const url of new Set(own.map((p) => p.sourceUrl))) assert(html.includes(`href="${url}"`), `${path}: an answer-key notice is not linked`);
      assert((html.match(/<tr><td><a href="\/exams\//g) ?? []).length === own.length, `${path}: expected one row per shift (${own.length})`);
      for (const alt of ['en', 'hi']) assert(html.includes(`hreflang="${alt}" href="https://parikshasaathi.com${pyqIndexPath(examId, alt)}"`), `${path}: hreflang ${alt} missing`);
      assert(html.includes('"@type":"FAQPage"') && html.includes(`"numberOfItems":${own.length}`), `${path}: FAQPage or ItemList data missing`);
      assert(!/<script[^>]+src="\/assets\//.test(html), `${path}: loads the app script; it must stay plain HTML`);
      assert(sitemap.includes(`<loc>https://parikshasaathi.com${path}</loc>`), `${path}: not in the sitemap`);
      assert(readFileSync(`dist${examHubPath(examId, lang)}index.html`, 'utf8').includes(`href="${path}"`), `${examHubPath(examId, lang)}: does not link ${path}`);
    }
    for (const p of own) assert(readFileSync(`dist${pyqPaperPath(p)}index.html`, 'utf8').includes(`href="${pyqIndexPath(examId, 'en')}"`), `${pyqPaperPath(p)}: does not link its exam's list of papers`);
  }
  console.log(`Verified ${PYQ_INDEX_EXAMS.length} solved-paper list page(s) x 2 languages: every shift and answer-key notice linked, hreflang, sitemap, linked from each shift page and hub.`);
}

// Every exam-notice page carries a "What this means for you" paragraph (src/data/examNoticeGuidance.mjs): a
// notice page that only restates the official text is the thin page AdSense rejected on 10 Oct 2026.
{
  const noticePages = files.filter((f) => /\/app\/exam-notices\/[a-z0-9]+\/index\.html$/.test(f));
  assert(noticePages.length > 0, 'no exam-notice pages were built');
  // Guidance is keyed by the production row ids, so a build against a local API (whose ids differ) cannot
  // satisfy this gate - skip it there, the same way the live-sitemap regression guard is skipped.
  const localApi = /localhost|127\.0\.0\.1/.test(process.env.PRERENDER_API_BASE ?? '');
  if (localApi) {
    console.log(`Skipped the notice-guidance gate for ${noticePages.length} notice page(s): local API ids do not match the production ids guidance is keyed by.`);
  } else {
    for (const file of noticePages) assert(readFileSync(file, 'utf8').includes('class="news-learning"'), `${file}: notice page without guidance - add an entry to examNoticeGuidance.mjs`);
    console.log(`Verified ${noticePages.length} exam-notice page(s) carry guidance beyond the official text.`);
    // Since 17 Oct 2026 the Hindi row of every notice gets its own static page too (the app's Hindi UI and the
    // Hindi hub pages link to the Hindi id, which 404ed before). Both halves of every hand-verified pair must
    // exist and point at each other with hreflang.
    for (const { enId, hiId } of NOTICE_GUIDANCE) {
      for (const [id, lang, twin] of [[enId, 'en', hiId], [hiId, 'hi', enId]]) {
        const file = `dist/app/exam-notices/${id}/index.html`;
        assert(existsSync(file), `${file}: ${lang} notice page not built`);
        const html = readFileSync(file, 'utf8');
        assert(html.includes(`<html lang="${lang}">`), `${file}: html lang is not ${lang}`);
        assert(html.includes(`hreflang="${lang === 'en' ? 'hi' : 'en'}" href="https://parikshasaathi.com/app/exam-notices/${twin}/"`), `${file}: missing hreflang to its ${lang === 'en' ? 'Hindi' : 'English'} twin ${twin}`);
      }
    }
    console.log(`Verified ${NOTICE_GUIDANCE.length} notice pair(s): English and Hindi pages built, hreflang both ways.`);
  }
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

// Trust copy (2026-10-17). Two public lines were false on 16 Oct 2026: /downloads/ said the items were "written
// and reviewed by" the founder (they are AI-drafted from official releases and not reviewed by a subject-matter
// editor), and /terms/ and /privacy/ said the website "shows ads" while ad serving was paused. From now on no
// built page may claim human review it did not get, and the legal pages' ads wording must follow
// SITE_SHOWS_ADS (publicPages.mjs). "not reviewed by ..." (the honest fact-level attribution) stays allowed.
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  // Narrow on purpose: a news item may legitimately say a parade was "reviewed by" an Air Chief Marshal. What
  // may never appear is the founder named as reviewer or editor of content no human line-edited.
  const claim = html.match(/written and reviewed by|reviewed by (?:<strong>)?Mahesh|लेखक\/संपादक|समीक्षक: महेश/i);
  assert(!claim, `${file}: names the founder as reviewer or editor of AI-drafted content: "${html.slice(Math.max(0, claim?.index - 60), (claim?.index ?? 0) + 60)}"`);
}
{
  const legal = { terms: readFileSync('dist/terms/index.html', 'utf8'), privacy: readFileSync('dist/privacy/index.html', 'utf8') };
  for (const [name, html] of Object.entries(legal)) {
    if (SITE_SHOWS_ADS) {
      assert(/shows ads served by/.test(html), `${name}: SITE_SHOWS_ADS is true but the page does not describe the ads`);
    } else {
      assert(html.includes('shows no ads'), `${name}: SITE_SHOWS_ADS is false but the page does not say the website shows no ads`);
      assert(!/shows ads served by|does show ads|serves ads on this website/.test(html), `${name}: still says the website shows ads`);
    }
  }
}
// The trust strip (src/data/trustLines.mjs) is on both landing pages and /about/, verbatim, and never promises
// "no ads" - AdSense/AdMob/Premium remain open options (docs/marketing-plan-2026-10.md), so that claim is not ours
// to make (decision of 2026-10-15).
for (const [file, lang] of [['dist/index.html', 'en'], ['dist/hi/index.html', 'hi'], ['dist/about/index.html', 'en']]) {
  const html = readFileSync(file, 'utf8');
  for (const line of TRUST_LINES[lang]) assert(html.includes(line), `${file}: trust line missing: ${line}`);
  assert(!/\bno ads\b|ad-free|कोई विज्ञापन नहीं|विज्ञापन-मुक्त/i.test(html), `${file}: promises "no ads" - see trustLines.mjs`);
  if (file !== 'dist/about/index.html') assert(html.includes('class="trust-lines"'), `${file}: hero is missing the trust strip`);
}
console.log('Verified the trust copy: no human-review claim anywhere, legal ads wording matches SITE_SHOWS_ADS, trust strip on both landing pages.');

// Hindi index pages (2026-10-17): /hi/ and /hi/learn/ returned 404 until now although 165 Hindi lesson pages
// linked to them as "home" and "library". Both must exist, sit in the sitemap, carry hreflang both ways and,
// for the library, link every lesson's Hindi page from a catalog derived from topicLessons.mjs.
for (const key of ['hi', 'hi-learn']) {
  const meta = publicPageMeta(key);
  const file = `dist${meta.path}index.html`;
  assert(existsSync(file), `${meta.path}: not built`);
  const html = readFileSync(file, 'utf8');
  assert(html.includes('<html lang="hi">'), `${meta.path}: html lang is not hi`);
  const twin = meta.alternateLanguages.find((a) => a.lang === 'en').path;
  assert(html.includes(`hreflang="en" href="https://parikshasaathi.com${twin}"`), `${meta.path}: missing hreflang to ${twin}`);
  assert(readFileSync(`dist${twin}index.html`, 'utf8').includes(`hreflang="hi" href="https://parikshasaathi.com${meta.path}"`), `${twin}: missing hreflang to ${meta.path}`);
  assert(sitemap.includes(`<loc>https://parikshasaathi.com${meta.path}</loc>`), `${meta.path}: not in the sitemap`);
  assert(html.includes('class="pub-exams-link"') && html.includes('href="/hi/exams/"'), `${meta.path}: no Hindi Exams button`);
}
{
  const libraryHi = readFileSync('dist/hi/learn/index.html', 'utf8');
  for (const entry of LESSON_CATALOG) assert(libraryHi.includes(`href="/hi/learn/${entry.slug}/"`), `/hi/learn/: missing ${entry.slug}`);
  assert.deepEqual(LESSON_CATALOG_HI, TOPIC_LESSONS.map(deriveHindiCatalogEntry), 'lessonCatalogHi.mjs is stale - run: node scripts/gen-lesson-catalog-hi.mjs');
  for (const slug of ['percentages', 'cubes-and-dice']) {
    const html = readFileSync(`dist/hi/learn/${slug}/index.html`, 'utf8');
    assert(html.includes('href="/hi/learn/"') && html.includes('href="/hi/"'), `hi/learn/${slug}: does not lead back to the Hindi library and home`);
  }
  assert(home.includes('href="/hi/"'), 'home page has no link to the Hindi landing page');
}
console.log(`Verified the Hindi landing page and lesson library: built, in the sitemap, hreflang both ways, ${LESSON_CATALOG.length} Hindi lesson links.`);

// Every static page preloads PublicPage's chunk and the chunks it imports (scripts/prerender.mjs reads
// dist/.vite/manifest.json), so the download starts with the HTML, not after the entry bundle has run; and the
// home page, which renders from the entry bundle, must not pay for it.
{
  const manifest = JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf8'));
  const chunkUrls = (sourcePath, seen = new Set()) => {
    const chunk = manifest[sourcePath];
    assert(chunk, `dist/.vite/manifest.json has no chunk for ${sourcePath}`);
    if (chunk.isEntry || seen.has(chunk.file)) return [];
    seen.add(chunk.file);
    return [`/${chunk.file}`, ...(chunk.imports ?? []).flatMap((dep) => chunkUrls(dep, seen))];
  };
  const expected = chunkUrls('src/pages/PublicPage.tsx');
  assert(expected.length >= 2, `expected PublicPage's chunk to import the static-page data chunk, got ${expected.join(', ')}`);
  for (const key of Object.keys(PUBLIC_PAGES)) {
    const path = publicPageMeta(key).path;
    const html = readFileSync(`dist${path}index.html`, 'utf8');
    for (const url of expected) assert(new RegExp(`<link rel="modulepreload"[^>]* href="${url}"`).test(html), `${path}: does not preload ${url}`);
  }
  assert(!home.includes(expected[0]), `home page preloads PublicPage's chunk ${expected[0]}`);
  console.log(`Verified that all ${Object.keys(PUBLIC_PAGES).length} static pages preload PublicPage's ${expected.length} chunk(s) and the home page does not.`);
}

// GEO (2026-10-20): what AI answer engines read about the site. /llms.txt must exist, list every exam hub and
// every solved paper, link only to pages this build produced, and make no human-review claim (the same rule as
// the HTML above). The home page's Organization must carry the shared description (src/lib/siteEntity.mjs), and the
// exam directory must list every hub as an ItemList.
{
  assert(existsSync('dist/llms.txt'), '/llms.txt was not built');
  const llms = readFileSync('dist/llms.txt', 'utf8');
  assert(llms.startsWith('# Pariksha Saathi'), '/llms.txt must open with the site name as its H1');
  assert(/^> /m.test(llms), '/llms.txt has no blockquote summary');
  assert(!/written and reviewed by|reviewed by Mahesh|expert-reviewed|human-reviewed by/i.test(llms), '/llms.txt claims a human review');
  for (const id of HUB_EXAM_IDS) assert(llms.includes(`https://parikshasaathi.com${examHubPath(id, 'en')})`), `/llms.txt does not list the ${id} hub`);
  const papers = JSON.parse(readFileSync('src/data/pyqPapers.json', 'utf8'));
  for (const paper of papers) assert(llms.includes(`https://parikshasaathi.com${pyqPaperPath(paper)})`), `/llms.txt does not list ${paper.slug}`);
  const internal = [...llms.matchAll(/\]\(https:\/\/parikshasaathi\.com(\/[^)]*)\)/g)].map((m) => m[1]);
  for (const path of internal) {
    const file = path.endsWith('/') ? `dist${path}index.html` : `dist${path}`;
    assert(existsSync(file), `/llms.txt links to ${path}, which this build did not produce`);
  }
  const ldOf = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => [].concat(JSON.parse(m[1])));
  const org = ldOf(home).find((x) => x['@type'] === 'Organization');
  assert(org?.description && org.knowsAbout?.length === HUB_EXAM_IDS.length, 'home page Organization lacks the shared description or the exam list');
  for (const lang of ['en', 'hi']) {
    const list = ldOf(readFileSync(`dist${examDirectoryPath(lang)}index.html`, 'utf8')).find((x) => x['@type'] === 'CollectionPage')?.mainEntity;
    assert.equal(list?.itemListElement?.length, HUB_EXAM_IDS.length, `${examDirectoryPath(lang)}: the ItemList does not list every hub`);
  }
  for (const file of ['favicon.ico', 'apple-touch-icon.png', 'apple-touch-icon-precomposed.png']) assert(existsSync(`dist/${file}`), `/${file} was not built`);
  const redirects = readFileSync('dist/_redirects', 'utf8');
  for (const from of ['/app/', '/compare/', '/hi/compare/']) assert(new RegExp(`^${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s`, 'm').test(redirects), `_redirects lost the ${from} rule`);
  console.log(`Verified GEO: /llms.txt lists ${HUB_EXAM_IDS.length} exam hubs and ${papers.length} solved papers, all ${internal.length} links built; home Organization and exam-directory ItemList in place.`);
}

// G1 experiment (20 Oct 2026): the next-step line appears on the four pilot hubs only, in both languages, and links
// through the click-counting redirects; no hub prints a one-day range as "X to X" any more.
{
  const redirects = readFileSync('dist/_redirects', 'utf8');
  assert(/^\/go\/hub-pdf\s/m.test(redirects) && /^\/go\/hub-telegram\s/m.test(redirects), '_redirects lost the /go/ experiment rules');
  assert(/^Disallow: \/go\/$/m.test(readFileSync('dist/robots.txt', 'utf8')), 'robots.txt must keep crawlers out of /go/');
  for (const id of HUB_EXAM_IDS) {
    for (const lang of ['en', 'hi']) {
      const html = readFileSync(`dist${examHubPath(id, lang)}index.html`, 'utf8');
      const has = html.includes('class="hub-next"');
      assert.equal(has, NEXT_STEP_PILOT_HUBS.includes(id), `${examHubPath(id, lang)}: the next-step line is ${has ? 'on a non-pilot hub' : 'missing'}`);
      if (has) assert(html.includes('href="/go/hub-pdf"') && html.includes('href="/go/hub-telegram"'), `${examHubPath(id, lang)}: pilot line does not use the /go/ links`);
      const text = html.replace(/<[^>]+>/g, ' ');
      const repeat = text.match(/(\d{1,2} [^\s\d<]+ \d{4}) (?:to|से) \1(?!\d)/);
      assert(!repeat, `${examHubPath(id, lang)}: one-day range printed twice ("${repeat?.[0]}")`);
    }
  }
  console.log(`Verified the G1 experiment: next-step line on ${NEXT_STEP_PILOT_HUBS.length} pilot hubs x 2 languages only, /go/ redirects and robots rule in place; no "X to X" date ranges on any hub.`);
}

// Search Console (22 Oct 2026) listed 107 "Page with redirect" URLs. Cloudflare Pages answers a bare path whose folder
// has an index.html with a 308 to the slash form, so an internal link to the bare form costs crawlers (and visitors) a
// redirect and keeps the redirecting URL in Google's list. Every internal link to a built page must use the slash form.
{
  const bare = new Map();
  let pages = 0;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith('.html')) {
        pages++;
        for (const [, href] of readFileSync(path, 'utf8').matchAll(/href="(\/[^"#?]*[^/"#?])(?:[?#][^"]*)?"/g)) {
          if (existsSync(`dist${href}/index.html`) && !bare.has(href)) bare.set(href, path);
        }
      }
    }
  };
  walk('dist');
  assert.equal(bare.size, 0, `internal links to a bare path that redirects to its slash form: ${[...bare].slice(0, 5).map(([href, page]) => `${href} (in ${page})`).join(', ')}`);
  console.log(`Verified that no internal link on ${pages} built pages points at a bare path that redirects to its slash form.`);
}

// Hub titles name the cycle their facts cover ("SSC CGL 2026", src/lib/examHub.mjs HUB_TITLE_NAME). A fact sheet that
// moves to a new cycle drops its hub back to the bare name - safe, but worth a row: say which ones, without failing.
{
  const bare = [];
  for (const examId of HUB_EXAM_IDS) {
    for (const lang of ['en', 'hi']) {
      const title = readFileSync(`dist${examHubPath(examId, lang)}index.html`, 'utf8').match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
      if (!/\b20\d\d\b/.test(title)) bare.push(`${examHubPath(examId, lang)} "${title}"`);
    }
  }
  if (bare.length) console.log(`Note: ${bare.length} hub title(s) name no cycle year - add the fact sheet's new cycleLabel to HUB_TITLE_NAME: ${bare.join('; ')}`);
  else console.log(`Verified all ${HUB_EXAM_IDS.length * 2} hub titles name their cycle year.`);
}
