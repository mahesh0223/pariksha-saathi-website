import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useLocalProgress } from '../../hooks/useLocalProgress';
import { useLanguage } from '../../state/LanguageContext';
import { computeMistakeNotebook } from '../../domain/analytics';
import { resolveQuestionsWithFallback } from '../../domain/languageFallback';
import { Card, EmptyState, Spinner } from '../../components/ui/Primitives';
import './ReviewLists.css';

export function MistakeNotebookPage() {
  const { items, loading } = useLocalProgress();
  const { language } = useLanguage();

  const mistakes = useMemo(() => computeMistakeNotebook(items), [items]);
  const topicKeys = useMemo(() => Array.from(new Set(mistakes.map((m) => m.topicKey))), [mistakes]);

  const questionQueries = useQueries({
    queries: topicKeys.map((key) => ({
      queryKey: ['questions', key, language],
      queryFn: () => resolveQuestionsWithFallback(key, language),
    })),
  });

  const questionsById = useMemo(() => {
    const map = new Map<string, { text: string; options: string[]; correctOptionIndex: number }>();
    for (const q of questionQueries) {
      for (const question of q.data?.items ?? []) map.set(question.id, question);
    }
    return map;
  }, [questionQueries]);

  if (loading) return <Spinner />;
  if (mistakes.length === 0) {
    return (
      <EmptyState>
        Nothing here yet — questions you get wrong will show up for review, and drop off once you
        get them right.
      </EmptyState>
    );
  }

  return (
    <div>
      <h1 className="review-title">Mistake Notebook</h1>
      {mistakes.map((mistake) => {
        const question = questionsById.get(mistake.questionId);
        if (!question) return null;
        return (
          <Card key={mistake.questionId} className="review-card">
            <p className="review-question">{question.text}</p>
            <p className="review-answer">Correct answer: {question.options[question.correctOptionIndex]}</p>
          </Card>
        );
      })}
    </div>
  );
}
