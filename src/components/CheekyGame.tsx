import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Flower2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheekyGameProps {
  key?: string;
  onComplete: () => void;
}

export default function CheekyGame({ onComplete }: CheekyGameProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [sheSaidYes, setSheSaidYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    const maxX = 120;
    const maxY = 100;
    
    let randomX = (Math.random() - 0.5) * 2 * maxX;
    let randomY = (Math.random() - 0.5) * 2 * maxY;
    
    if (Math.abs(randomX - noPosition.x) < 40) randomX += 50 * (randomX > 0 ? 1 : -1);
    if (Math.abs(randomY - noPosition.y) < 40) randomY += 50 * (randomY > 0 ? 1 : -1);

    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    setSheSaidYes(true);
    const end = Date.now() + 2 * 1000;
    const colors = ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 overflow-hidden"
      ref={containerRef}
    >
      <motion.div 
        className="max-w-md w-full bg-black/50 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(244,63,94,0.15)] border border-rose-500/30 text-center flex flex-col items-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-500/20 to-transparent" />
        
        <motion.div
           animate={sheSaidYes ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : { y: [0, -10, 0] }}
           transition={sheSaidYes ? { duration: 1 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
           className="w-32 h-32 mb-8 relative z-10 flex items-center justify-center"
        >
          <div className="relative w-full h-full text-rose-500">
             <Flower2 className="w-20 h-20 absolute top-2 left-6 z-20 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] text-rose-500" />
             <Flower2 className="w-16 h-16 absolute bottom-2 left-0 -rotate-12 drop-shadow-[0_0_10px_rgba(251,113,133,0.5)] text-rose-400" />
             <Flower2 className="w-16 h-16 absolute bottom-2 right-0 rotate-12 drop-shadow-[0_0_10px_rgba(225,29,72,0.5)] text-rose-600 z-10" />
             <Flower2 className="w-14 h-14 absolute top-0 right-4 rotate-45 drop-shadow-sm text-pink-300" />
          </div>
        </motion.div>

        <h2 className="text-3xl font-serif text-rose-100 mb-10 relative z-10 drop-shadow-md">
          {sheSaidYes ? "Of course you do! ❤️" : "Do you love me?"}
        </h2>

        {!sheSaidYes ? (
          <div className="flex items-center justify-center gap-6 w-full relative h-[60px] z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleYes}
              className="px-8 py-3 rounded-full bg-rose-500 text-white font-medium shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:bg-rose-600 transition-colors"
            >
              Yes
            </motion.button>
            
            <motion.button
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onClick={moveNoButton} 
              className="px-8 py-3 rounded-full bg-black/50 backdrop-blur-md border border-rose-500/50 text-rose-300 font-medium shadow-sm hover:text-rose-200"
            >
              No
            </motion.button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 relative z-10"
          >
            <p className="text-xl text-rose-300 font-medium font-serif mt-4 relative z-10 block drop-shadow-sm">
              I love you more!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-6 py-3 rounded-full bg-rose-500 text-white font-medium shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:bg-rose-600 transition-colors flex items-center gap-2 mt-4 cursor-pointer"
            >
              Open your gift
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
