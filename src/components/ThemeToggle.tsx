import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme, type ThemeMode } from '../context/ThemeContext';

const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
  { mode: 'light', label: 'Claro', icon: Sun },
  { mode: 'dark', label: 'Escuro', icon: Moon },
  { mode: 'system', label: 'Automático', icon: SunMoon },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useTheme();

  return (
    <div className={`theme-toggle ${compact ? 'theme-toggle--compact' : ''}`} role="group" aria-label="Tema da interface">
      {!compact && <span className="theme-toggle__label">Aparência</span>}
      <div className="theme-toggle__options">
        {options.map(({ mode: m, label, icon: Icon }) => (
          <button
            key={m}
            type="button"
            className={`theme-toggle__btn ${mode === m ? 'theme-toggle__btn--active' : ''}`}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
          >
            <Icon size={16} aria-hidden />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
