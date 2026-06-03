import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLessonsBySubject } from '../data/lessons';
import { getSubject } from '../data/subjects';
import { TopicCard } from '../components/TopicCard';
import { useAuth } from '../context/AuthContext';
import { getTopicStatus, type TopicStatus } from '../lib/lesson-progress';
import type { SubjectId } from '../types';

type StatusFilter = 'all' | TopicStatus;

interface SubjectTopicsPageProps {
  subjectId: SubjectId;
}

export function SubjectTopicsPage({ subjectId }: SubjectTopicsPageProps) {
  const { profile } = useAuth();
  const [filter, setFilter] = useState<StatusFilter>('all');
  const subject = getSubject(subjectId);
  const moduleProgress = profile?.moduleProgress ?? {};

  const topics = useMemo(() => getLessonsBySubject(subjectId), [subjectId]);

  const filtered = useMemo(() => {
    if (filter === 'all') return topics;
    return topics.filter((t) => getTopicStatus(t, moduleProgress) === filter);
  }, [topics, filter, moduleProgress]);

  const counts = useMemo(() => {
    let concluidas = 0;
    let emAndamento = 0;
    let pendentes = 0;
    for (const t of topics) {
      const s = getTopicStatus(t, moduleProgress);
      if (s === 'concluida') concluidas += 1;
      else if (s === 'em_andamento') emAndamento += 1;
      else pendentes += 1;
    }
    return { concluidas, emAndamento, pendentes, total: topics.length };
  }, [topics, moduleProgress]);

  if (!subject) return null;

  const filters: { id: StatusFilter; label: string; count?: number }[] = [
    { id: 'all', label: 'Todos', count: counts.total },
    { id: 'em_andamento', label: 'Em andamento', count: counts.emAndamento },
    { id: 'concluida', label: 'Concluídos', count: counts.concluidas },
    { id: 'pendente', label: 'Não iniciados', count: counts.pendentes },
  ];

  return (
    <div className="page lessons-page">
      <nav className="breadcrumb">
        <Link to="/aulas">Aulas</Link>
        <span>/</span>
        <span>{subject.name}</span>
      </nav>

      <header className="page__hero">
        <h2>{subject.name}</h2>
        <p>
          {filtered.length} {filtered.length === 1 ? 'assunto' : 'assuntos'}
          {' '}— cada um com módulos para estudar em sequência.
        </p>
      </header>

      <div className="filter-chips" role="tablist" aria-label="Filtrar por status">
        {filters.map(({ id, label, count }) => (
          <button
            key={id}
            type="button"
            className={filter === id ? 'filter-chips__active' : ''}
            onClick={() => setFilter(id)}
            role="tab"
            aria-selected={filter === id}
          >
            {label}
            {count !== undefined && count > 0 ? ` (${count})` : ''}
          </button>
        ))}
      </div>

      <div className="topics-list">
        {filtered.length === 0 && (
          <p className="topics-list__empty">Nenhum assunto neste filtro.</p>
        )}
        {filtered.map((topic, index) => (
          <div key={topic.id} className="stagger-item" style={{ animationDelay: `${index * 0.04}s` }}>
            <TopicCard
              topic={topic}
              subjectColor={subject.color}
              moduleProgress={moduleProgress}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
