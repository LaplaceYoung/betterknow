export interface PublicFile { id: string; filename: string; mime: string; data: Buffer }

export const publicFiles = new Map<string, PublicFile>();
export const diagrams = new Map<string, { md?: string; html?: string; png?: Buffer }>();

// A valid transparent 1x1 PNG.
export const placeholderPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64',
);
// Browsers using SpeechSynthesis do not decode this, but the URL remains fetchable.
export const placeholderWebm = Buffer.from('1a45dfa39f4286810142f7810142f2810442f2810842f2810842f281', 'hex');
