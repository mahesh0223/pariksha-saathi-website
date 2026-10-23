// Paths of the Railway mock-test pages - kept tiny so the exam hub, the prerender script and the player page can link
// them without importing the page builder. The series themselves come from the server
// (GET /v1/exams/:examId/mocks, pariksha-saathi-server docs/REAL_PAPER.md).
import { examHubSlug } from './examHubPath.mjs';

/** Exams whose bodies publish no question papers to practise from, so they get numbered mocks in the official pattern. */
export const MOCK_TEST_EXAMS = ['rrb_ntpc', 'rrb_group_d', 'rrb_alp'];

/** The exam's list of mock tests (src/lib/mockTestsPage.mjs), in English or Hindi. */
export const mockTestsPath = (examId, lang = 'en') => `${lang === 'hi' ? '/hi' : ''}/exams/${examHubSlug(examId)}/mock-tests/`;

/** The in-browser player for mock `number` of a stage (src/pages/mocks/MockTestPage.tsx); not indexed (robots.txt). */
export const mockPlayerPath = (examId, stageKey, number, lang = 'en') =>
  `/app/mock-tests/${examId}/${stageKey}/${number}/${lang === 'hi' ? '?lang=hi' : ''}`;
