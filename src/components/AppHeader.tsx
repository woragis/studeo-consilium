import { Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSidebarOptional } from '../context/SidebarContext';

export function AppHeader({ section }: { section: string }) {
  const sidebar = useSidebarOptional();

  return (
    <header className="app-header">
      {sidebar && (
        <button
          type="button"
          className="app-header__menu"
          onClick={sidebar.toggle}
          aria-expanded={sidebar.open}
          aria-controls="app-sidebar"
          aria-label={sidebar.open ? 'Fechar menu' : 'Abrir menu'}
        >
          <Menu size={22} aria-hidden />
        </button>
      )}
      <Link to="/" className="app-header__section app-header__link">
        {section}
      </Link>
      <Link to="/" className="app-header__brand app-header__link">
        STUDEO CONSILIUM
      </Link>
      <Link
        to="/perfil"
        className="app-header__profile app-header__link"
        title="Meu perfil"
        aria-label="Meu perfil"
      >
        <User size={20} strokeWidth={1.75} aria-hidden />
      </Link>
    </header>
  );
}
