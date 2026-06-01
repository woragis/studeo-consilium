export interface LevelUpDetail {
  level: number;
}

const EVENT_NAME = 'studeo:level-up';

export function emitLevelUp(level: number) {
  window.dispatchEvent(
    new CustomEvent<LevelUpDetail>(EVENT_NAME, { detail: { level } }),
  );
}

export function onLevelUp(handler: (level: number) => void) {
  const listener = (e: Event) => {
    const ev = e as CustomEvent<LevelUpDetail>;
    handler(ev.detail.level);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
