import { apiRequest } from './client';
import type { CurrentAffairsItem, CurrentAffairsPeriod } from '../types/api';

export function getCurrentAffairs(options: {
  lang: string;
  period?: CurrentAffairsPeriod;
  limit?: number;
}): Promise<CurrentAffairsItem[]> {
  const params = new URLSearchParams({ lang: options.lang });
  if (options.period) params.set('period', options.period);
  if (options.limit) params.set('limit', String(options.limit));
  return apiRequest<CurrentAffairsItem[]>(`/v1/current-affairs?${params}`);
}
