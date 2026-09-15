/** Empty media provider hooks. Wire image / animation / video clients here later. */

import { chalkboardFor, mediaProviders } from "../domain/media.mjs";

export const MEDIA_PROVIDERS = {
  image: null,
  animation: null,
  video: null,
};

export function mediaHealth() {
  return mediaProviders();
}

export async function fulfillMedia(kind, input = {}) {
  const key = kind === "video" || kind === "image" ? kind : "animation";
  const local = chalkboardFor(key, input);
  const provider = MEDIA_PROVIDERS[key];
  if (typeof provider !== "function") {
    return { ...local, provider: "pending" };
  }
  const remote = await provider(input);
  return { ...local, ...remote, provider: remote?.provider || key };
}
