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
import { buildTimerName } from '../lib/study-timers';
import { addXp, levelFromXp } from '../lib/xp';
import {
  formatDuration,
  getTimerRuntime,
  getTimerState,
  saveTimerRuntime,
} from '../lib/storage';
import { showToast } from '../lib/toast';
import type {
  StudyTimerPreset,
  StudyTimerType,
  SubjectId,
  TimerRuntimeState,
} from '../types';
import { useAuth } from './AuthContext';

interface CreateTimerInput {
  name?: string;
  type: StudyTimerType;
  subjectId?: SubjectId;
  taskId?: string;
  dailyGoalId?: string;
}

interface StudyTimerContextValue {
  timers: StudyTimerPreset[];
  activeTimerId: string | null;
  activeTimer: StudyTimerPreset | null;
  elapsedSeconds: number;
  display: string;
  running: boolean;
  selectTimer: (id: string) => void;
  createTimer: (input: CreateTimerInput) => string;
  updateTimer: (id: string, patch: Partial<StudyTimerPreset>) => void;
  deleteTimer: (id: string) => void;
  start: () => void;
  pause: () => void;
  finish: () => void;
  suggestTimerIdForSubject: (subjectId: SubjectId) => string | null;
}

const StudyTimerContext = createContext<StudyTimerContextValue | null>(null);

