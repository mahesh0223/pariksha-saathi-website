import type { Topic } from '../types/api';

// Mirrors pariksha-saathi (Android) ui/common/TopicGrouping.kt exactly, including this exact set
// of keys - non-MCQ recruitment stages (interviews, physical tests, etc.) that are real content
// worth browsing in Study, but can never be turned into a quiz.
export const INFO_ONLY_TOPIC_KEYS = new Set([
  'INTERVIEW_PREP',
  'GROUP_EXERCISE',
  'PSYCHOMETRIC_TEST',
  'DESCRIPTIVE_ENGLISH',
  'LOCAL_LANGUAGE_TEST',
  'PHYSICAL_EFFICIENCY_TEST',
]);

export interface TopicListItem {
  sharedTopicKey: string;
  name: string;
  subjectName: string;
  examNames: string[];
  weightage: number;
}

export interface SubjectGroup {
  subjectName: string;
  topics: TopicListItem[];
}

// Dedupes topics by sharedTopicKey across every exam the student selected - "Percentage" appears
// once even if it's shared by SSC CGL and IBPS PO, tagged with both exam names for display.
export function groupTopicsBySharedKey(topics: Topic[], examNamesById: Map<string, string>): TopicListItem[] {
  const byKey = new Map<string, TopicListItem>();
  for (const topic of topics) {
    const examName = examNamesById.get(topic.examId) ?? topic.examId;
    const existing = byKey.get(topic.sharedTopicKey);
    if (existing) {
      if (!existing.examNames.includes(examName)) existing.examNames.push(examName);
    } else {
      byKey.set(topic.sharedTopicKey, {
        sharedTopicKey: topic.sharedTopicKey,
        name: topic.name,
        subjectName: topic.subjectName,
        examNames: [examName],
        weightage: topic.weightage,
      });
    }
  }
  return Array.from(byKey.values());
}

// Used for Practice/quiz surfaces only - Study keeps the unfiltered list from
// groupTopicsBySharedKey directly.
export function groupBySubject(topics: Topic[], examNamesById: Map<string, string>): SubjectGroup[] {
  const filtered = groupTopicsBySharedKey(topics, examNamesById).filter(
    (t) => !INFO_ONLY_TOPIC_KEYS.has(t.sharedTopicKey),
  );
  const bySubject = new Map<string, TopicListItem[]>();
  for (const topic of filtered) {
    const list = bySubject.get(topic.subjectName) ?? [];
    list.push(topic);
    bySubject.set(topic.subjectName, list);
  }
  return Array.from(bySubject.entries()).map(([subjectName, subjectTopics]) => ({
    subjectName,
    topics: subjectTopics,
  }));
}

// Mini Speed Drill's question pool: a quick mixed-topic sprint, deliberately narrower than "every
// selected-exam topic" (that's what Mock already is). Scoped to Reasoning + Quantitative Aptitude -
// the content model has no "General Awareness" subject today (current affairs is a separate pool
// entirely, via the Current Affairs Quiz), and English is excluded since several of its topics
// test English itself and are deliberately left untranslated, which doesn't fit a quick
// bilingual-friendly drill. Mirrors pariksha-saathi (Android) TopicGrouping.kt's loadSpeedDrillPool.
const SPEED_DRILL_SUBJECTS = new Set(['Reasoning', 'Quantitative Aptitude']);

export function speedDrillPool(topics: Topic[], examNamesById: Map<string, string>): string[] {
  const keys = groupBySubject(topics, examNamesById)
    .filter((g) => SPEED_DRILL_SUBJECTS.has(g.subjectName))
    .flatMap((g) => g.topics.map((t) => t.sharedTopicKey));
  return Array.from(new Set(keys));
}
