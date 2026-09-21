import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getExamUpdates } from '../../api/examUpdates';
import { useExamSelection } from '../../state/ExamSelectionContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EmptyState, Card, Spinner } from '../../components/ui/Primitives';
import './UpdatesPage.css';

const PREVIEW_LENGTH = 150;

function preview(text: string): string {
  return text.length > PREVIEW_LENGTH ? `${text.slice(0, PREVIEW_LENGTH).trimEnd()}…` : text;
}

export function ExamNoticesPage() {
  const { selectedExamIds } = useExamSelection();

  const noticesQuery = useQuery({
    queryKey: ['exam-updates', selectedExamIds],
    queryFn: () => getExamUpdates(selectedExamIds),
  });

  useDocumentMeta({
    title: 'Exam Notices & Alerts',
    description:
      'Official SSC, IBPS and SBI exam notifications, admit card and result alerts, verified against each exam body\'s own site.',
    // Trailing slash - see the matching comment in CurrentAffairsPage.tsx.
    path: '/app/exam-notices/',
  });

  return (
    <div>
      <h1 className="review-title">Exam Notices &amp; Alerts</h1>
      {noticesQuery.isLoading && <Spinner />}
      {noticesQuery.data?.length === 0 && <EmptyState>No exam notices yet.</EmptyState>}
      {noticesQuery.data?.map((item) => (
        <Link key={item.id} to={`/app/exam-notices/${item.id}`} className="update-card-link">
          <Card className="update-card">
            <div className="update-meta">
              {item.type} &middot; verified {item.lastVerifiedAt.slice(0, 10)}
            </div>
            <h3>{item.title}</h3>
            <p>{preview(item.summary)}</p>
            <span className="update-readmore">Read more &rarr;</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
