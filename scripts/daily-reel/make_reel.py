#!/usr/bin/env python3
"""Make the daily current-affairs reel (YouTube Shorts / Instagram Reels): 1080x1920, Hindi voice, about a minute.

Usage: npm run reel:daily -- [YYYY-MM-DD] [--voice hf_alpha|hf_beta|hm_omega|hm_psi]
       npm run reel:daily -- [YYYY-MM-DD] --voice-samples     one video with each voice reading the same headlines
       npm run reel:daily -- [YYYY-MM-DD] --text-only         rewrite only the upload text (titles, captions, tags)
       npm run reel:daily -- --promo                          the timeless Telegram ad reel (for boosting)
       npm run reel:daily -- --promo30                        the 30-second hook-and-pitch Telegram ad
       npm run reel:daily -- --promo-all                      the 30-second ad for Telegram, Instagram and the website
       npm run reel:daily -- --promo-free                     the 30-second free-prep ad (owner's script), voice from PROMO_VOICE_DIR
(default date: the newest editionDate with Hindi items in the API; default voice: REEL_VOICE, else hf_alpha)
Writes reels/ParikshaSaathi_CA_<date>.mp4, a cover image and an upload text (titles, descriptions, captions).

What is on screen and in the voice is the published edition and nothing more: the day's Hindi item titles as published
(the first five, in the daily PDF's order), their source, and one published question linked to one of them, with its
answer. To keep the reel near a minute the voice reads each title's lead - its own words up to the first colon - while
the slide shows the whole title with its figures. Slides are HTML drawn by Google Chrome (Devanagari-correct, as for the daily PDF); the voice is Kokoro
(hexgrad/Kokoro-82M, one of its four Hindi voices) with news-style EQ and compression over a synthesised music bed and
sound effects; ffmpeg joins them.

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
VOICE, SPEED, SR = os.environ.get("REEL_VOICE", "hf_alpha"), 1.2, 44100
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

VOICES = {"hf_alpha": "महिला आवाज़ 1", "hf_beta": "महिला आवाज़ 2", "hm_omega": "पुरुष आवाज़ 1", "hm_psi": "पुरुष आवाज़ 2"}

class Voice:
    def __init__(self, voice=VOICE, speed=SPEED):
        from kokoro import KPipeline
        self.pipe, self.voice, self.speed = KPipeline(lang_code="h", repo_id="hexgrad/Kokoro-82M"), voice, speed

    def say(self, text):
        audio = np.concatenate([np.asarray(seg, dtype=np.float32) for _, _, seg in self.pipe(speech(text), voice=self.voice, speed=self.speed)])
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
.body.tall{height:1640px;justify-content:flex-start;padding-top:60px}
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


# --- Sound: music bed, effects, mix ---------------------------------------------------------------------------------
# Everything is synthesised here (nothing downloaded): a soft beat that the mix ducks under the voice, a whoosh on each
# new slide, clock ticks while the quiz waits, a ding on the answer. The voice gets news-style EQ and compression, and
# the whole mix is normalised to -14 LUFS, the loudness YouTube and Instagram play at.
def _env(n, attack, decay):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(attack, 1e-4)) * np.exp(-t / decay)

def music_bed(seconds, bpm=104):
    """Kick on every beat, an off-beat hat, a bass note and a soft chord pluck per beat (Am - F - C - G)."""
    n = int(seconds * SR)
    out = np.zeros(n + SR, np.float32)
    beat = 60 / bpm
    chords = [(220.0, 261.63, 329.63), (174.61, 220.0, 261.63), (196.0, 261.63, 329.63), (196.0, 246.94, 293.66)]
    bass = (110.0, 87.31, 130.81, 98.0)
    rng = np.random.default_rng(7)
    def add(at, sig):
        i = int(at * SR); j = min(len(out), i + len(sig)); out[i:j] += sig[: j - i]
    for b in range(int(seconds / beat) + 1):
        t0, bar = b * beat, (b // 4) % 4
        t = np.arange(int(0.25 * SR)) / SR
        add(t0, 0.8 * np.sin(2 * np.pi * np.cumsum(48 + 90 * np.exp(-t * 35)) / SR) * np.exp(-t * 16))
        lh = int(0.05 * SR)
        add(t0 + beat / 2, 0.12 * np.diff(rng.standard_normal(lh), prepend=0) * _env(lh, 0.001, 0.012))
        tb = np.arange(int(beat * 0.9 * SR)) / SR
        add(t0, 0.28 * np.sin(2 * np.pi * bass[bar] * tb) * _env(len(tb), 0.005, 0.35))
        tc = np.arange(int(beat * 0.8 * SR)) / SR
        chord = sum(np.sin(2 * np.pi * f * tc) + 0.3 * np.sin(4 * np.pi * f * tc) for f in chords[bar]) / 3
        add(t0, 0.10 * chord * _env(len(tc), 0.004, 0.18))
    out = out[:n]
    fade = int(1.5 * SR)
    out[:fade] *= np.linspace(0, 1, fade); out[-fade:] *= np.linspace(1, 0, fade)
    return (out / max(1e-6, np.max(np.abs(out))) * 0.8).astype(np.float32)

def whoosh():
    n = int(0.4 * SR); noise = np.random.default_rng(3).standard_normal(n)
    bright, dark, sweep = np.diff(noise, prepend=0), np.convolve(noise, np.ones(24) / 24, mode="same"), np.linspace(0, 1, n)
    return (0.3 * (bright * (1 - sweep) + 2 * dark * sweep) * np.sin(np.pi * sweep) ** 2).astype(np.float32)

def ding():
    t = np.arange(int(0.9 * SR)) / SR
    return (0.4 * (np.sin(2 * np.pi * 1318.5 * t) + 0.6 * np.sin(2 * np.pi * 1975.5 * t)) * np.exp(-t * 5) * np.minimum(1, t / 0.003)).astype(np.float32)

def thud():
    t = np.arange(int(0.5 * SR)) / SR
    return (0.9 * np.sin(2 * np.pi * np.cumsum(70 * np.exp(-t * 6)) / SR) * np.exp(-t * 7)).astype(np.float32)

def tick():
    t = np.arange(int(0.03 * SR)) / SR
    return (0.4 * np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 180)).astype(np.float32)

LEAD_IN = 0.25  # seconds of room before each line, where the slide's whoosh plays

def segment(html_doc, voice_audio, after=0.6, sfx="whoosh", ticks=0):
    """One slide: its HTML, its audio (lead-in, voice, pause) and its effects (offsets within the slide)."""
    audio = np.concatenate([silence(LEAD_IN), voice_audio, silence(after)])
    effects = [(0.0, {"whoosh": whoosh, "ding": ding, "thud": thud}[sfx]())] if sfx else []
    effects += [(LEAD_IN + len(voice_audio) / SR + k, tick()) for k in range(ticks)]
    return {"html": html_doc, "audio": audio, "effects": effects}

VOICE_FX = "highpass=f=90,equalizer=f=250:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1.2:g=4,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2"

def assemble(segments, out_mp4, cover=None, bpm=104):
    with tempfile.TemporaryDirectory() as work:
        pngs = render([seg["html"] for seg in segments], work)
        durations = [len(seg["audio"]) / SR for seg in segments]
        total = sum(durations)
        voice = np.concatenate([seg["audio"] for seg in segments])
        fx = np.zeros(len(voice) + SR, np.float32)
        at = 0.0
        for seg, seconds in zip(segments, durations):
            for offset, sound in seg["effects"]:
                i = int((at + offset) * SR); fx[i:i + len(sound)] += sound[: len(fx) - i]
            at += seconds
        sf.write(os.path.join(work, "voice.wav"), voice, SR)
        sf.write(os.path.join(work, "music.wav"), music_bed(total, bpm), SR)
        sf.write(os.path.join(work, "fx.wav"), fx[: len(voice)], SR)
        with open(os.path.join(work, "slides.txt"), "w") as f:
            for png, seconds in zip(pngs, durations):
                f.write(f"file '{png}'\nduration {seconds:.3f}\n")
            f.write(f"file '{pngs[-1]}'\n")  # the concat demuxer needs the last image twice
        # A thin progress bar along the top edge (over the header band) so viewers see how long is left.
        bar = f"color=c=0xa6431f:s={W}x12:r={FPS}:d={total:.3f}"
        graph = (f"[0:v]fps={FPS},scale={W}:{H},format=yuv420p[v];[v][2:v]overlay=x='-w+w*t/{total:.3f}':y=0:shortest=1,format=yuv420p[vout];"
                 f"[1:a]{VOICE_FX},asplit=2[vo][key];[3:a]volume=0.3[mus];"
                 "[mus][key]sidechaincompress=threshold=0.02:ratio=12:attack=10:release=400[duck];"
                 "[vo][duck][4:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[aout]")
        subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", os.path.join(work, "slides.txt"),
                        "-i", os.path.join(work, "voice.wav"), "-f", "lavfi", "-i", bar,
                        "-i", os.path.join(work, "music.wav"), "-i", os.path.join(work, "fx.wav"),
                        "-filter_complex", graph, "-map", "[vout]", "-map", "[aout]",
                        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-c:a", "aac", "-b:a", "160k",
                        "-t", f"{total:.3f}", "-movflags", "+faststart", out_mp4], check=True)
        if cover: subprocess.run(["cp", pngs[0], cover], check=True)
    return total


# --- Build ----------------------------------------------------------------------------------------------------------
def edition(date=None):
    hi_all = fetch_all("hi")
    date = date or max(i["editionDate"][:10] for i in hi_all)
    items = [i for i in hi_all if i["editionDate"].startswith(date)][:MAX_ITEMS]
    if not items: sys.exit(f"no Hindi current-affairs items dated {date}")
    return date, items

def item_slide(top_sub, item, k, n):
    tags = " · ".join(item.get("examTags") or [])
    return page(top_sub, f'<div class="badge">खबर {k + 1} / {n}</div>'
                         f'<div class="headline" style="font-size:{headline_size(item["title"])}px">{html.escape(item["title"])}</div>'
                         f'<div class="meta">{html.escape(tags)}<br>स्रोत: {html.escape(item["sourceName"])} — आधिकारिक प्रेस विज्ञप्ति</div>')

def main(date=None, voice_name=VOICE):
    date, items = edition(date)
    question = item_question(items)
    date_hi, n = fmt_date(date), len(items)
    sources = sorted({i["sourceName"] for i in items})
    source_line = "सिर्फ़ आधिकारिक PIB स्रोतों से" if sources == ["PIB"] else f"आधिकारिक स्रोतों ({', '.join(sources)}) से"
    top_sub = f"दैनिक करंट अफेयर्स · {date_hi}"

    voice = Voice(voice_name)
    segments = [segment(page(top_sub, f'<div class="big">आज के {n} करेंट अफेयर्स</div><div class="date">{date_hi}</div>'
                                      f'<div class="lead">SSC · Bank · Railway के लिए<br>{source_line}</div>', "center"),
                        voice.say(f"{date_hi} के {n} ज़रूरी करेंट अफेयर्स।"), after=0.4)]
    for k, item in enumerate(items):
        segments.append(segment(item_slide(top_sub, item, k, n), voice.say(f"{ORDINALS[k]} खबर। {spoken_title(item['title'])}"), after=0.7))
    if question:
        options, right = print_order(question)
        opts = lambda reveal: "".join(
            f'<div class="opt{(" right" if j == right else " dim") if reveal else ""}"><b>{LETTERS[j]}</b>{html.escape(o)}</div>' for j, o in enumerate(options))
        ask = f'<div class="badge">🧠 आज का प्रश्न</div><div class="q">{html.escape(question["text"])}</div><div class="opts">{opts(False)}</div><div class="meta">सोचिए… जवाब 3 सेकंड में</div>'
        reveal = f'<div class="badge">🧠 आज का प्रश्न</div><div class="q">{html.escape(question["text"])}</div><div class="opts">{opts(True)}</div><div class="meta" style="color:#3f7a4e;font-weight:700">सही जवाब: ({LETTERS[right]}) {html.escape(options[right])}</div>'
        segments.append(segment(page(top_sub, ask), voice.say(f"अब आज का प्रश्न। {question['text']}"), after=3.0, ticks=3))
        segments.append(segment(page(top_sub, reveal), voice.say(f"सही जवाब है {LETTERS_HI[right]}, {options[right]}।"), after=0.8, sfx="ding"))
    segments.append(segment(page(top_sub, '<div class="lead" style="font-size:60px;font-weight:700">रोज़ सुबह 7 बजे<br>पूरा PDF और क्विज़</div>'
                                          f'<div class="lead">Telegram पर खोजें</div><div class="handle">@{TELEGRAM}</div>'
                                          '<div class="lead">🌐 parikshasaathi.com<br>हर खबर उसके आधिकारिक स्रोत के लिंक के साथ</div>'
                                          '<div class="date" style="font-size:52px">फ़ॉलो करें 🔔</div>', "center", cta=False),
                            voice.say("रोज़ का पूरा पीडीएफ़ टेलीग्राम पर। फ़ॉलो करें!"), after=1.2))

    os.makedirs(OUT_DIR, exist_ok=True)
    base = os.path.join(OUT_DIR, f"ParikshaSaathi_CA_{date}")
    total = assemble(segments, base + ".mp4", cover=base + "_cover.png")

    write_upload_text(base + "_upload.txt", date, items, question, source_line)
    print(f"{base}.mp4: {n} items{' + 1 question' if question else ''}, {total:.1f} s")
    print(f"{base}_cover.png, {base}_upload.txt")
    if total > 90: print(f"note: {total:.0f} s is long for a Short/Reel; consider MAX_ITEMS = 4")



EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

def write_upload_text(path, date, items, question, source_line):
    """Titles, descriptions, tags and captions for YouTube Shorts and Instagram Reels, written for search: the date in
    English and Hindi up front (how people search: "19 October current affairs", "करेंट अफेयर्स 19 अक्टूबर"), the
    items' English headlines too, and the exams. Every line about the news is a published title or its lead."""
    y, m, d = date.split("-")
    date_en, date_hi = f"{int(d)} {EN_MONTHS[int(m) - 1]} {y}", fmt_date(date)
    en_by_url = {i["sourceUrl"]: i for i in fetch_all("en")}
    english = [spoken_title(en_by_url[i["sourceUrl"]]["title"]) for i in items if i["sourceUrl"] in en_by_url]
    numbered = "\n".join(f"{k + 1}. {i['title']}" for k, i in enumerate(items))
    leads = "\n".join(f"{k + 1}️⃣ {spoken_title(i['title'])}" for k, i in enumerate(items))
    quiz = f"🧠 आज का प्रश्न: {question['text']}\nपहले कमेंट में अपना जवाब लिखें, फिर वीडियो के आखिर में मिलाएँ! 👇" if question else ""
    sources = "\n".join(i["sourceUrl"] for i in items)
    disclosure = "आवाज़ AI (Kokoro TTS) से बनी है; खबरें आधिकारिक PIB विज्ञप्तियों से AI की सहायता से तैयार की गई हैं।"
    day_tag = f"#{int(d)}{EN_MONTHS[int(m) - 1]}CurrentAffairs"
    tags = ", ".join([f"{date_en} current affairs", f"{int(d)} {EN_MONTHS[int(m) - 1].lower()} current affairs", f"करेंट अफेयर्स {date_hi}",
                      "current affairs in hindi", "daily current affairs", "करेंट अफेयर्स", "aaj ka current affairs", "ssc current affairs",
                      "railway current affairs", "bank current affairs", "pib current affairs", "current affairs quiz", "gk in hindi"])
    text = f"""YOUTUBE SHORTS
========================================
Title:
{date_en} Current Affairs in Hindi | करेंट अफेयर्स | SSC Railway Bank #shorts

Description:
{date_en} Current Affairs in Hindi: {date_hi} की {len(items)} ज़रूरी खबरें, {source_line}। SSC, Railway, Bank और राज्य परीक्षाओं के लिए Daily Current Affairs।

📌 आज की खबरें ({date_hi}):
{numbered}

{quiz}

In English: {" • ".join(english)}

📥 रोज़ सुबह 7 बजे पूरा PDF + क्विज़ (Telegram): https://t.me/{TELEGRAM}
🌐 हर खबर उसके आधिकारिक स्रोत के लिंक के साथ: https://parikshasaathi.com/app/current-affairs/
📝 मुफ़्त अभ्यास प्रश्न, उत्तर सहित: https://parikshasaathi.com/hi/q/

स्रोत (PIB):
{sources}

{disclosure}

#currentaffairs #करेंटअफेयर्स {day_tag}
#dailycurrentaffairs #currentaffairsinhindi #sscexam #railwayexam #bankexam #gk #pib #shorts

Tags (YouTube Studio → Tags box):
{tags}


INSTAGRAM REEL
========================================
Caption:
{date_en} Current Affairs in Hindi 📰 | SSC • Railway • Bank

{date_hi} की {len(items)} ज़रूरी खबरें, {source_line}:
{leads}

{quiz}

📌 Save करें, रिवीज़न में काम आएगा
📤 परीक्षा की तैयारी करने वाले दोस्तों को भेजें
📥 रोज़ सुबह 7 बजे पूरा PDF + क्विज़: Telegram पर खोजें @{TELEGRAM}
🌐 parikshasaathi.com

{disclosure}

#currentaffairs #dailycurrentaffairs #currentaffairsinhindi #करेंटअफेयर्स #sscexam #railwayexam #bankexam #gk {day_tag.lower()}
"""
    open(path, "w", encoding="utf-8").write(text)


