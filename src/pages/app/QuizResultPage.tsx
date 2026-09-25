import { Link, useLocation } from 'react-router-dom';
import type { QuizScore } from '../../domain/quizEngine';
import type { Question } from '../../types/api';
import { Button, Card, EmptyState, QuizOption } from '../../components/ui/Primitives';
import './QuizResultPage.css';

interface ResultState {
  score: QuizScore;
  questions: Question[];
}

export function QuizResultPage() {
  const location = useLocation();
  const state = location.state as ResultState | undefined;

  if (!state) {
    return (
      <EmptyState>
        Result no longer available here — check <Link to="/app/progress">Progress</Link> for your
        score history.
      </EmptyState>
    );
  }

  const { score, questions } = state;
  const questionById = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="result-page">
      <h1>Result</h1>
      <Card className="result-summary">
        <div className="result-score">{score.totalScore.toFixed(2)}</div>
        <div className="result-meta">
          {score.correctCount} / {score.totalQuestions} correct
        </div>
      </Card>

      <h2 className="result-review-title">Review</h2>
      {score.answers.map((answer) => {
        const question = questionById.get(answer.questionId);
        if (!question) return null;
        return (
          <Card key={answer.questionId} className="result-question">
            <p className="result-question-text">{question.text}</p>
            <div className="result-options">
              {question.options.map((option, i) => {
                const isSelected = answer.selectedOptionIndex === i;
                const isCorrectOption = question.correctOptionIndex === i;
                const state = isCorrectOption ? 'correct' : isSelected ? 'incorrect' : 'unselected';
                return (
                  <QuizOption key={i} label={String.fromCharCode(65 + i)} state={state}>
                    {option}
                  </QuizOption>
                );
              })}
            </div>
            <div className="result-marks">
              {answer.selectedOptionIndex === null
                ? 'Not attempted'
                : `${answer.marksAwarded >= 0 ? '+' : ''}${answer.marksAwarded}`}
            </div>
            {question.explanation && <p className="result-explanation">{question.explanation}</p>}
          </Card>
        );
      })}

      <div style={{ marginTop: 24 }}>
        <Link to="/app/practice">
          <Button>Back to Practice</Button>
        </Link>
      </div>
    </div>
  );
}
