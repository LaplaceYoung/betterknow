/** Per-account knowledge-base / drive. Source-byte quota, folder tree, search. */

export const DEFAULT_QUOTA_BYTES = 32 * 1024 * 1024;

export function createDrive({ quotaBytes = DEFAULT_QUOTA_BYTES, ownerId = null } = {}) {
  return {
    ownerId,
    quotaBytes,
    nodes: {},
  };
}

export function usedSourceBytes(drive) {
  if (!drive?.nodes) return 0;
  return Object.values(drive.nodes)
    .filter((n) => n.type === "file")
    .reduce((sum, n) => sum + (n.size || 0), 0);
}

export function byteLength(text) {
  return new TextEncoder().encode(String(text ?? "")).length;
}

export function createFolder(drive, { name, directory_name, parentId = null } = {}) {
  const folderName = String(name || directory_name || "").trim();
  if (!folderName) {
    const err = new Error("directory_name required");
    err.code = "MISSING_DIRECTORY_NAME";
    throw err;
  }
  assertParent(drive, parentId);
  const id = `dir_${rand()}`;
  const node = {
    id,
    name: folderName,
    type: "directory",
    parentId: parentId || null,
    createdAt: now(),
  };
  return { drive: withNode(drive, node), folder: node };
}

export function uploadFile(drive, { filename, name, text = "", parentId = null } = {}) {
  const fileName = String(filename || name || "").trim();
  if (!fileName) {
    const err = new Error("filename required");
    err.code = "MISSING_FILENAME";
    throw err;
  }
  assertParent(drive, parentId);
  const size = byteLength(text);
  const used = usedSourceBytes(drive);
  if (used + size > (drive.quotaBytes ?? DEFAULT_QUOTA_BYTES)) {
    const err = new Error(
      `Quota exceeded: ${used + size} bytes would exceed ${drive.quotaBytes} source-byte quota.`,
    );
    err.code = "QUOTA_EXCEEDED";
    err.used = used;
    err.size = size;
    err.quota = drive.quotaBytes;
    throw err;
  }
  const id = `file_${rand()}`;
  const node = {
    id,
    name: fileName,
    filename: fileName,
    type: "file",
    ext: extOf(fileName),
    size,
    text: String(text),
    parentId: parentId || null,
    status: "ready",
    createdAt: now(),
  };
  return { drive: withNode(drive, node), file: publicFile(node) };
}

export function deleteNode(drive, id) {
  if (!drive?.nodes?.[id]) {
    const err = new Error(`Unknown node ${id}`);
    err.code = "NOT_FOUND";
    throw err;
  }
  const drop = new Set(collectDescendants(drive, id));
  const nodes = {};
  for (const [k, v] of Object.entries(drive.nodes)) {
    if (!drop.has(k)) nodes[k] = v;
  }
  return { ...drive, nodes };
}

export function listTree(drive) {
  const safe = drive || createDrive();
  const nodes = Object.values(safe.nodes || {});
  const childrenOf = (parentId) =>
    nodes
      .filter((n) => (n.parentId || null) === parentId)
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
        return String(a.name).localeCompare(String(b.name));
      })
      .map((n) =>
        n.type === "directory"
          ? { id: n.id, name: n.name, type: "directory", children: childrenOf(n.id) }
          : publicFile(n),
      );
  const usedBytes = usedSourceBytes(safe);
  return {
    tree: childrenOf(null),
    usedBytes,
    quotaBytes: safe.quotaBytes ?? DEFAULT_QUOTA_BYTES,
    empty: nodes.length === 0,
  };
}

const CHIP_PREFIXES = [
  /用粉笔把这个概念讲清楚[:：]?\s*/g,
  /帮我做一张两页速查表[:：]?\s*/g,
  /帮我消化这份长材料[:：]?\s*/g,
  /帮我一步步解这道题[:：]?\s*/g,
  /把这个过程画成粉笔示意图[:：]?\s*/g,
  /Walk this concept on the board:\s*/gi,
  /Make me a two-page cheatsheet:\s*/gi,
  /Digest this long source:\s*/gi,
  /Solve this step by step:\s*/gi,
  /Sketch this as a chalkboard diagram:\s*/gi,
];

const STOP = new Set(
  `a an the of to in on for and or is are was be this that what how why with from about your my me please help explanation concept walk board chalkboard sketch diagram solve step digest source make page cheatsheet question study just can you 帮我 这个 一份 这道 这节 一下 什么是 如何 怎么 请 把 的 了 吗 呢 啊 吧 讲清楚 概念 过程 示意图 材料 速查表 一步步 这道题`.split(
    /\s+/,
  ),
);

/** CN 课表 / 讲法 → English stems that appear in the legal OER extracts. */
export const TEACHING_ALIASES = {
  极限: ["limit"],
  导数: ["derivative"],
  微积分: ["calculus", "limit", "derivative", "integral"],
  高等数学: ["calculus", "limit", "derivative", "integral"],
  积分: ["integral", "antiderivative"],
  不定积分: ["antiderivative"],
  定积分: ["definite integral"],
  换元: ["substitution"],
  高斯: ["gauss"],
  线性代数: ["gauss", "vector", "linear"],
  牛顿: ["newton"],
  大学物理: ["newton", "energy", "harmonic"],
  变量: ["variable"],
  函数: ["function"],
  迭代: ["iteration"],
  程序设计: ["python", "variable", "function", "string", "list"],
  字符串: ["string"],
  列表: ["list"],
  文件读写: ["file"],
  过拟合: ["overfitting", "generalization"],
  机器学习: ["regression", "generalization"],
  线性回归: ["linear regression"],
  社会学: ["sociology", "mills"],
  想象力: ["imagination"],
  细胞膜: ["membrane"],
  概率统计: ["probability", "normal", "central limit"],
  正态分布: ["normal", "z-score"],
  中心极限: ["central limit"],
  概率: ["probability", "sample space"],
  普通化学: ["atomic", "equation", "equilibria"],
  化学平衡: ["equilibria", "equilibrium"],
  原子结构: ["atomic", "symbolism"],
  化学方程式: ["balancing", "equation"],
};

