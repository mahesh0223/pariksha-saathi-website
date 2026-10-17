// Static text of the SSC typing / data-entry practice page (/typing-test/, /hi/typing-test/). Shared by
// scripts/prerender.mjs (the crawlable page) and src/pages/typing/TypingTestPage.tsx (which renders this and mounts
// the live test under it), the same arrangement as examDirectory.mjs.
import { TYPING_CHECKED, TYPING_MODES, TYPING_SOURCES } from '../data/typingTest.mjs';
import { formatHubDate } from './examHubPath.mjs';

export const TYPING_PATH = { en: '/typing-test/', hi: '/hi/typing-test/' };

export function typingTestPath(lang) {
  return TYPING_PATH[lang === 'hi' ? 'hi' : 'en'];
}

const T = {
  en: {
    exams: 'Exams',
    switchLabel: 'हिंदी में पढ़ें',
    h1: 'SSC typing and data entry practice',
    lede: 'Practise the SSC skill tests with the official time limits and standards: the CGL Tier-II Data Entry Speed Test, the CHSL Data Entry Operator skill tests and the CHSL LDC/JSA typing test in English or Hindi. Every standard below is copied from the official notice and linked to it.',
    modes: 'The tests and their official standards',
    minutes: (m) => `${m} minutes`,
    scoring: 'How your attempt is checked',
    scoringIntro: "Mistakes are classified exactly as in SSC's revised evaluation guidelines:",
    full: 'Full mistakes: a word left out, a wrong word, an extra word, a repeated word, a spelling mistake, an incomplete word.',
    half: 'Half mistakes: a spacing mistake ("Ihope", "h ave"), wrong capitalisation (not counted for Hindi), a punctuation mark left out, added or changed, two words swapped.',
    correct: 'You may correct mistakes within the time, as in the exam. Pasting text is switched off.',
    ours: "The guidelines do not publish how mistakes become an error percentage, so the error rate shown here is our own measure, stated plainly: your mistakes (a half mistake counts half) divided by the passage words you reached. Speed is counted the notices' way: key depressions are characters typed, spaces included, and a word is 5 key depressions (35 w.p.m. corresponds to about 10,500 key depressions per hour). Net speed counts only words typed with no mistake.",
    passages: 'The passages are original practice text written for Pariksha Saathi with AI assistance, not past SSC passages.',
    sources: 'Sources',
    checked: 'checked',
    noScript: 'The practice test runs in your browser and needs JavaScript.',
  },
  hi: {
    exams: 'परीक्षाएँ',
    switchLabel: 'Read in English',
    h1: 'SSC टाइपिंग और डेटा एंट्री अभ्यास',
    lede: 'SSC के स्किल टेस्ट का अभ्यास आधिकारिक समय-सीमा और मानकों के साथ करें: CGL टियर-II डेटा एंट्री स्पीड टेस्ट, CHSL डेटा एंट्री ऑपरेटर स्किल टेस्ट और अंग्रेज़ी या हिंदी में CHSL LDC/JSA टाइपिंग टेस्ट। नीचे दिया हर मानक आधिकारिक अधिसूचना से लिया गया है और उसी से जुड़ा है।',
    modes: 'टेस्ट और उनके आधिकारिक मानक',
    minutes: (m) => `${m} मिनट`,
    scoring: 'आपके प्रयास की जाँच कैसे होती है',
    scoringIntro: 'गलतियों का वर्गीकरण ठीक वैसा ही है जैसा SSC के संशोधित मूल्यांकन दिशानिर्देशों में है:',
    full: 'पूरी गलतियाँ: कोई शब्द छूटना, गलत शब्द, अतिरिक्त शब्द, दोहराया गया शब्द, वर्तनी की गलती, अधूरा शब्द।',
    half: 'आधी गलतियाँ: स्पेसिंग की गलती ("Ihope", "h ave"), गलत कैपिटल अक्षर (हिंदी में लागू नहीं), विराम-चिह्न छूटना, जुड़ना या बदलना, दो शब्दों का क्रम उलटना।',
    correct: 'परीक्षा की तरह आप समय के भीतर गलतियाँ सुधार सकते हैं। पाठ पेस्ट करना बंद है।',
    ours: 'दिशानिर्देश यह नहीं बताते कि गलतियों से त्रुटि-प्रतिशत कैसे निकाला जाता है, इसलिए यहाँ दिखाई गई त्रुटि-दर हमारा अपना माप है, जिसे साफ़ बताया गया है: आपकी गलतियाँ (आधी गलती आधी गिनी जाती है) भाग अनुच्छेद के उतने शब्द जहाँ तक आप पहुँचे। गति अधिसूचनाओं के तरीके से गिनी जाती है: की-डिप्रेशन यानी टाइप किए गए अक्षर, स्पेस सहित, और एक शब्द = 5 की-डिप्रेशन (35 w.p.m. लगभग 10,500 की-डिप्रेशन प्रति घंटा के बराबर)। नेट गति में केवल बिना गलती टाइप किए गए शब्द गिने जाते हैं।',
    passages: 'अनुच्छेद परीक्षा साथी के लिए AI की सहायता से लिखा गया मौलिक अभ्यास-पाठ है, SSC के पुराने अनुच्छेद नहीं।',
    sources: 'स्रोत',
    checked: 'जाँचा',
    noScript: 'अभ्यास टेस्ट आपके ब्राउज़र में चलता है और इसके लिए JavaScript ज़रूरी है।',
  },
};

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

