export const EXAMS_LINK: Record<'en' | 'hi', { href: string; label: string; title: string }>;
export const DIRECTORY_EXAM_IDS: string[];
export function examsLinkHtml(lang?: 'en' | 'hi'): string;
export function examDirectoryPath(lang: 'en' | 'hi'): string;
export function examDirectoryBody(args: { lang?: 'en' | 'hi'; hubIds?: string[]; syllabusSlugs?: string[]; jobProfileSlugs?: string[] }): string;
export function examDirectoryMeta(lang?: 'en' | 'hi'): { title: string; description: string };
