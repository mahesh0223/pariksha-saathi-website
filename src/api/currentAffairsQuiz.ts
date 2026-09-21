import { apiRequest } from './client';

export interface CurrentAffairsQuizTopicsResponse {
  topicKeys: string[];
  questionCount: number;
}

// See pariksha-saathi-server's GET /v1/current-affairs-quiz/topics: resolves which of the last 4
// ISO weeks' CURRENT_AFFAIRS_<ISOYEAR>_W<ISOWEEK> topicKeys actually have PUBLISHED questions.
export function getCurrentAffairsQuizTopics(lang: string): Promise<CurrentAffairsQuizTopicsResponse> {
  const params = new URLSearchParams({ lang });
  return apiRequest<CurrentAffairsQuizTopicsResponse>(`/v1/current-affairs-quiz/topics?${params}`);
}
