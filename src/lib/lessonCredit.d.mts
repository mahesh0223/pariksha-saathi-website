export function isAiAssisted(entry: { credit?: string }): boolean;
export function lessonCredit(entry: { credit?: string; publishedDate: string }, lang: 'en' | 'hi'): { text: string; link: string };
export function lessonClosing(entry: { en: { keyFacts?: string[] } }, lang: 'en' | 'hi'): string;
export function lessonAuthor(entry: { credit?: string }): { '@type': string; name: string };
export function subjectBlurb(subject: string): string;
