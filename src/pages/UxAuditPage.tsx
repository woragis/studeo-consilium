import { heuristics } from '../data/heuristics';
import { Card } from '../components/ui/Card';

export function UxAuditPage() {
  return (
    <div className="page audit-page">
      <header className="page__hero">
        <h2>Auditoria UX aplicada ao Studeo Consilium</h2>
        <p>
          Redesign baseado nas heurísticas de usabilidade: feedback, consistência, prevenção de
          erro e reconhecimento.
        </p>
      </header>
      <div className="audit-grid">
        {heuristics.map((h, i) => (
          <Card key={h.title} title={`${i + 1}. ${h.title}`}>
            <p>{h.examples}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
