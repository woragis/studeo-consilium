import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { LinkButton } from '../components/ui/LinkButton';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ThemeToggle } from '../components/ThemeToggle';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { xpProgressInLevel } from '../lib/xp';
import { showToast } from '../lib/toast';

export function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [saving, setSaving] = useState(false);

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

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] ?? profile.firstName;
    const lastName = parts.slice(1).join(' ') || profile.lastName;
    updateProfile({ firstName, lastName, email, goal });
    setSaving(false);
    showToast('Alterações salvas com sucesso.', 'success');
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Edite seus dados abaixo.', 'info');
  }

  return (
    <div className="page profile-page">
      <header className="profile-hero">
        <button
          type="button"
          className="profile-hero__avatar"
          onClick={scrollToForm}
          aria-label="Editar foto e dados"
        />
        <div>
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          <p>
            <span className="level-badge">Nível {profile.level}</span>
          </p>
          <ProgressBar value={xp.current} max={xp.max} label={`XP ${profile.xp}/${profile.level * 100}`} />
        </div>
      </header>

      <div className="profile-page__grid">
        <Card title="Dados pessoais">
          <form ref={formRef} onSubmit={handleSave} className="profile-form">
            <Input label="Nome" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Objetivo" value={goal} onChange={(e) => setGoal(e.target.value)} />
            <Button type="submit" disabled={saving}>
              {saving ? 'Salvando…' : 'Salvar alterações'}
            </Button>
          </form>
        </Card>

        <Card title="Estatísticas">
          <dl className="stats-list stats-list--interactive">
            <Link to="/estudos" className="stats-list__row">
              <dt>Horas estudadas</dt>
              <dd>{hours}</dd>
            </Link>
            <div className="stats-list__row">
              <dt>Sequência</dt>
              <dd>{profile.streakDays} dias</dd>
            </div>
            <Link to="/estudos" className="stats-list__row">
              <dt>Tarefas a fazer</dt>
              <dd>{pendingTasks}</dd>
            </Link>
            <Link to="/estudos" className="stats-list__row">
              <dt>Concluídas</dt>
              <dd>{doneTasks}</dd>
            </Link>
          </dl>
        </Card>

        <Card
          title="Metas"
          action={
            <Link to="/metas" className="text-link">
              Editar
            </Link>
          }
        >
          <ul className="chip-list">
            {profile.longTermGoals.map((g, i) => (
              <li key={i} className="chip">
                {g}
              </li>
            ))}
          </ul>
          <LinkButton to="/metas" variant="ghost" className="profile-metas__cta">
            Gerenciar todas as metas
          </LinkButton>
        </Card>

        <Card title="Aparência" className="profile-page__appearance">
          <ThemeToggle />
        </Card>
      </div>
    </div>
  );
}
