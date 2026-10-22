// Writes src/data/questionRedirects.mjs (old one-question page -> its place on the topic list) from the question
// data. scripts/gen-question-pages.mjs runs this after it rewrites the data; run it by hand only if you change the
// grouping or page size in src/lib/questionPage.mjs. Usage: node scripts/gen-question-redirects.mjs
import { writeFileSync } from 'node:fs';
import { questionRedirectsSource } from '../src/lib/questionRedirectsBuild.mjs';

const target = new URL('../src/data/questionRedirects.mjs', import.meta.url);
writeFileSync(target, questionRedirectsSource());
console.log(`Wrote ${target.pathname}`);
