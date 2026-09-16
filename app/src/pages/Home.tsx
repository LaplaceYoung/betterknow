import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Plus, ArrowUp, Sparkles, ChevronRight, ChevronDown, Mic, HardDrive, Wrench, PenLine, CalendarCheck, TrendingUp, RefreshCw, Check, X, FileText, Image as ImageIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DotField } from '@/components/DotField'
import { CourseCard } from '@/components/CourseCard'
import { getMarketplace, getTrends, type MarketplaceCourse, type Trend } from '@/lib/api'
import { useUser } from '@/lib/user'
import { HkConceptIcon, HkMaterialsIcon, HkLongFilesIcon, HkSolveProblemIcon, HkVisualIcon } from '@/components/HkIcons'
import { ThemeSuggestionModal } from '@/components/ThemeSuggestionModal'
import { CanvasLmsModal } from '@/components/CanvasLmsModal'
import { CoursePlanModal } from '@/components/CoursePlanModal'

type Mode = 'craft' | 'assist'

const CRAFT_GHOSTS = ['统计学，一眼看穿图表里的谎言', '博弈论，四个单元入门', '微观经济学期末冲刺', 'Python 数据分析从零开始']
const ASSIST_HEROES = ['让我们深入了解一些有趣的东西！', '你想学什么？', '让我们复习你的笔记！', '需要数学帮助吗？']
const ASSIST_GHOSTS = ['帮我做一张微观课期末的两页速查表', '开一个深度学习会话，带我从零学会 Python', '用一句话解释贝叶斯定理，再出两道选择题测验我', '把这份 PDF 讲义讲给我听']

// [D2] 打字机式 ghost 提示轮播
function useTypewriter(items: string[], active: boolean) {
  const [idx, setIdx] = useState(0)
  const [len, setLen] = useState(0)
  useEffect(() => {
    if (!active) return
    const full = items[idx % items.length]
    let t: number
    if (len < full.length) t = window.setTimeout(() => setLen(len + 1), 42)
    else t = window.setTimeout(() => { setLen(0); setIdx((i) => i + 1) }, 2600)
    return () => clearTimeout(t)
  }, [items, idx, len, active])
  return items[idx % items.length].slice(0, len)
}

