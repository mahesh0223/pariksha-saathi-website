import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTopicPyqs } from '../../api/pyq';
import { pyqLabel } from '../../components/PyqBadge';
import { Button, QuizOption, Spinner } from '../../components/ui/Primitives';
import { PYQ_TOPICS } from '../../data/pyqTopics.mjs';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { pyqPaperHref, pyqPracticePath } from '../../lib/pyqPractice.mjs';
import '../app/QuizPage.css';
import '../mocks/MockTestPage.css';

type Lang = 'en' | 'hi';
const ROUND = 20;

// The player's own labels: it runs outside the app shell, so the topic page it was opened from says the language (?lang=).
const T = {
  en: {
    title: (name: string) => `${name}: previous-year questions`,
    intro: (n: number) => `${n} questions on this topic from official papers. You get ${ROUND} at a time, picked at random; each answer is checked as you go, with the official answer and an explanation.`,
    missing: 'There are no previous-year questions on this topic in this language yet.',
    failed: 'The questions could not be loaded. Check your connection and try again.',
    back: 'Back to the topic',
    allTopics: 'All practice topics',
    progress: (i: number, n: number, correct: number, answered: number) => `Question ${i} of ${n} · ${correct} of ${answered} right`,
    paper: 'See it on its solved paper',
    right: 'Right.',
    wrong: (letter: string) => `Not quite: the official answer is (${letter}).`,
    previous: 'Previous',
    next: 'Next',
    finish: 'See your result',
    result: (c: number, n: number) => `You got ${c} of ${n} right.`,
    skipped: (n: number) => `${n} not answered.`,
    more: `${ROUND} more questions`,
  },
  hi: {
    title: (name: string) => `${name}: पिछले वर्ष के प्रश्न`,
    intro: (n: number) => `आधिकारिक प्रश्नपत्रों से इस विषय के ${n} प्रश्न। एक बार में ${ROUND} प्रश्न मिलते हैं, बिना क्रम के चुने हुए; हर उत्तर उसी समय जाँचा जाता है, आधिकारिक उत्तर और हल के साथ।`,
    missing: 'इस विषय के पिछले वर्ष के प्रश्न इस भाषा में अभी नहीं हैं।',
    failed: 'प्रश्न लोड नहीं हो सके। इंटरनेट कनेक्शन देखकर फिर से कोशिश करें।',
    back: 'विषय पर लौटें',
    allTopics: 'सभी अभ्यास विषय',
    progress: (i: number, n: number, correct: number, answered: number) => `प्रश्न ${i} / ${n} · ${answered} में से ${correct} सही`,
    paper: 'इसे इसके हल प्रश्नपत्र पर देखें',
    right: 'सही।',
    wrong: (letter: string) => `सही नहीं: आधिकारिक उत्तर (${letter}) है।`,
    previous: 'पिछला',
    next: 'अगला',
    finish: 'अपना परिणाम देखें',
    result: (c: number, n: number) => `${n} में से ${c} सही।`,
    skipped: (n: number) => `${n} प्रश्नों का उत्तर नहीं दिया।`,
    more: `${ROUND} और प्रश्न`,
  },
};

const letter = (i: number) => String.fromCharCode(65 + i);

/**
 * A topic's previous-year questions, sat in the browser (/app/pyq-practice/:topicKey/, ?lang=hi for Hindi): a random
 * set of 20 from the official papers, each checked as it is answered and linked to its solved-paper page. Opened from
 * the topic lists (/q/, /hi/q/), which link the questions but do not copy them; noindexed, like the mock player.
 */
