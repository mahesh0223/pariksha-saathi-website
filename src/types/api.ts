export interface Exam {
  id: string;
  code: string;
  name: string;
  category: string;
  languages: string[];
  isSample?: boolean;
}

export interface Topic {
  id: string;
  examId: string;
  subjectName: string;
  name: string;
  sharedTopicKey: string;
  weightage: number;
}

export interface Lesson {
  id: string;
  topicKey: string;
  languageCode: string;
  title: string;
  explanation: string;
  examples: string[];
  revisionSummary: string;
  status: string;
  version: number;
}

export interface Question {
  id: string;
  topicKey: string;
  languageCode: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  negativeMarks: number;
  year?: number | null;
  status: string;
  version: number;
}

export type CurrentAffairsPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface CurrentAffairsItem {
  id: string;
  editionDate: string;
  period: CurrentAffairsPeriod;
  languageCode: string;
  examTags: string[];
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  isSample?: boolean;
}

export type ExamUpdateType = 'NOTIFICATION' | 'ADMIT_CARD' | 'ANSWER_KEY' | 'RESULT' | 'DEADLINE';

export interface ExamUpdateNotice {
  id: string;
  examId: string;
  type: ExamUpdateType;
  title: string;
  summary: string;
  officialUrl: string;
  importantDates: Record<string, string>;
  lastVerifiedAt: string;
  isSample?: boolean;
}

export type QuizType = 'TOPIC' | 'SECTIONAL' | 'MOCK';

export interface QuizAttemptItemPayload {
  questionId: string;
  topicKey: string;
  selectedOptionIndex: number | null;
  isCorrect: boolean;
  marksAwarded: number;
}

export interface QuizAttemptPayload {
  id: string;
  deviceId: string;
  topicKeys: string[];
  quizType: QuizType;
  correctCount: number;
  totalQuestions: number;
  totalScore: number;
  completedAt: string;
  items: QuizAttemptItemPayload[];
}

export interface LessonCompletionPayload {
  lessonId: string;
  deviceId: string;
  completedAt: string;
}

export type BookmarkRefType = 'LESSON' | 'QUESTION';

export interface BookmarkPayload {
  refType: BookmarkRefType;
  refId: string;
  topicKey: string;
  deviceId: string;
  addedAt: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}

export interface MeResponse {
  email: string;
  quizAttemptCount: number;
  averageScore: number;
  lessonCompletionCount: number;
  bookmarkCount: number;
  missedQuestionCount: number;
}
