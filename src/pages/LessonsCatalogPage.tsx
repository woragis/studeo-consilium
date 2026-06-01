import { useState } from 'react';
import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { subjects } from '../data/subjects';
import { Card } from '../components/ui/Card';
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
        <p>Conteúdo organizado por matéria — dados demonstrativos no app.</p>
      </header>

      <div className="filter-chips" role="tablist">
        <button
          type="button"
          className={filter === 'all' ? 'filter-chips__active' : ''}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        {subjects.map((s) => (
          <button
            key={s.id}
            type="button"
            className={filter === s.id ? 'filter-chips__active' : ''}
            onClick={() => setFilter(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="lessons-grid">
        {filtered.map((lesson) => {
          const subject = subjects.find((s) => s.id === lesson.subjectId);
          const progress = profile?.lessonProgress[lesson.id] ?? 0;
          return (
            <Card key={lesson.id} className="lesson-card">
              <span className="lesson-card__subject" style={{ color: subject?.color }}>
                {subject?.name}
              </span>
              <h3>{lesson.title}</h3>
              <p>{lesson.subtitle}</p>
              <p className="lesson-card__meta">{lesson.durationMinutes} min · {progress}%</p>
              <Link to={`/aulas/${lesson.slug}`} className="text-link">
                Abrir aula →
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
