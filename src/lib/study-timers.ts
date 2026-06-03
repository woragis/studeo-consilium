import { subjects } from '../data/subjects';
import type {
  StudySession,
  StudyTimerPreset,
  StudyTimerType,
  SubjectId,
  UserProfile,
} from '../types';

export const TIMER_TYPE_LABELS: Record<StudyTimerType, string> = {
  materia: 'Matéria',
  tarefa: 'Tarefa',
  rotina: 'Rotina',
  meta: 'Meta diária',
};

export function createDefaultStudyTimers(): StudyTimerPreset[] {
  return subjects.map((s) => ({
    id: crypto.randomUUID(),
    name: s.name,
    type: 'materia' as const,
    subjectId: s.id,
    elapsedSeconds: 0,
    totalSeconds: 0,
  }));
}

function migrateFromSessions(sessions: StudySession[]): StudyTimerPreset[] {
  return sessions.map((s) => {
    const subject = subjects.find((sub) => sub.id === s.subjectId);
    return {
      id: s.id,
      name: subject?.name ?? 'Estudos',
      type: 'materia' as const,
      subjectId: s.subjectId,
      elapsedSeconds: 0,
      totalSeconds: s.elapsedSeconds,
    };
  });
}

function migrateLegacyTimerState(
  profile: UserProfile & { studyTimers?: StudyTimerPreset[] },
  legacy: { subjectId: SubjectId; elapsedSeconds: number },
): StudyTimerPreset[] {
  const base = profile.studyTimers?.length
    ? [...profile.studyTimers]
    : createDefaultStudyTimers();

  const match = base.find((t) => t.subjectId === legacy.subjectId);
  if (match) {
    return base.map((t) =>
      t.id === match.id ? { ...t, elapsedSeconds: legacy.elapsedSeconds } : t,
    );
  }

  const subject = subjects.find((s) => s.id === legacy.subjectId);
  return [
    ...base,
    {
      id: crypto.randomUUID(),
      name: subject?.name ?? 'Estudos',
      type: 'materia',
      subjectId: legacy.subjectId,
      elapsedSeconds: legacy.elapsedSeconds,
      totalSeconds: 0,
    },
  ];
}

export function normalizeStudyTimers(
  profile: UserProfile & { studyTimers?: StudyTimerPreset[] },
  legacyTimer?: { subjectId: SubjectId; elapsedSeconds: number } | null,
): StudyTimerPreset[] {
  if (profile.studyTimers?.length) {
    if (legacyTimer?.elapsedSeconds) {
      return migrateLegacyTimerState(profile, legacyTimer);
    }
    return profile.studyTimers;
  }

  if (profile.studySessions?.length) {
    const migrated = migrateFromSessions(profile.studySessions);
    if (legacyTimer?.elapsedSeconds && legacyTimer.subjectId) {
      return migrateLegacyTimerState({ ...profile, studyTimers: migrated }, legacyTimer);
    }
    return migrated;
  }

  if (legacyTimer?.elapsedSeconds && legacyTimer.subjectId) {
    return migrateLegacyTimerState({ ...profile, studyTimers: createDefaultStudyTimers() }, legacyTimer);
  }

  return createDefaultStudyTimers();
}

export function findTimerForSubject(
  timers: StudyTimerPreset[],
  subjectId: SubjectId,
): StudyTimerPreset | undefined {
  return timers.find((t) => t.subjectId === subjectId);
}

export function timerSubtitle(timer: StudyTimerPreset, profile: UserProfile): string {
  if (timer.type === 'materia' && timer.subjectId) {
    return subjects.find((s) => s.id === timer.subjectId)?.name ?? 'Matéria';
  }
  if (timer.type === 'tarefa' && timer.taskId) {
    return profile.tasks.find((t) => t.id === timer.taskId)?.title ?? 'Tarefa';
  }
  if (timer.type === 'meta' && timer.dailyGoalId) {
    return profile.dailyGoals.find((g) => g.id === timer.dailyGoalId)?.title ?? 'Meta';
  }
  return TIMER_TYPE_LABELS[timer.type];
}

export function buildTimerName(
  type: StudyTimerType,
  profile: UserProfile,
  opts: { name?: string; subjectId?: SubjectId; taskId?: string; dailyGoalId?: string },
): string {
  if (opts.name?.trim()) return opts.name.trim();
  if (type === 'materia' && opts.subjectId) {
    return subjects.find((s) => s.id === opts.subjectId)?.name ?? 'Matéria';
  }
  if (type === 'tarefa' && opts.taskId) {
    return profile.tasks.find((t) => t.id === opts.taskId)?.title ?? 'Tarefa';
  }
  if (type === 'meta' && opts.dailyGoalId) {
    return profile.dailyGoals.find((g) => g.id === opts.dailyGoalId)?.title ?? 'Meta';
  }
  return 'Nova rotina';
}