def promo():
    """A timeless 15-20 s ad reel for the Telegram channel - for boosting, where a dated news reel would go stale. Every
    claim is something the channel does today: the 07:00 PDF from official sources with practice questions, the
    18:00 quiz poll and new exam notices. Shows page 1 of the newest daily PDF as the proof."""
    pdf = os.path.join(ROOT, "public", "pdf", "latest.pdf")
    os.makedirs(OUT_DIR, exist_ok=True)
    with tempfile.TemporaryDirectory() as work:
        subprocess.run(["pdftoppm", "-png", "-r", "110", "-f", "1", "-l", "1", "-singlefile", pdf, os.path.join(work, "pdfpage")], check=True)
        shot = "file://" + os.path.join(work, "pdfpage.png")
        top = "मुफ़्त · हर सुबह 7 बजे · Telegram"
        voice = Voice()
        pdf_img = f'<img src="{shot}" style="width:500px;align-self:center;border-radius:18px;box-shadow:0 18px 50px rgba(20,41,58,.35);transform:rotate(-2deg)">'
        segments = [
            segment(page(top, '<div class="big" style="font-size:96px">SSC · Railway · Bank<br>की तैयारी?</div>', "center", cta=False),
                    voice.say("एसएससी, रेलवे या बैंक की तैयारी कर रहे हैं?"), after=0.3),
            segment(page(top, f'<div class="badge">हर सुबह 7 बजे</div><div class="headline" style="font-size:76px">करेंट अफेयर्स का PDF,<br>बिल्कुल मुफ़्त</div>{pdf_img}', cta=False),
                    voice.say("रोज़ सुबह सात बजे करेंट अफेयर्स का पीडीएफ़, बिल्कुल मुफ़्त।"), after=0.4),
            segment(page(top, '<div class="headline" style="font-size:62px;line-height:1.6">✅ हर खबर आधिकारिक PIB स्रोत से<br>✅ अभ्यास प्रश्न, उत्तर सहित<br>✅ शाम 6 बजे क्विज़<br>✅ नई परीक्षा सूचनाएँ</div>', cta=False),
                    voice.say("हर खबर आधिकारिक स्रोत से, अभ्यास प्रश्नों के साथ। शाम को क्विज़, और नई परीक्षा सूचनाएँ भी।"), after=0.4),
            segment(page(top, f'<div class="lead" style="font-size:76px;font-weight:700">Telegram पर जुड़ें</div><div class="handle" style="font-size:92px">@{TELEGRAM}</div>'
                              '<div class="lead">👇 नीचे बटन दबाएँ</div>', "center", cta=False),
                    voice.say("अभी टेलीग्राम पर जुड़ें!"), after=1.5),
        ]
        out = os.path.join(OUT_DIR, "ParikshaSaathi_Telegram_promo.mp4")
        total = assemble(segments, out, cover=os.path.join(OUT_DIR, "ParikshaSaathi_Telegram_promo_cover.png"))
    open(os.path.join(OUT_DIR, "ParikshaSaathi_Telegram_promo_caption.txt"), "w", encoding="utf-8").write(
        f"""SSC, Railway, Bank की तैयारी? 📚
रोज़ सुबह 7 बजे करेंट अफेयर्स का PDF — बिल्कुल मुफ़्त, हर खबर आधिकारिक PIB स्रोत से, अभ्यास प्रश्नों के साथ।
शाम 6 बजे क्विज़ और नई परीक्षा सूचनाएँ भी।
👉 Telegram पर जुड़ें: @{TELEGRAM}

#currentaffairs #sscexam #railwayexam #bankexam #currentaffairsinhindi #करेंटअफेयर्स
""")
    print(f"{out}: {total:.1f} s")

