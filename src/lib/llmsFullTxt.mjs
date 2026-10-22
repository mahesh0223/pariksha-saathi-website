// /llms-full.txt - every exam page's facts in one plain-Markdown file, the optional companion to /llms.txt (llmstxt.org),
// for AI answer engines that read a single document. Built by scripts/prerender.mjs from the same fact sheets, cut-offs
// and job-profile pages as the site, in English. It restates what the pages show and adds nothing: every exam block names
// its official notice and the day it was last checked, and where a notice is silent the file says so. Checked by
// scripts/check-public-pages.mjs (every hub exam present with its source; no human-review claim).
import { SITE_NAME, SITE_URL } from './siteEntity.mjs';
import { EXAM_NAMES } from './examNames.mjs';
import { homeVisitFor } from './officialLink.mjs';
import { examHubPath, examUpdatesPath, formatHubDate } from './examHubPath.mjs';
import { PYQ_INDEX_EXAMS, pyqIndexPath } from './pyqPath.mjs';
import { EXAM_JOB_PROFILES } from '../data/examJobProfiles.mjs';
import { EXAM_SYLLABI } from '../data/examSyllabi.mjs';

const CATEGORY_ORDER = ['UR', 'OBC', 'EWS', 'SC', 'ST', 'ESM', 'OH', 'HH', 'VH', 'Other PwD'];
const en = (bilingual) => bilingual?.en ?? '';
const day = (iso) => formatHubDate(String(iso).slice(0, 10), 'en');
const num = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100));
const cell = (v) => String(v ?? '').replaceAll('|', '/').replace(/\s+/g, ' ').trim();

function negative(part) {
  const nm = part.negativeMarking;
  if (nm === null || nm === undefined) return 'not stated in the notice';
  return nm.perWrongAnswer > 0 ? en(nm) : 'none';
}

function partLines(part) {
  const out = [];
  const head = [`**${en(part.name)}**${part.appliesTo ? ` (for ${en(part.appliesTo)})` : ''}`];
  if (part.durationMinutes) head.push(`${part.durationMinutes} minutes`);
  if (part.qualifying) head.push('qualifying');
  if (part.sections?.length || part.kind === 'objective') head.push(`negative marking: ${negative(part)}`);
  out.push(`- ${head.join('; ')}`);
  if (part.durationNote) out.push(`  - ${en(part.durationNote)}`);
  if (part.sections?.length) {
    out.push('', '  | Section | Questions | Marks | Minutes |', '  |---|---|---|---|');
    for (const s of part.sections) out.push(`  | ${cell(en(s.name))} | ${s.questions ?? '-'} | ${s.marks ?? '-'} | ${s.minutes ?? '-'} |`);
    out.push('');
  } else if (part.marks) {
    out.push(`  - ${part.marks} marks (the notice gives no section table).`);
  }
  for (const n of part.notes ?? []) out.push(`  - ${en(n)}`);
  return out;
}

