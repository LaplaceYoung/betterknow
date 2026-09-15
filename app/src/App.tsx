import { Navigate, Route, Routes, useParams } from 'react-router'
import { UserProvider } from '@/lib/user'
import { AppShell } from '@/components/layout/AppShell'
import Home from '@/pages/Home'
import Marketplace from '@/pages/Marketplace'
import MarketplacePreview from '@/pages/MarketplacePreview'
import Courses from '@/pages/Courses'
import CourseJourney from '@/pages/CourseJourney'
import ChatResponse from '@/pages/ChatResponse'
import LearningFeed from '@/pages/LearningFeed'
import History from '@/pages/History'
import KnowledgeBase from '@/pages/KnowledgeBase'
import Whiteboard from '@/pages/Whiteboard'
import { Inbox, InboxMessage } from '@/pages/Inbox'
import { Practice, Exam, Project } from '@/pages/CourseWork'
import { SignIn, SignUp, ForgotPassword, ResetPassword, AccountDeleted, WelcomeBack, AuthCallback } from '@/pages/Auth'
import Onboarding from '@/pages/Onboarding'
import { Subscription, CouponCode, PaymentResult, EmailSubscription, SharedConversation, SharedCourse, CourseGenerationLog, DeepLearnOutline, DeepLearnSession, PdfSession, DevCsmPreview, SampleMindmap } from '@/pages/Misc'

// legacy /shared/c/:id → /share/c/:id（保留 query/hash）
function LegacySharedRedirect() { const { conversationId = '' } = useParams(); return <Navigate to={`/share/c/${conversationId}${location.search}${location.hash}`} replace /> }

// 44 条路由（spec/PAGE_CONTRACTS.md）
export default function App() {
  return (
    <UserProvider>
      <Routes>
        {/* 无侧栏：认证 / onboarding / 共享 / 支付回跳 */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account-deleted" element={<AccountDeleted />} />
        <Route path="/welcome-back" element={<WelcomeBack />} />
        <Route path="/share/c/:conversationId" element={<SharedConversation />} />
        <Route path="/shared/c/:conversationId" element={<LegacySharedRedirect />} />
        <Route path="/share/course/:courseId" element={<SharedCourse />} />
        <Route path="/success" element={<PaymentResult />} />
        <Route path="/simulate-pro-success-purchase" element={<PaymentResult />} />
        <Route path="/validate-success" element={<PaymentResult ok={false} />} />
        <Route path="/unsubscribe_email_list" element={<EmailSubscription />} />
        <Route path="/dev/csm" element={<DevCsmPreview />} />

        {/* 白板 / PDF / Onboarding：侧栏 + 无顶部 chrome */}
        <Route element={<AppShell noChrome />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/whiteboard/:sessionId" element={<Whiteboard />} />
          <Route path="/course/:courseId/sessions/whiteboard/:sessionId" element={<Whiteboard />} />
          <Route path="/pdf-session/:sessionId" element={<PdfSession />} />
          <Route path="/course/:courseId/sessions/pdf-annotate/:sessionId" element={<PdfSession />} />
        </Route>

        {/* 主壳 */}
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:courseId/preview" element={<MarketplacePreview />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseJourney />} />
          <Route path="/course/:courseId/welcome" element={<CourseJourney />} />
          <Route path="/course/:courseId/practice/:sessionId" element={<Practice />} />
          <Route path="/course/:courseId/exam/:unitId" element={<Exam />} />
          <Route path="/course/:courseId/project/:stageId" element={<Project />} />
          <Route path="/response/course-generation/:courseUuid" element={<ChatResponse />} />
          <Route path="/response/:conversationId" element={<ChatResponse />} />
          <Route path="/course-generation/log/:runId" element={<CourseGenerationLog />} />
          <Route path="/learning-feed" element={<LearningFeed />} />
          <Route path="/history" element={<History />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/message/:messageId" element={<InboxMessage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/pricing" element={<Subscription />} />
          <Route path="/coupon-code" element={<CouponCode />} />
          <Route path="/deep-learn-session/outline/:subtaskId" element={<DeepLearnOutline />} />
          <Route path="/deep-learn-session/subtask_id/:subtaskId" element={<DeepLearnSession />} />
          <Route path="/deep-learn-session/:sessionId" element={<DeepLearnSession />} />
          <Route path="/sampleMindmapResponse" element={<SampleMindmap />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}
