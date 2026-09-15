# `go.hyperknow.io` surface recon

- **Date:** 2026-09-03
- **Authorization:** Authorized assessment of the user's own company surface (`Nutcracker AI Inc.`).
- **Scope:** `https://go.hyperknow.io/` and only routes statically discovered in its production SPA.
- **Method:** Static HTML/JavaScript/CSS acquisition and review; HTTPS `GET` plus the two explicitly bounded anonymous `POST {}` probes. No guessing, brute force, credential stuffing, or mutating authenticated request.
- **Live probe count:** **9** (7 GET + 2 POST), below the ceiling of 60. Acquisition used 3 additional transfers (SPA shell, JavaScript, CSS), for **12 total HTTP transfers** in this assignment.
- **Report flavor:** `null` (focused recon evidence; not malware/APT and no exploit claim).

## Executive summary

The join-code service is a small same-origin React/Express application: its frontend and API both live at `go.hyperknow.io`; no separate API hostname, WebSocket endpoint, axios configuration, Supabase/S3/R2 service, or other application third party is embedded in the production assets. The SPA exposes a public school lookup and an openly linked `/admin` interface. Administration uses one opaque value in `X-Admin-Key`, persisted as `localStorage.hk_admin_key`; it is not the main Hyperknow bearer-token/account model. Anonymous admin requests were rejected with `401 {"error":"未授权"}` before request-body validation. The sample join slug displayed by the application, `pku`, currently returns `404 学校不存在`; no valid school, test account, or join code was disclosed in this bounded pass.

## Asset acquisition and completeness

`index.html` declares exactly the JavaScript and CSS below. Static scans of the complete JS found no literal `import()` target, Vite dependency map, `sourceMappingURL`, or additional `/assets/` reference; CSS contains no `url()` or `@import`. Therefore the HTML asset graph and one-level dynamic-import graph are complete for this build.

| File | Bytes | SHA-256 | Purpose |
|---|---:|---|---|
| `index.html` | 407 | `5170649a9d3b9cc6db43a5af2bb6c42054dc126b3433492ec9dc1157bd7eb400` | Saved SPA shell |
| `index-B_JPVKLE.js` | 274,232 | `e58906d59cf94212e3969b9c50f5f5bb4b9d3465bdca453b3bcba679584a624d` | Complete application/vendor bundle |
| `index-GE9cRlkg.css` | 6,653 | `a7872659dfff95ccead66a13a618d17a518d895162b97a84f6af98e17c8537ea` | Complete stylesheet |
| `index.headers.txt` | 734 | `02ccbb597527bd45661e444f565998b0b7662796953a1e5aed7e9b033b503540` | Shell response headers |
| `app-network-excerpt.min.js` | 2,199 | `c125a459112810e0e430594a6dc359d55b0ec1bad1cd74eb341c46ea234f92e5` | Exact bundle excerpt covering storage and every API call |
| `extracted_inventory.json` | 2,419 | `8c16878d83ed78886ca1ea31df2bd8ac42734cdad3fc951017009c1cc707f97c` | Machine-readable routes/auth inventory |
| `live_probe_summary.json` | 3,173 | `e3340daaae19944e66b178b94618fbd1a2fe13db96df01ebeb13391b68a45e2d` | Machine-readable nine-request result set |
| `admin_card_fields.min.js` | 2,539 | `2ff9ed3b9295236896f74677cd0d0985273c7528c4e4e749881c389f8ce639e6` | Exact admin data-field/UI excerpt |
| `create_schema.min.js` | 999 | `fc4f35d51db672d57cee93d533d07896e86cd897e66c0ed5b9a67c7a13d54115` | Exact create body construction excerpt |
| `public_join.min.js` | 2,557 | `69f83da6c875e9431b45d6948618218900e7d416df5448b3c9534668c069c4d4` | Exact public join rendering/expiry flow excerpt |
| `router.min.js` | 489 | `62ee7b1fb593355a73fc416d5c41e0531139094e7f3e67ba0c20c24921e32728` | Exact SPA route excerpt |

All files are under `assets/go_surface/`; `manifest.json` inventories these and the raw request/response captures. The manifest omits its own hash by design to avoid a self-referential digest.
Additional files in the directory are `manifest.json` plus the nine raw probe pairs: `probe-get-root.*`, `probe-get-admin-ui.*`, `probe-get-school-pku.*`, `probe-get-school-placeholder.*`, `probe-get-admin-schools.*`, `probe-get-admin-placeholder.*`, `probe-get-admin-qrcode-placeholder.*`, `probe-post-admin-schools.*`, and `probe-post-admin-qrcode.*` (`*` = `.headers.txt` and `.body`). This is the complete `assets/go_surface/` file list.

## Static endpoint inventory

Citations use byte offsets in the saved UTF-8 production JS (`assets/go_surface/index-B_JPVKLE.js@OFFSET`). All calls use relative URLs and native `fetch`, so the API host is the page origin: `go.hyperknow.io`.

