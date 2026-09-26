import type { Question, QuizType } from '../types/api';

export const TOPIC_QUESTION_LIMIT = 15;
export const SECTIONAL_QUESTION_LIMIT = 25;
export const MOCK_QUESTION_LIMIT = 100;
// Between TOPIC's 15 and SECTIONAL's 25 - a current-affairs pool is deliberately small
// (weekly-authored, not a deep per-topic bank), so a lower cap keeps it fully usable even right
// after the rolling ~4-week pool (see api/currentAffairsQuiz.ts) starts refilling for a new week.
export const CURRENT_AFFAIRS_QUESTION_LIMIT = 20;
export const SECONDS_PER_QUESTION = 60;
// Matches the mockup's "25 Questions, 15 Mins" - see totalTimerSeconds for the matching fixed timer.
export const SPEED_DRILL_QUESTION_LIMIT = 25;
export const SPEED_DRILL_SECONDS = 15 * 60;

// Fisher-Yates - NOT `array.sort(() => Math.random() - 0.5)`, which is a well-documented biased
// shuffle. Mirrors pariksha-saathi (Android) QuizViewModel.kt's question selection exactly: shuffle
// the whole pool, then take the first N. Not stratified across topics - matches the app.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function assembleTopicQuiz(questions: Question[]): Question[] {
  return shuffle(questions).slice(0, TOPIC_QUESTION_LIMIT);
}

export function assembleSectionalQuiz(questionsAcrossTopics: Question[]): Question[] {
  return shuffle(questionsAcrossTopics).slice(0, SECTIONAL_QUESTION_LIMIT);
}

export function assembleMockQuiz(questionsAcrossTopics: Question[]): Question[] {
  return shuffle(questionsAcrossTopics).slice(0, MOCK_QUESTION_LIMIT);
}

export function assembleCurrentAffairsQuiz(questions: Question[]): Question[] {
  return shuffle(questions).slice(0, CURRENT_AFFAIRS_QUESTION_LIMIT);
}

export function assembleSpeedDrillQuiz(questionsAcrossTopics: Question[]): Question[] {
  return shuffle(questionsAcrossTopics).slice(0, SPEED_DRILL_QUESTION_LIMIT);
}

// Every other quiz type times a student at a flat 60s/question - a fair "exam pace" allowance.
// Speed Drill is explicitly the opposite: a fixed, short sprint regardless of how many questions
// actually ended up in the pool (matches the mockup's "25 Qs, 15 Mins" - at 60s/question that
// would be 25 minutes, not a speed drill at all).
export function totalTimerSeconds(questionCount: number, quizType?: QuizType): number {
  if (quizType === 'SPEED_DRILL') return SPEED_DRILL_SECONDS;
  return questionCount * SECONDS_PER_QUESTION;
}

export interface ScoredAnswer {
  questionId: string;
  topicKey: string;
  selectedOptionIndex: number | null;
  isCorrect: boolean;
  marksAwarded: number;
}

// unattempted -> 0; correct -> +question.marks; wrong -> -question.negativeMarks. Reads marks
// straight off each question (never a hardcoded 1/0.25) - content controls its own weighting.
export function scoreAnswer(question: Question, selectedOptionIndex: number | null): ScoredAnswer {
  const isCorrect = selectedOptionIndex !== null && selectedOptionIndex === question.correctOptionIndex;
  const marksAwarded =
    selectedOptionIndex === null ? 0 : isCorrect ? question.marks : -question.negativeMarks;
  return {
    questionId: question.id,
    topicKey: question.topicKey,
    selectedOptionIndex,
    isCorrect,
    marksAwarded,
  };
}

export interface QuizScore {
  correctCount: number;
  totalQuestions: number;
  totalScore: number;
  answers: ScoredAnswer[];
}

export function scoreQuiz(
  questions: Question[],
  selections: Map<string, number | null>,
): QuizScore {
  const answers = questions.map((q) => scoreAnswer(q, selections.get(q.id) ?? null));
  return {
    correctCount: answers.filter((a) => a.isCorrect).length,
    totalQuestions: questions.length,
    totalScore: answers.reduce((sum, a) => sum + a.marksAwarded, 0),
    answers,
  };
}
