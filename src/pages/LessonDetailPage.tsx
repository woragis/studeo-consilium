import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLessonBySlug } from '../data/lessons';
import { getSubject } from '../data/subjects';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { addXp, levelFromXp } from '../lib/xp';
import { showToast } from '../lib/toast';

export function LessonDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const lesson = slug ? getLessonBySlug(slug) : undefined;
  const { profile, updateProfile } = useAuth();
  const navigate = useNavigate();

  if (!lesson || !profile) {
    return (
      <div className="page">
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

      <div className="lesson-detail__video lesson-thumb" aria-label="Área do vídeo" />

      <div className="lesson-detail__modules">
        {lesson.modules.map((mod, i) => (
          <Card key={i} title={`Módulo ${i + 1}: ${mod.title}`}>
            <p>{mod.body}</p>
          </Card>
        ))}
      </div>

      <div className="lesson-detail__actions">
        <Button variant="accent" onClick={() => bumpProgress(10)}>
          Continuar (+10%)
        </Button>
        <Button onClick={() => bumpProgress(100 - progress)}>Marcar como concluída</Button>
        <Button
          variant="ghost"
          onClick={() => navigate(`/estudos?subject=${lessonSubjectId}`)}
        >
          Iniciar cronômetro
        </Button>
      </div>
    </div>
  );
}
