export type PublicPageKey = 'learn' | 'about' | 'privacy' | 'contact' | 'downloads' | 'terms' | 'account-deletion' | 'hi' | 'hi-learn';
export const PUBLIC_PAGES: Record<PublicPageKey, { title: string; description: string; path?: string; lang?: 'en' | 'hi'; twin?: string }>;
export const SITE_SHOWS_ADS: boolean;
export function publicPageMeta(key: PublicPageKey): { title: string; description: string; path: string; lang: 'en' | 'hi'; alternateLanguages?: { lang: string; path: string }[] };
export function publicPageBody(key: PublicPageKey): string;
export function publicPageStructuredData(key: PublicPageKey): object | object[];
export function escapeHtml(value: unknown): string;
