import assert from "node:assert/strict";
import test from "node:test";
import { catalogWebSearch, searchWeb, webSourceName, webSourceText } from "../src/domain/web.mjs";

test("catalog web search returns real {id,title,url,snippet} not Course notes", async () => {
  const mitosis = catalogWebSearch("explanation of mitosis");
  assert.ok(mitosis.citations.length >= 1);
  const first = mitosis.citations[0];
  assert.equal(typeof first.id, "string");
  assert.ok(first.title);
  assert.match(first.url, /^https:\/\/openstax\.org\//);
  assert.match(first.snippet, /mitosis|cell cycle/i);
  assert.doesNotMatch(JSON.stringify(mitosis), /Course notes|Reference explainer|hyperknow|orbie/i);
  assert.match(webSourceName(mitosis.citations), /OpenStax/);
  assert.match(webSourceText(mitosis.citations), /mitosis/i);

  const plant = catalogWebSearch("plant biology");
  assert.match(plant.citations[0].url, /openstax\.org/);
  assert.match(plant.citations[0].title, /Plant Body|Biology/i);

  const miss = catalogWebSearch("qwerty-unmatched-topic");
  assert.match(miss.citations[0].url, /^https:\/\/openstax\.org\/search/);
  assert.doesNotMatch(miss.citations[0].title, /Course notes/);
});

test("searchWeb prefers live citations then falls back to the catalog", async () => {
  const live = await searchWeb({
    query: "mitosis",
    liveSearch: async () => ({
      query: "mitosis",
      citations: [
        {
          id: "exa_1",
          title: "OpenStax Biology 2e — The Cell Cycle",
          url: "https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle",
          snippet: "Mitosis produces two identical nuclei.",
        },
      ],
    }),
  });
  assert.equal(live.citations[0].id, "exa_1");

  const fallback = await searchWeb({
    query: "mitosis",
    liveSearch: async () => null,
  });
  assert.match(fallback.citations[0].url, /10-2-the-cell-cycle/);
});
