import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface BugReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  context?: string
}

export function BugReportModal({ open, onOpenChange, context }: BugReportModalProps) {
  const [desc, setDesc] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setDesc('')
      onOpenChange(false)
    }, 1200)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] rounded-2xl hk-pop p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-7 w-7 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center">
            <AlertCircle size={16} />
          </span>
          <DialogTitle className="text-[17px] font-semibold text-[#0a0a0a]">
            遇到问题或建议？
          </DialogTitle>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 size={36} className="mx-auto text-[#16a34a]" />
            <div className="text-[15px] font-semibold">感谢你的反馈！</div>
            <div className="text-[12px] text-[#8a8a90]">我们会在后续版本中持续改进学习体验。</div>
          </div>
        ) : (
          <>
            <DialogDescription className="text-[13px] text-[#6b6b70] mt-1">
              描述你在使用中遇到的任何问题或期望优化的体验（如讲解内容、公式显示、白板互动等）。
            </DialogDescription>

            <div className="mt-4">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                placeholder="请详细描述问题发生的场景..."
                className="w-full p-3 rounded-xl border text-[13px] outline-none resize-none focus:border-[#0a0a0a]"
              />
              {context && <div className="text-[11px] text-[#8a8a90] mt-1 truncate">上下文：{context}</div>}
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t">
              <button onClick={() => onOpenChange(false)} className="hk-pill h-9 px-4 text-[13px]">
                取消
              </button>
              <button
                disabled={!desc.trim()}
                onClick={handleSubmit}
                className="h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 disabled:opacity-40 transition-colors"
              >
                提交反馈
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