def promo30():
    """The 30-second Telegram ad: a hook (missing selection by 1-2 marks), why it happens (no revision, no practice
    in the exam's pattern), then what the channel gives - every claim true today: the 07:00 PDF with practice
    questions, the 18:00 quiz, new exam notices with dates and official links, every item from an official source,
    free. Shows real content: page 1 of the newest daily PDF, the newest Hindi quiz question with its answer, and the
    newest Hindi notice as the channel posts it. No previous-year papers, memory-based questions or "instant" alerts
    are promised - the channel has none of those."""
    pdf = os.path.join(ROOT, "public", "pdf", "latest.pdf")
    hi_items = fetch_all("hi")
    newest = max(i["editionDate"][:10] for i in hi_items)
    question = item_question([i for i in hi_items if i["editionDate"].startswith(newest)])
    notices = get("/exam-updates?lang=hi")
    notices = notices if isinstance(notices, list) else notices.get("items") or []
    # The newest notice, preferring an admit card or notification (of wider interest than a date change) on a tie.
    rank = {"ADMIT_CARD": 0, "NOTIFICATION": 1, "RESULT": 2, "ANSWER_KEY": 3, "DEADLINE": 4}
    notice = min(notices, key=lambda n: (-int((n.get("lastVerifiedAt") or "0000-00-00")[:10].replace("-", "")), rank.get(n["type"], 9))) if notices else None
    os.makedirs(OUT_DIR, exist_ok=True)
    with tempfile.TemporaryDirectory() as work:
        subprocess.run(["pdftoppm", "-png", "-r", "110", "-f", "1", "-l", "1", "-singlefile", pdf, os.path.join(work, "pdfpage")], check=True)
        shot = "file://" + os.path.join(work, "pdfpage.png")
        top = "मुफ़्त Telegram चैनल · @" + TELEGRAM
        voice = Voice(speed=1.3)  # an ad reads brisker than the daily news reel
        line = lambda text, size=76, color="#2a2620": f'<div class="headline" style="font-size:{size}px;color:{color}">{text}</div>'
        card = "background:#fff;border:3px solid #e4dcd0;border-radius:28px;padding:34px 38px;box-shadow:0 18px 50px rgba(20,41,58,.18)"
        stamp = ('<div style="position:relative;' + card + ';height:420px;display:flex;flex-direction:column;gap:22px;justify-content:center">'
                 '<div style="height:26px;width:60%;background:#e4dcd0;border-radius:8px"></div><div style="height:26px;width:85%;background:#efe9df;border-radius:8px"></div>'
                 '<div style="height:26px;width:45%;background:#efe9df;border-radius:8px"></div>'
                 '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><div style="transform:rotate(-12deg);border:10px solid #c0392b;color:#c0392b;font-size:96px;font-weight:800;padding:6px 34px;border-radius:18px;letter-spacing:.04em;background:rgba(255,255,255,.85)">NOT QUALIFIED</div></div></div>')
        pdf_img = f'<img src="{shot}" style="width:470px;align-self:center;border-radius:18px;box-shadow:0 18px 50px rgba(20,41,58,.35);transform:rotate(-2deg)">'
        quiz_card = ""
        if question:
            options, right = print_order(question)
            quiz_card = ('<div style="' + card + ';display:flex;flex-direction:column;gap:16px"><div style="font-size:30px;color:#6b6558;font-weight:600">Quiz · Pariksha Saathi</div>'
                         f'<div style="font-size:40px;font-weight:700;line-height:1.4">{html.escape(question["text"])}</div>'
                         + "".join(f'<div class="opt{" right" if j == right else ""}" style="font-size:38px;padding:14px 24px"><b style="width:56px;height:56px;font-size:30px">{"✓" if j == right else LETTERS[j]}</b>{html.escape(o)}</div>' for j, o in enumerate(options))
                         + '</div>')
        notice_card = ""
        if notice:
            type_hi = {"NOTIFICATION": "अधिसूचना", "ADMIT_CARD": "प्रवेश पत्र", "ANSWER_KEY": "उत्तर कुंजी", "RESULT": "परिणाम", "DEADLINE": "तिथि अपडेट"}.get(notice["type"], notice["type"])
            notice_card = ('<div style="' + card + ';display:flex;flex-direction:column;gap:18px"><div style="font-size:36px;font-weight:700;color:#a6431f">📢 नई परीक्षा सूचना · ' + html.escape(type_hi) + '</div>'
                           f'<div style="font-size:44px;font-weight:700;line-height:1.4">{html.escape(notice["title"])}</div>'
                           '<div style="font-size:34px;color:#1e3a52;font-weight:600">🔗 आधिकारिक सूचना · 📅 महत्वपूर्ण तिथियाँ</div></div>')
        icon = "file://" + os.path.join(HERE, "..", "daily-pdf", "icon.png")
        segments = [
            segment(page(top, f'{stamp}{line("1-2 मार्क से selection छूट गया? 😓", 82)}', cta=False),
                    voice.say("एक-दो मार्क से सिलेक्शन छूट गया?"), after=0.2, sfx="thud"),
            segment(page(top, line("❌ पढ़ा बहुत,<br>पर revise नहीं किया", 92, "#c0392b"), "center", cta=False),
                    voice.say("दिन भर पढ़ाई… पर करंट अफेयर्स रिवाइज़ नहीं होते।"), after=0.2),
            segment(page(top, line("❌ Exam pattern में<br>practice नहीं", 92, "#c0392b"), "center", cta=False),
                    voice.say("और प्रैक्टिस एग्ज़ाम पैटर्न में नहीं होती।"), after=0.2),
            segment(page(top, f'<img src="{icon}" style="width:260px;height:260px;border-radius:56px;align-self:center">'
                              + line("Pariksha Saathi", 100, "#1e3a52") + line("आपका FREE Telegram साथी", 70, "#a6431f"), "center", cta=False),
                    voice.say("इसीलिए है परीक्षा साथी, आपका फ़्री टेलीग्राम साथी!"), after=0.2),
            segment(page(top, line("☀️ रोज़ सुबह 7 बजे:<br>Current Affairs PDF<br>+ practice questions", 70) + pdf_img, cta=False),
                    voice.say("हर सुबह सात बजे करंट अफेयर्स का पीडीएफ़, प्रैक्टिस प्रश्नों के साथ।"), after=0.2),
            segment(page(top, line("🧠 रोज़ शाम 6 बजे: Quiz", 76) + quiz_card, cta=False),
                    voice.say("शाम छह बजे क्विज़।"), after=0.3),
            segment(page(top, line("📢 नई exam notices:<br>dates + official link", 76) + notice_card, cta=False),
                    voice.say("और नई एग्ज़ाम नोटिस, तारीख़ों और ऑफ़िशियल लिंक के साथ।"), after=0.2),
            segment(page(top, line("✅ हर खबर<br>official source से", 80) + line("100% FREE", 130, "#3f7a4e"), "center", cta=False),
                    voice.say("हर खबर ऑफ़िशियल सोर्स से, बिल्कुल फ़्री!"), after=0.2),
            segment(page(top, line("अभी join करें 👇", 92) + f'<div class="handle" style="font-size:96px">@{TELEGRAM}</div>'
                              + line("Telegram पर search करें · Link bio में", 54, "#6b6558"), "center", cta=False),
                    voice.say("अभी जॉइन करो! टेलीग्राम पर सर्च करो परीक्षा साथी ऐप, लिंक बायो में।"), after=1.2),
        ]
        out = os.path.join(OUT_DIR, "ParikshaSaathi_Telegram_promo30.mp4")
        total = assemble(segments, out, cover=os.path.join(OUT_DIR, "ParikshaSaathi_Telegram_promo30_cover.png"), bpm=118)
    open(os.path.join(OUT_DIR, "ParikshaSaathi_Telegram_promo30_caption.txt"), "w", encoding="utf-8").write(
        f"""1-2 मार्क से selection छूट जाता है? 😓 रोज़ थोड़ा, सही तरीके से revise करो 👇
☀️ हर सुबह 7 बजे Current Affairs PDF + practice questions
🧠 शाम 6 बजे Quiz · 📢 नई exam notices, official link के साथ
✅ हर खबर official source से · बिल्कुल FREE
Telegram पर join करें: @{TELEGRAM} (link bio में)
आवाज़ AI (Kokoro TTS) से बनी है।
#sscexam #railwayexam #bankexam #currentaffairs #करेंटअफेयर्स
""")
    print(f"{out}: {total:.1f} s")

