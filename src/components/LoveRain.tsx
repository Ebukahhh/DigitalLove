import { useEffect, useRef } from 'react';

type Drop = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  scale: number;
  type: 'text' | 'heart';
  text: string;
  rot: number;
  rotSpeed: number;
};

const messages = [
  'I love you', 'Mon amour', 'Always', 'Forever', 'Tu me manques', 'Ma chérie',
];

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, r * 0.3);
  ctx.bezierCurveTo(-r * 0.5, -r * 0.2, -r, r * 0.2, -r * 0.5, r * 0.7);
  ctx.bezierCurveTo(-r * 0.25, r, 0, r * 1.1, 0, r * 1.1);
  ctx.bezierCurveTo(0, r * 1.1, r * 0.25, r, r * 0.5, r * 0.7);
  ctx.bezierCurveTo(r, r * 0.2, r * 0.5, -r * 0.2, 0, r * 0.3);
  ctx.fill();
  ctx.restore();
}

export default function LoveRain() {
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

    const drops: Drop[] = [];
    for (let i = 0; i < 280; i++) {
      const isHeart = Math.random() > 0.55;
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.4 + Math.random() * 1.8,
        opacity: 0.07 + Math.random() * 0.35,
        scale: 0.5 + Math.random() * 1.4,
        type: isHeart ? 'heart' : 'text',
        text: messages[Math.floor(Math.random() * messages.length)],
        rot: (Math.random() - 0.5) * 0.6,
        rotSpeed: (Math.random() - 0.5) * 0.003,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const d of drops) {
        d.rot += d.rotSpeed;

        if (d.type === 'text') {
          ctx.save();
          ctx.globalAlpha = d.opacity;
          ctx.fillStyle = `rgba(244, 63, 94, 1)`;
          ctx.font = `${Math.round(14 * d.scale)}px "Dancing Script", cursive`;
          ctx.translate(d.x, d.y);
          ctx.rotate(d.rot);
          ctx.fillText(d.text, 0, 0);
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = d.opacity;
          ctx.fillStyle = `rgb(244, 63, 94)`;
          ctx.translate(d.x, d.y);
          ctx.rotate(d.rot);
          drawHeart(ctx, 0, 0, 6 * d.scale);
          ctx.restore();
        }

        d.y += d.speed;
        if (d.y > canvas.height + 30) {
          d.y = -30;
          d.x = Math.random() * canvas.width;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
