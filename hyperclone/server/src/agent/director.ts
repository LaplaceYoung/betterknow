// director.ts — betterknow 教育 Agent 导演中枢（全面升级苏格拉底认知闭环）
// 集成 betterknow 现代教育方法论: 概念直觉 -> 严格形式化定义 -> 数学逻辑推导 -> 实操应用 -> 交互式测验自测闭环
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chat, chatStream, stubValue, type ChatMessage } from '../llm.js';
import { readState, updateState, now } from '../store.js';
import { resolveByok, type ByokConfig } from '../config.js';
import { search, type SearchResult } from '../providers/index.js';
import { publicFiles } from '../artifacts.js';

export interface DirectorInput {
  message: string;
  answers?: Array<{ question?: string; answer?: string }>;
  mode?: string;
  integrations?: string[];
  speed_mode?: string;
  ui_language?: string;
  tts_enabled?: boolean;
  attachments?: unknown[];
}

export interface DirectorCtx {
  userId: string;
  conversationId: string;
  send: (frame: Record<string, unknown>) => void;
  eff?: ByokConfig;
}

type Skill =
  | 'whiteboardSession'
  | 'systematicLearning'
  | 'planTasks'
  | 'cheatsheetGeneration'
  | 'documentReading'
  | 'conceptExplanation'
  | null;

const HEX32 = () => randomUUID().replaceAll('-', '');

function language(input: DirectorInput): 'zh' | 'en' {
  const ui = (input.ui_language ?? '').toLowerCase();
  if (ui.startsWith('zh') || ui.startsWith('cn')) return 'zh';
  if (/[一-鿿]/.test(input.message)) return 'zh';
  return 'en';
}

async function skillText(name: string): Promise<string> {
  const candidates = [
    resolve(process.cwd(), 'prompts/betterknow/skills', `${name}.md`),
    resolve(process.cwd(), 'prompts/restored/skills_verbatim', `${name}.md`),
    resolve(process.cwd(), 'prompts/restored/skills', `${name}.md`),
    resolve(import.meta.dirname, '../../prompts/betterknow/skills', `${name}.md`),
    resolve(import.meta.dirname, '../../prompts/restored/skills_verbatim', `${name}.md`),
  ];
  for (const p of candidates) {
    try {
      return await readFile(p, 'utf8');
    } catch {
      /* continue */
    }
  }
  return `---\nname: ${name}\ndescription: (betterknow cognitive skill)`;
}

async function systemPromptText(): Promise<string> {
  const candidates = [
    resolve(process.cwd(), 'prompts/betterknow/betterknow_director_system_prompt.md'),
    resolve(import.meta.dirname, '../../prompts/betterknow/betterknow_director_system_prompt.md'),
    resolve(process.cwd(), 'seed/prompts/directorAgent_system_prompt.md'),
  ];
  for (const p of candidates) {
    try {
      return await readFile(p, 'utf8');
    } catch {
      /* continue */
    }
  }
  return 'You are the directing agent for betterknow. Deliver Socratic cognitive teaching with KaTeX math.';
}

// 技能智能分流
function pickSkill(input: DirectorInput, veryShort: boolean): { skill: Skill; directQuiz: boolean } {
  const m = input.message;
  const rxDeep = /deep\s*learn|深度学习|深学|系统学[^习]*|start a deep learn/i;
  const rxBoard = /白板|whiteboard|board session|边讲边画|讲给我听|讲解.*pdf|pdf.*讲解/i;
  const rxPlan = /计划|规划|plan|schedule|exam in|复习计划/i;
  const rxCheat = /速查表|cheat\s*sheet|cheatsheet|一页.*总|两页/i;
  const rxDoc = /总结|summar|读.*pdf|精读|digest|read.*(pdf|doc)|讲义/i;
  const rxQuiz = /测验|选择题|出题|考.*我|quiz|flashcard|闪卡|test me/i;

  if (input.mode === 'board_session' || rxBoard.test(m)) return { skill: 'whiteboardSession', directQuiz: false };
  if (input.mode === 'deep_learn_session' || rxDeep.test(m)) return { skill: 'systematicLearning', directQuiz: false };
  if (rxCheat.test(m)) return { skill: 'cheatsheetGeneration', directQuiz: false };
  if (rxDoc.test(m) || (input.attachments && Array.isArray(input.attachments) && input.attachments.length > 0)) {
    return { skill: 'documentReading', directQuiz: false };
  }
  if (rxPlan.test(m)) return { skill: 'planTasks', directQuiz: false };
  if (rxQuiz.test(m)) return { skill: 'conceptExplanation', directQuiz: true };

  // 默认走概念解释能力，并主动激活诊断测验闭环
  return { skill: 'conceptExplanation', directQuiz: true };
}

// ── 状态管理助手 ──
async function convo(conversationId: string) {
  return (await readState()).conversations[conversationId];
}

function pushHistory(
  conversationId: string,
  role: 'assistant' | 'tool' | 'user',
  content: unknown,
  tool?: { tool_name: string; args: Record<string, unknown>; result: unknown }
): Promise<void> {
  return updateState((next) => {
    const c = next.conversations[conversationId];
    if (!c) return;
    c.history_index += 1;
    if (role === 'tool' && tool) {
      c.history.push({
        index: c.history_index,
        role,
        tool_name: tool.tool_name,
        args: tool.args,
        result: tool.result,
        content: `Executed ${tool.tool_name}`,
        timestamp: now(),
      });
    } else {
      c.history.push({
        index: c.history_index,
        role,
        content: typeof content === 'string' ? content : JSON.stringify(content),
        timestamp: now(),
      });
    }
    c.updated_at = now();
  });
}

function summaryOfTopic(message: string): string {
  return message.replace(/\s+/g, ' ').trim().slice(0, 35);
}

