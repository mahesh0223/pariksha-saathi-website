// Cloudflare Pages Function for /hi/q/*: the Hindi twin of functions/q/[[path]].js.
import { QUESTION_REDIRECTS } from '../../../src/data/questionRedirects.mjs';
import { questionRedirectResponse } from '../../../src/lib/questionRedirects.mjs';
import { isWithdrawnPath, withdrawnResponse } from '../../../src/data/pyqWithdrawn.mjs';

// The Hindi-language topic pages built on SSC GD's Part-D questions are withdrawn with the papers (pyqWithdrawn.mjs).
export const onRequest = (context) =>
  (isWithdrawnPath(new URL(context.request.url).pathname) ? withdrawnResponse() : questionRedirectResponse(context, QUESTION_REDIRECTS));
