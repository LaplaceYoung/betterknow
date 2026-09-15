// 白板媒体层：图片与 TTS 音频的落盘 + 读取 + 计数口径。
// 自部署形态下不接对象存储：一律写本地 `var/data/whiteboard/**`，由 REST 路由直接回源。
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dataDir = resolve(process.env.HYPERCLONE_DATA_DIR ?? 'var/data');
const imageDir = resolve(dataDir, 'whiteboard/images');
const audioDir = resolve(dataDir, 'whiteboard/audio');

const MIME: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml', webm: 'audio/webm', mp3: 'audio/mpeg', m4a: 'audio/mp4', wav: 'audio/wav', ogg: 'audio/ogg' };

export function mimeFor(name: string): string { return MIME[name.split('.').pop()?.toLowerCase() ?? ''] ?? 'application/octet-stream'; }
export function hash32(buf: Buffer): string { return createHash('sha256').update(buf).digest('hex').slice(0, 32); }

// ── 尺寸探测（不引依赖：PNG 读 IHDR，JPEG 扫 SOF，SVG 读 width/height 属性）──
export function pngSize(buf: Buffer): { width: number; height: number } | undefined {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return undefined;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
export function jpegSize(buf: Buffer): { width: number; height: number } | undefined {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return undefined;
  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) { offset += 1; continue; }
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    offset += 2 + length;
  }
  return undefined;
}
export function svgSize(buf: Buffer): { width: number; height: number } | undefined {
  const head = buf.toString('utf8', 0, 400);
  const w = /width="(\d+(?:\.\d+)?)"/.exec(head); const h = /height="(\d+(?:\.\d+)?)"/.exec(head);
  const view = /viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/.exec(head);
  const width = Number(w?.[1] ?? view?.[1]); const height = Number(h?.[1] ?? view?.[2]);
  return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0 ? { width: Math.round(width), height: Math.round(height) } : undefined;
}
export function measure(buf: Buffer, ext: string): { width: number; height: number } | undefined {
  if (ext === 'png') return pngSize(buf);
  if (ext === 'jpg' || ext === 'jpeg') return jpegSize(buf);
  if (ext === 'svg') return svgSize(buf);
  return undefined;
}

// ── 白板图片 ──
export interface StoredImage { name: string; url: string; width: number; height: number; mime: string; stub: boolean }

export async function saveWhiteboardImage(bytes: Buffer, ext: string, stub = false): Promise<StoredImage> {
  const name = `${hash32(bytes)}.${ext}`;
  await mkdir(imageDir, { recursive: true });
  await writeFile(resolve(imageDir, name), bytes);
  const size = measure(bytes, ext) ?? { width: 512, height: 512 };
  return { name, url: `/api/v1/whiteboard/images/${name}`, width: size.width, height: size.height, mime: mimeFor(name), stub };
}

export async function readWhiteboardImage(name: string): Promise<{ bytes: Buffer; mime: string } | undefined> {
  if (!/^[A-Za-z0-9_.-]{1,80}$/.test(name)) return undefined;
  try { return { bytes: await readFile(resolve(imageDir, name)), mime: mimeFor(name) }; } catch { return undefined; }
}

// 未配置图像模型时的兜底：可读的 SVG 占位（带 caption，浏览器 <img> 直接渲染）
export function placeholderImageSvg(caption: string, prompt: string): Buffer {
  const escape = (v: string): string => v.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] ?? c);
  const wrap = (text: string, perLine: number, maxLines: number): string[] => {
    const chars = [...text];
    const lines: string[] = [];
    for (let i = 0; i < chars.length && lines.length < maxLines; i += perLine) lines.push(chars.slice(i, i + perLine).join(''));
    return lines;
  };
  const captionLines = wrap(escape(caption || '白板示意图'), 22, 2);
  const promptLines = wrap(escape(prompt), 34, 3);
  const body = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">`,
    `<rect width="512" height="512" fill="#ffffff"/>`,
    `<rect x="12" y="12" width="488" height="488" fill="none" stroke="#d4d4d8" stroke-width="2" stroke-dasharray="10 8" rx="16"/>`,
    ...captionLines.map((line, index) => `<text x="256" y="${210 + index * 34}" font-family="ui-sans-serif, system-ui" font-size="26" font-weight="600" fill="#18181b" text-anchor="middle">${line}</text>`),
    ...promptLines.map((line, index) => `<text x="256" y="${286 + index * 26}" font-family="ui-sans-serif, system-ui" font-size="17" fill="#71717a" text-anchor="middle">${line}</text>`),
    `<text x="256" y="452" font-family="ui-sans-serif, system-ui" font-size="14" fill="#a1a1aa" text-anchor="middle">未配置图像模型 · BYOK_IMAGE_API_KEY</text>`,
    `</svg>`,
  ].join('');
  return Buffer.from(body, 'utf8');
}

// ── TTS 音频 ──
export async function writeTtsAudio(userId: string, sessionId: string, filename: string, bytes: Buffer): Promise<string> {
  const dir = resolve(audioDir, userId, sessionId);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, filename), bytes);
  return `/api/v1/whiteboard/audio-stream/${userId}/${sessionId}/${filename}`;
}

export async function readTtsAudio(userId: string, sessionId: string, filename: string): Promise<Buffer | undefined> {
  if (!/^[A-Za-z0-9_.-]{1,120}$/.test(filename)) return undefined;
  try { return await readFile(resolve(audioDir, userId, sessionId, filename)); } catch { return undefined; }
}

// 线上口径实测（r19）：tts_cjk = CJK 字符数；tts_latin = 拉丁字母数。
export function ttsCounts(text: string): { tts_cjk: number; tts_latin: number } {
  return {
    tts_cjk: (text.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/g) ?? []).length,
    tts_latin: (text.match(/[A-Za-z]/g) ?? []).length,
  };
}

export function audioFileName(userId: string, sessionId: string, sequence: number, text: string, ext: string): string {
  const prefix = sessionId.split('-')[0] ?? 'session';
  return `tts_${prefix}_${sequence}_${hash32(Buffer.from(`${sessionId}:${sequence}:${text}`)).slice(0, 6)}.${ext}`;
}
