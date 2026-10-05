import { useState, useEffect } from 'react';
import { MicroscopeGame } from './components/MicroscopeGame';
import { OrganelleSorterGame } from './components/OrganelleSorterGame';
import { CellArchitectGame } from './components/CellArchitectGame';
import { CytologyQuizGame } from './components/CytologyQuizGame';
import { FieldGuide } from './components/FieldGuide';
import { sound } from './utils/soundEffects';
import { Volume2, VolumeX } from 'lucide-react';

type ActiveTab = 'microscope' | 'sorter' | 'architect' | 'quiz' | 'guide';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('microscope');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalScore, setTotalScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cytoquest_p5_score');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('cytoquest_p5_score', totalScore.toString());
  }, [totalScore]);

  function handleScoreAdd(points: number) {
    setTotalScore((prev) => prev + points);
  }

  function handleToggleSound() {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
  }

  function getP5Rank(score: number): string {
    if (score >= 1500) return '⭐ Cell Master';
    if (score >= 900) return '🔬 Senior Explorer';
    if (score >= 400) return '🌱 Junior Detective';
    return '🎒 P5 Science Starter';
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 
        TOP BAR CONTRACT:
        Zone 1: Single text element brand wordmark
        Zone 2: 4-6 clean text navigation links
        Zone 3: 1-2 primary actions (Audio toggle & Score / P5 rank)
      */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element brand wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('microscope');
            }}
            className="text-xl font-bold tracking-tight text-slate-900 font-['Fraunces',serif] shrink-0"
          >
            CytoQuest P5
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('microscope')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                activeTab === 'microscope' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
              }`}
            >
              Microscope Lab
            </button>
            <button
              onClick={() => setActiveTab('sorter')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                activeTab === 'sorter' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
              }`}
            >
              Part Sorter
            </button>
            <button
              onClick={() => setActiveTab('architect')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                activeTab === 'architect' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
              }`}
            >
              Cell Diagrams
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                activeTab === 'quiz' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
              }`}
            >
              Quiz Arena
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                activeTab === 'guide' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
              }`}
            >
              P5 Study Guide
            </button>
          </nav>

          {/* Zone 3: Primary Action & Score Stats */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-500 flex items-center gap-1.5 justify-end">
                <span>{getP5Rank(totalScore)}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-bold text-emerald-700 tabular-nums">{totalScore} PTS</span>
              </div>
            </div>

            <button
              onClick={handleToggleSound}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-100 px-2 py-2 text-xs font-medium text-slate-600 bg-white">
          <button
            onClick={() => setActiveTab('microscope')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap ${activeTab === 'microscope' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            Microscope
          </button>
          <button
            onClick={() => setActiveTab('sorter')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap ${activeTab === 'sorter' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            Sorter
          </button>
          <button
            onClick={() => setActiveTab('architect')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap ${activeTab === 'architect' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            Diagrams
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap ${activeTab === 'quiz' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap ${activeTab === 'guide' ? 'text-emerald-700 font-bold bg-emerald-50' : ''}`}
          >
            Study Guide
          </button>
        </div>
      </header>

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeTab === 'microscope' && (
          <MicroscopeGame onScoreAdd={handleScoreAdd} totalScore={totalScore} />
        )}
        {activeTab === 'sorter' && (
          <OrganelleSorterGame onScoreAdd={handleScoreAdd} />
        )}
        {activeTab === 'architect' && (
          <CellArchitectGame onScoreAdd={handleScoreAdd} />
        )}
        {activeTab === 'quiz' && (
          <CytologyQuizGame onScoreAdd={handleScoreAdd} />
        )}
        {activeTab === 'guide' && (
          <FieldGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 font-['Fraunces',serif]">CytoQuest P5</span>
            <span aria-hidden="true">·</span>
            <span>Primary 5 Science: Animal & Plant Cell System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-slate-800 transition-colors"
            >
              The 7 Parts
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setTotalScore(0);
                localStorage.removeItem('cytoquest_p5_score');
              }}
              className="text-slate-400 hover:text-rose-600 transition-colors"
            >
              Reset Points
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
