// "All N practice questions on <topic>" - the link from a lesson page to its topic's /q/ question list, shared by
// scripts/prerender.mjs and LessonArticlePage so the static and hydrated lesson pages carry the same link.
import { QUESTION_TOPICS } from '../data/questionTopics.mjs';

/** { href, label } for the lesson's topic list, or null when the topic has no question pages in that language. */
export function lessonQuestionListLink(lessonSlug, lang = 'en') {
  const topic = Object.values(QUESTION_TOPICS).find((t) => t.lessonSlug === lessonSlug);
  const count = topic?.[lang]?.count ?? 0;
  if (!topic || count === 0) return null;
  return {
    href: `${lang === 'hi' ? '/hi' : ''}/q/${topic.slug}/`,
    label: lang === 'hi' ? `${topic.hi.name} के सभी ${count} अभ्यास प्रश्न, उत्तर सहित →` : `All ${count} practice questions on ${topic.en.name}, with answers →`,
  };
}
