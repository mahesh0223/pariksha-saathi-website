// The Hindi landing page (/hi/). One builder shared by scripts/prerender.mjs and src/pages/PublicPage.tsx
// (through publicPages.mjs), the same arrangement as examDirectory.mjs. It is deliberately static - no live
// previews - so the React page renders exactly what was prerendered. Everything it claims is true today;
// the trust lines come from trustLines.mjs (see the note there on what may NOT be promised).
import { DAILY_PDF_EDITIONS } from './downloads.mjs';
import { LESSON_SUBJECTS, LESSON_SUBJECTS_HI } from './lessonSubjects.mjs';
import { trustLinesHtml, trustStatsHtml } from './trustLines.mjs';
import { examsLinkHtml } from '../lib/examDirectory.mjs';
import { examHubPath, formatHubDate } from '../lib/examHubPath.mjs';
import { socialLinksHtml } from './socialLinks.mjs';

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export const HINDI_HOME_META = {
  title: 'SSC, बैंक, रेलवे और पुलिस परीक्षाओं की मुफ़्त तैयारी',
  description:
    'SSC CGL, CHSL, MTS, IBPS, SBI, रेलवे, राज्य पुलिस, CTET और राज्य PSC के लिए हिंदी में पाठ, अभ्यास क्विज़, मॉक टेस्ट और स्रोत से जुड़े करेंट अफेयर्स — मुफ़्त, बिना खाते के।',
};

// Same seven exams as the English hero, pointing at their Hindi hub pages.
const HERO_EXAMS = [
  ['ssc_cgl', 'SSC CGL'],
  ['ssc_mts', 'SSC MTS'],
  ['ssc_chsl', 'SSC CHSL'],
  ['ibps_po', 'IBPS PO'],
  ['ibps_clerk', 'IBPS Clerk'],
  ['sbi_po', 'SBI PO'],
  ['sbi_clerk', 'SBI Clerk'],
];

const FEATURES = [
  { title: 'पढ़ें, फिर अभ्यास करें', body: 'तर्कशक्ति, मात्रात्मक अभियोग्यता, अंग्रेज़ी और सामान्य जागरूकता के विषयवार पाठ, हर पाठ के बाद असली परीक्षा पैटर्न में अभ्यास — नकारात्मक अंकन सहित।' },
  { title: 'अभ्यास के तीन तरीक़े', body: 'एक कमज़ोर विषय के लिए विषयवार क्विज़, विषय के अनुसार सेक्शनल टेस्ट, या पूरी परीक्षा का फ़ुल-लेंथ मॉक।' },
  { title: 'अपनी ग़लतियों से सीखें', body: 'हर ग़लत उत्तर अपने-आप आपकी मिस्टेक नोटबुक में दर्ज होता है, उस विषय के साथ जिस पर आगे ध्यान देना है।' },
  { title: 'हिंदी या English', body: 'कभी भी भाषा बदलें — न दोबारा इंस्टॉल, न अलग साइट।' },
  { title: 'असली करेंट अफेयर्स', body: 'तारीख़ के साथ करेंट अफेयर्स और आधिकारिक परीक्षा सूचनाएँ, हर एक के साथ वह स्रोत जिसे आप खुद जाँच सकते हैं।' },
  { title: 'खाते की ज़रूरत नहीं', body: 'बिना खाते के पूरी पढ़ाई करें। मुफ़्त खाता तभी बनाएँ जब प्रगति को कई डिवाइस पर सुरक्षित रखना हो।' },
];

const HOW_IT_WORKS = [
  { n: '1', title: 'अपनी परीक्षा चुनें', body: 'SSC, बैंकिंग, रेलवे, पुलिस, CTET या राज्य PSC में से एक या अधिक परीक्षाएँ चुनें। कभी भी बदलें या जोड़ें।' },
  { n: '2', title: 'पढ़ें, फिर अभ्यास करें', body: 'विषयवार पाठ पढ़ें, फिर उन्हीं विषयों के क्विज़ असली परीक्षा पैटर्न में दें, नकारात्मक अंकन सहित।' },
  { n: '3', title: 'ट्रैक करें और दोहराएँ', body: 'हर ग़लत उत्तर अपने-आप मिस्टेक नोटबुक में जाता है, ताकि दोहराव उसी पर टिके जो सचमुच ग़लत हुआ।' },
];

