import { useEffect, useRef } from 'react';

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  isHeart: boolean;
};

const palette = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#e11d48'];

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.translate(x, y - r * 0.5);
  ctx.scale(r / 12, r / 12);
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(-6, -2, -12, 2, -6, 9);
  ctx.bezierCurveTo(-3, 12, 0, 14, 0, 14);
  ctx.bezierCurveTo(0, 14, 3, 12, 6, 9);
  ctx.bezierCurveTo(12, 2, 6, -2, 0, 4);
  ctx.fill();
  ctx.restore();
}

export default function CursorSparkle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const sparks: Spark[] = [];
    let lastX = -1, lastY = -1;

    const spawnSparks = (x: number, y: number) => {
      if (Math.hypot(x - lastX, y - lastY) < 6) return;
      lastX = x; lastY = y;
      for (let i = 0; i < 2; i++) {
        sparks.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -0.8 - Math.random() * 2.2,
          life: 1,
          size: 5 + Math.random() * 7,
          color: palette[Math.floor(Math.random() * palette.length)],
          isHeart: Math.random() > 0.4,
        });
      }
    };

    const onMove = (e: MouseEvent) => spawnSparks(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        spawnSparks(e.touches[i].clientX, e.touches[i].clientY);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    let animId: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= 0.035;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06;

        if (s.life <= 0) { sparks.splice(i, 1); continue; }

        const alpha = Math.pow(s.life, 1.5);
        if (s.isHeart) {
          drawHeart(ctx, s.x, s.y, s.size, s.color, alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[45]" />;
}
