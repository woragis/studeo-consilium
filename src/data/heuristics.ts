import type { HeuristicItem } from '../types';



/**

 * As 10 heurísticas oficiais de Nielsen (NN/g), cada uma ligada a telas

 * e elementos concretos do Studeo Consilium.

 */

export const heuristics: HeuristicItem[] = [

  {

    number: 1,

    title: 'Visibilidade do status do sistema',

    screens: 'Início, Estudos, Perfil',

    evidence:

      'Cronômetro ao vivo, estados das metas, barra de XP, contador de metas restantes e toasts após ações.',

  },

  {

    number: 2,

    title: 'Correspondência entre o sistema e o mundo real',

    screens: 'Aulas, Metas, Perfil, Ajuda',

    evidence:

      'Linguagem de vestibular (simulado, redação, horas estudadas), nomes das matérias e textos curtos que qualquer vestibulando entende.',

  },

  {

    number: 3,

    title: 'Controle e liberdade do usuário',

    screens: 'Estudos, Metas, Nova tarefa',

    evidence:

      'Pausar e finalizar sessão, reabrir tarefas concluídas, cancelar em formulários, confirmação antes de excluir e toast com botão Desfazer por 5 segundos.',

  },

  {

    number: 4,

    title: 'Consistência e padrões',

    screens: 'Todas as telas logadas',

    evidence:

      'Mesma barra superior, navegação lateral (desktop) ou inferior (mobile), botões primários e cards com o mesmo estilo.',

  },

  {

    number: 5,

    title: 'Prevenção de erros',

    screens: 'Cadastro, Nova tarefa, Metas',

    evidence:

      'Senha mínima e confirmação no cadastro; toast de erro ao duplicar tarefa ou meta; metas e tarefas não podem ter o mesmo nome.',

  },

  {

    number: 6,

    title: 'Reconhecimento em vez de memorização',

    screens: 'Início, navegação',

    evidence:

      'Menu com ícones e rótulos; dashboard mostra aula recomendada e metas do dia sem exigir que o usuário lembre onde estavam.',

  },

  {

    number: 7,

    title: 'Flexibilidade e eficiência de uso',

    screens: 'Início, Aulas, Estudos',

    evidence:

      'Atalhos diretos: “Continuar aula”, “Nova tarefa” e link da aula para iniciar cronômetro na matéria correspondente.',

  },

  {

    number: 8,

    title: 'Design estético e minimalista',

    screens: 'Início, Perfil, Estudos',

    evidence:

      'Um foco por card, tarefas concluídas ocultas por padrão, perfil enxuto e hierarquia tipográfica clara — só o essencial na tela.',

  },

  {

    number: 9,

    title: 'Ajudar a reconhecer, diagnosticar e recuperar erros',

    screens: 'Login, Cadastro, Nova tarefa',

    evidence:

      'Mensagens claras em toast (tarefa duplicada, meta repetida ou conflito meta/tarefa), explicando o que fazer em seguida.',

  },

  {

    number: 10,

    title: 'Ajuda e documentação',

    screens: 'Ajuda, Auditoria UX',

    evidence:

      'Página Ajuda com FAQ de uso; link discreto à auditoria UX fica ao lado do tema, só para apresentação acadêmica.',

  },

];

