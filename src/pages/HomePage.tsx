import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useExamSelection } from '../state/ExamSelectionContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getCurrentAffairs } from '../api/currentAffairs';
import { getExamUpdates } from '../api/examUpdates';
import { Card } from '../components/ui/Primitives';
import { CurrentAffairsItemCard } from '../components/CurrentAffairsItemCard';
import { AdSlot } from '../components/ads/AdSlot';
import {
  IconBook,
  IconTarget,
  IconCheckNote,
  IconBrowser,
  IconGlobe,
  IconNewspaper,
  IconBookmark,
  IconGuest,
  IconCalendarFlag,
  IconQuizBubble,
  IconDigest,
} from '../components/HomeIcons';
import '../pages/app/UpdatesPage.css';
import './HomePage.css';

const FEATURES = [
  {
    icon: IconBook,
    accent: 'navy' as const,
    title: 'Study, then practice',
    body: 'Topic-wise lessons across Reasoning, Quant, English and General Awareness, each followed by practice in the real exam pattern — negative marking included.',
  },
  {
    icon: IconTarget,
    accent: 'terracotta' as const,
    title: 'Three ways to practice',
    body: 'Topic-wise quizzes for one weak spot, sectional tests by subject, or full-length mocks spanning your whole exam.',
  },
  {
    icon: IconCheckNote,
    accent: 'sage' as const,
    title: 'Learn from your mistakes',
    body: 'Every wrong answer lands in your Mistake Notebook automatically, with the topic you should focus on next.',
  },
  {
    icon: IconBrowser,
    accent: 'amber' as const,
    title: 'Works right in your browser',
    body: 'No installs — study on any device with progress saved locally and available whenever you come back.',
  },
  {
    icon: IconGlobe,
    accent: 'navy' as const,
    title: 'English or Hindi',
    body: 'Switch languages any time — no reinstalling, no separate site.',
  },
  {
    icon: IconNewspaper,
    accent: 'terracotta' as const,
    title: 'Real current affairs',
    body: 'Dated current-affairs capsules and official exam notifications, each with a source you can check yourself.',
  },
  {
    icon: IconBookmark,
    accent: 'sage' as const,
    title: 'Mistake Notebook & Bookmarks',
    body: 'Build your own revision list from anything you get wrong or want to revisit.',
  },
  {
    icon: IconGuest,
    accent: 'amber' as const,
    title: 'No account required',
    body: 'Study fully as a guest. Create a free account only if you want progress backed up across devices.',
  },
  {
    icon: IconCalendarFlag,
    accent: 'navy' as const,
    title: '90-Day Challenge',
    body: 'A day-by-day plan across Foundation, Drills and Mock Gauntlet phases, with badges for streaks and subject mastery.',
  },
  {
    icon: IconQuizBubble,
    accent: 'terracotta' as const,
    title: 'Weekly Current Affairs Quiz',
    body: "A quiz built entirely from that week's real current-affairs items, so revision and current-affairs practice happen together.",
  },
  {
    icon: IconDigest,
    accent: 'sage' as const,
    title: 'Daily Digest',
    body: 'A short daily reading list pulled from the latest current affairs and exam notices, with an estimated read time.',
  },
];

const TRUST_STATS = [
  { value: '7', label: 'exams covered' },
  { value: '100%', label: 'free, no paywall' },
  { value: 'EN / HI', label: 'both languages' },
  { value: 'Offline', label: 'after first visit' },
];

const HOW_IT_WORKS = [
  {
    n: '1',
    title: 'Pick your exam(s)',
    body: 'Choose one or more of SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO or SBI Clerk. Add or change exams any time.',
  },
  {
    n: '2',
    title: 'Study, then practice',
    body: 'Work through topic-wise lessons, then practice the same topics as quizzes in the real exam pattern, negative marking included.',
  },
  {
    n: '3',
    title: 'Track and revise',
    body: 'Every wrong answer lands in your Mistake Notebook automatically, so revision stays focused on what you actually got wrong.',
  },
];

