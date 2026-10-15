export type GameMode = 'quick' | 'category' | 'number' | 'scientist';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type QuestionType = 'categorical' | 'numerical' | 'scientist';

export interface CategoricalOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  isOutlier: boolean;
}

export interface Question {
  id: string;
  mode: GameMode;
  difficulty: Difficulty;
  category: string;
  type: QuestionType;
  prompt: string;
  subtitle?: string;
  // Categorical questions
  options?: CategoricalOption[];
  // Numerical / Scientist questions
  dataset?: number[];
  targetValue?: number;
  unit?: string;
  detectionRule?: 'iqr' | 'zscore' | 'visual';
  threshold?: number;
  // Pedagogical info
  hint: string;
  explanation: string;
  commonPattern: string;
  whyOutlier: string;
  statsContext?: string;
}

export interface PlayerAnswer {
  questionId: string;
  questionPrompt: string;
  category: string;
  type: QuestionType;
  selectedAnswer: string | number;
  correctAnswer: string | number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  hintUsed: boolean;
  pointsEarned: number;
  explanation: string;
}

export interface GameSession {
  mode: GameMode;
  difficulty: Difficulty;
  questions: Question[];
  currentIndex: number;
  score: number;
  streak: number;
  bestStreak: number;
  hintsUsedCount: number;
  answers: PlayerAnswer[];
  startTime: number;
  isComplete: boolean;
  timePerQuestion: number; 
}

export interface GameRecord {
  id: string;
  date: string;
  mode: GameMode;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  bestStreak: number;
  timeTakenSeconds: number;
}

export interface UserStats {
  totalGamesPlayed: number;
  highScore: number;
  bestStreakOverall: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  modeHighScores: Record<GameMode, number>;
  difficultyCompletions: Record<Difficulty, number>;
  history: GameRecord[];
}
