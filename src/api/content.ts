import { apiRequest } from './client';
import type { Lesson, Question } from '../types/api';

export function getLessons(topicKey: string, lang: string): Promise<Lesson[]> {
  const params = new URLSearchParams({ lang });
  return apiRequest<Lesson[]>(`/v1/topics/${encodeURIComponent(topicKey)}/lessons?${params}`);
}

export function getQuestions(topicKey: string, lang: string): Promise<Question[]> {
  const params = new URLSearchParams({ lang });
  return apiRequest<Question[]>(`/v1/topics/${encodeURIComponent(topicKey)}/questions?${params}`);
}
