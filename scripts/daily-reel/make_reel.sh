#!/bin/sh
# Runs make_reel.py with a Python that has Kokoro TTS (kokoro, numpy, soundfile). Default: the toddler-shorts venv,
# where Kokoro and its Hindi model are already installed; override with REEL_PYTHON=/path/to/python.
set -e
PY="${REEL_PYTHON:-$HOME/dev/toddler-shorts/.venv/bin/python}"
[ -x "$PY" ] || { echo "No Python with Kokoro at $PY - set REEL_PYTHON" >&2; exit 1; }
exec "$PY" "$(dirname "$0")/make_reel.py" "$@"
