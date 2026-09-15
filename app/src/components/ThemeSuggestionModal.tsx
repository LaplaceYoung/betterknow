import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Sparkles, GraduationCap, Compass, BookOpen, Layers } from 'lucide-react'

interface ThemeSuggestionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTopic?: (topic: string) => void
}

const TOPIC_SUGGESTIONS = [
  { category: '学术与考研', topics: ['微积分基本定理与几何直觉', '概率论与贝叶斯推断', '线性代数：特征值与空间变换', '宏观经济学与货币政策'] },
  { category: 'AI 与计算机', topics: ['机器学习与深度学习导论', 'Python 数据结构与经典算法', '大语言模型与 Prompt 工程实战', '计算机系统漫谈：从晶体管到操作系统'] },
  { category: '人文与科学', topics: ['认知心理学：感知与决策偏差', '现代西方哲学核心范式', '天体物理：从恒星演化到黑洞', '批判性思维与非形式逻辑'] },
]

export function ThemeSuggestionModal({ open, onOpenChange, onSelectTopic }: ThemeSuggestionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] rounded-2xl hk-pop p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-7 w-7 rounded-lg bg-[#f1f2f4] flex items-center justify-center text-[#0a0a0a]">
            <Compass size={16} />
          </span>
          <DialogTitle className="text-[18px] font-semibold text-[#0a0a0a]">
            我该选择什么主题？
          </DialogTitle>
        </div>

        <DialogDescription className="text-[13px] text-[#6b6b70] leading-6 mt-2 space-y-2">
          <p>
            <strong className="text-[#1c1c1e]">betterknow</strong> 目前最擅长知识型学习。你可以输入任何想要自学的内容，包括考试备考、学术科目或实用专业技能。
          </p>
          <p>
            如果你是在学校学习，可以连接你的 Canvas 账户或直接上传教学大纲和课程课件，以便 betterknow 构建深度贴合课堂的专属课程。
          </p>
          <p>
            生成前不需要把所有内容都准备到完美。课程创建后，你还可以随时编辑大纲、调整讲次结构并扩充参考资料。
          </p>
        </DialogDescription>

        <div className="mt-4 pt-4 border-t">
          <div className="text-[12px] font-semibold text-[#3d3d3f] mb-2 flex items-center gap-1.5">
            <Sparkles size={13} className="text-[var(--pro-gold)]" />
            热门探索主题（点击直接填入）：
          </div>
          <div className="space-y-3">
            {TOPIC_SUGGESTIONS.map((group) => (
              <div key={group.category}>
                <div className="text-[11px] text-[#8a8a90] mb-1 font-medium">{group.category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {group.topics.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        onSelectTopic?.(t)
                        onOpenChange(false)
                      }}
                      className="px-2.5 py-1 rounded-lg border text-[12px] bg-[#fafafa] hover:bg-[#f1f2f4] hover:border-[#a1a1aa] text-[#1c1c1e] transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-5 pt-3 border-t">
          <button
            onClick={() => onOpenChange(false)}
            className="h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 transition-colors"
          >
            知道了
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
