import { ClipboardList, HelpCircle, LogOut, Target, X } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../lib/toast';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { to: '/metas', icon: Target, label: 'Metas' },
  { to: '/ajuda', icon: HelpCircle, label: 'Ajuda' },
  { to: '/auditoria-ux', icon: ClipboardList, label: 'Auditoria UX' },
];

interface MobileMoreSheetProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMoreSheet({ open, onClose }: MobileMoreSheetProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleLogout() {
    logout();
    showToast('Você saiu da sua conta.', 'info');
    onClose();
    navigate('/login');
  }

  return (
    <div className="more-sheet" role="dialog" aria-modal="true" aria-label="Mais opções">
      <button type="button" className="more-sheet__backdrop" onClick={onClose} aria-label="Fechar" />
      <div className="more-sheet__panel">
        <header className="more-sheet__header">
          <h2>Mais</h2>
          <button type="button" className="more-sheet__close" onClick={onClose} aria-label="Fechar">
            <X size={22} />
          </button>
        </header>
        <nav className="more-sheet__nav">
          {links.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="more-sheet__link" onClick={onClose}>
              <Icon size={20} aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
        <div className="more-sheet__theme">
          <ThemeToggle />
        </div>
        <button type="button" className="more-sheet__logout" onClick={handleLogout}>
          <LogOut size={20} aria-hidden />
          Sair da conta
        </button>
      </div>
    </div>
  );
}