export function StudyTimerProvider({ children }: { children: ReactNode }) {
  const { user, profile, updateProfile } = useAuth();
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const startedAtRef = useRef<number | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const profileRef = useRef(profile);
  profileRef.current = profile;
  const hydratedRef = useRef(false);

  const timers = profile?.studyTimers ?? [];

  const persistRuntime = useCallback(
    (state: TimerRuntimeState) => {
      if (user) saveTimerRuntime(user.id, state);
    },
    [user],
  );

  const saveElapsedToProfile = useCallback(
    (timerId: string, seconds: number) => {
      const current = profileRef.current;
      if (!current) return;
      updateProfile({
        studyTimers: current.studyTimers.map((t) =>
          t.id === timerId ? { ...t, elapsedSeconds: seconds } : t,
        ),
      });
    },
    [updateProfile],
  );

  const loadTimerElapsed = useCallback(
    (timerId: string) => {
      const timer = profileRef.current?.studyTimers.find((t) => t.id === timerId);
      setElapsedSeconds(timer?.elapsedSeconds ?? 0);
    },
    [],
  );

  useEffect(() => {
    if (!user || !profile || hydratedRef.current) return;
    hydratedRef.current = true;

    const legacy = getTimerState(user.id);
    const runtime = getTimerRuntime(user.id);

    if (legacy?.elapsedSeconds && legacy.subjectId) {
      const match = profile.studyTimers.find((t) => t.subjectId === legacy.subjectId);
      if (match && match.elapsedSeconds !== legacy.elapsedSeconds) {
        updateProfile({
          studyTimers: profile.studyTimers.map((t) =>
            t.id === match.id ? { ...t, elapsedSeconds: legacy.elapsedSeconds } : t,
          ),
        });
      }
    }

    if (runtime?.activeTimerId && profile.studyTimers.some((t) => t.id === runtime.activeTimerId)) {
      setActiveTimerId(runtime.activeTimerId);
      const timer = profile.studyTimers.find((t) => t.id === runtime.activeTimerId);
      setElapsedSeconds(timer?.elapsedSeconds ?? 0);
      setRunning(runtime.running);
      startedAtRef.current = runtime.startedAt;
      return;
    }

    if (legacy?.subjectId) {
      const match = profile.studyTimers.find((t) => t.subjectId === legacy.subjectId);
      if (match) {
        setActiveTimerId(match.id);
        setElapsedSeconds(legacy.elapsedSeconds);
        setRunning(legacy.running);
        startedAtRef.current = legacy.startedAt;
      }
    }
  }, [user, profile, updateProfile]);

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
    if (!user || !activeTimerId) return;
    persistRuntime({
      activeTimerId,
      running,
      startedAt: startedAtRef.current,
    });
  }, [user, activeTimerId, running, persistRuntime]);

  useEffect(() => {
    if (!running || !activeTimerId) return;
    const interval = setInterval(() => {
      setElapsedSeconds((s) => {
        saveElapsedToProfile(activeTimerId, s);
        return s;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [running, activeTimerId, saveElapsedToProfile]);

  const pauseInternal = useCallback(
    (silent = false) => {
      if (!activeTimerId) return;
      setRunning(false);
      saveElapsedToProfile(activeTimerId, elapsedSeconds);
      if (!silent) showToast('Cronômetro pausado. O tempo foi salvo.', 'info');
    },
    [activeTimerId, elapsedSeconds, saveElapsedToProfile],
  );

  const selectTimer = useCallback(
    (id: string) => {
      if (!profileRef.current?.studyTimers.some((t) => t.id === id)) return;

      if (running && activeTimerId) {
        setRunning(false);
        saveElapsedToProfile(activeTimerId, elapsedSeconds);
      } else if (activeTimerId) {
        saveElapsedToProfile(activeTimerId, elapsedSeconds);
      }

      setActiveTimerId(id);
      loadTimerElapsed(id);
      startedAtRef.current = null;
      setRunning(false);
    },
    [activeTimerId, elapsedSeconds, loadTimerElapsed, running, saveElapsedToProfile],
  );

  const createTimer = useCallback(
    (input: CreateTimerInput) => {
      const current = profileRef.current;
      if (!current) return '';

      const timer: StudyTimerPreset = {
        id: crypto.randomUUID(),
        name: buildTimerName(input.type, current, input),
        type: input.type,
        subjectId: input.subjectId,
        taskId: input.taskId,
        dailyGoalId: input.dailyGoalId,
        elapsedSeconds: 0,
        totalSeconds: 0,
      };

      updateProfile({ studyTimers: [...current.studyTimers, timer] });
      showToast(`Cronômetro «${timer.name}» criado.`, 'success');
      return timer.id;
    },
    [updateProfile],
  );

  const updateTimer = useCallback(
    (id: string, patch: Partial<StudyTimerPreset>) => {
      const current = profileRef.current;
      if (!current) return;
      updateProfile({
        studyTimers: current.studyTimers.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      });
    },
    [updateProfile],
  );

  const deleteTimer = useCallback(
    (id: string) => {
      const current = profileRef.current;
      if (!current) return;
      if (current.studyTimers.length <= 1) {
        showToast('Mantenha ao menos um cronômetro.', 'error');
        return;
      }
      if (activeTimerId === id) {
        setActiveTimerId(null);
        setElapsedSeconds(0);
        setRunning(false);
        startedAtRef.current = null;
      }
      updateProfile({
        studyTimers: current.studyTimers.filter((t) => t.id !== id),
      });
      showToast('Cronômetro removido.', 'info');
    },
    [activeTimerId, updateProfile],
  );

  const start = useCallback(() => {
    if (!activeTimerId) {
      showToast('Selecione um cronômetro antes de iniciar.', 'error');
      return;
    }
    if (!startedAtRef.current) startedAtRef.current = Date.now();
    setRunning(true);
  }, [activeTimerId]);

  const pause = useCallback(() => {
    pauseInternal(false);
  }, [pauseInternal]);

  const finish = useCallback(() => {
    const current = profileRef.current;
    if (!current || !activeTimerId || elapsedSeconds < 1) {
      showToast('Inicie o cronômetro antes de finalizar a sessão.', 'error');
      return;
    }

    const timer = current.studyTimers.find((t) => t.id === activeTimerId);
    if (!timer) return;

    const newXp = addXp(current.xp, 10);
    const nextTimers = current.studyTimers.map((t) =>
      t.id === activeTimerId
        ? {
            ...t,
            elapsedSeconds: 0,
            totalSeconds: t.totalSeconds + elapsedSeconds,
          }
        : t,
    );

    const sessions = timer.subjectId
      ? [
          ...current.studySessions.filter((s) => s.subjectId !== timer.subjectId),
          {
            id: crypto.randomUUID(),
            subjectId: timer.subjectId,
            elapsedSeconds,
            endedAt: new Date().toISOString(),
          },
        ]
      : current.studySessions;

    updateProfile({
      studyTimers: nextTimers,
      xp: newXp,
      level: levelFromXp(newXp),
      totalStudySeconds: current.totalStudySeconds + elapsedSeconds,
      studySessions: sessions,
    });

    setRunning(false);
    setElapsedSeconds(0);
    startedAtRef.current = null;
    if (user) saveTimerRuntime(user.id, { activeTimerId, running: false, startedAt: null });

    showToast(`Sessão «${timer.name}» finalizada. +10 XP!`, 'success');
  }, [activeTimerId, elapsedSeconds, updateProfile, user]);

  const suggestTimerIdForSubject = useCallback(
    (subjectId: SubjectId) => {
      const match = timers.find((t) => t.subjectId === subjectId);
      return match?.id ?? null;
    },
    [timers],
  );

  const activeTimer = useMemo(
    () => timers.find((t) => t.id === activeTimerId) ?? null,
    [timers, activeTimerId],
  );

  const value = useMemo(
    () => ({
      timers,
      activeTimerId,
      activeTimer,
      elapsedSeconds,
      display: formatDuration(elapsedSeconds),
      running,
      selectTimer,
      createTimer,
      updateTimer,
      deleteTimer,
      start,
      pause,
      finish,
      suggestTimerIdForSubject,
    }),
    [
      timers,
      activeTimerId,
      activeTimer,
      elapsedSeconds,
      running,
      selectTimer,
      createTimer,
      updateTimer,
      deleteTimer,
      start,
      pause,
      finish,
      suggestTimerIdForSubject,
    ],
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
