// 线上 quizScoring-DluRF6xL.js 的逐字搬运（练习与考试共用的计分口径）：
//   { fastWindowMs: 1e4, base: 600, fastBonus: 200, streakStep: 100, streakCap: 400, starThresholds: [.8,.55,.25] }
// 每答对一题：base + min(streak * streakStep, streakCap)；窗口内答对再加 fastBonus。
// 答错或跳过会清零连对；perfect 按「每题都答对且都在窗口内」累加；星级按 total/perfect 的比例取 3/2/1。
export const SCORING = {
  fastWindowMs: 10000,
  base: 600,
  fastBonus: 200,
  streakStep: 100,
  streakCap: 400,
  starThresholds: [0.8, 0.55, 0.25] as const,
}

export interface QuizScoringInput {
  questionIds: string[]
  revealedQuestions: Record<string, boolean>
  skippedQuestions: Record<string, boolean>
  questionCorrectness: Record<string, boolean>
  fastAnswers: Record<string, boolean>
}

export function scoreQuiz(input: QuizScoringInput): { total: number; streak: number; bestStreak: number; correctCount: number; fastCount: number } {
  const { questionIds, revealedQuestions, skippedQuestions, questionCorrectness, fastAnswers } = input
  let total = 0
  let streak = 0
  let bestStreak = 0
  let correctCount = 0
  let fastCount = 0
  for (const id of questionIds) {
    const answered = Boolean(revealedQuestions[id])
    if (answered && questionCorrectness[id]) {
      total += SCORING.base + Math.min(streak * SCORING.streakStep, SCORING.streakCap)
      if (fastAnswers[id]) { total += SCORING.fastBonus; fastCount += 1 }
      streak += 1
      bestStreak = Math.max(bestStreak, streak)
      correctCount += 1
    } else if (answered || skippedQuestions[id]) {
      streak = 0
    }
  }
  return { total, streak, bestStreak, correctCount, fastCount }
}

export function perfectScore(questionCount: number): number {
  let sum = 0
  for (let i = 0; i < questionCount; i += 1) sum += SCORING.base + SCORING.fastBonus + Math.min(i * SCORING.streakStep, SCORING.streakCap)
  return sum
}

export function starsFor(score: number, perfect: number): number {
  if (perfect <= 0) return 0
  const ratio = score / perfect
  const [three, two, one] = SCORING.starThresholds
  if (ratio >= three) return 3
  if (ratio >= two) return 2
  if (ratio >= one) return 1
  return 0
}
