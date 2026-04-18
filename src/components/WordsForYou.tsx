import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, ArrowLeft } from 'lucide-react';

interface WordsForYouProps {
  key?: string;
  onBack: () => void;
}

const letter = `Mon ndolo,

Joyeux anniversaire, mon amour.

Even with the distance, the silence, and everything in between, one thing that has never changed is the way I feel about you.

I miss you and not just in the obvious way, but in the little things too. Like your smile, your voice, your mind… everything. 

On your birthday, I don’t just celebrate you… I celebrate the love we share, the memories we’ve built, and the quiet, unspoken promise that maybe… just maybe… our story doesn’t stop here.

I hope today reminds you how special you are. How deeply you are loved. Not just by the world around you, but by me… in a way that hasn’t faded, not even a little.

J'taime
Always yours,  
David🫶🏾`;

export default function WordsForYou({ onBack }: WordsForYouProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < letter.length) {
        setDisplayedText(letter.slice(0, i + 1));
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, 15);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleSkip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedText(letter);
    setIsTyping(false);
  };

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
        className="absolute top-8 left-8 p-3 rounded-full bg-black/50 backdrop-blur-sm text-rose-400 hover:bg-black/80 hover:text-rose-300 transition-all shadow-sm z-50 border border-rose-500/20 cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-2xl w-full relative"
        style={{
          background: 'linear-gradient(168deg, #faf6f0 0%, #f5efe6 30%, #f0e8da 70%, #ebe3d3 100%)',
          borderRadius: '2px',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10), 0 8px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid rgba(210, 195, 170, 0.5)',
        }}
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
            borderRadius: '2px',
          }}
        />

        {/* Faint ruled lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 31px, #8b7355 31px, #8b7355 32px)',
            backgroundPositionY: '8px',
            borderRadius: '2px',
          }}
        />

        {/* Red margin line */}
        <div 
          className="absolute top-0 bottom-0 left-[clamp(2rem,6vw,3.5rem)] w-px pointer-events-none opacity-20"
          style={{ background: '#c44' }}
        />

        <Quote className="absolute top-5 right-5 w-7 h-7 opacity-15 drop-shadow-sm" style={{ color: '#9b7b5e' }} />
        
        <div 
          className="font-serif text-lg md:text-xl whitespace-pre-wrap pt-2 min-h-[400px] relative z-10"
          style={{ color: '#3a3028', lineHeight: '2', paddingLeft: 'clamp(0.5rem, 2vw, 1.5rem)' }}
        >
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[2px] h-5 ml-1 translate-y-1"
              style={{ background: '#3a3028' }}
            />
          )}
        </div>

        {/* Skip button */}
        {isTyping && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            className="absolute bottom-4 right-4 z-20 px-4 py-1.5 text-xs font-medium tracking-wider uppercase rounded-full cursor-pointer transition-all"
            style={{
              color: '#8b7355',
              border: '1px solid rgba(139, 115, 85, 0.3)',
              background: 'rgba(139, 115, 85, 0.08)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139, 115, 85, 0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139, 115, 85, 0.08)'; }}
          >
            Skip
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
