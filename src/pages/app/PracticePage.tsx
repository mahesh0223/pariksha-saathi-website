import { Link } from 'react-router-dom';
import { useSelectedTopics } from '../../hooks/useSelectedTopics';
import { groupBySubject } from '../../domain/topicGrouping';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import './PracticePage.css';

export function PracticePage() {
  const { topics, examNamesById, isLoading, selectedExamIds } = useSelectedTopics();
  const subjects = groupBySubject(topics, examNamesById);

  if (selectedExamIds.length === 0) {
    return (
      <EmptyState>
        Pick an exam first. <Link to="/onboarding">Choose your exams</Link>
      </EmptyState>
    );
  }

  return (
    <div className="practice-page">
      <h1>Practice</h1>

      <Link to="/app/practice/mock" className="mock-card">
        <div>
          <div className="mock-card-title">Full mock test</div>
          <div className="mock-card-sub">Up to 100 questions across your whole exam, 60s each.</div>
        </div>
        <span className="mock-card-arrow">&rarr;</span>
      </Link>

      {isLoading && <Spinner />}

      {subjects.map((subject) => (
        <section key={subject.subjectName} className="practice-subject">
          <div className="practice-subject-head">
            <h2>{subject.subjectName}</h2>
            <Link
              to={`/app/practice/sectional/${encodeURIComponent(subject.subjectName)}`}
              className="sectional-link"
            >
              Sectional test &rarr;
            </Link>
          </div>
          <div className="practice-topic-list">
            {subject.topics.map((topic) => (
              <Link
                key={topic.sharedTopicKey}
                to={`/app/practice/topic/${encodeURIComponent(topic.sharedTopicKey)}`}
                className="practice-topic-chip"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
