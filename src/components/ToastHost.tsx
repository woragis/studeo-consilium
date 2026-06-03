import { useEffect, useRef, useState } from 'react';
import { subscribeToast, type ToastEvent } from '../lib/toast';

type ActiveToast =
  | { kind: 'simple'; message: string; type: 'success' | 'error' | 'info' }
  | {
      kind: 'undo';
      message: string;
      durationMs: number;
      onUndo: () => void;
      startedAt: number;
    };

export function ToastHost() {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const [undoProgress, setUndoProgress] = useState(100);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressFrameRef = useRef<number | null>(null);

  function clearTimers() {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
    if (progressFrameRef.current !== null) {
      cancelAnimationFrame(progressFrameRef.current);
      progressFrameRef.current = null;
    }
  }

  useEffect(() => {
    return subscribeToast((event: ToastEvent) => {
      clearTimers();

      if (event.kind === 'simple') {
        setUndoProgress(100);
        setToast({ kind: 'simple', message: event.message, type: event.type });
        const duration = event.type === 'error' ? 5500 : 4000;
        dismissTimerRef.current = setTimeout(() => setToast(null), duration);
        return;
      }

      const startedAt = Date.now();
      setToast({
        kind: 'undo',
        message: event.message,
        durationMs: event.durationMs,
        onUndo: event.onUndo,
        startedAt,
      });

      const tick = () => {
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, 100 - (elapsed / event.durationMs) * 100);
        setUndoProgress(remaining);
        if (remaining > 0) {
          progressFrameRef.current = requestAnimationFrame(tick);
        }
      };
      progressFrameRef.current = requestAnimationFrame(tick);

      dismissTimerRef.current = setTimeout(() => {
        setToast(null);
        setUndoProgress(100);
      }, event.durationMs);
    });
  }, []);

  useEffect(() => () => clearTimers(), []);

  if (!toast) return null;

  if (toast.kind === 'undo') {
    return (
      <div className="toast toast--undo" role="status" aria-live="polite">
        <div
          className="toast__progress"
          style={{ width: `${undoProgress}%` }}
          aria-hidden
        />
        <div className="toast__body">
          <p className="toast__message">{toast.message}</p>
          <button
            type="button"
            className="toast__undo"
            onClick={() => {
              clearTimers();
              toast.onUndo();
              setToast(null);
              setUndoProgress(100);
            }}
          >
            Desfazer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`toast toast--${toast.type}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      {toast.message}
    </div>
  );
}
