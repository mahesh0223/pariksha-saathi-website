import { apiRequest } from './client';
import type { ExamFact } from '../types/api';

/** Newest cycle first; [] when nobody has transcribed a notification for the exam yet. */
export function getExamFacts(examId: string): Promise<ExamFact[]> {
  return apiRequest<ExamFact[]>(`/v1/exams/${examId}/facts`);
}
