import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';

const faq = [
  {
    q: 'Como continuo uma aula?',
    a: 'No Início, toque no card da aula recomendada ou abra Aulas no menu e escolha a disciplina.',
    link: '/aulas',
    linkLabel: 'Ir para aulas',
  },
  {
    q: 'Como uso o cronômetro?',
    a: 'Em Estudos, crie ou selecione um cronômetro (matéria, tarefa, rotina ou meta). O tempo em andamento fica salvo ao pausar. Nas aulas, escolha qual cronômetro usar no seletor.',
    link: '/estudos',
    linkLabel: 'Abrir estudos',
  },
  {
    q: 'Como ganho XP?',
    a: 'Finalize sessões (+10 XP), conclua aulas (+25 XP), metas do dia (+5 XP) e tarefas (+5 XP).',
    link: '/perfil',
    linkLabel: 'Ver meu progresso',
  },
];

export function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="page help-page">
      <header className="page__hero">
        <h2>Como usar o Studeo Consilium</h2>
        <p>Guia rápido — toque em cada pergunta para expandir.</p>
      </header>
      <div className="help-accordion">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Card key={item.q} className="accordion">
              <button
                type="button"
                className="accordion__trigger"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className={`accordion__chevron ${isOpen ? 'accordion__chevron--open' : ''}`}>
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="accordion__panel accordion__panel--open">
                  <p>{item.a}</p>
                  <Link to={item.link} className="text-link">
                    {item.linkLabel} →
                  </Link>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
