# AdSense readiness - parikshasaathi.com - 17 October 2026

Decision document for the owner. Everything marked "verified" was checked against the live site, the repo at `297c6e5` (HEAD = origin/main, deployed), the Search Console exports in `~/Downloads` dated 16 Oct 2026, or the cited Google page, on the night of 16-17 Oct 2026.

## Verdict

1. **Do not request another review now.** The site is 30 days old, 10 of the 27 live exam-notice pages are back to the exact pattern the 10 Oct rejection was about (146-231 words of restated official text, no commentary), and Google crawled the rewritten pages on 13-14 Oct and still declined to index 44 of them.
2. **Earliest sensible re-request: the week of 16 November 2026** (five weeks after the 10 Oct rejection, site two months old), and only if the three gates in section 4 are met: notices fixed and gated, Hindi navigation fixed, and Search Console showing the restructured pages indexed.
3. **If that review is also rejected, stop and wait until 17 March 2027** (domain six months old). Google says the review button goes inactive after several recent rejections and does not say for how long; a third "Low value content" stamp is the one outcome that costs more than waiting.
4. **Waiting costs almost nothing:** at today's traffic (about 530 Search impressions a day, double-digit clicks) AdSense would pay well under 2,000 rupees a month by any published Indian RPM benchmark; a second rejection costs a lockout of unknown length.
5. **The six-month India rule is not a current published Google rule.** It is absent from Google's eligibility page in every snapshot from 2020 to 2026 and only survives in 2009-era forum quotes and, as generic "at least six months" advice, in a 2017 Google blog FAQ. Site age is still the weakest signal we have, but it is not a hard gate, so November is worth one attempt if the gates are met.

## 0. Status after the overnight fixes (17 Oct 2026, 01:30 IST)

Of the three gates in section 4 for a mid-November attempt:

- **Notices fixed and gated - done.** All 27 live exam-notice pages now carry a "What this means for you" paragraph (EN + HI), and `check:public` fails the production build if a notice page lacks one (commits `080aca3`, `e4ef8ea`).
- **Hindi navigation - half done.** The 288 lesson pages' language-switch link now carries its trailing slash (no more 308 hop), and the slash guard covers slug-level learn / exams / compare links. `/hi/learn/` and `/hi/` still return 404 - scheduled as part of tomorrow's T1 in `pariksha-saathi/docs/plans/2026-10-17-working-plan.md`.
- **Indexing targets - wait and watch.** Every item page now carries its MCQ statically and links to its neighbours (419-667 words, was ~360); hubs list recent items; IndexNow re-pinged. The owner still has to resubmit the sitemap and click "Validate fix" on the redirect / alternate-canonical reasons in Search Console. Re-check the coverage report around 1 November.

Nothing above changes the verdict: do not request a review before the week of 16 November 2026.

## 1. Our numbers against each requirement

Google publishes very few numbers. Where a row says "no published threshold", the comparison is against the wording of Google's page, not a figure.

