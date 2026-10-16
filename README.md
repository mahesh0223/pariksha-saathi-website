# parikshasaathi.com

Marketing site + web app for Pariksha Saathi (free exam prep for SSC, banking, railway, police and
state PSC aspirants). Vite 8 + React 19 + react-router + react-query, deployed on Cloudflare Pages.

## Build

```bash
npm run build          # tsc -b && vite build && node scripts/prerender.mjs
npm run check:public   # asserts the built dist/ is complete and keeps the perf/offline contract
npm run preview        # serves dist/ (no brotli, no _headers - see "Measuring" below)
```

`scripts/prerender.mjs` runs after `vite build`. It fetches the live content API and writes a real,
crawlable HTML file for every public URL (home, /learn/*, /compare/*, /exams/*, current affairs,
notices), then regenerates the service worker so the precache manifest covers those files. A
backend reseed does not reach these pages until the site is rebuilt.

## Performance and offline contract (2026-10-16)

Positioning is "exam prep that works even where the signal doesn't", so the landing page has to
paint fast on a slow 4G phone and the site has to open offline after one visit. These pieces hold
that together; `npm run check:public` fails the build if one of them regresses.

- **Fonts are self-hosted and inline.** `public/fonts/` holds Google's latin/latin-ext/Devanagari
  woff2 subsets of Fraunces (wght 500–700), IBM Plex Sans (400–700) and IBM Plex Sans Devanagari
  (400/600), with the upstream version in the file name. The `@font-face` rules live in
  `index.html`'s `<!-- shared-head -->` block, which `scripts/prerender.mjs` copies into every
  prerendered page. No request goes to fonts.googleapis.com any more. Only the two latin files are
  preloaded; `unicode-range` means an English page never downloads the Devanagari file.
  The same block declares metric-matched fallbacks (`Fraunces Fallback Georgia/Noto`,
  `IBM Plex Sans Fallback Arial/Roboto`, with `size-adjust` and ascent/descent overrides computed
  from the fonts' own metrics) that theme.css lists right after each web font, so text rendered
  before the font arrives already has the final width and line height: the swap changes glyphs,
  not layout. Recompute those values if a font file changes.
  The rupee sign (U+20B9) is deliberately left out of every `unicode-range`, and the "read in
  Hindi" pill link (`.compare-lang-switch`) has a stack without the Devanagari face: either one
  used to make every English lesson page download the latin-ext and 79 KB Devanagari files at
  top priority, ahead of the JavaScript. Both now render from the system font; `check:public`
  guards this.
- **The entry CSS is inlined.** The prerender step reads Vite's built stylesheet and puts it in a
  `<style>` on every page (and in `spa.html`), then deletes the file. Stylesheets a prerendered page
  needs must be imported from `src/main.tsx` so they end up in that entry CSS, not in a lazy chunk.
- **Public pages are lazy chunks.** `src/App.tsx` routes from the slim `*Slugs.mjs` /
  `lessonSubjects.mjs` lists; the content modules load with their page. `src/main.tsx` awaits
  `preloadRoute()` before mounting so a prerendered article is never replaced by a spinner
  (`src/lib/lazyPage.ts`).
- **One content chunk per lesson / job profile.** `scripts/split-content.mjs` (run by
  `npm run generate`, and automatically before `build` and `dev`) writes one module per entry of
  `topicLessons.mjs` and `examJobProfiles.mjs` into the gitignored `src/data/generated/`;
  `src/lib/contentChunks.ts` globs them, so `/learn/percentages/` downloads ~6 KB of content
  instead of the 560 KB whole-catalog chunk it used to. `preloadRoute()` fetches the entry
  together with the page chunk, the page reads it synchronously on first render, and the
  prerender step adds `<link rel="modulepreload">` for both (from `dist/.vite/manifest.json`) so
  the downloads start with the HTML. Edit the source modules, never the generated files;
  `check:public` fails if they drift.
- **Hero image** ships as 240/480/720-px WebP + JPEG variants with `srcset`, `width`/`height` and
  `loading="lazy"`; the header icon is `icon-48.png`/`icon-96.png`, not the 512-px app icon. The
  other screenshots in `public/assets/screenshots/` are Play Store assets and are not shown on
  any page.
- **The home page is hydrated, not re-rendered.** `src/main.tsx` calls `hydrateRoot` on `/` and
  `createRoot().render()` everywhere else. `homePageBody()` in `scripts/prerender.mjs` therefore
  mirrors `src/pages/HomePage.tsx` node for node: no whitespace between elements, CTAs as
  `<a href="/onboarding">`, one text node where the component renders one, the preview JSON
  after `#root` rather than inside it. The payoff is LCP: the hero `<h1>` painted at first
  contentful paint stays the LCP element instead of being recreated when the bundle arrives
  (LCP 2.4 s -> ~0.8 s on slow 4G). React 19 answers any mismatch by rebuilding the whole tree
  with an error in the console, so when you change the home page change both files, then run
  `npm run check:hydration` (loads the built page in headless Chrome and fails unless the parsed
  `<h1>` survives the mount with no hydration error); `check:public` guards the static rules.
- **Home page preview data** (latest current affairs and notices) is baked into the HTML as JSON
  (`<script id="home-preview">`) and used as react-query `initialData`, so the first render
  already shows the four cards the HTML has (which is what lets those sections hydrate) and
  nothing shifts; the live list is refetched in the background.
- **Service worker + manifest** come from `vite-plugin-pwa` (`vite.config.ts`). Precached: home,
  SPA shell, top-level public pages, entry JS, latin fonts, icons, small hero variants. At runtime:
  navigations are network-first with the cached copy offline and `spa.html` as the last fallback;
  `/assets/*` and `/fonts/*` are cache-first; anonymous `GET` JSON from
  `api.parikshasaathi.com/v1/*` is network-first with a 7-day cache (auth/progress endpoints and
  anything with an `Authorization` header are never cached). `/pdf/*` is never cached. A new
  worker waits until all tabs of the site are closed, then takes over on the next visit; content
  stays fresh regardless because HTML is network-first.
- **`public/_headers`** (Cloudflare Pages): `/assets/*` and `/fonts/*` are `immutable, max-age=1y`
  because the names are content-hashed / versioned; the non-hashed images under `/assets/`
  (icons, screenshots, feature graphic) get one day; HTML, `sw.js` and the manifest are
  `max-age=0, must-revalidate`. Rules in `_headers` are additive, so the narrower image rules
  first remove (`! Cache-Control`) and then re-set the header. After deploying a change here, check
  with `curl -I https://parikshasaathi.com/assets/<file>` that `cache-control` is what you expect.

### Measuring

`vite preview` serves uncompressed files without `_headers`, so Lighthouse numbers from it are
pessimistic. Measure the deployed site (`npx lighthouse https://parikshasaathi.com
--only-categories=performance` or PageSpeed Insights), or serve `dist/` the way Pages does with
`npm run serve:dist` (brotli, `_headers`, directory index files, spa.html fallback; port 4173)
and run `npx lighthouse http://localhost:4173/ --only-categories=performance
--throttling-method=devtools` for applied rather than simulated throttling. Targets on slow 4G,
mobile: FCP < 2.0 s, LCP < 2.5 s, CLS < 0.05; on the home page LCP should sit within ~0.1 s of
FCP - if it jumps to the time the JS arrives, hydration has broken (`npm run check:hydration`).

## Other scripts

- `npm run submit:indexnow` - notify search engines of changed URLs.
- `npm run pdf:daily` / `npm run pdf:capsule` - build the downloadable PDFs under `public/pdf/`.
