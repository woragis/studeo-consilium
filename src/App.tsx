import { RouterProvider } from 'react-router-dom';
import { ToastHost } from './components/ToastHost';
import { AuthProvider } from './context/AuthContext';
import { StudyTimerProvider } from './context/StudyTimerContext';
import { router } from './routes/router';

export default function App() {
  return (
    <AuthProvider>
      <StudyTimerProvider>
        <RouterProvider router={router} />
        <ToastHost />
      </StudyTimerProvider>
    </AuthProvider>
  );
}
