import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { getSubject } from '../data/subjects';
import { addXp, levelFromXp } from '../lib/xp';
import { formatDuration, getTimerState, saveTimerState } from '../lib/storage';
import { showToast } from '../lib/toast';
import type { SubjectId, TimerState } from '../types';
import { useAuth } from './AuthContext';

interface StudyTimerContextValue {
  subjectId: SubjectId;
  setSubjectId: (id: SubjectId) => void;
  elapsedSeconds: number;
  display: string;
  running: boolean;
  start: () => void;
  pause: () => void;
  finish: () => void;
}

const StudyTimerContext = createContext<StudyTimerContextValue | null>(null);

const DEFAULT_SUBJECT: SubjectId = 'fisica';

export function StudyTimerProvider({ children }: { children: ReactNode }) {
  const { user, profile, updateProfile } = useAuth();
  const [subjectId, setSubjectIdState] = useState<SubjectId>(DEFAULT_SUBJECT);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef<number | null>(null);

  const persist = useCallback(
    (state: TimerState) => {
      if (user) saveTimerState(user.id, state);
    },
    [user],
  );

  useEffect(() => {
    if (!user) return;
    const saved = getTimerState(user.id);
    if (saved) {
      setSubjectIdState(saved.subjectId);
      setElapsedSeconds(saved.elapsedSeconds);
      setRunning(saved.running);
      startedAtRef.current = saved.startedAt;
    }
  }, [user]);

  useEffect(() => {
    if (!running) {
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }
    tickRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (!user) return;
    persist({
      subjectId,
      elapsedSeconds,
      running,
      startedAt: startedAtRef.current,
    });
  }, [user, subjectId, elapsedSeconds, running, persist]);

  const setSubjectId = useCallback((id: SubjectId) => {
    setSubjectIdState(id);
  }, []);

  const start = useCallback(() => {
    if (!startedAtRef.current) startedAtRef.current = Date.now();
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    setRunning(false);
    showToast('Sessão pausada. Você pode retomar quando quiser.', 'info');
  }, []);

  const finish = useCallback(() => {
    if (!profile || elapsedSeconds < 1) {
      showToast('Inicie o cronômetro antes de finalizar a sessão.', 'error');
      return;
    }
    const subject = getSubject(subjectId);
    const newXp = addXp(profile.xp, 10);
    const sessions = [
      ...profile.studySessions.filter((s) => s.subjectId !== subjectId),
      {
        id: crypto.randomUUID(),
        subjectId,
        elapsedSeconds,
        endedAt: new Date().toISOString(),
      },
    ];
    updateProfile({
      xp: newXp,
      level: levelFromXp(newXp),
      totalStudySeconds: profile.totalStudySeconds + elapsedSeconds,
      studySessions: sessions,
    });
    setRunning(false);
    setElapsedSeconds(0);
    startedAtRef.current = null;
    if (user) saveTimerState(user.id, null);
    showToast(
      `Sessão de ${subject?.name ?? 'estudos'} finalizada. +10 XP!`,
      'success',
    );
  }, [profile, elapsedSeconds, subjectId, updateProfile, user]);

  const value = useMemo(
    () => ({
      subjectId,
      setSubjectId,
      elapsedSeconds,
      display: formatDuration(elapsedSeconds),
      running,
      start,
      pause,
      finish,
    }),
    [subjectId, setSubjectId, elapsedSeconds, running, start, pause, finish],
  );

  return (
    <StudyTimerContext.Provider value={value}>{children}</StudyTimerContext.Provider>
  );
}

export function useStudyTimer() {
  const ctx = useContext(StudyTimerContext);
  if (!ctx) throw new Error('useStudyTimer deve ser usado dentro de StudyTimerProvider');
  return ctx;
}
