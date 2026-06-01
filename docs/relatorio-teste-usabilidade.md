# Relatório de teste de usabilidade — Studeo Consilium

**Disciplina:** UX e Usabilidade Web  
**Produto:** protótipo funcional React (Studeo Consilium)  
**Método:** teste moderado de usabilidade  
**Versão do app:** branch `main` (localStorage, sem backend)

---

## 1. Objetivo

Validar se estudantes pré-vestibular conseguem usar o Studeo Consilium para:

1. Entrar ou criar conta  
2. Retomar estudos (aula recomendada)  
3. Cronometrar uma sessão por matéria  
4. Gerenciar tarefas e metas  
5. Interpretar progresso (XP, nível, estatísticas)

Os resultados alimentam o relatório acadêmico e priorizam melhorias pós-teste.

---

## 2. Participantes (preencher após recrutamento)

| ID | Perfil | Idade | Familiaridade com apps de estudo | Data |
|----|--------|-------|----------------------------------|------|
| P1 | Pré-vestibular | | Baixa / Média / Alta | |
| P2 | Pré-vestibular | | | |
| P3 | Pré-vestibular | | | |
| P4 | (opcional) | | | |
| P5 | (opcional) | | | |

**Meta:** 3 a 5 participantes com perfil próximo da persona **Carlos Henrique** (objetivo vestibular, rotina de estudos).

---

## 3. Roteiro de tarefas

Leia o termo de consentimento. Use a conta demo se preferir não cadastrar: `carlos@email.com` / `senha12345`.

| # | Tarefa | Objetivo de medição |
|---|--------|---------------------|
| T1 | Faça login (ou use conta demo) | Sucesso, tempo, erros |
| T2 | Na home, diga o que faria primeiro e abra a aula recomendada | Compreensão do dashboard |
| T3 | Avance o progresso da aula (Continuar ou módulo) | Interação no detalhe |
| T4 | Inicie o cronômetro para Física em Estudos | Navegação + cronômetro |
| T5 | Pause e finalize a sessão | Controles do timer |
| T6 | Crie uma tarefa de prioridade Alta | Formulário nova tarefa |
| T7 | Marque a tarefa como concluída | Feedback e checkbox |
| T8 | Abra o Perfil e diga o que significam XP e nível | Gamificação |
| T9 | (Mobile) Abra o menu **Mais** e acesse Ajuda | Navegação mobile |
| T10 | (Opcional) Altere o tema para escuro | Aparência |

**Pós-tarefa:** escala de 1–5 (facilidade) + 2 perguntas abertas:

- O que mais te ajudou a estudar com este app?  
- O que mais te confundiu ou atrapalhou?

---

## 4. Métricas

| Métrica | Como calcular | Meta sugerida |
|---------|---------------|---------------|
| Taxa de sucesso | Tarefas concluídas sem ajuda ÷ total | ≥ 80% em T1–T7 |
| Tempo na tarefa | Cronômetro por T1–T8 | Registrar para comparar |
| Erros | Cliques errados, voltas, abandono | Reduzir a cada rodada |
| Severidade | Crítico / Médio / Cosmético | 0 críticos na entrega |
| SUS (opcional) | Questionário padrão 10 itens | Média ≥ 68 |

---

## 5. Planilha de registro (copiar por participante)

### Participante P___

| Tarefa | Sucesso (S/N) | Tempo (s) | Erros | Observações (citação) |
|--------|-----------------|-----------|-------|------------------------|
| T1 | | | | |
| T2 | | | | |
| T3 | | | | |
| T4 | | | | |
| T5 | | | | |
| T6 | | | | |
| T7 | | | | |
| T8 | | | | |
| T9 | | | | |
| T10 | | | | |

**Facilidade geral (1–5):** ___

**Comentário positivo:**

**Comentário negativo / sugestão:**

---

## 6. Consolidação de achados (preencher após testes)

### 6.1 Problemas críticos (impedem a tarefa)

| ID | Tarefa | Descrição | Heurística Nielsen | Sugestão |
|----|--------|-----------|-------------------|----------|
| | | | | |

### 6.2 Problemas médios

| ID | Tarefa | Descrição | Heurística | Sugestão |
|----|--------|-----------|------------|----------|
| | | | | |

### 6.3 Cosméticos

| ID | Descrição | Sugestão |
|----|-----------|----------|
| | | |

---

## 7. Relação com heurísticas (evidência no app)

| Heurística | Evidência testada | Resultado esperado |
|------------|------------------|--------------------|
| 1 Visibilidade do status | Timer, XP, toasts, metas | Usuário entende estado atual |
| 2 Mundo real | Linguagem vestibular | Vocabulário familiar |
| 3 Controle e liberdade | Pausar, sair, excluir meta | Sem sensação de armadilha |
| 4 Consistência | Header, sidebar, botões | Mesmos padrões em todas as telas |
| 5 Prevenção de erros | Cadastro, confirmação excluir | Poucos erros de formulário |
| 6 Reconhecimento | Menu com rótulos, home clara | Não precisa memorizar |
| 7 Eficiência | Atalhos continuar aula, nova tarefa | Tarefas em poucos cliques |
| 8 Minimalismo | Cards focados | Sem poluição visual |
| 9 Recuperação de erros | Mensagens + shake login | Usuário sabe corrigir |
| 10 Ajuda | `/ajuda`, auditoria UX | Dúvidas resolvidas |

---

## 8. Conclusão (rascunho — completar após dados)

O teste com ___ participantes indicou que o protótipo Studeo Consilium [atende / atende parcialmente / não atende] os objetivos de organização de estudos para vestibular.

**Principais pontos fortes:**

-  
-  

**Principais melhorias priorizadas:**

1.  
2.  
3.  

**Próximos passos técnicos (fora do escopo acadêmico imediato):** backend real, recuperação de senha, deploy público.

---

## 9. Anexo — como reproduzir o teste

```bash
cd studeo-consilium
npm install
npm run dev
```

- Desktop: navegador em janela normal  
- Mobile: DevTools (375×812) ou celular na mesma rede  
- Gravar tela com consentimento  
- Preencher planilha durante ou logo após cada sessão (30–40 min por participante)

---

*Template alinhado ao roteiro em `docs/mapa-cliques.md` e ao plano em `design-prototipo/plano-projeto-studeo-consilium.md`.*
