import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LESSON_SEO_TITLES, LESSON_SEO_TITLE_TERMS, lessonSeoTitle, metaDescription, withSiteName } from './seoMeta.mjs';
import { TOPIC_LESSONS } from '../data/topicLessons.mjs';

test('metaDescription keeps short text whole and collapses whitespace', () => {
  assert.equal(metaDescription('  Short   text. '), 'Short text.');
});

test('metaDescription never ends mid-word', () => {
  const long = 'The compound interest formula does not change when compounding happens more often than once a year, only the rate and the time do, and getting that adjustment right is the whole topic';
  const out = metaDescription(long);
  assert.ok(out.length <= 155, out);
  assert.ok(out.endsWith('…'));
  assert.ok(long.startsWith(out.slice(0, -1)));
  assert.ok(long[out.length - 1] === ' ' || long[out.length - 1] === undefined, `cut mid-word: "${out}"`);
});

test('metaDescription prefers a whole sentence when one ends late enough', () => {
  const s1 = 'Syllogism questions test pure logic, not real-world knowledge, and you must accept every statement as given.';
  const out = metaDescription(`${s1} Then judge only whether each conclusion must follow from those statements and nothing else at all.`);
  assert.equal(out, s1);
});

test('metaDescription skips a short opening sentence and cuts at a word instead', () => {
  const out = metaDescription('A regular conclusion has to hold in every valid diagram to follow. A possibility conclusion only needs one valid diagram where it is true, which is why the rules for can be and can never be differ.');
  assert.ok(out.length > 100 && out.endsWith('…'), out);
});

test('metaDescription handles Hindi sentence ends', () => {
  const s1 = 'सीटिंग अरेंजमेंट के प्रश्न चतुराई से ज़्यादा व्यवस्थित तरीके से काम करने का इनाम देते हैं और हर सुराग को क्रम से लगाना होता है।';
  const out = metaDescription(`${s1} खाली स्थानों की एक पंक्ति बनाएं, जो सुराग सीधे तय करते हैं उन्हें पहले लगाएँ और फिर बाकी।`);
  assert.equal(out, s1);
});

test('withSiteName appends the brand once', () => {
  assert.equal(withSiteName('Current Affairs'), 'Current Affairs | Pariksha Saathi');
  assert.equal(withSiteName('Pariksha Saathi: Free Exam Prep'), 'Pariksha Saathi: Free Exam Prep');
});

test('every search-tuned lesson title exists and promises only what the lesson says', () => {
  for (const [slug, titles] of Object.entries(LESSON_SEO_TITLES)) {
    const lesson = TOPIC_LESSONS.find((l) => l.slug === slug);
    assert.ok(lesson, `no lesson ${slug}`);
    const text = JSON.stringify(lesson.en).toLowerCase().replaceAll('’', "'");
    for (const term of LESSON_SEO_TITLE_TERMS[slug] ?? []) assert.ok(text.includes(term), `${slug}: lesson text lacks "${term}"`);
    assert.ok(titles.en.length <= 60, `${slug}: title too long (${titles.en.length})`);
    assert.equal(lessonSeoTitle(slug, 'en', 'x'), titles.en);
  }
  assert.equal(lessonSeoTitle('no-such-slug', 'en', 'Fallback'), 'Fallback');
});
