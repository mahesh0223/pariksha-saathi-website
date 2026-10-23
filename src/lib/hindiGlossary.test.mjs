import { test } from 'node:test';
import assert from 'node:assert/strict';
import { glossaryViolations, sscHindiLabels, isSscExam } from '../data/hindiGlossary.mjs';

test('flags a search word in body text and names the official term', () => {
  const found = glossaryViolations('<p>क्या SSC CGL में नेगेटिव मार्किंग है?</p>');
  assert.equal(found.length, 1);
  assert.equal(found[0].official, 'नकारात्मक अंकन');
});

test('allows the search word in the title, h1, link text, or in brackets after the official term', () => {
  const html = '<head><title>SSC CGL एडमिट कार्ड</title></head><h1>SSC CGL एडमिट कार्ड, रिज़ल्ट और आंसर की</h1>'
    + '<p><a href="/x/">पूरा सिलेबस</a></p><h3>क्या SSC CGL में नकारात्मक अंकन (नेगेटिव मार्किंग) है?</h3><h2>प्रवेश पत्र (एडमिट कार्ड)</h2>';
  assert.deepEqual(glossaryViolations(html), []);
});

test('tells भूतपूर्व सैनिक from a bare पूर्व सैनिक', () => {
  assert.deepEqual(glossaryViolations('<p>भूतपूर्व सैनिकों के लिए 3 वर्ष</p>'), []);
  assert.equal(glossaryViolations('<p>पूर्व सैनिकों के लिए 3 वर्ष</p>').length, 1);
});

test('SSC labels say विज्ञप्ति, in strings and in what label functions return', () => {
  const labels = sscHindiLabels({ notice: 'अधिसूचना में नहीं बताया गया', src: (cycle) => `${cycle} की अधिसूचना के अनुसार।`, nested: { many: 'अधिसूचनाओं में' } });
  assert.equal(labels.notice, 'विज्ञप्ति में नहीं बताया गया');
  assert.equal(labels.src('CGL 2026'), 'CGL 2026 की विज्ञप्ति के अनुसार।');
  assert.equal(labels.nested.many, 'विज्ञप्तियों में');
  assert.ok(isSscExam('ssc_gd') && !isSscExam('rrb_ntpc') && !isSscExam(undefined));
});
