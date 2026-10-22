import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { typingTestMeta, typingTestPath, typingTestStaticHtml } from '../../lib/typingPage.mjs';
import { passageFor, TYPING_MODES } from '../../data/typingTest.mjs';
import { scoreTyping, typingSpeeds } from '../../lib/typingScore.mjs';
import '../compare/ComparePage.css';
import '../exams/ExamHub.css';
import './TypingTest.css';
import { SocialLinks } from '../../components/layout/SocialLinks';

type Lang = 'en' | 'hi';
type Phase = 'ready' | 'running' | 'done';

const L = {
  en: {
    mode: 'Test',
    passage: 'Passage',
    newPassage: 'New passage',
    startHint: 'The clock starts with your first key. Type the passage below exactly as shown.',
    timeLeft: 'Time left',
    typed: (n: number) => `${n} key depressions typed`,
    finish: 'Finish now',
    again: 'Try again',
    yourTyping: 'Type here',
    result: 'Your result',
    netSpeed: 'Net speed',
    grossSpeed: 'Gross speed',
    kdph: 'key depressions per hour',
    wpm: 'w.p.m.',
    mistakes: 'Mistakes',
    full: 'full',
    half: 'half',
    errorRate: 'Error rate (our measure, see below)',
    reached: (r: number, t: number) => `You reached ${r} of the passage's ${t} words.`,
    standard: 'Official standard',
    meets: 'meets it',
    below: 'below it',
    kdphStandard: (n: string) => `${n} key depressions per hour`,
    wpmStandard: (n: number) => `${n} words per minute`,
    cglLimits: 'CGL DEST maximum errors allowed: 20% (UR), 25% (OBC/EWS), 30% (all other categories).',
    noErrorLimit: 'The CHSL notice publishes no maximum error percentage for this test; the Commission fixes the qualifying standards.',
    kinds: {
      omission: 'word left out', substitution: 'wrong word', spelling: 'spelling', addition: 'extra word', repetition: 'repeated word',
      incomplete: 'incomplete word', spacing: 'spacing', capitalisation: 'capitalisation', punctuation: 'punctuation', transposition: 'words swapped',
    } as Record<string, string>,
    expected: 'Passage',
    you: 'You typed',
    none: '(nothing)',
    moreMistakes: (n: number) => `and ${n} more`,
  },
  hi: {
    mode: 'टेस्ट',
    passage: 'अनुच्छेद',
    newPassage: 'नया अनुच्छेद',
    startHint: 'पहली कुंजी दबाते ही समय शुरू होगा। नीचे दिया अनुच्छेद ठीक वैसा ही टाइप करें।',
    timeLeft: 'बचा समय',
    typed: (n: number) => `${n} की-डिप्रेशन टाइप हुए`,
    finish: 'अभी समाप्त करें',
    again: 'फिर से करें',
    yourTyping: 'यहाँ टाइप करें',
    result: 'आपका परिणाम',
    netSpeed: 'नेट गति',
    grossSpeed: 'ग्रॉस गति',
    kdph: 'की-डिप्रेशन प्रति घंटा',
    wpm: 'w.p.m.',
    mistakes: 'गलतियाँ',
    full: 'पूरी',
    half: 'आधी',
    errorRate: 'त्रुटि-दर (हमारा माप, नीचे देखें)',
    reached: (r: number, t: number) => `आप अनुच्छेद के ${t} में से ${r} शब्दों तक पहुँचे।`,
    standard: 'आधिकारिक मानक',
    meets: 'पूरा करता है',
    below: 'इससे कम',
    kdphStandard: (n: string) => `${n} की-डिप्रेशन प्रति घंटा`,
    wpmStandard: (n: number) => `${n} शब्द प्रति मिनट`,
    cglLimits: 'CGL DEST में अनुमत अधिकतम त्रुटियाँ: 20% (UR), 25% (OBC/EWS), 30% (अन्य सभी श्रेणियाँ)।',
    noErrorLimit: 'CHSL अधिसूचना इस टेस्ट के लिए कोई अधिकतम त्रुटि-प्रतिशत नहीं छापती; अर्हता मानक आयोग तय करता है।',
    kinds: {
      omission: 'शब्द छूटा', substitution: 'गलत शब्द', spelling: 'वर्तनी', addition: 'अतिरिक्त शब्द', repetition: 'दोहराया शब्द',
      incomplete: 'अधूरा शब्द', spacing: 'स्पेसिंग', capitalisation: 'कैपिटल अक्षर', punctuation: 'विराम-चिह्न', transposition: 'शब्दों का क्रम',
    } as Record<string, string>,
    expected: 'अनुच्छेद',
    you: 'आपने टाइप किया',
    none: '(कुछ नहीं)',
    moreMistakes: (n: number) => `और ${n} गलतियाँ`,
  },
};

