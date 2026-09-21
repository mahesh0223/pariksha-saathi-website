import { useNavigate } from 'react-router-dom';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useLanguage } from '../../state/LanguageContext';
import { getCurrentAffairsQuizTopics } from '../../api/currentAffairsQuiz';
import { getQuestions } from '../../api/content';
import { Button, Card, Spinner } from '../../components/ui/Primitives';
import './DashboardPage.css';

export function CurrentAffairsQuizPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const topicKeysQuery = useQuery({
    queryKey: ['current-affairs-quiz-topics', language],
    queryFn: () => getCurrentAffairsQuizTopics(language),
  });
  const topicKeys = topicKeysQuery.data?.topicKeys ?? [];

  const questionQueries = useQueries({
    queries: topicKeys.map((key) => ({
      queryKey: ['questions', key, language],
      queryFn: () => getQuestions(key, language),
      enabled: topicKeys.length > 0,
    })),
  });

  const loading =
    topicKeysQuery.isLoading || (topicKeys.length > 0 && questionQueries.some((q) => q.isLoading));
  const questionCount = questionQueries.reduce((sum, q) => sum + (q.data?.length ?? 0), 0);

  return (
    <div className="dashboard">
      <h1>Current Affairs Quiz</h1>
      {loading ? (
        <Spinner />
      ) : questionCount === 0 ? (
        <p>No current-affairs quiz questions are available yet - check back soon.</p>
      ) : (
        <Card className="dash-card">
          <div className="dash-card-title">This week's Current Affairs Quiz</div>
          <p className="dash-card-body">
            {questionCount} question(s) drawn from the last month's current affairs - refreshed
            weekly as new events are added.
          </p>
          <Button onClick={() => navigate('/app/current-affairs-quiz/play')}>Start quiz</Button>
        </Card>
      )}
    </div>
  );
}
