// Type declarations for examJobProfiles.mjs - see examSyllabi.d.mts for why this is separate
// from the data file itself.

export interface JobProfilePost {
  name: string;
  body: string;
}

export interface JobProfileContent {
  pageTitle: string;
  lede: string;
  profileHeading: string;
  profileBody: string[];
  /** Only set for exams that recruit into several distinct posts (SSC CGL, SSC CHSL) - omitted
   * for single-role exams (IBPS/SBI PO and Clerk), where profileBody alone covers the role. */
  postsHeading?: string;
  posts?: JobProfilePost[];
  promotionHeading: string;
  promotionBody: string[];
  salaryHeading: string;
  salaryBody: string[];
  perksHeading: string;
  perks: string[];
  note: string;
  noteLinkLabel: string;
  recruitsHeading: string;
  recruitsBody: string;
  offerHeading: string;
  offerBody: string;
  sourceHeading: string;
  officialLinkLabel: string;
  examNoticesLinkLabel: string;
  syllabusLinkLabel: string;
  ctaLabel: string;
  backLabel: string;
  disclaimer: string;
}

export interface ExamJobProfileEntry {
  slug: string;
  examName: string;
  officialUrl: string;
  en: JobProfileContent;
  hi: JobProfileContent;
}

export const EXAM_JOB_PROFILES: ExamJobProfileEntry[];
export function findJobProfileEntry(slug: string): ExamJobProfileEntry | undefined;
