export const PUBLIC_PAGES: Record<'learn' | 'about', {title: string; description: string}>;
export function publicPageBody(key: 'learn' | 'about'): string;
export function escapeHtml(value: unknown): string;
