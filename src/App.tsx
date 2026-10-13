import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from './components/ui/Primitives';
import { PublicPage } from './pages/PublicPage';
import { HomePage } from './pages/HomePage';
import { IbpsPoVsSbiPoPage } from './pages/compare/IbpsPoVsSbiPoPage';
import { SyllabusPage } from './pages/compare/SyllabusPage';
import { EXAM_SYLLABI } from './data/examSyllabi.mjs';
import { LessonArticlePage } from './pages/learn/LessonArticlePage';
import { TOPIC_SLUGS } from './data/topicSlugs.mjs';
import { ExamSelectionPage } from './pages/onboarding/ExamSelectionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PublicContentLayout } from './components/layout/PublicContentLayout';

// Everything under /app/* is lazy-loaded as one chunk: it's the signed-in-feeling quiz/dashboard
// experience, gated behind onboarding and excluded from robots.txt. The Current Affairs/Exam
// Notices screens keep their existing /app/current-affairs and /app/exam-notices URLs (already
// indexed and sitemapped - not worth a URL change) but are routed under PublicContentLayout
// instead, below: they're genuine crawlable editorial content, not the gated app experience, so
// they get that layout's plain-article chrome instead of AppShell's bottom tab bar and Account
// link - a reviewer (or reader) landing on a news capsule shouldn't see six links to app screens
// they can't use without onboarding first. Every page above this line is what actually gets
// crawled and ranked, so it stays in the main bundle a first-time visitor downloads.
const AppShell = lazy(() => import('./components/layout/AppShell').then((m) => ({ default: m.AppShell })));
const DashboardPage = lazy(() => import('./pages/app/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const StudyPage = lazy(() => import('./pages/app/StudyPage').then((m) => ({ default: m.StudyPage })));
const TopicLessonsPage = lazy(() => import('./pages/app/TopicLessonsPage').then((m) => ({ default: m.TopicLessonsPage })));
const LessonReaderPage = lazy(() => import('./pages/app/LessonReaderPage').then((m) => ({ default: m.LessonReaderPage })));
const PracticePage = lazy(() => import('./pages/app/PracticePage').then((m) => ({ default: m.PracticePage })));
const QuizPage = lazy(() => import('./pages/app/QuizPage').then((m) => ({ default: m.QuizPage })));
const QuizResultPage = lazy(() => import('./pages/app/QuizResultPage').then((m) => ({ default: m.QuizResultPage })));
const MistakeNotebookPage = lazy(() => import('./pages/app/MistakeNotebookPage').then((m) => ({ default: m.MistakeNotebookPage })));
const BookmarksPage = lazy(() => import('./pages/app/BookmarksPage').then((m) => ({ default: m.BookmarksPage })));
const ProgressPage = lazy(() => import('./pages/app/ProgressPage').then((m) => ({ default: m.ProgressPage })));
const CurrentAffairsPage = lazy(() => import('./pages/app/CurrentAffairsPage').then((m) => ({ default: m.CurrentAffairsPage })));
const DigestPage = lazy(() => import('./pages/app/DigestPage').then((m) => ({ default: m.DigestPage })));
const CurrentAffairsDetailPage = lazy(() => import('./pages/app/CurrentAffairsDetailPage').then((m) => ({ default: m.CurrentAffairsDetailPage })));
const ExamNoticesPage = lazy(() => import('./pages/app/ExamNoticesPage').then((m) => ({ default: m.ExamNoticesPage })));
const ExamNoticeDetailPage = lazy(() => import('./pages/app/ExamNoticeDetailPage').then((m) => ({ default: m.ExamNoticeDetailPage })));
const AccountPage = lazy(() => import('./pages/app/AccountPage').then((m) => ({ default: m.AccountPage })));
const ChallengePage = lazy(() => import('./pages/app/ChallengePage').then((m) => ({ default: m.ChallengePage })));
const CurrentAffairsQuizPage = lazy(() => import('./pages/app/CurrentAffairsQuizPage').then((m) => ({ default: m.CurrentAffairsQuizPage })));
const CurrentAffairsQuizPlayPage = lazy(() => import('./pages/app/CurrentAffairsQuizPlayPage').then((m) => ({ default: m.CurrentAffairsQuizPlayPage })));

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn" element={<PublicPage page="learn" />} />
      <Route path="/about" element={<PublicPage page="about" />} />
      <Route path="/privacy" element={<PublicPage page="privacy" />} />
      <Route path="/contact" element={<PublicPage page="contact" />} />
      <Route path="/terms" element={<PublicPage page="terms" />} />
      <Route path="/account-deletion" element={<PublicPage page="account-deletion" />} />
      <Route path="/compare/ibps-po-vs-sbi-po" element={<IbpsPoVsSbiPoPage />} />
      {EXAM_SYLLABI.map((exam) => (
        <Route
          key={`${exam.slug}-en`}
          path={`/compare/${exam.slug}-syllabus`}
          element={<SyllabusPage slug={exam.slug} lang="en" />}
        />
      ))}
      {EXAM_SYLLABI.map((exam) => (
        <Route
          key={`${exam.slug}-hi`}
          path={`/hi/compare/${exam.slug}-syllabus`}
          element={<SyllabusPage slug={exam.slug} lang="hi" />}
        />
      ))}
      {TOPIC_SLUGS.map((slug) => (
        <Route key={`${slug}-en`} path={`/learn/${slug}`} element={<LessonArticlePage slug={slug} lang="en" />} />
      ))}
      {TOPIC_SLUGS.map((slug) => (
        <Route key={`${slug}-hi`} path={`/hi/learn/${slug}`} element={<LessonArticlePage slug={slug} lang="hi" />} />
      ))}
      <Route path="/onboarding" element={<ExamSelectionPage />} />

      <Route
        path="/app"
        element={
          <Suspense fallback={<Spinner />}>
            <AppShell />
          </Suspense>
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
        <Route
          path="/app/current-affairs"
          element={
            <Suspense fallback={<Spinner />}>
              <CurrentAffairsPage />
            </Suspense>
          }
        />
        <Route
          path="/app/current-affairs/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <CurrentAffairsDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/app/exam-notices"
          element={
            <Suspense fallback={<Spinner />}>
              <ExamNoticesPage />
            </Suspense>
          }
        />
        <Route
          path="/app/exam-notices/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <ExamNoticeDetailPage />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
