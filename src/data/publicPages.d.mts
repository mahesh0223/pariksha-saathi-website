export const PUBLIC_PAGES: Record<'learn' | 'about' | 'privacy', {title: string; description: string}>;
export function publicPageBody(key: 'learn' | 'about' | 'privacy'): string;
export function escapeHtml(value: unknown): string;
