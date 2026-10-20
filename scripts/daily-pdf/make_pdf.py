#!/usr/bin/env python3
"""Generate the daily current-affairs PDF and register it on /downloads/.

Usage: python3 scripts/daily-pdf/make_pdf.py [YYYY-MM-DD]   (default: newest editionDate in the API)
Writes public/pdf/ParikshaSaathi_CA_<date>.pdf, overwrites public/pdf/latest.pdf, and prepends the
edition to src/data/downloads.mjs. Needs Google Chrome (for Devanagari-correct PDF rendering) and pypdf.
"""
import hashlib, html, json, os, re, subprocess, sys, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
API = os.environ.get("PDF_API", "https://api.parikshasaathi.com/v1")  # PDF_API points a run at a local backend
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
QUIZ_COUNT = 5

def get(path):
    with urllib.request.urlopen(f"{API}{path}", timeout=60) as r:
        return json.load(r)

def fetch_all(lang):
    out, offset = [], 0
    while True:
        page = get(f"/current-affairs?limit=100&offset={offset}&lang={lang}")
        page = page if isinstance(page, list) else page.get("items") or page.get("data") or []
        out += page
        if len(page) < 100: return out
        offset += 100

hi_all = fetch_all("hi"); en_all = fetch_all("en")
date = sys.argv[1] if len(sys.argv) > 1 else max(i["editionDate"][:10] for i in hi_all)
hi = [i for i in hi_all if i["editionDate"].startswith(date)]
if not hi: sys.exit(f"no Hindi current-affairs items dated {date}")
en = {i["sourceUrl"]: i for i in en_all}

quiz = []
try:
    topics = get("/current-affairs-quiz/topics?lang=hi").get("topicKeys") or []
    if topics:
        quiz = get(f"/topics/{topics[0]}/questions?lang=hi&limit={QUIZ_COUNT}")[:QUIZ_COUNT]
except Exception as e:
    print("quiz skipped:", e)

# Current-affairs questions are stored with the correct option first and the app shuffles them on screen
# (src/domain/quizEngine.ts). Paper has no shuffle, so print each question's options in a fixed order derived
# from its text - the same every run, and an answer key that is not all (A).
def print_order(q):
    order = sorted(range(len(q["options"])), key=lambda k: hashlib.sha1(f"{q['text']}|{k}".encode()).hexdigest())
    return dict(q, options=[q["options"][k] for k in order], correctOptionIndex=order.index(q["correctOptionIndex"]))
quiz = [print_order(q) for q in quiz]

def fmt_date(iso):
    months = ["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"]
    y, m, d = iso.split("-"); return f"{int(d)} {months[int(m)-1]} {y}"

