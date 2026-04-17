import { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Cake, Sparkles, ArrowLeft } from 'lucide-react';

interface MakeAWishProps {
  key?: string;
  onBack: () => void;
}

export default function MakeAWish({ onBack }: MakeAWishProps) {
  const [wished, setWished] = useState(false);

  const handleWish = () => {
    setWished(true);
    
    // Big celebration confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#ffffff']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 w-full"
    >
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-3 rounded-full bg-black/50 backdrop-blur-sm text-rose-400 hover:bg-black/80 hover:text-rose-300 transition-all shadow-sm z-50 border border-rose-500/20"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div 
        className="max-w-md w-full bg-black/50 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-[0_0_40px_rgba(244,63,94,0.1)] border border-rose-500/30 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-500/10 to-transparent" />
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 mb-8"
        >
          <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center shadow-inner border border-rose-500/20">
            <Cake className="w-12 h-12 text-rose-400" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-8 h-8 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
          </motion.div>
        </motion.div>

        <h2 className="text-4xl font-serif text-rose-100 mb-4 relative z-10 drop-shadow-md">Happy Birthday</h2>
        
        <p className="text-rose-200/80 mb-10 leading-relaxed relative z-10">
          Close your eyes, think of something beautiful, and make a wish. I hope all your dreams come true today and always.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWish}
          disabled={wished}
          className={`relative z-10 px-8 py-4 rounded-full font-medium text-lg transition-all duration-500 shadow-lg flex items-center gap-2 ${
            wished 
              ? 'bg-rose-950/50 text-rose-400 border border-rose-500/30 cursor-default' 
              : 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:bg-rose-600'
          }`}
        >
          {wished ? 'Wish Made ✨' : 'Make a Wish'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
