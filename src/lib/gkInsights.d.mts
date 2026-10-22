export const GK_INSIGHTS_LINK: Record<'en' | 'hi', { href: string; label: string }>;
export const GK_INSIGHTS_EXAMS: string[];
export const GK_INSIGHTS_PUBLISHED: string;
export const GK_INSIGHTS_SUMMARY: { total: number; paperCount: number; repeats: number };
export function gkInsightsPath(lang: string): string;
export function gkInsightsBody(lang?: string): string;
export function gkInsightsMeta(lang?: string): { title: string; description: string };
