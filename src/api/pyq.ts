import { apiRequest } from './client';
import type { Question } from '../types/api';

/** `limit` previous-year questions on a topic in one language, a fresh random sample on every call (docs/PYQ.md). */
export function getTopicPyqs(topicKey: string, lang: string, limit: number): Promise<Question[]> {
  return apiRequest<Question[]>(`/v1/topics/${encodeURIComponent(topicKey)}/questions?pyq=1&lang=${lang}&limit=${limit}`);
}
