// "Report this question" on the web: a plain mailto with the question id, topic and language already in
// the body, so a report can be acted on without a back-and-forth (the id is the row the seed's fix lands
// on). Shared by the quiz result page, the inline current-affairs question and the prerendered static
// copy of that question, and mirrors the Android app's ShareActions.reportQuestion.
export const CONTACT_EMAIL = 'sriwastava2@gmail.com';

const LABEL = { en: 'Report this question', hi: 'इस प्रश्न की रिपोर्ट करें' };

export function reportQuestionLabel(lang = 'en') {
  return LABEL[lang] ?? LABEL.en;
}

export function reportQuestionMailto({ id, topicKey, languageCode, page }) {
  const subject = `Question report ${id}`;
  const lines = [`Question id: ${id}`, `Topic: ${topicKey ?? ''}`, `Language: ${languageCode ?? ''}`, `Page: ${page ?? ''}`, '', 'What is wrong (wrong answer, typo, translation, unclear question)?', ''];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

function esc(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

/** The link as static HTML, for the prerendered item pages. */
export function reportQuestionLinkHtml(question, lang, page) {
  return `<a class="report-question" href="${esc(reportQuestionMailto({ id: question.id, topicKey: question.topicKey, languageCode: question.languageCode ?? lang, page }))}">${esc(reportQuestionLabel(lang))}</a>`;
}
