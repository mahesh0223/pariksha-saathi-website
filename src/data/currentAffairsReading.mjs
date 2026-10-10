import { escapeHtml } from './publicPages.mjs';

// Each entry supplements one news item with standing, independently-verifiable
// background (civics/geography/science facts that outlast the headline) —
// kept separate from the sourced summary above it. Matched by PRID in the
// source URL, not by words in the headline, so it never misattaches to an
// unrelated story. Only add an entry here when the background facts are
// well-established and checkable against an authoritative reference; do not
// add commentary on numbers or claims that could change release to release.
const LEARNING_NOTES = [
  {
    match: /[?&]PRID=2319890(?:&|$)/i,
    en: {
      body: 'The Paris Agreement was adopted in 2015 and entered into force in 2016. Its temperature goal combines staying well below 2°C above pre-industrial levels with efforts toward 1.5°C. An NDC is a country’s climate action plan.',
      refUrl: 'https://unfccc.int/process-and-meetings/the-paris-agreement',
      refLabel: 'Reference: UNFCCC’s Paris Agreement explainer',
      checkQ: 'Check yourself: were adoption and entry into force in the same year?',
      checkA: 'No: adoption was in 2015; entry into force was in 2016. Keep the two milestones separate.',
      task: 'Revision task: separate what the speaker said in this news item from the standing facts about the treaty.',
    },
    hi: {
      body: 'पेरिस समझौता 2015 में अपनाया गया और 2016 में लागू हुआ। लक्ष्य: पूर्व-औद्योगिक स्तर से तापमान वृद्धि को 2°C से काफी नीचे रखना और 1.5°C तक सीमित करने का प्रयास करना। NDC देश की जलवायु कार्ययोजना है।',
      refUrl: 'https://unfccc.int/process-and-meetings/the-paris-agreement',
      refLabel: 'संदर्भ: UNFCCC का पेरिस समझौता परिचय',
      checkQ: 'खुद जाँचें: अपनाने और लागू होने का वर्ष समान था?',
      checkA: 'नहीं। 2015 में अपनाया गया; 2016 में लागू हुआ। दोनों घटनाएँ अलग हैं।',
      task: 'अभ्यास: खबर में दिए वक्तव्य और समझौते के स्थायी तथ्य की अलग सूची बनाएँ।',
    },
  },
  {
    match: /[?&]PRID=2320934(?:&|$)/i,
    en: {
      body: 'The GST Council is a constitutional body under Article 279A of the Constitution (inserted by the 101st Amendment, 2016). It is chaired by the Union Finance Minister, with the Union Minister of State for Finance and the finance/taxation minister of every state and union territory (that has a legislature) as members. The Council recommends GST rates, exemptions and model laws to the Union and State governments.',
      refUrl: 'https://gstcouncil.gov.in/',
      refLabel: 'Reference: GST Council’s official website',
      checkQ: 'Check yourself: are the GST Council’s recommendations legally binding on the Union and State governments by themselves?',
      checkA: 'No — the Supreme Court (Mohit Minerals, 2022) held that GST Council recommendations are recommendatory, not binding; they still need to be given effect through actual legislation or a notification by the competent government.',
      task: 'Revision task: note which proposal in this release still needs a notification or legislative change before it takes effect, versus what is already final.',
    },
    hi: {
      body: 'जीएसटी परिषद भारत के संविधान के अनुच्छेद 279A (101वें संविधान संशोधन, 2016 द्वारा जोड़ा गया) के अंतर्गत एक संवैधानिक निकाय है। इसकी अध्यक्षता केंद्रीय वित्त मंत्री करते हैं, और सदस्यों में केंद्रीय वित्त राज्य मंत्री तथा विधानसभा वाले हर राज्य/केंद्र-शासित प्रदेश के वित्त/कर मंत्री शामिल होते हैं। परिषद केंद्र और राज्य सरकारों को जीएसटी दरों, छूटों और मॉडल कानूनों की सिफारिश करती है।',
      refUrl: 'https://gstcouncil.gov.in/',
      refLabel: 'संदर्भ: जीएसटी परिषद की आधिकारिक वेबसाइट',
      checkQ: 'खुद जाँचें: क्या जीएसटी परिषद की सिफारिशें स्वयं केंद्र और राज्य सरकारों पर कानूनी रूप से बाध्यकारी हैं?',
      checkA: 'नहीं — सर्वोच्च न्यायालय (मोहित मिनरल्स, 2022) ने कहा कि जीएसटी परिषद की सिफारिशें केवल अनुशंसात्मक हैं, बाध्यकारी नहीं; उन्हें प्रभावी होने के लिए वास्तविक कानून या अधिसूचना के माध्यम से लागू किया जाना ज़रूरी है।',
      task: 'अभ्यास: इस खबर में बताए गए किस प्रस्ताव को प्रभावी होने के लिए अभी अधिसूचना या कानूनी बदलाव की ज़रूरत है, और क्या पहले से अंतिम है — इसकी पहचान करें।',
    },
  },
];

export function learningNote(item, lang = 'en') {
  // Match the source, not words in an unrelated headline; news claims remain in the sourced summary.
  const entry = LEARNING_NOTES.find((note) => note.match.test(item.sourceUrl));
  if (!entry) return '';
  const hi = lang === 'hi';
  const c = hi ? entry.hi : entry.en;
  return `<section class="news-learning"><h2>${hi ? 'पढ़ाई के लिए संदर्भ' : 'Learning context'}</h2><p>${c.body}</p><p><a href="${c.refUrl}" target="_blank" rel="noreferrer">${c.refLabel}</a></p><details><summary>${c.checkQ}</summary><p>${c.checkA}</p></details><p>${c.task}</p></section>`;
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
