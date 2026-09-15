import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createAccount, verifyPassword } from "../domain/credits.mjs";
import { createDrive } from "../domain/kb.mjs";
import { MARKETPLACE, SEED_ARTIFACTS, seedDriveIfNeeded } from "./seed.mjs";
import { seedInbox } from "../domain/inbox.mjs";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "../../data");
const file = join(dataDir, "store.json");

function blank() {
  return {
    users: [],
    sessions: {},
    courses: Object.fromEntries(MARKETPLACE.map((c) => [c.courseId, c])),
    conversations: [],
    starredSessions: [],
    feed: { tasks: [], pendingCount: 0, plan: [] },
    lms: null,
    timetable: null,
    artifacts: SEED_ARTIFACTS.slice(),
    drives: {},
    checkins: {},
    inbox: seedInbox(),
  };
}

export function checkinsFor(store, userId) {
  if (!store.checkins) store.checkins = {};
  if (!store.checkins[userId]) store.checkins[userId] = {};
  return store.checkins[userId];
}

export function driveFor(store, userId) {
  if (!store.drives) store.drives = {};
  const current = store.drives[userId] || createDrive({ ownerId: userId });
  const drive = seedDriveIfNeeded(current);
  if (drive !== current || !store.drives[userId]) {
    store.drives[userId] = drive;
    saveStore(store);
  }
  return store.drives[userId];
}

export function saveDrive(store, userId, drive) {
  if (!store.drives) store.drives = {};
  store.drives[userId] = drive;
  saveStore(store);
  return drive;
}

export function loadStore() {
  try {
    const raw = JSON.parse(readFileSync(file, "utf8"));
    return { ...blank(), ...raw };
  } catch {
    return blank();
  }
}

export function saveStore(store) {
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(file, JSON.stringify(store, null, 2));
}

export function registerUser(store, { email, password, username }) {
  const exists = store.users.find((u) => u.email === String(email).toLowerCase());
  if (exists) throw new Error("email already registered");
  const user = {
    ...createAccount({ email, password, credits: 20, username }),
    onboarding: { complete: false },
  };
  store.users.push(user);
  const token = mint(store, user.userId);
  saveStore(store);
  return { token, user: publicUser(user) };
}

export function loginUser(store, { email, password }) {
  const user = store.users.find((u) => u.email === String(email).toLowerCase());
  if (!user || !verifyPassword(user, password)) throw new Error("invalid credentials");
  const token = mint(store, user.userId);
  saveStore(store);
  return { token, user: publicUser(user) };
}

export const GUEST_ID = "guest";

export function ensureGuest(store) {
  let user = store.users.find((u) => u.userId === GUEST_ID);
  if (!user) {
    user = {
      ...createAccount({ email: "guest@local", password: "", username: "guest", credits: 0 }),
      userId: GUEST_ID,
      guest: true,
      onboarding: { complete: true },
    };
    store.users.push(user);
    saveStore(store);
    return user;
  }
  if (!user.guest || user.onboarding?.complete !== true) {
    user = { ...user, guest: true, onboarding: { complete: true } };
    store.users = store.users.map((u) => (u.userId === GUEST_ID ? user : u));
    saveStore(store);
  }
  return user;
}

export function guestSession(store) {
  const user = ensureGuest(store);
  const existing = Object.entries(store.sessions || {}).find(([, id]) => id === GUEST_ID);
  if (existing) return { token: existing[0], user: publicUser(user) };
  const token = mint(store, GUEST_ID);
  saveStore(store);
  return { token, user: publicUser(user) };
}

export function userFromToken(store, token) {
  const userId = store.sessions[token];
  if (!userId) return null;
  const user = store.users.find((u) => u.userId === userId);
  return user ? publicUser(user) : null;
}

export function mutateUser(store, userId, fn) {
  const i = store.users.findIndex((u) => u.userId === userId);
  if (i < 0) throw new Error("unknown user");
  store.users[i] = fn(store.users[i]);
  saveStore(store);
  return store.users[i];
}

export function publicUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

function mint(store, userId) {
  const token = `tok_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  store.sessions[token] = userId;
  return token;
}
