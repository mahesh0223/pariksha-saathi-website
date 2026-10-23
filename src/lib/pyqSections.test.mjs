import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alternativeTo, optionalQuestions, optionalSectionNames, satQuestions } from './pyqSections.mjs';

const q = (section, languageCode = 'en') => ({ section, languageCode });
const gd = {
  alternativeSections: [['Part-D-English', 'Part-D-Hindi']],
  questions: [q('Part-A'), q('Part-A'), q('Part-D-English'), q('Part-D-Hindi', 'hi'), q('Part-D-Hindi', 'hi')],
};

test('a paper with a Hindi option of Part-D counts one Part-D, and holds the Hindi questions apart', () => {
  assert.deepEqual([...optionalSectionNames(gd)], ['Part-D-Hindi']);
  assert.equal(satQuestions(gd).length, 3);
  assert.equal(optionalQuestions(gd).length, 2);
  assert.equal(alternativeTo(gd, 'Part-D-Hindi'), 'Part-D-English');
  assert.equal(alternativeTo(gd, 'Part-D-English'), null, 'the first of a group is the counted one, not an alternative');
});

test('a paper without alternative sections counts every question', () => {
  const plain = { questions: [q('Reasoning'), q('English')] };
  assert.equal(satQuestions(plain).length, 2);
  assert.equal(optionalQuestions(plain).length, 0);
  assert.equal(alternativeTo(plain, 'English'), null);
});
