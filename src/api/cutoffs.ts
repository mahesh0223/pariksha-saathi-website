import { apiRequest } from './client';
import type { CutoffTarget } from '../types/api';

/**
 * Official cut-off marks, each with its source document. Language-neutral (a number per category per
 * cycle), so there is no lang parameter. [] for an exam nobody has sourced a figure for yet.
 */
export function getCutoffs(examId: string): Promise<CutoffTarget[]> {
  return apiRequest<CutoffTarget[]>(`/v1/exams/${examId}/cutoffs`);
}
