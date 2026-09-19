import type { LessonCompletionRecord, QuizAttemptItemRecord, QuizAttemptRecord } from '../storage/db';

// Every function here is a pure port of pariksha-saathi (Android)
// domain/quiz/ProgressAnalytics.kt, operating on the same local IndexedDB records the quiz engine
// and lesson-completion flow write - see storage/db.ts.

export interface WeakTopic {
  topicKey: string;
  accuracy: number; // 0..1
  attemptedCount: number;
}

// Ranks every topic the student has ever attempted by accuracy ascending; ties broken toward the
// topic attempted MORE (a topic missed 6/10 times is judged "weaker" than one missed 1/1 - more
// evidence, not less, on a tie).
export function computeWeakTopics(items: QuizAttemptItemRecord[]): WeakTopic[] {
  const byTopic = new Map<string, { correct: number; total: number }>();
  for (const item of items) {
    const bucket = byTopic.get(item.topicKey) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (item.isCorrect) bucket.correct += 1;
    byTopic.set(item.topicKey, bucket);
  }
  return Array.from(byTopic.entries())
    .map(([topicKey, { correct, total }]) => ({
      topicKey,
      accuracy: correct / total,
      attemptedCount: total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.attemptedCount - a.attemptedCount);
}

// Home's "Focus on" card: the weakest topic among ones attempted enough to actually judge - a
// topic tried once and missed isn't "your weakest," it's noise. 3 is the exact floor the app uses.
export function computeWeakestTopic(items: QuizAttemptItemRecord[]): WeakTopic | null {
  return computeWeakTopics(items).find((t) => t.attemptedCount >= 3) ?? null;
}

export interface MistakeEntry {
  questionId: string;
  topicKey: string;
  lastAttemptedAt: string;
}

// Most recent attempt per question, kept only if that latest attempt was wrong - answering
// correctly later removes a question from this list; missing it again re-adds it.
export function computeMistakeNotebook(items: QuizAttemptItemRecord[]): MistakeEntry[] {
  const latestByQuestion = new Map<string, QuizAttemptItemRecord>();
  for (const item of items) {
    const existing = latestByQuestion.get(item.questionId);
    if (!existing || item.completedAt > existing.completedAt) {
      latestByQuestion.set(item.questionId, item);
    }
  }
  return Array.from(latestByQuestion.values())
    .filter((item) => !item.isCorrect)
    .sort((a, b) => (a.completedAt > b.completedAt ? -1 : 1))
    .map((item) => ({
      questionId: item.questionId,
      topicKey: item.topicKey,
      lastAttemptedAt: item.completedAt,
    }));
}

function dayKey(iso: string): string {
  return iso.slice(0, 10); // YYYY-MM-DD
}

// Consecutive calendar days with at least one lesson completion or quiz attempt, walking back
// from today. If nothing happened yet today, we start counting from yesterday instead of zeroing
// out immediately - a streak built yesterday shouldn't vanish before the student has had a chance
// to act today.
export function computeStreakDays(
  attempts: QuizAttemptRecord[],
  completions: LessonCompletionRecord[],
): number {
  const activeDays = new Set<string>();
  for (const a of attempts) activeDays.add(dayKey(a.completedAt));
  for (const c of completions) activeDays.add(dayKey(c.completedAt));
  if (activeDays.size === 0) return 0;

  const cursor = new Date();
  if (!activeDays.has(dayKey(cursor.toISOString()))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!activeDays.has(dayKey(cursor.toISOString()))) return 0;
  }

  let streak = 0;
  for (;;) {
    if (!activeDays.has(dayKey(cursor.toISOString()))) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export interface ProgressSummary {
  totalQuizAttempts: number;
  averageScore: number;
  lessonsCompletedCount: number;
  streakDays: number;
  thisWeekLessons: number;
  thisWeekQuizzes: number;
  pendingSyncCount: number;
}

export function computeProgressSummary(
  attempts: QuizAttemptRecord[],
  completions: LessonCompletionRecord[],
  pendingSyncCount: number,
): ProgressSummary {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const averageScore = attempts.length
    ? attempts.reduce((sum, a) => sum + a.totalScore, 0) / attempts.length
    : 0;
  return {
    totalQuizAttempts: attempts.length,
    averageScore,
    lessonsCompletedCount: completions.length,
    streakDays: computeStreakDays(attempts, completions),
    thisWeekLessons: completions.filter((c) => new Date(c.completedAt).getTime() >= weekAgo).length,
    thisWeekQuizzes: attempts.filter((a) => new Date(a.completedAt).getTime() >= weekAgo).length,
    pendingSyncCount,
  };
}