const EXAM_COVERAGE = [
  {
    name: 'SSC CGL',
    body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness. <a href="/compare/ssc-cgl-syllabus">Full syllabus &amp; exam pattern &rarr;</a>',
  },
  {
    name: 'SSC MTS',
    body: 'Focused lessons and practice across Numerical Ability, Reasoning and English, plus current-affairs coverage for General Awareness. <a href="/compare/ssc-mts-syllabus">Full syllabus &amp; exam pattern &rarr;</a>',
  },
  {
    name: 'SSC CHSL',
    body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness. <a href="/compare/ssc-chsl-syllabus">Full syllabus &amp; exam pattern &rarr;</a>',
  },
  {
    name: 'IBPS PO',
    body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness. <a href="/compare/ibps-po-syllabus">Full syllabus &amp; exam pattern &rarr;</a>',
  },
  {
    name: 'IBPS Clerk',
    body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness. <a href="/compare/ibps-clerk-syllabus">Full syllabus &amp; exam pattern &rarr;</a>',
  },
  {
    name: 'SBI PO',
    body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking &amp; Economy Awareness. <a href="/compare/sbi-po-syllabus">Full syllabus &amp; exam pattern &rarr;</a>',
  },
  {
    name: 'SBI Clerk',
    body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for General &amp; Financial Awareness. <a href="/compare/sbi-clerk-syllabus">Full syllabus &amp; exam pattern &rarr;</a>',
  },
];

