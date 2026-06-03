import type { Lesson, SubjectId } from '../types';

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
  {
    id: 'lesson-energia',
    slug: 'energia-trabalho-potencia',
    subjectId: 'fisica',
    title: 'Energia, trabalho e potência',
    subtitle: 'Conservação de energia e rendimento em máquinas',
    durationMinutes: 48,
    modules: [
      {
        title: 'Trabalho de uma força',
        body: 'W = F · d · cos θ. Trabalho positivo, negativo e nulo em deslocamentos reais.',
      },
      {
        title: 'Energia cinética e potencial',
        body: 'Teorema trabalho–energia cinética e conversão entre formas de energia mecânica.',
      },
    ],
  },
  {
    id: 'lesson-ondas',
    slug: 'ondulatoria-som',
    subjectId: 'fisica',
    title: 'Ondulatória e som',
    subtitle: 'Frequência, período, velocidade de propagação e fenômenos ondulatórios',
    durationMinutes: 44,
    modules: [
      {
        title: 'Parâmetros de uma onda',
        body: 'Relação v = λf. Diferença entre ondas mecânicas e eletromagnéticas.',
      },
      {
        title: 'Reflexão, refração e difração',
        body: 'Comportamento em interfaces e aberturas — base para acústica e óptica.',
      },
    ],
  },
  {
    id: 'lesson-eletrostatica',
    slug: 'eletrostatica-coulomb',
    subjectId: 'fisica',
    title: 'Eletrostática e lei de Coulomb',
    subtitle: 'Cargas elétricas, campo e potencial escalar',
    durationMinutes: 46,
    modules: [
      {
        title: 'Processos de eletrização',
        body: 'Atrito, contato e indução. Conservação de carga em sistemas isolados.',
      },
      {
        title: 'Força elétrica e campo',
        body: 'Lei de Coulomb e linhas de campo. Superposição de cargas pontuais.',
      },
    ],
  },
  {
    id: 'lesson-optica',
    slug: 'optica-geometrica',
    subjectId: 'fisica',
    title: 'Óptica geométrica',
    subtitle: 'Reflexão, refração e formação de imagens em espelhos e lentes',
    durationMinutes: 42,
    modules: [
      {
        title: 'Espelhos planos e esféricos',
        body: 'Construção de imagens e equação dos pontos conjugados.',
      },
      {
        title: 'Lentes convergentes e divergentes',
        body: 'Aumento linear, vergência e defeitos de visão mais comuns.',
      },
    ],
  },
  {
    id: 'lesson-funcoes-2',
    slug: 'funcoes-2-grau',
    subjectId: 'matematica',
    title: 'Funções do 2º grau',
    subtitle: 'Parábola, vértice, raízes e problemas de maximização',
    durationMinutes: 45,
    modules: [
      {
        title: 'Forma canônica e vértice',
        body: 'xv = -b/2a e yv = -Δ/4a. Identifique concavidade pelo sinal de a.',
      },
      {
        title: 'Inequações e máximo/mínimo',
        body: 'Estudo do sinal do trinômio e modelagem de área, lucro e lançamentos.',
      },
    ],
  },
  {
    id: 'lesson-trigonometria',
    slug: 'trigonometria-enem',
    subjectId: 'matematica',
    title: 'Trigonometria no ENEM',
    subtitle: 'Ciclo trigonométrico, identidades e triângulo retângulo',
    durationMinutes: 52,
    modules: [
      {
        title: 'Razões trigonométricas',
        body: 'Seno, cosseno e tangente no triângulo retângulo e no círculo unitário.',
      },
      {
        title: 'Equações e gráficos',
        body: 'Relações fundamentais e leitura de funções periódicas.',
      },
    ],
  },
  {
    id: 'lesson-geometria-espacial',
    slug: 'geometria-espacial',
    subjectId: 'matematica',
    title: 'Geometria espacial',
    subtitle: 'Prismas, pirâmides, cilindros, cones e esferas',
    durationMinutes: 50,
    modules: [
      {
        title: 'Áreas e volumes',
        body: 'Fórmulas essenciais e planificação de sólidos para visualização.',
      },
      {
        title: 'Problemas contextualizados',
        body: 'Embalagens, reservatórios e comparativo entre diferentes sólidos.',
      },
    ],
  },
  {
    id: 'lesson-estatistica',
    slug: 'estatistica-probabilidade',
    subjectId: 'matematica',
    title: 'Estatística e probabilidade',
    subtitle: 'Média, mediana, gráficos e contagem de casos',
    durationMinutes: 40,
    modules: [
      {
        title: 'Medidas de tendência central',
        body: 'Média aritmética, mediana e moda em tabelas e gráficos do ENEM.',
      },
      {
        title: 'Probabilidade clássica',
        body: 'Espaço amostral, eventos complementares e união de eventos.',
      },
    ],
  },
  {
    id: 'lesson-estequiometria',
    slug: 'estequiometria',
    subjectId: 'quimica',
    title: 'Estequiometria',
    subtitle: 'Balanceamento, mol e cálculos de reagentes e produtos',
    durationMinutes: 47,
    modules: [
      {
        title: 'Mol e massa molar',
        body: 'Conversão entre massa, quantidade de matéria e número de Avogadro.',
      },
      {
        title: 'Reagente limitante',
        body: 'Proporções estequiométricas e rendimento percentual de reações.',
      },
    ],
  },
  {
    id: 'lesson-termoquimica',
    slug: 'termoquimica',
    subjectId: 'quimica',
    title: 'Termoquímica',
    subtitle: 'Entalpia, calor de reação e lei de Hess',
    durationMinutes: 43,
    modules: [
      {
        title: 'Reações exotérmicas e endotérmicas',
        body: 'Diagramas de entalpia e interpretação de ΔH em equações químicas.',
      },
      {
        title: 'Lei de Hess',
        body: 'Soma de equações para calcular calor total de um processo.',
      },
    ],
  },
  {
    id: 'lesson-ph',
    slug: 'ph-solucoes',
    subjectId: 'quimica',
    title: 'pH e soluções aquosas',
    subtitle: 'Ácidos, bases, neutralização e indicadores',
    durationMinutes: 39,
    modules: [
      {
        title: 'Escala de pH e pOH',
        body: 'Relação pH + pOH = 14 em 25 °C. Soluções ácidas, básicas e neutras.',
      },
      {
        title: 'Titulação ácido–base',
        body: 'Ponto de equivalência e escolha de indicadores em laboratório.',
      },
    ],
  },
  {
    id: 'lesson-redacao',
    slug: 'redacao-enem-dissertativa',
    subjectId: 'portugues',
    title: 'Redação ENEM: dissertação',
    subtitle: 'Estrutura, repertório e proposta de intervenção',
    durationMinutes: 60,
    recommended: true,
    modules: [
      {
        title: 'Introdução, desenvolvimento e conclusão',
        body: 'Tese clara, dois argumentos com repertório e fechamento com agente, ação e efeito.',
      },
      {
        title: 'Competências e erros comuns',
        body: 'Fuga ao tema, proposta incompleta e repetição de conectivos genéricos.',
      },
    ],
  },
  {
    id: 'lesson-figuras',
    slug: 'figuras-de-linguagem',
    subjectId: 'portugues',
    title: 'Figuras de linguagem',
    subtitle: 'Metáfora, metonímia, ironia e personificação',
    durationMinutes: 32,
    modules: [
      {
        title: 'Figuras de palavra e pensamento',
        body: 'Reconheça comparação, metáfora, antítese e hipérbole em textos literários.',
      },
      {
        title: 'Figuras de construção e som',
        body: 'Anáfora, elipse, aliteração e assonância na análise de poemas.',
      },
    ],
  },
  {
    id: 'lesson-concordancia',
    slug: 'concordancia-verbal-nominal',
    subjectId: 'portugues',
    title: 'Concordância verbal e nominal',
    subtitle: 'Sujeito, predicado e casos especiais cobrados em provas',
    durationMinutes: 38,
    modules: [
      {
        title: 'Concordância verbal',
        body: 'Sujeito simples e composto, porcentagem, expressões partitivas e verbos impessoais.',
      },
      {
        title: 'Concordância nominal',
        body: 'Artigo, numeral, pronome adjetivo e adjunto adnominal concordando com o núcleo.',
      },
    ],
  },
];

const SUBJECT_IDS: SubjectId[] = ['fisica', 'matematica', 'quimica', 'portugues'];

export function isSubjectId(value: string): value is SubjectId {
  return SUBJECT_IDS.includes(value as SubjectId);
}

export function getLessonsBySubject(subjectId: SubjectId): Lesson[] {
  return lessons.filter((l) => l.subjectId === subjectId);
}

export function lessonPath(lesson: Pick<Lesson, 'subjectId' | 'slug'>): string {
  return `/aulas/${lesson.subjectId}/${lesson.slug}`;
}

export function getLessonBySlug(slug: string) {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonById(id: string) {
  return lessons.find((l) => l.id === id);
}
