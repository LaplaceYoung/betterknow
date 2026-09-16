import { useEffect, useRef, useState } from 'react'
import { CalendarPlus, ChevronLeft, FileText, Folder, MoreHorizontal, Plus, Search, Trash2, Upload } from 'lucide-react'
import { apiGet, apiPost } from '@/lib/api'

interface DriveItem { id: string; name: string; type: 'folder' | 'file'; parent_id: string | null; size?: number; mime?: string; created_at?: string; file_url?: string }

// [S23][B11] 个人知识库：文件夹树 + 文件卡 + 上传/新建/删除（服务端持久化 + 配额）
export default function KnowledgeBase() {
  const [items, setItems] = useState<DriveItem[] | null>(null)
  const [folder, setFolder] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [used, setUsed] = useState(0)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')
  const [quota, setQuota] = useState<{ file_upload?: { remaining: number; limit: number }; calendar_add?: { remaining: number; limit: number }; storage_limit_bytes?: number } | null>(null)
  // 拖拽上传：线上 .knowledge-base-drag-overlay（拖入时盖住整页，松手上传）
  const [dragging, setDragging] = useState(false)
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const dragDepth = useRef(0)
  const dropFiles = async (files: FileList | File[]) => {
    for (const f of Array.from(files)) await upload(f as File)
  }
  useEffect(() => { void apiGet<typeof quota>('/auth/other_function_usage_limits').then(setQuota).catch(() => setQuota(null)) }, [])
  const fileRef = useRef<HTMLInputElement>(null)
  const load = () => apiGet<{ file_data: Record<string, DriveItem>; metadata: { drive_used_source_bytes: number } }>('/drive/get_drive_data').then((r) => { setItems(Object.values(r.file_data ?? {})); setUsed(r.metadata.drive_used_source_bytes) }).catch(() => setItems([]))
  useEffect(() => { load() }, [])

  const crumbs = (() => { const list: DriveItem[] = []; let p = folder; while (p) { const it = items?.find((x) => x.id === p); if (!it) break; list.unshift(it); p = it.parent_id } return list })()
  const shown = (items ?? []).filter((x) => x.parent_id === folder && (!q || x.name.toLowerCase().includes(q.toLowerCase())))
  const newFolder = async () => { setBusy(true); try { await apiPost('/drive/create_folder', { name: '知识库', parent_id: folder }); await load() } finally { setBusy(false) } }
  const upload = async (f: File) => { setBusy(true); try { const fd = new FormData(); fd.append('file', f); fd.append('parent_id', folder ?? ''); const token = localStorage.getItem('access_token') ?? ''; await fetch('/api/v1/drive/upload_file_to_drive', { method: 'POST', headers: { authorization: `Bearer ${token}` }, body: fd }); await load() } finally { setBusy(false) } }
  const del = async (id: string) => { await apiPost('/drive/delete', { id }); await load() }
  const addToCalendar = async (fileId: string) => {
    const item = items?.find((x) => x.id === fileId)
    await apiPost('/drive/add_file_to_calendar', { file_id: fileId, name: item?.name ?? '知识库文件' }).catch(() => undefined)
    setQuota(await apiGet<typeof quota>('/auth/other_function_usage_limits').catch(() => quota))
    setToast('已加入学习日程')
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="knowledge-base-page"
      onDragEnter={(e) => { if (e.dataTransfer?.types.includes('Files')) { dragDepth.current += 1; setDragging(true) } }}
      onDragOver={(e) => { if (e.dataTransfer?.types.includes('Files')) { e.preventDefault(); setDragging(true) } }}
      onDragLeave={() => { dragDepth.current = Math.max(0, dragDepth.current - 1); if (dragDepth.current === 0) setDragging(false) }}
      onDrop={async (e) => { dragDepth.current = 0; setDragging(false); if (e.dataTransfer?.files?.length) { e.preventDefault(); await dropFiles(e.dataTransfer.files) } }}
      data-testid="kb-page">
      {dragging && (
        <div className="knowledge-base-drag-overlay" data-testid="kb-drag-overlay">
          <div className="knowledge-base-drag-overlay-card">
            <div className="knowledge-base-drag-overlay-icon"><Upload size={34} /></div>
            <p className="knowledge-base-drag-overlay-title">松手即可上传</p>
            <p className="knowledge-base-drag-overlay-sub">支持 PDF、Word、Markdown、纯文本；上传后可被即时协助引用</p>
          </div>
        </div>
      )}
      <div className="knowledge-base-container">
      <div className="knowledge-base-header flex items-center gap-3"><h1 className="knowledge-base-title">个人知识库</h1><span className="text-[11px] px-1.5 py-0.5 rounded-full border">专业版 ◔</span></div>
      <div className="knowledge-base-controls flex items-center gap-3">
        <label className="flex items-center gap-2 h-10 px-3.5 rounded-full border bg-white flex-1 max-w-[460px]"><Search size={15} className="text-[#8a8a90]" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="我的天文学课件在哪？" className="flex-1 bg-transparent outline-none text-[14px]" /></label>
        <span className="text-[12px] text-[#8a8a90]">{(used / 1024).toFixed(0)} KB 已用</span>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={newFolder} disabled={busy} className="hk-pill"><Folder size={14} /> 新建文件夹</button>
          <button onClick={() => fileRef.current?.click()} disabled={busy} className="h-10 px-4 rounded-full bg-[#0a0a0a] text-white inline-flex items-center gap-1.5 text-[13px] disabled:opacity-50"><Plus size={14} /> 新建</button>
          <input ref={fileRef} type="file" hidden accept=".pdf,.md,.txt,.doc,.docx" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.currentTarget.value = '' }} aria-label="上传文件" />
        </div>
      </div>

      {crumbs.length > 0 && (
        <div className="folder-navigation flex items-center gap-1 text-[13px] text-[#6b6b70]">
          <button onClick={() => setFolder(null)} className="hk-icon-btn h-7 w-7" aria-label="返回上级"><ChevronLeft size={14} /></button>
          <button onClick={() => setFolder(null)} className="hover:text-black">知识库</button>
          {crumbs.map((c) => <span key={c.id} className="inline-flex items-center gap-1"><ChevronLeft size={12} className="rotate-180" /><button onClick={() => setFolder(c.id)} className="hover:text-black">{c.name}</button></span>)}
        </div>
      )}

      {quota && (
        <div className="mt-4 hk-card px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-[12px] text-[#6b6b70]" data-testid="kb-quota">
          <span className="font-medium text-[#3d3d3f]">用量</span>
          <span>存储空间 {(used / (1024 * 1024)).toFixed(2)} MB / {quota.storage_limit_bytes ? `${Math.round(quota.storage_limit_bytes / (1024 * 1024 * 1024))} GB` : '—'}</span>
          <span>文件上传 {quota.file_upload ? `${quota.file_upload.limit - quota.file_upload.remaining} 已使用 / ${quota.file_upload.limit} 本周` : '—'}</span>
          <span>添加到日历 {quota.calendar_add ? `${quota.calendar_add.limit - quota.calendar_add.remaining} 已使用 / ${quota.calendar_add.limit} 本周` : '—'}</span>
        </div>
      )}
      {toast && <div className="mt-3 text-[12px] text-[#15803d] hk-fade-in" data-testid="kb-toast">{toast}</div>}

      <div className="files-area">
      <div className="folders-grid">
        {items === null && Array.from({ length: 4 }).map((_, i) => <div key={i} className="hk-skeleton rounded-xl h-[180px]" />)}
        {shown.filter((x) => x.type === 'folder').map((f) => (
          <div key={f.id} className="folder-card" role="button" tabIndex={0} onClick={() => setFolder(f.id)} onKeyDown={(e) => e.key === 'Enter' && setFolder(f.id)}>
            <span style={{ width: 26, height: 26, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#4c6696' }}><Folder size={22} /></span>
            <span className="folder-card-name mt-3 text-[13px] font-medium truncate">{f.name}</span>
            <span className={`folder-card-menu-container ${menuFor === f.id ? 'menu-open' : ''}`}>
              <button className="folder-card-menu" aria-label={`${f.name} 的更多操作`} data-testid={`folder-menu-${f.id}`}
                onClick={(e) => { e.stopPropagation(); setMenuFor(menuFor === f.id ? null : f.id) }}>
                <MoreHorizontal size={15} />
              </button>
              {menuFor === f.id && (
                <span className="folder-menu-dropdown" role="menu">
                  <button className="folder-menu-item" role="menuitem" onClick={(e) => { e.stopPropagation(); setMenuFor(null); void del(f.id) }}>
                    <Trash2 size={15} className="folder-menu-icon" style={{ color: '#e71414' }} /><span className="folder-menu-text">删除</span>
                  </button>
                </span>
              )}
            </span>
          </div>
        ))}
        {shown.filter((x) => x.type !== 'folder').map((f) => (
          <div key={f.id} className="hk-card overflow-hidden group">
            <div className="h-[120px] bg-[#f7f7f8] flex items-center justify-center relative">
              <FileText size={28} className="text-[#8a8a90]" />
              {/* 线上：文件卡右上角的「加入日程」，会计入「添加到日历」配额 */}
              <button onClick={() => void addToCalendar(f.id)} aria-label="Add to calendar" title="加入学习日程" className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" data-testid={`add-calendar-${f.id}`}>
                <CalendarPlus size={13} className="text-[#3b5bdb]" />
              </button>
            </div>
            <div className="p-3 flex items-center gap-2"><FileText size={13} className="text-[#dc2626] shrink-0" /><span className="text-[12px] truncate flex-1">{f.name}</span><button onClick={() => del(f.id)} aria-label="删除" className="opacity-0 group-hover:opacity-100 text-[#8a8a90] hover:text-[#dc2626]"><Trash2 size={13} /></button></div>
          </div>
        ))}
        {items && shown.length === 0 && (
          <div className="col-span-4 text-center py-16 text-[#8a8a90]">
            <Upload size={28} className="mx-auto mb-3 opacity-50" />
            {q ? '未找到文件' : '知识库是空的 —— 上传 PDF 或课件，即时协助就能引用它们'}
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  )
}
