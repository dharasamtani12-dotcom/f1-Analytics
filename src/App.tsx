/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SecondaryStatRibbon } from './components/SecondaryStatRibbon';
import { ProjectOverview } from './components/ProjectOverview';
import { LiveTickerTape } from './components/LiveTickerTape';
import { IntelligenceBentoGrid } from './components/IntelligenceBentoGrid';
import { CockpitTelemetryMonitor } from './components/CockpitTelemetryMonitor';
import { EmbeddedTableauDashboard } from './components/EmbeddedTableauDashboard';
import { EmbeddedTableauStory } from './components/EmbeddedTableauStory';
import { DriverGallery } from './components/DriverGallery';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { DriverHeadToHeadModal } from './components/DriverHeadToHeadModal';
import { Driver } from './types/f1';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHeadToHeadOpen, setIsHeadToHeadOpen] = useState(false);
  const [comparisonDriver, setComparisonDriver] = useState<Driver | null>(null);

  const handleOpenComparison = (driver?: Driver) => {
    if (driver) {
      setComparisonDriver(driver);
    }
    setIsHeadToHeadOpen(true);
  };

  const handleScrollToTelemetry = () => {
    document.getElementById('telemetry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white relative selection-red overflow-x-hidden font-inter antialiased">
      {/* Global Ambient Background Elements matching Red Noir Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep noir gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505] via-black to-[#09090b]" />

        {/* Ambient Parallax Star Particles */}
        <div className="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent stars-1 animate-[animStar_70s_linear_infinite]" />
        <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent stars-2 animate-[animStar_100s_linear_infinite]" />

        {/* Subtle Atmospheric Red Nebula Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-3/4 right-10 w-[700px] h-[500px] bg-[#ef233c]/5 rounded-full blur-[160px]" />

        {/* Carbon Grid Backdrop */}
        <div className="absolute inset-0 carbon-grid [mask-image:radial-gradient(circle_at_center,black_35%,transparent_90%)]" />
      </div>

      {/* Main Page Flow */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Fixed Navigation Header HUD */}
        <Navbar
          onOpenContact={() => setIsContactOpen(true)}
          onOpenLiveTelemetry={handleScrollToTelemetry}
        />

        <main className="flex-1">
          {/* 2. Hero Section (matching screenshot 1) */}
          <HeroSection
            onExploreDashboard={handleScrollToDashboard}
            onExploreStory={handleScrollToStory}
          />

          {/* 3. Secondary Operational Stat Strip (Trophy, Flag, Top Speed, KPIs) */}
          <SecondaryStatRibbon />

          {/* 4. Project Overview & Interactive Circuit Canvas (matching screenshot 2) */}
          <ProjectOverview onExploreDashboard={handleScrollToDashboard} />

          {/* 5. Live Telemetry Ticker Tape (Infinite horizontal marquee) */}
          <LiveTickerTape />

          {/* 6. Intelligence Dimensions Bento Grid (6 cards with interactive detail) */}
          <IntelligenceBentoGrid
            onOpenHeadToHead={() => handleOpenComparison()}
            onOpenTelemetry={handleScrollToTelemetry}
          />

          {/* 7. Real-Time Cockpit Telemetry Monitor (UDP 10Hz stream with gauges) */}
          <CockpitTelemetryMonitor />

          {/* 8. Embedded Tableau Public Dashboard Viewport */}
          <EmbeddedTableauDashboard />

          {/* 9. Embedded Tableau Story Viewport */}
          <EmbeddedTableauStory />

          {/* 10. Drivers Roster & Gallery */}
          <DriverGallery onSelectDriverForComparison={handleOpenComparison} />
        </main>

        {/* 11. Footer Section */}
        <Footer />
      </div>

      {/* Modals */}
      {isContactOpen && (
        <ContactModal onClose={() => setIsContactOpen(false)} />
      )}

      {isHeadToHeadOpen && (
        <DriverHeadToHeadModal
          initialDriver={comparisonDriver}
          onClose={() => {
            setIsHeadToHeadOpen(false);
            setComparisonDriver(null);
          }}
        />
      )}
    </div>
  );
}
