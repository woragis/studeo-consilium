import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { getLessonById, lessonPath } from '../data/lessons';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { GoalActionsMenu } from '../components/GoalActionsMenu';
import { GoalStatusIcon, goalStatusLabel } from '../components/GoalStatusIcon';
import { Button } from '../components/ui/Button';
import { LinkButton } from '../components/ui/LinkButton';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { getFirstIncompleteModuleIndex } from '../lib/lesson-progress';
import { useDeferredDelete } from '../hooks/useDeferredDelete';
import { duplicateBlockedMessage, findDuplicateKind, goalDuplicatePools } from '../lib/strings';
import { addXp, levelFromXp } from '../lib/xp';
import { showToast } from '../lib/toast';
import type { DailyGoalStatus } from '../types';

export function HomePage() {
  const { profile, updateProfile } = useAuth();
  const profileRef = useRef(profile);
  profileRef.current = profile;
  const { schedule, isHidden } = useDeferredDelete();
  const [popId, setPopId] = useState<string | null>(null);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [pendingDelete, setPendingDelete] = useState<{ id: string; label: string } | null>(null);

  if (!profile) return null;

  const lesson = getLessonById(profile.lastRecommendedLessonId);
  const dailyGoals = profile.dailyGoals.filter((g) => !isHidden(`daily-${g.id}`));
  const pendingGoals = dailyGoals.filter((g) => g.status !== 'concluida');
  const remaining = pendingGoals.length;
  const allGoalsDone = dailyGoals.length > 0 && remaining === 0;

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

  function startEditGoal(id: string, title: string) {
    setEditingGoalId(id);
    setEditTitle(title);
  }

  function cancelEditGoal() {
    setEditingGoalId(null);
    setEditTitle('');
  }

  function saveEditGoal(e: FormEvent) {
    e.preventDefault();
    if (!profile || !editingGoalId || !editTitle.trim()) return;

    const currentGoal = profile.dailyGoals.find((g) => g.id === editingGoalId);
    if (!currentGoal) return;

    const trimmed = editTitle.trim();
    if (trimmed === currentGoal.title) {
      cancelEditGoal();
      return;
    }

    const duplicate = findDuplicateKind(trimmed, goalDuplicatePools({
      ...profile,
      dailyGoals: profile.dailyGoals.filter((g) => g.id !== editingGoalId),
    }));
    if (duplicate) {
      showToast(duplicateBlockedMessage(trimmed, duplicate, 'meta do dia'), 'error');
      return;
    }

    updateProfile({
      dailyGoals: profile.dailyGoals.map((g) =>
        g.id === editingGoalId ? { ...g, title: trimmed } : g,
      ),
    });
    cancelEditGoal();
    showToast('Meta atualizada.', 'success');
  }

  function confirmDeleteGoal() {
    if (!pendingDelete) return;

    const { id, label } = pendingDelete;
    schedule(`daily-${id}`, {
      message: `Meta «${label}» removida. Você pode desfazer.`,
      undoMessage: 'Meta do dia restaurada.',
      onCommit: () => {
        const current = profileRef.current;
        if (!current) return;
        updateProfile({
          dailyGoals: current.dailyGoals.filter((g) => g.id !== id),
        });
      },
    });
    setPendingDelete(null);
  }

  return (
    <div className="page home-page">
      <header className="page__hero">
        <h2>Seja bem-vindo, {profile.firstName}</h2>
        <p>Continue de onde parou e veja suas metas do dia.</p>
      </header>

      <div className="home-page__grid">
        <Card title="Aula recomendada" className="home-page__lesson">
          {lesson ? (
            <Link
              to={`${lessonPath(lesson)}?m=${getFirstIncompleteModuleIndex(lesson, profile.moduleProgress)}`}
              className="lesson-preview"
            >
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
            {dailyGoals.map((goal) => (
              <li key={goal.id} className="goal-list__item stagger-item">
                {editingGoalId === goal.id ? (
                  <form className="goal-list__edit-form" onSubmit={saveEditGoal}>
                    <Input
                      label="Editar meta"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                    />
                    <div className="goal-list__edit-actions">
                      <Button type="submit" variant="accent" className="btn--inline">
                        Salvar
                      </Button>
                      <Button type="button" variant="ghost" className="btn--inline" onClick={cancelEditGoal}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <button
                      type="button"
                      className="goal-status-btn"
                      onClick={() => toggleGoal(goal.id)}
                      aria-label={`Alternar meta: ${goal.title} (${goalStatusLabel(goal.status)})`}
                    >
                      <GoalStatusIcon status={goal.status} pop={popId === goal.id} />
                    </button>
                    <button
                      type="button"
                      className="goal-list__content"
                      onClick={() => toggleGoal(goal.id)}
                    >
                      <span>{goal.title}</span>
                      <small className={`goal-list__status goal-list__status--${goal.status}`}>
                        {goalStatusLabel(goal.status)}
                      </small>
                    </button>
                    <GoalActionsMenu
                      goalTitle={goal.title}
                      onEdit={() => startEditGoal(goal.id, goal.title)}
                      onDelete={() => setPendingDelete({ id: goal.id, label: goal.title })}
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="goals-card__status">
            {allGoalsDone ? (
              <p className="goals-complete">Todas as metas de hoje concluídas!</p>
            ) : remaining > 0 ? (
              <p className="goals-remaining">{remaining} metas restantes</p>
            ) : null}
          </div>
          <div className="goals-card__footer">
            <Link to="/metas" className="text-link">
              Gerenciar metas
            </Link>
          </div>
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

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Excluir meta?"
        message={
          pendingDelete
            ? `Tem certeza que deseja remover "${pendingDelete.label}"? Você terá alguns segundos para desfazer depois.`
            : ''
        }
        confirmLabel="Sim, excluir"
        cancelLabel="Não, manter"
        variant="danger"
        onConfirm={confirmDeleteGoal}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
