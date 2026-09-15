import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ingestCourse } from "../domain/course.mjs";
import { createFolder, DEFAULT_QUOTA_BYTES, uploadFile } from "../domain/kb.mjs";

function catalog(payload, meta) {
  return { ...ingestCourse(payload), marketplace: true, ...meta };
}

export const MARKETPLACE = [
  catalog({
    courseUuid: "mkt-sociology",
    courseTitle: "社会学概论",
    courseDescription:
      "本课程全面探讨社会学的基本概念、理论和研究方法。课程将深入考察社会结构、文化和制度如何塑造个人生活与集体行为，旨在培养学生分析周遭世界所需的“社会学想象力”。",
    tags: ["社会学", "社会科学", "文化"],
    subject: "社会科学",
    level: "入门",
    hours: 60,
    joined: 1204,
    rating: 4.4,
    studio: "simo know studio",
    units: [
      {
        unitId: "unit1",
        title: "社会学视角",
        description: "介绍社会学想象力、核心理论范式与科学方法。",
        lectures: [
          {
            lectureId: "u1l1",
            title: "社会学思考",
            order: 1,
            sessions: [
              {
                sessionId: "soc-imagination",
                title: "社会学想象力",
                session_type: "whiteboard",
                description:
                  "学习 C. Wright Mills 提出的社会学想象力，区分个人困扰与公共议题。",
                references: [
                  {
                    referenceId: "ref-mills",
                    title: "C. Wright Mills, The Sociological Imagination",
                    usage: "本课核心文本",
                  },
                ],
                keyPoints: ["区分个人困扰与公共议题", "把私人传记接到社会历史结构"],
                boardImage: {
                  imageUrl: "/assets/learn-illustration.jpg",
                  caption: "传记与历史交叠",
                },
                practice: {
                  tasks: [
                    "把一件个人困扰改写成公共议题。",
                    "用失业的例子对照个人/公共两层解释。",
                  ],
                },
              },
              {
                sessionId: "soc-agency",
                title: "结构与能动性",
                session_type: "whiteboard",
                description: "社会既制约也促成行动。理解结构与能动性的张力。",
                practice: {
                  tasks: ["列出今天三个选择及其背后的结构。"],
                },
              },
            ],
          },
        ],
        projects: [
          {
            stage_id: "soc-project",
            stage_title: "社区案例研究",
            stage_description: "用社会学想象力观察一个本地群体。",
          },
        ],
        exams: [
          {
            examId: "soc-exam-1",
            title: "社会学视角综合考试",
            goal: "检验核心概念。",
            questions: [
              {
                id: "q1",
                type: "single",
                prompt: "社会学想象力首先要求你抓住什么？",
                options: ["一个孤立的私人故事", "个人经历与公共结构的交汇", "标准答案的背诵", "与结构无关的情绪"],
                correctAnswers: ["个人经历与公共结构的交汇"],
                explanation: "Mills 把 biography 和 history 交在一起。",
              },
              {
                id: "q2",
                type: "multiple",
                prompt: "哪些仍然属于社会学视角？",
                options: ["写出谁在行动", "指出约束来自哪一层结构", "只记录心情", "用一个自己的例子重述"],
                correctAnswers: ["写出谁在行动", "指出约束来自哪一层结构", "用一个自己的例子重述"],
                explanation: "测验看的是拆解与迁移。",
              },
              {
                id: "q3",
                type: "fill",
                prompt: "提出 sociological imagination 的学者是 ____。",
                correctAnswers: ["C. Wright Mills", "Mills", "赖特·米尔斯"],
                placeholder: "学者姓名",
                explanation: "C. Wright Mills。",
              },
            ],
          },
        ],
      },
    ],
    projects: [{ project_name: "社区案例研究", project_description: "田野观察 + 结构分析。" }],
  }, { level: "入门", hours: 60, joinedCount: 1204, rating: 4.4, studio: "simo know studio", coverSrc: "/assets/cover-sociology.jpg" }),
  catalog({
    courseUuid: "mkt-apbio",
    courseTitle: "AP Biology",
    courseDescription:
      "一门基于探究的课程，涵盖细胞、遗传学、进化、能量学、生物系统以及生态交互作用。",
    tags: ["生物学", "考试备考"],
    subject: "考试备考",
    level: "进阶",
    hours: 75,
    joined: 8161,
    rating: 4.6,
    studio: "simo know studio",
    units: [
      {
        unitId: "unit1",
        title: "Cells",
        description: "Membranes, organelles, and free energy.",
        lectures: [
          {
            lectureId: "bio-l1",
            title: "The cell as a system",
            order: 1,
            sessions: [
              {
                sessionId: "bio-membrane",
                title: "Membrane traffic",
                session_type: "whiteboard",
                description: "How selective permeability makes a cell a cell.",
                practice: { tasks: ["Contrast diffusion and active transport."] },
              },
            ],
          },
        ],
        projects: [{ stage_id: "bio-p1", stage_title: "Inquiry lab notebook" }],
        exams: [{ examId: "bio-e1", title: "Unit 1 FRQ" }],
      },
    ],
  }, { level: "进阶", hours: 75, joinedCount: 8161, rating: 4.6, studio: "simo know studio", coverSrc: "/assets/cover-biology.jpg" }),
  catalog({
    courseUuid: "mkt-ml",
    courseTitle: "机器学习",
    courseDescription:
      "从统计原理和泛化理论，到神经架构与部署策略，培养对核心算法的概念直觉。",
    tags: ["机器学习", "AI 与数据科学"],
    subject: "AI 与数据科学",
    level: "进阶",
    hours: 60,
    joined: 4224,
    rating: 4.4,
    studio: "simo know studio",
    units: [
      {
        unitId: "unit1",
        title: "泛化",
        description: "为什么模型能在未见过的数据上工作。",
        lectures: [
          {
            lectureId: "ml-l1",
            title: "Bias, variance, and the split",
            order: 1,
            sessions: [
              {
                sessionId: "ml-split",
                title: "Train / val / test",
                session_type: "whiteboard",
                description: "Hold-out is a claim about the future, not a ritual.",
                practice: { tasks: ["Explain leakage with one example."] },
              },
            ],
          },
        ],
        projects: [{ stage_id: "ml-p1", stage_title: "First baseline model" }],
        exams: [{ examId: "ml-e1", title: "泛化测验" }],
      },
    ],
  }, { level: "进阶", hours: 60, joinedCount: 4224, rating: 4.4, studio: "simo know studio", coverSrc: "/assets/cover-ml.jpg" }),
];

