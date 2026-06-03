import { Link } from 'react-router-dom';
import { lessonPath } from '../data/lessons';
import { GoalStatusIcon } from './GoalStatusIcon';
import { ProgressBar } from './ui/ProgressBar';
import {
  getLessonPercent,
  getTopicStatus,
  topicStatusLabel,
  type TopicStatus,
} from '../lib/lesson-progress';
import type { Lesson } from '../types';

interface TopicCardProps {
  topic: Lesson;
  subjectColor: string;
  moduleProgress: Record<string, boolean>;
}

export function TopicCard({ topic, subjectColor, moduleProgress }: TopicCardProps) {
  const status = getTopicStatus(topic, moduleProgress);
  const percent = getLessonPercent(topic, moduleProgress);

  return (
    <Link to={lessonPath(topic)} className="topic-card">
      <div className="topic-card__head">
        <GoalStatusIcon status={status as TopicStatus} />
        <div className="topic-card__titles">
          <h3>{topic.title}</h3>
          <p>{topic.subtitle}</p>
        </div>
        <span className="topic-card__arrow" aria-hidden>
          →
        </span>
      </div>
      <div className="topic-card__meta">
        <span className={`topic-card__status topic-card__status--${status}`} style={{ color: subjectColor }}>
          {topicStatusLabel(status)}
        </span>
        <span className="topic-card__modules">
          {topic.modules.length} módulos · {topic.durationMinutes} min
        </span>
      </div>
      <ProgressBar value={percent} max={100} label={`${percent}% concluído`} />
    </Link>
  );
}
