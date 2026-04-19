import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CalendarHeart, Flower2, Sparkles } from 'lucide-react';
import { Screen } from '../App';

interface MainMenuProps {
  key?: string;
  onNavigate: (screen: Screen) => void;
}

const menuItems = [
  {
    id: 'reasons' as Screen,
    title: '24 Reasons',
    subtitle: 'Why I love you',
    icon: CalendarHeart,
    color: 'text-rose-400',
    border: 'border-rose-500/25',
    glow: 'rgba(244,63,94,0.25)',
    bg: 'bg-rose-500/10',
    hoverBg: 'rgba(244,63,94,0.1)',
  },
  {
    id: 'memories' as Screen,
    title: 'Core Memories',
    subtitle: 'Moments we shared',
    icon: Flower2,
    color: 'text-pink-400',
    border: 'border-pink-500/25',
    glow: 'rgba(236,72,153,0.25)',
    bg: 'bg-pink-500/10',
    hoverBg: 'rgba(236,72,153,0.1)',
  },
  {
    id: 'words' as Screen,
    title: 'Words for You',
    subtitle: 'A letter from my heart',
    icon: Mail,
    color: 'text-red-400',
    border: 'border-red-500/25',
    glow: 'rgba(239,68,68,0.25)',
    bg: 'bg-red-500/10',
    hoverBg: 'rgba(239,68,68,0.1)',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.35 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 22 } },
};

export default function MainMenu({ onNavigate }: MainMenuProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-serif text-rose-100 mb-3 flex items-center justify-center gap-3 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]">
          <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Sparkles className="w-6 h-6 text-rose-400" />
          </motion.div>
          Pick what to see first
          <motion.div animate={{ rotate: [0, -20, 20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Sparkles className="w-6 h-6 text-rose-400" />
          </motion.div>
        </h2>
        <p className="text-rose-200/60 font-medium tracking-wide">Take your time, my love</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isHovered = hoveredId === item.id;

          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -7 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => onNavigate(item.id)}
              className={`group relative p-7 rounded-3xl border ${item.border} transition-all duration-300 flex flex-col items-center gap-5 text-center overflow-hidden cursor-pointer`}
              style={{
                background: isHovered ? item.hoverBg : 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(20px)',
                boxShadow: isHovered
                  ? `0 12px 40px rgba(0,0,0,0.5), 0 0 30px ${item.glow}`
                  : '0 8px 30px rgba(0,0,0,0.4)',
              }}
            >
              {/* Shimmer on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: 1, x: '200%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                    }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                className={`p-5 rounded-2xl ${item.bg} border border-white/5`}
                animate={isHovered ? { scale: 1.15, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Icon className={`w-8 h-8 ${item.color}`} strokeWidth={1.5} />
              </motion.div>

              <div>
                <h3 className="text-xl font-semibold text-rose-50 group-hover:text-white transition-colors duration-300 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-rose-300/50 group-hover:text-rose-300/80 transition-colors duration-300">
                  {item.subtitle}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        whileHover={{ scale: 1.05, color: '#fb7185' }}
        onClick={() => onNavigate('final')}
        className="mt-16 text-rose-400/50 hover:text-rose-400 transition-colors text-sm font-medium tracking-widest uppercase cursor-pointer"
      >
        Skip to the end →
      </motion.button>
    </motion.div>
  );
}
