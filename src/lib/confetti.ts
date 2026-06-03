import confetti from 'canvas-confetti';

const CONFETTI_Z = 9990;

export function fireLevelUpConfetti() {
  const end = Date.now() + 1800;
  let frameId = 0;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 50,
      origin: { x: 0, y: 0.7 },
      colors: ['#f59e0b', '#38bdf8', '#34d399'],
      zIndex: CONFETTI_Z,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 50,
      origin: { x: 1, y: 0.7 },
      colors: ['#f59e0b', '#38bdf8', '#34d399'],
      zIndex: CONFETTI_Z,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) {
      frameId = requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#f59e0b', '#0ea5e9', '#34d399', '#a78bfa'],
    zIndex: CONFETTI_Z,
    disableForReducedMotion: true,
  });

  frameId = requestAnimationFrame(frame);

  window.setTimeout(() => {
    cancelAnimationFrame(frameId);
    confetti.reset();
  }, 2000);
}
