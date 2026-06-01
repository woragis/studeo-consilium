import confetti from 'canvas-confetti';

export function fireLevelUpConfetti() {
  const duration = 2800;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#f59e0b', '#38bdf8', '#34d399', '#fbbf24'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#f59e0b', '#38bdf8', '#34d399', '#fbbf24'],
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.55 },
    colors: ['#f59e0b', '#0ea5e9', '#34d399', '#a78bfa', '#fbbf24'],
  });
  frame();
}
