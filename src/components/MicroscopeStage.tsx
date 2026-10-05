import { useState, useId } from 'react';
import { SpecimenSlide } from '../types/biology';

interface MicroscopeStageProps {
  slide: SpecimenSlide;
  magnification: 40 | 100 | 400 | 1000;
  focus: number;
  light: number;
  stain: 'none' | 'methylene_blue' | 'iodine';
  showReticle: boolean;
  onOrganelleHover?: (organelleName: string | null) => void;
}

export function MicroscopeStage({
  slide,
  magnification,
  focus,
  light,
  stain,
  showReticle,
  onOrganelleHover
}: MicroscopeStageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const blurFilterId = useId();

  const focusDelta = Math.abs(focus - slide.optimalFocus);
  const blurAmount = Math.max(0, (focusDelta / 100) * 16 - 0.5);
  const isSharp = focusDelta <= 12;

  const lightFactor = light / 50;
  const stainFilterStyle = getStainFilter(stain);

  const scaleMap = {
    40: 0.85,
    100: 1.15,
    400: 1.6,
    1000: 2.2
  };
  const scale = scaleMap[magnification];

  function handleFeatureEnter(name: string) {
    if (!isSharp) return;
    setHoveredFeature(name);
    onOrganelleHover?.(name);
  }

  function handleFeatureLeave() {
    setHoveredFeature(null);
    onOrganelleHover?.(null);
  }

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto select-none rounded-full overflow-hidden bg-slate-950 p-2 border-4 border-slate-800 shadow-2xl">
      {/* Eyepiece metallic rim */}
      <div className="absolute inset-0 rounded-full border-[10px] border-slate-900 pointer-events-none z-30 shadow-[inset_0_0_24px_rgba(0,0,0,0.9)]" />

      {/* Optical field circle */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: getIlluminationBg(light, stain),
          filter: `brightness(${Math.max(0.2, lightFactor)}) contrast(${isSharp ? 1.08 : 0.9})`,
        }}
      >
        {/* Specimen SVG Stage Layer */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${scale})`,
            filter: `url(#${blurFilterId}) ${stainFilterStyle}`,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 500 500">
            <defs>
              <filter id={blurFilterId}>
                <feGaussianBlur stdDeviation={blurAmount} />
              </filter>
            </defs>

            {renderP5SpecimenGraphics(slide.visualSvgType, handleFeatureEnter, handleFeatureLeave)}
          </svg>
        </div>

        {/* Optical Glass Vignette */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle at 48% 48%, transparent 58%, rgba(2, 6, 23, 0.45) 82%, rgba(2, 6, 23, 0.95) 100%)',
          }}
        />

        {/* Reticle / Crosshair */}
        {showReticle && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center opacity-60">
            <div className="w-full h-[1px] bg-slate-900/70" />
            <div className="h-full w-[1px] bg-slate-900/70 absolute" />
            <div className="w-28 h-28 rounded-full border border-slate-900/50 absolute" />
            <div className="absolute bottom-8 right-12 flex flex-col items-end font-mono text-[10px] text-slate-800">
              <div className="h-[2px] w-14 bg-slate-900" />
              <span>Scale 50 µm</span>
            </div>
          </div>
        )}

        {/* Focus guidance when blurry */}
        {!isSharp && (
          <div className="absolute inset-0 pointer-events-none z-25 flex items-center justify-center bg-slate-950/20 backdrop-blur-[1px]">
            <div className="bg-slate-900/85 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-sans flex items-center gap-2 shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Turn the Focus Knob to see the cell clearly!
            </div>
          </div>
        )}

        {/* Hovered Feature Tooltip */}
        {isSharp && hoveredFeature && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-30 bg-slate-900/90 border border-emerald-500/50 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full shadow-lg">
            Looking at: <span className="font-semibold text-white">{hoveredFeature}</span>
          </div>
        )}
      </div>

      {/* Field status bottom tag */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700/60 shadow">
        <span>{magnification}x Zoom</span>
        <span>·</span>
        <span className={isSharp ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
          {isSharp ? '✓ SHARP' : 'BLURRY'}
        </span>
      </div>
    </div>
  );
}

function getIlluminationBg(light: number, stain: string): string {
  if (stain === 'methylene_blue') {
    return `rgba(${210 + light * 0.3}, ${225 + light * 0.2}, 255, 1)`;
  }
  if (stain === 'iodine') {
    return `rgba(${255}, ${240 + light * 0.1}, ${205 + light * 0.2}, 1)`;
  }
  return `rgba(${240 + light * 0.15}, ${245 + light * 0.1}, ${245 + light * 0.1}, 1)`;
}

