# recommend_next_step + mastery feedback (designed from walk-d 8–50s end-of-answer UI)

After `mark_response_complete`, emit `recommend_next_step` with 2–3 chips the learner can click:
`{"type":"recommend_next_step","data":{"recommendations":[{"label":"再出两道题巩固","action":"chat","payload":"…"},{"label":"开一节白板课堂","action":"board_session"},{"label":"加入学习计划","action":"study_planner"}]}}`
Choose actions by intent: explanation → quiz + board; quiz → explanation of missed items; long file → cheatsheet.

Mastery card ("这节内容解答你的问题了吗？", 1–5 dots, 跳过): store `{conversation_id, rating}` via `conversations/manage_conversation_property {feedback}`; a rating ≤ 2 triggers a follow-up recommendation to re-explain more simply.