items = "".join(f"""<section class="item"><h2><span class="n">{n}</span>{html.escape(i['title'])}</h2>
<div class="en">{html.escape(en.get(i['sourceUrl'],{}).get('title',''))}</div><div class="tags">{' • '.join(i['examTags'])}</div>
<p>{html.escape(i['summary'])}</p><div class="src">स्रोत: {html.escape(i['sourceName'])} — {html.escape(i['sourceUrl'])}</div></section>""" for n, i in enumerate(hi, 1))
qs = "".join(f"""<div class="q"><b>प्र.{n}</b> {html.escape(q['text'])}<div class="opts">{''.join(f'<span>({"ABCD"[k]}) {html.escape(o)}</span>' for k, o in enumerate(q['options']))}</div></div>""" for n, q in enumerate(quiz, 1))
ans = " &nbsp; ".join(f"{n}-({'ABCD'[q['correctOptionIndex']]})" for n, q in enumerate(quiz, 1))
quiz_html = f"""<h1 class="sec">आज का अभ्यास — {len(quiz)} प्रश्न</h1>{qs}<div class="ans">उत्तर: {ans}</div>""" if quiz else ""
page = f"""<!doctype html><html lang="hi"><meta charset="utf-8"><style>
@page{{size:A4;margin:16mm 14mm 18mm 14mm}}
body{{font-family:'Kohinoor Devanagari','Devanagari Sangam MN',sans-serif;color:#111;font-size:11.5pt;line-height:1.5;margin:0}}
.hdr{{display:flex;align-items:center;gap:14px;border-bottom:4px solid #f59e0b;padding-bottom:10px;margin-bottom:6px}}
.hdr img{{width:58px;height:58px;border-radius:14px}} .hdr h1{{margin:0;font-size:22pt;color:#1e3a8a}} .hdr .d{{color:#b45309;font-weight:700;font-size:13pt}}
.strip{{background:#1e3a8a;color:#fff;padding:6px 12px;border-radius:8px;font-size:10pt;margin:8px 0 14px}}
.item{{page-break-inside:avoid;margin:0 0 14px;padding:10px 12px;border:1px solid #e5e7eb;border-left:5px solid #f59e0b;border-radius:8px}}
.item h2{{font-size:13.5pt;margin:0 0 2px;color:#0b1120}} .n{{display:inline-block;background:#f59e0b;color:#111;border-radius:50%;width:24px;height:24px;line-height:24px;text-align:center;font-size:10pt;margin-right:8px}}
.en{{color:#475569;font-size:9.5pt;font-style:italic}} .tags{{color:#1e3a8a;font-size:9pt;font-weight:700;margin:2px 0 6px}}
.item p{{margin:0 0 6px;text-align:justify}} .src{{font-size:8.5pt;color:#64748b;word-break:break-all}}
h1.sec{{font-size:16pt;color:#1e3a8a;border-bottom:2px solid #1e3a8a;padding-bottom:4px;margin:18px 0 10px;page-break-before:always}}
.q{{margin:0 0 12px;page-break-inside:avoid}} .opts{{display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;margin:4px 0 0 18px}}
.ans{{background:#ecfdf5;border:1px solid #22c55e;padding:8px 12px;border-radius:8px;margin-top:20px;font-weight:700}}
.foot{{margin-top:22px;padding:12px;background:#fff7ed;border-radius:10px;font-size:10.5pt}} .foot b{{color:#1e3a8a}}
.tg{{font-size:12pt;font-weight:700;color:#1e3a8a;margin-bottom:6px}} .tg a{{color:#1e3a8a}}
</style><body>
<div class="hdr"><img src="icon.png"><div><h1>Pariksha Saathi — दैनिक करंट अफेयर्स</h1><div class="d">{fmt_date(date)} • हिंदी</div></div></div>
<div class="strip">SSC CGL • CHSL • MTS • IBPS PO/Clerk • SBI PO/Clerk • RRB — {len(hi)} खबरें{f' + {len(quiz)} प्रश्न' if quiz else ''} • स्रोत: PIB (सभी खबरें आधिकारिक प्रेस विज्ञप्तियों से)</div>
{items}{quiz_html}
<div class="foot"><div class="tg">रोज़ सुबह 7 बजे यही PDF Telegram पर: <a href="https://t.me/parikshasaathiapp">t.me/parikshasaathiapp</a> — चैनल से जुड़ें और दोस्तों को भेजें</div><b>रोज़ का PDF: parikshasaathi.com/daily-pdf — सभी संस्करण: parikshasaathi.com/downloads/</b><br>
वेबसाइट: parikshasaathi.com (हिंदी + English में 248 पाठ, रोज़ का करंट अफेयर्स, परीक्षा नोटिस)<br>
ऐप: Pariksha Saathi — Free, Offline, SSC/Bank की पूरी तैयारी। प्रकाशक: Mahesh Srivastava, Founder. सामग्री आधिकारिक विज्ञप्तियों से AI की सहायता से तैयार; किसी विषय-विशेषज्ञ संपादक द्वारा समीक्षित नहीं। ग़लती दिखे तो parikshasaathi.com/contact/ पर बताएँ।</div>
</body></html>"""
tmp = os.path.join(HERE, "_edition.html"); open(tmp, "w").write(page)
name = f"ParikshaSaathi_CA_{date}.pdf"; outdir = os.path.join(ROOT, "public", "pdf"); os.makedirs(outdir, exist_ok=True)
raw = os.path.join(HERE, "_raw.pdf")
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={raw}", f"file://{tmp}"], capture_output=True, check=True)
from pypdf import PdfReader, PdfWriter
r = PdfReader(raw); w = PdfWriter()
for p in r.pages: w.add_page(p)
w.add_metadata({"/Title": f"Pariksha Saathi Current Affairs {date}", "/Author": "Pariksha Saathi"})
final = os.path.join(outdir, name); w.write(final)
os.remove(tmp); os.remove(raw)
pages, size_kb = len(r.pages), round(os.path.getsize(final) / 1024)
entry = f"  {{ date: '{date}', file: '/pdf/{name}', language: 'hi', items: {len(hi)}, questions: {len(quiz)}, pages: {pages}, sizeKb: {size_kb} }},"
mp = os.path.join(ROOT, "src", "data", "downloads.mjs"); s = open(mp).read()
head, body = s.split("export const DAILY_PDF_EDITIONS = [\n", 1)
# Only the daily array is rewritten; everything after its closing "];" (the monthly capsules) is kept as is.
array, tail = body.split("];\n", 1)
entries = [l for l in array.split("\n") if l.startswith("  { date:") and f"date: '{date}'" not in l] + [entry]
entries.sort(key=lambda l: l.split("'")[1], reverse=True)  # newest first
open(mp, "w").write(head + "export const DAILY_PDF_EDITIONS = [\n" + "\n".join(entries) + "\n];\n" + tail)
import shutil
newest = entries[0].split("file: '")[1].split("'")[0]
shutil.copyfile(os.path.join(ROOT, "public", newest.lstrip("/")), os.path.join(outdir, "latest.pdf"))
print(f"{name}: {len(hi)} items, {len(quiz)} questions, {pages} pages, {size_kb} KB")
