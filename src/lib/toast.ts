type ToastType = 'success' | 'error' | 'info';

export type ToastEvent =
  | { kind: 'simple'; message: string; type: ToastType }
  | { kind: 'undo'; message: string; durationMs: number; onUndo: () => void };

type ToastListener = (event: ToastEvent) => void;

let listener: ToastListener | null = null;

export function subscribeToast(fn: ToastListener) {
  listener = fn;
  return () => {
    listener = null;
  };
}

export function showToast(message: string, type: ToastType = 'info') {
  listener?.({ kind: 'simple', message, type });
}

export function showUndoToast(
  message: string,
  onUndo: () => void,
  durationMs = 5000,
) {
  listener?.({ kind: 'undo', message, durationMs, onUndo });
}
