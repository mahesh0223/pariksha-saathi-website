import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

const KEY = 'ps_selected_exam_ids';

interface ExamSelectionState {
  selectedExamIds: string[];
  setSelectedExamIds: (ids: string[]) => void;
  toggleExam: (id: string) => void;
}

const ExamSelectionContext = createContext<ExamSelectionState | null>(null);

function loadInitial(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function ExamSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedExamIds, setSelectedExamIdsState] = useState<string[]>(loadInitial);

  const value = useMemo<ExamSelectionState>(
    () => ({
      selectedExamIds,
      setSelectedExamIds: (ids) => {
        localStorage.setItem(KEY, JSON.stringify(ids));
        setSelectedExamIdsState(ids);
      },
      toggleExam: (id) => {
        setSelectedExamIdsState((prev) => {
          const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
          localStorage.setItem(KEY, JSON.stringify(next));
          return next;
        });
      },
    }),
    [selectedExamIds],
  );

  return <ExamSelectionContext.Provider value={value}>{children}</ExamSelectionContext.Provider>;
}

export function useExamSelection(): ExamSelectionState {
  const ctx = useContext(ExamSelectionContext);
  if (!ctx) throw new Error('useExamSelection must be used within ExamSelectionProvider');
  return ctx;
}
