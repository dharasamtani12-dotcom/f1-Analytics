/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  ExternalLink,
  Layers,
  PieChart,
  Trophy,
  Users,
  AlertTriangle,
  MapPin,
  RefreshCw,
  Maximize2,
} from 'lucide-react';
import {
  F1_DRIVERS,
  F1_CONSTRUCTORS,
  TYRE_COMPOUNDS,
  COUNTRY_PARTICIPATION,
} from '../data/f1Data';

export const EmbeddedTableauDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedMode, setEmbedMode] = useState<'tableau' | 'native'>('tableau');
  const [nativeTab, setNativeTab] = useState<'drivers' | 'constructors' | 'tyres' | 'circuits' | 'reliability'>('drivers');
  const [selectedDriverId, setSelectedDriverId] = useState<string>('hamilton');
  const [tableauLoadError, setTableauLoadError] = useState(false);

  const [embedViewType, setEmbedViewType] = useState<'js' | 'iframe'>('iframe');

  // Initialize Tableau Public JavaScript Embed
  useEffect(() => {
    if (embedMode !== 'tableau' || embedViewType !== 'js') return;

    const divElement = document.getElementById('viz_dashboard_container');
    if (!divElement) return;

    const vizElement = divElement.getElementsByTagName('object')[0] as HTMLElement;
    if (!vizElement) return;

    if (divElement.offsetWidth > 800) {
      vizElement.style.width = '100%';
      vizElement.style.height = '927px';
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = '100%';
      vizElement.style.height = '927px';
    } else {
      vizElement.style.width = '100%';
      vizElement.style.height = '2127px';
    }

    // Check if script already injected
    const existingScript = document.querySelector('script[src*="tableau.com/javascripts/api/viz_v1.js"]');
    if (!existingScript) {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      scriptElement.async = true;
      scriptElement.onerror = () => setTableauLoadError(true);
      vizElement.parentNode?.insertBefore(scriptElement, vizElement);
    }
  }, [embedMode, embedViewType]);

  const selectedDriver = F1_DRIVERS.find((d) => d.id === selectedDriverId) || F1_DRIVERS[0];

  return (
    <section id="dashboard" className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      {/* Container Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono-telemetry uppercase text-[#ef233c] tracking-widest font-bold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping" />
            ENTERPRISE BI ANALYTICS
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-chakra uppercase tracking-tight text-white mb-2">
            Race Intelligence <span className="text-[#ef233c]">Dashboard</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-inter">
            Explore 17 seasons of driver performance leaderboards, team rankings, and tyre strategies.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-[#151921] border border-white/10 rounded-xl p-1 flex font-chakra text-xs">
            <button
              onClick={() => setEmbedMode('tableau')}
              className={`px-4 py-2 rounded-lg font-bold uppercase transition-all ${
                embedMode === 'tableau'
                  ? 'bg-[#ef233c] text-white shadow-[0_0_15px_rgba(239,35,60,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tableau Public Live Viz
            </button>
            <button
              onClick={() => setEmbedMode('native')}
              className={`px-4 py-2 rounded-lg font-bold uppercase transition-all ${
                embedMode === 'native'
                  ? 'bg-[#ef233c] text-white shadow-[0_0_15px_rgba(239,35,60,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Interactive Data Explorer
            </button>
          </div>

          <a
            href="https://public.tableau.com/views/f1_Dashboard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#ef233c] text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono-telemetry"
            title="Open official Tableau Public dashboard in new window"
          >
            <span className="hidden sm:inline">Open Viz</span>
            <ExternalLink className="w-4 h-4 text-[#ef233c]" />
          </a>
        </div>
      </div>

      {/* Embedded Viewport Frame */}
      <div className="rounded-3xl bg-[#09090b] border border-[#262c38] overflow-hidden shadow-2xl relative">
        {/* Frame Top Status Bar */}
        <div className="px-5 py-3.5 bg-[#12161f] border-b border-white/10 flex flex-wrap items-center justify-between text-xs font-mono-telemetry text-zinc-400 gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-zinc-300 font-semibold hidden sm:inline">
              TABLEAU PUBLIC WORKBOOK: f1_Dashboard / Dashboard1
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 hidden md:inline">6,464 RECORDS | 17 SEASONS</span>
            <span className="text-[#ef233c] font-bold">AUTHOR: DHARA SAMTANI</span>
          </div>
        </div>

        {/* Mode 1: Official Tableau Public Embed Container */}
        {embedMode === 'tableau' && (
          <div className="p-2 md:p-4 min-h-[650px] flex flex-col justify-center items-center">
            {/* View Switcher Bar for Tableau View */}
            <div className="w-full mb-3 px-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-telemetry">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Embed Render Mode:</span>
                <button
                  onClick={() => setEmbedViewType('iframe')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                    embedViewType === 'iframe'
                      ? 'bg-[#ef233c] text-white shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Interactive Frame
                </button>
                <button
                  onClick={() => setEmbedViewType('js')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                    embedViewType === 'js'
                      ? 'bg-[#ef233c] text-white shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Tableau JS API
                </button>
              </div>

              <a
                href="https://public.tableau.com/views/f1_Dashboard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ef233c] hover:underline flex items-center gap-1"
              >
                Launch on public.tableau.com <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Iframe Direct Embed */}
            {embedViewType === 'iframe' && (
              <div className="w-full rounded-2xl overflow-hidden bg-black/60 border border-white/5 relative min-h-[850px] flex flex-col">
                <iframe
                  title="Formula 1 Dashboard - Dhara Samtani"
                  src="https://public.tableau.com/views/f1_Dashboard/Dashboard1?:embed=yes&:showVizHome=no&:toolbar=yes&:display_count=yes&:showShareOptions=true"
                  className="w-full flex-1 border-0 min-h-[850px] md:min-h-[920px]"
                  allowFullScreen
                />
              </div>
            )}

            {/* Tableau Public JS API Embed */}
            {embedViewType === 'js' && (
              <div
                className="tableauPlaceholder w-full"
                id="viz_dashboard_container"
                ref={containerRef}
                style={{ position: 'relative', width: '100%', minHeight: '850px' }}
              >
                <noscript>
                  <a href="https://public.tableau.com/views/f1_Dashboard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link">
                    <img
                      alt="F1 Race Intelligence Dashboard"
                      src="https://public.tableau.com/static/images/f1/f1_Dashboard/Dashboard1/1_rss.png"
                      style={{ border: 'none' }}
                    />
                  </a>
                </noscript>
                <object className="tableauViz" style={{ display: 'none' }}>
                  <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
                  <param name="embed_code_version" value="3" />
                  <param name="site_root" value="" />
                  <param name="name" value="f1_Dashboard/Dashboard1" />
                  <param name="tabs" value="no" />
                  <param name="toolbar" value="yes" />
                  <param name="showVizHome" value="no" />
                  <param name="display_count" value="yes" />
                  <param name="device" value="desktop" />
                </object>
              </div>
            )}

            {/* Direct fallback trigger in case third-party cookies or adblockers hinder Tableau iframe */}
            <div className="w-full mt-4 p-4 rounded-2xl bg-zinc-950/80 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-telemetry text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Need offline data drilldowns? Explore the native telemetry explorer.</span>
              </div>
              <button
                onClick={() => setEmbedMode('native')}
                className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-chakra uppercase font-bold tracking-wider cursor-pointer"
              >
                Launch Native Explorer
              </button>
            </div>
          </div>
        )}

        {/* Mode 2: Interactive Native BI Data Explorer */}
        {embedMode === 'native' && (
          <div className="p-4 md:p-8">
            {/* Native Explorer Sub-Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-white/10 font-chakra text-xs">
              <button
                onClick={() => setNativeTab('drivers')}
                className={`px-4 py-2 rounded-xl uppercase font-bold flex items-center gap-2 transition-all ${
                  nativeTab === 'drivers'
                    ? 'bg-[#ef233c] text-white shadow-[0_0_12px_rgba(239,35,60,0.4)]'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Driver Points Leaderboard
              </button>
              <button
                onClick={() => setNativeTab('constructors')}
                className={`px-4 py-2 rounded-xl uppercase font-bold flex items-center gap-2 transition-all ${
                  nativeTab === 'constructors'
                    ? 'bg-[#ef233c] text-white shadow-[0_0_12px_rgba(239,35,60,0.4)]'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4" />
                Constructor Rankings
              </button>
              <button
                onClick={() => setNativeTab('tyres')}
                className={`px-4 py-2 rounded-xl uppercase font-bold flex items-center gap-2 transition-all ${
                  nativeTab === 'tyres'
                    ? 'bg-[#ef233c] text-white shadow-[0_0_12px_rgba(239,35,60,0.4)]'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <PieChart className="w-4 h-4" />
                Tyre Stint Usage
              </button>
              <button
                onClick={() => setNativeTab('circuits')}
                className={`px-4 py-2 rounded-xl uppercase font-bold flex items-center gap-2 transition-all ${
                  nativeTab === 'circuits'
                    ? 'bg-[#ef233c] text-white shadow-[0_0_12px_rgba(239,35,60,0.4)]'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Country Treemap
              </button>
              <button
                onClick={() => setNativeTab('reliability')}
                className={`px-4 py-2 rounded-xl uppercase font-bold flex items-center gap-2 transition-all ${
                  nativeTab === 'reliability'
                    ? 'bg-[#ef233c] text-white shadow-[0_0_12px_rgba(239,35,60,0.4)]'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                DNF Reliability Index
              </button>
            </div>

            {/* Tab 1: Driver Performance Leaderboard */}
            {nativeTab === 'drivers' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h4 className="text-xl font-bold font-chakra uppercase text-white">
                      Cumulative Driver Points (2010–2026 Telemetry)
                    </h4>
                    <p className="text-xs font-mono-telemetry text-zinc-400">
                      Total career scoring benchmarked across 17 seasons of race outcomes
                    </p>
                  </div>
                  <span className="text-xs font-mono-telemetry text-[#ef233c] font-bold">
                    Hamilton (31,147 pts) vs Verstappen (31,126 pts)
                  </span>
                </div>

                <div className="space-y-3 font-mono-telemetry">
                  {F1_DRIVERS.map((driver, index) => {
                    const maxPts = F1_DRIVERS[0].points;
                    const percent = (driver.points / maxPts) * 100;
                    return (
                      <div
                        key={driver.id}
                        onClick={() => setSelectedDriverId(driver.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          selectedDriverId === driver.id
                            ? 'bg-[#151921] border-[#ef233c]/60 shadow-[0_0_20px_rgba(239,35,60,0.2)]'
                            : 'bg-zinc-950/70 border-white/5 hover:border-white/20 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                          <div className="flex items-center gap-3">
                            <span className="w-6 text-zinc-500 font-bold">#{index + 1}</span>
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: driver.teamColor }}
                            />
                            <span className="text-white font-bold">{driver.name}</span>
                            <span className="text-zinc-500 hidden sm:inline">({driver.team})</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-zinc-400 hidden md:inline">{driver.wins} WINS</span>
                            <span className="text-white font-bold text-base md:text-lg">
                              {driver.points.toLocaleString()} <span className="text-[10px] text-zinc-500">PTS</span>
                            </span>
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: driver.id === 'hamilton' ? '#ef233c' : driver.id === 'verstappen' ? '#3671c6' : '#a1a1aa',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Constructor Rankings */}
            {nativeTab === 'constructors' && (
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-bold font-chakra uppercase text-white">
                    Constructor Championship Standings (10 Active Entities)
                  </h4>
                  <p className="text-xs font-mono-telemetry text-zinc-400">
                    Red Bull Racing holds 8,006 pts lead over 17-season window
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {F1_CONSTRUCTORS.map((team, idx) => (
                    <div
                      key={team.id}
                      className="p-5 rounded-2xl bg-zinc-950 border border-white/5 hover:border-[#ef233c]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-3 h-3 rounded-full shadow-md"
                              style={{ backgroundColor: team.color }}
                            />
                            <h5 className="font-chakra font-bold text-base text-white uppercase">
                              {team.name}
                            </h5>
                          </div>
                          <span className="text-xs font-mono-telemetry text-zinc-500">#{idx + 1}</span>
                        </div>
                        <div className="text-xs font-mono-telemetry text-zinc-400 mb-3">
                          Power Unit: <span className="text-white">{team.engine}</span> • Titles: <span className="text-[#ef233c] font-bold">{team.championships}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono-telemetry text-xs">
                        <span className="text-zinc-500">AGGREGATE PTS</span>
                        <span className="text-xl font-black text-white">
                          {team.leadPoints.toLocaleString()} PTS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Tyre Compound Usage */}
            {nativeTab === 'tyres' && (
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-bold font-chakra uppercase text-white">
                    Tyre Compound Stint Allocation Breakdown
                  </h4>
                  <p className="text-xs font-mono-telemetry text-zinc-400">
                    Strategic share: Soft (31.52%), Medium (30.78%), Hard (30.36%), Intermediate (7.34%)
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                  {TYRE_COMPOUNDS.map((tyre) => (
                    <div
                      key={tyre.compound}
                      className="p-6 rounded-2xl bg-zinc-950 border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="w-4 h-4 rounded-full border border-black/40"
                            style={{ backgroundColor: tyre.color }}
                          />
                          <span className="font-chakra font-bold text-lg text-white uppercase">
                            {tyre.compound}
                          </span>
                        </div>
                        <div className="text-3xl font-black font-mono-telemetry text-white mb-2">
                          {tyre.stintSharePercent}%
                        </div>
                        <p className="text-xs font-inter text-zinc-400 mb-4">
                          Degradation: {tyre.degradationRate}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 font-mono-telemetry text-[11px] text-zinc-400 space-y-1">
                        <div>Stint Range: <span className="text-white font-bold">{tyre.typicalStintLaps}</span></div>
                        <div>Operating Temp: <span className="text-[#ef233c] font-bold">{tyre.thermalWindow}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stint Distribution Bar */}
                <div className="bg-zinc-950 p-5 rounded-2xl border border-white/5">
                  <span className="text-xs font-mono-telemetry text-zinc-400 block mb-3 uppercase">
                    Overall Compound Proportion (6,464 race stints)
                  </span>
                  <div className="w-full h-6 rounded-xl overflow-hidden flex shadow-inner">
                    <div style={{ width: '31.52%', backgroundColor: '#ef233c' }} title="Soft: 31.52%" />
                    <div style={{ width: '30.78%', backgroundColor: '#f9c74f' }} title="Medium: 30.78%" />
                    <div style={{ width: '30.36%', backgroundColor: '#ffffff' }} title="Hard: 30.36%" />
                    <div style={{ width: '7.34%', backgroundColor: '#43aa8b' }} title="Intermediate: 7.34%" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs font-mono-telemetry text-zinc-400 mt-3">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ef233c]" /> Soft 31.52%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f9c74f]" /> Medium 30.78%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white" /> Hard 30.36%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#43aa8b]" /> Intermediate 7.34%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Country Treemap */}
            {nativeTab === 'circuits' && (
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-bold font-chakra uppercase text-white">
                    Country-Wise Participation Treemap
                  </h4>
                  <p className="text-xs font-mono-telemetry text-zinc-400">
                    Host country entry logs: Bahrain (2,168), USA (400), Hungary (328), Monaco (328), Spain (328)...
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 font-mono-telemetry">
                  {COUNTRY_PARTICIPATION.map((item) => (
                    <div
                      key={item.country}
                      className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-[#ef233c]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg">{item.flag}</span>
                          <span className="text-sm font-bold text-white uppercase font-chakra">{item.country}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 line-clamp-1">{item.circuits}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500">RECORDS</span>
                        <span className="text-base font-bold text-[#ef233c]">{item.records.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: DNF Reliability Index */}
            {nativeTab === 'reliability' && (
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-bold font-chakra uppercase text-white">
                    Driver Reliability Analysis &amp; DNF Breakdown
                  </h4>
                  <p className="text-xs font-mono-telemetry text-zinc-400">
                    Mechanical attrition across engine, mechanical, brake failures and collisions
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-telemetry">
                  {F1_DRIVERS.slice(0, 8).map((drv) => {
                    const totalDnf = drv.dnfCount;
                    return (
                      <div
                        key={drv.id}
                        className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: drv.teamColor }} />
                            <span className="text-white font-bold font-chakra uppercase">{drv.name}</span>
                          </div>
                          <span className="text-xs text-[#ef233c] font-bold">{totalDnf} TOTAL DNFs</span>
                        </div>

                        {/* Sub categories */}
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                          <div className="p-2 bg-zinc-900 rounded-lg">
                            <span className="text-[10px] text-zinc-500 block">ENGINE</span>
                            <span className="text-white font-bold">{drv.dnfBreakdown.engine}</span>
                          </div>
                          <div className="p-2 bg-zinc-900 rounded-lg">
                            <span className="text-[10px] text-zinc-500 block">MECH</span>
                            <span className="text-white font-bold">{drv.dnfBreakdown.mechanical}</span>
                          </div>
                          <div className="p-2 bg-zinc-900 rounded-lg">
                            <span className="text-[10px] text-zinc-500 block">BRAKES</span>
                            <span className="text-white font-bold">{drv.dnfBreakdown.brakes}</span>
                          </div>
                          <div className="p-2 bg-zinc-900 rounded-lg">
                            <span className="text-[10px] text-zinc-500 block">CRASH</span>
                            <span className="text-white font-bold">{drv.dnfBreakdown.collision}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