export const HINDI_HOME_FAQS = [
  { q: 'क्या Pariksha Saathi मुफ़्त है?', a: 'हाँ। हर पाठ, अभ्यास क्विज़, मॉक टेस्ट और करेंट अफेयर्स कैप्सूल मुफ़्त है, कोई पेवॉल नहीं।' },
  { q: 'क्या खाता बनाना ज़रूरी है?', a: 'नहीं। आप बिना खाते के पूरी पढ़ाई कर सकते हैं; प्रगति आपके डिवाइस पर सहेजी जाती है। मुफ़्त खाता तभी बनाएँ जब प्रगति को कई डिवाइस पर रखना हो।' },
  { q: 'क्या यह ऑफ़लाइन चलता है?', a: 'Android ऐप चलता है: पाठ, क्विज़ और अभ्यास उसमें शामिल हैं, इसलिए कमज़ोर या बिना नेटवर्क के भी काम करते हैं और नेटवर्क लौटते ही सिंक हो जाते हैं। इस वेबसाइट को इंटरनेट चाहिए, पर यह आपकी प्रगति डिवाइस पर सहेजती है।' },
  { q: 'करेंट अफेयर्स की सामग्री कहाँ से आती है?', a: 'हर करेंट अफेयर्स आइटम और परीक्षा सूचना अपने मूल आधिकारिक स्रोत — PIB या परीक्षा संस्था की अपनी वेबसाइट — से लिंक है, ताकि आप खुद जाँच सकें।' },
  { q: 'क्या Pariksha Saathi का SSC, IBPS या SBI से कोई संबंध है?', a: 'नहीं। Pariksha Saathi एक स्वतंत्र परियोजना है और SSC, IBPS, SBI या किसी सरकारी संस्था से संबद्ध नहीं है।' },
];

function subjectBlurbHi(subject) {
  return ['Quantitative Aptitude', 'Reasoning', 'English'].includes(subject)
    ? 'विषयवार अवधारणाएँ, हल किए हुए उदाहरण और अभ्यास।'
    : 'विषयवार मुख्य तथ्य, एक नज़र की दोहराव-सूची और अभ्यास प्रश्न।';
}

function dailyPdfSection() {
  const latest = DAILY_PDF_EDITIONS[0];
  if (!latest) return '';
  return `<section id="daily-pdf" class="pub-section"><div class="wrap"><div class="daily-pdf-card"><div><div class="eyebrow">दैनिक PDF</div><h2>दैनिक करेंट अफेयर्स PDF (हिंदी)</h2><p>नया संस्करण: ${esc(formatHubDate(latest.date, 'hi'))} · ${latest.pages} पृष्ठ · ${latest.sizeKb} KB। हर ख़बर अपने आधिकारिक स्रोत से लिंक, और अंत में ${latest.questions} अभ्यास प्रश्न उत्तर सहित।</p></div><div class="daily-pdf-actions"><a class="pub-cta" href="${esc(latest.file)}" download>PDF डाउनलोड करें</a><a href="/downloads/">सभी संस्करण और मासिक कैप्सूल &rarr;</a></div></div></div></section>`;
}

