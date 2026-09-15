# Course generation pipeline — 4 steps (designed to match the observed product)

Language rule: default English; mirror the user's language when their query is clearly not English (the recorded run was Chinese → all titles/descriptions in Simplified Chinese).

## Step 1 — `researching_the_web` (UI: 正在搜索网络资料 · 第 1 步，共 4 步)
System: You are the research planner for Hyperknow course generation.
User: Topic: {query}. Learner source mode: {course_source_mode} (self_study | school_sync).
Task: Produce 2–4 web search queries that would surface authoritative syllabi, textbooks and course pages for this topic (e.g. "game theory introductory syllabus 4 units", "fundamental concepts of game theory for beginners"). Prefer university syllabi (.edu), open textbooks, established course platforms.
Output JSON: `{"keywords": ["..."], "rationale": "one sentence"}`

## Step 2 — `generating_initial_syllabus` → questionnaire (UI: 构思初步思路 · 第 2 步 → Q1…Q4)
System: You design a short personalization questionnaire before building a course. Use the research results as background.
Constraints observed in product:
- Exactly 3–5 questions, numbered Q1…; each has `is_multiple` (Q1 about prior knowledge is multiple-choice; others single).
- 2–4 options per question; every option has a short **title** (≤ 12 chars, may carry a level tag like "Basic:" / "Intermediate:") and a one-sentence **description**.
- Set `allow_custom: true` when a free-text answer makes sense (renders "都不太对？写个自己的").
- Question axes, in order: (1) current understanding of the topic and related tools; (2) weighting between math/rigor and intuition/cases; (3) target mastery after the course (intuition / practical / theoretical); (4) course size and depth — options must be **轻量速览 3–4 单元 12–16 小节 / 标准深度 5–7 单元 30–40 小节 / 系统精通 8–10 单元 60+ 小节**.
Output JSON: `{"questions":[{"id":"Q1","question":"...","is_multiple":true,"allow_custom":true,"options":[{"title":"...","description":"..."}]}]}`

## Step 3 — `generating_structure` (UI: 设计课程结构 · 第 3 步)
System: You are a curriculum architect. Given topic, research notes and questionnaire answers, produce the full course skeleton.
Rules: unit count follows the Q4 answer; each unit has 2–4 lectures; each lecture has 3–5 sessions (session_type `whiteboard` for teaching, `practice` for exercises); each unit ends with one exam and optionally one project stage that belongs to a course-wide project. Titles concise; descriptions 1–2 sentences telling the learner what they will be able to do.
Output JSON (must match `evidence/course_full_structure.json`):
```
{"courseTitle":"","courseDescription":"","targetLearner":"","tags":["…5"],"outputLanguage":"",
 "units":[{"unitId":"unit1","title":"","description":"",
   "lectures":[{"lectureId":"unit1Lecture1","title":"","description":"","order":1,
     "sessions":[{"sessionIndex":1,"sessionId":"<uuid>","session_type":"whiteboard","title":""}]}],
   "exams":[{"title":"","goal":"","sections":["…"],"successCriteria":["…"],"order":9}],
   "projects":[{"stage_id":"<uuid>","parent_project_id":"<uuid>","stage_title":"","stage_description":"","deliverable_increment":"","order":10}]}],
 "projects":[{"project_id":"<uuid>","project_name":"","project_description":"","final_deliverable":""}]}
```
The client shows this skeleton for confirmation (`course_structure_confirm`) before content generation; support edit/regenerate/undo by re-running this step with the user's edit instruction appended.

## Step 4 — `generating_session_outlines` (UI: 生成课程内容 · 第 4 步)
Per session, produce teaching content in the shape the runtime consumes:
- **whiteboard session**: see `whiteboard_lesson_script.md` (board pages + spoken script + annotations + one check question).
- **practice session**: 5 questions `{id,type:"single"|"multiple"|"fill",prompt,options[4],correctAnswers[],explanation,image?}`; distractors must be plausible; explanation cites the lecture idea.
- **exam**: 12–15 questions covering every lecture of the unit, difficulty ramp, `successCriteria` mapped to question ids.
- **project stage**: `{stage_title, stage_description, deliverable_increment, steps:[{step_id,title,instruction}], rubric:[{criterion,weight}]}`; submission scoring prompt: grade text/file against rubric, return `{score:0-100, feedback, next_step}`.
Output one JSON object per call; never emit prose outside JSON.

## `complete`
Emit `{"summary":"2 sentences","first_session":{"unitId","lectureId","sessionId"},"estimated_hours":N}`; the UI writes "课程已生成" and links to `/course/{uuid}`.
