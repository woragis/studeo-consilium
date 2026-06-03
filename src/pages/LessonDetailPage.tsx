import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getLessonBySlug, isSubjectId, lessonPath } from '../data/lessons';
import { getSubject } from '../data/subjects';
import { LessonTrailSidebar } from '../components/LessonTrailSidebar';
import { StudyTimerBar } from '../components/StudyTimerBar';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { createHistoryEntry } from '../lib/lesson-history';
import {
  countCompletedModules,
  getFirstIncompleteModuleIndex,
  getLessonPercent,
  getNextLessonInSubject,
  isModuleComplete,
  moduleKey,
} from '../lib/lesson-progress';
import { showToast, showUndoToast } from '../lib/toast';
import { addXp, levelFromXp } from '../lib/xp';
import type { SubjectId } from '../types';

const UNDO_MS = 5000;

export function LessonDetailPage() {
  const { subjectId: subjectParam, slug } = useParams<{ subjectId: string; slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuth();
  const [watching, setWatching] = useState(false);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lesson = slug ? getLessonBySlug(slug) : undefined;
  const subjectId =
    subjectParam && isSubjectId(subjectParam) ? subjectParam : lesson?.subjectId;

  if (!lesson || !profile || !subjectId || lesson.subjectId !== subjectId) {
    return (
      <div className="page">
        <p>Assunto não encontrado.</p>
        <Link to="/aulas">Voltar às matérias</Link>
      </div>
    );
  }

  const currentLesson = lesson;
  const currentProfile = profile;
  const currentSubjectId = subjectId as SubjectId;

  const subject = getSubject(currentSubjectId);
  const moduleProgress = currentProfile.moduleProgress;
  const moduleIndex = Math.min(
    Math.max(0, Number(searchParams.get('m') ?? getFirstIncompleteModuleIndex(currentLesson, moduleProgress))),
    currentLesson.modules.length - 1,
  );
  const mod = currentLesson.modules[moduleIndex];
  const progress = getLessonPercent(currentLesson, moduleProgress);
  const moduleDone = isModuleComplete(moduleProgress, currentLesson.id, moduleIndex);
  const nextLesson = getNextLessonInSubject(currentLesson, moduleProgress);

  useEffect(() => {
    setWatching(false);
  }, [moduleIndex, currentLesson.id]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  function clearAdvanceTimer() {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }

  function advanceAfterComplete(
    justFinishedLesson: boolean,
    nextModuleProgress: Record<string, boolean>,
  ) {
    if (!justFinishedLesson) {
      setSearchParams({ m: String(moduleIndex + 1) });
      return;
    }
    if (nextLesson) {
      navigate(`${lessonPath(nextLesson)}?m=${getFirstIncompleteModuleIndex(nextLesson, nextModuleProgress)}`);
      return;
    }
    showToast('Você concluiu todos os assuntos desta matéria!', 'info');
  }

  function requestCompleteModule() {
    if (moduleDone) {
      goNext();
      return;
    }

    if (!watching) {
      showToast('Clique em Assistir antes de concluir a aula.', 'info');
      return;
    }

    clearAdvanceTimer();

    const key = moduleKey(currentLesson.id, moduleIndex);
    const prevModuleProgress = moduleProgress;
    const prevXp = currentProfile.xp;
    const prevLevel = currentProfile.level;
    const completedBefore = countCompletedModules(currentLesson, moduleProgress);
    const completedAfter = completedBefore + 1;
    const justFinishedLesson = completedAfter >= currentLesson.modules.length;

    const nextModuleProgress = { ...moduleProgress, [key]: true };
    let xp = prevXp;
    if (justFinishedLesson) {
      xp = addXp(xp, 25);
    }

    const prevHistory = currentProfile.lessonHistory ?? [];
    const historyEntry = createHistoryEntry(currentLesson.id, moduleIndex);

    updateProfile({
      moduleProgress: nextModuleProgress,
      xp,
      level: levelFromXp(xp),
      lastRecommendedLessonId: currentLesson.id,
      lessonHistory: [...prevHistory, historyEntry],
    });

    setWatching(false);

    const undoMessage = justFinishedLesson
      ? 'Assunto concluído. Você pode desfazer.'
      : 'Aula concluída. Você pode desfazer.';

    showUndoToast(undoMessage, () => {
      clearAdvanceTimer();
      updateProfile({
        moduleProgress: prevModuleProgress,
        xp: prevXp,
        level: prevLevel,
        lastRecommendedLessonId: currentProfile.lastRecommendedLessonId,
        lessonHistory: prevHistory,
      });
      setWatching(true);
      showToast('Conclusão desfeita.', 'info');
    }, UNDO_MS);

    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null;
      advanceAfterComplete(justFinishedLesson, nextModuleProgress);
    }, UNDO_MS);
  }

  function goNext() {
    if (moduleIndex < currentLesson.modules.length - 1) {
      setSearchParams({ m: String(moduleIndex + 1) });
      return;
    }
    if (nextLesson) {
      navigate(`${lessonPath(nextLesson)}?m=${getFirstIncompleteModuleIndex(nextLesson, moduleProgress)}`);
      return;
    }
    showToast('Você concluiu todos os assuntos desta matéria!', 'info');
  }

  function goPrev() {
    if (moduleIndex > 0) {
      setSearchParams({ m: String(moduleIndex - 1) });
    }
  }

  const nextLabel =
    moduleIndex < currentLesson.modules.length - 1
      ? 'Próximo módulo'
      : nextLesson
        ? 'Próximo assunto'
        : 'Fim da trilha';

  const completeLabel =
    moduleIndex < currentLesson.modules.length - 1
      ? 'Concluir aula'
      : 'Concluir assunto';

  return (
    <div className="page lesson-detail lesson-detail--with-trail">
      <div className="lesson-detail__layout">
        <LessonTrailSidebar
          subjectId={currentSubjectId}
          currentLesson={currentLesson}
          currentModuleIndex={moduleIndex}
          moduleProgress={moduleProgress}
        />

        <div className="lesson-detail__main">
          <nav className="breadcrumb breadcrumb--compact">
            <Link to="/aulas">Aulas</Link>
            <span>/</span>
            <Link to={`/aulas/${currentSubjectId}`}>{subject?.name}</Link>
            <span>/</span>
            <span>{currentLesson.title}</span>
          </nav>

          <StudyTimerBar suggestedSubjectId={currentSubjectId} compact />

          <header className="lesson-detail__header">
            <span className="lesson-detail__module-tag">
              Módulo {moduleIndex + 1} de {currentLesson.modules.length}
            </span>
            <h2>{mod.title}</h2>
            <p className="lesson-detail__topic-ref">{currentLesson.title}</p>
            <ProgressBar value={progress} label={`${progress}% do assunto`} />
          </header>

          <button
            type="button"
            className={`lesson-detail__video lesson-thumb ${watching ? 'lesson-detail__video--watching' : ''}`.trim()}
            onClick={() => setWatching(true)}
            aria-label={watching ? 'Aula em andamento' : 'Assistir aula'}
            aria-pressed={watching}
          >
            <span className="lesson-detail__play-badge">
              {watching ? '● Assistindo' : '▶ Assistir'}
            </span>
          </button>

          <div className="lesson-detail__content card">
            <p>{mod.body}</p>
          </div>

          <div className="lesson-detail__actions">
            <Button variant="ghost" onClick={goPrev} disabled={moduleIndex === 0}>
              Módulo anterior
            </Button>
            {!moduleDone && (
              <Button
                variant="accent"
                onClick={requestCompleteModule}
                disabled={!watching}
                title={watching ? undefined : 'Inicie a aula clicando em Assistir'}
              >
                {completeLabel}
              </Button>
            )}
            <Button onClick={goNext}>{nextLabel} →</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
