const XP_PER_LEVEL = 100;

export function xpForLevel(level: number): number {
  return level * XP_PER_LEVEL;
}

export function levelFromXp(xp: number): number {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

export function xpProgressInLevel(xp: number): { current: number; max: number } {
  const level = levelFromXp(xp);
  const base = (level - 1) * XP_PER_LEVEL;
  return { current: xp - base, max: XP_PER_LEVEL };
}

export function addXp(xp: number, amount: number): number {
  return xp + amount;
}
