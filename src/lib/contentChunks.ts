/**
 * Per-entry content chunks for the prerendered lesson and job-profile pages.
 *
 * scripts/split-content.mjs writes one module per lesson / job profile under src/data/generated/
 * (from the hand-edited topicLessons.mjs and examJobProfiles.mjs); LessonArticlePage.tsx and
 * JobProfilePage.tsx each hand an `import.meta.glob` over their folder to chunkStore(), which turns
 * every file into its own Vite chunk. A page therefore downloads only its own entry (5-10 KB
 * brotli) instead of the whole catalog (560 KB brotli for every lesson in both languages), which
 * is what used to keep the spinner on screen for seconds on slow 4G. The glob maps live in the
 * page chunks, not here, so the 160-odd loader stubs stay out of the entry bundle every landing
 * page visitor downloads.
 *
 * Loading goes through a small cache so a page can read its entry *synchronously* on first render:
 * App.tsx's preloadRoute() calls the page module's preloadLesson()/preloadJobProfile() for the
 * current URL, main.tsx waits for it before mounting, and the page's initial state comes from
 * peek() - so the prerendered article is never replaced by a spinner while the data downloads.
 * (Same idea as lib/lazyPage.ts for the page's own component chunk.) Navigating client-side to
 * another lesson still loads on demand, where a brief spinner is fine: nothing is on screen yet.
 */
type Loader<T> = () => Promise<{ default: T }>;

export function chunkStore<T>(modules: Record<string, Loader<T>>) {
  // '../data/generated/lessons/percentages.mjs' -> 'percentages'
  const bySlug = new Map<string, Loader<T>>();
  for (const [path, load] of Object.entries(modules)) bySlug.set(path.replace(/^.*\//, '').replace(/\.mjs$/, ''), load);
  // null = loaded and no such entry (the page shows its "not available" state, never a spinner).
  const loaded = new Map<string, T | null>();
  const pending = new Map<string, Promise<T | null>>();

  /** Starts (or joins) the download; resolves with the entry, or null when the slug is unknown. Never rejects. */
  const preload = (slug: string): Promise<T | null> => {
    const done = loaded.get(slug);
    if (done !== undefined) return Promise.resolve(done);
    let p = pending.get(slug);
    if (!p) {
      const load = bySlug.get(slug);
      p = (load ? load().then((m) => m.default) : Promise.resolve(null))
        .catch(() => null)
        .then((entry) => {
          loaded.set(slug, entry);
          pending.delete(slug);
          return entry;
        });
      pending.set(slug, p);
    }
    return p;
  };
  /** The entry if its chunk has already arrived, null if it is known not to exist, undefined if still loading / not requested. */
  const peek = (slug: string): T | null | undefined => loaded.get(slug);
  return { preload, peek };
}
