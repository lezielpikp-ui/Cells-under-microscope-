import { useState } from 'react';
import { ORGANELLES } from '../data/biologyData';
import { OrganelleCategory } from '../types/biology';
import { Search, Layers, Check, Sparkles } from 'lucide-react';

const PLANT_CELL_IMG = '/src/assets/images/microscope_plant_cell_1791188594481.jpg';
const ANIMAL_CELL_IMG = '/src/assets/images/microscope_animal_cell_1791188605985.jpg';

export function FieldGuide() {
  const [filterCategory, setFilterCategory] = useState<OrganelleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrganelles = ORGANELLES.filter((o) => {
    const matchesCategory = filterCategory === 'all' || o.category === filterCategory;
    const matchesSearch =
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.p5Summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.analogy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-wider mb-1">
          <span>Primary 5 Revision Guide</span>
          <span>·</span>
          <span>Cell System Syllabus</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Fraunces',serif]">
          The 7 Cell Parts Study Guide
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Everything Primary 5 students need to know about cell parts, functions, and the differences between plant and animal cells.
        </p>
      </div>

      {/* Side-by-Side Visual Specimen Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Plant Cell Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
            <img
              src={PLANT_CELL_IMG}
              alt="Plant cell with chloroplasts and cell wall"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-xs font-mono text-emerald-400 block">7 Parts in Total</span>
              <h2 className="text-xl font-bold font-['Fraunces',serif]">🌿 Plant Cell</h2>
            </div>
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Plant cells have a <strong>stiff Cell Wall</strong> outside the cell membrane giving them a fixed, box-like shape, and <strong>Chloroplasts</strong> to make food using sunlight.
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-slate-900 block text-xs">The 7 Plant Cell Parts:</span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
                    1. Cell Wall (Plants only)
                  </span>
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
                    2. Chloroplasts (Plants only)
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    3. Large Vacuole
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    4. Cell Membrane
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    5. Nucleus
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    6. Cytoplasm
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200 col-span-2">
                    7. Mitochondria
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Shape: Regular / Boxy</span>
              <span className="text-emerald-700 font-bold">Has Cell Wall & Chloroplasts</span>
            </div>
          </div>
        </div>

        {/* Animal Cell Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
            <img
              src={ANIMAL_CELL_IMG}
              alt="Animal cell with dark nucleus and flexible membrane"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-xs font-mono text-sky-400 block">5 Parts in Total</span>
              <h2 className="text-xl font-bold font-['Fraunces',serif]">🐾 Animal Cell</h2>
            </div>
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Animal cells do <strong>NOT</strong> have a cell wall or chloroplasts! They only have a flexible <strong>Cell Membrane</strong>, so their shape is irregular and rounded.
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-slate-900 block text-xs">The 5 Animal Cell Parts:</span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    1. Cell Membrane
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    2. Nucleus
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    3. Cytoplasm
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200">
                    4. Mitochondria
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200 col-span-2">
                    5. Small Vacuoles (small and temporary)
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Shape: Irregular / Flexible</span>
              <span className="text-rose-600 font-bold">NO Cell Wall · NO Chloroplasts</span>
            </div>
          </div>
        </div>
      </div>

      {/* P5 Quick Summary Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl font-bold text-slate-900 font-['Fraunces',serif]">
            Primary 5 Cell Part Master Table
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3 px-4">Cell Part</th>
                <th className="py-3 px-4">Function (What does it do?)</th>
                <th className="py-3 px-4 text-emerald-800">🌿 Plant Cell</th>
                <th className="py-3 px-4 text-blue-800">🐾 Animal Cell</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="bg-emerald-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">Cell Wall</td>
                <td className="py-3 px-4 font-semibold text-emerald-950">
                  Gives support, shape, and protection
                </td>
                <td className="py-3 px-4 text-emerald-700 font-bold">✅ YES</td>
                <td className="py-3 px-4 text-rose-600 font-bold">❌ NO</td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">Chloroplasts</td>
                <td className="py-3 px-4 font-semibold text-emerald-950">
                  Makes food using sunlight (photosynthesis)
                </td>
                <td className="py-3 px-4 text-emerald-700 font-bold">✅ YES (green parts)</td>
                <td className="py-3 px-4 text-rose-600 font-bold">❌ NO</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Cell Membrane</td>
                <td className="py-3 px-4">
                  Controls what enters and leaves the cell; protects it
                </td>
                <td className="py-3 px-4 text-emerald-700 font-bold">✅ YES</td>
                <td className="py-3 px-4 text-blue-700 font-bold">✅ YES</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Nucleus</td>
                <td className="py-3 px-4">
                  Control centre; directs all cell activities; holds DNA
                </td>
                <td className="py-3 px-4 text-emerald-700 font-bold">✅ YES</td>
                <td className="py-3 px-4 text-blue-700 font-bold">✅ YES</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Cytoplasm</td>
                <td className="py-3 px-4">
                  Jelly-like substance; holds all organelles in place
                </td>
                <td className="py-3 px-4 text-emerald-700 font-bold">✅ YES</td>
                <td className="py-3 px-4 text-blue-700 font-bold">✅ YES</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Mitochondria</td>
                <td className="py-3 px-4">
                  Produces energy for the cell — the "powerhouse"
                </td>
                <td className="py-3 px-4 text-emerald-700 font-bold">✅ YES</td>
                <td className="py-3 px-4 text-blue-700 font-bold">✅ YES</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Vacuole</td>
                <td className="py-3 px-4">
                  Stores water, food, and waste (larger in plant cells)
                </td>
                <td className="py-3 px-4 text-emerald-700 font-bold">✅ One LARGE vacuole</td>
                <td className="py-3 px-4 text-blue-700 font-bold">✅ Small vacuoles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards Catalog */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Fraunces',serif]">
              Cell Part Flashcards
            </h2>
            <p className="text-xs text-slate-500">
              Click to revise each of the 7 cell parts.
            </p>
          </div>

          {/* Filter & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterCategory === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All 7 Parts
              </button>
              <button
                onClick={() => setFilterCategory('plant-only')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterCategory === 'plant-only' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Plants Only (2)
              </button>
              <button
                onClick={() => setFilterCategory('both')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterCategory === 'both' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Both Cells (5)
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cell part..."
                className="text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        {/* 7 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrganelles.map((org) => (
            <div
              key={org.id}
              className={`rounded-3xl p-5 border transition-all flex flex-col justify-between space-y-3 ${
                org.plantOnly
                  ? 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: org.color }}
                    />
                    <h3 className="font-bold text-slate-900 text-sm">{org.name}</h3>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${
                      org.plantOnly ? 'bg-emerald-200/80 text-emerald-900' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {org.plantOnly ? 'Plants Only' : 'Both Cells'}
                  </span>
                </div>

                {/* Primary 5 Function in Bold */}
                <div className="p-3 bg-white/90 rounded-2xl border border-black/5 text-xs text-slate-800 mb-2.5 font-medium leading-relaxed">
                  <span className="font-bold text-emerald-800 block text-[11px] uppercase mb-0.5">Function:</span>
                  {org.p5Summary}
                </div>

                <p className="text-xs text-slate-500 italic">
                  Analogy: {org.analogy}
                </p>
              </div>

              {org.vacuoleNote && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-sky-800 font-medium">
                  {org.vacuoleNote}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
