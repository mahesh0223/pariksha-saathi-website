import { apiRequest } from './client';
import type { MockPaper, MockSeries } from '../types/api';

/** The exam's numbered mock series per stage (pariksha-saathi-server docs/REAL_PAPER.md); 404 without a fact sheet. */
export function getMockSeries(examId: string, lang: string): Promise<MockSeries> {
  return apiRequest<MockSeries>(`/v1/exams/${examId}/mocks?lang=${lang}`);
}

/** Mock `number` of a stage, the same question set on every call; 404 when the series has no such mock. */
export function getMockPaper(examId: string, stageKey: string, number: number, lang: string): Promise<MockPaper> {
  return apiRequest<MockPaper>(`/v1/exams/${examId}/mocks/${stageKey}/${number}?lang=${lang}`);
}
