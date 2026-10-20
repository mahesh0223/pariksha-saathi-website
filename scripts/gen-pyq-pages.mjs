// Generates the data behind the solved previous-year paper pages (/exams/<exam>/question-papers/<paper>/):
//   src/data/pyqPapers.json      - every published paper with its questions, answers and explanations
//   src/data/pyqPaperIndex.mjs   - per paper only what the exam hub needs to link it (small; the hub chunk imports it)
//
// Usage: node scripts/gen-pyq-pages.mjs [--server ../pariksha-saathi-server] [--db <sqlite file for topic names>]
//
// Reads the server repo's own seed files (prisma/seed-data/pyq/<examId>/*.json, the same files the production seed
// publishes - format and rules in that folder's README.md and the server's docs/PYQ.md) and topic names from its local
// database - never the production API. Cancelled questions are left out, exactly as the seed leaves them out.
// Re-run after a paper is added or corrected, then commit the output; check:public fails if it is stale.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { buildPyqPapers, pyqIndexSource } from '../src/lib/pyqPapersBuild.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const serverArg = process.argv.indexOf('--server');
const SERVER = resolve(serverArg > 0 ? process.argv[serverArg + 1] : '/Users/mahesh/dev/pariksha-saathi-server');
const PYQ_DIR = join(SERVER, 'prisma', 'seed-data', 'pyq');
if (!existsSync(PYQ_DIR)) throw new Error(`No PYQ seed folder at ${PYQ_DIR} - pass --server <path to pariksha-saathi-server>`);

const files = [];
for (const examDir of readdirSync(PYQ_DIR).filter((d) => statSync(join(PYQ_DIR, d)).isDirectory())) {
  for (const f of readdirSync(join(PYQ_DIR, examDir)).filter((n) => n.endsWith('.json') && !n.startsWith('_')).sort()) {
    files.push(JSON.parse(readFileSync(join(PYQ_DIR, examDir, f), 'utf8')));
  }
}
const dbArg = process.argv.indexOf('--db');
const db = new DatabaseSync(dbArg > 0 ? resolve(process.argv[dbArg + 1]) : join(SERVER, 'prisma', 'dev.db'), { readOnly: true });
const topicNames = Object.fromEntries(db.prepare('SELECT sharedTopicKey AS k, name FROM Topic GROUP BY sharedTopicKey').all().map((r) => [r.k, r.name]));

const papers = buildPyqPapers(files, topicNames);
writeFileSync(join(ROOT, 'src', 'data', 'pyqPapers.json'), `${JSON.stringify(papers)}\n`);
writeFileSync(join(ROOT, 'src', 'data', 'pyqPaperIndex.mjs'), pyqIndexSource(papers));
console.log(`Previous-year papers: ${papers.length} (${papers.map((p) => `${p.displayName} ${p.date} ${p.shift}: ${p.questions.length}/${p.questionsInPaper ?? '?'}`).join('; ')})`);
