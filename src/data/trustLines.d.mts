// Type declaration for trustLines.mjs - see examSyllabi.d.mts for why this is separate from
// the data file itself.

export const TRUST_STATS: Record<'en' | 'hi', { value: string; label: string }[]>;
export const TRUST_LINES: Record<'en' | 'hi', string[]>;
export const TRUST_LINES_LABEL: Record<'en' | 'hi', string>;
export function trustStatsHtml(lang?: 'en' | 'hi'): string;
export function trustLinesHtml(lang?: 'en' | 'hi'): string;
