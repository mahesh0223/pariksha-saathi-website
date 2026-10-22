# Competitors and the keywords they target (22 Oct 2026)

How this was made: web searches for the kinds of page we publish (previous-year papers, Hindi current-affairs PDF,
job profile/salary, NTPC syllabus, free Hindi mock tests, GK questions, Hindi syllabus, job alerts, exam calendar),
then the title, meta description, meta keywords, H1/H2 and internal links of each ranking page were read.

What this is not: there are no search volumes or ranking positions here. We have no keyword tool (Ahrefs, Semrush),
and the search tool's index is US-based, so Indian rankings can differ. For real volumes use Google Keyword Planner;
for the queries we already appear for, export Search Console > Performance > Queries.

## Who the competitors are

| Group | Sites | What they compete with us on |
|---|---|---|
| Paid test platforms with big SEO blogs | Testbook, Adda247, Oliveboard, Physics Wallah (pw.live), Prepp, PracticeMock, ixamBee, Mahendras, Cracku | Exam pages (syllabus, pattern, salary, cut-off), previous-year papers, mock tests, current-affairs PDFs |
| Education news portals | Careers360, Jagran Josh, AglaSem, CollegeDekho, CareerIndia | Salary, exam pattern, calendar, admit card and result news |
| Current-affairs specialists | GKToday, AffairsCloud, PW monthly capsules | Daily/monthly current affairs, PDFs, Hindi PDFs, MCQs |
| Job-alert portals | SarkariResult, FreeJobAlert, truejobs | Notifications, admit cards, results, answer keys |
| Free / government | SATHEE (IIT Kanpur) | "Free SSC coaching", 12 languages - the closest to our free positioning |

## The keywords their pages are built around

Taken from page titles, H1s, H2s and meta keywords (verbatim phrases in quotes).

**Previous-year papers** (Adda247, Prepp, PracticeMock, Cracku)
- "SSC CGL Previous Year Question Paper PDF", "Download PDF Tier 1 and Tier 2 All Shifts" (Adda247 H2s count shifts per year: "2024 (36 Shifts)")
- "SSC CGL Tier 1 Previous Year Question Papers With Answer Key", "(2025-2016)", "shift wise, in English and Hindi" (Prepp)
- "with solutions", "year-wise, shift-wise solved PDFs", "free" (PracticeMock)

**Syllabus and pattern** (Testbook, PW, Oliveboard, Careers360)
- "SSC CGL Syllabus 2026 and Exam Pattern, Download PDF for Tier 1 and 2" (Testbook)
- "SSC CGL Syllabus in Hindi, Tier 1 & 2 पूरी जानकारी", "सिलेबस 2026 में क्या नया है" (Oliveboard Hindi blog)
- "RRB NTPC Syllabus 2026: CBT 1 & CBT 2 Topics, Exam Pattern", "UG vs Graduate Level Syllabus" (PW)
- "Exam Pattern 2026 - Subject Wise Paper Pattern, Marking Scheme" (Careers360)

**Salary and job profile** (Careers360, Prepp, ixamBee, Mahendras)
- "SSC CHSL Salary 2026", "In Hand Salary", "Post wise Salary Structure", "Pay Scale", "Career Growth", "Promotion"
- Meta keywords: "ssc chsl job profile and salary", "ssc chsl salary in hand", "ssc chsl posting location"
- Several still list Postal/Sorting Assistant under CHSL, which the 2026 notice does not (our page is right, theirs is stale).

**Current affairs** (PW, AffairsCloud, GKToday)
- "SSC Monthly Current Affairs 2026 PDF: Download Free English & Hindi Capsules", "Last 6 Months Current Affairs PDF" (PW)
- "Current Affairs PDF in Hindi" (AffairsCloud), "Monthly Top 200 MCQs", "PDF E-books" (GKToday)

**General Awareness** (Cracku)
- "Top-100 SSC General Awareness Questions & Answers PDF", "most important General awareness questions based on asked questions in previous exam papers"

**Job alerts** (SarkariResult, FreeJobAlert)
- "Sarkari Result 2026", "Online Form", "सरकारी रिजल्ट", "Sarkari Naukri", "free job alerts", "admit card", "answer key"

**Brand / platform** (home pages)
- Testbook: "India's No.1 Govt Exam Preparation Site", "Mock Test", "26000+ Mock tests"
- Adda247: "India's Largest Vernacular Learning Platform"
- Oliveboard: "Exam preparation platform", "Govt Exam preparation", "100+ Free Mock Tests", "400+ Free Ebooks"
- SATHEE: "Free JEE, NEET, SSC, CUET Coaching by IIT Kanpur", "12 Indian languages"

## How they cover an exam: one page per keyword

Testbook's SSC CGL syllabus page links **101 separate CGL pages**, one per search intent: salary, cut-off, admit card,
answer key, result, eligibility, exam dates, apply online, vacancy, exam centre, normalisation, post preference order,
books, notes (history, polity, geography, maths formulas), "how to prepare" guides, and post-wise pages
("income-tax-inspector-salary", "aso-salary-job-profile", "auditor-salary-and-job-profile"), plus question-style pages
("can-final-year-students-apply-for-ssc-cgl", "is-there-any-interview-in-ssc-cgl", "is-there-sectional-cut-off-in-ssc-cgl").
Prepp links 19 per exam; PW links about 10 per NTPC.

