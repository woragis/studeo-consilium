import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLessonBySlug } from '../data/lessons';
import { getSubject } from '../data/subjects';
import { Button } from '../components/ui/Button';
import { LinkButton } from '../components/ui/LinkButton';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { addXp, levelFromXp } from '../lib/xp';
import { showToast } from '../lib/toast';

export function LessonDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const lesson = slug ? getLessonBySlug(slug) : undefined;
  const { profile, updateProfile } = useAuth();
  const [openModule, setOpenModule] = useState(0);

  if (!lesson || !profile) {
    return (
      <div className="page page-transition">
        <p>Aula não encontrada.</p>
        <Link to="/aulas">Voltar ao catálogo</Link>
      </div>
    );
  }

  const subject = getSubject(lesson.subjectId);
  const lessonId = lesson.id;
  const lessonSubjectId = lesson.subjectId;
  const progress = profile.lessonProgress[lessonId] ?? 0;

  function bumpProgress(amount: number) {
    if (!profile) return;
    const next = Math.min(100, progress + amount);
    const lessonProgress = { ...profile.lessonProgress, [lessonId]: next };
    let xp = profile.xp;
    if (next === 100 && progress < 100) {
      xp = addXp(xp, 25);
      showToast('Aula concluída! +25 XP', 'success');
    } else {
      showToast(`Progresso atualizado: ${next}%`, 'info');
    }
    updateProfile({
      lessonProgress,
      xp,
      level: levelFromXp(xp),
      lastRecommendedLessonId: lessonId,
    });
  }

  return (
    <div className="page lesson-detail">
      <nav className="breadcrumb">
        <Link to="/">Início</Link>
        <span>/</span>
        <Link to="/aulas">Aulas</Link>
        <span>/</span>
        <span>{lesson.title}</span>
      </nav>

      <header className="lesson-detail__header">
        <span style={{ color: subject?.color }}>{subject?.name}</span>
        <h2>{lesson.title}</h2>
        <p>{lesson.subtitle}</p>
        <ProgressBar value={progress} label={`${progress}% concluído`} />
      </header>

      <button
        type="button"
        className="lesson-detail__video lesson-thumb"
        onClick={() => bumpProgress(5)}
        aria-label="Assistir trecho da aula e avançar progresso"
      >
        <span className="lesson-detail__play-badge">▶ Assistir</span>
      </button>

      <div className="lesson-detail__modules">
        {lesson.modules.map((mod, i) => (
          <Card key={i} className="module-card">
            <button
              type="button"
              className="accordion__trigger module-card__trigger"
              onClick={() => setOpenModule(openModule === i ? -1 : i)}
              aria-expanded={openModule === i}
            >
              <span>
                Módulo {i + 1}: {mod.title}
              </span>
              <span className={`accordion__chevron ${openModule === i ? 'accordion__chevron--open' : ''}`}>
                ▾
              </span>
            </button>
            {openModule === i && (
              <div className="accordion__panel accordion__panel--open module-card__body">
                <p>{mod.body}</p>
                <Button variant="ghost" onClick={() => bumpProgress(5)}>
                  Marcar módulo como lido (+5%)
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="lesson-detail__actions">
        <Button variant="accent" onClick={() => bumpProgress(10)}>
          Continuar (+10%)
        </Button>
        <Button onClick={() => bumpProgress(100 - progress)}>Marcar como concluída</Button>
        <LinkButton to={`/estudos?subject=${lessonSubjectId}`} variant="ghost">
          Iniciar cronômetro
        </LinkButton>
        <LinkButton to="/aulas" variant="ghost">
          Voltar ao catálogo
        </LinkButton>
      </div>
    </div>
  );
}
