import { useEffect, useState } from 'react'
import { playSfx } from '@/lib/sfx'
import { RandomCharVideo } from '@/components/CharVideo'
import { snoozedUntil, setSnooze } from '@/lib/useIdlePrompt'

export function IdlePrompt({ title, message, snoozeLabel, keepInChatLabel, backToCoursesLabel, onKeepInChat, onBackToCourses }: {
  title: string
  message: string
  snoozeLabel: string
  keepInChatLabel: string
  backToCoursesLabel: string
  onKeepInChat: () => void
  onBackToCourses: () => void
}) {
  const [snoozed, setSnoozed] = useState(() => snoozedUntil() !== null)
  useEffect(() => { playSfx('reward', 0.45) }, [])
  return (
    <div className="session-idle-prompt-overlay" role="dialog" aria-modal="true" aria-live="polite"
      aria-labelledby="session-idle-prompt-title" aria-describedby="session-idle-prompt-description">
      <div className="session-idle-prompt-row">
        <div className="session-idle-prompt-media" aria-hidden="true">
          <RandomCharVideo className="session-idle-prompt-video" />
        </div>
        <div className="session-idle-prompt-body">
          <span id="session-idle-prompt-title" className="session-idle-prompt-title">{title}</span>
          <span id="session-idle-prompt-description" className="session-idle-prompt-desc">{message}</span>
          <label className="session-idle-prompt-snooze">
            <input type="checkbox" className="session-idle-prompt-snooze-input" checked={snoozed}
              onChange={(e) => { const on = e.target.checked; setSnoozed(on); setSnooze(on) }} />
            <span>{snoozeLabel}</span>
          </label>
          <div className="session-idle-prompt-actions">
            <button type="button" className="session-idle-prompt-btn session-idle-prompt-btn--secondary" onClick={onKeepInChat}>{keepInChatLabel}</button>
            <button type="button" className="session-idle-prompt-btn" onClick={onBackToCourses}>{backToCoursesLabel}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
