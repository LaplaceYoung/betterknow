import { execFile, spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { config, type ByokConfig } from './config.js';
import { now } from './store.js';
import { publicFiles } from './artifacts.js';
import { buildCourseCover, storeCover } from './media.js';
import { image } from './providers/index.js';

export const COURSE_PHASE_PROMPTS = {
  researching_the_web: 'Research the learner topic with up to five focused searches. Return JSON {keywords:string[],results:Array<{title:string,url:string,snippet:string}>,references:string[]}; do not invent citations.',
  generating_initial_syllabus: 'Create an initial course syllabus for the requested topic and learner profile. Return JSON {title:string,description:string,targetLearner:string,tags:string[],units:Array<{title:string,description:string,sessions:Array<string|{title:string,description?:string}>}>}.',
  generating_structure: 'Turn the syllabus into a complete learning structure. Return JSON {units:Array<{title:string,description:string,sessions:Array<string|{title:string,description?:string}>}>}, preserving a clear progression from foundations to application.',
  generating_session_outlines: 'Write concise instructional session outlines. Return JSON {description:string,outline:string,practice:string[],depthTags:string[],keyPoints:string[]} for the supplied session title and topic. keyPoints = 4-5 short learning objectives for this session, each a self-contained phrase (no numbering prefix).',
  complete: 'Validate the complete course JSON: every unit has sessions and every session has a title, description, outline, practice, session time, and depth tags. Return the corrected JSON only.',
} as const;

type JsonRecord = Record<string, unknown>;
type Session = JsonRecord & { sessionId: string; title: string };
type Unit = JsonRecord & { unitId: string; title: string; sessions: Session[] };
type Course = JsonRecord & { courseUuid: string; units: Unit[] };
type Deferred<T> = { promise: Promise<T>; resolve: (value: T) => void; reject: (reason?: unknown) => void };

function deferred<T>(): Deferred<T> {
  return (Promise as unknown as { withResolvers<T>(): Deferred<T> }).withResolvers<T>();
}

function parseObject(value: string): JsonRecord | undefined {
  const match = value.match(/\{[\s\S]*\}/);
  if (!match) return undefined;
  try {
    const parsed: unknown = JSON.parse(match[0]);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as JsonRecord : undefined;
  } catch { return undefined; }
}

async function askModel(prompt: string, purpose: 'director' | 'content' | 'quiz' = 'content', eff?: ByokConfig): Promise<JsonRecord | undefined> {
  try {
    const module = await import('./llm.js');
    const value = await module.chat([{ role: 'system', content: prompt }, { role: 'user', content: prompt }], purpose, eff);
    return parseObject(value);
  } catch { return undefined; }
}

const text = (value: unknown, fallback: string): string => typeof value === 'string' && value.trim() ? value.trim() : fallback;
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];

function questionsFor(topic: string): Array<JsonRecord> {
  return [
    { question: `What is your current familiarity with ${topic}?`, options: [{ title: 'New', description: 'I am starting from scratch.' }, { title: 'Some experience', description: 'I know the basics.' }, { title: 'Advanced', description: 'I want depth and practice.' }], is_multiple: false, allow_custom: true, category: 'prerequisite' },
    { question: 'What is your main learning goal?', options: [{ title: 'Understand', description: 'Build conceptual intuition.' }, { title: 'Apply', description: 'Solve real problems.' }, { title: 'Review', description: 'Prepare for an assessment.' }], is_multiple: true, allow_custom: true, category: 'goal' },
    { question: 'Which learning format helps you most?', options: [{ title: 'Examples', description: 'Learn through worked examples.' }, { title: 'Projects', description: 'Learn by building.' }, { title: 'Exercises', description: 'Learn through practice.' }], is_multiple: true, allow_custom: true, category: 'format' },
    { question: 'How much time can you spend each day?', options: [{ title: '15 minutes/day', description: 'A focused overview.' }, { title: '30 minutes/day', description: 'Balanced depth and practice.' }, { title: '60 minutes/day', description: 'An intensive course.' }], is_multiple: false, allow_custom: true, category: 'pace' },
  ];
}

