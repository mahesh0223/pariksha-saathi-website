import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelectedTopics } from '../../hooks/useSelectedTopics';
import { groupTopicsBySharedKey, type TopicListItem } from '../../domain/topicGrouping';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import './StudyPage.css';

export function StudyPage() {
  const { topics, examNamesById, isLoading, selectedExamIds } = useSelectedTopics();

  const bySubject = useMemo(() => {
    const grouped = groupTopicsBySharedKey(topics, examNamesById);
    const map = new Map<string, TopicListItem[]>();
    for (const topic of grouped) {
      const list = map.get(topic.subjectName) ?? [];
      list.push(topic);
      map.set(topic.subjectName, list);
    }
    return Array.from(map.entries());
  }, [topics, examNamesById]);

  if (selectedExamIds.length === 0) {
    return (
      <EmptyState>
        Pick an exam first. <Link to="/onboarding">Choose your exams</Link>
      </EmptyState>
    );
  }

  return (
    <div className="study-page">
      <h1>Study</h1>
      {isLoading && <Spinner />}
      {!isLoading && bySubject.length === 0 && <EmptyState>No topics found for your exams yet.</EmptyState>}
      {bySubject.map(([subjectName, subjectTopics]) => (
        <section key={subjectName} className="study-subject">
          <h2>{subjectName}</h2>
          <div className="study-topic-list">
            {subjectTopics.map((topic) => (
              <Link key={topic.sharedTopicKey} to={`/app/study/${encodeURIComponent(topic.sharedTopicKey)}`} className="study-topic-row">
                <span>{topic.name}</span>
                <span className="study-topic-exams">{topic.examNames.join(', ')}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
