import { normalizeText } from './strings';
import type { DailyGoalStatus, LongTermGoal, UserProfile } from '../types';

function legacyLongTermId(title: string): string {
  const slug = normalizeText(title).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `ltg-${slug || 'meta'}`;
}

function migrateFromStrings(titles: string[]): LongTermGoal[] {
  return titles.map((title) => ({
    id: legacyLongTermId(title),
    title,
    status: 'pendente' as DailyGoalStatus,
  }));
}

export function normalizeLongTermGoals(
  profile: UserProfile & { longTermGoals?: LongTermGoal[] | string[] },
): LongTermGoal[] {
  const goals = profile.longTermGoals ?? [];
  if (goals.length === 0) return [];
  if (typeof goals[0] === 'string') {
    return migrateFromStrings(goals as string[]);
  }
  return goals as LongTermGoal[];
}
