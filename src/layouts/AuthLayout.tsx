import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__blob auth-layout__blob--left" aria-hidden />
      <div className="auth-layout__blob auth-layout__blob--right" aria-hidden />
      <main className="auth-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
