#!/usr/bin/env python3
"""Make the daily current-affairs reel (YouTube Shorts / Instagram Reels): 1080x1920, Hindi voice, about a minute.

Usage: npm run reel:daily -- [YYYY-MM-DD]   (default: the newest editionDate with Hindi items in the API)
Writes reels/ParikshaSaathi_CA_<date>.mp4, a cover image and an upload text (titles, descriptions, captions).

What is on screen and in the voice is the published edition and nothing more: the day's Hindi item titles as published
(the first five, in the daily PDF's order), their source, and one published question linked to one of them, with its
answer. To keep the reel near a minute the voice reads each title's lead - its own words up to the first colon - while
the slide shows the whole title with its figures. Slides are HTML drawn by Google Chrome (Devanagari-correct, as for the daily PDF); the voice is Kokoro
(hexgrad/Kokoro-82M, Hindi narrator hf_alpha); ffmpeg joins them.

Needs: Google Chrome; a Python with kokoro, numpy and soundfile (REEL_PYTHON in make_reel.sh, default the toddler-shorts
venv); an ffmpeg with libx264 (FFMPEG, default the imageio_ffmpeg binary).
"""
import hashlib, html, json, os, re, subprocess, sys, tempfile, urllib.request

import numpy as np
import soundfile as sf

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
API = os.environ.get("REEL_API", "https://api.parikshasaathi.com/v1")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FFMPEG = os.environ.get("FFMPEG", os.path.expanduser("~/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"))
OUT_DIR = os.path.join(ROOT, "reels")
TELEGRAM = "parikshasaathiapp"
MAX_ITEMS = 5
VOICE, SPEED, SR = "hf_alpha", 1.15, 44100
W, H, FPS = 1080, 1920, 30
MONTHS = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
ORDINALS = ["पहली", "दूसरी", "तीसरी", "चौथी", "पाँचवीं"]
LETTERS = "ABCD"
LETTERS_HI = ["ए", "बी", "सी", "डी"]


# --- Data ---------------------------------------------------------------------------------------------------------
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

def print_order(q):
    """Options in a fixed order from the question text (stored answer-first; same rule as the daily PDF and Telegram)."""
    order = sorted(range(len(q["options"])), key=lambda k: hashlib.sha1(f"{q['text']}|{k}".encode()).hexdigest())
    return [q["options"][k] for k in order], order.index(q["correctOptionIndex"])

def item_question(items):
    """The first item (in edition order) with a published Hindi question linked to it."""
    for item in items:
        try:
            qs = get(f"/current-affairs/{item['id']}/questions")
        except Exception:
            continue
        qs = qs if isinstance(qs, list) else qs.get("questions") or []
        if qs:
            q = qs[0]
            q["options"] = q["options"] if isinstance(q["options"], list) else json.loads(q["options"])
            return q
    return None

def fmt_date(iso):
    y, m, d = iso.split("-")
    return f"{int(d)} {MONTHS[int(m) - 1]} {y}"


# --- Voice ----------------------------------------------------------------------------------------------------------
# Pronunciation help only - the words are the published ones. Short all-capital abbreviations are read letter by letter.
SAY = {"PM-KISAN": "पीएम किसान", "PhD": "पीएचडी", "AgriStack": "एग्रीस्टैक", "IndiaMART": "इंडियामार्ट", "Justdial": "जस्टडायल",
       "TradeIndia": "ट्रेडइंडिया", "ExportersIndia": "एक्सपोर्टर्स इंडिया", "Dial4Trade": "डायल फ़ॉर ट्रेड", "PIB": "पी आई बी"}
SPELL = {"A": "ए", "B": "बी", "C": "सी", "D": "डी", "E": "ई", "F": "एफ़", "G": "जी", "H": "एच", "I": "आई", "J": "जे", "K": "के",
         "L": "एल", "M": "एम", "N": "एन", "O": "ओ", "P": "पी", "Q": "क्यू", "R": "आर", "S": "एस", "T": "टी", "U": "यू", "V": "वी",
         "W": "डब्ल्यू", "X": "एक्स", "Y": "वाई", "Z": "ज़ेड"}

