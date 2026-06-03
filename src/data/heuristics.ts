import type { HeuristicItem } from '../types';

/**
 * As 10 heurísticas oficiais de Nielsen (NN/g), cada uma ligada a telas
 * e elementos concretos do Studeo Consilium — sem forçar features que
 * não se encaixam (ex.: gamificação entra em #1, não em heurística própria).
 */
export const heuristics: HeuristicItem[] = [
  {
    number: 1,
    title: 'Visibilidade do status do sistema',
    screens: 'Início, Estudos, Perfil',
    evidence:
      'Cronômetro ao vivo, estados das metas (Pendente / Em andamento), barra de XP, contador de metas restantes e toasts após ações.',
  },
  {
    number: 2,
    title: 'Correspondência entre o sistema e o mundo real',
    screens: 'Aulas, Metas, Perfil',
    evidence:
      'Linguagem de vestibular: simulado, redação, horas estudadas, nomes das matérias (Física, Matemática) e objetivo “Medicina — UFPB”.',
  },
  {
    number: 3,
    title: 'Controle e liberdade do usuário',
    screens: 'Estudos, Metas, Perfil',
    evidence:
      'Pausar e finalizar sessão de estudo, editar dados pessoais, confirmar antes de excluir meta e sair da conta quando quiser.',
  },
  {
    number: 4,
    title: 'Consistência e padrões',
    screens: 'Todas as telas logadas',
    evidence:
      'Mesma barra superior, mesma navegação lateral (desktop) ou inferior (mobile), botões primários e cards com o mesmo estilo.',
  },
  {
    number: 5,
    title: 'Prevenção de erros',
    screens: 'Cadastro, Metas',
    evidence:
      'Senha mínima de 8 caracteres e confirmação no cadastro; diálogo de confirmação ao remover meta de longo prazo.',
  },
  {
    number: 6,
    title: 'Reconhecimento em vez de memorização',
    screens: 'Início, navegação',
    evidence:
      'Menu com ícones e rótulos; dashboard mostra aula recomendada e tarefas do dia sem exigir que o usuário lembre onde estavam.',
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
    screens: 'Login, Início, cards',
    evidence:
      'Um foco por card, hierarquia tipográfica clara, espaço em branco e ausência de elementos decorativos que competem com o conteúdo.',
  },
  {
    number: 9,
    title: 'Ajudar a reconhecer, diagnosticar e recuperar erros',
    screens: 'Login, Cadastro',
    evidence:
      'Mensagens que explicam o erro e a próxima ação (ex.: senha incorreta, senhas não coincidem), sem culpar o usuário.',
  },
  {
    number: 10,
    title: 'Ajuda e documentação',
    screens: 'Ajuda, Auditoria UX',
    evidence:
      'Página Ajuda com FAQ e links para fluxos; esta auditoria documenta o redesign para a disciplina e a apresentação.',
  },
];
