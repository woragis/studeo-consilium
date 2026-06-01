import { Link, type LinkProps } from 'react-router-dom';
import type { ReactNode } from 'react';

interface LinkButtonProps extends LinkProps {
  variant?: 'primary' | 'accent' | 'ghost';
  children: ReactNode;
}

export function LinkButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={`btn btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </Link>
  );
}
