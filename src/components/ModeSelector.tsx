import React, { useState } from 'react';
import { GameMode, Difficulty } from '../types/game';
import { Zap, Tag, Hash, Microscope, ChevronRight, Award, Compass, ShieldAlert } from 'lucide-react';
import { sound } from '../lib/sound';

interface ModeSelectorProps {
  onSelectModeAndDifficulty: (mode: GameMode, difficulty: Difficulty) => void;
  onBack: () => void;
  modeHighScores: Record<GameMode, number>;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  onSelectModeAndDifficulty,
  onBack,
  modeHighScores,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('quick');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');

  const modes: Array<{
    id: GameMode;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    icon: React.ReactNode;
    color: string;
    sample: string;
  }> = [
    {
      id: 'quick',
      title: 'Quick Hunt',
      subtitle: 'Fast-Paced Anomaly Sprint',
      description: 'A rapid 5-question round blending categorical curiosities and numerical leaps. Great for warm-ups and casual play.',
      badge: 'CASUAL SPRINT',
      icon: <Zap className="h-6 w-6 text-[#E85D16]" />,
      color: '#E85D16',
      sample: 'Mix of fruit baskets, quick numbers, and server spikes',
    },
    {
      id: 'category',
      title: 'Category Clash',
      subtitle: 'Qualitative & Conceptual Outliers',
      description: 'Find the item violating the conceptual taxonomy: fruits vs vegetables, countries vs fauna, programming vs markup languages.',
      badge: 'CONCEPTUAL',
      icon: <Tag className="h-6 w-6 text-[#245D9C]" />,
      color: '#245D9C',
      sample: 'Apple, Banana, Mango, Carrot → Carrot is a vegetable',
    },
    {
      id: 'number',
      title: 'Number Detective',
      subtitle: 'Numerical Sequences & Leaps',
      description: 'Identify extreme outliers in numerical sequences and small datasets using cluster distance, order-of-magnitude, and symmetry.',
      badge: 'NUMERICAL',
      icon: <Hash className="h-6 w-6 text-[#218653]" />,
      color: '#218653',
      sample: '8, 9, 10, 11, 75 → 75 is over 60 units from the cluster',
    },
    {
      id: 'scientist',
      title: 'Data Scientist Challenge',
      subtitle: 'Rigorous Formulas & Realistic Data',
      description: 'Test observations against realistic datasets (temperatures, latencies, blood pressures) using interactive IQR × 1.5 fences and Z-scores.',
      badge: 'STATISTICAL LAB',
      icon: <Microscope className="h-6 w-6 text-[#242830]" />,
      color: '#242830',
      sample: 'Interactive Fig. 1 visualization with Q1, Q3, Fences & |Z| > 2',
    },
  ];

  const difficulties: Array<{
    id: Difficulty;
    label: string;
    description: string;
    multiplier: string;
    badgeCls: string;
  }> = [
    {
      id: 'easy',
      label: 'Easy',
      description: 'Obvious differences and beginner-friendly examples with generous time.',
      multiplier: '1.0× Points',
      badgeCls: 'bg-[#EFE7D7] text-[#242830]',
    },
    {
      id: 'medium',
      label: 'Medium',
      description: 'Less obvious categories, subtle numerical offsets, and standard IQR fences.',
      multiplier: '1.25× Points',
      badgeCls: 'bg-[#F4C5A5] text-[#242830]',
    },
    {
      id: 'hard',
      label: 'Hard',
      description: 'Tricky edge cases near the fences, scientific units, and nuanced taxonomies.',
      multiplier: '1.5× Points',
      badgeCls: 'bg-[#E85D16] text-[#FFFCF4]',
    },
    {
      id: 'expert',
      label: 'Expert',
      description: 'Deep domain telemetry, sub-zero shifts, and borderline statistical calls.',
      multiplier: '2.0× Points',
      badgeCls: 'bg-[#242830] text-[#FFFCF4]',
    },
  ];