/** Open teaching extracts under fixtures/oer, seeded into every account drive. */
export const PUBLIC_TEXTBOOKS_FOLDER = "公开教材";

export const OER_GROUP_LABELS = {
  sociology: "社会学",
  stem: "STEM",
  "study-skills": "学习方法",
  calculus: "高等数学",
  "linear-algebra": "线性代数",
  physics: "大学物理",
  programming: "程序设计",
  "machine-learning": "机器学习",
  exams: "公开练习",
  statistics: "概率统计",
  chemistry: "普通化学",
};

const OER_SKIP_NAMES = new Set([
  "attribution.md",
  "license",
  "license.md",
  "license.txt",
  "readme.md",
  "harvest.md",
  "queue.md",
  "catalog.json",
]);

export function oerFixtureRoot() {
  return join(dirname(fileURLToPath(import.meta.url)), "../../fixtures/oer");
}

export function listOerFixtures(root = oerFixtureRoot()) {
  const groups = [];
  for (const ent of readdirSync(root, { withFileTypes: true })) {
    if (!ent.isDirectory() || ent.name.startsWith(".")) continue;
    const files = [];
    for (const f of readdirSync(join(root, ent.name), { withFileTypes: true })) {
      if (!f.isFile()) continue;
      if (OER_SKIP_NAMES.has(f.name.toLowerCase())) continue;
      if (!/\.(md|txt)$/i.test(f.name)) continue;
      const path = join(root, ent.name, f.name);
      files.push({
        group: ent.name,
        filename: f.name,
        relpath: `${ent.name}/${f.name}`,
        path,
        text: readFileSync(path, "utf8"),
      });
    }
    files.sort((a, b) => a.filename.localeCompare(b.filename));
    if (files.length) {
      groups.push({
        id: ent.name,
        name: OER_GROUP_LABELS[ent.name] || ent.name,
        files,
      });
    }
  }
  groups.sort((a, b) => a.id.localeCompare(b.id));
  return groups;
}

