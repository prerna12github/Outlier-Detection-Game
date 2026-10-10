import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Question,
  GameMode,
  Difficulty,
  PlayerAnswer,
  CategoricalOption,
} from '../types/game';
import { calculateStats, isValueOutlier, formatStat, generateSyntheticDataset } from '../lib/stats';
import { sound } from '../lib/sound';
import { DataChart } from './DataChart';
import { DatasetControls } from './DatasetControls';
import {
  Lightbulb,
  SkipForward,
  LogOut,
  Flame,
  Award,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface GameplayScreenProps {
  questions: Question[];
  mode: GameMode;
  difficulty: Difficulty;
  onFinishGame: (answers: PlayerAnswer[], finalScore: number, bestStreak: number, totalTime: number) => void;
  onQuitToHome: () => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  questions,
  mode,
  difficulty,
  onFinishGame,
  onQuitToHome,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Per-question interactive states
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintOpen, setHintOpen] = useState<boolean>(false);
  const [hintUsedThisQuestion, setHintUsedThisQuestion] = useState<boolean>(false);
  const [quitModalOpen, setQuitModalOpen] = useState<boolean>(false);

  // Dynamic dataset controls for Data Scientist / numerical challenges
  const currentQ = questions[currentIndex] || questions[0];
  const [rawDatasetInput, setRawDatasetInput] = useState<string>('');
  const [targetValueInput, setTargetValueInput] = useState<string>('');
  const [detectionRule, setDetectionRule] = useState<'iqr' | 'zscore'>('iqr');

  // Timers
  const baseTimeSeconds = difficulty === 'easy' ? 45 : difficulty === 'medium' ? 35 : difficulty === 'hard' ? 25 : 20;
  const [timeLeft, setTimeLeft] = useState<number>(baseTimeSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync inputs whenever currentIndex changes
  useEffect(() => {
    if (currentQ) {
      const initialData = currentQ.dataset ? currentQ.dataset.join(', ') : '52, 55, 58, 60, 62, 65, 98';
      setRawDatasetInput(initialData);
      setTargetValueInput(currentQ.targetValue !== undefined ? String(currentQ.targetValue) : '98');
      setDetectionRule(currentQ.detectionRule === 'zscore' ? 'zscore' : 'iqr');
      setSelectedOptionId(null);
      setIsAnswered(false);
      setIsCorrect(null);
      setHintOpen(false);
      setHintUsedThisQuestion(false);
      setTimeLeft(baseTimeSeconds);
      setQuestionStartTime(Date.now());
    }
  }, [currentIndex, currentQ, baseTimeSeconds]);

  // Countdown timer effect
  useEffect(() => {
    if (isAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered]);

  // Parsed numerical dataset from text
  const parsedData = useMemo(() => {
    return rawDatasetInput
      .split(/[\s,;]+/)
      .filter(Boolean)
      .map(Number)
      .filter(Number.isFinite);
  }, [rawDatasetInput]);

  const stats = useMemo(() => {
    return calculateStats(parsedData, 2.0);
  }, [parsedData]);

  const targetNum = useMemo(() => {
    const val = Number(targetValueInput);
    return Number.isFinite(val) ? val : null;
  }, [targetValueInput]);

  const isTargetOutlierUnderCurrentRule = useMemo(() => {
    if (!stats || targetNum === null) return null;
    return isValueOutlier(targetNum, stats, detectionRule, 2.0);
  }, [stats, targetNum, detectionRule]);

  // Points multiplier based on difficulty
  const difficultyMultiplier = difficulty === 'easy' ? 1.0 : difficulty === 'medium' ? 1.25 : difficulty === 'hard' ? 1.5 : 2.0;

  // Handler: Player chooses an option
  const handleSelectOption = (option: CategoricalOption) => {
    if (isAnswered) return;

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    const correct = option.isOutlier;

    setIsAnswered(true);
    setSelectedOptionId(option.id);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak((prev) => Math.max(prev, newStreak));

      // Calculate score: Base 100 + Time bonus up to 50 + Streak bonus
      const timeBonus = Math.max(0, Math.round((timeLeft / baseTimeSeconds) * 50));
      const streakBonus = (newStreak - 1) * 20;
      const hintPenalty = hintUsedThisQuestion ? 30 : 0;
      const roundScore = Math.max(20, Math.round((100 + timeBonus + streakBonus - hintPenalty) * difficultyMultiplier));

      setScore((s) => s + roundScore);

      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          questionPrompt: currentQ.prompt,
          category: currentQ.category,
          type: currentQ.type,
          selectedAnswer: option.label,
          correctAnswer: currentQ.options?.find((o) => o.isOutlier)?.label || option.label,
          isCorrect: true,
          timeSpentSeconds: timeSpent,
          hintUsed: hintUsedThisQuestion,
          pointsEarned: roundScore,
          explanation: currentQ.explanation,
        },
      ]);
    } else {
      sound.playWrong();
      setStreak(0);
      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          questionPrompt: currentQ.prompt,
          category: currentQ.category,
          type: currentQ.type,
          selectedAnswer: option.label,
          correctAnswer: currentQ.options?.find((o) => o.isOutlier)?.label || 'Outlier',
          isCorrect: false,
          timeSpentSeconds: timeSpent,
          hintUsed: hintUsedThisQuestion,
          pointsEarned: 0,
          explanation: currentQ.explanation,
        },
      ]);
    }
  };

  // Handler: Scientist / Binary Outlier Call ("Yes, it is an Outlier" vs "No, within Normal Range")
  const handleBinaryScientistCall = (playerCallsOutlier: boolean) => {
    if (isAnswered) return;

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    // Determine truth according to detection rule or question definition
    const actualIsOutlier = isTargetOutlierUnderCurrentRule !== null ? isTargetOutlierUnderCurrentRule : (currentQ.options?.find((o) => o.isOutlier)?.label.toLowerCase().includes('yes') ?? true);

    const correct = playerCallsOutlier === actualIsOutlier;

    setIsAnswered(true);
    setIsCorrect(correct);
    setSelectedOptionId(playerCallsOutlier ? 'opt-call-outlier' : 'opt-call-normal');

    if (correct) {
      sound.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak((prev) => Math.max(prev, newStreak));

      const timeBonus = Math.max(0, Math.round((timeLeft / baseTimeSeconds) * 50));
      const streakBonus = (newStreak - 1) * 20;
      const hintPenalty = hintUsedThisQuestion ? 30 : 0;
      const roundScore = Math.max(20, Math.round((100 + timeBonus + streakBonus - hintPenalty) * difficultyMultiplier));

      setScore((s) => s + roundScore);

      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          questionPrompt: currentQ.prompt,
          category: currentQ.category,
          type: currentQ.type,
          selectedAnswer: playerCallsOutlier ? 'Outlier' : 'Normal Range',
          correctAnswer: actualIsOutlier ? 'Outlier' : 'Normal Range',
          isCorrect: true,
          timeSpentSeconds: timeSpent,
          hintUsed: hintUsedThisQuestion,
          pointsEarned: roundScore,
          explanation: currentQ.explanation,
        },
      ]);
    } else {
      sound.playWrong();
      setStreak(0);
      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          questionPrompt: currentQ.prompt,
          category: currentQ.category,
          type: currentQ.type,
          selectedAnswer: playerCallsOutlier ? 'Outlier' : 'Normal Range',
          correctAnswer: actualIsOutlier ? 'Outlier' : 'Normal Range',
          isCorrect: false,
          timeSpentSeconds: timeSpent,
          hintUsed: hintUsedThisQuestion,
          pointsEarned: 0,
          explanation: currentQ.explanation,
        },
      ]);
    }
  };

  // Handler: Time runs out
  const handleTimeOut = () => {
    if (isAnswered) return;
    sound.playWrong();
    setIsAnswered(true);
    setIsCorrect(false);
    setStreak(0);

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        questionPrompt: currentQ.prompt,
        category: currentQ.category,
        type: currentQ.type,
        selectedAnswer: 'Time Expired',
        correctAnswer: currentQ.options?.find((o) => o.isOutlier)?.label || String(currentQ.targetValue || 'Outlier'),
        isCorrect: false,
        timeSpentSeconds: baseTimeSeconds,
        hintUsed: hintUsedThisQuestion,
        pointsEarned: 0,
        explanation: currentQ.explanation,
      },
    ]);
  };

  // Handler: Skip Question
  const handleSkipQuestion = () => {
    if (isAnswered) return;
    sound.playPop();
    setIsAnswered(true);
    setIsCorrect(false);
    setStreak(0);

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        questionPrompt: currentQ.prompt,
        category: currentQ.category,
        type: currentQ.type,
        selectedAnswer: 'Skipped',
        correctAnswer: currentQ.options?.find((o) => o.isOutlier)?.label || String(currentQ.targetValue || 'Outlier'),
        isCorrect: false,
        timeSpentSeconds: Math.max(1, Math.round((Date.now() - questionStartTime) / 1000)),
        hintUsed: hintUsedThisQuestion,
        pointsEarned: 0,
        explanation: currentQ.explanation,
      },
    ]);
  };

  // Handler: Next question or finish
  const handleNextQuestion = () => {
    sound.playPop();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const totalTime = Math.round((Date.now() - startTime) / 1000);
      onFinishGame(answers, score, bestStreak, totalTime);
    }
  };

  // Handler: Shuffle new dataset for scientific exploration
  const handleShuffleDataset = () => {
    const syn = generateSyntheticDataset('exam', Math.random() > 0.4);
    setRawDatasetInput(syn.dataset.join(', '));
    setTargetValueInput(String(syn.targetValue));
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* Top HUD Status Bar */}
      <div className="retro-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="retro-chip !bg-[#242830] !text-[#FFFCF4]">
            {mode.toUpperCase()} MODE
          </span>
          <span className="retro-chip !bg-[#E85D16] !text-[#FFFCF4]">
            {difficulty.toUpperCase()}
          </span>
          <div className="text-sm font-bold text-[#242830]">
            Question <span className="mono text-[#E85D16]">{currentIndex + 1}</span> of {questions.length}
          </div>
        </div>

        {/* Score & Streak & Timer HUD */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Timer */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-[4px] border-[1.5px] border-[#30343B] mono font-bold text-sm shadow-[2px_2px_0px_#30343B] ${
            timeLeft <= 5 ? 'bg-[#D94828] text-[#FFFCF4] animate-pulse' : 'bg-[#FFFCF4] text-[#242830]'
          }`}>
            <Timer className="h-4 w-4" />
            {timeLeft}s
          </div>

          {/* Combo Streak */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] mono text-sm shadow-[2px_2px_0px_#30343B]">
            <Flame className={`h-4 w-4 ${streak > 0 ? 'text-[#E85D16]' : 'text-[#6B7280]'}`} />
            <span className="retro-label !text-[10px]">Streak:</span>
            <span className="font-bold text-[#242830]">{streak}</span>
          </div>

          {/* Current Score */}
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#245D9C] text-[#FFFCF4] mono font-bold text-sm shadow-[2px_2px_0px_#30343B]">
            <Award className="h-4 w-4 text-[#F4C5A5]" />
            <span>{score}</span>
          </div>

          {/* Quit Button */}
          <button
            onClick={() => setQuitModalOpen(true)}
            className="retro-btn !p-1.5 !text-xs"
            title="Quit Current Session"
          >
            <LogOut className="h-4 w-4 text-[#D94828]" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full border-[1.5px] border-[#30343B] bg-[#EFE7D7] overflow-hidden">
        <div
          className="h-full bg-[#245D9C] transition-all duration-300"
          style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Context & Question Prompt Banner */}
      <div className="retro-card p-5 sm:p-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="retro-chip inline-flex items-center gap-1">
            <Info className="h-3 w-3" />
            {currentQ.category}
          </span>
          <span className="hand text-lg text-[#245D9C]">
            Find the Outlier!
          </span>
        </div>

        <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#242830] tracking-tight">
          {currentQ.prompt}
        </h2>

        {currentQ.subtitle && (
          <p className="text-sm text-[#6B7280]">
            {currentQ.subtitle}
          </p>
        )}
      </div>

      {/* Main Gameplay Interaction Area */}
      {currentQ.type === 'categorical' && currentQ.options && (
        /* Categorical Layout: 4-6 Interactive Cards */
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let cardStateClass = '';

              if (isAnswered) {
                if (opt.isOutlier) {
                  cardStateClass = 'border-[2.5px] border-[#218653] bg-[#EAF7EE] shadow-[5px_5px_0px_#218653]';
                } else if (isSelected && !opt.isOutlier) {
                  cardStateClass = 'border-[2.5px] border-[#D94828] bg-[#FDEDE9] shadow-[5px_5px_0px_#D94828]';
                } else {
                  cardStateClass = 'opacity-65';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className={`retro-card ${!isAnswered ? 'retro-card-interactive' : ''} p-5 text-center flex flex-col justify-between items-center min-h-[140px] ${cardStateClass}`}
                >
                  <div className="text-4xl sm:text-5xl my-2">
                    {opt.icon || '📌'}
                  </div>
                  <div>
                    <div className="serif text-xl font-bold text-[#242830]">
                      {opt.label}
                    </div>
                    {opt.sublabel && (
                      <div className="text-xs text-[#6B7280] mt-0.5">
                        {opt.sublabel}
                      </div>
                    )}
                  </div>

                  {isAnswered && opt.isOutlier && (
                    <div className="mt-2 text-xs font-bold mono text-[#218653] flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> THE OUTLIER
                    </div>
                  )}
                  {isAnswered && isSelected && !opt.isOutlier && (
                    <div className="mt-2 text-xs font-bold mono text-[#D94828] flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> NOT OUTLIER
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(currentQ.type === 'numerical' || currentQ.type === 'scientist') && stats && (
        /* Numerical & Scientist Layout: Fig. 1 Visualization + Dataset Controls + Anomaly Call */
        <div className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
            {/* Left: Scientific Fig. 1 Chart */}
            <div className="space-y-4">
              <DataChart
                stats={stats}
                targetValue={targetNum}
                method={detectionRule}
                revealed={isAnswered}
                isTargetOutlier={isTargetOutlierUnderCurrentRule}
                unit={currentQ.unit}
                title="Fig. 1 — the data"
              />

              {/* Numerical Selection Options (for Mode C questions with discrete number choices) */}
              {currentQ.type === 'numerical' && currentQ.options && (
                <div className="retro-card p-4">
                  <div className="retro-label mb-2">Select the suspected outlier:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      let btnStyle = 'retro-btn w-full !text-base font-bold mono';

                      if (isAnswered) {
                        if (opt.isOutlier) {
                          btnStyle += ' !bg-[#218653] !text-[#FFFCF4] !border-[#218653]';
                        } else if (isSelected && !opt.isOutlier) {
                          btnStyle += ' !bg-[#D94828] !text-[#FFFCF4] !border-[#D94828]';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(opt)}
                          className={btnStyle}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Binary Outlier Call for Scientist Mode questions */}
              {currentQ.type === 'scientist' && !isAnswered && (
                <div className="retro-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 bg-[#FFFCF4]">
                  <div>
                    <span className="retro-label">Investigator's Verdict</span>
                    <p className="serif text-xl font-bold text-[#242830] mt-0.5">
                      Is <span className="marker-highlight mono">{targetNum} {currentQ.unit}</span> an outlier under the selected rule?
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleBinaryScientistCall(true)}
                      className="retro-btn retro-btn-danger min-w-[130px]"
                    >
                      Yes, Outlier
                    </button>
                    <button
                      onClick={() => handleBinaryScientistCall(false)}
                      className="retro-btn retro-btn-success min-w-[130px]"
                    >
                      No, Normal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Dataset Controls (Only editable in scientist mode) */}
            <DatasetControls
              rawInput={rawDatasetInput}
              onChangeRaw={setRawDatasetInput}
              targetValue={targetValueInput}
              onChangeTarget={setTargetValueInput}
              detectionRule={detectionRule}
              onChangeRule={setDetectionRule}
              onShuffle={handleShuffleDataset}
              observationCount={parsedData.length}
              disabled={isAnswered}
            />
          </div>
        </div>
      )}

      {/* Answer Feedback & Educational Explanation Panel */}
      {isAnswered && (
        <div className={`retro-card p-5 sm:p-6 space-y-4 animate-in fade-in duration-200 ${
          isCorrect ? 'border-[2px] border-[#218653] bg-[#F4FBF6]' : 'border-[2px] border-[#D94828] bg-[#FDF5F3]'
        }`}>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-[1.5px] border-[#30343B]/20 pb-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] text-[#FFFCF4] shadow-[2px_2px_0px_#30343B] ${
                isCorrect ? 'bg-[#218653]' : 'bg-[#D94828]'
              }`}>
                {isCorrect ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
              </div>
              <div>
                <h3 className={`serif text-2xl font-bold ${isCorrect ? 'text-[#218653]' : 'text-[#D94828]'}`}>
                  {isCorrect ? 'Nailed it. Correct Call!' : 'Investigation Inconclusive.'}
                </h3>
                <p className="text-xs text-[#6B7280]">
                  {isCorrect
                    ? `Observation correctly classified under ${detectionRule.toUpperCase()} criteria.`
                    : 'The mathematical or conceptual evidence points in a different direction.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              className="retro-btn retro-btn-primary !py-2.5 !px-6"
            >
              NEXT CHALLENGE <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Explanation Text */}
          <div className="space-y-2 text-sm text-[#242830] leading-relaxed">
            <div className="p-3 rounded-[4px] border-[1px] border-[#30343B]/20 bg-[#FFFCF4]">
              <span className="retro-label block mb-1">Detective Rationale</span>
              <p className="font-medium text-[#242830]">{currentQ.explanation}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-[4px] border-[1px] border-[#30343B]/20 bg-[#FFFCF4]">
                <span className="retro-label !text-[10px] block">The Shared Pattern:</span>
                <span className="text-[#242830]">{currentQ.commonPattern}</span>
              </div>
              <div className="p-2.5 rounded-[4px] border-[1px] border-[#30343B]/20 bg-[#FFFCF4]">
                <span className="retro-label !text-[10px] block">Why it deviates:</span>
                <span className="text-[#E85D16] font-semibold">{currentQ.whyOutlier}</span>
              </div>
            </div>

            {currentQ.statsContext && (
              <div className="mono text-xs text-[#245D9C] p-2 rounded-[3px] bg-[#245D9C]/10 border border-[#245D9C]/30">
                {currentQ.statsContext}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Footer Bar (Hint, Skip) */}
      {!isAnswered && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playHint();
                setHintOpen(true);
                setHintUsedThisQuestion(true);
              }}
              className="retro-btn !text-xs"
            >
              <Lightbulb className="h-4 w-4 text-[#E85D16]" />
              Need a Clue? (-30 pts)
            </button>

            <button
              onClick={handleSkipQuestion}
              className="retro-btn !text-xs text-[#6B7280]"
            >
              <SkipForward className="h-4 w-4" />
              Skip Question
            </button>
          </div>

          <div className="text-xs text-[#6B7280] hand text-lg">
            "Trust your eyes. Check the math."
          </div>
        </div>
      )}

      {/* Hint Modal Dialog */}
      {hintOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242830]/40 backdrop-blur-xs p-4">
          <div className="retro-card max-w-md w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2 border-b-[1.5px] border-[#30343B] pb-3">
              <Lightbulb className="h-5 w-5 text-[#E85D16]" />
              <h3 className="serif text-xl font-bold text-[#242830]">
                Detective Clue
              </h3>
            </div>
            <p className="text-sm text-[#242830] leading-relaxed">
              {currentQ.hint}
            </p>
            <div className="text-xs text-[#6B7280] italic">
              Note: Using a hint reduces the base score by 30 points for this challenge.
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setHintOpen(false)}
                className="retro-btn retro-btn-primary !py-2 !px-5"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quit Game Confirmation Modal */}
      {quitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242830]/40 backdrop-blur-xs p-4">
          <div className="retro-card max-w-md w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2 border-b-[1.5px] border-[#30343B] pb-3">
              <AlertTriangle className="h-5 w-5 text-[#D94828]" />
              <h3 className="serif text-xl font-bold text-[#242830]">
                Abort Current Investigation?
              </h3>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Exiting now will abandon your current round score and combo streak. Your high scores and previous completed sessions will remain safe in local history.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setQuitModalOpen(false)}
                className="retro-btn"
              >
                Resume Hunting
              </button>
              <button
                onClick={() => {
                  sound.playPop();
                  setQuitModalOpen(false);
                  onQuitToHome();
                }}
                className="retro-btn retro-btn-danger"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
