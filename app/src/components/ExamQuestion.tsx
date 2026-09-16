import { useEffect, useRef, useState } from 'react'
import type { Question } from '@/pages/CourseWork'

// 线上互动题：iframe 载入服务端下发的 animationHtml，子页面把内容高度 postMessage 回父页
//   srcDoc = html + 解除视口高度的 style + 这段脚本（逐字搬运）
//   sandbox="allow-scripts"、referrerPolicy="no-referrer"、allow=""
//   父页监听 {type:'hk-anim-height', height} 设置 iframe 高度；宽度不足时按比例缩放（0.5–1）
const ANIM_CHILD_SCRIPT = `<script>(function(){function unlock(){var vh=innerHeight,k=document.body?document.body.children:[];for(var i=0;i<k.length;i++){var s=getComputedStyle(k[i]);if(Math.abs(parseFloat(s.minHeight)-vh)<1)k[i].style.minHeight='0px';if(Math.abs(parseFloat(s.height)-vh)<1)k[i].style.height='auto'}}function r(){try{unlock();var h=Math.ceil(document.documentElement.getBoundingClientRect().height);if(h>0)parent.postMessage({type:'hk-anim-height',height:h},'*')}catch(e){}}r();addEventListener("load",r);try{new ResizeObserver(r).observe(document.documentElement)}catch(e){}})()</script>`

// 设计宽度：动画生成器按 720px 画布出的图，窄于此就等比缩小
const ANIMATION_DESIGN_WIDTH = 720

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
  const [frameHeight, setFrameHeight] = useState(320)
  const [scale, setScale] = useState(1)
  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const frame = frameRef.current
      if (!frame || event.source !== frame.contentWindow) return
      const data = event.data as { type?: string; height?: number } | null
      if (data && typeof data === 'object' && data.type === 'hk-anim-height' && typeof data.height === 'number' && Number.isFinite(data.height) && data.height > 0) {
        setFrameHeight(Math.ceil(data.height))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])
  useEffect(() => {
    const panel = panelRef.current
    if (!isAnimation || !panel) return
    const fit = () => setScale(Math.min(1, Math.max(0.5, panel.clientWidth / ANIMATION_DESIGN_WIDTH)))
    fit()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(fit)
    observer.observe(panel)
    return () => observer.disconnect()
  }, [isAnimation])
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
        <div className="exam-animation-panel" ref={panelRef}>
          <div className="exam-animation-frame">
            <div className="exam-animation-scaler" style={{ height: Math.round(frameHeight * scale) }}>
              <iframe className="exam-animation-iframe" ref={frameRef} title={q.prompt}
                srcDoc={`${animationHtml}<style>html,body{height:auto!important;min-height:0!important;max-height:none!important;}</style>${ANIM_CHILD_SCRIPT}`}
                sandbox="allow-scripts" referrerPolicy="no-referrer" allow=""
                style={{ height: frameHeight, transform: scale < 1 ? `scale(${scale})` : undefined }} />
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
