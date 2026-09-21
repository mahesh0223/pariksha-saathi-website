import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getExamUpdates } from '../../api/examUpdates';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import './DetailPage.css';

export function ExamNoticeDetailPage() {
  const { id = '' } = useParams();

  // Unfiltered - a notice can be opened by direct link/bookmark regardless of which exams are
  // currently selected, so we look it up across every notice rather than just the selected set.
  const { data, isLoading } = useQuery({
    queryKey: ['exam-updates', []],
    queryFn: () => getExamUpdates([]),
  });

  const item = data?.find((i) => i.id === id);

  if (isLoading) return <Spinner />;
  if (!item) return <EmptyState>This notice isn't available anymore.</EmptyState>;

  const dateEntries = Object.entries(item.importantDates ?? {});

  return (
    <article className="detail-page">
      <Link to="/app/exam-notices" className="detail-back">
        &larr; Exam Notices &amp; Alerts
      </Link>

      <div className="detail-meta">
        {item.type} &middot; verified {item.lastVerifiedAt.slice(0, 10)}
      </div>
      <h1>{item.title}</h1>

      <p className="detail-body">{item.summary}</p>

      {dateEntries.length > 0 && (
        <div className="detail-dates">
          <h2>Important dates</h2>
          <dl>
            {dateEntries.map(([label, value]) => (
              <div key={label} className="detail-date-row">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="detail-source">
        <a href={item.officialUrl} target="_blank" rel="noreferrer">
          Official notification &#8599;
        </a>
      </div>
    </article>
  );
}
