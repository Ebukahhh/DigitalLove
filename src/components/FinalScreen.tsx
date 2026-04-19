import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalScreenProps {
  key?: string;
  onRestart: () => void;
}

export default function FinalScreen({ onRestart }: FinalScreenProps) {
  useEffect(() => {
    const colors = ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#ffd97d'];
    const end = Date.now() + 3000;

    (function burst() {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors });
      confetti({ particleCount: 4, angle: 90, spread: 120, origin: { x: 0.5, y: 0.6 }, colors });
      if (Date.now() < end) requestAnimationFrame(burst);
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 w-full"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.2, type: 'spring', stiffness: 120, damping: 18 }}
        className="text-center relative z-10 max-w-md w-full"
      >
        {/* Glowing card */}
        <div
          className="rounded-3xl p-10 border border-rose-500/25 shadow-[0_0_60px_rgba(244,63,94,0.15),0_0_120px_rgba(244,63,94,0.08)]"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(20px)' }}
        >
          {/* Orbiting hearts */}
          <div className="relative inline-block mb-8">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
            </motion.div>

            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
              >
                <motion.div
                  style={{ translateY: -(28 + i * 8) }}
                  animate={{ scale: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <Heart
                    className="fill-rose-400 text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                    style={{ width: 10 - i, height: 10 - i }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-rose-100 mb-6 leading-tight drop-shadow-md">
            That's it…{' '}
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-rose-400"
            >
              I hope this made you smile ❤️
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-rose-200/70 font-medium mb-12 text-lg"
          >
            You deserve all the happiness in the world, Leona.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={onRestart}
            className="px-7 py-3 rounded-full border border-rose-500/50 text-rose-300 hover:bg-rose-500/15 hover:border-rose-400 transition-colors text-sm font-medium tracking-widest uppercase cursor-pointer"
          >
            Go back to menu
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
