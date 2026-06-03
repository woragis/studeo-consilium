import { Link } from 'react-router-dom';
import { getLessonById, lessonPath } from '../data/lessons';
import { subjects } from '../data/subjects';
import { ClickableCard } from '../components/ClickableCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { getFirstIncompleteModuleIndex, getSubjectStats } from '../lib/lesson-progress';

export function SubjectOverviewPage() {
  const { profile } = useAuth();
  const moduleProgress = profile?.moduleProgress ?? {};
  const continueLesson = profile ? getLessonById(profile.lastRecommendedLessonId) : undefined;

  return (
    <div className="page lessons-page">
      <header className="page__hero">
        <h2>Aulas</h2>
        <p>Escolha uma matéria e continue sua trilha de estudos.</p>
      </header>

      {continueLesson && (
        <ClickableCard
          to={`${lessonPath(continueLesson)}?m=${getFirstIncompleteModuleIndex(continueLesson, moduleProgress)}`}
          className="continue-lesson-card card"
        >
          <span className="continue-lesson-card__eyebrow">Continuar de onde parou</span>
          <h3>{continueLesson.title}</h3>
          <p>{continueLesson.subtitle}</p>
          <span className="continue-lesson-card__cta">Retomar assunto →</span>
        </ClickableCard>
      )}

      <div className="subject-overview-grid">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject.id, moduleProgress);
          const progress =
            stats.total === 0 ? 0 : Math.round((stats.concluidas / stats.total) * 100);

          return (
            <Link key={subject.id} to={`/aulas/${subject.id}`} className="subject-card">
              <span className="subject-card__name" style={{ color: subject.color }}>
                {subject.name}
              </span>
              <p className="subject-card__stats">
                {stats.concluidas}/{stats.total} assuntos concluídos
                {stats.emAndamento > 0 && ` · ${stats.emAndamento} em andamento`}
              </p>
              <ProgressBar value={progress} max={100} label={`${progress}% da matéria`} />
              <span className="subject-card__cta">Ver assuntos →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
