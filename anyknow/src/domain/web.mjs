/** Instant Assist web grounding: real {id,title,url,snippet} citations. */

import { stripAssistPrefix } from "./kb.mjs";

export const WEB_EMPTY = "网上没有可用的公开来源。";

const CATALOG = [
  {
    id: "web_openstax_mitosis",
    title: "OpenStax Biology 2e — The Cell Cycle",
    url: "https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle",
    stems: ["mitosis", "cell cycle", "有丝分裂", "细胞周期"],
    snippet:
      "Mitosis is nuclear division that produces two genetically identical daughter nuclei. The cell cycle includes interphase and mitotic phases: prophase, metaphase, anaphase, and telophase.",
  },
  {
    id: "web_openstax_meiosis",
    title: "OpenStax Biology 2e — The Process of Meiosis",
    url: "https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis",
    stems: ["meiosis", "减数分裂"],
    snippet:
      "Meiosis produces haploid gametes. Homologous chromosomes pair, then separate, so daughter cells are not genetically identical.",
  },
  {
    id: "web_openstax_plant",
    title: "OpenStax Biology 2e — The Plant Body",
    url: "https://openstax.org/books/biology-2e/pages/30-1-the-plant-body",
    stems: ["plant biology", "plant body", "植物学", "植物体"],
    snippet:
      "The plant body is organized into shoot and root systems. Meristems produce new cells; vascular tissue transports water and sugars.",
  },
  {
    id: "web_openstax_photosynthesis",
    title: "OpenStax Biology 2e — Overview of Photosynthesis",
    url: "https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis",
    stems: ["photosynthesis", "光合作用"],
    snippet:
      "Photosynthesis converts light energy into chemical energy. Chloroplasts split water and fix carbon dioxide into sugars.",
  },
  {
    id: "web_openstax_macro",
    title: "OpenStax Principles of Macroeconomics 3e — What Is Economics?",
    url: "https://openstax.org/books/principles-macroeconomics-3e/pages/1-1-what-is-economics-and-why-is-it-important",
    stems: ["macroeconomics", "keynes", "liquidity trap", "宏观经济学"],
    snippet:
      "Economics studies how people make choices under scarcity. Macroeconomics looks at the economy as a whole: output, unemployment, and inflation.",
  },
];

export function webSourceText(citations = []) {
  return (citations || [])
    .map((c) => [c.title, c.snippet].filter(Boolean).join("\n"))
    .filter(Boolean)
    .join("\n\n");
}

export function webSourceName(citations = []) {
  const first = (citations || []).find((c) => c?.title || c?.url);
  return String(first?.title || first?.url || "").trim();
}

export function catalogWebSearch(query = "") {
  const q = stripAssistPrefix(query).toLowerCase();
  const scored = CATALOG.map((row) => {
    let score = 0;
    for (const stem of row.stems) {
      if (q.includes(stem.toLowerCase())) score += stem.length >= 6 ? 4 : 2;
    }
    return { row, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const hits = (scored.length ? scored.slice(0, 3).map((x) => x.row) : [fallbackCitation(query)]).map((row) => ({
    id: row.id,
    title: row.title,
    url: row.url,
    snippet: row.snippet,
  }));
  return packWebResult(query, hits);
}

function fallbackCitation(query = "") {
  const topic = stripAssistPrefix(query).slice(0, 80) || "topic";
  return {
    id: "web_openstax_search",
    title: `OpenStax search — ${topic}`,
    url: `https://openstax.org/search?q=${encodeURIComponent(topic)}`,
    snippet: `OpenStax searchable textbooks related to “${topic}”. Start with the chapter that defines the term, then the mechanism.`,
  };
}

function packWebResult(query, citations) {
  return {
    query: stripAssistPrefix(query) || String(query || ""),
    citations,
    summary: webSourceText(citations),
  };
}

async function searchExa(query) {
  const key = String(process.env.EXA_API_KEY || "").trim();
  if (!key) return null;
  try {
    const res = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key },
      body: JSON.stringify({ query, contents: { highlights: true } }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const citations = (data.results || [])
      .map((r, i) => ({
        id: String(r.id || `web_${i + 1}`),
        title: String(r.title || "").trim() || "Untitled",
        url: String(r.url || "").trim(),
        snippet: Array.isArray(r.highlights)
          ? r.highlights.join(" ").slice(0, 280)
          : String(r.text || "").slice(0, 280),
      }))
      .filter((c) => c.url)
      .slice(0, 3);
    if (!citations.length) return null;
    return packWebResult(query, citations);
  } catch {
    return null;
  }
}

export async function searchWeb({ query = "", liveSearch = searchExa } = {}) {
  const q = String(query || "").trim();
  if (typeof liveSearch === "function") {
    const live = await liveSearch(q);
    if (live?.citations?.length) return live;
  }
  return catalogWebSearch(q);
}
