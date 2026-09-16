import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import { ArrowLeft, Minus, Plus, Printer } from 'lucide-react'
import { ensureToken } from '@/lib/api'

// 线上讲义/速查表阅读器（ChatResponsePage 的 preview 面板）实测常量：
//   const ky = 1123, xy = 794;                       // A4 @96dpi
//   contentW = ky - 2*pageMargin, contentH = xy - 2*pageMargin, stride = contentW + 20;
//   默认排版 { columns: 4, fontSize: 8, pageMargin: 8, documentLineHeight: 1.55 }
//   默认缩放 0.75；缩放外框 = 1123*z × (794*页数 + 20*(页数-1))*z
const PAGE_W = 1123
const PAGE_H = 794
const PAGE_GAP = 20
const COLUMN_GAP = 20
const DEFAULT_DOC = { columns: 4, fontSize: 8, pageMargin: 8, documentLineHeight: 1.55 }
// 线上编辑器的两个色板（r84 原文）：文字颜色 py、高亮 fy
const TEXT_COLORS: Array<{ label: string; value: string | null }> = [
  { label: '默认', value: null }, { label: '蓝色', value: '#2563eb' }, { label: '红色', value: '#dc2626' },
  { label: '绿色', value: '#16a34a' }, { label: '橙色', value: '#ea580c' }, { label: '紫色', value: '#7c3aed' }, { label: '灰色', value: '#6b7280' },
]
const HIGHLIGHT_COLORS: Array<{ label: string; value: string | null }> = [
  { label: '黄色', value: '#fef08a' }, { label: '绿色', value: '#bbf7d0' }, { label: '蓝色', value: '#bfdbfe' },
  { label: '粉色', value: '#fbcfe8' }, { label: '橙色', value: '#fed7aa' }, { label: '无', value: null },
]

// 线上高亮在 markdown 里就是 ==文字==（tiptap-markdown 的 highlight tokenizer），预览按 <mark> 渲染
const renderHighlights = (text: string): string => text.split(/(```[\s\S]*?```)/g).map((part, index) => (
  index % 2 === 1 ? part : part.replace(/==([^=\n]+)==/g, '<mark>$1</mark>')
)).join('')

const ZOOM_MIN = 0.5
const ZOOM_MAX = 2
const ZOOM_STEP = 0.25

