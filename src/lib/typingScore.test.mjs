import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scoreTyping, tokens, typingSpeeds } from './typingScore.mjs';

const P = 'I hope the committee will consider the request, and reply by Monday.';
const kinds = (r) => r.mistakes.map((m) => `${m.weight}:${m.kind}`);

test('a perfect copy has no mistakes and every key depression counts', () => {
  const r = scoreTyping({ passage: P, typed: P });
  assert.deepEqual(r.mistakes, []);
  assert.equal(r.errorPercent, 0);
  assert.equal(r.correctKd, P.length);
  assert.equal(r.typedKd, P.length);
});

test('full mistakes: omission, substitution, spelling, addition, repetition', () => {
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope committee will consider the request, and reply by Monday.' })), ['full:omission']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope the council will consider the request, and reply by Monday.' })), ['full:substitution']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope the comittee will consider the request, and reply by Monday.' })), ['full:spelling']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope the committee will kindly consider the request, and reply by Monday.' })), ['full:addition']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope the the committee will consider the request, and reply by Monday.' })), ['full:repetition']);
});

test('half mistakes: spacing both ways, capitalisation, punctuation, transposition', () => {
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'Ihope the committee will consider the request, and reply by Monday.' })), ['half:spacing']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope the comm ittee will consider the request, and reply by Monday.' })), ['half:spacing']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope the Committee will consider the request, and reply by Monday.' })), ['half:capitalisation']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'I hope the committee will consider the request and reply by Monday.' })), ['half:punctuation']);
  assert.deepEqual(kinds(scoreTyping({ passage: P, typed: 'hope I the committee will consider the request, and reply by Monday.' })), ['half:transposition']);
});

test('stopping early: the rest of the passage is "not reached", and a cut-off last word is incomplete', () => {
  const r = scoreTyping({ passage: P, typed: 'I hope the committee will consi' });
  assert.deepEqual(kinds(r), ['full:incomplete']);
  assert.equal(r.wordsReached, 6);
  assert.equal(r.passageWords, tokens(P).length);
  assert.equal(r.errorPercent, Math.round((1 / 6) * 10000) / 100);
});

test('the error rate weighs a half mistake as half, to 2 decimals', () => {
  const r = scoreTyping({ passage: P, typed: 'I hope the Committee will consider the request and reply by Monday.' });
  assert.equal(r.full, 0);
  assert.equal(r.half, 2);
  assert.equal(r.errorPercent, Math.round((1 / 12) * 10000) / 100);
});

test('Hindi: capitalisation never applies; a wrong matra is a spelling mistake; danda is punctuation', () => {
  const hi = 'समय का सही उपयोग ही सफलता की कुंजी है।';
  assert.deepEqual(kinds(scoreTyping({ passage: hi, typed: hi, lang: 'hi' })), []);
  assert.deepEqual(kinds(scoreTyping({ passage: hi, typed: 'समय का सहि उपयोग ही सफलता की कुंजी है।', lang: 'hi' })), ['full:spelling']);
  assert.deepEqual(kinds(scoreTyping({ passage: hi, typed: 'समय का सही उपयोग ही सफलता की कुंजी है', lang: 'hi' })), ['half:punctuation']);
});

test('speeds: key depressions per hour and words of 5 key depressions per minute, gross and net', () => {
  // 10500 key depressions per hour is 35 w.p.m. (CHSL notice para 13.9.13.7)
  assert.deepEqual(typingSpeeds({ typedKd: 1750, correctKd: 1750 }, 10), { grossKdph: 10500, netKdph: 10500, grossWpm: 35, netWpm: 35 });
  assert.deepEqual(typingSpeeds({ typedKd: 2000, correctKd: 1500 }, 15), { grossKdph: 8000, netKdph: 6000, grossWpm: 26.7, netWpm: 20 });
  assert.deepEqual(typingSpeeds({ typedKd: 10, correctKd: 10 }, 0), { grossKdph: 0, netKdph: 0, grossWpm: 0, netWpm: 0 });
});
