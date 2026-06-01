import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

function initTheme() {
  const stored = localStorage.getItem('studeo:theme');
  let resolved: 'light' | 'dark' = 'light';
  if (stored === 'dark') resolved = 'dark';
  else if (stored === 'light') resolved = 'light';
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) resolved = 'dark';
  document.documentElement.setAttribute('data-theme', resolved);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0f172a' : '#0c4a6e');
}

initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
