import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import type { SubjectId, TaskPriority } from '../types';
import { showToast } from '../lib/toast';

export function NewTaskPage() {
  const { profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('alta');
  const [subjectId, setSubjectId] = useState<SubjectId | ''>('');

  if (!profile) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!profile || !title.trim()) return;
    const task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      priority,
      done: false,
      subjectId: subjectId || undefined,
    };
    updateProfile({ tasks: [...profile.tasks, task] });
    showToast('Tarefa criada.', 'success');
    navigate('/estudos');
  }

  return (
    <div className="page">
      <Card title="Nova tarefa">
        <form onSubmit={handleSubmit} className="stack-form">
          <Input label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div className="field">
            <label htmlFor="priority">Prioridade</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="subject">Matéria (opcional)</label>
            <select
              id="subject"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value as SubjectId | '')}
            >
              <option value="">—</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <Button type="submit">Salvar tarefa</Button>
            <Link to="/estudos" className="text-link">
              Cancelar
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
