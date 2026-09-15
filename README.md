# betterknow

> **所有能力自由驱动，随心接入任意大模型 · 面向下一代交互教学的 AI 教育平台**

**betterknow** 是一套现代化、深度交互的智能 AI 教育平台。平台以**第一性原理**和**苏格拉底教学法**为核心，打破传统一问一答式的碎片问答壁垒，通过**课程大纲规划**、**动态分步推演白板**、**自适应即时测验**与**考前高密度速查表**，为学习者构建结构化、体系化的认知跃迁闭环。

本项目已全面废除积分消耗与商业壁垒，采用 **BYOK（Bring Your Own Key）自由驱动架构**，支持接入 Kimi、OpenAI、DeepSeek、OneAPI 或本地私有大模型（Ollama / vLLM）。

---

## 🌟 核心特性

### 1. 🎓 专属课程体系打造 (Craft Courses)
- 输入任意主题、研学目标或专业学科，AI 自动进行网络调研、知识点拓扑排序，生成完整的单元（Unit）、讲次（Lecture）与细分课节（Session）。
- 每节课配套自动化生成的**随堂练习（Practice）**、**单元综合考试（Exam）**与**三阶段综合实战项目（Project）**。
- 支持课程材料增补上传（Upload Material），覆盖“整门课程”、“指定单元”与“指定讲次”多级范围定制。

### 2. 💡 苏格拉底认知梯子与即时协助 (Instant Assistance)
- 内置 **5 阶苏格拉底认知梯子**（直觉钩子 → 形式化公理定义 → 经典反直觉案例 → 认知反思 → 主动回忆自测）。
- 杜绝死记硬背，引导学习者在严密数学逻辑与物理直觉中发现底层规律。
- 自动生成单选、多选与填空测验题，支持即时打分、解析与盲区追问。

### 3. 🎨 动态白板推导课堂 (Interactive Whiteboard)
- 实时 WebSocket 流式推送分步板书推导。
- 深度支持 **LaTeX / KaTeX** 严密数学公式渲染、代码高亮沙箱与图形化思维导图。
- 老师与学生双向语音互动，支持暂停提问、标注高亮与推演回放。

### 4. 📄 深度学习工作台 (Deep Learn Session)
- 采用双栏工作台架构：左侧结构化任务大纲（Outline）分步追踪学习节点，右侧互动问答沉浸推演。
- 适合系统研读长篇科研论文、啃读复杂数学物理专著与工程架构方案。

### 5. 📑 考前高密度速查表 (Cheatsheet Generation)
- 一键将复杂知识模块浓缩为 2 页极高信息密度的 Markdown / PDF 速查表。
- 涵盖核心概念定义、常用计算公式、认知易错陷阱与速记心智模型。

### 6. 🔑 BYOK 终身自由驱动体系
- **零平台门槛**：所有教学技能、白板推演、课程生成全部免费开放。
- **自由模型接入**：支持 Moonshot / Kimi 长上下文大模型，或自定义 Base URL / API Key 接入兼容网关（OpenAI、DeepSeek、Qwen、Claude 等）。
- **本地私有化适配**：填入本地 Ollama 或 vLLM 地址，学习数据与私有课件 100% 留在本地。

---

## 🏗️ 架构设计

```
betterknow/
├── app/                       # 前端客户端 (React 19 + TypeScript + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/        # 弹窗、模态框、布局与基础 UI 控件
│   │   ├── pages/             # 首页、课程集市、白板课堂、深学工作台、导览等 44 个路由
│   │   ├── lib/               # API 通信层、状态管理与用户上下文
│   │   └── hooks/             # 交互动效与响应式适配 Hook
│   └── public/                # 动态视觉资产、插画与字体库
│
├── hyperclone/                # 核心服务端引擎
│   ├── server/
│   │   ├── src/
│   │   │   ├── agent/         # Director Agent 认知调度管线与 Socratic Ladder 实现
│   │   │   ├── rest.ts        # RESTful API 端点 (课程、练习、考试、日历、用户)
│   │   │   ├── ws.ts          # WebSocket 通信协议 (即时协助、白板、课程实时生成)
│   │   │   ├── store.ts       # 本地 JSON 状态持久化引擎
│   │   │   ├── providers/     # BYOK 大模型驱动网关
│   │   │   └── seedCourses.ts # 种子课程解析器与动态合成调度
│   │   ├── prompts/           # Socratic 系统提示词与 6 大核心教学技能 Prompt
│   │   └── seed/              # 34 门涵盖自然科学、计算机、人文社科的完整题库与课程数据
│   └── spec/                  # 接口协议与状态流转规格说明
│
└── agent-runtime/             # 独立 Agent 守护进程与工具链集成
```

---

## 🚀 快速开始

### 环境依赖
- **Node.js**: >= 20.0.0
- **npm** 或 **pnpm**

---

### 1. 启动后端服务

```bash
cd hyperclone/server

# 安装依赖
npm install

# 编译 TypeScript
npm run build

# 启动服务端 (默认运行于 http://127.0.0.1:8787)
npm start
```

> 服务端首次启动会自动在 `var/data/state.json` 中初始化默认开放用户与学习状态，开箱即用。

---

### 2. 启动前端客户端

打开新的终端窗口：

```bash
cd app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

启动后在浏览器中访问控制台打印的地址（通常为 `http://localhost:5173`）即可进入平台。

---

### 3. 构建生产版本

```bash
# 构建前端静态产物
cd app && npm run build

# 构建后端引擎
cd ../hyperclone/server && npm run build
```

---

## ⚙️ 模型配置 (BYOK)

平台支持在界面上无感配置与切换模型：

1. 进入首页，点击右上角的 **BYOK** 徽章或侧栏底部的 **模型与 BYOK**。
2. 选择模型服务提供商：
   - **Kimi / Moonshot**：填入官方 API Key。
   - **OpenAI 兼容 / 自定义网关**：填入 Base URL（例如 `https://api.deepseek.com/v1`）及对应的 API Key 与模型名称。
   - **离线模拟模式 (Stub)**：无需填写密钥，内置全套离线交互题库与教学样例，开箱即可体验完整流程。
3. 点击 **测试连通性**，确认通过后即刻全局生效。

---

## 📖 教学技能体系

Director Agent 内置 6 大教育交互技能：

| 技能名称 | 标识符 | 核心功能 |
| :--- | :--- | :--- |
| **概念拆解** | `conceptExplanation` | 苏格拉底认知梯子、第一性原理推导与自适应测验 |
| **体系深学** | `systematicLearning` | 多阶段章节规划、里程碑式学习与掌握度跟踪 |
| **白板教学** | `whiteboardSession` | 分步可视化板书、公式演算推导与图文结合 |
| **速查表生成** | `cheatsheetGeneration` | 核心考点提炼、关键公式图表与 2 页紧凑排版 |
| **文献导读** | `documentReading` | 论文与研报分节导读、背景剖析与方法论提炼 |
| **学习计划** | `planTasks` | 智能日历规划、任务分解与学习进度安排 |

---

## 📄 许可证

本项目遵循开源协作协议，欢迎广大教育科技探索者与开发者共同交流共建！
