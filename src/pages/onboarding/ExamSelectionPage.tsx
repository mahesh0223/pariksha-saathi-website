import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getExams } from '../../api/exams';
import { useExamSelection } from '../../state/ExamSelectionContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { Button, Spinner } from '../../components/ui/Primitives';
import './ExamSelectionPage.css';

export function ExamSelectionPage() {
  const navigate = useNavigate();
  const { selectedExamIds, toggleExam } = useExamSelection();
  const { data: exams, isLoading, isError } = useQuery({ queryKey: ['exams'], queryFn: getExams });

  useDocumentMeta({
    title: 'Choose Your Exam',
    description:
      'Pick one or more of SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO or SBI Clerk and start studying free, right in your browser.',
    path: '/onboarding/',
    robots: 'noindex,follow',
  });

  return (
    <div className="wrap onboarding">
      <h1>Which exams are you preparing for?</h1>
      <p className="onboarding-sub">Pick as many as you like — you can change this any time from Account.</p>

      {isLoading && <Spinner />}
      {isError && <p className="note">Couldn't load exams — check your connection and try again.</p>}

      <div className="exam-grid">
        {exams?.map((exam) => {
          const selected = selectedExamIds.includes(exam.id);
          return (
            <button
              key={exam.id}
              className={`exam-tile${selected ? ' selected' : ''}`}
              onClick={() => toggleExam(exam.id)}
            >
              <span className="exam-tile-name">{exam.name}</span>
              <span className="exam-tile-category">{exam.category}</span>
            </button>
          );
        })}
      </div>

      <Button disabled={selectedExamIds.length === 0} onClick={() => navigate('/app/home')}>
        Continue with {selectedExamIds.length || 0} exam{selectedExamIds.length === 1 ? '' : 's'}
      </Button>
    </div>
  );
}
