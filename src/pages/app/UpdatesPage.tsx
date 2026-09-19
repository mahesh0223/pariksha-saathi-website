import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentAffairs } from '../../api/currentAffairs';
import { getExamUpdates } from '../../api/examUpdates';
import { useLanguage } from '../../state/LanguageContext';
import { useExamSelection } from '../../state/ExamSelectionContext';
import { EmptyState, Card, Spinner, Pill } from '../../components/ui/Primitives';
import './UpdatesPage.css';

type Tab = 'affairs' | 'notices';

export function UpdatesPage() {
  const [tab, setTab] = useState<Tab>('affairs');
  const { language } = useLanguage();
  const { selectedExamIds } = useExamSelection();

  const affairsQuery = useQuery({
    queryKey: ['current-affairs', language],
    queryFn: () => getCurrentAffairs({ lang: language, limit: 30 }),
  });
  const noticesQuery = useQuery({
    queryKey: ['exam-updates', selectedExamIds],
    queryFn: () => getExamUpdates(selectedExamIds),
  });

  return (
    <div>
      <h1 className="review-title">Updates</h1>
      <div className="updates-tabs">
        <button className={`updates-tab${tab === 'affairs' ? ' active' : ''}`} onClick={() => setTab('affairs')}>
          Current affairs
        </button>
        <button className={`updates-tab${tab === 'notices' ? ' active' : ''}`} onClick={() => setTab('notices')}>
          Exam notices
        </button>
      </div>

      {tab === 'affairs' && (
        <div>
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
      )}

      {tab === 'notices' && (
        <div>
          {noticesQuery.isLoading && <Spinner />}
          {noticesQuery.data?.length === 0 && <EmptyState>No exam notices yet.</EmptyState>}
          {noticesQuery.data?.map((item) => (
            <Card key={item.id} className="update-card">
              <div className="update-meta">
                {item.type} &middot; verified {item.lastVerifiedAt.slice(0, 10)}
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <a href={item.officialUrl} target="_blank" rel="noreferrer" className="update-source">
                Official notification &rarr;
              </a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
