import { RouterProvider } from 'react-router-dom';
import { LevelUpOverlay } from './components/LevelUpOverlay';
import { ToastHost } from './components/ToastHost';
import { AuthProvider } from './context/AuthContext';
import { StudyTimerProvider } from './context/StudyTimerContext';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './routes/router';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StudyTimerProvider>
          <RouterProvider router={router} />
          <ToastHost />
          <LevelUpOverlay />
        </StudyTimerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
