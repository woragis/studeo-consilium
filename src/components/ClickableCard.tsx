import { Link, type LinkProps } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ClickableCardProps extends Omit<LinkProps, 'children'> {
  children: ReactNode;
  className?: string;
}

/** Card inteiro clicável com hover animado */
export function ClickableCard({ children, className = '', ...linkProps }: ClickableCardProps) {
  return (
    <Link className={`clickable-card card ${className}`.trim()} {...linkProps}>
      {children}
    </Link>
  );
}
