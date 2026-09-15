import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { apiGet } from '@/lib/api'

interface WhatsNewEntry { version: string; date?: string; title?: string; items?: string[]; highlights?: string[] }

export function WhatsNewDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [entries, setEntries] = useState<WhatsNewEntry[]>([])
  useEffect(() => {
    if (!open) return
    apiGet<{ versions: WhatsNewEntry[] }>('/whatsnew').then((r) => setEntries(r.versions)).catch(() => setEntries([]))
  }, [open])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-[16px]">最新动态</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto hk-scroll px-6 py-4 space-y-5">
          {entries.length === 0 && <div className="text-[13px] text-[#8a8a90]">加载中…</div>}
          {entries.map((e) => (
            <div key={e.version}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[12px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f2f4]">v{e.version}</span>
                {e.date && <span className="text-[12px] text-[#8a8a90]">{e.date}</span>}
                {e.title && <span className="text-[13px] font-medium">{e.title}</span>}
              </div>
              <ul className="list-disc pl-5 text-[13px] text-[#3d3d3f] space-y-0.5">
                {(e.items ?? e.highlights ?? []).map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
