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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay might be blocked by browser
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Using a soft, romantic royalty-free track placeholder */}
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1cb8.mp3?filename=romantic-piano-11222.mp3" 
        loop 
      />
      
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50 text-rose-500 hover:bg-white/80 transition-colors"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
