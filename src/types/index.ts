export type SubjectId = 'fisica' | 'matematica' | 'quimica' | 'portugues';

export type TaskPriority = 'alta' | 'media';

export type DailyGoalStatus = 'em_andamento' | 'pendente' | 'concluida';

export interface UserRecord {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface DailyGoal {
  id: string;
  title: string;
  status: DailyGoalStatus;
}

export interface LongTermGoal {
  id: string;
  title: string;
  status: DailyGoalStatus;
}

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  done: boolean;
  subjectId?: SubjectId;
}

export interface StudySession {
  id: string;
  subjectId: SubjectId;
  elapsedSeconds: number;
  endedAt?: string;
}

export type StudyTimerType = 'materia' | 'tarefa' | 'rotina' | 'meta';

/** Cronômetro configurável com tempo acumulado persistente */
export interface StudyTimerPreset {
  id: string;
  name: string;
  type: StudyTimerType;
  subjectId?: SubjectId;
  taskId?: string;
  dailyGoalId?: string;
  /** Tempo em andamento (persiste ao pausar) */
  elapsedSeconds: number;
  /** Tempo total já finalizado neste cronômetro */
  totalSeconds: number;
}

export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  goal: string;
  xp: number;
  level: number;
  streakDays: number;
  totalStudySeconds: number;
  /** Módulos concluídos — chave: `lessonId:moduleIndex` */
  moduleProgress: Record<string, boolean>;
  dailyGoals: DailyGoal[];
  longTermGoals: LongTermGoal[];
  tasks: Task[];
  studySessions: StudySession[];
  studyTimers: StudyTimerPreset[];
  /** Registro cronológico de módulos/aulas concluídos */
  lessonHistory: LessonHistoryEntry[];
  lastRecommendedLessonId: string;
}

export interface LessonHistoryEntry {
  id: string;
  lessonId: string;
  moduleIndex: number;
  completedAt: string;
}

export interface TimerRuntimeState {
  activeTimerId: string | null;
  running: boolean;
  startedAt: number | null;
}

/** @deprecated legado — migrado para TimerRuntimeState */
export interface TimerState {
  subjectId: SubjectId;
  elapsedSeconds: number;
  running: boolean;
  startedAt: number | null;
}

export interface SessionData {
  userId: string;
  remember: boolean;
}

export interface Subject {
  id: SubjectId;
  name: string;
  color: string;
}

export interface LessonModule {
  title: string;
  body: string;
}

export interface Lesson {
  id: string;
  slug: string;
  subjectId: SubjectId;
  title: string;
  subtitle: string;
  durationMinutes: number;
  modules: LessonModule[];
  recommended?: boolean;
}

export interface HeuristicItem {
  number: number;
  title: string;
  /** Onde isso aparece no protótipo */
  screens: string;
  /** Evidência concreta na interface */
  evidence: string;
}
