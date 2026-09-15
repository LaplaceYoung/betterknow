import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Check, ChevronRight, Globe, Sparkles, Video, BookOpen, Layers, PenTool, MessageSquare, ArrowLeft, Gift } from 'lucide-react'
import { apiPost } from '@/lib/api'

interface OnboardingAnswers {
  language?: string
  source?: string
  source_other?: string
  referral_code?: string
  identity?: string
}

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'zh', label: 'Chinese (Simplified)', native: '简体中文' },
  { code: 'zh-TW', label: 'Chinese (Traditional)', native: '繁體中文' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'ko', label: 'Korean', native: '한국어' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ur', label: 'Urdu', native: 'اردو' },
]

const SOURCES = [
  '搜索引擎（如 Google、必应）',
  'Instagram 或 TikTok',
  'LinkedIn 或 X（推特）',
  '小红书（RedNote）',
  '朋友、同学或同事推荐',
  '校园内 — 海报、传单或社团/学生组织社交账号',
  '博客、播客或新闻报道',
  '其他',
]

const IDENTITIES = [
  '高中生',
  '本科生',
  '研究生/博士生',
  '自学者/职场人士',
  '其他',
]

const GREETING_BUBBLES = ['Hi!', '你好!', '¡Hola!', '안녕!', 'Hello!', '你好呀']

