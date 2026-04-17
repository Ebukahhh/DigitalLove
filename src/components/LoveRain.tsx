import { useEffect, useRef } from 'react';

export default function LoveRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const particles: {x:number, y:number, speed:number, opacity:number, scale:number, text: string}[] = [];
    for(let i=0; i<300; i++){
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.5,
        scale: 0.5 + Math.random() * 1.5,
        text: "I love you"
      });
    }
    
    const draw = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.fillStyle = `rgba(244, 63, 94, ${p.opacity})`;
        ctx.font = `${16 * p.scale}px "Dancing Script", cursive`;
        ctx.fillText(p.text, p.x, p.y);
        p.y += p.speed;
        
        if(p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0" 
    />
  );
}
