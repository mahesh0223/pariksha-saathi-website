import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useLanguage } from '../../state/LanguageContext';
import { useAuth } from '../../state/AuthContext';
import { useSelectedTopics } from '../../hooks/useSelectedTopics';
import { groupBySubject } from '../../domain/topicGrouping';
import { resolveQuestionsWithFallback, ENGLISH_FALLBACK_NOTE } from '../../domain/languageFallback';
import {
  assembleMockQuiz,
  assembleSectionalQuiz,
  assembleTopicQuiz,
  scoreQuiz,
  totalTimerSeconds,
} from '../../domain/quizEngine';
import { saveAttempt } from '../../storage/quizAttemptsStore';
import { addBookmark, isBookmarked, removeBookmark } from '../../storage/bookmarksStore';
import { syncPendingProgress } from '../../storage/syncQueue';
import { Button, Note, QuizOption, Spinner } from '../../components/ui/Primitives';
import type { Question, QuizType } from '../../types/api';
import type { QuizAttemptItemRecord, QuizAttemptRecord } from '../../storage/db';
import './QuizPage.css';

export function QuizPage({ quizType }: { quizType: QuizType }) {
  const { topicKey, subjectName } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { token } = useAuth();
  const { topics, examNamesById } = useSelectedTopics();

  const subjects = useMemo(() => groupBySubject(topics, examNamesById), [topics, examNamesById]);

  const poolTopicKeys = useMemo(() => {
    if (quizType === 'TOPIC') return topicKey ? [topicKey] : [];
    if (quizType === 'SECTIONAL') {
      const decoded = subjectName ? decodeURIComponent(subjectName) : '';
      return subjects.find((s) => s.subjectName === decoded)?.topics.map((t) => t.sharedTopicKey) ?? [];
    }
    return subjects.flatMap((s) => s.topics.map((t) => t.sharedTopicKey));
  }, [quizType, topicKey, subjectName, subjects]);

  const questionQueries = useQueries({
    queries: poolTopicKeys.map((key) => ({
      queryKey: ['questions', key, language],
      queryFn: () => resolveQuestionsWithFallback(key, language),
      enabled: poolTopicKeys.length > 0,
    })),
  });

  const poolReady = poolTopicKeys.length > 0 && questionQueries.every((q) => q.isSuccess);
  const anyFallback = questionQueries.some((q) => q.data?.shownInEnglishFallback);

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const assembledRef = useRef(false);

  useEffect(() => {
    if (!poolReady || assembledRef.current) return;
    assembledRef.current = true;
    const pool = questionQueries.flatMap((q) => q.data?.items ?? []);
    const assembled =
      quizType === 'TOPIC'
        ? assembleTopicQuiz(pool)
        : quizType === 'SECTIONAL'
          ? assembleSectionalQuiz(pool)
          : assembleMockQuiz(pool);
    setQuestions(assembled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolReady]);

  const [index, setIndex] = useState(0);
  const [selections, setSelections] = useState<Map<string, number | null>>(new Map());
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (questions && secondsLeft === null) setSecondsLeft(totalTimerSeconds(questions.length));
  }, [questions, secondsLeft]);

  const current = questions?.[index];

  useEffect(() => {
    if (current) isBookmarked('QUESTION', current.id).then(setBookmarked);
  }, [current]);

  const handleSubmit = useCallback(async () => {
    if (!questions || submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);

    const score = scoreQuiz(questions, selections);
    const attemptId = crypto.randomUUID();
    const startedAt = new Date(Date.now() - (totalTimerSeconds(questions.length) - (secondsLeft ?? 0)) * 1000).toISOString();
    const completedAt = new Date().toISOString();

    const attempt: QuizAttemptRecord = {
      id: attemptId,
      topicKeys: Array.from(new Set(questions.map((q) => q.topicKey))),
      quizType,
      startedAt,
      completedAt,
      correctCount: score.correctCount,
      totalQuestions: score.totalQuestions,
      totalScore: score.totalScore,
      synced: false,
    };
    const items: QuizAttemptItemRecord[] = score.answers.map((a) => ({
      id: `${attemptId}:${a.questionId}`,
      attemptId,
      questionId: a.questionId,
      topicKey: a.topicKey,
      selectedOptionIndex: a.selectedOptionIndex,
      isCorrect: a.isCorrect,
      marksAwarded: a.marksAwarded,
      completedAt,
    }));

    await saveAttempt(attempt, items);
    syncPendingProgress(token);

    navigate(`/app/practice/result/${attemptId}`, { state: { score, questions } });
  }, [questions, selections, secondsLeft, quizType, token, navigate]);

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) {
      if (secondsLeft === 0) handleSubmit();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s !== null ? s - 1 : s)), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, handleSubmit]);

  async function toggleBookmark() {
    if (!current) return;
    if (bookmarked) await removeBookmark('QUESTION', current.id);
    else await addBookmark('QUESTION', current.id, current.topicKey);
    setBookmarked(!bookmarked);
    syncPendingProgress(token);
  }

  function selectOption(optionIndex: number) {
    if (!current) return;
    setSelections((prev) => new Map(prev).set(current.id, optionIndex));
  }

  if (!poolReady || !questions) return <Spinner />;
  if (questions.length === 0) return <p>No questions available for this selection yet.</p>;
  if (!current) return null;

  const minutes = Math.floor((secondsLeft ?? 0) / 60);
  const seconds = (secondsLeft ?? 0) % 60;

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <span className="quiz-progress">
          Question {index + 1} of {questions.length}
        </span>
        <span className="quiz-timer">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {anyFallback && <Note>{ENGLISH_FALLBACK_NOTE}</Note>}

      <div className="quiz-question-card">
        <p className="quiz-question-text">{current.text}</p>
        <div className="quiz-options">
          {current.options.map((option, i) => (
            <QuizOption
              key={i}
              label={String.fromCharCode(65 + i)}
              state={selections.get(current.id) === i ? 'selected' : 'unselected'}
              onClick={() => selectOption(i)}
            >
              {option}
            </QuizOption>
          ))}
        </div>
        <button className="quiz-bookmark" onClick={toggleBookmark}>
          {bookmarked ? '★ Bookmarked' : '☆ Bookmark this question'}
        </button>
      </div>

      <div className="quiz-nav">
        <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          Previous
        </Button>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex((i) => i + 1)}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit quiz'}
          </Button>
        )}
      </div>
    </div>
  );
}
