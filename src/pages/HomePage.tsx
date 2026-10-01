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
    body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness.',
  },
  {
    name: 'SSC MTS',
    body: 'Focused lessons and practice across Numerical Ability, Reasoning and English, plus current-affairs coverage for General Awareness.',
  },
  {
    name: 'SSC CHSL',
    body: 'Topic-wise lessons and practice across Quantitative Aptitude, Reasoning and English, plus dated current-affairs capsules for General Awareness.',
  },
  {
    name: 'IBPS PO',
    body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness.',
  },
  {
    name: 'IBPS Clerk',
    body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for Banking Awareness.',
  },
  {
    name: 'SBI PO',
    body: 'Reasoning, Quantitative Aptitude and English practice for Prelims and Mains, with current-affairs coverage for Banking &amp; Economy Awareness.',
  },
  {
    name: 'SBI Clerk',
    body: 'Reasoning, Numerical Ability and English practice for Prelims and Mains, with current-affairs coverage for General &amp; Financial Awareness.',
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
