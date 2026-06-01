# Studeo Consilium

App web de organização de estudos para vestibular — projeto acadêmico de **UX e Usabilidade Web**.

Protótipo visual: `../design-prototipo/`  
Planos: `plano-projeto-studeo-consilium.md` e `plano-implementacao-react.md`

## Stack

- React 19 + Vite + TypeScript
- React Router
- Persistência: `localStorage` (usuários, perfil, progresso) + `sessionStorage`/cookie (sessão)

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Conta demonstração

| Campo | Valor |
|-------|--------|
| E-mail | `carlos@email.com` |
| Senha | `senha12345` |

Ou use o botão **Entrar com conta demo** na tela de login.

## Roteiro de demo (5 min)

1. Login com conta demo → **Início**
2. **Continuar aula** → detalhe → avançar progresso
3. **Iniciar cronômetro** → Estudos → pausar/finalizar (+XP)
4. **Nova tarefa** → marcar concluída
5. **Perfil** → salvar objetivo
6. **Auditoria UX** → heurísticas de Nielsen

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

## Estrutura

```
src/
  data/       # aulas, matérias, heurísticas (mock)
  lib/        # storage, sessão, validação, XP
  context/    # auth e cronômetro
  pages/      # telas da aplicação
  components/ # UI reutilizável
```

> Senhas em texto no `localStorage` são apenas para protótipo educacional.
