// The solved previous-year paper page (/exams/<exam>/question-papers/<paper>/): every published question of one official
// paper, in the paper's own sections and numbering, each with the official answer and our explanation behind a
// "show answer" toggle. Plain HTML - no app script - like the /q/ pages. Data: src/data/pyqPapers.json
// (scripts/gen-pyq-pages.mjs, from the server's PYQ seed files).
import { examsLinkHtml } from './examDirectory.mjs';
import { examHubPath } from './examHubPath.mjs';
import { socialLinksHtml } from '../data/socialLinks.mjs';
import { telegramCtaHtml } from './telegramCta.mjs';
import { metaDescription } from './seoMeta.mjs';
import { pyqIndexPath, pyqPaperPath } from './pyqPath.mjs';
import { QUESTION_TOPICS } from '../data/questionTopics.mjs';
import { topicListPath } from './questionPage.mjs';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = (iso) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const shortDate = (iso) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1].slice(0, 3)} ${iso.slice(0, 4)}`;
const marks = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

const paragraphs = (text) => String(text).split(/\n{2,}/).map((p) => `<p>${esc(p)}</p>`).join('');

export function pyqPaperMeta(paper) {
  const title = `${paper.displayName} Question Paper (${shortDate(paper.date)}, ${paper.shift}) with Answers`;
  const sections = [...new Set(paper.questions.map((q) => q.section).filter(Boolean))];
  return {
    title,
    h1: `${paper.displayName} question paper: ${longDate(paper.date)}, ${paper.shift}, with answers`,
    description: metaDescription(`${paper.questions.length} questions from the ${paper.displayName} paper of ${longDate(paper.date)} (${paper.shift}), as the exam body printed them, each with the official answer and a worked explanation${sections.length ? `: ${sections.join(', ')}` : ''}.`),
  };
}

// The order the official result write-ups list categories in; anything else follows in its own order.
const CATEGORY_ORDER = ['UR', 'OBC', 'EWS', 'SC', 'ST', 'ESM', 'OH', 'HH', 'VH', 'Other PwD'];

/**
 * "Compare your score with the official cut-off": only for a paper whose seed names its own cycle's cut-off
 * (paper.cutoff) and whose rows the API publishes - never another year's figure. cutoffRows: that exam's rows from
 * /v1/exams/:id/cutoffs. States the marking to score by, how many questions this page lacks, and that SSC applies
 * cut-offs to normalised marks, so a raw score on one shift is a rough guide.
 */
export function pyqCutoffHtml(paper, cutoffRows = []) {
  if (!paper.cutoff) return '';
  const rows = cutoffRows
    .filter((r) => r.section === paper.cutoff.section && r.cycleLabel === paper.cutoff.cycleLabel)
    .sort((a, b) => ((CATEGORY_ORDER.indexOf(a.category) + 1) || 99) - ((CATEGORY_ORDER.indexOf(b.category) + 1) || 99));
  if (rows.length === 0) return '';
  const n = paper.questions.length;
  const total = paper.questionsInPaper;
  const max = rows[0].maxScore;
  const scoring = paper.markingNote
    ? esc(paper.markingNote)
    : `+${marks(paper.marksPerQuestion)} for each right answer, &minus;${marks(paper.negativeMarksPerWrong)} for each wrong one and 0 for one you skip`;
  const leftOut = total && total > n
    ? ` This page has ${n} of the paper's ${total} questions: count the ${total - n} left out as skipped, so the most you can score here is ${marks(n * paper.marksPerQuestion)} of ${marks(total * paper.marksPerQuestion)}.`
    : '';
  const checked = rows.map((r) => String(r.verifiedAt).slice(0, 10)).sort().at(-1);
  return `<section class="pyq-cutoff" id="cut-off">
      <h2>Compare your score with the official cut-off</h2>
      <p>Score yourself the exam's way: ${scoring}.${leftOut}</p>
      <p>The official ${esc(paper.cutoff.cycleLabel)} cut-off (${esc(paper.cutoff.section)}), out of ${marks(max)}:</p>
      <div class="hub-table-wrap"><table class="hub-table"><thead><tr><th>Category</th><th>Cut-off</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.category)}</td><td>${r.targetScore.toFixed(2)}</td></tr>`).join('')}</tbody></table></div>
      <p class="hub-source">The exam body applies the cut-off to marks normalised across all the exam's shifts, so your raw score on one shift is a rough guide, not a prediction. Source: <a href="${esc(rows[0].sourceUrl)}" target="_blank" rel="noreferrer">the official result write-up &#8599;</a> · checked ${longDate(checked)}.</p>
    </section>`;
}

function topicLink(q) {
  const topic = QUESTION_TOPICS[q.topicKey];
  return topic && topic.en.count > 0 ? `<a href="${topicListPath(topic, 'en')}">${esc(q.topicName)}</a>` : esc(q.topicName);
}

export function pyqPaperBody(paper, cutoffRows = []) {
  const meta = pyqPaperMeta(paper);
  const total = paper.questionsInPaper;
  const n = paper.questions.length;
  const sections = [];
  for (const q of paper.questions) {
    const key = q.section ?? 'Questions';
    let s = sections.find((x) => x.name === key);
    if (!s) sections.push((s = { name: key, questions: [] }));
    s.questions.push(q);
  }
  const anchor = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const leftOut = total && total > n
    ? ` The other ${total - n} of the paper's ${total} questions are not reproduced: they need a figure or are printed as an image, or ask about formatting the source does not keep.`
    : '';
  const body = sections.map((s) => `
    <section class="pyq-section" id="${anchor(s.name)}">
      <h2>${esc(s.name)} <span>${s.questions.length} question${s.questions.length === 1 ? '' : 's'}</span></h2>
      <ol class="pyq-list">${s.questions.map((q) => `
        <li class="pyq-q" id="${anchor(s.name)}-q${q.number ?? ''}">
          <div class="pyq-num">Q.${q.number ?? ''}</div>
          <div class="pyq-text">${paragraphs(q.text)}</div>
          <ol class="pyq-opts">${q.options.map((o, i) => `<li><b>${LETTERS[i]}</b> ${esc(o)}</li>`).join('')}</ol>
          <details class="pyq-answer"><summary>Show answer and explanation</summary>
            <p class="pyq-correct">Answer: (${LETTERS[q.correctOptionIndex]}) ${esc(q.options[q.correctOptionIndex])}</p>
            <p>${esc(q.explanation)}</p>
            <p class="pyq-topic">Topic: ${topicLink(q)}</p>
          </details>
        </li>`).join('')}
      </ol>
    </section>`).join('');
  const hub = examHubPath(paper.examId, 'en');
  const index = pyqIndexPath(paper.examId, 'en');
  const examName = paper.displayName.replace(/\s+\d{4}.*$/, '');
  return `<div class="compare-page">
  <header class="pub-header">
    <div class="wrap pub-nav">
      <a class="pub-brand" href="/"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
      <nav class="pub-nav-links"><a href="/q/">Practice questions</a><a href="/app/current-affairs/">Current affairs</a></nav>
      ${examsLinkHtml('en')}<a class="pub-cta" href="/onboarding/">Start studying</a>
    </div>
  </header>
  <article class="wrap compare-article pyq-paper">
    <div class="compare-top-row"><a href="${hub}" class="detail-back">&larr; ${esc(examName)} exam page</a><a href="${index}" class="detail-back">All ${esc(examName)} previous year papers</a></div>
    <h1>${esc(meta.h1)}</h1>
    <p class="compare-lede">${n} questions from the official paper of ${longDate(paper.date)} (${esc(paper.shift)}), exactly as the exam body printed them, each with the answer from the official key and a worked explanation. ${paper.markingNote ? `Marking: ${esc(paper.markingNote)}` : `Every question carries ${marks(paper.marksPerQuestion)} marks, and ${marks(paper.negativeMarksPerWrong)} is deducted for a wrong answer.`}${leftOut} Try each question before opening its answer.</p>
    <p class="hub-source">Source: <a href="${esc(paper.sourceUrl)}" target="_blank" rel="noreferrer">the exam body's answer-key notice &#8599;</a> · Questions and answers: the exam body. Explanations: drafted with AI assistance by Pariksha Saathi and checked against the official answers. Spotted an error? <a href="/contact/">Tell us</a>.</p>
    <nav class="pyq-jump">${sections.map((s) => `<a href="#${anchor(s.name)}">${esc(s.name)}</a>`).join('')}</nav>
    ${pyqCutoffHtml(paper, cutoffRows)}
    ${body}
    ${telegramCtaHtml('en')}
    <p><a href="${index}">All ${esc(examName)} previous year question papers with answers &rarr;</a></p>
    <p><a href="${hub}">More on the ${esc(examName)} exam: pattern, syllabus, cut-offs and notices &rarr;</a></p>
  </article>
  <footer class="pub-footer">
    <div class="wrap pub-footer-links">
      <a href="/about/">About &amp; editorial standards</a><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a><a href="/contact/">Contact</a><a href="/downloads/">Daily PDF</a>
    ${socialLinksHtml()}</div>
  </footer>
</div>`;
}

