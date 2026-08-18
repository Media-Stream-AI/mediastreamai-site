#!/usr/bin/env bash
#
# Re-encode public/ media for load time and Core Web Vitals.
#
# Run it after adding or replacing anything in public/video or the page images:
#
#   ./scripts/optimize-media.sh              # everything
#   ./scripts/optimize-media.sh video        # just the clips
#   ./scripts/optimize-media.sh image        # just the stills
#
# It rewrites the files in place, so the committed asset is the optimised one —
# nothing is generated at build time. Re-running is safe but lossy codecs
# compound, so start from the original master when replacing a clip rather than
# re-running over an already-optimised file.
#
# Needs: ffmpeg, cwebp  (apt-get install ffmpeg webp)

set -euo pipefail

cd "$(dirname "$0")/.."
PUB=public
VID=$PUB/video

for bin in ffmpeg ffprobe cwebp; do
  command -v "$bin" >/dev/null || { echo "missing $bin — apt-get install ffmpeg webp"; exit 1; }
done

human() { numfmt --to=iec --suffix=B --format="%.1f" "$1" 2>/dev/null || echo "${1}B"; }
size()  { stat -c%s "$1"; }

# ---------------------------------------------------------------------------
# Video
#
# Every clip on the site is a muted, looped, autoplaying background — so the
# audio track is dead weight (`-an`) and the encode only has to look good at
# the size the frame actually renders at, not at the source's native
# resolution.
#
#   datacentre-aerial  full-bleed backdrop, 40% opacity behind a dark wash —
#                      the dimmest thing on the site, so the highest CRF
#   dc3-twin           inline 16:9 frame; the 60fps source is halved
#   exo-robotics       already 848px native, so no downscale
#   mother-exo-v2      /exo hero frame (~600px on desktop); 107s long, and the
#                      172kbps AAC track alone was ~2.3MB of it
#
# Posters give the frame something to paint before the video is decodable,
# which is what the hero's LCP waits on. The seek offset matters: several of
# these fade in from black, and a black poster is worse than none.
#
# No webm. VP9 is supposed to beat H.264 by ~30%, but measured against these
# particular clips at matching quality it came out 1.7-2.4x LARGER than the
# x264 encodes below every time — so a browser preferring it would download
# more, not less. Not worth a second codec and a <source> list to lose.
#
# Entries: file:width:fps:crf:poster-seek-seconds
# ---------------------------------------------------------------------------
CLIPS=(
  "datacentre-aerial:1280:24:32:1"
  "dc3-twin:1280:30:31:1"
  "exo-robotics:848:30:33:2"
  "mother-exo-v2:1280:30:31:6"
)

optimize_video() {
  local name width fps crf seek src tmp
  IFS=: read -r name width fps crf seek <<<"$1"
  src="$VID/$name.mp4"
  [ -f "$src" ] || { echo "  skip $name (no source)"; return; }

  local before; before=$(size "$src")
  tmp=$(mktemp -d)

  # Scale to an even height (-2) — H.264 4:2:0 requires even dimensions.
  local vf="scale=${width}:-2:flags=lanczos"

  ffmpeg -nostdin -v error -y -i "$src" -an -vf "$vf" -r "$fps" \
    -c:v libx264 -profile:v high -preset slow -crf "$crf" -pix_fmt yuv420p \
    -movflags +faststart "$tmp/$name.mp4"

  # Poster: a frame past any fade-in, at the width the clip plays back at.
  ffmpeg -nostdin -v error -y -ss "$seek" -i "$src" -frames:v 1 -vf "$vf" "$tmp/$name.png"
  cwebp -quiet -q 72 "$tmp/$name.png" -o "$tmp/$name.webp"

  mv "$tmp/$name.mp4" "$src"
  mv "$tmp/$name.webp" "$VID/$name.poster.webp"
  rm -rf "$tmp"

  printf "  %-20s %8s → %8s  (poster %8s)\n" \
    "$name" "$(human "$before")" "$(human "$(size "$src")")" \
    "$(human "$(size "$VID/$name.poster.webp")")"
}