export function PyqPracticePage() {
  const { topicKey = '' } = useParams();
  const [searchParams] = useSearchParams();
  const lang: Lang = searchParams.get('lang') === 'hi' ? 'hi' : 'en';
  const t = T[lang];
  const topic = PYQ_TOPICS[topicKey];
  const available = topic?.[lang].count ?? 0;
  const [round, setRound] = useState(0);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<Map<string, number>>(new Map());
  const [done, setDone] = useState(false);

  const query = useQuery({
    queryKey: ['pyq-practice', topicKey, lang, round],
    queryFn: () => getTopicPyqs(topicKey, lang, ROUND),
    enabled: available > 0,
    staleTime: Infinity,
    retry: 1,
  });
  const questions = query.data ?? [];

  useDocumentMeta({
    title: topic ? t.title(topic[lang].name) : t.missing,
    description: topic ? t.intro(available) : t.missing,
    path: pyqPracticePath(topicKey, lang),
    robots: 'noindex,follow',
    lang,
  });

  useEffect(() => {
    setIndex(0);
    setChosen(new Map());
    setDone(false);
  }, [round]);

  const topicPath = topic?.[lang].hasPage ? `${lang === 'hi' ? '/hi/q/' : '/q/'}${topic.slug}/` : null;
  const backLink = topicPath ? <a href={topicPath}>&larr; {t.back}</a> : <a href={lang === 'hi' ? '/hi/q/' : '/q/'}>&larr; {t.allTopics}</a>;

  if (!topic || available === 0) {
    return <section className="mock-test"><p role="alert">{t.missing}</p><p>{backLink}</p></section>;
  }
  if (query.isError) return <section className="mock-test"><p role="alert">{t.failed}</p><Button onClick={() => query.refetch()}>↻</Button></section>;
  if (!query.data) return <section className="mock-test"><Spinner /></section>;

  const correct = questions.filter((q) => chosen.get(q.id) === q.correctOptionIndex).length;

  if (done) {
    return (
      <section className="mock-test" lang={lang}>
        <p>{backLink}</p>
        <h1>{t.title(topic[lang].name)}</h1>
        <p className="mock-score">{t.result(correct, questions.length)}</p>
        {chosen.size < questions.length && <p>{t.skipped(questions.length - chosen.size)}</p>}
        <div className="mock-actions">
          <Button onClick={() => { setRound((r) => r + 1); window.scrollTo(0, 0); }}>{t.more}</Button>
        </div>
      </section>
    );
  }

  const current = questions[index];
  const picked = current ? chosen.get(current.id) : undefined;
  const answered = picked !== undefined;
  const label = current ? pyqLabel(current, lang) : null;
  const paperHref = current ? pyqPaperHref(current) : null;
  // A cloze or comprehension question carries its passage before a blank line (the seed puts it there): passage plain,
  // the question itself bold.
  const parts = current ? current.text.split(/\n{2,}/) : [];
  const stem = parts.at(-1) ?? '';
  const passage = parts.slice(0, -1).join('\n\n');
  return (
    <section className="mock-test quiz-page" lang={lang}>
      <p>{backLink}</p>
      <h1>{t.title(topic[lang].name)}</h1>
      {index === 0 && !answered && <p className="mock-small">{t.intro(available)}</p>}
      <div className="quiz-header">
        <span className="quiz-progress">{t.progress(index + 1, questions.length, correct, chosen.size)}</span>
      </div>
      {current && (
        <div className="quiz-question-card">
          {label && <span className="pyq-badge">{label}</span>}
          {passage && <p className="pyq-practice-passage">{passage}</p>}
          <p className="quiz-question-text" style={{ whiteSpace: 'pre-line' }}>{stem}</p>
          <div className="quiz-options">
            {current.options.map((option, i) => (
              <QuizOption
                key={i}
                label={letter(i)}
                state={!answered ? 'unselected' : i === current.correctOptionIndex ? 'correct' : i === picked ? 'incorrect' : 'unselected'}
                onClick={answered ? undefined : () => setChosen((prev) => new Map(prev).set(current.id, i))}
              >
                {option}
              </QuizOption>
            ))}
          </div>
          {answered && (
            <div className="pyq-practice-answer">
              <p><strong>{picked === current.correctOptionIndex ? t.right : t.wrong(letter(current.correctOptionIndex))}</strong></p>
              <p>{current.explanation}</p>
              {paperHref && <p className="mock-small"><a href={paperHref}>{t.paper} &rarr;</a></p>}
            </div>
          )}
        </div>
      )}
      <div className="quiz-nav">
        <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>{t.previous}</Button>
        {index < questions.length - 1
          ? <Button onClick={() => { setIndex((i) => i + 1); window.scrollTo(0, 0); }}>{t.next}</Button>
          : <Button onClick={() => { setDone(true); window.scrollTo(0, 0); }}>{t.finish}</Button>}
      </div>
    </section>
  );
}