INSTAGRAM = "parkishasathi"  # the brand's own Instagram handle as registered (src/data/socialLinks.mjs), spelling and all
SITE = "parikshasaathi.com"

def phone_shot(url, work, name, height=780):
    """A phone-sized screenshot of a live page of our own site - real proof on screen, not a mock-up. 500 px wide: headless
    Chrome will not make a window narrower than about that, and a narrower capture only crops the page's right side."""
    png = os.path.join(work, f"{name}.png")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2.2",
                    f"--window-size=500,{height}", "--virtual-time-budget=8000", f"--screenshot={png}", url], capture_output=True, check=True)
    return "file://" + png

def bleed(body, bg="#14293a", color="#fff"):
    """A full-bleed slide (no header band) for the hook and the end card."""
    return f"""<!doctype html><html lang="hi"><meta charset="utf-8"><style>{CSS}
html,body{{background:{bg};color:{color}}}
.wrap{{height:1920px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;padding:0 70px;text-align:center}}
.chip{{display:inline-block;padding:16px 40px;border-radius:999px;font-size:54px;font-weight:800}}
.row{{display:flex;align-items:center;gap:30px;width:100%;padding:30px 40px;border-radius:30px;background:rgba(255,255,255,.08);text-align:left}}
.row .ic{{font-size:84px;width:110px;text-align:center}}
.row .k{{font-size:38px;color:#c9d6e2;font-weight:600}}
.row .v{{font-size:64px;font-weight:800;color:#fff;line-height:1.15}}
</style><body><div class="wrap">{body}</div></body></html>"""

