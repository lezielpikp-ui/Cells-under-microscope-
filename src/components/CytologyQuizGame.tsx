import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/biologyData';
import { sound } from '../utils/soundEffects';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award, Sparkles } from 'lucide-react';

interface CytologyQuizGameProps {
  onScoreAdd: (points: number) => void;
}

export function CytologyQuizGame({ onScoreAdd }: CytologyQuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];

  function handleSelectOption(index: number) {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === question.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 100);
      setCorrectAnswersCount((prev) => prev + 1);
      onScoreAdd(100);
    } else {
      sound.playMistake();
    }
  }

  function handleNext() {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      sound.playFanfare();
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectAnswersCount(0);
    setIsCompleted(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-wider mb-1">
            <span>Mission 04</span>
            <span>·</span>
            <span>Exam Practice</span>
            <span>·</span>
            <span className="font-bold">Primary 5 Science Quiz</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Fraunces',serif]">
            Cell Champion Quiz
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            10 questions to test your knowledge of the 7 cell parts and animal vs plant cells.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">Question</span>
            <span className="text-sm font-bold font-mono text-slate-900">
              {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-800 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200 uppercase">
              {question.p5Concept}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-4 leading-snug font-['Fraunces',serif]">
              {question.prompt}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-1">
            {question.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = isAnswered && oIdx === question.correctIndex;
              const isWrongSelected = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl text-left border text-sm transition-all flex items-start justify-between gap-3 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400'
                      : isWrongSelected
                      ? 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400'
                      : isAnswered
                      ? 'opacity-60 bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-white hover:bg-slate-50 hover:border-slate-400 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>

                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  {isWrongSelected && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                selectedOption === question.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <span className="font-bold block text-sm">
                {selectedOption === question.correctIndex ? '✓ Correct!' : '💡 Here is why:'}
              </span>
              <p>{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow"
              >
                <span>{currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'See My Score!'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5 max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center text-3xl">
            <Award className="w-8 h-8 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Fraunces',serif]">
              Quiz Complete!
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              You scored <span className="font-bold text-emerald-700">{score} Points</span> ({correctAnswersCount} out of {QUIZ_QUESTIONS.length} correct)
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
            {correctAnswersCount === 10 ? (
              <p className="font-bold text-emerald-700">
                🌟 Perfect 10/10! You are ready to ace your Primary 5 Cell System exams!
              </p>
            ) : correctAnswersCount >= 7 ? (
              <p className="font-bold text-indigo-700">
                👏 Great effort! You have a solid grasp of plant and animal cells.
              </p>
            ) : (
              <p className="font-medium text-slate-700">
                Keep practicing with the Microscope Lab and Sorter to memorize the 7 cell parts!
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 mx-auto shadow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
