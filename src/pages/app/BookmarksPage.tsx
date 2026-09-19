import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useLanguage } from '../../state/LanguageContext';
import { getActiveBookmarks } from '../../storage/bookmarksStore';
import { resolveLessonsWithFallback, resolveQuestionsWithFallback } from '../../domain/languageFallback';
import type { BookmarkRecord } from '../../storage/db';
import { Card, EmptyState, Spinner } from '../../components/ui/Primitives';
import './ReviewLists.css';

export function BookmarksPage() {
  const { language } = useLanguage();
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[] | null>(null);

  useEffect(() => {
    getActiveBookmarks().then(setBookmarks);
  }, []);

  const lessonBookmarks = bookmarks?.filter((b) => b.refType === 'LESSON') ?? [];
  const questionBookmarks = bookmarks?.filter((b) => b.refType === 'QUESTION') ?? [];

  const topicKeys = useMemo(
    () => Array.from(new Set((bookmarks ?? []).map((b) => b.topicKey))),
    [bookmarks],
  );

  const lessonQueries = useQueries({
    queries: topicKeys.map((key) => ({
      queryKey: ['lessons', key, language],
      queryFn: () => resolveLessonsWithFallback(key, language),
    })),
  });
  const questionQueries = useQueries({
    queries: topicKeys.map((key) => ({
      queryKey: ['questions', key, language],
      queryFn: () => resolveQuestionsWithFallback(key, language),
    })),
  });

  const lessonsById = new Map(lessonQueries.flatMap((q) => q.data?.items ?? []).map((l) => [l.id, l]));
  const questionsById = new Map(
    questionQueries.flatMap((q) => q.data?.items ?? []).map((q) => [q.id, q]),
  );

  if (bookmarks === null) return <Spinner />;
  if (bookmarks.length === 0) return <EmptyState>Bookmark a lesson or question and it'll show up here.</EmptyState>;

  return (
    <div>
      <h1 className="review-title">Bookmarks</h1>

      <section className="review-section">
        <h2>Lessons</h2>
        {lessonBookmarks.length === 0 && <p style={{ color: 'var(--muted)' }}>No lessons bookmarked.</p>}
        {lessonBookmarks.map((b) => {
          const lesson = lessonsById.get(b.refId);
          return (
            <Link
              key={b.id}
              to={`/app/study/${encodeURIComponent(b.topicKey)}/${encodeURIComponent(b.refId)}`}
              className="review-card"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <Card>{lesson?.title ?? b.refId}</Card>
            </Link>
          );
        })}
      </section>

      <section className="review-section">
        <h2>Questions</h2>
        {questionBookmarks.length === 0 && <p style={{ color: 'var(--muted)' }}>No questions bookmarked.</p>}
        {questionBookmarks.map((b) => {
          const question = questionsById.get(b.refId);
          if (!question) return null;
          return (
            <Card key={b.id} className="review-card">
              <p className="review-question">{question.text}</p>
              <p className="review-answer">Correct answer: {question.options[question.correctOptionIndex]}</p>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
