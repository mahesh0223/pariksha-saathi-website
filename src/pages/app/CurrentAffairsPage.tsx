import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import { currentAffairsDigest } from '../../data/currentAffairsReading.mjs';

import './UpdatesPage.css';

export function CurrentAffairsPage() {
  const { language } = useLanguage();

  const affairsQuery = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getCurrentAffairs({ lang: language, limit: 100 }),
  });

  useDocumentMeta({
    title: 'Current Affairs',
    description:
      'Daily current-affairs capsules for SSC, IBPS and SBI exam prep, each dated and sourced so you can verify it yourself.',
    // Trailing slash: this page is prerendered to app/current-affairs/index.html, and Cloudflare
    // Pages 308-redirects the slash-less URL to this exact form - matching it here means the
    // canonical/OG/sitemap URL is the one that actually resolves with no extra hop.
    path: '/app/current-affairs/',
  });

  return (
    <div>
      {affairsQuery.isLoading && <Spinner />}
      {affairsQuery.isError && <EmptyState>Could not load current affairs. Please try again.</EmptyState>}
      {affairsQuery.data?.length === 0 && <EmptyState>No current-affairs items yet.</EmptyState>}
      {affairsQuery.data && <div dangerouslySetInnerHTML={{ __html: currentAffairsDigest(affairsQuery.data, language) }} />}

    </div>
  );
}
