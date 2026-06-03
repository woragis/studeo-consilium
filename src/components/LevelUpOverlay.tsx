import { useEffect, useState } from 'react';
import { fireLevelUpConfetti } from '../lib/confetti';
import { onLevelUp } from '../lib/level-up';
import { showToast } from '../lib/toast';

export function LevelUpOverlay() {
  const [visible, setVisible] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    return onLevelUp((lv) => {
      setLevel(lv);
      setVisible(true);
      fireLevelUpConfetti();
      showToast(`Parabéns! Você alcançou o nível ${lv}!`, 'success');
      window.setTimeout(() => setVisible(false), 2800);
    });
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="level-up-overlay"
      role="dialog"
      aria-modal="false"
      aria-labelledby="level-up-title"
    >
      <button
        type="button"
        className="level-up-overlay__backdrop"
        aria-label="Fechar comemoração"
        onClick={() => setVisible(false)}
      />
      <div className="level-up-overlay__card">
        <div className="level-up-overlay__emoji" aria-hidden>
          🎉
        </div>
        <p className="level-up-overlay__eyebrow">Level up!</p>
        <h2 id="level-up-title" className="level-up-overlay__title">
          Nível {level}
        </h2>
        <p className="level-up-overlay__sub">Continue estudando para subir ainda mais.</p>
        <button
          type="button"
          className="btn btn--ghost level-up-overlay__close"
          onClick={() => setVisible(false)}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
