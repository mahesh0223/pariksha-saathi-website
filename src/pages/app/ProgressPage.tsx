import { Link } from 'react-router-dom';
import { useLocalProgress } from '../../hooks/useLocalProgress';
import { computeProgressSummary } from '../../domain/analytics';
import { Card, Spinner } from '../../components/ui/Primitives';
import './ProgressPage.css';

export function ProgressPage() {
  const { attempts, completions, pendingSyncCount, loading } = useLocalProgress();

  if (loading) return <Spinner />;

  const summary = computeProgressSummary(attempts, completions, pendingSyncCount);

  return (
    <div>
      <h1 className="review-title">Progress</h1>

      <div className="progress-grid">
        <Card className="progress-stat">
          <div className="progress-stat-value">{summary.streakDays}</div>
          <div className="progress-stat-label">Day streak</div>
        </Card>
        <Card className="progress-stat">
          <div className="progress-stat-value">{summary.totalQuizAttempts}</div>
          <div className="progress-stat-label">Quiz attempts</div>
        </Card>
        <Card className="progress-stat">
          <div className="progress-stat-value">{summary.averageScore.toFixed(1)}</div>
          <div className="progress-stat-label">Average score</div>
        </Card>
        <Card className="progress-stat">
          <div className="progress-stat-value">{summary.lessonsCompletedCount}</div>
          <div className="progress-stat-label">Lessons completed</div>
        </Card>
      </div>

      <Card className="progress-week">
        <h2>This week</h2>
        <p>
          {summary.thisWeekLessons} lesson{summary.thisWeekLessons === 1 ? '' : 's'} completed,{' '}
          {summary.thisWeekQuizzes} quiz{summary.thisWeekQuizzes === 1 ? '' : 'zes'} taken
        </p>
      </Card>

      {summary.pendingSyncCount > 0 && (
        <p className="progress-pending">{summary.pendingSyncCount} item(s) waiting to sync</p>
      )}

      <div className="progress-links">
        <Link to="/app/mistakes">Mistake Notebook &rarr;</Link>
        <Link to="/app/bookmarks">Bookmarks &rarr;</Link>
      </div>
    </div>
  );
}
