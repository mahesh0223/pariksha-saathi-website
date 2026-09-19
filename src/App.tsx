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
import { UpdatesPage } from './pages/app/UpdatesPage';
import { AccountPage } from './pages/app/AccountPage';
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
        <Route path="updates" element={<UpdatesPage />} />
        <Route path="account" element={<AccountPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
