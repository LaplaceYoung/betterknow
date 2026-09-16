import type { Question } from '@/pages/CourseWork'

// 线上 ExamPage 的题目区（r106 原文）：
//   section.exam-question-shell（--no-image / --multiple / --fill / --animation 按题型与是否有图切换）
//     .exam-question-prompt > .exam-question-kicker + .exam-question-title（填空走 .exam-fill-title + 内联 input 拆 ____）
//       + 有图时 .exam-question-image-panel > img.exam-question-image
//     .exam-options-panel[role=radiogroup|group] > .exam-options-grid > .exam-option-card（--selected）
//       .exam-option-shape（四种形状按序号循环）+ .exam-option-text + 多选 .exam-option-checkbox + 前四个 .exam-option-key
//     填空题另一列放 .exam-fill-spacer
const OPTION_SHAPES = [
  <svg key="triangle" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 17H3z" /></svg>,
  <svg key="diamond" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12z" /></svg>,
  <svg key="circle" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /></svg>,
  <svg key="square" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2.5" /></svg>,
]

export function ExamQuestion({ q, picked, fill, animationHtml, onToggle, onFill }: {
  q: Question
  picked: string[]
  fill: string
  animationHtml?: string
  onToggle: (option: string) => void
  onFill: (value: string) => void
}) {
  const isAnimation = q.type === 'animation'
  const shell = [
    'exam-question-shell',
    !q.image?.src || q.type === 'fill' || isAnimation ? 'exam-question-shell--no-image' : '',
    q.type === 'multiple' ? 'exam-question-shell--multiple' : '',
    q.type === 'fill' ? 'exam-question-shell--fill' : '',
    isAnimation ? 'exam-question-shell--animation' : '',
  ].filter(Boolean).join(' ')
  const kicker = q.type === 'multiple' ? '多选题' : q.type === 'fill' ? '填空题' : isAnimation ? '互动' : '单选题'
  const [before, after = ''] = q.prompt.split('____')
  return (
    <section className={shell} data-testid="exam-question-shell">
      <div className="exam-question-prompt">
        <p className={`exam-question-kicker${q.type === 'multiple' ? ' exam-question-kicker--multiple' : ''}`}>{kicker}</p>
        {q.type === 'fill' ? (
          <h1 className="exam-question-title exam-fill-title">
            <span>{before}</span>
            <input id={`exam-fill-${q.id}`} type="text" className="exam-fill-inline-input" value={fill}
              onChange={(e) => onFill(e.target.value)} aria-label="Your answer" autoComplete="off" spellCheck={false}
              data-testid="exam-fill-input" />
            <span>{after}</span>
          </h1>
        ) : (
          <div className="exam-question-title">{q.prompt}</div>
        )}
        {q.image?.src && q.type !== 'fill' && (
          <div className="exam-question-image-panel">
            <img className="exam-question-image" src={q.image.src} alt={q.image.alt ?? ''} />
          </div>
        )}
      </div>
      {isAnimation && animationHtml && (
        <div className="exam-animation-panel">
          <div className="exam-animation-frame">
            <div className="exam-animation-scaler">
              <iframe className="exam-animation-iframe" title={q.prompt} srcDoc={`${animationHtml}<style>html,body{height:auto!important;min-height:0!important;max-height:none!important;}</style>`} />
            </div>
          </div>
        </div>
      )}
      {q.type === 'fill' ? <span className="exam-fill-spacer" aria-hidden="true" /> : (
        <div className="exam-options-panel" role={q.type === 'multiple' ? 'group' : 'radiogroup'} aria-label="Answer options">
          <div className={['exam-options-grid', (q.options ?? []).length <= 2 ? 'exam-options-grid--stacked' : ''].filter(Boolean).join(' ')}>
            {(q.options ?? []).map((option, idx) => {
              const selected = picked.includes(option)
              return (
                <div key={option}
                  className={`exam-option-card${selected ? ' exam-option-card--selected' : ''}`}
                  role={q.type === 'multiple' ? 'checkbox' : 'radio'} aria-checked={selected} tabIndex={0}
                  data-testid={`option-${idx + 1}`}
                  onClick={() => onToggle(option)}
                  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle(option) } }}>
                  <span className="exam-option-shape" aria-hidden="true">{OPTION_SHAPES[idx % OPTION_SHAPES.length]}</span>
                  <span className="exam-option-text">{option}</span>
                  {q.type === 'multiple' && (
                    <span className={`checkbox exam-option-checkbox${selected ? ' checked' : ''}`} aria-hidden="true">
                      <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L10 17.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  )}
                  {idx < 4 && <span className="exam-option-key" aria-hidden="true">{idx + 1}</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
