import { useRef, useState, type FormEvent } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { GoalActionsMenu } from '../components/GoalActionsMenu';
import { GoalStatusIcon, goalStatusLabel } from '../components/GoalStatusIcon';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useDeferredDelete } from '../hooks/useDeferredDelete';
import {
  duplicateBlockedMessage,
  findDuplicateKind,
  goalDuplicatePools,
} from '../lib/strings';
import { showToast } from '../lib/toast';
import type { DailyGoalStatus } from '../types';

type PendingDelete =
  | { type: 'longTerm'; id: string; label: string }
  | { type: 'daily'; id: string; label: string };

export function GoalsPage() {
  const { profile, updateProfile } = useAuth();
  const profileRef = useRef(profile);
  profileRef.current = profile;
  const [newGoal, setNewGoal] = useState('');
  const [newDaily, setNewDaily] = useState('');
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [editingLongTermId, setEditingLongTermId] = useState<string | null>(null);
  const [editLongTermTitle, setEditLongTermTitle] = useState('');
  const [popLongTermId, setPopLongTermId] = useState<string | null>(null);
  const { schedule, isHidden } = useDeferredDelete();

  if (!profile) return null;

  const visibleDailyGoals = profile.dailyGoals.filter((g) => !isHidden(`daily-${g.id}`));
  const visibleLongTermGoals = profile.longTermGoals.filter((g) => !isHidden(`longTerm-${g.id}`));

  function confirmDelete() {
    if (!profile || !pendingDelete) return;

    if (pendingDelete.type === 'longTerm') {
      const { id, label } = pendingDelete;
      schedule(`longTerm-${id}`, {
        message: `Meta «${label}» removida. Você pode desfazer.`,
        undoMessage: 'Meta restaurada.',
        onCommit: () => {
          const current = profileRef.current;
          if (!current) return;
          updateProfile({
            longTermGoals: current.longTermGoals.filter((g) => g.id !== id),
          });
        },
      });
    } else {
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
    }

    setPendingDelete(null);
  }

  function addLongTerm(e: FormEvent) {
    e.preventDefault();
    if (!profile || !newGoal.trim()) return;

    const duplicate = findDuplicateKind(newGoal, goalDuplicatePools(profile));
    if (duplicate) {
      showToast(duplicateBlockedMessage(newGoal, duplicate, 'meta de longo prazo'), 'error');
      return;
    }

    updateProfile({
      longTermGoals: [
        ...profile.longTermGoals,
        { id: crypto.randomUUID(), title: newGoal.trim(), status: 'pendente' },
      ],
    });
    setNewGoal('');
    showToast('Meta de longo prazo adicionada.', 'success');
  }

  function addDaily(e: FormEvent) {
    e.preventDefault();
    if (!profile || !newDaily.trim()) return;

    const duplicate = findDuplicateKind(newDaily, goalDuplicatePools(profile));
    if (duplicate) {
      showToast(duplicateBlockedMessage(newDaily, duplicate, 'meta do dia'), 'error');
      return;
    }

    updateProfile({
      dailyGoals: [
        ...profile.dailyGoals,
        { id: crypto.randomUUID(), title: newDaily.trim(), status: 'pendente' },
      ],
    });
    setNewDaily('');
    showToast('Meta do dia adicionada.', 'success');
  }

  function toggleLongTermGoal(id: string) {
    if (!profile) return;
    setPopLongTermId(id);
    setTimeout(() => setPopLongTermId(null), 350);

    const longTermGoals = profile.longTermGoals.map((g) => {
      if (g.id !== id) return g;
      const nextStatus: DailyGoalStatus =
        g.status === 'pendente'
          ? 'em_andamento'
          : g.status === 'em_andamento'
            ? 'concluida'
            : 'pendente';
      return { ...g, status: nextStatus };
    });

    updateProfile({ longTermGoals });
    const goal = longTermGoals.find((g) => g.id === id);
    if (goal?.status === 'em_andamento') {
      showToast('Meta em andamento — continue assim!', 'info');
    } else if (goal?.status === 'concluida') {
      showToast('Meta de longo prazo concluída!', 'success');
    }
  }

  function startEditLongTerm(id: string, title: string) {
    setEditingLongTermId(id);
    setEditLongTermTitle(title);
  }

  function cancelEditLongTerm() {
    setEditingLongTermId(null);
    setEditLongTermTitle('');
  }

  function saveEditLongTerm(e: FormEvent) {
    e.preventDefault();
    if (!profile || !editingLongTermId || !editLongTermTitle.trim()) return;

    const currentGoal = profile.longTermGoals.find((g) => g.id === editingLongTermId);
    if (!currentGoal) return;

    const trimmed = editLongTermTitle.trim();
    if (trimmed === currentGoal.title) {
      cancelEditLongTerm();
      return;
    }

    const duplicate = findDuplicateKind(trimmed, goalDuplicatePools({
      ...profile,
      longTermGoals: profile.longTermGoals.filter((g) => g.id !== editingLongTermId),
    }));
    if (duplicate) {
      showToast(duplicateBlockedMessage(trimmed, duplicate, 'meta de longo prazo'), 'error');
      return;
    }

    updateProfile({
      longTermGoals: profile.longTermGoals.map((g) =>
        g.id === editingLongTermId ? { ...g, title: trimmed } : g,
      ),
    });
    cancelEditLongTerm();
    showToast('Meta atualizada.', 'success');
  }

  return (
    <div className="page goals-page">
      <header className="page__hero">
        <h2>Metas</h2>
        <p>Organize o que fazer hoje e seus objetivos para o vestibular.</p>
      </header>

      <div className="goals-page__grid">
        <Card title="Metas de hoje">
          <ul className="goal-list">
            {visibleDailyGoals.map((g) => (
              <li key={g.id} className="goal-list__item">
                <GoalStatusIcon status={g.status} />
                <span className="goal-list__content">
                  <span>{g.title}</span>
                  <small className={`goal-list__status goal-list__status--${g.status}`}>
                    {goalStatusLabel(g.status)}
                  </small>
                </span>
                <button
                  type="button"
                  className="goal-list__remove"
                  onClick={() => setPendingDelete({ type: 'daily', id: g.id, label: g.title })}
                  aria-label={`Remover meta ${g.title}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addDaily} className="inline-form">
            <Input
              label="Nova meta do dia"
              value={newDaily}
              onChange={(e) => setNewDaily(e.target.value)}
            />
            <Button type="submit">Adicionar</Button>
          </form>
        </Card>

        <Card title="Metas de longo prazo">
          <ul className="goal-list">
            {visibleLongTermGoals.map((goal) => (
              <li key={goal.id} className="goal-list__item">
                {editingLongTermId === goal.id ? (
                  <form className="goal-list__edit-form" onSubmit={saveEditLongTerm}>
                    <Input
                      label="Editar meta"
                      value={editLongTermTitle}
                      onChange={(e) => setEditLongTermTitle(e.target.value)}
                      autoFocus
                    />
                    <div className="goal-list__edit-actions">
                      <Button type="submit" variant="accent" className="btn--inline">
                        Salvar
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="btn--inline"
                        onClick={cancelEditLongTerm}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <button
                      type="button"
                      className="goal-status-btn"
                      onClick={() => toggleLongTermGoal(goal.id)}
                      aria-label={`Alternar meta: ${goal.title} (${goalStatusLabel(goal.status)})`}
                    >
                      <GoalStatusIcon status={goal.status} pop={popLongTermId === goal.id} />
                    </button>
                    <button
                      type="button"
                      className="goal-list__content"
                      onClick={() => toggleLongTermGoal(goal.id)}
                    >
                      <span>{goal.title}</span>
                      <small className={`goal-list__status goal-list__status--${goal.status}`}>
                        {goalStatusLabel(goal.status)}
                      </small>
                    </button>
                    <GoalActionsMenu
                      goalTitle={goal.title}
                      onEdit={() => startEditLongTerm(goal.id, goal.title)}
                      onDelete={() =>
                        setPendingDelete({ type: 'longTerm', id: goal.id, label: goal.title })
                      }
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={addLongTerm} className="inline-form">
            <Input label="Nova meta" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} />
            <Button type="submit">Adicionar</Button>
          </form>
        </Card>
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
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
