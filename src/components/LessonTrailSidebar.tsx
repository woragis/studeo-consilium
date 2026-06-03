import { Link } from 'react-router-dom';
import { getLessonsBySubject, lessonPath } from '../data/lessons';
import { getSubject } from '../data/subjects';
import { GoalStatusIcon } from './GoalStatusIcon';
import {
  getFirstIncompleteModuleIndex,
  getLessonPercent,
  getTopicStatus,
  isModuleComplete,
  topicStatusLabel,
  type TopicStatus,
} from '../lib/lesson-progress';
import type { Lesson, SubjectId } from '../types';

interface LessonTrailSidebarProps {
  subjectId: SubjectId;
  currentLesson: Lesson;
  currentModuleIndex: number;
  moduleProgress: Record<string, boolean>;
}

export function LessonTrailSidebar({
  subjectId,
  currentLesson,
  currentModuleIndex,
  moduleProgress,
}: LessonTrailSidebarProps) {
  const subject = getSubject(subjectId);
  const topics = getLessonsBySubject(subjectId);

  return (
    <aside className="lesson-trail" aria-label={`Trilha de ${subject?.name ?? 'matéria'}`}>
      <header className="lesson-trail__header">
        <Link to="/aulas" className="lesson-trail__back">
          ← Matérias
        </Link>
        <Link to={`/aulas/${subjectId}`} className="lesson-trail__subject">
          {subject?.name}
        </Link>
      </header>

      <nav className="lesson-trail__nav">
        {topics.map((topic) => {
          const status = getTopicStatus(topic, moduleProgress);
          const isCurrent = topic.id === currentLesson.id;
          const percent = getLessonPercent(topic, moduleProgress);

          return (
            <div
              key={topic.id}
              className={`lesson-trail__topic ${isCurrent ? 'lesson-trail__topic--active' : ''}`}
            >
              <Link
                to={`${lessonPath(topic)}?m=${getFirstIncompleteModuleIndex(topic, moduleProgress)}`}
                className="lesson-trail__topic-link"
              >
                <GoalStatusIcon status={status as TopicStatus} className="lesson-trail__icon" />
                <span className="lesson-trail__topic-text">
                  <span className="lesson-trail__topic-title">{topic.title}</span>
                  <span className={`lesson-trail__topic-meta lesson-trail__topic-meta--${status}`}>
                    {topicStatusLabel(status)} · {percent}%
                  </span>
                </span>
              </Link>

              {isCurrent && (
                <ol className="lesson-trail__modules">
                  {topic.modules.map((mod, i) => {
                    const done = isModuleComplete(moduleProgress, topic.id, i);
                    const isActive = i === currentModuleIndex;
                    return (
                      <li key={i}>
                        <Link
                          to={`${lessonPath(topic)}?m=${i}`}
                          className={`lesson-trail__module ${isActive ? 'lesson-trail__module--active' : ''} ${done ? 'lesson-trail__module--done' : ''}`}
                        >
                          <span className="lesson-trail__module-num">{i + 1}</span>
                          <span>{mod.title}</span>
                          {done && <span className="lesson-trail__module-check" aria-hidden>✓</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
