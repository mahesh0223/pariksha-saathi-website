import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getExams, getTopics } from '../api/exams';
import { useExamSelection } from '../state/ExamSelectionContext';
import type { Topic } from '../types/api';

// Shared by Study/Practice/Dashboard: every screen that needs "all topics across the exams this
// student picked" plus a way to show each topic's exam name(s).
export function useSelectedTopics() {
  const { selectedExamIds } = useExamSelection();
  const examsQuery = useQuery({ queryKey: ['exams'], queryFn: getExams });

  const topicQueries = useQueries({
    queries: selectedExamIds.map((examId) => ({
      queryKey: ['topics', examId],
      queryFn: () => getTopics(examId),
      enabled: selectedExamIds.length > 0,
    })),
  });

  const examNamesById = useMemo(() => {
    const map = new Map<string, string>();
    for (const exam of examsQuery.data ?? []) map.set(exam.id, exam.name);
    return map;
  }, [examsQuery.data]);

  const topics: Topic[] = useMemo(
    () => topicQueries.flatMap((q) => q.data ?? []),
    [topicQueries],
  );

  const isLoading = examsQuery.isLoading || topicQueries.some((q) => q.isLoading);

  return { exams: examsQuery.data ?? [], examNamesById, topics, isLoading, selectedExamIds };
}
