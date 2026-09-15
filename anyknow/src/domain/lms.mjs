/**
 * School-sync / LMS import contract.
 * Live Canvas OAuth is a non-goal; this is the ingest surface Hyperknow
 * exposes as 学校同步 + connectors/canvaLMS.
 */

export function ingestLmsPayload(payload) {
  if (!payload || typeof payload !== "object") throw new Error("LMS payload required");
  const school = payload.school || payload.school_name || payload.metadata?.school || "Unknown school";
  const canvasUrl = payload.canvas_url || payload.canvasUrl || payload.credentials?.canvas_url || null;
  const coursesIn = payload.courses || payload.canvas_courses || [];
  if (!Array.isArray(coursesIn) || coursesIn.length === 0) {
    throw new Error("LMS payload must include courses");
  }

  const courses = coursesIn.map((course, i) => {
    const id = String(course.id || course.course_id || `lms-${i + 1}`);
    const name = course.name || course.title || `Course ${id}`;
    const assignments = (course.assignments || course.tasks || []).map((a, ai) =>
      normalizeAssignment(a, ai),
    );
    const files = (course.files || course.materials || []).map((f, fi) => ({
      fileId: String(f.id || f.file_id || `file-${id}-${fi + 1}`),
      filename: f.filename || f.name || f.display_name || `file-${fi + 1}.txt`,
      text: f.text || f.body || f.content || "",
      url: f.url || null,
    }));
    const modules = course.modules || course.syllabus_modules || [];
    return { id, name, assignments, files, modules, raw: { code: course.course_code } };
  });

  return {
    school,
    canvasUrl,
    importedAt: payload.importedAt || new Date().toISOString(),
    source: "lms",
    courses,
    hasCredentials: true,
  };
}

function normalizeAssignment(a, index) {
  const due = a.due_at || a.dueAt || a.deadline || a.due_date || null;
  return {
    assignmentId: String(a.id || a.assignment_id || `asg-${index + 1}`),
    title: a.title || a.name || `Assignment ${index + 1}`,
    dueAt: due,
    points: a.points_possible ?? a.points ?? null,
    description: a.description || a.body || "",
    htmlUrl: a.html_url || a.url || null,
    type: a.submission_types ? "canvas-assignment" : a.type || "assignment",
  };
}

export function lmsCoursesToAnyknowDrafts(bundle) {
  return bundle.courses.map((c) => ({
    courseTitle: c.name,
    courseDescription: `Imported from ${bundle.school} LMS`,
    source: "school-sync",
    units: [
      {
        unitId: "unit1",
        title: c.name,
        description: "Materials and deadlines imported from the school LMS.",
        lectures: [
          {
            lectureId: "unit1Lecture1",
            title: "Syllabus orientation",
            description: "Start from the imported files and assignments.",
            order: 1,
            sessions: [
              {
                sessionIndex: 1,
                title: "Read the syllabus",
                description: "Walk through imported files and upcoming deadlines.",
                session_type: "pdf-annotate",
                practice: {
                  tasks: ["List the next three deadlines.", "Name one file you will study first."],
                },
              },
            ],
          },
        ],
        projects: [],
        exams: [],
      },
    ],
    files: c.files,
    lmsCourseId: c.id,
  }));
}
