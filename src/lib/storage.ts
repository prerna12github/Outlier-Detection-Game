import { UserStats, GameRecord, GameMode, Difficulty } from '../types/game';

const STORAGE_KEY = 'outlier_hunt_user_stats';

const DEFAULT_STATS: UserStats = {
  totalGamesPlayed: 0,
  highScore: 0,
  bestStreakOverall: 0,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  modeHighScores: {
    quick: 0,
    category: 0,
    number: 0,
    scientist: 0,
  },
  difficultyCompletions: {
    easy: 0,
    medium: 0,
    hard: 0,
    expert: 0,
  },
  history: [],
};

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      modeHighScores: {
        ...DEFAULT_STATS.modeHighScores,
        ...(parsed.modeHighScores || {}),
      },
      difficultyCompletions: {
        ...DEFAULT_STATS.difficultyCompletions,
        ...(parsed.difficultyCompletions || {}),
      },
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch (e) {
    console.error('Failed to load user stats from localStorage:', e);
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats to localStorage:', e);
  }
}

export function recordGameSession(record: GameRecord): UserStats {
  const current = loadUserStats();

  const updated: UserStats = {
    totalGamesPlayed: current.totalGamesPlayed + 1,
    highScore: Math.max(current.highScore, record.score),
    bestStreakOverall: Math.max(current.bestStreakOverall, record.bestStreak),
    totalQuestionsAnswered: current.totalQuestionsAnswered + record.totalQuestions,
    totalCorrect: current.totalCorrect + record.correctCount,
    modeHighScores: {
      ...current.modeHighScores,
      [record.mode]: Math.max(current.modeHighScores[record.mode] || 0, record.score),
    },
    difficultyCompletions: {
      ...current.difficultyCompletions,
      [record.difficulty]: (current.difficultyCompletions[record.difficulty] || 0) + 1,
    },
    history: [record, ...current.history].slice(0, 50), // keep latest 50
  };

  saveUserStats(updated);
  return updated;
}

export function clearUserStats(): UserStats {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_STATS;
}