/** Everything on the page except the live test, which mounts into #typing-test-app (a <noscript> note sits inside it). */
export function typingTestStaticHtml(lang = 'en') {
  const t = T[lang] ?? T.en;
  const otherPath = typingTestPath(lang === 'hi' ? 'en' : 'hi');
  let html = `<div class="compare-top-row"><a href="${lang === 'hi' ? '/hi/exams/' : '/exams/'}" class="detail-back">&larr; ${t.exams}</a><a href="${otherPath}" class="compare-lang-switch">${t.switchLabel}</a></div>`;
  html += `<h1>${t.h1}</h1><p class="compare-lede">${esc(t.lede)}</p>`;
  html += `<div id="typing-test-app" class="typing-app"><noscript><p class="hub-facts">${esc(t.noScript)}</p></noscript></div>`;
  html += `<h2>${t.modes}</h2><ul class="typing-modes">`;
  for (const mode of TYPING_MODES) {
    html += `<li><strong>${esc(mode.name[lang] ?? mode.name.en)}</strong> &middot; ${esc(t.minutes(mode.minutes))}<ul>${(mode.rules[lang] ?? mode.rules.en)
      .map((r) => `<li>${esc(r)}</li>`)
      .join('')}</ul></li>`;
  }
  html += `</ul>`;
  html += `<h2>${t.scoring}</h2><p>${esc(t.scoringIntro)}</p><ul class="hub-notes"><li>${esc(t.full)}</li><li>${esc(t.half)}</li><li>${esc(t.correct)}</li></ul>`;
  html += `<p class="hub-facts">${esc(t.ours)}</p><p class="hub-facts">${esc(t.passages)}</p>`;
  html += `<h2>${t.sources}</h2>`;
  for (const source of Object.values(TYPING_SOURCES)) {
    html += `<p class="hub-source"><a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.title[lang] ?? source.title.en)} &#8599;</a> &middot; ${t.checked}: ${esc(formatHubDate(TYPING_CHECKED, lang))}</p>`;
  }
  return html;
}

export function typingTestMeta(lang = 'en') {
  return lang === 'hi'
    ? {
        title: 'SSC टाइपिंग टेस्ट और DEST अभ्यास: CGL, CHSL (हिंदी और अंग्रेज़ी)',
        description: 'आधिकारिक समय और मानकों के साथ मुफ़्त SSC टाइपिंग अभ्यास: CGL DEST, CHSL DEO और LDC/JSA (35 w.p.m. अंग्रेज़ी, 30 w.p.m. हिंदी), SSC दिशानिर्देशों के अनुसार गलतियों का वर्गीकरण।',
      }
    : {
        title: 'SSC typing test and DEST practice: CGL, CHSL (English and Hindi)',
        description: "Free SSC typing practice with the official time limits and standards: CGL DEST, CHSL DEO and LDC/JSA (35 w.p.m. English, 30 w.p.m. Hindi), mistakes classified as in SSC's evaluation guidelines.",
      };
}
