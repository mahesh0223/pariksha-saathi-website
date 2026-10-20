import { Link } from 'react-router-dom';
import { EXAMS_LINK } from '../../lib/examDirectory.mjs';
import { useQuery } from '@tanstack/react-query';
import { getExamFacts } from '../../api/examFacts';
import { getCutoffs } from '../../api/cutoffs';
import { getExamUpdates } from '../../api/examUpdates';
import { getAllCurrentAffairs } from '../../api/currentAffairs';
import { apiRequest } from '../../api/client';
import { PLAY_STORE_URL } from '../../data/siteLinks.mjs';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { EmptyState, Spinner } from '../../components/ui/Primitives';
import { EXAM_NAMES } from '../../lib/examNames.mjs';
import { examHubBody, examHubMeta, examHubPath, examHubSlug, examHubStructuredData, hubItems } from '../../lib/examHub.mjs';
import type { LiveMockSummary } from '../../lib/examHub.mjs';
import { EXAM_HUB_EXTRAS } from '../../data/examHubExtras.mjs';
import { typingTestPath } from '../../lib/typingPage.mjs';
import { EXAM_JOB_PROFILE_SLUGS } from '../../data/examJobProfileSlugs.mjs';
import '../compare/ComparePage.css';
import './ExamHub.css';
import { SocialLinks } from '../../components/layout/SocialLinks';

const SITE_URL = 'https://parikshasaathi.com';

export function ExamHubPage({ examId, lang }: { examId: string; lang: 'en' | 'hi' }) {
  const examName = EXAM_NAMES[examId] ?? examId;
  const slug = examHubSlug(examId);

  const factsQuery = useQuery({ queryKey: ['exam-facts', examId], queryFn: () => getExamFacts(examId) });
  const cutoffsQuery = useQuery({ queryKey: ['exam-cutoffs', examId], queryFn: () => getCutoffs(examId) });
  // Hindi readers get Hindi notices; the page falls back to the English list when none exist in Hindi.
  const noticesQuery = useQuery({
    queryKey: ['exam-hub-notices', examId, lang],
    queryFn: async () => {
      const localised = await getExamUpdates([examId], lang);
      return localised.length > 0 || lang === 'en' ? localised : getExamUpdates([examId], 'en');
    },
  });

  // Same list the prerender uses for the "Recent current affairs" block - see hubItems in examHub.mjs.
  const itemsQuery = useQuery({ queryKey: ['current-affairs-all', lang], queryFn: () => getAllCurrentAffairs(lang) });
  // Only asked for once there is a public listing to send readers to (see liveMockLineHtml in examHub.mjs).
  // Previous-year papers for this exam - the same summary the prerender renders (examHub.mjs), so the block does not
  // disappear when this page replaces the prerendered HTML.
  const pyqQuery = useQuery({
    queryKey: ['exam-pyq', examId],
    queryFn: () => apiRequest<NonNullable<Parameters<typeof examHubBody>[0]['pyq']>>(`/v1/exams/${examId}/pyq-summary`),
  });
  const liveMockQuery = useQuery({
    queryKey: ['live-mock-next'],
    queryFn: () => apiRequest<{ mock: LiveMockSummary | null }>('/v1/live-mocks/next'),
    enabled: PLAY_STORE_URL !== '',
  });

  const facts = factsQuery.data ?? [];
  const cutoffs = cutoffsQuery.data ?? [];
  const ready = facts.length > 0;
  const meta = ready ? examHubMeta({ examName, facts, cutoffs, lang }) : undefined;

  // Trailing slash: the prerendered HTML's canonical/sitemap use it (Cloudflare Pages 308-redirects
  // the slash-less form), and this hook would otherwise overwrite it with a redirecting URL.
  const enPath = examHubPath(examId, 'en');
  const hiPath = examHubPath(examId, 'hi');
  useDocumentMeta({
    title: meta?.title ?? examName,
    description: meta?.description ?? '',
    path: lang === 'hi' ? hiPath : enPath,
    type: 'article',
    lang,
    alternateLanguages: ready
      ? [
          { lang: 'en', path: enPath },
          { lang: 'hi', path: hiPath },
          { lang: 'x-default', path: enPath },
        ]
      : undefined,
    structuredData: ready ? examHubStructuredData({ examName, facts, cutoffs, lang, siteUrl: SITE_URL }) : undefined,
  });

  // From the hub's own extras module, so this page does not pull in the 250 KB syllabus data.
  const hasSyllabus = Boolean(EXAM_HUB_EXTRAS[examId]?.syllabus);
  const hasJobProfile = (EXAM_JOB_PROFILE_SLUGS as string[]).includes(slug);
  const links = {
    syllabusPath: hasSyllabus ? `${lang === 'hi' ? '/hi' : ''}/compare/${slug}-syllabus/` : undefined,
    jobProfilePath: hasJobProfile ? `${lang === 'hi' ? '/hi' : ''}/compare/${slug}-job-profile/` : undefined,
    // Same exams as TYPING_TEST_EXAMS in scripts/prerender.mjs - their notices prescribe a typing / data-entry test.
    typingTestPath: examId === 'ssc_cgl' || examId === 'ssc_chsl' ? typingTestPath(lang) : undefined,
  };

  return (
    <div className="compare-page">
      <header className="pub-header">
        <div className="wrap pub-nav">
          <Link className="pub-brand" to="/">
            <img src="/assets/icon-48.png" srcSet="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />
            Pariksha Saathi
          </Link>
          <nav className="pub-nav-links">
            <Link to="/app/exam-notices/">{lang === 'hi' ? 'परीक्षा सूचनाएं' : 'Exam Notices'}</Link>
          </nav>
          <Link className="pub-exams-link" to={EXAMS_LINK[lang].href} aria-label={EXAMS_LINK[lang].title}>
            {EXAMS_LINK[lang].label}
          </Link>
          <Link className="pub-cta" to="/onboarding">
            {lang === 'hi' ? 'पढ़ाई शुरू करें' : 'Start studying'}
          </Link>
        </div>
      </header>

      {factsQuery.isLoading ? (
        <Spinner />
      ) : !ready ? (
        <div className="wrap" style={{ paddingTop: 40 }}>
          <EmptyState>This exam page isn&rsquo;t available.</EmptyState>
        </div>
      ) : (
        <article
          className="wrap compare-article"
          dangerouslySetInnerHTML={{
            __html: examHubBody({ examName, facts, cutoffs, notices: noticesQuery.data ?? [], items: hubItems(examId, itemsQuery.data ?? []), lang, links, pyq: pyqQuery.data ?? null, liveMock: liveMockQuery.data?.mock ?? null, playStoreUrl: PLAY_STORE_URL }),
          }}
        />
      )}

      <footer className="pub-footer">
        <div className="wrap pub-footer-links">
          <Link to="/about/">About &amp; editorial standards</Link>
          <Link to="/privacy/">Privacy Policy</Link>
          <Link to="/terms/">Terms of Use</Link>
          <Link to="/contact/">Contact</Link>
          <Link to="/downloads/">Daily PDF</Link>
        <SocialLinks /></div>
      </footer>
    </div>
  );
}
