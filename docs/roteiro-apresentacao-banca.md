# Roteiro de apresentação — Studeo Consilium

**Disciplina:** UX e Usabilidade Web  
**Formato:** 5 integrantes · ~15 minutos  
**Objeto visual:** protótipo navegável + telas Figma (`design-prototipo/`)  
**Foco:** UI/UX, heurísticas de Nielsen, persona e jornada — **não** detalhes de programação

> **Dica geral:** quem fala aponta para a tela. Use a **conta demo** na demo ao vivo (`Entrar com conta demo` ou `carlos@email.com` / `senha12345`).

---

## Distribuição do tempo

| # | Bloco (guia do professor) | Quem fala | Tempo |
|---|---------------------------|-----------|-------|
| 1 | Produto e problema | **Pessoa 1** | ~2 min |
| 2 | Personas | **Pessoa 2** | ~2 min |
| 3 | Journey Map | **Pessoa 2** | ~2 min |
| 4 | Evidências (heurística + validação) | **Pessoa 3** | ~2 min |
| 5 | Demonstração do protótipo | **Pessoa 4** | ~3 min |
| 6 | Backlog (épicos e histórias) | **Pessoa 5** | ~1 min |
| 7 | Conclusão | **Pessoa 5** | ~1 min |

---

## Pessoa 1 — Produto e problema (~2 min)

**Mostrar:** slide ou tela inicial do Figma (`1.png`) / logo **STUDEO CONSILIUM**.

---

Bom dia. Somos [nome da equipe] e vamos apresentar o **Studeo Consilium** — uma plataforma web de organização de estudos pensada para quem se prepara para vestibular e ENEM.

**Qual é o produto?**  
É um hub de rotina de estudo: o estudante vê o que fazer agora — aula em andamento, metas do dia, tempo por matéria, tarefas com prioridade e progresso no perfil. Tudo em uma interface limpa, com linguagem de vestibular, não de “sistema genérico”.

**Por que ele existe?**  
A dor que observamos na pesquisa inicial é familiar: o pré-vestibular estuda **várias matérias ao mesmo tempo**, usa **planilhas, cadernos, apps diferentes e listas soltas**. O resultado é perder o fio do que estudou ontem, não saber quanto tempo dedicou a cada disciplina e não ter clareza do que é urgente hoje.

O Studeo Consilium **centraliza** essa rotina e devolve **feedback visível** — “onde parei”, “quanto falta”, “o que priorizar” — sem exigir que o usuário monte o próprio sistema de organização.

**Para quem?**  
Para estudantes de ensino médio e pré-vestibular, em especial quem tem meta clara — medicina, engenharia, etc. — e precisa de constância, não só de conteúdo.

Não estamos vendendo um produto comercial; estamos usando esse protótipo como **prova visual dos conceitos de UX** que a disciplina trabalha: persona, jornada, heurísticas de Nielsen e redesign orientado ao usuário.

Passo a palavra para [Pessoa 2], que vai apresentar **para quem** projetamos e **como é a experiência de hoje** sem uma solução integrada.

---

## Pessoa 2 — Personas (~2 min)

**Mostrar:** slide da persona ou card do **Perfil** no app (Carlos, Medicina – UFPB).

---

O usuário central do nosso projeto é a persona **Carlos Henrique**, 17 anos, pré-vestibular.

| Dimensão | Carlos Henrique |
|----------|-----------------|
| **Objetivo** | Medicina na UFPB |
| **Rotina** | Física, Matemática, Química e Português |
| **Motivação** | Gamificação leve (nível, XP) e metas claras |
| **Frustrações** | Perder o fio do estudo; não saber tempo por matéria; listas espalhadas |
| **Comportamento** | Abre o celular entre aulas; quer retomar rápido, não reconfigurar o app |

Carlos **não** quer mais um LMS pesado. Ele quer abrir o app e ouvir, em linguagem humana: *“Seja bem-vindo, Carlos — continue a aula de Física e veja suas três metas de hoje.”*

Por isso o **Início** do protótipo não é um menu vazio: é um **painel de status** — aula recomendada, metas com estado (*Em andamento*, *Pendente*) e contador de metas restantes. Isso responde à pergunta da persona: *“O que eu faço agora?”*

Os dados que vocês veem no protótipo — 46 horas estudadas, sequência de 7 dias, tarefas de Física e Matemática — são **dados estáticos de demonstração**, alinhados ao Figma, para a banca ver o produto “vivo” sem depender de backend.

---

## Pessoa 2 — Journey Map (~2 min)

**Mostrar:** slide simples da jornada (ou desenho no quadro) + opcionalmente telas `3.png` e `4.png`.

---

Antes do redesign, mapeamos a **jornada atual** de Carlos em um dia típico de estudo — **sem** o Studeo Consilium:

```text
Manhã          Tarde              Noite
  │              │                  │
  ▼              ▼                  ▼
Acorda      Vídeo-aula         Revisão solta
sem plano   em um app          em caderno
  │              │                  │
  😐             🙂→😕            😫
```

