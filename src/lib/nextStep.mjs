// "One quiet next step" lines: the daily PDF and the Telegram channel, linked through /go/ redirects (public/_redirects)
// so Cloudflare's HTTP analytics counts the clicks per page family. Plan G1/G2 in the Android repo's
// docs/plans/2026-10-17-working-plan.md §8; both are reviewed together on 3 Nov 2026 (keep a family's line only if its
// /go/ paths get clicks the bottom Telegram box never did).
//
// G1 (from 20 Oct 2026): four pilot exam hubs, /go/hub-pdf and /go/hub-telegram (examHub.mjs nextStepLineHtml).
// G2 (from 24 Oct 2026): the most-read pages that are not hubs - the exam calendar, syllabus and job-profile pages and
// the solved papers - each with its own /go/<family>-pdf and /go/<family>-telegram.
const T = {
  en: { lead: 'Current affairs free every morning:', pdf: "today's PDF", pdfNote: '(in Hindi)', telegram: 'on Telegram' },
  hi: { lead: 'हर सुबह मुफ़्त करेंट अफेयर्स:', pdf: 'आज का PDF', pdfNote: '', telegram: 'Telegram पर' },
};

export const NEXT_STEP_SURFACES = ['calendar', 'syllabus', 'job-profile', 'paper'];

export function nextStepHtml(pdfHref, telegramHref, lang = 'en') {
  const n = T[lang] ?? T.en;
  return `<p class="hub-next">${n.lead} <a href="${pdfHref}" rel="nofollow">${n.pdf}</a>${n.pdfNote ? ` ${n.pdfNote}` : ''} &middot; <a href="${telegramHref}" rel="nofollow noopener" target="_blank">${n.telegram}</a></p>`;
}

/** The G2 line for one page family (NEXT_STEP_SURFACES). */
export function surfaceNextStepHtml(surface, lang = 'en') {
  if (!NEXT_STEP_SURFACES.includes(surface)) throw new Error(`unknown next-step surface: ${surface}`);
  return nextStepHtml(`/go/${surface}-pdf`, `/go/${surface}-telegram`, lang);
}
