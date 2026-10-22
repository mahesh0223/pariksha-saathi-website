// Generates the data behind the /q/ practice-question pages:
//   src/data/question-pages/en.json, hi.json  - one entry per question that gets a page
//   src/data/questionTopics.mjs               - per topic: slug, names and counts (lesson pages link to the lists)
//   src/data/questionRedirects.mjs            - old one-question page -> its place on the topic list
//
// Usage: node scripts/gen-question-pages.mjs [--server ../pariksha-saathi-server]
//
// Reads the server repo's LOCAL database (prisma/dev.db), seeded from the same seed files as production - never
// the production API: building this set in the API process OOM-killed the 256 MB production machine on
// 19 Oct 2026, and even fetching every topic's full list in a burst grows the API to ~290 MB. Question slugs are
// <topic-slug>-<hash> with the hash taken from language + topic + question text, so they do not depend on
// database ids and stay stable across environments and re-seeds. Since 22 Oct 2026 the slug is the question's
// anchor on its topic list (the one-question pages were folded in), and src/data/questionRedirects.mjs, written at
// the end of this script, sends the old /q/<slug>/ addresses there.
// Re-run after the question bank or the lessons change, then commit the output.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { selectEligible, topicSlug } from '../src/lib/questionEligibility.mjs';
import { TOPIC_LESSONS } from '../src/data/topicLessons.mjs';
import { LESSON_CATALOG } from '../src/data/lessonCatalog.mjs';
import { LESSON_CATALOG_HI } from '../src/data/lessonCatalogHi.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const serverArg = process.argv.indexOf('--server');
const SERVER = resolve(serverArg > 0 ? process.argv[serverArg + 1] : '/Users/mahesh/dev/pariksha-saathi-server');
const DB_PATH = join(SERVER, 'prisma', 'dev.db');
if (!existsSync(DB_PATH)) throw new Error(`No database at ${DB_PATH} - pass --server <path to pariksha-saathi-server>`);
const db = new DatabaseSync(DB_PATH, { readOnly: true });

const hash = (...parts) => createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 8);

// --- GK questions the 15 Oct fact-check flagged (indices into the seed files; the en/hi twins share an index).
const excluded = new Set();
const gkDir = join(SERVER, 'prisma', 'seed-data', 'claude-gk-pedagogy');
const flaggedFile = join(gkDir, 'fact-check-2026-10-15', 'excluded-questions.json');
for (const [topicKey, indices] of Object.entries(JSON.parse(readFileSync(flaggedFile, 'utf8')))) {
  for (const lang of ['en', 'hi']) {
    const { questions } = JSON.parse(readFileSync(join(gkDir, `${topicKey}.${lang}.json`), 'utf8'));
    for (const index of indices) excluded.add(`${lang}|${questions[index].text}`);
  }
}

// --- Topic names: English from the server's Topic table; Hindi from the signed-off lesson titles
// ("X के प्रश्न हल सहित" -> "X"), else the server's Hindi lesson title, else the English name.
const enName = new Map(db.prepare('SELECT sharedTopicKey AS k, name, subjectName AS subject FROM Topic GROUP BY sharedTopicKey').all().map((r) => [r.k, { name: r.name, subject: r.subject }]));
const lessonByTopic = new Map(LESSON_CATALOG.filter((c) => c.topicKey).map((c) => [c.topicKey, c]));
const hiTitleBySlug = new Map(LESSON_CATALOG_HI.map((c) => [c.slug, c.title]));
const dbHiLesson = new Map(db.prepare("SELECT topicKey AS k, title FROM Lesson WHERE languageCode = 'hi' AND status = 'PUBLISHED' GROUP BY topicKey").all().map((r) => [r.k, r.title]));
function hiName(topicKey) {
  // Topics that exist only as website lessons use the lesson slug as their key (see the lesson loop below).
  const lesson = lessonByTopic.get(topicKey) ?? LESSON_CATALOG.find((c) => c.slug === topicSlug(topicKey));
  const raw = (lesson && hiTitleBySlug.get(lesson.slug)) || dbHiLesson.get(topicKey) || enName.get(topicKey)?.name || topicKey;
  // Lesson titles are phrased as pages ("X के प्रश्न हल सहित", "X: मुख्य तथ्य और अभ्यास प्रश्न"); keep the topic name X.
  return raw.replace(/\s*[:：]\s*मुख्य तथ्य.*$/, '').replace(/\s*(?:के\s+)?प्रश्न हल सहित/, '').replace(/\s{2,}/g, ' ').trim();
}

// --- Bank questions, one topic at a time.
const topicKeys = db.prepare("SELECT DISTINCT topicKey AS k FROM Question WHERE status = 'PUBLISHED' AND topicKey NOT LIKE 'CURRENT_AFFAIRS_%'").all().map((r) => r.k);
const pick = db.prepare('SELECT id, topicKey, text, length(explanation) AS explLen, pairKey FROM Question WHERE status = \'PUBLISHED\' AND languageCode = ? AND topicKey = ?');
const full = db.prepare('SELECT options, correctOptionIndex, explanation, sourceAttribution FROM Question WHERE id = ?');
const out = { en: [], hi: [] };
const enPairs = new Set();
for (const lang of ['en', 'hi']) {
  for (const topicKey of topicKeys) {
    const eligible = selectEligible(pick.all(lang, topicKey), lang, excluded, lang === 'hi' ? enPairs : null);
    for (const q of eligible) {
      const f = full.get(q.id);
      if (lang === 'en' && q.pairKey) enPairs.add(q.pairKey);
      out[lang].push({
        slug: `${topicSlug(topicKey)}-${hash(lang, topicKey, q.text)}`,
        kind: 'bank',
        id: q.id,
        topicKey,
        pairKey: q.pairKey ?? undefined,
        text: q.text,
        options: JSON.parse(f.options),
        correctOptionIndex: f.correctOptionIndex,
        explanation: f.explanation,
        attribution: f.sourceAttribution,
      });
    }
  }
}