function fallbackUnits(topic: string): Array<JsonRecord> {
  return [
    { title: 'Foundations', description: `Build an intuitive foundation in ${topic}.`, sessions: ['Core ideas and vocabulary', 'A simple worked example'] },
    { title: 'Application', description: `Use ${topic} to analyze practical situations.`, sessions: ['Methods and patterns', 'Guided practice'] },
    { title: 'Mastery', description: `Connect the ideas and demonstrate mastery of ${topic}.`, sessions: ['Common mistakes and edge cases', 'Final synthesis challenge'] },
  ];
}

function rawUnitData(source: JsonRecord | undefined, topic: string): JsonRecord[] {
  const values = list(source?.units);
  return (values.length ? values : fallbackUnits(topic)).filter((value): value is JsonRecord => Boolean(value && typeof value === 'object' && !Array.isArray(value))).map((value) => ({ ...value }));
}

function sessionValues(unit: JsonRecord): unknown[] {
  const values = list(unit.sessions);
  return values.length ? values : ['Core concept', 'Guided application'];
}

function buildUnits(topic: string, source: JsonRecord | undefined): Unit[] {
  return rawUnitData(source, topic).slice(0, 8).map((unitData, unitIndex) => {
    const unitId = `unit${unitIndex + 1}`;
    const unitTitle = text(unitData.title ?? unitData.name, `Unit ${unitIndex + 1}`);
    const sessions: Session[] = sessionValues(unitData).slice(0, 8).map((sessionData, sessionIndex) => {
      const details = typeof sessionData === 'object' && sessionData !== null && !Array.isArray(sessionData) ? sessionData as JsonRecord : {};
      const title = text(typeof sessionData === 'string' ? sessionData : details.title ?? details.name, `Session ${sessionIndex + 1}`);
      return {
        sessionIndex: sessionIndex + 1,
        sessionId: randomUUID(),
        session_type: 'whiteboard',
        title,
        description: text(details.description, `Learn ${title.toLowerCase()} through clear examples and retrieval practice.`),
        sessionOutline: text(details.sessionOutline ?? details.outline, `Introduce ${title}, connect it to ${topic}, then test the idea with a worked example and a short reflection.`),
        practice: { tasks: list(details.practice).map(String).slice(0, 4).length ? list(details.practice).map(String).slice(0, 4) : [`Explain ${title} in your own words.`, `Apply ${title} to a concrete ${topic} example.`] },
        sessionTime: typeof details.sessionTime === 'number' ? details.sessionTime : 15,
        depthTags: list(details.depthTags).map(String).slice(0, 5).length ? list(details.depthTags).map(String).slice(0, 5) : ['intuition', 'application'],
        references: [], completed: false, started: false,
      };
    });
    const description = text(unitData.description, `A structured progression through ${unitTitle.toLowerCase()}.`);
    const lecture = { lectureId: `${unitId}Lecture1`, title: unitTitle, description, order: 1, sessions, learning_finished: false };
    return { unitId, title: unitTitle, description, sessions, lectures: [lecture], learning_finished: false };
  });
}

function questionFor(unit: Unit, session?: Session): JsonRecord {
  const answer = `A correct application of ${session?.title ?? unit.title} to the course topic. `;
  const prompt = `Which statement best demonstrates understanding of ${session?.title ?? unit.title}?`;
  return { id: `q${randomUUID().slice(0, 8)}`, type: 'single', question: prompt, prompt, options: [answer, 'An unrelated claim.', 'A memorized phrase without an example.', 'None of the above.'], explanation: `${answer}Explain the reasoning and connect it to the learner's goal.`, correctAnswers: [answer] };
}

