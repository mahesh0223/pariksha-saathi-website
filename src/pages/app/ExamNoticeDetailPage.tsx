import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getExamUpdates } from '../../api/examUpdates';
import { useLanguage, type LanguageCode } from '../../state/LanguageContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { seoNoticeTitle } from '../../lib/seoNoticeTitle';
import { EmptyState, Note, Spinner } from '../../components/ui/Primitives';
import { AdSlot } from '../../components/ads/AdSlot';
import './DetailPage.css';

const OTHER_LANGUAGE: Record<LanguageCode, LanguageCode> = { en: 'hi', hi: 'en' };

export function ExamNoticeDetailPage() {
  const { id = '' } = useParams();
  const { language } = useLanguage();
  const otherLanguage = OTHER_LANGUAGE[language];

  // Unfiltered - a notice can be opened by direct link/bookmark regardless of which exams are
  // currently selected, so we look it up across every notice rather than just the selected set.
  const { data, isLoading } = useQuery({
    queryKey: ['exam-updates', [], language],
    queryFn: () => getExamUpdates([], language),
  });

  const item = data?.find((i) => i.id === id);

  // Same root cause as CurrentAffairsDetailPage: English and Hindi rows for the same notice have
  // independent ids, so a link/bookmark made in one language 404s in the other. Fall back to the
  // other language, then try to match it back to this language via officialUrl (the one field
  // both language rows of the same notice share) before giving up.
  const needsFallback = !isLoading && !item;
  const { data: otherData, isLoading: otherLoading } = useQuery({
    queryKey: ['exam-updates', [], otherLanguage],
    queryFn: () => getExamUpdates([], otherLanguage),
    enabled: needsFallback,
  });
  const otherItem = needsFallback ? otherData?.find((i) => i.id === id) : undefined;
  const counterpart = otherItem ? data?.find((i) => i.officialUrl === otherItem.officialUrl) : undefined;
  const display = item ?? otherItem;
  const dateEntries = Object.entries(display?.importantDates ?? {});

  useDocumentMeta({
    // The <title> tag only - the on-page <h1> below keeps the original official wording.
    title: display
      ? seoNoticeTitle(display.examId, display.type, display.title, display.lastVerifiedAt.slice(0, 4))
      : 'Exam Notices & Alerts',
    description: display
      ? display.summary.slice(0, 155)
      : 'Official exam notifications and alerts for SSC, IBPS and SBI recruitment.',
    // Trailing slash - see the matching comment in CurrentAffairsPage.tsx.
    path: `/app/exam-notices/${id}/`,
    type: 'article',
    structuredData: display
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: display.title,
            description: display.summary,
            dateModified: display.lastVerifiedAt,
            author: { '@type': 'Organization', name: 'Pariksha Saathi' },
            publisher: { '@type': 'Organization', name: 'Pariksha Saathi' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://parikshasaathi.com/' },
              { '@type': 'ListItem', position: 2, name: 'Exam Notices & Alerts', item: 'https://parikshasaathi.com/app/exam-notices/' },
              { '@type': 'ListItem', position: 3, name: display.title },
            ],
          },
        ]
      : undefined,
  });

  if (isLoading || (needsFallback && otherLoading)) return <Spinner />;
  if (counterpart) return <Navigate to={`/app/exam-notices/${counterpart.id}/`} replace />;
  if (!display) return <EmptyState>This notice isn't available anymore.</EmptyState>;

  return (
    <article className="detail-page">
      <Link to="/app/exam-notices" className="detail-back">
        &larr; Exam Notices &amp; Alerts
      </Link>

      {!item && (
        <Note>
          {language === 'hi'
            ? 'यह सूचना हिंदी में उपलब्ध नहीं है — अंग्रेज़ी संस्करण नीचे दिखाया गया है।'
            : "This notice isn't available in English — the Hindi version is shown below."}
        </Note>
      )}

      <div className="detail-meta">
        {display.type} &middot; verified {display.lastVerifiedAt.slice(0, 10)}
      </div>
      <h1>{display.title}</h1>

      <p className="detail-body">{display.summary}</p>

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
        <a href={display.officialUrl} target="_blank" rel="noreferrer">
          Official notification &#8599;
        </a>
      </div>

      <AdSlot slot="5664651910" />
    </article>
  );
}
