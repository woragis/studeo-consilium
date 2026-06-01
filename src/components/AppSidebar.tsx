import {
  BookOpen,
  ClipboardList,
  HelpCircle,
  Home,
  LogOut,
  Play,
  Settings,
  Target,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../lib/toast';
import { ThemeToggle } from './ThemeToggle';

const mainNav = [
  { to: '/', icon: Home, label: 'Início', end: true },
  { to: '/aulas', icon: BookOpen, label: 'Aulas' },
  { to: '/estudos', icon: Play, label: 'Estudos' },
  { to: '/metas', icon: Target, label: 'Metas' },
  { to: '/perfil', icon: Settings, label: 'Perfil' },
];

const secondaryNav = [
  { to: '/ajuda', icon: HelpCircle, label: 'Ajuda' },
  { to: '/auditoria-ux', icon: ClipboardList, label: 'Auditoria UX' },
];

export function AppSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    showToast('Você saiu da sua conta.', 'info');
    navigate('/login');
  }

  return (
    <aside className="app-sidebar" aria-label="Navegação principal">
      <nav className="app-sidebar__nav">
        {mainNav.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
            }
          >
            <Icon size={20} aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
        <div className="app-sidebar__divider" />
        {secondaryNav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
            }
          >
            <Icon size={20} aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="app-sidebar__theme">
        <ThemeToggle compact />
      </div>
      <button type="button" className="app-sidebar__logout" onClick={handleLogout}>
        <LogOut size={20} aria-hidden />
        <span>Sair</span>
      </button>
    </aside>
  );
}
