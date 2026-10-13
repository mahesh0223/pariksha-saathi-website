export const PUBLIC_PAGES: Record<'learn' | 'about' | 'privacy' | 'contact' | 'terms' | 'account-deletion', {title: string; description: string}>;
export function publicPageBody(key: 'learn' | 'about' | 'privacy' | 'contact' | 'terms' | 'account-deletion'): string;
export function escapeHtml(value: unknown): string;
