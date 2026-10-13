// Pings the IndexNow protocol (api.indexnow.org) with every URL in the live sitemap, so Bing,
// Yandex, Seznam and Naver pick up new/changed pages faster than their normal crawl schedule.
// Google does not participate in IndexNow - the earlier manual GSC sitemap resubmission covers
// that separately. The key file at public/<key>.txt *is* the verification; no account needed.
//
// Usage: node scripts/submit-indexnow.mjs
// Re-run this after any deploy with new or meaningfully changed pages - it's a cheap, idempotent
// ping, not something that needs to run on every tiny build.

const SITE_URL = 'https://parikshasaathi.com';
const INDEXNOW_KEY = 'ab8d35d288934b9cf1330e737f021e3a';
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

async function main() {
  const sitemapXml = await fetch(`${SITE_URL}/sitemap.xml`).then((r) => {
    if (!r.ok) throw new Error(`Failed to fetch sitemap.xml: ${r.status}`);
    return r.text();
  });
  const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) throw new Error('No URLs found in sitemap.xml - aborting.');

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  // 10,000 URLs per request max per the spec - well above our count, but chunk defensively
  // in case the site grows a lot before this script is revisited.
  const CHUNK_SIZE = 10000;
  for (let i = 0; i < urlList.length; i += CHUNK_SIZE) {
    const chunk = urlList.slice(i, i + CHUNK_SIZE);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'parikshasaathi.com',
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: chunk,
      }),
    });
    const body = await res.text();
    console.log(`Chunk ${i / CHUNK_SIZE + 1}: HTTP ${res.status} ${res.statusText}${body ? ` - ${body}` : ''}`);
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(`IndexNow submission failed with HTTP ${res.status}`);
    }
  }
  console.log('Done. A 200/202 means the submission was accepted, not that pages are indexed yet.');
}

main().catch((err) => {
  console.error('IndexNow submission failed:', err);
  process.exit(1);
});