def phone(src, tilt=0):
    return (f'<img src="{src}" style="width:600px;align-self:center;border-radius:46px;border:14px solid #14293a;'
            f'box-shadow:0 26px 70px rgba(20,41,58,.40);transform:rotate({tilt}deg)">')

# The spoken lines of --promo-all, in slide order. English words are written in Devanagari so that any Hindi voice
# says them right. `--promo-all-lines <file>` writes them as JSON, for parler_lines.py or for recording by hand.
PROMO_ALL_LINES = [
    "एसएससी के पच्चीस हज़ार से ज़्यादा असली प्रश्न, उत्तर और हल के साथ… और फ़ीस? ज़ीरो!",
    "तीन सौ उनसठ पुराने पेपर, हर प्रश्न का हल, और पीडीएफ़ भी।",
    "रेलवे के फ़्री मॉक टेस्ट, हिंदी में भी।",
    "और रोज़ के करेंट अफ़ेयर्स, हर ख़बर ऑफ़िशियल सोर्स से।",
    "टेलीग्राम पर रोज़ — सुबह सात बजे पीडीएफ़, शाम छह बजे क्विज़, और हर नई एग्ज़ाम नोटिस।",
    "इंस्टाग्राम पर फ़ॉलो करें।",
    "और सब कुछ एक जगह — परीक्षा साथी डॉट कॉम।",
    "अभी जुड़ें — टेलीग्राम, इंस्टाग्राम और वेबसाइट। लिंक बायो में!",
]

