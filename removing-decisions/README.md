# Product Thinking · Good Design Removes Decisions

A 19.2s vertical video: a 1 → 2 → 5 → 10 decision tree, a user token that
hesitates at every fork, then the branches get pruned and the surviving route
straightens into a single vertical line.

**Output:** `out/removing-decisions.mp4`
1080 × 1350 (4:5), 30 fps, H.264 High, yuv420p, silent AAC track, faststart.

## How this differs from complexity-transfer

Both videos go from many to one, so the mechanic had to be visibly different:

- In `../complexity-transfer` the mess **survives**. It reorganises, crosses a
  surface line, and someone upstream keeps holding it. Nothing is deleted.
- Here the branches are **actually deleted**. The tree gets smaller because
  the team answered the questions instead of forwarding them.

If both videos used the same mechanic they would contradict each other.

## The device that makes the cost visible

The token does not glide down the tree. It **hesitates** at each fork: it
stops and oscillates left and right, and only when the wobble ends does the
counter tick. That is the whole argument in motion, because a decision costs
time and attention, not pixels.

Then:
- A counter reads **DECISIONS ON THE WAY TO DONE**, climbing to 3.
- The prune folds inward, deepest branches first, so the tree collapses toward
  the route rather than blinking out.
- The surviving route **straightens**: its nodes tween to x=540 and the two
  middle stops shrink to nothing, so the forks are gone rather than hidden.
- The token replays the same journey with no pauses at all, and the counter
  reads **0 (was 3)**.

The DONE chip is placed when the token first arrives and never moves off the
route, which is what lets the fifth beat claim "same destination" honestly.

## Beats

| Time | Beat |
|---|---|
| 0.0 - 3.0 | Tree draws in by depth. "Ten ways to get there." |
| 3.0 - 7.6 | Token walks and hesitates. Each fork names its question: which format, which region, metric or imperial. Counter climbs to 3. |
| 7.6 - 10.4 | "The team could have answered *all three*." |
| 10.4 - 13.6 | Prune. "Pick a default. Delete the fork." |
| 13.6 - 16.4 | Route straightens, token replays with no stops, counter hits 0. "Now there is one clear path." |
| 16.4 - 19.2 | Takeaway, including the nuance that removing choices is not itself the goal. |

## Re-rendering

```bash
python3 -m pip install --break-system-packages imageio-ffmpeg
export FFMPEG_BIN=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")

node render.js --preview   # 6 key stills -> out/preview/
node render.js             # full mp4     -> out/
```

Editing:
- **Copy** - the `SC` array in `scene.html`.
- **Tree shape** - the build block; fan-outs are the arrays passed to `add`.
  `LY` sets the four row heights.
- **The surviving route** - `PATH`. Everything else (which edges light, which
  get pruned, where the asks sit) derives from it.
- **The walk** - `WALK` keyframes and `DECIDED` tick times. Lengthen a `wait`
  to make a fork feel more expensive.
- **Fork questions** - the three `.ask` divs.

Palette: no orange, no glows. Rose while the user is paying, blue once the
route is settled.

## Caption

See `post-caption.md`.
