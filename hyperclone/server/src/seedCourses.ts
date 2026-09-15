import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type JsonRecord = Record<string, unknown>;
type SeedEntry = { slug: string; courseUuid: string; course: JsonRecord };
const seedRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../seed/marketplace-full');
let indexPromise: Promise<{ byUuid: Map<string, SeedEntry>; byMarketplace: Map<string, SeedEntry> }> | undefined;

async function buildIndex() {
  const byUuid = new Map<string, SeedEntry>();
  const byMarketplace = new Map<string, SeedEntry>();
  let slugs: string[] = [];
  try { slugs = await readdir(seedRoot); } catch { return { byUuid, byMarketplace }; }
  let marketplace: JsonRecord[] = [];
  for (const metadataPath of [resolve(dirname(seedRoot), 'marketplace_courses.json'), resolve(dirname(dirname(seedRoot)), 'seed/marketplace_courses.json'), resolve(dirname(dirname(dirname(seedRoot))), 'seed/marketplace_courses.json')]) try {
    const value = JSON.parse(await readFile(metadataPath, 'utf8')) as unknown;
    marketplace = Array.isArray(value) ? value as JsonRecord[] : [];
    if (marketplace.length) break;
  } catch { /* metadata is optional */ }
  for (const slug of slugs) {
    try {
      const course = JSON.parse(await readFile(join(seedRoot, slug, 'full.json'), 'utf8')) as JsonRecord;
      const courseUuid = typeof course.courseUuid === 'string' ? course.courseUuid : '';
      if (!courseUuid) continue;
      const title = String(course.courseTitle ?? '');
      const matches = marketplace.filter((item) => String(item.courseTitle ?? '') === title && typeof item.marketplaceId === 'string');
      if (marketplace.length && !matches.length) continue;
      const entry = { slug, courseUuid, course };
      byUuid.set(courseUuid, entry);
      for (const item of matches) byMarketplace.set(String(item.marketplaceId), entry);
    } catch { /* ignore incomplete seed directories */ }
  }
  return { byUuid, byMarketplace };
}
async function index() { return indexPromise ??= buildIndex(); }
export async function resolveSeedCourse(uuid: string): Promise<JsonRecord | undefined> { return (await index()).byUuid.get(uuid)?.course; }
export async function resolveSeedByMarketplaceId(marketplaceId: string): Promise<SeedEntry | undefined> { return (await index()).byMarketplace.get(marketplaceId); }
export async function listMarketplaceSeed(): Promise<JsonRecord[]> { return [...(await index()).byUuid.values()].map(({ course }) => course); }
async function seedPart(uuid: string, name: 'exam' | 'practice' | 'project' | 'progress'): Promise<unknown> {
  const entry = (await index()).byUuid.get(uuid);
  if (!entry) return undefined;
  try { return JSON.parse(await readFile(join(seedRoot, entry.slug, `${name}.json`), 'utf8')); } catch { return undefined; }
}
export function getSeedExam(uuid: string): Promise<unknown> { return seedPart(uuid, 'exam'); }
export function getSeedPractice(uuid: string): Promise<unknown> { return seedPart(uuid, 'practice'); }
export function getSeedProject(uuid: string): Promise<unknown> { return seedPart(uuid, 'project'); }
export function getSeedProgress(uuid: string): Promise<unknown> { return seedPart(uuid, 'progress'); }
export function seedSlug(uuid: string): Promise<string | undefined> { return index().then((value) => value.byUuid.get(uuid)?.slug); }
export function seedPath(uuid: string, name: 'exam' | 'practice' | 'project' | 'progress'): Promise<string | undefined> { return seedSlug(uuid).then((slug) => slug ? join(seedRoot, slug, `${name}.json`) : undefined); }
