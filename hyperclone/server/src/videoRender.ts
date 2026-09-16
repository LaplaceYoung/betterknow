// 教学视频渲染：按幕渲染（manim 风格数学幕 / remotion 风格 HTML 幕），再用 ffmpeg 合成。
// 线上（r36 实测）逐幕用 manim 与 remotion 渲染后合成：
//   Scene 2 (manim) rendered successfully - 1/4 completed / Scene 1 (remotion) rendered successfully - 4/4 completed
// 本仓用同一套逐幕思路：数学幕用 KaTeX + 时间轴寻帧，HTML 幕用 Chromium 逐帧截图，
// 两者都靠 ffmpeg 编码与合成。没有 Chromium 时回落到纯 ffmpeg 渲染（消息里标注 fallback）。
import { execFile } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  join(process.env.HOME ?? '', 'Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'),
  join(process.env.HOME ?? '', 'Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].filter((value): value is string => Boolean(value));

let chromeCache: string | undefined | null = null;

export function chromiumPath(): string | undefined {
  if (chromeCache !== null) return chromeCache;
  chromeCache = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  return chromeCache;
}

export async function ffmpegPath(): Promise<string | undefined> {
  try { const { stdout } = await run(process.platform === 'win32' ? 'where' : 'which', ['ffmpeg']); return stdout.trim().split(/\r?\n/)[0] || undefined; } catch { return undefined; }
}

// KaTeX 资源来自前端依赖：数学幕不引网络字体，直接内联样式与脚本
async function katexAssets(): Promise<{ css: string; js: string } | undefined> {
  const base = resolve(process.env.KATEX_DIR ?? join(process.cwd(), '..', '..', 'app', 'node_modules', 'katex', 'dist'));
  try {
    const css = await readFile(join(base, 'katex.min.css'), 'utf8');
    const js = await readFile(join(base, 'katex.min.js'), 'utf8');
    return { css, js };
  } catch { return undefined; }
}

const PALETTE = { bg: '#F2EBE1', panel: '#E8DFCF', ink: '#3C3633', muted: '#5A534E', border: '#C8BCA7', accent: '#A65A4B' };

export interface MathScene { engine: 'manim'; title: string; narration: string; latex: string[]; seconds?: number }
export interface HtmlScene { engine: 'remotion'; title: string; narration: string; html: string; seconds?: number }
export type VideoScene = MathScene | HtmlScene;

// 数学幕：一行行推导出现，配合进度条与幕标题；用 hash 里的 t 参数寻帧
export async function mathSceneHtml(scene: MathScene): Promise<string> {
  const assets = await katexAssets();
  const lines = scene.latex.slice(0, 8);
  return `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><style>
  body { margin:0; width:100vw; height:100vh; background:${PALETTE.bg}; color:${PALETTE.ink}; font:16px/1.6 ui-sans-serif, system-ui, "PingFang SC", sans-serif; display:flex; flex-direction:column; padding:48px 64px; }
  h1 { font-size:28px; margin:0 0 24px; font-weight:650; }
  ul { list-style:none; padding:0; margin:0; flex:1; display:flex; flex-direction:column; gap:18px; }
  li { font-size:26px; opacity:0; transform:translateY(8px); transition:none; }
  li.on { opacity:1; transform:none; }
  .bar { height:6px; background:${PALETTE.border}; border-radius:3px; overflow:hidden; }
  .bar > i { display:block; height:100%; width:0; background:${PALETTE.accent}; }
  ${assets ? assets.css : ''}
</style></head>
<body>
  <h1>${scene.title.replace(/[<>&]/g, '')}</h1>
  <ul id="lines">${lines.map((line) => `<li data-tex="${line.replace(/"/g, '&quot;')}"></li>`).join('')}</ul>
  <div class="bar"><i id="prog"></i></div>
<script>${assets ? assets.js : ''}</script>
<script>
  var total = ${Math.round((scene.seconds ?? 4) * 1000)};
  var nodes = [].slice.call(document.querySelectorAll('#lines li'));
  nodes.forEach(function (node) {
    var tex = node.getAttribute('data-tex') || '';
    if (window.katex) { try { node.innerHTML = katex.renderToString(tex, { throwOnError: false, displayMode: true }); } catch (e) { node.textContent = tex; } }
    else { node.textContent = tex; }
  });
  window.__seek = function (ms) {
    var progress = Math.max(0, Math.min(1, ms / total));
    var visible = Math.min(nodes.length, Math.floor(progress * (nodes.length + 0.35)) + 1);
    nodes.forEach(function (node, index) { node.className = index < visible ? 'on' : ''; });
    document.getElementById('prog').style.width = (progress * 100) + '%';
  };
  var hash = /t=(\\d+)/.exec(location.hash || '');
  window.__seek(hash ? Number(hash[1]) : total);
