import { Link, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import type { QuizScore } from '../../domain/quizEngine';
import { diagnose, markingLedger } from '../../domain/quizResultAnalysis';
import { useSelectedTopics } from '../../hooks/useSelectedTopics';
import { useLanguage } from '../../state/LanguageContext';
import { getCutoffs } from '../../api/cutoffs';
import { CutoffComparisonCard } from '../../components/CutoffComparisonCard';
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
  const { selectedExamIds } = useSelectedTopics();
  const { language } = useLanguage();

  // A quiz can span topics across several selected exams (Mock), so this is the union across all
  // of them rather than one specific exam's figures - same simplification as the Android client.
  const cutoffQueries = useQueries({
    queries: selectedExamIds.map((examId) => ({
      queryKey: ['cutoffs', examId, language],
      queryFn: () => getCutoffs(examId, language),
    })),
  });
  const cutoffs = cutoffQueries.flatMap((q) => q.data ?? []);

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
  const ledger = markingLedger(score.answers);
  const diagnostics = diagnose(score.answers);

  return (
    <div className="result-page">
      <h1>Result</h1>
      <Card className="result-summary">
        <div className="result-score">{score.totalScore.toFixed(2)}</div>
        <div className="result-meta">
          {score.correctCount} / {score.totalQuestions} correct
        </div>
      </Card>

      <Card className="result-question">
        <h2 className="result-review-title">Marking Ledger</h2>
        <div className="marking-ledger">
          <div className="ledger-tile">
            <div className="ledger-label">Correct</div>
            <div className="ledger-count ledger-correct">{ledger.correctCount}</div>
            <div className="ledger-marks ledger-correct">+{ledger.correctMarks.toFixed(2)}</div>
          </div>
          <div className="ledger-tile">
            <div className="ledger-label">Wrong</div>
            <div className="ledger-count ledger-wrong">{ledger.wrongCount}</div>
            <div className="ledger-marks ledger-wrong">{ledger.wrongMarks.toFixed(2)}</div>
          </div>
          <div className="ledger-tile">
            <div className="ledger-label">Skipped</div>
            <div className="ledger-count">{ledger.skippedCount}</div>
            <div className="ledger-marks">0.00</div>
          </div>
        </div>
      </Card>

      <CutoffComparisonCard cutoffs={cutoffs} />

      {diagnostics.length > 0 && (
        <>
          <h2 className="result-review-title">Syllabus Diagnostics</h2>
          {diagnostics.map((d) => (
            <Card key={d.topicKey} className="result-question">
              <p className="result-question-text">{d.topicKey}</p>
              <p className="result-marks">
                {d.correctCount}/{d.totalCount} ({Math.round(d.accuracy * 100)}%)
              </p>
              <p className="result-explanation">{d.remark}</p>
            </Card>
          ))}
        </>
      )}

      <h2 className="result-review-title">Question Ledger</h2>
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
            {question.explanation && (
              <>
                <p className="result-concept-rule-label">Concept Rule</p>
                <p className="result-explanation">{question.explanation}</p>
              </>
            )}
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
