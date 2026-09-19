import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../state/LanguageContext';
import { useAuth } from '../../state/AuthContext';
import { resolveLessonsWithFallback, ENGLISH_FALLBACK_NOTE } from '../../domain/languageFallback';
import { markLessonComplete, isLessonComplete } from '../../storage/lessonCompletionsStore';
import { addBookmark, isBookmarked, removeBookmark } from '../../storage/bookmarksStore';
import { syncPendingProgress } from '../../storage/syncQueue';
import { Button, Note, Spinner } from '../../components/ui/Primitives';
import './LessonReaderPage.css';

export function LessonReaderPage() {
  const { topicKey = '', lessonId = '' } = useParams();
  const { language } = useLanguage();
  const { token } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['lessons', topicKey, language],
    queryFn: () => resolveLessonsWithFallback(topicKey, language),
    enabled: Boolean(topicKey),
  });

  const lesson = data?.items.find((l) => l.id === lessonId);

  useEffect(() => {
    isLessonComplete(lessonId).then(setCompleted);
    isBookmarked('LESSON', lessonId).then(setBookmarked);
  }, [lessonId]);

  async function handleMarkComplete() {
    await markLessonComplete(lessonId, topicKey);
    setCompleted(true);
    syncPendingProgress(token);
  }

  async function toggleBookmark() {
    if (bookmarked) {
      await removeBookmark('LESSON', lessonId);
    } else {
      await addBookmark('LESSON', lessonId, topicKey);
    }
    setBookmarked(!bookmarked);
    syncPendingProgress(token);
  }

  if (isLoading) return <Spinner />;
  if (!lesson) return <p>Lesson not found.</p>;

  return (
    <div className="lesson-reader">
      <Link to={`/app/study/${encodeURIComponent(topicKey)}`}>&larr; {topicKey.replace(/_/g, ' ')}</Link>
      <h1>{lesson.title}</h1>
      {data?.shownInEnglishFallback && <Note>{ENGLISH_FALLBACK_NOTE}</Note>}

      <div className="lesson-body">
        {lesson.explanation.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {lesson.examples.length > 0 && (
        <div className="lesson-examples">
          <h3>Examples</h3>
          <ul>
            {lesson.examples.map((example, i) => (
              <li key={i}>{example}</li>
            ))}
          </ul>
        </div>
      )}

      {lesson.revisionSummary && (
        <div className="lesson-summary">
          <h3>Revision summary</h3>
          <p>{lesson.revisionSummary}</p>
        </div>
      )}

      <div className="lesson-actions">
        <Button onClick={handleMarkComplete} disabled={completed}>
          {completed ? 'Completed ✓' : 'Mark as complete'}
        </Button>
        <Button variant="outline" onClick={toggleBookmark}>
          {bookmarked ? 'Bookmarked ✓' : 'Bookmark'}
        </Button>
      </div>
    </div>
  );
}
