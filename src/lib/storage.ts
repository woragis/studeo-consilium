import { createDemoProfile, createEmptyProfile, demoUserRecord, DEMO_USER_ID } from '../data/demo-user';
import { normalizeModuleProgress } from './lesson-progress';
import { normalizeLessonHistory } from './lesson-history';
import { normalizeLongTermGoals } from './long-term-goals';
import { normalizeStudyTimers } from './study-timers';
import type { TimerRuntimeState, TimerState, UserProfile, UserRecord } from '../types';

const USERS_KEY = 'studeo:users';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeProfile(profile: UserProfile): UserProfile {
  const moduleProgress = normalizeModuleProgress(profile as UserProfile & { lessonProgress?: Record<string, number> });
  const { lessonProgress: _legacy, ...rest } = profile as UserProfile & { lessonProgress?: Record<string, number> };
  const studyTimers = normalizeStudyTimers(rest);
  const lessonHistory = normalizeLessonHistory(rest);
  const longTermGoals = normalizeLongTermGoals(rest);
  return { ...rest, moduleProgress, studyTimers, lessonHistory, longTermGoals };
}

export function getUsers(): UserRecord[] {
  return readJson<UserRecord[]>(USERS_KEY, []);
}

export function saveUsers(users: UserRecord[]) {
  writeJson(USERS_KEY, users);
}

export function findUserByEmail(email: string): UserRecord | undefined {
  return getUsers().find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );
}

export function registerUser(user: UserRecord): UserRecord {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error('Este e-mail já está cadastrado. Faça login ou use outro e-mail.');
  }
  users.push(user);
  saveUsers(users);
  const profile = createEmptyProfile(user);
  saveProfile(profile);
  return user;
}

export function profileKey(userId: string) {
  return `studeo:profile:${userId}`;
}

export function getProfile(userId: string): UserProfile | null {
  const raw = readJson<UserProfile | null>(profileKey(userId), null);
  return raw ? normalizeProfile(raw) : null;
}

export function saveProfile(profile: UserProfile) {
  writeJson(profileKey(profile.userId), normalizeProfile(profile));
}

export function timerKey(userId: string) {
  return `studeo:timer:${userId}`;
}

export function timerRuntimeKey(userId: string) {
  return `studeo:timer-runtime:${userId}`;
}

/** @deprecated */
export function getTimerState(userId: string): TimerState | null {
  return readJson<TimerState | null>(timerKey(userId), null);
}

export function getTimerRuntime(userId: string): TimerRuntimeState | null {
  const runtime = readJson<TimerRuntimeState | null>(timerRuntimeKey(userId), null);
  if (runtime) return runtime;

  const legacy = getTimerState(userId);
  if (!legacy) return null;

  return {
    activeTimerId: null,
    running: legacy.running,
    startedAt: legacy.startedAt,
  };
}

/** @deprecated */
export function saveTimerState(userId: string, state: TimerState | null) {
  if (!state) {
    localStorage.removeItem(timerKey(userId));
    return;
  }
  writeJson(timerKey(userId), state);
}

export function saveTimerRuntime(userId: string, state: TimerRuntimeState | null) {
  if (!state) {
    localStorage.removeItem(timerRuntimeKey(userId));
    localStorage.removeItem(timerKey(userId));
    return;
  }
  writeJson(timerRuntimeKey(userId), state);
}

export function ensureDemoUser(): UserRecord {
  let users = getUsers();
  const existing = users.find((u) => u.id === DEMO_USER_ID);
  if (existing) {
    if (!getProfile(DEMO_USER_ID)) {
      saveProfile(createDemoProfile());
    }
    return existing;
  }
  users = [...users, demoUserRecord];
  saveUsers(users);
  saveProfile(createDemoProfile());
  return demoUserRecord;
}

export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}
