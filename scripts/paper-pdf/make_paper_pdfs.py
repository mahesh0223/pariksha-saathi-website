#!/usr/bin/env python3
"""Build a printable PDF of every solved previous-year paper of one exam, and register them for the website.

Usage: python3 scripts/paper-pdf/make_paper_pdfs.py <examId> [<examId> ...]     e.g. ssc_cgl

Reads src/data/pyqPapers.json (scripts/gen-pyq-pages.mjs; the same questions, official answers and explanations as the
solved-paper pages) and, for a paper whose seed names its own cycle's cut-off, that exam's published cut-offs from the
API. Writes public/pdf/papers/<exam-slug>/<paper-slug>.pdf (questions as the exam body printed them, then an answer key,
then the explanations; the site and Telegram channel on every page) and records each file's pages and size in
src/data/pyqPdfs.json, which the paper pages and the papers list read. One exam per run keeps each commit reviewable;
check:public fails if an exam is half-done or a PDF is not linked. Needs Google Chrome and pypdf, like make_pdf.py.
"""
import html, json, os, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
ICON = os.path.join(ROOT, "scripts", "daily-pdf", "icon.png")
API = os.environ.get("PDF_API", "https://api.parikshasaathi.com/v1")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SITE = "https://parikshasaathi.com"
TELEGRAM = "t.me/parikshasaathiapp"
LETTERS = "ABCDE"
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
CATEGORY_ORDER = ["UR", "OBC", "EWS", "SC", "ST", "ESM", "OH", "HH", "VH", "Other PwD"]
BODIES = {"ssc": "the Staff Selection Commission (SSC)"}

esc = html.escape


def long_date(iso):
    y, m, d = iso[:10].split("-")
    return f"{int(d)} {MONTHS[int(m) - 1]} {y}"


def marks(n):
    return str(int(n)) if float(n).is_integer() else f"{n:.2f}"


def paras(text):
    return "".join(f"<p>{esc(p)}</p>" for p in str(text).split("\n\n") if p.strip())


def exam_slug(exam_id):  # src/lib/examHubPath.mjs examHubSlug
    return exam_id.replace("_", "-")


def cutoff_rows(paper, cache):
    ref = paper.get("cutoff")
    if not ref:
        return []
    if paper["examId"] not in cache:
        with urllib.request.urlopen(f"{API}/exams/{paper['examId']}/cutoffs", timeout=60) as r:
            cache[paper["examId"]] = json.load(r)
    rows = [r for r in cache[paper["examId"]] if r["section"] == ref["section"] and r["cycleLabel"] == ref["cycleLabel"]]
    order = lambda r: CATEGORY_ORDER.index(r["category"]) if r["category"] in CATEGORY_ORDER else len(CATEGORY_ORDER)
    return sorted(rows, key=order)


def sections(paper):
    out = []
    for q in paper["questions"]:
        name = q.get("section") or "Questions"
        if not out or out[-1][0] != name:
            out.append((name, []))
        out[-1][1].append(q)
    return out


def options_html(q):
    short = all(len(o) <= 42 for o in q["options"])
    items = "".join(f"<li><b>({LETTERS[i]})</b> {esc(o)}</li>" for i, o in enumerate(q["options"]))
    return f'<ol class="opts{" two" if short else ""}">{items}</ol>'


