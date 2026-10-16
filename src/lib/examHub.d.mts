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
  links?: { syllabusPath?: string; jobProfilePath?: string };
}): string;
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
