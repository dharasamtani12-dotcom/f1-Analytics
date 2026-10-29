/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Gauge, Radio, Wind, Play, Pause, RefreshCw } from 'lucide-react';
import { calculateGearAndRpm } from '../utils/telemetryCalculator';

export const CockpitTelemetryMonitor: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<'VER' | 'HAM' | 'LEC' | 'NOR'>('VER');
  const [isSimulating, setIsSimulating] = useState(true);
  const [speed, setSpeed] = useState(334);
  const [throttle, setThrottle] = useState(100);
  const [brake, setBrake] = useState(0);
  const [drsActive, setDrsActive] = useState(true);

  // Derive gear and RPM from speed
  const { gear, rpm } = calculateGearAndRpm(speed);

  // Simulated live telemetry loop (10Hz ~ 100ms)
  useEffect(() => {
    if (!isSimulating) return;

    let phase = 0;
    const interval = setInterval(() => {
      phase += 0.08;
      // Oscillate speed realistically between 290 and 345 km/h with DRS, or braking down to 120
      const cycle = Math.sin(phase);

      if (cycle > 0.3) {
        // High speed straight
        const targetSpeed = Math.round(320 + cycle * 22);
        setSpeed((prev) => Math.round(prev + (targetSpeed - prev) * 0.3));
        setThrottle(100);
        setBrake(0);
      } else if (cycle < -0.6) {
        // Heavy braking zone
        const targetSpeed = Math.round(110 - cycle * 30);
        setSpeed((prev) => Math.round(prev + (targetSpeed - prev) * 0.4));
        setThrottle(0);
        setBrake(Math.min(100, Math.round(Math.abs(cycle) * 110)));
      } else {
        // Cornering / acceleration
        const targetSpeed = Math.round(180 + Math.abs(cycle) * 110);
        setSpeed((prev) => Math.round(prev + (targetSpeed - prev) * 0.25));
        setThrottle(Math.round(40 + Math.abs(cycle) * 55));
        setBrake(0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const speedPercent = Math.min(100, Math.round((speed / 375) * 100));
  const rpmPercent = Math.min(100, Math.round((rpm / 12500) * 100));

  // Shift LEDs (Green -> Yellow -> Red -> Blue)
  const shiftLeds = Array.from({ length: 15 }, (_, i) => {
    const threshold = (i + 1) * (12500 / 15);
    const isActive = rpm >= threshold;
    let colorClass = 'bg-emerald-500';
    if (i >= 5 && i < 10) colorClass = 'bg-yellow-400';
    if (i >= 10 && i < 13) colorClass = 'bg-red-500';
    if (i >= 13) colorClass = 'bg-blue-400 animate-pulse';
    return { isActive, colorClass };
  });

  return (
    <section id="telemetry" className="py-20 md:py-28 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      <div className="p-6 md:p-10 rounded-3xl bg-[#09090b] border border-[#262c38] shadow-2xl relative overflow-hidden">
        {/* Subtle background red glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef233c]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="text-xs font-mono-telemetry uppercase text-[#ef233c] tracking-widest font-bold flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping" />
              REAL-TIME FEED
            </div>
            <h3 className="text-2xl md:text-3xl font-black font-chakra uppercase text-white tracking-wide">
              Cockpit Telemetry Monitor
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Driver Selector */}
            <div className="flex bg-zinc-900 border border-white/10 rounded-xl p-1 text-xs font-mono-telemetry">
              {(['VER', 'HAM', 'LEC', 'NOR'] as const).map((drv) => (
                <button
                  key={drv}
                  onClick={() => setSelectedDriver(drv)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    selectedDriver === drv
                      ? 'bg-[#ef233c] text-white shadow-[0_0_10px_rgba(239,35,60,0.5)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {drv}
                </button>
              ))}
            </div>

            {/* UDP Stream Indicator */}
            <div className="flex items-center gap-2 font-mono-telemetry text-xs text-zinc-300 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-xl">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>UDP STREAM: 10Hz ACTIVE</span>
            </div>

            {/* Pause/Play Live Stream Button */}
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
              title={isSimulating ? 'Pause telemetry feed' : 'Resume telemetry feed'}
              aria-label={isSimulating ? 'Pause telemetry feed' : 'Resume telemetry feed'}
            >
              {isSimulating ? <Pause className="w-4 h-4 text-[#ef233c]" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Steering Wheel F1 Shift Light Array */}
        <div className="mb-8 p-3 rounded-2xl bg-black/70 border border-white/5 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 md:gap-2 mb-2 w-full max-w-md justify-center">
            {shiftLeds.map((led, idx) => (
              <div
                key={idx}
                className={`w-3 md:w-5 h-2.5 md:h-3 rounded-sm transition-all duration-75 ${
                  led.isActive ? led.colorClass : 'bg-zinc-800/80 opacity-30'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between w-full max-w-md px-2 text-[10px] font-mono-telemetry text-zinc-400">
            <span>4,000 RPM</span>
            <span className="text-[#ef233c] font-bold">OPTIMAL UPSHIFT: 12,200 RPM</span>
            <span>12,500 MAX</span>
          </div>
        </div>

        {/* Gauge Grid (4 Main Columns matching specification) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Speedometer Gauge */}
          <div className="p-6 rounded-2xl bg-black/80 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between shadow-inner">
            <div className="text-xs font-mono-telemetry text-zinc-400 uppercase font-semibold mb-2 flex items-center justify-between">
              <span>VEHICLE SPEED</span>
              <Gauge className="w-4 h-4 text-[#ef233c]" />
            </div>
            <div className="text-4xl md:text-5xl font-black font-mono-telemetry text-white mb-3">
              {speed} <span className="text-xs text-zinc-400 font-normal">KM/H</span>
            </div>
            <div>
              <div className="w-full bg-zinc-800/80 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ef233c] h-full transition-all duration-150 shadow-[0_0_10px_rgba(239,35,60,0.8)]"
                  style={{ width: `${speedPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono-telemetry text-zinc-500 mt-1.5">
                <span>0</span>
                <span>Peak: 372 km/h</span>
              </div>
            </div>
          </div>

          {/* Engine RPM Gauge */}
          <div className="p-6 rounded-2xl bg-black/80 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between shadow-inner">
            <div className="text-xs font-mono-telemetry text-zinc-400 uppercase font-semibold mb-2 flex items-center justify-between">
              <span>ENGINE SPEED</span>
              <span className="text-[10px] text-zinc-400">1.6L V6 TURBO HYBRID</span>
            </div>
            <div className="text-4xl md:text-5xl font-black font-mono-telemetry text-[#ef233c] mb-3 drop-shadow-[0_0_15px_rgba(239,35,60,0.4)]">
              {rpm.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">RPM</span>
            </div>
            <div>
              <div className="w-full bg-zinc-800/80 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ef233c] h-full transition-all duration-150 shadow-[0_0_10px_rgba(239,35,60,0.8)]"
                  style={{ width: `${rpmPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono-telemetry text-zinc-500 mt-1.5">
                <span>IDLE: 4,200</span>
                <span>LIMIT: 12,500</span>
              </div>
            </div>
          </div>

          {/* Throttle Position */}
          <div className="p-6 rounded-2xl bg-black/80 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between shadow-inner">
            <div className="text-xs font-mono-telemetry text-zinc-400 uppercase font-semibold mb-2 flex items-center justify-between">
              <span>THROTTLE POSITION</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-4xl md:text-5xl font-black font-mono-telemetry text-white mb-3">
              {throttle} <span className="text-xs text-zinc-400 font-normal">%</span>
            </div>
            <div>
              <div className="w-full bg-zinc-800/80 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-150 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  style={{ width: `${throttle}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono-telemetry text-zinc-500 mt-1.5">
                <span>0%</span>
                <span className="text-emerald-400 font-bold">WOT (100%)</span>
              </div>
            </div>
          </div>

          {/* Brake Pressure */}
          <div className="p-6 rounded-2xl bg-black/80 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between shadow-inner">
            <div className="text-xs font-mono-telemetry text-zinc-400 uppercase font-semibold mb-2 flex items-center justify-between">
              <span>BRAKE PRESSURE</span>
              <span className={`w-2 h-2 rounded-full ${brake > 0 ? 'bg-[#ef233c] animate-ping' : 'bg-zinc-700'}`} />
            </div>
            <div className="text-4xl md:text-5xl font-black font-mono-telemetry text-white mb-3">
              {brake} <span className="text-xs text-zinc-400 font-normal">%</span>
            </div>
            <div>
              <div className="w-full bg-zinc-800/80 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-150 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  style={{ width: `${brake}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono-telemetry text-zinc-500 mt-1.5">
                <span>0 BAR</span>
                <span>PEAK: 140 BAR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Telemetry Strip: Gear, DRS, Lateral G, Sector Deltas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono-telemetry text-center">
          <div className="p-2">
            <span className="text-[10px] uppercase text-zinc-500 block mb-1">TRANSMISSION GEAR</span>
            <div className="text-2xl font-black text-white">
              GEAR <span className="text-[#ef233c]">{gear}</span>
            </div>
          </div>

          <div className="p-2">
            <span className="text-[10px] uppercase text-zinc-500 block mb-1">DRS WING STATE</span>
            <button
              onClick={() => setDrsActive(!drsActive)}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                drsActive
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              <Wind className="w-3.5 h-3.5 inline mr-1" />
              {drsActive ? 'DRS OPEN (+18 KM/H)' : 'DRS CLOSED'}
            </button>
          </div>

          <div className="p-2">
            <span className="text-[10px] uppercase text-zinc-500 block mb-1">CORNERING G-FORCE</span>
            <div className="text-2xl font-black text-white">
              {brake > 40 ? '-4.8 G' : throttle > 80 ? '+1.9 G' : '4.2 G LAT'}
            </div>
          </div>

          <div className="p-2">
            <span className="text-[10px] uppercase text-zinc-500 block mb-1">SECTOR DELTA (S2)</span>
            <div className="text-2xl font-black text-emerald-400">
              -0.184s <span className="text-[10px] text-zinc-500 uppercase">PURPLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
