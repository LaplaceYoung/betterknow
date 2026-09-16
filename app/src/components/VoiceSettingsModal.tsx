import { useCallback, useRef, useState } from 'react'
import { X } from 'lucide-react'

// 线上语音设置弹层（VoiceSettingsModal + tts.* 文案）：
//   当前音色（色块 + 名称 + 「· 试听中…」）→ 音色网格（6 个，色块取线上表）→ 语速滑杆（0.5~2，含刻度读数）
//   → 试听（线上放自带的 /tts-samples/<voice>.mp3，本仓换成用你自己的 BYOK 音色真合成一段）
//   讲解播放中不试听（previewPaused），改动保存后提示「新的音色和语速将从下一轮回答开始生效」
const VOICES: Array<{ id: string; label: string; colors: [string, string] }> = [
  { id: 'warm', label: '温暖', colors: ['#F0997B', '#ED93B1'] },
  { id: 'calm', label: '沉稳', colors: ['#85B7EB', '#9AA0A6'] },
  { id: 'bright', label: '明亮', colors: ['#EF9F27', '#F0997B'] },
  { id: 'gentle', label: '柔和', colors: ['#AFA9EC', '#ED93B1'] },
  { id: 'firm', label: '专业', colors: ['#5DCAA5', '#85B7EB'] },
  { id: 'lively', label: '轻快', colors: ['#97C459', '#5DCAA5'] },
]
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

export function VoiceSettingsModal({ open, voiceId, speed, narrationPlaying, onChange, onClose }: {
  open: boolean
  voiceId: string
  speed: number
  narrationPlaying: boolean
  onChange: (next: { voiceId: string; speed: number }) => void
  onClose: () => void
}) {
  const [previewing, setPreviewing] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const stopPreview = useCallback(() => {
    const el = audioRef.current
    if (el) { el.pause(); el.currentTime = 0 }
    setPreviewing(null)
  }, [])

  // 试听：拿你自己配置的音色真合成一段（没配 key 时服务端回内置占位音频）
  const preview = useCallback(async (id: string, rate: number) => {
    if (narrationPlaying) return
    stopPreview()
    setPreviewing(id)
    try {
      const res = await fetch(`/api/v1/tts/preview?voice=${encodeURIComponent(id)}&speed=${rate}&n=${Math.random().toString(36).slice(2)}`, { cache: 'no-store' })
      if (!res.ok) { setPreviewing(null); return }
      const element = new Audio(URL.createObjectURL(new Blob([await res.arrayBuffer()], { type: res.headers.get('content-type') ?? 'audio/mpeg' })))
      element.playbackRate = rate
      element.onended = () => setPreviewing(null)
      element.onerror = () => setPreviewing(null)
      audioRef.current = element
      await element.play().catch(() => setPreviewing(null))
    } catch { setPreviewing(null) }
  }, [narrationPlaying, stopPreview])

  // 关闭时收尾：停掉试听、清掉「已保存」提示（不在 effect 里写 state，改在关闭回调里做）
  const close = useCallback(() => { stopPreview(); setSaved(false); onClose() }, [onClose, stopPreview])

  if (!open) return null
  const current = VOICES.find((voice) => voice.id === voiceId) ?? VOICES[1]
  return (
    <div className="voice-modal-overlay" onClick={close}>
      <section className="voice-modal-container" role="dialog" aria-modal="true" aria-label="语音" data-testid="voice-settings" onClick={(e) => e.stopPropagation()}>
        <header className="voice-modal-header">
          <h2 className="voice-modal-title">语音</h2>
          <button type="button" className="voice-modal-close" aria-label="关闭" onClick={close}><X size={15} /></button>
        </header>

        <div className="voice-modal-section voice-modal-current">
          <span className="voice-modal-section-label">当前音色</span>
          <span className="voice-modal-blob-wrap" aria-hidden="true">
            <span className="voice-modal-avatar" style={{ width: 72, height: 72, background: `radial-gradient(circle at 30% 30%, ${current.colors[0]}, ${current.colors[1]})` }} />
          </span>
          <span className="voice-modal-current-name">{current.label}{previewing === current.id ? ' · 试听中…' : ''}</span>
        </div>

        <div className="voice-modal-section">
          <span className="voice-modal-section-label">音色</span>
          <div className="voice-modal-options-grid">
            {VOICES.map((voice) => (
              <button key={voice.id} type="button" className={`voice-modal-option${voice.id === voiceId ? ' selected' : ''}`}
                data-testid={`voice-option-${voice.id}`} onClick={() => { onChange({ voiceId: voice.id, speed }); setSaved(true); void preview(voice.id, speed) }}>
                <span className="voice-modal-avatar" style={{ background: `radial-gradient(circle at 30% 30%, ${voice.colors[0]}, ${voice.colors[1]})` }} />
                <span className="voice-modal-option-label">{voice.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="voice-modal-section">
          <div className="voice-modal-speed-header">
            <span className="voice-modal-section-label">语速</span>
            <span className="voice-modal-speed-readout">{speed}×</span>
          </div>
          <input type="range" min={0} max={SPEEDS.length - 1} step={1} value={Math.max(0, SPEEDS.indexOf(speed))}
            className="voice-modal-speed-slider" data-testid="voice-speed"
            style={{ '--voice-speed-progress': `${(Math.max(0, SPEEDS.indexOf(speed)) / (SPEEDS.length - 1)) * 100}%` } as React.CSSProperties}
            onChange={(event) => {
              const next = SPEEDS[Number(event.target.value)] ?? 1
              onChange({ voiceId, speed: next })
              setSaved(true)
            }} />
          <div className="voice-modal-speed-ticks">
            {SPEEDS.map((value) => <span key={value} className="voice-modal-speed-tick">{value}×</span>)}
          </div>
        </div>

        {(narrationPlaying || saved) && (
          <div className="voice-modal-notes">
            {narrationPlaying && <p className="voice-modal-apply-note" role="status">讲解正在播放中，暂不试听音色；可等讲解播放完后再试听。</p>}
            {saved && <p className="voice-modal-apply-note" role="status" data-testid="voice-applied">已保存 — 新的音色和语速将从下一轮回答开始生效。</p>}
          </div>
        )}
      </section>
    </div>
  )
}
