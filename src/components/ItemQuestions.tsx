import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getItemQuestions } from '../api/currentAffairs';
import { QuizOption, type OptionState } from './ui/Primitives';
import type { LanguageCode } from '../state/LanguageContext';
import type { Question } from '../types/api';
import './ItemQuestions.css';

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Optional extra on a current-affairs page: renders nothing while loading, on any error, or when
// no question has been written for the item yet - the page reads fine without it.
export function ItemQuestions({ itemId, language }: { itemId: string; language: LanguageCode }) {
  const { data } = useQuery({
    queryKey: ['item-questions', itemId],
    queryFn: () => getItemQuestions(itemId),
    retry: false,
  });
  if (!data || data.length === 0) return null;

  return (
    <section className="item-quiz">
      <h2>{language === 'hi' ? 'खुद को परखें' : 'Test yourself'}</h2>
      {data.map((question) => (
        <ItemQuestion key={question.id} question={question} language={language} />
      ))}
    </section>
  );
}

function ItemQuestion({ question, language }: { question: Question; language: LanguageCode }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;

  function stateOf(index: number): OptionState {
    if (!answered) return 'unselected';
    if (index === question.correctOptionIndex) return 'correct';
    return index === picked ? 'incorrect' : 'unselected';
  }

  return (
    <div className="item-quiz-question">
      <p className="item-quiz-text">{question.text}</p>
      <div className="item-quiz-options">
        {question.options.map((option, index) => (
          <QuizOption
            key={index}
            label={LABELS[index] ?? String(index + 1)}
            state={stateOf(index)}
            onClick={answered ? undefined : () => setPicked(index)}
          >
            {option}
          </QuizOption>
        ))}
      </div>
      {answered && (
        <p className="item-quiz-explanation" role="status">
          <strong>
            {picked === question.correctOptionIndex
              ? language === 'hi' ? 'सही उत्तर।' : 'Correct.'
              : language === 'hi' ? 'सही उत्तर ऊपर हरे रंग में है।' : 'The correct answer is marked in green.'}
          </strong>{' '}
          {question.explanation}
        </p>
      )}
    </div>
  );
}
