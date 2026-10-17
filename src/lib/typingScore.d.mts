export interface TypingMistake {
  weight: 'full' | 'half';
  kind: string;
  expected: string | null;
  typed: string | null;
}
export interface TypingScore {
  mistakes: TypingMistake[];
  full: number;
  half: number;
  byKind: Record<string, number>;
  wordsReached: number;
  passageWords: number;
  typedWords: number;
  errorPercent: number;
  typedKd: number;
  correctKd: number;
}
export function tokens(text: string): string[];
export function scoreTyping(args: { passage: string; typed: string; lang?: 'en' | 'hi' }): TypingScore;
export function typingSpeeds(score: { typedKd: number; correctKd: number }, minutes: number): { grossKdph: number; netKdph: number; grossWpm: number; netWpm: number };
