export function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function isDuplicateTitle(existing: string[], candidate: string): boolean {
  const key = normalizeText(candidate);
  return existing.some((item) => normalizeText(item) === key);
}

export type ItemKind = 'meta do dia' | 'meta de longo prazo' | 'tarefa';

export function findDuplicateKind(
  candidate: string,
  pools: { kind: ItemKind; titles: string[] }[],
): ItemKind | null {
  const key = normalizeText(candidate);
  for (const pool of pools) {
    if (pool.titles.some((title) => normalizeText(title) === key)) {
      return pool.kind;
    }
  }
  return null;
}

export function duplicateBlockedMessage(
  title: string,
  foundAs: ItemKind,
  adding: ItemKind,
): string {
  const name = `«${title.trim()}»`;

  if (adding === 'tarefa' && foundAs === 'tarefa') {
    return `${name} já está na sua lista de tarefas. Confira em Estudos ou escolha outro nome.`;
  }

  if (adding === 'tarefa') {
    return `${name} já existe como ${foundAs}. Metas e tarefas não podem se repetir.`;
  }

  if (foundAs === adding) {
    if (adding === 'meta do dia') {
      return `${name} já está nas metas de hoje. Escolha outro título para evitar duplicidade.`;
    }
    return `${name} já está nas metas de longo prazo. Use um objetivo diferente.`;
  }

  return `${name} já existe como ${foundAs}. Metas e tarefas não podem se repetir.`;
}

export function goalDuplicatePools(profile: {
  dailyGoals: { title: string }[];
  longTermGoals: { title: string }[];
  tasks: { title: string }[];
}) {
  return [
    { kind: 'meta do dia' as const, titles: profile.dailyGoals.map((g) => g.title) },
    { kind: 'meta de longo prazo' as const, titles: profile.longTermGoals.map((g) => g.title) },
    { kind: 'tarefa' as const, titles: profile.tasks.map((t) => t.title) },
  ];
}

export function taskDuplicatePools(profile: {
  dailyGoals: { title: string }[];
  longTermGoals: { title: string }[];
  tasks: { title: string }[];
}) {
  return [
    { kind: 'tarefa' as const, titles: profile.tasks.map((t) => t.title) },
    { kind: 'meta do dia' as const, titles: profile.dailyGoals.map((g) => g.title) },
    { kind: 'meta de longo prazo' as const, titles: profile.longTermGoals.map((g) => g.title) },
  ];
}
