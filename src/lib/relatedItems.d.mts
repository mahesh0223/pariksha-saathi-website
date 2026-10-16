import type { CurrentAffairsItem } from '../types/api';

export function relatedItems(items: CurrentAffairsItem[], item: CurrentAffairsItem, count?: number): CurrentAffairsItem[];
export function relatedItemsHtml(items: CurrentAffairsItem[], item: CurrentAffairsItem, lang?: 'en' | 'hi'): string;