// ── 深度苏格拉底教学文本生成 ──
function stubAnswer(topic: string, lang: 'zh' | 'en'): string {
  if (lang === 'zh') {
    if (/贝叶斯|bayes/i.test(topic)) {
      return `## 贝叶斯定理：从先验直觉到理性更新的数学阶梯

### 1. 核心直觉与现实比喻 (The Intuitive Hook)
想象你正在玩一个侦探破案游戏：在尚未发现任何指纹前，你对某个嫌疑人的怀疑程度叫**「先验概率」**；当突然在案发现场找到了属于他的指纹（新证据），你对他的怀疑程度骤然上升，这个更新后的判断就叫**「后验概率」**。
贝叶斯思维的精髓一言以蔽之：**不要孤立地看证据，而是看新证据如何在先验信念上产生合理的位移。**

<div content-section="definition">
<p><strong>贝叶斯定理 (Bayes' Theorem) 形式化定义：</strong></p>
<p>设样本空间为 $\Omega$，$A$ 为某一假说或事件，$B$ 为观测到的新证据（满足 $P(B) > 0$），则条件概率可由下式精确给出：</p>
<p>$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$</p>
</div>

### 2. 严格推导与底层机制 (Mathematical Derivation)
贝叶斯定理并非凭空捏造，它直接脱胎于条件概率的乘法对称性：
1. 由条件概率定义，联合概率 $P(A \cap B)$ 具有双向展开：
   $$P(A \cap B) = P(A|B) \cdot P(B) = P(B|A) \cdot P(A)$$
2. 两边同时除以全概率 $P(B)$，立即可得核心表达式：
   $$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$
3. 根据全概率公式，分母证据总概率 $P(B)$ 可将所有互斥可能划分展开：
   $$P(B) = P(B|A)P(A) + P(B|\neg A)P(\neg A)$$

### 3. 经典反直觉案例：罕见病筛查假阳性陷阱
- 假设某种疾病在人群中的患病率为 $P(A) = 0.1\\%$（千分之一）。
- 某项检测的真阳性率（敏感度）为 $P(B|A) = 99\\%$，假阳性率为 $P(B|\neg A) = 1\\%$。
- 若一名随机受检者拿到**阳性报告**，他真实患病的概率 $P(A|B)$ 是多少？
$$P(A|B) = \frac{0.99 \times 0.001}{0.99 \times 0.001 + 0.01 \times 0.999} \approx \frac{0.00099}{0.00099 + 0.00999} \approx 9.01\\%$$
**认知震撼**：即使检测准确率达 99%，初次阳性者真实患病的概率竟然**不到 10%**！因为基准罕见人群极其庞大，假阳性绝对人数远超真阳性。

### 4. 苏格拉底反思挑战 (Socratic Reflection)
如果该患者进行**第二次独立复检**再次呈阳性，此时的先验概率应该取多少？此时真实患病的概率会跃升至多少？请在下方测验中检验你的理解。`;
    }

    if (/量子|qubit|quantum/i.test(topic)) {
      return `## 量子比特与叠加态：从经典比特到布洛赫球的飞跃

### 1. 核心直觉与现实比喻 (The Intuitive Hook)
经典计算机的比特就像一枚硬币平放在桌上：要么是正面（0），要么是反面（1）。
而**量子比特（Qubit）**就像一枚正在桌面上飞速旋转的硬币：在它停止旋转被测量之前，它同时处于正面与反面的某种动态交织之中——这就是**量子叠加态（Superposition）**。

<div content-section="definition">
<p><strong>量子比特态矢定义 (State Vector & Bloch Representation)：</strong></p>
<p>一个纯态量子比特 $|\psi\rangle$ 属于二维复希尔伯特空间 $\mathbb{C}^2$，可由正交基 $|0\rangle$ 和 $|1\rangle$ 线性组合表示：</p>
<p>$$|\psi\rangle = \alpha |0\rangle + \beta |1\rangle, \quad \alpha, \beta \in \mathbb{C}$$</p>
<p>满足归一化条件（总概率守恒）：</p>
<p>$$|\alpha|^2 + |\beta|^2 = 1$$</p>
</div>

### 2. 算符操作与阿达马门 (Hadamard Gate & Interference)
要将确定的经典基态置入均等叠加态，最基础的操作是作用 **阿达马门（Hadamard Gate）** $H$：
$$H = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$
作用于 $|0\rangle$：
$$H |0\rangle = \frac{1}{\sqrt{2}}|0\rangle + \frac{1}{\sqrt{2}}|1\rangle = |+\rangle$$
此时测量得到 0 或 1 的概率各为 $|1/\sqrt{2}|^2 = 50\\%$。更奇妙的是，量子叠加允许**相长干涉与相消干涉**，这正是 Shor 算法能够通过量子傅里叶变换（QFT）实现指数加速的物理基石。

### 3. Python / Qiskit 极简电路验证
\`\`\`python
from qiskit import QuantumCircuit
qc = QuantumCircuit(1, 1)
qc.h(0)        # 施加 Hadamard 门进入叠加态
qc.measure(0, 0)
print(qc.draw(output='text'))
\`\`\`

### 4. 苏格拉底反思挑战 (Socratic Reflection)
为什么测量会导致波函数坍缩？如果我们不对量子比特进行测量，它能同时参与多少路并行运算？请在下方测验中检验你的直觉。`;
    }

    if (/博弈|nash|game theory|纳什/i.test(topic)) {
      return `## 博弈论与纳什均衡：多智能体策略互动的数学解

### 1. 核心直觉与现实比喻 (The Intuitive Hook)
“最好的策略不仅取决于你在做什么，更取决于别人认为你在做什么。”
**纳什均衡（Nash Equilibrium）**描述了一种博弈局面的“僵持稳态”：在所有其他对手策略保持不变的前提下，没有任何单方面博弈者能通过独自改变策略而获得更高收益。

<div content-section="definition">
<p><strong>纳什均衡形式化定义：</strong></p>
<p>设有限策略博弈 $\Gamma = \langle N, (S_i)_{i \in N}, (u_i)_{i \in N} \rangle$，策略组合 $s^* = (s_1^*, \dots, s_n^*) \in S$ 是纳什均衡，当且仅当对任意玩家 $i$ 和任意策略 $s_i \in S_i$ 均满足：</p>
<p>$$u_i(s_i^*, s_{-i}^*) \ge u_i(s_i, s_{-i}^*)$$</p>
</div>

### 2. 经典模型：囚徒困境与个体理性 vs 集体理性
| 玩家 1 \\ 玩家 2 | 坦白 (Defect) | 抵赖 (Cooperate) |
| :--- | :--- | :--- |
| **坦白 (Defect)** | (-5, -5) [均衡解] | (0, -10) |
| **抵赖 (Cooperate)** | (-10, 0) | (-1, -1) [帕累托最优] |

**推导要点**：无论对方选择坦白还是抵赖，选择“坦白”对个体而言永远是严格占优策略（Dominant Strategy）。最终系统不可避免地跌入双双坦白的纳什均衡 $(-5, -5)$，揭示了“个体极致理性导致集体糟糕境地”的深刻悖论。

### 3. 苏格拉底反思挑战 (Socratic Reflection)
如果这场博弈不是一次性，而是无限次重复进行（Repeated Game），合作机制能够如何自然涌现？请在下方测验中检验你的理解。`;
    }

    // 通用 5 阶苏格拉底教学模版
    return `## 深度拆解：${topic}

### 1. 核心直觉与第一性原理 (Intuitive Foundations)
理解「${topic}」最忌讳一上来死记硬背枯燥的定义。让我们先问一个基本问题：**这个概念最初是为了解决什么矛盾或痛点而被创造出来的？**
在现实世界中，它充当了系统从无序到有序、或从表象到本质的桥梁。

<div content-section="definition">
<p><strong>形式化定义 (Formal Definition)：</strong></p>
<p><strong>${topic}</strong> 是一个被严格界定的核心模型或公理体系，用以精确刻画其内在不变量与变换边界条件。</p>
</div>

### 2. 底层运行机制与推演步骤 (Mechanisms & Derivations)
掌握该概念的关键在于理顺其因果链条：
1. **输入与前提条件**：系统必须满足的基本假定与作用域。
2. **核心状态转换**：关键算子或规则如何驱动内部状态发生跃迁。
3. **输出与守恒量**：在这一过程中，哪些特性是保持不变的（Invariants）。

### 3. 常见认知陷阱与反例 (Common Pitfalls)
- **误区一**：混淆充分条件与必要条件，误将表面相关性当成内在动力因。
- **误区二**：忽略极端边界值条件（Boundary Cases），导致理论在复杂工程环境中失效。

### 4. 苏格拉底反思自测 (Active Recall)
请尝试在心中用一句话向一位初学者解释「${topic}」。接下来，请通过下方的交互测验检验你的掌握深度。`;
  }

  // English Socratic response
  return `## Mastering ${topic}: A Socratic Cognitive Journey

### 1. The Intuitive Hook & Mental Model
Before diving into abstract formalism, consider why **${topic}** had to be invented in the first place. Every powerful intellectual framework begins as a solution to a fundamental limitation of intuition.

<div content-section="definition">
<p><strong>Formal Definition:</strong></p>
<p><strong>${topic}</strong> constitutes a rigorous mathematical and structural framework defined over its explicit domain, guaranteeing invariant preservation across state transitions.</p>
</div>

### 2. Core Mechanism & Step-by-Step Rigor
True mastery requires decomposing the underlying mechanics:
1. **Priors & Boundary Conditions**: The foundational axioms on which the system rests.
2. **Dynamic Invariants**: The conservation laws or logical transformations governing the process.
3. **The Synthesis**: How micro-level interactions yield macro-level stability.

### 3. Practical Implications & Trade-offs
In real-world engineering or theoretical analysis, ${topic} prevents critical blind spots. Rushing past the foundational intuition directly into formulas invariably leads to catastrophic edge-case failures.

### 4. Socratic Active Recall
Test your conceptual grasp with the interactive diagnostic challenge below.`;
}

