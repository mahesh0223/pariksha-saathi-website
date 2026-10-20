import type { CurrentAffairsItem, CutoffTarget, ExamFact, ExamUpdateNotice } from '../types/api';

export function formatHubDate(iso: string, lang: 'en' | 'hi'): string;
export function examHubSlug(examId: string): string;
export function examHubPath(examId: string, lang: 'en' | 'hi'): string;
export function examHubBody(args: {
  examName: string;
  facts: ExamFact[];
  cutoffs?: CutoffTarget[];
  notices?: ExamUpdateNotice[];
  items?: CurrentAffairsItem[];
  lang?: 'en' | 'hi';
  links?: { syllabusPath?: string; jobProfilePath?: string; typingTestPath?: string };
  pyq?: { languageCode?: string; total: number; papers: { paper: string; year: number; date: string; shift: string; sourceUrl: string; count: number }[] } | null;
  liveMock?: LiveMockSummary | null;
  playStoreUrl?: string;
  now?: Date;
  extras?: ExamHubExtras | null;
}): string;
export interface ExamHubExtras {
  syllabus: ({ officialUrl: string } & Record<'en' | 'hi', { name: string; body: string | string[] }[]>) | null;
  practice: { group: string; keys: string[] }[];
}
export function examHubFaq(args: { examName: string; facts: ExamFact[]; lang?: 'en' | 'hi'; extras?: ExamHubExtras | null }): { q: string; a: string }[];
export interface LiveMockSummary {
  startsAt: string;
  endsAt: string;
  questionCount: number;
  durationMinutes: number;
}
export function liveMockLineHtml(liveMock: LiveMockSummary | null, playStoreUrl: string, lang?: 'en' | 'hi', now?: Date): string;
export function hubReportMailto(args: { examName: string; block: string; page: string; sourceUrl: string; verifiedIso: string }): string;
export function examHubMeta(args: { examName: string; facts: ExamFact[]; cutoffs?: CutoffTarget[]; lang?: 'en' | 'hi' }): {
  title: string;
  description: string;
  lastVerified: string;
  h1: string;
};
export function examHubStructuredData(args: {
  examName: string;
  facts: ExamFact[];
  cutoffs?: CutoffTarget[];
  lang?: 'en' | 'hi';
  siteUrl: string;
}): object[];
export function hubItemTag(examId: string): string | null;
export function hubItems(examId: string, items: CurrentAffairsItem[], count?: number): CurrentAffairsItem[];