def promo_voice(lines):
    """Each line's audio: recorded or pre-generated files (PROMO_VOICE_DIR/line<k>.wav - e.g. from parler_lines.py or the
    owner's own recording), else Kokoro."""
    folder = os.environ.get("PROMO_VOICE_DIR")
    if not folder:
        voice = Voice(speed=1.2)
        return lambda k: voice.say(lines[k])
    tempo = float(os.environ.get("PROMO_TEMPO", "1"))  # e.g. 1.13: a pitch-preserving speed-up, to fit a 30 s slot
    def load(k):
        path = os.path.join(folder, f"line{k}.wav")
        if tempo != 1:
            fast = os.path.join(tempfile.gettempdir(), f"promo_line{k}_{tempo}.wav")
            subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-i", path, "-filter:a", f"atempo={tempo}", fast], check=True)
            path = fast
        audio, rate = sf.read(path, dtype="float32", always_2d=True)
        audio = audio.mean(axis=1)
        idx = np.where(np.abs(audio) > 0.02 * np.max(np.abs(audio)))[0]
        if len(idx): audio = audio[max(0, idx[0] - int(0.03 * rate)): idx[-1] + int(0.08 * rate)]
        audio = np.interp(np.linspace(0, len(audio) - 1, int(len(audio) * SR / rate)), np.arange(len(audio)), audio).astype(np.float32)
        return audio / max(1e-6, np.max(np.abs(audio))) * 0.9
    return load

