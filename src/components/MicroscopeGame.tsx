import { useState } from 'react';
import { SPECIMEN_SLIDES } from '../data/biologyData';
import { MicroscopeStage } from './MicroscopeStage';
import { sound } from '../utils/soundEffects';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, Sliders, Eye, Sparkles } from 'lucide-react';

interface MicroscopeGameProps {
  onScoreAdd: (points: number) => void;
  totalScore: number;
}

export function MicroscopeGame({ onScoreAdd, totalScore }: MicroscopeGameProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [magnification, setMagnification] = useState<40 | 100 | 400 | 1000>(100);
  const [focus, setFocus] = useState<number>(30);
  const [light, setLight] = useState<number>(70);
  const [stain, setStain] = useState<'none' | 'methylene_blue' | 'iodine'>('none');
  const [showReticle, setShowReticle] = useState(false);
  const [hoveredClue, setHoveredClue] = useState<string | null>(null);

  // P5 Checklist observations
  const [obsWall, setObsWall] = useState<boolean | null>(null);
  const [obsChloroplast, setObsChloroplast] = useState<boolean | null>(null);
  const [obsShape, setObsShape] = useState<'box' | 'rounded' | null>(null);

  // Verdict submission
  const [submittedVerdict, setSubmittedVerdict] = useState<'plant' | 'animal' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [solvedSlides, setSolvedSlides] = useState<number[]>([]);

  const currentSlide = SPECIMEN_SLIDES[currentSlideIndex];

  function handleSelectSlide(idx: number) {
    setCurrentSlideIndex(idx);
    setFocus(35);
    setStain('none');
    setMagnification(100);
    setObsWall(null);
    setObsChloroplast(null);
    setObsShape(null);
    setSubmittedVerdict(null);
    setShowResult(false);
    sound.playLensClick();
  }

  function handleQuickAutoTune() {
    setFocus(currentSlide.optimalFocus);
    setLight(currentSlide.optimalLight);
    setStain(currentSlide.bestStain);
    sound.playFocusTick();
  }

  function handleSubmitVerdict(verdict: 'plant' | 'animal') {
    setSubmittedVerdict(verdict);
    setShowResult(true);

    const isCorrect = verdict === currentSlide.correctType;
    let earned = 0;

    if (isCorrect) {
      earned += 100;
      sound.playCorrect();
    } else {
      sound.playMistake();
    }

    // Bonus for matching checklist
    if (obsWall === currentSlide.features.hasCellWall) earned += 25;
    if (obsChloroplast === currentSlide.features.hasChloroplasts) earned += 25;

    if (earned > 0) {
      onScoreAdd(earned);
      if (!solvedSlides.includes(currentSlideIndex)) {
        setSolvedSlides([...solvedSlides, currentSlideIndex]);
      }
    }
  }

  function handleNextSlide() {
    const nextIdx = (currentSlideIndex + 1) % SPECIMEN_SLIDES.length;
    handleSelectSlide(nextIdx);
  }

  const isVerdictCorrect = submittedVerdict === currentSlide.correctType;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Title & Stage Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-wider mb-1">
            <span>Primary 5 Science Lab</span>
            <span>·</span>
            <span>Mystery Microscope</span>
            <span>·</span>
            <span className="font-bold">{solvedSlides.length} of {SPECIMEN_SLIDES.length} Solved</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Fraunces',serif]">
            Mystery Slide Detective
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Look closely through the virtual microscope! Check if the cell has a <strong className="text-emerald-700">stiff Cell Wall</strong> or <strong className="text-green-700">green Chloroplasts</strong> to find out if it is a Plant Cell or an Animal Cell.
          </p>
        </div>

        {/* Slide Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {SPECIMEN_SLIDES.map((s, idx) => {
            const isCompleted = solvedSlides.includes(idx);
            const isCurrent = currentSlideIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSlide(idx)}
                className={`px-3 py-2 text-xs font-medium rounded-xl transition-all border whitespace-nowrap flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{s.codeName}</span>
                {isCompleted && <Award className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: The Microscope (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 font-mono mb-4 px-2">
            <span className="text-emerald-400 font-bold">SLIDE: {currentSlide.commonName}</span>
            <button
              onClick={() => setShowReticle(!showReticle)}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
            >
              {showReticle ? 'Hide Grid' : 'Show Grid'}
            </button>
          </div>

          {/* Microscope Eyepiece */}
          <MicroscopeStage
            slide={currentSlide}
            magnification={magnification}
            focus={focus}
            light={light}
            stain={stain}
            showReticle={showReticle}
            onOrganelleHover={(name) => setHoveredClue(name)}
          />

          {/* Eyepiece Subtext clue */}
          <div className="w-full mt-4 px-4 py-2.5 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{hoveredClue || currentSlide.fieldOfViewDescription}</span>
            </div>
            <button
              onClick={handleQuickAutoTune}
              className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 underline whitespace-nowrap shrink-0"
            >
              Auto-Focus Slide
            </button>
          </div>

          {/* Microscope Controls */}
          <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            {/* Magnification */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Microscope Lens (Zoom)</span>
                <span className="font-mono text-emerald-400">{magnification}x</span>
              </div>
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                {([40, 100, 400, 1000] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMagnification(m);
                      sound.playLensClick();
                    }}
                    className={`py-1.5 text-xs font-mono rounded-lg transition-colors ${
                      magnification === m
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </div>

            {/* Stain Dropper */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Color Stain Dropper</span>
                <span className="capitalize text-slate-400">{stain.replace('_', ' ')}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                {(['none', 'methylene_blue', 'iodine'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStain(s);
                      sound.playFocusTick();
                    }}
                    className={`py-1.5 text-xs rounded-lg transition-colors capitalize ${
                      stain === s
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s === 'none' ? 'Clear' : s === 'methylene_blue' ? 'Blue' : 'Iodine'}
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Knob */}
            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  Focus Knob (Slide left or right until image is sharp)
                </span>
                <span className="font-mono text-slate-400">{Math.round(focus)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={focus}
                onChange={(e) => setFocus(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Zone: Primary 5 Diagnostic Detective Log (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Primary 5 Clue Checklist</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-1">What do you observe?</h2>
            </div>

            {/* Clue 1: Stiff Cell Wall */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block">
                1. Is there a stiff <strong className="text-emerald-700">Cell Wall</strong> on the outside?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setObsWall(true)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                    obsWall === true
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Yes (Stiff Wall)
                </button>
                <button
                  onClick={() => setObsWall(false)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                    obsWall === false
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  No (Only Membrane)
                </button>
              </div>
            </div>

            {/* Clue 2: Chloroplasts */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block">
                2. Are there green <strong className="text-green-700">Chloroplasts</strong> inside?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setObsChloroplast(true)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                    obsChloroplast === true
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Yes (Green Discs)
                </button>
                <button
                  onClick={() => setObsChloroplast(false)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                    obsChloroplast === false
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  No Chloroplasts
                </button>
              </div>
            </div>

            {/* Clue 3: Shape */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block">
                3. Overall shape of the cell:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setObsShape('box')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                    obsShape === 'box'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Regular / Box-like
                </button>
                <button
                  onClick={() => setObsShape('rounded')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                    obsShape === 'rounded'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Irregular / Rounded
                </button>
              </div>
            </div>
          </div>

          {/* Verdict Box */}
          {!showResult ? (
            <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-md">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                  Final Decision
                </span>
                <h3 className="text-lg font-bold font-['Fraunces',serif]">
                  What cell is under the microscope?
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleSubmitVerdict('plant')}
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-sm font-bold flex items-center justify-center gap-2 shadow"
                >
                  🌿 Plant Cell
                </button>

                <button
                  onClick={() => handleSubmitVerdict('animal')}
                  className="py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-sm font-bold flex items-center justify-center gap-2 shadow"
                >
                  🐾 Animal Cell
                </button>
              </div>
            </div>
          ) : (
            /* Result Card */
            <div
              className={`rounded-3xl p-6 border transition-all space-y-3 ${
                isVerdictCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isVerdictCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <h3 className="font-bold text-base">
                      {isVerdictCorrect ? 'Correct Diagnosis!' : 'Good try! Let’s review:'}
                    </h3>
                    <p className="text-xs opacity-80">
                      This is a <strong>{currentSlide.correctType.toUpperCase()} CELL</strong> ({currentSlide.commonName})
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {currentSlide.slideSummary}
              </p>

              {/* Primary 5 Exam Tip Banner */}
              <div className="p-3 bg-white/90 rounded-2xl border border-black/5 text-xs text-slate-800 space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Primary 5 Science Exam Tip:
                </span>
                <p className="text-[11px] leading-relaxed text-slate-700">{currentSlide.p5Tip}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-black/10">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setSubmittedVerdict(null);
                  }}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Try Again
                </button>

                <button
                  onClick={handleNextSlide}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>Next Slide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
