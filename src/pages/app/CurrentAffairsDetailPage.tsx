import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { EmptyState, Pill, Spinner } from '../../components/ui/Primitives';
import './DetailPage.css';

export function CurrentAffairsDetailPage() {
  const { id = '' } = useParams();
  const { language } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getCurrentAffairs({ lang: language, limit: 100 }),
  });

  const item = data?.find((i) => i.id === id);

  if (isLoading) return <Spinner />;
  if (!item) return <EmptyState>This item isn't available anymore.</EmptyState>;

  return (
    <article className="detail-page">
      <Link to="/app/current-affairs" className="detail-back">
        &larr; Current Affairs
      </Link>

      <div className="detail-meta">
        {item.period} &middot; {item.editionDate.slice(0, 10)}
      </div>
      <h1>{item.title}</h1>
      <div className="detail-tags">
        {item.examTags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <p className="detail-body">{item.summary}</p>

      <div className="detail-source">
        <a href={item.sourceUrl} target="_blank" rel="noreferrer">
          Official source: {item.sourceName} &#8599;
        </a>
      </div>
    </article>
  );
}
