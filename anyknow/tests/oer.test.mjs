import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
import test from "node:test";
import { createDrive, DEFAULT_QUOTA_BYTES, listTree, uploadFile, usedSourceBytes } from "../src/domain/kb.mjs";
import {
  driveHasPublicTextbooks,
  listOerFixtures,
  oerFixtureRoot,
  PUBLIC_TEXTBOOKS_FOLDER,
  seedDriveIfNeeded,
  seedPublicTextbooks,
} from "../src/server/seed.mjs";

const fixtureRoot = oerFixtureRoot();
const skipNames = new Set([
  "attribution.md",
  "license.md",
  "license.txt",
  "license",
  "readme.md",
  "harvest.md",
  "queue.md",
  "catalog.json",
]);

function teachingFiles(dir = fixtureRoot, acc = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) teachingFiles(path, acc);
    else if (/\.(md|txt)$/i.test(name) && !skipNames.has(name.toLowerCase())) acc.push(path);
  }
  return acc;
}

test("seeded OER files exist on disk with license and source URL", () => {
  const files = teachingFiles();
  assert.ok(files.length >= 6 && files.length <= 80, `expected 6–80 teaching files, got ${files.length}`);
  let total = 0;
  for (const path of files) {
    const text = readFileSync(path, "utf8");
    const bytes = Buffer.byteLength(text, "utf8");
    total += bytes;
    assert.match(text, /License:\s*.*(CC BY|Creative Commons|CC0|Public Domain)/i);
    assert.match(text, /Source:\s*https:\/\//);
    if (/OpenStax/i.test(text)) {
      assert.match(text, /Access for free at:\s*https:\/\/openstax\.org/);
    }
    assert.doesNotMatch(text, /Hyperknow|Orbie/i);
    assert.doesNotMatch(text, /sci-hub|library genesis|z-library|annas-archive|zlib/i);
  }
  assert.ok(total < 8 * 1024 * 1024, `teaching extracts should stay under 8MB, got ${total}`);
  assert.ok(statSync(join(fixtureRoot, "ATTRIBUTION.md")).isFile());
  assert.ok(statSync(join(fixtureRoot, "LICENSE.md")).isFile());
  assert.ok(statSync(join(fixtureRoot, "sociology", "01-what-is-sociology.md")).isFile());
});

test("OER fixtures contain no Hyperknow/Orbie trademarks", () => {
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(md|txt)$/i.test(name)) {
        const text = readFileSync(path, "utf8");
        assert.doesNotMatch(text, /Hyperknow|Orbie/i, path);
      }
    }
  }
  walk(fixtureRoot);
});

