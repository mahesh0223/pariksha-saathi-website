import { useQuery } from '@tanstack/react-query';
import { getAllCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { PAGE_META } from '../../lib/seoMeta.mjs';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import { currentAffairsDigest } from '../../data/currentAffairsReading.mjs';

import './UpdatesPage.css';

export function CurrentAffairsPage() {
  const { language } = useLanguage();

  const affairsQuery = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getAllCurrentAffairs(language),
  });

  useDocumentMeta({
    title: PAGE_META.currentAffairs.title,
    description: PAGE_META.currentAffairs.description,
    // Trailing slash: this page is prerendered to app/current-affairs/index.html, and Cloudflare
    // Pages 308-redirects the slash-less URL to this exact form - matching it here means the
    // canonical/OG/sitemap URL is the one that actually resolves with no extra hop.
    path: '/app/current-affairs/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: PAGE_META.currentAffairs.title,
      description: PAGE_META.currentAffairs.description,
      publisher: { '@type': 'Organization', name: 'Pariksha Saathi', url: 'https://parikshasaathi.com' },
    },
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