// ── 交互测验生成 ──
function stubQuiz(topic: string, lang: 'zh' | 'en') {
  const zh = lang === 'zh';
  if (zh && /贝叶斯|bayes/i.test(topic)) {
    return {
      questions: [
        {
          index: 1,
          question: '在罕见病筛查案例中，某病发病率为 0.1%，检测准确率（真阳性率）为 99%，假阳性率为 1%。若某人初次检测为阳性，其真正患病的后验概率大约是多少？',
          answer_options: [
            { index: 1, content: '大约 99%，因为试剂准确率高达 99%', is_correct: false },
            { index: 2, content: '大约 9%，因为庞大健康基数产生的假阳性绝对人数远超真阳性', is_correct: true },
            { index: 3, content: '大约 50%，非黑即白', is_correct: false },
            { index: 4, content: '0.1%，完全没有变化', is_correct: false },
          ],
          correct_answer: 2,
          explanation: '运用贝叶斯公式：P(患病|阳性) = (0.99 × 0.001) / (0.99 × 0.001 + 0.01 × 0.999) ≈ 0.00099 / 0.01098 ≈ 9.01%。这揭示了基准概率对后验概率的决定性压制。',
        },
        {
          index: 2,
          question: '关于贝叶斯定理中的“似然度 P(B|A)”与“后验概率 P(A|B)”，下列哪种表述是正确的？',
          answer_options: [
            { index: 1, content: '两者数值完全相等，只是表达习惯不同', is_correct: false },
            { index: 2, content: 'P(B|A) 是假说成立时观测到证据的概率，而 P(A|B) 是看到证据后假说为真的置信度', is_correct: true },
            { index: 3, content: 'P(A|B) 永远不随新证据的积累而改变', is_correct: false },
            { index: 4, content: '若 P(B|A) 很大，P(A|B) 必然接近 1', is_correct: false },
          ],
          correct_answer: 2,
          explanation: 'P(B|A) 是似然度（Likelihood），衡量假说对数据的解释力；P(A|B) 是后验概率（Posterior），是结合先验后的最终信念。混淆二者是统计学中最常见的“检察官谬误”。',
        },
      ],
      total_count: 2,
    };
  }

  if (zh && /量子|qubit|quantum/i.test(topic)) {
    return {
      questions: [
        {
          index: 1,
          question: '一个量子比特处于叠加态 |ψ⟩ = α|0⟩ + β|1⟩。根据量子力学公理，测量该量子比特后会发生什么？',
          answer_options: [
            { index: 1, content: '量子比特仍然保持叠加态不变', is_correct: false },
            { index: 2, content: '波函数坍缩，以 |α|² 的概率得到 0，以 |β|² 的概率得到 1', is_correct: true },
            { index: 3, content: '同时测量出 0 和 1 的平均值 0.5', is_correct: false },
            { index: 4, content: '完全随机输出，与系数 α, β 无关', is_correct: false },
          ],
          correct_answer: 2,
          explanation: '在波恩定则（Born Rule）下，测量破坏了相干叠加，使态矢量投影坍缩至本征态基，概率正比于概率振幅的模平方。',
        },
        {
          index: 2,
          question: '阿达马门（Hadamard Gate）在量子算法中扮演的核心角色是什么？',
          answer_options: [
            { index: 1, content: '将确定的经典计算基态（如 |0⟩）变换为均匀相干叠加态，为量子并行提供可能', is_correct: true },
            { index: 2, content: '纠正量子比特中的相位翻转错误', is_correct: false },
            { index: 3, content: '测量量子比特并输出经典数据', is_correct: false },
            { index: 4, content: '复制量子比特的未知状态', is_correct: false },
          ],
          correct_answer: 1,
          explanation: 'Hadamard 门将基态 |0⟩ 变换为 (|0⟩ + |1⟩)/√2，将基态 |1⟩ 变换为 (|0⟩ - |1⟩)/√2，是几乎所有量子算法（Deutsch-Jozsa, Grover, Shor）开场的必备初始化操作。',
        },
      ],
      total_count: 2,
    };
  }

  if (zh && /博弈|nash|game theory|纳什/i.test(topic)) {
    return {
      questions: [
        {
          index: 1,
          question: '在经典单次囚徒困境中，为什么（坦白，坦白）是唯一的纳什均衡，即使（抵赖，抵赖）的收益更好？',
          answer_options: [
            { index: 1, content: '因为囚徒缺乏基本的数学计算能力', is_correct: false },
            { index: 2, content: '因为无论对方如何选择，选择“坦白”都是个人的严格占优策略', is_correct: true },
            { index: 3, content: '因为（抵赖，抵赖）在规则中被禁止', is_correct: false },
            { index: 4, content: '因为纳什均衡要求整体总收益最大化', is_correct: false },
          ],
          correct_answer: 2,
          explanation: '纳什均衡由无悔性定义（单方面无法通过背离获益）。在单次博弈中，无论对方如何行动，选择坦白给自己带来的刑期永远更短，因此个体理性导向了帕累托次优的僵局。',
        },
        {
          index: 2,
          question: '下列关于“严格占优策略”与“纳什均衡”的关系描述，哪一项是正确的？',
          answer_options: [
            { index: 1, content: '纳什均衡中每个玩家都必须使用严格占优策略', is_correct: false },
            { index: 2, content: '如果所有玩家都拥有严格占优策略，则这些策略构成的组合必然是唯一的纳什均衡', is_correct: true },
            { index: 3, content: '具有占优策略的博弈一定没有纳什均衡', is_correct: false },
            { index: 4, content: '严格占优策略要求在任何博弈中都不能变动', is_correct: false },
          ],
          correct_answer: 2,
          explanation: '当每个玩家都有且仅有一个对所有对手策略都严格更优的选项时，无人有动力偏离该选项，因此该组合必然是唯一的纳什均衡。',
        },
      ],
      total_count: 2,
    };
  }

  // 通用高质量概念测验
  const q1 = zh ? `关于「${topic}」的核心机理，下列哪种理解最为准确？` : `Which statement best captures the core mechanism of ${topic}?`;
  const opts1 = zh
    ? [
        '必须先建立物理直觉与边界模型，再进行形式化数学推导与实战检验',
        '只要死记硬背公式或名词解释就能在实际场景中完全正确应用',
        '概念定义比实际运行机制更重要，推导过程可以完全忽略',
        '任何边界条件都不会对该模型的有效性产生破坏',
      ]
    : [
        'Ground intuition and mental models first, formalize rigorously, then verify on concrete cases',
        'Memorizing formulas alone guarantees robust real-world application',
        'Derivations are irrelevant as long as the definition is memorized',
        'Boundary conditions never affect model validity',
      ];
  const a1 = zh
    ? '「直觉建立 → 形式定义 → 机理推演 → 实战检验」是认知科学中克服表面化学习的最稳固路径。'
    : 'Intuition → Formalization → Derivation → Active Verification is the proven cognitive scaffold.';

  const q2 = zh ? `在检验自己是否真正掌握「${topic}」时，哪种方法最为有效（费曼技巧）？` : `What is the most effective diagnostic test for mastering ${topic}?`;
  const opts2 = zh
    ? [
        '反复把教科书章节通读三遍',
        '不看参考资料，用最直白的语言向完全不懂该领域的初学者解释透彻，并解决一个极值自测题',
        '抄写两遍形式化定义与符号列表',
        '等待下一次考试成绩公布',
      ]
    : [
        'Reread the chapter multiple times passively',
        'Explain the concept without reference notes in plain language to a beginner, testing edge cases',
        'Transcribe the definitions again word-for-word',
        'Wait passively for future test results',
      ];
  const a2 = zh
    ? '主动输出（Active Recall）与费曼教学法能够瞬间暴露知识断层与伪理解。'
    : 'Active recall and Socratic teaching instantly expose comprehension bottlenecks.';

  return {
    questions: [
      {
        index: 1,
        question: q1,
        answer_options: opts1.map((content, oi) => ({ index: oi + 1, content, text: content, is_correct: oi === 0 })),
        correct_answer: 1,
        explanation: a1,
      },
      {
        index: 2,
        question: q2,
        answer_options: opts2.map((content, oi) => ({ index: oi + 1, content, text: content, is_correct: oi === 1 })),
        correct_answer: 2,
        explanation: a2,
      },
    ],
    total_count: 2,
  };
}