export function driveHasPublicTextbooks(drive) {
  return Object.values(drive?.nodes || {}).some(
    (n) => n.type === "directory" && n.name === PUBLIC_TEXTBOOKS_FOLDER && (n.parentId || null) === null,
  );
}

export function seedPublicTextbooks(drive, root = oerFixtureRoot()) {
  return syncPublicTextbooks(drive, root);
}

/** Add missing 公开教材 group folders/files without duplicating existing nodes. */
export function syncPublicTextbooks(drive, root = oerFixtureRoot()) {
  let d = drive;
  let changed = false;
  let rootFolder = Object.values(d.nodes || {}).find(
    (n) => n.type === "directory" && n.name === PUBLIC_TEXTBOOKS_FOLDER && (n.parentId || null) === null,
  );
  if (!rootFolder) {
    const rooted = createFolder(d, { name: PUBLIC_TEXTBOOKS_FOLDER });
    d = rooted.drive;
    rootFolder = rooted.folder;
    changed = true;
  }
  for (const g of listOerFixtures(root)) {
    let folder = Object.values(d.nodes || {}).find(
      (n) => n.type === "directory" && n.name === g.name && n.parentId === rootFolder.id,
    );
    if (!folder) {
      const folderRes = createFolder(d, { name: g.name, parentId: rootFolder.id });
      d = folderRes.drive;
      folder = folderRes.folder;
      changed = true;
    }
    const existing = new Set(
      Object.values(d.nodes || {})
        .filter((n) => n.type === "file" && n.parentId === folder.id)
        .map((n) => n.filename || n.name),
    );
    for (const f of g.files) {
      if (existing.has(f.filename)) continue;
      const up = uploadFile(d, {
        filename: f.filename,
        text: f.text,
        parentId: folder.id,
      });
      d = up.drive;
      changed = true;
    }
  }
  return changed ? d : drive;
}

export function seedDriveIfNeeded(drive, root = oerFixtureRoot()) {
  let next = drive;
  let changed = false;
  if ((next.quotaBytes ?? 0) < DEFAULT_QUOTA_BYTES) {
    next = { ...next, quotaBytes: DEFAULT_QUOTA_BYTES };
    changed = true;
  }
  const synced = syncPublicTextbooks(next, root);
  if (synced !== next) {
    next = synced;
    changed = true;
  }
  return changed ? next : drive;
}

export const SEED_ARTIFACTS = [
  {
    id: "art-soc-imagination",
    courseId: "mkt-sociology",
    sessionId: "soc-imagination",
    prompt: "社会学想象力",
    artifacts: {
      quiz: {
        kind: "quiz",
        title: "社会学想象力",
        questions: [
          {
            id: "q-mills-1",
            prompt: "社会学想象力首先要区分的是？",
            choices: ["个人困扰与公共议题", "城市与乡村", "理论与方法"],
            answer: 0,
          },
          {
            id: "q-mills-2",
            prompt: "把私人传记接到社会历史结构，说的是？",
            choices: ["心理测量", "社会学想象力", "市场调研"],
            answer: 1,
          },
        ],
      },
    },
  },
];
