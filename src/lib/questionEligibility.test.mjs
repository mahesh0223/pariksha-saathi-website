import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MIN_EXPLANATION_CHARS, questionShape, questionSnippet, selectEligible, topicSlug } from './questionEligibility.mjs';

const row = (id, text, extra = {}) => ({ id, topicKey: 'T', text, explLen: MIN_EXPLANATION_CHARS, pairKey: null, ...extra });

test('questionShape masks what templates swap: numbers, names, letters, signs, quoted sentences', () => {
  assert.equal(questionShape('राम के पास १२ आम हैं'), 'राम के पास # आम हैं');
  assert.equal(questionShape("Sunita is Rahul's mother. Rahul is Anita's brother."), questionShape("Rekha is Deepak's mother. Deepak is Suresh's brother."));
  assert.equal(questionShape('Statements: D = G <= F < E = I. Conclusion: D < I.'), questionShape('Statements: I <= C = D < E < G. Conclusion: I < G.'));
  assert.equal(questionShape("Change the following sentence to passive voice: 'The committee collected the car.'"), questionShape("Change the following sentence to passive voice: 'Sunita watered the book.'"));
  assert.notEqual(questionShape('Which river flows through Patna?'), questionShape('Which fort stands in Gwalior city today?'));
});

test('template variants (shape used more than 3 times) get no page; distinct ones do', () => {
  const rows = [
    row('a1', 'Find the odd one: 2, 4, 6'), row('a2', 'Find the odd one: 3, 5, 7'),
    row('a3', 'Find the odd one: 1, 9, 8'), row('a4', 'Find the odd one: 5, 6, 7'),
    row('b1', 'Which river flows through Patna?'),
    row('c1', 'pair one 10'), row('c2', 'pair one 20'), row('c3', 'pair one 30'),
  ];
  assert.deepEqual(selectEligible(rows, 'en').map((r) => r.id), ['b1', 'c1', 'c2', 'c3']);
});

test('short explanations, current-affairs questions and flagged questions are left out', () => {
  const rows = [
    row('ok', 'A distinct question?'),
    row('short', 'Another distinct question?', { explLen: MIN_EXPLANATION_CHARS - 1 }),
    row('ca', 'A current affairs question?', { topicKey: 'CURRENT_AFFAIRS_2026_W43' }),
    row('flag', 'A flagged question?'),
  ];
  assert.deepEqual(selectEligible(rows, 'en', new Set(['en|A flagged question?'])).map((r) => r.id), ['ok']);
});

test('a Hindi question with an English twin qualifies only if the twin does', () => {
  const rows = [row('h1', 'पहला प्रश्न?', { pairKey: 'p1' }), row('h2', 'दूसरा प्रश्न?', { pairKey: 'p2' }), row('h3', 'तीसरा प्रश्न?')];
  assert.deepEqual(selectEligible(rows, 'hi', new Set(), new Set(['p1'])).map((r) => r.id), ['h1', 'h3']);
});

test('snippets cut at a word; topic slugs are lower-case with dashes', () => {
  const out = questionSnippet('word '.repeat(60));
  assert.ok(out.length <= 140 && out.endsWith('word…'), out);
  assert.equal(topicSlug('SYLLOGISM_POSSIBILITY'), 'syllogism-possibility');
});
