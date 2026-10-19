// Writes src/data/examHubExtras.mjs from src/lib/examHubExtrasBuild.mjs. Re-run after the syllabus pages or the
// question pages (scripts/gen-question-pages.mjs) change; check:public fails if it is stale.
import { writeFileSync } from 'node:fs';
import { buildExamHubExtras, examHubExtrasSource } from '../src/lib/examHubExtrasBuild.mjs';

const built = buildExamHubExtras();
writeFileSync(new URL('../src/data/examHubExtras.mjs', import.meta.url), examHubExtrasSource(built));
const { extras, topics } = built;
const entries = Object.values(extras);
console.log(`Exam hub extras: ${entries.length} exams, ${entries.filter((e) => e.syllabus).length} with a syllabus, ${entries.filter((e) => e.practice.length).length} with practice links to ${Object.keys(topics).length} topics.`);
