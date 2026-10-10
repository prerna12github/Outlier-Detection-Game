import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { LandingPage } from "../components/LandingPage";
import { ModeSelector } from "../components/ModeSelector";
import { GameplayScreen } from "../components/GameplayScreen";
import { ResultsScreen } from "../components/ResultsScreen";
import { HowToPlayModal } from "../components/HowToPlayModal";
import { StatsModal } from "../components/StatsModal";
import { GameMode, Difficulty, PlayerAnswer, Question, UserStats } from "../types/game";
import { getQuestionsForGame } from "../data/questionBank";
import { loadUserStats, recordGameSession } from "../lib/storage";
import { sound } from "../lib/sound";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OUTLIER HUNT — Spot the Odd. Master the Data." },
      {
        name: "description",
        content: "An interactive, educational game for identifying unusual items, values, and statistical outliers with Tukey IQR fences and Z-scores.",
      },
      { property: "og:title", content: "OUTLIER HUNT — Spot the Odd. Master the Data." },
      {
        property: "og:description",
        content: "Spot the Odd. Master the Data. Train your brain to detect anomalies like a data scientist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OutlierHuntApp,
});

function OutlierHuntApp() {
  const [screen, setScreen] = useState<'home' | 'modes' | 'game' | 'results'>('home');
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Active game setup
  const [currentMode, setCurrentMode] = useState<GameMode>('quick');
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('medium');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  // Results state
  const [lastAnswers, setLastAnswers] = useState<PlayerAnswer[]>([]);
  const [lastScore, setLastScore] = useState<number>(0);
  const [lastBestStreak, setLastBestStreak] = useState<number>(0);
  const [lastTimeTaken, setLastTimeTaken] = useState<number>(0);

  // Modals
  const [howToPlayOpen, setHowToPlayOpen] = useState<boolean>(false);
  const [statsOpen, setStatsOpen] = useState<boolean>(false);

  // Reload user stats on mount
  useEffect(() => {
    setUserStats(loadUserStats());
  }, []);

  const handleToggleSound = () => {
    const updated = sound.toggleMute();
    setIsMuted(updated);
  };

  const handleStartGameWithConfig = (mode: GameMode, difficulty: Difficulty) => {
    setCurrentMode(mode);
    setCurrentDifficulty(difficulty);
    const questions = getQuestionsForGame(mode, difficulty, 5);
    setActiveQuestions(questions);
    setScreen('game');
  };

  const handleFinishGame = (
    answers: PlayerAnswer[],
    finalScore: number,
    bestStreak: number,
    totalTime: number
  ) => {
    setLastAnswers(answers);
    setLastScore(finalScore);
    setLastBestStreak(bestStreak);
    setLastTimeTaken(totalTime);

    const correctCount = answers.filter((a) => a.isCorrect).length;
    const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

    // Record game in localStorage
    const updatedStats = recordGameSession({
      id: `game-${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      mode: currentMode,
      difficulty: currentDifficulty,
      score: finalScore,
      totalQuestions: answers.length,
      correctCount,
      accuracy,
      bestStreak,
      timeTakenSeconds: totalTime,
    });
    setUserStats(updatedStats);

    setScreen('results');
  };

  return (
    <div className="min-h-screen paper-bg flex flex-col justify-between selection:bg-[#F4C5A5] selection:text-[#242830]">
      {/* Top Header */}
      <Header
        currentScreen={screen}
        onNavigate={(target) => {
          sound.playPop();
          setScreen(target);
        }}
        onOpenHowToPlay={() => setHowToPlayOpen(true)}
        onOpenStats={() => setStatsOpen(true)}
        highScore={userStats.highScore}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Screen Content */}
      <main className="flex-1 px-4 py-4 sm:px-6 md:py-8 max-w-6xl mx-auto w-full">
        {screen === 'home' && (
          <LandingPage
            onStartPlay={() => setScreen('modes')}
            onOpenHowToPlay={() => setHowToPlayOpen(true)}
            userStats={userStats}
          />
        )}

        {screen === 'modes' && (
          <ModeSelector
            onSelectModeAndDifficulty={handleStartGameWithConfig}
            onBack={() => setScreen('home')}
            modeHighScores={userStats.modeHighScores}
          />
        )}

        {screen === 'game' && activeQuestions.length > 0 && (
          <GameplayScreen
            questions={activeQuestions}
            mode={currentMode}
            difficulty={currentDifficulty}
            onFinishGame={handleFinishGame}
            onQuitToHome={() => setScreen('home')}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            answers={lastAnswers}
            finalScore={lastScore}
            bestStreak={lastBestStreak}
            totalTimeSeconds={lastTimeTaken}
            mode={currentMode}
            difficulty={currentDifficulty}
            onPlayAgain={() => handleStartGameWithConfig(currentMode, currentDifficulty)}
            onChangeMode={() => setScreen('modes')}
            onGoHome={() => setScreen('home')}
          />
        )}
      </main>

      {/* How to Play Modal */}
      <HowToPlayModal
        isOpen={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
        onStartPlaying={() => {
          setHowToPlayOpen(false);
          setScreen('modes');
        }}
      />

      {/* Statistics Dossier Modal */}
      <StatsModal
        isOpen={statsOpen}
        onClose={() => setStatsOpen(false)}
        userStats={userStats}
        onStatsReset={() => setUserStats(loadUserStats())}
      />
    </div>
  );
}