Patterns that repeat across almost every title:
1. The year: "2026" (syllabus 2026, salary 2026, exam pattern 2026).
2. "PDF" / "Download PDF".
3. "in Hindi" as its own page.
4. "Tier 1 & Tier 2" / "CBT 1 & CBT 2", "shift wise", "with answer key / solutions".
5. "In-hand", "post wise", "job profile", "career growth".
6. "Free".

## Where we stand

Our titles, for comparison:
- Hub: "SSC CGL exam pattern, marks & cut-off" (no year; doesn't mention the 42 solved papers listed on it)
- Syllabus: "SSC CGL Syllabus & Exam Pattern" (no year, no "Tier 1 & 2")
- Job profile: "SSC CGL Job Profile & Salary"
- Papers: "SSC CGL 2024 Tier-I Question Paper (26 Sep 2024, Shift 1) with Answers" - one page per shift, but no
  listing page: /exams/ssc-cgl/question-papers/ redirects to the hub
- Current affairs: "Daily Current Affairs for SSC, Bank & Railway Exams"; downloads: "Downloads: daily and monthly
  current affairs PDFs"

What we have that they mostly don't: 347 solved papers as text pages (CGL 42, CHSL 112, MTS 129, GD 64 shifts), a
measured GK data page (7,925 questions), every fact linked to its official notice, daily Hindi PDF, Hindi pages at
their own URLs, and posts/pay that match the current notice (several competitors' CHSL pages are out of date).

## Opportunities, in priority order

Status: 1 built 22 Oct 2026 (2fa5a9b); 2 built 22 Oct 2026 (hub titles and H1s, src/lib/examHub.mjs HUB_TITLE_NAME). 3 built 22 Oct 2026 (downloads page title, description and H1). 4 built 22 Oct 2026 (CHSL job-profile title). 5-7 not built.

1. **A previous-year-papers page per exam** - "SSC CGL Previous Year Question Papers with Answers (Tier-I, shift-wise)"
   listing every solved shift by year, for CGL, CHSL, MTS and GD, in English and Hindi. This is the most contested
   keyword we already have the content for; today our papers sit under a hub titled for pattern and cut-off.
2. **Year and modifiers in titles, only where true** - hubs are verified for the 2026 cycle, so "SSC CGL 2026: Exam
   Pattern, Syllabus, Cut-off & Dates" is accurate. Add "Tier 1 & Tier 2" / "CBT 1 & CBT 2" where the page covers them.
3. **Downloads page title** aimed at "daily current affairs PDF in Hindi" and "monthly current affairs PDF".
4. **Salary keyword, our way** - "SSC CHSL Salary 2026: Pay Level and Pay Scale from the Official Notice". Competitors
   win "in-hand salary" with estimates we decided not to publish; "official pay scale, no guesswork" is a true angle.
5. **Question-style FAQs on hubs** from facts we already hold ("Can final-year students apply for SSC CGL?", "Is there
   negative marking in CBT 2?"), with FAQ markup.
6. **GK data page** title/H2s aimed at "SSC GK most asked questions" and "SSC general awareness important topics".
7. **Per-exam admit card / result pages** that collect our notices for one exam (the job-alert keywords). Bigger
   build; lower priority than 1-6.

Next data step: export Search Console Performance > Queries (last 28 days) so the list above can be checked against the
searches we already get impressions for.

## Sources

- Testbook SSC CGL syllabus: https://testbook.com/ssc-cgl-exam/syllabus
- Adda247 CGL papers: https://www.adda247.com/jobs/ssc-cgl-previous-year-question-papers-pdfs/
- Prepp CGL papers: https://prepp.in/ssc-cgl-exam/tier-1-previous-year-question-paper
- Prepp CHSL job profile: https://prepp.in/ssc-chsl-exam/job-profile
- PracticeMock CGL papers: https://www.practicemock.com/blog/ssc-cgl-question-paper/
- Oliveboard Hindi syllabus: https://www.oliveboard.in/hindiblog/ssc-cgl-ka-syllabus-kya-hai/
- PW SSC monthly current affairs: https://www.pw.live/ssc/exams/ssc-monthly-current-affairs
- PW RRB NTPC syllabus: https://www.pw.live/exams/railway/rrb-ntpc-syllabus/
- Careers360 CHSL salary: https://competition.careers360.com/articles/ssc-chsl-salary
- Careers360 NTPC pattern: https://competition.careers360.com/articles/rrb-ntpc-exam-pattern
- ixamBee CHSL salary: https://www.ixambee.com/exams/ssc-chsl-salary
- Mahendras CHSL job profile: https://www.mahendras.org/blogs/ssc-chsl-job-profile
- Cracku GA questions: https://cracku.in/blog/top-100-ssc-general-awareness-questions/
- AffairsCloud Hindi PDF: https://affairscloud.com/current-affairs-pdf-hindi
- GKToday: https://www.gktoday.in/
- SarkariResult: https://www.sarkariresult.com/
- FreeJobAlert: https://www.freejobalert.com/
- SATHEE: https://sathee.iitk.ac.in/
- Home pages: https://testbook.com/, https://www.adda247.com/, https://www.oliveboard.in/, https://www.jagranjosh.com/
