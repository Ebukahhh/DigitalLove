import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, ArrowLeft } from 'lucide-react';

interface WordsForYouProps {
  key?: string;
  onBack: () => void;
}

const letter = `My love,

I wanted to make something special for you today. Not just a card, but a little digital space that holds a piece of how much you mean to me.

Every day with you feels like a gift. You bring so much light, laughter, and warmth into my life. I love the way you smile, the way you care for others, and the way you make even the simplest moments feel extraordinary.

Thank you for being exactly who you are. Thank you for choosing me.

Happy Birthday. I love you more than words can say.

Forever yours,
Me ❤️`;

export default function WordsForYou({ onBack }: WordsForYouProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < letter.length) {
        setDisplayedText(letter.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 w-full"
    >
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-3 rounded-full bg-black/50 backdrop-blur-sm text-rose-400 hover:bg-black/80 hover:text-rose-300 transition-all shadow-sm z-50 border border-rose-500/20"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-2xl w-full bg-zinc-900/80 backdrop-blur-md rounded-sm p-8 md:p-12 shadow-[0_0_50px_rgba(244,63,94,0.1)] border border-rose-500/20 relative"
      >
        <Quote className="absolute top-6 right-6 w-8 h-8 text-rose-500 opacity-30 drop-shadow-sm" />
        
        <div className="font-serif text-lg md:text-xl text-rose-100/90 whitespace-pre-wrap pt-2 min-h-[400px] leading-loose">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-rose-500 ml-1 translate-y-1"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
