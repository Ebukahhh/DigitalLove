import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface EntryScreenProps {
  key?: string;
  onOpen: () => void;
}

export default function EntryScreen({ onOpen }: EntryScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-50"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="cursor-pointer relative group"
        >
          <div className="absolute inset-0 bg-rose-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.3)] overflow-hidden mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=800&auto=format&fit=crop" 
                alt="Beautiful bouquet of red roses" 
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-5xl font-serif font-medium text-rose-100 mb-4 tracking-tight drop-shadow-md"
        >
          A Gift For You
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex items-center gap-2 text-rose-400 font-medium tracking-widest uppercase text-sm"
        >
          <span>Tap to open</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
