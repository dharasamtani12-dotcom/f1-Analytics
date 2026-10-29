/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Globe,
  UserCheck,
  Trophy,
  Timer,
  TrendingUp,
  Zap,
  Info,
} from 'lucide-react';
import { CIRCUITS_DATA } from '../data/f1Data';

interface ProjectOverviewProps {
  onExploreDashboard: () => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ onExploreDashboard }) => {
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const currentCircuit = CIRCUITS_DATA[selectedCircuitIndex];

  const features = [
    {
      icon: <Globe className="w-4 h-4 text-[#ef233c]" />,
      title: 'Global Race Overview',
      description: 'Circuit-by-circuit analysis across all 24 Grand Prix locations with performance comparisons',
    },
    {
      icon: <UserCheck className="w-4 h-4 text-[#ef233c]" />,
      title: 'Driver Performance Metrics',
      description: 'Lap times, qualifying pace, race pace, overtaking data and consistency analysis',
    },
    {
      icon: <Trophy className="w-4 h-4 text-[#ef233c]" />,
      title: 'Constructor Championship Battle',
      description: 'Team-by-team points progression, reliability data, and strategic decisions',
    },
    {
      icon: <Timer className="w-4 h-4 text-[#ef233c]" />,
      title: 'Pit Stop Strategy Analysis',
      description: 'Tire degradation models, undercut/overcut opportunities, and optimal strategy windows',
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-[#ef233c]" />,
      title: 'Championship Success Prediction',
      description: 'Historical patterns and statistical models to forecast championship outcomes',
    },
  ];

  const tags = [
    { label: 'DATA ANALYTICS', highlight: false },
    { label: 'TABLEAU', highlight: false },
    { label: 'RACE STRATEGY', highlight: true },
    { label: 'VISUALIZATION', highlight: false },
    { label: 'CHAMPIONSHIP', highlight: false },
    { label: 'F1 DATASET', highlight: false },
  ];

  return (
    <section id="project" className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Interactive Vector Circuit Canvas */}
        <div className="lg:col-span-6 relative p-6 md:p-8 rounded-3xl bg-[#09090b] border border-white/10 overflow-hidden shadow-2xl group">
          {/* Subtle Red Top Gradient */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ef233c] to-transparent" />
          
          {/* Circuit Header Bar with Circuit Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef233c] animate-pulse" />
              <span className="text-xs font-mono-telemetry uppercase text-zinc-300 font-bold tracking-wider">
                CIRCUIT VECTOR TRACE: {currentCircuit.name.toUpperCase()}
              </span>
            </div>

            {/* Circuit Select Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {CIRCUITS_DATA.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCircuitIndex(i);
                    setActiveSector(null);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono-telemetry uppercase tracking-wider transition-all ${
                    selectedCircuitIndex === i
                      ? 'bg-[#ef233c] text-white font-bold shadow-[0_0_10px_rgba(239,35,60,0.5)]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>

          {/* Circuit Quick Metadata */}
          <div className="grid grid-cols-3 gap-2 mb-4 bg-zinc-900/60 p-3 rounded-xl border border-white/5 text-center font-mono-telemetry text-xs">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase">Length</span>
              <span className="text-white font-bold">{currentCircuit.lengthKm} KM</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase">Lap Record</span>
              <span className="text-[#ef233c] font-bold">{currentCircuit.lapRecord.time}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase">Speed Trap</span>
              <span className="text-white font-bold">{currentCircuit.topSpeedTrap} KM/H</span>
            </div>
          </div>

          {/* Circuit SVG Overlay */}
          <div className="my-6 relative flex justify-center items-center py-4 bg-black/40 rounded-2xl border border-white/5">
            <svg
              className="w-full h-56 md:h-64 text-[#ef233c]"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circuit Grid Guidelines */}
              <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
              <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />

              {/* Background Track Line */}
              <path
                d={currentCircuit.svgPath}
                stroke="#27272a"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* High-contrast track center guide */}
              <path
                d={currentCircuit.svgPath}
                stroke="#18181b"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Active Telemetry Track Line with animation */}
              <path
                d={currentCircuit.svgPath}
                stroke="#ef233c"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="1000"
                className="animate-[track-car-travel_7s_linear_infinite]"
              />

              {/* Interactive Sector Nodes */}
              {currentCircuit.sectors.map((sector) => {
                const isSelected = activeSector === sector.id;
                return (
                  <g
                    key={sector.id}
                    onClick={() => setActiveSector(isSelected ? null : sector.id)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={sector.x}
                      cy={sector.y}
                      r={isSelected ? '10' : '6'}
                      fill={isSelected ? '#ffffff' : '#ef233c'}
                      stroke="#000"
                      strokeWidth="2"
                      className="transition-all hover:scale-125"
                    />
                    <circle
                      cx={sector.x}
                      cy={sector.y}
                      r="14"
                      fill="none"
                      stroke="#ef233c"
                      strokeWidth="1.5"
                      opacity={isSelected ? '1' : '0.4'}
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Sector Callout Overlay if selected */}
            {activeSector && (
              <div className="absolute bottom-3 left-4 right-4 bg-[#151921]/95 border border-[#ef233c]/60 p-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center justify-between font-mono-telemetry text-xs animate-fade-up">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#ef233c]" />
                  <span className="text-white font-semibold">
                    {currentCircuit.sectors.find((s) => s.id === activeSector)?.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 text-[10px] block">Benchmark</span>
                  <span className="text-[#ef233c] font-bold">
                    {currentCircuit.sectors.find((s) => s.id === activeSector)?.benchmarkTime}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sector Badges / Tag Cloud */}
          <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-white/5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full border text-[11px] font-mono-telemetry transition-all ${
                  tag.highlight
                    ? 'bg-[#ef233c]/10 border-[#ef233c]/50 text-[#ef233c] font-bold shadow-[0_0_12px_rgba(239,35,60,0.2)]'
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Narrative Specifications */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="text-xs font-mono-telemetry uppercase text-[#ef233c] tracking-widest font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ef233c]" />
            PROJECT OVERVIEW
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-chakra uppercase tracking-tight text-white mb-6 leading-tight">
            Transforming F1 Data Into Championship Intelligence
          </h2>

          <p className="text-zinc-300 font-inter leading-relaxed mb-4 text-sm md:text-base">
            This project leverages the rich historical and real-time data from Formula 1 to build a comprehensive analytics platform. Using Tableau&apos;s powerful visualization engine, we transform raw race telemetry into actionable insights for fans, analysts, and strategists.
          </p>

          <p className="text-zinc-400 font-inter leading-relaxed mb-8 text-sm">
            From pole position predictions to championship probability models, this dashboard covers every dimension of modern Formula 1 racing — all in an interactive, explorable format.
          </p>

          {/* Feature List with Red Icon Badges */}
          <div className="space-y-4 mb-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3.5 group">
                <div className="p-2 rounded-xl bg-red-600/10 border border-red-500/20 text-[#ef233c] shrink-0 mt-0.5 group-hover:bg-[#ef233c] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold font-chakra text-white uppercase tracking-wide group-hover:text-[#ef233c] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-inter leading-relaxed mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA Button */}
          <div>
            <button
              onClick={() => {
                onExploreDashboard();
                document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-xl bg-[#ef233c] hover:bg-red-600 text-white font-chakra font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(239,35,60,0.45)] hover:shadow-[0_0_35px_rgba(239,35,60,0.7)] inline-flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              EXPLORE DASHBOARD ENGINE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
