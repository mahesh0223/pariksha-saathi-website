import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PUBLIC_PAGES, publicPageBody, publicPageStructuredData } from '../data/publicPages.mjs';
import './compare/ComparePage.css';
import './PublicPage.css';
export function PublicPage({ page }: { page: 'learn' | 'about' | 'privacy' | 'contact' | 'downloads' | 'terms' | 'account-deletion' }) {
  const { hash } = useLocation();
  useDocumentMeta({ ...PUBLIC_PAGES[page], path: `/${page}/`, structuredData: publicPageStructuredData(page) });
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView(); }, [hash, page]);
  // Authored, escaped content shared with the static renderer; no user-supplied HTML.
  return <div dangerouslySetInnerHTML={{ __html: publicPageBody(page) }} />;
}
