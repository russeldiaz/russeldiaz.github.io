import { reducedMotion } from '../motion/preferences';

// Concept-art construction lines: perspective guides converging on a vanishing point
// that drifts toward the cursor, plus slowly turning spirograph ellipses.

const PENCIL_BLUE = '127, 182, 230';
const PAPER = '236, 231, 222';
const GUIDE_COUNT = 36;
const EASING = 0.04;

export function startGuides(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  const vanish = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let frame = 0;
  let running = false;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!vanish.x) {
      vanish.x = target.x = width * 0.62;
      vanish.y = target.y = height * 0.42;
    }
  }

  function drawPerspective(time: number) {
    const reach = Math.hypot(width, height);
    for (let i = 0; i < GUIDE_COUNT; i++) {
      const angle = (i / GUIDE_COUNT) * Math.PI * 2 + time * 0.00004;
      const alpha = i % 6 === 0 ? 0.22 : 0.08;
      ctx!.strokeStyle = `rgba(${PENCIL_BLUE}, ${alpha})`;
      ctx!.beginPath();
      ctx!.moveTo(vanish.x, vanish.y);
      ctx!.lineTo(vanish.x + Math.cos(angle) * reach, vanish.y + Math.sin(angle) * reach);
      ctx!.stroke();
    }
    // Horizon line through the vanishing point
    ctx!.strokeStyle = `rgba(${PENCIL_BLUE}, 0.18)`;
    ctx!.beginPath();
    ctx!.moveTo(0, vanish.y);
    ctx!.lineTo(width, vanish.y);
    ctx!.stroke();
    // Small red-line cross marking the vanishing point
    ctx!.strokeStyle = 'rgba(226, 86, 75, 0.7)';
    ctx!.beginPath();
    ctx!.moveTo(vanish.x - 7, vanish.y);
    ctx!.lineTo(vanish.x + 7, vanish.y);
    ctx!.moveTo(vanish.x, vanish.y - 7);
    ctx!.lineTo(vanish.x, vanish.y + 7);
    ctx!.stroke();
  }

  function drawSpirograph(time: number) {
    const cx = width * 0.5;
    const cy = height * 0.55;
    const radius = Math.max(width, height) * 0.42;
    ctx!.strokeStyle = `rgba(${PAPER}, 0.045)`;
    for (let i = 0; i < 14; i++) {
      ctx!.beginPath();
      ctx!.ellipse(
        cx,
        cy,
        radius,
        radius * 0.38,
        (i / 14) * Math.PI + time * 0.00006,
        0,
        Math.PI * 2,
      );
      ctx!.stroke();
    }
  }

  function draw(time: number) {
    vanish.x += (target.x - vanish.x) * EASING;
    vanish.y += (target.y - vanish.y) * EASING;
    ctx!.clearRect(0, 0, width, height);
    ctx!.lineWidth = 1;
    drawSpirograph(time);
    drawPerspective(time);
  }

  function loop(time: number) {
    draw(time);
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reducedMotion()) return;
    running = true;
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  resize();
  draw(0);

  window.addEventListener('resize', () => {
    resize();
    if (!running) draw(0);
  });
  window.addEventListener('pointermove', (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  start();
}