function materializeAssessments(courseUuid: string, units: Unit[]): { exam: JsonRecord; practice: JsonRecord; project: JsonRecord } {
  const exams = units.map((unit) => ({ title: `${unit.title} Comprehensive Exam`, unitId: unit.unitId, questions: [questionFor(unit)] }));
  const practiceSessions = units.flatMap((unit) => unit.sessions.map((session) => ({ title: session.title, questions: [questionFor(unit, session)] })));
  const stages = units.map((unit) => ({ unit_id: unit.unitId, stage_id: randomUUID(), stage_title: `${unit.title} Applied Project`, stage_description: `Apply ${unit.title.toLowerCase()} to a concrete ${courseUuid} learning challenge.`, deliverable_increment: `A short ${unit.title} analysis.`, steps: [{ step_id: 'step1', metadata: {}, step_body: `Summarize and apply ${unit.title}.`, step_title: 'Apply the unit', need_response: true }] }));
  const projectItem = { project_id: randomUUID(), project_name: 'Course Application Project', project_description: 'Integrate the course concepts into one practical deliverable.', final_deliverable: 'A concise synthesis report with evidence and reflection.' };
  return { exam: { exams, courseUuid }, practice: { sessions: practiceSessions, courseUuid }, project: { stages, projects: [projectItem], courseUuid } };
}

// stub 模式没有模型可问：把课节描述切成可读要点；切不出两条就退回标题。
function stubKeyPoints(title: string, description: string): string[] {
  const clauses = description.split(/[。；;.!?\n]/).map((part) => part.trim()).filter((part) => part.length >= 6).slice(0, 4);
  return clauses.length >= 2 ? clauses : [title, ...clauses];
}

function emitStep(emit: (frame: Record<string, unknown>) => void, courseUuid: string, stepId: string, status: 'loading' | 'completed', title?: string, placeholder?: string): void {
  emit({ type: 'course_generation_step', step_id: stepId, status, ...(title ? { title } : {}), ...(placeholder ? { placeholder } : {}), course_uuid: courseUuid });
}

