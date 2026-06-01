import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { useAuth } from '../context/AuthContext';
import { useStudyTimer } from '../context/StudyTimerContext';
import { formatDuration } from '../lib/storage';
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
  const [params] = useSearchParams();

  useEffect(() => {
    const subject = params.get('subject') as SubjectId | null;
    if (subject && subjects.some((s) => s.id === subject)) {
      setSubjectId(subject);
      if (!running) start();
    }
  }, [params, setSubjectId, start, running]);

  if (!profile) return null;

  function toggleTask(id: string) {
    if (!profile) return;
    const tasks = profile.tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
    updateProfile({ tasks });
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
          <p className="timer-display" aria-live="polite">
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
              <li key={s.id}>
                <button
                  type="button"
                  className={`session-list__item ${subjectId === s.id ? 'session-list__item--active' : ''}`}
                  onClick={() => setSubjectId(s.id)}
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
          action={
            <Link to="/tarefas/nova">
              <Button>Nova tarefa</Button>
            </Link>
          }
        >
          <ul className="task-list">
            {profile.tasks.length === 0 && (
              <li className="task-list__empty">Nenhuma tarefa ainda.</li>
            )}
            {profile.tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.done ? 'task-item--done' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  aria-label={task.title}
                />
                <span>{task.title}</span>
                <PriorityBadge priority={task.priority} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