def promo_all():
    """The 30-second ad for all three places at once - the Telegram channel, the Instagram profile and the website. Hook
    first (the number of real SSC previous-year questions, free), then proof shot from the live site, then where to
    follow. Every claim is true today: 25,000+ official SSC previous-year questions (25,351 on 23 Oct 2026, from SSC's own
    answer keys) with answers and explanations, 359 solved papers with PDFs, free Railway mock tests in Hindi too, daily
    current affairs from official sources, and the channel's 07:00 PDF, 18:00 quiz and new exam notices. Nothing is
    claimed about Instagram beyond "follow", and nothing about ads."""
    pdf = os.path.join(ROOT, "public", "pdf", "latest.pdf")
    os.makedirs(OUT_DIR, exist_ok=True)
    with tempfile.TemporaryDirectory() as work:
        subprocess.run(["pdftoppm", "-png", "-r", "110", "-f", "1", "-l", "1", "-singlefile", pdf, os.path.join(work, "pdfpage")], check=True)
        daily = "file://" + os.path.join(work, "pdfpage.png")
        papers = phone_shot(f"https://{SITE}/hi/exams/ssc-gd/question-papers/", work, "papers")
        mocks = phone_shot(f"https://{SITE}/hi/exams/rrb-ntpc/mock-tests/", work, "mocks")
        home = phone_shot(f"https://{SITE}/hi/", work, "home")
        top = f"FREE · Telegram · Instagram · {SITE}"
        say = promo_voice(PROMO_ALL_LINES)
        line = lambda text, size=76, color="#2a2620": f'<div class="headline" style="font-size:{size}px;color:{color}">{text}</div>'
        chips = lambda names: ('<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center">'
                               + "".join(f'<span style="background:#1e3a52;color:#fff;font-size:40px;font-weight:700;padding:10px 26px;border-radius:999px">{n}</span>' for n in names) + '</div>')
        segments = [
            # 1. The hook: one huge number, on a dark full-bleed slide, with a thud.
            segment(bleed('<div style="font-size:52px;font-weight:700;color:#e9dfcf">SSC की तैयारी कर रहे हैं?</div>'
                          '<div style="font-size:250px;font-weight:900;color:#f2a33a;line-height:1">25,000+</div>'
                          '<div style="font-size:88px;font-weight:800;line-height:1.25">SSC के असली प्रश्न</div>'
                          '<div style="font-size:44px;color:#c9d6e2">पिछले वर्षों के आधिकारिक प्रश्नपत्रों से, उत्तर और हल सहित</div>'
                          '<div class="chip" style="background:#3f7a4e;color:#fff;font-size:72px">फ़ीस? ₹0</div>'),
                    say(0), after=0.15, sfx="thud"),
            # 2. Proof: the solved papers, as the live site shows them.
            segment(page(top, line("📄 359 हल प्रश्नपत्र<br>+ हर पेपर की PDF", 78) + chips(["CGL", "CHSL", "MTS", "GD"]) + phone(papers, -2), "tall", cta=False),
                    say(1), after=0.15),
            # 3. Railway mocks.
            segment(page(top, line("🚆 RRB NTPC · Group D · ALP<br>फ़्री मॉक टेस्ट, हिंदी में भी", 70) + phone(mocks, 2), "tall", cta=False),
                    say(2), after=0.15),
            # 4. Daily current affairs.
            segment(page(top, line("📰 रोज़ के करेंट अफेयर्स<br>हर खबर आधिकारिक स्रोत से", 72)
                              + f'<img src="{daily}" style="width:560px;align-self:center;border-radius:18px;box-shadow:0 18px 50px rgba(20,41,58,.35);transform:rotate(-2deg)">', "tall", cta=False),
                    say(3), after=0.15),
            # 5. Telegram.
            segment(page(top, line("✈️ Telegram पर रोज़:", 84, "#1e3a52")
                              + line("☀️ सुबह 7 बजे: करेंट अफेयर्स PDF<br>🧠 शाम 6 बजे: क्विज़<br>📢 नई परीक्षा सूचनाएँ", 66)
                              + f'<div class="handle" style="font-size:92px">@{TELEGRAM}</div>', "center", cta=False),
                    say(4), after=0.15),
            # 6. Instagram.
            segment(page(top, line("📸 Instagram पर", 96, "#1e3a52") + f'<div class="handle" style="font-size:110px">@{INSTAGRAM}</div>'
                              + line("follow करें", 90, "#a6431f"), "center", cta=False),
                    say(5), after=0.15),
            # 7. The website.
            segment(page(top, line(f"🌐 सब कुछ एक जगह:<br><span style=\"color:#a6431f\">{SITE}</span>", 76) + phone(home, -2), "tall", cta=False),
                    say(6), after=0.15),
            # 8. The end card: all three, held for the follow.
            segment(bleed('<div style="font-size:96px;font-weight:900;color:#f2a33a">अभी जुड़ें 👇</div>'
                          f'<div class="row"><div class="ic">✈️</div><div><div class="k">Telegram</div><div class="v">@{TELEGRAM}</div></div></div>'
                          f'<div class="row"><div class="ic">📸</div><div><div class="k">Instagram</div><div class="v">@{INSTAGRAM}</div></div></div>'
                          f'<div class="row"><div class="ic">🌐</div><div><div class="k">Website</div><div class="v">{SITE}</div></div></div>'
                          '<div class="chip" style="background:#3f7a4e;color:#fff">बिल्कुल FREE · लिंक बायो में</div>'),
                    say(7), after=1.0, sfx="ding"),
        ]
        out = os.path.join(OUT_DIR, "ParikshaSaathi_promo_all30.mp4")
        total = assemble(segments, out, cover=os.path.join(OUT_DIR, "ParikshaSaathi_promo_all30_cover.png"), bpm=124)
    open(os.path.join(OUT_DIR, "ParikshaSaathi_promo_all30_caption.txt"), "w", encoding="utf-8").write(
        f"""SSC के 25,000+ असली प्रश्न, उत्तर और हल सहित — फ़ीस ₹0 😮👇
📄 359 हल प्रश्नपत्र (CGL · CHSL · MTS · GD) + हर पेपर की PDF
🚆 RRB NTPC · Group D · ALP के फ़्री मॉक टेस्ट, हिंदी में भी
📰 रोज़ के करेंट अफेयर्स, हर खबर आधिकारिक स्रोत से

✈️ Telegram: @{TELEGRAM} — सुबह 7 बजे PDF, शाम 6 बजे क्विज़, नई परीक्षा सूचनाएँ
📸 Instagram: @{INSTAGRAM}
🌐 Website: {SITE}
लिंक बायो में। आवाज़ AI (Kokoro TTS) से बनी है।

#sscexam #sscgd #ssccgl #sscchsl #railwayexam #rrbntpc #currentaffairs #previousyearpapers #करेंटअफेयर्स
""")
    print(f"{out}: {total:.1f} s")

# The spoken lines of --promo-free (the owner's 30-second script, 23 Oct 2026), in slide order, English words in Devanagari.
PROMO_FREE_LINES = [
    "एग्ज़ाम की तैयारी शुरू करनी है, लेकिन समझ नहीं आ रहा क्या पढ़ें और कहाँ से प्रैक्टिस करें?",
    "परीक्षा साथी पर फ़्री मॉक टेस्ट दो, और पता लगाओ कि आपकी तैयारी कहाँ खड़ी है।",
    "क्वांट, रीज़निंग, इंग्लिश और जनरल अवेयरनेस के टॉपिक-वाइज़ लेसन्स पढ़ो, सीधे एग्ज़ाम की तैयारी के लिए।",
    "पिछले सालों के इम्पॉर्टेंट क्वेश्चन्स और उनके आसान सॉल्व्ड एक्सप्लनेशन्स से प्रैक्टिस करो।",
    "और रोज़ के करेंट अफ़ेयर्स पढ़ो, ताकि जीके और करेंट अफ़ेयर्स पीछे न रह जाएँ।",
    "सब कुछ फ़्री है। आज ही पढ़ाई शुरू करो, परीक्षा साथी डॉट कॉम।",
]

