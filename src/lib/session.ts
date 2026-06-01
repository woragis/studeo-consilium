import type { SessionData } from '../types';

const SESSION_KEY = 'studeo_session';
const COOKIE_NAME = 'studeo_session';

function readCookie(): SessionData | null {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split('=')[1] ?? '')) as SessionData;
  } catch {
    return null;
  }
}

function writeCookie(data: SessionData) {
  const maxAge = data.remember ? 60 * 60 * 24 * 7 : undefined;
  const value = encodeURIComponent(JSON.stringify(data));
  const parts = [`${COOKIE_NAME}=${value}`, 'path=/', 'SameSite=Lax'];
  if (maxAge) parts.push(`max-age=${maxAge}`);
  document.cookie = parts.join('; ');
}

function clearCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

export function getSession(): SessionData | null {
  const fromCookie = readCookie();
  if (fromCookie) return fromCookie;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

export function setSession(data: SessionData) {
  if (data.remember) {
    sessionStorage.removeItem(SESSION_KEY);
    writeCookie(data);
  } else {
    clearCookie();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  clearCookie();
}
