import { test } from 'node:test';
import assert from 'node:assert/strict';
import { practiceGroupsFor } from './examHubExtrasBuild.mjs';
import { examHubBody, examHubFaq, examHubStructuredData } from './examHub.mjs';

test('syllabus subjects map to the question subjects that practise them', () => {
  assert.deepEqual(practiceGroupsFor('General Intelligence & Reasoning'), ['Reasoning']);
  assert.deepEqual(practiceGroupsFor('Numerical and Mental Ability'), ['Quantitative Aptitude', 'Reasoning']);
  assert.deepEqual(practiceGroupsFor('General / Financial Awareness & Computer Knowledge'), ['General Studies', 'General Awareness', 'Computer Knowledge']);
  assert.deepEqual(practiceGroupsFor('Reasoning (& Computer Aptitude in Mains)'), ['Reasoning', 'Computer Knowledge']);
  // "Environmental" is not "mental"; "General Hindi and General English" is an English paper, not general studies.
  assert.deepEqual(practiceGroupsFor('Environmental Studies (Paper I)'), ['General Studies']);
  assert.deepEqual(practiceGroupsFor('Main: General Hindi and General English'), ['English']);
  for (const paper of ['Main: Essay', 'Main: General Hindi', 'Language I and Language II', 'Trade syllabus (CBT-2 Part-B)', 'Main: optional subject']) {
    assert.deepEqual(practiceGroupsFor(paper), [], paper);
  }
});

const name = (en, hi = en) => ({ en, hi });
const FACT = {
  examId: 'test_exam',
  cycleLabel: 'TEST 2026',
  noticeTitle: 'Test notice',
  sourceUrl: 'https://example.gov.in/notice.pdf',
  verifiedAt: '2026-10-15',
  stages: [
    {
      name: name('Tier-I', 'टियर-I'),
      parts: [
        {
          name: name('Session-I', 'सत्र-I'),
          kind: 'objective',
          durationMinutes: 45,
          negativeMarking: { perWrongAnswer: 0, en: 'None', hi: 'कोई नहीं' },
          sections: [{ name: name('Maths'), questions: 20, marksPerQuestion: 3, marks: 60, minutes: null }],
        },
        {
          name: name('Session-II', 'सत्र-II'),
          kind: 'objective',
          durationMinutes: 45,
          negativeMarking: { perWrongAnswer: 1, en: '1 mark is deducted for each wrong answer.', hi: 'हर गलत उत्तर पर 1 अंक कटेगा।' },
          sections: [{ name: name('English'), questions: 25, marksPerQuestion: 3, marks: 75, minutes: null }],
        },
      ],
    },
    { name: name('Interview', 'साक्षात्कार'), parts: [] },
  ],
  eligibility: {
    ageNote: name('18-27 years', '18-27 वर्ष'),
    ageReferenceDate: '2026-08-01',
    qualification: [{ posts: name('All posts', 'सभी पद'), requirement: name('Class 10 pass', '10वीं पास') }],
  },
  dates: [{ role: 'firstStage', label: name('Exam'), from: '2026-11-02', to: '2026-11-20' }],
};
const EXTRAS = {
  syllabus: { officialUrl: 'https://example.gov.in/', en: [{ name: 'Maths', body: 'Arithmetic' }, { name: 'English', body: 'Grammar' }], hi: [{ name: 'गणित', body: 'अंकगणित' }, { name: 'अंग्रेज़ी', body: 'व्याकरण' }] },
  practice: [{ group: 'Quantitative Aptitude', keys: ['NUMBER_SYSTEM'] }],
};

