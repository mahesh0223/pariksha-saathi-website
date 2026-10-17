import type { ExamFact, ExamUpdateNotice } from '../types/api';

export interface CalendarRow {
  examId: string;
  date: string;
  to: string | null;
  label: string;
  sourceUrl: string;
  verifiedAt: string;
  origin: 'fact' | 'notice';
}

export interface CalendarGroup {
  key: string;
  label: string;
  rows: CalendarRow[];
}

export const CALENDAR_LINK: Record<'en' | 'hi', { href: string; label: string }>;
export const UNCERTAIN_DATE: RegExp;
export function examCalendarPath(lang: string): string;
export function calendarRows(args: {
  factsByExam?: Record<string, ExamFact[]>;
  noticesByExam?: Record<string, ExamUpdateNotice[]>;
  lang?: string;
  today: string;
}): CalendarGroup[];
export function calendarSummary(groups: CalendarGroup[]): { total: number; examCount: number; lastVerified?: string };
export function examCalendarBody(args: { groups: CalendarGroup[]; lang?: string }): string;
export function examCalendarMeta(lang: string, summary: { total: number; examCount: number }): { title: string; description: string };
