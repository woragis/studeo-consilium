import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { LinkButton } from '../components/ui/LinkButton';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { addXp, levelFromXp } from '../lib/xp';
import { showToast } from '../lib/toast';
import type { DailyGoalStatus } from '../types';

export function HomePage() {
  const { profile, updateProfile } = useAuth();
  const [popId, setPopId] = useState<string | null>(null);

  if (!profile) return null;

  const lesson = getLessonById(profile.lastRecommendedLessonId);
  const pendingGoals = profile.dailyGoals.filter((g) => g.status !== 'concluida');
  const remaining = pendingGoals.length;

  function toggleGoal(id: string) {
    if (!profile) return;
    setPopId(id);
    setTimeout(() => setPopId(null), 350);

    let awardedXp = false;
    const dailyGoals = profile.dailyGoals.map((g) => {
      if (g.id !== id) return g;
      const nextStatus: DailyGoalStatus =
        g.status === 'pendente'
          ? 'em_andamento'
          : g.status === 'em_andamento'
            ? 'concluida'
            : 'pendente';
      if (nextStatus === 'concluida' && g.status !== 'concluida') {
        awardedXp = true;
      }
      return { ...g, status: nextStatus };
    });

    if (awardedXp) {
      const xp = addXp(profile.xp, 5);
      updateProfile({ dailyGoals, xp, level: levelFromXp(xp) });
      showToast('Meta do dia concluída! +5 XP', 'success');
    } else {
      updateProfile({ dailyGoals });
      const goal = dailyGoals.find((g) => g.id === id);
      if (goal?.status === 'em_andamento') {
        showToast('Meta em andamento — continue assim!', 'info');
      }
    }
  }

  return (
    <div className="page home-page">
      <header className="page__hero">
        <h2>Seja bem-vindo, {profile.firstName}</h2>
        <p>Continue de onde você parou e acompanhe suas metas do dia.</p>
      </header>

      <div className="home-page__grid">
        <Card title="Aula recomendada" className="home-page__lesson">
          {lesson ? (
            <Link to={`/aulas/${lesson.slug}`} className="lesson-preview">
              <div className="lesson-thumb" aria-hidden />
              <h3 className="lesson-thumb__title">{lesson.title}</h3>
              <span className="lesson-preview__cta">Continuar aula →</span>
            </Link>
          ) : (
            <Link to="/aulas" className="text-link">
              Explorar catálogo de aulas
            </Link>
          )}
        </Card>

        <Card title="Metas de hoje" className="home-page__goals">
          <ul className="goal-list">
            {profile.dailyGoals.map((goal) => (
              <li key={goal.id} className="goal-list__item stagger-item">
                <button
                  type="button"
                  className={`goal-checkbox goal-checkbox--${goal.status} ${popId === goal.id ? 'goal-checkbox--pop' : ''}`}
                  onClick={() => toggleGoal(goal.id)}
                  aria-label={`Alternar meta: ${goal.title}`}
                />
                <button
                  type="button"
                  className="goal-list__content"
                  onClick={() => toggleGoal(goal.id)}
                >
                  <span>{goal.title}</span>
                  <small>
                    {goal.status === 'em_andamento'
                      ? 'Em andamento'
                      : goal.status === 'concluida'
                        ? 'Concluída'
                        : 'Pendente'}
                  </small>
                </button>
                <Link to="/metas" className="goal-list__edit" title="Gerenciar metas">
                  ⋯
                </Link>
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

      <div className="home-page__quick">
        <LinkButton to="/aulas" variant="ghost">
          Ver catálogo de aulas
        </LinkButton>
        <LinkButton to="/estudos" variant="ghost">
          Abrir cronômetro
        </LinkButton>
      </div>
    </div>
  );
}
