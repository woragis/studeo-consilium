import {
  BookOpen,
  HelpCircle,
  Home,
  LogOut,
  Play,
  Settings,
  Target,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { showToast } from '../lib/toast';
import { ThemeToggle } from './ThemeToggle';

const mainNav = [
  { to: '/', icon: Home, label: 'Início', end: true },
  { to: '/aulas', icon: BookOpen, label: 'Aulas' },
  { to: '/estudos', icon: Play, label: 'Estudos' },
  { to: '/metas', icon: Target, label: 'Metas' },
  { to: '/perfil', icon: Settings, label: 'Perfil' },
];

export function AppSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { open, close, pinned } = useSidebar();

  function handleLogout() {
    logout();
    showToast('Você saiu da sua conta.', 'info');
    close();
    navigate('/login');
  }

  function handleNavigate() {
    if (!pinned) close();
  }

  return (
    <aside
      id="app-sidebar"
      className={`app-sidebar ${open ? 'app-sidebar--open' : ''} ${pinned ? 'app-sidebar--pinned' : ''}`.trim()}
      aria-label="Navegação principal"
      aria-hidden={!open}
    >
      <nav className="app-sidebar__nav">
        {mainNav.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={handleNavigate}
            className={({ isActive }) =>
              `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
            }
          >
            <Icon size={20} aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
        <div className="app-sidebar__divider" />
        <NavLink
          to="/ajuda"
          onClick={handleNavigate}
          className={({ isActive }) =>
            `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
          }
        >
          <HelpCircle size={20} aria-hidden />
          <span>Ajuda</span>
        </NavLink>
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
