import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EmptyState, Card, Spinner, Pill } from '../../components/ui/Primitives';
import './UpdatesPage.css';

const PREVIEW_LENGTH = 150;

function preview(text: string): string {
  return text.length > PREVIEW_LENGTH ? `${text.slice(0, PREVIEW_LENGTH).trimEnd()}…` : text;
}

export function CurrentAffairsPage() {
  const { language } = useLanguage();

  const affairsQuery = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getCurrentAffairs({ lang: language, limit: 30 }),
  });

  useDocumentMeta({
    title: 'Current Affairs',
    description:
      'Daily current-affairs capsules for SSC, IBPS and SBI exam prep, each dated and sourced so you can verify it yourself.',
    path: '/app/current-affairs',
  });

  return (
    <div>
      <h1 className="review-title">Current Affairs</h1>
      {affairsQuery.isLoading && <Spinner />}
      {affairsQuery.data?.length === 0 && <EmptyState>No current-affairs items yet.</EmptyState>}
      {affairsQuery.data?.map((item) => (
        <Link key={item.id} to={`/app/current-affairs/${item.id}`} className="update-card-link">
          <Card className="update-card">
            <div className="update-meta">
              {item.period} &middot; {item.editionDate.slice(0, 10)}
            </div>
            <h3>{item.title}</h3>
            <p>{preview(item.summary)}</p>
            <div className="update-tags">
              {item.examTags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
            <span className="update-readmore">Read more &rarr;</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
