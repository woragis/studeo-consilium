import type { HeuristicItem } from '../types';

export const heuristics: HeuristicItem[] = [
  {
    title: 'Visibilidade do status do sistema',
    examples: 'Cronômetro, progresso de XP, estados das metas e mensagens de sucesso/erro.',
  },
  {
    title: 'Correspondência com o mundo real',
    examples: 'Metas, simulados, redação, horas estudadas e nomes das matérias do vestibular.',
  },
  {
    title: 'Controle e liberdade do usuário',
    examples: 'Pausar e finalizar sessão, editar perfil e confirmar exclusão de metas.',
  },
  {
    title: 'Consistência e padrões',
    examples: 'Barra superior, sidebar, botões e cards reutilizados em todas as telas.',
  },
  {
    title: 'Prevenção de erros',
    examples: 'Validação no cadastro, confirmação antes de excluir e campos obrigatórios.',
  },
  {
    title: 'Reconhecimento em vez de memorização',
    examples: 'Menu com ícones e rótulos; tarefas e aula recomendada visíveis no início.',
  },
  {
    title: 'Flexibilidade e eficiência de uso',
    examples: 'Atalhos: continuar aula, nova tarefa e iniciar matéria no cronômetro.',
  },
  {
    title: 'Design estético e minimalista',
    examples: 'Poucos elementos por card, hierarquia tipográfica clara e espaço em branco.',
  },
  {
    title: 'Ajuda ao usuário a reconhecer e recuperar erros',
    examples: 'Mensagens que explicam a causa e sugerem a próxima ação, sem culpar o usuário.',
  },
];
