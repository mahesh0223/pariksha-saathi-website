import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../state/LanguageContext';
import { resolveLessonsWithFallback, ENGLISH_FALLBACK_NOTE } from '../../domain/languageFallback';
import { Button, EmptyState, Note, Spinner } from '../../components/ui/Primitives';
import './StudyPage.css';

export function TopicLessonsPage() {
  const { topicKey = '' } = useParams();
  const { language } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['lessons', topicKey, language],
    queryFn: () => resolveLessonsWithFallback(topicKey, language),
    enabled: Boolean(topicKey),
  });

  return (
    <div className="study-page">
      <Link to="/app/study">&larr; Study</Link>
      <h1>{topicKey.replace(/_/g, ' ')}</h1>

      {isLoading && <Spinner />}
      {data?.shownInEnglishFallback && <Note>{ENGLISH_FALLBACK_NOTE}</Note>}
      {!isLoading && data?.items.length === 0 && <EmptyState>No lessons here yet.</EmptyState>}

      <div className="study-topic-list" style={{ marginTop: 16 }}>
        {data?.items.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/app/study/${encodeURIComponent(topicKey)}/${encodeURIComponent(lesson.id)}`}
            className="study-topic-row"
          >
            <span>{lesson.title}</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <Link to={`/app/practice/topic/${encodeURIComponent(topicKey)}`}>
          <Button variant="outline">Practice this topic</Button>
        </Link>
      </div>
    </div>
  );
}
