import { normalizeQuestion } from "./exam.mjs";

export const MATERIALS_EMPTY = "本课程暂无资料";

export function quizQuestionFromArtifact(q, index = 0) {
  if (q.options && (q.correctAnswers || q.answers)) return normalizeQuestion(q, index);
  const options = (q.choices || q.options || []).map(String);
  const idx = Number(q.answer);
  const correctAnswers = Number.isInteger(idx) && options[idx] != null ? [options[idx]] : (q.correctAnswers || []).map(String);
  return normalizeQuestion(
    {
      id: q.id || `mq${index + 1}`,
      type: q.type || "single",
      prompt: q.prompt || q.question || "",
      options,
      correctAnswers,
      explanation: q.explanation || "",
    },
    index,
  );
}

export function materialsPack(artifacts = {}) {
  const cheatsheet = artifacts.cheatsheet || null;
  const quizRaw = artifacts.quiz || null;
  const flashcards = artifacts.flashcards || null;
  const quiz = quizRaw
    ? {
        ...quizRaw,
        questions: (quizRaw.questions || []).map((q, i) => quizQuestionFromArtifact(q, i)),
      }
    : null;
  const animation = artifacts.animation || null;
  const video = artifacts.video || null;
  const image = artifacts.image || artifacts.boardImage || null;
  const cardCount = flashcards?.cards?.length || 0;
  const sectionCount = cheatsheet?.sections?.length || 0;
  return {
    cheatsheet,
    quiz,
    flashcards,
    animation,
    video,
    image,
    empty: !cheatsheet && !quiz && !flashcards && !animation && !video && !image,
    emptyCopy: MATERIALS_EMPTY,
    tabs: [
      cheatsheet ? "cheatsheet" : null,
      quiz ? "quiz" : null,
      flashcards ? "cards" : null,
      animation ? "animation" : null,
      video ? "video" : null,
      image ? "image" : null,
    ].filter(Boolean),
    basedOn: artifacts.basedOn || "",
    sectionCount,
    cardCount,
    quizCount: quiz?.questions?.length || 0,
  };
}