export async function runCourseGeneration(emit: (frame: Record<string, unknown>) => void, opts: { query: string; answers: Array<{ question: string; answer: string }>; courseUuid: string; userId: string; eff?: ByokConfig }): Promise<Record<string, unknown>> {
  const topic = opts.query.trim() || 'A Practical Learning Journey';
  const { courseUuid } = opts;
  const useModel = (opts.eff ?? config).provider !== 'stub';
  emitStep(emit, courseUuid, 'boot', 'loading', 'Starting course generation', 'Crafting Courses...');
  emit({ type: 'course_generation_started', course_uuid: courseUuid, run_id: randomUUID(), user_id: opts.userId });
  emitStep(emit, courseUuid, 'boot', 'completed');

  emitStep(emit, courseUuid, 'researching_the_web', 'loading', 'Researching the web', 'Scouring the web for material...');
  const research = useModel ? await askModel(`${COURSE_PHASE_PROMPTS.researching_the_web}\nTopic: ${topic}`, 'director', opts.eff) : undefined;
  const keywords = list(research?.keywords).map(String).slice(0, 8).length ? list(research?.keywords).map(String).slice(0, 8) : topic.split(/\s+/).filter(Boolean).slice(0, 5);
  const results = list(research?.results).slice(0, 5);
  emit({ type: 'course_generation_progress', message: results.length ? `Found ${results.length} reference(s)` : 'Web research not needed', keywords, results, data: { stage_name: 'researching_the_web', keywords, results, references: list(research?.references).map(String).slice(0, 5) }, course_uuid: courseUuid });
  emitStep(emit, courseUuid, 'researching_the_web', 'completed');

  emitStep(emit, courseUuid, 'generating_initial_syllabus', 'loading', 'Generating initial syllabus', 'Cooking the big picture...');
  const syllabus = useModel ? await askModel(`${COURSE_PHASE_PROMPTS.generating_initial_syllabus}\nTopic: ${topic}\nAnswers: ${JSON.stringify(opts.answers)}`, 'content', opts.eff) : undefined;
  emit({ type: 'course_generation_progress', message: 'Selected 0 reference(s) for initial_syllabus', data: { stage_name: 'initial_syllabus', references: [] }, course_uuid: courseUuid });
  emitStep(emit, courseUuid, 'generating_initial_syllabus', 'completed');
  const questions = questionsFor(topic);
  if (!opts.answers.length) {
    const awaiting = { courseUuid, courseTitle: text(syllabus?.title, topic), status: 'awaiting_answers', questions };
    emit({ type: 'course_generation_questions', question_data: { questions }, course_uuid: courseUuid });
    return awaiting;
  }

  emitStep(emit, courseUuid, 'generating_structure', 'loading', 'Generating course structure', 'Crafting course structure...');
  const structure = useModel ? await askModel(`${COURSE_PHASE_PROMPTS.generating_structure}\nTopic: ${topic}\nSyllabus: ${JSON.stringify(syllabus ?? {})}\nAnswers: ${JSON.stringify(opts.answers)}`, 'content', opts.eff) : undefined;
  emit({ type: 'course_generation_progress', message: 'Selected 0 reference(s) for course_structure', data: { stage_name: 'course_structure', references: [] }, course_uuid: courseUuid });
  emitStep(emit, courseUuid, 'generating_structure', 'completed');

  const source = structure && list(structure.units).length ? structure : syllabus;
  const units = buildUnits(topic, source);
  const title = text(syllabus?.title ?? structure?.title, topic);
  emit({
    type: 'course_generation_structure',
    structure: {
      courseTitle: title,
      courseDescription: text(syllabus?.description ?? structure?.description, `A practical, structured exploration of ${topic}, moving from first principles to confident application.`),
      targetLearner: text(syllabus?.targetLearner, 'Curious learners seeking a clear concept-first foundation and practical application.'),
      difficulty: 'intermediate',
      tags: list(syllabus?.tags).map(String).slice(0, 4).length ? list(syllabus?.tags).map(String).slice(0, 4) : [topic.split(/\s+/)[0] ?? 'Learning', 'Foundations'],
      units: units.map((u, ui) => ({
        unitId: u.unitId,
        title: u.title,
        description: u.description,
        lectures: [
          {
            lectureId: `${u.unitId}Lec1`,
            title: `${u.title}：核心精要`,
            description: `深入掌握 ${u.title} 的分析框架与方法`,
            order: 1,
            sessions: u.sessions.map((s, si) => ({
              sessionIndex: si + 1,
              session_type: 'whiteboard',
              title: s.title,
              description: s.description,
              depthTags: s.depthTags || (si % 2 === 0 ? ['intuition', 'definition'] : ['formula', 'application']),
              keyPoints: stubKeyPoints(s.title, String(s.description ?? '')),
            })),
          },
        ],
      })),
    },
    course_uuid: courseUuid,
  });
  emitStep(emit, courseUuid, 'generating_session_outlines', 'loading', 'Generating session outlines', 'Weaving lectures into a journey...');
  if (useModel) {
    await Promise.all(units.flatMap((unit) => unit.sessions.map(async (session) => {
      const generated = await askModel(`${COURSE_PHASE_PROMPTS.generating_session_outlines}\nTopic: ${topic}\nUnit: ${unit.title}\nSession: ${session.title}`, 'content', opts.eff);
      if (!generated) return;
      session.description = text(generated.description, String(session.description));
      session.sessionOutline = text(generated.outline ?? generated.sessionOutline, String(session.sessionOutline));
      const tasks = list(generated.practice).map(String).slice(0, 4); if (tasks.length) session.practice = { tasks };
      const tags = list(generated.depthTags).map(String).slice(0, 5); if (tags.length) session.depthTags = tags;
      // key_points 是白板 session_ready 与课程大纲路由共用的字段（线上按 session 持久化）
      const points = list(generated.keyPoints ?? generated.key_points).map((point) => String(point).replace(/^\s*\d+[.、)]\s*/, '').trim()).filter(Boolean).slice(0, 5);
      if (points.length) session.keyPoints = points;
      emit({ type: 'course_generation_progress', message: `Selected 0 reference(s) for session_outline:${unit.unitId}:${session.sessionId}`, data: { stage_name: `session_outline:${unit.unitId}:${session.sessionId}`, references: [] }, course_uuid: courseUuid });
    })));
  } else {
    for (const unit of units) for (const session of unit.sessions) emit({ type: 'course_generation_progress', message: `Selected 0 reference(s) for session_outline:${unit.unitId}:${session.sessionId}`, data: { stage_name: `session_outline:${unit.unitId}:${session.sessionId}`, references: [] }, course_uuid: courseUuid });
  }
  emitStep(emit, courseUuid, 'generating_session_outlines', 'completed');

  emitStep(emit, courseUuid, 'generating_assessments', 'loading', 'Generating practice, exam and project stages', 'Building checkpoints...');
  const assessments = materializeAssessments(courseUuid, units);
  for (const stage of (assessments.project.stages ?? []) as Array<{ unit_id?: string; stage_id?: string }>) {
    emit({ type: 'course_generation_progress', message: `Selected 0 reference(s) for project_stage:${stage.unit_id}`, data: { stage_name: `project_stage:${stage.unit_id}:${stage.stage_id}`, references: [] }, course_uuid: courseUuid });
  }
  emitStep(emit, courseUuid, 'generating_assessments', 'completed');
  // 封面：内容寻址（hash 进 URL）。有图像 seam 就让模型画，没有就用标题渲一张本地封面。
  const courseTags = list(syllabus?.tags).map(String).slice(0, 12).length ? list(syllabus?.tags).map(String).slice(0, 12) : [topic.split(/\s+/)[0] ?? 'Learning', 'Foundations', 'Critical Thinking'];
  let cover;
  if (useModel) {
    const drawn = await image.generate(`Academic course cover illustration for “${title}”, clean editorial style, no text, soft light, subject: ${courseTags.slice(0, 3).join(', ')}`, { size: '512x512' }, opts.eff);
    cover = drawn.bytes ? await storeCover(drawn.bytes, drawn.ext, 'model', { width: 512, height: 512 }) : await buildCourseCover({ title, tags: courseTags });
  } else {
    cover = await buildCourseCover({ title, tags: courseTags });
  }
  const course: Course = {
    courseUuid,
    created_at: now(),
    courseTitle: title,
    courseDescription: text(syllabus?.description ?? structure?.description, `A practical, structured exploration of ${topic}, moving from first principles to confident application.`),
    targetLearner: text(syllabus?.targetLearner, 'Curious learners seeking a clear concept-first foundation and practical application.'),
    outputLanguage: 'English',
    tags: courseTags,
    projects: assessments.project.projects,
    ticketVariant: 3,
    coverImage: { filePath: cover.filePath, wideFilePath: cover.wideFilePath, hash: cover.hash, url: cover.url, source: cover.source, style: 'monet', backgroundColor: '#F7F6F2' },
    course: { from: 'betterknow' },
    units,
    subjects: ['general'],
    subject: 'general',
    marketplaceSourceId: null,
    exam: assessments.exam,
    practice: assessments.practice,
    project: assessments.project,
  };
  if (useModel) await askModel(`${COURSE_PHASE_PROMPTS.complete}\nCourse: ${JSON.stringify(course)}`, 'content', opts.eff);
  emit({ type: 'course_generation_progress', message: 'Saved final course', data: { output_path: `var/data/courses/${courseUuid}/finalCourse.json` }, course_uuid: courseUuid });
  emitStep(emit, courseUuid, 'complete', 'completed');
  emit({ type: 'course_generation_complete', course, course_uuid: courseUuid });
  return course;
}

