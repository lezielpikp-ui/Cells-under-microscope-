import { useState } from 'react';
import { ORGANELLES, PLANT_CELL_PINS, ANIMAL_CELL_PINS } from '../data/biologyData';
import { Organelle, CellPin } from '../types/biology';
import { sound } from '../utils/soundEffects';
import { Sparkles, RotateCcw, Check, Info } from 'lucide-react';

interface CellArchitectGameProps {
  onScoreAdd: (points: number) => void;
}

export function CellArchitectGame({ onScoreAdd }: CellArchitectGameProps) {
  const [selectedCellType, setSelectedCellType] = useState<'plant' | 'animal'>('plant');
  const [activeMode, setActiveMode] = useState<'explore' | 'quiz'>('explore');
  const [selectedOrganelle, setSelectedOrganelle] = useState<Organelle | null>(
    ORGANELLES.find((o) => o.id === 'cell_wall') || ORGANELLES[0]
  );

  // Labeling Quiz State
  const [pinAssignments, setPinAssignments] = useState<Record<string, string>>({});
  const [activeSelectedPin, setActiveSelectedPin] = useState<CellPin | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const pins = selectedCellType === 'plant' ? PLANT_CELL_PINS : ANIMAL_CELL_PINS;

  // Organelles available for this cell type
  const availableOrganelles = selectedCellType === 'plant'
    ? ORGANELLES
    : ORGANELLES.filter((o) => !o.plantOnly);

  function handleCellSwitch(type: 'plant' | 'animal') {
    setSelectedCellType(type);
    setPinAssignments({});
    setActiveSelectedPin(null);
    setIsQuizSubmitted(false);
    setQuizScore(null);

    const defaultOrg = type === 'plant'
      ? ORGANELLES.find((o) => o.id === 'cell_wall')
      : ORGANELLES.find((o) => o.id === 'cell_membrane');
    setSelectedOrganelle(defaultOrg || ORGANELLES[0]);
    sound.playFocusTick();
  }

  function handlePinClick(pin: CellPin) {
    if (activeMode === 'explore') {
      const org = ORGANELLES.find((o) => o.id === pin.organelleId);
      if (org) {
        setSelectedOrganelle(org);
        sound.playFocusTick();
      }
    } else {
      if (isQuizSubmitted) return;
      setActiveSelectedPin(pin);
      sound.playFocusTick();
    }
  }

  function handleAssignOrganelleToPin(organelleId: string) {
    if (!activeSelectedPin || isQuizSubmitted) return;
    setPinAssignments((prev) => ({
      ...prev,
      [activeSelectedPin.id]: organelleId
    }));
    sound.playFocusTick();
    setActiveSelectedPin(null);
  }

  function handleGradeQuiz() {
    let correct = 0;
    pins.forEach((p) => {
      if (pinAssignments[p.id] === p.organelleId) {
        correct++;
      }
    });

    setQuizScore(correct);
    setIsQuizSubmitted(true);

    const earned = correct * 25;
    if (correct === pins.length) {
      sound.playFanfare();
      onScoreAdd(earned + 50);
    } else if (correct > 0) {
      sound.playCorrect();
      onScoreAdd(earned);
    } else {
      sound.playMistake();
    }
  }

  function handleResetQuiz() {
    setPinAssignments({});
    setActiveSelectedPin(null);
    setIsQuizSubmitted(false);
    setQuizScore(null);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-wider mb-1">
            <span>Mission 03</span>
            <span>·</span>
            <span>Cell Diagram Labeling</span>
            <span>·</span>
            <span className="font-bold">Primary 5 Anatomy</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Fraunces',serif]">
            Cell Diagrams & Parts
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Explore the anatomy of a Plant Cell (7 parts) and an Animal Cell (5 parts). Click any pin or try the labeling quiz!
          </p>
        </div>

        {/* Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Cell Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => handleCellSwitch('plant')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedCellType === 'plant'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌿 Plant Cell (7 Parts)
            </button>
            <button
              onClick={() => handleCellSwitch('animal')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedCellType === 'animal'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🐾 Animal Cell (5 Parts)
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setActiveMode('explore');
                handleResetQuiz();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeMode === 'explore' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveMode('quiz')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeMode === 'quiz' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Labeling Test
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Zone Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: SVG Diagram Stage (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-3">
            <span className="font-bold text-slate-800">
              {selectedCellType === 'plant'
                ? '🌿 PLANT CELL (Regular Box-like Shape)'
                : '🐾 ANIMAL CELL (Flexible Rounded Shape)'}
            </span>
            <span>
              {activeMode === 'explore' ? 'Click numbered pins to inspect' : `Placed: ${Object.keys(pinAssignments).length}/${pins.length}`}
            </span>
          </div>

          {/* Vector SVG Cell Canvas */}
          <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
            <svg className="w-full h-full" viewBox="0 0 800 600">
              <defs>
                <linearGradient id="plantWallGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
                <linearGradient id="membraneGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="vacuoleGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="nucleusGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
              </defs>

              {selectedCellType === 'plant' ? renderP5PlantCell() : renderP5AnimalCell()}
            </svg>

            {/* Interactive Pins Overlay */}
            {pins.map((pin, pIdx) => {
              const org = ORGANELLES.find((o) => o.id === pin.organelleId);
              const assignedId = pinAssignments[pin.id];
              const assignedOrg = ORGANELLES.find((o) => o.id === assignedId);
              const isSelected = activeSelectedPin?.id === pin.id;
              const isCorrect = isQuizSubmitted && assignedId === pin.organelleId;
              const isWrong = isQuizSubmitted && assignedId !== pin.organelleId;

              return (
                <div
                  key={pin.id}
                  style={{
                    left: `${pin.xPercent}%`,
                    top: `${pin.yPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => handlePinClick(pin)}
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all shadow-md ${
                      isSelected
                        ? 'ring-4 ring-amber-400 bg-amber-500 text-slate-900 scale-125'
                        : isCorrect
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                        : isWrong
                        ? 'bg-rose-600 text-white ring-2 ring-rose-300'
                        : activeMode === 'explore'
                        ? 'bg-slate-900 text-white hover:scale-115 hover:bg-emerald-600'
                        : assignedId
                        ? 'bg-slate-800 text-white ring-2 ring-slate-400'
                        : 'bg-white text-slate-900 border-2 border-slate-800 hover:scale-110'
                    }`}
                  >
                    {pIdx + 1}
                  </button>

                  {/* Pin label tooltips */}
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-30 px-2.5 py-1 rounded-lg text-xs font-sans shadow-lg bg-slate-900 text-white transition-opacity opacity-0 group-hover:opacity-100">
                    {activeMode === 'explore' ? pin.label : assignedOrg ? assignedOrg.name : `Pin #${pIdx + 1}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quiz Action Bar */}
          {activeMode === 'quiz' && (
            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {isQuizSubmitted
                    ? `Score: ${quizScore} / ${pins.length} Correct!`
                    : activeSelectedPin
                    ? `Pin #${pins.findIndex((p) => p.id === activeSelectedPin.id) + 1} Selected: Click the matching part on the right!`
                    : 'Click a numbered pin on the cell diagram to label it'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isQuizSubmitted ? 'Check your green and red pins above.' : 'Match each pin with the correct Primary 5 cell part.'}
                </span>
              </div>

              <div>
                {!isQuizSubmitted ? (
                  <button
                    onClick={handleGradeQuiz}
                    disabled={Object.keys(pinAssignments).length === 0}
                    className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 disabled:opacity-40 transition-colors shadow"
                  >
                    Grade My Labels
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Zone: Exact Primary 5 Function Card or Word Bank (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {activeMode === 'explore' ? (
            selectedOrganelle ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider block mb-0.5">
                      {selectedOrganelle.plantOnly ? (
                        <span className="text-emerald-700">✅ Plants Only Part</span>
                      ) : (
                        <span className="text-indigo-700">⚖️ Found in Both Plants & Animals</span>
                      )}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 font-['Fraunces',serif]">
                      {selectedOrganelle.name}
                    </h2>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-sm"
                    style={{ backgroundColor: selectedOrganelle.color }}
                  >
                    {selectedOrganelle.name.charAt(0)}
                  </div>
                </div>

                {/* Primary 5 Official Definition Box */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Primary 5 Function:
                  </span>
                  <p className="text-sm font-semibold leading-relaxed">
                    {selectedOrganelle.p5Summary}
                  </p>
                </div>

                {/* Analogy */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Think of it like: </span>
                  <span className="italic">{selectedOrganelle.analogy}</span>
                </div>

                {/* Appearance */}
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-900 block">How to spot it:</span>
                  <p>{selectedOrganelle.shapeDescription}</p>
                </div>

                {selectedOrganelle.vacuoleNote && (
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900">
                    <strong>P5 Vacuole Difference:</strong> {selectedOrganelle.vacuoleNote}
                  </div>
                )}
              </div>
            ) : null
          ) : (
            /* Word Bank for Labeling */
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Cell Part Word Bank</h3>
                <p className="text-xs text-slate-500">
                  {activeSelectedPin
                    ? `Select the matching label for Pin #${pins.findIndex((p) => p.id === activeSelectedPin.id) + 1}:`
                    : 'Click a numbered pin on the diagram first, then choose its name below.'}
                </p>
              </div>

              <div className="space-y-2">
                {availableOrganelles.map((org) => {
                  const isAssigned = Object.values(pinAssignments).includes(org.id);
                  return (
                    <button
                      key={org.id}
                      onClick={() => handleAssignOrganelleToPin(org.id)}
                      disabled={!activeSelectedPin || isQuizSubmitted}
                      className={`w-full p-3 rounded-2xl text-left border text-xs transition-all flex items-center justify-between ${
                        activeSelectedPin
                          ? 'hover:border-slate-900 hover:bg-slate-50 active:scale-[0.99] border-slate-200 text-slate-800'
                          : 'opacity-60 border-slate-200 text-slate-500 cursor-not-allowed'
                      } ${isAssigned ? 'bg-slate-50' : 'bg-white'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: org.color }}
                        />
                        <span className="font-bold text-slate-900 text-xs">{org.name}</span>
                      </div>
                      {isAssigned && (
                        <span className="text-[10px] font-mono text-emerald-700 font-bold px-2 py-0.5 bg-emerald-50 rounded">
                          Placed ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function renderP5PlantCell() {
  return (
    <g>
      {/* 1. Stiff Cell Wall (Plants only) */}
      <polygon
        points="70,60 730,60 760,280 730,540 70,540 40,280"
        fill="url(#plantWallGrad)"
        stroke="#14532d"
        strokeWidth="14"
        strokeLinejoin="round"
      />
      {/* 2. Cell Membrane (Just inside the wall) */}
      <polygon
        points="95,85 705,85 732,280 705,515 95,515 68,280"
        fill="#f0fdf4"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 3. Cytoplasm Jelly Background */}
      <polygon
        points="105,95 695,95 720,280 695,505 105,505 80,280"
        fill="#dcfce7"
        opacity="0.6"
      />

      {/* 4. Large Central Vacuole (Dominates center) */}
      <path
        d="M 280 120 C 440 100, 640 130, 670 260 C 690 360, 620 470, 450 480 C 330 490, 260 460, 240 370 C 220 260, 210 130, 280 120 Z"
        fill="url(#vacuoleGrad)"
        stroke="#0284c7"
        strokeWidth="4"
      />
      <text x="450" y="290" textAnchor="middle" fill="#0369a1" fontSize="18" fontWeight="bold" opacity="0.6">
        Large Central Vacuole
      </text>

      {/* 5. Nucleus (Control Centre) */}
      <circle cx="210" cy="390" r="75" fill="url(#nucleusGrad)" stroke="#312e81" strokeWidth="4" />
      <circle cx="225" cy="380" r="24" fill="#1e1b4b" />
      <text x="210" y="440" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
        Nucleus
      </text>

      {/* 6. Chloroplasts (Green food-makers) */}
      {[
        { cx: 580, cy: 150 },
        { cx: 640, cy: 400 },
        { cx: 160, cy: 170 },
        { cx: 330, cy: 500 }
      ].map((cp, idx) => (
        <g key={idx}>
          <ellipse cx={cp.cx} cy={cp.cy} rx="46" ry="26" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
          <circle cx={cp.cx - 15} cy={cp.cy} r="6" fill="#16a34a" />
          <circle cx={cp.cx} cy={cp.cy} r="6" fill="#16a34a" />
          <circle cx={cp.cx + 15} cy={cp.cy} r="6" fill="#16a34a" />
        </g>
      ))}

      {/* 7. Mitochondria (Powerhouses) */}
      {[
        { cx: 650, cy: 290 },
        { cx: 200, cy: 260 }
      ].map((mito, idx) => (
        <g key={idx}>
          <ellipse cx={mito.cx} cy={mito.cy} rx="36" ry="18" fill="#ea580c" stroke="#9a3412" strokeWidth="2.5" />
          <path
            d={`M ${mito.cx - 24} ${mito.cy} Q ${mito.cx - 12} ${mito.cy - 7} ${mito.cx} ${mito.cy} T ${mito.cx + 24} ${mito.cy}`}
            stroke="#ffedd5"
            strokeWidth="3"
            fill="none"
          />
        </g>
      ))}
    </g>
  );
}

function renderP5AnimalCell() {
  return (
    <g>
      {/* 1. Flexible, rounded Cell Membrane (NO CELL WALL!) */}
      <path
        d="M 120 280 C 100 160, 200 80, 400 85 C 620 90, 710 160, 720 290 C 730 420, 620 520, 420 515 C 220 510, 140 400, 120 280 Z"
        fill="#f8fafc"
        stroke="url(#membraneGrad)"
        strokeWidth="8"
      />

      {/* 2. Cytoplasm jelly filling */}
      <path
        d="M 130 280 C 110 170, 205 95, 395 100 C 605 105, 695 170, 705 290 C 715 410, 610 505, 415 500 C 230 495, 150 395, 130 280 Z"
        fill="#e0f2fe"
        opacity="0.4"
      />

      {/* 3. Nucleus in the centre */}
      <circle cx="390" cy="290" r="95" fill="url(#nucleusGrad)" stroke="#312e81" strokeWidth="4" />
      <circle cx="410" cy="280" r="28" fill="#1e1b4b" />
      <text x="390" y="340" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">
        Nucleus
      </text>

      {/* 4. Small Vacuoles */}
      {[
        { cx: 550, cy: 390, r: 24 },
        { cx: 240, cy: 380, r: 20 },
        { cx: 280, cy: 200, r: 18 }
      ].map((vac, idx) => (
        <circle key={idx} cx={vac.cx} cy={vac.cy} r={vac.r} fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
      ))}

      {/* 5. Mitochondria (Powerhouse) */}
      {[
        { cx: 580, cy: 220 },
        { cx: 200, cy: 290 },
        { cx: 440, cy: 450 }
      ].map((mito, idx) => (
        <g key={idx}>
          <ellipse cx={mito.cx} cy={mito.cy} rx="36" ry="18" fill="#ea580c" stroke="#9a3412" strokeWidth="2.5" />
          <path
            d={`M ${mito.cx - 24} ${mito.cy} Q ${mito.cx - 12} ${mito.cy - 7} ${mito.cx} ${mito.cy} T ${mito.cx + 24} ${mito.cy}`}
            stroke="#ffedd5"
            strokeWidth="3"
            fill="none"
          />
        </g>
      ))}
    </g>
  );
}
