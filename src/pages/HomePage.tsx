import { useNavigate } from 'react-router-dom';
import { useExamSelection } from '../state/ExamSelectionContext';
import './HomePage.css';

const FEATURES = [
  {
    n: '01',
    title: 'Study, then practice',
    body: 'Topic-wise lessons across Reasoning, Quant, English and General Awareness, each followed by practice in the real exam pattern — negative marking included.',
  },
  {
    n: '02',
    title: 'Three ways to practice',
    body: 'Topic-wise quizzes for one weak spot, sectional tests by subject, or full-length mocks spanning your whole exam.',
  },
  {
    n: '03',
    title: 'Learn from your mistakes',
    body: 'Every wrong answer lands in your Mistake Notebook automatically, with the topic you should focus on next.',
  },
  {
    n: '04',
    title: 'Works right in your browser',
    body: 'No installs — study on any device with progress saved locally and available whenever you come back.',
  },
  {
    n: '05',
    title: 'English or Hindi',
    body: 'Switch languages any time — no reinstalling, no separate site.',
  },
  {
    n: '06',
    title: 'Real current affairs',
    body: 'Dated current-affairs capsules and official exam notifications, each with a source you can check yourself.',
  },
  {
    n: '07',
    title: 'Mistake Notebook & Bookmarks',
    body: 'Build your own revision list from anything you get wrong or want to revisit.',
  },
  {
    n: '08',
    title: 'No account required',
    body: 'Study fully as a guest. Create a free account only if you want progress backed up across devices.',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { selectedExamIds } = useExamSelection();

  function startStudying() {
    navigate(selectedExamIds.length > 0 ? '/app/home' : '/onboarding');
  }

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
          </div>
          <div className="phone-stack">
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
            {FEATURES.map((f) => (
              <div className="feature" key={f.n}>
                <div className="mark">{f.n}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            any government body. We don't show ads, and we don't sell or share your data with
            advertisers.
          </p>
        </div>
      </footer>
    </div>
  );
}
