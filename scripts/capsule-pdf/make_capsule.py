#!/usr/bin/env python3
"""Generate a current-affairs capsule PDF (English + Hindi) for a date range and register it on /downloads/.

Usage:
  python3 scripts/capsule-pdf/make_capsule.py --slug 2026-09 --from 2026-09-12 --to 2026-09-30 \
      --label-en "September 2026 (12-30 September)" --label-hi "सितंबर 2026 (12-30 सितंबर)" [--api http://localhost:4000/v1] [--quiz 30]

One line per current-affairs item (its own title, linked to the official release), grouped by theme,
followed by practice questions - one per item, spread evenly over the period - with an answer key.
Needs Google Chrome (Devanagari-correct PDF rendering) and pypdf. Every item must have a theme in
categories.json (the script stops and lists any that don't, so a new month cannot ship uncategorised).
--api defaults to production; point it at a local server to use items/questions not yet deployed.
"""
import argparse, html, json, os, re, shutil, subprocess, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

THEMES = [  # (key, English, Hindi) in the order they appear in the PDF
    ("economy", "Economy, Banking & Finance", "अर्थव्यवस्था, बैंकिंग व वित्त"),
    ("governance", "Schemes, Governance & Appointments", "योजनाएँ, शासन व नियुक्तियाँ"),
    ("defence", "Defence & Security", "रक्षा व सुरक्षा"),
    ("international", "International Relations", "अंतरराष्ट्रीय संबंध"),
    ("science", "Science & Technology", "विज्ञान व प्रौद्योगिकी"),
    ("agri-env", "Environment & Agriculture", "पर्यावरण व कृषि"),
    ("health", "Health", "स्वास्थ्य"),
    ("culture", "Sports, Awards & Culture", "खेल, पुरस्कार व संस्कृति"),
]
HI_MONTHS = ["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"]
EN_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

ap = argparse.ArgumentParser()
ap.add_argument("--slug", required=True); ap.add_argument("--from", dest="start", required=True); ap.add_argument("--to", dest="end", required=True)
ap.add_argument("--label-en", required=True); ap.add_argument("--label-hi", required=True)
ap.add_argument("--api", default="https://api.parikshasaathi.com/v1"); ap.add_argument("--quiz", type=int, default=30)
args = ap.parse_args()

def get(path):
    with urllib.request.urlopen(f"{args.api}{path}", timeout=60) as r:
        return json.load(r)

def fetch_all(lang):
    out, offset = [], 0
    while True:
        page = get(f"/current-affairs?limit=100&offset={offset}&lang={lang}")
        out += page
        if len(page) < 100: return [i for i in out if args.start <= i["editionDate"][:10] <= args.end]
        offset += 100

themes_of = json.load(open(os.path.join(HERE, "categories.json")))
def prid(item):
    m = re.search(r"PRID=(\d+)", item["sourceUrl"]); return m.group(1) if m else None

def short_date(iso, lang):
    _, m, d = iso.split("-"); return f"{int(d)} {(HI_MONTHS if lang == 'hi' else EN_MONTHS)[int(m)-1]}"

