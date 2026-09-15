import { j as e } from "./index-TjoB2Buo.js";
import { C as i } from "./CourseStructureMap-41hR1got.js";
import "./loader-circle-BZEIbChB.js";
import "./createLucideIcon-B4HcG4gb.js";
import "./plus-jBDDhggQ.js";
import "./check-BBSENZCf.js";
import "./maximize-2-78VwLVLI.js";
import "./x-BPqZ-rfi.js";
const s = (e, i, s, t) => ({
  sessionId: e,
  sessionIndex: i,
  title: s,
  description: "",
  practice: {
    tasks: []
  },
  sessionTime: 45,
  depthTags: t
});
const t = {
  courseUuid: "sample-mindmap-response",
  courseTitle: "机器学习核心概念速成",
  courseDescription: "从直觉、数学基础到实战应用，构建一门可执行的机器学习入门课程。",
  targetLearner: "适合希望快速建立机器学习全局认知，并能动手完成小项目的学习者。",
  tags: ["Machine Learning", "AI", "Project Based"],
  units: [{
    unitId: "unit-foundations",
    title: "建立机器学习直觉",
    description: "",
    lectures: [{
      lectureId: "lecture-what-is-ml",
      title: "什么是机器学习",
      description: "",
      sessions: [s("s-what-is-ml-1", 1, "从规则程序到数据驱动", ["intuition", "definition"]), s("s-what-is-ml-2", 2, "监督、无监督与强化学习的边界", ["definition"]), s("s-what-is-ml-3", 3, "用一个房价预测例子串起来", ["application"])]
    }, {
      lectureId: "lecture-data-thinking",
      title: "数据与特征思维",
      description: "",
      sessions: [s("s-data-thinking-1", 1, "样本、标签、特征与噪声", ["definition"]), s("s-data-thinking-2", 2, "为什么好特征常常比复杂模型更重要", ["intuition", "application"])]
    }]
  }, {
    unitId: "unit-models",
    title: "核心模型与训练方法",
    description: "",
    lectures: [{
      lectureId: "lecture-linear-models",
      title: "线性模型",
      description: "",
      sessions: [s("s-linear-1", 1, "线性回归的几何直觉", ["intuition"]), s("s-linear-2", 2, "损失函数与梯度下降", ["definition", "derivation"]), s("s-linear-3", 3, "正则化如何控制过拟合", ["advanced", "application"])]
    }, {
      lectureId: "lecture-trees",
      title: "树模型与集成学习",
      description: "",
      sessions: [s("s-tree-1", 1, "决策树如何切分空间", ["intuition", "definition"]), s("s-tree-2", 2, "随机森林与梯度提升", ["advanced"]), s("s-tree-3", 3, "用表格数据做分类项目", ["application"])]
    }]
  }, {
    unitId: "unit-evaluation",
    title: "评估、部署与迭代",
    description: "",
    lectures: [{
      lectureId: "lecture-evaluation",
      title: "模型评估",
      description: "",
      sessions: [s("s-eval-1", 1, "训练集、验证集与测试集", ["definition"]), s("s-eval-2", 2, "准确率之外的指标选择", ["application"]), s("s-eval-3", 3, "交叉验证与实验设计", ["advanced"])]
    }, {
      lectureId: "lecture-shipping",
      title: "从 Notebook 到可用产品",
      description: "",
      sessions: [s("s-ship-1", 1, "保存模型与构建推理接口", ["application"]), s("s-ship-2", 2, "监控数据漂移与持续迭代", ["advanced", "application"])]
    }]
  }]
};
const n = () => e.jsx("div", {
  className: "sample-mindmap-response chat-response-container",
  children: e.jsxs("div", {
    className: "sample-mindmap-response-content",
    children: [e.jsx("div", {
      className: "sample-mindmap-response-user-query",
      children: "请帮我生成一门机器学习入门课程，并先展示课程讲解结构。"
    }), e.jsxs("div", {
      className: "sample-mindmap-response-step",
      children: [e.jsx("span", {
        className: "sample-mindmap-response-step-title",
        children: "Crafting Course"
      }), e.jsx("span", {
        className: "sample-mindmap-response-check",
        children: "✓"
      })]
    }), e.jsx(i, {
      courseUuid: t.courseUuid,
      initialStructure: t,
      enableFloatingControls: true
    })]
  })
});
export { n as default };