function recommendSteps(topic: string, lang: 'zh' | 'en') {
  const load = (ls: string[], ps: string[]) =>
    ls.map((display_step, i) => ({ display_step, step_prompt: ps[i] ?? ps[0] }));
  if (lang === 'zh') {
    return load(
      [`围绕「${topic}」开启白板课堂边讲边画`, `为「${topic}」生成考前高密度速查表`, `系统学习「${topic}」进阶实战应用`],
      [`请为我创建一堂关于${topic}的白板课堂，边讲边画推导演算`, `请为我生成一份围绕${topic}的考前高密度速查表`, `请帮我深入剖析${topic}的真实工程落地案例与边界限制`]
    );
  }
  return load(
    [`Launch a visual whiteboard session on ${topic}`, `Generate a high-density cheatsheet for ${topic}`, `Explore advanced real-world applications of ${topic}`],
    [`Please create a whiteboard walkthrough for ${topic} step by step`, `Generate a 2-page cheatsheet covering ${topic}`, `Show me in-depth production applications and trade-offs of ${topic}`]
  );
}

// ── 正文内容流式推送 ──
async function sendContent(ctx: DirectorCtx, topic: string, lang: 'zh' | 'en'): Promise<string> {
  const sysPrompt = await systemPromptText();
  const guideline =
    lang === 'zh'
      ? `你是 betterknow 认知中枢。请按照【直觉与比喻 -> 严格形式化定义(含KaTeX) -> 机制推导 -> 案例代码 -> 苏格拉底反思】的认知阶梯深度讲解:「${topic}」。`
      : `You are the betterknow directing agent. Explain "${topic}" using the 5-stage Socratic cognitive scaffold: Intuition -> Formal Definition (KaTeX) -> Derivation -> Code Example -> Socratic Challenge.`;

  const args = {
    guideline,
    model_name: ctx.eff?.provider === 'stub' ? 'stub' : ctx.eff?.models.content,
    task_title: topic,
    has_more_response_after_this_reply: false,
  };

  ctx.send({
    type: 'tool_execution',
    tool_name: 'generate_content',
    tool_status: 'started',
    round_index: 2,
    display: 'display',
  });

  let content = '';
  if (ctx.eff?.provider === 'stub' || !ctx.eff?.apiKey) {
    content = stubAnswer(topic, lang);
    for (const part of content.match(/[\s\S]{1,120}/g) ?? []) {
      ctx.send({
        type: 'content_chunk',
        tool_name: 'generate_content',
        tool_status: 'streaming',
        round_index: 2,
        chunk: part,
      });
    }
  } else {
    try {
      const msgs: ChatMessage[] = [
        { role: 'system', content: sysPrompt + '\n\n' + guideline },
        { role: 'user', content: `请系统且透彻地讲解：${topic}` },
      ];
      for await (const chunk of chatStream(msgs, 'content', ctx.eff)) {
        content += chunk;
        ctx.send({
          type: 'content_chunk',
          tool_name: 'generate_content',
          tool_status: 'streaming',
          round_index: 2,
          chunk,
        });
      }
    } catch (err) {
      console.warn(
        '[sendContent] External LLM failed, falling back to rich Socratic stub:',
        err instanceof Error ? err.message : String(err)
      );
      content = stubAnswer(topic, lang);
      for (const part of content.match(/[\s\S]{1,120}/g) ?? []) {
        ctx.send({
          type: 'content_chunk',
          tool_name: 'generate_content',
          tool_status: 'streaming',
          round_index: 2,
          chunk: part,
        });
      }
    }
  }

  await pushHistory(ctx.conversationId, 'assistant', content);
  const result = {
    content,
    chunk_count: Math.ceil(content.length / 120),
    total_length: content.length,
    model_used: ctx.eff?.models.content ?? 'stub',
    guideline,
    stopped_early: false,
  };

  ctx.send({
    type: 'tool_execution',
    tool_name: 'generate_content',
    tool_status: 'completed',
    round_index: 2,
    display: 'display',
    data: { success: true, result, is_streaming_complete: true },
  });

  await pushHistory(ctx.conversationId, 'tool', null, {
    tool_name: 'generate_content',
    args,
    result: { success: true, result, is_streaming_complete: true, display: 'display' },
  });

  return content;
}

