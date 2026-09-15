import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Sparkles, BookOpen, Clock, Target, Layers, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import { apiPost } from '@/lib/api'

interface CoursePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  query: string
  sourceMode?: 'self_study' | 'school_sync'
}

export function CoursePlanModal({ open, onOpenChange, query, sourceMode = 'self_study' }: CoursePlanModalProps) {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [outputLanguage, setOutputLanguage] = useState('zh')

  const handleStartGeneration = async () => {
    setLoading(true)
    try {
      nav('/response/course-generation/new', {
        state: {
          query,
          course_source_mode: sourceMode,
          reply_language: outputLanguage === 'zh' ? 'Chinese (Simplified)' : 'English',
        },
      })
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  // Pre-calculated structural outline preview based on topic
  const plannedUnits = [
    { title: '单元 1：核心概念与直觉建立', sessions: '4 个课时 · 概念先行' },
    { title: '单元 2：核心理论与方法论演进', sessions: '4 个课时 · 深度推演' },
    { title: '单元 3：应用实战、案例分析与综合评测', sessions: '4 个课时 · 随堂测验与综合项目' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] rounded-2xl hk-pop p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-8 w-8 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center">
            <Sparkles size={16} />
          </span>
          <div>
            <DialogTitle className="text-[18px] font-semibold text-[#0a0a0a]">
              课程大纲与学习规划
            </DialogTitle>
          </div>
        </div>

        <DialogDescription className="text-[13px] text-[#6b6b70] mt-1">
          betterknow Agent 将基于你的学习需求自动规划体系化课程。
        </DialogDescription>

        <div className="my-4 p-4 rounded-xl bg-[#f8f9fa] border space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] text-[#8a8a90] font-medium">课程主题</div>
              <div className="text-[15px] font-semibold text-[#1c1c1e] mt-0.5">{query || '未命名课程'}</div>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eef2ff] text-[#3b5bdb] font-medium">
              {sourceMode === 'school_sync' ? '🏫 学校同步' : '🎓 自学模式'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t text-[12px]">
            <div className="flex items-center gap-1.5 text-[#4b4b50]">
              <Clock size={13} className="text-[#8a8a90]" />
              <span>预计耗时：12 课时</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#4b4b50]">
              <Target size={13} className="text-[#8a8a90]" />
              <span>模式：BYOK 自由无限</span>
            </div>
          </div>
        </div>

        {/* Units preview */}
        <div className="space-y-2">
          <div className="text-[12px] font-semibold text-[#3d3d3f]">计划包含的单元模块：</div>
          <div className="space-y-1.5">
            {plannedUnits.map((u, i) => (
              <div key={i} className="p-2.5 rounded-lg border bg-white flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded bg-[#f1f2f4] text-[10px] font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="font-medium text-[#1c1c1e]">{u.title}</span>
                </div>
                <span className="text-[11px] text-[#8a8a90]">{u.sessions}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language option */}
        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#3d3d3f]">生成语言</span>
          <div className="inline-flex rounded-lg border p-0.5 text-[12px]">
            <button
              onClick={() => setOutputLanguage('zh')}
              className="px-2.5 py-1 rounded-md transition-colors data-[on=true]:bg-[#f1f2f4] data-[on=true]:font-medium"
              data-on={outputLanguage === 'zh'}
            >
              简体中文
            </button>
            <button
              onClick={() => setOutputLanguage('en')}
              className="px-2.5 py-1 rounded-md transition-colors data-[on=true]:bg-[#f1f2f4] data-[on=true]:font-medium"
              data-on={outputLanguage === 'en'}
            >
              English
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-3 border-t">
          <button onClick={() => onOpenChange(false)} className="hk-pill h-9 px-4 text-[13px]">
            返回修改
          </button>
          <button
            disabled={loading}
            onClick={handleStartGeneration}
            className="h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 transition-colors inline-flex items-center gap-1.5"
          >
            {loading ? '正在规划...' : '确认并开始构建课程'}
            <ArrowRight size={14} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
