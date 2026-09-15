import assert from "node:assert/strict";
import test from "node:test";
import {
  createDrive,
  createFolder,
  DEFAULT_QUOTA_BYTES,
  deleteNode,
  listTree,
  queryTokens,
  readFile,
  searchFiles,
  stripAssistPrefix,
  teachingExcerpt,
  uploadFile,
  usedSourceBytes,
} from "../src/domain/kb.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";

test("create folder, upload file, list tree, search, delete", () => {
  let drive = createDrive({ quotaBytes: 10_000, ownerId: "u1" });
  const listed0 = listTree(drive);
  assert.equal(listed0.empty, true);
  assert.deepEqual(listed0.tree, []);
  assert.equal(listed0.usedBytes, 0);

  const folderRes = createFolder(drive, { directory_name: "SOC 101" });
  drive = folderRes.drive;
  assert.equal(folderRes.folder.type, "directory");
  assert.equal(folderRes.folder.name, "SOC 101");

  const text = "Mills: personal troubles vs public issues.";
  const up = uploadFile(drive, {
    filename: "mills.txt",
    text,
    parentId: folderRes.folder.id,
  });
  drive = up.drive;
  assert.equal(up.file.type, "file");
  assert.equal(up.file.name, "mills.txt");
  assert.equal(usedSourceBytes(drive), up.file.size);

  const tree = listTree(drive);
  assert.equal(tree.empty, false);
  assert.equal(tree.tree.length, 1);
  assert.equal(tree.tree[0].name, "SOC 101");
  assert.equal(tree.tree[0].children[0].name, "mills.txt");
  assert.equal(tree.usedBytes, up.file.size);

  const hits = searchFiles(drive, "public issues");
  assert.equal(hits.length, 1);
  assert.equal(hits[0].id, up.file.id);
  assert.match(hits[0].snippet, /public issues/);

  const read = readFile(drive, hits[0].id);
  assert.equal(read.ok, true);
  assert.equal(read.text, text);

  drive = deleteNode(drive, folderRes.folder.id);
  const after = listTree(drive);
  assert.equal(after.empty, true);
  assert.equal(usedSourceBytes(drive), 0);
  assert.equal(readFile(drive, up.file.id).ok, false);
});

test("quota overflow refuses the write", () => {
  let drive = createDrive({ quotaBytes: 20 });
  const first = uploadFile(drive, { filename: "a.txt", text: "12345" });
  drive = first.drive;
  assert.throws(
    () => uploadFile(drive, { filename: "b.txt", text: "this text is way too long for twenty bytes" }),
    (err) => {
      assert.equal(err.code, "QUOTA_EXCEEDED");
      assert.equal(err.quota, 20);
      assert.ok(err.used + err.size > 20);
      return true;
    },
  );
  assert.equal(listTree(drive).tree.length, 1);
  assert.equal(listTree(drive).tree[0].name, "a.txt");
});

test("createFolder requires a name", () => {
  const drive = createDrive();
  assert.throws(() => createFolder(drive, {}), (err) => err.code === "MISSING_DIRECTORY_NAME");
});

test("search tokens strip assist chips and expand 课表 names", () => {
  assert.equal(stripAssistPrefix("用粉笔把这个概念讲清楚：微积分"), "微积分");
  assert.equal(stripAssistPrefix("[stamp level=入门 style=直觉图像 focus=核心定义] 微积分"), "微积分");
  assert.ok(queryTokens("用粉笔把这个概念讲清楚：微积分").includes("limit"));
  assert.ok(queryTokens("public issues").includes("public"));
  assert.ok(queryTokens("public issues").includes("issues"));
  assert.ok(!queryTokens("explanation of mitosis").includes("explanation"));
});

test("OER drive retrieves 微积分 / Gauss without an exact-phrase match", () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "kb-oer" }));
  const py = searchFiles(drive, "字符串");
  assert.ok(py.length >= 1);
  assert.match(py[0].filename, /string|list|file/i);
  const integ = searchFiles(drive, "定积分");
  assert.ok(integ.length >= 1);
  assert.match(integ[0].filename, /integral|antiderivative|substitution/i);
  const calc = searchFiles(drive, "用粉笔把这个概念讲清楚：微积分");
  assert.ok(calc.length >= 1);
  assert.match(calc[0].filename, /limit|derivative|calculus/i);
  const gauss = searchFiles(drive, "高斯消元");
  assert.ok(gauss.length >= 1);
  assert.match(gauss[0].filename, /gauss/i);
  const stats = searchFiles(drive, "用粉笔把这个概念讲清楚：正态分布");
  assert.ok(stats.length >= 1);
  assert.match(stats[0].filename, /normal|central-limit|terminology/i);
  const chem = searchFiles(drive, "化学平衡");
  assert.ok(chem.length >= 1);
  assert.match(chem[0].filename, /equilibria|atomic|equation/i);
  const excerpt = teachingExcerpt(readFile(drive, calc[0].id).text);
  assert.ok(excerpt.length > 40);
  assert.doesNotMatch(excerpt, /License:/);
});

test("default source-byte quota is 32MB", () => {
  const drive = createDrive();
  assert.equal(DEFAULT_QUOTA_BYTES, 32 * 1024 * 1024);
  assert.equal(drive.quotaBytes, DEFAULT_QUOTA_BYTES);
  assert.equal(listTree(drive).quotaBytes, DEFAULT_QUOTA_BYTES);
});
