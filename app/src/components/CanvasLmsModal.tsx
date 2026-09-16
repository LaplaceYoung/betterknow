import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { GraduationCap, Upload, FileText, ArrowRight, Link as LinkIcon, Sparkles } from 'lucide-react'

interface CanvasLmsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImportSuccess?: (courseName: string, files?: File[]) => void
}

export function CanvasLmsModal({ open, onOpenChange, onImportSuccess }: CanvasLmsModalProps) {
  const [tab, setTab] = useState<'upload' | 'canvas'>('upload')
  const [canvasUrl, setCanvasUrl] = useState('')
  const [courseName, setCourseName] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
      if (!courseName && newFiles[0]) {
        setCourseName(newFiles[0].name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleStartSync = async () => {
    setIsProcessing(true)
    try {
      const finalName = courseName.trim() || (uploadedFiles[0]?.name.replace(/\.[^/.]+$/, '') ?? '随堂同步课程')
      await new Promise((resolve) => setTimeout(resolve, 800))
      onImportSuccess?.(finalName, uploadedFiles)
      onOpenChange(false)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px] rounded-2xl hk-pop p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-8 w-8 rounded-xl bg-[#eef2ff] text-[#3b5bdb] flex items-center justify-center">
            <GraduationCap size={18} />
          </span>
          <div>
            <DialogTitle className="text-[18px] font-semibold text-[#0a0a0a]">
              连接到 Canvas / 学校 LMS
            </DialogTitle>
          </div>
        </div>

        <DialogDescription className="text-[13px] text-[#6b6b70] mt-1 leading-normal">
          直接导入你的课程大纲与课件文件，开启学校同步模式，让 betterknow 根据真实课堂材料深度定制课表与随堂练习。
        </DialogDescription>

        {/* Tab switcher */}
        <div className="flex gap-1 border-b mt-4 text-[13px]">
          <button
            onClick={() => setTab('upload')}
            className="px-3 h-9 text-[#6b6b70] data-[on=true]:text-black data-[on=true]:font-semibold relative"
            data-on={tab === 'upload'}
          >
            上传教材 / 课件大纲
            {tab === 'upload' && <span className="absolute left-2 right-2 -bottom-px h-0.5 bg-black" />}
          </button>
          <button
            onClick={() => setTab('canvas')}
            className="px-3 h-9 text-[#6b6b70] data-[on=true]:text-black data-[on=true]:font-semibold relative"
            data-on={tab === 'canvas'}
          >
            Canvas 账户授权
            {tab === 'canvas' && <span className="absolute left-2 right-2 -bottom-px h-0.5 bg-black" />}
          </button>
        </div>

        {tab === 'upload' ? (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1">
                课程或学科名称
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="例如：CS106B 抽象数据结构 / 微观经济学"
                className="w-full h-9 px-3 rounded-lg border text-[13px] outline-none focus:border-[#0a0a0a]"
              />
            </div>

            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#d4d4d8] hover:border-[#a1a1aa] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#fafafa]"
            >
              <Upload size={24} className="mx-auto text-[#8a8a90] mb-2" />
              <div className="text-[13px] font-medium text-[#1c1c1e]">
                点击或拖拽上传课程材料
              </div>
              <div className="text-[11px] text-[#8a8a90] mt-1">
                支持教学大纲 Syllabus、讲座课件 PPT、PDF 讲义或作业说明
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.md"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f5] text-[12px]">
                    <FileText size={14} className="text-[#3b5bdb] shrink-0" />
                    <span className="truncate flex-1 font-medium">{file.name}</span>
                    <span className="text-[11px] text-[#8a8a90]">{(file.size / 1024).toFixed(0)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1">
                学校 Canvas 域名或地址
              </label>
              <div className="flex items-center gap-2 h-9 px-3 rounded-lg border bg-white">
                <LinkIcon size={14} className="text-[#8a8a90]" />
                <input
                  type="text"
                  value={canvasUrl}
                  onChange={(e) => setCanvasUrl(e.target.value)}
                  placeholder="https://canvas.stanford.edu 或 canvas.instructure.com"
                  className="w-full text-[13px] outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8f9fa] border text-[12px] text-[#6b6b70] space-y-1.5">
              <div className="font-medium text-[#1c1c1e] flex items-center gap-1">
                <Sparkles size={13} className="text-[var(--pro-gold)]" />
                Canvas API 安全说明
              </div>
              <p>
                授权后 betterknow 仅只读同步你的课程大纲与讲义材料，不存储你的个人身份敏感信息。
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6 pt-3 border-t">
          <button onClick={() => onOpenChange(false)} className="hk-pill h-9 px-4 text-[13px]">
            取消
          </button>
          <button
            disabled={isProcessing || (tab === 'upload' && !courseName && uploadedFiles.length === 0)}
            onClick={handleStartSync}
            className="h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 disabled:opacity-50 transition-colors inline-flex items-center gap-1.5"
          >
            {isProcessing ? '正在同步课程大纲...' : '开始构建学校同步课'}
            <ArrowRight size={14} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
