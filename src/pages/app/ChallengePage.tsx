import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalProgress } from '../../hooks/useLocalProgress';
import { useSelectedTopics } from '../../hooks/useSelectedTopics';
import { computeChallengeProgress, type ChallengeProgress } from '../../domain/streakChallenge';
import { abandonChallenge, getAllChallenges, startChallenge } from '../../storage/streakChallengeStore';
import type { StreakChallengeRecord } from '../../storage/db';
import { Button, Card, Spinner } from '../../components/ui/Primitives';
import './ChallengePage.css';

export function ChallengePage() {
  const { exams, selectedExamIds, topics } = useSelectedTopics();
  const { completions, attempts, loading: progressLoading } = useLocalProgress();

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
        const progress: ChallengeProgress | null = challenge
          ? computeChallengeProgress(challenge, examTopicKeysById.get(exam.id) ?? new Set(), completions, attempts)
          : null;

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
                  {progress.completedDayCount} day(s) completed
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
