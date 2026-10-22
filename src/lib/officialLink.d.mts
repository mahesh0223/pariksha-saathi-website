// Type declarations for officialLink.mjs (see examSyllabi.d.mts for why these live beside the data, not in it).
export declare const NEEDS_HOME_VISIT: Record<string, string>;
export declare function homeVisitFor(url: string): { host: string; home: string } | null;
export declare function homeVisitHint(url: string, lang: string): string;
export declare function homeVisitNote(urls: string[], lang: string): string;