</script>
</body></html>`;
}

export interface FrameOptions { width?: number; height?: number; fps?: number; seconds: number }

// 逐帧截图：每次加载都带 #t=<ms>，页面用 __seek 冻结到该时刻
export async function renderFrames(html: string, dir: string, opts: FrameOptions): Promise<number> {
  const chrome = chromiumPath();
  if (!chrome) return 0;
  const width = opts.width ?? 1280; const height = opts.height ?? 720; const fps = opts.fps ?? 12;
  await mkdir(dir, { recursive: true });
  const pagePath = join(dir, 'scene.html');
  await writeFile(pagePath, html, 'utf8');
  const total = Math.max(1, Math.round(opts.seconds * fps));
  for (let index = 0; index < total; index += 1) {
    const ms = Math.round((index / fps) * 1000);
    const frame = join(dir, `frame_${String(index).padStart(4, '0')}.png`);
    await run(chrome, [
      '--headless', '--disable-gpu', '--hide-scrollbars', '--no-sandbox',
      `--screenshot=${frame}`, `--window-size=${width},${height}`, '--virtual-time-budget=350',
      `file://${pagePath}#t=${ms}`,
    ], { maxBuffer: 4 * 1024 * 1024 }).catch(() => undefined);
    if (!existsSync(frame)) return index;
  }
  return total;
}

// 单幕编码（有旁白就一起mux）
export async function encodeScene(framesDir: string, fps: number, outPath: string, audioPath?: string): Promise<boolean> {
  const ffmpeg = await ffmpegPath();
  if (!ffmpeg) return false;
  const args = ['-y', '-framerate', String(fps), '-i', join(framesDir, 'frame_%04d.png')];
  if (audioPath) args.push('-i', audioPath);
  args.push('-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart');
  if (audioPath) args.push('-c:a', 'aac', '-shortest');
  args.push(outPath);
  try { await run(ffmpeg, args, { maxBuffer: 16 * 1024 * 1024 }); return existsSync(outPath); } catch { return false; }
}

export async function concatScenes(parts: string[], outPath: string): Promise<boolean> {
  const ffmpeg = await ffmpegPath();
  if (!ffmpeg || !parts.length) return false;
  const listPath = join(tmpdir(), `betterknow-concat-${Date.now()}.txt`);
  await writeFile(listPath, parts.map((part) => `file '${part.replace(/'/g, "'\\''")}'`).join('\n'), 'utf8');
  try {
    await run(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c', 'copy', outPath], { maxBuffer: 16 * 1024 * 1024 });
    await rm(listPath, { force: true });
    return existsSync(outPath);
  } catch {
    // 编码参数不一致时 concat 复制会失败，退回重编码
    try {
      await run(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p', outPath], { maxBuffer: 16 * 1024 * 1024 });
      await rm(listPath, { force: true });
      return existsSync(outPath);
    } catch { await rm(listPath, { force: true }); return false; }
  }
}

export async function sceneWorkDir(): Promise<string> {
  const dir = join(tmpdir(), `betterknow-video-${Date.now()}-${Math.round(Math.random() * 1e6)}`);
  await mkdir(dir, { recursive: true });
  return dir;
}

export async function cleanup(dir: string): Promise<void> { await rm(dir, { recursive: true, force: true }); }

// 供测试与诊断：列出可用的渲染引擎
export async function rendererStatus(): Promise<{ chromium?: string; ffmpeg?: string; katex: boolean }> {
  const katex = await katexAssets();
  return { chromium: chromiumPath(), ffmpeg: await ffmpegPath(), katex: Boolean(katex) };
}

export async function frameCount(dir: string): Promise<number> {
  try { return readdirSync(dir).filter((name) => name.startsWith('frame_')).length; } catch { return 0; }
}

export async function fileSize(path: string): Promise<number> {
  try { await access(path); return (await readFile(path)).length; } catch { return 0; }
}
