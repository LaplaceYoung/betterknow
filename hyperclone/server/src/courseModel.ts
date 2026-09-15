// 课程结构的 session 枚举：课程有两个形态——合成课程挂在 unit.sessions[]，
// 生成课程挂在 unit.lectures[].sessions[]。两处调用（generation-status 的状态表、
// 白板大纲路由）必须看到同一份列表，所以统一在这里走。
import type { AppState } from './store.js';

export interface CourseSessionRef {
  sessionId: string;
  courseUuid: string;
  outlineId: string;
  unitId: string;
  unitIndex: number;
  unitTitle: string;
  lectureId: string;
  lectureTitle: string;
  sessionIndex: number;
  title: string;
  description: string;
  sessionType: string;
  keyPoints: string[];
  source: Record<string, unknown>;
}

const str = (value: unknown, fallback: string): string => (typeof value === 'string' && value.trim() ? value : fallback);

export function enumerateCourseSessions(course: Record<string, unknown> | undefined): CourseSessionRef[] {
  const units = Array.isArray(course?.units) ? (course!.units as Array<Record<string, unknown>>) : [];
  const out: CourseSessionRef[] = [];
  units.forEach((unit, unitIndex) => {
    const unitId = str(unit.unitId ?? unit.id, `unit-${unitIndex + 1}`);
    const unitTitle = str(unit.title, `Unit ${unitIndex + 1}`);
    const buckets: Array<{ lectureId: string; lectureTitle: string; sessions: Array<Record<string, unknown>> }> = [];
    const flat = Array.isArray(unit.sessions) ? (unit.sessions as Array<Record<string, unknown> | string>) : [];
    if (flat.length) buckets.push({ lectureId: `${unitId}Lec1`, lectureTitle: unitTitle, sessions: flat.map((entry) => (typeof entry === 'string' ? { title: entry } : entry)) });
    for (const lecture of Array.isArray(unit.lectures) ? (unit.lectures as Array<Record<string, unknown>>) : []) {
      const sessions = Array.isArray(lecture.sessions) ? (lecture.sessions as Array<Record<string, unknown> | string>) : [];
      buckets.push({ lectureId: str(lecture.lectureId, `${unitId}Lec`), lectureTitle: str(lecture.title, unitTitle), sessions: sessions.map((entry) => (typeof entry === 'string' ? { title: entry } : entry)) });
    }
    let index = 0;
    for (const bucket of buckets) {
      for (const session of bucket.sessions) {
        index += 1;
        const sessionIndex = Number(session.sessionIndex ?? index);
        const sessionId = str(session.sessionId ?? session.id, `${unitId}-s${index}`);
        const courseUuid = String(course?.courseUuid ?? '');
        out.push({
          sessionId,
          courseUuid,
          outlineId: courseUuid ? `${courseUuid}:${sessionId}` : sessionId,
          unitId,
          unitIndex,
          unitTitle,
          lectureId: bucket.lectureId,
          lectureTitle: bucket.lectureTitle,
          sessionIndex: Number.isFinite(sessionIndex) ? sessionIndex : index,
          title: str(session.title, `Session ${index}`),
          description: str(session.description, ''),
          sessionType: str(session.session_type ?? session.sessionType, 'whiteboard'),
          keyPoints: Array.isArray(session.keyPoints) ? session.keyPoints.map(String) : Array.isArray(session.key_points) ? (session.key_points as unknown[]).map(String) : [],
          source: session,
        });
      }
    }
  });
  return out;
}

// 白板会话的 key_points 取自课程里对应 session；找不到就返回空数组（前端按空处理）。
export function sessionKeyPoints(state: AppState, sessionId: string): { keyPoints: string[]; session?: CourseSessionRef } {
  for (const course of Object.values(state.courses)) {
    const match = enumerateCourseSessions(course).find((session) => session.sessionId === sessionId || session.outlineId === sessionId || `${course.courseUuid}__${session.sessionId}` === sessionId);
    if (match) return { keyPoints: match.keyPoints, session: match };
  }
  return { keyPoints: [] };
}
