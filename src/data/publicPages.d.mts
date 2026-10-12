export const PUBLIC_PAGES: Record<'learn' | 'about' | 'privacy' | 'contact' | 'terms', {title: string; description: string}>;
export function publicPageBody(key: 'learn' | 'about' | 'privacy' | 'contact' | 'terms'): string;
export function escapeHtml(value: unknown): string;
