import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Question } from '@/pages/CourseWork'

// 线上 ExamPage 的结果页（`D` 分支）逐字搬运：
//   .exam-page--results > .exam-results-scroll
//     header.exam-results-header (eyebrow 结果 / title)
//     ol.exam-results-list > li.exam-result-item(--correct|--incorrect)
//       .exam-result-head(icon + number) + .exam-result-prompt
//       选项题：.exam-result-options > .exam-result-option(--correct|--incorrect) + 「你的答案」tag
//       填空题：.exam-result-fill > 你的答案 / 正确答案 两行
//       .exam-result-explanation（有解析才显示）
//   右下角 .exam-score-badge：百分比 + 答对数 + 得分/满分 + 速答数
const CHECK_PATH = 'M5 12.5L10 17.5L19 7.5'
const CROSS_PATH = 'M1 1L12 12M12 1L1 12'

export interface ExamResultProps {
  title: string
  questions: Question[]
  userAnswers: Record<number, { picked: string[]; fill: string; isRight: boolean }>
  points: number
  perfect: number
  fastCount: number
  onClose: () => void
}

export function ExamResultView({ title, questions, userAnswers, points, perfect, fastCount, onClose }: ExamResultProps) {
  const correctCount = questions.reduce((sum, _q, idx) => sum + (userAnswers[idx]?.isRight ? 1 : 0), 0)
  const percent = questions.length ? Math.round((correctCount / questions.length) * 100) : 0
  return (
    <div className="exam-page exam-page--results" data-testid="exam-results">
      <button type="button" className="exam-close-btn" onClick={onClose} aria-label="Close exam">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d={CROSS_PATH} stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      </button>
      <div className="exam-results-scroll">
        <header className="exam-results-header">
          <p className="exam-results-eyebrow">结果</p>
          <h1 className="exam-results-title">{title || '单元测验'}</h1>
        </header>
        <ol className="exam-results-list">
          {questions.map((q, idx) => {
            const answer = userAnswers[idx]
            const ok = Boolean(answer?.isRight)
            const picked = answer?.picked ?? []
            const fillValue = answer?.fill?.trim() || '—'
            return (
              <li key={q.id} className={`exam-result-item ${ok ? 'exam-result-item--correct' : 'exam-result-item--incorrect'}`}>
                <div className="exam-result-head">
                  <span className={`exam-result-icon ${ok ? 'exam-result-icon--correct' : 'exam-result-icon--incorrect'}`}
                    aria-label={ok ? 'Correct' : 'Incorrect'}>
                    {ok
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={CHECK_PATH} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d={CROSS_PATH} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>}
                  </span>
                  <span className="exam-result-number">第 {idx + 1} 题</span>
                </div>
                <div className="exam-result-prompt">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={{ p: ({ children }) => <p>{children}</p> }}>
                    {q.prompt.split('____').join(' ____ ')}
                  </ReactMarkdown>
                </div>
                {q.type === 'fill' ? (
                  <div className="exam-result-fill">
                    <p className="exam-result-answer-row">你的答案： <strong>{fillValue}</strong></p>
                    <p className="exam-result-answer-row">正确答案： <strong>{(q.correctAnswers ?? []).join(', ')}</strong></p>
                  </div>
                ) : (
                  <div className="exam-result-options">
                    {(q.options ?? []).map((option) => {
                      const isCorrect = (q.correctAnswers ?? []).includes(option)
                      const chosen = picked.includes(option)
                      const cls = ['exam-result-option', isCorrect ? 'exam-result-option--correct' : '', chosen && !isCorrect ? 'exam-result-option--incorrect' : ''].filter(Boolean).join(' ')
                      return (
                        <div key={option} className={cls}>
                          <span className="exam-result-option-text">{option}</span>
                          {chosen && <span className="exam-result-option-tag">你的答案</span>}
                        </div>
                      )
                    })}
                  </div>
                )}
                {q.explanation && (
                  <div className="exam-result-explanation">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{q.explanation}</ReactMarkdown>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
      <div className="exam-score-badge" role="status" aria-label={`Score ${percent} percent`}>
        <span className="exam-score-value">{percent}%</span>
        <span className="exam-score-detail">{correctCount} / {questions.length} 题正确</span>
        <span className="exam-score-points">
          得分 {points.toLocaleString()} / {perfect.toLocaleString()}
          {fastCount > 0 && <span className="exam-score-points-bonus">{fastCount} 题速答</span>}
        </span>
      </div>
    </div>
  )
}