test('FAQ answers only restate the fact sheet, sessions counted together, negative marking per session', () => {
  const faq = examHubFaq({ examName: 'Test Exam', facts: [FACT], lang: 'en', extras: EXTRAS });
  const byQ = Object.fromEntries(faq.map(({ q, a }) => [q, a]));
  assert.equal(byQ['What are the selection stages of Test Exam?'], 'Tier-I → Interview, as per the TEST 2026 notification.');
  assert.equal(byQ['How many questions are in the Test Exam first stage?'], 'Tier-I: 45 questions for 135 marks in 90 minutes, as per the TEST 2026 notification.');
  assert.equal(byQ['Is there negative marking in Test Exam?'], 'Tier-I, as per the TEST 2026 notification: Session-I: No negative marking. Session-II: 1 mark is deducted for each wrong answer.');
  assert.equal(byQ['What is the age limit for Test Exam?'], '18-27 years. Age is counted as on 1 August 2026.');
  assert.equal(byQ['What qualification do I need for Test Exam?'], 'All posts: Class 10 pass.');
  assert.equal(byQ['Which subjects does the Test Exam exam test?'], 'The official syllabus lists: Maths; English.');
  assert.equal(byQ['What are the Test Exam first-stage exam dates?'], 'Tier-I: 2 November 2026 to 20 November 2026, as per the TEST 2026 notification.');
});

test('a negative marking the notice does not state is said so, in Hindi too', () => {
  const silent = { ...FACT, stages: [{ ...FACT.stages[0], parts: [{ ...FACT.stages[0].parts[0], negativeMarking: null }] }] };
  const faq = examHubFaq({ examName: 'टेस्ट', facts: [silent], lang: 'hi', extras: null });
  assert.equal(faq.find((f) => f.q.startsWith('क्या'))?.a, 'टियर-I, TEST 2026 की अधिसूचना के अनुसार: अधिसूचना में नहीं बताया गया।');
  assert.ok(!faq.some((f) => f.q.includes('विषय')), 'no subjects question without a syllabus');
});

test('the body shows the syllabus, practice links to /q/ lists and the FAQ with its own source line', () => {
  const html = examHubBody({ examName: 'Test Exam', facts: [FACT], lang: 'en', links: { syllabusPath: '/compare/test-syllabus/' }, extras: EXTRAS });
  assert.ok(html.includes('<dl class="hub-syllabus"><div><dt>Maths</dt><dd>Arithmetic</dd></div>'));
  assert.ok(html.includes('<a href="/compare/test-syllabus/">Full syllabus, stage by stage &rarr;</a>'));
  assert.match(html, /<ul class="hub-topic-links"><li><a href="\/q\/number-system\/">/);
  assert.ok(html.includes('<div class="hub-faq"><h3>What are the selection stages of Test Exam?</h3>'));
  const sources = html.match(/<p class="hub-source">/g) ?? [];
  assert.equal(sources.length, 4, 'pattern, eligibility, dates and FAQ each carry a source line');
  const hi = examHubBody({ examName: 'Test Exam', facts: [FACT], lang: 'hi', extras: EXTRAS });
  assert.match(hi, /<h3>मात्रात्मक अभियोग्यता<\/h3><ul class="hub-topic-links"><li><a href="\/hi\/q\/number-system\/">/);
});

test('FAQPage data carries the same questions as the page', () => {
  const data = examHubStructuredData({ examName: 'Test Exam', facts: [FACT], lang: 'en', siteUrl: 'https://parikshasaathi.com' });
  const faqPage = data.find((d) => d['@type'] === 'FAQPage');
  assert.ok(faqPage);
  // No extras for an unknown exam id: no subjects question, but every fact-sheet question is there.
  assert.deepEqual(
    faqPage.mainEntity.map((e) => e.name),
    examHubFaq({ examName: 'Test Exam', facts: [FACT], lang: 'en' }).map((f) => f.q),
  );
});

// The question-style FAQs (22 Oct 2026): each asked only when the fact sheet holds its answer.
const FULL = {
  ...FACT,
  stages: [
    FACT.stages[0],
    {
      name: name('Tier-II (CBE)', 'टियर-II (CBE)'),
      parts: [
        { name: name('Paper-I'), kind: 'objective', durationMinutes: 60, negativeMarking: { perWrongAnswer: 1, en: '1 mark is deducted for each wrong answer.', hi: 'हर गलत उत्तर पर 1 अंक कटेगा।' }, sections: [{ name: name('Maths'), questions: 30, marksPerQuestion: 3, marks: 90, minutes: null }] },
        { name: name('Typing Test'), kind: 'skill', qualifying: true, negativeMarking: null, sections: [] },
      ],
    },
    { name: name('Interview', 'साक्षात्कार'), parts: [] },
  ],
  eligibility: {
    ...FACT.eligibility,
    qualification: [{ posts: name('All posts', 'सभी पद'), requirement: name("Bachelor's degree. Final-year students may apply but must hold the degree by 1 August 2026.", 'स्नातक डिग्री। अंतिम वर्ष के विद्यार्थी आवेदन कर सकते हैं।') }],
    qualifyingMarks: name('30% for UR, 25% for OBC and EWS', 'UR के लिए 30%, OBC और EWS के लिए 25%'),
  },
  vacancies: { total: 10731, asOf: '2026-09-24', sourceUrl: 'https://example.gov.in/vacancies.pdf' },
  dates: [
    ...FACT.dates,
    { label: name('Online applications', 'ऑनलाइन आवेदन'), from: '2026-05-21', to: '2026-06-22' },
    { label: name('Application form correction window'), from: '2026-06-25', to: '2026-06-27' },
  ],
};

