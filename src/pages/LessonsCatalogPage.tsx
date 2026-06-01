import { useState } from 'react';
import { lessons } from '../data/lessons';
import { subjects } from '../data/subjects';
import { ClickableCard } from '../components/ClickableCard';
import { useAuth } from '../context/AuthContext';
import type { SubjectId } from '../types';

export function LessonsCatalogPage() {
  const { profile } = useAuth();
  const [filter, setFilter] = useState<SubjectId | 'all'>('all');

  const filtered =
    filter === 'all' ? lessons : lessons.filter((l) => l.subjectId === filter);

  return (
    <div className="page lessons-page">
      <header className="page__hero">
        <h2>Catálogo de aulas</h2>
        <p>Conteúdo organizado por matéria — clique em um card para abrir a aula.</p>
      </header>

      <div className="filter-chips" role="tablist" aria-label="Filtrar por matéria">
        <button
          type="button"
          className={filter === 'all' ? 'filter-chips__active' : ''}
          onClick={() => setFilter('all')}
          role="tab"
          aria-selected={filter === 'all'}
        >
          Todas
        </button>
        {subjects.map((s) => (
          <button
            key={s.id}
            type="button"
            className={filter === s.id ? 'filter-chips__active' : ''}
            onClick={() => setFilter(s.id)}
            role="tab"
            aria-selected={filter === s.id}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="lessons-grid">
        {filtered.map((lesson, index) => {
          const subject = subjects.find((s) => s.id === lesson.subjectId);
          const progress = profile?.lessonProgress[lesson.id] ?? 0;
          return (
            <ClickableCard
              key={lesson.id}
              to={`/aulas/${lesson.slug}`}
              className="lesson-card stagger-item"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <span className="lesson-card__subject" style={{ color: subject?.color }}>
                {subject?.name}
              </span>
              <h3>{lesson.title}</h3>
              <p>{lesson.subtitle}</p>
              <p className="lesson-card__meta">
                {lesson.durationMinutes} min · {progress}% concluído
              </p>
              <span className="lesson-card__arrow" aria-hidden>
                →
              </span>
            </ClickableCard>
          );
        })}
      </div>
    </div>
  );
}