export default function Onboarding() {
  const nav = useNavigate()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<OnboardingAnswers>({ language: 'zh' })
  const [hasReferralCode, setHasReferralCode] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [sourceOther, setSourceOther] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleFinish = async () => {
    setSubmitting(true)
    try {
      await apiPost('/onboarding/manage_onboarding', {
        general_onboarding: true,
        answers: {
          ...answers,
          referral_code: referralCode || undefined,
          source_other: sourceOther || undefined,
        },
      }).catch(() => {})
      localStorage.setItem('onboarding_completed', 'true')
      nav('/')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden" style={{ background: 'var(--app-bg)' }}>
      {/* Background ambient pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 w-full max-w-[620px]">
        {/* Step indicator */}
        <div className="flex gap-1.5 mb-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{ background: i + 1 <= step ? '#0a0a0a' : '#e4e4e7' }}
            />
          ))}
        </div>

        {/* STEP 1: Orbie Greeting & Language */}
        {step === 1 && (
          <div className="hk-card p-8 hk-fade-in-up text-center relative overflow-hidden">
            {/* Floating Greeting Chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {GREETING_BUBBLES.map((bubble, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-[13px] font-medium bg-[#f1f2f4] text-[#3d3d3f] animate-pulse"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  {bubble}
                </span>
              ))}
            </div>

            {/* Video / Animated Avatar */}
            <div className="mx-auto h-24 w-24 rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-[#1c1c1e] mb-6 flex items-center justify-center">
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src="/assets/orbie/orbie-greeting.mp4" type="video/mp4" />
                <img src="/assets/orbie/orbie-greeting.webp" alt="Orbie" className="h-full w-full object-cover" />
              </video>
            </div>

            <h1 className="text-[22px] font-semibold tracking-tight text-[#0a0a0a]">
              Hi, I'm Orbie. Welcome to betterknow!
            </h1>
            <p className="text-[14px] text-[#6b6b70] mt-2 max-w-[440px] mx-auto leading-relaxed">
              Before we start, could I ask you a few quick questions so I can get to know you?
            </p>

            {/* Language Selector */}
            <div className="mt-8 text-left">
              <label className="block text-[13px] font-medium text-[#3d3d3f] mb-3">
                Which language should I speak with you?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LANGUAGES.map((lang) => {
                  const isSelected = answers.language === lang.code
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setAnswers((prev) => ({ ...prev, language: lang.code }))}
                      className="px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all hover:border-[#a1a1aa] data-[on=true]:border-[#0a0a0a] data-[on=true]:bg-[#fafafa]"
                      data-on={isSelected}
                    >
                      <div>
                        <div className="text-[13px] font-medium text-[#0a0a0a]">{lang.native}</div>
                        <div className="text-[11px] text-[#8a8a90]">{lang.label}</div>
                      </div>
                      {isSelected && <Check size={14} className="text-[#0a0a0a]" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-8 w-full h-11 rounded-full bg-[#0a0a0a] text-white text-[14px] font-medium hover:bg-black/85 transition-colors shadow-sm"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: Discovery source */}
        {step === 2 && (
          <div className="hk-card p-8 hk-fade-in-up">
            <div className="text-[12px] text-[#8a8a90] mb-1">第 2 步，共 9 步</div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#0a0a0a]">
              你是从哪里了解到 betterknow 的？
            </h1>

            {/* Referral code accordion */}
            <div className="mt-3">
              <button
                onClick={() => setHasReferralCode(!hasReferralCode)}
                className="text-[12px] text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                <Gift size={13} /> {hasReferralCode ? '收起推荐码' : '你有推荐码吗？'}
              </button>
              {hasReferralCode && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="输入推荐码 / 兑换码"
                    className="flex-1 h-9 px-3 rounded-lg border text-[13px] outline-none focus:border-[#0a0a0a]"
                  />
                </div>
              )}
            </div>

            {/* Source choices */}
            <div className="mt-5 space-y-2">
              {SOURCES.map((source) => {
                const isSelected = answers.source === source
                return (
                  <button
                    key={source}
                    onClick={() => setAnswers((prev) => ({ ...prev, source }))}
                    className="w-full text-left px-4 py-2.5 rounded-xl border transition-all flex items-center justify-between hover:border-[#a1a1aa] data-[on=true]:border-[#0a0a0a] data-[on=true]:bg-[#fafafa]"
                    data-on={isSelected}
                  >
                    <span className="text-[13px] font-medium text-[#1c1c1e]">{source}</span>
                    <span className="h-4 w-4 rounded-full border border-[#a1a1aa] flex items-center justify-center data-[on=true]:border-[#0a0a0a] data-[on=true]:bg-[#0a0a0a]" data-on={isSelected}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                )
              })}
              {answers.source === '其他' && (
                <input
                  type="text"
                  value={sourceOther}
                  onChange={(e) => setSourceOther(e.target.value)}
                  placeholder="告诉我们你是从哪里了解到我们的……"
                  className="w-full h-10 px-3.5 rounded-xl border text-[13px] outline-none focus:border-[#0a0a0a] mt-2"
                />
              )}
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t">
              <button onClick={() => setStep(1)} className="hk-pill h-9 px-4">
                返回
              </button>
              <button
                disabled={!answers.source}
                onClick={() => setStep(3)}
                className="h-10 px-6 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium disabled:opacity-40 hover:bg-black/85 transition-colors"
              >
                继续
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Learner persona */}
        {step === 3 && (
          <div className="hk-card p-8 hk-fade-in-up">
            <div className="text-[12px] text-[#8a8a90] mb-1">第 3 步，共 9 步</div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#0a0a0a]">
              以下哪个选项最能描述您当前的身份？
            </h1>
            <p className="text-[13px] text-[#6b6b70] mt-1">
              我们将根据你的身份为你定制最贴合的知识讲解深度和课后考核方式。
            </p>

            <div className="mt-6 space-y-2">
              {IDENTITIES.map((ident) => {
                const isSelected = answers.identity === ident
                return (
                  <button
                    key={ident}
                    onClick={() => setAnswers((prev) => ({ ...prev, identity: ident }))}
                    className="w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between hover:border-[#a1a1aa] data-[on=true]:border-[#0a0a0a] data-[on=true]:bg-[#fafafa]"
                    data-on={isSelected}
                  >
                    <span className="text-[14px] font-medium text-[#1c1c1e]">{ident}</span>
                    <span className="h-4 w-4 rounded-full border border-[#a1a1aa] flex items-center justify-center data-[on=true]:border-[#0a0a0a] data-[on=true]:bg-[#0a0a0a]" data-on={isSelected}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t">
              <button onClick={() => setStep(2)} className="hk-pill h-9 px-4">
                返回
              </button>
              <button
                disabled={!answers.identity}
                onClick={() => setStep(4)}
                className="h-10 px-6 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium disabled:opacity-40 hover:bg-black/85 transition-colors"
              >
                继续
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Product Vision Card */}
        {step === 4 && (
          <div className="hk-card p-8 hk-fade-in-up text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-[#f1f2f4] flex items-center justify-center mb-5 text-[#0a0a0a]">
              <Sparkles size={28} />
            </div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#0a0a0a] max-w-[480px] mx-auto leading-snug">
              我们刚刚完成了最重要的一次更新。
            </h1>
            <p className="text-[14px] text-[#4b4b50] mt-3 max-w-[460px] mx-auto leading-relaxed">
              这次更新就是为了证明：AI 不仅能教得和人类老师一样好，甚至能教得更好。
            </p>
            <p className="text-[14px] text-[#6b6b70] mt-3 max-w-[460px] mx-auto leading-relaxed font-medium">
              现在，我们来看看在 betterknow 里学习到底是什么样子的。
            </p>

            <button
              onClick={() => setStep(5)}
              className="mt-8 h-11 px-8 rounded-full bg-[#0a0a0a] text-white text-[14px] font-medium hover:bg-black/85 transition-colors shadow-sm"
            >
              继续
            </button>
          </div>
        )}

        {/* STEP 5: Feature 1 - Structured Learning vs Single Prompt */}
        {step === 5 && (
          <div className="hk-card p-8 hk-fade-in-up">
            <div className="flex items-center gap-2 mb-2 text-[12px] font-semibold text-[#8a8a90] uppercase tracking-wider">
              <Layers size={14} /> 特性 1 · 体系化进阶
            </div>
            <h2 className="text-[20px] font-semibold text-[#0a0a0a] leading-snug">
              大多数 AI 只能一问一答、零散地教。
            </h2>
            <p className="text-[13px] text-[#6b6b70] mt-2 leading-relaxed">
              betterknow 会根据你的学习目标规划完整的大纲，从基础直觉、核心概念到深入实践，层层递进建立结构化认知。
            </p>

            {/* Visual demo card */}
            <div className="my-6 rounded-2xl border bg-[#f8f9fa] p-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border bg-white p-3.5 opacity-60">
                  <div className="text-[11px] font-semibold text-[#dc2626] mb-1">普通 AI</div>
                  <div className="text-[12px] text-[#6b6b70]">单轮碎片问答，缺乏上下文记忆与系统知识图谱</div>
                </div>
                <div className="rounded-xl border-2 border-[#0a0a0a] bg-white p-3.5 shadow-sm">
                  <div className="text-[11px] font-semibold text-[#16a34a] mb-1">betterknow</div>
                  <div className="text-[12px] text-[#1c1c1e] font-medium">教学大纲 → 交互讲座 → 随堂演练 → 综合考试</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <button onClick={() => setStep(4)} className="hk-pill h-9 px-4">
                返回
              </button>
              <button
                onClick={() => setStep(6)}
                className="h-10 px-6 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 transition-colors"
              >
                仔细看看
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Feature 2 - Course Architecture */}
        {step === 6 && (
          <div className="hk-card p-8 hk-fade-in-up">
            <div className="flex items-center gap-2 mb-2 text-[12px] font-semibold text-[#8a8a90] uppercase tracking-wider">
              <BookOpen size={14} /> 特性 2 · 课程剖析
            </div>
            <h2 className="text-[20px] font-semibold text-[#0a0a0a] leading-snug">
              来看看一门课程里面长什么样：一个个单元，每个单元由 Lecture 和 Session 组成，每节 Session 之后都有随堂练习。
            </h2>

            {/* Architecture diagram */}
            <div className="my-6 rounded-2xl border bg-[#f8f9fa] p-4 space-y-3">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-[#3d3d3f]">
                <span className="h-5 w-5 rounded-md bg-[#0a0a0a] text-white flex items-center justify-center text-[11px]">1</span>
                单元 1：核心概念与直觉建立
              </div>
              <div className="pl-7 space-y-2">
                <div className="p-2.5 rounded-lg bg-white border text-[12px] flex items-center justify-between">
                  <span>讲次 1：第一原理与历史渊源</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#eef2ff] text-[#3b5bdb]">白板讲座</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border text-[12px] flex items-center justify-between">
                  <span>随堂测验：概念检验与填空题</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#dcfce7] text-[#15803d]">即时反馈</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <button onClick={() => setStep(5)} className="hk-pill h-9 px-4">
                返回
              </button>
              <button
                onClick={() => setStep(7)}
                className="h-10 px-6 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 transition-colors"
              >
                继续
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Feature 3 - Whiteboard Classroom */}
        {step === 7 && (
          <div className="hk-card p-8 hk-fade-in-up">
            <div className="flex items-center gap-2 mb-2 text-[12px] font-semibold text-[#8a8a90] uppercase tracking-wider">
              <PenTool size={14} /> 特性 3 · 白板课堂
            </div>
            <h2 className="text-[20px] font-semibold text-[#0a0a0a] leading-snug">
              而课程里的大部分学习，都发生在白板上，就像这样。
            </h2>

            {/* Interactive mini-whiteboard preview */}
            <div className="my-6 rounded-2xl border bg-white overflow-hidden shadow-sm">
              <div className="h-9 border-b bg-[#fafafa] px-3.5 flex items-center justify-between text-[11px] text-[#6b6b70]">
                <span className="font-semibold text-black">白板：社会事实与集体能动性</span>
                <span>缩放 100% · 语音已就绪</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3 min-h-[160px] bg-[#fdfdfd]">
                <div className="border border-dashed border-[#d4d4d8] rounded-xl p-3 flex flex-col justify-center items-center text-center">
                  <div className="h-10 w-10 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-[11px] font-semibold">个 体</div>
                  <div className="text-[10px] text-[#8a8a90] mt-2">↑ 处于包围中的自变量</div>
                </div>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#f1f2f4] p-2.5 text-[11px] leading-relaxed text-[#1c1c1e]">
                    <strong>导师：</strong>「语言并不是我们发明的，但在我们使用它时，语法构成了对行为的隐形约束。」
                  </div>
                  <div className="rounded-xl bg-[#eef2ff] p-2 text-[11px] text-[#3b5bdb]">
                    ✓ 概念重点已高亮到白板
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <button onClick={() => setStep(6)} className="hk-pill h-9 px-4">
                返回
              </button>
              <button
                onClick={() => setStep(8)}
                className="h-10 px-6 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 transition-colors"
              >
                还有更多
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: Feature 4 - Instant Assistance */}
        {step === 8 && (
          <div className="hk-card p-8 hk-fade-in-up">
            <div className="flex items-center gap-2 mb-2 text-[12px] font-semibold text-[#8a8a90] uppercase tracking-wider">
              <MessageSquare size={14} /> 特性 4 · 即时协助
            </div>
            <h2 className="text-[20px] font-semibold text-[#0a0a0a] leading-snug">
              除了 craft 课程，这里还有另一种模式：Instant Assistance，老用户应该已经很熟悉了。
            </h2>
            <p className="text-[13px] text-[#6b6b70] mt-2 leading-relaxed">
              随时召唤 AI 导师解答疑难、生成考前速查表、分析长篇科研论文，或边画边讲拆解复杂公式。
            </p>

            <div className="my-6 grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl border bg-white flex items-center gap-2.5">
                <span className="h-7 w-7 rounded-lg bg-[#f1f2f4] flex items-center justify-center text-[13px]">🔭</span>
                <span className="text-[12px] font-medium">概念讲解 · 深度推演</span>
              </div>
              <div className="p-3 rounded-xl border bg-white flex items-center gap-2.5">
                <span className="h-7 w-7 rounded-lg bg-[#f1f2f4] flex items-center justify-center text-[13px]">📑</span>
                <span className="text-[12px] font-medium">速查表与习题集生成</span>
              </div>
              <div className="p-3 rounded-xl border bg-white flex items-center gap-2.5">
                <span className="h-7 w-7 rounded-lg bg-[#f1f2f4] flex items-center justify-center text-[13px]">📄</span>
                <span className="text-[12px] font-medium">长文件消化与论文导读</span>
              </div>
              <div className="p-3 rounded-xl border bg-white flex items-center gap-2.5">
                <span className="h-7 w-7 rounded-lg bg-[#f1f2f4] flex items-center justify-center text-[13px]">📊</span>
                <span className="text-[12px] font-medium">代码沙箱与动态可视化</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <button onClick={() => setStep(7)} className="hk-pill h-9 px-4">
                返回
              </button>
              <button
                onClick={() => setStep(9)}
                className="h-10 px-6 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/85 transition-colors"
              >
                太好了
              </button>
            </div>
          </div>
        )}

        {/* STEP 9: Final Celebration */}
        {step === 9 && (
          <div className="hk-card p-10 hk-fade-in-up text-center">
            <div className="mx-auto h-20 w-20 rounded-2xl bg-[#0a0a0a] text-white flex items-center justify-center mb-6 shadow-xl">
              <Sparkles size={38} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <h1 className="text-[24px] font-semibold tracking-tight text-[#0a0a0a] max-w-[480px] mx-auto leading-snug">
              参观到此结束！你已经看到 betterknow 是怎么运作的了。
            </h1>
            <p className="text-[15px] text-[#6b6b70] mt-3 max-w-[420px] mx-auto leading-relaxed">
              现在，我们开始你自己的学习吧！
            </p>

            <div className="mt-8 flex justify-center">
              <button
                disabled={submitting}
                onClick={handleFinish}
                className="h-12 px-10 rounded-full bg-[#0a0a0a] text-white text-[15px] font-semibold hover:bg-black/85 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {submitting ? '正在准备...' : '开始吧！'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
