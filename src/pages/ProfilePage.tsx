import { Pencil, User } from 'lucide-react';

import { useState } from 'react';

import { Link } from 'react-router-dom';

import { GoalStatusIcon, goalStatusLabel } from '../components/GoalStatusIcon';

import { ProfileEditDialog } from '../components/ProfileEditDialog';

import { Button } from '../components/ui/Button';

import { Card } from '../components/ui/Card';

import { LessonHistorySection } from '../components/LessonHistorySection';

import { LinkButton } from '../components/ui/LinkButton';

import { ProgressBar } from '../components/ui/ProgressBar';

import { useAuth } from '../context/AuthContext';

import { formatDuration } from '../lib/storage';

import { TIMER_TYPE_LABELS, timerSubtitle } from '../lib/study-timers';

import { xpProgressInLevel, addXp, levelFromXp } from '../lib/xp';

import { showToast } from '../lib/toast';

import type { DailyGoalStatus } from '../types';



export function ProfilePage() {

  const { profile, updateProfile } = useAuth();

  const [editOpen, setEditOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [popDailyId, setPopDailyId] = useState<string | null>(null);

  const [popLongTermId, setPopLongTermId] = useState<string | null>(null);



  if (!profile) return null;



  const xp = xpProgressInLevel(profile.xp);

  const pendingTasks = profile.tasks.filter((t) => !t.done).length;

  const hours = Math.floor(profile.totalStudySeconds / 3600);

  const completedDailyGoals = profile.dailyGoals.filter((g) => g.status === 'concluida');

  const topTimers = [...profile.studyTimers]

    .sort(

      (a, b) =>

        b.totalSeconds + b.elapsedSeconds - (a.totalSeconds + a.elapsedSeconds),

    )

    .slice(0, 5);



  const fullName = `${profile.firstName} ${profile.lastName}`;



  async function handleSave(data: { fullName: string; email: string; goal: string }) {

    if (!profile) return;

    setSaving(true);

    await new Promise((r) => setTimeout(r, 400));

    const parts = data.fullName.trim().split(/\s+/);

    const firstName = parts[0] ?? profile.firstName;

    const lastName = parts.slice(1).join(' ') || profile.lastName;

    updateProfile({ firstName, lastName, email: data.email, goal: data.goal });

    setSaving(false);

    setEditOpen(false);

    showToast('Alterações salvas com sucesso.', 'success');

  }



  function toggleDailyGoal(id: string) {

    if (!profile) return;

    setPopDailyId(id);

    setTimeout(() => setPopDailyId(null), 350);



    let awardedXp = false;

    const dailyGoals = profile.dailyGoals.map((g) => {

      if (g.id !== id) return g;

      const nextStatus: DailyGoalStatus =

        g.status === 'pendente'

          ? 'em_andamento'

          : g.status === 'em_andamento'

            ? 'concluida'

            : 'pendente';

      if (nextStatus === 'concluida' && g.status !== 'concluida') {

        awardedXp = true;

      }

      return { ...g, status: nextStatus };

    });



    if (awardedXp) {

      const xp = addXp(profile.xp, 5);

      updateProfile({ dailyGoals, xp, level: levelFromXp(xp) });

      showToast('Meta do dia concluída! +5 XP', 'success');

    } else {

      updateProfile({ dailyGoals });

      const goal = dailyGoals.find((g) => g.id === id);

      if (goal?.status === 'em_andamento') {

        showToast('Meta em andamento — continue assim!', 'info');

      }

    }

  }



  function toggleLongTermGoal(id: string) {

    if (!profile) return;

    setPopLongTermId(id);

    setTimeout(() => setPopLongTermId(null), 350);



    const longTermGoals = profile.longTermGoals.map((g) => {

      if (g.id !== id) return g;

      const nextStatus: DailyGoalStatus =

        g.status === 'pendente'

          ? 'em_andamento'

          : g.status === 'em_andamento'

            ? 'concluida'

            : 'pendente';

      return { ...g, status: nextStatus };

    });



    updateProfile({ longTermGoals });

    const goal = longTermGoals.find((g) => g.id === id);

    if (goal?.status === 'em_andamento') {

      showToast('Meta em andamento — continue assim!', 'info');

    } else if (goal?.status === 'concluida') {

      showToast('Meta de longo prazo concluída!', 'success');

    }

  }



  return (

    <div className="page profile-page">

      <header className="profile-hero">

        <button

          type="button"

          className="profile-hero__avatar"

          onClick={() => setEditOpen(true)}

          aria-label="Editar perfil"

        >

          <User size={36} strokeWidth={1.75} aria-hidden />

        </button>



        <div className="profile-hero__main">

          <div className="profile-hero__head">

            <div>

              <h2 className="profile-hero__name">

                {profile.firstName} {profile.lastName}

              </h2>

              <p className="profile-hero__email">{profile.email}</p>

            </div>

            <Button

              type="button"

              variant="ghost"

              className="btn--inline profile-hero__edit"

              onClick={() => setEditOpen(true)}

            >

              <Pencil size={15} aria-hidden />

              Editar

            </Button>

          </div>



          {profile.goal && (

            <p className="profile-hero__goal">

              <span className="profile-hero__goal-label">Objetivo</span>

              {profile.goal}

            </p>

          )}



          <p className="profile-hero__meta">

            <span className="level-badge">Nível {profile.level}</span>

            <span className="profile-hero__stat">{hours}h estudadas</span>

            <span className="profile-hero__stat">{pendingTasks} tarefas pendentes</span>

          </p>

          <ProgressBar value={xp.current} max={xp.max} label={`XP ${profile.xp}/${profile.level * 100}`} />

        </div>

      </header>



      <div className="profile-page__grid">

        <Card

          title="Metas concluídas"

          action={

            <Link to="/metas" className="text-link">

              Ver todas

            </Link>

          }

        >

          {completedDailyGoals.length === 0 ? (

            <p className="profile-panel__empty">Nenhuma meta diária concluída ainda.</p>

          ) : (

            <ul className="goal-list profile-goal-list">

              {completedDailyGoals.slice(0, 4).map((g) => (

                <li key={g.id} className="goal-list__item">

                  <button

                    type="button"

                    className="goal-status-btn"

                    onClick={() => toggleDailyGoal(g.id)}

                    aria-label={`Alternar meta: ${g.title} (${goalStatusLabel(g.status)})`}

                  >

                    <GoalStatusIcon status={g.status} pop={popDailyId === g.id} />

                  </button>

                  <button

                    type="button"

                    className="goal-list__content"

                    onClick={() => toggleDailyGoal(g.id)}

                  >

                    <span>{g.title}</span>

                    <small className={`goal-list__status goal-list__status--${g.status}`}>

                      {goalStatusLabel(g.status)}

                    </small>

                  </button>

                </li>

              ))}

            </ul>

          )}

          {completedDailyGoals.length > 4 && (

            <p className="profile-metas__more">

              +{completedDailyGoals.length - 4} meta{completedDailyGoals.length - 4 > 1 ? 's' : ''} em Metas

            </p>

          )}

        </Card>



        <Card

          title="Metas de longo prazo"

          action={

            <Link to="/metas" className="text-link">

              Gerenciar

            </Link>

          }

        >

          {profile.longTermGoals.length === 0 ? (

            <p className="profile-panel__empty">Nenhuma meta de longo prazo definida.</p>

          ) : (

            <ul className="goal-list profile-goal-list">

              {profile.longTermGoals.slice(0, 4).map((g) => (

                <li key={g.id} className="goal-list__item">

                  <button

                    type="button"

                    className="goal-status-btn"

                    onClick={() => toggleLongTermGoal(g.id)}

                    aria-label={`Alternar meta: ${g.title} (${goalStatusLabel(g.status)})`}

                  >

                    <GoalStatusIcon status={g.status} pop={popLongTermId === g.id} />

                  </button>

                  <button

                    type="button"

                    className="goal-list__content"

                    onClick={() => toggleLongTermGoal(g.id)}

                  >

                    <span>{g.title}</span>

                    <small className={`goal-list__status goal-list__status--${g.status}`}>

                      {goalStatusLabel(g.status)}

                    </small>

                  </button>

                </li>

              ))}

            </ul>

          )}

          {profile.longTermGoals.length > 4 && (

            <p className="profile-metas__more">

              +{profile.longTermGoals.length - 4} meta{profile.longTermGoals.length - 4 > 1 ? 's' : ''} em Metas

            </p>

          )}

        </Card>



        <Card

          title="Cronômetros"

          action={

            <LinkButton to="/estudos" variant="ghost" className="btn--inline">

              Gerenciar

            </LinkButton>

          }

        >

          {topTimers.length === 0 ? (

            <p className="profile-panel__empty">Nenhum cronômetro configurado.</p>

          ) : (

            <ul className="profile-timers-list">

              {topTimers.map((timer) => (

                <li key={timer.id} className="profile-timers-list__item">

                  <span className="profile-timers-list__main">

                    <span className="profile-timers-list__name">{timer.name}</span>

                    <span className="profile-timers-list__meta">

                      {TIMER_TYPE_LABELS[timer.type]} · {timerSubtitle(timer, profile)}

                    </span>

                  </span>

                  <span className="profile-timers-list__time">

                    {formatDuration(timer.totalSeconds + timer.elapsedSeconds)}

                  </span>

                </li>

              ))}

            </ul>

          )}

          {profile.studyTimers.length > 5 && (

            <p className="profile-metas__more">

              +{profile.studyTimers.length - 5} cronômetro

              {profile.studyTimers.length - 5 > 1 ? 's' : ''} em Estudos

            </p>

          )}

        </Card>

      </div>



      <LessonHistorySection profile={profile} />



      <ProfileEditDialog

        open={editOpen}

        fullName={fullName}

        email={profile.email}

        goal={profile.goal}

        saving={saving}

        onClose={() => setEditOpen(false)}

        onSave={handleSave}

      />

    </div>

  );

}

