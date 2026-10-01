// Type declarations for examSyllabi.mjs - kept as a separate .d.mts (not inline in the .mjs
// itself) so the data file stays plain, Node-version-agnostic JavaScript. See examSyllabi.mjs's
// own header comment for why this isn't a .ts file.

export interface SyllabusStage {
  name: string;
  body: string;
}

export interface SyllabusContent {
  pageTitle: string;
  lede: string;
  stagesHeading: string;
  stages: SyllabusStage[];
  subjectsHeading: string;
  subjects: SyllabusStage[];
  note: string;
  noteLinkLabel: string;
  recruitsHeading: string;
  recruitsBody: string;
  offerHeading: string;
  offerBody: string;
  sourceHeading: string;
  officialLinkLabel: string;
  examNoticesLinkLabel: string;
  ctaLabel: string;
  backLabel: string;
  disclaimer: string;
}

export interface ExamSyllabusEntry {
  slug: string;
  examName: string;
  officialUrl: string;
  en: SyllabusContent;
  hi: SyllabusContent;
}

export const EXAM_SYLLABI: ExamSyllabusEntry[];
export function findSyllabusEntry(slug: string): ExamSyllabusEntry | undefined;
