import { useState } from 'react';
import { Link } from 'react-router-dom';
import { heuristics } from '../data/heuristics';
import { Card } from '../components/ui/Card';

export function UxAuditPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="page audit-page">
      <header className="page__hero">
        <h2>Auditoria UX aplicada ao Studeo Consilium</h2>
        <p>
          Toque em cada heurística para ver como ela foi aplicada no redesign. Ideal para a
          apresentação da disciplina.
        </p>
        <Link to="/ajuda" className="text-link">
          Ver guia de uso do app →
        </Link>
      </header>
      <div className="audit-grid">
        {heuristics.map((h, i) => {
          const isOpen = openIndex === i;
          return (
            <Card
              key={h.title}
              className={`audit-card stagger-item ${isOpen ? 'audit-card--open' : ''}`}
            >
              <button
                type="button"
                className="audit-card__trigger"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>
                  {i + 1}. {h.title}
                </span>
                <span className={`accordion__chevron ${isOpen ? 'accordion__chevron--open' : ''}`}>
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="audit-card__body accordion__panel--open">
                  <p>{h.examples}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
