import { apiRequest } from './client';
import type { BookmarkPayload, LessonCompletionPayload, QuizAttemptPayload } from '../types/api';

// Every call here is "optionalStudentAuth" server-side: pass a token when signed in, omit it
// (or pass null) for guests - the server keys anonymous rows by deviceId either way.

export function postQuizAttempt(payload: QuizAttemptPayload, token: string | null): Promise<void> {
  return apiRequest('/v1/progress/quiz-attempts', { method: 'POST', body: payload, token });
}

export function postLessonCompletion(
  payload: LessonCompletionPayload,
  token: string | null,
): Promise<void> {
  return apiRequest('/v1/progress/lesson-completions', { method: 'POST', body: payload, token });
}

export function postBookmark(payload: BookmarkPayload, token: string | null): Promise<void> {
  return apiRequest('/v1/progress/bookmarks', { method: 'POST', body: payload, token });
}

export function deleteBookmark(
  refType: string,
  refId: string,
  deviceId: string,
  token: string | null,
): Promise<void> {
  const params = new URLSearchParams({ deviceId });
  return apiRequest(
    `/v1/progress/bookmarks/${encodeURIComponent(refType)}/${encodeURIComponent(refId)}?${params}`,
    { method: 'DELETE', token },
  );
}
