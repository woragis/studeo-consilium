import { BookOpen, Home, Play, Target, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', icon: Home, label: 'Início', end: true },
  { to: '/aulas', icon: BookOpen, label: 'Aulas' },
  { to: '/estudos', icon: Play, label: 'Estudos' },
  { to: '/metas', icon: Target, label: 'Metas' },
  { to: '/perfil', icon: User, label: 'Perfil' },
];

export function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Navegação principal mobile">
      {items.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`
          }
        >
          <Icon size={22} strokeWidth={2} aria-hidden />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
