// /telegram/ - the landing page for paid promotion of the Telegram channel (an ad's link goes here when the ad platform
// will not link t.me directly). Hindi-first like the channel and the ads, plain HTML with no app script so it opens fast
// on mobile data, one action (Join), and only claims that are true today: what the server's jobs post
// (pariksha-saathi-server src/jobs/telegramJobs.js) and the newest edition's headlines as proof that it is live.
import { TELEGRAM_CHANNEL_URL, TELEGRAM_JOIN_URL } from '../data/socialLinks.mjs';

export const TELEGRAM_PAGE_PATH = '/telegram/';

const MONTHS = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
const dateHi = (iso) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function telegramPageMeta() {
  return {
    title: 'Pariksha Saathi Telegram: रोज़ सुबह 7 बजे करेंट अफेयर्स PDF, मुफ़्त',
    description: 'SSC, Railway और Bank की तैयारी के लिए रोज़ सुबह 7 बजे पिछले दिन के करेंट अफेयर्स का PDF, अभ्यास प्रश्न, शाम का क्विज़ और नई परीक्षा सूचनाएँ, आधिकारिक स्रोतों से। Telegram पर मुफ़्त जुड़ें।',
  };
}

/** `latest`: the newest edition's Hindi items (website order), shown as proof the channel is live. */
export function telegramPageBody(latest = []) {
  const handle = TELEGRAM_CHANNEL_URL.replace('https://t.me/', '@');
  const join = `<a class="tg-join" href="${esc(TELEGRAM_JOIN_URL)}" rel="noopener">Telegram पर जुड़ें &rarr;</a>`;
  const edition = latest.length
    ? `<section class="tg-latest"><h2>ताज़ा अंक: ${esc(dateHi(latest[0].editionDate.slice(0, 10)))}</h2><ul>${latest
        .slice(0, 3)
        .map((item) => `<li><a href="/app/current-affairs/${esc(item.id)}/">${esc(item.title)}</a></li>`)
        .join('')}</ul><p><a href="/daily-pdf">आज का PDF देखें &rarr;</a></p></section>`
    : '';
  return `<div class="tg-page">
  <header class="tg-top"><a href="/hi/"><img src="/assets/icon-96.png" width="48" height="48" alt="" />Pariksha Saathi</a></header>
  <main class="tg-landing">
    <p class="tg-kicker">Telegram चैनल · ${esc(handle)}</p>
    <h1>रोज़ सुबह 7 बजे करेंट अफेयर्स का PDF, मुफ़्त</h1>
    <p class="tg-lede">SSC, Railway, Bank और राज्य परीक्षाओं की तैयारी के लिए। हर खबर आधिकारिक PIB स्रोत से, उसके लिंक के साथ।</p>
    ${join}
    <ul class="tg-gets">
      <li><strong>☀️&nbsp; सुबह 7 बजे</strong> पिछले दिन के करेंट अफेयर्स, दैनिक PDF और अभ्यास प्रश्न</li>
      <li><strong>📢&nbsp; नई परीक्षा सूचनाएँ</strong> महत्वपूर्ण तिथियों और आधिकारिक लिंक के साथ</li>
      <li><strong>🧠&nbsp; शाम 6 बजे</strong> कल की खबरों पर एक क्विज़</li>
    </ul>
    ${edition}
    ${join}
    <p class="tg-trust">न कॉल, न लोन/EMI का प्रचार। सामग्री आधिकारिक विज्ञप्तियों से AI की सहायता से तैयार की जाती है; ग़लती दिखे तो <a href="/contact/">बताएँ</a>।</p>
    <p class="tg-en" lang="en">In English: a free current-affairs PDF on Telegram every morning at 7, from official sources, with practice questions, an evening quiz and new exam notices. Posts are in Hindi.</p>
  </main>
  <footer class="tg-foot"><a href="/about/">परिचय</a><a href="/privacy/">गोपनीयता नीति</a><a href="/contact/">संपर्क</a><a href="/hi/">parikshasaathi.com</a></footer>
</div>`;
}
