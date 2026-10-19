import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkExamNames } from './examLinks.mjs';

test('links each exam once, longest name first, to the page in the same language', () => {
  const out = linkExamNames('Asked in SSC CGL, SSC MTS, IBPS PO, IBPS Clerk and SBI PO; SSC CGL again.', 'en');
  assert.equal((out.match(/<a /g) || []).length, 5);
  assert.ok(out.includes('<a href="/exams/ssc-cgl/">SSC CGL</a>'));
  assert.ok(out.includes('<a href="/exams/ibps-clerk/">IBPS Clerk</a>'));
  assert.ok(out.endsWith('SSC CGL again.'), 'second mention stays plain text');
});

test('Hindi text links Hindi forms to the Hindi pages', () => {
  const out = linkExamNames('SSC CGL, IBPS क्लर्क और बिहार पुलिस', 'hi');
  assert.ok(out.includes('<a href="/hi/exams/ssc-cgl/">SSC CGL</a>'));
  assert.ok(out.includes('<a href="/hi/exams/ibps-clerk/">IBPS क्लर्क</a>'));
  assert.ok(out.includes('<a href="/hi/exams/bihar-police/">बिहार पुलिस</a>'));
});

test('escapes the text and leaves names inside other words alone', () => {
  const out = linkExamNames('<b>UPPSC</b> & XUPPSC', 'en');
  assert.ok(out.startsWith('&lt;b&gt;<a href="/exams/uppsc/">UPPSC</a>&lt;/b&gt; &amp; XUPPSC'), out);
});
