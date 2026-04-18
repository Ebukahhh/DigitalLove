import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X } from 'lucide-react';

interface CoreMemoriesProps {
  key?: string;
  onBack: () => void;
}

const imageFiles = [
  '/images/0743cc34-d99d-40db-afb8-983b0d5facde.JPG',
  '/images/606881b4-bad0-4ce4-bc9f-433f77ebdc4d.JPG',
  '/images/7fd08b2c-ad8b-49b3-be4d-edbaefe8c6c8.JPG',
  '/images/IMG_0307.JPG',
  '/images/IMG_4105.PNG',
  '/images/IMG_5944.jpg',
  '/images/IMG_6154.jpg',
  '/images/IMG_7143.PNG',
  '/images/IMG_7445.JPG',
  '/images/IMG_8143.jpg',
  '/images/IMG_8295.jpg',
  '/images/IMG_9125.jpg',
  '/images/c5619121-5129-4516-892e-078c3ac9e885.JPG'
];

const memories = imageFiles.map((url, i) => ({
  id: i + 1,
  url,
  rotation: (Math.random() - 0.5) * 15,
}));

export default function CoreMemories({ onBack }: CoreMemoriesProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof memories[0] | null>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isActive = true;
    
    // Initialize positions randomly bounds (based on assumed size before actual render)
    const items = memories.map(() => {
      const ww = typeof window !== 'undefined' ? window.innerWidth : 400;
      const wh = typeof window !== 'undefined' ? window.innerHeight : 800;
      const pw = 200; 
      const ph = 240; 
      
      return {
        x: Math.random() * Math.max(0, ww - pw),
        y: Math.random() * Math.max(0, wh - ph),
        dx: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.8),
        dy: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.8),
      };
    });

    const updatePositions = () => {
      if (!isActive || !sectionRef.current) return;
      
      // Use the actual dimensions of the section container
      const ww = sectionRef.current.clientWidth;
      const wh = sectionRef.current.clientHeight;
      const pw = 220; // photo component width (approx)
      const ph = 260; // photo height (approx)

      items.forEach((item, i) => {
        item.x += item.dx;
        item.y += item.dy;

        // Bounce horizontally
        if (item.x <= 0) {
          item.x = 0;
          item.dx *= -1;
        } else if (item.x + pw >= ww) {
          item.x = ww - pw;
          item.dx *= -1;
        }

        // Bounce vertically
        if (item.y <= 0) {
          item.y = 0;
          item.dy *= -1;
        } else if (item.y + ph >= wh) {
          item.y = wh - ph;
          item.dy *= -1;
        }

        const el = photoRefs.current[i];
        if (el && el.dataset.paused !== 'true') {
          el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${memories[i].rotation}deg)`;
        }
      });

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative z-10 overflow-hidden w-full"
    >
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-3 rounded-full bg-black/50 backdrop-blur-sm text-rose-400 hover:bg-black/80 hover:text-rose-300 transition-all shadow-sm z-50 border border-rose-500/20 pointer-events-auto cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="absolute inset-x-0 top-24 text-center z-20 pointer-events-none">
        <h2 className="text-4xl font-serif text-rose-100 mb-2 drop-shadow-md bg-black/40 border border-rose-500/30 inline-block px-6 py-2 rounded-full backdrop-blur-md">
          Memories
        </h2>
        <p className="text-rose-300 font-medium block mt-2 drop-shadow-sm">Catch a memory to view it</p>
      </div>

      <div className="absolute inset-0 z-10">
        {memories.map((photo, index) => (
          <div
            key={photo.id}
            ref={(el) => (photoRefs.current[index] = el)}
            onMouseEnter={(e) => { e.currentTarget.dataset.paused = 'true'; e.currentTarget.style.zIndex = '40'; e.currentTarget.style.scale = '1.05'; }}
            onMouseLeave={(e) => { e.currentTarget.dataset.paused = 'false'; e.currentTarget.style.zIndex = ''; e.currentTarget.style.scale = '1'; }}
            onTouchStart={(e) => { e.currentTarget.dataset.paused = 'true'; e.currentTarget.style.zIndex = '40'; e.currentTarget.style.scale = '1.05'; }}
            onTouchEnd={(e) => { e.currentTarget.dataset.paused = 'false'; e.currentTarget.style.zIndex = ''; e.currentTarget.style.scale = '1'; }}
            onClick={() => setSelectedPhoto(photo)}
            className="absolute cursor-pointer bg-zinc-900 p-3 rounded-sm shadow-[0_0_20px_rgba(244,63,94,0.15)] border border-rose-500/20 hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] transition-[scale,box-shadow,border-color,z-index] duration-300 pointer-events-auto"
            style={{
              width: '220px',
              transform: `translate3d(-1000px, -1000px, 0)`,
              willChange: 'transform',
            }}
          >
            <div className="w-full aspect-square bg-black overflow-hidden pointer-events-none border border-zinc-800">
              <img 
                src={photo.url} 
                alt="Memory" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 pointer-events-auto"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-rose-300 hover:text-rose-400 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-zinc-900 p-4 rounded-sm max-w-lg w-full relative border border-rose-500/30 flex items-center justify-center min-h-[40vh]"
               onClick={(e) => e.stopPropagation()}
             >
               <img 
                 src={selectedPhoto.url} 
                 alt="Selected memory" 
                 className="w-full h-auto max-h-[80vh] object-contain"
                 referrerPolicy="no-referrer"
               />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
