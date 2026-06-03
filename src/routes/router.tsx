import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { GoalsPage } from '../pages/GoalsPage';
import { HelpPage } from '../pages/HelpPage';
import { HomePage } from '../pages/HomePage';
import { LessonDetailPage } from '../pages/LessonDetailPage';
import { LessonsSegmentPage } from '../pages/LessonsSegmentPage';
import { LoginPage } from '../pages/LoginPage';
import { NewTaskPage } from '../pages/NewTaskPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RegisterPage } from '../pages/RegisterPage';
import { StudiesPage } from '../pages/StudiesPage';
import { SubjectOverviewPage } from '../pages/SubjectOverviewPage';
import { UxAuditPage } from '../pages/UxAuditPage';
import { RequireAuth } from './RequireAuth';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/cadastro', element: <RegisterPage /> },
      { path: '/esqueci-senha', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/aulas', element: <SubjectOverviewPage /> },
      { path: '/aulas/:subjectId', element: <LessonsSegmentPage /> },
      { path: '/aulas/:subjectId/:slug', element: <LessonDetailPage /> },
      { path: '/estudos', element: <StudiesPage /> },
      { path: '/tarefas/nova', element: <NewTaskPage /> },
      { path: '/metas', element: <GoalsPage /> },
      { path: '/perfil', element: <ProfilePage /> },
      { path: '/ajuda', element: <HelpPage /> },
      { path: '/auditoria-ux', element: <UxAuditPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
