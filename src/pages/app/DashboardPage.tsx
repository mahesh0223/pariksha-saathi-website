import { Link } from 'react-router-dom';
import { useLocalProgress } from '../../hooks/useLocalProgress';
import { useSelectedTopics } from '../../hooks/useSelectedTopics';
import { computeStreakDays, computeWeakestTopic } from '../../domain/analytics';
import { Button, Card } from '../../components/ui/Primitives';
import './DashboardPage.css';

export function DashboardPage() {
  const { items, completions, attempts, loading } = useLocalProgress();
  const { topics, exams, selectedExamIds } = useSelectedTopics();

  const weakest = computeWeakestTopic(items);
  const weakTopicMeta = weakest ? topics.find((t) => t.sharedTopicKey === weakest.topicKey) : null;
  const examNames = exams.filter((e) => selectedExamIds.includes(e.id)).map((e) => e.name);
  const lessonsCompleted = new Set(completions.map((c) => c.lessonId)).size;
  const streakDays = computeStreakDays(attempts, completions);

  return (
    <div className="dashboard">
      <h1>Pariksha Saathi</h1>
      {examNames.length > 0 && <p className="preparing-for">Preparing for: {examNames.join(', ')}</p>}

      <div className="dash-stat-row">
        <Card className="dash-card">
          <div className="dash-card-title">Streak</div>
          <div className="dash-card-value">{loading ? '…' : `${streakDays}d`}</div>
        </Card>
        <Card className="dash-card">
          <div className="dash-card-title">Lessons completed</div>
          <div className="dash-card-value">{loading ? '…' : lessonsCompleted}</div>
        </Card>
      </div>

      {weakest && weakTopicMeta && (
        <Card className="dash-card">
          <div className="dash-card-title">Focus on: {weakTopicMeta.name}</div>
          <p className="dash-card-body">
            {Math.trunc(weakest.accuracy * 100)}% accuracy recently — your weakest topic among ones
            you've practiced enough to judge.
          </p>
          <Link to={`/app/practice/topic/${weakest.topicKey}`}>
            <Button size="sm">Practice this topic</Button>
          </Link>
        </Card>
      )}

      {!loading && attempts.length === 0 && (
        <Card className="dash-card">
          <div className="dash-card-title">Get started</div>
          <p className="dash-card-body">
            Take your first quiz and this page will start tracking your streak and your weakest
            topics.
          </p>
          <Link to="/app/practice">
            <Button size="sm">Go to Practice</Button>
          </Link>
        </Card>
      )}

      <div className="dash-quicklinks">
        <Link to="/app/study" className="dash-quicklink">
          Study
        </Link>
        <Link to="/app/practice" className="dash-quicklink">
          Practice
        </Link>
        <Link to="/app/updates" className="dash-quicklink">
          Updates
        </Link>
      </div>
    </div>
  );
}
