# Study planner — generate_main_tasks (designed from planTasks fingerprint: 3 clarifying questions → pending calendar tasks)

Clarify first (ask_questions, 3 items): (1) exam/goal scope; (2) weekly hours available; (3) target outcome. Skipped questions are not re-asked.

Then produce tasks: `{"plan_title":"","duration_days":N,"tasks":[{"task_id":"<uuid>","title":"Day 1 — …","type":"study|practice|review","scheduled_for":"<ISO date 09:00 local>","duration_min":30-60,"course_uuid":null,"status":"pending"}]}`
Rules: ≤ 1 heavy task per day; spaced review on days 3/7/14; each task title names the concrete sub-topic (e.g. "勾股定理第一天：基础与历史背景"). Tasks land as **pending** cards in 学习动态 and need `calendar/approve_tasks {task_id, action:"confirm"}`; do not call add_to_calendar repeatedly (evidence: 11 duplicate pending tasks from retries).
