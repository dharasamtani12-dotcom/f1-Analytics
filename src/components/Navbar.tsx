/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Activity, ShieldCheck, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenLiveTelemetry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenLiveTelemetry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'PROJECT', href: '#project' },
    { label: 'DASHBOARD', href: '#dashboard' },
    { label: 'STORY', href: '#story' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'INSIGHTS', href: '#insights' },
    { label: 'DRIVERS', href: '#drivers' },
  ];

  return (
    <>
      {/* Top Fixed Blur Background bar */}
      <div className="fixed top-0 inset-x-0 h-24 z-40 pointer-events-none bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-md" />

      {/* Navigation Header HUD */}
      <header className="fixed top-0 left-0 w-full z-50 pt-3 md:pt-4 px-3 md:px-6">
        <nav
          aria-label="Main Navigation"
          className="max-w-7xl mx-auto flex items-center justify-between bg-[#151921]/90 backdrop-blur-xl border border-[#262c38] rounded-full px-4 md:px-6 py-2.5 md:py-3 shadow-2xl transition-all"
        >
          {/* Brand Mark */}
          <a href="#hero" className="flex items-center gap-2.5 md:gap-3 group">
            <div className="w-7 h-7 bg-[#ef233c] rounded-sm rotate-12 flex items-center justify-center shadow-[0_0_15px_rgba(239,35,60,0.6)] group-hover:scale-105 transition-transform">
              <span className="text-black font-chakra font-black text-xs -rotate-12 tracking-tighter">
                F1
              </span>
            </div>
            <span className="text-base md:text-lg font-bold font-chakra tracking-wider uppercase text-white">
              RACE<span className="text-[#ef233c]">INTELLIGENCE</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono-telemetry uppercase text-zinc-300 hover:text-[#ef233c] transition-colors tracking-widest py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ef233c] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            {/* Live Telemetry Button */}
            <button
              onClick={onOpenLiveTelemetry}
              className="f1-shiny-btn group px-3.5 md:px-4 py-1.5 md:py-2 text-xs font-chakra font-bold uppercase tracking-wider text-white hidden sm:flex items-center gap-2 hover:shadow-[0_0_20px_rgba(239,35,60,0.4)] transition-all"
              title="Open Live Cockpit Stream"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping" />
                <span className="hidden md:inline">LIVE TELEMETRY</span>
                <span className="md:hidden">TELEMETRY</span>
              </span>
            </button>

            {/* Red Pill Button for Contact */}
            <button
              onClick={onOpenContact}
              className="px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-[#ef233c] hover:bg-red-600 text-white font-chakra font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(239,35,60,0.45)] hover:shadow-[0_0_25px_rgba(239,35,60,0.7)] transition-all active:scale-95"
            >
              CONTACT
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ef233c]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-[#151921]/95 backdrop-blur-2xl border border-[#262c38] rounded-2xl p-5 shadow-2xl animate-fade-up">
            <div className="flex flex-col gap-3 font-mono-telemetry text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 uppercase tracking-wider flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-zinc-600 text-xs">→</span>
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLiveTelemetry();
                  }}
                  className="w-full py-2.5 rounded-lg bg-zinc-900 text-white border border-red-500/30 font-chakra font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4 text-[#ef233c]" />
                  Cockpit Telemetry Feed
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
