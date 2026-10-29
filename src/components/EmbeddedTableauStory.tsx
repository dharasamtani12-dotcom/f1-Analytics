/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  Globe,
  ShieldCheck,
  Trophy,
  Zap,
} from 'lucide-react';

export const EmbeddedTableauStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [embedMode, setEmbedMode] = useState<'interactive' | 'tableau'>('interactive');

  // Load Tableau Story Javascript
  useEffect(() => {
    if (embedMode !== 'tableau') return;

    const divElement = document.getElementById('viz_story_container');
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

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    scriptElement.async = true;
    vizElement.parentNode?.insertBefore(scriptElement, vizElement);
  }, [embedMode]);

  const stories = [
    {
      step: '01',
      title: 'Global Driver Talent & Host Nation Venues',
      tagline: '13 Countries Mapped Across 29 International Circuits',
      content:
        'Over 17 seasons, 6,464 race outcome logs detail the geographic shift of modern Formula 1. Bahrain leads with 2,168 logs, while historic circuits like Monaco and Silverstone anchor motorsport heritage alongside new street venues in Miami, Las Vegas, and Jeddah.',
      stats: [
        { label: 'Total Logs', val: '6,464' },
        { label: 'Circuits', val: '29' },
        { label: 'Host Nations', val: '13' },
      ],
      icon: <Globe className="w-5 h-5 text-[#ef233c]" />,
    },
    {
      step: '02',
      title: 'Constructor Eras: Red Bull vs Mercedes Hegemony',
      tagline: 'V8 Exhaust-Blown Diffusers to V6 Hybrid Turbocharging',
      content:
        'Red Bull Racing accumulated an 8,006 pts lead through aerodynamic dominance, challenged by Mercedes-AMG Petronas during the turbo-hybrid era (8 consecutive titles 2014-2021). The midfield battle has intensified with McLaren and Ferrari scoring consistent podium clusters.',
      stats: [
        { label: 'RBR Points Lead', val: '8,006' },
        { label: 'Ferrari Podiums', val: '200+' },
        { label: 'Championship Eras', val: '3' },
      ],
      icon: <Trophy className="w-5 h-5 text-[#ef233c]" />,
    },
    {
      step: '03',
      title: 'The Hamilton-Verstappen Scoring Duel',
      tagline: 'Separated by Only 21 Career Points: 31,147 vs 31,126',
      content:
        'Lewis Hamilton (31,147 pts, 105 wins) and Max Verstappen (31,126 pts, 63 wins) represent the two statistical pinnacles of modern Grand Prix racing. Their scoring efficiency benchmarked against Charles Leclerc (27,673 pts) highlights divergent team performance arcs.',
      stats: [
        { label: 'Hamilton Peak', val: '31,147' },
        { label: 'Verstappen Peak', val: '31,126' },
        { label: 'Delta Margin', val: '21 pts' },
      ],
      icon: <Flame className="w-5 h-5 text-[#ef233c]" />,
    },
    {
      step: '04',
      title: 'Strategic Stints & Compound Degradation',
      tagline: 'Soft (31.52%), Medium (30.78%), Hard (30.36%) Triad',
      content:
        'Tyre allocation balance across dry compounds is almost evenly split at ~31% each. Intermediate compound usage (7.34%) represents critical monsoon crossover stints where race outcomes are frequently inverted due to pit call timing deltas.',
      stats: [
        { label: 'Soft Stints', val: '31.52%' },
        { label: 'Medium Stints', val: '30.78%' },
        { label: 'Hard Stints', val: '30.36%' },
      ],
      icon: <Zap className="w-5 h-5 text-[#ef233c]" />,
    },
    {
      step: '05',
      title: 'Mechanical Reliability & Attrition Index',
      tagline: 'Decoupling Driver Errors from Mechanical Failure Rates',
      content:
        'Analysis of Did Not Finish (DNF) records across 19 drivers categorizes failures into engine, mechanical, brake systems, and collisions. Engine attrition has declined by 64% from 2010 to 2026, demonstrating FIA component lifespan homologation success.',
      stats: [
        { label: 'Engine DNF Drop', val: '-64%' },
        { label: 'Grid Reliability', val: '89.2%' },
        { label: 'Total Analyzed', val: '19 Drivers' },
      ],
      icon: <ShieldCheck className="w-5 h-5 text-[#ef233c]" />,
    },
    {
      step: '06',
      title: 'Safety Car Deployments & Race Neutralization',
      tagline: 'Virtual Safety Car and Red Flag Strategic Window Arbitrage',
      content:
        'VSC and full Safety Car periods reduce pit lane loss from 21.5 seconds to 12.1 seconds. Teams executing pit stops during neutralization capture on average 3.2 positions delta compared to staying out on worn rubber.',
      stats: [
        { label: 'Pit Delta Save', val: '9.4s' },
        { label: 'Pos. Gained', val: '+3.2' },
        { label: 'Safety Index', val: '99.4%' },
      ],
      icon: <ShieldCheck className="w-5 h-5 text-[#ef233c]" />,
    },
    {
      step: '07',
      title: 'Future Horizon: 2026 Regulations & Active Aero',
      tagline: 'Sustainable Synthetic Fuels & 50/50 Electric Power Split',
      content:
        'The telemetry platform prepares for the next regulatory era: MGU-K electrical output jumps to 350kW (equal to combustion engine output), active aerodynamics adjust straightaway downforce, and 100% sustainable fuels redefine thermal efficiency.',
      stats: [
        { label: 'MGU-K Output', val: '350 kW' },
        { label: 'Biofuel Ratio', val: '100%' },
        { label: 'Next Regs', val: '2026' },
      ],
      icon: <Zap className="w-5 h-5 text-[#ef233c]" />,
    },
  ];

  const current = stories[activeStoryIndex];

  return (
    <section id="story" className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="text-xs font-mono-telemetry uppercase text-[#ef233c] tracking-widest font-bold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping" />
            7-STAGE ANALYTICAL NARRATIVE
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-chakra uppercase tracking-tight text-white mb-2">
            Formula 1 Race Intelligence: <span className="text-[#ef233c]">Story Narrative</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-inter">
            Step-by-step guided story narrative from global overview to championship outcomes.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="bg-[#151921] border border-white/10 rounded-xl p-1 flex font-chakra text-xs">
            <button
              onClick={() => setEmbedMode('interactive')}
              className={`px-4 py-2 rounded-lg font-bold uppercase transition-all ${
                embedMode === 'interactive'
                  ? 'bg-[#ef233c] text-white shadow-[0_0_15px_rgba(239,35,60,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Interactive Story Tour
            </button>
            <button
              onClick={() => setEmbedMode('tableau')}
              className={`px-4 py-2 rounded-lg font-bold uppercase transition-all ${
                embedMode === 'tableau'
                  ? 'bg-[#ef233c] text-white shadow-[0_0_15px_rgba(239,35,60,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tableau Story Embed
            </button>
          </div>

          <a
            href="https://public.tableau.com/views/F1RACEStory/Story1?:embed=yes&:showVizHome=no&:toolbar=n&:display_count=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#ef233c] text-zinc-400 hover:text-white transition-all"
            title="Open official Tableau Public Story in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="rounded-3xl bg-[#09090b] border border-[#262c38] overflow-hidden shadow-2xl relative">
        {embedMode === 'interactive' && (
          <div className="p-6 md:p-12">
            {/* Story Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10">
              {stories.map((st, i) => (
                <button
                  key={st.step}
                  onClick={() => setActiveStoryIndex(i)}
                  className={`px-4 py-2.5 rounded-xl font-chakra font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeStoryIndex === i
                      ? 'bg-[#ef233c] text-white shadow-[0_0_15px_rgba(239,35,60,0.4)]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{st.step}</span>
                  <span className="hidden sm:inline">{st.title.split(':')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Story Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-telemetry font-bold">
                  {current.icon}
                  <span>STAGE {current.step} OF 07</span>
                </div>

                <h3 className="text-2xl md:text-4xl font-black font-chakra uppercase text-white tracking-tight">
                  {current.title}
                </h3>

                <h4 className="text-sm md:text-base font-chakra font-semibold text-[#ef233c] tracking-wide">
                  {current.tagline}
                </h4>

                <p className="text-zinc-300 font-inter text-sm md:text-base leading-relaxed pt-2">
                  {current.content}
                </p>

                {/* Micro KPIs */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                  {current.stats.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-white/5 font-mono-telemetry text-center">
                      <span className="text-[10px] text-zinc-500 uppercase block">{s.label}</span>
                      <span className="text-lg md:text-xl font-bold text-white">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Visual Telemetry Box */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-950 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-inner">
                <div className="text-xs font-mono-telemetry text-zinc-400 uppercase mb-4 flex items-center justify-between">
                  <span>STORY LOG VIEWPORT</span>
                  <BookOpen className="w-4 h-4 text-[#ef233c]" />
                </div>
                <div className="space-y-3 font-mono-telemetry text-xs py-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">AUTHOR</span>
                    <span className="text-white font-bold">Dhara Samtani</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">WORKBOOK</span>
                    <span className="text-[#ef233c] font-bold">F1RACEStory</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">RESOLUTION</span>
                    <span className="text-white">Desktop / Tablet / Mobile</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">STATUS</span>
                    <span className="text-emerald-400 font-bold">Ready for Evaluation</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <button
                    disabled={activeStoryIndex === 0}
                    onClick={() => setActiveStoryIndex((prev) => Math.max(0, prev - 1))}
                    className="p-2.5 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 disabled:opacity-30 hover:bg-zinc-800 disabled:hover:bg-zinc-900 cursor-pointer"
                    aria-label="Previous story stage"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono-telemetry text-zinc-400">
                    {activeStoryIndex + 1} / {stories.length}
                  </span>
                  <button
                    disabled={activeStoryIndex === stories.length - 1}
                    onClick={() => setActiveStoryIndex((prev) => Math.min(stories.length - 1, prev + 1))}
                    className="p-2.5 rounded-xl bg-[#ef233c] text-white disabled:opacity-30 hover:bg-red-600 cursor-pointer"
                    aria-label="Next story stage"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Tableau Story Embed */}
        {embedMode === 'tableau' && (
          <div className="p-4 min-h-[600px] flex flex-col justify-center items-center">
            <div
              className="tableauPlaceholder w-full"
              id="viz_story_container"
              ref={containerRef}
              style={{ position: 'relative', width: '100%', minHeight: '850px' }}
            >
              <noscript>
                <a href="https://public.tableau.com/views/F1RACEStory/Story1">
                  <img
                    alt="F1 Race Intelligence Story"
                    src="https://public.tableau.com/static/images/F1/F1RACEStory/Story1/1_rss.png"
                    style={{ border: 'none' }}
                  />
                </a>
              </noscript>
              <object className="tableauViz" style={{ display: 'none' }}>
                <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
                <param name="embed_code_version" value="3" />
                <param name="site_root" value="" />
                <param name="name" value="F1RACEStory/Story1" />
                <param name="tabs" value="no" />
                <param name="toolbar" value="no" />
                <param name="showVizHome" value="no" />
                <param name="display_count" value="yes" />
              </object>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
