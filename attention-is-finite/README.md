# Product Psychology · Attention Is Finite

A 19.0s vertical video: ten elements compete for attention, a gaze dot has to
check all of them, then nine step back and the tenth becomes instant.

**Output:** `out/attention-is-finite.mp4`
1080 × 1350 (4:5), 30 fps, H.264 High, yuv420p, silent AAC track, faststart.

## The device that makes the point provable

Most versions of this idea just assert that clutter is bad. This one makes
the viewer watch the cost being paid:

- A **gaze dot** traces a scan path across the field, jumping from shape to
  shape. It never reaches the primary action while everything is competing;
  when it runs out of places to look it just jitters, still hunting.
- A **counter** ticks up on each stop. It reaches **9**.
- On the resolve, nine shapes desaturate to near-background and the tenth
  keeps its colour. The gaze path becomes a single straight line and the
  counter drops to **1**.

Both numbers are literally true of the animation on screen, so nothing is
being claimed that the video does not itself demonstrate. It is not
eye-tracking data and the caption notes say so.

The other deliberate choice: on the resolve **nothing is added**. No glow, no
outline, no size jump on the winner beyond a subtle 1.06. The nine simply get
quieter. That is the argument, so the animation is not allowed to cheat by
making the tenth louder.

## Beats

| Time | Beat |
|---|---|
| 0.0 - 3.2 | Ten shapes pop in, each pulsing on its own clock, badges and NEW pills firing. "Every element is shouting." |
| 3.2 - 7.0 | The gaze dot starts scanning. The counter climbs. "Your eye has to check *everything*." |
| 7.0 - 9.8 | Counter sits at 9, gaze still restless. "When everything competes, nothing wins." |
| 9.8 - 13.2 | Nine desaturate. Counter drops to 1. "Nine things just got *quieter*." |
| 13.2 - 15.8 | Direct line to the one. "Now your eye goes straight there." |
| 15.8 - 19.0 | Takeaway: attention is finite, and hierarchy is what you are willing to hide. |

## Re-rendering

```bash
python3 -m pip install --break-system-packages imageio-ffmpeg
export FFMPEG_BIN=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")

node render.js --preview   # 6 key stills -> out/preview/
node render.js             # full mp4     -> out/
```

Same pipeline as the other two projects: `window.render(t)` paints the exact
state at time `t` with no CSS animations, Chromium captures at 2×,
lanczos-downscale into x264.

Editing:
- **Copy** - the `SC` array in `scene.html`.
- **Shapes** - the `SHAPES` array (position, size, kind, colour, badge).
  `DOM` picks which index survives as the dominant one.
- **Scan order** - `ORDER`. It lists the nine wrong stops; the counter label
  and the "Nine stops" copy follow from its length.
- **Footer** - `.tfoot`.

Palette note: no orange anywhere, and no glow on any element. Chaos runs
rose, the resolved state runs blue.

## Caption

See `post-caption.md`.
