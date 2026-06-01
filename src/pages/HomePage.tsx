import { Link } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import type { DailyGoalStatus } from '../types';

export function HomePage() {
  const { profile, updateProfile } = useAuth();
  if (!profile) return null;

  const lesson = getLessonById(profile.lastRecommendedLessonId);
  const pendingGoals = profile.dailyGoals.filter((g) => g.status !== 'concluida');
  const remaining = pendingGoals.length;

  function toggleGoal(id: string) {
    if (!profile) return;
    const dailyGoals = profile.dailyGoals.map((g) => {
      if (g.id !== id) return g;
      const nextStatus: DailyGoalStatus =
        g.status === 'pendente'
          ? 'em_andamento'
          : g.status === 'em_andamento'
            ? 'concluida'
            : 'pendente';
      return { ...g, status: nextStatus };
    });
    updateProfile({ dailyGoals });
  }

  return (
    <div className="page home-page">
      <header className="page__hero">
        <h2>Seja bem-vindo, {profile.firstName}</h2>
        <p>Continue de onde você parou e acompanhe suas metas do dia.</p>
      </header>

      <div className="home-page__grid">
        <Card title="Aula recomendada" className="home-page__lesson">
          <div className="lesson-thumb" aria-hidden />
          {lesson && (
            <>
              <h3 className="lesson-thumb__title">{lesson.title}</h3>
              <div className="lesson-thumb__actions">
                <Link to={`/aulas/${lesson.slug}`}>
                  <Button>Continuar aula</Button>
                </Link>
              </div>
            </>
          )}
        </Card>

        <Card title="Metas de hoje" className="home-page__goals">
          <ul className="goal-list">
            {profile.dailyGoals.map((goal) => (
              <li key={goal.id} className="goal-list__item">
                <button
                  type="button"
                  className={`goal-checkbox goal-checkbox--${goal.status}`}
                  onClick={() => toggleGoal(goal.id)}
                  aria-label={`Meta: ${goal.title}`}
                />
                <div>
                  <span>{goal.title}</span>
                  <small>
                    {goal.status === 'em_andamento'
                      ? 'Em andamento'
                      : goal.status === 'concluida'
                        ? 'Concluída'
                        : 'Pendente'}
                  </small>
                </div>
              </li>
            ))}
          </ul>
          {remaining > 0 && (
            <p className="goals-remaining">{remaining} metas restantes</p>
          )}
          <Link to="/metas" className="text-link">
            Gerenciar metas
          </Link>
        </Card>
      </div>

      <p className="home-page__catalog">
        <Link to="/aulas">Ver catálogo de aulas →</Link>
      </p>
    </div>
  );
}