def speech(text):
    for word, said in SAY.items():
        text = text.replace(word, said)
    spell = lambda m: " ".join(SPELL.get(c.upper(), c) for c in m.group(0))
    text = re.sub(r"(?<![A-Za-z])[A-Z][a-z]?[A-Z]{1,4}(?![A-Za-z])", spell, text)  # CCPA, MoES, AcSIR, PMMSY
    return text.replace("…", "।")

class Voice:
    def __init__(self):
        from kokoro import KPipeline
        self.pipe = KPipeline(lang_code="h", repo_id="hexgrad/Kokoro-82M")

    def say(self, text):
        audio = np.concatenate([np.asarray(seg, dtype=np.float32) for _, _, seg in self.pipe(speech(text), voice=VOICE, speed=SPEED)])
        idx = np.where(np.abs(audio) > 0.01)[0]
        if len(idx): audio = audio[max(0, idx[0] - 600): idx[-1] + 1200]
        audio = np.interp(np.linspace(0, len(audio) - 1, int(len(audio) * SR / 24000)), np.arange(len(audio)), audio).astype(np.float32)
        return audio / max(1e-6, np.max(np.abs(audio))) * 0.9

silence = lambda seconds: np.zeros(int(seconds * SR), dtype=np.float32)

def spoken_title(title):
    """The title's lead - its words before the first colon - when that lead says something on its own."""
    lead = title.split(":", 1)[0].strip()
    return lead if ":" in title and len(lead) >= 25 else title


# --- Slides (HTML -> PNG with Chrome) ------------------------------------------------------------------------------
CSS = """
*{box-sizing:border-box;margin:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#f6f3ea;color:#2a2620;font-family:'Kohinoor Devanagari','Devanagari Sangam MN',sans-serif}
.top{height:250px;background:#1e3a52;color:#fff;display:flex;align-items:center;gap:28px;padding:0 64px}
.top img{width:120px;height:120px;border-radius:26px}
.brand{font-size:52px;font-weight:700;line-height:1.2}
.sub{font-size:34px;color:#e9dfcf;line-height:1.4}
.body{padding:40px 64px;height:1150px;display:flex;flex-direction:column;justify-content:center;gap:38px}
.badge{align-self:flex-start;background:#a6431f;color:#fff;font-size:38px;font-weight:700;padding:10px 30px;border-radius:999px}
.headline{font-weight:700;line-height:1.42}
.meta{font-size:34px;color:#6b6558;line-height:1.5}
.cta{margin:0 64px;padding:26px 34px;border:3px solid #1e3a52;border-radius:24px;font-size:36px;font-weight:600;color:#1e3a52;line-height:1.45;text-align:center}
.center{text-align:center;align-items:center;justify-content:center}
.big{font-size:104px;font-weight:700;color:#1e3a52;line-height:1.3}
.date{font-size:60px;font-weight:700;color:#a6431f}
.lead{font-size:44px;line-height:1.5}
.q{font-size:52px;font-weight:700;line-height:1.45}
.opts{display:flex;flex-direction:column;gap:22px}
.opt{display:flex;align-items:center;gap:26px;padding:22px 30px;border:3px solid #d8d2c0;border-radius:22px;background:#fff;font-size:46px;line-height:1.35}
.opt b{flex:none;width:72px;height:72px;border-radius:50%;background:#e4dcd0;display:flex;align-items:center;justify-content:center;font-size:38px}
.opt.right{border-color:#3f7a4e;background:#eaf5ec}
.opt.right b{background:#3f7a4e;color:#fff}
.opt.dim{opacity:.45}
.handle{font-size:84px;font-weight:700;color:#1e3a52}
"""

def page(top_sub, body, body_class="", cta=True):
    icon = "file://" + os.path.join(HERE, "..", "daily-pdf", "icon.png")
    cta_html = f'<div class="cta">📲 रोज़ सुबह 7 बजे पूरा PDF + क्विज़ — Telegram: @{TELEGRAM}</div>' if cta else ""
    return f"""<!doctype html><html lang="hi"><meta charset="utf-8"><style>{CSS}</style><body>
<div class="top"><img src="{icon}"><div><div class="brand">Pariksha Saathi</div><div class="sub">{html.escape(top_sub)}</div></div></div>
<div class="body {body_class}">{body}</div>{cta_html}</body></html>"""