const formatClock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

function TypingTest({ lang }: { lang: Lang }) {
  const t = L[lang];
  const [modeKey, setModeKey] = useState(lang === 'hi' ? 'ldc-hi' : 'dest');
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mode = TYPING_MODES.find((m) => m.key === modeKey) ?? TYPING_MODES[0];
  const passage = useMemo(() => passageFor(modeKey, round), [modeKey, round]);
  const limitMs = mode.minutes * 60_000;

  useEffect(() => {
    if (phase !== 'running') return;
    const id = window.setInterval(() => {
      const now = Date.now() - startedAt;
      if (now >= limitMs) {
        setElapsedMs(limitMs);
        setPhase('done');
      } else {
        setElapsedMs(now);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [phase, startedAt, limitMs]);

  const reset = (nextMode = modeKey, nextRound = round) => {
    setModeKey(nextMode);
    setRound(nextRound);
    setPhase('ready');
    setTyped('');
    setElapsedMs(0);
    setStartedAt(0);
  };

  const onType = (value: string) => {
    if (phase === 'done') return;
    if (phase === 'ready' && value.length > 0) {
      setStartedAt(Date.now());
      setPhase('running');
    }
    setTyped(value);
  };

  const finish = () => {
    if (phase !== 'running') return;
    setElapsedMs(Math.min(limitMs, Date.now() - startedAt));
    setPhase('done');
  };

  const result = useMemo(() => {
    if (phase !== 'done') return null;
    const score = scoreTyping({ passage, typed, lang: mode.lang });
    const minutes = Math.max(elapsedMs, 1000) / 60_000;
    return { score, speeds: typingSpeeds(score, minutes) };
  }, [phase, passage, typed, mode.lang, elapsedMs]);

  const secondsLeft = Math.max(0, Math.ceil((limitMs - elapsedMs) / 1000));
  const number = (n: number) => n.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN');

  return (
    <div className="typing-test" lang={lang}>
      <div className="typing-controls">
        <label className="typing-field">
          <span>{t.mode}</span>
          <select value={modeKey} onChange={(e) => reset(e.target.value, 0)} disabled={phase === 'running'}>
            {TYPING_MODES.map((m) => (
              <option key={m.key} value={m.key}>
                {m.name[lang]} · {m.minutes} min
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="typing-secondary" onClick={() => reset(modeKey, round + 1)} disabled={phase === 'running'}>
          {t.newPassage}
        </button>
      </div>

      <p className="typing-hint">{t.startHint}</p>
      <div className={`typing-passage${mode.lang === 'hi' ? ' typing-hindi' : ''}`} lang={mode.lang} aria-label={t.passage}>
        {passage}
      </div>

      <div className="typing-status" aria-live="polite">
        <span className={`typing-clock${phase === 'running' && secondsLeft <= 60 ? ' typing-clock-low' : ''}`}>
          {t.timeLeft}: {formatClock(phase === 'ready' ? mode.minutes * 60 : secondsLeft)}
        </span>
        <span>{t.typed(typed.replace(/\s+/g, ' ').trim().length)}</span>
      </div>

      <textarea
        ref={inputRef}
        className={`typing-input${mode.lang === 'hi' ? ' typing-hindi' : ''}`}
        lang={mode.lang}
        aria-label={t.yourTyping}
        placeholder={t.yourTyping}
        value={typed}
        onChange={(e) => onType(e.target.value)}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        disabled={phase === 'done'}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        rows={8}
      />

      <div className="typing-actions">
        {phase === 'running' && (
          <button type="button" className="typing-primary" onClick={finish}>
            {t.finish}
          </button>
        )}
        {phase === 'done' && (
          <button
            type="button"
            className="typing-primary"
            onClick={() => {
              reset(modeKey, round + 1);
              window.setTimeout(() => inputRef.current?.focus(), 0);
            }}
          >
            {t.again}
          </button>
        )}
      </div>

      {result && (
        <section className="typing-result" aria-label={t.result}>
          <h2>{t.result}</h2>
          <dl className="typing-figures">
            <div>
              <dt>{t.netSpeed}</dt>
              <dd>
                {number(result.speeds.netKdph)} <small>{t.kdph}</small>
                <br />
                {result.speeds.netWpm} <small>{t.wpm}</small>
              </dd>
            </div>
            <div>
              <dt>{t.grossSpeed}</dt>
              <dd>
                {number(result.speeds.grossKdph)} <small>{t.kdph}</small>
                <br />
                {result.speeds.grossWpm} <small>{t.wpm}</small>
              </dd>
            </div>
            <div>
              <dt>{t.mistakes}</dt>
              <dd>
                {result.score.full} {t.full} · {result.score.half} {t.half}
              </dd>
            </div>
            <div>
              <dt>{t.errorRate}</dt>
              <dd>{result.score.errorPercent.toFixed(2)}%</dd>
            </div>
          </dl>
          <p className="hub-facts">{t.reached(result.score.wordsReached, result.score.passageWords)}</p>

          <h3>{t.standard}</h3>
          <ul className="typing-standard">
            {mode.targetKdph && (
              <li className={result.speeds.netKdph >= mode.targetKdph ? 'typing-ok' : 'typing-short'}>
                {t.kdphStandard(number(mode.targetKdph))}: {result.speeds.netKdph >= mode.targetKdph ? t.meets : t.below}
              </li>
            )}
            {mode.targetWpm && (
              <li className={result.speeds.netWpm >= mode.targetWpm ? 'typing-ok' : 'typing-short'}>
                {t.wpmStandard(mode.targetWpm)}: {result.speeds.netWpm >= mode.targetWpm ? t.meets : t.below}
              </li>
            )}
            <li>{mode.maxErrors ? t.cglLimits : t.noErrorLimit}</li>
          </ul>

          {result.score.mistakes.length > 0 && (
            <>
              <h3>{t.mistakes}</h3>
              <div className="hub-table-wrap">
                <table className="hub-table typing-mistakes">
                  <thead>
                    <tr>
                      <th>{t.expected}</th>
                      <th>{t.you}</th>
                      <th>{t.mistakes}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.score.mistakes.slice(0, 40).map((m, index) => (
                      <tr key={index}>
                        <td lang={mode.lang}>{m.expected ?? t.none}</td>
                        <td lang={mode.lang}>{m.typed ?? t.none}</td>
                        <td>
                          {t.kinds[m.kind] ?? m.kind} ({m.weight === 'full' ? t.full : t.half})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {result.score.mistakes.length > 40 && <p className="hub-facts">{t.moreMistakes(result.score.mistakes.length - 40)}</p>}
            </>
          )}
        </section>
      )}
    </div>
  );
}

export function TypingTestPage({ lang }: { lang: Lang }) {
  const meta = typingTestMeta(lang);
  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: typingTestPath(lang),
    type: 'website',
    lang,
    alternateLanguages: [
      { lang: 'en', path: typingTestPath('en') },
      { lang: 'hi', path: typingTestPath('hi') },
      { lang: 'x-default', path: typingTestPath('en') },
    ],
  });
  // The static half (rules, scoring, sources) is the same HTML the prerender writes; the live test is rendered by
  // React right after the lede, where the static page leaves #typing-test-app.
  const [before, after] = typingTestStaticHtml(lang).split(/<div id="typing-test-app"[^]*?<\/div>/);

  return (
    <div className="compare-page">
      <header className="pub-header">
        <div className="wrap pub-nav">
          <Link className="pub-brand" to={lang === 'hi' ? '/hi/' : '/'}>
            <img src="/assets/icon-48.png" srcSet="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />
            Pariksha Saathi
          </Link>
          <nav className="pub-nav-links">
            <Link to="/app/exam-notices/">{lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices'}</Link>
          </nav>
          <Link className="pub-exams-link" to={EXAMS_LINK[lang].href} aria-label={EXAMS_LINK[lang].title}>
            {EXAMS_LINK[lang].label}
          </Link>
          <Link className="pub-cta" to="/onboarding/">
            {lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}
          </Link>
        </div>
      </header>
      <article className="wrap compare-article">
        <div dangerouslySetInnerHTML={{ __html: before }} />
        <TypingTest lang={lang} />
        <div dangerouslySetInnerHTML={{ __html: after ?? '' }} />
      </article>
      <footer className="pub-footer">
        <div className="wrap pub-footer-links">
          <Link to="/about/">About &amp; editorial standards</Link>
          <Link to="/privacy/">Privacy Policy</Link>
          <Link to="/terms/">Terms of Use</Link>
          <Link to="/contact/">Contact</Link>
          <Link to="/downloads/">Daily PDF</Link>
        <SocialLinks /></div>
      </footer>
    </div>
  );
}
