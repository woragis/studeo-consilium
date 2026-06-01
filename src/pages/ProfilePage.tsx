import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { xpProgressInLevel } from '../lib/xp';
import { showToast } from '../lib/toast';

export function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    if (!profile) return;
    setFullName(`${profile.firstName} ${profile.lastName} de Souza Santos`);
    setEmail(profile.email);
    setGoal(profile.goal);
  }, [profile]);

  if (!profile) return null;

  const xp = xpProgressInLevel(profile.xp);
  const pendingTasks = profile.tasks.filter((t) => !t.done).length;
  const doneTasks = profile.tasks.filter((t) => t.done).length;
  const hours = Math.floor(profile.totalStudySeconds / 3600);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!profile) return;
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] ?? profile.firstName;
    const lastName = parts.slice(1).join(' ') || profile.lastName;
    updateProfile({ firstName, lastName, email, goal });
    showToast('Alterações salvas com sucesso.', 'success');
  }

  return (
    <div className="page profile-page">
      <header className="profile-hero">
        <div className="profile-hero__avatar" aria-hidden />
        <div>
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          <p>Nível {profile.level}</p>
          <ProgressBar value={xp.current} max={xp.max} label={`XP ${profile.xp}/${profile.level * 100}`} />
        </div>
      </header>

      <div className="profile-page__grid">
        <Card title="Dados pessoais">
          <form onSubmit={handleSave} className="profile-form">
            <Input label="Nome" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Objetivo" value={goal} onChange={(e) => setGoal(e.target.value)} />
            <Button type="submit">Salvar alterações</Button>
          </form>
        </Card>

        <Card title="Estatísticas">
          <dl className="stats-list">
            <div>
              <dt>Horas estudadas</dt>
              <dd>{hours}</dd>
            </div>
            <div>
              <dt>Sequência</dt>
              <dd>{profile.streakDays} dias</dd>
            </div>
            <div>
              <dt>Tarefas a fazer</dt>
              <dd>{pendingTasks}</dd>
            </div>
            <div>
              <dt>Concluídas</dt>
              <dd>{doneTasks}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Metas">
          <ul className="chip-list">
            {profile.longTermGoals.map((g, i) => (
              <li key={i} className="chip">
                {g}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
