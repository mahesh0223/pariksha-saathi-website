import { getLessons, getQuestions } from '../api/content';
import type { Lesson, Question } from '../types/api';

export const ENGLISH_FALLBACK_NOTE =
  "Shown in English - this topic isn't translated (it tests English itself, like in the real exam).";

export interface FallbackResult<T> {
  items: T[];
  shownInEnglishFallback: boolean;
}

// Per-topic, not global: some English-proficiency topics (Error Spotting, Fill in the Blanks...)
// are deliberately never translated, mirroring how real bilingual SSC/IBPS exams never translate
// their own English section. If the selected language has nothing for this topic, retry in
// English and flag it - this must be applied independently per topic, even inside one multi-topic
// sectional/mock quiz assembly, not as one decision for the whole quiz.
export async function resolveLessonsWithFallback(
  topicKey: string,
  language: string,
): Promise<FallbackResult<Lesson>> {
  const items = await getLessons(topicKey, language);
  if (items.length > 0 || language === 'en') {
    return { items, shownInEnglishFallback: false };
  }
  const fallback = await getLessons(topicKey, 'en');
  return { items: fallback, shownInEnglishFallback: fallback.length > 0 };
}

export async function resolveQuestionsWithFallback(
  topicKey: string,
  language: string,
): Promise<FallbackResult<Question>> {
  const items = await getQuestions(topicKey, language);
  if (items.length > 0 || language === 'en') {
    return { items, shownInEnglishFallback: false };
  }
  const fallback = await getQuestions(topicKey, 'en');
  return { items: fallback, shownInEnglishFallback: fallback.length > 0 };
}
