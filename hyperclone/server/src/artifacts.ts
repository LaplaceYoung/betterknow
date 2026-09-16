import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
export interface PublicFile { id: string; filename: string; mime: string; data: Buffer }

export const publicFiles = new Map<string, PublicFile>();
export const diagrams = new Map<string, { md?: string; html?: string; png?: Buffer }>();

// A valid transparent 1x1 PNG.
export const placeholderPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64',
);
// Browsers using SpeechSynthesis do not decode this, but the URL remains fetchable.
export const placeholderWebm = Buffer.from('1a45dfa39f4286810142f7810142f2810442f2810842f2810842f281', 'hex');

// 产物文件持久化：原来只在内存 Map，进程一重启速查表/导出文件就 404。
// 自部署形态不接对象存储，落 `var/data/files/<id>`，元信息写同名 `.json`。
const filesDir = resolve(process.env.HYPERCLONE_DATA_DIR ?? 'var/data', 'files');

export async function persistPublicFile(file: { id: string; filename: string; mime: string; data: Buffer }): Promise<void> {
  await mkdir(filesDir, { recursive: true });
  await writeFile(resolve(filesDir, file.id), file.data);
  await writeFile(resolve(filesDir, `${file.id}.json`), JSON.stringify({ filename: file.filename, mime: file.mime }));
}

export async function readPersistedPublicFile(id: string): Promise<PublicFile | undefined> {
  try {
    const [data, meta] = await Promise.all([
      readFile(resolve(filesDir, id)),
      readFile(resolve(filesDir, `${id}.json`), 'utf8'),
    ]);
    const parsed = JSON.parse(meta) as { filename?: string; mime?: string };
    return { id, filename: parsed.filename ?? `${id}.md`, mime: parsed.mime ?? 'text/markdown; charset=utf-8', data };
  } catch {
    return undefined;
  }
}
