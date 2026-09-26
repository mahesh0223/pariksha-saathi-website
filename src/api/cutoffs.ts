import { apiRequest } from './client';
import type { CutoffTarget } from '../types/api';

/** Always returns [] today for every exam - see CutoffTarget's doc comment. */
export function getCutoffs(examId: string, lang: string): Promise<CutoffTarget[]> {
  return apiRequest<CutoffTarget[]>(`/v1/exams/${examId}/cutoffs?lang=${lang}`);
}
