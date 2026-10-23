import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ApiError } from '../../api/client';
import { getMockPaper } from '../../api/mocks';
import { pyqLabel } from '../../components/PyqBadge';
import { Button, Note, QuizOption, Spinner } from '../../components/ui/Primitives';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { mockPlayerPath, mockTestsPath } from '../../lib/mockTestsPath.mjs';
import type { MockPaper, Question } from '../../types/api';
import '../app/QuizPage.css';
import './MockTestPage.css';

type Lang = 'en' | 'hi';

// The player's own labels (it runs outside the app shell, so it does not use the app's language setting: the mock list
// page it was opened from says which language via ?lang=). Hindi follows src/data/hindiGlossary.mjs.
const T = {
  en: {
    loading: 'Loading the mock…',
    failed: 'This mock could not be loaded. Check your connection and try again.',
    missing: 'There is no such mock. Pick one from the list.',
    allMocks: 'All mock tests',
    heading: (exam: string, stage: string, n: number, of: number) => `${exam} · ${stage} · Mock ${n} of ${of}`,
    section: 'Section',
    questions: 'Questions',
    total: 'Total',
    time: (m: number) => `Time: ${m} minutes for the whole paper; the paper is submitted when time runs out.`,
    negative: (x: number | null) => (x ? `Negative marking: ${fraction(x)} mark deducted for each wrong answer; an unanswered question scores zero.` : 'Negative marking: not stated in the notification, so nothing is deducted.'),
    pattern: (cycle: string) => `Pattern from the official notification (${cycle})`,
    sscNote: 'Questions from SSC\'s official papers say so; the rest are from the Pariksha Saathi question bank.',
    englishNote: 'Some topics have no Hindi questions yet, so a few questions are in English.',
    last: (score: string, correct: number, total: number, when: string) => `Your last score on this mock: ${score} (${correct} of ${total} correct), ${when}.`,
    start: 'Start the mock',
    progress: (i: number, n: number, answered: number, marked: number) => `Question ${i} of ${n} · Answered: ${answered} · Marked: ${marked}`,
    mark: '🚩 Mark for review',
    unmark: 'Unmark',
    clear: 'Clear answer',
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit',
    confirm: (left: number) => (left > 0 ? `${left} question(s) are unanswered. Submit the mock?` : 'Submit the mock?'),
    leave: 'Your answers are not saved if you leave now.',
    resultTitle: (n: number) => `Mock ${n}: your result`,
    score: (score: string, max: number) => `Score: ${score} out of ${max}`,
    counts: (c: number, w: number, s: number) => `${c} correct · ${w} wrong · ${s} not answered`,
    deducted: (x: string) => `Negative marks deducted: ${x}`,
    previousScore: (score: string) => `Previous attempt on this mock: ${score}`,
    bySection: 'Section-wise',
    thCorrect: 'Correct',
    thWrong: 'Wrong',
    thScore: 'Marks',
    retake: 'Retake this mock',
    nextMock: (n: number) => `Next: Mock ${n}`,
    review: 'Review your answers',
    filters: { all: 'All', wrong: 'Wrong', skipped: 'Not answered' },
    yourAnswer: 'Your answer',
    notAnswered: 'Not answered',
    answer: 'Correct answer',
  },
  hi: {
    loading: 'मॉक लोड हो रहा है…',
    failed: 'यह मॉक लोड नहीं हो सका। इंटरनेट कनेक्शन देखकर फिर से कोशिश करें।',
    missing: 'ऐसा कोई मॉक नहीं है। सूची से कोई मॉक चुनें।',
    allMocks: 'सभी मॉक टेस्ट',
    heading: (exam: string, stage: string, n: number, of: number) => `${exam} · ${stage} · मॉक ${n} / ${of}`,
    section: 'खंड',
    questions: 'प्रश्न',
    total: 'कुल',
    time: (m: number) => `समय: पूरे प्रश्नपत्र के लिए ${m} मिनट; समय पूरा होते ही प्रश्नपत्र जमा हो जाता है।`,
    negative: (x: number | null) => (x ? `नकारात्मक अंकन: हर गलत उत्तर पर ${fraction(x)} अंक काटा जाता है; बिना उत्तर वाले प्रश्न पर शून्य।` : 'नकारात्मक अंकन: अधिसूचना में नहीं बताया गया, इसलिए कुछ नहीं काटा जाता।'),
    pattern: (cycle: string) => `पैटर्न आधिकारिक अधिसूचना (${cycle}) से`,
    sscNote: 'SSC के आधिकारिक प्रश्नपत्रों से लिए गए प्रश्न यह बताते हैं; बाकी Pariksha Saathi के प्रश्न बैंक से हैं।',
    englishNote: 'कुछ विषयों के हिंदी प्रश्न अभी नहीं हैं, इसलिए कुछ प्रश्न अंग्रेज़ी में हैं।',
    last: (score: string, correct: number, total: number, when: string) => `इस मॉक में आपका पिछला स्कोर: ${score} (${total} में से ${correct} सही), ${when}।`,
    start: 'मॉक शुरू करें',
    progress: (i: number, n: number, answered: number, marked: number) => `प्रश्न ${i} / ${n} · उत्तर दिए: ${answered} · चिह्नित: ${marked}`,
    mark: '🚩 समीक्षा के लिए चिह्नित करें',
    unmark: 'चिह्न हटाएँ',
    clear: 'उत्तर हटाएँ',
    previous: 'पिछला',
    next: 'अगला',
    submit: 'जमा करें',
    confirm: (left: number) => (left > 0 ? `${left} प्रश्नों के उत्तर नहीं दिए गए। मॉक जमा करें?` : 'मॉक जमा करें?'),
    leave: 'अभी छोड़ने पर आपके उत्तर सहेजे नहीं जाएँगे।',
    resultTitle: (n: number) => `मॉक ${n}: आपका परिणाम`,
    score: (score: string, max: number) => `स्कोर: ${max} में से ${score}`,
    counts: (c: number, w: number, s: number) => `${c} सही · ${w} गलत · ${s} बिना उत्तर`,
    deducted: (x: string) => `नकारात्मक अंकन से कटे अंक: ${x}`,
    previousScore: (score: string) => `इस मॉक का पिछला प्रयास: ${score}`,
    bySection: 'खंडवार',
    thCorrect: 'सही',
    thWrong: 'गलत',
    thScore: 'अंक',
    retake: 'यह मॉक दोबारा दें',
    nextMock: (n: number) => `अगला: मॉक ${n}`,
    review: 'अपने उत्तर देखें',
    filters: { all: 'सभी', wrong: 'गलत', skipped: 'बिना उत्तर' },
    yourAnswer: 'आपका उत्तर',
    notAnswered: 'उत्तर नहीं दिया',
    answer: 'सही उत्तर',
  },
};

