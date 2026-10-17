import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { publicPageBody, publicPageMeta, publicPageStructuredData, type PublicPageKey } from '../data/publicPages.mjs';
import './compare/ComparePage.css';
import './PublicPage.css';
export function PublicPage({ page }: { page: PublicPageKey }) {
  const { hash } = useLocation();
  // path, lang and the hreflang pair come from publicPageMeta so this matches the prerendered <head> exactly
  // (the Hindi pages live at /hi/ and /hi/learn/, not at /${key}/).
  useDocumentMeta({ ...publicPageMeta(page), type: 'website', structuredData: publicPageStructuredData(page) });
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView(); }, [hash, page]);
  // Authored, escaped content shared with the static renderer; no user-supplied HTML.
  return <div dangerouslySetInnerHTML={{ __html: publicPageBody(page) }} />;
}
