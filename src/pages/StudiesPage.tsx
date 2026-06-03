import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { subjects } from '../data/subjects';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LinkButton } from '../components/ui/LinkButton';
import { Card } from '../components/ui/Card';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { useAuth } from '../context/AuthContext';
import { useStudyTimer } from '../context/StudyTimerContext';
import { useDeferredDelete } from '../hooks/useDeferredDelete';
import { formatDuration } from '../lib/storage';
import { TIMER_TYPE_LABELS, timerSubtitle } from '../lib/study-timers';
import { showToast } from '../lib/toast';
import { addXp, levelFromXp } from '../lib/xp';
import type { StudyTimerType, SubjectId } from '../types';

export function StudiesPage() {
  const { profile, updateProfile } = useAuth();
  const {
    timers,
    activeTimerId,
    display,
    running,
    selectTimer,
    createTimer,
    deleteTimer,
    start,
    pause,
    finish,
  } = useStudyTimer();
  const [params, setParams] = useSearchParams();
  const [showDone, setShowDone] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
  const [pendingTimerDelete, setPendingTimerDelete] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [newType, setNewType] = useState<StudyTimerType>('materia');
  const [newName, setNewName] = useState('');
  const [newSubjectId, setNewSubjectId] = useState<SubjectId | ''>('fisica');
  const [newTaskId, setNewTaskId] = useState('');
  const [newGoalId, setNewGoalId] = useState('');
  const { schedule, isHidden } = useDeferredDelete();
  const profileRef = useRef(profile);
  profileRef.current = profile;

  useEffect(() => {
    const subject = params.get('subject') as SubjectId | null;
    if (subject && subjects.some((s) => s.id === subject)) {
      const match = timers.find((t) => t.subjectId === subject);
      if (match) {
        selectTimer(match.id);
        start();
        showToast(`Cronômetro «${match.name}» iniciado.`, 'info');
      }
      setParams({}, { replace: true });
    }
  }, [params, timers, selectTimer, start, setParams]);

  if (!profile) return null;

  const visibleTasksAll = profile.tasks.filter((t) => !isHidden(`task-${t.id}`));
  const pendingTasks = visibleTasksAll.filter((t) => !t.done);
  const doneTasks = visibleTasksAll.filter((t) => t.done);
  const visibleTasks = showDone ? visibleTasksAll : pendingTasks;

  function resetCreateForm() {
    setNewType('materia');
    setNewName('');
    setNewSubjectId('fisica');
    setNewTaskId('');
    setNewGoalId('');
    setShowCreateForm(false);
  }

  function handleCreateTimer() {
    const id = createTimer({
      type: newType,
      name: newName,
      subjectId: newType === 'materia' ? (newSubjectId || undefined) : newSubjectId || undefined,
      taskId: newType === 'tarefa' ? newTaskId || undefined : undefined,
      dailyGoalId: newType === 'meta' ? newGoalId || undefined : undefined,
    });
    if (id) selectTimer(id);
    resetCreateForm();
  }

  function handleSelectTimer(id: string) {
    selectTimer(id);
    const timer = timers.find((t) => t.id === id);
    if (timer) showToast(`Cronômetro ativo: ${timer.name}`, 'info');
  }

  function handleTaskStudy(taskId: string, subjectId?: SubjectId) {
    const linked = timers.find((t) => t.taskId === taskId);
    if (linked) {
      selectTimer(linked.id);
      start();
      return;
    }
    if (subjectId) {
      const bySubject = timers.find((t) => t.subjectId === subjectId && t.type === 'materia');
      if (bySubject) {
        selectTimer(bySubject.id);
        start();
        return;
      }
    }
    showToast('Crie um cronômetro para esta tarefa em Estudos.', 'info');
  }

  function toggleTask(id: string) {
    if (!profile) return;
    const task = profile.tasks.find((t) => t.id === id);
    const tasks = profile.tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
    const wasDone = task?.done;
    if (!wasDone && task) {
      const xp = addXp(profile.xp, 5);
      updateProfile({ tasks, xp, level: levelFromXp(xp) });
      showToast(`Tarefa concluída: ${task.title}. +5 XP`, 'success');
    } else {
      updateProfile({ tasks });
      showToast('Tarefa reaberta.', 'info');
    }
  }

  function confirmDeleteTask() {
    if (!profile || !pendingDelete) return;
    const { id, title } = pendingDelete;

    schedule(`task-${id}`, {
      message: `Tarefa «${title}» removida. Você pode desfazer.`,
      undoMessage: 'Tarefa restaurada.',
      onCommit: () => {
        const current = profileRef.current;
        if (!current) return;
        updateProfile({ tasks: current.tasks.filter((t) => t.id !== id) });
      },
    });
    setPendingDelete(null);
  }

  return (
    <div className="page studies-page">
      <div className="studies-page__grid">
        <Card
          title="Cronômetros"
          className="studies-page__timer"
          action={
            <Button
              type="button"
              variant="ghost"
              className="btn--inline"
              onClick={() => setShowCreateForm((v) => !v)}
            >
              {showCreateForm ? 'Cancelar' : 'Novo cronômetro'}
            </Button>
          }
        >
          {showCreateForm && (
            <div className="timer-create-form stack-form">
              <div className="field">
                <label htmlFor="timer-type">Tipo</label>
                <select
                  id="timer-type"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as StudyTimerType)}
                >
                  {(Object.keys(TIMER_TYPE_LABELS) as StudyTimerType[]).map((type) => (
                    <option key={type} value={type}>
                      {TIMER_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>

              {newType === 'materia' && (
                <div className="field">
                  <label htmlFor="timer-subject">Matéria</label>
                  <select
                    id="timer-subject"
                    value={newSubjectId}
                    onChange={(e) => setNewSubjectId(e.target.value as SubjectId)}
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {newType === 'tarefa' && (
                <div className="field">
                  <label htmlFor="timer-task">Tarefa</label>
                  <select
                    id="timer-task"
                    value={newTaskId}
                    onChange={(e) => setNewTaskId(e.target.value)}
                  >
                    <option value="">Selecione…</option>
                    {profile.tasks.filter((t) => !t.done).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {newType === 'meta' && (
                <div className="field">
                  <label htmlFor="timer-goal">Meta diária</label>
                  <select
                    id="timer-goal"
                    value={newGoalId}
                    onChange={(e) => setNewGoalId(e.target.value)}
                  >
                    <option value="">Selecione…</option>
                    {profile.dailyGoals.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(newType === 'rotina' || newType === 'tarefa' || newType === 'meta') && (
                <Input
                  label={newType === 'rotina' ? 'Nome da rotina' : 'Nome (opcional)'}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={
                    newType === 'rotina' ? 'Ex.: Revisão vespertina' : 'Usar nome vinculado'
                  }
                  required={newType === 'rotina'}
                />
              )}

              <Button
                variant="accent"
                onClick={handleCreateTimer}
                disabled={
                  (newType === 'tarefa' && !newTaskId) ||
                  (newType === 'meta' && !newGoalId) ||
                  (newType === 'rotina' && !newName.trim())
                }
              >
                Criar cronômetro
              </Button>
            </div>
          )}

          <div className="timer-active-panel">
            <p className="timer-active-panel__label">Em uso agora</p>
            <p
              className={`timer-display ${running ? 'timer-display--running' : ''}`}
              aria-live="polite"
            >
              {activeTimerId ? display : '00:00:00'}
            </p>
            <p className="timer-active-panel__name">
              {activeTimerId
                ? timers.find((t) => t.id === activeTimerId)?.name ?? '—'
                : 'Nenhum cronômetro selecionado'}
            </p>
            <div className="timer-actions">
              {!running ? (
                <Button variant="accent" onClick={start} disabled={!activeTimerId}>
                  {display === '00:00:00' ? 'Iniciar' : 'Retomar'}
                </Button>
              ) : (
                <Button variant="accent" onClick={pause}>
                  Pausar
                </Button>
              )}
              <Button onClick={finish} disabled={!activeTimerId}>
                Finalizar sessão
              </Button>
            </div>
          </div>

          <ul className="timer-preset-list">
            {timers.map((timer) => (
              <li key={timer.id} className="stagger-item">
                <button
                  type="button"
                  className={`timer-preset-list__item ${activeTimerId === timer.id ? 'timer-preset-list__item--active' : ''}`}
                  onClick={() => handleSelectTimer(timer.id)}
                >
                  <span className="timer-preset-list__main">
                    <span className="timer-preset-list__name">{timer.name}</span>
                    <span className="timer-preset-list__meta">
                      {TIMER_TYPE_LABELS[timer.type]} · {timerSubtitle(timer, profile)}
                    </span>
                  </span>
                  <span className="timer-preset-list__times">
                    <span title="Tempo em andamento">{formatDuration(timer.elapsedSeconds)}</span>
                    <span className="timer-preset-list__total" title="Total finalizado">
                      Σ {formatDuration(timer.totalSeconds)}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className="timer-preset-list__delete"
                  onClick={() => setPendingTimerDelete({ id: timer.id, name: timer.name })}
                  aria-label={`Excluir cronômetro ${timer.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Suas tarefas"
          className="studies-page__tasks"
          action={<LinkButton to="/tarefas/nova">Nova tarefa</LinkButton>}
        >
          {doneTasks.length > 0 && (
            <p className="task-list__toggle">
              <button type="button" onClick={() => setShowDone((v) => !v)}>
                {showDone
                  ? 'Ocultar concluídas'
                  : `Mostrar ${doneTasks.length} concluída${doneTasks.length > 1 ? 's' : ''}`}
              </button>
            </p>
          )}
          <ul className="task-list">
            {visibleTasksAll.length === 0 && (
              <li className="task-list__empty">
                Nenhuma tarefa ainda.{' '}
                <LinkButton to="/tarefas/nova" variant="ghost" className="btn--inline">
                  Criar agora
                </LinkButton>
              </li>
            )}
            {visibleTasks.length === 0 && visibleTasksAll.length > 0 && (
              <li className="task-list__empty">Nenhuma tarefa pendente. Bom trabalho!</li>
            )}
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                className={`task-item stagger-item ${task.done ? 'task-item--done' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  aria-label={task.title}
                />
                <button
                  type="button"
                  className="task-item__label"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.title}
                </button>
                <button
                  type="button"
                  className="task-item__study"
                  onClick={() => handleTaskStudy(task.id, task.subjectId)}
                  title="Usar cronômetro desta tarefa"
                >
                  ▶
                </button>
                <PriorityBadge priority={task.priority} />
                <button
                  type="button"
                  className="task-item__delete"
                  onClick={() => setPendingDelete({ id: task.id, title: task.title })}
                  aria-label={`Excluir tarefa ${task.title}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Excluir tarefa?"
        message={
          pendingDelete
            ? `Tem certeza que deseja excluir "${pendingDelete.title}"? Você terá alguns segundos para desfazer depois.`
            : ''
        }
        confirmLabel="Sim, excluir"
        cancelLabel="Não, manter"
        variant="danger"
        onConfirm={confirmDeleteTask}
        onCancel={() => setPendingDelete(null)}
      />

      <ConfirmDialog
        open={pendingTimerDelete !== null}
        title="Excluir cronômetro?"
        message={
          pendingTimerDelete
            ? `Remover o cronômetro «${pendingTimerDelete.name}»? O tempo em andamento será perdido.`
            : ''
        }
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => {
          if (pendingTimerDelete) deleteTimer(pendingTimerDelete.id);
          setPendingTimerDelete(null);
        }}
        onCancel={() => setPendingTimerDelete(null)}
      />
    </div>
  );
}
