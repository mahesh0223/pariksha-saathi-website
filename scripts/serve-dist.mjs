// Serves dist/ the way Cloudflare Pages does, for measuring: brotli-compressed text, the rules
// from public/_headers applied, a directory URL answered with its index.html and unknown paths
// falling back to spa.html (mirrors public/_redirects). `npm run preview` does none of that, which
// is why Lighthouse numbers from it are pessimistic (see README.md, "Measuring").
//
//   npm run serve:dist            # http://localhost:4173/
//   PORT=5000 npm run serve:dist
//
// Also imported by scripts/check-hydration.mjs, which needs a real HTTP origin for Chrome.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';

const DIST = join(process.cwd(), 'dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.mjs', '.css', '.json', '.webmanifest', '.xml', '.txt', '.svg']);

// public/_headers: "/pattern" lines followed by indented "Name: value" lines; "! Name" removes a
// header set by an earlier rule. ":param" and "*" are the only placeholders Pages supports.
function parseHeaderRules() {
  const file = join(DIST, '_headers');
  if (!existsSync(file)) return [];
  const rules = [];
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    const line = raw.replace(/#.*/, '').trimEnd();
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) {
      const pattern = line.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/:[a-zA-Z]+/g, '[^/]+');
      rules.push({ re: new RegExp(`^${pattern}$`), ops: [] });
    } else if (rules.length) {
      const text = line.trim();
      if (text.startsWith('!')) rules.at(-1).ops.push({ remove: text.slice(1).trim() });
      else { const i = text.indexOf(':'); rules.at(-1).ops.push({ name: text.slice(0, i).trim(), value: text.slice(i + 1).trim() }); }
    }
  }
  return rules;
}

function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const candidates = clean.endsWith('/') ? [join(DIST, clean, 'index.html')] : [join(DIST, clean), join(DIST, clean, 'index.html')];
  for (const file of candidates) if (existsSync(file) && statSync(file).isFile()) return file;
  return join(DIST, 'spa.html');
}

export function serveDist({ port = 0, log = false } = {}) {
  const rules = parseHeaderRules();
  const cache = new Map();
  const server = createServer((req, res) => {
    const file = resolve(req.url ?? '/');
    const ext = extname(file);
    const type = TYPES[ext] ?? 'application/octet-stream';
    const headers = new Map([['Content-Type', type]]);
    for (const rule of rules) {
      if (!rule.re.test(req.url.split('?')[0])) continue;
      for (const op of rule.ops) {
        if (op.remove) headers.delete(op.remove);
        else headers.set(op.name, headers.has(op.name) ? `${headers.get(op.name)}, ${op.value}` : op.value);
      }
    }
    let body = cache.get(file);
    if (!body) {
      const raw = readFileSync(file);
      body = { raw, br: COMPRESSIBLE.has(ext) ? brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } }) : null };
      cache.set(file, body);
    }
    const br = body.br && /\bbr\b/.test(req.headers['accept-encoding'] ?? '');
    if (br) headers.set('Content-Encoding', 'br');
    if (body.br) headers.set('Vary', 'Accept-Encoding');
    const status = file.endsWith('spa.html') && !/\/spa(\.html)?$/.test(req.url) ? 200 : 200;
    res.writeHead(status, Object.fromEntries(headers));
    res.end(br ? body.br : body.raw);
    if (log) console.log(`${status} ${req.url}${br ? ' (br)' : ''}`);
  });
  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => resolve({ port: server.address().port, close: () => new Promise((r) => server.close(r)) }));
  });
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  if (!existsSync(join(DIST, 'index.html'))) { console.error('dist/ is missing - run `npm run build` first'); process.exit(1); }
  const { port } = await serveDist({ port: Number(process.env.PORT ?? 4173), log: process.argv.includes('--log') });
  console.log(`Serving dist/ with brotli and _headers at http://localhost:${port}/`);
}