# ---------------------------------------------------------------------------
# Images
#
# Two different jobs here.
#
# The page images go through next/image, which re-encodes on demand — but it
# encodes from whatever we ship, so a 1MB PNG behind an 80px icon is a
# 1MB deploy artifact and a slower optimiser pass for no gain. These become
# WebP at the size they are actually rendered at (with headroom for 2–3x DPR).
#
# The social and schema images are fetched raw by crawlers that never touch
# next/image, so they keep a format every scraper accepts — WebP og:images are
# still unevenly supported. They just get re-encoded smaller.
#
# Entries: file:max-width:quality
# ---------------------------------------------------------------------------
TO_WEBP=(
  "ai-platform-diagram:1536:82"      # rendered up to 1400 wide
  "personal-family-diagram:1536:82"  # rendered up to 1400 wide
  "tv-player-interface:1536:82"      # rendered at 1920, source is 1536
  "tv-pairing-qr:1200:84"            # rendered at 800; QR needs edge fidelity
  "vp-studio-icon:800:82"            # rendered at 400 on /creators
  "hls-icon:256:82"                  # only ever rendered at 80
  "personalization-icon:256:82"      # only ever rendered at 80
)

optimize_to_webp() {
  local name max q src out
  IFS=: read -r name max q <<<"$1"
  src="$PUB/$name.png"
  out="$PUB/$name.webp"
  [ -f "$src" ] || { echo "  skip $name (no source)"; return; }

  local before; before=$(size "$src")
  local w; w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$src")

  # cwebp's -resize always scales to the size given, so only pass it when the
  # source is genuinely bigger — otherwise a small icon gets upscaled.
  if [ "$w" -gt "$max" ]; then
    cwebp -quiet -q "$q" -resize "$max" 0 "$src" -o "$out"
  else
    cwebp -quiet -q "$q" "$src" -o "$out"
  fi
  rm -f "$src"

  local after_w; after_w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$out")
  printf "  %-26s %8s → %8s (webp, %spx)\n" \
    "$name" "$(human "$before")" "$(human "$(size "$out")")" "$after_w"
}

# Raw-served: keep a scraper-safe format, just make it smaller.
optimize_social() {
  local src="$1" max="$2" q="$3" out="$4"
  [ -f "$src" ] || { echo "  skip $src (missing)"; return; }
  local before; before=$(size "$src")
  local tmp; tmp=$(mktemp -d)
  ffmpeg -nostdin -v error -y -i "$src" -vf "scale='min($max,iw)':-2:flags=lanczos" \
    -q:v "$q" "$tmp/out.${out##*.}"
  mv "$tmp/out.${out##*.}" "$out"
  [ "$src" != "$out" ] && rm -f "$src"
  rm -rf "$tmp"
  printf "  %-26s %8s → %8s\n" "$(basename "$src")" "$(human "$before")" "$(human "$(size "$out")")"
}

WHAT=${1:-all}

if [ "$WHAT" = all ] || [ "$WHAT" = video ]; then
  echo "video —"
  for c in "${CLIPS[@]}"; do optimize_video "$c"; done
fi

if [ "$WHAT" = all ] || [ "$WHAT" = image ]; then
  echo "images (next/image sources → webp) —"
  for i in "${TO_WEBP[@]}"; do optimize_to_webp "$i"; done

  echo "images (raw-served: social cards + schema logo) —"
  # og:image — 1200x630 is the canonical social card size.
  optimize_social "$PUB/og-image.png"     1200 3 "$PUB/og-image.png"
  # Secondary og:image. Photographic, so JPEG beats PNG by an order of magnitude.
  optimize_social "$PUB/hero-intuitv.png" 1200 4 "$PUB/hero-intuitv.jpg"
  # schema.org Organization logo — Google wants PNG/JPEG here, not WebP.
  optimize_social "$PUB/logo-intuitv.png"  512 3 "$PUB/logo-intuitv.png"
fi

echo "done. public/ is now $(du -sh $PUB | cut -f1)"
