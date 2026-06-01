import { Link } from 'react-router-dom';

export function AppHeader({ section }: { section: string }) {
  return (
    <header className="app-header">
      <Link to="/" className="app-header__section app-header__link">
        {section}
      </Link>
      <Link to="/" className="app-header__brand app-header__link">
        STUDEO CONSILIUM
      </Link>
      <Link to="/perfil" className="app-header__profile app-header__link" title="Meu perfil">
        Perfil
      </Link>
    </header>
  );
}
