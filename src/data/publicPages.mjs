import { examsLinkHtml } from '../lib/examDirectory.mjs';
import { LESSON_CATALOG } from './lessonCatalog.mjs';
import { LESSON_CATALOG_HI } from './lessonCatalogHi.mjs';
import { LESSON_SUBJECTS_HI } from './lessonSubjects.mjs';
import { DAILY_PDF_EDITIONS, MONTHLY_CAPSULES } from './downloads.mjs';
import { TRUST_LINES } from './trustLines.mjs';
import { HINDI_HOME_FAQS, HINDI_HOME_META, hindiHomeBody } from './hindiHome.mjs';
import { socialLinksHtml } from './socialLinks.mjs';
export function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
// Whether this website serves ads. False since ad serving was paused (scripts/check-public-pages.mjs fails the
// build if an ad unit or the AdSense runtime appears while it is false). The Terms and Privacy pages derive
// their advertising wording from this flag so the legal text can never say "shows ads" while nothing is shown -
// which is exactly what both pages said until 17 Oct 2026. Flipping it to true restores the AdSense wording;
// bump the "Last updated" dates (and the dateModified values below) in the same change.
export const SITE_SHOWS_ADS = false;
// path/lang/twin are only set where they differ from the default (`/${key}/`, English, no twin). `twin` is the
// same page in the other language, for hreflang - see publicPageMeta().
export const PUBLIC_PAGES = {
  learn: { title: 'Lesson library', description: 'Browse Quantitative Aptitude, Reasoning, English, General Awareness, State GK and CTET teaching lessons, with worked examples or key facts and practice questions.', twin: '/hi/learn/' },
  about: { title: 'About & editorial standards', description: 'Who publishes Pariksha Saathi, how the content is produced, what we promise, and how to report a correction.' },
  privacy: { title: 'Privacy Policy', description: 'What Pariksha Saathi collects, how it is used, and where the website and the Android app stand on advertising.' },
  contact: { title: 'Contact', description: 'How to reach Pariksha Saathi with questions, corrections or feedback.' },
  terms: { title: 'Terms of Use', description: 'The terms that apply to using the Pariksha Saathi website and app.' },
  downloads: { title: 'Downloads: daily and monthly current affairs PDFs', description: 'Free daily current-affairs PDF in Hindi and monthly one-line capsules in English and Hindi for SSC, Banking and Railway exams, each item linked to its official source, with practice questions.' },
  'account-deletion': { title: 'Account & Data Deletion', description: 'How to delete your Pariksha Saathi account and what happens to your data, with or without the app installed.' },
  hi: { ...HINDI_HOME_META, path: '/hi/', lang: 'hi', twin: '/' },
  'hi-learn': { title: 'पाठ पुस्तकालय', description: 'मात्रात्मक अभियोग्यता, तर्कशक्ति, अंग्रेज़ी, सामान्य जागरूकता, राज्य सामान्य ज्ञान और CTET शिक्षण के हिंदी पाठ, हल किए उदाहरणों या मुख्य तथ्यों और अभ्यास प्रश्नों के साथ।', path: '/hi/learn/', lang: 'hi', twin: '/learn/' },
};
// Everything a <head> needs for one public page - the prerender's page() and PublicPage.tsx's useDocumentMeta
// both spread this, so the canonical, lang and hreflang pair come from one place.
export function publicPageMeta(key) {
  const p = PUBLIC_PAGES[key];
  const path = p.path ?? `/${key}/`;
  const lang = p.lang ?? 'en';
  const alternateLanguages = p.twin
    ? [
        { lang: 'en', path: lang === 'en' ? path : p.twin },
        { lang: 'hi', path: lang === 'hi' ? path : p.twin },
        { lang: 'x-default', path: lang === 'en' ? path : p.twin },
      ]
    : undefined;
  return { title: p.title, description: p.description, path, lang, alternateLanguages };
}
const SITE_URL = 'https://parikshasaathi.com';
const PUBLISHER = { '@type': 'Organization', name: 'Pariksha Saathi', url: SITE_URL };
const FOUNDER = { '@type': 'Person', name: 'Mahesh Srivastava' };
const LEGAL_UPDATED = { iso: '2026-10-17', text: '17 October 2026' };

