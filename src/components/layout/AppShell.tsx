import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

// Close to the Android app's bottom nav (Home / Study / Practice / Updates / Progress), but the
// web version splits "Updates" into its own two buttons - Current Affairs and Exam Notices &
// Alerts are different enough in purpose that a single combined tab undersold both. Challenge and
// CA Quiz mirror the same two tabs added to the Android app's bottom nav (see AppNavGraph.kt).
//
// 8 tabs is too many to show every label at once on a phone width without wrapping - each item
// below always shows its icon, but only the active one shows its text label (same fix as
// AppNavGraph.kt's `alwaysShowLabel = false`), so most of the row stays icon-only.
const TABS = [
  { to: '/app/home', label: 'Home', icon: '🏠' },
  { to: '/app/study', label: 'Study', icon: '📖' },
  { to: '/app/practice', label: 'Practice', icon: '📝' },
  { to: '/app/challenge', label: 'Goal', icon: '🏆' },
  { to: '/app/current-affairs-quiz', label: 'CA Quiz', icon: '🌍' },
  { to: '/app/current-affairs', label: 'Affairs', icon: '📰' },
  { to: '/app/exam-notices', label: 'Alerts', icon: '🔔' },
  { to: '/app/progress', label: 'Progress', icon: '📊' },
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
            {({ isActive }) => (
              <>
                <span className="app-nav-icon" aria-hidden="true">
                  {tab.icon}
                </span>
                <span className={`app-nav-label${isActive ? '' : ' sr-only'}`}>{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
