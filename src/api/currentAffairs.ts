import { ApiError, apiRequest } from './client';
import type { CurrentAffairsItem, CurrentAffairsPeriod, Question } from '../types/api';

export function getCurrentAffairs(options: {
  lang: string;
  period?: CurrentAffairsPeriod;
  limit?: number;
  offset?: number;
  sourceUrl?: string;
}): Promise<CurrentAffairsItem[]> {
  const params = new URLSearchParams({ lang: options.lang });
  if (options.period) params.set('period', options.period);
  if (options.limit) params.set('limit', String(options.limit));
  if (options.offset) params.set('offset', String(options.offset));
  if (options.sourceUrl) params.set('sourceUrl', options.sourceUrl);
  return apiRequest<CurrentAffairsItem[]>(`/v1/current-affairs?${params}`);
}

// The API caps one list request at 100 items, so "every item" means paging through with offset -
// a single `limit: 100` call silently drops the oldest items once more than 100 are published.
export async function getAllCurrentAffairs(lang: string): Promise<CurrentAffairsItem[]> {
  const PAGE_SIZE = 100;
  const all: CurrentAffairsItem[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const page = await getCurrentAffairs({ lang, limit: PAGE_SIZE, offset });
    all.push(...page);
    if (page.length < PAGE_SIZE) return all;
  }
}

// One item by id, or null once it no longer exists (a 404 is an answer here, not an error).
export async function getCurrentAffairsItem(id: string): Promise<CurrentAffairsItem | null> {
  try {
    return await apiRequest<CurrentAffairsItem>(`/v1/current-affairs/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

// The same event in another language: an item's English and Hindi rows have different ids but
// share one sourceUrl.
export async function getCounterpartItem(lang: string, sourceUrl: string): Promise<CurrentAffairsItem | null> {
  const [match] = await getCurrentAffairs({ lang, sourceUrl, limit: 1 });
  return match ?? null;
}

// Questions written from one item, in that item's own language; [] when none exist yet.
export function getItemQuestions(id: string): Promise<Question[]> {
  return apiRequest<Question[]>(`/v1/current-affairs/${encodeURIComponent(id)}/questions`);
}
