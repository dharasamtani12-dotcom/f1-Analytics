/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trophy, Flag, Zap, Activity } from 'lucide-react';

export const SecondaryStatRibbon: React.FC = () => {
  const stats = [
    {
      icon: <Trophy className="text-[#ef233c] w-5 h-5 drop-shadow-[0_0_8px_rgba(239,35,60,0.6)]" />,
      value: '897',
      unit: '',
      label: 'TOTAL RACE ENTRIES',
      valueColor: 'text-white',
    },
    {
      icon: <Flag className="text-[#ef233c] w-5 h-5 drop-shadow-[0_0_8px_rgba(239,35,60,0.6)]" />,
      value: '33',
      unit: '',
      label: 'CHAMPIONSHIP TITLES',
      valueColor: 'text-white',
    },
    {
      icon: <Zap className="text-[#ef233c] w-5 h-5 drop-shadow-[0_0_8px_rgba(239,35,60,0.6)]" />,
      value: '372',
      unit: 'KM/H',
      label: 'TOP SPEED RECORD',
      valueColor: 'text-[#ef233c]',
    },
    {
      icon: <Activity className="text-[#ef233c] w-5 h-5 drop-shadow-[0_0_8px_rgba(239,35,60,0.6)]" />,
      value: '15',
      unit: '',
      label: 'KPIS VISUALIZED',
      valueColor: 'text-white',
    },
  ];

  return (
    <section className="w-full bg-[#0d1017] border-y border-[#262c38] py-8 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center divide-x-0 md:divide-x divide-white/5">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2 group">
              <div className="flex items-center gap-2 mb-1.5 transition-transform group-hover:scale-105">
                {item.icon}
                <span className={`text-3xl md:text-4xl font-black font-mono-telemetry ${item.valueColor}`}>
                  {item.value}
                </span>
                {item.unit && (
                  <span className="text-xs font-mono-telemetry font-bold text-zinc-400 tracking-wider">
                    {item.unit}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono-telemetry uppercase text-zinc-400 tracking-widest font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
