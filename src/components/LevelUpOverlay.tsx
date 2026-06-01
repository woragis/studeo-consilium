import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { fireLevelUpConfetti } from '../lib/confetti';
import { onLevelUp } from '../lib/level-up';
import { showToast } from '../lib/toast';

export function LevelUpOverlay() {
  const [visible, setVisible] = useState(false);
  const [level, setLevel] = useState(1);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch('/lottie/celebration.json')
      .then((r) => r.json())
      .then((data) => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, []);

  useEffect(() => {
    return onLevelUp((lv) => {
      setLevel(lv);
      setVisible(true);
      fireLevelUpConfetti();
      showToast(`Parabéns! Você alcançou o nível ${lv}!`, 'success');
      window.setTimeout(() => setVisible(false), 3200);
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      className="level-up-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-up-title"
    >
      <div className="level-up-overlay__backdrop" aria-hidden onClick={() => setVisible(false)} />
      <div className="level-up-overlay__card">
        {animationData ? (
          <div className="level-up-overlay__lottie">
            <Lottie animationData={animationData} loop={false} style={{ width: 120, height: 120 }} />
          </div>
        ) : (
          <div className="level-up-overlay__emoji" aria-hidden>
            🎉
          </div>
        )}
        <p className="level-up-overlay__eyebrow">Level up!</p>
        <h2 id="level-up-title" className="level-up-overlay__title">
          Nível {level}
        </h2>
        <p className="level-up-overlay__sub">Continue estudando para subir ainda mais.</p>
      </div>
    </div>
  );
}