def headline_size(text):
    n = len(text)
    return 90 if n <= 80 else 80 if n <= 120 else 70 if n <= 170 else 62

def render(slides, work):
    pngs = []
    for k, doc in enumerate(slides):
        src, png = os.path.join(work, f"s{k}.html"), os.path.join(work, f"s{k}.png")
        open(src, "w", encoding="utf-8").write(doc)
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                        f"--window-size={W},{H}", f"--screenshot={png}", f"file://{src}"], capture_output=True, check=True)
        pngs.append(png)
    return pngs


# --- Build ----------------------------------------------------------------------------------------------------------
def main():
    hi_all = fetch_all("hi")
    date = sys.argv[1] if len(sys.argv) > 1 else max(i["editionDate"][:10] for i in hi_all)
    items = [i for i in hi_all if i["editionDate"].startswith(date)][:MAX_ITEMS]
    if not items: sys.exit(f"no Hindi current-affairs items dated {date}")
    question = item_question(items)
    date_hi, n = fmt_date(date), len(items)
    sources = sorted({i["sourceName"] for i in items})
    source_line = "सिर्फ़ आधिकारिक PIB स्रोतों से" if sources == ["PIB"] else f"आधिकारिक स्रोतों ({', '.join(sources)}) से"
    top_sub = f"दैनिक करंट अफेयर्स · {date_hi}"

    voice = Voice()
    segments = []  # (slide html, audio)
    segments.append((page(top_sub, f'<div class="big">आज के {n} करेंट अफेयर्स</div><div class="date">{date_hi}</div>'
                                   f'<div class="lead">SSC · Bank · Railway के लिए<br>{source_line}</div>', "center"),
                     np.concatenate([voice.say(f"{date_hi} के {n} ज़रूरी करेंट अफेयर्स।"), silence(0.4)])))
    for k, item in enumerate(items):
        tags = " · ".join(item.get("examTags") or [])
        body = (f'<div class="badge">खबर {k + 1} / {n}</div>'
                f'<div class="headline" style="font-size:{headline_size(item["title"])}px">{html.escape(item["title"])}</div>'
                f'<div class="meta">{html.escape(tags)}<br>स्रोत: {html.escape(item["sourceName"])} — आधिकारिक प्रेस विज्ञप्ति</div>')
        segments.append((page(top_sub, body), np.concatenate([voice.say(f"{ORDINALS[k]} खबर। {spoken_title(item['title'])}"), silence(0.9)])))
    if question:
        options, right = print_order(question)
        opts = lambda reveal: "".join(
            f'<div class="opt{(" right" if j == right else " dim") if reveal else ""}"><b>{LETTERS[j]}</b>{html.escape(o)}</div>' for j, o in enumerate(options))
        ask = f'<div class="badge">🧠 आज का प्रश्न</div><div class="q">{html.escape(question["text"])}</div><div class="opts">{opts(False)}</div><div class="meta">सोचिए… जवाब 3 सेकंड में</div>'
        reveal = f'<div class="badge">🧠 आज का प्रश्न</div><div class="q">{html.escape(question["text"])}</div><div class="opts">{opts(True)}</div><div class="meta" style="color:#3f7a4e;font-weight:700">सही जवाब: ({LETTERS[right]}) {html.escape(options[right])}</div>'
        segments.append((page(top_sub, ask), np.concatenate([voice.say(f"अब आज का प्रश्न। {question['text']}"), silence(3.0)])))
        segments.append((page(top_sub, reveal), np.concatenate([voice.say(f"सही जवाब है {LETTERS_HI[right]}, {options[right]}।"), silence(0.8)])))
    segments.append((page(top_sub, '<div class="lead" style="font-size:60px;font-weight:700">रोज़ सुबह 7 बजे<br>पूरा PDF और क्विज़</div>'
                                   f'<div class="lead">Telegram पर खोजें</div><div class="handle">@{TELEGRAM}</div>'
                                   '<div class="lead">🌐 parikshasaathi.com<br>हर खबर उसके आधिकारिक स्रोत के लिंक के साथ</div>'
                                   '<div class="date" style="font-size:52px">फ़ॉलो करें 🔔</div>', "center", cta=False),
                     np.concatenate([voice.say("रोज़ का पूरा पीडीएफ़ टेलीग्राम पर। फ़ॉलो करें!"), silence(1.2)])))

    os.makedirs(OUT_DIR, exist_ok=True)
    base = os.path.join(OUT_DIR, f"ParikshaSaathi_CA_{date}")
    with tempfile.TemporaryDirectory() as work:
        pngs = render([doc for doc, _ in segments], work)
        durations = [len(audio) / SR for _, audio in segments]
        total = sum(durations)
        sf.write(os.path.join(work, "voice.wav"), np.concatenate([audio for _, audio in segments]), SR)
        with open(os.path.join(work, "slides.txt"), "w") as f:
            for png, seconds in zip(pngs, durations):
                f.write(f"file '{png}'\nduration {seconds:.3f}\n")
            f.write(f"file '{pngs[-1]}'\n")  # the concat demuxer needs the last image twice
        # A thin progress bar along the top edge (over the header band) so viewers see how long is left.
        bar = f"color=c=0xa6431f:s={W}x12:r={FPS}:d={total:.3f}"
        subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", os.path.join(work, "slides.txt"),
                        "-i", os.path.join(work, "voice.wav"), "-f", "lavfi", "-i", bar,
                        "-filter_complex", f"[0:v]fps={FPS},scale={W}:{H},format=yuv420p[v];[v][2:v]overlay=x='-w+w*t/{total:.3f}':y=0:shortest=1,format=yuv420p[out]",
                        "-map", "[out]", "-map", "1:a", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-c:a", "aac", "-b:a", "160k",
                        "-t", f"{total:.3f}", "-movflags", "+faststart", base + ".mp4"], check=True)
        subprocess.run(["cp", pngs[0], base + "_cover.png"], check=True)

    lines = [f"{k + 1}. {i['title']}" for k, i in enumerate(items)]
    q_line = f"\nआज का प्रश्न: {question['text']} — जवाब वीडियो के अंत में।\n" if question else ""
    tags = "#currentaffairs #करेंटअफेयर्स #dailycurrentaffairs #ssc #railway #bankexam #sarkarinaukri #hindi"
    upload = f"""YOUTUBE SHORTS
Title:
{date_hi} करेंट अफेयर्स | {n} ज़रूरी खबरें | SSC, Bank, Railway #shorts

Description:
{date_hi} के करेंट अफेयर्स, {source_line}:
{chr(10).join(lines)}
{q_line}
📥 रोज़ सुबह 7 बजे पूरा PDF और क्विज़: https://t.me/{TELEGRAM}
🌐 हर खबर उसके आधिकारिक स्रोत के लिंक के साथ: https://parikshasaathi.com/app/current-affairs/
स्रोत:
{chr(10).join(i['sourceUrl'] for i in items)}

आवाज़ AI (Kokoro TTS) से बनी है; खबरें आधिकारिक विज्ञप्तियों से AI की सहायता से तैयार की गई हैं।
{tags} #shorts


INSTAGRAM REEL
Caption:
{date_hi} के {n} ज़रूरी करेंट अफेयर्स ✅ {source_line}।
{chr(10).join(lines)}
{q_line}
📥 रोज़ सुबह 7 बजे पूरा PDF और क्विज़ — Telegram पर खोजें: {TELEGRAM}
🌐 parikshasaathi.com
आवाज़ AI (Kokoro TTS) से; खबरें आधिकारिक विज्ञप्तियों से AI की सहायता से तैयार।
{tags} #reels
"""
    open(base + "_upload.txt", "w", encoding="utf-8").write(upload)
    print(f"{base}.mp4: {n} items{' + 1 question' if question else ''}, {total:.1f} s")
    print(f"{base}_cover.png, {base}_upload.txt")
    if total > 90: print(f"note: {total:.0f} s is long for a Short/Reel; consider MAX_ITEMS = 4")

if __name__ == "__main__":
    main()
