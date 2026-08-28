# Product Thinking · Every Decision Has A Trade-off

A 19.4s vertical video: a balance scale wobbles, settles level, and the video
argues that level is the wrong answer. Then it tips twice, on two different
axes, in opposite directions.

**Output:** `out/trade-offs.mp4`
1080 × 1350 (4:5), 30 fps, H.264 High, yuv420p, silent AAC track, faststart.

## The turn that makes it worth posting

A balance-scale video almost always ends up saying "find the balance", which
is both obvious and wrong. This one sets that instinct up and then breaks it:

- Beats 1 and 2 let the scale settle **perfectly level**, and the caption
  agrees with the viewer: balance both, keep everyone happy.
- Beat 3 puts a verdict chip under the level scale: **NO DECISION MADE**. A
  level scale is not a balanced product, it is a product with no opinion.
- Beat 4 tips decisively and labels **both** pans: OPTIMISED FOR under the one
  that went down, TRADED AWAY under the one that went up. The cost is named,
  not hidden.
- Beat 5 swaps the pairing to Speed / Control and tips the other way, so the
  point is not "simplicity is correct" but "the tilt is a choice per product".

The pans are a real lever: heavier side goes down, which is why the chosen
side descends. The two labels exist precisely because "down = winning" is
ambiguous on a scale, and the video cannot afford that ambiguity.

## Beats

| Time | Beat |
|---|---|
| 0.0 - 3.0 | Scale appears, wobbling on a damped oscillation. "Two things you want. One scale." |
| 3.0 - 6.3 | It settles level, level reference line appears. "Balance both. Keep everyone happy." |
| 6.3 - 9.5 | NO DECISION MADE. "You optimised for *nothing*." |
| 9.5 - 13.1 | Decisive tilt left. "Simplicity wins. Flexibility *pays* for it." |
| 13.1 - 16.0 | Labels swap to Speed / Control, tilt hands over to the right. "Same scale. Opposite answer." |
| 16.0 - 19.4 | Takeaway: design isn't finding the balance, it's choosing the tilt. |

## Implementation notes

`tiltAt(t)` returns a single value in [-1, 1] and everything else follows from
it: beam angle, pan positions, string endpoints, which chip lights up, which
side label shows, and the background tint. Because the highlight is driven by
`clamp(±tilt)` rather than a boolean, the blue hands over smoothly from one
chip to the other as the beam passes through level during the swap.

Two details worth keeping if you edit:
- Chips are **fully opaque** and dim by colour, never by opacity. At lower
  opacity the hanging strings show straight through the label and it reads as
  a rendering bug.
- The undecided wobble is a damped sine that settles on its own, so no beat
  has to "hold" the scale still.

## Re-rendering

```bash
python3 -m pip install --break-system-packages imageio-ffmpeg
export FFMPEG_BIN=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")

node render.js --preview   # 6 key stills -> out/preview/
node render.js             # full mp4     -> out/
```

Editing:
- **Copy** - the `SC` array in `scene.html`.
- **The pairs** - the `textContent` assignments in the `lastPair` block.
- **Tilt choreography** - `TILT1`, `TILT1B`, `SWAP`, `SWAPB`, and `MAXDEG`.
- **Footer** - `.tfoot`.

Palette: no orange, no glows. Rose while undecided, blue once a side is
chosen.

## Caption

See `post-caption.md`.
