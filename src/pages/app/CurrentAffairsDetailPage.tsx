import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
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

  useDocumentMeta({
    title: item?.title ?? 'Current Affairs',
    description: item
      ? item.summary.slice(0, 155)
      : 'Dated current-affairs capsules for SSC, IBPS and SBI exam prep, each with a verifiable source.',
    // Trailing slash - see the matching comment in CurrentAffairsPage.tsx.
    path: `/app/current-affairs/${id}/`,
    type: 'article',
    structuredData: item
      ? {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: item.title,
          description: item.summary,
          datePublished: item.editionDate,
          author: { '@type': 'Organization', name: 'Pariksha Saathi' },
          publisher: { '@type': 'Organization', name: 'Pariksha Saathi' },
          about: item.examTags,
        }
      : undefined,
  });

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