function fraction(x: number): string {
  if (Math.abs(x - 1 / 3) < 1e-6) return '1/3';
  if (Math.abs(x - 0.25) < 1e-6) return '1/4';
  return String(Math.round(x * 100) / 100);
}
const marks = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(2));

interface Outcome {
  question: Question;
  sectionIndex: number;
  selected: number | null;
  correct: boolean;
  marks: number;
}

function score(paper: MockPaper, selections: Map<string, number>): Outcome[] {
  return paper.sections.flatMap((section, sectionIndex) =>
    section.questions.map((question) => {
      const selected = selections.get(question.id) ?? null;
      const correct = selected === question.correctOptionIndex;
      return { question, sectionIndex, selected, correct, marks: selected === null ? 0 : correct ? question.marks : -question.negativeMarks };
    }),
  );
}

// The last result per mock, on this device only: a convenience for "your last score", never relied on.
interface LastResult { score: number; correct: number; total: number; at: string }
const storageKey = (paperId: string) => `ps_mock_last:${paperId}`;
function readLast(paperId: string): LastResult | null {
  try {
    const raw = localStorage.getItem(storageKey(paperId));
    return raw ? (JSON.parse(raw) as LastResult) : null;
  } catch {
    return null;
  }
}
function writeLast(paperId: string, result: LastResult) {
  try {
    localStorage.setItem(storageKey(paperId), JSON.stringify(result));
  } catch {
    // Private mode or blocked storage: the result screen still shows the score.
  }
}

