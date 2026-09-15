# Hyperknow live surface recon

- **Date:** 2026-09-02
- **Scope:** `hyperknow.io`, `www.hyperknow.io`, `agent.hyperknow.io`, and the 12 CT-discovered subdomains (`api`, `app`, `beta-api`, `canvas-test`, `dev-api`, `go`, `kol`, `mobile`, `qr`, `service`, `status`, `testsuite`).
- **Method:** HTTPS `GET`/`OPTIONS` only. The supplied bearer token was used only on the requested documentation GETs. No POST, registration, write, brute force, fuzzing, injection, or load testing was performed.
- **Request budget:** approximately **110 HTTP requests** (all GET/OPTIONS; DNS lookups and local parsing excluded), below the requested ~120 ceiling. Some unavailable hosts were tested with short connection/TLS timeouts.
- **Baseline read:** `docs/SECURITY_REPORT.md` (findings 1–10) was read before probing. Baseline reported 401-protected API/docs, public `dev-api`, `testsuite` 401, and `beta-api`/`canvas-test` unavailable.

## Root HTTPS results

`code=000` means curl completed DNS resolution but did not receive an HTTP response (TLS failure or timeout), not that the hostname failed DNS. Resolved IPv4 values are the synthetic inspection-network addresses returned during this run; they are not origin IPs.

| Host | HTTPS GET `/` | Time (s) | Server / origin indicators | Reachability and purpose evidence |
|---|---:|---:|---|---|
| `hyperknow.io` | 308 | 0.3169 | `Framer/cc760a6`; `Location: https://www.hyperknow.io/` | Reachable; apex permanently redirects to marketing site. |
| `www.hyperknow.io` | 200 | 0.6599 | `Framer/cc760a6` | Reachable; marketing site, title `Hyperknow - Your all-round learning companion`, generator `Framer 6ae8a13`. |
| `agent.hyperknow.io` | 200 | 0.6253 | `cloudflare`; `X-Powered-By: Express`; `X-Render-Origin-Server: Render` | Reachable; primary SPA shell, title `Hyperknow`, bundle `/assets/js/index-TjoB2Buo.js`. |
| `api.hyperknow.io` | 200 | 0.5312 | `cloudflare` | Reachable; API health root returns `{"status":"ok"}`. Root also emitted HSTS, `X-Frame-Options: DENY`, and strict referrer policy. |
| `app.hyperknow.io` | 000 | 1.2485 | none (TLS `SSL_ERROR_SYSCALL`) | DNS-resolved but HTTPS unavailable from this vantage; purpose not confirmed. |
| `beta-api.hyperknow.io` | 000 | 0.6684 | none (TLS alert `internal error`) | DNS-resolved but HTTPS unavailable; purpose inferred from name only (beta API). |
| `canvas-test.hyperknow.io` | 000 | 12.0015 | none (connection timeout) | DNS-resolved but HTTPS unavailable; purpose inferred from name only (Canvas test environment). |
| `dev-api.hyperknow.io` | 200 | 0.5473 | `cloudflare` | Reachable; development API health root returns `{"status":"ok"}`. |
| `go.hyperknow.io` | 200 | 0.5523 | `cloudflare`; `X-Powered-By: Express`; `X-Render-Origin-Server: Render` | Reachable; Chinese join-code SPA, title `Hyperknow 入群码`, assets `/assets/index-B_JPVKLE.js` and `index-GE9cRlkg.css`. |
| `kol.hyperknow.io` | 200 | 0.4537 | `Google Frontend` | Reachable; KOL administration/dashboard SPA, title `KOL Dashboard · HyperKnow`, assets `index-DnxZmeCG.js` and `index-BPxEnf-b.css`. |
| `mobile.hyperknow.io` | 000 | 1.2517 | none (TLS `SSL_ERROR_SYSCALL`) | DNS-resolved but HTTPS unavailable; purpose not confirmed. |
| `qr.hyperknow.io` | 404 | 0.4494 | `Google Frontend` | Reachable Google-hosted service, but root is not found; no redirect or page title. Likely QR auxiliary service from hostname only; serving content was not demonstrated. |
| `service.hyperknow.io` | 404 | 0.3440 | `cloudflare` | Reachable edge, root is JSON 404; no page/title/redirect. Auxiliary-service purpose is not confirmed. |
| `status.hyperknow.io` | 200 | 2.1142 | provider response did not expose `Server` | Reachable public status page. Title `Nutcracker AI Inc. status`; HTML contains `cdnjs.betterstack.com` preconnect and Better Stack assets, identifying **Better Stack** status-page hosting. |
| `testsuite.hyperknow.io` | 401 | 0.9432 | `Python/3.10 aiohttp/3.14.1` | Reachable but dashboard root is Basic-auth protected. This exposes Python/aiohttp version family in `Server`. |

