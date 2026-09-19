import { getDb, type QuizAttemptItemRecord, type QuizAttemptRecord } from './db';

export interface SavedAttempt {
  attempt: QuizAttemptRecord;
  items: QuizAttemptItemRecord[];
}

export async function saveAttempt(attempt: QuizAttemptRecord, items: QuizAttemptItemRecord[]) {
  const db = await getDb();
  const tx = db.transaction(['quizAttempts', 'quizAttemptItems'], 'readwrite');
  await tx.objectStore('quizAttempts').put(attempt);
  for (const item of items) {
    await tx.objectStore('quizAttemptItems').put(item);
  }
  await tx.done;
}

export async function markAttemptSynced(attemptId: string) {
  const db = await getDb();
  const attempt = await db.get('quizAttempts', attemptId);
  if (attempt) await db.put('quizAttempts', { ...attempt, synced: true });
}

export async function getAllAttempts(): Promise<QuizAttemptRecord[]> {
  const db = await getDb();
  return db.getAll('quizAttempts');
}

export async function getUnsyncedAttempts(): Promise<SavedAttempt[]> {
  const db = await getDb();
  const attempts = (await db.getAll('quizAttempts')).filter((a) => !a.synced);
  const results: SavedAttempt[] = [];
  for (const attempt of attempts) {
    const items = await db.getAllFromIndex('quizAttemptItems', 'attemptId', attempt.id);
    results.push({ attempt, items });
  }
  return results;
}

export async function getAllAttemptItems(): Promise<QuizAttemptItemRecord[]> {
  const db = await getDb();
  return db.getAll('quizAttemptItems');
}
