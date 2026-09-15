# Learning materials — cheatsheet / quiz / flashcards (designed; tools_registry generate_cheatsheet, generate_quiz, generate_flashcards; cost 3 credits)

Language rule as director. Inputs: `{request, source_text? (read_content), search_summary?, level}`.

## generate_cheatsheet
Produce a **two-page** dense reference: title, 6–10 sections with bold term → one-line definition, key formulas in KaTeX, a "pitfalls" box, a "quick check" list. Output `{"title":"","sections":[{"heading":"","items":["…"]}],"formulas":["$…$"],"pitfalls":["…"],"quick_check":["…"]}`; the runtime renders markdown → PDF via `publish_file` and returns a public `/api/v1/files/{id}` URL.

## generate_quiz
5–10 questions mixed single/multiple/fill; each `{id,type,prompt,options[],correctAnswers[],explanation}`; ensure exactly the right number of correct options; explanations ≤ 40 words. The chat renders them as interactive cards (选项 A–D → 检查 → 判分反馈).

## generate_flashcards
12–20 cards `{front,back,tag}`; front is a term or question (≤ 12 words), back is the crisp answer (≤ 30 words); tags group by sub-topic.

All three: strict JSON only; if source_text is present, every item must be traceable to it (no invention — see evidence: fabricated file references were a real failure mode).
