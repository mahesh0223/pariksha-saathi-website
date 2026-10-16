import { Link } from 'react-router-dom';
import { Card, Pill } from './ui/Primitives';
import type { CurrentAffairsItem } from '../types/api';
import '../pages/app/UpdatesPage.css';

const PREVIEW_LENGTH = 150;

/** The card's summary excerpt. scripts/prerender.mjs mirrors this rule for the home page's cards. */
export function previewText(text: string): string {
  return text.length > PREVIEW_LENGTH ? `${text.slice(0, PREVIEW_LENGTH).trimEnd()}…` : text;
}

/** Shared by CurrentAffairsPage and DigestPage - one current-affairs item as a linked card. */
export function CurrentAffairsItemCard({ item }: { item: CurrentAffairsItem }) {
  return (
    <Link to={`/app/current-affairs/${item.id}/`} className="update-card-link">
      <Card className="update-card">
        {/* One template string, not "{a} · {b}": React would render that as three adjacent text
            nodes, which cannot hydrate the single text node the prerendered home page carries. */}
        <div className="update-meta">{`${item.period} · ${item.editionDate.slice(0, 10)}`}</div>
        <h3>{item.title}</h3>
        <p>{previewText(item.summary)}</p>
        <div className="update-tags">
          {item.examTags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
        <span className="update-readmore">Read more &rarr;</span>
      </Card>
    </Link>
  );
}
