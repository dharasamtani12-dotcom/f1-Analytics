/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trophy, Swords, Zap, CheckCircle2 } from 'lucide-react';
import { F1_DRIVERS } from '../data/f1Data';
import { Driver } from '../types/f1';
import { calculateDriverHeadToHead } from '../utils/telemetryCalculator';

interface DriverHeadToHeadModalProps {
  initialDriver?: Driver | null;
  onClose: () => void;
}

export const DriverHeadToHeadModal: React.FC<DriverHeadToHeadModalProps> = ({
  initialDriver,
  onClose,
}) => {
  const [driverAId, setDriverAId] = useState<string>(initialDriver ? initialDriver.id : 'hamilton');
  const [driverBId, setDriverBId] = useState<string>('verstappen');

  const driverA = F1_DRIVERS.find((d) => d.id === driverAId) || F1_DRIVERS[0];
  const driverB = F1_DRIVERS.find((d) => d.id === driverBId) || F1_DRIVERS[1];

  const delta = calculateDriverHeadToHead(driverA, driverB);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-[#10141d] border border-[#ef233c]/50 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl relative animate-fade-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close Head-to-Head comparator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono-telemetry uppercase text-[#ef233c] tracking-widest font-bold mb-1">
            <Swords className="w-4 h-4" />
            TELEMETRY RIVALRY BENCHMARK
          </div>
          <h3 className="text-2xl md:text-4xl font-black font-chakra uppercase text-white">
            Driver Head-to-Head Comparison
          </h3>
          <p className="text-xs font-mono-telemetry text-zinc-400 mt-1">
            Comparative performance deltas across qualifying pace, race speed, and DNF rates
          </p>
        </div>

        {/* Driver Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Driver A Selector */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
            <label className="text-[10px] font-mono-telemetry text-zinc-400 block mb-2 uppercase">
              Select Primary Driver
            </label>
            <select
              value={driverAId}
              onChange={(e) => setDriverAId(e.target.value)}
              className="w-full bg-[#151921] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-chakra font-bold text-white focus:outline-none focus:border-[#ef233c]"
            >
              {F1_DRIVERS.map((d) => (
                <option key={d.id} value={d.id}>
                  #{d.number} {d.name} ({d.code}) - {d.team}
                </option>
              ))}
            </select>
          </div>

          {/* Driver B Selector */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
            <label className="text-[10px] font-mono-telemetry text-zinc-400 block mb-2 uppercase">
              Select Rival Driver
            </label>
            <select
              value={driverBId}
              onChange={(e) => setDriverBId(e.target.value)}
              className="w-full bg-[#151921] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-chakra font-bold text-white focus:outline-none focus:border-[#ef233c]"
            >
              {F1_DRIVERS.map((d) => (
                <option key={d.id} value={d.id}>
                  #{d.number} {d.name} ({d.code}) - {d.team}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Head-to-Head Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-8">
          {/* Driver A Profile */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-zinc-950 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: driverA.teamColor }} />
            <span className="text-3xl font-black font-mono-telemetry text-zinc-600 block mb-1">
              #{driverA.number}
            </span>
            <h4 className="text-xl font-bold font-chakra uppercase text-white mb-0.5">{driverA.name}</h4>
            <span className="text-xs font-mono-telemetry text-zinc-400 block mb-4">{driverA.team}</span>

            <div className="text-2xl font-black font-mono-telemetry text-[#ef233c]">
              {driverA.points.toLocaleString()} <span className="text-xs text-zinc-400">PTS</span>
            </div>
          </div>

          {/* VS Divider with Delta Summary */}
          <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#ef233c]/20 border border-[#ef233c] flex items-center justify-center font-chakra font-black text-sm text-[#ef233c] mb-2 shadow-[0_0_15px_rgba(239,35,60,0.5)]">
              VS
            </div>
            <span className="text-[10px] font-mono-telemetry text-zinc-500 uppercase">
              DELTA: {Math.abs(delta.pointsDelta).toLocaleString()} PTS
            </span>
          </div>

          {/* Driver B Profile */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-zinc-950 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: driverB.teamColor }} />
            <span className="text-3xl font-black font-mono-telemetry text-zinc-600 block mb-1">
              #{driverB.number}
            </span>
            <h4 className="text-xl font-bold font-chakra uppercase text-white mb-0.5">{driverB.name}</h4>
            <span className="text-xs font-mono-telemetry text-zinc-400 block mb-4">{driverB.team}</span>

            <div className="text-2xl font-black font-mono-telemetry text-white">
              {driverB.points.toLocaleString()} <span className="text-xs text-zinc-400">PTS</span>
            </div>
          </div>
        </div>

        {/* Detailed Metric Deltas Table */}
        <div className="space-y-3 font-mono-telemetry text-xs mb-8">
          {/* Race Wins */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5">
            <span className="font-bold text-base text-white w-16 text-left">{driverA.wins}</span>
            <span className="text-zinc-400 uppercase text-center font-chakra">GRAND PRIX WINS</span>
            <span className="font-bold text-base text-white w-16 text-right">{driverB.wins}</span>
          </div>

          {/* Podiums */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5">
            <span className="font-bold text-base text-white w-16 text-left">{driverA.podiums}</span>
            <span className="text-zinc-400 uppercase text-center font-chakra">PODIUM FINISHES</span>
            <span className="font-bold text-base text-white w-16 text-right">{driverB.podiums}</span>
          </div>

          {/* Pole Positions */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5">
            <span className="font-bold text-base text-white w-16 text-left">{driverA.poles}</span>
            <span className="text-zinc-400 uppercase text-center font-chakra">POLE POSITIONS</span>
            <span className="font-bold text-base text-white w-16 text-right">{driverB.poles}</span>
          </div>

          {/* Qualifying Avg */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5">
            <span className="font-bold text-base text-white w-16 text-left">P{driverA.qualifyingAvg}</span>
            <span className="text-zinc-400 uppercase text-center font-chakra">AVG QUALIFYING POSITION</span>
            <span className="font-bold text-base text-white w-16 text-right">P{driverB.qualifyingAvg}</span>
          </div>

          {/* Pace Delta */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5">
            <span className="font-bold text-base text-white w-16 text-left">{driverA.racePaceDelta}s</span>
            <span className="text-zinc-400 uppercase text-center font-chakra">RACE PACE DELTA / LAP</span>
            <span className="font-bold text-base text-white w-16 text-right">{driverB.racePaceDelta}s</span>
          </div>

          {/* Total DNFs */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5">
            <span className="font-bold text-base text-zinc-400 w-16 text-left">{driverA.dnfCount}</span>
            <span className="text-zinc-400 uppercase text-center font-chakra">CAREER DNFS (ATTRITION)</span>
            <span className="font-bold text-base text-zinc-400 w-16 text-right">{driverB.dnfCount}</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="text-xs font-mono-telemetry text-zinc-400">
            Faster race pace model: <span className="text-[#ef233c] font-bold">{delta.fasterDriver}</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#ef233c] text-white font-chakra uppercase font-bold text-xs hover:bg-red-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
