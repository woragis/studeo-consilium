import type { Subject } from '../types';

export const subjects: Subject[] = [
  { id: 'fisica', name: 'Física', color: '#4a90d9' },
  { id: 'matematica', name: 'Matemática', color: '#6c5ce7' },
  { id: 'quimica', name: 'Química', color: '#00b894' },
  { id: 'portugues', name: 'Português', color: '#e17055' },
];

export function getSubject(id: string) {
  return subjects.find((s) => s.id === id);
}