**Curva emocional (resumo):**  
- **Início do dia — neutro/inseguro:** não sabe por onde começar.  
- **Meio — alívio → frustração:** estuda, mas não registra tempo nem progresso.  
- **Fim — sobrecarga:** lembra tarefas tarde demais; sensação de “não rendi”.

**Três pain points críticos:**

1. **Falta de visibilidade do status** — “Onde parei? Quanto falta hoje?”  
2. **Fragmentação** — cronômetro num lugar, lista noutro, aula noutro.  
3. **Pouco reconhecimento** — esforço diário não aparece; motivação cai.

Cada pain point virou **requisito de UX**, não feature aleatória. Por exemplo: pain point 1 → dashboard com aula + metas; pain point 2 → tela **Estudos** com cronômetro e tarefas juntos; pain point 3 → **Perfil** com XP, horas e sequência.

[Passo para Pessoa 3] Agora vamos mostrar **como obtivemos evidência** desses problemas e como as **heurísticas de Nielsen** guiaram o redesign.

---

## Pessoa 3 — Evidências: heurística e validação (~2 min)

**Mostrar:** `auditoria.png` ou tela **Auditoria UX** dentro do app + matriz no plano do projeto.

---

Para confirmar os pain points, não partimos só de opinião. Fizemos duas camadas de evidência:

### 1. Avaliação heurística (Nielsen)

Aplicamos as **10 heurísticas de usabilidade** ao conceito anterior e documentamos o **redesign** no guia *“06 — Heurísticas de Nielsen aplicadas”*. Destaco as mais ligadas aos pain points:

| Pain point | Heurística | Evidência no Studeo Consilium |
|------------|------------|-------------------------------|
| “Não sei onde parei” | **1 — Visibilidade do status** | Cronômetro ao vivo, estados das metas, barra de XP, toasts de feedback |
| “Apps falam outra língua” | **2 — Correspondência com o mundo real** | Metas, simulado, redação, horas estudadas, nomes das matérias |
| “Travou, não consigo voltar” | **3 — Controle e liberdade** | Pausar/finalizar sessão, editar perfil, confirmar exclusão de meta |
| “Cada tela é um layout diferente” | **4 — Consistência e padrões** | Mesmo header, sidebar, botões e cards em todas as telas |
| “Errei senha e não entendi” | **5 — Prevenção de erros** + **9 — Recuperação** | Cadastro com mínimo de 8 caracteres; mensagens que explicam o que fazer |

Tínhamos **9 heurísticas mapeadas explicitamente** no protótipo; a **10ª (Ajuda e documentação)** aparece na tela **Ajuda**, com FAQ e links para as áreas do app.

### 2. Validação formativa (sem necessidade de usuários reais na banca)

Para esta entrega, a validação é **formativa e demonstrativa**:

- **Walkthrough com a persona Carlos** — percorremos o fluxo crítico e checamos se cada tarefa da jornada está resolvida na interface.  
- **Protótipo navegável** — o professor e a banca podem clicar e ver feedback (metas, XP, cronômetro), o que simula o comportamento esperado em teste moderado.  
- **Roteiro de teste documentado** — temos tarefas T1–T10 e métricas (taxa de sucesso, severidade) prontas caso a disciplina exija teste com participantes depois.

**Em uma frase:** os pain points da jornada aparecem como **violações heurísticas** no design antigo e como **decisões visíveis** no redesign — não como opinião da equipe.

Passo para [Pessoa 4] para mostrar **como isso aparece na prática** no protótipo.

---

## Pessoa 4 — Demonstração do protótipo (~3 min)

**Mostrar:** app rodando (`npm run dev`) — **conta demo**. Ter o Figma aberto em aba secundária se perguntarem do processo.

---

Vou demonstrar o **fluxo principal** em cerca de três minutos, sempre ligando tela → heurística → pain point.

### Passo 1 — Entrada (Heurísticas 5, 9 e 8)

- Tela de **Login**: limpa, labels visíveis, link *Esqueci minha senha*, opção **Entrar com conta demo**.  
- **Cadastro**: placeholder *mín. 8 caracteres* — **prevenção de erro**, não só mensagem depois.  
- *“Interface minimalista, acessível, sem ruído.”*

### Passo 2 — Início (Heurísticas 1, 6 e 7)

- **“Seja bem-vindo, Carlos”** — personalização.  
- Card **Aula recomendada** → *Continuar aula* — atalho eficiente.  
- **Metas de hoje** com status e *“3 metas restantes”* — **status visível**; usuário **reconhece** tarefas sem memorizar menu.  
- *Pain point 1 resolvido:* ao abrir o app, Carlos sabe o que fazer.

### Passo 3 — Aula (Heurísticas 2 e 7)

- Catálogo por matéria; detalhe com **módulos**, **% de progresso**, botão **Iniciar cronômetro**.  
- Linguagem de vestibular: Newton, simulado, ENEM.  
- *Correspondência com o mundo real.*

### Passo 4 — Estudos (Heurísticas 1 e 3)

- **Cronômetro** — pausar, finalizar; lista de matérias com tempo acumulado (ex.: Física 00:25:18).  
- **Tarefas** com prioridade Alta/Média; nova tarefa.  
- *Pain points 2 e 3:* tempo registrado + lista no mesmo lugar; esforço visível.

