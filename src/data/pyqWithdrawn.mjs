// Withdrawn by the owner on 24 Oct 2026, pending legal advice on publishing SSC question papers (server repo
// docs/legal/ssc-papers-2026-10-24.md): the solved-paper pages and lists, the paper PDFs, the previous-year sections of
// the /q/ topic pages, the Hindi-language topic pages built on SSC GD's Part-D questions, and the GK-topics data page
// counted from the papers. While PYQ_WITHDRAWN is true the generators write no paper data, the build makes none of
// these pages, functions/ answers their old URLs with 410 Gone, and check:public fails if any page still links one.
// To restore: set it to false, re-run gen-pyq-pages, gen-question-pages and gen-gk-insights, rebuild the paper PDFs
// (scripts/paper-pdf/make_paper_pdfs.py), and re-seed the server's papers (its PYQ_WITHDRAWN switch).
export const PYQ_WITHDRAWN = true;

const WITHDRAWN_PATHS = [
  /^\/(hi\/)?exams\/[a-z0-9-]+\/question-papers(\/|$)/,
  /^\/pdf\/papers(\/|$)/,
  /^\/(hi\/)?exams\/ssc-gk-topics(\/|$)/,
  /^\/hi\/q\/hindi-[a-z0-9-]+(\/|$)/,
];

export const isWithdrawnPath = (path) => PYQ_WITHDRAWN && WITHDRAWN_PATHS.some((re) => re.test(path));

const PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page withdrawn - Pariksha Saathi</title><style>body{font-family:system-ui,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1rem;line-height:1.6;color:#1f2a37}a{color:#1d4ed8}</style></head><body><h1>This page has been withdrawn</h1><p>Previous-year question papers are not published on Pariksha Saathi at present.</p><p lang="hi">पिछले वर्षों के प्रश्नपत्र अभी Pariksha Saathi पर प्रकाशित नहीं हैं।</p><p><a href="/q/">Practice questions with answers</a> · <a href="/exams/">Exam pages</a> · <a href="/">Home</a></p></body></html>`;

/** 410 Gone: tells search engines the page was removed on purpose, so they drop it sooner than a 404. */
export const withdrawnResponse = () =>
  new Response(PAGE, { status: 410, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=3600' } });

/** For a Pages Function: 410 for a withdrawn path, the static site for everything else. */
export const withdrawnOrNext = (context) =>
  (isWithdrawnPath(new URL(context.request.url).pathname) ? withdrawnResponse() : context.next());