  const handleLaunch = () => {
    sound.playPop();
    onSelectModeAndDifficulty(selectedMode, selectedDifficulty);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] border-[#30343B] pb-4">
        <div>
          <span className="retro-chip inline-flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5" />
            MISSION BRIEFING
          </span>
          <h2 className="serif text-3xl font-extrabold text-[#242830] sm:text-4xl mt-2">
            Select Game Mode & Difficulty
          </h2>
          <p className="hand text-xl text-[#6B7280]">
            Choose your investigation theater and calibrate challenge precision.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            onBack();
          }}
          className="retro-btn"
        >
          ← Back to Home
        </button>
      </div>

      {/* Step 1: Mode Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="retro-label !text-xs font-bold text-[#242830]">
            STEP 1: CHOOSE DETECTION MODE
          </span>
          <span className="h-[1.5px] flex-1 bg-[#30343B]" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {modes.map((mode) => {
            const isSelected = selectedMode === mode.id;
            const highScore = modeHighScores[mode.id] || 0;

            return (
              <div
                key={mode.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedMode(mode.id);
                }}
                className={`retro-card retro-card-interactive p-5 flex flex-col justify-between ${
                  isSelected ? 'border-[2.5px] border-[#242830] bg-[#FFF8EB] shadow-[6px_6px_0px_#242830]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] shadow-[2px_2px_0px_#30343B]">
                        {mode.icon}
                      </div>
                      <div>
                        <h3 className="serif text-xl font-bold text-[#242830]">
                          {mode.title}
                        </h3>
                        <p className="text-xs font-medium text-[#6B7280]">
                          {mode.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="retro-chip !text-[9px]">
                      {mode.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {mode.description}
                  </p>

                  <div className="mt-3 rounded-[4px] border-[1px] border-[#30343B]/40 bg-[#F8F2E5] p-2 text-xs text-[#242830]">
                    <span className="retro-label !text-[9px] block">Example:</span>
                    <span className="mono text-[11px] font-semibold">{mode.sample}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t-[1px] border-[#30343B]/20 pt-2 text-xs">
                  <span className="flex items-center gap-1 text-[#6B7280]">
                    <Award className="h-3.5 w-3.5 text-[#E85D16]" />
                    Best: <strong className="mono text-[#242830]">{highScore}</strong>
                  </span>
                  <span className="mono font-semibold text-[#245D9C]">
                    {isSelected ? '✓ SELECTED' : 'Click to Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Difficulty Selection */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="retro-label !text-xs font-bold text-[#242830]">
            STEP 2: CHOOSE DIFFICULTY TIER
          </span>
          <span className="h-[1.5px] flex-1 bg-[#30343B]" />
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <div
                key={diff.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedDifficulty(diff.id);
                }}
                className={`retro-card retro-card-interactive p-4 text-center ${
                  isSelected ? 'border-[2px] border-[#242830] bg-[#FFF8EB] shadow-[5px_5px_0px_#242830]' : ''
                }`}
              >
                <div className="flex justify-center mb-1">
                  <span className={`retro-chip !text-[10px] ${diff.badgeCls}`}>
                    {diff.multiplier}
                  </span>
                </div>
                <h4 className="serif text-lg font-bold text-[#242830] mt-1">
                  {diff.label}
                </h4>
                <p className="mt-1 text-xs text-[#6B7280] leading-snug">
                  {diff.description}
                </p>
                <div className="mt-2 text-xs font-semibold mono">
                  {isSelected ? (
                    <span className="text-[#218653]">● ACTIVE</span>
                  ) : (
                    <span className="text-[#6B7280]">○ Select</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Launch Action Banner */}
      <div className="retro-card p-5 bg-[#F8F2E5] flex flex-wrap items-center justify-between gap-4 mt-6">
        <div>
          <span className="retro-label">Ready to Hunt</span>
          <div className="serif text-xl font-bold text-[#242830] mt-0.5">
            Launching {modes.find((m) => m.id === selectedMode)?.title} ({selectedDifficulty.toUpperCase()})
          </div>
          <p className="text-xs text-[#6B7280]">
            5 investigative rounds. Track accuracy, combo streaks, and earn detective honors.
          </p>
        </div>

        <button
          onClick={handleLaunch}
          className="retro-btn retro-btn-primary !py-3 !px-8 !text-base"
        >
          START INVESTIGATION <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
