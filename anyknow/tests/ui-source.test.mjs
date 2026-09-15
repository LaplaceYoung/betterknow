import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";

const web = join(dirname(fileURLToPath(import.meta.url)), "../src/web");
const html = readFileSync(join(web, "index.html"), "utf8");
const css = readFileSync(join(web, "styles.css"), "utf8");
const js = readFileSync(join(web, "app.js"), "utf8");

test("visible brand is simo know and localStorage keys stay anyknow", () => {
  assert.match(html, /<title>simo know<\/title>/);
  assert.match(js, /brand-mark" title="simo know">思/);
  assert.match(js, /heroCraft: "使用 simo know/);
  assert.match(js, /heroCraft: "Craft your own course with simo know"/);
  assert.match(js, /localStorage\.(?:get|set)Item\("anyknow_token"/);
  assert.match(js, /localStorage\.(?:get|set)Item\("anyknow_lang"/);
  assert.doesNotMatch(js, /heroCraft: "[^"]*anyknow/);
  assert.doesNotMatch(html, /<title>anyknow<\/title>/);
});

test("home copy includes 打造课程 and 即时协助", () => {
  assert.match(js, /打造课程/);
  assert.match(js, /即时协助/);
  assert.match(js, /课程集市/);
  assert.match(js, /学校同步/);
});

test("school 课表 import is ICS/xiaoai/zhengfang leftover not 教务 login", () => {
  assert.match(js, /导入课表/);
  assert.match(js, /不代登教务/);
  assert.match(js, /parseTimetable|timetableState/);
  assert.match(js, /ttDraft/);
  assert.match(js, /\/api\/timetable\/import/);
  assert.match(css, /\.tt-grid/);
  assert.doesNotMatch(js, /jwglxt\/xtgl\/login/);
});

test("marketplace page is not a homeView stub", () => {
  assert.match(js, /function marketplaceView/);
  assert.match(js, /发现最适合你的课程/);
  assert.match(js, /编辑精选/);
  assert.match(js, /marketplaceState/);
  assert.match(js, /data-market-subject/);
  assert.match(js, /#\/marketplace/);
  assert.doesNotMatch(js, /homeView\(\)\.replace\("mode-tabs"/);
  assert.match(css, /\.picks/);
  assert.match(css, /\.pick-card/);
});

test("instant assist leftover has chips tools and speed", () => {
  assert.match(js, /需要数学帮助吗/);
  assert.match(js, /assistBoard/);
  assert.match(js, /assistChipPrompt/);
  assert.match(js, /assistBind/);
  assert.match(js, /ASSIST_BOARD_LEFTOVER/);
  assert.match(js, /data-assist-chip/);
  assert.match(js, /data-assist-tool/);
  assert.match(js, /data-assist-speed/);
  assert.match(js, /\/api\/whiteboard\/create/);
  assert.match(js, /\/api\/whiteboard\/followup/);
  assert.match(js, /registerWhiteboardSession/);
  assert.match(js, /currentWhiteboardId/);
  assert.match(js, /kbHit/);
  assert.match(js, /tutorTopic/);
  assert.match(js, /已检索公开教材/);
  assert.match(css, /\.assist-chip/);
  assert.match(css, /\.assist-pop/);
});

test("course preview leftover has units materials practice tabs", () => {
  assert.match(js, /本课程暂无资料/);
  assert.match(js, /显示更多/);
  assert.match(js, /data-course-tab/);
  assert.match(js, /coursePracticeIndex/);
  assert.match(js, /上传材料，扩展这门课程/);
  assert.match(css, /\.upload-extend/);
});

test("chalkboard tokens and handwriting fonts are in shipped CSS", () => {
  assert.match(css, /--board:\s*#0b1610/);
  assert.match(css, /--font-display:\s*"ZCOOL XiaoWei", "Kalam"/);
  assert.match(css, /--font-chalk:\s*"Kalam", "ZCOOL XiaoWei"/);
  assert.match(css, /--chalk-shadow:/);
  assert.match(css, /font-synthesis:\s*none/);
  assert.match(html, /ZCOOL\+XiaoWei/);
  assert.match(html, /Kalam:wght@300;400/);
  assert.match(css, /--font-mark:\s*"Kalam"/);
  assert.doesNotMatch(html, /Zhi\+Mang\+Xing/);
  assert.doesNotMatch(html, /Liu\+Jian\+Mao\+Cao/);
  assert.doesNotMatch(html, /Long\+Cang/);
  assert.doesNotMatch(html, /Caveat/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /board-grain/);
  assert.doesNotMatch(css, /--app-bg:\s*#FAFAFA/);
  assert.doesNotMatch(html, /Ma\+Shan\+Zheng/);
});

test("file: protocol is detected instead of a blank module failure", () => {
  assert.match(js, /protocol === "file:"/);
  assert.match(js, /npm start/);
});

test("history and learning-feed are not listPage stubs", () => {
  assert.match(js, /historyView/);
  assert.match(js, /feedView/);
  assert.match(js, /deepLearnView/);
  assert.match(js, /create_deep_learn_session|\/api\/deeplearn\/create/);
  assert.match(js, /histNewSession/);
  assert.match(js, /没有符合条件的对话/);
  assert.match(js, /待处理任务/);
  assert.match(js, /generate_diagram|data-diagram-board/);
  assert.doesNotMatch(js, /\/api\/visual/);
  assert.doesNotMatch(js, /结构化深度学习课堂：按大纲逐步讲解/);
});

test("knowledge-base view is not a stub and has empty-state + New/upload", () => {
  assert.match(js, /knowledgeBaseView/);
  assert.match(js, /kbEmpty/);
  assert.match(js, /暂无文件/);
  assert.match(js, /No files found/);
  assert.match(js, /kbNew/);
  assert.doesNotMatch(js, /kbNew2/);
  assert.doesNotMatch(js, /kbUpload2/);
  assert.match(js, /\/api\/drive\/upload/);
  assert.match(js, /\/api\/drive\/folder/);
  assert.doesNotMatch(js, /上传的课件与生成的速查表、闪卡会汇集在此/);
  const createFn = js.slice(js.indexOf("async function onCreateFolder"), js.indexOf("async function onKbUpload"));
  assert.match(createFn, /render\(\)/);
  assert.doesNotMatch(createFn, /go\("\/knowledge-base"\)/);
});

test("学习/练习 click refs use encodeCourseTarget/decodeCourseTarget", () => {
  assert.match(js, /from "\.\/session-ref\.js"/);
  assert.match(js, /encodeCourseTarget\(course\.courseId, s\.sessionId\)/);
  assert.match(js, /decodeCourseTarget\(b\.dataset\.learn\)/);
  assert.match(js, /decodeCourseTarget\(b\.dataset\.practice\)/);
  assert.doesNotMatch(js, /dataset\.learn\.split\(/);
  assert.doesNotMatch(js, /dataset\.practice\.split\(/);
});

test("chalkboard streak heatmap and school-gated LMS live in the UI", () => {
  assert.match(js, /heat-grid/);
  assert.match(js, /week-dots/);
  assert.match(js, /学习粉尘表/);
  assert.match(js, /\/api\/streak/);
  assert.match(js, /source === "school"/);
  assert.match(css, /\.heat-cell/);
  assert.match(css, /\.week-dot/);
});

test("inbox is Messages/Updates not 暂无站内信 stub", () => {
  assert.match(js, /inboxView/);
  assert.match(js, /暂无消息/);
  assert.match(js, /课程相关动态将显示在此处/);
  assert.doesNotMatch(js, /暂无站内信/);
  assert.match(js, /\/api\/inbox\/read/);
});

test("instant-assist response view is not a listPage dump", () => {
  assert.match(js, /resp-thread/);
  assert.match(js, /conversationId/);
  assert.match(js, /\/api\/conversations\//);
  assert.match(js, /responseView/);
  assert.match(js, /lastResult\.diagram/);
  assert.match(js, /typeMessage|输入您的消息/);
  assert.doesNotMatch(js, /listPage\("即时协助"/);
  assert.match(css, /\.response-board/);
  assert.match(css, /\.resp-thread/);
  assert.match(js, /workedExampleHtml/);
  assert.match(js, /generate_worked_example|worked-example/);
  assert.match(css, /\.worked-example/);
  assert.match(js, /studyAskHtml/);
  assert.match(js, /data-study-opt/);
  assert.match(css, /\.study-ask/);
  assert.match(js, /digestHtml/);
  assert.match(js, /generate_digest|data-digest-board/);
  assert.match(css, /\.digest-board/);
  assert.match(js, /planTasksHtml/);
  assert.match(js, /data-plan-act/);
  assert.match(js, /\/api\/plan\/confirm/);
  assert.match(css, /\.plan-board/);
  assert.match(js, /encyclopediaHtml/);
  assert.match(js, /generate_content|data-content-board/);
  assert.match(css, /\.encyclopedia/);
  assert.match(js, /quizHtml|data-resp-quiz/);
  assert.match(js, /data-next-step|nextStepsHtml/);
  assert.match(js, /recommend_next_step|data-next-rail/);
  assert.match(css, /\.next-rail/);
  assert.match(css, /\.next-card/);
  assert.match(js, /data-web-cite|webHit/);
  assert.match(js, /sourcesHtml/);
  assert.match(js, /data-resp-opt/);
  assert.match(js, /data-open-cheat|openCheatSpread/);
  assert.match(js, /resetRespCheck/);
  assert.match(css, /\.resp-quiz/);
  assert.doesNotMatch(js, /bind\.kind === \"materials\"/);
  assert.match(js, /cheatPdf|paginateCheatsheet/);
  assert.match(js, /\/api\/materials\/pdf/);
  assert.match(css, /\.cheat-spread/);
  assert.match(css, /@media print/);
  assert.match(js, /chip: \"craft\"|chip:\"craft\"/);
  assert.doesNotMatch(js, /Google Calendar|googleapis.com\/calendar/i);
  assert.doesNotMatch(js, /listPage\("即时协助"/);
});

test("project stage player is not a listPage stub", () => {
  assert.match(js, /projectView/);
  assert.match(js, /projFinish/);
  assert.match(js, /看起来不错/);
  assert.doesNotMatch(js, /提交阶段成果。完成后进度记为项目完成/);
  assert.match(css, /\.proj-input/);
});

test("leftover project dump replays Constructing the Area Model on chalkboard", () => {
  assert.match(js, /leftoverProjectState/);
  assert.match(js, /proj-page/);
  assert.match(js, /data-proj-leftover/);
  assert.match(js, /选择要提交的文件/);
  assert.match(js, /需要上传图片/);
  assert.match(js, /projFile/);
  assert.doesNotMatch(js, /animationHtml/);
  assert.match(css, /\.proj-file/);
});

test("materials player is not JSON.stringify dump", () => {
  assert.match(js, /materialsView/);
  assert.match(js, /materialsPack/);
  assert.match(js, /打开学习材料/);
  assert.doesNotMatch(js, /JSON\.stringify\(out\.artifacts/);
  assert.match(css, /\.flip-card/);
  assert.match(css, /\.cheat-sheet/);
});

test("practice leftover dump replays Anatomy of the Right Triangle on chalkboard", () => {
  assert.match(js, /leftoverPracticeState/);
  assert.match(js, /准备好练习/);
  assert.match(js, /练习完成/);
  assert.match(js, /prac-page/);
  assert.match(js, /data-prac-leftover/);
  assert.doesNotMatch(js, /animationHtml/);
});

test("chalkboard animation, board image, instructional video, and exam narration are wired", () => {
  assert.match(js, /anim-stage/);
  assert.match(js, /generate_html_animation/);
  assert.match(js, /\/api\/media\/animation/);
  assert.match(js, /\/api\/media\/video/);
  assert.match(js, /\/api\/media\/image/);
  assert.match(js, /朗读题目/);
  assert.match(js, /互动动画/);
  assert.match(js, /教学视频/);
  assert.match(js, /examSpeak/);
  assert.match(js, /videoPlay/);
  assert.match(css, /\.anim-stage/);
  assert.match(css, /\.video-stage/);
  assert.doesNotMatch(js, /animationHtml/);
  assert.doesNotMatch(js, /Excalidraw/);
});

test("practice player is Check/Skip not a task list stub", () => {
  assert.match(js, /practiceView/);
  assert.match(js, /pracCheck/);
  assert.match(js, /全部答对，这次练习就会被标记为「已掌握」/);
  assert.doesNotMatch(js, /完成本次练习/);
  assert.match(css, /\.prac-feedback/);
});

test("course exam player is not a listPage stub", () => {
  assert.match(js, /examView/);
  assert.match(js, /我准备好了/);
  assert.match(js, /\/api\/course\/exam\/score/);
  assert.match(js, /gradeExam/);
  assert.match(js, /leftoverExamState/);
  assert.match(js, /30 分钟/);
  assert.match(js, /{{count}} 道题/);
  assert.match(js, /本场考试限时进行/);
  assert.doesNotMatch(js, /综合考试：用本单元核心概念作答，提交后记为已完成/);
  assert.match(css, /\.exam-board/);
  assert.match(css, /\.exam-clock/);
});

test("history resume, skip-redistribute, socratic tutor, month calendar are wired", () => {
  assert.match(js, /data-resume/);
  assert.match(js, /skipAndRedistribute/);
  assert.match(js, /\/api\/feed\/skip/);
  assert.match(js, /\/api\/tutor\/hint/);
  assert.match(js, /要一个提示/);
  assert.match(js, /boardHintHtml/);
  assert.match(js, /data-tutor-hint/);
  assert.match(js, /questionKey/);
  assert.match(js, /跳过并重排/);
  assert.match(js, /month-grid/);
  assert.match(js, /周视图/);
  assert.match(css, /\.hist-card/);
  assert.match(css, /\.month-cell/);
  assert.match(css, /\.tutor-board/);
});

test("learn intro overlay is not a thin session dump", () => {
  assert.match(js, /learnView/);
  assert.match(js, /learnIntroState/);
  assert.match(js, /本节学习内容/);
  assert.match(js, /开始学习/);
  assert.match(js, /WHAT YOU WILL LEARN/);
  assert.match(js, /id="learnStart"/);
  assert.match(css, /\.learn-intro-card/);
  assert.match(css, /\.learn-intro-overlay/);
  assert.match(js, /learn-intro\.jpg/);
});

test("learn play shows session outline panel not a description dump", () => {
  assert.match(js, /learnOutlineState/);
  assert.match(js, /学习节大纲/);
  assert.match(js, /此学习节暂无大纲/);
  assert.match(js, /Session Outline/);
  assert.match(js, /learn-outline\.jpg/);
  assert.match(css, /\.learn-outline/);
  assert.match(css, /\.learn-play/);
});

test("learn outline header has unit-lecture breadcrumb chrome", () => {
  assert.match(js, /learnCrumbState/);
  assert.match(js, /learn-crumbs/);
  assert.match(js, /panelClose/);
  assert.match(js, /收起大纲/);
  assert.match(js, /本节大纲/);
  assert.match(css, /\.learn-crumbs/);
  assert.match(css, /\.learn-crumb-sep/);
});

test("learn outline includes always-on references block", () => {
  assert.match(js, /learnReferencesState/);
  assert.match(js, /参考资料/);
  assert.match(js, /此学习节暂无参考资料/);
  assert.match(js, /learn-refs\.jpg/);
  assert.match(css, /\.learn-refs/);
  assert.match(css, /\.learn-ref-list/);
});

test("learn outline has practice start and gated keypoints", () => {
  assert.match(js, /learnPracticeState/);
  assert.match(js, /learnKeypointsState/);
  assert.match(js, /practiceStart/);
  assert.match(js, /learn-practice-start/);
  assert.match(js, /keypoints\.show/);
  assert.match(css, /\.learn-practice/);
});

test("learn outline has syllabus and artifacts tabs", () => {
  assert.match(js, /tabSyllabus/);
  assert.match(js, /课程大纲/);
  assert.match(js, /学习记录/);
  assert.match(js, /暂无内容/);
  assert.match(js, /data-learn-tab/);
  assert.match(js, /learnArtifactsState/);
  assert.match(css, /\.learn-tabs/);
});

test("learn stage paints static note cards from keypoints", () => {
  assert.match(js, /learnNoteCardsState/);
  assert.match(js, /learn-note/);
  assert.match(js, /noteCard/);
  assert.match(js, /learn-note\.jpg/);
  assert.match(css, /\.learn-desk/);
  assert.match(css, /\.learn-note/);
});

test("learn quiz overlay is session-scoped", () => {
  assert.match(js, /learnQuizOverlayState/);
  assert.match(js, /sessionId: session.sessionId/);
  assert.match(js, /courseId: course.courseId/);
});

test("learn stage paints stored quiz overlay widget", () => {
  assert.match(js, /learnQuizOverlayState/);
  assert.match(js, /learn-quiz/);
  assert.match(js, /quizKind/);
  assert.match(js, /learn-quiz\.jpg/);
  assert.match(css, /\.learn-quiz/);
});

test("collapsed learn play shows Class Keypoints tracker", () => {
  assert.match(js, /learnTrackerState/);
  assert.match(js, /trackerLabel/);
  assert.match(js, /课堂要点/);
  assert.match(js, /learn-tracker/);
  assert.match(css, /\.learn-tracker/);
  assert.match(css, /\.learn-tracker-stop/);
});

test("course blueprint leftover overlay is chalkboard not generate", () => {
  assert.match(js, /blueprintState/);
  assert.match(js, /\/dev\/csm/);
  assert.match(js, /blueprint-chalk\.jpg/);
  assert.match(js, /确认生成完整课程/);
  assert.match(js, /查看课程蓝图/);
  assert.match(js, /\/api\/course\/commit/);
  assert.match(css, /\.blueprint-page/);
  assert.match(css, /\.bp-map/);
});

test("assist home paints leftover 今日值得学 trends strip", () => {
  assert.match(js, /trendsState/);
  assert.match(js, /trend-strip/);
  assert.match(js, /今日值得学/);
  assert.match(js, /换一批/);
  assert.match(js, /trendNext/);
  assert.match(js, /data-trend/);
  assert.match(css, /\.trend-strip/);
  assert.match(css, /\.trend-item/);
});

test("signup is a leftover full page then onboarding without Orbie", () => {
  assert.match(js, /authPageView/);
  assert.match(js, /onboardingView/);
  assert.match(js, /\/onboarding/);
  assert.match(js, /signup-chalk\.jpg/);
  assert.match(js, /创建您的账户/);
  assert.match(js, /跳过引导/);
  assert.match(js, /开始吧！/);
  assert.match(js, /validateSignup/);
  assert.doesNotMatch(js, /authModal/);
  assert.doesNotMatch(js, /Orbie/);
  assert.match(css, /\.auth-page/);
  assert.match(css, /\.onboard-pick/);
});

test("open product hides credits account chrome and does not gate BYOK", () => {
  const top = js.slice(js.indexOf("function topbar"), js.indexOf("function whatsNewModal"));
  assert.doesNotMatch(top, /FREE ·/);
  assert.doesNotMatch(top, /avatarBtn/);
  assert.doesNotMatch(top, /L\(\)\.credits/);
  const authFn = js.slice(js.indexOf("async function ensureAuth"), js.indexOf("async function onBlueprintConfirm"));
  assert.match(authFn, /return true;/);
  assert.doesNotMatch(authFn, /\/signin|\/signup|authPageView/);
  assert.match(js, /function openRoute/);
  assert.match(js, /signin\|signup\|onboarding\|pricing\|subscription/);
  assert.match(js, /res\.status === 401 && retry/);
  assert.match(js, /mintGuestSession/);
  assert.match(js, /adoptSession/);
  assert.match(html, /app\.js\?v=/);
});

test("leftover VoiceMode and TTS controls are chalkboard-wired", () => {
  assert.match(js, /voiceOutputBtn/);
  assert.match(js, /ttsVoiceConfig/);
  assert.match(js, /\/api\/tts/);
  assert.match(js, /tts-samples/);
  assert.match(js, /你想怎样和老师交流/);
  assert.match(js, /voiceMicBtn/);
  assert.match(js, /voiceWarm/);
  assert.match(css, /\.voice-card/);
  assert.match(css, /\.voice-option/);
  assert.match(css, /\.tts-btn/);
  assert.doesNotMatch(js, /Orbie/);
});

test("whiteboard leftover dump replays session_ready board/speak on chalkboard", () => {
  assert.match(js, /whiteboardSessionState/);
  assert.match(js, /\/whiteboard\//);
  assert.match(js, /hasWhiteboardLeftover/);
  assert.match(js, /whiteboard-chalk\.jpg/);
  assert.match(js, /wbPause/);
  assert.match(js, /whiteboard_session_id/);
  assert.match(js, /旧会话不可用，已开启新会话/);
  assert.match(js, /已恢复对话，请在右侧输入你的问题以继续讲解/);
  assert.match(css, /\.wb-session/);
  assert.match(css, /\.wb-split/);
  assert.match(css, /\.wb-board-body/);
  assert.doesNotMatch(js, /Excalidraw/);
  assert.match(js, /ttsVoiceConfig/);
});

test("pdf split layout replays leftover Pythagorean frames", () => {
  assert.match(js, /pdfSessionState/);
  assert.match(js, /\/pdf-session\//);
  assert.match(js, /craftedPdfId|registerPdfSession/);
  assert.match(js, /\/api\/pdf\/followup/);
  assert.match(js, /\/api\/pdf\/session/);
  assert.match(js, /sessions\/pdf-annotate/);
  assert.match(js, /pdf-split\.jpg/);
  assert.match(js, /pdfPause/);
  assert.match(js, /旧会话不可用，已开启新会话/);
  assert.match(js, /已恢复对话，请在右侧输入你的问题以继续讲解/);
  assert.match(js, /这就是核心公式|a\^2 \+ b\^2 = c\^2|pdf-formula/);
  assert.match(css, /\.pdf-split/);
  assert.match(css, /\.pdf-mark/);
  assert.match(css, /--font-chalk/);
  assert.match(css, /\.pdf-line p/);
  assert.match(css, /\.composer\.follow-up/);
  assert.doesNotMatch(js, /pdfAnnotation\.replay/);
});

test("share pages paint leftover conversation and course dumps", () => {
  assert.match(js, /sharedConversationState/);
  assert.match(js, /sharedCourseState/);
  assert.match(js, /\/share\/c\//);
  assert.match(js, /\/share\/course\//);
  assert.match(js, /share-chalk\.jpg/);
  assert.match(js, /开启属于你的学习之旅/);
  assert.match(css, /\.share-page/);
  assert.match(css, /\.share-thread/);
});

test("whats new changelog modal is wired from leftover dump", () => {
  assert.match(js, /whatsNewState/);
  assert.match(js, /whats-new-tag/);
  assert.match(js, /whats-new\.jpg/);
  assert.match(js, /whatsNewTitle/);
  assert.match(js, /最新动态/);
  assert.match(js, /What's new/);
  assert.match(css, /\.whats-new-zoom/);
  assert.match(css, /\.whats-new-tag/);
});

test("learn picker paints stored course then session chooser", () => {
  assert.match(js, /learnPickerState/);
  assert.match(js, /learn-picker/);
  assert.match(js, /selectCourseUuid/);
  assert.match(js, /selectWhiteboardSession/);
  assert.match(js, /loadingSessionOutline/);
  assert.match(js, /learn-picker\.jpg/);
  assert.match(js, /"\/learn"/);
  assert.match(css, /\.learn-picker/);
  assert.match(css, /\.learn-picker-hint/);
});

test("learn stage paints static illustration from boardImage", () => {
  assert.match(js, /learnIllustrationState/);
  assert.match(js, /learn-illustration/);
  assert.match(js, /boardImage/);
  assert.match(js, /learn-illustration-tape\.jpg/);
  assert.match(js, /openIllustration/);
  assert.match(css, /\.learn-illustration/);
  assert.match(css, /\.learn-illustration-zoom/);
  assert.match(css, /tapeSettle/);
});

test("history starred-only filter is a real chip not a stub", () => {
  assert.match(js, /starredOnly/);
  assert.match(js, /仅收藏/);
  assert.match(js, /Starred only/);
  assert.match(js, /\/api\/history\/star/);
  assert.match(js, /data-starred-only/);
  assert.match(js, /data-star-id/);
  assert.match(css, /\.star-btn/);
  assert.match(css, /\.star-filter/);
  assert.match(js, /star-chalk\.jpg/);
  assert.match(js, /function traceLabels/);
  assert.match(html, /Source\+Sans\+3:wght@300;400;500/);
});