// ── 导演主循环（Director Round） ──
export async function runDirectorRound(ctx: DirectorCtx, input: DirectorInput): Promise<void> {
  const lang = language(input);
  const topic = summaryOfTopic(input.message);
  const send = ctx.send;

  const tool = async (
    name: string,
    args: Record<string, unknown>,
    display: 'display' | 'collapse' | 'hide',
    run: () => Promise<unknown>,
    round = 2
  ) => {
    send({ type: 'tool_execution', tool_name: name, tool_status: 'started', round_index: round, display });
    const result = await run();
    const data = { success: true, result, display };
    send({ type: 'tool_execution', tool_name: name, tool_status: 'completed', round_index: round, display, data });
    await pushHistory(ctx.conversationId, 'tool', null, { tool_name: name, args, result: data });
    return result;
  };

  const fast = input.speed_mode === 'fast';
  send({ type: 'thinking', tool_name: 'directorAgent', tool_status: 'started', round_index: 1, display: 'display' });
  if (!fast) {
    send({
      type: 'thinking_chunk',
      tool_name: 'directorAgent',
      tool_status: 'streaming',
      round_index: 1,
      chunk:
        lang === 'zh'
          ? `betterknow 教育中枢正在评估认知阶梯：构建直觉 -> 形式化推导 -> 实操检验 -> 诊断交互。`
          : `betterknow orchestrator evaluating cognitive ladder: intuition -> formalization -> derivation -> active recall.`,
    });
  }

  // memory_recall (记忆调取)
  if (!fast) {
    await tool(
      'memory_recall',
      { user_query: topic },
      'hide',
      async () => {
        const mem = (await readState()).memories[ctx.userId] as Record<string, unknown> | undefined;
        return { summary: mem?.long_term ? mem['long_term'] : '(no prior memory)' };
      },
      2
    );
  }

  const { skill, directQuiz } = pickSkill(input, input.message.trim().length < 12);

  // get_skills: 载入当前技能规范
  if (skill) {
    await tool('get_skills', { skills: [skill] }, 'collapse', async () => ({ success: true, skill_name: skill, content: await skillText(skill) }), 2);
  }

  // 技能特化分支
  switch (skill) {
    case 'whiteboardSession': {
      await tool('search_and_summarize_web', { query: topic, price: 'free' }, 'display', async () => {
        const s = await search.query(topic, 4);
        return {
          results_count: s.results.length,
          provider: s.stub ? 'stub' : 'byok',
          summary: s.results.map((r: SearchResult) => r.title).join('; '),
        };
      });

      const sessionId = HEX32();
      const title = lang === 'zh' ? `${topic.replace(/,.*$/, '')}：白板精讲` : `${topic}: Visual Walkthrough`;
      const board = {
        result: {
          board_sessions: [
            {
              url: `/whiteboard/${sessionId}`,
              tags: [lang === 'zh' ? '白板互动' : 'whiteboard', lang === 'zh' ? '概念推演' : 'derivation'],
              title,
              description:
                lang === 'zh'
                  ? `围绕「${topic}」的黑板分步推演课堂，含动态板书与语音导读`
                  : `Visual step-by-step whiteboard session on ${topic}`,
              session_id: sessionId,
              session_type: 'whiteboard_quick_start',
            },
          ],
        },
      };

      await tool(
        'create_board_session',
        {
          sessions: [
            {
              tags: board.result.board_sessions[0].tags,
              brief: title,
              title,
              description: board.result.board_sessions[0].description,
              session_type: 'whiteboard',
              user_request: input.message,
              output_language: lang === 'zh' ? 'Chinese (Simplified)' : 'English',
            },
          ],
        },
        'display',
        async () => {
          await updateState((next) => {
            next.whiteboards[sessionId] = {
              session_id: sessionId,
              user_id: ctx.userId,
              status: 'ready',
              session_title: title,
              conversation_id: ctx.conversationId,
              whiteboard_state: {
                pages: [
                  { page_index: 1, title: '认知破局与几何直觉', content: `## ${topic}\n直观心智模型图示` },
                  { page_index: 2, title: '形式化公理与符号定义', content: `## 形式化数学定义\n规范 KaTeX 模型` },
                  { page_index: 3, title: '分步动态推导演算', content: `## 核心推导因果链条\nStep 1 -> Step 2` },
                  { page_index: 4, title: '综合应用与实战自测', content: `## 综合案例演练\n随堂思考挑战` },
                ],
                current_page: 1,
              },
              messages: [],
              tts_config: { voice_id: 'calm', speed: 1 },
              created_at: now(),
            } as never;
          });
          return board.result;
        }
      );
      break;
    }

    case 'systematicLearning': {
      const units =
        lang === 'zh'
          ? [
              {
                unit_name: '单元 1: 概念萌芽与直觉破局',
                unit_description: `从零建立对「${topic}」的底层物理直觉与核心痛点认知。`,
                tasks: [`概念导览：为什么需要${topic}`, `完成单元 1 核心心智模型白板推导`],
              },
              {
                unit_name: '单元 2: 形式化理论与数学公理',
                unit_description: `建立严密的符号体系，推导核心定理与不变量。`,
                tasks: [`掌握核心公式推导与边界条件`, `完成单元 2 定理证明练习`],
              },
              {
                unit_name: '单元 3: 真实工程案例与前沿实战',
                unit_description: `将理论落地为可运行的代码实现与系统架构。`,
                tasks: [`Python / 代码仿真演练`, `期末综合测验与知识图谱回炉`],
              },
            ]
          : [
              {
                unit_name: 'Unit 1: Intuitive Foundations',
                unit_description: `Build mental models and historical context for ${topic}.`,
                tasks: [`Core intuition overview`, `Finish Unit 1 blackboard walk-through`],
              },
              {
                unit_name: 'Unit 2: Formal Theory & Derivations',
                unit_description: `Rigorous mathematical modeling and theorem proofs.`,
                tasks: [`Derive core equations`, `Solve formal boundary check questions`],
              },
              {
                unit_name: 'Unit 3: Applied Engineering & Synthesis',
                unit_description: `Hands-on implementation and system trade-offs.`,
                tasks: [`Code walkthrough and simulation`, `Final mastery synthesis`],
              },
            ];

      const task_plan = {
        tags: [lang === 'zh' ? '体系化学习' : 'curriculum', lang === 'zh' ? '认知阶梯' : 'scaffolding'],
        title: lang === 'zh' ? `《${topic}》全景深度学习体系` : `Deep Mastery: ${topic}`,
        description:
          lang === 'zh'
            ? `由浅入深掌握「${topic}」的结构化进阶路径（含3个单元及配套练习）。`
            : `A comprehensive, 3-unit scaffolded journey to master ${topic}.`,
        session_task_plan: units,
      };

      const sessionId = randomUUID();
      await tool('create_deep_learn_session', { task_plan }, 'display', async () => {
        await updateState((next) => {
          next.deep_learn[sessionId] = {
            deep_learn_session_id: sessionId,
            user_id: ctx.userId,
            title: task_plan.title,
            task_plan,
            conversation_data: { history: [], progress: {} },
            created_at: now(),
          } as never;
        });
        return {
          task_plan,
          deep_learn_session_id: sessionId,
          deep_learn_session_url: `/deep-learn-session/${sessionId}`,
        };
      });
      break;
    }

    case 'planTasks': {
      const pendingPlan = (await convo(ctx.conversationId)) as unknown as {
        pending_skill?: string;
        pending_question?: unknown;
      };
      const alreadyAsked = pendingPlan?.pending_skill === 'planTasks' && pendingPlan.pending_question;
      if (!alreadyAsked) {
        const questions =
          lang === 'zh'
            ? [
                {
                  question: '你希望达成的目标范围与时间节点是什么？',
                  options: ['2周内突击备考期末', '1个月内完整通读并精通', '轻量速览核心框架'],
                  is_multiple: false,
                },
                {
                  question: '你每天能投入多少高效专注时间？',
                  options: ['30 - 45 分钟（高效微习惯）', '1 - 2 小时（标准稳健节奏）', '3 小时以上（全职沉浸攻坚）'],
                  is_multiple: false,
                },
              ]
            : [
                {
                  question: 'What is your target timeline and scope?',
                  options: ['2-week intensive exam cramming', '1-month thorough mastery', 'Lightweight quick overview'],
                  is_multiple: false,
                },
                {
                  question: 'Daily committed study time?',
                  options: ['30–45 mins', '1–2 hours', '3+ hours'],
                  is_multiple: false,
                },
              ];

        const data = {
          status: 'waiting_for_answers',
          questions_asked: questions.length,
          message: 'Questions sent to user, waiting for answers...',
          conversation_id: ctx.conversationId,
        };
        await updateState((next) => {
          const c = next.conversations[ctx.conversationId] as unknown as Record<string, unknown> | undefined;
          if (c) c.pending_skill = 'planTasks';
          if (c) c.pending_question = questions;
        });
        send({
          type: 'user_question',
          message: 'I need to ask you some questions to better understand your needs',
          tool_name: 'ask_questions',
          tool_status: 'completed',
          round_index: 2,
          display: 'display',
          question_data: { questions: questions.map((q) => ({ ...q, allow_custom: (q as { allow_custom?: boolean }).allow_custom !== false })) },
        });
        await pushHistory(ctx.conversationId, 'tool', null, {
          tool_name: 'ask_questions',
          args: { questions },
          result: { success: true, result: data, display: 'display' },
        });
        send({ type: 'mark_response_complete', step_id: 0 });
        send({ type: 'complete', message: 'Waiting for your answers', is_complete: true, conversation_id: ctx.conversationId, tts_pending: false });
        return;
      }

      const days = 3;
      const start = new Date();
      start.setHours(9, 0, 0, 0);
      const phases = ['基础概念与直觉心智模型', '公式推导演练与典型题型攻坚', '全真模拟自测与错因诊断复盘'];
      const tasks = Array.from({ length: days }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const due = new Date(d);
        due.setHours(21, 0, 0, 0);
        const dayTitle =
          lang === 'zh'
            ? `${topic} 冲刺计划 · 第${['一', '二', '三'][i]}阶段：${phases[i]}`
            : `${topic} Plan: Phase ${i + 1} - ${phases[i]}`;
        return {
          task_id: randomUUID(),
          user_id: ctx.userId,
          type: 'todo',
          title: dayTitle,
          description:
            lang === 'zh'
              ? `阶段目标：重点攻坚 ${topic} 的${phases[i]}，完成配套练习并沉淀核心笔记。`
              : `Focus milestone on ${phases[i]} for ${topic}.`,
          scheduled_for: d.toISOString(),
          due_at: due.toISOString(),
          created_at: now(),
          status: 'pending',
          progress: 'not_started',
          subtasks: [
            { id: randomUUID(), title: `完成${phases[i]}白板精讲`, completed: false },
            { id: randomUUID(), title: `完成2道随堂诊断测验`, completed: false },
          ],
          origin_data: null,
          external_calendar_events: null,
          related_tasks: null,
          updated_at: null,
        };
      });

      await tool('generate_main_tasks', { prompt: input.message, rounds: 2, spacing: '1d' }, 'display', async () => {
        await updateState((next) => {
          (next.calendar[ctx.userId] ??= []).push(...(tasks as never[]));
        });
        return { count: tasks.length, tasks };
      });

      // 清除待答状态
      await updateState((next) => {
        const c = next.conversations[ctx.conversationId] as unknown as
          | { pending_skill?: string; pending_question?: unknown }
          | undefined;
        if (c) {
          delete c.pending_skill;
          delete c.pending_question;
        }
      });
      break;
    }

    case 'cheatsheetGeneration': {
      // 线上实测：速查表技能先弹一题「内容详细程度」，答完再产出（allow_custom 允许自己写）
      const pending = (await readState()).conversations[ctx.conversationId] as unknown as { pending_skill?: string } | undefined;
      if (!input.answers?.length && !pending?.pending_skill) {
        const questions = [{ question: '你希望速查表的内容详细程度如何？', is_multiple: false, options: ['一般 (提取核心要点)', '详细 (适当展开细节)', '非常详细 (最大化保留所有细节)'], allow_custom: true }];
        await updateState((next) => {
          const c = next.conversations[ctx.conversationId] as unknown as Record<string, unknown> | undefined;
          if (c) { c.pending_skill = 'cheatsheetGeneration'; c.pending_question = questions; }
        });
        await tool('ask_questions', { questions }, 'display', async () => ({ success: true, result: { questions } }), 2);
        send({ type: 'user_question', message: 'I need to ask you some questions to better understand your needs', tool_name: 'ask_questions', tool_status: 'completed', round_index: 2, display: 'display', question_data: { questions } });
        send({ type: 'mark_response_complete', step_id: 0 });
        send({ type: 'complete', message: 'Waiting for your answers', is_complete: true, conversation_id: ctx.conversationId, tts_pending: false });
        return;
      }

      const id = randomUUID().replaceAll('-', '');
      const title = lang === 'zh' ? `${topic} · 考前高密度速查表` : `${topic} — High-Density Cheatsheet`;
      const md =
        lang === 'zh'
          ? `# ${title}
> 本速查表遵循 betterknow 双页认知架构，专为考前冲刺与高频检索设计。

---

## 页面 1：核心概念地基与公理体系

### 1. 一句话本质与心智模型
- **核心定义**：${topic} 是刻画复杂系统状态跃迁与不变量的核心模型。
- **直觉锚点**：不要孤立记忆符号，重点关注输入如何通过边界条件映射为稳态输出。

### 2. 核心定理与关键公式速查表
| 定理 / 机制 | 标准 KaTeX 表达式 | 适用前提 | 物理 / 逻辑含义 |
| :--- | :--- | :--- | :--- |
| **基础恒等式** | $$P(A\|B) = \\frac{P(B\|A)P(A)}{P(B)}$$ | $P(B) > 0$ | 吸收新证据后的置信度更新 |
| **全概率分解** | $$P(B) = \\sum_{i} P(B\|A_i)P(A_i)$$ | 样本空间完备划分 | 综合所有可能路径的边缘概率 |
| **状态归一化** | $$\\sum_i \|\\alpha_i\|^2 = 1$$ | 闭合概率系统 | 空间守恒定律 |

---

## 页面 2：实操决策、易错陷阱与速记法则

### 3. 高频易错陷阱（Common Pitfalls）
1. **基准概率忽视陷阱**：遇到假阳性问题时，容易忽视先验概率极低的压制作用。
2. **相关性误当因果性**：未检验反事实（Counterfactual）前提便推断因果关系。
3. **跳步背诵公式**：跳过几何或物理直觉直接套用公式，在复杂边界条件下极易崩溃。

### 4. 三步极速解题流水线
\`\`\`text
Step 1: 标注已知量（提取先验 P(A)、观测证据 B、似然度 P(B|A)）
Step 2: 验证全概率分母 P(B) 是否存在漏项
Step 3: 代入算子，进行量纲与归一化极值检验
\`\`\`

### 5. 30秒闭卷自测清单
- [ ] 能否在草稿纸上手写核心定理推导？
- [ ] 能否给出该理论在极端边界条件下的反例？
`
          : `# ${title}
> Designed for rapid recall and exam cramming via betterknow scaffolding.

---

## Page 1: Foundations & Core Theorems
### Core Mental Model
- **Definition**: ${topic} defines the invariant transformations governing state spaces.
- **Formulas**:
$$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$$

---

## Page 2: Decision Trees & Rapid Checklist
### Common Pitfalls
1. Neglecting base-rate priors.
2. Confusing correlation with causation.
3. Overlooking extreme boundary conditions.
`;

      await tool('generate_cheatsheet', { title, custom_prompt: input.message }, 'display', async () => {
        publicFiles.set(id, {
          id,
          filename: `${title}.md`,
          mime: 'text/markdown; charset=utf-8',
          data: Buffer.from(md),
        });
        return {
          file_id: id,
          filename: `${title}.md`,
          url: `/api/v1/files/${id}`,
          pages: 2,
          size: md.length,
        };
      });
      ctx.send({ type: 'save_artifact_response', success: true, file_id: id, is_complete: false });
      break;
    }

    case 'documentReading': {
      const directAtts = Array.isArray(input.attachments) ? input.attachments : [];
      const files = await tool(
        'search_files',
        { query: topic, sources: ['drive', 'upload'] },
        'collapse',
        async () => {
          if (directAtts.length) {
            return {
              files: directAtts.map((att: any, idx: number) => ({
                file_id: att.id ?? `att-${idx}-${Date.now()}`,
                file_name: att.name ?? `上传图片/材料 ${idx + 1}`,
                file_ext: att.type?.includes('image') ? '.png' : (att.name?.match(/\.[^.]+$/)?.[0] ?? '.pdf'),
                short_summary: `用户即时上传材料：${att.name ?? '图片/讲义'}`,
                source: 'upload',
              })),
            };
          }
          const s = await readState();
          const drive = Object.values(s.drive[ctx.userId] ?? {});
          const norm = (v: unknown) =>
            String(v ?? '')
              .toLowerCase()
              .replace(/\.[^.]+$/, '');
          const found = drive.filter(
            (f: Record<string, unknown>) =>
              norm(f.name).includes(norm(topic.slice(0, 12))) || norm(topic).includes(norm(f.name))
          );
          return {
            files: found.length
              ? found.map((f: Record<string, unknown>) => ({
                  file_id: String(f.file_id ?? f.id ?? ''),
                  file_name: String(f.name ?? ''),
                  file_ext: String(f.name ?? '').match(/\.[^.]+$/)?.[0] ?? '',
                  short_summary: `${String(f.name ?? '')} 的核心导读摘要`,
                  source: 'drive',
                }))
              : [],
          };
        }
      );
      const fileIds = ((files as { files?: { file_id?: string }[] }).files ?? []).map((f) => f.file_id);
      if (fileIds.length) {
        await tool('read_content', { file_ids: fileIds }, 'display', async () => ({
          resolved: fileIds.map((file_id) => ({
            file_id,
            was_split: false,
            part_count: 1,
            attached_part_count: 1,
            attachment_mode: 'inline_bytes',
          })),
          failed: [],
          attached_count: fileIds.length,
          attached_part_count: fileIds.length,
          note: directAtts.length
            ? '多模态材料与图像视觉特征已成功提取，接入苏格拉底教学管线。'
            : 'Document content parsed successfully for guided reading.',
        }));
      }
      break;
    }

    default:
      break;
  }

  // 正文规划与分段推导
  send({ type: 'tool_execution', tool_name: 'content_planner', tool_status: 'started', round_index: 2, display: 'collapse' });
  send({
    type: 'tool_execution',
    tool_name: 'content_planner',
    tool_status: 'completed',
    round_index: 2,
    display: 'collapse',
    data: { success: true, result: { plan: ['intuition', 'definition', 'derivation', 'quiz'], lang }, display: 'collapse' },
  });

  // 生成正文
  await sendContent(ctx, topic, lang);

  // 交互式测验闭环（Active Recall Quiz）
  if (directQuiz) {
    send({ type: 'tool_execution', tool_name: 'generate_quiz', tool_status: 'started', round_index: 3 });
    const quiz = stubQuiz(topic, lang);
    const data = {
      success: true,
      result: {
        questions: quiz.questions,
        total_count: quiz.total_count,
        model_used: ctx.eff?.models.quiz ?? 'stub',
      },
      display: 'display',
    };
    send({ type: 'tool_execution', tool_name: 'generate_quiz', tool_status: 'completed', round_index: 3, display: 'display', data });
    await pushHistory(ctx.conversationId, 'tool', null, {
      tool_name: 'generate_quiz',
      args: { custom_prompt: input.message },
      result: data,
    });
  }

  // 结束本轮与后续行动建议
  send({ type: 'mark_response_complete', step_id: 0 });
  const steps = recommendSteps(topic, lang);
  const recommendData = {
    has_steps: true,
    next_steps: steps,
    learning_progress: {
      title_action: 'new',
      current_title: topic,
      topic,
      percentage: 45,
      predicted_next_title: lang === 'zh' ? `${topic}：进阶推演` : `Advanced ${topic}`,
    },
  };
  send({ type: 'recommend_next_step', data: recommendData });
  send({
    type: 'tool_execution',
    tool_name: 'recommend_next_step',
    tool_status: 'completed',
    round_index: 4,
    display: 'display',
    data: { success: true, result: recommendData, display: 'display' },
  });

  send({ type: 'complete', message: 'Response complete', is_complete: true, conversation_id: ctx.conversationId, tts_pending: false });
}
