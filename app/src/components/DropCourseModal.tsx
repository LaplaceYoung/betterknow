import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { LogOut } from 'lucide-react'

interface DropCourseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseTitle?: string
  onConfirm: () => void
}

export function DropCourseModal({ open, onOpenChange, courseTitle, onConfirm }: DropCourseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px] rounded-2xl hk-pop p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-7 w-7 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center">
            <LogOut size={16} />
          </span>
          <DialogTitle className="text-[17px] font-semibold text-[#0a0a0a]">
            退出这门课程？
          </DialogTitle>
        </div>

        <DialogDescription className="text-[13px] text-[#6b6b70] mt-2 leading-relaxed">
          你确定要退出「<strong className="text-[#1c1c1e]">{courseTitle ?? '该课程'}</strong>」吗？退出后该课程将从你的「我的课程」列表中移除，你可以随时在课程集市重新加入。
        </DialogDescription>

        <div className="flex justify-end gap-2 mt-6 pt-3 border-t">
          <button onClick={() => onOpenChange(false)} className="hk-pill h-9 px-4 text-[13px]">
            再想想
          </button>
          <button
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            className="h-9 px-5 rounded-full bg-[#dc2626] text-white text-[13px] font-medium hover:bg-red-750 transition-colors"
          >
            确认退出
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
