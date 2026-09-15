# REST feature-point map — round 4

**Scope/evidence.** One bearer-authenticated request per requested endpoint (GET preferred; only explicitly permitted POSTs), captured in [`rest_sweep_round4.json`](rest_sweep_round4.json). The artifact contains **33 endpoint-keyed entries**, every raw response body, HTTP status, headers, and URL. The token remained accepted throughout: **0 responses were HTTP 401; token did not die mid-run**. Server response dates are 2026-09-02 UTC although the assessment date is 2026-09-03.

## Endpoint results

| Endpoint | Status | One-line finding |
|---|---:|---|
| `GET conversations/get_conversation_data?conversation_id=df2e9674-e3db-4874-84ce-a16da36b362a` | 405 | `Method Not Allowed`, `Allow: POST`; requested GET is not supported, so history/system-role shape could not be obtained through this method. |
| `GET conversations/get_conversation_data?conversation_id=4e1e93da-fa83-4196-bd61-539eb25aa5f3` | 405 | Same `Allow: POST`; no history returned and no new confirmation about system-role embedding. |
| `GET conversations/list_past_conversations` | 200 | Six owned conversation objects; `pagination.next_cursor=null`, `has_more=false`, so no cursor request was made. |
| `GET deep_learn/get_session_data?session_id=4b01ae73-61ec-499a-8acc-5eff5a38111f` | 405 | `Method Not Allowed`, `Allow: POST`; requested GET cannot expose the full session plan. Prior WS evidence identifies the plan shape below. |
| `GET citation/files?conversation_id=4e1e93da-fa83-4196-bd61-539eb25aa5f3` | 404 | `{"detail":"Not Found"}` on this path/verb. |
| `GET course-generation/courses` | 200 | One owned course returned with full generation/progress metadata. |
| `GET whiteboard/course-outlines` | 200 | One outline index entry returned. |
| `GET whiteboard/course-outlines/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/sessions` | 200 | 47 session objects returned for the owned course. |
| `GET calendar/list_main_tasks` | 200 | Empty task list (`count=0`, `pending_sources_count=0`); no detail call made. |
| `GET calendar/list_pending_main_tasks` | 200 | Empty task list (`count=0`, `pending_sources_count=0`). |
| `GET drive/get_drive_data` | 200 | Owned drive file map exposes `file_zbnnUKRa` and public S3 thumbnail URL; metadata reports 21 source bytes. |
| `GET marketplace/courses` | 200 | 33 marketplace items; full first-item field set captured and consistent across items. |
| `GET share_record/check_shared_status?type=conversation&shared_object_id=4e1e93da-fa83-4196-bd61-539eb25aa5f3` | 200 | `{shared:true, shared_url, record_id, sharing_ends_at:null}` confirms public share state. |
| `GET share_record/share_records` | 405 | Method not allowed; no records list disclosed. |
| `GET memory/get_profile_memory` | 200 | Four profile records returned; each has empty `answer_ids` and blank `last_updated_at`. |
| `GET memory/get_external_memory` | 200 | Empty external memory (`content:""`, `updated_at:null`). |
| `GET memory/get_memory_management` | 200 | Empty managed-memory item list. |
| `GET email_manager/check_email_subscription` | 405 | Method not allowed; per instruction, one empty-body POST was attempted. |
| `POST email_manager/check_email_subscription {}` | 422 | FastAPI validation requires body field `email`; no mutation occurred. |
| `GET stripe/validate-subscription` | 405 | Method not allowed; no subscription validation body disclosed. |
| `GET banner/get_banner_message` | 200 | No banner (`has_message=false`, `message=null`). |
| `GET dailyTrends` | 200 | Large body captured in full (16,815 bytes): `region:"US"`, 50 bilingual hotspots. |
| `GET orbie/get_orbie_recommendations` | 200 | Empty recommendations (`count=0`). |
| `GET usr-msg-inbox/get_message` | 200 | Empty message list with null cursor and `has_more=false`. |
| `GET affiliate/me` | 200 | Affiliate is enabled/active; response includes referral code, Dub link, and portal URL. This is account-state exposure, not a new mutation. |
| `GET connectors/google_calendar/status` | 200 | Connector disconnected; all calendar IDs/timestamps null. |
| `POST deep_learn/manage_session_property` exact `{session_id,action:get}` | 422 | Validation says `deep_learn_session_id` is required; raw response preserved. One allowed adaptation using that field returned 400 requiring exactly one of `starred`, `delete`, or `title`; no property was changed. |
| `POST onboarding/manage_onboarding {}` | 405 | POST is not supported (the client uses PATCH); no onboarding state advance occurred. |
| `POST userPollData/userPollData {}` | 500 | Server DB error: null `user_acquisition_sources` violates not-null constraint; empty probe did not write valid poll data. |
| `POST error/add_error_log` exact benign body | 422 | Validation requires `conversation_id`; exact body was rejected before log creation. |
| `POST chatResponseFollowup/stream` exact body | 422 | Validation requires `keyword` and `keyword_context`; no stream opened and no generated follow-up returned. |
| `POST course-calendar/config` | 405 | Endpoint is GET-only in this deployment; requested POST rejected. |
| `POST course-calendar/draft` exact `{course_uuid}` | 422 | Validation requires `duration_days`; no draft generated. Client source also shows `start_date` and `preferred_weekdays` are required draft fields. |

