import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoalStatusIcon } from './GoalStatusIcon';
import { Card } from './ui/Card';
import { LinkButton } from './ui/LinkButton';
import {
  enrichLessonHistory,
  formatHistoryDate,
  getLessonHistoryStats,
  topicStatusLabel,
} from '../lib/lesson-history';
import type { UserProfile } from '../types';

type HistoryFilter = 'todos' | 'concluidas' | 'em_andamento';

interface LessonHistorySectionProps {
  profile: UserProfile;
}

export function LessonHistorySection({ profile }: LessonHistorySectionProps) {
  const [filter, setFilter] = useState<HistoryFilter>('todos');

  const stats = useMemo(
    () => getLessonHistoryStats(profile.moduleProgress),
    [profile.moduleProgress],
  );

  const items = useMemo(
    () => enrichLessonHistory(profile.lessonHistory ?? [], profile.moduleProgress),
    [profile.lessonHistory, profile.moduleProgress],
  );

  const filtered = useMemo(() => {
    if (filter === 'concluidas') {
      return items.filter((item) => item.lessonStatus === 'concluida');
    }
    if (filter === 'em_andamento') {
      return items.filter((item) => item.lessonStatus === 'em_andamento');
    }
    return items;
  }, [items, filter]);

  return (
    <Card
      title="Histórico de aulas"
      className="lesson-history"
      action={
        <LinkButton to="/aulas" variant="ghost">
          Ver catálogo
        </LinkButton>
      }
    >
      <div className="lesson-history__stats">
        <span className="lesson-history__stat">
          <strong>{stats.modulosConcluidos}</strong> módulos concluídos
        </span>
        <span className="lesson-history__stat">
          <strong>{stats.assuntosConcluidos}</strong> assuntos concluídos
        </span>
        <span className="lesson-history__stat">
          <strong>{stats.emAndamento}</strong> em andamento
        </span>
      </div>

      <div className="filter-chips lesson-history__filters">
        <button
          type="button"
          className={filter === 'todos' ? 'filter-chips__active' : ''}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button
          type="button"
          className={filter === 'concluidas' ? 'filter-chips__active' : ''}
          onClick={() => setFilter('concluidas')}
        >
          Assuntos concluídos
        </button>
        <button
          type="button"
          className={filter === 'em_andamento' ? 'filter-chips__active' : ''}
          onClick={() => setFilter('em_andamento')}
        >
          Em andamento
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="lesson-history__empty">
          {items.length === 0
            ? 'Nenhuma aula concluída ainda. Explore o catálogo e comece a estudar.'
            : 'Nenhum registro neste filtro.'}
        </p>
      ) : (
        <ul className="lesson-history__list">
          {filtered.map((item) => (
            <li key={item.id} className="lesson-history__item stagger-item">
              <Link to={item.lessonPath} className="lesson-history__link">
                <GoalStatusIcon status={item.lessonStatus} className="lesson-history__icon" />
                <span className="lesson-history__body">
                  <span className="lesson-history__subject">{item.subjectName}</span>
                  <span className="lesson-history__title">{item.lessonTitle}</span>
                  <span className="lesson-history__module">
                    Módulo {item.moduleIndex + 1}/{item.totalModules}: {item.moduleTitle}
                  </span>
                </span>
                <span className="lesson-history__meta">
                  <span className="lesson-history__status">{topicStatusLabel(item.lessonStatus)}</span>
                  <time className="lesson-history__date" dateTime={item.completedAt}>
                    {formatHistoryDate(item.completedAt)}
                  </time>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
