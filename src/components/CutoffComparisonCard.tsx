import { Card } from './ui/Primitives';
import { HUB_EXAM_IDS } from '../data/examHubExams.mjs';
import { examHubPath } from '../lib/examHub.mjs';
import type { CutoffTarget } from '../types/api';

// The categories most students look for first; the full table (every category, every year, with
// sources) lives on the exam's hub page.
const HEADLINE_CATEGORIES = ['UR', 'OBC', 'EWS', 'SC', 'ST'];

/**
 * Official cut-offs from the exam's last published cycles, shown compactly: the newest cycle per
 * stage, headline categories only, with a link to the exam's hub page for everything else. `cutoffs`
 * is empty for an exam nobody has sourced a figure for yet, so this renders an explicit "coming soon"
 * state rather than a fabricated or zero-valued comparison.
 */
export function CutoffComparisonCard({ cutoffs }: { cutoffs: CutoffTarget[] }) {
  const groups = new Map<string, CutoffTarget[]>();
  for (const cutoff of cutoffs) {
    const key = `${cutoff.examId}|${cutoff.section}`;
    groups.set(key, [...(groups.get(key) ?? []), cutoff]);
  }
  const latest = [...groups.values()].map((rows) => {
    const cycle = rows.map((r) => r.cycleLabel).sort().at(-1)!;
    const inCycle = rows.filter((r) => r.cycleLabel === cycle);
    return { first: inCycle[0], cycle, rows: HEADLINE_CATEGORIES.map((c) => inCycle.find((r) => r.category === c)).filter((r): r is CutoffTarget => !!r) };
  });

  return (
    <Card className="dash-card">
      <div className="dash-card-title">Cutoff Comparison</div>
      {latest.length === 0 ? (
        <p className="dash-card-body">
          Cutoff data coming soon - we verify every figure against the official notice before
          showing it here, so this isn't live yet.
        </p>
      ) : (
        <>
          {latest.map(({ first, cycle, rows }) => (
            <p key={`${first.examId}|${first.section}`} className="dash-card-body">
              <strong>{first.section} ({cycle}, out of {first.maxScore}):</strong>{' '}
              {rows.map((r) => `${r.category} ${r.targetScore.toFixed(2)}`).join(' · ')}
              {HUB_EXAM_IDS.includes(first.examId) && (
                <>
                  {' '}
                  <a href={examHubPath(first.examId, 'en')}>All categories and years &rarr;</a>
                </>
              )}
            </p>
          ))}
          <p className="cutoff-disclaimer">Previous cycle's official cutoff, not a live figure for the exam ahead of you.</p>
        </>
      )}
    </Card>
  );
}
