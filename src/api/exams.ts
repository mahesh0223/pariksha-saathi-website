import { apiRequest } from './client';
import type { Exam, Topic } from '../types/api';

export function getExams(): Promise<Exam[]> {
  return apiRequest<Exam[]>('/v1/exams');
}

export function getTopics(examId: string): Promise<Topic[]> {
  return apiRequest<Topic[]>(`/v1/exams/${encodeURIComponent(examId)}/topics`);
}
