import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStudyTimer } from '../context/StudyTimerContext';
import { TIMER_TYPE_LABELS, timerSubtitle } from '../lib/study-timers';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { LinkButton } from './ui/LinkButton';
import type { SubjectId } from '../types';

interface StudyTimerBarProps {
  /** Matéria da aula — usada para sugerir cronômetro no select */
  suggestedSubjectId?: SubjectId;
  compact?: boolean;
}

export function StudyTimerBar({ suggestedSubjectId, compact = false }: StudyTimerBarProps) {
  const { profile } = useAuth();
  const {
    timers,
    activeTimerId,
    activeTimer,
    display,
    running,
    selectTimer,
    start,
    pause,
    finish,
    suggestTimerIdForSubject,
  } = useStudyTimer();
  const [expanded, setExpanded] = useState(!activeTimerId);

  useEffect(() => {
    if (activeTimerId) setExpanded(false);
  }, [activeTimerId]);

  if (!profile) return null;

  const suggestedId = suggestedSubjectId
    ? suggestTimerIdForSubject(suggestedSubjectId)
    : null;

  const isCollapsed = Boolean(activeTimer && !expanded);

  function handleSelectChange(value: string) {
    if (value) {
      selectTimer(value);
      setExpanded(false);
    }
  }

  return (
    <div
      className={[
        'study-timer-bar',
        compact ? 'study-timer-bar--compact' : '',
        isCollapsed ? 'study-timer-bar--collapsed' : '',
        running ? 'study-timer-bar--running' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isCollapsed && activeTimer ? (
        <button
          type="button"
          className="study-timer-bar__collapsed"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          aria-label={`Cronômetro ${activeTimer.name}, ${display}. Clique para expandir.`}
        >
          <span className="study-timer-bar__dot" aria-hidden />
          <span className="study-timer-bar__collapsed-name">{activeTimer.name}</span>
          <time className="study-timer-bar__collapsed-time">{display}</time>
          <ChevronDown size={16} strokeWidth={2} aria-hidden className="study-timer-bar__chevron" />
        </button>
      ) : (
        <>
          {activeTimer && (
            <div className="study-timer-bar__toolbar">
              <Button
                type="button"
                variant="ghost"
                className="btn--inline"
                onClick={() => setExpanded(false)}
                aria-label="Recolher cronômetro"
              >
                <ChevronUp size={15} aria-hidden />
                Recolher
              </Button>
            </div>
          )}

          <div className="study-timer-bar__select field">
            <label htmlFor="lesson-timer-select">Cronômetro</label>
            <select
              id="lesson-timer-select"
              value={activeTimerId ?? ''}
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option value="">Escolha um cronômetro…</option>
              {timers.map((timer) => (
                <option key={timer.id} value={timer.id}>
                  {timer.name} ({TIMER_TYPE_LABELS[timer.type]})
                  {timer.id === suggestedId ? ' ★' : ''}
                </option>
              ))}
            </select>
            {suggestedId && activeTimerId !== suggestedId && (
              <Button
                type="button"
                variant="ghost"
                className="btn--inline study-timer-bar__suggest"
                onClick={() => {
                  selectTimer(suggestedId);
                  setExpanded(false);
                }}
              >
                Usar cronômetro de {profile.studyTimers.find((t) => t.id === suggestedId)?.name}
              </Button>
            )}
          </div>

          {activeTimer && (
            <>
              <div className="study-timer-bar__info">
                <span className="study-timer-bar__label">{TIMER_TYPE_LABELS[activeTimer.type]}</span>
                <span className="study-timer-bar__subject">{timerSubtitle(activeTimer, profile)}</span>
              </div>
              <p
                className={`study-timer-bar__display ${running ? 'study-timer-bar__display--running' : ''}`}
                aria-live="polite"
              >
                {display}
              </p>
              <div className="study-timer-bar__actions">
                {!running ? (
                  <Button variant="accent" className="btn--inline" onClick={start}>
                    {display === '00:00:00' ? 'Iniciar' : 'Retomar'}
                  </Button>
                ) : (
                  <Button variant="accent" className="btn--inline" onClick={pause}>
                    Pausar
                  </Button>
                )}
                <Button variant="ghost" className="btn--inline" onClick={finish}>
                  Finalizar
                </Button>
              </div>
              <p className="study-timer-bar__footer">
                <LinkButton to="/estudos" variant="ghost" className="btn--inline">
                  Gerenciar cronômetros
                </LinkButton>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