All listed CT names therefore resolved. Current HTTP reachability was 10/14 including apex and www (or 8/12 subdomains): `hyperknow`, `www`, `agent`, `api`, `dev-api`, `go`, `kol`, `qr`, `service`, `status`, and `testsuite` returned HTTP; `app`, `beta-api`, `canvas-test`, and `mobile` did not complete TLS/HTTP.

## API documentation exposure matrix

Each of `/docs`, `/redoc`, `/openapi.json`, and `/api/v1/docs` was requested once without authorization and once with `Authorization: Bearer <token>` on `api`, `dev-api`, `beta-api`, `canvas-test`, and `testsuite` (40 documentation GETs total).

| Host | `/docs` unauth / bearer | `/redoc` unauth / bearer | `/openapi.json` unauth / bearer | `/api/v1/docs` unauth / bearer | Interpretation |
|---|---|---|---|---|---|
| `api.hyperknow.io` | 401 / 401 | 401 / 401 | 401 / 401 | 404 / 404 | Docs are protected by a separate HTTP Basic challenge (`WWW-Authenticate: Basic realm="API Docs"`); bearer JWT does not unlock them. |
| `dev-api.hyperknow.io` | 401 / 401 | 401 / 401 | 401 / 401 | 404 / 404 | Same as production from this account/vantage; development API is public at the edge but documentation remains Basic-auth protected. |
| `beta-api.hyperknow.io` | 000 / 000 | 000 / 000 | 000 / 000 | 000 / 000 | TLS alert prevented any HTTP response. |
| `canvas-test.hyperknow.io` | 000 / 000 | 000 / 000 | 000 / 000 | 000 / 000 | TLS connection timed out before HTTP. |
| `testsuite.hyperknow.io` | 401 / 401 | 401 / 401 | 401 / 401 | 401 / 401 | Basic challenge `realm="TestSuite Dashboard"`; bearer JWT does not unlock the dashboard. |

### dev OpenAPI attempt and production comparison

`GET https://dev-api.hyperknow.io/openapi.json` was attempted both unauthenticated and with the supplied bearer JWT. Both returned HTTP 401 with `WWW-Authenticate: Basic realm="API Docs"` and body `Authentication required`. **`evidence/dev_openapi.json` was not created because the document was denied.** Consequently, a structural endpoint diff against `evidence/api_endpoints.md` could not be performed. Result: **denied; not shown to be same-as-prod**. The only available comparison is behavioral: dev and prod returned the same 401/Basic challenge for all three root documentation URLs and 404 for `/api/v1/docs`.

The local production inventory has 98 extracted endpoint entries (`evidence/api_endpoints.md` header), while the earlier report's appendix text says 68; that pre-existing count discrepancy is not resolved by this live run because both OpenAPI documents were inaccessible.

## Standard metadata paths

The requested paths were tested on the apex, agent, and all hosts returning HTTP 200 at root. Redirects were not followed for the apex request, so the `hyperknow.io` results below are the apex's 308 responses; `www` was queried directly.

| Host | `/robots.txt` | `/sitemap.xml` | `/.well-known/security.txt` | `/favicon.ico` |
|---|---|---|---|---|
| `hyperknow.io` | 308 → `www.hyperknow.io/robots.txt` | 308 → `www.hyperknow.io/sitemap.xml` | 308 → `www.hyperknow.io/.well-known/security.txt` | 308 → `www.hyperknow.io/favicon.ico` |
| `www.hyperknow.io` | 200 `text/plain`, `User-agent: * Allow: / Sitemap: https://www.hyperknow.io/sitemap.xml` | 200 `text/xml` (1,281 bytes) | 404 `Not found` | 404 `Not found` |
| `agent.hyperknow.io` | 200 but SPA HTML (`text/html`, 4,431 bytes) | 200 but SPA HTML | 200 but SPA HTML | 200 but SPA HTML |
| `api.hyperknow.io` | 200 `text/plain` (1,248 bytes) | 404 `{"detail":"Not Found"}` | 404 `{"detail":"Not Found"}` | 404 `{"detail":"Not Found"}` |
| `dev-api.hyperknow.io` | 200 `text/plain` (1,248 bytes) | 404 `{"detail":"Not Found"}` | 404 `{"detail":"Not Found"}` | 404 `{"detail":"Not Found"}` |
| `go.hyperknow.io` | 200 but SPA HTML (407 bytes) | 200 but SPA HTML | 200 but SPA HTML | 200 but SPA HTML |
| `kol.hyperknow.io` | 200 but SPA HTML (801 bytes) | 200 but SPA HTML | 200 but SPA HTML | 200 but SPA HTML |
| `status.hyperknow.io` | 200 empty `text/plain` | 301 back to `/` | 301 back to `/` | 200 `image/vnd.microsoft.icon` with zero-byte response |

The SPA fallback behavior on `agent`, `go`, and `kol` means these paths do **not** constitute valid robots, sitemap, security.txt, or favicon resources despite their 200 statuses. No standard `security.txt` was observed on any queried host.

## API-only special probes