export default function Home() {
  const nav = useNavigate()
  const { language } = useUser()
  const [mode, setMode] = useState<Mode>('craft')
  const [craftText, setCraftText] = useState('')
  const [assistText, setAssistText] = useState('')
  const [source, setSource] = useState<'self_study' | 'school_sync'>('self_study')
  const [tool, setTool] = useState<'none' | 'boardSession' | 'studyPlanner'>('none')
  const [speed, setSpeed] = useState<'standard' | 'fast'>('standard')
  const [voice, setVoice] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [trends, setTrends] = useState<Trend[]>([])
  const [trendPage, setTrendPage] = useState(0)
  const [trendTab, setTrendTab] = useState<'today' | 'latest'>('today')
  const [courses, setCourses] = useState<MarketplaceCourse[]>([])
  const craftRef = useRef<HTMLTextAreaElement>(null)
  const assistRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { getTrends().then(setTrends).catch(() => {}); getMarketplace().then((c) => setCourses(c.slice(0, 3))).catch(() => {}) }, [])
  useEffect(() => { if (mode !== 'assist') return; const t = setInterval(() => setHeroIdx((i) => i + 1), 4200); return () => clearInterval(t) }, [mode])

  const craftGhost = useTypewriter(CRAFT_GHOSTS, mode === 'craft' && !craftText)
  const assistGhost = useTypewriter(ASSIST_GHOSTS, mode === 'assist' && !assistText)
  const shownTrends = useMemo(() => { const start = (trendPage * 5) % Math.max(trends.length, 1); return [...trends, ...trends].slice(start, start + 5) }, [trends, trendPage])

  const [themeModal, setThemeModal] = useState(false)
  const [lmsModal, setLmsModal] = useState(false)
  const [planModal, setPlanModal] = useState(false)
  const [planQuery, setPlanQuery] = useState('')

  const schoolFileRef = useRef<HTMLInputElement>(null)
  const activeCategoryRef = useRef<'syllabus' | 'courseware' | 'extra'>('syllabus')
  const [schoolFiles, setSchoolFiles] = useState<{ syllabus?: File; courseware?: File; extra?: File }>({})

  const triggerSchoolUpload = (cat: 'syllabus' | 'courseware' | 'extra') => {
    activeCategoryRef.current = cat
    schoolFileRef.current?.click()
  }

  const handleSchoolFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const cat = activeCategoryRef.current
    setSchoolFiles((prev) => ({ ...prev, [cat]: file }))
    if (!craftText && cat === 'syllabus') {
      const suggested = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      setCraftText(suggested)
    }
  }

  const [assistFiles, setAssistFiles] = useState<Array<{ name: string; type: string; data?: string; size?: number }>>([])
  const assistFileInputRef = useRef<HTMLInputElement>(null)

  const handleAssistPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          e.preventDefault()
          const reader = new FileReader()
          reader.onload = () => {
            setAssistFiles((prev) => [
              ...prev,
              {
                name: file.name || `截图-${new Date().toLocaleTimeString('zh-CN')}.png`,
                type: file.type,
                data: reader.result as string,
                size: file.size,
              },
            ])
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const handleAssistFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
          setAssistFiles((prev) => [
            ...prev,
            { name: file.name, type: file.type, data: reader.result as string, size: file.size },
          ])
        }
        reader.readAsDataURL(file)
      } else {
        setAssistFiles((prev) => [
          ...prev,
          { name: file.name, type: file.type, size: file.size },
        ])
      }
    })
    e.target.value = ''
  }

  const submitCraft = () => {
    const defaultTopic = source === 'school_sync'
      ? (schoolFiles.syllabus?.name.replace(/\.[^/.]+$/, '') ?? '学校同步定制课程')
      : CRAFT_GHOSTS[0]
    const q = craftText.trim() || defaultTopic
    setPlanQuery(q)
    setPlanModal(true)
  }
  const submitAssist = () => {
    const q = assistText.trim()
    if (!q && assistFiles.length === 0) return
    const message = q || '请帮我解析这份材料'
    nav('/response/new', {
      state: {
        message,
        speed_mode: speed,
        tts_enabled: voice,
        mode: tool === 'none' ? undefined : tool,
        ui_language: language,
        attachments: assistFiles,
      },
    })
  }

  return (
    <div className="relative min-h-full">
      <DotField />
      <div className="relative mx-auto w-full" style={{ maxWidth: 1228, padding: "70px 20px 28px" }}>
        {/* 模式 tab */}
        <div className="flex justify-center mt-1 mb-8">
          <div role="tablist" aria-label="Home mode" className="inline-flex rounded-full bg-[#f1f2f4] p-1 text-[13px]">
            {(['craft', 'assist'] as Mode[]).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
                className="px-4 h-8 rounded-full transition-colors data-[on=true]:bg-white data-[on=true]:shadow-sm text-[#6b6b70] data-[on=true]:text-black" data-on={mode === m}>
                {m === 'craft' ? '打造课程' : '即时协助'}
              </button>
            ))}
          </div>
        </div>

        {mode === 'craft' ? (
          <section key="craft" className="hk-fade-in-up">
            <h1 className="text-center text-[30px] font-semibold tracking-tight leading-tight">
              使用 <span className="inline-flex items-center gap-1.5 align-middle"><span className="inline-flex h-7 w-7 rounded-lg overflow-hidden items-center justify-center align-middle hk-orbie shadow-sm"><video autoPlay loop muted playsInline className="h-full w-full object-cover"><source src="/assets/orbie/orbie-greeting.mp4" type="video/mp4" /><img src="/assets/orbie/orbie-greeting.webp" alt="Orbie" className="h-full w-full object-cover" /></video></span>betterknow</span> 打造你的专属课程
            </h1>
            <p className="text-center text-[14px] text-[#6b6b70] mt-2">掌握人类知识中的一切</p>

            <div className="hk-composer mt-7 p-4">
              {source === 'school_sync' ? (
                <div className="space-y-3">
                  <div className="text-[13px] text-[#6b6b70] font-medium flex items-center justify-between">
                    <span>上传课程大纲与课件，为你的学校课程定制同步学习计划：</span>
                    <button onClick={() => setLmsModal(true)} className="text-[12px] text-[#3b5bdb] hover:underline inline-flex items-center gap-1 font-normal">
                      从 Canvas LMS 导入 →
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={schoolFileRef}
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md,.pptx,.ppt,.xlsx,.xls,image/*"
                    onChange={handleSchoolFilesSelected}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => triggerSchoolUpload('syllabus')}
                      className="text-left p-3.5 rounded-xl border border-dashed border-[#d4d4d8] hover:border-[#0a0a0a] bg-[#fafafa] hover:bg-[#f4f4f5] transition-all group"
                    >
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0a0a0a]">
                        <span className="h-4 w-4 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-[10px]">1</span>
                        教学大纲
                      </div>
                      <div className="text-[11px] text-[#71717a] mt-1 line-clamp-1">课程大纲与安排</div>
                      {schoolFiles.syllabus ? (
                        <div className="mt-2 text-[11px] text-[#16a34a] font-medium truncate flex items-center gap-1">
                          <Check size={12} /> {schoolFiles.syllabus.name}
                        </div>
                      ) : (
                        <div className="mt-2 text-[11px] text-[#a1a1aa] group-hover:text-[#0a0a0a] flex items-center gap-1 transition-colors">
                          <Plus size={12} /> 上传大纲
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerSchoolUpload('courseware')}
                      className="text-left p-3.5 rounded-xl border border-dashed border-[#d4d4d8] hover:border-[#0a0a0a] bg-[#fafafa] hover:bg-[#f4f4f5] transition-all group"
                    >
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0a0a0a]">
                        <span className="h-4 w-4 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-[10px]">2</span>
                        课程课件
                      </div>
                      <div className="text-[11px] text-[#71717a] mt-1 line-clamp-1">讲义与笔记</div>
                      {schoolFiles.courseware ? (
                        <div className="mt-2 text-[11px] text-[#16a34a] font-medium truncate flex items-center gap-1">
                          <Check size={12} /> {schoolFiles.courseware.name}
                        </div>
                      ) : (
                        <div className="mt-2 text-[11px] text-[#a1a1aa] group-hover:text-[#0a0a0a] flex items-center gap-1 transition-colors">
                          <Plus size={12} /> 上传讲义
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerSchoolUpload('extra')}
                      className="text-left p-3.5 rounded-xl border border-dashed border-[#d4d4d8] hover:border-[#0a0a0a] bg-[#fafafa] hover:bg-[#f4f4f5] transition-all group"
                    >
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0a0a0a]">
                        <span className="h-4 w-4 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-[10px]">3</span>
                        更多材料
                      </div>
                      <div className="text-[11px] text-[#71717a] mt-1 line-clamp-1">作业、模拟考试等…</div>
                      {schoolFiles.extra ? (
                        <div className="mt-2 text-[11px] text-[#16a34a] font-medium truncate flex items-center gap-1">
                          <Check size={12} /> {schoolFiles.extra.name}
                        </div>
                      ) : (
                        <div className="mt-2 text-[11px] text-[#a1a1aa] group-hover:text-[#0a0a0a] flex items-center gap-1 transition-colors">
                          <Plus size={12} /> 上传材料
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] text-[#a1a1aa]">
                    支持格式：.pdf, .doc, .docx, .txt, .md, .pptx, .ppt, .xlsx, .xls, 图片
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <textarea ref={craftRef} value={craftText} onChange={(e) => setCraftText(e.target.value)} rows={2}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitCraft() } if (e.key === 'Tab' && !craftText) { e.preventDefault(); setCraftText(CRAFT_GHOSTS[0]) } }}
                    className="w-full resize-none bg-transparent outline-none text-[15px] leading-6 placeholder:text-transparent" placeholder="betterknow 可以为你生成课程" aria-label="betterknow 可以为你生成课程" />
                  {!craftText && (
                    <div className="pointer-events-none absolute left-0 top-0 text-[15px] leading-6 text-[#a1a1aa]">
                      学习 <span className="text-[#6b6b70] hk-caret">{craftGhost}</span> <kbd className="ml-1 text-[10px] px-1 py-0.5 rounded border bg-[#fafafa]">tab</kbd>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => setLmsModal(true)} className="hk-icon-btn" aria-label="上传文件" title="上传课程材料/大纲"><Plus size={16} /></button>
                <div role="radiogroup" aria-label="Course source" className="inline-flex rounded-full border p-0.5 text-[13px]">
                  {([['self_study', '自学'], ['school_sync', '学校同步']] as const).map(([v, l]) => (
                    <button key={v} role="radio" aria-checked={source === v} onClick={() => setSource(v)} className="px-3 h-7 rounded-full inline-flex items-center gap-1.5 data-[on=true]:bg-[#f1f2f4]" data-on={source === v}>
                      <span className="h-3 w-3 rounded-full border border-[#71717a] inline-flex items-center justify-center">{source === v && <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />}</span>{l}
                    </button>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="hk-pill h-7 text-[12px] gap-1 text-[#3d3d3f]" title="BYOK 自由驱动 · 无积分扣减限制" aria-label="BYOK 自由模式"><Sparkles size={12} className="text-[var(--pro-gold)]" />BYOK ✦ ∞</span>
                  <button onClick={submitCraft} className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center hover:bg-black/80" aria-label="生成课程"><ArrowUp size={16} /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mt-4 text-[13px]">
              <button className="text-[#6b6b70] hover:text-black transition-colors" onClick={() => setLmsModal(true)}>或直接从 <span className="font-semibold text-black underline underline-offset-2">学校的 LMS</span> 导入</button>
              <button className="hk-pill text-[#6b6b70] hover:text-black transition-colors" onClick={() => setThemeModal(true)}><Sparkles size={13} /> 生成课程时可以用什么主题？</button>
            </div>

            <section className="mt-14">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-[15px] font-semibold"><span className="inline-block h-4 w-4 rounded-sm bg-[#0a0a0a]" />课程集市</h2>
                <button onClick={() => nav('/marketplace')} className="text-[13px] text-[#6b6b70] hover:text-black inline-flex items-center">查看全部 <ChevronRight size={14} /></button>
              </div>
              <div className="hk-library-tickets">
                {courses.length === 0 ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="hk-skeleton rounded-2xl h-[326px]" />) : courses.map((c) => <CourseCard key={c.marketplaceId} c={c} />)}
              </div>
            </section>
          </section>
        ) : (
          <section key="assist" className="hk-fade-in-up">
            <h1 className="text-center hk-hero-title tracking-tight flex items-center justify-center gap-3">
              <span className="text-[26px] hk-orbie">🛸</span>
              <span key={heroIdx} className="hk-fade-in">{ASSIST_HEROES[heroIdx % ASSIST_HEROES.length]}</span>
            </h1>

            <div className="hk-composer mt-6 p-4">
              <input
                type="file"
                ref={assistFileInputRef}
                className="hidden"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt,.md"
                onChange={handleAssistFilesSelected}
              />
              {assistFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2.5 pt-1">
                  {assistFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] text-[12px] text-[#1c1c1e]">
                      {f.data ? (
                        <img src={f.data} alt={f.name} className="h-6 w-6 rounded object-cover border border-[#d4d4d8]" />
                      ) : (
                        <FileText size={14} className="text-[#3b5bdb]" />
                      )}
                      <span className="max-w-[160px] truncate font-medium">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => setAssistFiles((fs) => fs.filter((_, idx) => idx !== i))}
                        className="text-[#a1a1aa] hover:text-[#dc2626] ml-0.5"
                        aria-label="移除附件"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="relative">
                <textarea ref={assistRef} value={assistText} onChange={(e) => setAssistText(e.target.value)} onPaste={handleAssistPaste} rows={2}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAssist() } }}
                  className="w-full resize-none bg-transparent outline-none text-[15px] leading-6 placeholder:text-transparent" placeholder="问我任何问题，可粘贴截图或上传材料" aria-label="即时协助输入" />
                {!assistText && <div className="pointer-events-none absolute left-0 top-0 text-[15px] leading-6 text-[#a1a1aa] hk-caret">{assistGhost}</div>}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button type="button" onClick={() => assistFileInputRef.current?.click()} className="hk-icon-btn" aria-label="上传文件" title="上传图片或文件"><Plus size={16} /></button>
                <button className="hk-icon-btn" aria-label="Drive 集成" title="Drive 集成"><HardDrive size={15} /></button>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="hk-pill h-8" aria-label="工具"><Wrench size={14} /> 工具 {tool !== 'none' && <Check size={12} />}</button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[320px] p-1.5 hk-pop">
                    {([['boardSession', PenLine, '白板课堂', '把当前对话变成 AI 边讲边写的白板课堂，或对你上传的 PDF 逐页讲解。'], ['studyPlanner', CalendarCheck, '学习规划', '制定含学习任务（如学习小节）的可执行学习计划，并添加到日历。']] as const).map(([v, Icon, title, desc]) => (
                      <button key={v} onClick={() => setTool(tool === v ? 'none' : v)} className="w-full text-left flex gap-3 p-2.5 rounded-lg hover:bg-[#f4f4f5] data-[on=true]:bg-[#f4f4f5]" data-on={tool === v}>
                        <span className="hk-icon-btn shrink-0"><Icon size={15} /></span>
                        <span><span className="block text-[13px] font-medium">{title}</span><span className="block text-[12px] text-[#6b6b70] leading-5">{desc}</span></span>
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
                <button className="hk-icon-btn" aria-label="语音输出" aria-pressed={voice} onClick={() => setVoice((v) => !v)} data-on={voice} style={voice ? { background: '#0a0a0a', color: '#fff' } : undefined}><Mic size={15} /></button>
                <div className="ml-auto flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild><button className="hk-pill h-8 text-[12px]" aria-label="速度"><Sparkles size={12} /> {speed === 'standard' ? '标准' : '快速'} <ChevronDown size={12} /></button></PopoverTrigger>
                    <PopoverContent align="end" className="w-[220px] p-1.5 hk-pop">
                      {([['standard', '标准', '经典模式，回答更全面'], ['fast', '快速', '适合简短回复']] as const).map(([v, t, d]) => (
                        <button key={v} onClick={() => setSpeed(v)} className="w-full text-left p-2 rounded-lg hover:bg-[#f4f4f5] flex items-center justify-between" data-on={speed === v}>
                          <span><span className="block text-[13px] font-medium">{t}</span><span className="block text-[12px] text-[#6b6b70]">{d}</span></span>{speed === v && <Check size={14} />}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                  <button onClick={submitAssist} className="hk-send" aria-label="发送" disabled={!assistText.trim() && assistFiles.length === 0}><ArrowUp size={16} /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {([[HkConceptIcon, '概念讲解', 'up'], [HkMaterialsIcon, '个性化学习资料生成', ''], [HkLongFilesIcon, '长文件消化', ''], [HkSolveProblemIcon, '问题求解', ''], [HkVisualIcon, '可视化', 'new']] as const).map(([Icon, label, badge]) => (
                <button key={label} onClick={() => { setAssistText(label === '可视化' ? '用可视化方式讲解' : label + '：'); assistRef.current?.focus() }} className="hk-chip"><Icon size={16} />{label}{badge === 'up' && <span className="hk-badge-up">已升级</span>}{badge === 'new' && <span className="hk-badge-new">New</span>}</button>
              ))}
            </div>

            <section className="mt-12">
              <div className="flex items-center gap-4 text-[13px] mb-2">
                <button onClick={() => setTrendTab('today')} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md data-[on=true]:bg-[#f1f2f4] text-[#6b6b70] data-[on=true]:text-black" data-on={trendTab === 'today'}><Sparkles size={13} /> 今日值得学</button>
                <button onClick={() => setTrendTab('latest')} className="px-2 py-1 rounded-md data-[on=true]:bg-[#f1f2f4] text-[#6b6b70] data-[on=true]:text-black" data-on={trendTab === 'latest'}>最新动态</button>
                <button onClick={() => setTrendPage((p) => p + 1)} className="ml-auto inline-flex items-center gap-1 text-[#6b6b70] hover:text-black"><RefreshCw size={12} /> 换一批</button>
              </div>
              <ul className="divide-y">
                {shownTrends.map((t) => (
                  <li key={t.id}><button onClick={() => { setAssistText(`讲讲：${t.title}`); assistRef.current?.focus() }} className="w-full flex items-center gap-3 py-3 text-left text-[14px] hover:text-black text-[#3d3d3f]"><TrendingUp size={14} className="text-[#8a8a90] shrink-0" /><span className="truncate">{t.title}</span></button></li>
                ))}
                {shownTrends.length === 0 && Array.from({ length: 5 }).map((_, i) => <li key={i} className="py-3"><div className="hk-skeleton h-4 rounded w-2/3" /></li>)}
              </ul>
            </section>
          </section>
        )}
      </div>
      <div className="pointer-events-none fixed right-6 bottom-4 text-right text-[11px] text-[#a1a1aa] leading-4"><div className="font-medium text-[#8a8a90]">Attention, Drifting</div>Dot field, cursor light, 2026</div>

      <ThemeSuggestionModal
        open={themeModal}
        onOpenChange={setThemeModal}
        onSelectTopic={(t) => {
          setCraftText(t)
          craftRef.current?.focus()
        }}
      />
      <CanvasLmsModal
        open={lmsModal}
        onOpenChange={setLmsModal}
        onImportSuccess={(courseName) => {
          setPlanQuery(courseName)
          setSource('school_sync')
          setPlanModal(true)
        }}
      />
      <CoursePlanModal
        open={planModal}
        onOpenChange={setPlanModal}
        query={planQuery}
        sourceMode={source}
      />
    </div>
  )
}
