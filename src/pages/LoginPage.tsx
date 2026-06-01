import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { hasErrors, validateLogin } from '../lib/validators';

export function LoginPage() {
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/';

  const [email, setEmail] = useState('carlos@email.com');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 500);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
    setFormError('');
    if (hasErrors(nextErrors)) {
      triggerShake();
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password, remember);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Não foi possível entrar.');
      triggerShake();
    } finally {
      setSubmitting(false);
    }
  }

  function handleDemo() {
    loginDemo(remember);
    navigate(from, { replace: true });
  }

  return (
    <div className="auth-card">
      <h1 className="auth-card__brand">Studeo Consilium</h1>
      <p className="auth-card__subtitle">Entre para continuar seus estudos</p>

      <form
        className={`auth-form ${shake ? 'auth-form--shake' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <div className="auth-form__row">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Manter conectado
          </label>
          <Link to="/esqueci-senha" className="auth-link">
            Esqueci minha senha
          </Link>
        </div>
        {formError && (
          <p className="form-banner form-banner--error" role="alert">
            {formError}
          </p>
        )}
        <Button type="submit" className="auth-form__submit" disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <Button variant="ghost" className="auth-form__demo" onClick={handleDemo}>
        Entrar com conta demo
      </Button>
      <p className="auth-card__footer">
        Ainda não tem conta? <Link to="/cadastro">Criar cadastro</Link>
      </p>
      <p className="auth-card__hint">Demo: carlos@email.com / senha12345</p>
    </div>
  );
}
