import type { ChallengeProgress } from './streakChallenge';
import type { WeakTopic } from './analytics';

// Pure port of pariksha-saathi (Android) domain/quiz/ChallengeBadges.kt - see its kdoc for the
// full reasoning behind each function.

export type ChallengePhase = 'Foundation' | 'Drills' | 'Mock Gauntlet';

export function phaseFor(dayIndex: number): ChallengePhase {
  if (dayIndex <= 30) return 'Foundation';
  if (dayIndex <= 60) return 'Drills';
  return 'Mock Gauntlet';
}

export interface Badge {
  emoji: string;
  title: string;
  earned: boolean;
}

const MILESTONE_BADGES: Array<[number, string, string]> = [
  [7, '🥉', 'Week 1 Starter'],
  [30, '🥈', 'Month Milestone'],
  [60, '🥇', 'Two-Month Streak'],
  [90, '🏆', 'Challenge Complete'],
];

const MASTERY_ACCURACY_THRESHOLD = 0.8;
export const MIN_ATTEMPTS_TO_JUDGE_SUBJECT = 3;

// subjectAccuracy must already be filtered by the caller to subjects with enough attempts to
// judge (see MIN_ATTEMPTS_TO_JUDGE_SUBJECT / Home's weak-topic card, which uses the same floor).
export function badges(progress: ChallengeProgress, subjectAccuracy: Map<string, number>): Badge[] {
  const milestones = MILESTONE_BADGES.map(([threshold, emoji, title]) => ({
    emoji,
    title,
    earned: progress.completedDayCount >= threshold,
  }));
  const mastery = Array.from(subjectAccuracy.entries())
    .filter(([, accuracy]) => accuracy >= MASTERY_ACCURACY_THRESHOLD)
    .map(([subject]) => subject)
    .sort()
    .map((subject) => ({ emoji: '🏅', title: `${subject} Champion`, earned: true }));
  return [...milestones, ...mastery];
}

// True only when exactly the most recent tracked day was missed and the day before it was
// completed - "you slipped once, don't make it twice." Never on a longer lapse or a clean streak.
export function shouldShowNeverMissTwice(progress: ChallengeProgress): boolean {
  const days = progress.days;
  if (days.length < 2) return false;
  return !days[days.length - 1].completed && days[days.length - 2].completed;
}

// Weighted-average accuracy per subject, from per-topic WeakTopic data already filtered by the
// caller to topics with enough attempts to judge. topicSubjects maps a topicKey to its subject name.
export function subjectAccuracy(weakTopics: WeakTopic[], topicSubjects: Map<string, string>): Map<string, number> {
  const bySubject = new Map<string, WeakTopic[]>();
  for (const topic of weakTopics) {
    const subject = topicSubjects.get(topic.topicKey);
    if (!subject) continue;
    const list = bySubject.get(subject) ?? [];
    list.push(topic);
    bySubject.set(subject, list);
  }
  const result = new Map<string, number>();
  for (const [subject, topics] of bySubject) {
    const totalAttempts = topics.reduce((sum, t) => sum + t.attemptedCount, 0);
    const weighted = topics.reduce((sum, t) => sum + t.accuracy * t.attemptedCount, 0);
    result.set(subject, weighted / totalAttempts);
  }
  return result;
}
