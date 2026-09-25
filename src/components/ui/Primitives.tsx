import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './ui.css';

export function Spinner() {
  return <div className="spinner" role="status" aria-label="Loading" />;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty-state">{children}</div>;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'md' | 'sm';
}

export function Button({ variant = 'primary', size = 'md', className = '', ...rest }: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'danger' ? 'btn-danger' : 'btn-outline';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  return <button className={`btn ${variantClass} ${sizeClass} ${className}`.trim()} {...rest} />;
}

export function Card({
  children,
  className = '',
  raised = true,
}: {
  children: ReactNode;
  className?: string;
  /** "Raised Paper Sheet" tier (flat offset shadow) vs. "Resting Paper" (border only). */
  raised?: boolean;
}) {
  return <div className={`card ${raised ? 'card-raised' : ''} ${className}`.trim()}>{children}</div>;
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

/** A tag/status chip - question metadata, offline pills. Neutral for tags, Accent for a called-out value. */
export function Badge({ children, emphasis = 'neutral' }: { children: ReactNode; emphasis?: 'neutral' | 'accent' }) {
  return <span className={`badge ${emphasis === 'accent' ? 'badge-accent' : 'badge-neutral'}`}>{children}</span>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="note">{children}</p>;
}

export type OptionState = 'unselected' | 'selected' | 'correct' | 'incorrect';

/**
 * The one MCQ option primitive - unifies what used to be two separate near-identical
 * implementations (QuizPage's clickable .quiz-option, QuizResultPage's read-only .result-option).
 * Pass onClick for an interactive quiz; omit it for a read-only post-submit review row.
 */
export function QuizOption({
  label,
  children,
  state,
  onClick,
}: {
  label: string;
  children: ReactNode;
  state: OptionState;
  onClick?: () => void;
}) {
  const stateClass = state === 'unselected' ? '' : `option-${state}`;
  const content = (
    <>
      <span className="option-badge">{label}</span>
      <span>{children}</span>
    </>
  );
  if (onClick) {
    return (
      <button type="button" className={`option ${stateClass}`.trim()} onClick={onClick}>
        {content}
      </button>
    );
  }
  return <div className={`option ${stateClass}`.trim()}>{content}</div>;
}
