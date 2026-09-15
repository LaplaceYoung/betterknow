# WS 深层帧·字段级文档（第七轮全补）

## 白板授课 (whiteboard/ws)
服务器→客户端 帧（按实际出现顺序汇总）：

| 帧 | 字段 | 备注 |
|---|---|---|
| connection_established | type | 握手 |
| session_ready | session_id,resumed,status,session,messages[],conversation_id,session_title,whiteboard_state,lecture_outline_id | 会话恢复；session:false 表示无历史 |
| lecture_outline_selected | lecture_outline_id,ok | 课纲选定回执 |
| tts_config | voice_id,speed | 回显 |
| group | actions[{type:board|speak, board_content/spoken_text, step_id, board_uid, page_id, title}] | 步进内容组 |
| tts_segment | audio_url,sequence,step_id,tts_cjk,tts_latin,speed | TTS webm 分片（未鉴权） |
| new_column | step_id,page_id | 画布加列 |
| new_page | step_id,page_id | 画布加页 |
| circle | step_id,target_board_id,page_id,snippet | 圈注 |
| image_gen_pending | step_id,placement_step_id,prompt_preview,caption,page_id | 画前提示泄漏提示词 |
| generated_image | image_url,width,height,caption,step_id,page_id | 完成图（未鉴权） |
| interject_ready | interject_id,mode(cascade) | 打断就绪 |
| interject_text | interject_id,delta | 文本流增量 |
| interject_audio | interject_id,audio_url,sequence,speed,text | 语音分片 |
| interject_done | interject_id,control,text | 打断完成 |
| model_probe_started / model_probe_result | minimal{ok,ttft_ms,text,error},replay,context_turns,context_chars,verdict | 诊断探针 |
| session_paused / insufficient_funds / reward_user / keypoint_complete / animation_pending / animation_failed / voice_transcript / reference_reading_started/completed/failed / generated_animation / ask / done | — | 静态枚举已录，部分未实测 |
客户端→服务端：start_session,resume_session,resume_or_start_course_session{course_session_id},select_course_session,start_teaching{page?},set_lecture_outline,set_tts_config{voice_id,speed},sync_whiteboard_state,interject_start{source:text|mic,mode,step_id,offset_ms},interject_question{text|audio_b64,mime,duration_ms},interject_audio_chunk{pcm_b64},interject_audio_end,interject_resume,narration_pause,pause_session,resume_generation,resume_or_start_course_session,action_step_complete{step_id},action_step_received{step_id},step_completion_response,model_probe,ping{t},question_answers,go_to_next_document,go_to_previous_document

## PDF 批注 (pdf-annotation/ws)
- 实测:start_session → session_ready；resume_session（不存在 id "Session not found"）
- POST /pdf-annotation/upload multipart 需 file+session_id → 200 {file_id,filename,size}
- GET /pdf-annotation/pdf/{session_id}/{file_id}?access_token= 供前端渲染
- 静态:sync_pdf_state{pdf_state,board_state}、annotation 帧字段(step_id,annotation_type,page_index,ann{...})、reference_reading 系列

## 课程生成 (course-generation/ws)
- started{run_dir,run_id}, step{step_id,step_id(status)}, progress{keywords,research.results[{id,url,domain,title}],summaries,reference_ids,stage_name}, questions{question_data{questions[]}}, complete{course{完整课程内嵌}}
- questions 需 course_generation_answers[{question_index,selected_options[]}] 或 mixed-question multi

## 即时对话 (/ws)
- 已实测帧（第四轮）:conversation_created/resumed, credit_status{credit_info{remaining_credits,max_credits,tier},next_reset_time}, conversation_title_updated, thinking, thinking_chunk, tool_selection{...,task_title,model_name,guideline}, tool_execution{started|streaming|processing|executing|completed|error}, content_chunk, code_chunk, code_output, inline_diagram{placeholder_id,data{tag,source_tag,src}}, user_question{question_data{questions[]}}, complete, error
- 服务端 tool_execution.completed 的 data 为**字符串化 JSON**（UI 需 parse）
