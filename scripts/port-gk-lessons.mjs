// One-off generator: turns the server's General Awareness / state GK / CTET pedagogy lessons
// (pariksha-saathi-server/prisma/seed-data/claude-gk-pedagogy/<TOPIC>.<lang>.json) into website lesson
// entries (src/data/generalAwarenessLessons.mjs). Not part of the build: run it by hand after the
// server content changes, then review the diff.
//
//   node scripts/port-gk-lessons.mjs [--server ../pariksha-saathi-server]
//
// What it publishes per topic (and what it deliberately does not):
//  - the lesson's headed paragraphs, MINUS the opening "What the exam asks" paragraph: that paragraph
//    states how many questions an exam asks on the topic, which nobody here has sourced;
//  - the one-glance revision list as `keyFacts`;
//  - a spread sample of the question bank as practice questions (options inline, answer + explanation);
//  - an honest credit: these lessons are AI-drafted, so the page says so instead of the human byline
//    that the older hand-written lessons carry.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const serverArg = process.argv.indexOf('--server');
const server = resolve(here, serverArg > -1 ? process.argv[serverArg + 1] : '../../pariksha-saathi-server');
const dir = join(server, 'prisma/seed-data/claude-gk-pedagogy');

// subject = the library section; audience = who the lesson is for (used in the lede and "where this is tested").
const GENERAL = { subject: 'General Awareness', audience: { en: 'SSC, Railway, police and state PSC exams', hi: 'SSC, रेलवे, पुलिस और राज्य PSC परीक्षाओं' } };
const CTET = { subject: 'Teaching (CTET)', audience: { en: 'CTET and state TETs', hi: 'CTET और राज्य TET परीक्षाओं' } };
const TOPICS = {
  ANCIENT_MEDIEVAL_HISTORY: { slug: 'ancient-and-medieval-indian-history', ...GENERAL },
  MODERN_INDIAN_HISTORY: { slug: 'modern-indian-history', ...GENERAL },
  ART_AND_CULTURE: { slug: 'indian-art-and-culture', ...GENERAL },
  INDIAN_GEOGRAPHY: { slug: 'indian-geography', ...GENERAL },
  WORLD_PHYSICAL_GEOGRAPHY: { slug: 'physical-and-world-geography', ...GENERAL },
  INDIAN_POLITY: { slug: 'indian-polity-and-constitution', ...GENERAL },
  INDIAN_ECONOMY: { slug: 'indian-economy', ...GENERAL },
  GENERAL_SCIENCE: { slug: 'general-science', ...GENERAL },
  ENVIRONMENT_ECOLOGY: { slug: 'environment-and-ecology', ...GENERAL },
  STATIC_GK: { slug: 'static-general-knowledge', ...GENERAL },
  UP_STATE_GK: { slug: 'uttar-pradesh-gk', subject: 'State GK', audience: { en: 'UPPSC and UP Police exams', hi: 'UPPSC और UP पुलिस परीक्षाओं' } },
  BIHAR_STATE_GK: { slug: 'bihar-gk', subject: 'State GK', audience: { en: 'BPSC and Bihar Police exams', hi: 'BPSC और बिहार पुलिस परीक्षाओं' } },
  MP_STATE_GK: { slug: 'madhya-pradesh-gk', subject: 'State GK', audience: { en: 'MPPSC and MP Police exams', hi: 'MPPSC और MP पुलिस परीक्षाओं' } },
  RAJASTHAN_STATE_GK: { slug: 'rajasthan-gk', subject: 'State GK', audience: { en: 'RPSC RAS and Rajasthan Police exams', hi: 'RPSC RAS और राजस्थान पुलिस परीक्षाओं' } },
  CHILD_DEVELOPMENT_PEDAGOGY: { slug: 'child-development-and-pedagogy', ...CTET },
  INCLUSIVE_EDUCATION: { slug: 'inclusive-education', ...CTET },
  LANGUAGE_PEDAGOGY: { slug: 'language-pedagogy', ...CTET },
  MATHEMATICS_PEDAGOGY: { slug: 'mathematics-pedagogy', ...CTET },
  EVS_PEDAGOGY: { slug: 'evs-pedagogy', ...CTET },
  SCIENCE_SOCIAL_PEDAGOGY: { slug: 'science-and-social-studies-pedagogy', ...CTET },
};

const SAMPLE_SIZE = 12; // candidates per topic, spread across the bank
const PUBLISH_MAX = 10; // published after the fact-check has excluded any it flagged
const excludedFile = join(dir, 'fact-check-2026-10-15', 'excluded-questions.json');
const EXCLUDED = existsSync(excludedFile) ? JSON.parse(readFileSync(excludedFile, 'utf8')) : {};
const LETTERS = ['A', 'B', 'C', 'D'];
const PUBLISHED = '2026-10-15';

