import { lessons } from '../data/lessons';
import type { DailyGoalStatus } from '../types';
import type { Lesson, SubjectId } from '../types';

export type TopicStatus = DailyGoalStatus;

export function moduleKey(lessonId: string, moduleIndex: number): string {
  return `${lessonId}:${moduleIndex}`;
}

export function isModuleComplete(
  moduleProgress: Record<string, boolean>,
  lessonId: string,
  moduleIndex: number,
): boolean {
  return moduleProgress[moduleKey(lessonId, moduleIndex)] === true;
}

export function countCompletedModules(
  lesson: Lesson,
  moduleProgress: Record<string, boolean>,
): number {
  return lesson.modules.filter((_, i) => isModuleComplete(moduleProgress, lesson.id, i)).length;
}

export function getLessonPercent(
  lesson: Lesson,
  moduleProgress: Record<string, boolean>,
): number {
  if (lesson.modules.length === 0) return 0;
  return Math.round((countCompletedModules(lesson, moduleProgress) / lesson.modules.length) * 100);
}

export function getTopicStatus(
  lesson: Lesson,
  moduleProgress: Record<string, boolean>,
): TopicStatus {
  const done = countCompletedModules(lesson, moduleProgress);
  if (done === 0) return 'pendente';
  if (done >= lesson.modules.length) return 'concluida';
  return 'em_andamento';
}

export function topicStatusLabel(status: TopicStatus): string {
  switch (status) {
    case 'em_andamento':
      return 'Em andamento';
    case 'concluida':
      return 'Concluída';
    default:
      return 'Não iniciada';
  }
}

export function getFirstIncompleteModuleIndex(
  lesson: Lesson,
  moduleProgress: Record<string, boolean>,
): number {
  const idx = lesson.modules.findIndex((_, i) => !isModuleComplete(moduleProgress, lesson.id, i));
  return idx === -1 ? 0 : idx;
}

export function getSubjectStats(
  subjectId: SubjectId,
  moduleProgress: Record<string, boolean>,
) {
  const topics = lessons.filter((l) => l.subjectId === subjectId);
  let concluidas = 0;
  let emAndamento = 0;
  for (const topic of topics) {
    const status = getTopicStatus(topic, moduleProgress);
    if (status === 'concluida') concluidas += 1;
    else if (status === 'em_andamento') emAndamento += 1;
  }
  return {
    total: topics.length,
    concluidas,
    emAndamento,
    naoIniciadas: topics.length - concluidas - emAndamento,
  };
}

export function getNextLessonInSubject(
  current: Lesson,
  moduleProgress: Record<string, boolean>,
): Lesson | null {
  const topics = lessons.filter((l) => l.subjectId === current.subjectId);
  const index = topics.findIndex((l) => l.id === current.id);
  for (let i = index + 1; i < topics.length; i += 1) {
    if (getTopicStatus(topics[i], moduleProgress) !== 'concluida') {
      return topics[i];
    }
  }
  return null;
}

export function migrateLegacyLessonProgress(
  legacy: Record<string, number>,
): Record<string, boolean> {
  const moduleProgress: Record<string, boolean> = {};
  for (const lesson of lessons) {
    const percent = legacy[lesson.id] ?? 0;
    if (percent <= 0) continue;
    const toComplete = Math.min(
      lesson.modules.length,
      Math.max(1, Math.round((percent / 100) * lesson.modules.length)),
    );
    if (percent >= 100) {
      lesson.modules.forEach((_, i) => {
        moduleProgress[moduleKey(lesson.id, i)] = true;
      });
    } else {
      for (let i = 0; i < toComplete; i += 1) {
        moduleProgress[moduleKey(lesson.id, i)] = true;
      }
    }
  }
  return moduleProgress;
}

export function normalizeModuleProgress(
  profile: { moduleProgress?: Record<string, boolean>; lessonProgress?: Record<string, number> },
): Record<string, boolean> {
  if (profile.moduleProgress && Object.keys(profile.moduleProgress).length > 0) {
    return profile.moduleProgress;
  }
  if (profile.lessonProgress) {
    return migrateLegacyLessonProgress(profile.lessonProgress);
  }
  return {};
}
