export const TYPING_PATH: Record<'en' | 'hi', string>;
export function typingTestPath(lang: 'en' | 'hi'): string;
export function typingTestStaticHtml(lang?: 'en' | 'hi'): string;
export function typingTestMeta(lang?: 'en' | 'hi'): { title: string; description: string };
