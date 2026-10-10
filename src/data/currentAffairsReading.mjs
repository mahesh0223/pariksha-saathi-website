import { escapeHtml } from './publicPages.mjs';
export function learningNote(item, lang = 'en') {
  // Match the source, not words in an unrelated headline; news claims remain in the sourced summary.
  if (!/[?&]PRID=2319890(?:&|$)/i.test(item.sourceUrl)) return '';
  const hi = lang === 'hi';
  return `<section class="news-learning"><h2>${hi ? 'पढ़ाई के लिए संदर्भ' : 'Learning context'}</h2><p>${hi ? 'पेरिस समझौता 2015 में अपनाया गया और 2016 में लागू हुआ। लक्ष्य: पूर्व-औद्योगिक स्तर से तापमान वृद्धि को 2°C से काफी नीचे रखना और 1.5°C तक सीमित करने का प्रयास करना। NDC देश की जलवायु कार्ययोजना है।' : 'The Paris Agreement was adopted in 2015 and entered into force in 2016. Its temperature goal combines staying well below 2°C above pre-industrial levels with efforts toward 1.5°C. An NDC is a country’s climate action plan.'}</p><p><a href="https://unfccc.int/process-and-meetings/the-paris-agreement" target="_blank" rel="noreferrer">${hi ? 'संदर्भ: UNFCCC का पेरिस समझौता परिचय' : 'Reference: UNFCCC’s Paris Agreement explainer'}</a></p><details><summary>${hi ? 'खुद जाँचें: अपनाने और लागू होने का वर्ष समान था?' : 'Check yourself: were adoption and entry into force in the same year?'}</summary><p>${hi ? 'नहीं। 2015 में अपनाया गया; 2016 में लागू हुआ। दोनों घटनाएँ अलग हैं।' : 'No: adoption was in 2015; entry into force was in 2016. Keep the two milestones separate.'}</p></details><p>${hi ? 'अभ्यास: खबर में दिए वक्तव्य और समझौते के स्थायी तथ्य की अलग सूची बनाएँ।' : 'Revision task: separate what the speaker said in this news item from the standing facts about the treaty.'}</p></section>`;
}
export function currentAffairsDigest(items, lang = 'en') {
  const groups = new Map();
  for (const item of [...items].sort((a,b)=>b.editionDate.localeCompare(a.editionDate))) {
    const date = item.editionDate.slice(0,10);
    if (!groups.has(date)) groups.set(date,[]);
    groups.get(date).push(item);
  }
  const hi = lang === 'hi';
  return `<h1>${hi ? 'समसामयिकी: दैनिक पठन' : 'Current affairs: daily reading'}</h1><p>${hi ? 'तारीख के अनुसार पूरी खबरें पढ़ें। प्रत्येक खबर के लिए घटना, संबंधित संस्था और स्थिति (प्रस्ताव, घोषणा या लागू निर्णय) लिखें। फिर आधिकारिक स्रोत से जाँचें।' : 'Read the full summaries by date. For each item, note the event, the responsible institution and its status: proposal, announcement or implemented decision. Check the linked official source before adding it to your revision notes.'}</p><p><a href="/app/current-affairs-quiz">${hi ? 'साप्ताहिक समसामयिकी क्विज़' : 'Practise with the weekly current-affairs quiz'} →</a> · <a href="/about/">${hi ? 'संपादकीय मानक और सुधार' : 'Editorial standards & corrections'}</a></p>${[...groups].map(([date,entries],i)=>`<details class="daily-reading" ${i===0?'open':''}><summary>${escapeHtml(date)} · ${entries.length} ${hi?'खबरें':'items'}</summary>${entries.map(item=>`<article class="detail-page"><h2><a href="/app/current-affairs/${encodeURIComponent(item.id)}/">${escapeHtml(item.title)}</a></h2><p class="detail-body">${escapeHtml(item.summary)}</p><p><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">${hi?'आधिकारिक स्रोत':'Official source'}: ${escapeHtml(item.sourceName)} ↗</a></p>${learningNote(item,lang)}</article>`).join('')}</details>`).join('')}`;
}
