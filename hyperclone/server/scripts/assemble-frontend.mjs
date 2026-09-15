#!/usr/bin/env node
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../../..');
const publicRoot = join(scriptDir, '..', 'public');
const source = (name) => join(repoRoot, name);

for (const managed of ['assets/js', 'assets/css', 'font', 'fonts', 'index.html', '_asset_fetch_log.json']) {
  await rm(join(publicRoot, managed), { recursive: true, force: true });
}
await mkdir(publicRoot, { recursive: true });

// Remove only files mirrored from assets/img; downloaded onboarding/media files
// sharing pages/ or components/ are intentionally left in place.
const removeMirroredFiles = async (from, to) => {
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const sourcePath = join(from, entry.name);
    const targetPath = join(to, entry.name);
    if (entry.isDirectory()) await removeMirroredFiles(sourcePath, targetPath);
    else await rm(targetPath, { force: true });
  }
};
await removeMirroredFiles(source('assets/img'), publicRoot);

const copy = async (from, to) => {
  await mkdir(dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });
};

await copy(source('js_bundles'), join(publicRoot, 'assets', 'js'));
await copy(source('assets/css'), join(publicRoot, 'assets', 'css'));
await copy(source('assets/img'), publicRoot);
await copy(source('assets/index.html'), join(publicRoot, 'index.html'));
// Open-access: auto-provision a local token before the SPA boots (no login wall).
{
  const indexPath = join(publicRoot, 'index.html');
  const html = await readFile(indexPath, 'utf8');
  const snippet = `<script>try{if(!localStorage.getItem('access_token')){var x=new XMLHttpRequest();x.open('GET','/api/v1/auth/auto_token',false);x.send(null);var d=JSON.parse(x.responseText).data;localStorage.setItem('access_token',d.access_token);localStorage.setItem('refresh_token',d.refresh_token);localStorage.setItem('token_timestamp',String(Date.now()));}}catch(_){}</script>`;
  if (!html.includes('/api/v1/auth/auto_token')) await writeFile(indexPath, html.replace('<head>', `<head>\n    ${snippet}`), 'utf8');
}
await rm(join(publicRoot, '_asset_fetch_log.json'), { force: true });

const fontFiles = [
  ['assets/fonts/satoshi.css', 'font/Satoshi_Complete/Fonts/WEB/css/satoshi.css'],
  ['assets/fonts/eb-garamond.css', 'font/EB_Garamond/eb-garamond.css'],
  ['assets/fonts/misans.css', 'fonts/misans/misans.css'],
  ['assets/fonts/chill-duanhei-song.css', 'font/ChillDuanHeiSong/chill-duanhei-song.css'],
  ['assets/fonts/sawarabi-mincho.css', 'font/Sawarabi_Mincho/sawarabi-mincho.css'],
];
for (const [from, to] of fontFiles) await copy(source(from), join(publicRoot, to));
// Font binaries: families harvested into assets/fonts/bin; web-format bundles (KaTeX/Assistant/Virgil/Xiaolai) in assets/fonts/web.
for (const fam of ['Satoshi_Complete', 'EB_Garamond', 'ChillDuanHeiSong', 'Sawarabi_Mincho']) await copy(source(join('assets/fonts/bin', fam)), join(publicRoot, 'font', fam));
await copy(source('assets/fonts/bin/misans'), join(publicRoot, 'fonts', 'misans'));
for (const web of ['ttf', 'woff', 'woff2']) await copy(source(join('assets/fonts/web', web)), join(publicRoot, 'assets', web));

const replacements = [
  ['https://api.hyperknow.io', ''],
  ['wss://api.hyperknow.io', ''],
  ['http://api.hyperknow.io', ''],
  ['https://dev-api.hyperknow.io', ''],
  // 脱钩：Supabase/服务端原站宿主全部改指本地存根，运行时不再联系原站
  ['https://mcpbxxrodqgsmatssajx.supabase.co', 'http://127.0.0.1:8787/sb-stub'],
  ['wss://mcpbxxrodqgsmatssajx.supabase.co', 'ws://127.0.0.1:8787/sb-stub'],
  ['https://service.hyperknow.io', 'http://127.0.0.1:8787/sb-stub'],
  ['wss://service.hyperknow.io', 'ws://127.0.0.1:8787/sb-stub'],
  ['https://agent.hyperknow.io', ''],
  ['https://www.hyperknow.io', ''],
];
const jsRoot = join(publicRoot, 'assets', 'js');
const jsEntries = await readdir(jsRoot, { withFileTypes: true });
for (const entry of jsEntries) {
  if (!entry.isFile() || !entry.name.endsWith('.js')) continue;
  const path = join(jsRoot, entry.name);
  let text = await readFile(path, 'utf8');
  const counts = [];
  for (const [needle, replacement] of replacements) {
    const count = text.split(needle).length - 1;
    if (count) {
      text = text.replaceAll(needle, replacement);
    }
    counts.push(`${needle}=${count}`);
  }
  await writeFile(path, text);
  console.log(`rewrite ${relative(publicRoot, path)}: ${counts.join(' ')}`);
}

const favicon = join(publicRoot, 'hyperknow_logo.svg');
try {
  await readFile(favicon);
} catch {
  console.log('missing optional favicon: /hyperknow_logo.svg');
}
console.log(`assembled ${publicRoot}`);
