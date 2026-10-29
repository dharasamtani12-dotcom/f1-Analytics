/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Trophy, Medal, Flag, Users, ArrowUpRight } from 'lucide-react';
import { F1_DRIVERS } from '../data/f1Data';
import { Driver } from '../types/f1';

interface DriverGalleryProps {
  onSelectDriverForComparison: (driver: Driver) => void;
}

export const DriverGallery: React.FC<DriverGalleryProps> = ({ onSelectDriverForComparison }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('ALL');

  const teams = ['ALL', 'Ferrari', 'Red Bull', 'McLaren', 'Mercedes', 'Aston Martin', 'Williams', 'RB', 'Haas'];

  const filteredDrivers = F1_DRIVERS.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam =
      selectedTeamFilter === 'ALL' || driver.team.toLowerCase().includes(selectedTeamFilter.toLowerCase());
    return matchesSearch && matchesTeam;
  });

  return (
    <section id="drivers" className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      {/* Anchor for gallery */}
      <div id="gallery" className="scroll-mt-24" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono-telemetry uppercase text-[#ef233c] tracking-widest font-bold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping" />
            2026 WORLD DRIVERS ROSTER
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-chakra uppercase tracking-tight text-white mb-2">
            Grid Intelligence &amp; <span className="text-[#ef233c]">Driver Profiles</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-inter">
            Detailed career points, qualifying deltas, and telemetry telemetry benchmarks across 17 seasons.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search driver, number, team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#151921] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-mono-telemetry text-white placeholder-zinc-500 focus:outline-none focus:border-[#ef233c] transition-all"
          />
        </div>
      </div>

      {/* Team Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {teams.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTeamFilter(t)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-chakra uppercase font-bold tracking-wider transition-all whitespace-nowrap ${
              selectedTeamFilter === t
                ? 'bg-[#ef233c] text-white shadow-[0_0_12px_rgba(239,35,60,0.4)]'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="p-6 rounded-2xl bg-[#0e1219] border border-white/10 hover:border-[#ef233c]/60 hover:bg-[#151921] transition-all group flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            {/* Top team color accent strip */}
            <div
              className="absolute top-0 inset-x-0 h-1.5 transition-all group-hover:h-2"
              style={{ backgroundColor: driver.teamColor }}
            />

            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-2xl font-black font-mono-telemetry text-zinc-700 group-hover:text-[#ef233c] transition-colors">
                    #{driver.number}
                  </span>
                  <div className="text-xs font-mono-telemetry text-zinc-400 uppercase tracking-widest mt-0.5">
                    {driver.code} • {driver.country}
                  </div>
                </div>
                {driver.championshipTitles > 0 && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-mono-telemetry font-bold">
                    <Trophy className="w-3 h-3" />
                    <span>{driver.championshipTitles}x WDC</span>
                  </div>
                )}
              </div>

              {/* Driver Name & Team */}
              <h3 className="text-xl font-black font-chakra uppercase text-white mb-1 group-hover:text-[#ef233c] transition-colors">
                {driver.name}
              </h3>
              <p className="text-xs font-inter text-zinc-400 line-clamp-1 mb-6">
                {driver.team}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 bg-black/40 p-3 rounded-xl border border-white/5 font-mono-telemetry text-center mb-6">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">PTS</span>
                  <span className="text-sm font-bold text-white">{driver.points.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">WINS</span>
                  <span className="text-sm font-bold text-[#ef233c]">{driver.wins}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">PODIUMS</span>
                  <span className="text-sm font-bold text-white">{driver.podiums}</span>
                </div>
              </div>

              {/* Technical Telemetry Row */}
              <div className="space-y-1.5 text-[11px] font-mono-telemetry text-zinc-400 mb-4 pb-4 border-b border-white/5">
                <div className="flex justify-between">
                  <span>Qualifying Avg:</span>
                  <span className="text-white font-bold">P{driver.qualifyingAvg}</span>
                </div>
                <div className="flex justify-between">
                  <span>Race Pace Delta:</span>
                  <span className={driver.racePaceDelta < 0 ? 'text-emerald-400 font-bold' : 'text-zinc-300'}>
                    {driver.racePaceDelta > 0 ? `+${driver.racePaceDelta}` : driver.racePaceDelta}s / lap
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total DNFs:</span>
                  <span className="text-zinc-400">{driver.dnfCount}</span>
                </div>
              </div>
            </div>

            {/* Compare Action Button */}
            <button
              onClick={() => onSelectDriverForComparison(driver)}
              className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#ef233c] text-zinc-300 hover:text-white border border-white/10 hover:border-[#ef233c] text-xs font-chakra uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Users className="w-3.5 h-3.5" />
              Compare Teammate Delta
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
