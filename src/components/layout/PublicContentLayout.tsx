import { Link, Outlet } from 'react-router-dom';
import '../../pages/compare/ComparePage.css';
import './PublicContentLayout.css';

// Current affairs and exam notices are genuine editorial content - crawlable, sitemapped,
// linked from other public pages - so they get the same plain-article chrome as /learn/,
// /compare/* and /about/ (pub-header/pub-footer, see publicFrame() in publicPages.mjs for the
// prerendered-HTML mirror of this exact markup), not the signed-in-feeling app shell's bottom tab
// bar and Account link. That bottom nav's other 6 tabs are robots.txt-disallowed app routes -
// every public news/notice page used to link to all of them regardless of what a reader was
// actually there to read.
export function PublicContentLayout() {
  return (
    <div className="compare-page">
      <header className="pub-header">
        <div className="wrap pub-nav">
          <Link className="pub-brand" to="/">
            <img src="/assets/icon-512.png" alt="" />
            Pariksha Saathi
          </Link>
          <nav className="pub-nav-links">
            <Link to="/learn/">Lessons</Link>
            <Link to="/app/current-affairs">Current affairs</Link>
            <Link to="/app/exam-notices">Exam Notices</Link>
          </nav>
          <Link className="pub-cta" to="/onboarding">
            Start studying
          </Link>
        </div>
      </header>

      <main className="wrap public-content-main">
        <Outlet />
      </main>

      <footer className="pub-footer">
        <div className="wrap pub-footer-links">
          <Link to="/about/">About &amp; editorial standards</Link>
          <Link to="/privacy/">Privacy Policy</Link>
          <a href="mailto:sriwastava2@gmail.com">Contact</a>
        </div>
      </footer>
    </div>
  );
}
