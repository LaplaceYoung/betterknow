import { useCallback, useEffect, useRef, useState } from 'react'

// 线上 VoiceSendPrompt chunk 的闲置提示（$h + Af 逐字搬运）：
//   snooze 键 sessionIdlePrompt.snoozedUntil，勾选写入 Date.now()+6048e5（7 天）
//   活动事件 pointerdown/keydown/wheel/touchstart 会重新计时；默认 120s
//   弹出时播 reward.mp3，音量 0.45
const IDLE_SNOOZE_KEY = 'sessionIdlePrompt.snoozedUntil'
const IDLE_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const

export function snoozedUntil(): number | null {
  try {
    const raw = window.localStorage.getItem(IDLE_SNOOZE_KEY)
    if (!raw) return null
    const until = Number(raw)
    if (Number.isFinite(until) && until > Date.now()) return until
    window.localStorage.removeItem(IDLE_SNOOZE_KEY)
    return null
  } catch { return null }
}

export function setSnooze(on: boolean) {
  try {
    if (on) window.localStorage.setItem(IDLE_SNOOZE_KEY, String(Date.now() + 6048e5))
    else window.localStorage.removeItem(IDLE_SNOOZE_KEY)
  } catch { /* 隐私模式下忽略 */ }
}

export function useIdlePrompt({ enabled = true, delayMs = 120000 }: { enabled?: boolean; delayMs?: number } = {}) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | null>(null)
  const clear = useCallback(() => { if (timer.current !== null) { window.clearTimeout(timer.current); timer.current = null } }, [])
  const arm = useCallback(() => {
    clear()
    if (!enabled || open) return
    if (snoozedUntil() !== null) return
    timer.current = window.setTimeout(() => { setOpen(true); timer.current = null }, delayMs)
  }, [clear, delayMs, enabled, open])
  const dismissIdlePrompt = useCallback(() => setOpen(false), [])
  useEffect(() => {
    if (!enabled || open) { clear(); return }
    const onActivity = () => arm()
    const opts: AddEventListenerOptions = { passive: true }
    arm()
    IDLE_EVENTS.forEach((event) => window.addEventListener(event, onActivity, opts))
    return () => { clear(); IDLE_EVENTS.forEach((event) => window.removeEventListener(event, onActivity, opts)) }
  }, [clear, enabled, open, arm])
  // enabled=false 时不弹（不额外 setState，免得 effect 里改状态触发级联渲染）
  return { isIdlePromptOpen: enabled && open, dismissIdlePrompt }
}

