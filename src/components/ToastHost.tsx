import { useEffect, useState } from 'react';
import { subscribeToast } from '../lib/toast';

export function ToastHost() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  useEffect(() => {
    return subscribeToast((message, type) => {
      setToast({ message, type });
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    });
  }, []);

  if (!toast) return null;

  return (
    <div className={`toast toast--${toast.type}`} role="status">
      {toast.message}
    </div>
  );
}
