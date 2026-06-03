import { Check, Circle, Hourglass } from 'lucide-react';
import type { DailyGoalStatus } from '../types';

interface GoalStatusIconProps {
  status: DailyGoalStatus;
  pop?: boolean;
  className?: string;
}

export function GoalStatusIcon({ status, pop = false, className = '' }: GoalStatusIconProps) {
  return (
    <span
      className={`goal-status goal-status--${status} ${pop ? 'goal-status--pop' : ''} ${className}`.trim()}
      aria-hidden
    >
      {status === 'concluida' && <Check size={15} strokeWidth={3} />}
      {status === 'em_andamento' && <Hourglass size={14} strokeWidth={2.25} />}
      {status === 'pendente' && <Circle size={14} strokeWidth={2} />}
    </span>
  );
}

export function goalStatusLabel(status: DailyGoalStatus): string {
  switch (status) {
    case 'em_andamento':
      return 'Em andamento';
    case 'concluida':
      return 'Concluída';
    default:
      return 'Pendente';
  }
}
