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
  lessonProgress: Record<string, number>;
  dailyGoals: DailyGoal[];
  longTermGoals: string[];
  tasks: Task[];
  studySessions: StudySession[];
  lastRecommendedLessonId: string;
}

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
  title: string;
  examples: string;
}
