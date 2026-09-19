import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

// Same 5 tabs as the Android app's bottom nav (Home / Study / Practice / Updates / Progress) -
// students who use both should feel at home on either.
const TABS = [
  { to: '/app/home', label: 'Home' },
  { to: '/app/study', label: 'Study' },
  { to: '/app/practice', label: 'Practice' },
  { to: '/app/updates', label: 'Updates' },
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
