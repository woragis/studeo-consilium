import { getLessonById, lessons } from '../data/lessons';
import { getSubject } from '../data/subjects';
import { getTopicStatus, topicStatusLabel } from './lesson-progress';
import type { LessonHistoryEntry, SubjectId } from '../types';
import type { TopicStatus } from './lesson-progress';

export interface EnrichedLessonHistoryItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  moduleTitle: string;
  subjectId: SubjectId;
  subjectName: string;
  moduleIndex: number;
  totalModules: number;
  completedAt: string;
  lessonStatus: TopicStatus;
  lessonPath: string;
}

export function createHistoryEntry(lessonId: string, moduleIndex: number): LessonHistoryEntry {
  return {
    id: crypto.randomUUID(),
    lessonId,
    moduleIndex,
    completedAt: new Date().toISOString(),
  };
}

export function migrateHistoryFromProgress(
  moduleProgress: Record<string, boolean>,
): LessonHistoryEntry[] {
  const keys = Object.keys(moduleProgress)
    .filter((key) => moduleProgress[key])
    .sort();

  return keys
    .map((key, index) => {
      const colon = key.lastIndexOf(':');
      if (colon === -1) return null;
      const lessonId = key.slice(0, colon);
      const moduleIndex = Number(key.slice(colon + 1));
      if (!getLessonById(lessonId) || Number.isNaN(moduleIndex)) return null;

      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() - (keys.length - 1 - index));

      return {
        id: `migrated-${key}`,
        lessonId,
        moduleIndex,
        completedAt: date.toISOString(),
      };
    })
    .filter((entry): entry is LessonHistoryEntry => entry !== null);
}

export function normalizeLessonHistory(
  profile: {
    moduleProgress?: Record<string, boolean>;
    lessonHistory?: LessonHistoryEntry[];
  },
): LessonHistoryEntry[] {
  if (profile.lessonHistory?.length) return profile.lessonHistory;
  if (profile.moduleProgress && Object.keys(profile.moduleProgress).length > 0) {
    return migrateHistoryFromProgress(profile.moduleProgress);
  }
  return [];
}

export function enrichLessonHistory(
  entries: LessonHistoryEntry[],
  moduleProgress: Record<string, boolean>,
): EnrichedLessonHistoryItem[] {
  return entries
    .map((entry) => {
      const lesson = getLessonById(entry.lessonId);
      if (!lesson) return null;
      const mod = lesson.modules[entry.moduleIndex];
      if (!mod) return null;
      const subject = getSubject(lesson.subjectId);
      return {
        id: entry.id,
        lessonId: entry.lessonId,
        lessonTitle: lesson.title,
        moduleTitle: mod.title,
        subjectId: lesson.subjectId,
        subjectName: subject?.name ?? lesson.subjectId,
        moduleIndex: entry.moduleIndex,
        totalModules: lesson.modules.length,
        completedAt: entry.completedAt,
        lessonStatus: getTopicStatus(lesson, moduleProgress),
        lessonPath: `/aulas/${lesson.subjectId}/${lesson.slug}?m=${entry.moduleIndex}`,
      };
    })
    .filter((item): item is EnrichedLessonHistoryItem => item !== null)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
}

export function formatHistoryDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Data não registrada';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today.getTime() - target.getTime()) / 86400000);

  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  if (diffDays === 0) return `Hoje às ${time}`;
  if (diffDays === 1) return `Ontem às ${time}`;
  if (diffDays < 7) {
    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} às ${time}`;
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export function getLessonHistoryStats(moduleProgress: Record<string, boolean>) {
  let assuntosConcluidos = 0;
  let emAndamento = 0;
  let modulosConcluidos = 0;

  for (const lesson of lessons) {
    const status = getTopicStatus(lesson, moduleProgress);
    if (status === 'concluida') assuntosConcluidos += 1;
    else if (status === 'em_andamento') emAndamento += 1;
  }

  modulosConcluidos = Object.values(moduleProgress).filter(Boolean).length;

  return { assuntosConcluidos, emAndamento, modulosConcluidos };
}

export { topicStatusLabel };
