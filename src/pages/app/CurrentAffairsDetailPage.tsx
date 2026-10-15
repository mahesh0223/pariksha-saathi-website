import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCounterpartItem, getCurrentAffairsItem } from '../../api/currentAffairs';
import { useLanguage } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EmptyState, Note, Pill, Spinner } from '../../components/ui/Primitives';
import { ItemQuestions } from '../../components/ItemQuestions';
import { learningNote } from '../../data/currentAffairsReading.mjs';
import { shortenTitle } from '../../lib/seoTitle.mjs';
import './DetailPage.css';

export function CurrentAffairsDetailPage() {
  const { id = '' } = useParams();
  const { language } = useLanguage();

  const itemQuery = useQuery({
    queryKey: ['current-affairs-item', id],
    queryFn: () => getCurrentAffairsItem(id),
  });
  const item = itemQuery.data ?? undefined;

  // English and Hindi rows for "the same" event have independent ids (there is no shared
  // cross-language key in the data model), so a link/bookmark/share made while reading in one
  // language lands on the other language's row if the reader's language differs on a later
  // visit. Before showing it: look for that event's counterpart in the CURRENT language via
  // sourceUrl - both rows cite the same PIB release URL, the only field they share. Only fetched
  // when the loaded item is in the other language, so the common case pays no extra request.
  const needsTwin = !!item && item.languageCode !== language;
  const twinQuery = useQuery({
    queryKey: ['current-affairs-twin', language, item?.sourceUrl],
    queryFn: () => getCounterpartItem(language, item!.sourceUrl),
    enabled: needsTwin,
  });
  const counterpart = needsTwin ? twinQuery.data : undefined;
  const display = item;
  const isLoading = itemQuery.isLoading || (needsTwin && twinQuery.isLoading);
  // The language the item itself is written in - what its page chrome should follow, even when
  // it is shown because no counterpart exists in the reader's language.
  const itemLanguage = display?.languageCode === 'hi' ? 'hi' : 'en';
  const hi = itemLanguage === 'hi';

  useDocumentMeta({
    title: display ? shortenTitle(display.title) : 'Current Affairs',
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
            author: { '@type': 'Person', name: 'Mahesh Srivastava' },
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

  if (isLoading) return <Spinner />;
  // A same-event counterpart exists in the current language - send the reader to its own URL
  // rather than silently rendering the other language's content under this id.
  if (counterpart) return <Navigate to={`/app/current-affairs/${counterpart.id}/`} replace />;
  if (!display) return <EmptyState>This item isn't available anymore.</EmptyState>;

  return (
    <article className="detail-page">
      <Link to="/app/current-affairs" className="detail-back">
        &larr; {hi ? 'समसामयिकी' : 'Current Affairs'}
      </Link>

      {needsTwin && (
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
          {hi ? 'आधिकारिक स्रोत' : 'Official source'}: {display.sourceName} &#8599;
        </a>
      </div>

      <div dangerouslySetInnerHTML={{ __html: learningNote(display, itemLanguage) }} />
      <ItemQuestions itemId={display.id} language={itemLanguage} />
      <p>
        <Link to="/app/current-affairs">{hi ? 'दैनिक संग्रह पढ़ें →' : 'Read the daily collection →'}</Link> ·{' '}
        <Link to="/about/">{hi ? 'संपादकीय मानक और सुधार' : 'Editorial standards & corrections'}</Link>
      </p>
    </article>
  );
}
