import { motion } from 'motion/react';
import { Mail, CalendarHeart, Flower2, Sparkles } from 'lucide-react';
import { Screen } from '../App';

interface MainMenuProps {
  key?: string;
  onNavigate: (screen: Screen) => void;
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    { id: 'wish', title: 'Make a Wish', icon: CalendarHeart, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 'memories', title: 'Core Memories', icon: Flower2, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { id: 'words', title: 'Words for You', icon: Mail, color: 'text-red-400', bg: 'bg-red-500/10' },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 w-full"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-serif text-rose-100 mb-3 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
          <Sparkles className="w-6 h-6 text-rose-400" />
          Pick what to see first
          <Sparkles className="w-6 h-6 text-rose-400" />
        </h2>
        <p className="text-rose-200/70 font-medium tracking-wide">Take your time, my love</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id as Screen)}
              className="group relative p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-rose-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(244,63,94,0.2)] hover:border-rose-500/40 transition-all duration-300 flex flex-col items-center gap-5 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`p-5 rounded-2xl ${item.bg} border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-8 h-8 ${item.color}`} strokeWidth={1.5} />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-rose-50 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => onNavigate('final')}
        className="mt-16 text-rose-400/60 hover:text-rose-400 transition-colors text-sm font-medium tracking-widest uppercase"
      >
        Skip to the end
      </motion.button>
    </motion.div>
  );
}