### Passo 5 — Perfil (Heurísticas 1 e 6)

- Nível, XP, horas estudadas, sequência, metas de longo prazo (*4h diárias*, *960 na redação*).  
- Dados editáveis com feedback ao salvar.  
- *Gamificação leve* para motivação da persona.

### Passo 6 — Mobile e Ajuda (Heurísticas 4 e 10)

- Redimensionar ou celular: **barra inferior** + menu **Mais** (Metas, Ajuda, Auditoria UX, tema).  
- Tela **Ajuda** — documentação mínima; **Auditoria UX** — prova teórica dentro do produto.

**Frase de fechamento da demo:**  
*“Cada clique que mostramos foi desenhado para responder a um pain point ou a uma heurística — o protótipo é a materialização do processo de UX, não só um layout bonito.”*

Passo para [Pessoa 5] com **backlog** e **conclusão**.

---

## Pessoa 5 — Backlog (~1 min)

**Mostrar:** slide ou Trello/Jira com 3 épicos.

---

O protótipo cobre o **MVP de experiência**. No backlog, organizamos o que viria depois em **três épicos**:

### Épico 1 — Onboarding e acesso
| História | Como… | Para que… | Critério de aceitação (resumo) |
|----------|-------|-----------|--------------------------------|
| US01 | Como estudante, quero fazer login rapidamente | retomar meus estudos | Login em ≤ 3 cliques; link de recuperação visível |
| US02 | Como novo usuário, quero me cadastrar com orientação de senha | não errar na primeira tentativa | Senha &lt; 8 caracteres bloqueia envio; mensagem clara |

### Épico 2 — Rotina de estudo
| História | Como… | Para que… | Critério de aceitação (resumo) |
|----------|-------|-----------|--------------------------------|
| US03 | Como estudante, quero ver aula e metas ao abrir o app | saber o que fazer agora | Dashboard com aula recomendada + ≥ 1 meta com status |
| US04 | Como estudante, quero cronometrar Física e pausar | controlar meu tempo | Timer atualiza; pausar mantém sessão |

### Épico 3 — Progresso e motivação
| História | Como… | Para que… | Critério de aceitação (resumo) |
|----------|-------|-----------|--------------------------------|
| US06 | Como estudante, quero ver horas e sequência no perfil | manter motivação | Estatísticas legíveis em um card |
| US07 | Como estudante, quero concluir metas do dia | sentir progresso | Meta concluída atualiza status e feedback visual |

**Fora do MVP (futuro):** recuperação de senha real, simulados ENEM, notificações, backend com turma/professor.

---

## Pessoa 5 — Conclusão (~1 min)

---

**O que aprendemos sobre o usuário — e que não sabíamos no início:**

1. O vestibulando **não busca mais conteúdo** — busca **clareza imediata** (*“o que faço nos próximos 20 minutos?”*).  
2. **Registrar tempo de estudo** só funciona se for **mais fácil que anotar no caderno** — por isso cronômetro + matéria na mesma tela.  
3. **Gamificação** (XP, nível) só faz sentido se estiver ligada a **metas reais** — simulado, redação, horas — não a pontos abstratos.  
4. **Consistência visual** não é detalhe estético: reduz carga cognitiva quando o usuário já está cansado.

O Studeo Consilium mostra que **UX não é “deixar bonito”** — é traduzir dor do usuário em requisitos, validar com heurísticas e entregar um fluxo que **respeita como a pessoa realmente estuda**.

Obrigado. Estamos abertos às perguntas.

---

## Perguntas frequentes do professor (referência rápida)

| Pergunta | Quem pode responder | Resposta curta |
|----------|---------------------|----------------|
| Por que Nielsen e não só “achismo”? | Pessoa 3 | Matriz heurística documentada; cada tela justifica decisão. |
| Fizeram teste com usuários? | Pessoa 3 | Avaliação heurística + walkthrough com persona; roteiro de teste pronto; protótipo demonstra fluxos. |
| Qual o diferencial do redesign? | Pessoa 1 ou 4 | Centralizar rotina + status visível + linguagem vestibular. |
| Requisito vs solução? | Pessoa 5 | Ex.: não pedimos “card amarelo”; pedimos “usuário vê prioridade da tarefa”. |
| Acessibilidade? | Pessoa 3 ou 4 | Labels, contraste, foco, `aria` nos formulários; login “limpo e acessível” no Figma. |
| Mobile? | Pessoa 4 | Barra inferior, menu Mais, safe-area; protótipo responsivo. |

---

## Checklist antes da apresentação

- [ ] App rodando + conta demo testada  
- [ ] Figma (`design-prototipo/`) aberto  
- [ ] Slide opcional: persona + journey + 3 épicos  
- [ ] Cada pessoa sabe seu tempo (~2–3 min)  
- [ ] Pessoa 4 ensaiou a demo sem travar  
- [ ] Navegador em aba anônima (dados demo limpos) ou botão “conta demo”

---

*Roteiro alinhado ao guia da disciplina, ao `plano-projeto-studeo-consilium.md` e ao protótipo em `studeo-consilium/`.*