const T = {
  en: {
    suffix: 'key facts and practice questions',
    lede: (title, audience, n) => `Revise ${title} for ${audience}: the facts and distinctions that keep coming up, a one-glance revision list, and ${n} practice questions with answers and explanations.`,
    conceptHeading: 'Key concepts and facts',
    keyFactsHeading: 'One-glance revision list',
    practiceHeading: 'Practice questions',
    practiceIntro: 'Try each question before opening the answer.',
    relevantForHeading: 'Where this is tested',
    relevantFor: (title, audience) => `${title} is tested in ${audience}. Check the current official notification and syllabus of the exam you are preparing for to see how it is covered.`,
    offerHeading: 'Practise more',
    offer: (title) => `Pariksha Saathi has a full topic-wise question set for ${title}, with instant scoring and explanations. It is free and needs no account.`,
    cta: (title) => `Practise ${title} free`,
    back: 'Home',
    solution: 'Solution',
    answer: 'Answer',
    disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, CBSE or any government body.',
  },
  hi: {
    suffix: 'मुख्य तथ्य और अभ्यास प्रश्न',
    lede: (title, audience, n) => `${audience} के लिए ${title} दोहराएँ: बार-बार पूछे जाने वाले तथ्य और अंतर, एक नज़र में दोहराने की सूची, और उत्तर तथा स्पष्टीकरण सहित ${n} अभ्यास प्रश्न।`,
    conceptHeading: 'मुख्य अवधारणाएँ और तथ्य',
    keyFactsHeading: 'एक नज़र में दोहराने की सूची',
    practiceHeading: 'अभ्यास प्रश्न',
    practiceIntro: 'उत्तर खोलने से पहले हर प्रश्न स्वयं हल करें।',
    relevantForHeading: 'यह कहाँ पूछा जाता है',
    relevantFor: (title, audience) => `${title} से प्रश्न ${audience} में पूछे जाते हैं। यह देखने के लिए कि आपकी परीक्षा में इसे कैसे शामिल किया गया है, उस परीक्षा की वर्तमान आधिकारिक अधिसूचना और पाठ्यक्रम देखें।`,
    offerHeading: 'और अभ्यास करें',
    offer: (title) => `Pariksha Saathi पर ${title} के पूरे विषयवार प्रश्न-सेट हैं, तुरंत स्कोरिंग और स्पष्टीकरण के साथ। यह मुफ़्त है और खाते की ज़रूरत नहीं।`,
    cta: (title) => `${title} का मुफ़्त अभ्यास करें`,
    back: 'होम',
    solution: 'हल',
    answer: 'उत्तर',
    disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC, IBPS, SBI, CBSE या किसी भी सरकारी निकाय से संबद्ध नहीं है।',
  },
};

function sampleIndexes(total, count) {
  // Evenly spread across the bank, starting at 0, so every sub-topic the author covered in order is touched.
  return Array.from({ length: count }, (_, i) => Math.floor((i * total) / count));
}

function build(topicKey, meta) {
  const en = JSON.parse(readFileSync(join(dir, `${topicKey}.en.json`), 'utf8'));
  const hi = JSON.parse(readFileSync(join(dir, `${topicKey}.hi.json`), 'utf8'));
  const indexes = sampleIndexes(en.questions.length, SAMPLE_SIZE)
    .filter((i) => !(EXCLUDED[topicKey] ?? []).includes(i))
    .slice(0, PUBLISH_MAX);
  const content = (lang, src) => {
    const t = T[lang];
    const paragraphs = src.lesson.explanation.split('\n\n').map((p) => p.trim()).filter(Boolean);
    const title = src.lesson.title;
    const practiceQuestions = indexes.map((i) => {
      const q = src.questions[i];
      const options = q.options.map((o, k) => `(${LETTERS[k]}) ${o}`).join('  ');
      return { question: `${q.text} ${options}`, answer: `(${LETTERS[q.correctOptionIndex]}) ${q.options[q.correctOptionIndex]}. ${q.explanation}` };
    });
    return {
      pageTitle: `${title}: ${t.suffix}`,
      lede: t.lede(title, meta.audience[lang], practiceQuestions.length),
      conceptHeading: t.conceptHeading,
      conceptBody: paragraphs.slice(1),
      keyFactsHeading: t.keyFactsHeading,
      keyFacts: src.lesson.examples,
      examplesHeading: '',
      examples: [],
      practiceHeading: t.practiceHeading,
      practiceIntro: t.practiceIntro,
      practiceQuestions,
      relevantForHeading: t.relevantForHeading,
      relevantForBody: t.relevantFor(title, meta.audience[lang]),
      offerHeading: t.offerHeading,
      offerBody: t.offer(title),
      ctaLabel: t.cta(title),
      backLabel: t.back,
      solutionLabel: t.solution,
      answerLabel: t.answer,
      disclaimer: t.disclaimer,
    };
  };
  return {
    entry: { slug: meta.slug, publishedDate: PUBLISHED, credit: 'ai-assisted', topicKey, en: content('en', en), hi: content('hi', hi) },
    catalog: {
      slug: meta.slug,
      title: en.lesson.title,
      description: `Key facts, a one-glance revision list and practice questions on ${en.lesson.title}.`,
      subject: meta.subject,
      topicKey,
    },
  };
}

const entries = [];
const catalog = [];
for (const [topicKey, meta] of Object.entries(TOPICS)) {
  const built = build(topicKey, meta);
  entries.push(built.entry);
  catalog.push(built.catalog);
}

const header = `// Generated by scripts/port-gk-lessons.mjs from the server's claude-gk-pedagogy lessons - edit the server
// JSON (or the script) and regenerate rather than editing this file by hand. These lessons are AI-drafted:
// each entry carries credit: 'ai-assisted' so the page says so instead of showing a human byline.
`;
writeFileSync(join(here, '../src/data/generalAwarenessLessons.mjs'), `${header}\nexport const GENERAL_AWARENESS_LESSONS = ${JSON.stringify(entries, null, 2)};\n`);
writeFileSync(join(here, '../src/data/generalAwarenessCatalog.mjs'), `${header}\nexport const GENERAL_AWARENESS_CATALOG = ${JSON.stringify(catalog, null, 2)};\n`);
console.log(`Ported ${entries.length} topics, ${entries.length * 2} lessons.`);
