import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT_ID = 'ca-pub-6818930282969815';

/**
 * A manually-placed AdSense unit. Auto ads is disabled account-wide (see index.html's comment) -
 * this is the only thing that puts an ad on the page, so it only ever appears where a component
 * explicitly renders it: real content pages (Home, Current Affairs, Exam Notices), never on an
 * interactive app screen (quiz, lesson reader, dashboard) - that split is what AdSense's "ads on
 * screens without publisher content" policy actually wants. Each mount gets its own <ins>; a
 * previously-pushed <ins> must never be pushed again (AdSense throws), so the push is guarded per
 * DOM node via a ref, not just per component instance - React 18 StrictMode double-invokes effects
 * in dev, which would otherwise double-push the same node.
 */
export function AdSlot({ slot, className = '' }: { slot: string; className?: string }) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !insRef.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Blocked by an ad blocker or the script hasn't loaded yet - the <ins> just stays empty.
    }
  }, []);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ad-slot ${className}`.trim()}
      style={{ display: 'block' }}
      data-ad-client={CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
