import { getDb, type LessonCompletionRecord } from './db';

export async function markLessonComplete(lessonId: string, topicKey: string) {
  const db = await getDb();
  const existing = await db.get('lessonCompletions', lessonId);
  if (existing) return; // already completed, nothing to do
  const record: LessonCompletionRecord = {
    id: lessonId,
    lessonId,
    topicKey,
    completedAt: new Date().toISOString(),
    synced: false,
  };
  await db.put('lessonCompletions', record);
}

export async function isLessonComplete(lessonId: string): Promise<boolean> {
  const db = await getDb();
  return Boolean(await db.get('lessonCompletions', lessonId));
}

export async function getAllLessonCompletions(): Promise<LessonCompletionRecord[]> {
  const db = await getDb();
  return db.getAll('lessonCompletions');
}

export async function getUnsyncedLessonCompletions(): Promise<LessonCompletionRecord[]> {
  const db = await getDb();
  return (await db.getAll('lessonCompletions')).filter((c) => !c.synced);
}

export async function markLessonCompletionSynced(id: string) {
  const db = await getDb();
  const record = await db.get('lessonCompletions', id);
  if (record) await db.put('lessonCompletions', { ...record, synced: true });
}
