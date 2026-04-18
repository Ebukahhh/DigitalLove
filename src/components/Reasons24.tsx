import { motion } from 'motion/react';
import { Heart, ArrowLeft } from 'lucide-react';

interface Reasons24Props {
  key?: string;
  onBack: () => void;
}

const reasons = [
  "I love you because your smile has a way of lighting up even my darkest days.",
  "I love you because your laughter is something I could listen to forever.",
  "I love you because you understand me in ways no one else ever has.",
  "I love you because even when things are hard, my heart still chooses you.",
  "I love you because you’re strong, even when you don’t realize it.",
  "I love you because you’re sexy",
  "I love your nyash.",
  "I love you because you’ve given me memories I’ll never forget.",
  "I love you because of your beautiful mind and the way you see the world.",
  "I love you because your presence alone brings me peace.",
  "I love you because you inspire me to be better, even from a distance.",
  "I love you because of your softness and your strength at the same time.",
  "I love you because loving you feels natural, like it was always meant to be.",
  "I love you because even silence with you feels meaningful.",
  "I love you because you’ve touched my life in a way no one else ever could.",
  "I love you because you’re uniquely you and there’s no one else like you.",
  "I love you because you’ve been my happiness, even in moments I didn’t expect it.",
  "I love you because you’ve shown me a kind of love I didn’t know I needed.",
  "I love you because of your nyash again🫠",
  "I love you because you’re the person my heart yearns for.",
  "I love you because of your beautiful face.",
  "I love you because you’ve been part of my story in the most meaningful way.",
  "I love you because you make love feel real.",
  "I love you simply because you’re you… and that has always been enough for me."
];

export default function Reasons24({ onBack }: Reasons24Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="h-screen flex flex-col items-center justify-center p-4 md:p-6 relative z-10 w-full"
    >
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 md:top-8 md:left-8 p-3 rounded-full bg-black/50 backdrop-blur-sm text-rose-400 hover:bg-black/80 hover:text-rose-300 transition-all shadow-sm z-50 border border-rose-500/20"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div 
        className="max-w-2xl w-full h-[85vh] bg-black/50 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-[0_0_40px_rgba(244,63,94,0.1)] border border-rose-500/30 flex flex-col items-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none z-0" />
        
        <h2 className="text-3xl md:text-5xl font-serif text-rose-100 mb-6 md:mb-8 relative z-10 drop-shadow-md text-center">
          24 Reasons
        </h2>
        
        <div className="w-full flex-1 overflow-y-auto pr-2 md:pr-4 pb-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-rose-500/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-rose-500/40 relative z-10">
          <div className="flex flex-col gap-4 md:gap-6">
            {reasons.map((reason, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                key={index} 
                className="bg-rose-950/20 border border-rose-500/10 p-5 rounded-2xl shadow-sm text-left relative overflow-hidden group hover:bg-rose-900/40 transition-colors"
              >
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-xl font-serif font-bold text-rose-500/50 min-w-[28px] mt-0.5 shrink-0">
                    {index + 1}.
                  </span>
                  <p className="text-lg md:text-xl text-rose-100/90 leading-relaxed font-serif relative z-10">
                    {reason}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <div className="flex justify-center mt-6">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