def promo_free():
    """The owner's 30-second script (23 Oct 2026): a hook question, then free mock tests, topic-wise lessons, solved
    previous-year questions and daily current affairs, then the website. Shown from the live site: the RRB NTPC mock
    player, a Hindi lesson; a real SSC GD 2022 Part-D Hindi question with its answer and explanation (from
    src/data/pyqPapers.json); the newest Hindi current-affairs headlines from the API. All of it is free today."""
    os.makedirs(OUT_DIR, exist_ok=True)
    hi_items = fetch_all("hi")
    newest = max(i["editionDate"][:10] for i in hi_items)
    today = [i for i in hi_items if i["editionDate"].startswith(newest)][:4]
    pyq = next(q for p in json.load(open(os.path.join(ROOT, "src", "data", "pyqPapers.json"), encoding="utf-8"))
               if p["examId"] == "ssc_gd" and p["date"] == "2023-01-10" and p["shift"] == "Shift 1"
               for q in p["questions"] if q["languageCode"] == "hi" and q["number"] == 1)
    with tempfile.TemporaryDirectory() as work:
        mock = phone_shot(f"https://{SITE}/app/mock-tests/rrb_ntpc/cbt1/1/?lang=hi", work, "mock")
        lesson = phone_shot(f"https://{SITE}/hi/learn/average/", work, "lesson")
        top = f"Free Exam Prep · {SITE}"
        say = promo_voice(PROMO_FREE_LINES)
        title = lambda text, emoji: f'<div class="headline" style="font-size:84px;color:#1e3a52">{emoji} {text}</div>'
        card = "background:#fff;border:3px solid #e4dcd0;border-radius:30px;padding:36px 40px;box-shadow:0 18px 50px rgba(20,41,58,.18);display:flex;flex-direction:column;gap:20px"
        chips = lambda names: ('<div style="display:flex;flex-wrap:wrap;gap:16px">'
                               + "".join(f'<span style="background:#1e3a52;color:#fff;font-size:40px;font-weight:700;padding:10px 26px;border-radius:999px">{n}</span>' for n in names) + '</div>')
        question = pyq["text"].replace("? ", "?<br>", 1)
        pyq_card = (f'<div style="{card}">'
                    '<div style="align-self:flex-start;background:#a6431f;color:#fff;font-size:34px;font-weight:700;padding:8px 24px;border-radius:999px">SSC GD 2022 · 10 जनवरी 2023 · पाली 1</div>'
                    f'<div style="font-size:46px;font-weight:700;line-height:1.45">{question}</div>'
                    + "".join(f'<div class="opt{" right" if j == pyq["correctOptionIndex"] else ""}" style="font-size:42px;padding:14px 24px"><b style="width:60px;height:60px;font-size:32px">{"✓" if j == pyq["correctOptionIndex"] else LETTERS[j]}</b>{html.escape(o)}</div>' for j, o in enumerate(pyq["options"]))
                    + f'<div style="font-size:38px;line-height:1.5;color:#2a2620;background:#eaf5ec;border-radius:20px;padding:18px 24px"><b>हल:</b> {html.escape(pyq["explanation"])}</div></div>')
        feed = (f'<div style="{card}"><div style="font-size:40px;font-weight:800;color:#a6431f">📰 {html.escape(fmt_date(newest))}</div>'
                + "".join(f'<div style="font-size:40px;font-weight:700;line-height:1.4;border-top:2px solid #efe9df;padding-top:18px">{html.escape(i["title"][:90] + ("…" if len(i["title"]) > 90 else ""))}</div>' for i in today)
                + '<div style="font-size:32px;color:#1e3a52;font-weight:600">हर खबर आधिकारिक स्रोत से · हिंदी + English</div></div>')
        icon = "file://" + os.path.join(HERE, "..", "daily-pdf", "icon.png")
        segments = [
            segment(bleed('<div style="font-size:150px">🤔</div>'
                          '<div style="font-size:96px;font-weight:900;line-height:1.3"><span style="color:#f2a33a">SSC / Railway / Banking</span><br>की तैयारी कर रहे हो?</div>'
                          '<div style="font-size:54px;color:#c9d6e2;line-height:1.5">क्या पढ़ें? कहाँ से practice करें?</div>'),
                    say(0), after=0.15, sfx="thud"),
            segment(page(top, title("Free Mock Tests", "✅") + phone(mock, -2), "tall", cta=False), say(1), after=0.15),
            segment(page(top, title("Topic-wise Lessons", "📚") + chips(["Quant", "Reasoning", "English", "General Awareness"]) + phone(lesson, 2), "tall", cta=False),
                    say(2), after=0.15),
            segment(page(top, title("Solved Previous-Year Questions", "📝") + pyq_card, "tall", cta=False), say(3), after=0.15),
            segment(page(top, title("Daily Current Affairs", "📰") + feed, "tall", cta=False), say(4), after=0.15),
            segment(bleed(f'<img src="{icon}" style="width:230px;height:230px;border-radius:52px">'
                          '<div style="font-size:120px;font-weight:900;color:#f2a33a">Free Exam Prep</div>'
                          f'<div style="font-size:100px;font-weight:900">{SITE}</div>'
                          '<div class="chip" style="background:#3f7a4e;color:#fff">SSC · Railway · Banking · Police · PSC</div>'),
                    say(5), after=1.0, sfx="ding"),
        ]
        out = os.path.join(OUT_DIR, "ParikshaSaathi_promo_free30.mp4")
        total = assemble(segments, out, cover=os.path.join(OUT_DIR, "ParikshaSaathi_promo_free30_cover.png"), bpm=120)
    print(f"{out}: {total:.1f} s")

def voice_samples(date=None):
    """One short video with the same two headlines read by each Kokoro Hindi voice, to choose REEL_VOICE by ear."""
    date, items = edition(date)
    top_sub = f"आवाज़ चुनें · {fmt_date(date)}"
    segments = []
    for k, (name, label) in enumerate(VOICES.items(), 1):
        voice = Voice(name)
        segments.append(segment(page(top_sub, f'<div class="big">आवाज़ {k}</div><div class="date">{label}</div><div class="lead">{name}</div>', "center"),
                                voice.say(f"यह आवाज़ नंबर {k} है।"), after=0.3))
        for j, item in enumerate(items[:2]):
            segments.append(segment(item_slide(top_sub, item, j, len(items)), voice.say(f"{ORDINALS[j]} खबर। {spoken_title(item['title'])}"), after=0.6))
    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, f"voice_samples_{date}.mp4")
    total = assemble(segments, out)
    print(f"{out}: {len(VOICES)} voices, {total:.1f} s")

if __name__ == "__main__":
    args = sys.argv[1:]
    date = next((a for a in args if re.fullmatch(r"\d{4}-\d{2}-\d{2}", a)), None)
    if "--voice-samples" in args: voice_samples(date)
    elif "--promo30" in args: promo30()
    elif "--promo-all-lines" in args:
        open(args[args.index("--promo-all-lines") + 1], "w", encoding="utf-8").write(json.dumps(PROMO_ALL_LINES, ensure_ascii=False, indent=1))
    elif "--promo-all" in args: promo_all()
    elif "--promo-free" in args: promo_free()
    elif "--promo" in args: promo()
    elif "--text-only" in args:
        date, items = edition(date)
        sources = sorted({i["sourceName"] for i in items})
        line = "सिर्फ़ आधिकारिक PIB स्रोतों से" if sources == ["PIB"] else f"आधिकारिक स्रोतों ({', '.join(sources)}) से"
        out = os.path.join(OUT_DIR, f"ParikshaSaathi_CA_{date}_upload.txt")
        write_upload_text(out, date, items, item_question(items), line)
        print(out)
    else: main(date, args[args.index("--voice") + 1] if "--voice" in args else VOICE)
