import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isSubjectId } from '../data/lessons';
import { getSubject } from '../data/subjects';
import { AppHeader } from '../components/AppHeader';
import { AppSidebar } from '../components/AppSidebar';
import { MobileNav } from '../components/MobileNav';
import { PageTransition } from '../components/PageTransition';
import { DeferredDeleteProvider } from '../context/DeferredDeleteContext';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

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
  if (pathname.match(/^\/aulas\/[^/]+\/[^/]+/)) return 'Assunto';
  if (pathname.startsWith('/aulas/')) {
    const segment = pathname.split('/')[2];
    if (segment && isSubjectId(segment)) {
      return getSubject(segment)?.name ?? 'Aulas';
    }
  }
  if (pathname === '/tarefas/nova') return 'Estudos';
  return sectionTitles[pathname] ?? 'Studeo';
}

function AppShell() {
  const { pathname } = useLocation();
  const section = resolveSection(pathname);
  const { open, close, pinned } = useSidebar();

  useEffect(() => {
    if (pinned) return;
    close();
  }, [pathname, close, pinned]);

  useEffect(() => {
    if (!open || pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, pinned]);

  return (
    <div className={`app-shell ${open ? 'app-shell--sidebar-open' : ''} ${pinned ? 'app-shell--sidebar-pinned' : ''}`.trim()}>
      <AppHeader section={section} />
      {!pinned && open && (
        <button
          type="button"
          className="app-sidebar-backdrop"
          onClick={close}
          aria-label="Fechar menu"
        />
      )}
      <div className="app-shell__body">
        <AppSidebar />
        <main className="app-shell__content">
          <PageTransition />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

export function AppLayout() {
  return (
    <DeferredDeleteProvider>
      <SidebarProvider>
        <AppShell />
      </SidebarProvider>
    </DeferredDeleteProvider>
  );
}
