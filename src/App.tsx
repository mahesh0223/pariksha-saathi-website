import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { ExamSelectionPage } from './pages/onboarding/ExamSelectionPage';
import { DashboardPage } from './pages/app/DashboardPage';
import { StudyPage } from './pages/app/StudyPage';
import { TopicLessonsPage } from './pages/app/TopicLessonsPage';
import { LessonReaderPage } from './pages/app/LessonReaderPage';
import { PracticePage } from './pages/app/PracticePage';
import { QuizPage } from './pages/app/QuizPage';
import { QuizResultPage } from './pages/app/QuizResultPage';
import { MistakeNotebookPage } from './pages/app/MistakeNotebookPage';
import { BookmarksPage } from './pages/app/BookmarksPage';
import { ProgressPage } from './pages/app/ProgressPage';
import { CurrentAffairsPage } from './pages/app/CurrentAffairsPage';
import { CurrentAffairsDetailPage } from './pages/app/CurrentAffairsDetailPage';
import { ExamNoticesPage } from './pages/app/ExamNoticesPage';
import { ExamNoticeDetailPage } from './pages/app/ExamNoticeDetailPage';
import { AccountPage } from './pages/app/AccountPage';
import { ChallengePage } from './pages/app/ChallengePage';
import { CurrentAffairsQuizPage } from './pages/app/CurrentAffairsQuizPage';
import { CurrentAffairsQuizPlayPage } from './pages/app/CurrentAffairsQuizPlayPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/onboarding" element={<ExamSelectionPage />} />

      <Route path="/app" element={<AppShell />}>
        <Route path="home" element={<DashboardPage />} />
        <Route path="study" element={<StudyPage />} />
        <Route path="study/:topicKey" element={<TopicLessonsPage />} />
        <Route path="study/:topicKey/:lessonId" element={<LessonReaderPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="practice/topic/:topicKey" element={<QuizPage quizType="TOPIC" />} />
        <Route path="practice/sectional/:subjectName" element={<QuizPage quizType="SECTIONAL" />} />
        <Route path="practice/mock" element={<QuizPage quizType="MOCK" />} />
        <Route path="practice/result/:attemptId" element={<QuizResultPage />} />
        <Route path="mistakes" element={<MistakeNotebookPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="current-affairs" element={<CurrentAffairsPage />} />
        <Route path="current-affairs/:id" element={<CurrentAffairsDetailPage />} />
        <Route path="exam-notices" element={<ExamNoticesPage />} />
        <Route path="exam-notices/:id" element={<ExamNoticeDetailPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="challenge" element={<ChallengePage />} />
        <Route path="current-affairs-quiz" element={<CurrentAffairsQuizPage />} />
        <Route path="current-affairs-quiz/play" element={<CurrentAffairsQuizPlayPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