| Requirement (Google's wording, source in section 6) | Where we stand (verified 16-17 Oct 2026) | Status |
|---|---|---|
| "If you have your own content that meets our policies and you're 18 or over, you can sign up" [G1] | Owner is an adult; content is the site's own; HTML is fully under our control (prerendered static pages on Cloudflare Pages). | Met |
| Site ownership verification (ads.txt / meta tag) | `ads.txt` live: `google.com, pub-6818930282969815, DIRECT`; `google-adsense-account` meta tag on all 619 built pages (build fails without it, `scripts/check-public-pages.mjs`). AdSense showed ads.txt "Authorised" on 12 Oct. | Met |
| Site age: no published minimum on Google's current page [G1]; Google's 2017 FAQ: "make sure that the site you own has been active for at least six months" [G2]; the "China and India: owned for 6 months" rule is historical (2009-era forum quotes only [T1]) | Domain registered **2026-09-17 10:04 UTC** (Cloudflare) - 30 days old today. First commit **2026-09-19**. Six-month mark: **2027-03-17**. Rejected 10 Oct at 23 days old with 350+ pages. | Weakest point; only time fixes it |
| "Your content must be high-quality, original, and attract an audience" [G1]; "too little text, and/or ... 'under construction'" is a rejection reason [G4]; "complete sentences and paragraphs, not only headlines" [G4] | 744 sitemap URLs: 288 lesson pages (144 EN + 144 HI; EN body 628-2,424 words, median about 1,030); 300 current-affairs pages (150 EN + 150 HI; 432-676 words, median 551, every one with a referenced learning note, check question and revision task); 42 exam-hub pages (about 1,400 words, every block carries a linked, dated official source - build-enforced); 74 syllabus/job-profile pages (about 480-830 words); 27 exam notices (146-408 words); 7 static pages. | Met everywhere except the 10 notices (next row) |
| No ads on screens "without publisher-content or with low-value content" or "under construction" [G6]; no "republishing content from other sites without adding any original content or value" [G8] | **10 of 27 notices** (all added 14-16 Oct) have no "What this means for you" guidance: 146-231 words of restated official notice. 17 older notices have it (250-408 words). The build gate that forces a note on every new current-affairs item does **not** cover notices. | Not met - regression since 13 Oct |
| "Don't place ads on automatically generated content without manual review or curation" [G6]; "Is the use of automation, including AI-generation, self-evident to visitors through disclosures?" [G10] | 20 General Awareness lessons say "Prepared with AI assistance and fact-checked on 2026-10-15; not yet read line by line by a human editor" (Hindi twin: publisher read and approved the Hindi text on 16 Oct). 124 core lessons say "Written by Mahesh Srivastava, Founder". Current-affairs pages credit the Organization and link the PIB source. `/about/` describes editorial standards but says nothing about how drafts are produced. | Partly met - see checklist item 4 |
| Navigation: "we found your site difficult to navigate" is a rejection reason [G4]; reviewers "may review all pages of your site, not just the sign-up URL" [G4] | Every public page has the Exams button and exam chooser (21 exams, EN+HI); breadcrumbs on all content pages; current-affairs archive is one chained sequence. **Gaps:** `/hi/learn/` and `/hi/` return 404 - the 144 Hindi lessons have no index and link back to the English `/learn/`; the language-switch link on all 288 lesson pages is slash-less (`/hi/learn/<slug>`) and costs a 308 redirect (`scripts/prerender.mjs` lesson block builds `enPath`/`hiPath` without the trailing slash; the 16 Oct slash check only matches section roots and `/compare/`). | Partly met |
| Policy pages (privacy; about/contact expected by reviewers, community guidance [C1]) | `/about/` (named founder, Person schema, non-affiliation statement, corrections process), `/contact/`, `/privacy/`, `/terms/` (dated 13 Oct 2026), `/account-deletion/` - all on-domain, HTTP 200. `www.` 301s to the apex. | Met |
| Reviewer sees a finished, live site: "Your site must be live and contain enough content for our specialists to evaluate" [G3] | Static HTML per page; client-only app routes are robots-disallowed and serve the app shell; custom 404 page; ad runtime fully absent (build-enforced). | Met |
| Indexation and traffic - **no published Google threshold** (community lore only [C2]) | GSC export 16 Oct (data to 12 Oct): **217 indexed / 257 not indexed** of 474 known URLs; the other ~270 sitemap URLs (mostly dated 15-16 Oct) are not in the report yet. Indexed went 39 (4 Oct) -> 163 (5 Oct) -> 217 (10 Oct). Impressions/day 77 (30 Sep) -> 473 (4 Oct) -> 536 (12 Oct). Last known clicks: 52 lifetime on 12 Oct, brand queries. | Trending right, but 70% of URLs unindexed |
| Review history: "The Start review process button will be inactive if your site has been reviewed and rejected several times recently. Check the date provided" [G5]; "Make sure you don't remove your site and resubmit it because this can delay the process" [G7] | One rejection on record (10 Oct 2026, "Low value content"). Earlier attempts before that are not documented here - check the Policy center for a date next to the button before planning anything. | Unknown until checked in the account |

Not-indexed buckets from the same export (which URLs, so you can see what Google is unsure about):

| Bucket | Pages | What is in it |
|---|---|---|
| Discovered - currently not indexed (never crawled) | 140 | 64 current-affairs items, 14 notices, 18 `/hi/learn/`, 31 `/learn/`, 7 `/compare/`, 6 `/hi/compare/` |
| Crawled - currently not indexed | 44 | 23 current-affairs items, 9 `/hi/learn/`, 11 `/learn/`, `/contact/` - **all crawled 13-14 Oct**, i.e. after the restructure; Google looked and deferred |
| Page with redirect | 31 | slash-less `/hi/learn/<slug>` (19) and `/learn/<slug>` (8), plus `www.` - these are exactly the lesson language-switch links above |
| Alternative page with proper canonical tag | 26 | 25 `/learn/<slug>/` crawled 2-8 Oct - most likely leftovers of the trailing-slash canonical change; should clear on recrawl (unverified) |
| Duplicate, Google chose different canonical than user | 16 | the 16 oldest current-affairs items (12-13 Sept ids), crawled 13-14 Oct; each now has a self-referencing canonical and an hreflang twin. Needs URL Inspection to see what Google picked |

## 2. What "Low value content" means in 2026

There is no Google help page titled "Low value content". The label in the account is backed by these official texts, which together are what the reviewer is applying:

- **Not enough unique content / poor experience.** "Your site doesn't have enough unique content or provide a good user experience" - a site must offer "enough valuable content to users" and have good navigation [G3].
- **Insufficient content.** "Your site was found to have too little text, and/or your site was deemed to be 'under construction.'" ... "Your content should contain complete sentences and paragraphs, not only headlines." ... "we may review all pages of your site, not just the sign-up URL" [G4].
- **Original, not borrowed.** "Valuable and original content is paramount"; "take care when using external resources such as articles on other sites or embedded videos"; "Google ads may not be placed on sites with scraped or copyrighted content" [G9].
- **Screens without publisher content (publisher policy).** No Google-served ads on screens "without publisher-content or with low-value content", "that are under construction", or "used for alerts, navigation or other behavioral purposes"; "Don't place ads on automatically generated content without manual review or curation" [G6]. The old "Minimum content requirements" answer id (1348688) now redirects to the Publisher Policies index [G6b].
- **Scaled / scraped content (Search spam policy, which AdSense reviewers lean on).** "Using generative AI tools or other similar tools to generate many pages without adding value for users"; "Republishing content from other sites without adding any original content or value, or even citing the original source" [G8].
- **AI stance.** "Appropriate use of AI or automation is not against our guidelines"; what is prohibited is "using automation - including AI - to generate content with the primary purpose of manipulating ranking" [G11]. Google "strongly encourage[s] adding accurate authorship information, such as bylines to content where readers might expect it" and asks whether AI use is "self-evident to visitors through disclosures or in other ways" [G10].

What reviewers are reported to check beyond that (community, not official): E-E-A-T, whether the publisher is identifiable, content that merely restates what is widely published, and "tools/app" sites with little reading content [C1]. Our 10 Oct rejection fits the first four of these; the site is also partly an app, which is why the public pages were pulled out of the app shell on 12 Oct.

## 3. Gap list from the 10 Oct audit - status today

| # | Gap recorded on 10-13 Oct | Status 17 Oct | Evidence |
|---|---|---|---|
| 1 | Site ~3 weeks old with 350+ pages (scaled-content pattern) | **Not fixable, only ageing.** 30 days old, now 744 URLs. The pages are individually substantive, which is what matters under the spam policy ("no matter how it's created" is about value, not volume) | whois; sitemap |
| 2a | 72 current-affairs capsules = near-verbatim PIB first paragraph + link | **Done.** 300 pages (EN+HI), every one with a learning note, reference link, check question and revision task; 432-676 words; a build gate fails the build if an item dated on/after 13 Oct has no note | crawl of all 300 live pages; `check-public-pages.mjs` |
| 2b | 17 exam notices at 109-263 words with no commentary | **Regressed.** The 17 have guidance (250-408 words) but **10 new notices (14-16 Oct) have none** (146-231 words); no build gate for notices | crawl of all 27 live pages; `src/data/examNoticeGuidance.mjs` has 17 entries |
| 3 | No named author; personal Gmail contact; no `/contact/`, `/terms/`, disclaimer | **Done.** "Written by Mahesh Srivastava, Founder" on 124 lessons; Person schema; `/about/` with non-affiliation and corrections policy; `/contact/`, `/terms/` live. Could not verify from outside whether the contact address is a domain mailbox (Cloudflare obfuscates it) - check | live pages |
| 4 | Public CA/notice pages wrapped in app shell, re-fetching, Hindi-mode "item isn't available" | **Done.** Static pages, hreflang EN/HI twins, neighbour links | live HTML |
| 5 | `www.` served duplicates | **Done.** 301 to apex | curl |
| 6 | 9 news items without notes | **Done** (300/300) | crawl |
| 7 | Lesson dates / images / Person schema | Dates and Person schema **done** (datePublished 1/3/5 Oct on lessons, 15 Oct on GA lessons). Images **not done** - and not required by any Google page; low priority | live JSON-LD |
| 8 | Account-deletion page off-domain | **Done** (`/account-deletion/`, no off-domain links left in `src/`) | curl; grep |
| 9 | Terms page dated in the future | **Resolved by time** (13 Oct) | live page |
| 10 | Hindi lessons not indexed | **Not done.** 27 `/hi/learn/` URLs sit in not-indexed buckets; no `/hi/learn/` index page exists and Hindi lessons link to the English library; the slash-less language switch adds a redirect hop | GSC export; `prerender.mjs` |
| 11 | `sameAs` empty | **Done** (YouTube + Instagram on the home-page Organization schema). The Instagram handle is spelled `parkishasathi` - verify it is the real handle | `prerender.mjs:898` |
| 12 | Google re-crawl / Request indexing | **In progress.** 217 indexed; 44 restructured pages crawled 13-14 Oct and deferred; 140 never crawled | GSC export |

New since the audit (all live): 21 exam hubs in EN+HI with sourced, dated blocks; 19 syllabus and 18 job-profile pages in both languages; exam chooser on every header; `/downloads/` with 5 daily PDFs and 2 monthly capsules; IndexNow submission script; service worker, inlined fonts/CSS; 16 Oct trailing-slash fix for section links and neighbour links on every current-affairs page.

## 4. While waiting - ordered by impact

Gates for the November decision are items 1-3. Items 4-8 improve the odds; 9 is what not to do.

1. **Write guidance for the 10 bare notices and extend the build gate to notices.** Add the 10 ids to `src/data/examNoticeGuidance.mjs`, then add a notice check next to the current-affairs policy block in `scripts/check-public-pages.mjs` (any `/app/exam-notices/*` page without the guidance block fails the build). *Why:* these are the only content pages under 250 words left on the site and they are the literal 10 Oct complaint - "too little text" [G4] and "republishing content ... without adding any original content or value" [G8]. The 13 Oct regression showed that without a gate this reappears with every batch.
2. **Give the Hindi half of the site a front door and remove the redirect hop.** Prerender `/hi/learn/` (and preferably `/hi/`), link every Hindi lesson to it, and make the lesson `enPath`/`hiPath` in `scripts/prerender.mjs` end with `/` (widen the slash regex in `check-public-pages.mjs` to cover slugs so it cannot come back). Then in Search Console click "Validate fix" on "Page with redirect". *Why:* "difficult to navigate" is an explicit rejection reason [G4]; 27 Hindi lessons are unindexed with no internal path to them other than hreflang; the 31 "Page with redirect" URLs are these exact links.
3. **Get the restructured pages indexed before asking for a review.** Use URL Inspection -> Request indexing on the 44 "Crawled - currently not indexed" URLs first (there is a daily limit; "Indexing can take up to a week or two" [G12]), run `npm run submit:indexnow` after each deploy, and inspect three of the 16 "Duplicate, Google chose different canonical" items to see what Google picked. Target before re-requesting: "Crawled - not indexed" under ~15, "Discovered - not indexed" under ~50, indexed at least ~400 of ~750. *Why:* a reviewer who checks `site:parikshasaathi.com` or the Search Console link in the sign-up flow sees the same 29% we see; Google itself says it reviews the whole site [G4]. These numbers are our own targets - Google publishes none.
4. **Make the AI disclosure consistent and say it once on `/about/`.** State the workflow (drafted with AI assistance, sources checked, which pages a human has line-edited) and make the 124 "Written by" credit lines true to it - either "Written and checked by" where that is the case, or the same "AI assistance" line the GA lessons use. Fix the Instagram handle if `parkishasathi` is a typo. *Why:* Google asks that AI use be "self-evident to visitors through disclosures" and warns that fabricated authorship is "a form of deception" [G10]; the community guidance on this rejection is explicit that unverifiable authorship lowers the odds [C1]. The repo's own rule ("no human byline on text a human has not line-edited") already encodes this.
5. **Add `datePublished` to the exam-notice Article schema and consider Hindi twins for notices** (only with guidance written; otherwise it is 27 more thin pages). *Why:* consistency with the rest of the site; hubs in Hindi currently link to English-only notices.
6. **Keep the publishing cadence but stop "bulk days".** 52 current-affairs pages (26 items, EN+HI) are dated 12 Oct and 28 pages (14 items) 15 Oct, against 2-4 items on a normal day; a steady 2-4 a day with notes looks like a publication, a 26-item day looks like a feed import. *Why:* "Scaled content abuse ... large amounts of unoriginal content" [G8] is judged on pattern, and the note gate already guarantees the content side.
7. **Record a weekly snapshot** (indexed count, the five bucket sizes, clicks and non-brand queries) in this folder every Monday until the decision. *Why:* the November go/no-go in the verdict is a numbers decision; without the series it becomes a feeling.
8. **Monetisation groundwork that does not depend on AdSense.** (a) Amazon Associates India ("up to 10% in affiliate fees", category rates behind login [A1]) for one disclosed "books for this exam" box on each hub - keep it a minor part of the page, which is also an AdSense rule ("Affiliate program content should form only a minor part of the content of your site" [G4]). (b) Finish the Play closed test - 12 testers opted in for 14 consecutive days before production access [A2] - because AdMob can only link a publicly listed app [A3]. (c) The daily PDF is already a retention hook; an email/WhatsApp list makes the November traffic numbers less dependent on Google. None of the premium ad networks is an option: Journey by Mediavine needs 1,000 Tier-1 (US/CA/UK/AU) sessions in 30 days [A4], Raptive needs 25,000 monthly pageviews with 50% from US/UK/CA/NZ/AU and a domain at least six months old [A5], Ezoic needs 250,000 monthly active users for new sites since 19 Feb 2026 [A6].
9. **Do not:** remove and re-add the site in AdSense ("this can delay the process" [G7]); add any ad code (the build enforces the meta-tag-only state); request a review before the gates; or describe the fixes to Google as anything other than what was changed (the review form asks "Fixed the violations" [G5] - say what: notes on all news, guidance on all notices, Hindi navigation, author/editorial pages).

When you do request the review (Sites page -> site -> Request review [G3]), expect "a few days, but in some cases ... 2-4 weeks" [G7].

## 5. Earnings reality check (evidence is weak - treat as order of magnitude)

Google's own calculator publishes no figures outside its JS widget [E1]. The only India-specific benchmark found is an agency's own estimate, explicitly "not Google figures": technology/education page RPM of 165-415 rupees per 1,000 pageviews, i.e. 8,250-20,750 rupees a month at 50,000 pageviews and roughly 400-1,650 rupees at 10,000 [E2]. We do not have a pageview number in this export; at ~530 Search impressions a day and a click-through that was 52 clicks lifetime on 12 Oct, monthly pageviews are in the low thousands, so AdSense today would be a few hundred rupees a month. Nothing about the timing decision should be driven by revenue; the asset being protected is the right to be reviewed again.

## 6. Sources

Google (policy and help pages, fetched 16-17 Oct 2026):

- [G1] Eligibility requirements for AdSense - https://support.google.com/adsense/answer/9724 (checked `hl=en`, `hl=en-IN`, `hl=hi`; no six-month or India/China sentence; Wayback snapshots of 2020-03-08, 2021-04-16, 2022-01-18, 2022-12-07, 2023-02-25, 2024-01-15, 2024-10-02, 2025-03-06 and 2026-02-17 also lack it)
- [G2] AdSense Beginner's Frequently Asked Questions, Google blog, 25 May 2017 - https://blog.google/products/adsense/adsense-beginners-frequently-asked-questions/ ("active for at least six months", no country named)
- [G3] What to do when your site is not ready to show ads - https://support.google.com/adsense/answer/12176698
- [G4] Your AdSense account wasn't approved - https://support.google.com/adsense/answer/81904
- [G5] Request a review of your site (Policy center) - https://support.google.com/adsense/answer/7003627
- [G6] Google-served ads on screens without publisher-content (Publisher Policies) - https://support.google.com/publisherpolicies/answer/11112688
- [G6b] Google Publisher Policies index (where the old "Minimum content requirements" id 1348688 now redirects) - https://support.google.com/adsense/answer/10502938
- [G7] Check the status of your AdSense sites - https://support.google.com/adsense/answer/12170222
- [G8] Spam policies for Google web search (Scaled content abuse; Scraping) - https://developers.google.com/search/docs/essentials/spam-policies
- [G9] Make sure your site's pages are ready for AdSense - https://support.google.com/adsense/answer/7299563
- [G10] Creating helpful, reliable, people-first content (Who, How, Why) - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- [G11] Google Search's guidance about AI-generated content, 8 Feb 2023 - https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- [G12] URL Inspection tool, "Request indexing" - https://support.google.com/webmasters/answer/9012289
- Sign up for AdSense (review "usually takes a few days, but in some cases it can take 2-4 weeks") - https://support.google.com/adsense/answer/10162

Community / third party (not official; used only where marked):

- [C1] AdSense Community guide "How can you solve the low value content AdSense disapproval challenge?" - https://support.google.com/adsense/community-guide/241032356/
- [C2] Third-party approval guides disagree on post counts and traffic; none cite a Google number, e.g. https://theguidex.com/google-adsense-approval/ and https://www.panstag.com/2026/05/how-many-articles-before-adsense.html
- [T1] 2009-2010 forum quotes of the then-current Google text "In some locations, including China and India, we also require publishers to have owned their sites for 6 months" - https://www.webmasterworld.com/forum89/13551.htm and https://www.askdavetaylor.com/why_doesnt_adsense_earn_me_any_money/

Alternatives and earnings:

- [A1] Amazon Associates India - https://affiliate-program.amazon.in/ (rate card requires sign-in)
- [A2] Play Console: closed-testing requirement for personal accounts created after 13 Nov 2023 - https://support.google.com/googleplay/android-developer/answer/14151465
- [A3] AdMob: About app readiness / link your app to an app store - https://support.google.com/admob/answer/10564477 and https://support.google.com/admob/answer/10037806
- [A4] Mediavine requirements (Journey: 1,000 sessions from Tier 1 countries in 30 days; Mediavine: $5,000 annual ad revenue) - https://www.mediavine.com/mediavine-requirements/
- [A5] Raptive: Who is eligible - https://help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive and the 25,000-pageview announcement - https://raptive.com/blog/opening-the-door-to-more-creators-who-meet-raptive-quality-standards/
- [A6] Ezoic requirements (250,000+ monthly active users for sites added after 19 Feb 2026) - https://support.ezoic.com/kb/article/getting-started-ezoics-requirements
- [E1] AdSense earnings calculator (placeholder values only in the static page) - https://adsense.google.com/start/
- [E2] upGrowth, "How to calculate Google AdSense earnings in India" (agency estimates, Sept 2026) - https://upgrowth.in/how-to-calculate-google-adsense-earnings-india/

Our data:

- Domain: `whois parikshasaathi.com` (Creation Date 2026-09-17T10:04:57Z, Registrar Cloudflare)
- Repo: `git log --reverse` first commit 2026-09-19 11:09 IST; HEAD `297c6e5` 2026-10-16 23:17 IST, equal to `origin/main` and to the live deploy
- Live crawl of all 300 current-affairs and 27 exam-notice pages, sample lessons/hubs/compare pages, policy pages, robots.txt, ads.txt, sitemap.xml (744 URLs) on 16-17 Oct 2026
- Search Console exports in `~/Downloads`: `parikshasaathi.com-Coverage-2026-10-16.xlsx` and the five `Coverage-Drilldown-2026-10-16` files (data through 12 Oct 2026)
- Memory note of the 10-13 Oct audit: `~/.claude/projects/-Users-mahesh-dev-math-ink-recognizer/memory/pariksha-saathi-website-adsense.md`
