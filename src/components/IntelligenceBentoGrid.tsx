/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  Flame,
  Disc,
  Users,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  X,
  Gauge,
  CloudRain,
} from 'lucide-react';
import { TYRE_COMPOUNDS, F1_DRIVERS } from '../data/f1Data';
import { calculateTyreWear } from '../utils/telemetryCalculator';

interface IntelligenceBentoGridProps {
  onOpenHeadToHead: () => void;
  onOpenTelemetry: () => void;
}

export const IntelligenceBentoGrid: React.FC<IntelligenceBentoGridProps> = ({
  onOpenHeadToHead,
  onOpenTelemetry,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const [simulatedLaps, setSimulatedLaps] = useState<number>(15);
  const [selectedCompound, setSelectedCompound] = useState<'Soft' | 'Medium' | 'Hard' | 'Intermediate'>('Soft');

  const tyreWear = calculateTyreWear(selectedCompound, simulatedLaps);

  const dimensions = [
    {
      id: 'circuits',
      title: 'Circuit Analysis',
      subtitle: '— 24 CIRCUITS MAPPED',
      icon: <MapPin className="w-6 h-6" />,
      description:
        "Track-by-track performance data from Monaco's tight streets to Monza's high-speed temple — every circuit has its own data fingerprint.",
      badge: 'Spatial Telemetry',
    },
    {
      id: 'laptime',
      title: 'Lap Time Breakdown',
      subtitle: '— MILLISECOND PRECISION',
      icon: <Flame className="w-6 h-6" />,
      description:
        'Sector-by-sector time analysis for every driver across every session — qualifying, practice and race — at millisecond precision.',
      badge: 'Micro-Sectors',
    },
    {
      id: 'tire',
      title: 'Tire Strategy',
      subtitle: '— 5 COMPOUND TYPES',
      icon: <Disc className="w-6 h-6" />,
      description:
        'Soft, Medium, Hard, Inter, Wet — each compound tells a story. Analyze stint lengths, degradation rates, and optimal tire strategies.',
      badge: 'Thermal Models',
    },
    {
      id: 'headtohead',
      title: 'Driver Head-to-Head',
      subtitle: '— 20 DRIVERS COMPARED',
      icon: <Users className="w-6 h-6" />,
      description:
        'Compare teammates and rivals across qualifying deltas, race pace, podiums, DNFs, and championship points throughout a season.',
      badge: 'Rivalry Delta',
    },
    {
      id: 'progression',
      title: 'Points Progression',
      subtitle: '— SEASON-LONG VIEW',
      icon: <TrendingUp className="w-6 h-6" />,
      description:
        'Watch the championship unfold race-by-race with animated trajectories. Identify turning points that decided seasons in the final laps.',
      badge: '17 Seasons',
    },
    {
      id: 'weather',
      title: 'Weather & Safety Cars',
      subtitle: '— RACE IMPACT ANALYSIS',
      icon: <ShieldAlert className="w-6 h-6" />,
      description:
        'How weather conditions, Virtual Safety Cars, and full SC deployments affected race outcomes and championship battles across seasons.',
      badge: 'Strategy Shifts',
    },
  ];

  return (
    <section id="insights" className="py-28 md:py-36 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <div className="text-xs font-mono-telemetry uppercase text-[#ef233c] tracking-widest font-bold mb-2 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping" />
          WHAT WE ANALYZE
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-chakra uppercase tracking-tight text-white mb-4">
          Intelligence <span className="text-[#ef233c]">Dimensions</span>
        </h2>
        <p className="text-zinc-400 font-inter font-light text-base md:text-lg">
          Six analytical core dimensions powering our Formula 1 Race Intelligence platform
        </p>
      </div>

      {/* Bento Grid 2x3 Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dimensions.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              if (card.id === 'headtohead') {
                onOpenHeadToHead();
              } else if (card.id === 'laptime') {
                onOpenTelemetry();
              } else {
                setSelectedDimension(card.id);
              }
            }}
            className="p-8 rounded-2xl bg-[#0e1219] border border-white/10 hover:border-[#ef233c]/60 hover:bg-[#151921] transition-all duration-300 group relative overflow-hidden flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(239,35,60,0.15)]"
          >
            {/* Top Red Ambient Glow on Hover */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ef233c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-[#ef233c] group-hover:bg-[#ef233c] group-hover:text-white transition-all shadow-inner">
                  {card.icon}
                </div>
                <span className="text-[10px] font-mono-telemetry uppercase text-zinc-500 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5">
                  {card.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold font-chakra uppercase text-white mb-3 group-hover:text-[#ef233c] transition-colors">
                {card.title}
              </h3>

              <p className="text-sm text-zinc-400 font-inter leading-relaxed mb-6">
                {card.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="text-[11px] font-mono-telemetry text-[#ef233c] tracking-widest uppercase font-bold flex items-center gap-1">
                {card.subtitle}
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ef233c] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal for clicked Dimension */}
      {selectedDimension && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-[#12161f] border border-[#ef233c]/40 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative animate-fade-up">
            <button
              onClick={() => setSelectedDimension(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tire Strategy Modal */}
            {selectedDimension === 'tire' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#ef233c]/20 text-[#ef233c]">
                    <Disc className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-chakra uppercase text-white">
                      Tire Degradation Simulator
                    </h3>
                    <p className="text-xs font-mono-telemetry text-zinc-400">
                      Pirelli F1 Compound Thermal &amp; Wear Analysis
                    </p>
                  </div>
                </div>

                {/* Compound Selection */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {(['Soft', 'Medium', 'Hard', 'Intermediate'] as const).map((comp) => {
                    const match = TYRE_COMPOUNDS.find((t) => t.compound === comp);
                    const isSelected = selectedCompound === comp;
                    return (
                      <button
                        key={comp}
                        onClick={() => setSelectedCompound(comp)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-[#ef233c] bg-white/10 shadow-[0_0_15px_rgba(239,35,60,0.3)]'
                            : 'border-white/5 bg-zinc-900/60 hover:border-white/20'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full inline-block mb-1 border border-black/40"
                          style={{ backgroundColor: match?.color }}
                        />
                        <span className="block font-chakra font-bold text-xs uppercase text-white">
                          {comp}
                        </span>
                        <span className="text-[10px] font-mono-telemetry text-zinc-400">
                          {match?.stintSharePercent}%
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Stint Lap Slider */}
                <div className="bg-zinc-900/80 p-4 rounded-xl border border-white/5 mb-6">
                  <div className="flex justify-between text-xs font-mono-telemetry mb-2">
                    <span className="text-zinc-400">STINT DURATION</span>
                    <span className="text-[#ef233c] font-bold">{simulatedLaps} LAPS COMPLETED</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={simulatedLaps}
                    onChange={(e) => setSimulatedLaps(Number(e.target.value))}
                    className="w-full accent-[#ef233c] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono-telemetry text-zinc-500 mt-1">
                    <span>Lap 1 (Green Tire)</span>
                    <span>Lap 50 (Extreme Wear)</span>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-3 mb-6 text-center font-mono-telemetry">
                  <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                    <span className="text-[10px] text-zinc-500 block uppercase">Pace Delta</span>
                    <span className="text-xl font-bold text-white">+{tyreWear.timeLossSec}s</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                    <span className="text-[10px] text-zinc-500 block uppercase">Residual Grip</span>
                    <span
                      className={`text-xl font-bold ${
                        tyreWear.gripPercent > 60
                          ? 'text-emerald-400'
                          : tyreWear.gripPercent > 40
                          ? 'text-yellow-400'
                          : 'text-[#ef233c]'
                      }`}
                    >
                      {tyreWear.gripPercent}%
                    </span>
                  </div>
                  <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                    <span className="text-[10px] text-zinc-500 block uppercase">Strategy Window</span>
                    <span
                      className={`text-sm font-bold uppercase mt-1 block ${
                        tyreWear.recommendedPit ? 'text-[#ef233c]' : 'text-emerald-400'
                      }`}
                    >
                      {tyreWear.recommendedPit ? 'BOX THIS LAP' : 'STINT OPTIMAL'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Circuit Modal */}
            {selectedDimension === 'circuits' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#ef233c]/20 text-[#ef233c]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-chakra uppercase text-white">
                      Global Grand Prix Distribution
                    </h3>
                    <p className="text-xs font-mono-telemetry text-zinc-400">
                      29 circuits mapped across 17 seasons (6,464 records)
                    </p>
                  </div>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-2 font-mono-telemetry text-xs">
                  <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-white">Bahrain International Circuit</span>
                    <span className="text-[#ef233c] font-bold">2,168 records</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-white">Circuit of the Americas &amp; Miami &amp; Las Vegas</span>
                    <span className="text-[#ef233c] font-bold">400 records</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-white">Circuit de Monaco</span>
                    <span className="text-[#ef233c] font-bold">328 records</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-white">Circuit de Barcelona-Catalunya</span>
                    <span className="text-[#ef233c] font-bold">328 records</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-white">Interlagos (Autódromo José Carlos Pace)</span>
                    <span className="text-[#ef233c] font-bold">308 records</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-white">Autodromo Nazionale Monza &amp; Imola</span>
                    <span className="text-[#ef233c] font-bold">280 records</span>
                  </div>
                </div>
              </div>
            )}

            {/* Weather & Safety Cars Modal */}
            {selectedDimension === 'weather' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#ef233c]/20 text-[#ef233c]">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-chakra uppercase text-white">
                      Race Neutralization &amp; Weather Impact
                    </h3>
                    <p className="text-xs font-mono-telemetry text-zinc-400">
                      VSC, Full Safety Car, and Wet Compound Shifts
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 font-mono-telemetry">
                  <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/5">
                    <span className="text-xs text-zinc-400 block uppercase">Average SC Deployments</span>
                    <span className="text-2xl font-bold text-white">1.4 per Race</span>
                    <p className="text-[10px] text-zinc-500 mt-1">High variance tracks: Monaco (82%), Singapore (100%), Baku (75%)</p>
                  </div>
                  <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/5">
                    <span className="text-xs text-zinc-400 block uppercase">Pit Lane Delta Saving</span>
                    <span className="text-2xl font-bold text-[#ef233c]">-9.4s Under SC</span>
                    <p className="text-[10px] text-zinc-500 mt-1">Free pit stop threshold enabled during neutralization windows</p>
                  </div>
                </div>
              </div>
            )}

            {/* Points Progression Modal */}
            {selectedDimension === 'progression' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#ef233c]/20 text-[#ef233c]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-chakra uppercase text-white">
                      Championship Points Progression
                    </h3>
                    <p className="text-xs font-mono-telemetry text-zinc-400">
                      Historical 17-Season Battle (2010–2026)
                    </p>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 font-inter mb-4">
                  Cumulative scoring tracks the legendary eras: Red Bull domination (2010-2013, 2021-2024), Mercedes hybrid supremacy (2014-2020), and the Ferrari/McLaren renaissance.
                </p>
                <div className="p-4 bg-zinc-900 rounded-xl border border-white/5 space-y-2 font-mono-telemetry text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Lewis Hamilton (Career Peak)</span>
                    <span className="text-[#ef233c] font-bold">31,147 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Max Verstappen (Current Surge)</span>
                    <span className="text-[#3671c6] font-bold">31,126 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Charles Leclerc</span>
                    <span className="text-[#e8002d] font-bold">27,673 pts</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedDimension(null)}
                className="px-5 py-2 rounded-lg bg-zinc-800 text-white font-chakra text-xs uppercase font-bold hover:bg-zinc-700 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
