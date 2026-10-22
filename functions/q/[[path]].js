// Cloudflare Pages Function for /q/*: a permanent redirect from an old one-question page to that question on its
// topic list (src/lib/questionRedirects.mjs); the index and the topic lists fall through to the static files.
import { QUESTION_REDIRECTS } from '../../src/data/questionRedirects.mjs';
import { questionRedirectResponse } from '../../src/lib/questionRedirects.mjs';

export const onRequest = (context) => questionRedirectResponse(context, QUESTION_REDIRECTS);
