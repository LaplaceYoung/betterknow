# HyperKnow deep WebSocket protocol capture

Date: 2026-09-03. Scope was limited to the authorized account and explicitly requested sessions/files. Raw frame archives: `evidence/tool_frames/deep_whiteboard.json` and `deep_pdf.json`.

## Whiteboard teaching channel

Endpoint: `wss://api.hyperknow.io/api/v1/whiteboard/ws?access_token=<JWT>`. A board-session chat request used `type:user_message`, `mode:board_session`, and the text “Teach me the concept of limits on the whiteboard”. The chat response created board session `e9ffb35f666b49a6b7bf04e5c45da2a1`, URL `/whiteboard/e9ffb35f666b49a6b7bf04e5c45da2a1`.

| Direction | Frame type | Shape / fields | Observation |
|---|---|---|---|
| S→C | `connection_established` | `{type}` | Initial WS handshake. |
| S→C | `session_ready` | `{type,session_id,resumed,status,session,messages,whiteboard_state,lecture_outline_id,conversation_id,session_title}` | Session state/resume result. Existing capture confirms these fields. |
| S→C | `lecture_outline_selected` | `{type,lecture_outline_id,ok}` | Course outline selection acknowledgement. |
| S→C | `board` | `{type,board_content,step_id,board_uid,page_id,title?}` | Markdown board state; existing capture contains `board_content`, step/page identifiers. |
| C→S | `resume_session` | `{type,session_id}` | Requested resume of a board session. |
| C→S | `start_teaching` | `{type}` | Starts narration/operation stream. |
| C→S | `interject_question` | `{type,text}` or `{type,audio_b64}` | Interrupts current lecture with a question. |
| C→S | `pause_session` | `{type}` | Pauses lecture state. |
| C→S | `set_tts_config` | `{type,voice_id,speed}` | TTS config, e.g. `calm`, `1`. |
| S→C | `narration` | Server-side teaching narration frame; expected text/step fields were not emitted in the bounded run. | No narration frame observed before the server closed the session; do not infer fields not captured. |
| S→C | interject response | Server-side response to `interject_question`; no response frame observed in bounded run. | Request shape is bundle-confirmed; response unavailable. |

Existing raw whiteboard captures establish `connection_established`, `session_ready`, `lecture_outline_selected`, `board`, `model_probe_started`, `model_probe_result`, and `pong`. A direct deep teaching attempt is retained in `deep_whiteboard.json`; its absence of narration/interject frames is evidence of session/backend behavior at capture time.

## PDF annotation channel

Upload: `POST /api/v1/pdf-annotation/upload` with multipart field `file` and required `session_id`. A 131-byte test PDF returned HTTP 200 and `{file_id:"cc1a9c6ec29143a2bc160f7f937f6674",filename:"deep-protocol.pdf",size:131}`. Without `session_id`, the endpoint returned HTTP 422 (`body.session_id` required).

WS endpoint: `wss://api.hyperknow.io/api/v1/pdf-annotation/ws?access_token=<JWT>`. Initial frame: `{type:"connection_established"}`. A resume against the unrelated board session returned `{type:"error",message:"Session not found",is_complete:true}`. The frontend class names the client operation `sync_pdf_state` with `{type,sync_pdf_state,pdf_state,board_state}`, and sends TTS config `{type:"set_tts_config",voice_id,speed}`. Server annotation vocabulary is handled as `annotation` (fields include `step_id`, `annotation_type`, `page_index`, and annotation payload), `generated_image` (`ann_id,image_url,width,height`), `session_ready`, `course_session_selected`, `voice_transcript`, `interject_user_text`, `interject_response`, and completion/error frames. No unsupported document Q&A was attempted.

## Voice / TTS

Static frontend `voicePrefs-rmmbxoX2.js` and `VoiceSettingsModal-Bp7qApl4.js` enumerate voice IDs: `warm`, `calm`, `bright`, `gentle`, `firm`, `lively`. Valid speed range is 0.5–2; UI presets are 0.5, 0.75, 1, 1.25, 1.5, 2. Practice/project narration REST uses `GET /api/v1/course-generation/courses/{course_uuid}/practice/.../tts?speed={speed}&voice_id={voice_id}` and corresponding project `/tts` paths. Whiteboard/PDF use WS `set_tts_config` rather than a separate voice-list REST endpoint. Default UI values observed in bundles are `calm`, speed `1` for practice/project and `firm`, speed `1` in PDF annotation.

## Evidence limitations

No narration or interject response frame was observed in the bounded direct run; therefore their exact server payload fields remain unconfirmed. No PDF session was created solely for this probe to avoid another credit-consuming generation. All raw frames and HTTP outcomes are preserved separately.