## New field schemas and semantics

- **Past conversations.** Response is `{conversations, pagination, recent_course}`. Each conversation has exactly: `conversation_id:string`, `title:string`, `created_at:string`, `last_updated_at:string`, `starred:boolean`, `board_session_types:string[]`. Six objects were returned. No system/history content is included by this list endpoint; the two requested history GETs were 405. Existing shared-conversation evidence remains the source of the previously observed `role:"system"` disclosure; this round does not re-confirm it via the requested GET.
- **Owned course (`course-generation/courses`).** Each object has `courseUuid`, `courseTitle`, `courseDescription`, `targetLearner`, `tags:string[]`, `unitCount:int`, `sessionCount:int`, `assignmentCount:int`, `examCount:int`, `ticketVariant:int`, `coverImageUrl`, `wideCoverImageUrl`, `updatedAt`, `createdAt`, `source`, `progress:int`, and `nextItem:{type,title,sessionId,unitId,stageId|null}`.
- **Whiteboard sessions.** Each object has `id` (composite `course_uuid:session_id`), `course_uuid`, `session_id`, `title`, `description`, `lectureOutline`, `session_type`, `unit_id`, `unit_title`, `lecture_id`, `lecture_title`, `session_index:int`, `estimated_minutes:int`, `key_points:string[]`, and `references:[]` (empty in first observed session). 47 sessions were returned.
- **Marketplace course field set (33 items).** `marketplaceId`, `courseTitle`, `courseDescription`, `targetLearner`, `ticketVariant:int`, `coverImageUrl`, `wideCoverImageUrl`, `unitCount:int`, `sessionCount:int`, `subject`, `subjects:string[]`, `enrolled:boolean`, `enrolledCourseUuid:null` for all 33, `joinCount:int`, and `languages:string[]` (typically `['en','zh']`; some English-only). No enrollment POST was sent.
- **Deep-learn plan structure (prior captured WS creation response, because requested GET is 405).** `task_plan:{description:string,tags:string[],title:string,session_task_plan:[{unit_name:string,unit_description:string,tasks:[{task_id:string,task_title:string,task_description:string}]}]}`; the captured Fourier plan has four units with 2, 2, 2, and 1 tasks. The REST GET itself returned no plan.
- **Course-calendar semantics.** The deployed `config` route rejects POST (405); client source calls it via GET. The client constructs draft requests as `{course_uuid,start_date,duration_days,preferred_weekdays}`; the exact requested minimal POST returned 422 on missing `duration_days`, and no schedule was created.
- **Stream follow-up behavior.** The exact requested body was rejected synchronously with 422 for missing `keyword` and `keyword_context`; therefore there was no SSE body, timeout, `chunk`, or `done` event to capture. Client source indicates successful responses use SSE `event: chunk` with `{chunk}` and terminate on `event: done`.
- **Daily trends.** Full raw body is preserved; shape is `{region:string,trends:{hotspots:[{locales:{en:{summary,prompt},zh:{summary,prompt}}}]}}`, with 50 hotspots and both locale objects present.

## Authorization / privilege observations

- **Potential IDOR/BOLA hint:** several reads are addressed only by caller-supplied UUID (`conversation_id`, `session_id`, `course_uuid`) and the public share status returns a share URL/record ID. This is an authorization surface worth enforcing, but this single-account, owned-ID pass did not demonstrate cross-user access and performed no enumeration.
- **Potential privilege creep / account-state exposure:** `affiliate/me` reports an active affiliate code/link, while `drive/get_drive_data` exposes a public S3 thumbnail URL. These are observed account-owned responses, not proof of unauthorized privilege.
- No marketplace enrollment/join, Stripe mutation, onboarding advancement, calendar scheduling, memory update, or other disallowed shared/marketplace mutation was performed. The empty `userPollData` probe reached a server-side constraint error rather than a valid write.
