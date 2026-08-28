/**
 * Renders scene.html to an H.264 MP4 by driving window.render(t) frame by frame.
 * Frames are captured at 2x and downscaled with lanczos, so type stays crisp.
 *
 *   node render.js              -> full video
 *   node render.js --preview    -> a few key stills into out/preview/
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const DIR = __dirname;
const W = 1080, H = 1350, FPS = 30, DSF = 2;
const OUT = path.join(DIR, 'out', 'complexity-transfer.mp4');
const FFMPEG = process.env.FFMPEG_BIN || 'ffmpeg';
const PREVIEW = process.argv.includes('--preview');

(async () => {
  const browser = await chromium.launch({
    args: ['--font-render-hinting=none', '--disable-lcd-text', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
  await page.goto('file://' + path.join(DIR, 'scene.html'));
  await page.evaluate(() => document.fonts.ready);
  const T = await page.evaluate(() => window.DURATION);

  if (PREVIEW) {
    const dir = path.join(DIR, 'out', 'preview');
    fs.mkdirSync(dir, { recursive: true });
    for (const t of [2.0, 5.2, 8.6, 11.8, 15.0, 18.2]) {
      await page.evaluate((v) => window.render(v), t);
      await page.screenshot({ path: path.join(dir, `t${String(t).replace('.', '_')}.png`) });
    }
    console.log('preview frames written');
    await browser.close();
    return;
  }

  const frames = Math.round(T * FPS);
  const ff = spawn(FFMPEG, [
    '-y',
    '-f', 'image2pipe', '-vcodec', 'png', '-framerate', String(FPS), '-i', 'pipe:0',
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
    '-shortest',
    '-vf', `scale=${W}:${H}:flags=lanczos,format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '19',
    '-profile:v', 'high', '-level', '4.0', '-g', String(FPS * 2),
    '-c:a', 'aac', '-b:a', '96k',
    '-movflags', '+faststart',
    OUT,
  ], { stdio: ['pipe', 'inherit', 'pipe'] });

  let ffErr = '';
  ff.stderr.on('data', (d) => { ffErr += d.toString(); });
  const done = new Promise((res, rej) => {
    ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c + '\n' + ffErr.slice(-3000)))));
  });

  const write = (buf) =>
    ff.stdin.write(buf) ? Promise.resolve() : new Promise((r) => ff.stdin.once('drain', r));

  const t0 = Date.now();
  for (let i = 0; i < frames; i++) {
    await page.evaluate((v) => window.render(v), i / FPS);
    await write(await page.screenshot({ type: 'png' }));
    if (i % 60 === 0) {
      const el = (Date.now() - t0) / 1000;
      console.log(`frame ${i}/${frames}  ${el.toFixed(0)}s  eta ${(el / (i + 1) * (frames - i)).toFixed(0)}s`);
    }
  }
  ff.stdin.end();
  await done;
  await browser.close();
  console.log(`done -> ${OUT}  (${frames} frames, ${(frames / FPS).toFixed(2)}s)`);
})().catch((e) => { console.error(e); process.exit(1); });
