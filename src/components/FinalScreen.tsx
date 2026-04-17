import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface FinalScreenProps {
  key?: string;
  onRestart: () => void;
}

export default function FinalScreen({ onRestart }: FinalScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 w-full"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="text-center relative z-10 max-w-md bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.1)]"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block mb-8"
        >
          <Heart className="w-16 h-16 text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-serif text-rose-100 mb-6 leading-tight drop-shadow-md">
          That's it... <br/>
          <span className="text-rose-400">I hope this made you smile ❤️</span>
        </h2>

        <p className="text-rose-200/70 font-medium mb-12">
          You deserve all the happiness in the world.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-6 py-3 rounded-full border border-rose-500/50 text-rose-300 hover:bg-rose-500/10 hover:border-rose-400 transition-colors text-sm font-medium tracking-widest uppercase cursor-pointer"
        >
          Go back to menu
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
