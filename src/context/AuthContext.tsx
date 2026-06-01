import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createEmptyProfile } from '../data/demo-user';
import {
  ensureDemoUser,
  findUserByEmail,
  getProfile,
  getUsers,
  registerUser,
  saveProfile,
} from '../lib/storage';
import { clearSession, getSession, setSession } from '../lib/session';
import { showToast } from '../lib/toast';
import { levelFromXp } from '../lib/xp';
import type { UserProfile, UserRecord } from '../types';

interface AuthContextValue {
  user: UserRecord | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  loginDemo: (remember?: boolean) => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function establishSession(user: UserRecord, remember: boolean) {
  setSession({ userId: user.id, remember });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback((userId: string) => {
    ensureDemoUser();
    const record = getUsers().find((u) => u.id === userId);
    if (!record) {
      clearSession();
      setUser(null);
      setProfile(null);
      return;
    }
    const prof = getProfile(userId);
    setUser(record);
    setProfile(prof);
  }, []);

  useEffect(() => {
    ensureDemoUser();
    const session = getSession();
    if (session?.userId) {
      loadUser(session.userId);
    }
    setLoading(false);
  }, [loadUser]);

  const login = useCallback(
    async (email: string, password: string, remember = false) => {
      ensureDemoUser();
      const record = findUserByEmail(email);
      if (!record || record.password !== password) {
        throw new Error('E-mail ou senha incorretos. Verifique os dados e tente novamente.');
      }
      establishSession(record, remember);
      loadUser(record.id);
      showToast(`Bem-vindo de volta, ${record.firstName}!`, 'success');
    },
    [loadUser],
  );

  const loginDemo = useCallback(
    (remember = false) => {
      const record = ensureDemoUser();
      establishSession(record, remember);
      loadUser(record.id);
      showToast('Conta demonstração carregada.', 'info');
    },
    [loadUser],
  );

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) => {
      const record: UserRecord = {
        id: crypto.randomUUID(),
        email: email.trim().toLowerCase(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
      registerUser(record);
      establishSession(record, false);
      setUser(record);
      setProfile(createEmptyProfile(record));
      showToast('Conta criada com sucesso!', 'success');
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setProfile(null);
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<UserProfile>) => {
      if (!profile) return;
      const xp = patch.xp ?? profile.xp;
      const level = levelFromXp(xp);
      const prevLevel = profile.level;
      const next = { ...profile, ...patch, xp, level };
      saveProfile(next);
      setProfile(next);
      if (level > prevLevel) {
        showToast(`Parabéns! Você alcançou o nível ${level}!`, 'success');
      }
    },
    [profile],
  );

  const refreshProfile = useCallback(() => {
    if (!user) return;
    const prof = getProfile(user.id);
    if (prof) setProfile(prof);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      login,
      loginDemo,
      register,
      logout,
      updateProfile,
      refreshProfile,
    }),
    [
      user,
      profile,
      loading,
      login,
      loginDemo,
      register,
      logout,
      updateProfile,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
