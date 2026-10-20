// "Join on Telegram" box for the pages people read for current affairs and notices: item pages, notice pages, exam
// hubs and /downloads/. Plain HTML so the prerender and the React pages share one builder. What it promises is what the
// server's 07:00 IST job (pariksha-saathi-server src/jobs/telegramDigest.js) posts: the previous day's Hindi current
// affairs, with the daily PDF attached when it exists - so the English copy says the posts are in Hindi.
import { TELEGRAM_CHANNEL_URL } from '../data/socialLinks.mjs';

const T = {
  en: {
    lead: 'Every morning at 7 on Telegram:',
    body: "the previous day's current affairs with the daily PDF, from official sources (posts are in Hindi).",
    join: 'Join on Telegram',
  },
  hi: {
    lead: 'रोज़ सुबह 7 बजे Telegram पर:',
    body: 'पिछले दिन के करेंट अफेयर्स और दैनिक PDF, आधिकारिक स्रोतों से।',
    join: 'Telegram पर जुड़ें',
  },
};

export function telegramCtaHtml(lang = 'en') {
  const t = T[lang] ?? T.en;
  return `<aside class="tg-cta"><p><strong>${t.lead}</strong> ${t.body}</p><a class="tg-cta-join" href="${TELEGRAM_CHANNEL_URL}" target="_blank" rel="noopener">${t.join} &rarr;</a></aside>`;
}
