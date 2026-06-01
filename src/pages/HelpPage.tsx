import { Card } from '../components/ui/Card';

const faq = [
  {
    q: 'Como continuo uma aula?',
    a: 'No Início, use "Continuar aula", ou abra o catálogo em Aulas e escolha a disciplina.',
  },
  {
    q: 'O cronômetro salva se eu atualizar a página?',
    a: 'Sim. O tempo e a matéria ativa ficam no armazenamento local do navegador.',
  },
  {
    q: 'Como ganho XP?',
    a: 'Finalize sessões de estudo (+10 XP) e conclua aulas (+25 XP ao chegar a 100%).',
  },
];

export function HelpPage() {
  return (
    <div className="page help-page">
      <header className="page__hero">
        <h2>Como usar o Studeo Consilium</h2>
        <p>Guia rápido — heurística 10: ajuda e documentação.</p>
      </header>
      <div className="help-grid">
        {faq.map((item) => (
          <Card key={item.q} title={item.q}>
            <p>{item.a}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
