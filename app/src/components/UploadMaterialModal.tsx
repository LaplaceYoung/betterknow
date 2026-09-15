import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Upload, FileText, Sparkles, Check, ChevronDown, Layers, BookOpen, Send } from 'lucide-react'
import { apiPost } from '@/lib/api'

export interface UnitBrief {
  unitId: string
  title: string
  lectures?: Array<{
    lectureId: string
    title: string
  }>
}

interface UploadMaterialModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseTitle?: string
  courseUuid?: string
  units?: UnitBrief[]
  onUploadComplete?: (files: File[], prompt: string, scope: string) => void
}

export function UploadMaterialModal({
  open,
  onOpenChange,
  courseTitle,
  courseUuid,
  units = [],
  onUploadComplete,
}: UploadMaterialModalProps) {
  const [scopeType, setScopeType] = useState<'whole_course' | 'unit' | 'lecture'>('whole_course')
  const [selectedUnitId, setSelectedUnitId] = useState<string>(units[0]?.unitId ?? '')
  const [selectedLectureId, setSelectedLectureId] = useState<string>(units[0]?.lectures?.[0]?.lectureId ?? '')
  const [files, setFiles] = useState<File[]>([])
  const [instruction, setInstruction] = useState('')
  const [busy, setBusy] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const activeUnit = units.find((u) => u.unitId === selectedUnitId) ?? units[0]
  const activeLectures = activeUnit?.lectures ?? []

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const handleSubmit = async () => {
    setBusy(true)
    try {
      if (courseUuid) {
        // If extending structure via backend API
        const scopeDesc =
          scopeType === 'whole_course'
            ? '整门课程'
            : scopeType === 'unit'
            ? `单元：${activeUnit?.title ?? ''}`
            : `讲次：${activeLectures.find((l) => l.lectureId === selectedLectureId)?.title ?? ''}`

        await apiPost(`/course-generation/courses/${courseUuid}/structure/edit`, {
          action: 'extend',
          scope: scopeType,
          scope_desc: scopeDesc,
          instruction,
          file_names: files.map((f) => f.name),
        }).catch(() => {})
      }

      await new Promise((resolve) => setTimeout(resolve, 600))
      onUploadComplete?.(files, instruction, scopeType)
      onOpenChange(false)
      setFiles([])
      setInstruction('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="extend-palette max-w-[560px] rounded-2xl hk-pop p-6">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </span>
          <div>
            <DialogTitle className="text-[18px] font-semibold text-[#0a0a0a]">
              扩展课程与导入材料 (Extend Course)
            </DialogTitle>
            <DialogDescription className="text-[12px] text-[#6b6b70]">
              为「{courseTitle ?? '当前课程'}」补充资料、论文讲义或直接输入扩展指令。
            </DialogDescription>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {/* 1. Scope Selector */}
          <div>
            <label className="block text-[12px] font-medium text-[#3d3d3f] mb-2">
              选择扩展范围 (Scope)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'whole_course', label: '整门课程', desc: '新增模块或全局调整' },
                { type: 'unit', label: '指定单元', desc: '在特定单元中添加内容' },
                { type: 'lecture', label: '指定讲次', desc: '在特定讲次下补充课时' },
              ].map((item) => {
                const isSelected = scopeType === item.type
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setScopeType(item.type as never)}
                    className="p-2.5 rounded-xl border text-left transition-all hover:border-[#a1a1aa] data-[on=true]:border-[#0a0a0a] data-[on=true]:bg-[#fafafa]"
                    data-on={isSelected}
                  >
                    <div className="text-[13px] font-medium text-[#0a0a0a] flex items-center justify-between">
                      {item.label}
                      {isSelected && <Check size={13} className="text-[#0a0a0a]" />}
                    </div>
                    <div className="text-[11px] text-[#8a8a90] mt-0.5 line-clamp-1">{item.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cascade Unit / Lecture selector if not whole course */}
          {scopeType !== 'whole_course' && units.length > 0 && (
            <div className="p-3 rounded-xl bg-[#f4f4f5] space-y-2 hk-fade-in">
              <div>
                <span className="text-[11px] font-medium text-[#71717a] block mb-1">目标单元：</span>
                <select
                  value={selectedUnitId}
                  onChange={(e) => {
                    setSelectedUnitId(e.target.value)
                    const u = units.find((x) => x.unitId === e.target.value)
                    if (u?.lectures?.[0]) setSelectedLectureId(u.lectures[0].lectureId)
                  }}
                  className="w-full h-9 px-3 rounded-lg border bg-white text-[13px] outline-none"
                >
                  {units.map((u, i) => (
                    <option key={u.unitId} value={u.unitId}>
                      单元 {i + 1}：{u.title}
                    </option>
                  ))}
                </select>
              </div>

              {scopeType === 'lecture' && activeLectures.length > 0 && (
                <div>
                  <span className="text-[11px] font-medium text-[#71717a] block mb-1">目标讲次：</span>
                  <select
                    value={selectedLectureId}
                    onChange={(e) => setSelectedLectureId(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border bg-white text-[13px] outline-none"
                  >
                    {activeLectures.map((l, i) => (
                      <option key={l.lectureId} value={l.lectureId}>
                        讲次 {i + 1}：{l.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* 2. Upload Material Dropzone */}
          <div>
            <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1.5">
              上传补充材料（可选）
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[#d4d4d8] hover:border-[#0a0a0a] rounded-xl p-5 text-center cursor-pointer transition-colors bg-[#fafafa]"
            >
              <Upload size={22} className="mx-auto text-[#8a8a90] mb-1.5" />
              <div className="text-[13px] font-medium text-[#1c1c1e]">点击或拖拽上传课件或教材</div>
              <div className="text-[11px] text-[#8a8a90] mt-0.5">支持 PDF, PPTX, Markdown, TXT 或 Word 讲义</div>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".pdf,.ppt,.pptx,.txt,.md,.doc,.docx"
                onChange={handleFiles}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <div className="mt-2 space-y-1 max-h-[100px] overflow-y-auto">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f5] text-[12px]">
                    <FileText size={13} className="text-[#3b5bdb]" />
                    <span className="truncate flex-1">{f.name}</span>
                    <span className="text-[11px] text-[#8a8a90]">{(f.size / 1024).toFixed(0)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Instruction Textarea */}
          <div>
            <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1.5">
              调整指令与扩展期望 (Instructions)
            </label>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              rows={3}
              placeholder="例如：补充关于 Shor 算法的 Qiskit 代码仿真演练，并在最后一讲加入 RSA 密码破解对抗案例..."
              className="extend-instruction-input w-full p-3 rounded-xl border text-[13px] leading-relaxed outline-none resize-none focus:border-[#0a0a0a]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6 pt-3 border-t">
          <div className="text-[11px] text-[#8a8a90]">
            betterknow 将根据指令自动扩充大纲并生成配套练习
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => onOpenChange(false)} className="hk-pill h-9 px-4 text-[13px]">
              取消
            </button>
            <button
              type="button"
              disabled={busy || (files.length === 0 && !instruction.trim())}
              onClick={handleSubmit}
              className="extend-send-btn h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 disabled:opacity-40 inline-flex items-center gap-1.5 transition-colors"
            >
              {busy ? (
                <>
                  <span className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  正在扩展课程...
                </>
              ) : (
                <>
                  <Send size={13} />
                  发送并扩展
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
