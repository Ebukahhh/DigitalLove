import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface EntryScreenProps {
  key?: string;
  onOpen: () => void;
}

function drawRose(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number, rotation: number,
  alpha: number
) {
  if (alpha <= 0.01) return;
  const r = size;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Sepal (green base peeking out)
  ctx.fillStyle = '#14532d';
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.18, r * 0.05, -r * 0.1, r * 0.55, 0, r * 0.45);
    ctx.bezierCurveTo(r * 0.1, r * 0.55, r * 0.18, r * 0.05, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Outer petals – 5, fully open, deep crimson
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2);
    ctx.fillStyle = '#9f0f28';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.52, -r * 0.12, -r * 0.62, -r * 0.82, 0, -r * 1.08);
    ctx.bezierCurveTo(r * 0.62, -r * 0.82, r * 0.52, -r * 0.12, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Outer petals highlight layer
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2);
    ctx.fillStyle = '#be123c';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.38, -r * 0.1, -r * 0.44, -r * 0.68, 0, -r * 0.88);
    ctx.bezierCurveTo(r * 0.44, -r * 0.68, r * 0.38, -r * 0.1, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Mid petals – 5, offset 36°, mid red
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2 + Math.PI / 5);
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.38, -r * 0.1, -r * 0.44, -r * 0.64, 0, -r * 0.78);
    ctx.bezierCurveTo(r * 0.44, -r * 0.64, r * 0.38, -r * 0.1, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Inner cupped petals – 4, slightly brighter
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i / 4) * Math.PI * 2 + Math.PI / 8);
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.28, -r * 0.08, -r * 0.32, -r * 0.44, 0, -r * 0.52);
    ctx.bezierCurveTo(r * 0.32, -r * 0.44, r * 0.28, -r * 0.08, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Innermost tight spiral – 3 petals, light pink
  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.rotate((i / 3) * Math.PI * 2);
    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.05, -r * 0.2, -r * 0.26, 0, -r * 0.3);
    ctx.bezierCurveTo(r * 0.2, -r * 0.26, r * 0.18, -r * 0.05, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Tiny center button
  ctx.fillStyle = '#fda4af';
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => Math.pow(t, 3);

export default function EntryScreen({ onOpen }: EntryScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpening, setIsOpening] = useState(false);

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

    type Particle = {
      angle: number;
      maxDist: number;
      life: number;
      speed: number;
      size: number;
      rot: number;
      rotSpeed: number;
    };

    const COUNT = 48;
    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => ({
      angle: (Math.PI * 2 * i) / COUNT + (Math.random() - 0.5) * 0.45,
      maxDist: 80 + Math.random() * 260,
      life: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      size: 20 + Math.random() * 24,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
    }));

    let animId: number;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const p of particles) {
        p.life = (p.life + p.speed) % 1;
        p.rot += p.rotSpeed;

        let dist = 0;
        let alpha = 0;

        if (p.life < 0.45) {
          const t = p.life / 0.45;
          dist = p.maxDist * easeOut(t);
          alpha = Math.min(1, t * 5);
        } else if (p.life < 0.55) {
          dist = p.maxDist;
          alpha = 1;
        } else {
          const t = (p.life - 0.55) / 0.45;
          dist = p.maxDist * (1 - easeIn(t));
          alpha = Math.pow(1 - t, 2);
        }

        drawRose(
          ctx,
          cx + Math.cos(p.angle) * dist,
          cy + Math.sin(p.angle) * dist,
          p.size, p.rot, alpha
        );
      }

      animId = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(onOpen, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <motion.div
        animate={isOpening
          ? { scale: 1.5, opacity: 0 }
          : { y: [0, -12, 0] }
        }
        transition={isOpening
          ? { duration: 0.8, ease: 'easeIn' }
          : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative z-10 flex flex-col items-center gap-10"
      >
        {/* Envelope */}
        <div
          className="relative w-64 h-48 sm:w-80 sm:h-60"
          style={{ perspective: '600px' }}
        >
          {/* Body */}
          <div
            className="absolute inset-0 rounded-lg shadow-[0_0_80px_rgba(244,63,94,0.55),0_0_140px_rgba(244,63,94,0.2)]"
            style={{
              background: 'linear-gradient(150deg, #500924 0%, #881337 45%, #4c0519 100%)',
              border: '1px solid rgba(244,63,94,0.35)',
            }}
          >
            {/* Bottom V crease */}
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 320 240" preserveAspectRatio="none">
              <polygon points="0,240 320,240 160,120" fill="rgba(244,63,94,0.13)" />
            </svg>
            {/* Left fold */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 240" preserveAspectRatio="none">
              <polygon points="0,0 160,120 0,240" fill="rgba(0,0,0,0.18)" />
            </svg>
            {/* Right fold */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 240" preserveAspectRatio="none">
              <polygon points="320,0 160,120 320,240" fill="rgba(0,0,0,0.18)" />
            </svg>
          </div>

          {/* Animated flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-20"
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            animate={{ rotateX: [0, -155, -155, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 0.3,
              ease: [0.4, 0, 0.6, 1],
              times: [0, 0.3, 0.7, 1],
            }}
          >
            <svg
              viewBox="0 0 320 130"
              className="w-full"
              style={{ display: 'block' }}
              preserveAspectRatio="none"
              height="65"
            >
              <polygon
                points="0,0 320,0 160,130"
                fill="#5c0a24"
                stroke="rgba(244,63,94,0.3)"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>

          {/* Heart seal */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-rose-500 text-rose-400 drop-shadow-[0_0_16px_rgba(244,63,94,0.9)]" />
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-4xl sm:text-5xl font-serif text-rose-100 tracking-tight drop-shadow-md mb-5"
          >
            A Gift For You
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.55, 1] }}
            transition={{ delay: 1.3, duration: 2.4, repeat: Infinity }}
            className="flex items-center justify-center gap-2 text-rose-400 text-sm font-medium tracking-widest uppercase"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Tap to open</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
