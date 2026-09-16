import { useState, type CSSProperties } from 'react'

// 线上练习 HUD 的分数槽位数字（r112 practice chunk 里 F/q 两个组件的逐字搬运）：
//   - 每位是一列 30 个字符（0-9 重复三遍）的竖排 strip，用 --slot-from/--slot-to（单位 em）滚动到位
//   - 数字变化时从「上一个值」对应的位滚下来；位数变多时左侧补 0
//   - 逐位延迟 45 * (位数-1-index) ms，从右往左错开
//   - 千分位逗号走 .practice-slot-sep
//   - prefers-reduced-motion 时直接落位，不滚
//   - 整个数字 aria-hidden，由调用方另配一个 .practice-sr-only 的可读文本
const SHIFT = 1.05

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function SlotDigit({ digit, fromDigit, rollKey, delayMs }: { digit: number; fromDigit: number; rollKey: number; delayMs: number }) {
  const from = -(fromDigit + 10) * SHIFT
  const to = -(digit + 20) * SHIFT
  return (
    <span className="practice-slot-digit" style={{ height: '1.05em' }}>
      <span className="practice-slot-digit-strip" key={rollKey}
        style={{ '--slot-from': `${from}em`, '--slot-to': `${to}em`, '--slot-delay': `${delayMs}ms` } as CSSProperties}>
        {Array.from({ length: 30 }, (_, k) => <span className="practice-slot-digit-char" aria-hidden="true" key={k}>{k % 10}</span>)}
      </span>
    </span>
  )
}

export function SlotNumber({ value, className }: { value: number; className?: string }) {
  const [previous, setPrevious] = useState(value)
  const [from, setFrom] = useState(value)
  const [rollKey, setRollKey] = useState(0)
  // React 官方「props 变化时调整 state」写法：渲染期直接改，不用 effect（effect 里 setState 会被 lint 拦）
  if (value !== previous) {
    setPrevious(value)
    if (!prefersReducedMotion()) { setFrom(previous); setRollKey((k) => k + 1) }
  }
  const target = value.toLocaleString().split('')
  const source = from.toLocaleString().split('')
  const offset = target.length - source.length
  return (
    <span className={`practice-slot-score${className ? ` ${className}` : ''}`} aria-hidden="true">
      {target.map((ch, k) => {
        if (!/\d/.test(ch)) return <span className="practice-slot-sep" key={`sep-${k}`}>{ch}</span>
        const srcIndex = k - offset
        const srcChar = srcIndex >= 0 ? source[srcIndex] : '0'
        const fromDigit = /\d/.test(srcChar) ? Number(srcChar) : 0
        const delayMs = prefersReducedMotion() ? 0 : 45 * (target.length - 1 - k)
        return <SlotDigit key={`${k}-${rollKey}`} digit={Number(ch)} fromDigit={fromDigit} rollKey={rollKey} delayMs={delayMs} />
      })}
    </span>
  )
}
