// Cloudflare Pages Function: 410 Gone for the previous-year paper pages, paper PDFs and the pages built on them
// (src/data/pyqWithdrawn.mjs); every other page under this path falls through to the static files.
import { withdrawnOrNext } from '../../src/data/pyqWithdrawn.mjs';

export const onRequest = withdrawnOrNext;
