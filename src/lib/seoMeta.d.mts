export const SITE_NAME: string;
export const SITE_ALT_NAMES: string[];
export function withSiteName(title: string): string;
export function metaDescription(text: string | null | undefined, max?: number): string;
export const LESSON_SEO_TITLES: Record<string, { en?: string; hi?: string }>;
export const LESSON_SEO_TITLE_TERMS: Record<string, string[]>;
export function lessonSeoTitle(slug: string, lang: 'en' | 'hi', fallback: string): string;
export const PAGE_META: Record<'home' | 'currentAffairs' | 'examNotices', { title: string; description: string }>;
