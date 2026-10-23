#!/usr/bin/env python3
"""Voice the lines of a reel with AI4Bharat's Indic Parler-TTS (ai4bharat/indic-parler-tts, Apache-2.0): more natural
and expressive Hindi than Kokoro, and the speaker and delivery are chosen by a plain-text description.

Usage (with a Python that has parler-tts, e.g. ~/dev/tts-venvs/parler):
  python parler_lines.py <lines.json> <out dir> [--speaker Divya] [--style "..."] [--seed 7]
lines.json is a JSON list of the lines to speak, in order; writes <out dir>/line0.wav, line1.wav, ... make_reel.py
--promo-all reads them when PROMO_VOICE_DIR points at <out dir>. The model is gated on Hugging Face (automatic
approval): the account this machine is signed in with must have accepted its terms once.
"""
import json, os, sys

import soundfile as sf
import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer

MODEL = "ai4bharat/indic-parler-tts"
STYLE = ("{speaker} speaks with a moderately high pitch at a slightly fast pace in an energetic, confident and expressive "
         "tone, like an advertisement. The recording is of very high quality, with the speaker's voice sounding clear and "
         "very close up, with no background noise.")

def main():
    args = sys.argv[1:]
    lines_path, out = args[0], args[1]
    opt = lambda name, default: args[args.index(name) + 1] if name in args else default
    speaker, seed = opt("--speaker", "Divya"), int(opt("--seed", "7"))
    style = opt("--style", STYLE).format(speaker=speaker)
    lines = json.load(open(lines_path, encoding="utf-8"))
    os.makedirs(out, exist_ok=True)
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    model = ParlerTTSForConditionalGeneration.from_pretrained(MODEL).to(device)
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    describe = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)
    d = describe(style, return_tensors="pt").to(device)
    for k, line in enumerate(lines):
        torch.manual_seed(seed + k)  # sampling is random; a fixed seed per line makes a re-run sound the same
        p = tokenizer(line, return_tensors="pt").to(device)
        audio = model.generate(input_ids=d.input_ids, attention_mask=d.attention_mask,
                               prompt_input_ids=p.input_ids, prompt_attention_mask=p.attention_mask)
        sf.write(os.path.join(out, f"line{k}.wav"), audio.cpu().numpy().squeeze(), model.config.sampling_rate)
        print(f"line{k}.wav: {line}")

if __name__ == "__main__":
    main()
