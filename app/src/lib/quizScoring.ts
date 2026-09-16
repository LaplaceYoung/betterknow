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

// 线上 quizScoring-DluRF6xL.js 里的「本轮排行」对手生成器（导出名 b）：
//   名字池 24 个、三档水平 profile、FNV-1a 哈希 + mulberry32 伪随机，同一个 seed 永远同一批对手。
const RIVAL_NAMES = ['pixelmoth', 'tofu_bandit', 'Nine_Volt', 'mossy.exe', 'sudo_nap', 'Kettle44', 'blue_period', 'orbit_gremlin', 'driftwoodie', 'snoozebutton', 'HALCYON', 'mika_0417', 'velvetcrash', 'deltawave', 'oatmilk_ultra', 'Jinx0', 'paper_tiger', 'slowloris', 'Cassini_9', 'nocturneee', 'brb_kettle', 'fig_and_thyme', 'GNARWHAL', 'lowercase_liam']

const RIVAL_PROFILES = [
  { skill: [0.78, 0.92], fastRate: [0.45, 0.7] },
  { skill: [0.55, 0.72], fastRate: [0.4, 0.75] },
  { skill: [0.38, 0.56], fastRate: [0.2, 0.5] },
]

function hashSeed(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 1831565813) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface RivalScore { name: string; score: number; correctCount: number }

export function makeRivals(seedKey: string, questionCount: number): RivalScore[] {
  const rand = mulberry32(hashSeed(seedKey))
  const pool = [...RIVAL_NAMES]
  return RIVAL_PROFILES.map((profile) => {
    const [name] = pool.splice(Math.floor(rand() * pool.length), 1)
    const roll = mulberry32(hashSeed(`${seedKey}|${name}`))
    const skill = profile.skill[0] + roll() * (profile.skill[1] - profile.skill[0])
    const fastRate = profile.fastRate[0] + roll() * (profile.fastRate[1] - profile.fastRate[0])
    let score = 0
    let streak = 0
    let correct = 0
    for (let k = 0; k < questionCount; k += 1) {
      const ok = roll() < skill
      const fast = roll() < fastRate
      if (ok) {
        score += SCORING.base + Math.min(streak * SCORING.streakStep, SCORING.streakCap) + (fast ? SCORING.fastBonus : 0)
        streak += 1
        correct += 1
      } else streak = 0
    }
    return { name, score, correctCount: correct }
  })
}
