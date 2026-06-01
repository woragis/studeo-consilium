import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { Button } from '../components/ui/Button';
import { LinkButton } from '../components/ui/LinkButton';
import { Card } from '../components/ui/Card';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { useAuth } from '../context/AuthContext';
import { useStudyTimer } from '../context/StudyTimerContext';
import { formatDuration } from '../lib/storage';
import { showToast } from '../lib/toast';
import { addXp, levelFromXp } from '../lib/xp';
import type { SubjectId } from '../types';

export function StudiesPage() {
  const { profile, updateProfile } = useAuth();
  const {
    subjectId,
    setSubjectId,
    display,
    running,
    start,
    pause,
    finish,
  } = useStudyTimer();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const subject = params.get('subject') as SubjectId | null;
    if (subject && subjects.some((s) => s.id === subject)) {
      setSubjectId(subject);
      start();
      showToast(`Cronômetro iniciado para ${subjects.find((s) => s.id === subject)?.name}.`, 'info');
      setParams({}, { replace: true });
    }
  }, [params, setSubjectId, start, setParams]);

  if (!profile) return null;

  function selectSubject(id: SubjectId) {
    setSubjectId(id);
    const name = subjects.find((s) => s.id === id)?.name;
    if (!running) {
      start();
      showToast(`Estudando ${name}. Cronômetro em execução.`, 'info');
    } else {
      showToast(`Matéria ativa: ${name}`, 'info');
    }
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

  function getSessionTime(id: SubjectId) {
    if (!profile) return '00:00:00';
    const session = profile.studySessions.find((s) => s.subjectId === id);
    return session ? formatDuration(session.elapsedSeconds) : '00:00:00';
  }

  return (
    <div className="page studies-page">
      <div className="studies-page__grid">
        <Card title="Cronômetro de estudos" className="studies-page__timer">
          <p
            className={`timer-display ${running ? 'timer-display--running' : ''}`}
            aria-live="polite"
          >
            {display}
          </p>
          <div className="timer-actions">
            {!running ? (
              <Button variant="accent" onClick={start}>
                {display === '00:00:00' ? 'Iniciar' : 'Retomar'}
              </Button>
            ) : (
              <Button variant="accent" onClick={pause}>
                Pausar
              </Button>
            )}
            <Button onClick={finish}>Finalizar sessão</Button>
          </div>

          <ul className="session-list">
            {subjects.map((s) => (
              <li key={s.id} className="stagger-item">
                <button
                  type="button"
                  className={`session-list__item ${subjectId === s.id ? 'session-list__item--active' : ''}`}
                  onClick={() => selectSubject(s.id)}
                >
                  <span className="session-list__play" aria-hidden />
                  <span>{s.name}</span>
                  <span className="session-list__time">{getSessionTime(s.id)}</span>
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
          <ul className="task-list">
            {profile.tasks.length === 0 && (
              <li className="task-list__empty">
                Nenhuma tarefa ainda.{' '}
                <LinkButton to="/tarefas/nova" variant="ghost" className="btn--inline">
                  Criar agora
                </LinkButton>
              </li>
            )}
            {profile.tasks.map((task) => (
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
                {task.subjectId && (
                  <button
                    type="button"
                    className="task-item__study"
                    onClick={() => selectSubject(task.subjectId!)}
                    title="Estudar esta matéria"
                  >
                    ▶
                  </button>
                )}
                <PriorityBadge priority={task.priority} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