export function pyqPaperStructuredData(paper, siteUrl) {
  const meta = pyqPaperMeta(paper);
  const path = pyqPaperPath(paper);
  return [
    {
      '@context': 'https://schema.org',
      // A solved paper is a study resource as well as an article; isBasedOn names the exam body's own answer-key
      // notice, so an answer engine quoting a question here can see where its answer comes from.
      '@type': ['Article', 'LearningResource'],
      headline: meta.h1,
      description: meta.description,
      url: `${siteUrl}${path}`,
      inLanguage: 'en',
      about: { '@type': 'Thing', name: paper.displayName },
      learningResourceType: 'Solved previous-year question paper',
      educationalUse: 'Exam preparation',
      isBasedOn: { '@type': 'CreativeWork', name: `${paper.displayName} official answer key`, url: paper.sourceUrl },
      publisher: { '@type': 'Organization', name: 'Pariksha Saathi', url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: paper.displayName.replace(/\s+\d{4}.*$/, ''), item: `${siteUrl}${examHubPath(paper.examId, 'en')}` },
        { '@type': 'ListItem', position: 3, name: 'Previous year question papers', item: `${siteUrl}${pyqIndexPath(paper.examId, 'en')}` },
        { '@type': 'ListItem', position: 4, name: `${shortDate(paper.date)}, ${paper.shift}`, item: `${siteUrl}${path}` },
      ],
    },
  ];
}
