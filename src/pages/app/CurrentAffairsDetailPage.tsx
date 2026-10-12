import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { useLanguage, type LanguageCode } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EmptyState, Note, Pill, Spinner } from '../../components/ui/Primitives';
import { learningNote } from '../../data/currentAffairsReading.mjs';
import './DetailPage.css';

const OTHER_LANGUAGE: Record<LanguageCode, LanguageCode> = { en: 'hi', hi: 'en' };

export function CurrentAffairsDetailPage() {
  const { id = '' } = useParams();
  const { language } = useLanguage();
  const otherLanguage = OTHER_LANGUAGE[language];

  const { data, isLoading } = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getCurrentAffairs({ lang: language, limit: 100 }),
  });

  const item = data?.find((i) => i.id === id);

  // English and Hindi rows for "the same" event have independent ids (there is no shared
  // cross-language key in the data model), so a link/bookmark/share made while reading in one
  // language 404s if the reader's language differs on a later visit. Before giving up: check
  // whether this id belongs to the OTHER language, and if so, find that event's counterpart in
  // the CURRENT language via sourceUrl - both language rows of the same event cite the same PIB
  // release URL, which is the only field they share. Only fetched when the primary lookup fails,
  // so the common case (id matches the current language) pays no extra request.
  const needsFallback = !isLoading && !item;
  const { data: otherData, isLoading: otherLoading } = useQuery({
    queryKey: ['current-affairs', otherLanguage],
    queryFn: () => getCurrentAffairs({ lang: otherLanguage, limit: 100 }),
    enabled: needsFallback,
  });
  const otherItem = needsFallback ? otherData?.find((i) => i.id === id) : undefined;
  const counterpart = otherItem ? data?.find((i) => i.sourceUrl === otherItem.sourceUrl) : undefined;
  const display = item ?? otherItem;

  useDocumentMeta({
    title: display?.title ?? 'Current Affairs',
    description: display
      ? display.summary.slice(0, 155)
      : 'Dated current-affairs capsules for SSC, IBPS and SBI exam prep, each with a verifiable source.',
    // Trailing slash - see the matching comment in CurrentAffairsPage.tsx.
    path: `/app/current-affairs/${id}/`,
    type: 'article',
    structuredData: display
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: display.title,
            description: display.summary,
            datePublished: display.editionDate,
            author: { '@type': 'Organization', name: 'Pariksha Saathi' },
            publisher: { '@type': 'Organization', name: 'Pariksha Saathi' },
            about: display.examTags,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://parikshasaathi.com/' },
              { '@type': 'ListItem', position: 2, name: 'Current Affairs', item: 'https://parikshasaathi.com/app/current-affairs/' },
              { '@type': 'ListItem', position: 3, name: display.title },
            ],
          },
        ]
      : undefined,
  });

  if (isLoading || (needsFallback && otherLoading)) return <Spinner />;
  // A same-event counterpart exists in the current language - send the reader to its own URL
  // rather than silently rendering the other language's content under this id.
  if (counterpart) return <Navigate to={`/app/current-affairs/${counterpart.id}/`} replace />;
  if (!display) return <EmptyState>This item isn't available anymore.</EmptyState>;

  return (
    <article className="detail-page">
      <Link to="/app/current-affairs" className="detail-back">
        &larr; Current Affairs
      </Link>

      {!item && (
        <Note>
          {language === 'hi'
            ? 'यह आइटम हिंदी में उपलब्ध नहीं है — अंग्रेज़ी संस्करण नीचे दिखाया गया है।'
            : "This item isn't available in English — the Hindi version is shown below."}
        </Note>
      )}

      <div className="detail-meta">
        {display.period} &middot; {display.editionDate.slice(0, 10)}
      </div>
      <h1>{display.title}</h1>
      <div className="detail-tags">
        {display.examTags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <p className="detail-body">{display.summary}</p>

      <div className="detail-source">
        <a href={display.sourceUrl} target="_blank" rel="noreferrer">
          Official source: {display.sourceName} &#8599;
        </a>
      </div>

      <div dangerouslySetInnerHTML={{ __html: learningNote(display, language) }} />
      <p><Link to="/app/current-affairs">Read the daily collection →</Link> · <Link to="/about/">Editorial standards & corrections</Link></p>
    </article>
  );
}