def page_html(paper, rows):
    n = len(paper["questions"])
    total = paper.get("questionsInPaper")
    body = BODIES.get(paper["examId"].split("_")[0], "the exam body")
    page_url = f"{SITE}/exams/{exam_slug(paper['examId'])}/question-papers/{paper['slug']}/"
    index_url = f"{SITE}/exams/{exam_slug(paper['examId'])}/question-papers/"
    marking = esc(paper["markingNote"]) if paper.get("markingNote") else (
        f"+{marks(paper['marksPerQuestion'])} for a right answer, &minus;{marks(paper['negativeMarksPerWrong'])} for a wrong one")
    left_out = (f"<p class='note'>The other {total - n} of the paper's {total} questions are not reproduced: they need a figure "
                f"or are printed as an image, or ask about formatting the source does not keep.</p>") if total and total > n else ""
    cut = ""
    if rows:
        cells = "".join(f"<span><b>{esc(r['category'])}</b> {r['targetScore']:.2f}</span>" for r in rows)
        cut = (f"<div class='cut'><div class='h'>Compare your score: the official {esc(paper['cutoff']['cycleLabel'])} cut-off "
               f"({esc(paper['cutoff']['section'])}), out of {marks(rows[0]['maxScore'])}</div><div class='cells'>{cells}</div>"
               f"<div class='small'>Cut-offs apply to marks normalised across all the exam's shifts, so a raw score on one shift is "
               f"a rough guide. Source: the official result write-up, {esc(rows[0]['sourceUrl'])}</div></div>")
    qs = "".join(
        f"<h2>{esc(name)} <span>{len(items)} question{'s' if len(items) != 1 else ''}</span></h2>"
        + "".join(f"<div class='q'><div class='num'>Q.{q.get('number') or ''}</div>{paras(q['text'])}{options_html(q)}</div>" for q in items)
        for name, items in sections(paper))
    key = "".join(
        f"<h3>{esc(name)}</h3><div class='key'>"
        + "".join(f"<span>Q.{q.get('number') or ''} <b>({LETTERS[q['correctOptionIndex']]})</b></span>" for q in items) + "</div>"
        for name, items in sections(paper))
    # Grouped by section like the answer key: question numbers restart in each section, as the exam body prints them.
    expl = "".join(
        f"<h3>{esc(name)}</h3>"
        + "".join(f"<div class='x'><div class='xh'>Q.{q.get('number') or ''} &middot; Answer ({LETTERS[q['correctOptionIndex']]}) "
                  f"{esc(q['options'][q['correctOptionIndex']])}</div>{paras(q['explanation'])}</div>" for q in items)
        for name, items in sections(paper))
    title = f"{paper['displayName']} question paper, {long_date(paper['date'])}, {paper['shift']}"
    return f"""<!doctype html><html lang="en"><meta charset="utf-8"><title>{esc(title)}</title><style>
@page {{ size: A4; margin: 14mm 13mm 17mm 13mm;
  @bottom-left {{ content: "parikshasaathi.com \\00B7  free solved papers \\00B7  Telegram: {TELEGRAM}"; font: 8pt 'Helvetica Neue', Arial, sans-serif; color: #64748b; }}
  @bottom-right {{ content: "Page " counter(page) " of " counter(pages); font: 8pt 'Helvetica Neue', Arial, sans-serif; color: #64748b; }} }}
body {{ font-family: 'Helvetica Neue', Arial, 'Kohinoor Devanagari', sans-serif; color: #111827; font-size: 10.5pt; line-height: 1.45; margin: 0; font-variant-ligatures: none; font-feature-settings: 'liga' 0, 'clig' 0; }}
a {{ color: #1e3a8a; }}
.hdr {{ display: flex; align-items: center; gap: 12px; border-bottom: 3px solid #f59e0b; padding-bottom: 8px; }}
.hdr img {{ width: 46px; height: 46px; border-radius: 11px; }}
.hdr h1 {{ margin: 0; font-size: 17pt; color: #1e3a8a; }} .hdr .d {{ color: #b45309; font-weight: 700; font-size: 11pt; }}
.strip {{ background: #1e3a8a; color: #fff; padding: 6px 10px; border-radius: 6px; font-size: 9.5pt; margin: 8px 0; }}
.note, .small {{ font-size: 8.5pt; color: #475569; }} .note {{ margin: 4px 0; }}
.cut {{ border: 1px solid #f59e0b; background: #fffbeb; border-radius: 6px; padding: 7px 10px; margin: 8px 0; page-break-inside: avoid; }}
.cut .h {{ font-weight: 700; font-size: 9.5pt; margin-bottom: 4px; }} .cut .cells {{ display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 9.5pt; }}
h2 {{ font-size: 12.5pt; color: #1e3a8a; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 2px; margin: 14px 0 8px; }}
h2 span {{ font-size: 9pt; color: #64748b; font-weight: 400; }}
.q {{ margin: 0 0 9px; page-break-inside: avoid; }} .q p {{ margin: 0 0 3px; }}
.num {{ font-weight: 700; color: #b45309; font-size: 9pt; }}
.opts {{ list-style: none; margin: 2px 0 0 12px; padding: 0; }} .opts li {{ margin: 1px 0; }}
.opts.two {{ display: grid; grid-template-columns: 1fr 1fr; column-gap: 16px; }}
.opts b {{ color: #475569; font-weight: 600; }}
h1.sec {{ font-size: 14pt; color: #1e3a8a; margin: 0 0 6px; page-break-before: always; }}
h3 {{ font-size: 10.5pt; margin: 10px 0 4px; }}
.key {{ display: grid; grid-template-columns: repeat(6, 1fr); gap: 2px 8px; font-size: 9.5pt; }}
.x {{ margin: 0 0 8px; page-break-inside: avoid; }} .x p {{ margin: 0 0 2px; }} .xh {{ font-weight: 700; font-size: 9.5pt; }}
.foot {{ margin-top: 14px; padding: 10px 12px; background: #eff6ff; border-radius: 8px; font-size: 9.5pt; page-break-inside: avoid; }}
</style><body>
<div class="hdr"><img src="file://{ICON}"><div><h1>{esc(paper['displayName'])} question paper with answers</h1>
<div class="d">{long_date(paper['date'])} &middot; {esc(paper['shift'])}</div></div></div>
<div class="strip">{n} questions as {esc(body)} printed them &middot; answers from the official key &middot; marking: {marking}</div>
{left_out}
<p class="note">Try every question first: the answer key and the explanations follow the questions. Official answer-key notice: <a href="{esc(paper['sourceUrl'])}">{esc(paper['sourceUrl'])}</a></p>
{cut}
{qs}
<h1 class="sec">Answer key</h1>{key}
<h1 class="sec">Explanations</h1>{expl}
<div class="foot"><b>This paper online</b>, with tap-to-reveal answers: <a href="{page_url}">{page_url}</a><br>
<b>Every solved {esc(paper['examId'].replace('_', ' ').upper())} paper:</b> <a href="{index_url}">{index_url}</a><br>
<b>Daily current affairs PDF, free, every morning on Telegram:</b> <a href="https://{TELEGRAM}">{TELEGRAM}</a><br>
<span class="small">Questions and official answers: {esc(body)}. Explanations: drafted with AI assistance by Pariksha Saathi and checked against the
official answers. Pariksha Saathi is not affiliated with any exam body. Spotted an error? Write to sriwastava2@gmail.com.</span></div>
</body></html>"""


