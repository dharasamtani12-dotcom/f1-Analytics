import React, { useEffect, useRef, useState } from 'react';
import { Gauge, PlayCircle, ChevronDown, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface HeroSectionProps {
  onExploreDashboard: () => void;
  onExploreStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDashboard,
  onExploreStory,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Guarantee seamless video autoplay across all browsers and iframes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        // Fallback: retry with muted guaranteed
        video.muted = true;
        try {
          await video.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    };

    playVideo();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 md:px-6 overflow-hidden bg-black"
    >
      {/* Background Hero Video Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 filter brightness-85 contrast-110 transition-all duration-700"
        >
          <source src="/assets/aistudio/animay_f1_98277c9b.mp4" type="video/mp4" />
        </video>

        {/* Balanced Dark Neutral Vignette - Clear visibility for animation, high contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Subtle Carbon Grid Overlay */}
        <div className="absolute inset-0 carbon-grid opacity-10 mix-blend-overlay pointer-events-none" />

        {/* Floating Background Video Control HUD */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs font-mono-telemetry text-zinc-300 shadow-xl">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
          <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-bold">
            {isPlaying ? 'F1 ANIMATION' : 'PAUSED'}
          </span>
          <button
            onClick={togglePlay}
            className="p-1 hover:text-white transition-colors cursor-pointer text-zinc-300 hover:scale-110 active:scale-95"
            title={isPlaying ? 'Pause background animation' : 'Play background animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-1 hover:text-white transition-colors cursor-pointer text-zinc-300 hover:scale-110 active:scale-95"
            title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
          </button>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 hover:border-[#ef233c]/50 transition-all shadow-[0_0_20px_rgba(239,35,60,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef233c] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef233c]" />
          </span>
          <span className="text-xs font-mono-telemetry uppercase text-red-100 tracking-widest font-semibold">
            [ LIVE RACE ANALYTICS PLATFORM ]
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-chakra uppercase tracking-tight leading-none mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          FORMULA <span className="text-[#ef233c] inline-block hover:scale-105 transition-transform drop-shadow-[0_0_25px_rgba(239,35,60,0.8)]">1</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300 tracking-wider">
            RACE INTELLIGENCE
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-chakra font-semibold text-zinc-300 tracking-[0.25em] mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            DASHBOARD
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 leading-relaxed font-inter font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Deep-dive analytics into Formula 1 Championship data — from driver performance metrics and team strategy to circuit analysis and historical championship trends. Powered by Tableau visualization intelligence.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16 w-full sm:w-auto">
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              onExploreDashboard();
              document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-full bg-[#ef233c] text-white font-chakra font-bold text-sm tracking-wider uppercase hover:bg-red-600 transition-all shadow-[0_0_30px_rgba(239,35,60,0.5)] hover:shadow-[0_0_40px_rgba(239,35,60,0.8)] flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
          >
            <Gauge className="w-4 h-4" />
            VIEW DASHBOARD
          </a>

          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              onExploreStory();
              document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-full bg-zinc-950/80 border border-zinc-700/80 text-zinc-200 font-chakra font-bold text-sm tracking-wider uppercase hover:text-white hover:border-[#ef233c]/60 hover:bg-zinc-900 transition-all flex items-center justify-center gap-2.5 backdrop-blur-md active:scale-95 cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-[#ef233c]" />
            EXPLORE STORY
          </a>
        </div>

        {/* Hero Macro KPI Grid (4 Columns) with frosted glass */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 w-full max-w-4xl mx-auto pt-8 border-t border-white/10">
          <div className="p-4 md:p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:border-[#ef233c]/40 hover:bg-black/60 transition-all shadow-lg">
            <div className="text-3xl lg:text-4xl font-black font-mono-telemetry text-white mb-1">
              75+
            </div>
            <div className="text-xs font-mono-telemetry uppercase text-zinc-400 tracking-wider">
              SEASONS ANALYZED
            </div>
          </div>

          <div className="p-4 md:p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:border-[#ef233c]/40 hover:bg-black/60 transition-all shadow-lg">
            <div className="text-3xl lg:text-4xl font-black font-mono-telemetry text-[#ef233c] mb-1 drop-shadow-[0_0_15px_rgba(239,35,60,0.5)]">
              1K+
            </div>
            <div className="text-xs font-mono-telemetry uppercase text-zinc-400 tracking-wider">
              RACES COVERED
            </div>
          </div>

          <div className="p-4 md:p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:border-[#ef233c]/40 hover:bg-black/60 transition-all shadow-lg">
            <div className="text-3xl lg:text-4xl font-black font-mono-telemetry text-white mb-1">
              20
            </div>
            <div className="text-xs font-mono-telemetry uppercase text-zinc-400 tracking-wider">
              ACTIVE DRIVERS
            </div>
          </div>

          <div className="p-4 md:p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:border-[#ef233c]/40 hover:bg-black/60 transition-all shadow-lg">
            <div className="text-3xl lg:text-4xl font-black font-mono-telemetry text-white mb-1">
              10
            </div>
            <div className="text-xs font-mono-telemetry uppercase text-zinc-400 tracking-wider">
              CONSTRUCTORS
            </div>
          </div>
        </div>

        {/* Scroll Mouse Indicator */}
        <a
          href="#project"
          className="mt-12 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors group cursor-pointer"
          aria-label="Scroll to Project Overview"
        >
          <div className="w-5 h-8 rounded-full border-2 border-zinc-600 group-hover:border-[#ef233c] flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-zinc-400 group-hover:bg-[#ef233c] animate-bounce transition-colors" />
          </div>
          <span className="text-[10px] font-mono-telemetry uppercase tracking-[0.2em]">
            SCROLL
          </span>
        </a>
      </div>
    </section>
  );
};
