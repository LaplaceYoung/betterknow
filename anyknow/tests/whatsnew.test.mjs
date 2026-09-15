import assert from "node:assert/strict";
import test from "node:test";
import { WHATNEW, WHATNEW_VERSION, markWhatsNewRead, whatsNewState } from "../src/domain/whatsnew.mjs";

test("whats new paints leftover v1313 Fast Mode changelog", () => {
  const news = whatsNewState({ lang: "zh", readVersion: "" });
  assert.equal(news.version, "1.3.13");
  assert.equal(news.unread, true);
  assert.equal(news.modalTitle, WHATNEW.modalTitle);
  assert.match(news.triggerLabel, /1\.3\.13/);
  assert.match(news.triggerLabel, /未读/);
  assert.equal(news.entries[0].tag, "v1313");
  assert.match(news.entries[0].changes[0].text, /快速模式/);
  assert.equal(news.entries[0].changes[0].type, "new");
  const en = whatsNewState({ lang: "en", readVersion: "" });
  assert.match(en.entries[0].changes[0].text, /Fast Mode/);
  assert.equal(en.modalTitle, "What's new");
  const read = whatsNewState({ lang: "zh", readVersion: markWhatsNewRead() });
  assert.equal(read.unread, false);
  assert.equal(read.version, WHATNEW_VERSION);
  const painted = JSON.stringify(news.entries);
  assert.doesNotMatch(painted, /Hyperknow|Orbie/i);
});
