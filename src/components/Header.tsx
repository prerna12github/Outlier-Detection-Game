import React from 'react';
import { Volume2, VolumeX, Crosshair, Award, BookOpen, BarChart3, Compass } from 'lucide-react';
import { sound } from '../lib/sound';

interface HeaderProps {
  currentScreen: 'home' | 'modes' | 'game' | 'results' | 'how-to-play';
  onNavigate: (screen: 'home' | 'modes' | 'how-to-play') => void;
  onOpenHowToPlay: () => void;
  onOpenStats: () => void;
  highScore: number;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenHowToPlay,
  onOpenStats,
  highScore,
  isMuted,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b-[1.5px] border-[#30343B] bg-[#FFFCF4]/95 backdrop-blur-sm px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('home');
          }}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#E85D16] text-[#FFFCF4] shadow-[2px_2px_0px_#30343B] transition-transform group-hover:scale-105">
            <Crosshair className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="serif text-xl font-bold tracking-tight text-[#242830]">
                OUTLIER HUNT
              </span>
              <span className="retro-chip !py-[1px] !px-1.5 !text-[9px]">v1.0</span>
            </div>
            <p className="hidden text-[10px] tracking-wide text-[#6B7280] sm:block">
              Spot the Odd. Master the Data.
            </p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              sound.playPop();
              onNavigate('home');
            }}
            className={`retro-btn !py-1.5 !px-3 !text-xs ${
              currentScreen === 'home' ? 'bg-[#242830] text-[#FFFCF4]' : ''
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onNavigate('modes');
            }}
            className={`retro-btn !py-1.5 !px-3 !text-xs ${
              currentScreen === 'modes' ? 'bg-[#242830] text-[#FFFCF4]' : ''
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Game</span> Modes
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onNavigate('how-to-play');
            }}
            className={`retro-btn !py-1.5 !px-3 !text-xs ${
              currentScreen === 'how-to-play' ? 'bg-[#242830] text-[#FFFCF4]' : ''
            }`}
            title="How to Play Field Guide"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden md:inline">How to</span> Play
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenStats();
            }}
            className="retro-btn !py-1.5 !px-3 !text-xs"
            title="Personal Statistics & Leaderboard"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Stats</span>
          </button>

          {/* Personal Best High Score indicator */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] px-2.5 py-1 text-xs shadow-[2px_2px_0px_#30343B]">
            <Award className="h-3.5 w-3.5 text-[#E85D16]" />
            <span className="retro-label !text-[10px]">Best:</span>
            <span className="mono font-bold text-[#242830]">{highScore}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`retro-btn !p-2 !text-xs ${
              isMuted ? 'text-[#6B7280]' : 'bg-[#F4C5A5] text-[#242830]'
            }`}
            title={isMuted ? 'Sound Muted (Click to Unmute)' : 'Sound Enabled (Click to Mute)'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
};
