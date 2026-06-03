import { Navigate, useParams } from 'react-router-dom';import { getLessonBySlug, isSubjectId, lessonPath } from '../data/lessons';
import { SubjectTopicsPage } from './SubjectTopicsPage';

/** Rota `/aulas/:segment` — matéria ou redirecionamento de URL antiga. */
export function LessonsSegmentPage() {
  const { subjectId: segment } = useParams<{ subjectId: string }>();

  if (!segment) return <Navigate to="/aulas" replace />;
  if (isSubjectId(segment)) return <SubjectTopicsPage subjectId={segment} />;

  const lesson = getLessonBySlug(segment);
  if (lesson) {
    return <Navigate to={lessonPath(lesson)} replace />;
  }

  return <Navigate to="/aulas" replace />;
}
