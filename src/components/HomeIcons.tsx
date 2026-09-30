import type { SVGProps } from 'react';

/**
 * Hand-authored line icons for the homepage feature grid - no icon library dependency, matching
 * this project's already-lean footprint (see package.json). Stroke-based, 22x22, currentColor,
 * so each inherits its wrapping .mark's icon color.
 */
function base(props: SVGProps<SVGSVGElement>) {
  return {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  };
}

export function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5c-.8 0-1.5-.7-1.5-1.5v-13Z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13Z" />
    </svg>
  );
}

export function IconTarget(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconCheckNote(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" />
      <path d="M8 9.5l2.3 2.3L16 6" />
      <path d="M8 15.5h8" />
    </svg>
  );
}

export function IconBrowser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.8" />
      <path d="M3.5 8.5h17" />
      <circle cx="6.2" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconGlobe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.5 2.2 2.5 13.8 0 16M12 4c-2.5 2.2-2.5 13.8 0 16" />
    </svg>
  );
}

export function IconNewspaper(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="13" height="13" rx="1.5" />
      <path d="M6.5 9h7M6.5 12h7M6.5 15h4.5" />
      <path d="M16.5 8.5H19c.55 0 1 .45 1 1v8a1.5 1.5 0 0 1-1.5 1.5h-10" />
    </svg>
  );
}

export function IconBookmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M6 4h12v16l-6-4-6 4V4Z" />
    </svg>
  );
}

export function IconGuest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8.2" r="3.2" />
      <path d="M5 19.5c1-3.4 3.9-5.3 7-5.3s6 1.9 7 5.3" />
    </svg>
  );
}

export function IconCalendarFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5" width="16" height="15" rx="1.8" />
      <path d="M4 9.5h16" />
      <path d="M8 3.2v3M16 3.2v3" />
      <path d="M9 13v5M9 13c1.3-.9 2.7-.9 4 0s2.7.9 4 0v-2.4c-1.3.9-2.7.9-4 0s-2.7-.9-4 0V13Z" />
    </svg>
  );
}

export function IconQuizBubble(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z" />
      <path d="M10 9.3c0-1 .9-1.8 2-1.8s2 .7 2 1.7c0 1.5-2 1.6-2 3.1" />
      <circle cx="12" cy="14.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDigest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}
