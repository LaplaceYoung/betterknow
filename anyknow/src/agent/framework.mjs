/**
 * simo know Agent Runtime — Mastra-shaped TypeScript agent framework.
 *
 * Hyperknow's learning agent is a multi-step tool loop (plan → tools →
 * structured result), not a single LLM completion. This runtime is the
 * shipped loop: Agent.generate() keeps calling the model until it stops
 * requesting tools or hits maxSteps.
 *
 * Production model: SpaceXAI (xAI OpenAI-compatible, XAI_API_KEY).
 * Tests inject a tool-requesting model double — they do not mock this loop.
 */

export class Tool {
  constructor({ id, description, parameters = {}, execute }) {
    if (!id) throw new Error("tool id required");
    if (typeof execute !== "function") throw new Error("tool execute required");
    this.id = id;
    this.description = description || id;
    this.parameters = parameters;
    this.execute = execute;
  }
}

export function createTool(def) {
  return new Tool(def);
}

/**
 * Model contract (Language-model double or live provider):
 *   generate({ messages, tools }) →
 *     { text?, toolCalls?: [{ id, name, arguments }] }
 */
export class Agent {
  constructor({ name, instructions, tools = {}, model, maxSteps = 8 }) {
    this.name = name || "agent";
    this.instructions = instructions || "";
    this.tools = normalizeTools(tools);
    this.model = model;
    this.maxSteps = maxSteps;
  }

  async generate(input, options = {}) {
    const model = options.model || this.model;
    if (!model || typeof model.generate !== "function") {
      throw new Error("Agent requires a model with generate()");
    }
    const userContent = typeof input === "string" ? input : input?.prompt || input?.content;
    if (!userContent) throw new Error("generate() needs a prompt");

    const messages = [
      { role: "system", content: this.instructions },
      ...(options.messages || []),
      { role: "user", content: userContent },
    ];
    const trace = [];
    const toolResults = [];

    for (let step = 0; step < (options.maxSteps || this.maxSteps); step++) {
      const turn = await model.generate({
        messages,
        tools: Object.values(this.tools).map((t) => ({
          id: t.id,
          description: t.description,
          parameters: t.parameters,
        })),
        agent: this.name,
        step,
      });
      if (!turn) throw new Error("model.generate returned empty");

      const calls = turn.toolCalls || turn.tool_calls || [];
      if (calls.length) {
        messages.push({
          role: "assistant",
          content: turn.text || "",
          toolCalls: calls,
        });
        for (const call of calls) {
          const name = call.name || call.toolName || call.function?.name;
          const args = call.arguments || call.args || parseArgs(call.function?.arguments);
          const tool = this.tools[name];
          if (!tool) throw new Error(`Unknown tool requested: ${name}`);
          const result = await tool.execute(args, { agent: this.name, step });
          const record = {
            toolCallId: call.id || `${name}-${step}`,
            name,
            arguments: args,
            result,
          };
          toolResults.push(record);
          trace.push({ type: "tool", ...record });
          messages.push({
            role: "tool",
            name,
            content: stringify(result),
            toolCallId: record.toolCallId,
          });
        }
        continue;
      }

      const text = turn.text || turn.content || "";
      trace.push({ type: "final", text });
      return {
        text,
        toolResults,
        trace,
        steps: step + 1,
        agent: this.name,
        structured: turn.structured || null,
      };
    }
    throw new Error(`Agent ${this.name} exceeded maxSteps without a final answer`);
  }
}

export class Workflow {
  constructor({ name, steps }) {
    this.name = name;
    this.steps = steps || [];
  }

  async run(input, ctx = {}) {
    let state = { ...input };
    const log = [];
    for (const step of this.steps) {
      const id = step.id || step.name;
      const output = await step.execute(state, ctx);
      log.push({ id, output });
      state = { ...state, ...(output && typeof output === "object" ? output : { [id]: output }) };
    }
    return { name: this.name, state, log };
  }
}

function normalizeTools(tools) {
  const out = {};
  const list = Array.isArray(tools) ? tools : Object.values(tools);
  for (const t of list) {
    const tool = t instanceof Tool ? t : createTool(t);
    out[tool.id] = tool;
  }
  return out;
}

function parseArgs(raw) {
  if (raw == null) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return { raw };
  }
}

function stringify(value) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

/**
 * Live SpaceXAI (xAI) model adapter. Only used when XAI_API_KEY is set.
 * Tests never call this — they pass a model double into Agent.
 */
export function createSpaceXaiModel({ apiKey = process.env.XAI_API_KEY, model = "grok-4.5" } = {}) {
  return {
    name: "spacexai",
    async generate({ messages, tools }) {
      if (!apiKey) throw new Error("XAI_API_KEY missing");
      const body = {
        model,
        input: messages.map((m) => ({
          role: m.role === "tool" ? "user" : m.role,
          content: m.role === "tool" ? `[tool ${m.name}] ${m.content}` : m.content,
        })),
        tools: (tools || []).map((t) => ({
          type: "function",
          name: t.id,
          description: t.description,
          parameters: t.parameters || { type: "object" },
        })),
      };
      const res = await fetch("https://api.x.ai/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`SpaceXAI ${res.status}`);
      const data = await res.json();
      const text = data.output_text || "";
      const toolCalls = [];
      for (const item of data.output || []) {
        if (item.type === "function_call") {
          toolCalls.push({
            id: item.call_id || item.id,
            name: item.name,
            arguments: parseArgs(item.arguments),
          });
        }
      }
      return { text, toolCalls };
    },
  };
}