These were single requests on `api.hyperknow.io` as requested:

| Request | Status | Relevant headers | Body |
|---|---:|---|---|
| `OPTIONS /api/v1/auth/login` | 405 | `Allow: POST`; no `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, or `Access-Control-Allow-Headers` observed | `{"detail":"Method Not Allowed"}` |
| `GET /api/v1/nonexistent-zzz` | 404 | HSTS, `X-Frame-Options: DENY`, strict referrer policy; no rate-limit headers | `{"detail":"Not Found"}` |
| `GET /api/net-check` | 404 | Same security headers; no rate-limit headers | `{"detail":"Not Found"}` |
| `GET /api/v1/net-check` | 200 | HSTS, `X-Frame-Options: DENY`, strict referrer policy; no rate-limit headers | `{"ok":true,"state":"ok","t":1788364648356}` |

The auth endpoint's OPTIONS response advertises only `Allow: POST`; CORS headers were absent in this request. This is not a CORS vulnerability finding by itself because a browser preflight normally includes an `Origin` and requested-method/header fields, which were intentionally not added under the read-only probe constraints. No `Retry-After` or `X-RateLimit-*` headers appeared on these responses.

## Trimmed raw excerpts

```text
GET https://api.hyperknow.io/
HTTP/2 200
server: cloudflare
strict-transport-security: max-age=31536000; includeSubDomains
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
{"status":"ok"}
```

```text
GET https://dev-api.hyperknow.io/
HTTP/2 200
server: cloudflare
strict-transport-security: max-age=31536000; includeSubDomains
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
{"status":"ok"}
```

```text
GET https://dev-api.hyperknow.io/openapi.json
HTTP/2 401
www-authenticate: Basic realm="API Docs"
content-type: text/plain; charset=utf-8
Authentication required
```

```text
GET https://testsuite.hyperknow.io/
HTTP/2 401
server: Python/3.10 aiohttp/3.14.1
www-authenticate: Basic realm="TestSuite Dashboard"
```

```text
GET https://status.hyperknow.io/
HTTP 200
<title>Nutcracker AI Inc. status</title>
<link href='https://cdnjs.betterstack.com' rel='preconnect'>
```

```text
OPTIONS https://api.hyperknow.io/api/v1/auth/login
HTTP/2 405
allow: POST
{"detail":"Method Not Allowed"}
```

```text
GET https://api.hyperknow.io/api/v1/net-check
HTTP/2 200
{"ok":true,"state":"ok","t":1788364648356}
```

```text
GET https://www.hyperknow.io/
HTTP/2 200
server: Framer/cc760a6
x-powered-by: (absent)
<meta name="generator" content="Framer 6ae8a13">
<title>Hyperknow - Your all-round learning companion</title>
```

## Delta from `docs/SECURITY_REPORT.md` findings 1–10

Only new or materially refined observations from this pass are listed here:

1. **API root hardening is better than the SPA baseline:** both `api` and `dev-api` root responses emitted HSTS, `X-Frame-Options: DENY`, and strict referrer policy. This does not establish that all API routes or frontends share the same headers, but refines the earlier “主站” response-header finding to distinguish API roots from the main SPA.
2. **Docs use a separate Basic-auth gate:** production and dev `/docs`, `/redoc`, and `/openapi.json` returned `401` with `Basic realm="API Docs"` even when sent the supplied valid bearer JWT. `/api/v1/docs` is a normal JSON 404. This explains why the previously observed bearer 401 is not evidence that the API JWT was rejected by the API routes themselves.
3. **Dev OpenAPI remains unavailable:** a live, authenticated download and endpoint diff were attempted and denied; no evidence supports either “dev has extra endpoints” or “dev is identical.”
4. **New auxiliary service fingerprints:** `go` is a Render/Express Chinese join-code SPA; `kol` is a Google Frontend KOL Dashboard SPA; `qr` is a Google Frontend root 404; `service` is a Cloudflare-fronted JSON 404; `status` is a Better Stack-hosted status page. These are now evidence-backed purpose guesses rather than CT-name-only labels.
5. **`testsuite` version disclosure confirmed live:** root 401 exposes `Python/3.10 aiohttp/3.14.1`, while its protected documentation paths use `Basic realm="TestSuite Dashboard"`.
6. **Auxiliary metadata behavior:** `agent`, `go`, and `kol` return their SPA shell for standard metadata paths (including `security.txt` and favicon), while `api` and `dev-api` return a 1,248-byte robots policy but no sitemap/security.txt/favicon. No valid `security.txt` was found in this pass.
7. **Voice-mode route distinction:** `/api/v1/net-check` is a public 200 health probe; `/api/net-check` is 404. The nonexistent API route uses the compact FastAPI-style `{"detail":"Not Found"}` shape. No rate-limit headers were exposed on the four special API responses.

These deltas do not claim exploitability. They are passive/read-only surface observations and should be triaged alongside the prior report's auth, localStorage, WS, and public-dev-environment findings.
