import { getDb, type StreakChallengeRecord } from './db';

export async function startChallenge(examId: string, targetDays = 90) {
  const db = await getDb();
  const record: StreakChallengeRecord = { examId, startedAt: new Date().toISOString(), targetDays };
  await db.put('streakChallenges', record);
}

export async function abandonChallenge(examId: string) {
  const db = await getDb();
  await db.delete('streakChallenges', examId);
}

export async function getChallenge(examId: string): Promise<StreakChallengeRecord | undefined> {
  const db = await getDb();
  return db.get('streakChallenges', examId);
}

export async function getAllChallenges(): Promise<StreakChallengeRecord[]> {
  const db = await getDb();
  return db.getAll('streakChallenges');
}
