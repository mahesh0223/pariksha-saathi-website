type Bi = { en: string; hi: string };
export interface TypingMode {
  key: string;
  lang: 'en' | 'hi';
  minutes: number;
  name: Bi;
  passageKd: [number, number];
  targetKdph?: number;
  targetWpm?: number;
  maxErrors?: Record<string, number>;
  rules: { en: string[]; hi: string[] };
  sources: string[];
}
export const TYPING_CHECKED: string;
export const TYPING_SOURCES: Record<string, { url: string; title: Bi }>;
export const TYPING_MODES: TypingMode[];
export const PASSAGES: { en: string[]; hi: string[] };
export function passageFor(modeKey: string, round?: number): string;
