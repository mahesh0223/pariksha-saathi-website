import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionRedirectResponse, questionRedirectTarget } from './questionRedirects.mjs';

const MAP = { topics: ['syllogism', 'coding-decoding'], en: { 'syllogism-1a2b3c4d': '0.1', 'syllogism-9f8e7d6c': '0.3' }, hi: { 'coding-decoding-15450c42': '1.2' } };

test('an old question page maps to its anchor on the right topic-list page', () => {
  assert.equal(questionRedirectTarget(MAP, '/q/syllogism-1a2b3c4d/'), '/q/syllogism/#syllogism-1a2b3c4d');
  assert.equal(questionRedirectTarget(MAP, '/q/syllogism-9f8e7d6c'), '/q/syllogism/page-3/#syllogism-9f8e7d6c');
  assert.equal(questionRedirectTarget(MAP, '/hi/q/coding-decoding-15450c42/'), '/hi/q/coding-decoding/page-2/#coding-decoding-15450c42');
});

test('the index, topic lists, other languages and unknown slugs are left alone', () => {
  for (const path of ['/q/', '/q/syllogism/', '/q/syllogism/page-2/', '/hi/q/syllogism-1a2b3c4d/', '/q/coding-decoding-15450c42/', '/q/constructor/', '/learn/syllogism/']) {
    assert.equal(questionRedirectTarget(MAP, path), null, path);
  }
});

test('the Pages Function answers 301 for an old page and falls through otherwise', async () => {
  const hit = await questionRedirectResponse({ request: new Request('https://parikshasaathi.com/q/syllogism-9f8e7d6c/'), next: () => 'static' }, MAP);
  assert.equal(hit.status, 301);
  assert.equal(hit.headers.get('location'), 'https://parikshasaathi.com/q/syllogism/page-3/#syllogism-9f8e7d6c');
  const miss = await questionRedirectResponse({ request: new Request('https://parikshasaathi.com/q/syllogism/'), next: () => 'static' }, MAP);
  assert.equal(miss, 'static');
});