// Structured data per PUBLIC_PAGES key - kept here (not inline per-page) so prerender.mjs and
// PublicPage.tsx both call one function instead of duplicating the schema objects. dateModified
// is only set where the page's own body states a real "Last updated" date - never guessed.
export function publicPageStructuredData(key) {
  const { path } = publicPageMeta(key);
  const base = { '@context': 'https://schema.org', url: `${SITE_URL}${path}`, publisher: PUBLISHER };
  if (key === 'about') {
    return [
      { ...base, '@type': 'AboutPage', name: PUBLIC_PAGES.about.title, description: PUBLIC_PAGES.about.description, mainEntity: FOUNDER },
      { '@context': 'https://schema.org', '@type': 'Person', name: 'Mahesh Srivastava', jobTitle: 'Founder', worksFor: PUBLISHER, url: `${SITE_URL}/about/` },
    ];
  }
  if (key === 'contact') {
    return { ...base, '@type': 'ContactPage', name: PUBLIC_PAGES.contact.title, description: PUBLIC_PAGES.contact.description };
  }
  if (key === 'privacy') {
    return { ...base, '@type': 'WebPage', name: PUBLIC_PAGES.privacy.title, description: PUBLIC_PAGES.privacy.description, dateModified: LEGAL_UPDATED.iso, author: FOUNDER };
  }
  if (key === 'terms') {
    return { ...base, '@type': 'WebPage', name: PUBLIC_PAGES.terms.title, description: PUBLIC_PAGES.terms.description, dateModified: LEGAL_UPDATED.iso, author: FOUNDER };
  }
  if (key === 'account-deletion') {
    return { ...base, '@type': 'WebPage', name: PUBLIC_PAGES['account-deletion'].title, description: PUBLIC_PAGES['account-deletion'].description, dateModified: '2026-10-13', author: FOUNDER };
  }
  if (key === 'downloads') {
    // The editions are generated from AI-drafted items, so the organisation - not the founder - is the author.
    return { ...base, '@type': 'CollectionPage', name: PUBLIC_PAGES.downloads.title, description: PUBLIC_PAGES.downloads.description, author: PUBLISHER, ...(DAILY_PDF_EDITIONS[0] ? { dateModified: DAILY_PDF_EDITIONS[0].date } : {}) };
  }
  if (key === 'hi') {
    return [
      { ...base, '@type': 'WebPage', name: HINDI_HOME_META.title, description: HINDI_HOME_META.description, inLanguage: 'hi' },
      { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: 'hi', mainEntity: HINDI_HOME_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ];
  }
  if (key === 'hi-learn') {
    return { ...base, '@type': 'CollectionPage', name: PUBLIC_PAGES['hi-learn'].title, description: PUBLIC_PAGES['hi-learn'].description, inLanguage: 'hi' };
  }
  // 'learn' - the lesson library index
  return { ...base, '@type': 'CollectionPage', name: PUBLIC_PAGES.learn.title, description: PUBLIC_PAGES.learn.description };
}
const FRAME = {
  en: { home: '/', lessons: '/learn/', lessonsLabel: 'Lessons', affairs: 'Current affairs', pdf: 'Daily PDF', cta: 'Start studying', about: 'About &amp; editorial standards', privacy: 'Privacy Policy', terms: 'Terms of Use', contact: 'Contact' },
  hi: { home: '/hi/', lessons: '/hi/learn/', lessonsLabel: 'पाठ', affairs: 'करेंट अफेयर्स', pdf: 'दैनिक PDF', cta: 'पढ़ाई शुरू करें', about: 'परिचय और संपादकीय मानक', privacy: 'गोपनीयता नीति', terms: 'उपयोग की शर्तें', contact: 'संपर्क' },
};
export function publicFrame(body, lang = 'en') {
  const t = FRAME[lang] ?? FRAME.en;
  return `<div class="compare-page"><header class="pub-header"><div class="wrap pub-nav"><a class="pub-brand" href="${t.home}"><img src="/assets/icon-48.png" srcset="/assets/icon-48.png 1x, /assets/icon-96.png 2x" width="32" height="32" alt="" />Pariksha Saathi</a><nav class="pub-nav-links"><a href="${t.lessons}">${t.lessonsLabel}</a><a href="/app/current-affairs/">${t.affairs}</a><a href="/downloads/">${t.pdf}</a></nav>${examsLinkHtml(lang)}<a class="pub-cta" href="/onboarding">${t.cta}</a></div></header><main class="wrap compare-article">${body}</main><footer class="pub-footer"><div class="wrap pub-footer-links"><a href="/about/">${t.about}</a><a href="/privacy/">${t.privacy}</a><a href="/terms/">${t.terms}</a><a href="/contact/">${t.contact}</a><a href="/downloads/">${t.pdf}</a>${socialLinksHtml()}</div></footer></div>`;
}
const subjectId = (subject) => subject.toLowerCase().replaceAll(' ', '-');
export function libraryBody(lang = 'en') {
  const subjects = [...new Set(LESSON_CATALOG.map((c) => c.subject))];
  if (lang === 'hi') {
    const hiBySlug = new Map(LESSON_CATALOG_HI.map((c) => [c.slug, c]));
    return `<div class="compare-top-row"><a href="/hi/" class="detail-back">&larr; होम</a><a href="/learn/" class="compare-lang-switch" lang="en">Read in English</a></div><h1>पाठ पुस्तकालय</h1><p class="compare-lede">किसी अवधारणा या मुख्य तथ्यों की सूची से शुरू करें, फिर उत्तर देखने से पहले अभ्यास प्रश्न हल करें। नीचे विषय चुनें।</p><nav class="library-jumps" aria-label="विषय">${subjects.map((s) => `<a href="#${subjectId(s)}">${escapeHtml(LESSON_SUBJECTS_HI[s] ?? s)}</a>`).join('')}</nav><p>ये पाठ विषय-कौशल बनाते हैं; ये पूरा पाठ्यक्रम या परीक्षा-प्रश्नों की भविष्यवाणी नहीं हैं। तैयारी की योजना बनाते समय <a href="/hi/exams/">परीक्षा पृष्ठ</a> और वर्तमान आधिकारिक अधिसूचना देखें।</p>${subjects.map((subject) => `<section id="${subjectId(subject)}" class="library-section"><h2>${escapeHtml(LESSON_SUBJECTS_HI[subject] ?? subject)}</h2><div class="library-grid">${LESSON_CATALOG.filter((c) => c.subject === subject).map((c) => { const h = hiBySlug.get(c.slug); return `<article class="library-card"><h3><a href="/hi/learn/${c.slug}/">${escapeHtml(h?.title ?? c.title)}</a></h3><p>${escapeHtml(h?.description ?? c.description)}</p><a href="/learn/${c.slug}/" lang="en">Read in English →</a></article>`; }).join('')}</div></section>`).join('')}`;
  }
  return `<div class="compare-top-row"><a href="/" class="detail-back">&larr; Home</a><a href="/hi/learn/" class="compare-lang-switch" lang="hi">हिंदी में पढ़ें</a></div><h1>Lesson library</h1><p class="compare-lede">Start with a concept or a list of key facts, then attempt the practice questions before revealing the answers. Choose a subject below.</p><nav class="library-jumps" aria-label="Subjects">${subjects.map(s=>`<a href="#${subjectId(s)}">${s}</a>`).join('')}</nav><p>These lessons build topic skills; they are not a complete syllabus or a prediction of exam questions. Check the <a href="/exams/">exam pages</a> and the current official notification when planning your preparation.</p>${subjects.map(subject=>`<section id="${subjectId(subject)}" class="library-section"><h2>${subject}</h2><div class="library-grid">${LESSON_CATALOG.filter(c=>c.subject===subject).map(c=>`<article class="library-card"><h3><a href="/learn/${c.slug}/">${escapeHtml(c.title)}</a></h3><p>${escapeHtml(c.description)}</p><a href="/hi/learn/${c.slug}/" lang="hi">हिंदी में पढ़ें →</a></article>`).join('')}</div></section>`).join('')}`;
}
export function aboutBody() {
  return `<h1>About Pariksha Saathi</h1><p class="compare-lede">An independent exam-preparation project with free topic lessons, practice questions, sourced exam pages and source-linked updates for SSC, banking, railway, police, CTET and state PSC aspirants.</p><h2>Publisher and contact</h2><p>Pariksha Saathi is published and maintained by <strong>Mahesh Srivastava</strong>, founder of Pariksha Saathi. Questions about the project and content corrections can be sent to <a href="mailto:sriwastava2@gmail.com">sriwastava2@gmail.com</a>. We are not affiliated with SSC, IBPS, SBI or any government body.</p><h2>What you can count on</h2><ul>${TRUST_LINES.en.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul><p>These are the only promises we make. Anything we cannot keep true today is not on this list.</p><h2>What the material covers</h2><p>The public lesson library covers individual skills in Quantitative Aptitude, Reasoning and English, plus key-facts lessons in General Awareness, State GK and CTET teaching pedagogy. Short topic introductions are starting points, not complete courses. The app also offers practice and progress tools. Coverage and question availability vary by topic; consult the current official exam notification for the syllabus and rules that apply to your exam.</p><h2>Editorial standards</h2><p>Our standard for lessons is to show the method, state assumptions and provide answers that can be checked. Practice examples are learning exercises unless explicitly identified and sourced as past exam questions. A topic appearing in this library does not mean it appears in every exam or carries a guaranteed weightage.</p><p>Much of the content is drafted with AI assistance from the official document or release it links to, and checked against that source before publication. Each page's credit line says how it was produced. We do not describe content as expert-reviewed or human-reviewed unless a named person has actually reviewed it.</p><p>Every number on an exam page (marks, timing, negative marking, age limits, fees, dates, cut-offs) is copied from the official notification or result write-up it links to, with the date it was last checked. We do not estimate, derive or sum figures the document does not state; where the notice is silent, the page says so.</p><p>Current-affairs summaries link to their source. A summary is not an official notification; distinguish an announcement, a proposal and an implemented measure. Application dates, eligibility and results should always be checked on the exam body's own website before acting.</p><p>Learning notes are separate from news summaries and identify supporting references. Publication dates describe the news item; they do not imply a fresh editorial review. We do not display expert credentials or reviewer names unless they can be substantiated.</p><h2>Report an error</h2><p>Email the page URL, the question or statement, your proposed correction and the supporting calculation or official source. Please do not include passwords, application numbers or other sensitive account information. Corrections should address both English and Hindi versions where applicable.</p><h2>Privacy and accounts</h2><p>Public lessons are readable without an account. Read our <a href="/privacy/">privacy policy</a> for information about study progress, optional accounts and third-party services, or the <a href="/account-deletion/">account deletion instructions</a>.</p><p><a href="/learn/">Explore the lessons →</a></p>`;
}
// The two advertising passages below exist in both states so flipping SITE_SHOWS_ADS restores the AdSense wording.
const PRIVACY_ADS = SITE_SHOWS_ADS
  ? {
      collect: `The <strong>website</strong> at parikshasaathi.com does show ads — see "Advertising on this website" below for what that involves.`,
      thirdParty: `<p><strong>Google AdSense</strong> serves ads on this website (not the Android app) — see below.</p>`,
      section: `<h2>Advertising on this website</h2><p>This website — not the Android app — shows ads served by <strong>Google AdSense</strong>. Google and its advertising partners use cookies and similar technologies to serve ads, which may be personalised based on your visits to this and other websites. This does not use anything you enter into the app or website itself (your email, your quiz progress) — it works through separate, standard ad-cookie technology, the same as most ad-supported websites.</p><ul><li>You can see and adjust how Google personalises ads for you at <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">adssettings.google.com</a>.</li><li>You can opt out of personalised advertising from participating companies at <a href="https://www.aboutads.info/choices" target="_blank" rel="noreferrer">aboutads.info/choices</a>.</li><li>The Android app remains completely free of ads and ad SDKs — this section applies to the website only.</li></ul>`,
    }
  : {
      collect: `The <strong>website</strong> at parikshasaathi.com currently shows no ads either — see "Advertising on this website" below for what would change if that ever happens.`,
      thirdParty: `<p><strong>Google AdSense:</strong> the website carries an AdSense site-verification tag, which loads no script and sets no cookie. No ads are shown and no advertising script is loaded today — see below.</p>`,
      section: `<h2>Advertising on this website</h2><p>This website shows no ads today, and the Android app never has. The only AdSense-related thing on the site is a verification meta tag, which loads no script and sets no cookie. If we ever switch ads on, we will update this policy first (the "Last updated" date will change) and describe exactly what Google's advertising cookies do and how to opt out of personalised ads at <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">adssettings.google.com</a> and <a href="https://www.aboutads.info/choices" target="_blank" rel="noreferrer">aboutads.info/choices</a>.</p><ul><li>The Android app is free of ads and ad SDKs. If that ever changes, the app's own privacy policy will say so before a release that includes them.</li></ul>`,
    };
const TERMS_ADS = SITE_SHOWS_ADS
  ? `<p>The website shows ads served by Google AdSense; the Android app does not. See our <a href="/privacy/">privacy policy</a> for what that involves.</p>`
  : `<p>The website shows no ads today, and the Android app has none. If the website starts showing ads (for example through Google AdSense), our <a href="/privacy/">privacy policy</a> will be updated first to describe what that involves.</p>`;
export function privacyBody() {
  return `<h1>Privacy Policy for Pariksha Saathi</h1><p class="compare-lede">Last updated: ${LEGAL_UPDATED.text}. This policy is grounded in exactly what the app and this website actually do — it is not a substitute for legal advice, and may be revised as the project evolves.</p><h2>What this app is</h2><p>Pariksha Saathi is an exam-preparation app for SSC/IBPS/SBI aspirants. It works fully offline without an account. An optional account lets your progress sync across devices.</p><h2>What we collect</h2><p><strong>If you never create an account:</strong> nothing leaves your device except your study progress (quiz attempts, lesson completions, bookmarks), tagged with a random identifier generated on your device — not your name, phone number, or any hardware identifier — so it can be recognised as belonging to the same device on a later sync, and nothing else.</p><p><strong>If you create an account:</strong> your email address and a password (which we never store directly — only a one-way cryptographic hash of it, so we can't see or recover your actual password). Your study progress becomes associated with your account instead of just your device, so it's available if you reinstall the app or use it on another device signed into the same account.</p><p><strong>We do not collect:</strong> your name, phone number, location, contacts, photos, or any device identifier tied to your hardware (IMEI, advertising ID, etc.). The <strong>Android app</strong> does not use analytics, crash reporting, or advertising SDKs of any kind — nothing about your use of the app is shared with ad networks or analytics companies. ${PRIVACY_ADS.collect}</p><h2>How we use what we collect</h2><ul><li>Study progress (quiz scores, completed lessons, bookmarks) is used only to show it back to you — your streak, your average score, your mistake notebook.</li><li>Your email is used to let you sign in, and to send you a password-reset link if you ask for one.</li><li>Nothing is used for advertising, and nothing is sold or shared with third parties, except as described below.</li></ul><h2>Third parties</h2><p><strong>SendGrid</strong> (Twilio) sends the password-reset email if you request one. It receives only your email address and the reset link at the moment you request a reset — nothing else, and only for that purpose.</p>${PRIVACY_ADS.thirdParty}${PRIVACY_ADS.section}<h2>Your data, your control</h2><ul><li><strong>Delete your account</strong> from the app (Account → Delete account). This removes your email and password immediately. Your study progress isn't deleted — it reverts to being anonymous, device-only data, the same as if you'd never made an account, since it's useful to you locally either way. See our <a href="/account-deletion/">account deletion instructions</a> for details.</li><li><strong>Uninstalling the app</strong> removes everything stored only on your device. If you had an account and synced progress, that data remains associated with your account server-side until you separately delete the account as above.</li><li>There is currently no separate "export my data" feature; your account's summary (quiz count, average score, lesson/bookmark counts) is visible in the app itself.</li></ul><h2>Data security</h2><p>Your password is never stored in plain text (only a bcrypt hash). Your session token is encrypted at rest on your device (Android Keystore). All communication between the app and our server uses HTTPS.</p><h2>Children's privacy</h2><p>This app is aimed at exam aspirants (typically adults preparing for competitive government exams) and isn't directed at children.</p><h2>Changes to this policy</h2><p>If this policy changes, the "Last updated" date above will change, and material changes will be reflected here before they take effect.</p><h2>Contact</h2><p>Questions about this policy or your data: <a href="mailto:sriwastava2@gmail.com">sriwastava2@gmail.com</a></p>`;
}
function formatEditionDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
export function downloadsBody() {
  const rows = DAILY_PDF_EDITIONS.map((e) => `<tr><td><a href="${escapeHtml(e.file)}" download>${escapeHtml(formatEditionDate(e.date))}</a></td><td>${escapeHtml(e.language === 'hi' ? 'Hindi' : 'English')}</td><td>${e.items}</td><td>${e.questions}</td><td>${e.pages} pages, ${e.sizeKb} KB</td></tr>`).join('');
  const latest = DAILY_PDF_EDITIONS[0];
  const latestLine = latest
    ? `<p><a class="pub-cta" href="/daily-pdf" download>Download today's PDF (${escapeHtml(formatEditionDate(latest.date))})</a></p>`
    : `<p>The first edition is being prepared. Check back tomorrow morning.</p>`;
  const capsuleRows = MONTHLY_CAPSULES.map((c) => `<tr><td><a href="${escapeHtml(c.file)}" download>${escapeHtml(c.label)}</a></td><td>${escapeHtml(c.language === 'hi' ? 'Hindi' : 'English')}</td><td>${c.items}</td><td>${c.questions}</td><td>${c.pages} pages, ${c.sizeKb} KB</td></tr>`).join('');
  const capsuleSection = MONTHLY_CAPSULES.length > 0
    ? `<h2>Monthly capsules</h2><p>One line for every current-affairs item of the period, grouped by theme (economy and banking, schemes and governance, defence, international relations, science, environment and agriculture, health, sports and awards), each line linked to its official PIB release, followed by practice questions with an answer key. Available in English and Hindi.</p><table><thead><tr><th>Period</th><th>Language</th><th>Items</th><th>Questions</th><th>File</th></tr></thead><tbody>${capsuleRows}</tbody></table>`
    : '';
  return `<h1>Downloads: daily and monthly current affairs PDFs</h1><p class="compare-lede">One free PDF every morning for SSC CGL/CHSL/MTS, IBPS PO/Clerk, SBI PO/Clerk and Railway aspirants: the day's current affairs in Hindi, each item with its official source, plus practice questions with answers.</p>${latestLine}<h2>What each edition contains</h2><ul><li>Every current-affairs item published on the site that day, written from the original PIB or ministry release and linked to it.</li><li>English titles alongside the Hindi text so the same edition works for bilingual revision.</li><li>Five practice questions in the exam format with an answer key.</li><li>Exam tags on each item (SSC, Banking, General) so you can skip what your exam does not test.</li></ul><p>The link <strong>parikshasaathi.com/daily-pdf</strong> always opens the newest edition, so you can share that one link on WhatsApp or Telegram.</p>${capsuleSection}<h2>All daily editions</h2><table><thead><tr><th>Edition</th><th>Language</th><th>Items</th><th>Questions</th><th>File</th></tr></thead><tbody>${rows}</tbody></table><h2>How these are made</h2><p>Each edition is generated from the same source-linked items that appear under <a href="/app/current-affairs/">Current affairs</a> on this site. The items are drafted with AI assistance from the official PIB or ministry release each one links to, and are not reviewed by a subject-matter editor. <strong>Mahesh Srivastava</strong>, Founder, is the publisher and is responsible for corrections. Found an error? See the <a href="/contact/">Contact</a> page.</p>`;
}
export function contactBody() {
  return `<h1>Contact Pariksha Saathi</h1><p class="compare-lede">Pariksha Saathi is published and maintained by <strong>Mahesh Srivastava</strong>. The quickest way to reach us is email.</p><h2>Email</h2><p><a href="mailto:sriwastava2@gmail.com">sriwastava2@gmail.com</a></p><p>This covers content corrections, general questions about the website or app, account and privacy questions, and feedback. There's no dedicated support team behind this address — it's a small, independently-run project, so replies are personal rather than on a fixed schedule, but every message is read.</p><h2>Reporting a content error</h2><p>For a lesson or current-affairs correction specifically, include the page URL, the statement you're questioning, your proposed correction and a supporting calculation or official source where relevant. See our <a href="/about/">editorial standards</a> for how corrections are handled.</p><h2>Account and data questions</h2><p>For anything about what we collect, how long we keep it, or deleting your account, see our <a href="/privacy/">privacy policy</a> — most questions are already answered there.</p><h2>What not to send</h2><p>Please don't email passwords, OTPs, application numbers or other sensitive account information — we'll never ask for these over email.</p>`;
}
export function termsBody() {
  return `<h1>Terms of Use</h1><p class="compare-lede">Last updated: ${LEGAL_UPDATED.text}. These terms cover using the Pariksha Saathi website (parikshasaathi.com) and the Pariksha Saathi Android app. By using either, you agree to them.</p><h2>Who operates this service</h2><p>Pariksha Saathi is an independent, free exam-preparation project for SSC, IBPS and SBI aspirants, published and maintained by Mahesh Srivastava. We are not affiliated with SSC, IBPS, SBI, or any government body, and nothing here is an official notification — always confirm exam dates, eligibility, syllabus and results on the relevant exam body's own website.</p><h2>The service is free</h2><p>Every lesson, practice quiz, mock test and current-affairs capsule is free, with no paywalled content and no in-app purchases. An account is optional; it exists only to sync your study progress across devices, as described in our <a href="/privacy/">privacy policy</a>.</p><h2>No guarantee of accuracy or outcome</h2><p>Lessons, practice questions and current-affairs summaries are provided for study purposes and are not a substitute for an exam body's own syllabus, notification or answer key. We aim to be accurate and correct errors when they're reported (see <a href="/about/">editorial standards</a>), but we don't guarantee that content is complete, current or error-free, and using this service is not a guarantee of exam performance or selection.</p><h2>Advertising</h2>${TERMS_ADS}<h2>Acceptable use</h2><p>Use the website and app for personal exam preparation. Please don't scrape, bulk-download or republish the content, attempt to disrupt the service, or use any part of it to build a competing product without asking first.</p><h2>Accounts</h2><p>If you create an account, you're responsible for keeping your password confidential. You can delete your account at any time from the app (Account → Delete account); see the <a href="/privacy/">privacy policy</a> for exactly what that does and doesn't remove.</p><h2>No warranty, limited liability</h2><p>This service is provided "as is," run by an individual rather than a company, without warranties of any kind. To the extent permitted by law, we aren't liable for losses arising from using or being unable to use the website or app, including from errors in content or service interruptions. Nothing here limits liability where the law doesn't allow it to be limited.</p><h2>Changes</h2><p>We may update these terms as the project evolves; the "Last updated" date above will change, and material changes will be reflected here before they take effect. Continuing to use the service after a change means you accept the updated terms.</p><h2>Governing law</h2><p>These terms are governed by the laws of India.</p><h2>Contact</h2><p>Questions about these terms: <a href="mailto:sriwastava2@gmail.com">sriwastava2@gmail.com</a>, or see our <a href="/contact/">contact page</a>.</p>`;
}
export function accountDeletionBody() {
  return `<h1>Account &amp; Data Deletion</h1><p class="compare-lede">Last updated: 13 October 2026. Pariksha Saathi accounts and the data attached to them can be deleted either of the two ways below — you don't need the app installed to request deletion.</p><h2>Option 1 — Delete it yourself, in the app</h2><ol><li>Open Pariksha Saathi and sign in</li><li>Go to <strong>Account → Delete account</strong></li><li>Confirm. Your email and password are removed immediately.</li></ol><h2>Option 2 — Request deletion without the app</h2><p>Email <a href="mailto:sriwastava2@gmail.com?subject=Delete%20my%20Pariksha%20Saathi%20account">sriwastava2@gmail.com</a> from the email address your account uses, with the subject &ldquo;Delete my Pariksha Saathi account.&rdquo; We process these requests within 7 days and confirm by email once complete.</p><h2>What gets deleted</h2><ul><li><strong>Deleted immediately:</strong> your account's email address and password.</li><li><strong>Retained, but de-identified:</strong> your study progress (quiz attempts, lesson completions, bookmarks) is not tied to your account after deletion — it reverts to anonymous, device-only data, the same as if you'd used the app without ever creating an account. We keep this because it's still useful to you locally on your device; it is no longer associated with your email or any identifying information.</li></ul><h2>Questions</h2><p>See the full <a href="/privacy/">Privacy Policy</a>, or <a href="/contact/">contact us</a>.</p>`;
}
export function publicPageBody(key) {
  if (key === 'hi') return hindiHomeBody();
  if (key === 'hi-learn') return publicFrame(libraryBody('hi'), 'hi');
  if (key === 'learn') return publicFrame(libraryBody());
  if (key === 'privacy') return publicFrame(privacyBody());
  if (key === 'contact') return publicFrame(contactBody());
  if (key === 'downloads') return publicFrame(downloadsBody());
  if (key === 'terms') return publicFrame(termsBody());
  if (key === 'account-deletion') return publicFrame(accountDeletionBody());
  return publicFrame(aboutBody());
}
