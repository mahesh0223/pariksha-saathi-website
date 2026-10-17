// SSC typing / data-entry practice (/typing-test/, /hi/typing-test/). Every number below is copied from an official
// document, with the paragraph it sits in; the build re-checks the numbers against the published exam fact sheets
// (scripts/prerender.mjs) so a new notice cannot silently leave this page stale. Passages are original practice text
// written for Pariksha Saathi (AI-drafted) - not past SSC passages, which we do not have and never reconstruct.

export const TYPING_CHECKED = '2026-10-17';

export const TYPING_SOURCES = {
  chsl: {
    url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_chsl_2026.pdf',
    title: { en: 'SSC CHSL 2026 notice', hi: 'SSC CHSL 2026 अधिसूचना' },
  },
  cgl: {
    url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf',
    title: { en: 'SSC CGL 2026 notice', hi: 'SSC CGL 2026 अधिसूचना' },
  },
  guidelines: {
    // The notices say skill-test evaluation follows guidelines on SSC's website and that the regional offices issue
    // the detailed instructions; this is SSC Eastern Region's copy of the June 2022 revision.
    url: 'https://sscer.org/matter/TypeDEST_Guidelines_20062022',
    title: { en: 'SSC: Revised guidelines for evaluation of typing test/DEST scripts (June 2022)', hi: 'SSC: टाइपिंग टेस्ट/DEST उत्तर-पत्रों के मूल्यांकन के संशोधित दिशानिर्देश (जून 2022)' },
  },
};

export const TYPING_MODES = [
  {
    key: 'dest',
    lang: 'en',
    minutes: 15,
    name: { en: 'CGL Tier-II DEST / CHSL DEO (other departments)', hi: 'CGL टियर-II DEST / CHSL DEO (अन्य विभाग)' },
    passageKd: [2000, 2200],
    targetKdph: 8000,
    maxErrors: { UR: 20, 'OBC/EWS': 25, others: 30 },
    rules: {
      en: [
        'CGL Tier-II: a passage of about 2,000 key depressions in 15 minutes; qualifying. Maximum errors allowed: 20% (UR), 25% (OBC/EWS), 30% (all other categories); higher standards for posts such as Tax Assistant. (CGL notice, paras 13.9.10 and 16.2)',
        'CHSL Data Entry Operator in departments other than those named in the notice: 8,000 key depressions per hour, judged on a passage of about 2,000-2,200 key depressions in 15 minutes. (CHSL notice, para 13.9.13.6(iii))',
      ],
      hi: [
        'CGL टियर-II: 15 मिनट में लगभग 2,000 की-डिप्रेशन का अनुच्छेद; केवल अर्हक। अनुमत अधिकतम त्रुटियाँ: 20% (UR), 25% (OBC/EWS), 30% (अन्य सभी श्रेणियाँ); कर सहायक जैसे पदों के लिए ऊँचे मानक। (CGL अधिसूचना, अनुच्छेद 13.9.10 और 16.2)',
        'अधिसूचना में बताए विभागों के अलावा अन्य विभागों में CHSL डेटा एंट्री ऑपरेटर: 8,000 की-डिप्रेशन प्रति घंटा, 15 मिनट में लगभग 2,000-2,200 की-डिप्रेशन के अनुच्छेद पर जाँचा जाता है। (CHSL अधिसूचना, अनुच्छेद 13.9.13.6(iii))',
      ],
    },
    sources: ['cgl', 'chsl', 'guidelines'],
  },
  {
    key: 'deo-a',
    lang: 'en',
    minutes: 15,
    name: { en: 'CHSL DEO in the named ministries (15,000 KDPH)', hi: 'नामित मंत्रालयों में CHSL DEO (15,000 KDPH)' },
    passageKd: [3700, 4000],
    targetKdph: 15000,
    rules: {
      en: ['CHSL Data Entry Operator in the departments named in the notice: 15,000 key depressions per hour, judged on a passage of about 3,700-4,000 key depressions in 15 minutes. (CHSL notice, para 13.9.13.6(ii))'],
      hi: ['अधिसूचना में नामित विभागों में CHSL डेटा एंट्री ऑपरेटर: 15,000 की-डिप्रेशन प्रति घंटा, 15 मिनट में लगभग 3,700-4,000 की-डिप्रेशन के अनुच्छेद पर जाँचा जाता है। (CHSL अधिसूचना, अनुच्छेद 13.9.13.6(ii))'],
    },
    sources: ['chsl', 'guidelines'],
  },
  {
    key: 'ldc-en',
    lang: 'en',
    minutes: 10,
    name: { en: 'CHSL LDC/JSA typing test (English, 35 w.p.m.)', hi: 'CHSL LDC/JSA टाइपिंग टेस्ट (अंग्रेज़ी, 35 w.p.m.)' },
    passageKd: [2500, 2800],
    targetWpm: 35,
    rules: {
      en: ['CHSL Lower Division Clerk / Junior Secretariat Assistant, English medium: 35 words per minute, which the notice says corresponds to about 10,500 key depressions per hour, judged on the accuracy of typing a given passage in 10 minutes. (CHSL notice, para 13.9.13.7)'],
      hi: ['CHSL लोअर डिवीज़न क्लर्क / जूनियर सचिवालय सहायक, अंग्रेज़ी माध्यम: 35 शब्द प्रति मिनट, जो अधिसूचना के अनुसार लगभग 10,500 की-डिप्रेशन प्रति घंटा के बराबर है; 10 मिनट में दिए गए अनुच्छेद को टाइप करने की शुद्धता पर जाँचा जाता है। (CHSL अधिसूचना, अनुच्छेद 13.9.13.7)'],
    },
    sources: ['chsl', 'guidelines'],
  },
  {
    key: 'ldc-hi',
    lang: 'hi',
    minutes: 10,
    name: { en: 'CHSL LDC/JSA typing test (Hindi, 30 w.p.m.)', hi: 'CHSL LDC/JSA टाइपिंग टेस्ट (हिंदी, 30 w.p.m.)' },
    passageKd: [2200, 2800],
    targetWpm: 30,
    rules: {
      en: [
        'CHSL LDC/JSA, Hindi medium: 30 words per minute, about 9,000 key depressions per hour, in 10 minutes. Hindi typing in the exam must be in the Mangal font; any other font means non-qualification. (CHSL notice, para 13.9.13.7)',
        'Here you type with your own Hindi keyboard (Inscript, Remington or a phonetic one); the page compares the Unicode text, which is what Mangal displays.',
      ],
      hi: [
        'CHSL LDC/JSA, हिंदी माध्यम: 30 शब्द प्रति मिनट, लगभग 9,000 की-डिप्रेशन प्रति घंटा, 10 मिनट में। परीक्षा में हिंदी टाइपिंग मंगल फ़ॉन्ट में ही करनी होती है; किसी अन्य फ़ॉन्ट के प्रयोग पर अभ्यर्थी अयोग्य हो जाता है। (CHSL अधिसूचना, अनुच्छेद 13.9.13.7)',
        'यहाँ आप अपने हिंदी कीबोर्ड (इनस्क्रिप्ट, रेमिंगटन या फ़ोनेटिक) से टाइप करते हैं; पेज यूनिकोड पाठ की तुलना करता है, जिसे मंगल फ़ॉन्ट दिखाता है।',
      ],
    },
    sources: ['chsl', 'guidelines'],
  },
];