/**
 * One numbered Railway mock, sat in the browser (/app/mock-tests/:examId/:stageKey/:number, ?lang=hi for Hindi). The paper
 * comes from the server, in the official pattern of its stage, and is the same set on every attempt (see
 * src/lib/mockTestsPage.mjs for the list page and pariksha-saathi-server docs/REAL_PAPER.md for the series).
 */
export function MockTestPage() {
  const { examId = '', stageKey = '', number = '' } = useParams();
  const [searchParams] = useSearchParams();
  const lang: Lang = searchParams.get('lang') === 'hi' ? 'hi' : 'en';
  const t = T[lang];
  const mockNumber = Number(number);
  const valid = Number.isInteger(mockNumber) && mockNumber > 0;

  const query = useQuery({
    queryKey: ['mock-paper', examId, stageKey, mockNumber, lang],
    queryFn: () => getMockPaper(examId, stageKey, mockNumber, lang),
    enabled: valid,
    retry: 1,
  });
  const paper = query.data;
  const questions = useMemo(() => paper?.sections.flatMap((s) => s.questions) ?? [], [paper]);
  const sectionStarts = useMemo(() => {
    const starts: number[] = [];
    let at = 0;
    for (const s of paper?.sections ?? []) {
      starts.push(at);
      at += s.questions.length;
    }
    return starts;
  }, [paper]);

  useDocumentMeta({
    title: paper ? t.heading(paper.examName, paper.stageName[lang], paper.mock.number, paper.mock.count) : t.loading,
    description: t.allMocks,
    path: mockPlayerPath(examId, stageKey, mockNumber || 1, lang),
    robots: 'noindex,follow',
    lang,
  });

  const [phase, setPhase] = useState<'intro' | 'running' | 'done'>('intro');
  const [index, setIndex] = useState(0);
  const [selections, setSelections] = useState<Map<string, number>>(new Map());
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [filter, setFilter] = useState<'all' | 'wrong' | 'skipped'>('all');
  const [previous, setPrevious] = useState<LastResult | null>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (paper) setPrevious(readLast(paper.paperId));
  }, [paper]);

  const outcomes = useMemo(() => (phase === 'done' && paper ? score(paper, selections) : []), [phase, paper, selections]);

  const submit = useCallback(() => {
    if (!paper || submittedRef.current) return;
    submittedRef.current = true;
    const result = score(paper, selections);
    setPrevious(readLast(paper.paperId));
    writeLast(paper.paperId, {
      score: result.reduce((n, o) => n + o.marks, 0),
      correct: result.filter((o) => o.correct).length,
      total: result.length,
      at: new Date().toISOString(),
    });
    setPhase('done');
    window.scrollTo(0, 0);
  }, [paper, selections]);

  function start() {
    if (!paper) return;
    submittedRef.current = false;
    setSelections(new Map());
    setMarked(new Set());
    setIndex(0);
    setFilter('all');
    setSecondsLeft(paper.durationMinutes * 60);
    setPhase('running');
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (phase !== 'running') return;
    if (secondsLeft <= 0) {
      submit();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, secondsLeft, submit]);

  useEffect(() => {
    if (phase !== 'running') return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = t.leave;
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [phase, t.leave]);

  const listPath = mockTestsPath(examId, lang);
  if (!valid || (query.error instanceof ApiError && query.error.status === 404)) {
    return <section className="mock-test"><p role="alert">{t.missing}</p><p><a href={listPath}>{t.allMocks}</a></p></section>;
  }
  if (query.isError) return <section className="mock-test"><p role="alert">{t.failed}</p><Button onClick={() => query.refetch()}>↻</Button></section>;
  if (!paper) return <section className="mock-test"><Spinner /></section>;

  const heading = t.heading(paper.examName, paper.stageName[lang], paper.mock.number, paper.mock.count);
  const englishInHindi = lang === 'hi' && paper.sections.some((s) => s.shownInEnglishFallback);

  if (phase === 'intro') {
    const when = previous ? new Date(previous.at).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
    return (
      <section className="mock-test">
        <p><a href={listPath}>&larr; {t.allMocks}</a></p>
        <h1>{heading}</h1>
        <div className="hub-table-wrap">
          <table className="hub-table">
            <thead><tr><th>{t.section}</th><th>{t.questions}</th></tr></thead>
            <tbody>
              {paper.sections.map((s) => <tr key={s.key}><td>{s.name[lang]}</td><td>{s.questions.length}</td></tr>)}
              <tr><td><strong>{t.total}</strong></td><td><strong>{questions.length}</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p>{t.time(paper.durationMinutes)}</p>
        <p>{t.negative(paper.negativeMarksPerWrong)}</p>
        <p className="mock-small">{t.pattern(paper.cycleLabel)} <a href={paper.sourceUrl} target="_blank" rel="noreferrer">&#8599;</a>. {t.sscNote}</p>
        {englishInHindi && <Note>{t.englishNote}</Note>}
        {previous && <Note>{t.last(marks(previous.score), previous.correct, previous.total, when)}</Note>}
        <Button onClick={start}>{t.start}</Button>
      </section>
    );
  }

  if (phase === 'done') {
    const total = outcomes.reduce((n, o) => n + o.marks, 0);
    const max = outcomes.reduce((n, o) => n + o.question.marks, 0);
    const correct = outcomes.filter((o) => o.correct).length;
    const wrong = outcomes.filter((o) => o.selected !== null && !o.correct);
    const skipped = outcomes.filter((o) => o.selected === null).length;
    const deducted = wrong.reduce((n, o) => n + o.question.negativeMarks, 0);
    const shown = outcomes
      .map((o, i) => ({ ...o, position: i + 1 }))
      .filter((o) => (filter === 'wrong' ? o.selected !== null && !o.correct : filter === 'skipped' ? o.selected === null : true));
    return (
      <section className="mock-test">
        <p><a href={listPath}>&larr; {t.allMocks}</a></p>
        <h1>{t.resultTitle(paper.mock.number)}</h1>
        <p className="mock-score">{t.score(marks(total), max)}</p>
        <p>{t.counts(correct, wrong.length, skipped)}</p>
        {deducted > 0 && <p>{t.deducted(marks(deducted))}</p>}
        {previous && <p>{t.previousScore(marks(previous.score))}</p>}
        <h2>{t.bySection}</h2>
        <div className="hub-table-wrap">
          <table className="hub-table">
            <thead><tr><th>{t.section}</th><th>{t.thCorrect}</th><th>{t.thWrong}</th><th>{t.thScore}</th></tr></thead>
            <tbody>
              {paper.sections.map((s, si) => {
                const inSection = outcomes.filter((o) => o.sectionIndex === si);
                return (
                  <tr key={s.key}>
                    <td>{s.name[lang]}</td>
                    <td>{inSection.filter((o) => o.correct).length} / {inSection.length}</td>
                    <td>{inSection.filter((o) => o.selected !== null && !o.correct).length}</td>
                    <td>{marks(inSection.reduce((n, o) => n + o.marks, 0))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mock-actions">
          <Button onClick={start}>{t.retake}</Button>
          {paper.mock.number < paper.mock.count && (
            <a className="mock-next" href={mockPlayerPath(examId, stageKey, paper.mock.number + 1, lang)}>{t.nextMock(paper.mock.number + 1)} &rarr;</a>
          )}
        </div>
        <h2>{t.review}</h2>
        <div className="mock-filters" role="group">
          {(['all', 'wrong', 'skipped'] as const).map((f) => (
            <button key={f} type="button" className={`mock-filter${filter === f ? ' mock-filter-on' : ''}`} onClick={() => setFilter(f)}>{t.filters[f]}</button>
          ))}
        </div>
        <ol className="mock-review">
          {shown.map((o) => (
            <li key={o.question.id} value={o.position}>
              {pyqLabel(o.question, lang) && <span className="pyq-badge">{pyqLabel(o.question, lang)}</span>}
              <p className="quiz-question-text">{o.question.text}</p>
              <div className="quiz-options">
                {o.question.options.map((option, i) => (
                  <QuizOption key={i} label={String.fromCharCode(65 + i)} state={i === o.question.correctOptionIndex ? 'correct' : i === o.selected ? 'incorrect' : 'unselected'}>
                    {option}
                  </QuizOption>
                ))}
              </div>
              <p className="mock-small">
                {t.yourAnswer}: {o.selected === null ? t.notAnswered : String.fromCharCode(65 + o.selected)} · {t.answer}: {String.fromCharCode(65 + o.question.correctOptionIndex)}
              </p>
              <p>{o.question.explanation}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  const current = questions[index];
  const sectionIndex = sectionStarts.reduce((found, startAt, si) => (index >= startAt ? si : found), 0);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = current ? pyqLabel(current, lang) : null;
  return (
    <section className="mock-test quiz-page">
      <div className="quiz-header">
        <span className="quiz-progress">{t.progress(index + 1, questions.length, selections.size, marked.size)}</span>
        <span className="quiz-timer">{minutes}:{seconds.toString().padStart(2, '0')}</span>
      </div>
      <p className="mock-small">{heading}</p>
      <div className="mock-sections" role="tablist">
        {paper.sections.map((s, si) => (
          <button key={s.key} type="button" role="tab" aria-selected={si === sectionIndex} className={`mock-section${si === sectionIndex ? ' mock-section-on' : ''}`} onClick={() => setIndex(sectionStarts[si])}>
            {s.name[lang]}
          </button>
        ))}
      </div>
      {current && (
        <div className="quiz-question-card">
          {label && <span className="pyq-badge">{label}</span>}
          <p className="quiz-question-text">{current.text}</p>
          <div className="quiz-options">
            {current.options.map((option, i) => (
              <QuizOption key={i} label={String.fromCharCode(65 + i)} state={selections.get(current.id) === i ? 'selected' : 'unselected'} onClick={() => setSelections((prev) => new Map(prev).set(current.id, i))}>
                {option}
              </QuizOption>
            ))}
          </div>
        </div>
      )}
      {current && (
        <div className="mock-row">
          <button
            type="button"
            className="quiz-mark-review"
            onClick={() => setMarked((prev) => {
              const next = new Set(prev);
              if (next.has(current.id)) next.delete(current.id);
              else next.add(current.id);
              return next;
            })}
          >
            {marked.has(current.id) ? t.unmark : t.mark}
          </button>
          {selections.has(current.id) && (
            <button
              type="button"
              className="quiz-mark-review"
              onClick={() => setSelections((prev) => {
                const next = new Map(prev);
                next.delete(current.id);
                return next;
              })}
            >
              {t.clear}
            </button>
          )}
        </div>
      )}
      <div className="quiz-jump-strip">
        {questions.map((q, i) => {
          const cls = marked.has(q.id) ? 'jump-cell-marked' : selections.has(q.id) ? 'jump-cell-answered' : 'jump-cell-unvisited';
          return (
            <button key={q.id} type="button" className={`quiz-jump-cell ${cls}${i === index ? ' jump-cell-current' : ''}`} onClick={() => setIndex(i)}>
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="quiz-nav">
        <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>{t.previous}</Button>
        {index < questions.length - 1 && <Button onClick={() => setIndex((i) => i + 1)}>{t.next}</Button>}
        <Button variant="outline" onClick={() => { if (window.confirm(t.confirm(questions.length - selections.size))) submit(); }}>{t.submit}</Button>
      </div>
    </section>
  );
}
