import { Suspense, type ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from './components/ui/Primitives';
import { HomePage } from './pages/HomePage';
import { EXAM_SYLLABUS_SLUGS } from './data/examSyllabusSlugs.mjs';
import { HUB_EXAM_IDS } from './data/examHubExams.mjs';
import { examHubSlug } from './lib/examHubPath.mjs';
import { EXAM_JOB_PROFILE_SLUGS } from './data/examJobProfileSlugs.mjs';
import { TOPIC_SLUGS } from './data/topicSlugs.mjs';
import { PUBLIC_PAGE_ROUTES } from './data/publicPageRoutes.mjs';
import { ExamSelectionPage } from './pages/onboarding/ExamSelectionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PublicContentLayout } from './components/layout/PublicContentLayout';
import { lazyPage } from './lib/lazyPage';

// Only the landing page, onboarding and the route table itself ship in the entry bundle. Every
// other public page (/learn, /compare, /exams, the static pages) is its own chunk, loaded when its
// route is visited: they used to be imported statically "so crawled pages stay in the main
// bundle", which dragged ~270 KB of syllabus data, the lesson catalog and the static-page copy into
// the landing page every first-time visitor downloads, for routes most of them never open. The
// crawler sees the prerendered HTML either way (scripts/prerender.mjs), and the route table only
// needs the slug lists - the small *Slugs.mjs modules - not the content. main.tsx preloads the
// chunk for the current URL before React mounts (see lazyPage.ts), so a prerendered article is
// never replaced by a spinner while its chunk downloads.
const PublicPage = lazyPage(() => import('./pages/PublicPage').then((m) => ({ default: m.PublicPage })));
const IbpsPoVsSbiPoPage = lazyPage(() => import('./pages/compare/IbpsPoVsSbiPoPage').then((m) => ({ default: m.IbpsPoVsSbiPoPage })));
const SyllabusPage = lazyPage(() => import('./pages/compare/SyllabusPage').then((m) => ({ default: m.SyllabusPage })));
const JobProfilePage = lazyPage(() => import('./pages/compare/JobProfilePage').then((m) => ({ default: m.JobProfilePage })));
const ExamHubPage = lazyPage(() => import('./pages/exams/ExamHubPage').then((m) => ({ default: m.ExamHubPage })));
const ExamDirectoryPage = lazyPage(() => import('./pages/exams/ExamDirectoryPage').then((m) => ({ default: m.ExamDirectoryPage })));
const ExamCalendarPage = lazyPage(() => import('./pages/exams/ExamCalendarPage').then((m) => ({ default: m.ExamCalendarPage })));
const GkInsightsPage = lazyPage(() => import('./pages/exams/GkInsightsPage').then((m) => ({ default: m.GkInsightsPage })));
const TypingTestPage = lazyPage(() => import('./pages/typing/TypingTestPage').then((m) => ({ default: m.TypingTestPage })));
const LessonArticlePage = lazyPage(() => import('./pages/learn/LessonArticlePage').then((m) => ({ default: m.LessonArticlePage })));

/**
 * Starts downloading the chunk(s) the given URL renders, so main.tsx can wait for them before the
 * first render. Mirrors the route table below; anything unmatched (the home page, /app/*, 404)
 * resolves immediately. Never rejects - a failed preload just means the route suspends normally.
 * The prerendered HTML of every page that has a chunk here also carries a <link rel="modulepreload">
 * for it (scripts/prerender.mjs), so the download is already in flight when this runs.
 */
export function preloadRoute(pathname: string): Promise<unknown> {
  const full = pathname.replace(/\/+$/, '') || '/';
  const loads: Promise<unknown>[] = [];
  // The static pages and the two Hindi index pages are matched on the full path: /hi itself is one
  // of them, so stripping the language prefix first (as the routes below need) would turn it into
  // the home page and preload nothing. PUBLIC_PAGE_ROUTES is the same map the route table renders.
  if (Object.hasOwn(PUBLIC_PAGE_ROUTES, full)) {
    loads.push(PublicPage.preload());
    return Promise.allSettled(loads);
  }
  const path = full.replace(/^\/hi(?=\/|$)/, '') || '/';
  if (path === '/compare/ibps-po-vs-sbi-po') loads.push(IbpsPoVsSbiPoPage.preload());
  else if (/^\/compare\/[^/]+-syllabus$/.test(path)) loads.push(SyllabusPage.preload());
  else if (/^\/compare\/[^/]+-job-profile$/.test(path)) loads.push(JobProfilePage.preload());
  else if (path === '/exams') loads.push(ExamDirectoryPage.preload());
  else if (path === '/exams/calendar') loads.push(ExamCalendarPage.preload());
  else if (path === '/exams/ssc-gk-topics') loads.push(GkInsightsPage.preload());
  else if (path === '/typing-test') loads.push(TypingTestPage.preload());
  else if (/^\/exams\/[^/]+$/.test(path)) loads.push(ExamHubPage.preload());
  else if (/^\/learn\/[^/]+$/.test(path)) loads.push(LessonArticlePage.preload());
  return Promise.allSettled(loads);
}

// Everything under /app/* is lazy-loaded as one chunk: it's the signed-in-feeling quiz/dashboard
// experience, gated behind onboarding and excluded from robots.txt. The Current Affairs/Exam
// Notices screens keep their existing /app/current-affairs and /app/exam-notices URLs (already
// indexed and sitemapped - not worth a URL change) but are routed under PublicContentLayout
// instead, below: they're genuine crawlable editorial content, not the gated app experience, so
// they get that layout's plain-article chrome instead of AppShell's bottom tab bar and Account
// link - a reviewer (or reader) landing on a news capsule shouldn't see six links to app screens
// they can't use without onboarding first.
const AppShell = lazyPage(() => import('./components/layout/AppShell').then((m) => ({ default: m.AppShell })));
const DashboardPage = lazyPage(() => import('./pages/app/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const StudyPage = lazyPage(() => import('./pages/app/StudyPage').then((m) => ({ default: m.StudyPage })));
const TopicLessonsPage = lazyPage(() => import('./pages/app/TopicLessonsPage').then((m) => ({ default: m.TopicLessonsPage })));
const LessonReaderPage = lazyPage(() => import('./pages/app/LessonReaderPage').then((m) => ({ default: m.LessonReaderPage })));
const PracticePage = lazyPage(() => import('./pages/app/PracticePage').then((m) => ({ default: m.PracticePage })));
const QuizPage = lazyPage(() => import('./pages/app/QuizPage').then((m) => ({ default: m.QuizPage })));
const QuizResultPage = lazyPage(() => import('./pages/app/QuizResultPage').then((m) => ({ default: m.QuizResultPage })));
const MistakeNotebookPage = lazyPage(() => import('./pages/app/MistakeNotebookPage').then((m) => ({ default: m.MistakeNotebookPage })));
const BookmarksPage = lazyPage(() => import('./pages/app/BookmarksPage').then((m) => ({ default: m.BookmarksPage })));
const ProgressPage = lazyPage(() => import('./pages/app/ProgressPage').then((m) => ({ default: m.ProgressPage })));
const CurrentAffairsPage = lazyPage(() => import('./pages/app/CurrentAffairsPage').then((m) => ({ default: m.CurrentAffairsPage })));
const DigestPage = lazyPage(() => import('./pages/app/DigestPage').then((m) => ({ default: m.DigestPage })));
const CurrentAffairsDetailPage = lazyPage(() => import('./pages/app/CurrentAffairsDetailPage').then((m) => ({ default: m.CurrentAffairsDetailPage })));
const ExamNoticesPage = lazyPage(() => import('./pages/app/ExamNoticesPage').then((m) => ({ default: m.ExamNoticesPage })));
const ExamNoticeDetailPage = lazyPage(() => import('./pages/app/ExamNoticeDetailPage').then((m) => ({ default: m.ExamNoticeDetailPage })));
const MockTestPage = lazyPage(() => import('./pages/mocks/MockTestPage').then((m) => ({ default: m.MockTestPage })));
const PyqPracticePage = lazyPage(() => import('./pages/pyq/PyqPracticePage').then((m) => ({ default: m.PyqPracticePage })));
const AccountPage = lazyPage(() => import('./pages/app/AccountPage').then((m) => ({ default: m.AccountPage })));
const ChallengePage = lazyPage(() => import('./pages/app/ChallengePage').then((m) => ({ default: m.ChallengePage })));
const CurrentAffairsQuizPage = lazyPage(() => import('./pages/app/CurrentAffairsQuizPage').then((m) => ({ default: m.CurrentAffairsQuizPage })));
const CurrentAffairsQuizPlayPage = lazyPage(() => import('./pages/app/CurrentAffairsQuizPlayPage').then((m) => ({ default: m.CurrentAffairsQuizPlayPage })));

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {Object.entries(PUBLIC_PAGE_ROUTES).map(([path, page]) => (
        <Route key={path} path={path} element={<Lazy><PublicPage page={page} /></Lazy>} />
      ))}
      <Route path="/compare/ibps-po-vs-sbi-po" element={<Lazy><IbpsPoVsSbiPoPage /></Lazy>} />
      {EXAM_SYLLABUS_SLUGS.map((slug) => (
        <Route
          key={`${slug}-en`}
          path={`/compare/${slug}-syllabus`}
          element={<Lazy><SyllabusPage slug={slug} lang="en" /></Lazy>}
        />
      ))}
      {EXAM_SYLLABUS_SLUGS.map((slug) => (
        <Route
          key={`${slug}-hi`}
          path={`/hi/compare/${slug}-syllabus`}
          element={<Lazy><SyllabusPage slug={slug} lang="hi" /></Lazy>}
        />
      ))}
      {EXAM_JOB_PROFILE_SLUGS.map((slug) => (
        <Route
          key={`${slug}-job-profile-en`}
          path={`/compare/${slug}-job-profile`}
          element={<Lazy><JobProfilePage slug={slug} lang="en" /></Lazy>}
        />
      ))}
      {EXAM_JOB_PROFILE_SLUGS.map((slug) => (
        <Route
          key={`${slug}-job-profile-hi`}
          path={`/hi/compare/${slug}-job-profile`}
          element={<Lazy><JobProfilePage slug={slug} lang="hi" /></Lazy>}
        />
      ))}
      <Route path="/exams" element={<Lazy><ExamDirectoryPage lang="en" /></Lazy>} />
      <Route path="/hi/exams" element={<Lazy><ExamDirectoryPage lang="hi" /></Lazy>} />
      <Route path="/exams/calendar" element={<Lazy><ExamCalendarPage lang="en" /></Lazy>} />
      <Route path="/hi/exams/calendar" element={<Lazy><ExamCalendarPage lang="hi" /></Lazy>} />
      <Route path="/exams/ssc-gk-topics" element={<Lazy><GkInsightsPage lang="en" /></Lazy>} />
      <Route path="/hi/exams/ssc-gk-topics" element={<Lazy><GkInsightsPage lang="hi" /></Lazy>} />
      <Route path="/typing-test" element={<Lazy><TypingTestPage lang="en" /></Lazy>} />
      <Route path="/hi/typing-test" element={<Lazy><TypingTestPage lang="hi" /></Lazy>} />
      {HUB_EXAM_IDS.map((examId) => (
        <Route key={`${examId}-hub-en`} path={`/exams/${examHubSlug(examId)}`} element={<Lazy><ExamHubPage examId={examId} lang="en" /></Lazy>} />
      ))}
      {HUB_EXAM_IDS.map((examId) => (
        <Route key={`${examId}-hub-hi`} path={`/hi/exams/${examHubSlug(examId)}`} element={<Lazy><ExamHubPage examId={examId} lang="hi" /></Lazy>} />
      ))}
      {TOPIC_SLUGS.map((slug) => (
        <Route key={`${slug}-en`} path={`/learn/${slug}`} element={<Lazy><LessonArticlePage slug={slug} lang="en" /></Lazy>} />
      ))}
      {TOPIC_SLUGS.map((slug) => (
        <Route key={`${slug}-hi`} path={`/hi/learn/${slug}`} element={<Lazy><LessonArticlePage slug={slug} lang="hi" /></Lazy>} />
      ))}
      <Route path="/onboarding" element={<ExamSelectionPage />} />

      <Route
        path="/app"
        element={
          <Lazy>
            <AppShell />
          </Lazy>
        }
      >
        <Route path="home" element={<DashboardPage />} />
        <Route path="study" element={<StudyPage />} />
        <Route path="study/:topicKey" element={<TopicLessonsPage />} />
        <Route path="study/:topicKey/:lessonId" element={<LessonReaderPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="practice/topic/:topicKey" element={<QuizPage quizType="TOPIC" />} />
        <Route path="practice/sectional/:subjectName" element={<QuizPage quizType="SECTIONAL" />} />
        <Route path="practice/mock" element={<QuizPage quizType="MOCK" />} />
        <Route path="practice/speed-drill" element={<QuizPage quizType="SPEED_DRILL" />} />
        <Route path="practice/result/:attemptId" element={<QuizResultPage />} />
        <Route path="mistakes" element={<MistakeNotebookPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="digest" element={<DigestPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="challenge" element={<ChallengePage />} />
        <Route path="current-affairs-quiz" element={<CurrentAffairsQuizPage />} />
        <Route path="current-affairs-quiz/play" element={<CurrentAffairsQuizPlayPage />} />
      </Route>

      <Route element={<PublicContentLayout />}>
        <Route path="/app/current-affairs" element={<Lazy><CurrentAffairsPage /></Lazy>} />
        <Route path="/app/current-affairs/:id" element={<Lazy><CurrentAffairsDetailPage /></Lazy>} />
        <Route path="/app/exam-notices" element={<Lazy><ExamNoticesPage /></Lazy>} />
        <Route path="/app/exam-notices/:id" element={<Lazy><ExamNoticeDetailPage /></Lazy>} />
        <Route path="/app/mock-tests/:examId/:stageKey/:number" element={<Lazy><MockTestPage /></Lazy>} />
        <Route path="/app/pyq-practice/:topicKey" element={<Lazy><PyqPracticePage /></Lazy>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
