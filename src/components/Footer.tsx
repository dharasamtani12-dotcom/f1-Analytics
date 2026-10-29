/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, ExternalLink, Github, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#262c38] bg-black py-16 px-4 md:px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#ef233c] rounded-sm rotate-12 flex items-center justify-center shadow-[0_0_15px_rgba(239,35,60,0.6)]">
                <span className="text-black font-chakra font-black text-xs -rotate-12">F1</span>
              </div>
              <span className="text-lg font-bold font-chakra tracking-wider uppercase text-white">
                F1 RACE <span className="text-[#ef233c]">INTELLIGENCE</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-inter max-w-sm leading-relaxed">
              Enterprise motorsport Business Intelligence suite synthesizing 17 seasons of racing data (2010–2026), 6,464 race outcome logs across 29 global circuits and 10 competing constructors.
            </p>

            {/* Evaluation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono-telemetry text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-[#ef233c]" />
              <span>Project Status: <strong className="text-white">Ready for Evaluation</strong></span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3 font-mono-telemetry text-xs">
            <span className="text-zinc-500 uppercase tracking-widest block font-bold">PLATFORM HUD</span>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-zinc-400 hover:text-white transition-colors">Home Telemetry</a></li>
              <li><a href="#project" className="text-zinc-400 hover:text-white transition-colors">Project Overview</a></li>
              <li><a href="#dashboard" className="text-zinc-400 hover:text-white transition-colors">Race Intelligence Dashboard</a></li>
              <li><a href="#story" className="text-zinc-400 hover:text-white transition-colors">Tableau 7-Tab Story</a></li>
              <li><a href="#telemetry" className="text-zinc-400 hover:text-white transition-colors">Cockpit UDP Stream</a></li>
              <li><a href="#drivers" className="text-zinc-400 hover:text-white transition-colors">2026 Drivers Roster</a></li>
            </ul>
          </div>

          {/* Tableau & Resources */}
          <div className="md:col-span-4 space-y-3 font-mono-telemetry text-xs">
            <span className="text-zinc-500 uppercase tracking-widest block font-bold">WORKBOOK DIRECT LINKS</span>
            <div className="space-y-2.5">
              <a
                href="https://public.tableau.com/views/f1_Dashboard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-950 border border-white/5 hover:border-[#ef233c]/50 flex items-center justify-between text-zinc-300 hover:text-white transition-all group"
              >
                <span>F1 Dashboard (Tableau Public)</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#ef233c]" />
              </a>

              <a
                href="https://public.tableau.com/views/F1RACEStory/Story1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-950 border border-white/5 hover:border-[#ef233c]/50 flex items-center justify-between text-zinc-300 hover:text-white transition-all group"
              >
                <span>F1 Story Presentation (Story1)</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#ef233c]" />
              </a>

              <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5 text-[11px] text-zinc-400">
                Author &amp; Architect: <strong className="text-white">Dhara Samtani</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-telemetry text-xs text-zinc-400">
          <div>
            © 2026 RACE INTELLIGENCE SYSTEMS. ALL RIGHTS RESERVED.
          </div>

          <div className="text-center text-zinc-400 text-[11px]">
            POWERED BY ADVANCED F1 TELEMETRY ENGINES &amp; TABLEAU PUBLIC
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-[#ef233c] transition-colors p-2 rounded-lg bg-zinc-950 border border-white/5 hover:border-[#ef233c]/30 cursor-pointer"
            aria-label="Back to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
