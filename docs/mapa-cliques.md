# Mapa de cliques — Studeo Consilium

Referência para apresentação e testes de usabilidade. Todos os elementos listados executam ação ou navegação.

## Área pública (sem login)

| Onde | Elemento | Ação |
|------|----------|------|
| Login | Campos + Entrar | Valida e abre o app |
| Login | Manter conectado | Cookie de sessão 7 dias |
| Login | Esqueci minha senha | `/esqueci-senha` |
| Login | Conta demo | Login Carlos + toast |
| Login | Criar cadastro | `/cadastro` |
| Cadastro | Registrar-se | Cria usuário + vai ao Início |
| Cadastro | Login | `/login` |
| Esqueci senha | Enviar link | Mensagem de sucesso (stub) |

## Header (logado)

| Elemento | Ação |
|----------|------|
| Título da seção (ex. Início) | `/` |
| STUDEO CONSILIUM | `/` |
| Perfil (canto direito) | `/perfil` |

## Sidebar (desktop)

| Item | Rota |
|------|------|
| Início | `/` |
| Aulas | `/aulas` |
| Estudos | `/estudos` |
| Metas | `/metas` |
| Perfil | `/perfil` |
| Ajuda | `/ajuda` |
| Auditoria UX | `/auditoria-ux` |
| Aparência | Toggle claro / escuro / sistema |
| Sair | Logout + `/login` + toast |

## Mobile — barra inferior

| Item | Ação |
|------|------|
| Início · Aulas · Estudos · Perfil | Rotas diretas |
| **Mais** | Abre sheet: Metas, Ajuda, Auditoria UX, Aparência, Sair |

## Início

| Elemento | Ação |
|----------|------|
| Card aula (thumb + título) | Detalhe da aula recomendada |
| Checkbox / texto da meta | Alterna pendente → em andamento → concluída (+5 XP ao concluir) |
| ⋯ na meta | `/metas` |
| Gerenciar metas | `/metas` |
| Ver catálogo / Abrir cronômetro | `/aulas` e `/estudos` |

## Aulas

| Elemento | Ação |
|----------|------|
| Filtros (Todas, Física…) | Filtra lista |
| Card da aula | `/aulas/:slug` |

## Detalhe da aula

| Elemento | Ação |
|----------|------|
| Breadcrumb | Início / Aulas |
| Área vídeo “Assistir” | +5% progresso |
| Módulo (accordion) | Expande conteúdo |
| Marcar módulo como lido | +5% |
| Continuar / Concluir | +10% ou 100% (+25 XP) |
| Iniciar cronômetro | `/estudos?subject=…` (inicia timer) |
| Voltar ao catálogo | `/aulas` |

## Estudos

| Elemento | Ação |
|----------|------|
| Iniciar / Retomar / Pausar | Cronômetro |
| Finalizar sessão | Salva tempo +10 XP |
| Linha da matéria | Seleciona e inicia timer |
| Checkbox / texto da tarefa | Conclui (+5 XP) |
| ▶ na tarefa | Inicia timer da matéria |
| Nova tarefa / Criar agora | `/tarefas/nova` |

## Nova tarefa

| Elemento | Ação |
|----------|------|
| Salvar | Adiciona tarefa → `/estudos` |
| Cancelar | `/estudos` |

## Metas

| Elemento | Ação |
|----------|------|
| Adicionar meta do dia / longo prazo | Atualiza perfil |
| × na meta longa | Confirma e remove |

## Perfil

| Elemento | Ação |
|----------|------|
| Avatar | Scroll suave ao formulário |
| Salvar alterações | Persiste + toast |
| Horas / Tarefas (estatísticas) | `/estudos` |
| Editar / Gerenciar metas | `/metas` |

## Ajuda

| Elemento | Ação |
|----------|------|
| Pergunta (accordion) | Expande resposta |
| Link em cada resposta | Rota relacionada |

## Auditoria UX

| Elemento | Ação |
|----------|------|
| Cards | Conteúdo informativo (leitura) |

## Animações (fase 5)

- Transição de página ao trocar rota
- Blobs flutuantes no login
- Hover em cards, sidebar, botões
- Checkbox de meta com “pop”
- Timer pulsando quando ativo
- Toasts com entrada suave
- Lista com stagger ao carregar
- Accordion na ajuda e nos módulos da aula
- `prefers-reduced-motion` respeitado
