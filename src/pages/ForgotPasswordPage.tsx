import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { showToast } from '../lib/toast';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    showToast('Se o e-mail existir, você receberá instruções em breve.', 'success');
  }

  return (
    <div className="auth-card">
      <h1 className="auth-card__title">Recuperar senha</h1>
      {sent ? (
        <>
          <p className="auth-card__subtitle">
            Enviamos um link de recuperação para <strong>{email}</strong>. Verifique sua caixa de
            entrada (protótipo educacional — sem envio real).
          </p>
          <Link to="/login" className="auth-link auth-link--block">
            Voltar ao login
          </Link>
        </>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="auth-form__submit">
            Enviar link
          </Button>
          <Link to="/login" className="auth-link auth-link--center">
            Voltar ao login
          </Link>
        </form>
      )}
    </div>
  );
}
