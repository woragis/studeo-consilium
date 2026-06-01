import type { UserProfile, UserRecord } from '../types';

export const DEMO_USER_ID = 'demo-carlos';

export const demoUserRecord: UserRecord = {
  id: DEMO_USER_ID,
  email: 'carlos@email.com',
  password: 'senha12345',
  firstName: 'Carlos',
  lastName: 'Henrique',
};

export function createDemoProfile(): UserProfile {
  return {
    userId: DEMO_USER_ID,
    firstName: 'Carlos',
    lastName: 'Henrique',
    email: 'carlossantos@gmail.com',
    goal: 'Medicina - UFPB',
    xp: 120,
    level: 2,
    streakDays: 7,
    totalStudySeconds: 46 * 3600,
    lessonProgress: {
      'lesson-newton': 35,
    },
    lastRecommendedLessonId: 'lesson-newton',
    dailyGoals: [
      {
        id: 'dg-1',
        title: 'Resolver 15 questões de matemática',
        status: 'em_andamento',
      },
      {
        id: 'dg-2',
        title: 'Corrigir simulado',
        status: 'pendente',
      },
      {
        id: 'dg-3',
        title: 'Estudar química',
        status: 'pendente',
      },
    ],
    longTermGoals: [
      '4h de estudo diário',
      '1 simulado por semana',
      '80% no simulado',
      '960 na redação',
    ],
    tasks: [
      {
        id: 't-1',
        title: 'Estudar Física',
        priority: 'alta',
        done: false,
        subjectId: 'fisica',
      },
      {
        id: 't-2',
        title: 'Revisar Química',
        priority: 'media',
        done: false,
        subjectId: 'quimica',
      },
      {
        id: 't-3',
        title: '20 questões de Matemática',
        priority: 'alta',
        done: false,
        subjectId: 'matematica',
      },
    ],
    studySessions: [
      { id: 's-1', subjectId: 'portugues', elapsedSeconds: 35 * 60 },
      { id: 's-2', subjectId: 'fisica', elapsedSeconds: 25 * 60 + 18 },
      { id: 's-3', subjectId: 'matematica', elapsedSeconds: 70 * 60 },
      { id: 's-4', subjectId: 'quimica', elapsedSeconds: 40 * 60 },
    ],
  };
}

export function createEmptyProfile(
  user: UserRecord,
  overrides?: Partial<UserProfile>,
): UserProfile {
  return {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    goal: '',
    xp: 0,
    level: 1,
    streakDays: 0,
    totalStudySeconds: 0,
    lessonProgress: {},
    lastRecommendedLessonId: 'lesson-newton',
    dailyGoals: [
      {
        id: crypto.randomUUID(),
        title: 'Definir rotina de estudos',
        status: 'pendente',
      },
    ],
    longTermGoals: ['4h de estudo diário'],
    tasks: [],
    studySessions: [],
    ...overrides,
  };
}
