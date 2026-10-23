import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pyqPaperHref, pyqPracticePath } from './pyqPractice.mjs';
import { pyqPaperPath } from './pyqPath.mjs';

test('the practice player links every previous-year question to the solved-paper page it came from', () => {
  const papers = JSON.parse(readFileSync(new URL('../data/pyqPapers.json', import.meta.url), 'utf8'));
  for (const p of papers) {
    assert.equal(pyqPaperHref({ pyqExamId: p.examId, pyqPaper: p.paper, pyqDate: p.date, pyqShift: p.shift }), pyqPaperPath(p), p.slug);
  }
  assert.equal(pyqPaperHref({ pyqPaper: 'X' }), null, 'a question that is not a previous-year question has no paper');
});

test('the practice player address carries the language only for Hindi', () => {
  assert.equal(pyqPracticePath('STATIC_GK'), '/app/pyq-practice/STATIC_GK/');
  assert.equal(pyqPracticePath('HINDI_GRAMMAR', 'hi'), '/app/pyq-practice/HINDI_GRAMMAR/?lang=hi');
});
