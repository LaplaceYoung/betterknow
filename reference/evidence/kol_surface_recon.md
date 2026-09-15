# KOL dashboard surface reconnaissance

- **Target:** `https://kol.hyperknow.io/` (KOL Dashboard · HyperKnow)
- **Date:** 2026-09-03
- **Scope/method:** authorized own-account surface mapping. Static HTML/bundle extraction plus bounded unauthenticated `GET` requests and one empty-JSON (`{}`) `POST` per POST family. No credentials, brute force, guessing, writes, PATCH/DELETE, or state-changing request was sent. The probe artifact files in `assets/kol_surface/` are the raw evidence for the response snippets below.
- **Request count for this assignment:** 15 KOL endpoint GET probes + 2 extra KOL GET probes + 9 KOL POST probes + 12 fixed auxiliary-host GET probes = **38 bounded probes** (well below 80). Asset retrievals are separate static GETs.

## 1. Retrieved surface and assets

The root response was HTTP 200 with title `KOL Dashboard · HyperKnow`. The raw root HTML was saved as `assets/kol_surface/root_response.html` (800 bytes); the browser-rendered HTML (including the unauthenticated login form) is `assets/kol_surface/index.html`.

Root references, all retrieved and pinned:

| Root reference | Saved artifact | Result |
|---|---|---|
| `/assets/index-DnxZmeCG.js` | `assets/kol_surface/assets__index-DnxZmeCG.js` | 477,026-byte production JS bundle |
| `/assets/index-BPxEnf-b.css` | `assets/kol_surface/assets__index-BPxEnf-b.css` | 14,678-byte CSS bundle |
| `/font/satoshi/satoshi.css` | `assets/kol_surface/font__satoshi__satoshi.css` | 846-byte font CSS |
| `/hyperknow_logo.svg` | `assets/kol_surface/hyperknow_logo.svg` | 4,537-byte SVG |
| `/hyperknow-logo-w-text.svg` | `assets/kol_surface/hyperknow-logo-w-text.svg` | 5,077-byte SVG |
| `/font/satoshi/Satoshi-Regular.woff2` | `assets/kol_surface/font__satoshi__Satoshi-Regular.woff2` | 25,516-byte font |
| `/font/satoshi/Satoshi-Medium.woff2` | `assets/kol_surface/font__satoshi__Satoshi-Medium.woff2` | 25,596-byte font |
| `/font/satoshi/Satoshi-Bold.woff2` | `assets/kol_surface/font__satoshi__Satoshi-Bold.woff2` | 25,328-byte font |

The browser initially navigated `/` to `/login`; the login page exposes Chinese email/password fields and a `登录` button. No additional first-party JS/CSS chunk was referenced by the root HTML. A browser extension stylesheet was seen only in the local rendered DOM and is not a KOL asset.

Root response headers included `server: Google Frontend`, `content-type: text/html; charset=utf-8`, `etag`, `last-modified`, and `x-cloud-trace-context`. The root did not emit CSP, HSTS, X-Frame-Options, or Referrer-Policy in the observed headers. This is a surface observation, not an exploit claim.

## 2. Backend, authentication, routes, and authorization

### Backend/base URL

The KOL app uses **same-origin relative paths** (`/api/...`); no separate `kol-api`, `api.hyperknow.io`, or other API base URL occurs in the application-specific source. The bundle also embeds the public Supabase project URL `https://mcpbxxrodqgsmatssajx.supabase.co` and a Supabase `anon` key for browser auth initialization (bundle offset around `396,361`). The Supabase URL/key is a public client configuration value, not a service-role key.

Application API helper (`assets__index-DnxZmeCG.js`, around offset `396,900`) behavior:

1. Reads `kd_local_token` from `localStorage` and validates its `token` and `expiresAt` fields.
2. Otherwise reads a Supabase session access token.
3. Sends `Authorization: Bearer <token>` when available.
4. Sends JSON bodies for non-GET calls.
5. Converts non-2xx JSON `detail` into a client error; plain text is retained as `detail`.

