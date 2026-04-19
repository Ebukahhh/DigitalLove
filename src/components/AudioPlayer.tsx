import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/videoplayback.weba" loop />

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative w-12 h-12 rounded-full flex items-center justify-center border border-rose-500/40 text-rose-400 transition-colors overflow-hidden"
        style={{ background: 'rgba(10,0,5,0.75)', backdropFilter: 'blur(12px)' }}
      >
        {/* Pulsing glow when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-rose-500/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        {isPlaying ? <Volume2 className="w-5 h-5 relative z-10" /> : <VolumeX className="w-5 h-5 relative z-10" />}
      </motion.button>
    </div>
  );
}
