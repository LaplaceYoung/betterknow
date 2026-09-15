# 工具调用证据汇集（guideline/参数/产物样本）


## directorAgent
- 出现在: tool_analyze_url_content.json, tool_add_to_calendar.json, skill_systematicLearning_v2.json, tool_generate_cheatsheet.json, tool_generate_main_tasks_answered.json, tool_code_generator_v2.json, tool_generate_cheatsheet_drive.json, tool_video_full.json, tool_search_images.json, tool_documentReading_v3.json, tool_documentReading_v2.json, idor_recheck.json, skill_conceptExplanation.json, tool_main_tasks_full.json, tool_code_generator.json, tool_generate_instructional_video.json, tool_analyze_url.json, tool_publish_file.json, skill_conceptExplanation_after_answer.json, idor_self_read.json, tool_generate_main_tasks.json, tool_create_board_session.json, idor_random_fileid.json, tool_generate_flashcards.json, tool_documentReading.json, tool_create_board_session_v2.json
- completed data 样本:
  - `{"phase":"thinking","thought_chunk_count":0}`
  - `{"phase":"thinking","thought_chunk_count":0}`

## analyze_url_content
- 出现在: tool_analyze_url_content.json, tool_analyze_url.json
- completed data 样本:
  - `{"results":[{"web_id":"WB1IBAttDe","url":"https://example.com"}],"errors":[]}`
  - `{"results":[{"web_id":"D5vVUquezK","url":"https://en.wikipedia.org/wiki/Entropy"}],"errors":[]}`

