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
    moduleProgress: {
      'lesson-newton:0': true,
      'lesson-cinematica:0': true,
      'lesson-cinematica:1': true,
      'lesson-funcoes:0': true,
      'lesson-progressoes:0': true,
      'lesson-tabela:0': true,
      'lesson-interpretacao:0': true,
      'lesson-interpretacao:1': true,
      'lesson-energia:0': true,
      'lesson-energia:1': true,
      'lesson-trigonometria:0': true,
      'lesson-estequiometria:0': true,
      'lesson-redacao:0': true,
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
      { id: 'ltg-1', title: '4h de estudo diário', status: 'em_andamento' },
      { id: 'ltg-2', title: '1 simulado por semana', status: 'pendente' },
      { id: 'ltg-3', title: '80% no simulado', status: 'pendente' },
      { id: 'ltg-4', title: '960 na redação', status: 'concluida' },
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
    studyTimers: [
      {
        id: 'timer-fisica',
        name: 'Física',
        type: 'materia',
        subjectId: 'fisica',
        elapsedSeconds: 12 * 60 + 30,
        totalSeconds: 25 * 60 + 18,
      },
      {
        id: 'timer-matematica',
        name: 'Matemática',
        type: 'materia',
        subjectId: 'matematica',
        elapsedSeconds: 0,
        totalSeconds: 70 * 60,
      },
      {
        id: 'timer-quimica',
        name: 'Química',
        type: 'materia',
        subjectId: 'quimica',
        elapsedSeconds: 5 * 60,
        totalSeconds: 40 * 60,
      },
      {
        id: 'timer-portugues',
        name: 'Português',
        type: 'materia',
        subjectId: 'portugues',
        elapsedSeconds: 0,
        totalSeconds: 35 * 60,
      },
      {
        id: 'timer-tarefa-fisica',
        name: 'Estudar Física',
        type: 'tarefa',
        taskId: 't-1',
        subjectId: 'fisica',
        elapsedSeconds: 0,
        totalSeconds: 0,
      },
      {
        id: 'timer-rotina',
        name: 'Revisão vespertina',
        type: 'rotina',
        elapsedSeconds: 18 * 60,
        totalSeconds: 2 * 3600,
      },
      {
        id: 'timer-meta',
        name: 'Resolver 15 questões de matemática',
        type: 'meta',
        dailyGoalId: 'dg-1',
        subjectId: 'matematica',
        elapsedSeconds: 0,
        totalSeconds: 45 * 60,
      },
    ],
    lessonHistory: [],
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
    moduleProgress: {},
    lastRecommendedLessonId: 'lesson-newton',
    dailyGoals: [
      {
        id: crypto.randomUUID(),
        title: 'Definir rotina de estudos',
        status: 'pendente',
      },
    ],
    longTermGoals: [
      { id: crypto.randomUUID(), title: '4h de estudo diário', status: 'pendente' },
    ],
    tasks: [],
    studySessions: [],
    studyTimers: [],
    lessonHistory: [],
    ...overrides,
  };
}