export default function CheatsheetReader() {
  const { fileId = '' } = useParams()
  const nav = useNavigate()
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [doc, setDoc] = useState(DEFAULT_DOC)
  const [zoom, setZoom] = useState(0.75)
  const [colCount, setColCount] = useState(0)
  const [zoomDraft, setZoomDraft] = useState<string | null>(null)
  // 线上 cheatsheetEditor：三态切换（编辑模式 / 预览 / 正文）+ 3 秒静默自动保存 + 排版参数
  const [mode, setMode] = useState<'edit' | 'preview' | 'article'>('preview')
  const [draft, setDraft] = useState('')
  const [saveState, setSaveState] = useState<'saved' | 'dirty' | 'saving' | 'error'>('saved')
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  // 线上：拖动分隔调整编辑区与预览区宽度（resizeSplit）；锚点标记（anchorMarkerLabel「光标」+ hint「内容将添加在此行之后」）
  const [editorWidth, setEditorWidth] = useState(44)
  const [caretLine, setCaretLine] = useState(1)
  const splitRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [exitPrompt, setExitPrompt] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const save = useCallback(async (content: string) => {
    setSaveState('saving')
    try {
      const res = await fetch(`/api/v1/files/${fileId}`, {
        method: 'PUT', headers: { 'content-type': 'application/json', authorization: `Bearer ${await ensureToken()}` },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) { setSaveState('error'); return false }
      setSaveState('saved')
      setLastSavedAt(new Date().toLocaleTimeString())
      return true
    } catch { setSaveState('error'); return false }
  }, [fileId])

  const updateCaretLine = useCallback(() => {
    const el = editorRef.current
    if (!el) return
    const upto = el.value.slice(0, el.selectionStart)
    setCaretLine(upto.split('\n').length)
  }, [])

  const startResize = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const split = splitRef.current
    if (!split) return
    draggingRef.current = true
    const rect = split.getBoundingClientRect()
    const move = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const ratio = ((e.clientX - rect.left) / rect.width) * 100
      setEditorWidth(Math.min(72, Math.max(22, Math.round(ratio))))
    }
    const stop = () => { draggingRef.current = false; window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
    event.preventDefault()
  }, [])

  const wrapSelection = useCallback((open: string, close: string) => {
    const el = editorRef.current
    if (!el) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const picked = value.slice(start, end)
    const next = `${value.slice(0, start)}${open}${picked}${close}${value.slice(end)}`
    setDraft(next)
    setSaveState('dirty')
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(start + open.length, start + open.length + picked.length) })
  }, [])

  const insertImage = useCallback(async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    form.append('parent_id', '')
    try {
      const res = await fetch('/api/v1/drive/upload_file_to_drive', {
        method: 'POST', headers: { authorization: `Bearer ${await ensureToken()}` }, body: form,
      })
      if (!res.ok) return false
      const data = await res.json().catch(() => null) as { file_id?: string } | null
      const url = data?.file_id ? `/api/v1/files/${data.file_id}` : null
      if (!url) return false
      wrapSelection(`![${file.name}](`, `${url})`)
      return true
    } catch { return false }
  }, [wrapSelection])

  // 排版参数与正文一起提交（线上 layout_patch）
  const applyEditorText = useCallback((insert: string, wrap = false) => {
    const el = editorRef.current
    const current = el ? el.value : draft
    const start = el?.selectionStart ?? current.length
    const end = el?.selectionEnd ?? current.length
    const picked = current.slice(start, end)
    const next = `${current.slice(0, start)}${wrap ? insert + picked + insert : insert}${current.slice(end)}`
    setDraft(next)
    setSaveState('dirty')
    requestAnimationFrame(() => { if (!el) return; const caret = start + insert.length + picked.length + (wrap ? insert.length : 0); el.focus(); el.setSelectionRange(caret, caret) })
  }, [draft])
  const measureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    void (async () => {
      const token = await ensureToken()
      const res = await fetch(`/api/v1/files/${fileId}`, { headers: { authorization: `Bearer ${token}` } })
      if (!res.ok) { setMarkdown(''); return }
      const text = await res.text()
      setMarkdown(text)
      setDraft(text)
    })()
  }, [fileId])

  useEffect(() => {
    if (mode !== 'edit' || saveState !== 'dirty') return
    const timer = window.setTimeout(() => { void save(draft) }, 3000)
    return () => window.clearTimeout(timer)
  }, [draft, mode, saveState, save])

  // 离开前拦一次（线上 unsavedExitTitle「离开而不保存？」）
  useEffect(() => {
    if (saveState !== 'dirty' && saveState !== 'error') return
    const onBeforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [saveState])

  const contentW = PAGE_W - 2 * doc.pageMargin
  const contentH = PAGE_H - 2 * doc.pageMargin
  const stride = contentW + COLUMN_GAP
  const colW = (contentW - (doc.columns - 1) * COLUMN_GAP) / doc.columns

  // 页数由内容在列布局下的实际宽度决定（线上用同样的 scrollWidth/stride 口径）
  // 关键口径：每页 doc.columns 列、列宽 colW、列距 20；列距 × columns = contentW + 20 = stride，
  // 所以「翻一页」= 在内容上位移一个 stride。总列数由隐藏测量容器（宽度给足）算出，
  // 页数 = ceil(总列数 / 每页列数)——与线上 Sy 组件 measure → pageCount 的思路一致。
  const measure = useCallback(() => {
    const el = measureRef.current
    if (!el) return
    const total = Math.max(1, Math.round((el.scrollWidth + COLUMN_GAP) / (colW + COLUMN_GAP)))
    setColCount((c) => (c === total ? c : total))
  }, [colW])

  useEffect(() => {
    measure()
    const el = measureRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure, markdown, doc])

  const pages = Math.max(1, Math.ceil(colCount / doc.columns))
  const totalWidth = Math.max(contentW, colCount * (colW + COLUMN_GAP) - COLUMN_GAP)
  const scaleOuter = useMemo(
    () => ({ width: PAGE_W * zoom, height: (PAGE_H * pages + PAGE_GAP * Math.max(0, pages - 1)) * zoom }),
    [pages, zoom]
  )
  const pageList = useMemo(() => Array.from({ length: pages }, (_, i) => i), [pages])

  if (markdown === '') {
    return (
      <div className="p-12 text-center text-[#8a8a90]">
        找不到这份讲义
        <div className="mt-3"><button onClick={() => nav(-1)} className="hk-pill">返回</button></div>
      </div>
    )
  }

  // 缩放控件与 A4 预览：编辑模式下嵌进双栏的右栏，其余模式独占整行
  const previewBlock = mode === 'article' ? null : (
    <div className="preview-preview-col">
      <div className="preview-zoom-controls" data-testid="preview-zoom">
        <button className="preview-zoom-btn" onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} disabled={zoom <= ZOOM_MIN} aria-label="缩小"><Minus size={14} /></button>
        <span
          className="preview-zoom-val"
          role="textbox"
          aria-label="缩放比例"
          contentEditable
          suppressContentEditableWarning
          onFocus={() => setZoomDraft(String(Math.round(zoom * 100)))}
          onBlur={(e) => {
            const v = Number((e.currentTarget.textContent ?? '').replace('%', '').trim())
            if (Number.isFinite(v) && v > 0) setZoom(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, v / 100)))
            setZoomDraft(null)
          }}
        >{zoomDraft ?? `${Math.round(zoom * 100)}%`}</span>
        <button className="preview-zoom-btn" onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} disabled={zoom >= ZOOM_MAX} aria-label="放大"><Plus size={14} /></button>
      </div>

      <div className="preview-scroll hk-scroll">
        <div className="preview-scroll-inner">
          <div className="preview-scale-outer" style={scaleOuter}>
            <div className="preview-scale-wrap" style={{ transform: `scale(${zoom})` }}>
              <div className="preview-pages">
                {pageList.map((p) => (
                  <div className="preview-page" key={p} style={{ padding: doc.pageMargin }} data-page={p + 1}>
                    <div className="preview-page-clip" style={{ height: contentH }}>
                      <div
                        className="preview-page-inner"
                        style={{
                          columnWidth: colW,
                          columnGap: COLUMN_GAP,
                          columnFill: 'auto',
                          fontSize: doc.fontSize,
                          lineHeight: doc.documentLineHeight,
                          width: totalWidth,
                          height: contentH,
                          transform: `translateX(-${p * stride}px)`,
                        }}
                      >
                        <div className="preview-md hk-prose">
                          <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{renderHighlights(draft || markdown || '')}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="preview-page-shell" data-testid="cheatsheet-reader">
      <header className="preview-header">
        <button onClick={() => nav(-1)} className="course-journey-back-btn"><ArrowLeft size={14} />返回</button>
        <span className="preview-header-name">{fileId}</span>
        {/* 线上 cheatsheetEditor 的三个模式：预览（打印版式）/ 正文（与对话区同款渲染）/ 编辑模式 */}
        <div className="preview-mode-tabs" role="tablist" data-testid="cheatsheet-modes">
          {([['preview', '预览'], ['article', '正文'], ['edit', '编辑模式']] as const).map(([key, label]) => (
            <button key={key} type="button" role="tab" className="preview-mode-tab" data-active={mode === key} aria-selected={mode === key}
              onClick={() => { if (mode === 'edit' && saveState === 'dirty') { setExitPrompt(true); return } setMode(key) }}>{label}</button>
          ))}
        </div>
        {mode === 'edit' && (
          <span className="preview-save-state" data-testid="save-state">
            {saveState === 'saving' ? '保存中…' : saveState === 'dirty' ? '您有未保存的修改' : saveState === 'error' ? '保存失败' : lastSavedAt ? `上次保存 ${lastSavedAt}` : '已保存！'}
          </span>
        )}
        {mode === 'edit' && (
          <button className="preview-header-btn preview-save-btn" data-testid="save-now" disabled={saveState === 'saving'}
            onClick={() => void save(draft)}>保存</button>
        )}
        <button className="preview-header-btn" onClick={() => window.print()} aria-label="打印"><Printer size={14} /></button>
      </header>

      {mode === 'article' && (
        <div className="preview-article hk-scroll" data-testid="cheatsheet-article">
          {(draft || markdown) ? <div className="preview-md hk-prose"><ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{renderHighlights(draft || markdown || '')}</ReactMarkdown></div> : <p className="text-[13px] text-[#8a8a90]">暂无正文内容</p>}
        </div>
      )}

      {mode === 'edit' && (
        <div className="preview-edit-row" data-testid="cheatsheet-editor" ref={splitRef}>
          <div className="preview-editor-pane" style={{ width: `${editorWidth}%` }}>
            <div className="preview-editor-bar" role="toolbar" aria-label="文字与排版">
              {([['**', '加粗（Ctrl+B）', true], ['*', '斜体（Ctrl+I）', true], ['# ', '一级标题', false], ['## ', '二级标题', false], ['### ', '三级标题', false], ['- ', '无序列表', false], ['1. ', '有序列表', false], ['```\n', '代码块', false]] as const).map(([insert, title, wrap]) => (
                <button key={title} type="button" className="preview-editor-btn" title={title} aria-label={title}
                  onClick={() => applyEditorText(insert, wrap)}>{title.replace(/（.*/, '')}</button>
              ))}
              <button type="button" className="preview-editor-btn" title="插入行内公式（$…$）" onClick={() => applyEditorText('$', true)}>公式</button>
              <button type="button" className="preview-editor-btn" title="换列符（强制新列）" onClick={() => applyEditorText('\n── 换列 ──\n')}>换列符</button>
              <label className="preview-editor-color" title="文字颜色" aria-label="文字颜色">
                文字颜色
                <select data-testid="text-color" value="" onChange={(e) => { const v = TEXT_COLORS[Number(e.target.value)]?.value; if (v) wrapSelection(`<span style="color:${v}">`, '</span>'); e.target.value = '' }}>
                  <option value="">选颜色</option>
                  {TEXT_COLORS.map((color, index) => <option key={color.label} value={index}>{color.label}</option>)}
                </select>
              </label>
              <label className="preview-editor-color" title="高亮" aria-label="高亮">
                高亮
                <select data-testid="highlight-color" value="" onChange={(e) => { const color = HIGHLIGHT_COLORS[Number(e.target.value)]; e.target.value = ''; if (!color) return; if (color.value) wrapSelection('<mark style="background-color:' + color.value + '">', '</mark>'); else wrapSelection('==', '==') }}>
                  <option value="">选颜色</option>
                  {HIGHLIGHT_COLORS.map((color, index) => <option key={color.label} value={index}>{color.label}</option>)}
                </select>
              </label>
              <label className="preview-editor-btn" title="插入图片" aria-label="插入图片">
                插入图片
                <input type="file" accept="image/*" hidden data-testid="insert-image"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) void insertImage(f); e.target.value = '' }} />
              </label>
              <button type="button" className="preview-editor-btn" title="撤销" onClick={() => document.execCommand('undo')}>撤销</button>
              <button type="button" className="preview-editor-btn" title="重做" onClick={() => document.execCommand('redo')}>重做</button>
            </div>
            <div className="preview-editor-anchor" data-testid="editor-anchor">
              <span className="preview-editor-anchor-label">光标</span>
              <span className="preview-editor-anchor-hint">第 {caretLine} 行 · 内容将添加在此行之后</span>
            </div>
            <textarea ref={editorRef} className="preview-editor-textarea hk-scroll" data-testid="editor-textarea" value={draft} spellCheck={false}
              onSelect={updateCaretLine} onKeyUp={updateCaretLine} onClick={updateCaretLine}
              placeholder={'在这里输入内容…\n行内公式用 $公式$ 语法，如 $E = mc^2$'}
              onChange={(e) => { setDraft(e.target.value); setSaveState('dirty') }} />
          </div>
          <div className="preview-edit-divider" role="separator" aria-label="拖动调整编辑区与预览区宽度" title="拖动调整编辑区与预览区宽度"
            data-testid="editor-divider" onPointerDown={startResize} />
          {previewBlock}
        </div>
      )}

      {mode !== 'edit' && previewBlock}

      <div ref={measureRef} className="preview-measure" aria-hidden="true"
        style={{ columnWidth: colW, columnGap: COLUMN_GAP, columnFill: 'auto', fontSize: doc.fontSize, lineHeight: doc.documentLineHeight, width: contentW, height: contentH }}>
        <div className="preview-md hk-prose">
          <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{markdown ?? ''}</ReactMarkdown>
        </div>
      </div>

      {exitPrompt && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40" data-testid="unsaved-exit">
          <div className="hk-card w-[420px] p-5" role="dialog" aria-modal="true">
            <div className="text-[15px] font-medium">离开而不保存？</div>
            <p className="mt-2 text-[13px] text-[#6b6b70]">你对这个速查表还有未保存的修改。直接离开将会丢失这些改动。</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="hk-pill h-9 px-4 text-[13px]" onClick={() => setExitPrompt(false)}>继续编辑</button>
              <button className="hk-pill h-9 px-4 text-[13px]" onClick={() => { setSaveState('dirty'); setExitPrompt(false) }}>放弃更改</button>
              <button className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white text-[13px]" onClick={async () => { if (await save(draft)) { setExitPrompt(false); setMode('preview') } }}>立即保存</button>
            </div>
          </div>
        </div>
      )}

      <footer className="preview-footer">
        <span className="preview-page-nav-readout">{pages} 页 · 每页 {doc.columns} 列 · 边距 {doc.pageMargin}px</span>
        <div className="preview-doc-controls">
          {([['columns', '列', [2, 3, 4]], ['fontSize', '字号', [8, 9, 10, 11]], ['pageMargin', '边距', [8, 16, 24, 32]]] as const).map(([key, label, values]) => (
            <label key={key} className="preview-doc-control">
              <span>{label}</span>
              <select
                value={doc[key]}
                onChange={(e) => setDoc((d) => ({ ...d, [key]: Number(e.target.value) }))}
              >
                {values.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </label>
          ))}
        </div>
      </footer>
    </div>
  )
}
