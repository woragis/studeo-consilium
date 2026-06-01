type ToastListener = (message: string, type: 'success' | 'error' | 'info') => void;

let listener: ToastListener | null = null;

export function subscribeToast(fn: ToastListener) {
  listener = fn;
  return () => {
    listener = null;
  };
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  listener?.(message, type);
}
