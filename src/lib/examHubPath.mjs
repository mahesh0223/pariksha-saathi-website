// The handful of exam-hub helpers that the entry bundle needs on every page (route table in
// App.tsx, hero exam pills on the landing page, the daily-PDF band's date) - split out of
// examHub.mjs, whose page builders and bilingual label tables (~28 KB) only the lazily loaded
// ExamHubPage and the prerender script need. examHub.mjs re-exports these, so existing imports
// keep working; import from here when the importer ships in the entry chunk.

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
};

export function formatHubDate(iso, lang) {
  const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number);
  return `${d} ${MONTHS[lang][m - 1]} ${y}`;
}

export function examHubSlug(examId) {
  return examId.replace(/_/g, '-');
}
export function examHubPath(examId, lang) {
  return `${lang === 'hi' ? '/hi' : ''}/exams/${examHubSlug(examId)}/`;
}
