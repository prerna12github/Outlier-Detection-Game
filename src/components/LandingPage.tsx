import React from 'react';
import { ArrowRight, BookOpen, Brain, Sparkles, Binary, Award, Target, Flame } from 'lucide-react';
import { UserStats } from '../types/game';
import { sound } from '../lib/sound';

interface LandingPageProps {
  onStartPlay: () => void;
  onOpenHowToPlay: () => void;
  userStats: UserStats;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPlay,
  onOpenHowToPlay,
  userStats,
}) => {
  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Hero Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="retro-chip inline-flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#E85D16]" />
                THE DATA DETECTIVE GAME
              </span>
            </div>

            <h1 className="serif text-4xl font-extrabold tracking-tight text-[#242830] sm:text-6xl sm:leading-[1.1]">
              Is it an <span className="marker-highlight italic">outlier?</span>
            </h1>

            <p className="hand text-2xl text-[#245D9C] sm:text-3xl">
              Eyeball the data, make your call, then check the math.
            </p>

            <p className="max-w-xl text-base text-[#6B7280] leading-relaxed">
              Train your brain to spot anomalies, uncover unusual patterns, and think like a data scientist.
              From simple categorical odd-ones-out to rigorous Interquartile Ranges (IQR) and Z-score detection rules.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playPop();
                  onStartPlay();
                }}
                className="retro-btn retro-btn-primary !py-3 !px-6 !text-base"
              >
                PLAY NOW <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  onOpenHowToPlay();
                }}
                className="retro-btn !py-3 !px-5 !text-base"
              >
                <BookOpen className="h-4 w-4 text-[#E85D16]" />
                HOW TO PLAY
              </button>
            </div>
          </div>

          {/* Hero Right Visual Preview: Fig. Preview */}
          <div className="lg:col-span-5">
            <div className="retro-card overflow-hidden">
              <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] bg-[#FFFCF4] px-4 py-2">
                <span className="serif text-sm font-bold text-[#242830]">
                  Fig. 0 — anomaly radar
                </span>
                <span className="retro-chip !py-0 !px-1.5 !text-[9px]">LIVE PREVIEW</span>
              </div>

              {/* Mini SVG dot plot preview */}
              <div className="chart-grid-bg relative p-3">
                <svg viewBox="0 0 380 180" className="w-full h-auto">
                  {/* Normal Zone box */}
                  <rect
                    x="50"
                    y="30"
                    width="200"
                    height="100"
                    rx="4"
                    fill="#E85D16"
                    fillOpacity="0.08"
                    stroke="#E85D16"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <text x="150" y="24" fill="#E85D16" fontSize="13" textAnchor="middle" className="hand font-bold">
                    "normal zone"
                  </text>

                  {/* Horizontal Axis */}
                  <line x1="30" x2="350" y1="130" y2="130" stroke="#30343B" strokeWidth="1.5" />

                  {/* Axis ticks */}
                  {[60, 110, 160, 210, 260, 310].map((tx, idx) => (
                    <g key={idx}>
                      <line x1={tx} x2={tx} y1="130" y2="134" stroke="#30343B" strokeWidth="1" />
                      <text x={tx} y="146" fill="#6B7280" fontSize="9" textAnchor="middle" className="mono">
                        {20 + idx * 20}
                      </text>
                    </g>
                  ))}

                  {/* Regular blue data points */}
                  {[
                    { cx: 75, cy: 115 },
                    { cx: 85, cy: 105 },
                    { cx: 95, cy: 115 },
                    { cx: 105, cy: 95 },
                    { cx: 120, cy: 110 },
                    { cx: 135, cy: 100 },
                    { cx: 145, cy: 115 },
                    { cx: 160, cy: 105 },
                    { cx: 175, cy: 115 },
                    { cx: 190, cy: 110 },
                    { cx: 210, cy: 115 },
                    { cx: 225, cy: 105 },
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="4.5" fill="#245D9C" stroke="#30343B" strokeWidth="1" />
                  ))}

                  {/* Highlighted Outlier Pin */}
                  <line x1="318" x2="318" y1="50" y2="130" stroke="#E85D16" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="318" cy="50" r="10" fill="#E85D16" fillOpacity="0.3" className="pulse-ring" />
                  <circle cx="318" cy="50" r="6" fill="#E85D16" stroke="#30343B" strokeWidth="1.2" />

                  <rect x="296" y="145" width="44" height="18" rx="3" fill="#E85D16" stroke="#30343B" strokeWidth="1" />
                  <text x="318" y="157" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#FFFCF4" className="mono">
                    124.5
                  </text>

                  {/* Handwritten arrow comment */}
                  <text x="250" y="65" fill="#E85D16" fontSize="14" className="hand font-bold">
                    something feels off ↗
                  </text>
                </svg>
              </div>

              <div className="border-t-[1.5px] border-[#30343B] bg-[#FFFCF4] p-3 text-xs text-[#6B7280]">
                <span className="mono font-semibold text-[#242830]">Observation #13</span> sits +3.4 standard deviations above mean.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="serif text-xl font-bold text-[#242830]">
            The Data Detective Methodology
          </span>
          <span className="h-[1.5px] flex-1 bg-[#30343B]" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Card 1 */}
          <div className="retro-card p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4C5A5] text-[#242830] shadow-[2px_2px_0px_#30343B]">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="serif text-lg font-bold text-[#242830]">
              1. Train Your Brain
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Sharpen your cognitive pattern recognition. Identify semantic boundaries, category violations, and visual discrepancies at a glance.
            </p>
          </div>

          {/* Card 2 */}
          <div className="retro-card p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4C5A5] text-[#242830] shadow-[2px_2px_0px_#30343B]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="serif text-lg font-bold text-[#242830]">
              2. Spot the Anomaly
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Detect numerical shifts, transcription typos, negative spikes, and cluster disconnects across curated sequences and real-world telemetry.
            </p>
          </div>

          {/* Card 3 */}
          <div className="retro-card p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4C5A5] text-[#242830] shadow-[2px_2px_0px_#30343B]">
              <Binary className="h-5 w-5" />
            </div>
            <h3 className="serif text-lg font-bold text-[#242830]">
              3. Think Like a Data Scientist
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Master mathematical formulas: Interquartile Range fences (Q1 - 1.5×IQR, Q3 + 1.5×IQR) and Z-score standard deviation bounds.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Statistics Bar */}
      <section className="retro-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-[1.5px] border-[#30343B] pb-4">
          <div>
            <span className="retro-label">Player Dossier</span>
            <h3 className="serif text-xl font-bold text-[#242830]">
              Your Personal Performance Log
            </h3>
          </div>
          <span className="retro-chip">STORED LOCALLY IN BROWSER</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Games Played</div>
            <div className="mono text-2xl font-bold text-[#242830] mt-1">
              {userStats.totalGamesPlayed}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Personal Best Score</div>
            <div className="mono text-2xl font-bold text-[#E85D16] mt-1 flex items-center justify-center gap-1">
              <Award className="h-5 w-5" />
              {userStats.highScore}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Best Combo Streak</div>
            <div className="mono text-2xl font-bold text-[#218653] mt-1 flex items-center justify-center gap-1">
              <Flame className="h-5 w-5" />
              {userStats.bestStreakOverall}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Overall Accuracy</div>
            <div className="mono text-2xl font-bold text-[#245D9C] mt-1">
              {userStats.totalQuestionsAnswered > 0
                ? `${Math.round((userStats.totalCorrect / userStats.totalQuestionsAnswered) * 100)}%`
                : '—'}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Quote & Footer */}
      <footer className="text-center pt-4 pb-2 border-t-[1.5px] border-[#30343B]">
        <p className="hand text-2xl text-[#6B7280]">
          "Every dataset tells a story. Can you spot the observation that doesn't belong?"
        </p>
        <p className="retro-label mt-2">
          OUTLIER HUNT — Learn Data Science. One Oddity at a Time.
        </p>
      </footer>
    </div>
  );
};
