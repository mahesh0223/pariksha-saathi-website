import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useLocalProgress } from '../../hooks/useLocalProgress';
import { useSelectedTopics } from '../../hooks/useSelectedTopics';
import { useLanguage } from '../../state/LanguageContext';
import { computeChallengeProgress, type ChallengeProgress } from '../../domain/streakChallenge';
import { computeWeakTopics } from '../../domain/analytics';
import { badges, MIN_ATTEMPTS_TO_JUDGE_SUBJECT, phaseFor, shouldShowNeverMissTwice, subjectAccuracy } from '../../domain/challengeBadges';
import { abandonChallenge, getAllChallenges, startChallenge } from '../../storage/streakChallengeStore';
import { getCutoffs } from '../../api/cutoffs';
import { CutoffComparisonCard } from '../../components/CutoffComparisonCard';
import type { StreakChallengeRecord } from '../../storage/db';
import { Badge as BadgeChip, Button, Card, Spinner } from '../../components/ui/Primitives';
import './ChallengePage.css';

export function ChallengePage() {
  const { exams, selectedExamIds, topics } = useSelectedTopics();
  const { completions, attempts, items, loading: progressLoading } = useLocalProgress();
  const { language } = useLanguage();

  const cutoffQueries = useQueries({
    queries: selectedExamIds.map((examId) => ({
      queryKey: ['cutoffs', examId, language],
      queryFn: () => getCutoffs(examId, language),
    })),
  });
  const cutoffsByExamId = new Map(selectedExamIds.map((examId, i) => [examId, cutoffQueries[i]?.data ?? []]));

  const weakTopics = useMemo(() => computeWeakTopics(items), [items]);
  const topicSubjectsById = useMemo(() => {
    const map = new Map<string, Map<string, string>>();
    for (const examId of selectedExamIds) {
      const examTopics = topics.filter((t) => t.examId === examId);
      map.set(examId, new Map(examTopics.map((t) => [t.sharedTopicKey, t.subjectName])));
    }
    return map;
  }, [selectedExamIds, topics]);

  const [challenges, setChallenges] = useState<StreakChallengeRecord[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);

  const refreshChallenges = useCallback(() => {
    getAllChallenges().then((list) => {
      setChallenges(list);
      setLoadingChallenges(false);
    });
  }, []);

  useEffect(() => {
    refreshChallenges();
  }, [refreshChallenges]);

  async function handleStart(examId: string) {
    await startChallenge(examId);
    refreshChallenges();
  }

  async function handleAbandon(examId: string) {
    await abandonChallenge(examId);
    refreshChallenges();
  }

  const loading = progressLoading || loadingChallenges;

  const examTopicKeysById = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const examId of selectedExamIds) {
      map.set(examId, new Set(topics.filter((t) => t.examId === examId).map((t) => t.sharedTopicKey)));
    }
    return map;
  }, [selectedExamIds, topics]);

  if (loading) return <Spinner />;

  const selectedExams = exams.filter((e) => selectedExamIds.includes(e.id));

  return (
    <div className="dashboard">
      <h1>90-Day Challenge</h1>
      {selectedExams.length === 0 && (
        <p>Select an exam on the Study tab to start a 90-day challenge for it.</p>
      )}
      {selectedExams.map((exam) => {
        const challenge = challenges.find((c) => c.examId === exam.id);
        const examTopicKeys = examTopicKeysById.get(exam.id) ?? new Set<string>();
        const progress: ChallengeProgress | null = challenge
          ? computeChallengeProgress(challenge, examTopicKeys, completions, attempts)
          : null;
        const judgedTopics = weakTopics.filter(
          (t) => examTopicKeys.has(t.topicKey) && t.attemptedCount >= MIN_ATTEMPTS_TO_JUDGE_SUBJECT,
        );
        const examBadges = progress
          ? badges(progress, subjectAccuracy(judgedTopics, topicSubjectsById.get(exam.id) ?? new Map()))
          : [];
        const phase = progress ? phaseFor(progress.currentDayIndex) : 'Foundation';
        const showNeverMissTwice = progress ? shouldShowNeverMissTwice(progress) : false;

        return (
          <Card key={exam.id} className="dash-card challenge-card">
            <div className="dash-card-title">{exam.name}</div>
            {!progress ? (
              <>
                <p className="dash-card-body">
                  Commit to studying for this exam every day for 90 days. A missed day doesn't reset
                  your progress - it just keeps counting toward day 90.
                </p>
                <Button size="sm" onClick={() => handleStart(exam.id)}>
                  Start 90-day challenge
                </Button>
              </>
            ) : (
              <>
                <p className="dash-card-body">
                  Day {progress.currentDayIndex} of {progress.challenge.targetDays} ·{' '}
                  {progress.completedDayCount} day(s) completed · {phase} phase
                </p>
                <div className="challenge-progress-bar">
                  <div
                    className="challenge-progress-fill"
                    style={{ width: `${(progress.completedDayCount / progress.challenge.targetDays) * 100}%` }}
                  />
                </div>
                {progress.isFinished && (
                  <p className="dash-card-body">
                    {progress.completedDayCount >= progress.challenge.targetDays
                      ? `🎉 Challenge complete - ${progress.challenge.targetDays}/${progress.challenge.targetDays} days!`
                      : `Challenge period ended - ${progress.completedDayCount} of ${progress.challenge.targetDays} days completed.`}
                  </p>
                )}
                {showNeverMissTwice && (
                  <p className="challenge-never-miss-twice">
                    💡 You missed yesterday - that's fine, it doesn't reset anything. The one rule: never
                    miss twice in a row.
                  </p>
                )}
                {examBadges.length > 0 && (
                  <div className="challenge-badge-row">
                    {examBadges.map((badge) => (
                      <BadgeChip key={badge.title} emphasis={badge.earned ? 'accent' : 'neutral'}>
                        {badge.earned ? badge.emoji : '🔒'} {badge.title}
                      </BadgeChip>
                    ))}
                  </div>
                )}
                <div className="challenge-day-grid">
                  {progress.days.map((day) => (
                    <div
                      key={day.dayIndex}
                      className={`challenge-day-cell${day.completed ? ' completed' : ''}`}
                      title={`Day ${day.dayIndex}`}
                    >
                      {day.dayIndex}
                    </div>
                  ))}
                </div>
                <p className="challenge-day-grid-legend">
                  <span className="legend-swatch legend-completed">■</span> Completed &nbsp;
                  <span className="legend-swatch legend-pending">■</span> Not yet completed
                </p>
                <CutoffComparisonCard cutoffs={cutoffsByExamId.get(exam.id) ?? []} />
                <button className="challenge-restart" onClick={() => handleAbandon(exam.id)}>
                  Restart challenge
                </button>
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}
