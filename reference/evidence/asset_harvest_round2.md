# Asset harvest round 2

Generated from the 605-entry font URL manifest, JavaScript bundle static references, production endpoint probes, and `evidence/onboarding_media_urls.txt`. All downloads use one GET per candidate (with baseline HEAD status used to select font URLs). Existing files were never overwritten.

## Directory totals

| Directory | Scope | Files | Bytes |
|---|---|---:|---:|
| `assets/fonts/bin/` | font binaries | 605 | 21,731,352 bytes |
| `assets/img/` | static image/media cache and endpoint probes | 257 | 69,162,936 bytes |
| `hyperclone/server/public/onboarding-new/` | onboarding runtime media | 82 | 40,014,997 bytes |
| `hyperclone/server/public/pages/mainPages/animations/` | Orbie character animation media | 5 | 2,389,645 bytes |
| `hyperclone/server/public/pages/mainPages/home/` | home assets including Orbie greeting | 38 | 17,736,122 bytes |

## Download counts

- Fonts: **605/605** binaries downloaded; 581 `.woff2`, 12 `.woff`, 12 `.ttf`; **21,731,352 bytes**.
- Bundle/static media cache: **258** manifest records; **125** downloaded in this round and 133 already present; resulting `assets/img/` has **257 files / 69,162,936 bytes** (the two >5 MiB videos are cache retries).
- Onboarding operations list: **90 routes**; 87 downloaded and 3 already present; **57,233,820 bytes** across the recorded routes. Runtime destinations are under `hyperclone/server/public/` so onboarding URLs resolve without an asset copy step.
- Production endpoint probes: `/hyperknow_logo.svg` and `/hyperknow-logo-w-text.svg` returned image SVG and are cached. `/favicon.ico`, `/manifest.webmanifest`, `/robots.txt`, and loading/theme/logo variant candidates returned HTTP 200 HTML fallback rather than their requested media type; they are retained in `assets/img/` as probe artifacts for traceability.

## Failures

No unresolved download failures. The two videos initially rejected by the 5 MiB cache cap were explicitly retried without that cap into their public runtime destinations: `onboarding-new/onboarding-new-4.mp4` (10,401,472 bytes) and `pages/mainPages/home/orbie-greeting.mp4` (15,376,474 bytes).

## Remaining asset clues

- The bundle scan still contains dynamic/interpolated references (for example `${e.icon}.svg`, locale JSON, and `${e}.mp3`) that cannot be materialized without runtime data.
- Literal bundle references `/onboarding-new/board-parabola.png` and `/onboarding-new/board-silkroad.png` were downloaded to `assets/img/onboarding-new/`; the onboarding URL inventory did not include them, so they remain cache-only.
- The two large videos exceeded the normal 5 MiB cache cap during the cache pass and were intentionally stored in public runtime destinations after explicit retry: `onboarding-new/onboarding-new-4.mp4` (10,401,472 bytes) and `pages/mainPages/home/orbie-greeting.mp4` (15,376,474 bytes).
- The full per-URL records are in `assets/fonts/_font_binary_download_log.json`, `assets/img/_asset_harvest_round2_log.json`, and `evidence/onboarding_media_download_log.json`.
