import { apiRequest } from './client';
import type { ExamUpdateNotice } from '../types/api';

export function getExamUpdates(examIds: string[], lang: string): Promise<ExamUpdateNotice[]> {
  const params = new URLSearchParams({ lang });
  if (examIds.length) params.set('examIds', examIds.join(','));
  return apiRequest<ExamUpdateNotice[]>(`/v1/exam-updates?${params}`);
}
