import type { Subject } from '../types';

export const subjects: Subject[] = [
  { id: 'fisica', name: 'Física', color: 'var(--color-subject-fisica)' },
  { id: 'matematica', name: 'Matemática', color: 'var(--color-subject-matematica)' },
  { id: 'quimica', name: 'Química', color: 'var(--color-subject-quimica)' },
  { id: 'portugues', name: 'Português', color: 'var(--color-subject-portugues)' },
];

export function getSubject(id: string) {
  return subjects.find((s) => s.id === id);
}
