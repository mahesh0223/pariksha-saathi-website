import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { buildTodayDigest } from '../../domain/digest';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import { CurrentAffairsItemCard } from '../../components/CurrentAffairsItemCard';
import './UpdatesPage.css';

export function DigestPage() {
  const { language } = useLanguage();

  const affairsQuery = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getCurrentAffairs({ lang: language, limit: 30 }),
  });

  useDocumentMeta({
    title: "Today's Digest",
    description: "Today's current-affairs edition in one place, with an estimated reading time.",
    path: '/app/digest/',
  });

  const digest = affairsQuery.data ? buildTodayDigest(affairsQuery.data) : null;

  return (
    <div>
      <h1 className="review-title">Today's Digest</h1>
      {affairsQuery.isLoading && <Spinner />}
      {affairsQuery.isSuccess && !digest && <EmptyState>No current-affairs edition available yet - check back soon.</EmptyState>}
      {digest && (
        <>
          <p className="preparing-for">
            {digest.editionDate} &middot; {digest.items.length} article(s) &middot; ~{digest.estimatedReadMinutes} min read
          </p>
          {digest.items.map((item) => (
            <CurrentAffairsItemCard key={item.id} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
