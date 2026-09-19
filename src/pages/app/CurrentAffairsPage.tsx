import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { EmptyState, Card, Spinner, Pill } from '../../components/ui/Primitives';
import './UpdatesPage.css';

export function CurrentAffairsPage() {
  const { language } = useLanguage();

  const affairsQuery = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getCurrentAffairs({ lang: language, limit: 30 }),
  });

  return (
    <div>
      <h1 className="review-title">Current Affairs</h1>
      {affairsQuery.isLoading && <Spinner />}
      {affairsQuery.data?.length === 0 && <EmptyState>No current-affairs items yet.</EmptyState>}
      {affairsQuery.data?.map((item) => (
        <Card key={item.id} className="update-card">
          <div className="update-meta">
            {item.period} &middot; {item.editionDate.slice(0, 10)}
          </div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <div className="update-tags">
            {item.examTags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="update-source">
            Source: {item.sourceName}
          </a>
        </Card>
      ))}
    </div>
  );
}
