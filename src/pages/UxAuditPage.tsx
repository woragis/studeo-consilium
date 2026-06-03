import { Link } from 'react-router-dom';
import { heuristics } from '../data/heuristics';

export function UxAuditPage() {
  return (
    <div className="page audit-page">
      <div className="audit-page__banner">
        <h2>Auditoria UX — Heurísticas de Nielsen</h2>
        <p>
          Redesign do Studeo Consilium com base nas <strong>10 heurísticas oficiais</strong> de
          usabilidade (Jakob Nielsen / NN/g). Cada item abaixo aponta para telas e elementos reais
          do protótipo.
        </p>
      </div>

      <div className="audit-grid">
        {heuristics.map((h) => (
          <article key={h.number} className="audit-card">
            <span className="audit-card__number">{h.number}</span>
            <h3 className="audit-card__title">{h.title}</h3>
            <p className="audit-card__screens">
              <span className="audit-card__label">Telas:</span> {h.screens}
            </p>
            <p className="audit-card__evidence">{h.evidence}</p>
          </article>
        ))}
      </div>

      <footer className="audit-page__footer">
        <Link to="/ajuda" className="text-link">
          Ver guia de uso do app →
        </Link>
      </footer>
    </div>
  );
}
