# Trust wording for owner approval (O5) — 17 October 2026

Built and committed locally in the website worktree (`.worktrees/hindi-main`, branch `main`, commit `210383a`),
**not pushed**. Everything below is live text the moment it is pushed, so it needs your yes first. Reply with
"OK" to push as-is, or quote a line and give the replacement.

Rule applied throughout: claim only what is true today. The strip does **not** say "no ads" or "no upsell",
because AdSense, AdMob and a Premium tier are still options in `docs/marketing-plan-2026-10.md` (your O10
decision). If O10 settles on "never ads in the app", we add that line then.

## 1. Landing-page trust strip (under the hero stats, `/` and `/hi/`)

English:

1. No calls: we never ask for your phone number.
2. No loan or EMI upsell.
3. No account needed to read.
4. Every exam fact and news item linked to its official source.

Hindi:

1. कोई फ़ोन कॉल नहीं: हम आपका नंबर माँगते ही नहीं।
2. लोन या EMI का कोई ऑफ़र नहीं।
3. पढ़ने के लिए खाता ज़रूरी नहीं।
4. हर परीक्षा-तथ्य और ख़बर अपने आधिकारिक स्रोत से लिंक।

Hindi stat labels (same four stats as English): "परीक्षाएँ शामिल", "मुफ़्त, कोई पेवॉल नहीं", "दोनों भाषाएँ",
"ऑफ़लाइन — Android ऐप में".

Language switch links added to both heroes: "यह पेज हिंदी में पढ़ें →" (on `/`) and "Read this page in English →"
(on `/hi/`). The desktop header nav also gains "हिंदी" / "English".

Source: `src/data/trustLines.mjs` (one file feeds the React home page, the prerendered home page, the Hindi
landing page and `/about/`).

## 2. `/downloads/` — "How these are made" (was false)

Before:

> Each edition is generated from the same source-linked items that appear under Current affairs on this site,
> **written and reviewed by Mahesh Srivastava, Founder.** Found an error? See the Contact page.

After:

> Each edition is generated from the same source-linked items that appear under Current affairs on this site.
> The items are drafted with AI assistance from the official PIB or ministry release each one links to, and are
> not reviewed by a subject-matter editor. **Mahesh Srivastava**, Founder, is the publisher and is responsible
> for corrections. Found an error? See the Contact page.

The page's structured-data author changes from you (Person) to the organisation, matching the item pages.

## 3. `/terms/` — "Advertising" (was false) + two small changes

Before:

> The website shows ads served by Google AdSense; the Android app does not. See our privacy policy for what
> that involves.

After:

> The website shows no ads today, and the Android app has none. If the website starts showing ads (for example
> through Google AdSense), our privacy policy will be updated first to describe what that involves.

Also: "Last updated: 13 October 2026" → "17 October 2026"; "written and maintained by Mahesh Srivastava" →
"published and maintained by Mahesh Srivastava".

The wording is driven by `SITE_SHOWS_ADS = false` in `src/data/publicPages.mjs`. Flipping it to `true` restores
the previous AdSense text on both legal pages; `check:public` fails the build if the pages and the flag disagree.

## 4. `/privacy/` — three passages (were false) + date

"What we collect", last sentence. Before: "The **website** at parikshasaathi.com does show ads — see
"Advertising on the website" below for what that involves." After:

> The **website** at parikshasaathi.com currently shows no ads either — see "Advertising on this website" below
> for what would change if that ever happens.

"Third parties". Before: "**Google AdSense** serves ads on this website (not the Android app) — see below."
After:

> **Google AdSense:** the website carries an AdSense site-verification tag, which loads no script and sets no
> cookie. No ads are shown and no advertising script is loaded today — see below.

"Advertising on this website" section, replaced in full:

> This website shows no ads today, and the Android app never has. The only AdSense-related thing on the site is
> a verification meta tag, which loads no script and sets no cookie. If we ever switch ads on, we will update
> this policy first (the "Last updated" date will change) and describe exactly what Google's advertising
> cookies do and how to opt out of personalised ads at adssettings.google.com and aboutads.info/choices.
>
> - The Android app is free of ads and ad SDKs. If that ever changes, the app's own privacy policy will say so
>   before a release that includes them.

