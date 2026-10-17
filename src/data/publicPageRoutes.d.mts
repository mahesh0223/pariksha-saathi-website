// Type declaration for publicPageRoutes.mjs - see examSyllabi.d.mts for why this is separate from
// the data file itself.
import type { PublicPageKey } from './publicPages.mjs';

// Route path without its trailing slash (react-router matches either form) -> PUBLIC_PAGES key.
export const PUBLIC_PAGE_ROUTES: Record<string, PublicPageKey>;