function cutoffLines(cutoffs) {
  if (!cutoffs?.length) return [];
  const out = ['', '### Past cut-offs (from the official result write-ups)', ''];
  const groups = new Map();
  for (const r of cutoffs) {
    const key = `${r.section}|${r.cycleLabel}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }
  const keys = [...groups.keys()].sort((a, b) => b.split('|')[1].localeCompare(a.split('|')[1]) || a.localeCompare(b));
  for (const key of keys) {
    const rows = groups.get(key).sort((a, b) => (CATEGORY_ORDER.indexOf(a.category) + 1 || 99) - (CATEGORY_ORDER.indexOf(b.category) + 1 || 99));
    const [section, cycle] = key.split('|');
    out.push(`- ${section}, ${cycle} (out of ${num(rows[0].maxScore)}): ${rows.map((r) => `${r.category} ${r.targetScore.toFixed(2)}`).join(', ')}. Source: ${rows[0].sourceUrl} (checked ${day(rows[0].verifiedAt)})`);
  }
  return out;
}

function examBlock({ examId, examName, facts, cutoffs }) {
  const fact = facts[0];
  const slug = examId.replace(/_/g, '-');
  const job = EXAM_JOB_PROFILES.find((e) => e.slug === slug);
  const syllabus = EXAM_SYLLABI.find((e) => e.slug === slug);
  const out = [
    `## ${examName} (${fact.cycleLabel})`,
    '',
    `Exam page: ${SITE_URL}${examHubPath(examId, 'en')}`,
    `Official source: ${fact.noticeTitle}: ${fact.sourceUrl} (last checked ${day(fact.verifiedAt)})`,
    '',
    '### Selection stages',
    '',
  ];
  fact.stages.forEach((stage, i) => {
    out.push(`${i + 1}. ${en(stage.name)}${stage.appliesTo ? ` (applies to: ${en(stage.appliesTo)})` : ''}${stage.partsAreAlternatives ? ' - each paper below is a separate test, not a section of one paper' : ''}`);
    for (const part of stage.parts ?? []) out.push(...partLines(part).map((l) => (l ? `   ${l}` : l)));
  });
  const el = fact.eligibility ?? {};
  out.push('', '### Eligibility', '');
  if (el.ageNote) {
    const refDay = el.ageReferenceDate ? day(el.ageReferenceDate) : '';
    out.push(`- Age: ${en(el.ageNote)}${refDay && !en(el.ageNote).includes(refDay) ? ` Age is counted as on ${refDay}.` : ''}`);
  }
  for (const q of el.qualification ?? []) out.push(`- Qualification (${en(q.posts)}): ${en(q.requirement)}`);
  if (el.qualifyingMarks) out.push(`- Minimum qualifying marks: ${en(el.qualifyingMarks)}`);
  if (fact.dates?.length) {
    out.push('', '### Key dates', '');
    for (const d of fact.dates) {
      if (!d.text && !d.from) continue;
      const when = d.text ? en(d.text) : d.to && String(d.to).slice(0, 10) !== String(d.from).slice(0, 10) ? `${day(d.from)} to ${day(d.to)}` : day(d.from);
      out.push(`- ${en(d.label)}: ${when}${d.sourceUrl && d.sourceUrl !== fact.sourceUrl ? ` (source: ${d.sourceUrl})` : ''}`);
    }
  }
  if (fact.vacancies?.total) out.push('', '### Vacancies', '', `- ${fact.vacancies.total.toLocaleString('en-IN')} tentative vacancies${fact.vacancies.asOf ? `, as officially published on ${day(fact.vacancies.asOf)}` : ''}. Source: ${fact.vacancies.sourceUrl ?? fact.sourceUrl}`);
  out.push(...cutoffLines(cutoffs));
  if (job) {
    out.push('', `### Pay (${SITE_URL}/compare/${slug}-job-profile/)`, '', `- ${job.en.salaryHeading}`);
    for (const p of job.en.salaryBody) out.push(`- ${p}`);
    out.push(`- Source: ${job.officialUrl}`);
  }
  const related = [
    syllabus ? `syllabus ${SITE_URL}/compare/${slug}-syllabus/` : null,
    PYQ_INDEX_EXAMS.includes(examId) ? `previous-year papers with answers ${SITE_URL}${pyqIndexPath(examId, 'en')}` : null,
    `admit card, result and answer-key notices ${SITE_URL}${examUpdatesPath(examId, 'en')}`,
    `Hindi exam page ${SITE_URL}${examHubPath(examId, 'hi')}`,
  ].filter(Boolean);
  out.push('', `Related pages: ${related.join('; ')}.`, '');
  // A portal that rejects cold document links (src/lib/officialLink.mjs): say how to open them, under the source line.
  const cold = (out.join('\n').match(/https:\/\/[^\s);]+/g) ?? []).map(homeVisitFor).find(Boolean);
  if (cold) out.splice(4, 0, `Opening the official documents: ${cold.host} answers a document link opened directly with "Request Rejected" until its home page (${cold.home}) has been visited once in the same browser session; visit it first, then open the link.`);
  return out.join('\n');
}

/** @param {{ exams: {examId: string, examName?: string, facts: any[], cutoffs: any[]}[], generated: string }} args */
export function llmsFullTxt({ exams, generated }) {
  const blocks = exams.map((x) => examBlock({ ...x, examName: x.examName ?? EXAM_NAMES[x.examId] ?? x.examId }));
  return `# ${SITE_NAME}: exam facts in full

> The official facts behind every exam page on ${SITE_URL}: selection stages, papers, marks, timing, negative marking, eligibility, dates, vacancies, published cut-offs and notice-printed pay for ${exams.length} Indian government exams, each with the official notice it was copied from and the date it was last checked. Generated ${day(generated)} from the same data as the pages. The short map of the whole site is ${SITE_URL}/llms.txt.

How these facts are made: every figure is copied from the official notification or result write-up named in its block, and checked against it on the date given. Where a notice is silent the file says so rather than estimating. Take-home pay is never estimated. Exam bodies revise notices by corrigendum: the official source is final.

${blocks.join('\n')}`;
}