export function stripAssistPrefix(query = "") {
  let s = String(query || "");
  for (const re of CHIP_PREFIXES) s = s.replace(re, "");
  s = s.replace(/\[chip:[a-z]+\]/gi, "");
  s = s.replace(/\[speed:fast\]/gi, "");
  s = s.replace(/\[stamp\s+[^\]]*\]/gi, "");
  s = s.replace(/^Create a chalkboard whiteboard lesson for:\s*/i, "");
  return s.replace(/\s+/g, " ").trim();
}

export function queryTokens(query = "") {
  const stripped = stripAssistPrefix(query);
  const lower = stripped.toLowerCase();
  const tokens = [];
  for (const m of lower.matchAll(/[a-z][a-z0-9_-]{2,}/g)) {
    if (!STOP.has(m[0])) tokens.push(m[0]);
  }
  for (const m of stripped.matchAll(/[\u4e00-\u9fff]{2,}/g)) {
    if (!STOP.has(m[0])) tokens.push(m[0]);
  }
  const expanded = [];
  for (const t of tokens) {
    expanded.push(t);
    for (const [cn, en] of Object.entries(TEACHING_ALIASES)) {
      if (t === cn || t.includes(cn) || (cn.length >= 2 && cn.includes(t))) {
        expanded.push(...en.map((a) => String(a).toLowerCase()));
      }
    }
  }
  if (!expanded.length && stripped.length >= 2) expanded.push(lower);
  return [...new Set(expanded)];
}

export function teachingExcerpt(text = "", limit = 360) {
  const parts = String(text || "").split(/^---\s*$/m);
  const body = parts.length > 1 ? parts.slice(1).join("\n") : String(text || "");
  const cleaned = body
    .split("\n")
    .filter(
      (line) =>
        !/^(Title|Book|Authors|Publisher|License|License URL|Source|Access for free at|Course-aliases|Extract):/i.test(
          line.trim(),
        ),
    )
    .join("\n")
    .replace(/^#+\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, limit);
}

export function searchFiles(drive, query) {
  const tokens = queryTokens(query);
  if (!tokens.length || !drive?.nodes) return [];
  const scored = [];
  for (const n of Object.values(drive.nodes)) {
    if (n.type !== "file") continue;
    const name = String(n.name || "").toLowerCase();
    const text = String(n.text || "").toLowerCase();
    let score = 0;
    let hit = "";
    for (const t of tokens) {
      if (!t) continue;
      if (name.includes(t)) {
        score += 5;
        hit = hit || t;
      }
      if (text.includes(t)) {
        score += 1;
        hit = hit || t;
      }
    }
    if (score > 0) {
      scored.push({
        id: n.id,
        fileId: n.id,
        filename: n.name,
        size: n.size,
        score,
        snippet: snippet(n.text, hit || tokens[0]),
      });
    }
  }
  scored.sort((a, b) => b.score - a.score || String(a.filename).localeCompare(String(b.filename)));
  return scored.slice(0, 8);
}

export function readFile(drive, fileId) {
  const n = drive?.nodes?.[fileId];
  if (!n || n.type !== "file") return { ok: false, text: "", fileId: fileId || null };
  return {
    ok: true,
    fileId: n.id,
    filename: n.name,
    text: n.text,
    size: n.size,
  };
}

function publicFile(n) {
  return {
    id: n.id,
    name: n.name,
    filename: n.filename || n.name,
    type: "file",
    ext: n.ext,
    size: n.size,
    status: n.status || "ready",
    parentId: n.parentId || null,
  };
}

function withNode(drive, node) {
  return { ...drive, nodes: { ...drive.nodes, [node.id]: node } };
}

function assertParent(drive, parentId) {
  if (!parentId) return;
  const p = drive.nodes[parentId];
  if (!p || p.type !== "directory") {
    const err = new Error(`Unknown folder ${parentId}`);
    err.code = "NOT_FOUND";
    throw err;
  }
}

function collectDescendants(drive, id) {
  const ids = [id];
  for (const n of Object.values(drive.nodes)) {
    if (n.parentId === id) ids.push(...collectDescendants(drive, n.id));
  }
  return ids;
}

function snippet(text, q) {
  const s = String(text || "");
  const i = s.toLowerCase().indexOf(q);
  if (i < 0) return s.slice(0, 120);
  const start = Math.max(0, i - 40);
  return s.slice(start, start + 160);
}

function extOf(name) {
  const m = String(name).match(/(\.[A-Za-z0-9]+)$/);
  return m ? m[1].toLowerCase() : "";
}

function rand() {
  return Math.random().toString(36).slice(2, 10);
}

function now() {
  return new Date().toISOString();
}
