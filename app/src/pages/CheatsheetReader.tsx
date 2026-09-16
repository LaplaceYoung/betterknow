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
  const measureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    void (async () => {
      const token = await ensureToken()
      const res = await fetch(`/api/v1/files/${fileId}`, { headers: { authorization: `Bearer ${token}` } })
      if (!res.ok) { setMarkdown(''); return }
      setMarkdown(await res.text())
    })()
  }, [fileId])

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

  return (
    <div className="preview-page-shell" data-testid="cheatsheet-reader">
      <header className="preview-header">
        <button onClick={() => nav(-1)} className="course-journey-back-btn"><ArrowLeft size={14} />返回</button>
        <span className="preview-header-name">{fileId}</span>
        <button className="preview-header-btn" onClick={() => window.print()} aria-label="打印"><Printer size={14} /></button>
      </header>

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
                          <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{markdown ?? ''}</ReactMarkdown>
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

      <div ref={measureRef} className="preview-measure" aria-hidden="true"
        style={{ columnWidth: colW, columnGap: COLUMN_GAP, columnFill: 'auto', fontSize: doc.fontSize, lineHeight: doc.documentLineHeight, width: contentW, height: contentH }}>
        <div className="preview-md hk-prose">
          <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{markdown ?? ''}</ReactMarkdown>
        </div>
      </div>

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