// --- Lesson questions (worked examples and practice questions), twinned by position across languages.
for (const lesson of TOPIC_LESSONS) {
  const topicKey = LESSON_CATALOG.find((c) => c.slug === lesson.slug)?.topicKey ?? lesson.slug.toUpperCase().replace(/-/g, '_');
  for (const kind of ['example', 'practice']) {
    const field = kind === 'example' ? 'examples' : 'practiceQuestions';
    const twinned = lesson.en[field].length === lesson.hi[field].length;
    for (const lang of ['en', 'hi']) {
      lesson[lang][field].forEach((q, index) => {
        out[lang].push({
          slug: `${topicSlug(topicKey)}-${hash(lang, lesson.slug, kind, q.question)}`,
          kind,
          lessonSlug: lesson.slug,
          topicKey,
          pairKey: twinned ? `lesson:${lesson.slug}:${kind}:${index}` : undefined,
          text: q.question,
          answer: q.answer,
          solution: q.solution ?? undefined,
        });
      });
    }
  }
}

// --- Twins, uniqueness, order.
const slugByPair = {
  en: new Map(out.en.filter((q) => q.pairKey).map((q) => [q.pairKey, q.slug])),
  hi: new Map(out.hi.filter((q) => q.pairKey).map((q) => [q.pairKey, q.slug])),
};
for (const lang of ['en', 'hi']) {
  const other = slugByPair[lang === 'en' ? 'hi' : 'en'];
  const seen = new Set();
  out[lang] = out[lang].filter((q) => (seen.has(q.slug) ? false : seen.add(q.slug)));
  for (const q of out[lang]) {
    q.twinSlug = q.pairKey ? other.get(q.pairKey) : undefined;
    delete q.pairKey;
  }
  out[lang].sort((a, b) => a.topicKey.localeCompare(b.topicKey) || (a.kind === b.kind ? 0 : a.kind === 'example' ? -1 : b.kind === 'example' ? 1 : a.kind === 'practice' ? -1 : 1) || a.slug.localeCompare(b.slug));
}

// --- Topics summary for the list pages and the lesson-page links.
const topics = {};
for (const lang of ['en', 'hi']) {
  for (const q of out[lang]) {
    const t = (topics[q.topicKey] ??= {
      slug: topicSlug(q.topicKey),
      lessonSlug: lessonByTopic.get(q.topicKey)?.slug ?? TOPIC_LESSONS.find((l) => l.slug === q.lessonSlug)?.slug,
      subject: enName.get(q.topicKey)?.subject ?? lessonByTopic.get(q.topicKey)?.subject ?? LESSON_CATALOG.find((c) => c.slug === q.lessonSlug)?.subject ?? null,
      en: { name: enName.get(q.topicKey)?.name ?? LESSON_CATALOG.find((c) => c.slug === q.lessonSlug)?.title ?? q.topicKey, count: 0 },
      hi: { name: hiName(q.topicKey), count: 0 },
    });
    t[lang].count += 1;
  }
}

const dataDir = join(ROOT, 'src', 'data', 'question-pages');
mkdirSync(dataDir, { recursive: true });
for (const lang of ['en', 'hi']) writeFileSync(join(dataDir, `${lang}.json`), `${JSON.stringify(out[lang])}\n`);
const generated = new Date().toISOString().slice(0, 10);
writeFileSync(join(ROOT, 'src', 'data', 'questionTopics.mjs'), `// GENERATED by scripts/gen-question-pages.mjs - do not hand-edit; re-run the script.\n// Per topic with /q/ question pages: URL slug, lesson to link back to, and the name and page count in each language.\nexport const QUESTION_PAGES_GENERATED = '${generated}';\nexport const QUESTION_TOPICS = ${JSON.stringify(topics, null, 2)};\n`);
const count = (lang, kind) => out[lang].filter((q) => q.kind === kind).length;
// Where each question now sits on its topic list, for the old one-question addresses (functions/q/). Imported only
// now, after the data above is written, so it reads the new files.
const { questionRedirectsSource } = await import('../src/lib/questionRedirectsBuild.mjs');
writeFileSync(join(ROOT, 'src', 'data', 'questionRedirects.mjs'), questionRedirectsSource());
console.log(`Question pages: en ${out.en.length} (bank ${count('en', 'bank')}, examples ${count('en', 'example')}, practice ${count('en', 'practice')}); hi ${out.hi.length} (bank ${count('hi', 'bank')}, examples ${count('hi', 'example')}, practice ${count('hi', 'practice')}); ${Object.keys(topics).length} topics.`);
