import { useEffect, useState, type FormEvent } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface ProfileEditDialogProps {
  open: boolean;
  fullName: string;
  email: string;
  goal: string;
  saving?: boolean;
  onClose: () => void;
  onSave: (data: { fullName: string; email: string; goal: string }) => void;
}

export function ProfileEditDialog({
  open,
  fullName,
  email,
  goal,
  saving = false,
  onClose,
  onSave,
}: ProfileEditDialogProps) {
  const [name, setName] = useState(fullName);
  const [mail, setMail] = useState(email);
  const [objective, setObjective] = useState(goal);

  useEffect(() => {
    if (!open) return;
    setName(fullName);
    setMail(email);
    setObjective(goal);
    document.body.style.overflow = 'hidden';

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, fullName, email, goal, onClose]);

  if (!open) return null;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSave({ fullName: name, email: mail, goal: objective });
  }

  return (
    <div
      className="confirm-dialog profile-edit-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-edit-title"
    >
      <button type="button" className="confirm-dialog__backdrop" onClick={onClose} aria-label="Fechar" />
      <div className="confirm-dialog__panel profile-edit-dialog__panel">
        <h2 id="profile-edit-title" className="confirm-dialog__title">
          Editar perfil
        </h2>
        <p className="confirm-dialog__message">Atualize seu nome, e-mail e objetivo de estudos.</p>
        <form onSubmit={handleSubmit} className="profile-form">
          <Input
            label="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <Input label="E-mail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
          <Input label="Objetivo" value={objective} onChange={(e) => setObjective(e.target.value)} />
          <div className="confirm-dialog__actions">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Salvando…' : 'Salvar alterações'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
