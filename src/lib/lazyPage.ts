import { lazy, type ComponentType } from 'react';


/**
 * React.lazy with a `preload()` handle, for route components whose first paint is a prerendered
 * static page.
 *
 * Every public page under /learn, /compare and /exams is shipped as real HTML by
 * scripts/prerender.mjs; React then mounts over that DOM. If the page's component lived in a
 * plain React.lazy chunk, that mount would first *replace* the visible article with the Suspense
 * fallback (a spinner) until the chunk arrived - on slow 4G, seconds of blank page where readable
 * content had just been. main.tsx therefore awaits `preloadRoute(location.pathname)` before
 * mounting, and this wrapper makes the resolved module available to React *synchronously*: once
 * preloaded, the thenable handed to React.lazy calls back during `.then()` itself, so the lazy
 * initializer sees a resolved module on the very first render and never suspends.
 */
// Same generic shape as React.lazy itself (the component type, not its props) so inference works
// for both prop-less pages and ones with required props.
export function lazyPage<C extends ComponentType<any>>(load: () => Promise<{ default: C }>) {
  type Mod = { default: C };
  let module: Mod | undefined;
  let pending: Promise<Mod> | undefined;
  const preload = (): Promise<Mod> => {
    pending ??= load().then((m) => {
      module = m;
      return m;
    });
    return pending;
  };
  const Component = lazy<C>(() => {
    if (module) {
      const resolved = module;
      // A thenable that settles synchronously - exactly what React.lazy needs to skip suspending.
      // (Never awaited by anything else; it exists only to be handed to React.)
      // oxlint-disable-next-line unicorn/no-thenable
      return { then: (onFulfilled: (m: Mod) => void) => onFulfilled(resolved) } as unknown as Promise<Mod>;
    }
    return preload();
  });
  return Object.assign(Component, { preload });
}
