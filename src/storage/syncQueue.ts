import { postBookmark, postLessonCompletion, postQuizAttempt, deleteBookmark } from '../api/progress';
import { getOrCreateDeviceId } from './deviceId';
import { getUnsyncedAttempts, markAttemptSynced } from './quizAttemptsStore';
import {
  getUnsyncedLessonCompletions,
  markLessonCompletionSynced,
} from './lessonCompletionsStore';
import { getUnsyncedBookmarks, markBookmarkSynced, removeBookmarkRecord } from './bookmarksStore';

// Best-effort, fire-and-forget sync: every write already landed in IndexedDB before this ever
// runs, so a failure here just leaves rows unsynced for the next sweep (e.g. next page load) to
// retry - nothing in the UI ever blocks on this succeeding.
export async function syncPendingProgress(token: string | null) {
  const deviceId = getOrCreateDeviceId();

  const attempts = await getUnsyncedAttempts();
  for (const { attempt, items } of attempts) {
    try {
      await postQuizAttempt(
        {
          id: attempt.id,
          deviceId,
          topicKeys: attempt.topicKeys,
          quizType: attempt.quizType,
          correctCount: attempt.correctCount,
          totalQuestions: attempt.totalQuestions,
          totalScore: attempt.totalScore,
          completedAt: attempt.completedAt,
          items: items.slice(0, 100).map((item) => ({
            questionId: item.questionId,
            topicKey: item.topicKey,
            selectedOptionIndex: item.selectedOptionIndex,
            isCorrect: item.isCorrect,
            marksAwarded: item.marksAwarded,
          })),
        },
        token,
      );
      await markAttemptSynced(attempt.id);
    } catch {
      // leave unsynced, retried on the next sweep
    }
  }

  const completions = await getUnsyncedLessonCompletions();
  for (const completion of completions) {
    try {
      await postLessonCompletion(
        { lessonId: completion.lessonId, deviceId, completedAt: completion.completedAt },
        token,
      );
      await markLessonCompletionSynced(completion.id);
    } catch {
      // retried later
    }
  }

  const bookmarks = await getUnsyncedBookmarks();
  for (const bookmark of bookmarks) {
    try {
      if (bookmark.deleted) {
        await deleteBookmark(bookmark.refType, bookmark.refId, deviceId, token);
        await removeBookmarkRecord(bookmark.id);
      } else {
        await postBookmark(
          {
            refType: bookmark.refType,
            refId: bookmark.refId,
            topicKey: bookmark.topicKey,
            deviceId,
            addedAt: bookmark.addedAt,
          },
          token,
        );
        await markBookmarkSynced(bookmark.id);
      }
    } catch {
      // retried later
    }
  }
}
