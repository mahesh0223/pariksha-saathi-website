import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

// Close to the Android app's bottom nav (Home / Study / Practice / Updates / Progress), but the
// web version splits "Updates" into its own two buttons - Current Affairs and Exam Notices &
// Alerts are different enough in purpose that a single combined tab undersold both. Challenge and
// CA Quiz mirror the same two tabs added to the Android app's bottom nav (see AppNavGraph.kt).
const TABS = [
  { to: '/app/home', label: 'Home' },
  { to: '/app/study', label: 'Study' },
  { to: '/app/practice', label: 'Practice' },
  { to: '/app/challenge', label: 'Challenge' },
  { to: '/app/current-affairs-quiz', label: 'CA Quiz' },
  { to: '/app/current-affairs', label: 'Affairs' },
  { to: '/app/exam-notices', label: 'Alerts' },
  { to: '/app/progress', label: 'Progress' },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="wrap app-topbar-inner">
          <NavLink to="/" className="app-brand">
            <img src="/assets/icon-512.png" alt="" />
            Pariksha Saathi
          </NavLink>
          <NavLink to="/app/account" className="app-account-link">
            Account
          </NavLink>
        </div>
      </header>
      <main className="app-content wrap">
        <Outlet />
      </main>
      <nav className="app-bottom-nav">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => `app-nav-item${isActive ? ' active' : ''}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
