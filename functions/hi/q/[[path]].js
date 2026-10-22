// Cloudflare Pages Function for /hi/q/*: the Hindi twin of functions/q/[[path]].js.
import { QUESTION_REDIRECTS } from '../../../src/data/questionRedirects.mjs';
import { questionRedirectResponse } from '../../../src/lib/questionRedirects.mjs';

export const onRequest = (context) => questionRedirectResponse(context, QUESTION_REDIRECTS);