export type InstructionalScene = { title: string; narration: string; seconds: number };
export type InstructionalVideo = { video_id: string; rendered: boolean; scenes: InstructionalScene[]; url: string; buffer: Buffer };

const fallbackScenes = (topic: string): InstructionalScene[] => [
  { title: 'The question', narration: `Why does ${topic} matter? Start with the learner's question.`, seconds: 4 },
  { title: 'The idea', narration: `Build the central idea of ${topic} with one clear visual example.`, seconds: 4 },
  { title: 'Try it', narration: `Apply ${topic} yourself, then explain what changed and why.`, seconds: 4 },
];

async function commandPath(command: string): Promise<string | undefined> {
  const result = deferred<string | undefined>();
  execFile(process.platform === 'win32' ? 'where' : 'which', [command], (error, stdout) => result.resolve(error ? undefined : stdout.trim().split(/\r?\n/)[0]));
  return result.promise;
}

async function renderVideo(scenes: InstructionalScene[]): Promise<Buffer | undefined> {
  const ffmpeg = await commandPath('ffmpeg'); if (!ffmpeg) return undefined;
  const directory = await mkdtemp(join(tmpdir(), 'hyperclone-video-')); const output = join(directory, 'final_video.mp4');
  const total = Math.max(1, scenes.reduce((sum, scene) => sum + Math.max(1, scene.seconds), 0)); let elapsed = 0;
  const overlays = scenes.map((scene) => { const start = elapsed; elapsed += Math.max(1, scene.seconds); const label = scene.title.replace(/[\\:'%]/g, '\\$&').replace(/\n/g, ' '); return `drawtext=text='${label}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,${start},${elapsed})'`; }).join(',');
  const args = ['-y', '-f', 'lavfi', '-i', `color=c=#111827:s=1280x720:r=30:d=${total}`, '-vf', overlays, '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output];
  const process = spawn(ffmpeg, args, { stdio: ['ignore', 'ignore', 'pipe'] }); const result = deferred<Buffer | undefined>(); let errorText = '';
  process.stderr?.on('data', (chunk: Buffer) => { errorText += chunk.toString(); });
  process.once('error', () => result.resolve(undefined)); process.once('close', (code) => { if (code !== 0) { void errorText; result.resolve(undefined); } else void readFile(output).then(result.resolve).catch(() => result.resolve(undefined)); });
  const buffer = await result.promise; await rm(directory, { recursive: true, force: true }); return buffer;
}

export async function generateInstructionalVideo(topic: string, eff?: ByokConfig): Promise<InstructionalVideo> {
  const cleanTopic = topic.trim() || 'the core idea'; const useModel = (eff ?? config).provider !== 'stub'; let scenes = fallbackScenes(cleanTopic);
  if (useModel) {
    const generated = await askModel(`Create an instructional video storyboard for ${cleanTopic}. Return JSON {scenes:[{title:string,narration:string,seconds:number}]}.`, 'content', eff);
    const candidate = list(generated?.scenes).map((value) => value && typeof value === 'object' && !Array.isArray(value) ? value as JsonRecord : undefined).filter((value): value is JsonRecord => Boolean(value));
    if (candidate.length) scenes = candidate.slice(0, 20).map((scene) => ({ title: text(scene.title, 'Key idea'), narration: text(scene.narration, cleanTopic), seconds: typeof scene.seconds === 'number' && scene.seconds > 0 ? Math.min(120, scene.seconds) : 4 }));
  }
  const videoId = randomUUID(); const buffer = await renderVideo(scenes); const rendered = Boolean(buffer?.length);
  publicFiles.set(videoId, { id: videoId, filename: 'final_video.mp4', mime: 'video/mp4', data: buffer ?? Buffer.alloc(0) });
  return { video_id: videoId, rendered, scenes, url: `/api/v1/video/${videoId}/final_video.mp4`, buffer: buffer ?? Buffer.alloc(0) };
}

const winAnsiSpecials: Record<string, number> = { '€': 0x80, '‚': 0x82, 'ƒ': 0x83, '„': 0x84, '…': 0x85, '†': 0x86, '‡': 0x87, 'ˆ': 0x88, '‰': 0x89, 'Š': 0x8a, '‹': 0x8b, 'Œ': 0x8c, 'Ž': 0x8e, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97, '˜': 0x98, '™': 0x99, 'š': 0x9a, '›': 0x9b, 'œ': 0x9c, 'ž': 0x9e, 'Ÿ': 0x9f };
function winAnsi(value: string): Buffer {
  const bytes: number[] = []; for (const char of value) { const code = winAnsiSpecials[char] ?? char.charCodeAt(0); bytes.push(code >= 32 && code <= 255 ? code : 63); } return Buffer.from(bytes);
}
function pdfText(value: string): Buffer { const escaped: number[] = []; for (const byte of winAnsi(value)) { if (byte === 40 || byte === 41 || byte === 92) escaped.push(92); escaped.push(byte); } return Buffer.from([40, ...escaped, 41]); }

export function publishFilePdf(title: string, markdownBody: string): { pdf: Buffer; pageCount: number } {
  const allLines = [title || 'betterknow document', ...markdownBody.replace(/\r\n/g, '\n').split('\n')].flatMap((line) => { const value = line.replace(/^#{1,6}\s*/, ''); const chunks = value.match(/.{1,96}(?:\s|$)|.{1,96}/g); return chunks?.length ? chunks : ['']; });
  const pageLines = 44; const pageCount = Math.max(1, Math.ceil(allLines.length / pageLines)); const fontId = 3 + pageCount * 2; const objects = new Map<number, Buffer>();
  objects.set(1, Buffer.from('<< /Type /Catalog /Pages 2 0 R >>'));
  const pageRefs = Array.from({ length: pageCount }, (_, index) => `${3 + index * 2} 0 R`).join(' '); objects.set(2, Buffer.from(`<< /Type /Pages /Kids [${pageRefs}] /Count ${pageCount} >>`));
  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const pageId = 3 + pageIndex * 2; const contentId = pageId + 1; const lines = allLines.slice(pageIndex * pageLines, (pageIndex + 1) * pageLines); const commands: Buffer[] = [Buffer.from('BT /F1 11 Tf 54 738 Td ')];
    lines.forEach((line, lineIndex) => { if (lineIndex) commands.push(Buffer.from('0 -16 Td ')); commands.push(pdfText(line), Buffer.from(' Tj ')); }); commands.push(Buffer.from('ET')); const content = Buffer.concat(commands);
    objects.set(pageId, Buffer.from(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`));
    objects.set(contentId, Buffer.concat([Buffer.from(`<< /Length ${content.length} >>\nstream\n`), content, Buffer.from('\nendstream')]));
  }
  objects.set(fontId, Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
  const chunks: Buffer[] = [Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n')]; const offsets: number[] = [0]; let offset = chunks[0].length;
  for (let id = 1; id <= fontId; id += 1) { const body = objects.get(id) ?? Buffer.from(''); const wrapped = Buffer.concat([Buffer.from(`${id} 0 obj\n`), body, Buffer.from('\nendobj\n')]); offsets[id] = offset; chunks.push(wrapped); offset += wrapped.length; }
  const xrefOffset = offset; chunks.push(Buffer.from(`xref\n0 ${fontId + 1}\n0000000000 65535 f \n${offsets.slice(1).map((value) => `${String(value).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${fontId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`));
  return { pdf: Buffer.concat(chunks), pageCount };
}