def build(paper, rows):
    from pypdf import PdfReader, PdfWriter
    out_dir = os.path.join(ROOT, "public", "pdf", "papers", exam_slug(paper["examId"]))
    os.makedirs(out_dir, exist_ok=True)
    tmp_html = os.path.join(HERE, f"_{paper['slug']}.html")
    raw = os.path.join(HERE, f"_{paper['slug']}.pdf")
    open(tmp_html, "w", encoding="utf-8").write(page_html(paper, rows))
    try:
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={raw}", f"file://{tmp_html}"],
                       capture_output=True, check=True, timeout=180)
        r = PdfReader(raw)
        w = PdfWriter()
        for p in r.pages:
            w.add_page(p)
        w.add_metadata({
            "/Title": f"{paper['displayName']} question paper, {long_date(paper['date'])}, {paper['shift']}, with answers",
            "/Author": "Pariksha Saathi (parikshasaathi.com)",
            "/Subject": "Previous-year question paper with the official answer key and explanations",
        })
        final = os.path.join(out_dir, f"{paper['slug']}.pdf")
        w.write(final)
        return {"path": f"/pdf/papers/{exam_slug(paper['examId'])}/{paper['slug']}.pdf", "pages": len(r.pages), "sizeKb": round(os.path.getsize(final) / 1024)}
    finally:
        for f in (tmp_html, raw):
            if os.path.exists(f):
                os.remove(f)


def main():
    exams = sys.argv[1:]
    if not exams:
        sys.exit("usage: make_paper_pdfs.py <examId> [<examId> ...]   e.g. ssc_cgl")
    papers = json.load(open(os.path.join(ROOT, "src", "data", "pyqPapers.json"), encoding="utf-8"))
    manifest_path = os.path.join(ROOT, "src", "data", "pyqPdfs.json")
    manifest = json.load(open(manifest_path, encoding="utf-8")) if os.path.exists(manifest_path) else {}
    cache = {}
    for exam in exams:
        chosen = [p for p in papers if p["examId"] == exam]
        if not chosen:
            sys.exit(f"no solved papers for {exam} in src/data/pyqPapers.json")
        for p in chosen:
            manifest[p["slug"]] = build(p, cutoff_rows(p, cache))
            m = manifest[p["slug"]]
            print(f"{p['slug']}: {m['pages']} pages, {m['sizeKb']} KB")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(dict(sorted(manifest.items())), f, indent=1)
        f.write("\n")
    print(f"{manifest_path}: {len(manifest)} PDFs")


if __name__ == "__main__":
    main()
