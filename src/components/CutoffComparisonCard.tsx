import { Card } from './ui/Primitives';
import type { CutoffTarget } from '../types/api';

/**
 * Scaffolding for comparing a student's score against real official cutoffs - see
 * api/cutoffs.ts's doc comment. `cutoffs` is empty for every exam today (no real figures have
 * been sourced/verified yet), so this renders an explicit "coming soon" state rather than a
 * fabricated or zero-valued comparison. Mirrors the Android client's CutoffComparisonCard exactly.
 */
export function CutoffComparisonCard({ cutoffs }: { cutoffs: CutoffTarget[] }) {
  return (
    <Card className="dash-card">
      <div className="dash-card-title">Cutoff Comparison</div>
      {cutoffs.length === 0 ? (
        <p className="dash-card-body">
          Cutoff data coming soon - we verify every figure against the official notice before
          showing it here, so this isn't live yet.
        </p>
      ) : (
        <>
          {cutoffs.map((cutoff) => (
            <p key={cutoff.id} className="dash-card-body">
              {cutoff.section} · {cutoff.category}: {cutoff.targetScore}/{cutoff.maxScore} ({cutoff.cycleLabel})
            </p>
          ))}
          <p className="cutoff-disclaimer">Previous cycle's official cutoff, not a live figure for the exam ahead of you.</p>
        </>
      )}
    </Card>
  );
}
