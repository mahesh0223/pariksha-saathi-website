import type { LessonCompletionRecord, QuizAttemptRecord, StreakChallengeRecord } from '../storage/db';

// Pure port of pariksha-saathi (Android) domain/quiz/ChallengeAnalytics.kt - see its kdoc for the
// full reasoning. A day counts as complete only if it has a lesson completion or quiz attempt
// scoped to the challenge's own exam (exam-scoping), and a missed day never resets progress:
// currentDayIndex is just calendar days elapsed since the start date, capped at the target.

export interface ChallengeDayStatus {
  dayIndex: number;
  completed: boolean;
}

export interface ChallengeProgress {
  challenge: StreakChallengeRecord;
  currentDayIndex: number;
  completedDayCount: number;
  isFinished: boolean;
  days: ChallengeDayStatus[];
}

function dayKey(iso: string): string {
  return iso.slice(0, 10); // YYYY-MM-DD
}

function dayKeyToUtcMs(key: string): number {
  return new Date(`${key}T00:00:00.000Z`).getTime();
}

export function computeChallengeProgress(
  challenge: StreakChallengeRecord,
  examTopicKeys: Set<string>,
  lessonCompletions: LessonCompletionRecord[],
  quizAttempts: QuizAttemptRecord[],
  nowIso: string = new Date().toISOString(),
): ChallengeProgress {
  const completedDays = new Set<string>();
  for (const c of lessonCompletions) {
    if (examTopicKeys.has(c.topicKey)) completedDays.add(dayKey(c.completedAt));
  }
  for (const a of quizAttempts) {
    if (a.topicKeys.some((k) => examTopicKeys.has(k))) completedDays.add(dayKey(a.completedAt));
  }

  const startDayMs = dayKeyToUtcMs(dayKey(challenge.startedAt));
  const todayMs = dayKeyToUtcMs(dayKey(nowIso));
  const elapsedDays = Math.max(1, Math.round((todayMs - startDayMs) / 86_400_000) + 1);
  const currentDayIndex = Math.min(elapsedDays, challenge.targetDays);

  const days: ChallengeDayStatus[] = [];
  for (let dayIndex = 1; dayIndex <= currentDayIndex; dayIndex++) {
    const key = dayKey(new Date(startDayMs + (dayIndex - 1) * 86_400_000).toISOString());
    days.push({ dayIndex, completed: completedDays.has(key) });
  }

  return {
    challenge,
    currentDayIndex,
    completedDayCount: days.filter((d) => d.completed).length,
    isFinished: elapsedDays >= challenge.targetDays,
    days,
  };
}
