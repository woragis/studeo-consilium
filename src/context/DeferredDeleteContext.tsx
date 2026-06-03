import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { showToast, showUndoToast } from '../lib/toast';

const DEFAULT_DELAY_MS = 5000;

interface ScheduleOptions {
  message: string;
  onCommit: () => void;
  undoMessage?: string;
}

interface DeferredDeleteContextValue {
  schedule: (key: string, options: ScheduleOptions) => void;
  isHidden: (key: string) => boolean;
}

const DeferredDeleteContext = createContext<DeferredDeleteContextValue | null>(null);

export function DeferredDeleteProvider({ children }: { children: ReactNode }) {
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(() => new Set());
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const clearKey = useCallback((key: string) => {
    const timer = timersRef.current.get(key);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(key);
    setHiddenKeys((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const schedule = useCallback(
    (key: string, { message, onCommit, undoMessage = 'Exclusão desfeita.' }: ScheduleOptions) => {
      clearKey(key);

      setHiddenKeys((prev) => new Set(prev).add(key));

      const timer = setTimeout(() => {
        timersRef.current.delete(key);
        setHiddenKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
        onCommit();
      }, DEFAULT_DELAY_MS);

      timersRef.current.set(key, timer);

      showUndoToast(message, () => {
        clearKey(key);
        showToast(undoMessage, 'info');
      }, DEFAULT_DELAY_MS);
    },
    [clearKey],
  );

  const isHidden = useCallback((key: string) => hiddenKeys.has(key), [hiddenKeys]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <DeferredDeleteContext.Provider value={{ schedule, isHidden }}>
      {children}
    </DeferredDeleteContext.Provider>
  );
}

export function useDeferredDelete() {
  const ctx = useContext(DeferredDeleteContext);
  if (!ctx) {
    throw new Error('useDeferredDelete must be used within DeferredDeleteProvider');
  }
  return ctx;
}