test('question-style FAQs restate the fact sheet: later-stage marking, qualifying parts, final-year, marks, vacancies, last date', () => {
  const faq = examHubFaq({ examName: 'Test Exam', facts: [FULL], lang: 'en', extras: EXTRAS, now: new Date('2026-10-22T06:00:00Z') });
  const byQ = Object.fromEntries(faq.map(({ q, a }) => [q, a]));
  assert.equal(byQ['Is there negative marking in Test Exam Tier-II?'], 'Tier-II (CBE), as per the TEST 2026 notification: 1 mark is deducted for each wrong answer.');
  assert.equal(byQ['Which parts of the Test Exam exam are qualifying?'], 'As per the TEST 2026 notification, these are qualifying: Tier-II (CBE): Typing Test.');
  assert.equal(byQ['Can final-year students apply for Test Exam?'], "As per the TEST 2026 notification: Bachelor's degree. Final-year students may apply but must hold the degree by 1 August 2026.");
  assert.equal(byQ['What are the minimum qualifying marks in Test Exam?'], '30% for UR, 25% for OBC and EWS.');
  assert.equal(byQ['How many vacancies are there in Test Exam?'], '10,731 tentative vacancies for TEST 2026, as officially published on 24 September 2026.');
  // Only the application window - not the correction window - and it says the window has closed.
  assert.equal(byQ['When is the last date to apply for Test Exam?'], 'Online applications: 21 May 2026 to 22 June 2026 (now closed). As per the TEST 2026 notification.');
  const open = examHubFaq({ examName: 'Test Exam', facts: [FULL], lang: 'en', extras: EXTRAS, now: new Date('2026-06-01T06:00:00Z') });
  assert.equal(open.find((f) => f.q.startsWith('When is the last date'))?.a, 'Online applications: 21 May 2026 to 22 June 2026. As per the TEST 2026 notification.');
});

test('a school-level qualification is asked about awaited results; nothing is asked the notice does not answer', () => {
  const school = { ...FULL, eligibility: { ...FULL.eligibility, qualification: [{ posts: name('All posts'), requirement: name('12th pass. Candidates still appearing in the 12th exam may apply.') }] } };
  const qs = examHubFaq({ examName: 'Test Exam', facts: [school], lang: 'en' }).map((f) => f.q);
  assert.ok(qs.includes('Can students awaiting their result apply for Test Exam?'));
  assert.ok(!qs.includes('Can final-year students apply for Test Exam?'));
  // The base sheet has none of these facts, so none of these questions.
  const plain = examHubFaq({ examName: 'Test Exam', facts: [FACT], lang: 'en' }).map((f) => f.q);
  for (const missing of ['qualifying?', 'final-year', 'awaiting', 'minimum qualifying marks', 'vacancies', 'last date to apply', 'Tier-II']) {
    assert.ok(!plain.some((q) => q.includes(missing)), `asked "${missing}" without the fact`);
  }
  // A later stage whose papers state no negative marking is not asked about.
  const silent = { ...FULL, stages: [FULL.stages[0], { ...FULL.stages[1], parts: [{ ...FULL.stages[1].parts[0], negativeMarking: null }] }] };
  assert.ok(!examHubFaq({ examName: 'Test Exam', facts: [silent], lang: 'en' }).some((f) => f.q.includes('Tier-II')));
});
