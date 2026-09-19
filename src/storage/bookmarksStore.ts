import { getDb, type BookmarkRecord } from './db';

function keyOf(refType: string, refId: string) {
  return `${refType}:${refId}`;
}

export async function addBookmark(refType: 'LESSON' | 'QUESTION', refId: string, topicKey: string) {
  const db = await getDb();
  const record: BookmarkRecord = {
    id: keyOf(refType, refId),
    refType,
    refId,
    topicKey,
    addedAt: new Date().toISOString(),
    deleted: false,
    synced: false,
  };
  await db.put('bookmarks', record);
}

// If the bookmark was already synced to the server, we can't just erase it locally - the
// deletion itself has to reach the server too, so we flip it to "deleted, unsynced" and let the
// sync queue issue the DELETE call. If it was never synced, the server never knew it existed, so
// a plain local delete is enough.
export async function removeBookmark(refType: 'LESSON' | 'QUESTION', refId: string) {
  const db = await getDb();
  const key = keyOf(refType, refId);
  const existing = await db.get('bookmarks', key);
  if (!existing) return;
  if (existing.synced) {
    await db.put('bookmarks', { ...existing, deleted: true, synced: false });
  } else {
    await db.delete('bookmarks', key);
  }
}

export async function isBookmarked(refType: 'LESSON' | 'QUESTION', refId: string): Promise<boolean> {
  const db = await getDb();
  const record = await db.get('bookmarks', keyOf(refType, refId));
  return Boolean(record && !record.deleted);
}

export async function getActiveBookmarks(refType?: 'LESSON' | 'QUESTION'): Promise<BookmarkRecord[]> {
  const db = await getDb();
  const all = refType ? await db.getAllFromIndex('bookmarks', 'refType', refType) : await db.getAll('bookmarks');
  return all.filter((b) => !b.deleted);
}

export async function getUnsyncedBookmarks(): Promise<BookmarkRecord[]> {
  const db = await getDb();
  return (await db.getAll('bookmarks')).filter((b) => !b.synced);
}

export async function markBookmarkSynced(id: string) {
  const db = await getDb();
  const record = await db.get('bookmarks', id);
  if (record) await db.put('bookmarks', { ...record, synced: true });
}

export async function removeBookmarkRecord(id: string) {
  const db = await getDb();
  await db.delete('bookmarks', id);
}
