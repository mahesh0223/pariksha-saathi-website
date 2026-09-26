import type { CurrentAffairsItem } from '../types/api';

// Pure port of pariksha-saathi (Android) domain/content/DigestAnalytics.kt.

const WORDS_PER_MINUTE = 200;

export interface DigestEdition {
  editionDate: string;
  items: CurrentAffairsItem[];
  estimatedReadMinutes: number;
}

// Groups the flat current-affairs feed down to one edition: the most recent editionDate present
// (not necessarily today's calendar date - the feed may not have refreshed yet), with a
// word-count-based reading-time estimate.
export function buildTodayDigest(items: CurrentAffairsItem[]): DigestEdition | null {
  if (items.length === 0) return null;
  const latestDate = items.reduce((latest, item) => (item.editionDate > latest ? item.editionDate : latest), items[0].editionDate);
  const todaysItems = items.filter((item) => item.editionDate === latestDate);
  const totalWords = todaysItems.reduce(
    (sum, item) => sum + `${item.title} ${item.summary}`.trim().split(/\s+/).length,
    0,
  );
  const estimatedReadMinutes = Math.max(1, Math.floor(totalWords / WORDS_PER_MINUTE));
  return { editionDate: latestDate, items: todaysItems, estimatedReadMinutes };
}
