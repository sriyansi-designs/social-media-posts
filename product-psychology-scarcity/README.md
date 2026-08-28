# Product Psychology · Scarcity ("Only 2 left")

A 18.2s vertical video for LinkedIn explaining how a stock-count line changes
decision speed — built as code so any word, colour or timing can be re-rendered.

**Output:** `out/scarcity-product-psychology.mp4`
1080 × 1350 (4:5), 30 fps, H.264 High, yuv420p, silent AAC track, faststart.

4:5 is the tallest ratio LinkedIn renders in-feed, so it takes the most screen
space without being letterboxed. There is no voiceover — LinkedIn autoplays
muted, so every beat is carried by on-screen type.

## Why mock UI instead of real screenshots

The original plan was three screenshots from a real shopping app. This uses a
purpose-built mock PDP instead, because:

- **The claim becomes provable.** "Same product, same price" only lands if
  literally one line changes between states. Real screenshots of different
  products (or the same product on different days) can't isolate the variable —
  the mock holds everything else pixel-identical.
- **No third-party brand** is shown making a persuasion-tactic argument, and
  no app UI is redistributed.
- It re-renders in a minute when the copy changes.

If you do want real screenshots, drop them into `.pimg` as `<img>` and keep the
rest of the timeline as is.

## On-screen script

| Time | Beat |
|---|---|
| 0.0 – 2.5 | **Hook.** Giant "Only 2 left" chip → "Three words that make you decide faster than you meant to." |
| 2.5 – 5.0 | STATE 1 · NO SCARCITY CUE — "Same product. Same price." Product page, empty scarcity slot. |
| 5.0 – 7.6 | STATE 2 · THE CUE APPEARS — "Then the app adds one line." Amber "Only 2 left in stock" animates in, attention ring pulses. |
| 7.6 – 10.1 | STATE 3 · THE CUE GETS LOUDER — "Now waiting feels *risky*." Chip flips red to "Only 1 left", shakes, glows. |
| 10.1 – 12.5 | THE PRODUCT NEVER CHANGED — "Only the pressure to act did." Camera pushes into Buy Now; tap ripple fires. |
| 12.5 – 15.2 | Reframe. "Do I want it?" gets struck through → "Will I lose it?" |
| 15.2 – 18.2 | Takeaway + the honesty caveat + follow prompt. |

Design details doing quiet work: the scarcity slot is a **fixed-height row**, so
nothing reflows between states (proving only one line changed); the progress bar
and background glow **shift blue → red** as urgency rises; the phone never stops
drifting, so no frame is static.

## Re-rendering

```bash
python3 -m pip install --break-system-packages imageio-ffmpeg   # full ffmpeg w/ libx264
export FFMPEG_BIN=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")

node render.js --preview   # 7 key stills -> out/preview/
node render.js             # full mp4     -> out/
```

`scene.html` is a deterministic scene: `window.render(t)` paints the exact state
at time `t`, with no CSS animations, so frame capture is reproducible.
`render.js` drives it in Chromium at 2× and lanczos-downscales into x264.

Editing:
- **Copy** — the `SC` array in `scene.html` (kicker + two caption lines per scene).
- **Timing** — `t0`/`t1` in `SC`, and `T` (total duration).
- **Footer** — `#ffoot`. Currently a generic follow prompt; swap in your name/handle.
- **Colours** — the `:root` block.

## LinkedIn caption

See `post-caption.md`.