| Method | Path | Auth / request shape | Frontend response use | Citation |
|---|---|---|---|---|
| GET | `/api/school/{slug}` | Anonymous | Public school/join state | `@258047`; render fields at `public_join.min.js` |
| GET | `/api/admin/schools` | `X-Admin-Key` | `{schools, frontendBaseUrl, qrExpiryDays}` | `@258209` |
| POST | `/api/admin/schools` | JSON + `X-Admin-Key`; `{name, slug?}` | Returns `school` | `@258506`; body builder in `create_schema.min.js` |
| POST | `/api/admin/schools/{slug}/qrcode` | Multipart field `file` + `X-Admin-Key` | Returns `school` | `@258800` |
| DELETE | `/api/admin/schools/{slug}` | `X-Admin-Key` | Success/error JSON | `@259034` |
| PATCH | `/api/admin/schools/{slug}` | JSON + `X-Admin-Key`; UI sends changed `customMessage` | Returns `school` | `@259251`; `admin_card_fields.min.js` |

### Literal-path extraction and SPA router

The requested quote-delimited path regex yielded: `/$`, `//`, `/admin`, `/api/admin/schools`, `/s/`, `/s/pku`. The first two are library/parser fragments; `/s/` is string composition and `/s/pku` is UI example copy. Template-literal and router analysis supplies the parameterized paths omitted by the prescribed regex.

| SPA path | Purpose | Citation |
|---|---|---|
| `/` | Landing page; links to the admin UI | `index-B_JPVKLE.js@273980` |
| `/s/:slug` | Public school join-code page | `@274022` |
| `/admin` | Management UI, openly linked in the header/landing page | `@274071` |

No staff, debug, test, metrics, internal, staging, or sandbox application route was present. No additional route chunk exists.

## Live probe results

One request was issued for the root and each discovered GET endpoint/path shape. Dynamic identifiers were represented by the UI's own `pku` example or the literal URL-encoded `{slug}` placeholder; there was no slug dictionary enumeration. POST-looking route families received one `{}` probe each. DELETE/PATCH were not sent because they are mutating and not in the permitted bounded POST set.

| # | Request | Result | Anonymous observation | Raw evidence |
|---:|---|---:|---|---|
| 1 | `GET /` | 200 | SPA HTML | `probe-get-root.*` |
| 2 | `GET /admin` | 200 | Same SPA HTML; admin shell is public, operations are not | `probe-get-admin-ui.*` |
| 3 | `GET /api/school/pku` | 404 | JSON `{"error":"学校不存在"}` | `probe-get-school-pku.*` |
| 4 | `GET /api/school/%7Bslug%7D` | 400 | JSON `{"error":"无效的 slug"}` | `probe-get-school-placeholder.*` |
| 5 | `GET /api/admin/schools` | 401 | JSON `{"error":"未授权"}` | `probe-get-admin-schools.*` |
| 6 | `GET /api/admin/schools/%7Bslug%7D` | 404 | Express `Cannot GET ...`; frontend supports only PATCH/DELETE here | `probe-get-admin-placeholder.*` |
| 7 | `GET /api/admin/schools/%7Bslug%7D/qrcode` | 404 | Express `Cannot GET ...`; frontend supports only POST here | `probe-get-admin-qrcode-placeholder.*` |
| 8 | `POST /api/admin/schools` with `{}` | 401 | Auth runs before JSON schema validation; no schema harvested anonymously | `probe-post-admin-schools.*` |
| 9 | `POST /api/admin/schools/pku/qrcode` with `{}` | 401 | Auth runs before multipart/file validation; no schema harvested anonymously | `probe-post-admin-qrcode.*` |

All API responses identify Express through `X-Powered-By`; all carry Render origin evidence through `X-Render-Origin-Server`. No `Retry-After`, `RateLimit-*`, or `X-RateLimit-*` header appeared. A single-shot pass cannot establish whether server-side throttling exists.

## Auth and join-code flow

1. `/admin` reads `localStorage.hk_admin_key`; the operator enters a “管理密钥”, and the frontend stores it unchanged.
2. The UI validates the key by sending `GET /api/admin/schools` with `X-Admin-Key`; success marks the panel connected and returns school records/configuration. There is no username, password, JWT, refresh token, cookie session, role, or logout endpoint in this SPA.
3. Admins create `{name, slug?}`, upload an image, edit `customMessage`, or delete a school. The UI accepts PNG/JPEG/WebP/GIF and displays `imageFilename`, `imageUploadedAt`, `imageExpiresAt`, and the configured default `qrExpiryDays`.
4. A visitor opens `/s/:slug`; the client performs anonymous `GET /api/school/{slug}`. The server rejects syntactically invalid slugs (`400`) and missing schools (`404`). On success the UI trusts server fields `name`, `displayMessage`, `hasImage`, `imageUrl`, `updatedAt`, `imageExpiresAt`, and `isImageExpired`.
5. The image is shown only when `hasImage && imageUrl`; the UI appends `?t={updatedAt}` for cache busting. It marks the code invalid if no image or `isImageExpired`, shows the server-computed expiry, and provides `contact@hyperknow.io` for stale codes.

