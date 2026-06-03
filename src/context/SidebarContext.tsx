import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const DESKTOP_PIN = 1200;
const STORAGE_KEY = 'studeo:sidebar-open';

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
  pinned: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function isDesktopViewport() {
  return typeof window !== 'undefined' && window.matchMedia(`(min-width: ${DESKTOP_PIN}px)`).matches;
}

function readStoredOpen(): boolean | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return null;
}

function writeStoredOpen(open: boolean) {
  localStorage.setItem(STORAGE_KEY, String(open));
}

function initialOpen() {
  const stored = readStoredOpen();
  if (stored !== null) return stored;
  return isDesktopViewport();
}

function usePinnedLayout() {
  const [pinned, setPinned] = useState(isDesktopViewport);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_PIN}px)`);
    const update = () => setPinned(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return pinned;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const pinned = usePinnedLayout();
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    if (pinned) {
      setOpen(readStoredOpen() ?? true);
      return;
    }
    setOpen(false);
  }, [pinned]);

  const setOpenPersisted = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (pinned) writeStoredOpen(next);
    },
    [pinned],
  );

  const toggle = useCallback(() => {
    setOpen((current) => {
      const next = !current;
      if (pinned) writeStoredOpen(next);
      return next;
    });
  }, [pinned]);

  const close = useCallback(() => {
    setOpenPersisted(false);
  }, [setOpenPersisted]);

  const value = useMemo(
    () => ({ open, toggle, close, pinned }),
    [open, toggle, close, pinned],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}

export function useSidebarOptional() {
  return useContext(SidebarContext);
}
