export function AppHeader({ section }: { section: string }) {
  return (
    <header className="app-header">
      <span className="app-header__section">{section}</span>
      <h1 className="app-header__brand">STUDEO CONSILIUM</h1>
    </header>
  );
}
