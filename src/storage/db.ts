import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

// This IndexedDB database IS the guest's progress record - there is no server endpoint to read
// it back (GET /v1/auth/me only exists for signed-in accounts and only returns aggregate counts,
// never item-level history). Every screen showing "your" quiz history, mistakes, or bookmarks
// reads from here, never from the API, regardless of sign-in state - see AuthContext for how
// sign-in only adds a best-effort server sync on top of this, it never replaces it as the
// source of truth.

export interface QuizAttemptRecord {
  id: string;
  topicKeys: string[];
  quizType: 'TOPIC' | 'SECTIONAL' | 'MOCK' | 'CURRENT_AFFAIRS';
  startedAt: string;
  completedAt: string;
  correctCount: number;
  totalQuestions: number;
  totalScore: number;
  synced: boolean;
}

export interface QuizAttemptItemRecord {
  id: string; // `${attemptId}:${questionId}`
  attemptId: string;
  questionId: string;
  topicKey: string;
  selectedOptionIndex: number | null;
  isCorrect: boolean;
  marksAwarded: number;
  completedAt: string;
}

export interface LessonCompletionRecord {
  id: string; // lessonId
  lessonId: string;
  topicKey: string;
  completedAt: string;
  synced: boolean;
}

export interface BookmarkRecord {
  id: string; // `${refType}:${refId}`
  refType: 'LESSON' | 'QUESTION';
  refId: string;
  topicKey: string;
  addedAt: string;
  deleted: boolean;
  synced: boolean;
}

/** One active (or finished) 90-day challenge per exam - keyPath `examId`. Local-only, same reasoning as this file's header comment: there's no backend model for this, so it's never synced. */
export interface StreakChallengeRecord {
  examId: string;
  startedAt: string; // ISO
  targetDays: number;
}

interface PsDb extends DBSchema {
  quizAttempts: {
    key: string;
    value: QuizAttemptRecord;
  };
  quizAttemptItems: {
    key: string;
    value: QuizAttemptItemRecord;
    indexes: { topicKey: string; questionId: string; attemptId: string };
  };
  lessonCompletions: {
    key: string;
    value: LessonCompletionRecord;
  };
  bookmarks: {
    key: string;
    value: BookmarkRecord;
    indexes: { refType: string };
  };
  streakChallenges: {
    key: string;
    value: StreakChallengeRecord;
  };
}

let dbPromise: Promise<IDBPDatabase<PsDb>> | null = null;

export function getDb(): Promise<IDBPDatabase<PsDb>> {
  if (!dbPromise) {
    dbPromise = openDB<PsDb>('pariksha-saathi', 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('quizAttempts', { keyPath: 'id' });

          const items = db.createObjectStore('quizAttemptItems', { keyPath: 'id' });
          items.createIndex('topicKey', 'topicKey');
          items.createIndex('questionId', 'questionId');
          items.createIndex('attemptId', 'attemptId');

          db.createObjectStore('lessonCompletions', { keyPath: 'id' });

          const bookmarks = db.createObjectStore('bookmarks', { keyPath: 'id' });
          bookmarks.createIndex('refType', 'refType');
        }
        if (oldVersion < 2) {
          db.createObjectStore('streakChallenges', { keyPath: 'examId' });
        }
      },
    });
  }
  return dbPromise;
}
