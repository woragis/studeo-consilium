import { useState, type FormEvent } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../lib/toast';

export function GoalsPage() {
  const { profile, updateProfile } = useAuth();
  const [newGoal, setNewGoal] = useState('');
  const [newDaily, setNewDaily] = useState('');

  if (!profile) return null;

  function removeLongTerm(index: number) {
    if (!profile) return;
    const label = profile.longTermGoals[index];
    if (!window.confirm(`Remover a meta "${label}"? Você pode adicioná-la novamente depois.`)) {
      return;
    }
    const longTermGoals = profile.longTermGoals.filter((_, i) => i !== index);
    updateProfile({ longTermGoals });
    showToast('Meta removida.', 'info');
  }

  function addLongTerm(e: FormEvent) {
    e.preventDefault();
    if (!profile || !newGoal.trim()) return;
    updateProfile({ longTermGoals: [...profile.longTermGoals, newGoal.trim()] });
    setNewGoal('');
    showToast('Meta de longo prazo adicionada.', 'success');
  }

  function addDaily(e: FormEvent) {
    e.preventDefault();
    if (!profile || !newDaily.trim()) return;
    updateProfile({
      dailyGoals: [
        ...profile.dailyGoals,
        { id: crypto.randomUUID(), title: newDaily.trim(), status: 'pendente' },
      ],
    });
    setNewDaily('');
  }

  return (
    <div className="page goals-page">
      <header className="page__hero">
        <h2>Metas</h2>
        <p>Metas do dia e objetivos de longo prazo para o vestibular.</p>
      </header>

      <div className="goals-page__grid">
        <Card title="Metas de hoje">
          <ul className="goal-list">
            {profile.dailyGoals.map((g) => (
              <li key={g.id}>
                <strong>{g.title}</strong> — {g.status.replace('_', ' ')}
              </li>
            ))}
          </ul>
          <form onSubmit={addDaily} className="inline-form">
            <Input
              label="Nova meta do dia"
              value={newDaily}
              onChange={(e) => setNewDaily(e.target.value)}
            />
            <Button type="submit">Adicionar</Button>
          </form>
        </Card>

        <Card title="Metas de longo prazo">
          <ul className="chip-list chip-list--editable">
            {profile.longTermGoals.map((g, i) => (
              <li key={i} className="chip">
                {g}
                <button type="button" onClick={() => removeLongTerm(i)} aria-label={`Remover ${g}`}>
                  ×
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addLongTerm} className="inline-form">
            <Input label="Nova meta" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} />
            <Button type="submit">Adicionar</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
