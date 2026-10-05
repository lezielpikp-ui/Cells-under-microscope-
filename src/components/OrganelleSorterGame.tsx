import { useState, useEffect, useRef } from 'react';
import { ORGANELLES } from '../data/biologyData';
import { Organelle, OrganelleCategory } from '../types/biology';
import { sound } from '../utils/soundEffects';
import { Zap, Timer, RotateCcw, Check, X, Sparkles, BookOpen } from 'lucide-react';

interface OrganelleSorterGameProps {
  onScoreAdd: (points: number) => void;
}

export function OrganelleSorterGame({ onScoreAdd }: OrganelleSorterGameProps) {
  const [deck, setDeck] = useState<Organelle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameMode, setGameMode] = useState<'blitz' | 'practice'>('blitz');
  const [timeLeft, setTimeLeft] = useState(45);
  const [isActive, setIsActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Scoring
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedItems, setMissedItems] = useState<{ organelle: Organelle; guessed: OrganelleCategory }[]>([]);

  const [feedbackToast, setFeedbackToast] = useState<{
    success: boolean;
    text: string;
  } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function initializeGame(mode: 'blitz' | 'practice' = gameMode) {
    // Duplicate the 7 parts twice for a fast round
    const pool = [...ORGANELLES, ...ORGANELLES].sort(() => Math.random() - 0.5);
    setDeck(pool);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setCorrectCount(0);
    setMissedItems([]);
    setTimeLeft(45);
    setFeedbackToast(null);
    setIsGameOver(false);
    setIsActive(true);
    setGameMode(mode);
  }

  useEffect(() => {
    initializeGame('blitz');
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isActive && gameMode === 'blitz' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, gameMode, timeLeft]);

  function handleGameOver() {
    setIsActive(false);
    setIsGameOver(true);
    sound.playFanfare();
  }

  function handleClassify(category: OrganelleCategory) {
    if (!isActive && !isGameOver) return;
    if (isGameOver) return;

    const currentOrganelle = deck[currentIndex];
    const isCorrect = currentOrganelle.category === category;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);

      const multiplier = newStreak >= 4 ? 2 : 1;
      const pts = 50 * multiplier;
      setScore((prev) => prev + pts);
      setCorrectCount((prev) => prev + 1);
      onScoreAdd(pts);
      sound.playCorrect();

      setFeedbackToast({
        success: true,
        text: `✓ Correct! ${currentOrganelle.name}`,
      });
    } else {
      setStreak(0);
      sound.playMistake();
      setMissedItems((prev) => [...prev, { organelle: currentOrganelle, guessed: category }]);

      setFeedbackToast({
        success: false,
        text: `✕ Remember: ${currentOrganelle.name} is in ${
          currentOrganelle.category === 'plant-only' ? 'Plants Only' : 'Both Cells'
        }!`,
      });
    }

    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleGameOver();
    }
  }

  const currentOrganelle = deck[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-wider mb-1">
            <span>Mission 02</span>
            <span>·</span>
            <span>Speed Sorting</span>
            <span>·</span>
            <span className="font-bold">Plant Only vs Both Cells</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Fraunces',serif]">
            Cell Part Sorter
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Sort the 7 cell parts! Is it found in <strong className="text-emerald-700">Plants Only</strong> or in <strong className="text-indigo-700">Both Plant & Animal Cells</strong>?
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => initializeGame('blitz')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                gameMode === 'blitz' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              45s Speed Run
            </button>
            <button
              onClick={() => initializeGame('practice')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                gameMode === 'practice' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Practice
            </button>
          </div>

          <button
            onClick={() => initializeGame()}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Score</span>
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">{score}</span>
          </div>
          <Zap className="w-5 h-5 text-amber-500" />
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Streak</span>
            <span className="text-2xl font-bold font-mono text-emerald-600 tabular-nums">{streak}x</span>
          </div>
          <Sparkles className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Correct</span>
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">{correctCount}</span>
          </div>
          <Check className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">Time</span>
            <span className={`text-2xl font-bold font-mono tabular-nums ${timeLeft <= 8 ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>
              {gameMode === 'blitz' ? `${timeLeft}s` : '∞'}
            </span>
          </div>
          <Timer className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {!isGameOver && currentOrganelle ? (
        <div className="space-y-6">
          {/* Card to sort */}
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-md max-w-lg mx-auto text-center relative overflow-hidden">
            <div className="text-xs font-mono text-slate-400 mb-2">
              Question {currentIndex + 1} of {deck.length}
            </div>

            <div
              className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow"
              style={{ backgroundColor: currentOrganelle.color }}
            >
              {currentOrganelle.name.charAt(0)}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-['Fraunces',serif]">
              {currentOrganelle.name}
            </h2>

            {/* Exact P5 function */}
            <div className="p-3 bg-emerald-50 text-emerald-950 text-xs rounded-xl font-medium mb-3 border border-emerald-200">
              <span className="font-bold block text-[11px] text-emerald-800 uppercase mb-0.5">Primary 5 Function:</span>
              <span>{currentOrganelle.p5Summary}</span>
            </div>

            <p className="text-xs text-slate-500 italic">
              Analogy: {currentOrganelle.analogy}
            </p>

            {/* Vacuole specific note */}
            {currentOrganelle.vacuoleNote && (
              <div className="mt-3 text-[11px] text-sky-800 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
                {currentOrganelle.vacuoleNote}
              </div>
            )}

            {/* Instant Toast */}
            {feedbackToast && (
              <div
                className={`absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold shadow transition-all ${
                  feedbackToast.success ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {feedbackToast.text}
              </div>
            )}
          </div>

          {/* 2 Big Sorting Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Bin 1: Plants Only */}
            <button
              onClick={() => handleClassify('plant-only')}
              className="group p-6 rounded-3xl border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 active:scale-95 transition-all text-center flex flex-col items-center justify-center shadow-sm"
            >
              <span className="text-3xl mb-1">🌿</span>
              <h3 className="text-lg font-bold text-emerald-950">Plants Only</h3>
              <p className="text-xs text-emerald-800/80 mt-1">
                Cell Wall & Chloroplasts
              </p>
            </button>

            {/* Bin 2: Both Plants & Animals */}
            <button
              onClick={() => handleClassify('both')}
              className="group p-6 rounded-3xl border-2 border-indigo-400 bg-indigo-50 hover:bg-indigo-100 active:scale-95 transition-all text-center flex flex-col items-center justify-center shadow-sm"
            >
              <span className="text-3xl mb-1">⚖️</span>
              <h3 className="text-lg font-bold text-indigo-950">Both Plant & Animal</h3>
              <p className="text-xs text-indigo-800/80 mt-1">
                Cell Membrane, Nucleus, Cytoplasm, Mitochondria, Vacuole
              </p>
            </button>
          </div>
        </div>
      ) : (
        /* Round Over Screen */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl max-w-lg mx-auto text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center text-3xl">
            🎉
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Fraunces',serif]">
              Great Job!
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              You scored <span className="font-bold text-slate-900">{score} points</span> with a best streak of{' '}
              <span className="font-bold text-emerald-600">{highestStreak}x</span>!
            </p>
          </div>

          {missedItems.length > 0 ? (
            <div className="text-left bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Let's Review:
              </h4>
              <div className="space-y-2 text-xs">
                {missedItems.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900">{item.organelle.name}</span>
                    <span className="text-emerald-700 font-semibold block text-[11px]">
                      {item.organelle.category === 'plant-only'
                        ? '🌿 Found in Plants Only!'
                        : '⚖️ Found in Both Plant & Animal Cells!'}
                    </span>
                    <span className="text-slate-500 text-[11px]">{item.organelle.p5Summary}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-semibold">
              ⭐ Perfect score! You know all your Primary 5 cell parts!
            </div>
          )}

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => initializeGame('blitz')}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
