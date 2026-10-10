import React from 'react';
import { UserStats } from '../types/game';
import { sound } from '../lib/sound';
import { clearUserStats } from '../lib/storage';
import { BarChart3, Award, Flame, Target, X, Trash2, Calendar, Clock } from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onStatsReset: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  userStats,
  onStatsReset,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear your local game history and high scores?')) {
      clearUserStats();
      onStatsReset();
      sound.playPop();
    }
  };

  const accuracy = userStats.totalQuestionsAnswered > 0
    ? Math.round((userStats.totalCorrect / userStats.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242830]/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="retro-card max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-3">
          <div className="flex items-center gap-2">
            <span className="retro-chip !bg-[#245D9C] !text-[#FFFCF4]">LOCAL DOSSIER</span>
            <h2 className="serif text-2xl font-bold text-[#242830]">
              Personal Statistics
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="retro-btn !p-1.5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Global Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Total Games</div>
            <div className="mono text-2xl font-bold text-[#242830] mt-1">
              {userStats.totalGamesPlayed}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">High Score</div>
            <div className="mono text-2xl font-bold text-[#E85D16] mt-1">
              {userStats.highScore}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Best Streak</div>
            <div className="mono text-2xl font-bold text-[#218653] mt-1">
              {userStats.bestStreakOverall}
            </div>
          </div>

          <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-center shadow-[2px_2px_0px_#30343B]">
            <div className="retro-label !text-[10px]">Accuracy</div>
            <div className="mono text-2xl font-bold text-[#245D9C] mt-1">
              {userStats.totalQuestionsAnswered > 0 ? `${accuracy}%` : '—'}
            </div>
          </div>
        </div>

        {/* Mode High Scores */}
        <div className="space-y-2">
          <span className="retro-label">Mode High Scores</span>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
              <span className="font-semibold text-[#242830]">Quick Hunt</span>
              <span className="mono font-bold text-[#E85D16]">{userStats.modeHighScores.quick}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
              <span className="font-semibold text-[#242830]">Category Clash</span>
              <span className="mono font-bold text-[#245D9C]">{userStats.modeHighScores.category}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
              <span className="font-semibold text-[#242830]">Number Detective</span>
              <span className="mono font-bold text-[#218653]">{userStats.modeHighScores.number}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
              <span className="font-semibold text-[#242830]">Data Scientist</span>
              <span className="mono font-bold text-[#242830]">{userStats.modeHighScores.scientist}</span>
            </div>
          </div>
        </div>

        {/* Recent Session History Log */}
        <div className="space-y-2">
          <span className="retro-label">Recent Investigations ({userStats.history.length})</span>
          {userStats.history.length === 0 ? (
            <div className="p-4 rounded-[4px] border border-dashed border-[#30343B] text-center text-xs text-[#6B7280]">
              No investigations logged yet. Play a game to record your performance history.
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {userStats.history.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B]/40 bg-[#FFFCF4] text-xs"
                >
                  <div>
                    <div className="font-bold text-[#242830] capitalize">
                      {record.mode} ({record.difficulty})
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      {record.date} • {record.timeTakenSeconds}s
                    </div>
                  </div>
                  <div className="text-right mono">
                    <span className="font-bold text-[#E85D16]">{record.score} pts</span>
                    <span className="text-[10px] text-[#6B7280] block">
                      {record.accuracy}% acc
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t-[1.5px] border-[#30343B]">
          <button
            onClick={handleReset}
            className="retro-btn !text-xs text-[#D94828]"
            title="Reset All Local Statistics"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear History
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="retro-btn retro-btn-primary !py-2 !px-6"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