## generate_content
- 出现在: tool_analyze_url_content.json, tool_code_generator_v2.json, tool_search_images.json, tool_documentReading_v3.json, tool_code_generator.json, tool_publish_file.json, skill_conceptExplanation_after_answer.json, idor_self_read.json
- started 帧字段（guideline/task_title/model）:
  - {"guideline":"Analyze and summarize the content of the provided webpage (web_id: WB1IBAttDe). Provide a clear, scannable overview of the main topics, key information, and any significant details found on the page. Ensure the response is in English.","task_title":"Analyzing webpage content","model_name":"gemini-3-flash-preview","response_style":"normal"}
  - {"guideline":"Analyze and summarize the content of the provided webpage (web_id: WB1IBAttDe). Provide a clear, scannable overview of the main topics, key information, and any significant details found on the page. Ensure the response is in English.","response_style":"normal"}
  - {"guideline":"Provide a QuickSort implementation in JavaScript with detailed comments explaining each step. Include an example of how to use the function. Ensure the response is in English. Since the code execution environment for JavaScript is currently limited, I am providing the code directly for your use.","task_title":"Writing QuickSort in JavaScript","model_name":"gemini-3-flash-preview","re
- completed data 样本:
  - `{"model_used":"gemini-3-flash-preview","chunk_count":22,"total_length":2551,"content":"## Understanding the \"Example Domain\"\n\nThe webpage provided refers to **Example.com**, which serves as a placeholder domain specifically reserved for documentation and educational purposes. \n\n<div content-section=\"definition\">\n<p>An <strong>Example Domain</strong> is a reserved domain name (like example.com, example.net, or example.org) that is guaranteed to exist but is not used for a real website or`
  - `{"model_used":"gemini-3-flash-preview","chunk_count":40,"total_length":4122,"content":"## QuickSort in JavaScript\n\nQuickSort is a highly efficient, \"divide and conquer\" sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.\n\n<div content-section=\"definition\">\n<strong>QuickSort:</strong> A recursive sorting algorithm that picks an element as a piv`

## recommend_next_step
- 出现在: tool_analyze_url_content.json, skill_systematicLearning_v2.json, tool_generate_cheatsheet.json, tool_code_generator_v2.json, tool_generate_cheatsheet_drive.json, tool_search_images.json, tool_documentReading_v3.json, tool_main_tasks_full.json, tool_code_generator.json, tool_publish_file.json, skill_conceptExplanation_after_answer.json, idor_self_read.json, tool_create_board_session.json, idor_random_fileid.json, tool_generate_flashcards.json, tool_documentReading.json, tool_create_board_session_v2.json
- completed data 样本:
  - `{"has_steps":true,"next_steps":[{"display_step":"Create flashcards for review","step_prompt":"Create flashcards about Example.com and its purpose as a reserved domain."},{"display_step":"Generate a quiz on Example.com","step_prompt":"Generate a multiple-choice quiz about Example.com and its significance in documentation."},{"display_step":"Learn more about IANA","step_prompt":"Tell me more about IANA and its role in managing domain names."}],"learning_progress":{"title_action":"new","current_tit`
  - `{"has_steps":true,"next_steps":[{"display_step":"Create flashcards for review","step_prompt":"Create flashcards for blockchain consensus mechanisms"},{"display_step":"Generate a quiz on consensus mechanisms","step_prompt":"Generate a quiz on blockchain consensus mechanisms"},{"display_step":"Explore practical applications of consensus mechanisms","step_prompt":"Show me practical applications of different blockchain consensus mechanisms"}],"learning_progress":{"title_action":"new","current_title"`

## add_to_calendar
- 出现在: tool_add_to_calendar.json
- completed data 样本:
  - `{"tasks":[{"task_id":"af2a5f15-1280-4cfd-8128-5ea43a38444b","user_id":"964e8c0a-f07b-49f4-897a-062e37b9027e","type":"todo-new","title":"Practice Calculus Derivatives","description":"We'll help you master derivative rules and applications through a focused practice session. This includes generating a custom practice set and a structured review of key concepts.","scheduled_for":"2026-09-03T10:00:00+00:00","due_at":"2026-09-03T11:00:00+00:00","created_at":"2026-09-02T17:52:43.669809+00:00","status"`
  - `{"tasks":[{"task_id":"0c706358-8d42-4f52-8662-4d542f9a0b67","user_id":"964e8c0a-f07b-49f4-897a-062e37b9027e","type":"todo-new","title":"Master Calculus Derivatives","description":"We'll help you prepare for your study session by generating targeted practice materials and providing a structured learning environment to master derivative rules and applications.","scheduled_for":"2026-09-03T09:00:00+00:00","due_at":"2026-09-03T11:00:00+00:00","created_at":"2026-09-02T17:52:55.128818+00:00","status":`

## get_skills
- 出现在: skill_systematicLearning_v2.json, tool_generate_cheatsheet_drive.json, tool_documentReading_v3.json, tool_documentReading_v2.json, idor_recheck.json, skill_conceptExplanation.json, tool_main_tasks_full.json, tool_analyze_url.json, tool_generate_main_tasks.json, tool_create_board_session.json, tool_create_board_session_v2.json
- completed data 样本:
  - `{"success":true,"skill_name":"systematicLearning"}`
  - `{"success":true,"skill_name":"cheatsheetGeneration"}`

## memory_recall
- 出现在: skill_systematicLearning_v2.json, tool_generate_cheatsheet.json, skill_conceptExplanation.json, idor_self_read.json, tool_generate_main_tasks.json, idor_random_fileid.json
- completed data 样本:
  - `{"summary":"(no relevant memory)"}`
  - `{"summary":"(no relevant memory)"}`

## search_and_summarize_web
- 出现在: skill_systematicLearning_v2.json, skill_conceptExplanation_after_answer.json, tool_create_board_session.json, tool_create_board_session_v2.json

## create_deep_learn_session
- 出现在: skill_systematicLearning_v2.json
- completed data 样本:
  - `{"deep_learn_session_id":"6b50d217-dce7-429a-80da-5efc16237b9d","deep_learn_session_url":"https://agent.hyperknow.io/deep-learn-session/6b50d217-dce7-429a-80da-5efc16237b9d","task_plan":{"description":"This session provides a comprehensive exploration of blockchain consensus mechanisms, from foundational principles like the Byzantine Generals Problem to modern innovations like DAG-based protocols. You will learn how decentralized networks reach agreement, the trade-offs involved in the Blockchai`

## mark_response_complete
- 出现在: skill_systematicLearning_v2.json, tool_main_tasks_full.json, tool_publish_file.json, tool_create_board_session.json, tool_generate_flashcards.json, tool_create_board_session_v2.json
- error 样本: {"error":"You must use a content tool to produce content before you can mark the response complete. Use at least one of: generate_content, generate_instructional_video, generate_quiz, generate_flashca | {"error":"You must use a content tool to produce content before you can mark the response complete. Use at least one of: generate_content, generate_instructional_video, generate_quiz, generate_flashca

## search_files
- 出现在: tool_generate_cheatsheet.json, tool_generate_cheatsheet_drive.json, idor_recheck.json, idor_self_read.json, idor_random_fileid.json, tool_documentReading.json
- completed data 样本:
  - `{"files":[]}`
  - `{"files":[]}`

## generate_main_tasks
- 出现在: tool_generate_main_tasks_answered.json, tool_main_tasks_full.json
- completed data 样本:
  - `{"success":true,"tasks":[{"task_id":"a630241c-e177-4697-a1dc-366b0089223b","user_id":"964e8c0a-f07b-49f4-897a-062e37b9027e","type":"todo","title":"Calculus Week 1: Limits and Continuity","description":"Master the foundations of limits and the concept of continuity.","scheduled_for":"2026-09-02T09:00:00Z","due_at":"2026-09-08T23:59:59Z","created_at":"2026-09-02T17:43:25.695895+00:00","status":"pending","progress":"not_started","origin_data":null,"subtasks":[{"subtask_id":"2fba251a-68be-4a52-9222-`

## code_generator
- 出现在: tool_code_generator_v2.json
- error 样本: {"error":"Unknown error"} | {}

## generate_instructional_video
- 出现在: tool_video_full.json, tool_generate_instructional_video.json

## read_content
- 出现在: tool_documentReading_v3.json, idor_recheck.json
- error 样本: {"error":"Unknown error"} | {"error":"Unknown error"}

## ask_questions
- 出现在: tool_documentReading_v2.json, idor_recheck.json, skill_conceptExplanation.json, tool_analyze_url.json, tool_generate_main_tasks.json

## publish_file
- 出现在: tool_publish_file.json
- completed data 样本:
  - `{"message":"Successfully published file Pythagorean_Theorem_Note.pdf. The publishing action is done. If this was your goal, stop now and do not publish again. (Pages: 2)","file_id":"OJyxHbjMkk","public_url":"https://api.hyperknow.io/api/v1/files/OJyxHbjMkk","file_type":"PDF","page_count":2}`

## content_planner
- 出现在: skill_conceptExplanation_after_answer.json
- completed data 样本:
  - `{"steps":[{"step_name":"Matrices as Transformations","step_objective":"Explain that matrices transform space by stretching, rotating, or shearing vectors. Use simple, relatable language to set the stage for how vectors change direction or magnitude. After this explanation, call mark_response_complete."},{"step_name":"The Core Idea of Eigenvalues and Eigenvectors","step_objective":"Introduce the concept of eigenvectors as special vectors whose direction remains unchanged (only scaled) after a lin`

## create_board_session
- 出现在: tool_create_board_session.json, tool_create_board_session_v2.json
- completed data 样本:
  - `{"board_sessions":[{"session_id":"c425cfe190ae4fd38755866a435ad425","session_type":"whiteboard_quick_start","title":"Visual Introduction to Derivatives","description":"This session explores derivatives through the transition from secant to tangent lines, covering the limit process, local straightness, physical intuition, and the formal limit definition using a visual, geometric approach.","tags":["Calculus","Derivatives","Mathematics","Visual Learning"],"url":"/whiteboard/c425cfe190ae4fd38755866`
  - `{"board_sessions":[{"session_id":"248fd02f72be4bad82bcdd347b8bf237","session_type":"whiteboard_quick_start","title":"Visual Pythagorean Theorem Walkthrough","description":"A visual demonstration of the Pythagorean theorem using geometric area rearrangement and a 'proof without words' approach on the whiteboard to explain why a&sup2; + b&sup2; = c&sup2;.","tags":["Geometry","Mathematics","Visual Proof"],"url":"/whiteboard/248fd02f72be4bad82bcdd347b8bf237"}]}`

## generate_flashcards
- 出现在: tool_generate_flashcards.json
- completed data 样本:
  - `{"flashcards":[{"question":"What is the name and primary function of OSI Layer 1?","answer":"OSI Layer 1 is the Physical Layer. Its primary function is the transmission and reception of raw bit streams over a physical medium (e.g., cables, radio waves).","index":1},{"question":"Which OSI layer provides reliable point-to-point data transfer between two directly connected nodes, and what is its data unit?","answer":"OSI Layer 2 is the Data Link Layer. It provides reliable point-to-point data trans`
