import { Link } from 'react-router-dom';

interface PresentationAuditLinkProps {
  className?: string;
  onNavigate?: () => void;
}

export function PresentationAuditLink({ className = '', onNavigate }: PresentationAuditLinkProps) {
  return (
    <Link
      to="/auditoria-ux"
      className={`presentation-audit-link ${className}`.trim()}
      title="Auditoria UX — material de apresentação acadêmica"
      onClick={onNavigate}
    >
      Auditoria UX
    </Link>
  );
}
