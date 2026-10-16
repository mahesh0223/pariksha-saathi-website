// The byline and closing line of a lesson page, shared by the React page and the prerender so they cannot
// drift. Hand-written lessons carry the founder's byline. General Awareness lessons are AI-drafted, so they
// say so instead (entry.credit === 'ai-assisted') - a human byline on text no human has line-edited would
// be a claim we cannot back.

export function isAiAssisted(entry) {
  return entry.credit === 'ai-assisted';
}

export function lessonCredit(entry, lang) {
  const date = entry.publishedDate;
  if (isAiAssisted(entry)) {
    // The Hindi text of every GA lesson was read against its English twin and approved by the publisher on
    // 16 October 2026 (pariksha-saathi/docs/HINDI_SIGNOFF.md, batch 7); the English has not had that reading,
    // so only the Hindi line says so. Both keep the AI-assistance credit - the drafting did not change.
    return lang === 'hi'
      ? { text: `AI की सहायता से तैयार किया गया और ${date} को तथ्यों की जाँच की गई; हिन्दी पाठ को प्रकाशक ने 16 अक्टूबर 2026 को पढ़कर स्वीकृत किया। कोई गलती दिखे तो हमें बताइए।`, link: 'संपादकीय मानक और सुधार' }
      : { text: `Drafted with AI assistance and fact-checked on ${date}; not yet read line by line by a human editor. Spotted a mistake? Tell us.`, link: 'Editorial standards & corrections' };
  }
  return lang === 'hi'
    ? { text: `लेखक: महेश श्रीवास्तव, परीक्षा साथी के संस्थापक। प्रकाशित: ${date}।`, link: 'संपादकीय मानक और सुधार' }
    : { text: `Written by Mahesh Srivastava, Founder of Pariksha Saathi. Published: ${date}.`, link: 'Editorial standards & corrections' };
}

export function lessonClosing(entry, lang) {
  if (entry.en.keyFacts?.length) {
    return lang === 'hi'
      ? 'पहले उत्तर याद करने की कोशिश करें, फिर उसे खोलें; जो चूक जाए उसे दोबारा पढ़ें।'
      : 'Try to recall the answer before opening it, then revisit the ones you missed.';
  }
  return lang === 'hi'
    ? 'ऊपर के प्रश्न हल करें और उत्तर से अपनी विधि जाँचें।'
    : 'Solve the questions above before opening the answers. Explain each step in your own words, then revisit any mistakes.';
}

export function lessonAuthor(entry) {
  return isAiAssisted(entry)
    ? { '@type': 'Organization', name: 'Pariksha Saathi' }
    : { '@type': 'Person', name: 'Mahesh Srivastava' };
}

// One line under each subject on the home page: Quant/Reasoning/English lessons are worked solutions, the
// General Awareness, state GK and teaching sets are key facts plus practice questions.
export function subjectBlurb(subject) {
  return ['Quantitative Aptitude', 'Reasoning', 'English'].includes(subject)
    ? 'Browse concepts, worked examples and practice by topic.'
    : 'Browse key facts, a one-glance revision list and practice questions by topic.';
}
