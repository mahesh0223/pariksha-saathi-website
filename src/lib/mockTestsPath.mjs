// Paths of the mock-test pages - kept tiny so the exam hub, the prerender script and the player page can link
// them without importing the page builder. The series themselves come from the server
// (GET /v1/exams/:examId/mocks, pariksha-saathi-server docs/REAL_PAPER.md).
import { examHubSlug } from './examHubPath.mjs';

/**
 * Exams with numbered mocks in the official pattern: every exam whose fact sheet fixes a pattern our bank can fill
 * (checked 24 Oct 2026: no section short in either language). Not Agniveer or BPSC, which have no fact sheet yet.
 */
export const MOCK_TEST_EXAMS = [
  'ssc_cgl', 'ssc_chsl', 'ssc_mts', 'ssc_gd',
  'rrb_ntpc', 'rrb_group_d', 'rrb_alp',
  'ibps_po', 'ibps_clerk', 'sbi_po', 'sbi_clerk',
  'up_police', 'bihar_police', 'mp_police', 'rajasthan_police',
  'ctet', 'uppsc', 'mppsc', 'rpsc',
];

/** The exam's list of mock tests (src/lib/mockTestsPage.mjs), in English or Hindi. */
export const mockTestsPath = (examId, lang = 'en') => `${lang === 'hi' ? '/hi' : ''}/exams/${examHubSlug(examId)}/mock-tests/`;

/** The in-browser player for mock `number` of a stage (src/pages/mocks/MockTestPage.tsx); not indexed (robots.txt). */
export const mockPlayerPath = (examId, stageKey, number, lang = 'en') =>
  `/app/mock-tests/${examId}/${stageKey}/${number}/${lang === 'hi' ? '?lang=hi' : ''}`;
