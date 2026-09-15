// 白板互动动画：线上把「互动动画」作为自包含 HTML 下发（`animation_pending` → `generated_animation{html}`）。
// 契约：单文件、无外部依赖、CSP 允许的内联 style/script，直接在 iframe 里跑。
import type { ByokConfig } from './config.js';
import { chat } from './llm.js';

// 线上实测的 CSP（r26_animation.html）：不允许任何外部资源，只放行内联脚本与样式
export const ANIMATION_CSP = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; base-uri 'none'; form-action 'none'";

export const ANIMATION_CONTRACT = `互动动画：输出一个**完整可运行的单文件 HTML**，用于课堂上的可操作演示。
要求：
1. 只用内联 <style> 与 <script>，不得引用任何外部资源（图片用内联 SVG 或 data: URI）；
2. 页面里必须有一个可交互控件（滑杆 / 按钮 / 拖拽），拖动时画面实时变化；
3. 视觉克制：浅色背景、留白充足、中文字体，配色用 --bg/--fg/--accent 三个变量；
4. 画布尺寸自适应容器，禁止滚动条与外部导航；
5. 输出 HTML 源码本身，不要 Markdown 代码块、不要解释。`;

// 本地兜底动画：没有模型时也给一个真能动的演示（同一条 CSP 约束下自包含）
export function localAnimationHtml(input: { title: string; task: string; language?: string }): string {
  const title = input.title.replace(/[<>&]/g, '');
  const task = input.task.replace(/[<>&]/g, '').slice(0, 120);
  return `<!DOCTYPE html>
<html lang="zh">
<head><meta http-equiv="Content-Security-Policy" content="${ANIMATION_CSP}">
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  :root { --bg:#faf9f7; --fg:#2f2a24; --muted:#8a7a5c; --accent:#c2562c; --line:#e2d7c3; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--fg); font:14px/1.6 ui-sans-serif, system-ui, "PingFang SC", sans-serif; padding:20px; }
  h1 { font-size:16px; margin:0 0 6px; }
  p.task { color:var(--muted); margin:0 0 16px; font-size:12px; }
  .stage { display:flex; gap:18px; align-items:flex-end; height:220px; padding:16px; border:1px solid var(--line); border-radius:14px; background:#fff; }
  .bar { width:54px; border-radius:8px 8px 0 0; background:var(--accent); transition:height .12s ease; }
  .bar.second { background:#3f5f8a; }
  .readout { display:flex; gap:16px; margin-top:14px; }
  .card { flex:1; border:1px solid var(--line); border-radius:12px; padding:10px 12px; background:#fff; }
  .card b { display:block; font-size:18px; }
  .card span { color:var(--muted); font-size:11px; }
  label { display:block; margin-top:14px; font-size:12px; color:var(--muted); }
  input[type=range] { width:100%; accent-color:var(--accent); }
</style></head>
<body>
  <h1>${title}</h1>
  <p class="task">${task}</p>
  <div class="stage"><div class="bar" id="a"></div><div class="bar second" id="b"></div></div>
  <div class="readout">
    <div class="card"><b id="va">0</b><span>状态 A</span></div>
    <div class="card"><b id="vb">0</b><span>状态 B</span></div>
    <div class="card"><b id="sum">0</b><span>叠加结果</span></div>
  </div>
  <label>相位 / 强度 <input id="phase" type="range" min="0" max="100" value="30"></label>
  <label>耦合系数 <input id="couple" type="range" min="0" max="100" value="70"></label>
<script>
  var phase = document.getElementById('phase'), couple = document.getElementById('couple');
  function render() {
    var p = Number(phase.value) / 100, c = Number(couple.value) / 100;
    var a = Math.abs(Math.cos(Math.PI * p)), b = Math.abs(Math.sin(Math.PI * p) * c);
    var sum = Math.abs(a + b * Math.cos(Math.PI * p)) + Math.abs(a - b * Math.cos(Math.PI * p));
    document.getElementById('a').style.height = (20 + a * 180) + 'px';
    document.getElementById('b').style.height = (20 + b * 180) + 'px';
    document.getElementById('va').textContent = a.toFixed(2);
    document.getElementById('vb').textContent = b.toFixed(2);
    document.getElementById('sum').textContent = sum.toFixed(2);
  }
  phase.addEventListener('input', render); couple.addEventListener('input', render); render();
</script>
</body></html>`;
}

function extractHtml(raw: string): string | undefined {
  const fenced = raw.match(/```(?:html)?\s*([\s\S]*?)```/);
  const body = fenced?.[1] ?? raw;
  const start = body.indexOf('<!DOCTYPE');
  const alt = start >= 0 ? start : body.indexOf('<html');
  if (alt < 0) return undefined;
  const html = body.slice(alt).trim();
  return html.length > 400 && html.includes('</html>') ? html : undefined;
}

// 有 LLM 就让模型写，没有就用本地兜底；两种情况都保证 CSP 与自包含
export async function buildAnimation(input: { title: string; task: string; board: string; language?: string; eff?: ByokConfig }): Promise<{ html: string; stub: boolean }> {
  const fallback = { html: localAnimationHtml(input), stub: true };
  const eff = input.eff;
  if (!eff || eff.provider === 'stub') return fallback;
  try {
    const raw = await chat([
      { role: 'system', content: `${ANIMATION_CONTRACT}\nCSP 必须是：${ANIMATION_CSP}` },
      { role: 'user', content: `课程主题：${input.title}\n本页板书：${input.board.slice(0, 600)}\n演示任务：${input.task}\n语言：${input.language ?? 'Chinese'}` },
    ], 'content', eff);
    const html = extractHtml(raw);
    return html ? { html, stub: false } : fallback;
  } catch { return fallback; }
}
