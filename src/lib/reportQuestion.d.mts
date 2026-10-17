export const CONTACT_EMAIL: string;
export function reportQuestionLabel(lang?: 'en' | 'hi'): string;
export function reportQuestionMailto(args: { id: string; topicKey?: string; languageCode?: string; page?: string }): string;
export function reportQuestionLinkHtml(question: { id: string; topicKey?: string; languageCode?: string }, lang: 'en' | 'hi', page?: string): string;