test("ingest/seed puts OER files under 公开教材", () => {
  const groups = listOerFixtures();
  assert.ok(groups.some((g) => g.id === "sociology" && g.name === "社会学"));
  assert.ok(groups.some((g) => g.id === "stem" && g.name === "STEM"));
  assert.ok(groups.some((g) => g.id === "study-skills" && g.name === "学习方法"));
  assert.ok(groups.some((g) => g.id === "calculus" && g.name === "高等数学"));
  assert.ok(groups.some((g) => g.id === "linear-algebra" && g.name === "线性代数"));
  assert.ok(groups.some((g) => g.id === "physics" && g.name === "大学物理"));
  assert.ok(groups.some((g) => g.id === "programming" && g.name === "程序设计"));
  assert.ok(groups.some((g) => g.id === "machine-learning" && g.name === "机器学习"));
  assert.ok(groups.some((g) => g.id === "exams" && g.name === "公开练习"));
  assert.ok(groups.some((g) => g.id === "statistics" && g.name === "概率统计"));
  assert.ok(groups.some((g) => g.id === "chemistry" && g.name === "普通化学"));
  const expectedFiles = groups.flatMap((g) => g.files.map((f) => f.filename));
  assert.ok(expectedFiles.includes("01-what-is-sociology.md"));
  assert.ok(expectedFiles.includes("05-what-is-culture.md"));
  assert.ok(expectedFiles.includes("06-elements-of-culture.md"));
  assert.ok(expectedFiles.includes("07-why-socialization-matters.md"));
  assert.ok(expectedFiles.includes("08-types-of-groups.md"));
  assert.ok(expectedFiles.includes("09-formal-organizations.md"));
  assert.ok(expectedFiles.includes("10-deviance-and-control.md"));
  assert.ok(expectedFiles.includes("biology-5-1-membrane-structure.md"));
  assert.ok(expectedFiles.includes("college-success-taking-notes.md"));
  assert.ok(expectedFiles.includes("writing-guide-thinking-critically.md"));
  assert.ok(expectedFiles.includes("2-2-the-limit-of-a-function.md"));
  assert.ok(expectedFiles.includes("3-1-defining-the-derivative.md"));
  assert.ok(expectedFiles.includes("5-3-the-fundamental-theorem-of-calculus.md"));
  assert.ok(expectedFiles.includes("4-10-antiderivatives.md"));
  assert.ok(expectedFiles.includes("5-2-the-definite-integral.md"));
  assert.ok(expectedFiles.includes("5-5-substitution.md"));
  assert.ok(expectedFiles.includes("3-6-the-chain-rule.md"));
  assert.ok(expectedFiles.includes("3-8-implicit-differentiation.md"));
  assert.ok(expectedFiles.includes("4-1-related-rates.md"));
  assert.ok(expectedFiles.includes("one-i-1-gauss-method.md"));
  assert.ok(expectedFiles.includes("one-i-2-describing-solution-set.md"));
  assert.ok(expectedFiles.includes("one-i-3-general-particular-homogeneous.md"));
  assert.ok(expectedFiles.includes("two-i-1-vector-space.md"));
  assert.ok(expectedFiles.includes("two-i-2-subspaces.md"));
  assert.ok(expectedFiles.includes("two-ii-1-linear-independence.md"));
  assert.ok(expectedFiles.includes("two-iii-1-basis.md"));
  assert.ok(expectedFiles.includes("two-iii-2-dimension.md"));
  assert.ok(expectedFiles.includes("three-ii-1-homomorphisms.md"));
  assert.ok(expectedFiles.includes("5-3-newtons-second-law.md"));
  assert.ok(expectedFiles.includes("8-3-conservation-of-energy.md"));
  assert.ok(expectedFiles.includes("15-1-simple-harmonic-motion.md"));
  assert.ok(expectedFiles.includes("7-1-work.md"));
  assert.ok(expectedFiles.includes("7-2-kinetic-energy.md"));
  assert.ok(expectedFiles.includes("7-3-work-energy-theorem.md"));
  assert.ok(expectedFiles.includes("9-1-linear-momentum.md"));
  assert.ok(expectedFiles.includes("9-2-impulse-and-collisions.md"));
  assert.ok(expectedFiles.includes("9-3-conservation-of-linear-momentum.md"));
  assert.ok(expectedFiles.includes("02-variables.md"));
  assert.ok(expectedFiles.includes("04-functions.md"));
  assert.ok(expectedFiles.includes("05-iterations.md"));
  assert.ok(expectedFiles.includes("06-strings.md"));
  assert.ok(expectedFiles.includes("07-files.md"));
  assert.ok(expectedFiles.includes("08-lists.md"));
  assert.ok(expectedFiles.includes("03-conditional.md"));
  assert.ok(expectedFiles.includes("09-dictionaries.md"));
  assert.ok(expectedFiles.includes("10-tuples.md"));
  assert.ok(expectedFiles.includes("introduction.md"));
  assert.ok(expectedFiles.includes("linear-regression.md"));
  assert.ok(expectedFiles.includes("generalization.md"));
  assert.ok(expectedFiles.includes("softmax-regression.md"));
  assert.ok(expectedFiles.includes("softmax-regression-scratch.md"));
  assert.ok(expectedFiles.includes("softmax-regression-concise.md"));
  assert.ok(expectedFiles.includes("mlp.md"));
  assert.ok(expectedFiles.includes("mlp-implementation.md"));
  assert.ok(expectedFiles.includes("backprop.md"));
  assert.ok(expectedFiles.includes("physics-5-3-problems.md"));
  assert.ok(expectedFiles.includes("hefferon-gauss-exercises.md"));
  assert.ok(expectedFiles.includes("d2l-linear-regression-exercises.md"));
  assert.ok(expectedFiles.includes("3-1-terminology.md"));
  assert.ok(expectedFiles.includes("6-1-the-standard-normal-distribution.md"));
  assert.ok(expectedFiles.includes("7-1-the-central-limit-theorem.md"));
  assert.ok(expectedFiles.includes("2-3-atomic-structure-and-symbolism.md"));
  assert.ok(expectedFiles.includes("4-1-writing-and-balancing-chemical-equations.md"));
  assert.ok(expectedFiles.includes("13-1-chemical-equilibria.md"));
  assert.ok(!expectedFiles.includes("ATTRIBUTION.md"));

  const drive = seedPublicTextbooks(createDrive({ ownerId: "oer-user" }));
  assert.equal(driveHasPublicTextbooks(drive), true);
  const tree = listTree(drive);
  assert.equal(tree.empty, false);
  assert.equal(tree.tree.length, 1);
  assert.equal(tree.tree[0].name, PUBLIC_TEXTBOOKS_FOLDER);
  assert.equal(tree.tree[0].type, "directory");
  const childNames = tree.tree[0].children.map((c) => c.name);
  assert.ok(childNames.includes("STEM"));
  assert.ok(childNames.includes("学习方法"));
  assert.ok(childNames.includes("社会学"));
  assert.ok(childNames.includes("高等数学"));
  assert.ok(childNames.includes("线性代数"));
  assert.ok(childNames.includes("大学物理"));
  assert.ok(childNames.includes("程序设计"));
  assert.ok(childNames.includes("机器学习"));
  assert.ok(childNames.includes("公开练习"));
  assert.ok(childNames.includes("概率统计"));
  assert.ok(childNames.includes("普通化学"));
  const allFiles = [];
  for (const folder of tree.tree[0].children) {
    assert.equal(folder.type, "directory");
    for (const f of folder.children) {
      assert.equal(f.type, "file");
      allFiles.push(f.name);
    }
  }
  assert.deepEqual(allFiles.sort(), expectedFiles.slice().sort());
  assert.equal(allFiles.length, teachingFiles().length);
  assert.ok(tree.usedBytes > 0);
  assert.equal(tree.usedBytes, usedSourceBytes(drive));
  assert.ok(tree.quotaBytes >= DEFAULT_QUOTA_BYTES);

  const soc = tree.tree[0].children.find((c) => c.name === "社会学");
  const mills = drive.nodes[soc.children.find((c) => c.name === "01-what-is-sociology.md").id];
  assert.match(mills.text, /sociological imagination/i);
  assert.match(mills.text, /C\. Wright Mills/);
  assert.match(mills.text, /License:/);
  assert.match(mills.text, /openstax\.org/);
  const culture = drive.nodes[soc.children.find((c) => c.name === "05-what-is-culture.md").id];
  assert.match(culture.text, /ethnocentrism/i);
  assert.match(culture.text, /License:/);
  assert.match(culture.text, /openstax\.org/);
  assert.match(culture.text, /社会学原理/);
  assert.match(culture.text, /Access for free at:\s*https:\/\/openstax\.org/);
  const typesOfGroups = drive.nodes[soc.children.find((c) => c.name === "08-types-of-groups.md").id];
  assert.match(typesOfGroups.text, /primary groups/i);
  assert.match(typesOfGroups.text, /License:/);
  assert.match(typesOfGroups.text, /openstax\.org/);
  assert.match(typesOfGroups.text, /社会学原理/);
  assert.match(typesOfGroups.text, /Access for free at:\s*https:\/\/openstax\.org/);
  const deviance = drive.nodes[soc.children.find((c) => c.name === "10-deviance-and-control.md").id];
  assert.match(deviance.text, /deviance/i);
  assert.match(deviance.text, /social control/i);
  assert.match(deviance.text, /License:/);
  assert.match(deviance.text, /openstax\.org/);
  assert.match(deviance.text, /社会学原理/);
  assert.match(deviance.text, /Access for free at:\s*https:\/\/openstax\.org/);

  const calc = tree.tree[0].children.find((c) => c.name === "高等数学");
  const der = drive.nodes[calc.children.find((c) => c.name === "3-1-defining-the-derivative.md").id];
  assert.match(der.text, /difference quotient/i);
  assert.match(der.text, /License:/);
  assert.match(der.text, /openstax\.org/);
  assert.match(der.text, /高等数学A/);
  const chain = drive.nodes[calc.children.find((c) => c.name === "3-6-the-chain-rule.md").id];
  assert.match(chain.text, /chain rule/i);
  assert.match(chain.text, /License:/);
  assert.match(chain.text, /openstax\.org/);
  assert.match(chain.text, /高等数学A/);
  assert.match(chain.text, /Access for free at:\s*https:\/\/openstax\.org/);

  const linalg = tree.tree[0].children.find((c) => c.name === "线性代数");
  const gauss = drive.nodes[linalg.children.find((c) => c.name === "one-i-1-gauss-method.md").id];
  assert.match(gauss.text, /Gauss's Method/i);
  assert.match(gauss.text, /License:/);
  assert.match(gauss.text, /hefferon\.net/);
  assert.match(gauss.text, /线性代数/);
  assert.doesNotMatch(gauss.text, /OpenStax/i);
  const subsp = drive.nodes[linalg.children.find((c) => c.name === "two-i-2-subspaces.md").id];
  assert.match(subsp.text, /subspace/i);
  assert.match(subsp.text, /License:/);
  assert.match(subsp.text, /hefferon\.net/);
  assert.match(subsp.text, /线性代数/);
  assert.doesNotMatch(subsp.text, /OpenStax/i);
  const linind = drive.nodes[linalg.children.find((c) => c.name === "two-ii-1-linear-independence.md").id];
  assert.match(linind.text, /linearly independent/i);
  assert.match(linind.text, /License:/);
  assert.match(linind.text, /hefferon\.net/);
  assert.match(linind.text, /线性代数/);
  assert.doesNotMatch(linind.text, /OpenStax/i);
  const basis = drive.nodes[linalg.children.find((c) => c.name === "two-iii-1-basis.md").id];
  assert.match(basis.text, /basis/i);
  assert.match(basis.text, /License:/);
  assert.match(basis.text, /hefferon\.net/);
  assert.match(basis.text, /线性代数/);
  assert.doesNotMatch(basis.text, /OpenStax/i);
  const dim = drive.nodes[linalg.children.find((c) => c.name === "two-iii-2-dimension.md").id];
  assert.match(dim.text, /dimension/i);
  assert.match(dim.text, /finite-dimensional/i);
  assert.match(dim.text, /License:/);
  assert.match(dim.text, /hefferon\.net/);
  assert.match(dim.text, /线性代数/);
  assert.doesNotMatch(dim.text, /OpenStax/i);

  const phys = tree.tree[0].children.find((c) => c.name === "大学物理");
  const n2 = drive.nodes[phys.children.find((c) => c.name === "5-3-newtons-second-law.md").id];
  assert.match(n2.text, /Newton's second law/i);
  assert.match(n2.text, /License:/);
  assert.match(n2.text, /openstax\.org/);
  assert.match(n2.text, /大学物理/);
  assert.match(n2.text, /Access for free at:\s*https:\/\/openstax\.org/);
  const mom = drive.nodes[phys.children.find((c) => c.name === "9-1-linear-momentum.md").id];
  assert.match(mom.text, /momentum/i);
  assert.match(mom.text, /License:/);
  assert.match(mom.text, /openstax\.org/);
  assert.match(mom.text, /大学物理/);
  assert.match(mom.text, /Access for free at:\s*https:\/\/openstax\.org/);

  const prog = tree.tree[0].children.find((c) => c.name === "程序设计");
  const vars = drive.nodes[prog.children.find((c) => c.name === "02-variables.md").id];
  assert.match(vars.text, /floating[\s-]*point/i);
  assert.match(vars.text, /License:/);
  assert.match(vars.text, /py4e\.com/);
  assert.match(vars.text, /程序设计/);
  assert.doesNotMatch(vars.text, /OpenStax/i);
  const dicts = drive.nodes[prog.children.find((c) => c.name === "09-dictionaries.md").id];
  assert.match(dicts.text, /key-value pair/i);
  assert.match(dicts.text, /License:/);
  assert.match(dicts.text, /py4e\.com/);
  assert.match(dicts.text, /程序设计/);
  assert.doesNotMatch(dicts.text, /OpenStax/i);

  const ml = tree.tree[0].children.find((c) => c.name === "机器学习");
  const gen = drive.nodes[ml.children.find((c) => c.name === "generalization.md").id];
  assert.match(gen.text, /overfitting/i);
  assert.match(gen.text, /License:/);
  assert.match(gen.text, /d2l\.ai/);
  assert.match(gen.text, /机器学习导论/);
  assert.doesNotMatch(gen.text, /OpenStax/i);
  const mlp = drive.nodes[ml.children.find((c) => c.name === "mlp.md").id];
  assert.match(mlp.text, /multilayer perceptron/i);
  assert.match(mlp.text, /License:/);
  assert.match(mlp.text, /d2l\.ai/);
  assert.match(mlp.text, /机器学习导论/);
  assert.doesNotMatch(mlp.text, /OpenStax/i);
  const softmaxScratch = drive.nodes[ml.children.find((c) => c.name === "softmax-regression-scratch.md").id];
  assert.match(softmaxScratch.text, /softmax/i);
  assert.match(softmaxScratch.text, /cross-entropy/i);
  assert.match(softmaxScratch.text, /License:/);
  assert.match(softmaxScratch.text, /d2l\.ai/);
  assert.match(softmaxScratch.text, /机器学习导论/);
  assert.doesNotMatch(softmaxScratch.text, /OpenStax/i);
  const mlpImpl = drive.nodes[ml.children.find((c) => c.name === "mlp-implementation.md").id];
  assert.match(mlpImpl.text, /hidden layer/i);
  assert.match(mlpImpl.text, /License:/);
  assert.match(mlpImpl.text, /d2l\.ai/);
  assert.match(mlpImpl.text, /机器学习导论/);
  assert.doesNotMatch(mlpImpl.text, /OpenStax/i);

  const exams = tree.tree[0].children.find((c) => c.name === "公开练习");
  const n2p = drive.nodes[exams.children.find((c) => c.name === "physics-5-3-problems.md").id];
  assert.match(n2p.text, /net external force/i);
  assert.match(n2p.text, /License:/);
  assert.match(n2p.text, /openstax\.org/);
  assert.match(n2p.text, /大学物理/);
  assert.match(n2p.text, /Access for free at:\s*https:\/\/openstax\.org/);

  const stats = tree.tree[0].children.find((c) => c.name === "概率统计");
  const clt = drive.nodes[stats.children.find((c) => c.name === "7-1-the-central-limit-theorem.md").id];
  assert.match(clt.text, /central limit theorem/i);
  assert.match(clt.text, /License:/);
  assert.match(clt.text, /openstax\.org/);
  assert.match(clt.text, /概率统计/);
  assert.match(clt.text, /Access for free at:\s*https:\/\/openstax\.org/);

  const chem = tree.tree[0].children.find((c) => c.name === "普通化学");
  const atom = drive.nodes[chem.children.find((c) => c.name === "2-3-atomic-structure-and-symbolism.md").id];
  assert.match(atom.text, /atomic mass/i);
  assert.match(atom.text, /License:/);
  assert.match(atom.text, /openstax\.org/);
  assert.match(atom.text, /普通化学/);
  assert.match(atom.text, /Access for free at:\s*https:\/\/openstax\.org/);

  const again = seedPublicTextbooks(drive);
  assert.equal(again, drive);
  assert.equal(listTree(again).tree.length, 1);
});

test("first drive create / seedDriveIfNeeded raises quota and is idempotent", () => {
  const small = createDrive({ quotaBytes: 1024, ownerId: "u-small" });
  const seeded = seedDriveIfNeeded(small);
  assert.equal(seeded.quotaBytes, DEFAULT_QUOTA_BYTES);
  assert.equal(driveHasPublicTextbooks(seeded), true);
  const second = seedDriveIfNeeded(seeded);
  assert.equal(second, seeded);
});

test("quota still rejects oversized writes after OER seed", () => {
  const seeded = seedPublicTextbooks(createDrive());
  const used = usedSourceBytes(seeded);
  const tight = { ...seeded, quotaBytes: used + 40 };
  assert.throws(
    () => uploadFile(tight, { filename: "overflow.txt", text: "n".repeat(80) }),
    (err) => {
      assert.equal(err.code, "QUOTA_EXCEEDED");
      assert.equal(err.quota, used + 40);
      assert.ok(err.used + err.size > used + 40);
      return true;
    },
  );
  assert.equal(usedSourceBytes(tight), used);
  assert.equal(listTree(tight).tree[0].name, PUBLIC_TEXTBOOKS_FOLDER);
});
