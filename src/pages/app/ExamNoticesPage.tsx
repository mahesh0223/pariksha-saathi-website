import { useQuery } from '@tanstack/react-query';
import { getExamUpdates } from '../../api/examUpdates';
import { useExamSelection } from '../../state/ExamSelectionContext';
import { EmptyState, Card, Spinner } from '../../components/ui/Primitives';
import './UpdatesPage.css';

export function ExamNoticesPage() {
  const { selectedExamIds } = useExamSelection();

  const noticesQuery = useQuery({
    queryKey: ['exam-updates', selectedExamIds],
    queryFn: () => getExamUpdates(selectedExamIds),
  });

  return (
    <div>
      <h1 className="review-title">Exam Notices &amp; Alerts</h1>
      {noticesQuery.isLoading && <Spinner />}
      {noticesQuery.data?.length === 0 && <EmptyState>No exam notices yet.</EmptyState>}
      {noticesQuery.data?.map((item) => (
        <Card key={item.id} className="update-card">
          <div className="update-meta">
            {item.type} &middot; verified {item.lastVerifiedAt.slice(0, 10)}
          </div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <a href={item.officialUrl} target="_blank" rel="noreferrer" className="update-source">
            Official notification &rarr;
          </a>
        </Card>
      ))}
    </div>
  );
}