Also: "Last updated: 12 October 2026" → "17 October 2026"; meta description now "What Pariksha Saathi collects,
how it is used, and where the website and the Android app stand on advertising."

## 5. `/about/` — new section and disclosures

Lede now names all exam families: "An independent exam-preparation project with free topic lessons, practice
questions, sourced exam pages and source-linked updates for SSC, banking, railway, police, CTET and state PSC
aspirants."

"Pariksha Saathi is written and maintained by" → "published and maintained by" (also on `/contact/`).

New section after "Publisher and contact":

> **What you can count on**
> - (the four English trust lines above)
>
> These are the only promises we make. Anything we cannot keep true today is not on this list.

"What the material covers" now also names General Awareness, State GK and CTET teaching pedagogy.

Two new paragraphs under "Editorial standards":

> Much of the content is drafted with AI assistance from the official document or release it links to, and
> checked against that source before publication. Each page's credit line says how it was produced. We do not
> describe content as expert-reviewed or human-reviewed unless a named person has actually reviewed it.
>
> Every number on an exam page (marks, timing, negative marking, age limits, fees, dates, cut-offs) is copied
> from the official notification or result write-up it links to, with the date it was last checked. We do not
> estimate, derive or sum figures the document does not state; where the notice is silent, the page says so.

## 6. Daily PDF footer (`scripts/daily-pdf/make_pdf.py`, future editions only)

Before: "लेखक/संपादक: Mahesh Srivastava, Founder."

After:

> प्रकाशक: Mahesh Srivastava, Founder. सामग्री आधिकारिक विज्ञप्तियों से AI की सहायता से तैयार; किसी विषय-विशेषज्ञ संपादक
> द्वारा समीक्षित नहीं। ग़लती दिखे तो parikshasaathi.com/contact/ पर बताएँ।

The five PDFs already in `public/pdf/` still carry the old line; they are regenerated only by your manual
`npm run pdf:daily` run (macOS Chrome + pypdf), so say if you want the 12–16 October editions rebuilt.

## 7. New Hindi pages (new copy, model-written, not yet owner-signed)

`/hi/` mirrors the English landing page's structure in Hindi: hero ("परीक्षा की तैयारी जो वहाँ भी चले, जहाँ नेटवर्क न
चले।"), the same exam pills pointing at the Hindi hub pages, the stats and trust lines above, the daily-PDF band,
six feature cards, three "how it works" steps, the six lesson subjects, links to current affairs / notices / exam
pages, and five FAQs that translate the English FAQs (free, no account, offline in the app only, sources, not
affiliated). No new factual claim was introduced; every line is a translation of a claim already live in English.

`/hi/learn/` lists all 144 lessons under Hindi subject names (मात्रात्मक अभियोग्यता, तर्कशक्ति, अंग्रेज़ी (English),
सामान्य जागरूकता, राज्य सामान्य ज्ञान, शिक्षण (CTET)) with each lesson's Hindi title and the first sentence of its
Hindi lede, generated from the lesson data (`node scripts/gen-lesson-catalog-hi.mjs`).

Both pages are prerendered, in the sitemap, hreflang-paired with `/` and `/learn/`, and every Hindi lesson,
syllabus, job-profile and exam-directory page now links back to them instead of the English home/library.

## What happens after your OK

1. `git push origin main` from the worktree → Cloudflare Pages deploys in ~2 minutes.
2. `npm run submit:indexnow` for `/`, `/hi/`, `/learn/`, `/hi/learn/`, `/about/`, `/privacy/`, `/terms/`,
   `/downloads/`.
3. Push the legal repo too (`~/dev/pariksha-saathi-legal`, the privacy page the Play listing links to): its
   §4 wording is already mirrored there in a local commit, dated 17 October 2026. The Android app's own
   `PRIVACY_POLICY.md` never mentioned website ads, so it needs no change.
