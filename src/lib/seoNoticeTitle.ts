import type { ExamUpdateType } from '../types/api';

// Real government/exam-body titles ("Corrigendum and updated vacancy count released") read well
// but rarely match how an anxious candidate actually searches ("IBPS clerk vacancy 2026"). This
// builds a <title>-tag-only prefix from the structured examId/type fields - never touching the
// on-page H1 or the original title, which stay as the authentic wording - so the title visible
// in search results leads with the exact long-tail phrase people type, without duplicating it
// when the original title already contains it.
export const EXAM_NAMES: Record<string, string> = {
  ssc_cgl: 'SSC CGL',
  ssc_chsl: 'SSC CHSL',
  ssc_mts: 'SSC MTS',
  ibps_po: 'IBPS PO',
  ibps_clerk: 'IBPS Clerk',
  sbi_po: 'SBI PO',
  sbi_clerk: 'SBI Clerk',
};

export const TYPE_LABELS: Record<ExamUpdateType, string> = {
  ADMIT_CARD: 'Admit Card',
  RESULT: 'Result',
  ANSWER_KEY: 'Answer Key',
  NOTIFICATION: 'Notification',
  DEADLINE: 'Deadline',
};

// A handful of synonyms real notices already use in place of the canonical type label - treated
// as already covering that keyword so the prefix doesn't bolt on a redundant "Admit Card:" next
// to an original title that already says "call letter".
const TYPE_SYNONYMS: Partial<Record<ExamUpdateType, RegExp>> = {
  ADMIT_CARD: /call letter|admit card/i,
  RESULT: /\bresult\b|\bscores?\b/i,
  ANSWER_KEY: /answer key/i,
  DEADLINE: /deadline|last date|extended/i,
};

export function seoNoticeTitle(examId: string, type: ExamUpdateType, title: string, year: string): string {
  const examName = EXAM_NAMES[examId];
  const typeLabel = TYPE_LABELS[type];
  if (!examName || !typeLabel) return title;

  const lower = title.toLowerCase();
  const hasExam = lower.includes(examName.toLowerCase());
  const hasType = lower.includes(typeLabel.toLowerCase()) || (TYPE_SYNONYMS[type]?.test(title) ?? false);

  // Only add what's actually missing - prepending the exam name when it's already there (even if
  // the type keyword isn't) is exactly the redundant "SBI PO Admit Card: SBI PO ..." this exists
  // to avoid.
  const examPart = hasExam ? '' : `${examName} `;
  const typePart = hasType ? '' : `${typeLabel} ${year}: `;
  return `${examPart}${typePart}${title}`;
}