This is school-slug lookup plus an admin key, not a user-entered “join code” validation API. The QR image itself is the join credential delivered after public slug lookup.

## Network and backend intelligence

- **API base:** same-origin relative `fetch`; effective base is `https://go.hyperknow.io`. No `baseURL` constant and no axios client.
- **WebSocket:** none (`ws://`, `wss://`, `WebSocket` application use absent).
- **Hardcoded domains:** no application third-party domain. `contact@hyperknow.io` is the only product-domain contact. `react.dev`, `reactrouter.com`, and W3C namespace URLs occur only in bundled library diagnostics/constants; `http://localhost` is React Router's generic URL fallback, not an API target.
- **Storage/CDN:** no Supabase, R2, S3, CloudFront, Firebase, or external image base is embedded. The API returns `imageUrl` and `frontendBaseUrl` dynamically, so their backing hosts cannot be identified without a valid school/admin response.
- **Backend:** Cloudflare fronts an Express app on Render. API error shapes are simple `{error: string}`; unsupported methods fall through to Express HTML `Cannot GET` responses.
- **Data model exposed by UI:** school `name`, `slug`, custom/display message, optional `publicNote`, QR filename/upload/expiry timestamps, image presence/expiry flags, image URL, and updated timestamp.

## Notable findings

| ID | Severity | Finding | Evidence | Confidence | Status |
|---|---|---|---|---|---|
| F-GO-01 | Informational | The public SPA openly exposes an admin route and the complete management API contract. This is surface exposure, not auth bypass. | E-GO-01, E-GO-02 | High | Verified |
| F-GO-02 | Informational | Admin auth is a single `X-Admin-Key` secret persisted in browser `localStorage`, independent of Hyperknow account/JWT auth. Any XSS or local browser compromise on this origin could read it. No XSS was tested or found here. | E-GO-02 | High | Verified design |
| F-GO-03 | Informational | Public school lookup distinguishes invalid slug (`400`) from valid-form nonexistent school (`404`), permitting existence checks if names are already known. No enumeration was performed. | E-GO-03 | High | Verified |
| F-GO-04 | Informational | No visible rate-limit headers are returned by single anonymous requests. This is not proof that rate limiting is absent. | E-GO-03 | Medium | Observation |
| F-GO-05 | Informational | POST authentication precedes schema validation, preventing anonymous harvesting of create/upload schemas from error details. | E-GO-03 | High | Verified |

Recommended hardening: replace the shared admin key with named, revocable staff identities and server-side sessions/MFA; do not retain durable administrative secrets in `localStorage`; remove `X-Powered-By`; and verify server-side throttling/auditing for admin-key failures and public slug lookups. If public school discoverability is intended, the 400/404 distinction is acceptable; otherwise normalize responses.

## Evidence → Finding → Path

| E-id | Source reference | Reproduction | Content hash |
|---|---|---|---|
| E-GO-01 | `assets/go_surface/index.html`, production JS/CSS, and `manifest.json` | `GET https://go.hyperknow.io/`, then fetch the two declared `/assets/...` resources | Hashes in asset table/manifest |
| E-GO-02 | `assets/go_surface/app-network-excerpt.min.js`, `router.min.js`, `public_join.min.js`, `extracted_inventory.json` | Inspect cited byte offsets in saved bundle | Per-file hashes in manifest |
| E-GO-03 | Nine `probe-*.headers.txt` / `probe-*.body` pairs and `live_probe_summary.json` | Replay only the requests listed in the live table | Per-file hashes in manifest |

**P-GO-01 (`path_type=callflow`):** visitor opens `/s/:slug` (E-GO-02) → SPA sends same-origin anonymous `GET /api/school/{slug}` (E-GO-02) → backend validates slug/existence (E-GO-03) → successful response supplies status, expiry and image URL → SPA renders or suppresses the QR based on `hasImage`/`isImageExpired` (E-GO-02).

**P-GO-02 (`path_type=callflow`):** staff opens `/admin` (E-GO-03) → UI loads/stores `hk_admin_key` (E-GO-02; F-GO-02) → each management request supplies `X-Admin-Key` (E-GO-02) → anonymous calls are stopped with 401 before body validation (E-GO-03; F-GO-05).

## Timeline

- 2026-09-03: Acquired SPA shell, response headers, JS, and CSS.
- 2026-09-03: Completed literal-path, fetch, router, domain, WebSocket, asset-dependency, privileged/debug-route, and storage/auth scans.
- 2026-09-03: Issued nine bounded live probes; observed 200/400/401/404 results and no rate-limit headers.
- 2026-09-03: Pinned exact application excerpts, inventories, probe evidence, hashes, and this report.

## Limitations

No valid admin key or valid school slug was available or guessed. Consequently, authenticated schemas, the live school inventory, image storage host, `frontendBaseUrl`, and actual `qrExpiryDays` remain intentionally unobserved. This report does not claim an exploitable vulnerability, missing server-side rate limiting, or admin-key weakness.
