import { Outlet, useLocation } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppSidebar } from '../components/AppSidebar';

const sectionTitles: Record<string, string> = {
  '/': 'Início',
  '/aulas': 'Aulas',
  '/estudos': 'Estudos',
  '/metas': 'Metas',
  '/perfil': 'Perfil',
  '/ajuda': 'Ajuda',
  '/auditoria-ux': 'Auditoria',
};

function resolveSection(pathname: string): string {
  if (pathname.startsWith('/aulas/')) return 'Aula';
  if (pathname === '/tarefas/nova') return 'Estudos';
  return sectionTitles[pathname] ?? 'Studeo';
}

export function AppLayout() {
  const { pathname } = useLocation();
  const section = resolveSection(pathname);

  return (
    <div className="app-shell">
      <AppHeader section={section} />
      <div className="app-shell__body">
        <AppSidebar />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
