# Supabase surface assessment

**Target:** `mcpbxxrodqgsmatssajx.supabase.co`  
**Identity:** ordinary authenticated test account (`role=authenticated`, subject UUID recorded in `/tmp/hk_tok`)  
**Date:** 2026-09-02  
**Authorization and method:** read-only recon; only `GET` requests were sent in this batch. No row mutations, RPC calls, subscriptions, writes, deletes, uploads, fuzzing, or load testing were performed.

## Request accounting

Four requests were sent to the Supabase host, all `GET`:

1. `GET /auth/v1/settings?apikey=<anon>` (no `Authorization` header)
2. `GET /rest/v1/` with `apikey=<anon>` and `Authorization: Bearer <authenticated JWT>`
3. `GET /storage/v1/bucket` with both keys
4. A second `GET /rest/v1/?apikey=<anon>` with `Accept: application/openapi+json` to verify the schema response

Total: **4 requests (<15), all read-only**. No table row GET was performed because the REST root did not expose a table inventory.

## Frontend configuration

The bundle `js_bundles/index-TjoB2Buo.js` contains:

- URL: `https://mcpbxxrodqgsmatssajx.supabase.co`
- Public anon key: present in the frontend bundle (JWT payload decodes to `ref=mcpbxxrodqgsmatssajx`, `role=anon`; it is not a `service_role` key).

The supplied user token decodes to `role=authenticated`, with `email_verified=true` in `user_metadata`. Token values and PII are not reproduced here.

## Auth settings (public endpoint)

Request: `GET /auth/v1/settings?apikey=<anon>` without an auth header. HTTP **200**. Exact response:

```json
{"external":{"anonymous_users":false,"apple":false,"azure":false,"bitbucket":false,"discord":false,"snapchat":false,"figma":false,"fly":false,"github":false,"gitlab":false,"google":true,"keycloak":false,"kakao":false,"linkedin":false,"linkedin_oidc":false,"notion":false,"spotify":false,"slack":false,"slack_oidc":false,"workos":false,"twitch":false,"twitter":false,"zoom":false,"email":true,"phone":false},"disable_signup":false,"mailer_autoconfirm":true,"phone_autoconfirm":false,"sms_provider":"twilio","saml_enabled":false,"saml_private_key_next_configured":true,"passkeys_enabled":false}
```

Interpretation:

- Enabled sign-in providers: **email/password and Google** only among the listed external providers.
- Anonymous users, phone, and all other listed social/enterprise providers are disabled.
- `disable_signup=false`: signup is enabled.
- `mailer_autoconfirm=true`: email accounts are automatically confirmed by Auth; no email confirmation gate is enforced by Supabase Auth. This is consistent with the prior finding that the registration flow auto-sets `email_verified=true` without requiring verification mail.
- `phone_autoconfirm=false`; `sms_provider` reports `twilio`, although phone auth is disabled.
- No SMTP credentials or other mailer transport secrets were returned by this public settings endpoint.
- `saml_private_key_next_configured=true` is a configuration indicator; `saml_enabled=false`, so SAML was not enabled in this response.

## REST / PostgREST schema exposure

The required authenticated request was made with both the public anon key and the test user's bearer JWT. The REST root did **not** return an OpenAPI document or table definitions. It returned HTTP **401** with `sb-error-code: UNAUTHORIZED_INVALID_API_KEY_TYPE`.

Exact body saved to [`supabase_rest_schema.json`](./supabase_rest_schema.json):

```json
{"message":"Invalid API key","hint":"Only the `service_role` API key can be used for this endpoint."}
```

The same body was returned on the second request with an explicit `apikey` query parameter and `Accept: application/openapi+json`.

**Exposed table/view inventory:** none observable from this ordinary-user request. Because no table/view definition was returned, there are no columns to inventory and no `users`/`profiles` row confirmation was attempted. This is a limitation of the REST root response, not proof that the database has no tables; the frontend's application data was observed through `api.hyperknow.io` endpoints rather than direct PostgREST calls in the mined bundles.

**RLS risk assessment:** direct PostgREST enumeration is currently blocked at the root by API-key-type enforcement, so table-specific RLS conclusions cannot be made from this probe. The important boundary remains the backend API's authorization checks for user-scoped data. Conceptually, user-scoped records (profiles, conversations, memory, tasks, files) require owner predicates keyed to `auth.uid()`; global/catalog records (marketplace courses and course metadata) may be intentionally readable but should not expose private creator, enrollment, or internal fields. These are review priorities, not claims of direct Supabase exposure from this run.

## Storage

Request: `GET /storage/v1/bucket` with `apikey=<anon>` and the authenticated user's bearer JWT. HTTP **200**, exact body:

```json
[]
```

No bucket names were disclosed. An empty successful list does not demonstrate service-role access; it indicates that this ordinary user received no visible buckets. No object listing or object read was attempted.

## Realtime

No realtime connection was opened, per scope. Static analysis of all frontend bundles found the Supabase Realtime client library and its generic `.channel()` / `postgres_changes` implementation, but **no application-level channel subscription call or channel-name literal**. The only `.channel(` occurrence attributable to the target client is the generic exported Supabase client method itself. Therefore, no frontend-subscribed channel can be identified from the shipped bundles.

## Findings and follow-up priorities

1. **Informational / boundary:** The public anon key is embedded in the SPA as expected and decodes to `role=anon`; no service-role key was found in the inspected bundle.
2. **Medium review priority:** Signup is enabled and `mailer_autoconfirm=true`. Combined with the prior registration observation, a newly registered email account is treated as confirmed without an email-verification step. Product-level abuse controls and backend authorization should not rely on email confirmation alone.
3. **Informational:** The requested REST root does not reveal ordinary-user schema metadata and instead returns `UNAUTHORIZED_INVALID_API_KEY_TYPE`; direct table/column exposure could not be assessed through this endpoint.
4. **Informational:** Storage bucket listing returned `[]`; no bucket names are visible to this user.
5. **Informational:** No application realtime channels were statically identified; no realtime authorization claim was made.

## Evidence files

- [`supabase_rest_schema.json`](./supabase_rest_schema.json) — exact REST root error body.
- `/tmp/hk_auth_settings.json` — exact auth settings response captured during the run (local ephemeral capture).
- `/tmp/hk_storage_buckets.json` — exact storage response captured during the run (local ephemeral capture).
