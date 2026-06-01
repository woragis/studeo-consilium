import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'lesson-newton',
    slug: 'leis-de-newton-inercia',
    subjectId: 'fisica',
    title: 'Leis de Newton: Inércia e dinâmica',
    subtitle: 'Fundamentos para questões de mecânica no ENEM',
    durationMinutes: 45,
    recommended: true,
    modules: [
      {
        title: 'Primeira lei — inércia',
        body: 'Corpos em repouso ou MRU permanecem assim se a resultante das forças for nula. Relacione com referenciais inerciais.',
      },
      {
        title: 'Segunda lei — F = ma',
        body: 'A aceleração é diretamente proporcional à força resultante e inversamente proporcional à massa.',
      },
      {
        title: 'Terceira lei — ação e reação',
        body: 'Forças sempre aparecem em pares de mesma intensidade, mesma direção e sentidos opostos.',
      },
    ],
  },
  {
    id: 'lesson-cinematica',
    slug: 'cinematica-vetores',
    subjectId: 'fisica',
    title: 'Cinemática e vetores',
    subtitle: 'Posição, velocidade e aceleração em uma e duas dimensões',
    durationMinutes: 40,
    modules: [
      {
        title: 'Grandezas escalares e vetoriais',
        body: 'Diferença entre módulo, direção e sentido. Decomposição em eixos x e y.',
      },
      {
        title: 'Movimento uniforme e uniformemente variado',
        body: 'Funções horárias e gráficos s × t e v × t.',
      },
    ],
  },
  {
    id: 'lesson-funcoes',
    slug: 'funcoes-1-grau',
    subjectId: 'matematica',
    title: 'Funções do 1º grau',
    subtitle: 'Gráficos, coeficientes e problemas contextualizados',
    durationMinutes: 35,
    modules: [
      {
        title: 'Definição e gráfico',
        body: 'f(x) = ax + b: identifique angular e linear. Interseções com os eixos.',
      },
      {
        title: 'Problemas do cotidiano',
        body: 'Modelagem de custos fixos + variáveis e leitura de gráficos.',
      },
    ],
  },
  {
    id: 'lesson-progressoes',
    slug: 'progressoes',
    subjectId: 'matematica',
    title: 'Progressões PA e PG',
    subtitle: 'Termo geral, soma e aplicações em matemática financeira',
    durationMinutes: 50,
    modules: [
      {
        title: 'Progressão aritmética',
        body: 'an = a1 + (n-1)r e soma dos n primeiros termos.',
      },
      {
        title: 'Progressão geométrica',
        body: 'an = a1 · q^(n-1). Juros compostos como PG.',
      },
    ],
  },
  {
    id: 'lesson-tabela',
    slug: 'tabela-periodica',
    subjectId: 'quimica',
    title: 'Tabela periódica e ligações',
    subtitle: 'Famílias, períodos e tipos de ligação química',
    durationMinutes: 38,
    modules: [
      {
        title: 'Organização periódica',
        body: 'Propriedades periódicas: raio atômico, eletronegatividade e energia de ionização.',
      },
      {
        title: 'Ligações iônica, covalente e metálica',
        body: 'Compare transferência e compartilhamento de elétrons.',
      },
    ],
  },
  {
    id: 'lesson-organica',
    slug: 'reacoes-organicas-intro',
    subjectId: 'quimica',
    title: 'Introdução às reações orgânicas',
    subtitle: 'Grupos funcionais e nomenclatura básica',
    durationMinutes: 42,
    modules: [
      {
        title: 'Hidrocarbonetos',
        body: 'Alcanos, alcenos e alcinos: fórmulas gerais e insaturação.',
      },
      {
        title: 'Reações de adição e substituição',
        body: 'Exemplos clássicos cobrados em vestibular.',
      },
    ],
  },
  {
    id: 'lesson-interpretacao',
    slug: 'interpretacao-texto',
    subjectId: 'portugues',
    title: 'Interpretação de texto ENEM',
    subtitle: 'Estratégias para inferência e coesão',
    durationMinutes: 55,
    modules: [
      {
        title: 'Tese e argumentos',
        body: 'Localize a ideia central e os conectivos que articulam o texto.',
      },
      {
        title: 'Intertextualidade e ironia',
        body: 'Leia além do literal: contexto histórico e intenção do autor.',
      },
    ],
  },
  {
    id: 'lesson-crase',
    slug: 'gramatica-crase',
    subjectId: 'portugues',
    title: 'Crase e regência',
    subtitle: 'Quando usar ou não o acento grave',
    durationMinutes: 30,
    modules: [
      {
        title: 'Crase facultativa e obrigatória',
        body: 'Substitua por feminino ou plural para testar: à(s) + palavra feminina.',
      },
      {
        title: 'Regência verbal e nominal',
        body: 'Verbos e nomes que exigem preposição específica.',
      },
    ],
  },
];

export function getLessonBySlug(slug: string) {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonById(id: string) {
  return lessons.find((l) => l.id === id);
}