const FAQS = [
  {
    q: 'Is Pariksha Saathi free?',
    a: 'Yes. Every lesson, practice quiz, mock test and current-affairs capsule is free, with no paywalled content.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. You can study fully as a guest, with progress saved locally on your device. Create a free account only if you want that progress backed up across devices.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes, after your first visit. Lessons, quizzes and practice keep working with patchy or no internet, and sync again once you’re back online.',
  },
  {
    q: 'Is content available in Hindi?',
    a: 'Yes. Switch between English and Hindi any time, for the same content, without reinstalling or visiting a separate site.',
  },
  {
    q: 'Where does the current-affairs content come from?',
    a: 'Every current-affairs item and exam notification links to its original official source — PIB or the exam body’s own site — so you can verify it yourself.',
  },
  {
    q: 'Is Pariksha Saathi affiliated with SSC, IBPS or SBI?',
    a: 'No. Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body.',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { selectedExamIds } = useExamSelection();

  function startStudying() {
    navigate(selectedExamIds.length > 0 ? '/app/home' : '/onboarding');
  }

  useDocumentMeta({
    title: 'Pariksha Saathi',
    description:
      'Free, offline-first exam prep for SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk. Study, practice, and take mock tests right in your browser.',
    path: '/',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Pariksha Saathi',
        url: 'https://parikshasaathi.com',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Pariksha Saathi',
        url: 'https://parikshasaathi.com',
        logo: 'https://parikshasaathi.com/assets/icon-512.png',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });

  const affairsQuery = useQuery({
    queryKey: ['current-affairs', 'en', 'home-preview'],
    queryFn: () => getCurrentAffairs({ lang: 'en', limit: 4 }),
  });

  const noticesQuery = useQuery({
    queryKey: ['exam-updates', 'en', 'home-preview'],
    queryFn: () => getExamUpdates([], 'en'),
  });
  const latestNotices = noticesQuery.data?.slice(0, 4) ?? [];

  return (
    <div>
      <header className="pub-header">
        <div className="wrap pub-nav">
          <a className="pub-brand" href="#top">
            <img src="/assets/icon-512.png" alt="" />
            Pariksha Saathi
          </a>
          <nav className="pub-nav-links">
            <a href="#features">Features</a>
            <a href="#current-affairs">Current Affairs</a>
            <a href="#faq">FAQ</a>
            <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy</a>
          </nav>
          <button className="pub-cta" onClick={startStudying}>
            Start studying
          </button>
        </div>
      </header>

      <div id="top" className="hero">
        <div className="hero-rules" />
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">SSC &middot; IBPS &middot; SBI</div>
            <h1>
              Exam prep that works even where <em>the signal doesn't.</em>
            </h1>
            <p className="lede">
              Lessons, practice quizzes, mock tests, and real dated current affairs for SSC CGL, SSC
              MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk — free, right in your browser.
            </p>
            <div className="cta-row">
              <button className="btn-primary-cream" onClick={startStudying}>
                Start studying free
              </button>
              <a className="btn-ghost-cream" href="#features">
                See what's inside
              </a>
            </div>
            <div className="exam-pills">
              <span>SSC CGL</span>
              <span>SSC MTS</span>
              <span>SSC CHSL</span>
              <span>IBPS PO</span>
              <span>IBPS Clerk</span>
              <span>SBI PO</span>
              <span>SBI Clerk</span>
            </div>
            <div className="trust-bar">
              {TRUST_STATS.map((s) => (
                <div className="trust-stat" key={s.label}>
                  <div className="trust-value">{s.value}</div>
                  <div className="trust-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="phone-stack">
            <div className="phone-glow" />
            <div className="phone">
              <img
                src="/assets/screenshots/1-home.jpg"
                alt="Pariksha Saathi home screen showing streak, and a weak-topic nudge"
              />
            </div>
          </div>
        </div>
      </div>

      <section id="features" className="pub-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">What's inside</div>
            <h2>Everything you need to get exam-ready</h2>
            <p>
              Every feature below is built around one real constraint: aspirants studying on patchy
              connections, shared devices, and tight budgets.
            </p>
          </div>
          <div className="feature-grid">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div className="feature" key={f.title}>
                  <div className={`mark mark-${f.accent}`}>
                    <Icon />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pub-section pub-section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">How it works</div>
            <h2>Three steps, no installs</h2>
          </div>
          <div className="steps-grid">
            {HOW_IT_WORKS.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pub-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Exam coverage</div>
            <h2>What's covered for each exam</h2>
          </div>
          <div className="exam-coverage-grid">
            {EXAM_COVERAGE.map((e) => (
              <div className="exam-coverage-item" key={e.name}>
                <h3>{e.name}</h3>
                <p dangerouslySetInnerHTML={{ __html: e.body }} />
              </div>
            ))}
          </div>
          <p className="exam-coverage-note">
            Not sure whether to go for a bank-wide posting or State Bank of India specifically?{' '}
            <Link to="/compare/ibps-po-vs-sbi-po">See how IBPS PO and SBI PO actually differ &rarr;</Link>
          </p>
        </div>
      </section>

      <section className="pub-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Topic lessons</div>
            <h2>Worked examples, free to read</h2>
            <p>The same topics the app teaches, as standalone lessons with fully worked solutions — no account needed to read these.</p>
          </div>
          <div className="exam-coverage-grid">
            <div className="exam-coverage-item">
              <h3>Percentages</h3>
              <p>
                The concept, four worked examples, and a few to try yourself.{' '}
                <Link to="/learn/percentages">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Profit and Loss</h3>
              <p>
                Builds on percentages — CP, SP, discount and marked price, worked out.{' '}
                <Link to="/learn/profit-and-loss">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Simple &amp; Compound Interest</h3>
              <p>
                The one distinction that matters, plus a shortcut worth memorising.{' '}
                <Link to="/learn/simple-compound-interest">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Blood Relations</h3>
              <p>
                A clear approach to tracing relationships, not just answers to memorise.{' '}
                <Link to="/learn/blood-relations">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Time, Speed and Distance</h3>
              <p>
                Unit conversion and the average-speed trap, with trains thrown in.{' '}
                <Link to="/learn/time-speed-distance">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Coding-Decoding</h3>
              <p>
                Four rule-types that cover almost everything actually asked.{' '}
                <Link to="/learn/coding-decoding">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Syllogism</h3>
              <p>
                Pure logic, not real-world knowledge — the Venn-diagram approach that works.{' '}
                <Link to="/learn/syllogism">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Ratio and Proportion</h3>
              <p>
                The foundation for ages, mixtures and partnership questions.{' '}
                <Link to="/learn/ratio-and-proportion">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Direction Sense</h3>
              <p>
                Plot it on a grid and it turns into simple coordinate geometry.{' '}
                <Link to="/learn/direction-sense">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Spotting Errors</h3>
              <p>
                A handful of recurring grammar rules, not obscure trivia.{' '}
                <Link to="/learn/spotting-errors">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Average</h3>
              <p>
                The formula reversed — going from average back to sum.{' '}
                <Link to="/learn/average">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Number Series</h3>
              <p>
                Pattern recognition, narrowed down to the four types that actually come up.{' '}
                <Link to="/learn/number-series">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Synonyms and Antonyms</h3>
              <p>
                Why context, not vocabulary size, is usually what decides the answer.{' '}
                <Link to="/learn/synonyms-and-antonyms">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Time and Work</h3>
              <p>
                Convert everyone to a daily rate, combine, then convert back.{' '}
                <Link to="/learn/time-and-work">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Analogy</h3>
              <p>
                Name the relationship precisely before you look at the options.{' '}
                <Link to="/learn/analogy">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>One Word Substitution</h3>
              <p>
                A narrow, learnable vocabulary list — the same few dozen words repeat.{' '}
                <Link to="/learn/one-word-substitution">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Mixture and Alligation</h3>
              <p>
                The weighted-average formula, run backwards to find a ratio.{' '}
                <Link to="/learn/mixture-and-alligation">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Seating Arrangement</h3>
              <p>
                Sketch the row, fill in what’s forced, then eliminate the rest.{' '}
                <Link to="/learn/seating-arrangement">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Sentence Improvement</h3>
              <p>
                The same grammar rules as Spotting Errors, in a pick-the-fix format.{' '}
                <Link to="/learn/sentence-improvement">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Mensuration</h3>
              <p>
                Picking the right formula and plugging in carefully.{' '}
                <Link to="/learn/mensuration">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Inequality</h3>
              <p>
                Chains of coded symbols, and the counterexample trick for ruling conclusions out.{' '}
                <Link to="/learn/inequality">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Active and Passive Voice</h3>
              <p>
                A mechanical three-step transformation, applied consistently across tenses.{' '}
                <Link to="/learn/active-passive-voice">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Simplification</h3>
              <p>
                BODMAS order, not left-to-right — a speed test more than a difficulty test.{' '}
                <Link to="/learn/simplification">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Calendar</h3>
              <p>
                Counting odd days, and the century-year leap-year exception.{' '}
                <Link to="/learn/calendar">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Direct and Indirect Speech</h3>
              <p>
                Tense shifts, pronoun changes, and how questions convert differently.{' '}
                <Link to="/learn/direct-indirect-speech">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Partnership</h3>
              <p>
                Why profit splits by capital × time, not capital alone.{' '}
                <Link to="/learn/partnership">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Clock</h3>
              <p>
                A disguised speed problem — two hands moving at fixed rates.{' '}
                <Link to="/learn/clock">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Para Jumbles</h3>
              <p>
                Following the pronoun and connector chain to the one order that works.{' '}
                <Link to="/learn/para-jumbles">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Boat and Stream</h3>
              <p>
                Time, Speed and Distance in a different costume — convert, then apply.{' '}
                <Link to="/learn/boat-and-stream">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Alphabet Series</h3>
              <p>
                Number Series with letters — convert to positions and solve the same way.{' '}
                <Link to="/learn/alphabet-series">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Cloze Test</h3>
              <p>
                Grammar plus meaning — reading the whole passage before picking an answer.{' '}
                <Link to="/learn/cloze-test">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>LCM and HCF</h3>
              <p>
                Prime factorization, plus the one shortcut connecting the two.{' '}
                <Link to="/learn/lcm-and-hcf">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Classification</h3>
              <p>
                Finding the exact rule the majority share, not just a hunch.{' '}
                <Link to="/learn/classification">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Degrees of Comparison</h3>
              <p>
                Matching an adjective’s form to how many things are being compared.{' '}
                <Link to="/learn/degrees-of-comparison">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Problems on Ages</h3>
              <p>
                Algebra in disguise — one variable, carried through every condition.{' '}
                <Link to="/learn/problems-on-ages">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Venn Diagram</h3>
              <p>
                Inclusion-exclusion — add the groups, subtract what got counted twice.{' '}
                <Link to="/learn/venn-diagram">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Prepositions</h3>
              <p>
                Fixed pairings to learn like vocabulary, plus a size-based pattern for time and place.{' '}
                <Link to="/learn/prepositions">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Permutation and Combination</h3>
              <p>
                One question decides the formula: does the order of arrangement matter?{' '}
                <Link to="/learn/permutation-and-combination">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Ranking and Order</h3>
              <p>
                One small formula connecting rank from the top, the bottom, and the total.{' '}
                <Link to="/learn/ranking-and-order">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Idioms and Phrases</h3>
              <p>
                Pure recognition — fixed phrases that can’t be worked out from their words.{' '}
                <Link to="/learn/idioms-and-phrases">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Probability</h3>
              <p>
                Careful counting — favorable outcomes over total outcomes.{' '}
                <Link to="/learn/probability">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Statement and Assumption</h3>
              <p>
                The "if this were false, would it still make sense?" test.{' '}
                <Link to="/learn/statement-and-assumption">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Articles</h3>
              <p>
                "A"/"an" vs "the" — specific and identified, or just any one example?{' '}
                <Link to="/learn/articles">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Pipes and Cisterns</h3>
              <p>
                Time and Work with a twist — an outlet pipe gets a negative rate.{' '}
                <Link to="/learn/pipes-and-cisterns">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Statement and Conclusion</h3>
              <p>
                A conclusion only counts if it’s a direct restatement, nothing borrowed.{' '}
                <Link to="/learn/statement-and-conclusion">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Homophones</h3>
              <p>
                Words that sound identical — spelling and meaning are the only tell.{' '}
                <Link to="/learn/homophones">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Number System</h3>
              <p>
                Divisibility shortcuts, plus how remainders behave under addition and multiplication.{' '}
                <Link to="/learn/number-system">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Data Sufficiency</h3>
              <p>
                Judging whether the data is enough — not computing the final answer.{' '}
                <Link to="/learn/data-sufficiency">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Phrasal Verbs</h3>
              <p>
                Learned the same way as idioms — one verb-plus-particle combination at a time.{' '}
                <Link to="/learn/phrasal-verbs">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Surds and Indices</h3>
              <p>
                A handful of fixed rules for combining powers of the same base.{' '}
                <Link to="/learn/surds-and-indices">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Floor-Based Puzzles</h3>
              <p>
                Seating Arrangement turned on its side — the same method, vertically.{' '}
                <Link to="/learn/floor-puzzle">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Spelling Correction</h3>
              <p>
                The correct spelling of one intended word, not a choice between different words.{' '}
                <Link to="/learn/spelling-correction">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Data Interpretation</h3>
              <p>
                Ordinary percentage and average arithmetic, read carefully off a table.{' '}
                <Link to="/learn/data-interpretation">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Course of Action</h3>
              <p>
                Judging whether a response is practical and proportionate, not just well-intentioned.{' '}
                <Link to="/learn/course-of-action">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Tag Questions</h3>
              <p>
                One flip rule — positive statement, negative tag — plus matching the auxiliary verb.{' '}
                <Link to="/learn/tag-questions">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Quadratic Equations</h3>
              <p>
                Solve two equations, compare every pair of roots, then read off the relationship.{' '}
                <Link to="/learn/quadratic-equations">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Input-Output</h3>
              <p>
                Apply a fixed machine rule step by step, then read off a position.{' '}
                <Link to="/learn/input-output">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Fill in the Blanks</h3>
              <p>
                Reading the whole sentence for the fixed collocation the blank is testing.{' '}
                <Link to="/learn/fill-in-the-blanks">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Approximation</h3>
              <p>
                Round every number first — the goal is close, not exact.{' '}
                <Link to="/learn/approximation">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Statement and Argument</h3>
              <p>
                Judging whether a reason is specific and weighty, not just plausible-sounding.{' '}
                <Link to="/learn/statement-and-argument">Read the lesson &rarr;</Link>
              </p>
            </div>
            <div className="exam-coverage-item">
              <h3>Para Completion</h3>
              <p>
                Continuing a paragraph’s direction without overreaching or contradicting it.{' '}
                <Link to="/learn/para-completion">Read the lesson &rarr;</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="current-affairs" className="pub-section pub-section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Stay current</div>
            <h2>Latest current affairs</h2>
            <p>Dated, sourced capsules — updated regularly, each linking back to the original release.</p>
          </div>
          {affairsQuery.isLoading && <p>Loading…</p>}
          {affairsQuery.data?.map((item) => (
            <CurrentAffairsItemCard key={item.id} item={item} />
          ))}
          <Link to="/app/current-affairs" className="update-readmore">
            See all current affairs &rarr;
          </Link>
        </div>
      </section>

      <section className="pub-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Don't miss a date</div>
            <h2>Latest exam notices &amp; alerts</h2>
            <p>Admit cards, results and deadlines, verified against each exam body's own site.</p>
          </div>
          {noticesQuery.isLoading && <p>Loading…</p>}
          {latestNotices.map((item) => (
            <Link key={item.id} to={`/app/exam-notices/${item.id}`} className="update-card-link">
              <Card className="update-card">
                <div className="update-meta">
                  {item.type} &middot; verified {item.lastVerifiedAt.slice(0, 10)}
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary.length > 150 ? `${item.summary.slice(0, 150).trimEnd()}…` : item.summary}</p>
                <span className="update-readmore">Read more &rarr;</span>
              </Card>
            </Link>
          ))}
          <Link to="/app/exam-notices" className="update-readmore">
            See all exam notices &rarr;
          </Link>
        </div>
      </section>

      <section id="faq" className="pub-section pub-section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details className="faq-item" key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <AdSlot slot="8737623533" />
      </div>

      <footer className="pub-footer">
        <div className="wrap">
          <div className="pub-footer-top">
            <div className="pub-footer-brand">
              <img src="/assets/icon-512.png" alt="" />
              Pariksha Saathi
            </div>
            <div className="pub-footer-links">
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a>
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/account-deletion.html">
                Delete Account
              </a>
              <a href="mailto:sriwastava2@gmail.com">Contact</a>
            </div>
          </div>
          <p className="disclaimer">
            Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or
            any government body. We don't sell or share your data with advertisers — ads on this
            site are served by Google AdSense; see our{' '}
            <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a> for
            details.
          </p>
        </div>
      </footer>
    </div>
  );
}
