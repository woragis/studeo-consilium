import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { hasErrors, validateRegister } from '../lib/validators';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ReturnType<typeof validateRegister>>({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 500);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validateRegister(firstName, lastName, email, password, confirmPassword);
    setErrors(nextErrors);
    setFormError('');
    if (hasErrors(nextErrors)) {
      triggerShake();
      return;
    }

    setSubmitting(true);
    try {
      await register(firstName, lastName, email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Não foi possível criar a conta.');
      triggerShake();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <h1 className="auth-card__title">Criar conta</h1>

      <form
        className={`auth-form ${shake ? 'auth-form--shake' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          label="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
        />
        <Input
          label="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Senha"
          type="password"
          placeholder="mín. 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="repita a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        {formError && (
          <p className="form-banner form-banner--error" role="alert">
            {formError}
          </p>
        )}
        <Button type="submit" className="auth-form__submit" disabled={submitting}>
          {submitting ? 'Registrando…' : 'Registrar-se'}
        </Button>
      </form>

      <p className="auth-card__footer">
        Já possui cadastro? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
