// /llms.txt - a plain-Markdown map of the site for large language models and AI answer engines (the llmstxt.org
// convention: an H1, a one-paragraph summary in a blockquote, then sections of links with a note each). Built by
// scripts/prerender.mjs from the same data as the pages, so it lists exactly what the build published, and checked
// by scripts/check-public-pages.mjs (every link built, every hub and solved paper listed, no human-review claim).
// Its wording about how content is made is the About page's own (publicPages.mjs) - do not invent new claims here.
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './siteEntity.mjs';
import { EXAM_NAMES } from './examNames.mjs';
import { examHubPath } from './examHubPath.mjs';
import { DIRECTORY_EXAM_IDS, examDirectoryPath } from './examDirectory.mjs';
import { examCalendarPath } from './examCalendar.mjs';
import { questionIndexPath } from './questionPage.mjs';
import { typingTestPath } from './typingPage.mjs';
import { pyqPaperPath } from './pyqPath.mjs';
import { TRUST_LINES } from '../data/trustLines.mjs';
import { TELEGRAM_CHANNEL_URL } from '../data/socialLinks.mjs';
import { PLAY_STORE_URL } from '../data/siteLinks.mjs';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
const link = (name, path, note) => `- [${name}](${SITE_URL}${path})${note ? `: ${note}` : ''}`;

/**
 * @param {{ hubs: Record<string, {hasCutoffs: boolean, lastVerified: string}>, papers: {examId: string, displayName: string, date: string, shift: string, slug: string, questions: number}[],
 *           affairsCount: number, noticesCount: number, lessonCount: number, questionPageCount: number }} args
 */
export function llmsTxt({ hubs: hubSummaries, papers, affairsCount, noticesCount, lessonCount, questionPageCount }) {
  const hubs = DIRECTORY_EXAM_IDS.filter((id) => hubSummaries[id]);
  // Only what that hub page shows: cut-offs appear on a hub only where the exam body published a clean table.
  const hubNote = (id) =>
    `official exam pattern, negative marking, timing, age limit and dates, each linked to its source${hubSummaries[id].hasCutoffs ? ', plus past cut-offs from the official results' : ''}; facts last verified ${shortDate(hubSummaries[id].lastVerified)}`;
  const paperQuestions = papers.reduce((sum, p) => sum + p.questions, 0);
  const paperSets = [...new Set(papers.map((p) => p.displayName))];
  const sortedPapers = [...papers].sort((a, b) => a.date.localeCompare(b.date) || a.shift.localeCompare(b.shift));
  const app = PLAY_STORE_URL
    ? `- [Android app on Google Play](${PLAY_STORE_URL}): the same lessons and practice, usable offline.`
    : '';

  return `# ${SITE_NAME} (परीक्षा साथी)

> ${SITE_DESCRIPTION}

${SITE_NAME} covers ${hubs.length} exams: ${hubs.map((id) => EXAM_NAMES[id]).join(', ')}. Most pages exist in English and Hindi (Hindi pages sit under /hi/); the solved papers are in English, the language they were set in.

How the content is made, in the words of our About page: much of the content is drafted with AI assistance from the official document or release it links to, and checked against that source before publication; each page's credit line says how it was produced. Every number on an exam page (marks, timing, negative marking, age limits, fees, dates, cut-offs) is copied from the official notification or result write-up it links to, with the date it was last checked. Where a notice is silent, the page says so rather than estimating.

What we promise: ${TRUST_LINES.en.join(' ')}

## Exams: official pattern, dates, eligibility and cut-offs

${link('All exams', examDirectoryPath('en'), `the ${hubs.length} exams grouped by SSC, banking, railways, state police, defence, teaching and state PSC`)}
${hubs.map((id) => link(EXAM_NAMES[id], examHubPath(id, 'en'), hubNote(id))).join('\n')}
${link('Exam calendar', examCalendarPath('en'), 'upcoming exam dates, each taken from an official notice')}

## Solved previous-year papers

${paperSets.join(', ')}: ${papers.length} shifts, ${paperQuestions.toLocaleString('en-IN')} questions as the exam body printed them, each with the answer from the official answer key and a worked explanation. Questions that cannot be reproduced faithfully as text (figures, tables, images) are left out.

${sortedPapers.map((p) => link(`${p.displayName}, ${shortDate(p.date)}, ${p.shift}`, pyqPaperPath(p), `${p.questions} questions with answers`)).join('\n')}

## Current affairs and exam notices

${link('Current affairs', '/app/current-affairs/', `${affairsCount} daily items from Press Information Bureau (PIB) releases, in English and Hindi, each linked to its release, with a practice question and a learning note`)}
${link('Daily current affairs PDF', '/downloads/', 'one free Hindi PDF each morning, plus monthly capsules')}
${link('Exam notices', '/app/exam-notices/', `${noticesCount} recruitment notices, admit-card, result and date updates, each linked to the exam body's own notice`)}

## Learn and practise

${link('Lessons', '/learn/', `${lessonCount} topic lessons in Quantitative Aptitude, Reasoning, English, General Awareness, State GK and CTET pedagogy`)}
${link('Practice questions', questionIndexPath('en'), `multiple-choice questions with answers and explanations, by topic, in English and Hindi (${questionPageCount.toLocaleString('en-IN')} question pages across the two languages)`)}
${link('Typing and data-entry test', typingTestPath('en'), 'practice for the SSC CGL and CHSL skill tests, with the speed standards from the official notices')}

## About

${link('About and editorial standards', '/about/', 'who publishes the site, how content is produced and checked, and how to report an error')}
${link('Contact', '/contact/', 'corrections and questions')}
- [Telegram channel](${TELEGRAM_CHANNEL_URL}): the daily current-affairs PDF, a daily quiz and new exam notices, in Hindi.
${app ? `${app}\n` : ''}
## Optional

${link('हिंदी होम', '/hi/', 'the Hindi landing page')}
${link('परीक्षाएँ (Hindi exam pages)', examDirectoryPath('hi'), 'the same exam pages in Hindi')}
${link('Sitemap', '/sitemap.xml', 'every public URL')}
`;
}
