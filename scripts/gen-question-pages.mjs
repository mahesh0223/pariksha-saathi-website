// Generates the data behind the /q/ practice-question pages:
//   src/data/question-pages/en.json, hi.json  - one entry per question that gets a page
//   src/data/questionTopics.mjs               - per topic: slug, names and counts (lesson pages link to the lists)
//   src/data/questionRedirects.mjs            - old one-question page -> its place on the topic list
//   src/data/question-pages/topic-lessons.json - the server lesson of a topic that has previous-year questions but no
//                                                 list and no website lesson (the Hindi topics of SSC GD's Part-D)
//   src/data/pyqTopics.mjs                     - per topic with previous-year questions: names and counts, for the
//                                                 practice player (/app/pyq-practice/)
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
import { questionSnippet, selectEligible, topicSlug } from '../src/lib/questionEligibility.mjs';
import { pyqPaperPath, pyqIndexPath } from '../src/lib/pyqPath.mjs';
import { PYQ_WITHDRAWN } from '../src/data/pyqWithdrawn.mjs';
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
// The Hindi-language topics (SSC GD's Part-D Hindi) say "हिंदी" in their name: their lesson titles ("पर्यायवाची और विलोम
// शब्द") are also the Hindi names of the English-language topics, and the two would read alike on /hi/q/.
const HINDI_LANGUAGE_NAMES = {
  HINDI_PASSAGES: 'हिंदी गद्यांश (रिक्त स्थान और बोध)',
  HINDI_SENTENCE_CORRECTION: 'हिंदी वाक्य शुद्धि और वर्तनी',
  HINDI_SYNONYMS_ANTONYMS: 'हिंदी पर्यायवाची और विलोम शब्द',
  HINDI_IDIOMS_PROVERBS: 'हिंदी मुहावरे और लोकोक्तियाँ',
  HINDI_ONE_WORD_SUBSTITUTION: 'हिंदी: अनेक शब्दों के लिए एक शब्द',
  HINDI_WORD_CHOICE: 'हिंदी: उपयुक्त शब्द और रिक्त स्थान',
  HINDI_GRAMMAR: 'हिंदी व्याकरण',
};
function hiName(topicKey) {
  if (HINDI_LANGUAGE_NAMES[topicKey]) return HINDI_LANGUAGE_NAMES[topicKey];
  // Topics that exist only as website lessons use the lesson slug as their key (see the lesson loop below).
  const lesson = lessonByTopic.get(topicKey) ?? LESSON_CATALOG.find((c) => c.slug === topicSlug(topicKey));
  const raw = (lesson && hiTitleBySlug.get(lesson.slug)) || dbHiLesson.get(topicKey) || enName.get(topicKey)?.name || topicKey;
  // Lesson titles are phrased as pages ("X के प्रश्न हल सहित", "X: मुख्य तथ्य और अभ्यास प्रश्न"); keep the topic name X.
  return raw.replace(/\s*[:：]\s*मुख्य (?:तथ्य|नियम).*$/, '').replace(/\s*(?:के\s+)?प्रश्न हल सहित/, '').replace(/\s{2,}/g, ' ').trim();
}

// --- Bank questions, one topic at a time. Previous-year questions are not copied here: each is on its solved-paper page
// (/exams/<exam>/question-papers/<paper>/), and a second full copy on a topic list would be duplicate content. The topic
// list links them instead (the summary below) and /app/pyq-practice/ lets a student sit them.
const topicKeys = db.prepare("SELECT DISTINCT topicKey AS k FROM Question WHERE status = 'PUBLISHED' AND topicKey NOT LIKE 'CURRENT_AFFAIRS_%'").all().map((r) => r.k);
const pick = db.prepare('SELECT id, topicKey, text, length(explanation) AS explLen, pairKey FROM Question WHERE status = \'PUBLISHED\' AND sourceType != \'PYQ\' AND languageCode = ? AND topicKey = ?');
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

