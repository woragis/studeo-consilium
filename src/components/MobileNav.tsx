import { BookOpen, Home, MoreHorizontal, Play, User } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MobileMoreSheet } from './MobileMoreSheet';

const items = [
  { to: '/', icon: Home, label: 'Início', end: true },
  { to: '/aulas', icon: BookOpen, label: 'Aulas' },
  { to: '/estudos', icon: Play, label: 'Estudos' },
  { to: '/perfil', icon: User, label: 'Perfil' },
];

const moreRoutes = ['/metas', '/ajuda', '/auditoria-ux'];

export function MobileNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();
  const moreActive = moreRoutes.some((r) => pathname.startsWith(r));

  return (
    <>
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
        <button
          type="button"
          className={`mobile-nav__link mobile-nav__more ${moreActive ? 'mobile-nav__link--active' : ''}`}
          onClick={() => setMoreOpen(true)}
          aria-expanded={moreOpen}
          aria-haspopup="dialog"
        >
          <MoreHorizontal size={22} strokeWidth={2} aria-hidden />
          <span>Mais</span>
        </button>
      </nav>
      <MobileMoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
