import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import EntryScreen from './components/EntryScreen';
import MainMenu from './components/MainMenu';
import Reasons24 from './components/Reasons24';
import CoreMemories from './components/CoreMemories';
import WordsForYou from './components/WordsForYou';
import CheekyGame from './components/CheekyGame';
import FinalScreen from './components/FinalScreen';
import AudioPlayer from './components/AudioPlayer';
import LoveRain from './components/LoveRain';
import CursorSparkle from './components/CursorSparkle';

export type Screen = 'entry' | 'game' | 'menu' | 'reasons' | 'memories' | 'words' | 'final';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('entry');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // App starts with audio and leads right to the game
  const handleStart = () => {
    setHasInteracted(true);
    setIsAudioPlaying(true);
    setCurrentScreen('game');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="relative bg-black min-h-[100dvh] w-full font-sans text-rose-100 overflow-x-hidden selection:bg-rose-500/30">
      <LoveRain />
      <CursorSparkle />

      {/* Global Audio Player */}
      {hasInteracted && (
        <AudioPlayer isPlaying={isAudioPlaying} setIsPlaying={setIsAudioPlaying} />
      )}

      {/* Screen Transitions */}
      <AnimatePresence mode="wait">
        {currentScreen === 'entry' && (
          <EntryScreen key="entry" onOpen={handleStart} />
        )}
        {currentScreen === 'game' && (
          <CheekyGame key="game" onComplete={() => navigateTo('menu')} />
        )}
        {currentScreen === 'menu' && (
          <MainMenu key="menu" onNavigate={navigateTo} />
        )}
        {currentScreen === 'reasons' && (
          <Reasons24 key="reasons" onBack={() => navigateTo('menu')} />
        )}
        {currentScreen === 'memories' && (
          <CoreMemories key="memories" onBack={() => navigateTo('menu')} />
        )}
        {currentScreen === 'words' && (
          <WordsForYou key="words" onBack={() => navigateTo('menu')} />
        )}
        {currentScreen === 'final' && (
          <FinalScreen key="final" onRestart={() => navigateTo('menu')} />
        )}
      </AnimatePresence>
    </div>
  );
}
