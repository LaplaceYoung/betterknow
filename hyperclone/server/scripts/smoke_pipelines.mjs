import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url);
const pipelines = await import(new URL('./dist/pipelines.js', root));
const sandbox = await import(new URL('./dist/sandbox.js', root));
let failed = 0;
function check(name, condition, detail = '') {
  if (condition) console.log(`PASS ${name}${detail ? `: ${detail}` : ''}`);
  else { failed += 1; console.log(`FAIL ${name}${detail ? `: ${detail}` : ''}`); }
}

const frames = [];
const course = await pipelines.runCourseGeneration((frame) => frames.push(frame), { query: 'Introduction to geometry', answers: [{ question: 'familiarity', answer: 'New' }, { question: 'goal', answer: 'Understand' }, { question: 'format', answer: 'Examples' }, { question: 'pace', answer: '15 minutes/day' }], courseUuid: 'smoke-course', userId: 'smoke-user' });
check('course generation units', Array.isArray(course.units) && course.units.length > 0);
check('course generation frames', ['boot', 'researching_the_web', 'complete'].every((step) => frames.some((frame) => frame.type === 'course_generation_step' && frame.step_id === step)));

const video = await pipelines.generateInstructionalVideo('geometry');
check('video scenes', Array.isArray(video.scenes) && video.scenes.length === 3);
let ffmpeg;
try { ffmpeg = execFileSync(process.platform === 'win32' ? 'where' : 'which', ['ffmpeg'], { encoding: 'utf8' }).trim(); } catch { ffmpeg = ''; }
if (ffmpeg) {
  const bytes = video.buffer.subarray(0, 12).toString('ascii');
  check('video mp4', video.rendered && bytes.includes('ftyp'), `header=${JSON.stringify(bytes)}`);
} else check('video without ffmpeg', video.rendered === false);

const pdf = pipelines.publishFilePdf('Smoke title', '# Hello\n\nThis is a PDF smoke test.');
const pdfText = pdf.pdf.toString('latin1');
check('pdf header', pdfText.startsWith('%PDF-1.4'));
check('pdf eof', pdfText.endsWith('%%EOF'));
const executed = await sandbox.runSandboxed({ code: 'console.log(40+2)', language: 'javascript' });
check('sandbox javascript', executed.stdout.trim() === '42', JSON.stringify(executed));

if (failed) process.exitCode = 1;
