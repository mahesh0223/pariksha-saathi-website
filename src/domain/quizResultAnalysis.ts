import type { ScoredAnswer } from './quizEngine';

// Pure port of pariksha-saathi (Android) domain/quiz/QuizResultAnalysis.kt.

export interface MarkingLedger {
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  correctMarks: number;
  wrongMarks: number;
}

export function markingLedger(answers: ScoredAnswer[]): MarkingLedger {
  const correct = answers.filter((a) => a.isCorrect);
  const wrong = answers.filter((a) => !a.isCorrect && a.selectedOptionIndex !== null);
  const skipped = answers.filter((a) => a.selectedOptionIndex === null);
  return {
    correctCount: correct.length,
    wrongCount: wrong.length,
    skippedCount: skipped.length,
    correctMarks: correct.reduce((sum, a) => sum + a.marksAwarded, 0),
    wrongMarks: wrong.reduce((sum, a) => sum + a.marksAwarded, 0),
  };
}

export interface TopicDiagnostic {
  topicKey: string;
  correctCount: number;
  totalCount: number;
  accuracy: number;
  remark: string;
}

const STRONG_ACCURACY = 0.8;
const WEAK_ACCURACY = 0.4;

function remarkFor(accuracy: number): string {
  if (accuracy >= STRONG_ACCURACY) return 'Remarkable grasp - keep this pace.';
  if (accuracy < WEAK_ACCURACY) return 'High negative-marking risk here - revisit this topic before your next attempt.';
  return 'Solid but not yet reliable - a bit more practice will lock this in.';
}

// Per-topic accuracy breakdown for a single quiz attempt - scoped to this attempt's questions
// only, distinct from analytics.ts's computeWeakTopics (an all-time view).
export function diagnose(answers: ScoredAnswer[]): TopicDiagnostic[] {
  const byTopic = new Map<string, ScoredAnswer[]>();
  for (const answer of answers) {
    const list = byTopic.get(answer.topicKey) ?? [];
    list.push(answer);
    byTopic.set(answer.topicKey, list);
  }
  return Array.from(byTopic.entries())
    .map(([topicKey, groupAnswers]) => {
      const correctCount = groupAnswers.filter((a) => a.isCorrect).length;
      const totalCount = groupAnswers.length;
      const accuracy = correctCount / totalCount;
      return { topicKey, correctCount, totalCount, accuracy, remark: remarkFor(accuracy) };
    })
    .sort((a, b) => a.accuracy - b.accuracy);
}