def build(lang):
    items = sorted(fetch_all(lang), key=lambda i: (i["editionDate"], i["id"]))
    if not items: raise SystemExit(f"no {lang} items between {args.start} and {args.end}")
    missing = [f"{prid(i)} {i['title'][:60]}" for i in items if str(prid(i)) not in themes_of]
    if missing: raise SystemExit("items without a theme in categories.json:\n  " + "\n  ".join(missing))
    hi = lang == "hi"
    sections = ""
    for key, en_name, hi_name in THEMES:
        group = [i for i in items if themes_of[str(prid(i))] == key]
        if not group: continue
        lines = "".join(
            f'<li><span class="d">{short_date(i["editionDate"][:10], lang)}</span>'
            f'<a href="{html.escape(i["sourceUrl"])}">{html.escape(i["title"])}</a>'
            f' <span class="p">PIB {prid(i)}</span></li>' for i in group)
        sections += f'<section class="theme"><h2>{hi_name if hi else en_name} <span class="c">{len(group)}</span></h2><ul>{lines}</ul></section>'

    # One question per item (its first), spread evenly across the period so no week dominates.
    pool = []
    for i in items:
        qs = get(f"/current-affairs/{i['id']}/questions")
        if qs: pool.append(qs[0])
    step = max(len(pool) / args.quiz, 1)
    quiz = [pool[int(n * step)] for n in range(min(args.quiz, len(pool)))]
    qhtml = "".join(
        f'<div class="q"><b>{"प्र." if hi else "Q"}{n}</b> {html.escape(q["text"])}<div class="opts">'
        + "".join(f'<span>({"ABCD"[k]}) {html.escape(o)}</span>' for k, o in enumerate(q["options"])) + "</div></div>"
        for n, q in enumerate(quiz, 1))
    answers = " ".join(f"<span style=\"white-space:nowrap;margin-right:10px\">{n}-({'ABCD'[q['correctOptionIndex']]})</span>" for n, q in enumerate(quiz, 1))
    quiz_html = (f'<h1 class="sec">{"अभ्यास" if hi else "Practice"} — {len(quiz)} {"प्रश्न" if hi else "questions"}</h1>{qhtml}'
                 f'<div class="ans">{"उत्तर" if hi else "Answers"}: {answers}</div>') if quiz else ""

    font = "'Kohinoor Devanagari','Devanagari Sangam MN',sans-serif" if hi else "'Helvetica Neue',Arial,sans-serif"
    title = "करंट अफेयर्स कैप्सूल" if hi else "Current Affairs Capsule"
    label = args.label_hi if hi else args.label_en
    strip = (f"SSC • बैंकिंग • रेलवे • राज्य परीक्षाएँ — {len(items)} खबरें • हर पंक्ति आधिकारिक PIB विज्ञप्ति से जुड़ी है" if hi
             else f"SSC • Banking • Railway • State exams — {len(items)} items • every line links to its official PIB release")
    foot = ("सभी संस्करण: parikshasaathi.com/downloads/ • स्रोत व सुधार नीति: parikshasaathi.com/about/" if hi
            else "All editions: parikshasaathi.com/downloads/ • How items are sourced and corrected: parikshasaathi.com/about/")
    page = f"""<!doctype html><html lang="{lang}"><meta charset="utf-8"><style>
@page{{size:A4;margin:15mm 13mm 17mm 13mm}}
body{{font-family:{font};color:#111;font-size:10.5pt;line-height:1.45;margin:0}}
.hdr{{display:flex;align-items:center;gap:14px;border-bottom:4px solid #f59e0b;padding-bottom:10px;margin-bottom:6px}}
.hdr img{{width:54px;height:54px;border-radius:13px}} .hdr h1{{margin:0;font-size:20pt;color:#1e3a8a}} .hdr .per{{color:#b45309;font-weight:700;font-size:12.5pt}}
.strip{{background:#1e3a8a;color:#fff;padding:6px 12px;border-radius:8px;font-size:9.5pt;margin:8px 0 12px}}
.theme{{break-inside:avoid-page;margin:0 0 12px}} .theme h2{{font-size:12.5pt;color:#1e3a8a;border-bottom:2px solid #f59e0b;padding-bottom:2px;margin:0 0 5px}}
.c{{display:inline-block;background:#f59e0b;color:#111;border-radius:10px;padding:0 7px;font-size:9pt;margin-left:6px}}
ul{{list-style:none;margin:0;padding:0}} li{{margin:0 0 4px;padding-left:64px;position:relative;break-inside:avoid}}
.d{{position:absolute;left:0;width:58px;color:#b45309;font-weight:700;font-size:9pt}}
li a{{color:#0b1120;text-decoration:none}} .p{{color:#94a3b8;font-size:7.5pt;white-space:nowrap}}
h1.sec{{font-size:15pt;color:#1e3a8a;border-bottom:2px solid #1e3a8a;padding-bottom:4px;margin:16px 0 10px;break-before:page}}
.q{{margin:0 0 9px;break-inside:avoid;font-size:10pt}} .opts{{display:grid;grid-template-columns:1fr 1fr;gap:1px 14px;margin:3px 0 0 16px;font-size:9.5pt}}
.ans{{background:#ecfdf5;border:1px solid #22c55e;padding:8px 12px;border-radius:8px;margin-top:16px;font-weight:700;font-size:10pt}}
.foot{{margin-top:18px;padding:10px 12px;background:#fff7ed;border-radius:10px;font-size:9.5pt}}
</style><body>
<div class="hdr"><img src="icon.png"><div><h1>Pariksha Saathi — {title}</h1><div class="per">{label}</div></div></div>
<div class="strip">{strip}</div>
{sections}{quiz_html}
<div class="foot">{foot}</div>
</body></html>"""
    tmp = os.path.join(HERE, f"_capsule_{lang}.html"); open(tmp, "w").write(page)
    outdir = os.path.join(ROOT, "public", "pdf"); os.makedirs(outdir, exist_ok=True)
    raw = os.path.join(HERE, f"_raw_{lang}.pdf")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={raw}", f"file://{tmp}"], capture_output=True, check=True)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(raw); w = PdfWriter()
    for p in r.pages: w.add_page(p)
    w.add_metadata({"/Title": f"Pariksha Saathi Current Affairs Capsule - {label}", "/Author": "Pariksha Saathi"})
    name = f"ParikshaSaathi_Capsule_{args.slug}_{lang}.pdf"; final = os.path.join(outdir, name); w.write(final)
    os.remove(tmp); os.remove(raw)
    return f"  {{ period: '{args.slug}', label: '{(args.label_hi if hi else args.label_en)}', language: '{lang}', file: '/pdf/{name}', items: {len(items)}, questions: {len(quiz)}, pages: {len(r.pages)}, sizeKb: {round(os.path.getsize(final)/1024)} }},"

entries = [build("en"), build("hi")]
mp = os.path.join(ROOT, "src", "data", "downloads.mjs"); s = open(mp).read()
marker = "export const MONTHLY_CAPSULES = [\n"
if marker not in s: s = s.rstrip("\n") + "\n\n// Monthly current-affairs capsules (English + Hindi), newest first. Written by\n// scripts/capsule-pdf/make_capsule.py - do not hand-edit the entries it writes.\n" + marker + "];\n"
head, body = s.split(marker, 1)
array, rest = body.split("];\n", 1)  # keep anything after this array, same as make_pdf.py
kept = [l for l in array.split("\n") if l.startswith("  { period:") and f"period: '{args.slug}'" not in l]
allentries = sorted(sorted(kept + entries, key=lambda l: l.split("language: '")[1][:2]), key=lambda l: l.split("'")[1], reverse=True)  # newest period first, English before Hindi
open(mp, "w").write(head + marker + "\n".join(allentries) + "\n];\n" + rest)
for e in entries: print(e.strip())
