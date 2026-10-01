import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import './ComparePage.css';

const SITE_URL = 'https://parikshasaathi.com';

export function IbpsPoVsSbiPoPage() {
  useDocumentMeta({
    title: 'IBPS PO vs SBI PO: What’s Actually Different',
    description:
      'IBPS PO and SBI PO both lead to a Probationary Officer role at a public sector bank, but they’re run by different organisations with different outcomes. Here’s how they actually differ.',
    path: '/compare/ibps-po-vs-sbi-po',
    type: 'article',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'IBPS PO vs SBI PO: What’s Actually Different',
        description:
          'A comparison of how IBPS PO and SBI PO recruitment are conducted, who they recruit for, and how their selection stages differ.',
        author: { '@type': 'Organization', name: 'Pariksha Saathi' },
        publisher: { '@type': 'Organization', name: 'Pariksha Saathi' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'IBPS PO vs SBI PO' },
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

        <h1>IBPS PO vs SBI PO: What&rsquo;s Actually Different</h1>
        <p className="compare-lede">
          Both lead to the same job title &mdash; Probationary Officer at a public sector bank &mdash; which is
          exactly why the two get confused. They&rsquo;re run by different organisations, for different
          outcomes, and they&rsquo;re separate applications with separate forms and fees. Here&rsquo;s what
          actually distinguishes them.
        </p>

        <div className="compare-table">
          <div className="compare-row compare-row-head">
            <div className="compare-cell"></div>
            <div className="compare-cell">IBPS PO</div>
            <div className="compare-cell">SBI PO</div>
          </div>

          {[
            {
              label: 'Conducted by',
              ibps: 'The Institute of Banking Personnel Selection (IBPS), on behalf of a group of participating public sector banks.',
              sbi: 'State Bank of India itself — SBI runs its own recruitment, using IBPS’s testing platform as a service provider.',
            },
            {
              label: 'Who you join',
              ibps: 'Not decided when you apply. Selected candidates are allotted to one of the participating banks based on merit and the preferences you submit.',
              sbi: 'State Bank of India, specifically. You know which bank you’re joining before you even apply.',
            },
            {
              label: 'Selection stages',
              ibps: 'Preliminary exam, Main exam, then an interview.',
              sbi: 'Preliminary exam, Main exam, then a Group Exercise and Interview.',
            },
          ].map((row) => (
            <div className="compare-row" key={row.label}>
              <div className="compare-cell compare-label">{row.label}</div>
              <div className="compare-cell" data-label="IBPS PO: ">
                {row.ibps}
              </div>
              <div className="compare-cell" data-label="SBI PO: ">
                {row.sbi}
              </div>
            </div>
          ))}

          <div className="compare-row">
            <div className="compare-cell compare-label">Can I apply to both?</div>
            <div className="compare-cell compare-both">
              Yes &mdash; they&rsquo;re separate recruitment cycles with separate notifications, forms and
              fees, so applying to one has no bearing on your eligibility for the other.
            </div>
          </div>
        </div>

        <p className="compare-note">
          Exact section-wise marks, number of questions and interview weightage can change from one
          notification to the next for either exam. Treat the structure above as the stable shape, and
          check that cycle&rsquo;s official notification for the exact current pattern &mdash; linked below
          for each.
        </p>

        <h2>What Pariksha Saathi offers for each</h2>
        <p>
          The same practice content either way: Reasoning, Quantitative Aptitude and English for Prelims
          and Mains, plus dated current-affairs capsules for Banking Awareness &mdash; free, with no
          paywalled mock tests. Select whichever one (or both) you&rsquo;re preparing for from the exam
          picker.
        </p>

        <h2>Official notifications</h2>
        <ul className="compare-links">
          <li>
            <a href="https://www.ibps.in/index.php/management-trainees-xvi/" target="_blank" rel="noreferrer">
              IBPS PO/MT &mdash; official CRP page &#8599;
            </a>
          </li>
          <li>
            <a href="https://sbi.bank.in/web/careers/current-openings" target="_blank" rel="noreferrer">
              SBI PO &mdash; official SBI careers page &#8599;
            </a>
          </li>
          <li>
            <Link to="/app/exam-notices">Latest admit card, result and deadline alerts on Pariksha Saathi &rarr;</Link>
          </li>
        </ul>

        <Link className="btn-primary-compare" to="/onboarding">
          Start studying free &rarr;
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
            Pariksha Saathi is an independent project and is not affiliated with IBPS, SBI, or any
            government body. Figures and process details above are general and may change &mdash; always
            confirm against the official notification linked above.
          </p>
        </div>
      </footer>
    </div>
  );
}
