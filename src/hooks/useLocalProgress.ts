import { useCallback, useEffect, useState } from 'react';
import { getAllAttemptItems, getAllAttempts } from '../storage/quizAttemptsStore';
import { getAllLessonCompletions } from '../storage/lessonCompletionsStore';
import { getActiveBookmarks } from '../storage/bookmarksStore';
import type { BookmarkRecord, LessonCompletionRecord, QuizAttemptItemRecord, QuizAttemptRecord } from '../storage/db';

interface LocalProgress {
  attempts: QuizAttemptRecord[];
  items: QuizAttemptItemRecord[];
  completions: LessonCompletionRecord[];
  bookmarks: BookmarkRecord[];
  pendingSyncCount: number;
  loading: boolean;
  refresh: () => void;
}

// IndexedDB is the guest's actual database (see storage/db.ts) - this hook is how any page reads
// "my" quiz history/mistakes/streak, independent of sign-in state. Call refresh() after writing
// (e.g. right after a quiz submit) rather than relying on a background subscription.
export function useLocalProgress(): LocalProgress {
  const [attempts, setAttempts] = useState<QuizAttemptRecord[]>([]);
  const [items, setItems] = useState<QuizAttemptItemRecord[]>([]);
  const [completions, setCompletions] = useState<LessonCompletionRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getAllAttempts(), getAllAttemptItems(), getAllLessonCompletions(), getActiveBookmarks()]).then(
      ([a, i, c, b]) => {
        if (cancelled) return;
        setAttempts(a);
        setItems(i);
        setCompletions(c);
        setBookmarks(b);
        setLoading(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const pendingSyncCount =
    attempts.filter((a) => !a.synced).length +
    completions.filter((c) => !c.synced).length +
    bookmarks.filter((b) => !b.synced).length;

  return { attempts, items, completions, bookmarks, pendingSyncCount, loading, refresh };
}
