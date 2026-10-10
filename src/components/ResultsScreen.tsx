import React, { useEffect } from 'react';
import { PlayerAnswer, GameMode, Difficulty } from '../types/game';
import { sound } from '../lib/sound';
import confetti from 'canvas-confetti';
import {
  Award,
  Flame,
  CheckCircle2,
  XCircle,
  Timer,
  RotateCcw,
  Compass,
  Home,
  BookOpen,
  ArrowRight,
  Target,
} from 'lucide-react';

interface ResultsScreenProps {
  answers: PlayerAnswer[];
  finalScore: number;
  bestStreak: number;
  totalTimeSeconds: number;
  mode: GameMode;
  difficulty: Difficulty;
  onPlayAgain: () => void;
  onChangeMode: () => void;
  onGoHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  answers,
  finalScore,
  bestStreak,
  totalTimeSeconds,
  mode,
  difficulty,
  onPlayAgain,
  onChangeMode,
  onGoHome,
}) => {
  const totalQuestions = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Performance-based title
  let performanceTitle = 'Cadet Data Detective';
  let performanceSub = 'Keep observing patterns and practicing statistical boundaries.';
  if (accuracy === 100) {
    performanceTitle = 'Virtuoso Anomaly Master!';
    performanceSub = 'Flawless precision across all observations. Nothing escapes your eye.';
  } else if (accuracy >= 80) {
    performanceTitle = 'Senior Data Sleuth';
    performanceSub = 'Sharp analytical perception with exemplary mathematical judgment.';
  } else if (accuracy >= 60) {
    performanceTitle = 'Competent Statistical Analyst';
    performanceSub = 'Solid understanding of distribution spreads and category lines.';
  }

  // Trigger confetti on high accuracy
  useEffect(() => {
    sound.playFanfare();
    if (accuracy >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#245D9C', '#E85D16', '#218653', '#F4C5A5'],
          disableForReducedMotion: true,
        });
      } catch {
        // ignore
      }
    }
  }, [accuracy]);

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Top Dossier Header */}
      <div className="retro-card p-6 sm:p-8 text-center space-y-3 bg-[#FFFCF4]">
        <span className="retro-chip !bg-[#E85D16] !text-[#FFFCF4]">
          MISSION DEBRIEFING
        </span>
        <h1 className="serif text-3xl sm:text-5xl font-extrabold text-[#242830]">
          {performanceTitle}
        </h1>
        <p className="hand text-2xl text-[#245D9C]">
          {performanceSub}
        </p>

        {/* 4 Stats Panels */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Final Score</div>
            <div className="mono text-2xl font-bold text-[#E85D16] mt-1 flex items-center justify-center gap-1">
              <Award className="h-5 w-5" />
              {finalScore}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Accuracy</div>
            <div className="mono text-2xl font-bold text-[#218653] mt-1">
              {accuracy}%
            </div>
            <div className="text-[10px] text-[#6B7280]">
              {correctCount} / {totalQuestions} correct
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Best Combo Streak</div>
            <div className="mono text-2xl font-bold text-[#245D9C] mt-1 flex items-center justify-center gap-1">
              <Flame className="h-5 w-5" />
              {bestStreak}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Time Elapsed</div>
            <div className="mono text-2xl font-bold text-[#242830] mt-1 flex items-center justify-center gap-1">
              <Timer className="h-5 w-5" />
              {totalTimeSeconds}s
            </div>
          </div>
        </div>

        {/* Three Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              sound.playPop();
              onPlayAgain();
            }}
            className="retro-btn retro-btn-primary !py-2.5 !px-6"
          >
            <RotateCcw className="h-4 w-4" /> PLAY AGAIN
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onChangeMode();
            }}
            className="retro-btn !py-2.5 !px-5"
          >
            <Compass className="h-4 w-4 text-[#E85D16]" /> TRY ANOTHER MODE
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onGoHome();
            }}
            className="retro-btn !py-2.5 !px-5"
          >
            <Home className="h-4 w-4" /> HOME
          </button>
        </div>
      </div>

      {/* Item-by-Item Breakdown Review */}
      <div className="retro-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-3">
          <span className="serif text-xl font-bold text-[#242830]">
            Investigation Case Files Breakdown
          </span>
          <span className="retro-chip">
            {correctCount} OF {totalQuestions} RESOLVED
          </span>
        </div>

        <div className="space-y-3">
          {answers.map((ans, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-[4px] border-[1.5px] border-[#30343B] ${
                ans.isCorrect ? 'bg-[#F4FBF6]' : 'bg-[#FDF5F3]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {ans.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-[#218653]" />
                  ) : (
                    <XCircle className="h-5 w-5 text-[#D94828]" />
                  )}
                  <span className="serif font-bold text-[#242830]">
                    Case #{idx + 1}: {ans.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs mono">
                  <span className="text-[#6B7280]">{ans.timeSpentSeconds}s</span>
                  {ans.pointsEarned > 0 && (
                    <span className="retro-chip !py-0 !px-1.5 !text-[10px] !bg-[#218653] !text-[#FFFCF4]">
                      +{ans.pointsEarned} pts
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-xs sm:text-sm text-[#242830]">
                <strong>Prompt:</strong> {ans.questionPrompt}
              </p>

              <div className="mt-2 grid sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-[3px] bg-[#FFFCF4] border border-[#30343B]/30">
                  <span className="retro-label !text-[9px] block">Your Answer:</span>
                  <span className={`font-semibold ${ans.isCorrect ? 'text-[#218653]' : 'text-[#D94828]'}`}>
                    {String(ans.selectedAnswer)}
                  </span>
                </div>
                <div className="p-2 rounded-[3px] bg-[#FFFCF4] border border-[#30343B]/30">
                  <span className="retro-label !text-[9px] block">Expected Anomaly:</span>
                  <span className="font-semibold text-[#242830]">
                    {String(ans.correctAnswer)}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs text-[#6B7280] leading-relaxed">
                <em>Explanation:</em> {ans.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Summary & Key Takeaways */}
      <div className="retro-card p-6 space-y-3 bg-[#F8F2E5]">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#245D9C]" />
          <h3 className="serif text-xl font-bold text-[#242830]">
            Core Data Science Insights Mastered
          </h3>
        </div>
        <ul className="text-sm text-[#242830] space-y-2 list-disc list-inside leading-relaxed">
          <li>
            <strong>Categorical Boundaries:</strong> Qualitative outliers break semantic taxonomy (e.g. roots vs fruits, markup vs procedural code).
          </li>
          <li>
            <strong>Numerical Distance:</strong> An isolated value far beyond the cluster standard deviation significantly shifts the mean while median remains robust.
          </li>
          <li>
            <strong>Tukey's IQR Fences:</strong> Values below $Q_1 - 1.5 \times \text{IQR}$ or above $Q_3 + 1.5 \times \text{IQR}$ are classified as outliers without assuming a normal distribution.
          </li>
          <li>
            <strong>Z-Scores ($\pm 2\sigma$):</strong> Standardized distance from the mean; observations exceeding 2 or 3 standard deviations denote rare tail occurrences.
          </li>
        </ul>
      </div>
    </div>
  );
};