Local login (`around `396,300`) is `POST /api/auth/local-login` with `{email, password}`. A successful response is expected to include `access_token`, `email`, and `expires_in`; the app stores the token as `{token, email, expiresAt}` under `kd_local_token`. Supabase password auth is also attempted first when the embedded Supabase configuration is enabled (`Fd=!!qp`). Google OAuth is **not referenced in the KOL application-specific login/UI code**; Supabase's bundled generic SDK contains provider-capable code, but this does not demonstrate that KOL exposes a Google login button or enabled provider.

### Role guards and route list

The application-specific route table is at `assets__index-DnxZmeCG.js` around offset `475,700` and defines:

| Route | Guard/role | Page purpose inferred from labels and calls |
|---|---|---|
| `/login` | public | Local/Supabase email-password login |
| `/` | authenticated redirect | Redirects `admin` to `/admin`, all other authenticated users to `/me` |
| `/admin` | `role === "admin"` | Stats dashboard |
| `/admin/partners` | `role === "admin"` | KOL/affiliate partner list and sync |
| `/admin/partners/:id` | `role === "admin"` | Partner details, status, notes, codes, redemptions, Dub data |
| `/admin/codes` | `role === "admin"` | Promo-code list and activation/deletion |
| `/admin/campaigns` | `role === "admin"` | Campaign list and creation |
| `/admin/campaigns/:id` | `role === "admin"` | Campaign analytics/events, settings, QR download |
| `/admin/promo-codes` | `role === "admin"` | Promo code management (same page implementation as code menu) |
| `/admin/code-types` | `role === "admin"` | Code-type management |
| `/me` | `role === "kol"` | KOL-owned codes |
| `/me/redemptions` | `role === "kol"` | KOL-owned code redemptions |
| `/me/earnings` | `role === "kol"` | Dub commissions and payouts |
| `*` | authenticated redirect | Falls back through the role-based home redirect |

The guard implementation (`kx`, `wt`, `Al`, around offsets `475,089–475,700`) calls `/api/me`; a returned `role` of `admin` or `kol` controls page access. A `403` from `/api/me` renders a forbidden page; a `401` clears the local token and signs out of Supabase. The app does not rely on the client guard as the sole security boundary: live API calls below independently returned `401` without a bearer token.

## 3. Endpoint inventory from the JS bundle

Offsets below are character offsets in the pinned minified bundle. They are included so each endpoint family is independently reproducible from the downloaded chunk. Paths containing `${...}` are client-substituted identifiers/query values.

### Authentication and identity

| Method(s) | Endpoint | Bundle citation | Empty/unauthenticated probe |
|---|---|---:|---|
| `POST` | `/api/auth/local-login` body `{email,password}` | ~396,300 | `422` with missing `body.email` and `body.password` (see §4) |
| `GET` | `/api/me` | ~398,584 | `401` |
| `GET` | `/api/broadcast` | ~203,560 (Supabase realtime SDK URL construction; no app call) | `404 {"detail":"not found"}` |

`/api/broadcast` is generated by the embedded Supabase realtime SDK when constructing its broadcast URL (not by an application-specific D.get/post call). It was probed once because it is an explicit API path present in the downloaded bundle; it may be unused by this SPA.

### Admin statistics and partner management

| Method | Endpoint | Bundle citation | Notes |
|---|---|---:|---|
| `GET` | `/api/admin/stats` | ~421,859 | Stats totals, by-day, attribution, top partners |
| `GET` | `/api/admin/partners?include_archived=${t}&kind=${r}` | ~424,579 | `kind` UI values `kol` and `affiliate`; archived toggle |
| `GET` | `/api/admin/partners/dub-sync` | ~424,819 | Dub synchronization action is oddly issued as GET by the UI |
| `POST` | `/api/admin/partners` | ~431,371 | Create partner |
| `GET` | `/api/admin/partners/${id}` | ~432,721 | Partner detail |
| `PATCH` | `/api/admin/partners/${id}` | ~428,391, ~434,833, ~436,478 | Status; notes/region updates |
| `DELETE` | `/api/admin/partners/${id}?deactivate_in_dub=${r}` | ~429,701 | Partner deletion |
| `POST` | `/api/admin/partners/${id}/archive?deactivate_in_dub=${r}` | ~429,882 | Partner archive |
| `POST` | `/api/admin/partners/${id}/codes` | ~438,616 | Issue a code for a partner |
| `GET` | `/api/admin/code-types` | ~432,769, ~441,806 | Code type list |

### Admin code management

| Method | Endpoint | Bundle citation | Notes |
|---|---|---:|---|
| `GET` | `/api/admin/promo-codes` | ~441,764 | Promo-code list |
| `PATCH` | `/api/admin/codes/${encodeURIComponent(code)}` | ~439,912, ~441,981, ~449,425 | Toggle/edit active, expiry, redemption limit, notes |
| `DELETE` | `/api/admin/promo-codes/${encodeURIComponent(code)}` | ~442,267 | Delete promo code |
| `PATCH` | `/api/admin/code-types/${code_type}` | ~442,478 | Toggle type active |
| `POST` | `/api/admin/promo-codes` | ~447,741 | Create promo code |
| `POST` | `/api/admin/code-types` | ~450,809 | Create code type |

### Admin campaign management

| Method | Endpoint | Bundle citation | Notes |
|---|---|---:|---|
| `GET` | `/api/admin/campaigns?include_archived=${t}` | ~452,174 | Campaign list |
| `POST` | `/api/admin/campaigns` | ~455,488 | Create campaign |
| `GET` | `/api/admin/campaigns/${id}` | ~457,637 | Campaign detail/analytics/events |
| `PATCH` | `/api/admin/campaigns/${id}` | ~454,670, ~464,513, ~465,025 | Status/settings updates |
| `POST` | `/api/admin/campaigns/${id}/archive` | ~465,378 | Archive campaign |
| `DELETE` | `/api/admin/campaigns/${id}` | ~465,437 | Delete campaign |
| `GET` (blob) | `/api/admin/campaigns/${id}/qr.png?scale=12` | ~461,466 | QR image download |
| `GET` (blob) | `/api/admin/campaigns/${id}/qr.${format}?scale=...` | ~461,704 | QR PNG/SVG download |

### KOL self-service and Dub earnings

| Method | Endpoint | Bundle citation | Notes |
|---|---|---:|---|
| `GET` | `/api/kol/codes` | ~466,947 | Own codes and total redemptions |
| `GET` | `/api/kol/redemptions?limit=200` | ~468,465 | Own redemption table, capped client-side at 200 |
| `GET` | `/api/kol/dub/summary` | ~469,823 | Earnings tiles |
| `GET` | `/api/kol/dub/commissions?page=${page}&pageSize=25${status?}` | ~469,904 | Paginated commissions, optional status filter |
| `GET` | `/api/kol/dub/payouts` | ~470,001 | Payout table |

### Client-supplied POST body shapes (static, not sent except `{}`)

The UI constructs the following bodies; these are source-derived schemas, not successful server responses:

- `POST /api/auth/local-login`: `{email, password}`.
- `POST /api/admin/partners`: `{name, email, region, notes?}`. UI region values: `cn`, `intl`; name/email max 100; notes max 500.
- `POST /api/admin/partners/:id/codes`: `{code_type, code?}`.
- `POST /api/admin/promo-codes`: `{code, reward_kind:"pro_days", reward_value, notes?, expires_at, max_redemptions}`. UI code max 40, days 1–3650, max redemptions 0 means unlimited in the UI.
- `POST /api/admin/code-types`: `{code_type, display_name, reward_kind:"pro_days", reward_value}`. UI `code_type` pattern `[a-z0-9_]{2,32}`.
- `POST /api/admin/campaigns`: `{name, slug?, destination_url, utm_campaign?, utm_source?, utm_medium?, utm_content?, utm_term?, notes?}`. UI requires name/destination URL, and uses `https://hyperknow.io/download` as a placeholder destination.

No POST body was sent to a stateful endpoint other than `{}`. The dummy UUID was used only for path-shape probes; it is not an account identifier.

## 4. Live KOL endpoint probes (no Authorization)

Raw JSON is in `assets/kol_surface/get_probe_results.json`, `post_probe_results.json`, and `extra_get_probe_results.json`. Every request below omitted cookies/credentials and bearer authorization.

### GET results

| Path | Status | Response |
|---|---:|---|
| `/api/me` | 401 | `{"detail":"Authorization header missing or invalid"}` |
| `/api/admin/stats` | 401 | same |
| `/api/admin/partners?include_archived=false&kind=kol` | 401 | same |
| `/api/admin/partners/dub-sync` | 401 | same |
| `/api/admin/partners/00000000-0000-0000-0000-000000000000` | 401 | same |
| `/api/admin/code-types` | 401 | same |
| `/api/admin/promo-codes` | 401 | same |
| `/api/admin/campaigns?include_archived=false` | 401 | same |
| `/api/admin/campaigns/00000000-0000-0000-0000-000000000000` | 401 | same |
| `/api/admin/campaigns/00000000-0000-0000-0000-000000000000/qr.png?scale=12` | 401 | same |
| `/api/kol/codes` | 401 | same |
| `/api/kol/redemptions?limit=200` | 401 | same |
| `/api/kol/dub/summary` | 401 | same |
| `/api/kol/dub/commissions?page=1&pageSize=25` | 401 | same |
| `/api/kol/dub/payouts` | 401 | same |
| `/api/broadcast` | 404 | `{"detail":"not found"}` |
| `/api/admin/campaigns/00000000-0000-0000-0000-000000000000/qr.svg?scale=10` | 401 | `{"detail":"Authorization header missing or invalid"}` |

There was no unauthenticated `200` data response. The KOL API's standard unauthenticated response was consistently HTTP `401`, not `403`; no `WWW-Authenticate` header was present in the captured JSON API responses. The random UUID did not change that outcome because auth is checked before object existence.

### POST `{}` results

| Path | Status | Response |
|---|---:|---|
| `/api/auth/local-login` | 422 | FastAPI/Pydantic-style validation: missing `body.email` and `body.password` |
| `/api/admin/partners` | 401 | `{"detail":"Authorization header missing or invalid"}` |
| `/api/admin/partners/00000000-0000-0000-0000-000000000000/archive?deactivate_in_dub=false` | 401 | same |
| `/api/admin/partners/00000000-0000-0000-0000-000000000000/codes` | 401 | same |
| `/api/admin/promo-codes` | 401 | same |
| `/api/admin/code-types` | 401 | same |
| `/api/admin/campaigns` | 401 | same |
| `/api/admin/campaigns/00000000-0000-0000-0000-000000000000/archive` | 401 | same |
| `/api/admin/campaigns/00000000-0000-0000-0000-000000000000` | 405 | `Allow: GET`, `{"detail":"Method Not Allowed"}`; no state change |

The local-login 422 response is useful backend evidence: it discloses field names and a Pydantic/FastAPI-like validation schema without needing credentials. All admin POST families remained auth-protected. No successful write or mutation occurred.

## 5. Required auxiliary-host probes

Exactly one `GET` was made to each required path on each host. Raw responses are in `assets/kol_surface/aux_probe_results.json`.

| Host/path | Status | Server/content type | Body/result |
|---|---:|---|---|
| `qr.hyperknow.io/health` | 404 | Google Frontend; HTML | `Not found` page |
| `qr.hyperknow.io/healthz` | 404 | server absent in response; Google error HTML | Google 404 page |
| `qr.hyperknow.io/status` | 404 | Google Frontend; HTML | `Not found` page |
| `qr.hyperknow.io/version` | 404 | Google Frontend; HTML | `Not found` page |
| `qr.hyperknow.io/api` | 404 | Google Frontend; HTML | `Not found` page |
| `qr.hyperknow.io/api/health` | 404 | Google Frontend; HTML | `Not found` page |
| `service.hyperknow.io/health` | 401 | Cloudflare; `application/json;charset=UTF-8` | `No API key found in request`; hint says no `apikey` header or URL parameter |
| `service.hyperknow.io/healthz` | 401 | Cloudflare; `application/json;charset=UTF-8` | same missing-API-key message |
| `service.hyperknow.io/status` | 404 | Cloudflare; JSON | `{"error":"requested path is invalid"}` |
| `service.hyperknow.io/version` | 404 | Cloudflare; JSON | same |
| `service.hyperknow.io/api` | 404 | Cloudflare; JSON | same |
| `service.hyperknow.io/api/health` | 401 | Cloudflare; `application/json;charset=UTF-8` | same missing-API-key message |

Interpretation: `qr` currently exposes only Google Frontend 404 behavior for the required paths. `service` is an edge/API-gateway-like surface: health paths are behind an API-key gate, while the other required paths produce an invalid-path JSON error. No API key was guessed or supplied.

## 6. Data model / sensitive KOL and affiliate fields

These names are extracted from UI property accesses and render branches in `assets__index-DnxZmeCG.js` (application region approximately offsets `421,700–475,000`), not from live records. No KOL or admin data was returned unauthenticated.

### Identity, role, partner entities

- `role` (`admin`, `kol`), `email`, `name`, `id`, `user`, `partner`, `partner_id`, `user_id`, `user_email`
- partner classification: `kind` (`kol`, `affiliate`), `region` (`cn`, `intl`), `status` (`active`, `archived`, plus generic UI handling for `disabled`, `approved`, `banned`, `deactivated`, `rejected`, `declined`)
- partner integration/account identifiers: `dub_partner_id`, `dashboard_user_id`, `dub_link_key`, `dub_error`
- partner metadata: `notes`, `created_at`, `updated_at`, `created_by`

### Codes, rewards, redemption

- code fields: `code`, `code_type`, `display_name`, `type_active`, `active`, `expires_at`, `max_redemptions`, `redemptions_count`, `created_at`, `notes`
- reward fields: `reward_kind`, `reward_value`, `reward_granted`; visible reward kind is `pro_days`, with generic fallback formatting for other kinds
- redemption fields: `redeemed_at`, `user_id`, `user_email`, `dub_attribution`
- aggregate/admin stats: `partners_total`, `partners_active`, `codes_total`, `codes_active`, `redemptions_total`, `redemptions_last_30d`, `rewards_granted`, `attribution`, `top_partners`, `partners_by_region`, `by_day`, `count`

### Dub affiliate/KOL commissions and payouts

- summary values: `clicks`, `leads`, `conversions`, `sales`, `sale_amount`, `total_commissions`, `dub_partners_total`, `payouts_enabled_at`, `country`, `status`
- commission records: `created_at`, `type`, `customer_email`, `amount`, `earnings`, `currency`, `status`, `paid_at`
- commission status enum rendered/filtered by the app: `pending`, `processed`, `paid`, `refunded`, `duplicate`, `fraud`, `canceled` (plus an empty/default filter option)
- payout records: `created_at`, `period_start`, `period_end`, `amount`, `currency`, `status`, `paid_at`; the UI marks `completed` as the positive payout state and treats other states as warning
- attribution display enum: `attributed`, `conflict_resolved`, `failed`

### Campaign/QR analytics

- campaign fields: `id`, `name`, `slug`, `status`, `link`, `signup_link`, `destination_url`, `utm_campaign`, `utm_source`, `utm_medium`, `utm_content`, `utm_term`, `notes`, `created_at`, `created_by`, `updated_at`
- campaign analytics: `scans`, `unique_scans`, `signups`, `purchases`, `revenue_cents`, `scans_truncated`, `by_day`, `events`, `events_total`
- event fields: `occurred_at`, `kind` (`purchase` or signup branch), `user_email`, `external_user_id`, `amount_cents`, `currency`

The data model is operationally sensitive: the UI is designed to display partner emails, user emails/user IDs, affiliate attribution, commission amounts/earnings, payout states, redemption counts, campaign conversion data, and external Dub identifiers. Authentication prevented all such records from being read in this pass.

## 7. Stack/version and leakage notes

- **Frontend hosting:** `Google Frontend`; root emitted `x-cloud-trace-context`.
- **API behavior:** JSON `{"detail":"Authorization header missing or invalid"}` and `{"detail":"not found"}` resemble FastAPI/Starlette response conventions. The one empty local-login body returned a Pydantic-style 422 structure with `type`, `loc`, `msg`, and `input` fields. This is a strong implementation fingerprint but not a precise server-version claim.
- **Supabase:** embedded project URL and anon client key; Supabase SDK code includes generic `@supabase` implementation/version strings, but those are library bundle content rather than evidence of the KOL API server version.
- **No KOL server version endpoint:** required `/version` was not exposed by the KOL API in the bundle or probes.
- **No credential or admin data leak:** no access token, password, partner record, commission record, payout record, or admin stats was returned without authorization.
- **No separate KOL API host discovered:** app calls stay on `kol.hyperknow.io/api/...`; the separate `service.hyperknow.io` did not appear in the application-specific endpoint calls.

## 8. Evidence index

- `assets/kol_surface/root_response.html` — raw root HTML.
- `assets/kol_surface/index.html` — rendered login shell HTML.
- `assets/kol_surface/assets__index-DnxZmeCG.js` — primary JS bundle; endpoint/route/data-model source.
- `assets/kol_surface/assets__index-BPxEnf-b.css` — CSS bundle.
- `assets/kol_surface/font__satoshi__satoshi.css` and three WOFF2 files — referenced font assets.
- `assets/kol_surface/hyperknow_logo.svg`, `hyperknow-logo-w-text.svg` — referenced branding assets.
- `assets/kol_surface/root_headers.json` — root response headers and snippets for KOL, qr, service.
- `assets/kol_surface/get_probe_results.json` — 15 unauthenticated KOL GET results.
- `assets/kol_surface/extra_get_probe_results.json` — two additional discovered-path GET results.
- `assets/kol_surface/post_probe_results.json` — nine bounded `{}` POST results.
- `assets/kol_surface/aux_probe_results.json` — all 12 required qr/service path results.
