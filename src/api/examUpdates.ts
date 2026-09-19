import { apiRequest } from './client';
import type { ExamUpdateNotice } from '../types/api';

export function getExamUpdates(examIds: string[]): Promise<ExamUpdateNotice[]> {
  const params = examIds.length ? `?examIds=${examIds.map(encodeURIComponent).join(',')}` : '';
  return apiRequest<ExamUpdateNotice[]>(`/v1/exam-updates${params}`);
}
