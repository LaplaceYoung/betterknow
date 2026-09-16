import { useCallback, useEffect, useRef, useState } from 'react'

// 线上网络自检（netCheck.*，VoiceModeModal 样式表 + r137 探针实现）：
//   主探针 = GET <prefix>/net-check?n=<rand>，8s 超时；503 且 body.state==='draining' → 更新中
//   实时通道 = 单独开一条 WS 探测（viaProbe）或复用本节课通道（viaSession）
//   进阶两项：语音连接（真取一段音频并量速度）与模型状态（把当前对话重发一遍）
// 本仓：主探针 + 实时通道 + 模型状态走白板 WS 的 model_probe；语音那一项用 /audio-probe 做轻量版
type Tone = 'idle' | 'good' | 'warn' | 'bad'
type StatusKey = 'ok' | 'slow' | 'offline' | 'ws_blocked' | 'server_draining' | 'server_error' | 'server_unreachable' | 'network_down' | 'unknown'

export interface NetCheckPanelProps {
  open: boolean
  onClose: () => void
  variant?: 'whiteboard' | 'pdf'
  muted?: boolean
  narrationPlaying?: boolean
  // 白板 WS 的发送口：模型自检需要一个已建立的课堂通道
  sendProbe?: (requestId: string) => boolean
  sessionAlive?: boolean
}

const STATUS_COPY: Record<StatusKey, { title: string; detail: string }> = {
  ok: { title: '已连接到 Hyperknow', detail: '语音和回复的通道都是通的。如果课堂还是没动静，可以试试下面的模型检查。' },
  slow: { title: '网络延迟较高', detail: '连接正常，但延迟偏高，语音和回复可能会有延迟。' },
  offline: { title: '当前没有联网', detail: '你的设备显示完全没有网络连接。' },
  ws_blocked: { title: '你的网络挡住了实时连接', detail: '普通网页能打开，但上课用的实时通道连不上，所以既没有声音也没有回复。这基本都是公司、学校或校园网络的限制。' },
  server_draining: { title: '我们正在更新', detail: '新版本正在上线，一分钟左右会自动恢复——不是你的网络问题。' },
  server_error: { title: '服务器返回了错误', detail: '问题在我们这边，不是你的网络。请稍后再试。' },
  server_unreachable: { title: '这个网络连不上我们', detail: '其他网站都能访问，只有我们的服务器没有响应。可能是你的网络做了拦截，也可能是我们这边故障。' },
  network_down: { title: '网络连接不可用', detail: '什么都传不出去——连不上我们的服务器，这个页面自己的文件也加载不了。' },
  unknown: { title: '正在检查网络', detail: '请稍候。' },
}

const TONE_OF: Record<StatusKey, Tone> = {
  ok: 'good', slow: 'warn', offline: 'bad', ws_blocked: 'bad', server_draining: 'warn',
  server_error: 'bad', server_unreachable: 'bad', network_down: 'bad', unknown: 'idle',
}

const CAUSES: Partial<Record<StatusKey, string[]>> = {
  ws_blocked: ['公司、学校或校园的防火墙不允许实时连接。', '网络代理放行普通网页，却把实时连接掐断了。', '这台设备上开着 VPN 或安全软件。'],
  server_unreachable: ['我们的地址在这个网络里被单独屏蔽了。', '你的网络解析不到我们的地址，或者把它指向了别处。'],
  network_down: ['Wi-Fi 或移动数据没开，或者已经没有信号。', '酒店、咖啡馆或机场的上网登录页还没完成。'],
  slow: ['当前带宽不够——可能有人在共用这条网，或者信号太弱。'],
}

