import { Link, useLocation } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function NotFoundPage() {
  const location = useLocation();

  // Without this, a client-side navigation into a bad URL (e.g. a stale internal link) would
  // keep showing the previous page's title/canonical, since this is the one page that never had
  // its own. The server-side 404 status (public/_redirects) is what actually keeps this out of
  // Google's index; this just keeps the tab title honest for real visitors.
  useDocumentMeta({
    title: 'Page not found',
    description: 'This page does not exist on Pariksha Saathi.',
    path: location.pathname,
    robots: 'noindex,follow',
  });

  return (
    <div className="wrap" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--navy)' }}>Page not found</h1>
      <p style={{ color: 'var(--muted)', marginTop: 12 }}>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
}
