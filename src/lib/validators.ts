export interface FieldErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export function validateLogin(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!email.trim()) {
    errors.email = 'Informe seu e-mail para continuar.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Use um e-mail válido (ex.: nome@email.com).';
  }
  if (!password) {
    errors.password = 'Informe sua senha.';
  }
  return errors;
}

export function validateRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
): FieldErrors {
  const errors: FieldErrors = {};
  if (!firstName.trim()) errors.firstName = 'Informe seu nome.';
  if (!lastName.trim()) errors.lastName = 'Informe seu sobrenome.';
  if (!email.trim()) {
    errors.email = 'Informe seu e-mail.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Use um e-mail válido.';
  }
  if (!password) {
    errors.password = 'Crie uma senha.';
  } else if (password.length < 8) {
    errors.password = 'A senha precisa ter no mínimo 8 caracteres.';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'As senhas não coincidem. Digite novamente.';
  }
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
