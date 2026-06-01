import {
  BookOpen,
  Circle,
  Diamond,
  HelpCircle,
  Home,
  LogOut,
  Play,
  Settings,
  Square,
  Star,
  Target,
  CheckSquare,
  Menu,
  ClipboardList,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

/** Ícones decorativos do protótipo Figma (sem rota) */
const decorative = [Star, Menu, Square, Diamond, Play, Circle, CheckSquare];

export function AppSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="app-sidebar" aria-label="Navegação principal">
      <div className="app-sidebar__decor" aria-hidden>
        {decorative.map((Icon, i) => (
          <span key={i} className="app-sidebar__decor-icon">
            <Icon size={18} strokeWidth={1.5} />
          </span>
        ))}
      </div>
      <nav className="app-sidebar__nav">
        {mainNav.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `app-sidebar__link ${isActive ? 'app-sidebar__link--active' : ''}`
            }
            title={label}
          >
            <Icon size={20} />
            <span className="sr-only">{label}</span>
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
            title={label}
          >
            <Icon size={20} />
            <span className="sr-only">{label}</span>
          </NavLink>
        ))}
      </nav>
      <button type="button" className="app-sidebar__logout" onClick={handleLogout} title="Sair">
        <LogOut size={20} />
        <span className="sr-only">Sair</span>
      </button>
    </aside>
  );
}