// Original practice passages (AI-drafted for Pariksha Saathi), single paragraphs of plain prose with no figures that
// could date or be wrong. A mode builds its passage from consecutive entries, cut at a sentence end to land in its
// passageKd range (see passageFor).
export const PASSAGES = {
  en: [
    'A public library is one of the few places in a town where anyone may walk in, sit down and read without being asked to buy anything. For many students it is the first quiet room they have ever had for study. The shelves hold books that a single family could never afford, and the reading room keeps newspapers that would otherwise be read once and thrown away. A good librarian does far more than issue books and collect fines. She knows which shelves the students use before their examinations, which old magazines are asked for again and again, and which corner of the hall stays cool in the afternoon. When a reader cannot find a book, she remembers who borrowed it last and when it is due back. Libraries also keep a memory of the place they serve. Old maps, records of local events and the papers of people who once lived nearby are often kept in a cupboard that few visitors open. Researchers travel long distances to read such papers, and a careful library protects them from damp, insects and careless hands. In recent years many libraries have added computers, so that a student can fill in an application form, read a notice or check a result without paying a shop for the service. The rules of a library are simple, and they exist for the sake of every reader. Books must be returned on time, pages must not be torn or marked, and the room must be kept quiet. A reader who follows these rules helps the next reader as much as himself. In this way a library teaches patience and respect for shared things, lessons that are as useful in an office as in a classroom.',
    'Every government office depends on records that are complete, correct and easy to find. A file that is missing a single letter can delay a decision for weeks, and a register that is filled in carelessly can lead to a payment being made twice or not at all. For this reason, a clerk who keeps records well is valued in any department. The first rule is to write or enter information at the time the work is done, not from memory at the end of the day. The second rule is to use the same form of a name, a date or a reference number every time, so that a search for one entry does not miss another. When a letter is received, it should be entered in the register, given a number and placed in the right file on the same day. When a reply is sent, the file should show what was sent, to whom and on which date. Data entry on a computer follows the same principles. An operator who types quickly but leaves out words or changes the order of figures creates more work than one who types steadily and checks each line. Most mistakes can be found by reading the entry once against the original before moving on. Spaces, capital letters and punctuation marks matter as much as the words themselves, because a search may treat two slightly different entries as two different records. Good habits of this kind are not learnt in a day. They come from practice, from paying attention to small details and from taking pride in work that others will rely on long after it has been finished. A well kept office is quiet, orderly and quick to answer the public, and its records are its strongest support.',
    'Water that reaches a house through a tap has travelled a long way, and it has been cleaned, stored and pumped at a cost that most families never see. Saving it at home is therefore one of the simplest ways in which an ordinary citizen can help the whole community. A leaking tap can waste a surprising amount in a single day, and fixing it usually needs nothing more than a new washer. A bucket used for bathing instead of a running shower, and a mug used for brushing the teeth instead of an open tap, make a real difference over a month. Water that has been used to wash vegetables can be given to plants in the courtyard rather than poured down the drain. Many households collect rainwater from the roof during the monsoon and store it for washing and cleaning. Where the ground allows it, rainwater can also be led into a pit so that it soaks into the soil and raises the level of the water below the ground. Villages that look after their ponds and tanks find that their wells do not run dry so early in the summer. Schools can play a large part in this work. When children learn to close taps, report leaks and respect shared sources of water, they carry the habit home and teach their families. Saving water is not a task for one day of the year or for one season. It is a daily practice, and like every good habit it becomes easier the longer it is followed. A town in which every family saves a little has enough for everyone, even in a dry year.',
    'Students who prepare for a competitive examination often find that the hardest part is not any one subject but the use of time. A timetable helps only if it is realistic. It should begin from the hours that are truly free each day, leave room for meals, travel and rest, and give each subject a fixed place in the week. Difficult topics are best studied when the mind is fresh, which for most people means the morning. Revision deserves as much time as new learning, because a chapter read once and never seen again is soon forgotten. Short tests taken every few days show which parts have been understood and which need another reading. Mistakes made in these tests should be written down in a notebook, together with the correct method, and the notebook should be read again before the examination. Practice under a time limit is important, since an examination rewards the candidate who can answer accurately within the time allowed, not the one who knows the most but finishes the least. Sleep, exercise and regular meals are part of preparation, not a distraction from it. A tired mind reads the same line three times and remembers none of it. It also helps to study with a friend now and then, to explain a topic aloud and to hear another way of solving a problem. Finally, a candidate should read every official notice carefully, note the dates and keep the required documents ready, so that a small oversight does not undo months of honest work. Preparation of this kind is steady rather than dramatic, and it is the steady student who most often succeeds.',
  ],
  hi: [
    'समय का सही उपयोग हर विद्यार्थी के लिए सबसे बड़ी पूँजी है। जो समय एक बार बीत जाता है वह फिर लौटकर नहीं आता, इसलिए दिन की शुरुआत से ही यह तय कर लेना चाहिए कि कौन-सा काम कब करना है। सुबह का समय कठिन विषयों के लिए सबसे अच्छा माना जाता है, क्योंकि उस समय मन शांत और ताज़ा रहता है। पढ़ाई के बीच थोड़ा आराम लेना भी ज़रूरी है, नहीं तो थका हुआ मन एक ही पंक्ति को बार-बार पढ़ता है और कुछ याद नहीं रख पाता। हर सप्ताह के अंत में यह देखना चाहिए कि बनाई गई योजना कितनी पूरी हुई और कहाँ सुधार की ज़रूरत है। छोटी-छोटी परीक्षाएँ देकर अपनी कमज़ोरियों को पहचानना और उन्हें एक कॉपी में लिख लेना बहुत लाभदायक होता है। जो विद्यार्थी नियमित रूप से थोड़ा-थोड़ा पढ़ता है, वह परीक्षा के समय घबराता नहीं है।',
    'पेड़-पौधे हमारे जीवन का आधार हैं। वे हमें छाया, फल, लकड़ी और शुद्ध हवा देते हैं, और धरती की मिट्टी को बहने से रोकते हैं। गाँवों में पुराने लोग आज भी बड़े पेड़ों की छाया में बैठकर पंचायत करते हैं और बच्चे उनकी डालियों पर झूला डालकर खेलते हैं। शहरों में बढ़ती इमारतों के बीच पेड़ों की संख्या कम होती जा रही है, जिससे गर्मी और धूल दोनों बढ़ती हैं। हर परिवार यदि अपने घर के आसपास एक पौधा लगाए और उसे बड़ा होने तक पानी दे, तो कुछ ही वर्षों में मोहल्ले का रूप बदल सकता है। विद्यालयों में बच्चों को पौधे लगाने और उनकी देखभाल करने की ज़िम्मेदारी देना एक अच्छी आदत डालने जैसा है। पेड़ लगाना जितना आसान है, उसे बचाए रखना उतना ही ज़रूरी है।',
    'स्वच्छता केवल सफ़ाई कर्मचारियों की ज़िम्मेदारी नहीं है, बल्कि हर नागरिक का कर्तव्य है। यदि हर परिवार अपने घर का कचरा अलग-अलग डिब्बों में रखे, तो उसे सही ढंग से निपटाना आसान हो जाता है। गीले कचरे से खाद बनाई जा सकती है और सूखे कचरे का बड़ा हिस्सा फिर से काम में लाया जा सकता है। सड़क पर कचरा फेंकना, नालियों में प्लास्टिक डालना और सार्वजनिक स्थानों को गंदा करना पूरे समाज को नुकसान पहुँचाता है। साफ़ मोहल्ले में बीमारियाँ कम फैलती हैं और बच्चे खुले में खेल सकते हैं। विद्यालयों में स्वच्छता के छोटे-छोटे कार्यक्रम बच्चों में अच्छी आदतें डालते हैं, जिन्हें वे अपने घर तक ले जाते हैं। स्वच्छता एक दिन का अभियान नहीं, रोज़ की आदत है।',
    'पुस्तकालय ज्ञान का ऐसा भंडार है जिसका लाभ हर कोई उठा सकता है। जो विद्यार्थी महँगी किताबें नहीं ख़रीद सकते, उनके लिए पुस्तकालय पढ़ाई का सबसे बड़ा सहारा होता है। वहाँ का शांत वातावरण मन को एकाग्र रखने में मदद करता है और समाचार-पत्र पढ़कर देश-दुनिया की जानकारी भी मिलती है। पुस्तकालय के नियम सरल होते हैं, जैसे किताबें समय पर लौटाना, पन्ने न फाड़ना और धीमे स्वर में बात करना। ये नियम सबकी सुविधा के लिए बनाए जाते हैं। जो पाठक इन नियमों का पालन करता है, वह अपने साथ-साथ दूसरे पाठकों की भी मदद करता है। इस तरह पुस्तकालय हमें साझा चीज़ों का सम्मान करना सिखाता है।',
    'गाँव के जीवन में डाकघर का एक खास स्थान रहा है। पहले लोग अपने परिवार की खबरें चिट्ठियों के सहारे पाते थे और डाकिया हर घर का जाना-पहचाना चेहरा होता था। आज भी डाकघर केवल चिट्ठियाँ पहुँचाने का काम नहीं करता, बल्कि बचत खाते, पेंशन और कई सरकारी सेवाओं को लोगों तक पहुँचाता है। जिन गाँवों में बैंक की शाखा दूर है, वहाँ के लोग अपनी छोटी-छोटी बचत डाकघर में जमा करते हैं। डाकघर का कर्मचारी जब हर काम को समय पर और सही ढंग से दर्ज करता है, तो लोगों का भरोसा बढ़ता है। किसी पत्र या धनराशि का सही व्यक्ति तक पहुँचना छोटी बात लगती है, पर उसके पीछे बहुत सावधानी और ईमानदारी छिपी होती है। यही कारण है कि गाँव के लोग डाकघर को अपनी सेवा करने वाली संस्था मानते हैं।',
  ],
};

/** The sentences of a passage, each with its closing mark - so a long mode can stop at a sentence end. */
function sentences(text) {
  return text.match(/[^.।?!]+[.।?!]+/gu) ?? [text];
}

/**
 * The passage a mode uses for practice round `round` (0, 1, 2...): consecutive passages in the mode's language,
 * whole sentences only, never the same passage twice, until its length (key depressions = characters, spaces
 * included) reaches the mode's passageKd range without passing its top.
 */
export function passageFor(modeKey, round = 0) {
  const mode = TYPING_MODES.find((m) => m.key === modeKey) ?? TYPING_MODES[0];
  const pool = PASSAGES[mode.lang];
  const [min, max] = mode.passageKd;
  let text = '';
  for (let k = 0; k < pool.length && text.length < min; k++) {
    for (const sentence of sentences(pool[(round + k) % pool.length])) {
      const next = text ? `${text} ${sentence.trim()}` : sentence.trim();
      if (next.length > max) break;
      text = next;
    }
  }
  return text;
}
