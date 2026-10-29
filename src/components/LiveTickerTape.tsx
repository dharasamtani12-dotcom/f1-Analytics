/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TELEMETRY_TICKER_ITEMS } from '../data/f1Data';

export const LiveTickerTape: React.FC = () => {
  return (
    <section className="w-full bg-[#ef233c] text-black py-3 overflow-hidden shadow-[0_0_30px_rgba(239,35,60,0.6)] relative z-20">
      <div className="flex items-center gap-4">
        {/* Fixed Red/Black Badge */}
        <div className="shrink-0 bg-black text-white px-3.5 py-1 ml-4 rounded font-mono-telemetry text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          LIVE DATA
        </div>

        {/* Marquee Wrapper */}
        <div className="ticker-wrap w-full font-mono-telemetry text-xs font-black uppercase tracking-wider select-none">
          <div className="ticker-move flex items-center gap-8 text-black">
            {TELEMETRY_TICKER_ITEMS.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-white transition-colors cursor-default whitespace-nowrap">
                  {item}
                </span>
                <span className="opacity-60">•</span>
              </React.Fragment>
            ))}
            {/* Duplicate for infinite seamless scroll */}
            {TELEMETRY_TICKER_ITEMS.map((item, idx) => (
              <React.Fragment key={`dup-${idx}`}>
                <span className="hover:text-white transition-colors cursor-default whitespace-nowrap">
                  {item}
                </span>
                <span className="opacity-60">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