// --- Previous-year questions by topic, from the same data the solved-paper pages are built from
// (src/data/pyqPapers.json, scripts/gen-pyq-pages.mjs - run that first), so every link lands on the question's anchor.
const PYQ_LATEST = 10;
const sectionAnchor = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); // as src/lib/pyqPage.mjs
const pyqByTopic = {};
// Withdrawn papers (src/data/pyqWithdrawn.mjs) give no previous-year sections and no Hindi-language topic pages.
for (const paper of PYQ_WITHDRAWN ? [] : JSON.parse(readFileSync(join(ROOT, 'src', 'data', 'pyqPapers.json'), 'utf8'))) {
  for (const q of paper.questions) {
    if (q.languageCode !== 'en' && q.languageCode !== 'hi') continue;
    const entry = ((pyqByTopic[q.topicKey] ??= {})[q.languageCode] ??= { count: 0, groups: {}, items: [] });
    entry.count += 1;
    const group = (entry.groups[paper.displayName] ??= { name: paper.displayName, href: pyqIndexPath(paper.examId, q.languageCode), count: 0 });
    group.count += 1;
    entry.items.push({
      // The question itself, not the cloze passage the text opens with.
      snippet: questionSnippet(String(q.text).split(/\n{2,}/).at(-1), 140),
      href: `${pyqPaperPath(paper)}#${sectionAnchor(q.section ?? 'Questions')}-q${q.number ?? ''}`,
      paper: paper.displayName,
      date: paper.date,
      shift: paper.shift,
    });
  }
}
const topicLessons = {};
const serverLesson = db.prepare("SELECT title, explanation, examples, revisionSummary FROM Lesson WHERE topicKey = ? AND languageCode = ? AND status = 'PUBLISHED' ORDER BY title LIMIT 1");
for (const [topicKey, byLang] of Object.entries(pyqByTopic)) {
  const t = (topics[topicKey] ??= {
    slug: topicSlug(topicKey),
    lessonSlug: lessonByTopic.get(topicKey)?.slug,
    subject: enName.get(topicKey)?.subject ?? null,
    en: { name: enName.get(topicKey)?.name ?? topicKey, count: 0 },
    hi: { name: hiName(topicKey), count: 0 },
  });
  t.pyq = {};
  for (const [lang, entry] of Object.entries(byLang)) {
    t.pyq[lang] = {
      count: entry.count,
      groups: Object.values(entry.groups).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
      // The newest question of each of the most recent shifts, so the links spread over papers rather than one shift.
      latest: (() => {
        const sorted = entry.items.sort((a, b) => b.date.localeCompare(a.date) || a.shift.localeCompare(b.shift, 'en', { numeric: true }));
        const seen = new Set();
        const firsts = sorted.filter((q) => (seen.has(`${q.paper}|${q.date}|${q.shift}`) ? false : seen.add(`${q.paper}|${q.date}|${q.shift}`)));
        return [...firsts, ...sorted.filter((q) => !firsts.includes(q))].slice(0, PYQ_LATEST);
      })(),
    };
    // The Hindi-language topics (SSC GD's Part-D Hindi) have only previous-year questions, so no list: their page is built
    // from the Hindi lesson written and checked for them, so that it teaches the topic rather than only linking out.
    // (Other topics without a list - ALGEBRA and the like, whose bank questions the eligibility rules leave out - stay
    // without a page; their previous-year questions are on the solved-paper pages and in the practice player.)
    if (topicKey.startsWith('HINDI_') && t[lang].count === 0 && !t.lessonSlug) {
      const lesson = serverLesson.get(topicKey, lang);
      if (lesson) {
        (topicLessons[topicKey] ??= {})[lang] = { ...lesson, examples: JSON.parse(lesson.examples ?? '[]') };
        t[lang].lessonPage = true; // src/lib/questionPage.mjs topicHasPage
      }
    }
  }
}
const hasPage = (t, lang) => t[lang].count > 0 || Boolean(t[lang].lessonPage); // as src/lib/questionPage.mjs topicHasPage
const pyqTopics = Object.fromEntries(Object.entries(topics).filter(([, t]) => t.pyq).map(([key, t]) => [key, {
  slug: t.slug,
  en: { name: t.en.name, count: t.pyq.en?.count ?? 0, hasPage: hasPage(t, 'en') },
  hi: { name: t.hi.name, count: t.pyq.hi?.count ?? 0, hasPage: hasPage(t, 'hi') },
}]));

const dataDir = join(ROOT, 'src', 'data', 'question-pages');
mkdirSync(dataDir, { recursive: true });
for (const lang of ['en', 'hi']) writeFileSync(join(dataDir, `${lang}.json`), `${JSON.stringify(out[lang])}\n`);
writeFileSync(join(dataDir, 'topic-lessons.json'), `${JSON.stringify(topicLessons)}\n`);
writeFileSync(join(ROOT, 'src', 'data', 'pyqTopics.mjs'), `// GENERATED by scripts/gen-question-pages.mjs - do not hand-edit; re-run the script.\n// Per topic with previous-year questions: list slug, and the name and number of such questions in each language.\nexport const PYQ_TOPICS = ${JSON.stringify(pyqTopics, null, 2)};\n`);
const generated = new Date().toISOString().slice(0, 10);
writeFileSync(join(ROOT, 'src', 'data', 'questionTopics.mjs'), `// GENERATED by scripts/gen-question-pages.mjs - do not hand-edit; re-run the script.\n// Per topic with /q/ question pages: URL slug, lesson to link back to, and the name and page count in each language.\nexport const QUESTION_PAGES_GENERATED = '${generated}';\nexport const QUESTION_TOPICS = ${JSON.stringify(topics, null, 2)};\n`);
const count = (lang, kind) => out[lang].filter((q) => q.kind === kind).length;
// Where each question now sits on its topic list, for the old one-question addresses (functions/q/). Imported only
// now, after the data above is written, so it reads the new files.
const { questionRedirectsSource } = await import('../src/lib/questionRedirectsBuild.mjs');
writeFileSync(join(ROOT, 'src', 'data', 'questionRedirects.mjs'), questionRedirectsSource());
console.log(`Question pages: en ${out.en.length} (bank ${count('en', 'bank')}, examples ${count('en', 'example')}, practice ${count('en', 'practice')}); hi ${out.hi.length} (bank ${count('hi', 'bank')}, examples ${count('hi', 'example')}, practice ${count('hi', 'practice')}); ${Object.keys(topics).length} topics.`);
