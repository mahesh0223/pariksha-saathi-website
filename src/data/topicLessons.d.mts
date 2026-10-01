// Type declarations for topicLessons.mjs - see examSyllabi.d.mts for why this is separate from
// the data file itself.

export interface WorkedExample {
  question: string;
  solution: string[];
  answer: string;
}

export interface PracticeQuestion {
  question: string;
  answer: string;
}

export interface LessonContent {
  pageTitle: string;
  lede: string;
  conceptHeading: string;
  conceptBody: string[];
  examplesHeading: string;
  examples: WorkedExample[];
  practiceHeading: string;
  practiceIntro: string;
  practiceQuestions: PracticeQuestion[];
  relevantForHeading: string;
  relevantForBody: string;
  offerHeading: string;
  offerBody: string;
  ctaLabel: string;
  backLabel: string;
  solutionLabel: string;
  answerLabel: string;
  disclaimer: string;
}

export interface TopicLessonEntry {
  slug: string;
  en: LessonContent;
  hi: LessonContent;
}

export const TOPIC_LESSONS: TopicLessonEntry[];
export function findLessonEntry(slug: string): TopicLessonEntry | undefined;
