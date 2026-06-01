import type { TaskPriority } from '../../types';

const labels: Record<TaskPriority, string> = {
  alta: 'Alta',
  media: 'Média',
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return <span className={`badge badge--${priority}`}>{labels[priority]}</span>;
}
