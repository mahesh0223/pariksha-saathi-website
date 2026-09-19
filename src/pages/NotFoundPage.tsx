import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="wrap" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--navy)' }}>Page not found</h1>
      <p style={{ color: 'var(--muted)', marginTop: 12 }}>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
}