export function hindiHomeBody() {
  return `<div>
      <header class="pub-header">
        <div class="wrap pub-nav">
          <a class="pub-brand" href="/hi/"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a>
          <nav class="pub-nav-links">
            <a href="#features">सुविधाएँ</a>
            <a href="/hi/learn/">पाठ</a>
            <a href="/app/current-affairs/">करेंट अफेयर्स</a>
            <a href="#faq">सवाल-जवाब</a>
            <a href="/" lang="en">English</a>
          </nav>
          ${examsLinkHtml('hi')}<a class="pub-cta" href="/onboarding/">पढ़ाई शुरू करें</a>
        </div>
      </header>
      <div id="top" class="hero">
        <div class="hero-rules"></div>
        <div class="wrap hero-grid">
          <div>
            <div class="eyebrow">SSC &middot; बैंकिंग &middot; रेलवे &middot; पुलिस &middot; PSC</div>
            <h1>नेटवर्क कमज़ोर हो, <em>तैयारी नहीं।</em></h1>
            <p class="lede">SSC, Banking, Railway, Police और PSC की free तैयारी करें — lessons, quizzes, mock tests और current affairs के साथ।</p>
            <div class="cta-row">
              <a class="btn-primary-cream" href="/onboarding/">Free में शुरू करें</a>
              <a class="btn-ghost-cream" href="#features">अंदर क्या है, देखें</a>
            </div>
            <a class="hero-lang-switch" href="/" lang="en">Read this page in English &rarr;</a>
            <div class="exam-pills">${HERO_EXAMS.map(([id, name]) => `<a href="${examHubPath(id, 'hi')}">${name}</a>`).join('')}<a class="exam-pills-more" href="/hi/exams/">और परीक्षाएँ &rarr;</a></div>
            ${trustStatsHtml('hi')}
            ${trustLinesHtml('hi')}
          </div>
          <div class="phone-stack">
            <div class="phone-glow"></div>
            <div class="phone"><picture><source type="image/webp" srcset="/assets/screenshots/1-home-240.webp 240w, /assets/screenshots/1-home-480.webp 480w, /assets/screenshots/1-home-720.webp 720w" sizes="240px" /><img src="/assets/screenshots/1-home-480.jpg" srcset="/assets/screenshots/1-home-240.jpg 240w, /assets/screenshots/1-home-480.jpg 480w, /assets/screenshots/1-home-720.jpg 720w" sizes="240px" width="240" height="427" loading="lazy" decoding="async" alt="Pariksha Saathi ऐप की होम स्क्रीन: स्ट्रीक और कमज़ोर विषय का सुझाव" /></picture></div>
          </div>
        </div>
      </div>
      ${dailyPdfSection()}
      <section id="features" class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">अंदर क्या है</div>
            <h2>परीक्षा के लिए तैयार होने की हर चीज़</h2>
            <p>हर सुविधा एक असली ज़रूरत के इर्द-गिर्द बनी है: कमज़ोर नेटवर्क, साझा फ़ोन और सीमित बजट में पढ़ने वाले अभ्यर्थी।</p>
          </div>
          <div class="exam-coverage-grid">
            ${FEATURES.map((f) => `<div class="exam-coverage-item"><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></div>`).join('\n            ')}
          </div>
        </div>
      </section>
      <section class="pub-section pub-section-alt">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">यह कैसे काम करता है</div>
            <h2>तीन कदम, कोई इंस्टॉल नहीं</h2>
          </div>
          <div class="steps-grid">
            ${HOW_IT_WORKS.map((s) => `<div class="step"><div class="step-num">${s.n}</div><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div>`).join('\n            ')}
          </div>
        </div>
      </section>
      <section id="topic-lessons" class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">विषयवार पाठ</div>
            <h2>पाठ, मुफ़्त पढ़ें</h2>
            <p>वही विषय जो ऐप सिखाता है, हल सहित उदाहरणों या मुख्य तथ्यों और अभ्यास प्रश्नों वाले अलग पाठों के रूप में — पढ़ने के लिए खाते की ज़रूरत नहीं।</p>
          </div>
          <div class="exam-coverage-grid">${LESSON_SUBJECTS.map((subject) => `<div class="exam-coverage-item"><h3>${esc(LESSON_SUBJECTS_HI[subject] ?? subject)}</h3><p>${subjectBlurbHi(subject)}</p><a href="/hi/learn/#${subject.toLowerCase().replaceAll(' ', '-')}">${esc(LESSON_SUBJECTS_HI[subject] ?? subject)} के पाठ देखें →</a></div>`).join('')}</div>
          <p><a href="/hi/learn/">पूरी पाठ सूची देखें →</a></p>
        </div>
      </section>
      <section id="current-affairs" class="pub-section pub-section-alt">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">ताज़ा</div>
            <h2>करेंट अफेयर्स और परीक्षा सूचनाएँ</h2>
            <p>तारीख़ और स्रोत के साथ, हर आइटम मूल विज्ञप्ति या परीक्षा संस्था की वेबसाइट से जुड़ा हुआ।</p>
          </div>
          <div class="exam-coverage-grid">
            <div class="exam-coverage-item"><h3>करेंट अफेयर्स</h3><p>रोज़ के स्रोत-लिंक्ड कैप्सूल, हर एक के साथ उसी ख़बर पर एक अभ्यास प्रश्न। हिंदी और English, दोनों में।</p><a href="/app/current-affairs/">सभी करेंट अफेयर्स देखें →</a></div>
            <div class="exam-coverage-item"><h3>परीक्षा सूचनाएँ</h3><p>प्रवेश पत्र, परिणाम और अंतिम तिथियाँ, हर परीक्षा संस्था की अपनी वेबसाइट से जाँची हुई, और हर सूचना के साथ "आपके लिए इसका क्या मतलब है"।</p><a href="/app/exam-notices/">सभी परीक्षा सूचनाएँ देखें →</a></div>
            <div class="exam-coverage-item"><h3>परीक्षा पृष्ठ</h3><p>हर परीक्षा का आधिकारिक पैटर्न, अंक, नकारात्मक अंकन, आयु सीमा, तिथियाँ और जहाँ प्रकाशित हैं वहाँ कट-ऑफ — हर आँकड़ा अपने आधिकारिक दस्तावेज़ और जाँच की तारीख़ के साथ।</p><a href="/hi/exams/">अपनी परीक्षा चुनें →</a></div>
          </div>
        </div>
      </section>
      <section id="faq" class="pub-section">
        <div class="wrap">
          <div class="section-head">
            <div class="eyebrow">सवाल-जवाब</div>
            <h2>अक्सर पूछे जाने वाले सवाल</h2>
          </div>
          <div class="faq-list">
            ${HINDI_HOME_FAQS.map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n            ')}
          </div>
        </div>
      </section>
      <footer class="pub-footer">
        <div class="wrap">
          <div class="pub-footer-top">
            <div class="pub-footer-brand"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</div>
            <div class="pub-footer-links"><a href="/about/">परिचय और संपादकीय मानक</a>
              <a href="/privacy/">गोपनीयता नीति</a>
              <a href="/terms/">उपयोग की शर्तें</a>
              <a href="/account-deletion/">खाता हटाना</a>
              <a href="/contact/">संपर्क</a><a href="/downloads/">दैनिक PDF</a>
            ${socialLinksHtml()}</div>
          </div>
          <p class="disclaimer">Pariksha Saathi एक स्वतंत्र परियोजना है और SSC, IBPS, SBI या किसी सरकारी संस्था से संबद्ध नहीं है। खातों, अध्ययन-प्रगति और वेबसाइट डेटा की जानकारी के लिए हमारी <a href="/privacy/">गोपनीयता नीति</a> (अंग्रेज़ी में) देखें।</p>
        </div>
      </footer>
    </div>`;
}
