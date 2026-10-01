import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import './ComparePage.css';

const SITE_URL = 'https://parikshasaathi.com';
const OFFICIAL_CGL_URL = 'https://ssc.gov.in/for-candidates/cgl-exam/xsd91hjkshdk92xk';

const TIERS = [
  {
    name: 'Tier-I',
    body:
      'A single computer-based test covering four sections: General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. This is the qualifying/screening stage — clearing it is what gets you to Tier-II.',
  },
  {
    name: 'Tier-II',
    body:
      'A further computer-based test for candidates who clear Tier-I, going deeper on the same broad subject areas plus any role-specific papers relevant to the posts you’re eligible for.',
  },
];

const SUBJECTS = [
  {
    name: 'Quantitative Aptitude',
    body: 'Number system, percentages, ratio & proportion, profit & loss, time-speed-distance, algebra, geometry, mensuration, trigonometry, and data interpretation.',
  },
  {
    name: 'General Intelligence & Reasoning',
    body: 'Analogies, classification, series, coding-decoding, blood relations, direction sense, syllogisms, non-verbal reasoning (figures, patterns), and puzzles.',
  },
  {
    name: 'English Comprehension',
    body: 'Grammar, vocabulary, sentence correction, fill in the blanks, cloze passages, synonyms/antonyms, and reading comprehension.',
  },
  {
    name: 'General Awareness',
    body: 'Static GK (history, geography, polity, economy, science) plus current affairs — which is where a daily current-affairs habit actually pays off in this exam specifically.',
  },
];

export function SscCglSyllabusPage() {
  useDocumentMeta({
    title: 'SSC CGL Syllabus & Exam Pattern 2026',
    description:
      'SSC CGL’s Tier-I/Tier-II structure and the four subjects tested at each stage, with a link to the official SSC notification for exact current marks and timing.',
    path: '/compare/ssc-cgl-syllabus',
    type: 'article',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'SSC CGL Syllabus & Exam Pattern 2026',
        description:
          'A breakdown of SSC CGL’s Tier-I/Tier-II structure and the subjects tested at each stage.',
        author: { '@type': 'Organization', name: 'Pariksha Saathi' },
        publisher: { '@type': 'Organization', name: 'Pariksha Saathi' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'SSC CGL Syllabus & Exam Pattern' },
        ],
      },
    ],
  });

  return (
    <div className="compare-page">
      <header className="pub-header">
        <div className="wrap pub-nav">
          <Link className="pub-brand" to="/">
            <img src="/assets/icon-512.png" alt="" />
            Pariksha Saathi
          </Link>
          <nav className="pub-nav-links">
            <Link to="/#features">Features</Link>
            <Link to="/app/exam-notices">Exam Notices</Link>
          </nav>
          <Link className="pub-cta" to="/onboarding">
            Start studying
          </Link>
        </div>
      </header>

      <article className="wrap compare-article">
        <Link to="/" className="detail-back">
          &larr; Home
        </Link>

        <h1>SSC CGL Syllabus &amp; Exam Pattern</h1>
        <p className="compare-lede">
          SSC CGL (Combined Graduate Level) is run as a multi-tier computer-based test. Here&rsquo;s the
          stable shape of it &mdash; what gets tested at each stage &mdash; with a link to the official
          notification for this cycle&rsquo;s exact marks, timing and negative-marking details, since
          those can be revised from one notification to the next.

        </p>

        <h2>The tiers</h2>
        <div className="compare-table">
          {TIERS.map((tier) => (
            <div className="compare-row" key={tier.name}>
              <div className="compare-cell compare-label">{tier.name}</div>
              <div className="compare-cell compare-both">{tier.body}</div>
            </div>
          ))}
        </div>

        <h2>What&rsquo;s tested</h2>
        <div className="compare-table">
          {SUBJECTS.map((s) => (
            <div className="compare-row" key={s.name}>
              <div className="compare-cell compare-label">{s.name}</div>
              <div className="compare-cell compare-both">{s.body}</div>
            </div>
          ))}
        </div>

        <p className="compare-note">
          Exact number of questions, marks per question, section-wise timing and the negative-marking
          fraction are set by each cycle&rsquo;s own official notification and can change from one CGL
          cycle to the next. Treat the subjects above as the stable shape to study toward, and check{' '}
          <a href={OFFICIAL_CGL_URL} target="_blank" rel="noreferrer">
            SSC&rsquo;s own CGL exam page
          </a>{' '}
          for this cycle&rsquo;s exact pattern before exam day.
        </p>

        <h2>What CGL recruits for</h2>
        <p>
          CGL fills Group B and Group C posts across central government ministries and departments
          &mdash; roles like Inspector-level posts in central tax departments, Auditor and Accountant
          posts, Assistant-level posts in various ministries, and more, with the exact post-wise
          vacancy breakdown published in each cycle&rsquo;s own notification.
        </p>

        <h2>What Pariksha Saathi offers for SSC CGL</h2>
        <p>
          Topic-wise lessons and practice across all four subjects above, sectional tests by subject,
          full-length mock tests in the real pattern with negative marking, a Mistake Notebook that
          tracks your weak topics automatically, and dated current-affairs capsules for General
          Awareness &mdash; all free, with no paywalled content.
        </p>

        <h2>Official source &amp; latest updates</h2>
        <ul className="compare-links">
          <li>
            <a href={OFFICIAL_CGL_URL} target="_blank" rel="noreferrer">
              SSC CGL &mdash; official exam page &#8599;
            </a>
          </li>
          <li>
            <Link to="/app/exam-notices">Latest admit card, result and deadline alerts on Pariksha Saathi &rarr;</Link>
          </li>
        </ul>

        <Link className="btn-primary-compare" to="/onboarding">
          Start studying SSC CGL free &rarr;
        </Link>
      </article>

      <footer className="pub-footer">
        <div className="wrap">
          <div className="pub-footer-top">
            <div className="pub-footer-brand">
              <img src="/assets/icon-512.png" alt="" />
              Pariksha Saathi
            </div>
            <div className="pub-footer-links">
              <a href="https://mahesh0223.github.io/pariksha-saathi-legal/">Privacy Policy</a>
              <a href="mailto:sriwastava2@gmail.com">Contact</a>
            </div>
          </div>
          <p className="disclaimer">
            Pariksha Saathi is an independent project and is not affiliated with SSC or any government
            body. Syllabus and pattern details above are general and may change &mdash; always confirm
            against the official notification linked above.
          </p>
        </div>
      </footer>
    </div>
  );
}