function getStainFilter(stain: string): string {
  switch (stain) {
    case 'methylene_blue':
      return 'hue-rotate(180deg) saturate(1.4)';
    case 'iodine':
      return 'sepia(0.6) saturate(1.8) hue-rotate(-20deg)';
    default:
      return 'none';
  }
}

function renderP5SpecimenGraphics(
  type: SpecimenSlide['visualSvgType'],
  onEnter: (name: string) => void,
  onLeave: () => void
) {
  switch (type) {
    case 'plant_leaf':
    case 'plant_waterweed':
      // Green Leaf Cell with Cell Wall + Chloroplasts + Vacuole
      return (
        <g>
          {[40, 160, 280, 400].map((y, row) => (
            <g key={y}>
              {[20, 180, 340].map((x, col) => {
                const cellX = x + (row % 2) * 35;
                return (
                  <g
                    key={`${col}-${row}`}
                    className="cursor-pointer"
                    onMouseEnter={() => onEnter('Cell Wall (Gives shape, support & protection)')}
                    onMouseLeave={onLeave}
                  >
                    {/* Stiff Cell Wall (Plants only) */}
                    <rect
                      x={cellX}
                      y={y}
                      width="155"
                      height="105"
                      fill="#f0fdf4"
                      stroke="#16a34a"
                      strokeWidth="5"
                      rx="4"
                    />
                    {/* Cell Membrane inside the cell wall */}
                    <rect
                      x={cellX + 4}
                      y={y + 4}
                      width="147"
                      height="97"
                      fill="#ecfdf5"
                      stroke="#4ade80"
                      strokeWidth="1.5"
                    />

                    {/* Large Central Vacuole */}
                    <rect
                      x={cellX + 22}
                      y={y + 18}
                      width="110"
                      height="70"
                      fill="#bae6fd"
                      opacity="0.5"
                      rx="6"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        onEnter('Large Vacuole (Stores water and food)');
                      }}
                    />

                    {/* Mitochondria */}
                    <ellipse
                      cx={cellX + 30}
                      cy={y + 80}
                      rx="10"
                      ry="5"
                      fill="#ea580c"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        onEnter('Mitochondria (Powerhouse - produces energy)');
                      }}
                    />

                    {/* Chloroplasts (Plants only) */}
                    {[
                      { dx: 18, dy: 20 },
                      { dx: 45, dy: 14 },
                      { dx: 75, dy: 16 },
                      { dx: 110, dy: 20 },
                      { dx: 130, dy: 50 },
                      { dx: 125, dy: 80 },
                      { dx: 95, dy: 86 },
                      { dx: 60, dy: 84 },
                      { dx: 25, dy: 55 }
                    ].map((pos, cIdx) => (
                      <circle
                        key={cIdx}
                        cx={cellX + pos.dx}
                        cy={y + pos.dy}
                        r="8"
                        fill="#22c55e"
                        stroke="#15803d"
                        strokeWidth="1.5"
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          onEnter('Chloroplasts (Makes food using sunlight)');
                        }}
                      />
                    ))}

                    {/* Nucleus */}
                    <circle
                      cx={cellX + 115}
                      cy={y + 35}
                      r="10"
                      fill="#4f46e5"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        onEnter('Nucleus (Control centre - directs all activities)');
                      }}
                    />
                  </g>
                );
              })}
            </g>
          ))}
        </g>
      );

    case 'animal_cheek':
    case 'animal_skin':
      // Animal Cheek / Skin Cells (Flexible Cell Membrane, Nucleus, Cytoplasm, Small Vacuoles)
      return (
        <g>
          {[
            { cx: 160, cy: 160, r: 85, nX: 160, nY: 160 },
            { cx: 330, cy: 180, r: 90, nX: 335, nY: 175 },
            { cx: 230, cy: 320, r: 88, nX: 235, nY: 315 },
            { cx: 90, cy: 330, r: 75, nX: 95, nY: 328 },
            { cx: 380, cy: 340, r: 75, nX: 375, nY: 335 }
          ].map((cell, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => onEnter('Cell Membrane (Controls what enters & leaves; flexible outer layer)')}
              onMouseLeave={onLeave}
            >
              {/* Flexible, rounded Cell Membrane (NO CELL WALL!) */}
              <path
                d={`M ${cell.cx - cell.r} ${cell.cy} 
                    Q ${cell.cx - cell.r * 0.7} ${cell.cy - cell.r * 0.9} ${cell.cx} ${cell.cy - cell.r * 0.85}
                    Q ${cell.cx + cell.r * 0.85} ${cell.cy - cell.r * 0.7} ${cell.cx + cell.r} ${cell.cy}
                    Q ${cell.cx + cell.r * 0.9} ${cell.cy + cell.r * 0.8} ${cell.cx + cell.r * 0.2} ${cell.cy + cell.r}
                    Q ${cell.cx - cell.r * 0.8} ${cell.cy + cell.r * 0.85} ${cell.cx - cell.r} ${cell.cy} Z`}
                fill="#dbeafe"
                fillOpacity="0.5"
                stroke="#0284c7"
                strokeWidth="3"
              />

              {/* Cytoplasm jelly */}
              <circle cx={cell.cx - 25} cy={cell.cy + 20} r="3" fill="#94a3b8" opacity="0.6" />
              <circle cx={cell.cx + 30} cy={cell.cy - 20} r="2.5" fill="#94a3b8" opacity="0.6" />

              {/* Mitochondria */}
              <ellipse
                cx={cell.cx + 25}
                cy={cell.cy + 30}
                rx="8"
                ry="4.5"
                fill="#ea580c"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  onEnter('Mitochondria (Powerhouse - produces energy)');
                }}
              />

              {/* Small animal vacuole */}
              <circle
                cx={cell.cx - 35}
                cy={cell.cy - 25}
                r="6"
                fill="#bae6fd"
                stroke="#0284c7"
                strokeWidth="1"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  onEnter('Small Vacuole (Stores water and waste)');
                }}
              />

              {/* Dark Nucleus right in the centre */}
              <circle
                cx={cell.nX}
                cy={cell.nY}
                r="14"
                fill="#1e3a8a"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  onEnter('Nucleus (Control centre - directs cell activities; holds DNA)');
                }}
              />
            </g>
          ))}
        </g>
      );

    case 'plant_onion':
      // Onion Skin Cell (Stiff Cell Wall, Large Vacuole, Nucleus at edge, NO CHLOROPLASTS)
      return (
        <g>
          {[0, 100, 200, 300, 400].map((y, rowIdx) => (
            <g key={y}>
              {[-50, 120, 290, 460].map((x) => {
                const offsetX = (rowIdx % 2) * 80;
                const cellX = x + offsetX;
                return (
                  <g
                    key={`${x}-${y}`}
                    className="cursor-pointer"
                    onMouseEnter={() => onEnter('Cell Wall (Stiff box shape, support & protection)')}
                    onMouseLeave={onLeave}
                  >
                    {/* Stiff Cell Wall */}
                    <rect
                      x={cellX}
                      y={y}
                      width="160"
                      height="95"
                      fill="#f8fafc"
                      stroke="#475569"
                      strokeWidth="5"
                      rx="3"
                    />
                    {/* Cell Membrane */}
                    <rect
                      x={cellX + 4}
                      y={y + 4}
                      width="152"
                      height="87"
                      fill="#f1f5f9"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />
                    {/* Giant Central Vacuole */}
                    <rect
                      x={cellX + 12}
                      y={y + 12}
                      width="136"
                      height="71"
                      fill="#e0f2fe"
                      opacity="0.65"
                      rx="4"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        onEnter('Large Central Vacuole (Stores water & waste)');
                      }}
                    />
                    {/* Nucleus pushed to the side */}
                    <circle
                      cx={cellX + 30}
                      cy={y + 26}
                      r="9"
                      fill="#9a3412"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        onEnter('Nucleus (Pushed to the side by the large vacuole)');
                      }}
                    />
                  </g>
                );
              })}
            </g>
          ))}
        </g>
      );

    case 'animal_muscle':
      // Animal Muscle Cell
      return (
        <g>
          {[60, 160, 260, 360].map((y) => (
            <g
              key={y}
              className="cursor-pointer"
              onMouseEnter={() => onEnter('Cell Membrane (Flexible boundary of muscle cell)')}
              onMouseLeave={onLeave}
            >
              <rect
                x="0"
                y={y}
                width="500"
                height="80"
                fill="#fecdd3"
                stroke="#e11d48"
                strokeWidth="2.5"
              />
              {/* Mitochondria everywhere for energy */}
              {[40, 110, 180, 250, 320, 390, 460].map((mx, mIdx) => (
                <ellipse
                  key={mIdx}
                  cx={mx}
                  cy={y + 25 + (mIdx % 2) * 30}
                  rx="9"
                  ry="5"
                  fill="#ea580c"
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    onEnter('Mitochondria (Powerhouse - makes energy for muscles)');
                  }}
                />
              ))}
              {/* Nucleus */}
              <circle
                cx={150}
                cy={y + 40}
                r="12"
                fill="#881337"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  onEnter('Nucleus (Control centre)');
                }}
              />
              <circle
                cx={350}
                cy={y + 40}
                r="12"
                fill="#881337"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  onEnter('Nucleus (Control centre)');
                }}
              />
            </g>
          ))}
        </g>
      );

    default:
      return null;
  }
}