export function NetCheckPanel({ open, onClose, variant = 'whiteboard', sendProbe, sessionAlive, muted = false, narrationPlaying = false }: NetCheckPanelProps) {
  const [checking, setChecking] = useState(false)
  const [status, setStatus] = useState<StatusKey>('unknown')
  const [latency, setLatency] = useState<number | null>(null)
  const [serverMs, setServerMs] = useState<number | null>(null)
  const [realtime, setRealtime] = useState<'unknown' | 'ok' | 'blocked'>('unknown')
  const [via, setVia] = useState<'session' | 'probe' | null>(null)
  const [updatedAt, setUpdatedAt] = useState<number | null>(null)
  const [tick, setTick] = useState(0)
  const [model, setModel] = useState<{ verdict: string; ttft: number | null; replayed: number | null } | null>(null)
  const [modelBusy, setModelBusy] = useState(false)
  const [audio, setAudio] = useState<string | null>(null)
  const [audioRetry, setAudioRetry] = useState(0)
  const [audioStats, setAudioStats] = useState<{ synthMs: number; kbps: number; bytes: number } | null>(null)
  const [audioSkipped, setAudioSkipped] = useState(false)
  const audioAt = useRef(0)
  const probeId = useRef<string | null>(null)

  const runMainCheck = useCallback(async () => {
    setChecking(true)
    const started = performance.now()
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(`/api/v1/net-check?n=${Math.random().toString(36).slice(2)}`, { cache: 'no-store', signal: controller.signal })
      clearTimeout(timer)
      const ms = Math.round(performance.now() - started)
      setLatency(ms)
      setServerMs(ms)
      let draining = false
      if (res.status === 503) { try { draining = ((await res.json()) as { state?: string }).state === 'draining' } catch { draining = false } }
      // 实时通道：优先复用本节课通道，否则单开一条探测
      let wsState: 'ok' | 'blocked' = 'blocked'
      const viaWhich: 'session' | 'probe' = sessionAlive ? 'session' : 'probe'
      if (sessionAlive) wsState = 'ok'
      else {
        try {
          wsState = await new Promise<'ok' | 'blocked'>((resolve) => {
            const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/api/v1/whiteboard/ws`
            const socket = new WebSocket(url)
            const done = (value: 'ok' | 'blocked') => { try { socket.close() } catch { /* 已关 */ } resolve(value) }
            const timeout = setTimeout(() => done('blocked'), 6000)
            socket.onopen = () => { clearTimeout(timeout); done('ok') }
            socket.onerror = () => { clearTimeout(timeout); done('blocked') }
          })
        } catch { wsState = 'blocked' }
      }
      setRealtime(wsState)
      setVia(viaWhich)
      const next: StatusKey = !navigator.onLine ? 'network_down'
        : draining ? 'server_draining'
          : res.status >= 500 ? 'server_error'
            : wsState === 'blocked' ? 'ws_blocked'
              : ms > 1500 ? 'slow' : 'ok'
      setStatus(next)
      setUpdatedAt(Date.now())
    } catch {
      setStatus(!navigator.onLine ? 'offline' : 'server_unreachable')
      setRealtime('unknown')
      setLatency(null)
      setUpdatedAt(Date.now())
    } finally {
      setChecking(false)
    }
  }, [sessionAlive])

  useEffect(() => {
    if (!open) return
    void runMainCheck()
    const interval = window.setInterval(() => { void runMainCheck() }, 30_000)   // 线上：上课期间每 30 秒自动重查
    return () => window.clearInterval(interval)
  }, [open, runMainCheck])

  useEffect(() => {
    if (!open || !updatedAt) return
    const interval = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(interval)
  }, [open, updatedAt])

  const runModelCheck = useCallback(() => {
    if (!sendProbe) { setModel({ verdict: 'no_session', ttft: null, replayed: null }); return }
    const id = Math.random().toString(36).slice(2, 10)
    probeId.current = id
    setModelBusy(true)
    if (!sendProbe(id)) { setModelBusy(false); setModel({ verdict: 'probe_failed', ttft: null, replayed: null }) }
  }, [sendProbe])

  // 线上 audio 检查：真取一段音频 → 量「我们的处理」与「你的下载速度」→ 尝试播放 → 给 verdict
  const runAudioCheck = useCallback(async () => {
    const now = Date.now()
    if (audioAt.current && now - audioAt.current < 20_000) {
      setAudio('cooldown'); setAudioRetry(Math.ceil((20_000 - (now - audioAt.current)) / 1000)); return
    }
    audioAt.current = now
    setAudio('busy')
    try {
      const started = performance.now()
      const res = await fetch(`/api/v1/audio-probe?sample=1&n=${Math.random().toString(36).slice(2)}`, { cache: 'no-store' })
      if (!res.ok) { setAudio(res.status === 401 ? 'unauthorized' : 'tts_failed'); return }
      const synthMs = Number(res.headers.get('x-synth-ms') ?? 0)
      const buffer = await res.arrayBuffer()
      const downloadMs = performance.now() - started
      const kbps = downloadMs > 0 ? (buffer.byteLength / 1024) / (downloadMs / 1000) : 0
      setAudioStats({ synthMs, kbps: Math.round(kbps), bytes: buffer.byteLength })
      // 尝试播放：静音状态/讲解中不播（线上 playbackSkipped）
      if (muted) { setAudio('muted'); return }
      if (narrationPlaying) { setAudio('ok'); setAudioSkipped(true); return }
      try {
        const url = URL.createObjectURL(new Blob([buffer], { type: res.headers.get('content-type') ?? 'audio/mpeg' }))
        const element = new Audio(url)
        await element.play()
        URL.revokeObjectURL(url)
      } catch { setAudio('playback_blocked'); return }
      setAudio(kbps < 40 ? 'slow_link' : 'ok')
    } catch { setAudio('download_failed') }
  }, [muted, narrationPlaying])

  // 白板把 model_probe_result 转发进来
  useEffect(() => {
    const onProbe = (event: Event) => {
      const detail = (event as CustomEvent<{ ok?: boolean; verdict?: string; ttft_ms?: number; context_turns?: number }>).detail
      setModelBusy(false)
      if (!detail) return
      const verdict = detail.ok ? (detail.verdict ?? 'ok') : 'model_down'
      setModel({ verdict, ttft: detail.ttft_ms ?? null, replayed: detail.context_turns ?? null })
    }
    window.addEventListener('bk:model-probe', onProbe)
    return () => window.removeEventListener('bk:model-probe', onProbe)
  }, [])

  if (!open) return null
  const copy = STATUS_COPY[status]
  const age = updatedAt ? Math.max(0, Math.round((Date.now() - updatedAt) / 1000)) : null
  return (
    <>
      <div className="netcheck-backdrop" onClick={onClose} />
      <div className="netcheck-menu" data-variant={variant} role="dialog" aria-label="网络连接" data-testid="netcheck-menu">
        <div className="netcheck-status" data-tone={TONE_OF[status]}>
          <span className="netcheck-status-dot" data-tone={TONE_OF[status]} aria-hidden="true" />
          <div className="netcheck-status-text">
            <p className="netcheck-status-title">{checking ? '检查中…' : copy.title}</p>
            <p className="netcheck-status-detail">{copy.detail}</p>
          </div>
        </div>
        <dl className="netcheck-metrics" data-testid="netcheck-metrics">
          <div className="netcheck-metric"><dt>延迟</dt><dd>{latency === null ? '—' : `${latency} ms`}</dd></div>
          <div className="netcheck-metric"><dt>服务器响应</dt><dd>{serverMs === null ? '—' : `${serverMs} ms`}</dd></div>
          <div className="netcheck-metric"><dt>实时通道</dt><dd>{realtime === 'ok' ? '已连通' : realtime === 'blocked' ? '被拦截' : '—'}</dd></div>
          {via && <div className="netcheck-metric-note">{via === 'session' ? '本节课' : '测试连接'}</div>}
        </dl>
        {status !== 'ok' && (CAUSES[status] ?? []).length > 0 && (
          <div className="netcheck-causes">
            <p className="netcheck-section-title">最可能的原因</p>
            <ul>{(CAUSES[status] ?? []).map((cause) => <li key={cause}>{cause}</li>)}</ul>
          </div>
        )}
        <div className="netcheck-advanced">
          <p className="netcheck-section-title">进阶检查</p>
          <button type="button" className="netcheck-action" onClick={() => void runAudioCheck()} data-testid="netcheck-audio">检查语音连接</button>
          <button type="button" className="netcheck-action" onClick={runModelCheck} disabled={modelBusy} data-testid="netcheck-model">
            {modelBusy ? '检查中…' : '检查模型状态'}
          </button>
          {audio && audio !== 'busy' && (
            <div className="netcheck-card"
              data-tone={audio === 'ok' ? 'good' : audio === 'slow_link' || audio === 'muted' || audio === 'cooldown' ? 'warn' : 'bad'}
              data-testid="netcheck-audio-card">
              <p className="netcheck-card-title">{{
                ok: '语音正常', slow_link: '网速跟不上实时语音', tts_failed: '语音没能生成出来',
                download_failed: '语音没能传到你这边', playback_blocked: '语音收到了，但播不出来',
                muted: '当前课堂已静音', unauthorized: '登录状态已过期', cooldown: '稍等一下',
              }[audio] ?? '语音没能生成出来'}</p>
              <p className="netcheck-card-detail">{{
                ok: '我们生成了一段测试音频，全速传到了你这边，也成功播放了。',
                slow_link: '音频收到了，但比上课需要的速度慢。这就是语音断断续续的原因。',
                tts_failed: '这是我们的问题，你的网络没事。请过一分钟再试。',
                download_failed: '请求没有完成，音频在传输途中被网络中断了。',
                playback_blocked: '音频已经下载完成，问题出在浏览器或扬声器——检查一下输出设备，以及这个标签页是不是被静音了。',
                muted: '点喇叭按钮开启声音后再试一次。听不到声音，最常见的原因就是静音了。',
                unauthorized: '请求已经送到我们这边，只是被拒绝了，你的网络没问题。刷新页面重新登录一下就好。',
                cooldown: `${audioRetry} 秒后可以再检查一次。`,
              }[audio] ?? ''}</p>
              {audioStats && (
                <dl className="netcheck-card-metrics">
                  <div><dt>我们的处理</dt><dd>{audioStats.synthMs} ms</dd></div>
                  <div><dt>你的下载速度</dt><dd>{audioStats.kbps} KB/s</dd></div>
                  <div><dt>实时语音所需</dt><dd>≥ 40 KB/s</dd></div>
                </dl>
              )}
              {audioSkipped && <p className="netcheck-card-detail">没有外放——课堂讲解还在进行。</p>}
            </div>
          )}
          {model && (
            <div className="netcheck-card" data-tone={model.verdict === 'ok' || model.verdict === 'ok_no_context' ? 'good' : model.verdict === 'context_too_heavy' ? 'warn' : 'bad'} data-testid="netcheck-model-card">
              <p className="netcheck-card-title">{{
                ok: '模型有响应', ok_no_context: '模型有响应', context_too_heavy: '模型处理这段对话有点吃力',
                model_down: '模型没有响应', probe_failed: '检查没能完成', no_session: '当前没有进行中的课', busy: '已有一项检查在进行',
              }[model.verdict] ?? '检查没能完成'}</p>
              <dl className="netcheck-card-metrics">
                <div><dt>简短提问</dt><dd>{model.ttft === null ? '无回应' : `${model.ttft} ms`}</dd></div>
              </dl>
              {model.replayed !== null && <p className="netcheck-card-foot">已重发 {model.replayed} 条上下文消息。</p>}
              <p className="netcheck-card-foot">这次测试不会记进你的对话里。</p>
            </div>
          )}
        </div>
        <div className="netcheck-footer">
          <button type="button" className="netcheck-recheck" onClick={() => void runMainCheck()} disabled={checking} data-testid="netcheck-recheck">
            {checking ? <><span className="netcheck-spin" aria-hidden="true" />检查中…</> : '重新检查'}
          </button>
          <span className="netcheck-note" data-testid="netcheck-updated">
            {age === null ? '' : age < 5 ? '刚刚更新' : `${age} 秒前更新`}
            <span className="sr-only">{tick >= 0 ? '' : ''}</span>
          </span>
        </div>
        <p className="netcheck-auto-note">上课期间每 30 秒自动重新检查一次。</p>
      </div>
    </>
  )
}
