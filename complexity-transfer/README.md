# Product Thinking · Complexity Gets Transferred

A 19.4s vertical video: a tangle of system paths gets organised, crosses a
"surface" line, and reaches the user as exactly one line — while the tangle
stays exactly as big as it was.

**Output:** `out/complexity-transfer.mp4`
1080 × 1350 (4:5), 30 fps, H.264 High, yuv420p, silent AAC track, faststart.

## The argument the animation has to make

The idea is Tesler's Law — the Law of Conservation of Complexity: every
product has an irreducible amount of complexity, and the only real question
is who absorbs it. So the animation is built so the tangle **never gets
smaller**. It only gets *organised*:

- 16 strands are drawn once and morph between a chaotic state and an ordered
  one. Both states are defined at the same path parameter, so morphing is a
  plain interpolation — no path-morphing library, and no strand is ever
  removed.
- A dashed **surface line** splits the frame. Everything above it is what the
  team holds; one line crosses below.
- The counts — **16 paths** above, **1 line** below — appear together in the
  fifth beat. That pairing is the whole thesis in two numbers.
- Colour carries the state: warm while tangled, cool once resolved at the
  surface. In beat 5 the bundle is deliberately re-lit warm to pull the eye
  back above the line, because that is the beat where the point lands.

If the tangle visibly shrank, the video would be arguing the opposite of what
it says.

## Beats

| Time | Beat |
|---|---|
| 0.0 – 3.0 | Tangle draws itself, jittering. "Every product has a mess like this." |
| 3.0 – 6.4 | Tags name it — edge cases, timezones, partial refunds, permission roles, retries. |
| 6.4 – 10.0 | Chaos → order. "It untangles it and *carries* it." |
| 10.0 – 13.2 | Surface line appears; one clean line descends into a single card. "The user gets one clean line." |
| 13.2 – 16.2 | Bundle re-lights warm, counts appear. "The mess didn't vanish. Someone is *holding* it." |
| 16.2 – 19.4 | Takeaway + Tesler's Law + follow prompt. |

## Re-rendering

```bash
python3 -m pip install --break-system-packages imageio-ffmpeg
export FFMPEG_BIN=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")

node render.js --preview   # 6 key stills -> out/preview/
node render.js             # full mp4     -> out/
```

Same pipeline as `../product-psychology-scarcity`: `window.render(t)` paints
the exact state at time `t` with no CSS animations, Chromium captures at 2×,
lanczos-downscale into x264. The tangle uses a seeded PRNG, so every render
produces the identical tangle.

Editing:
- **Copy** — the `SC` array in `scene.html`.
- **Tangle shape** — `N` (strand count, also update the "16 paths" label),
  and the amplitude/frequency ranges in the `ST` loop.
- **Seed** — `rng(20260828)` for a different tangle.
- **Footer** — `.tfoot`. Currently a generic follow prompt.

## Caption

See `post-caption.md`.
