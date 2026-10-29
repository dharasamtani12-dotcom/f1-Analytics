/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Team Strategist',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-[#12161f] border border-[#ef233c]/50 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-fade-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close Contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Evaluation Submission Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-telemetry font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Project Status: Ready for Evaluation</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black font-chakra uppercase text-white mb-1">
          F1 Race Intelligence Inquiry
        </h3>
        <p className="text-xs font-mono-telemetry text-zinc-400 mb-6">
          Author: <span className="text-white font-bold">Dhara Samtani</span> • Formula 1 BI Analytical Platform
        </p>

        {submitted ? (
          <div className="py-8 text-center space-y-4 font-mono-telemetry animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-chakra uppercase text-white">
              Telemetry Dispatch Sent!
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Thank you for reviewing the Formula 1 Race Intelligence analytical suite. Your inquiry has been logged for evaluation.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#ef233c] text-white font-chakra uppercase font-bold text-xs"
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono-telemetry text-xs">
            <div>
              <label className="block text-zinc-400 uppercase text-[10px] mb-1 font-semibold">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Elena Rostova"
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ef233c]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[10px] mb-1 font-semibold">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="strategist@pitwall.f1.com"
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ef233c]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[10px] mb-1 font-semibold">
                Stakeholder Persona
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ef233c]"
              >
                <option value="F1 Team Performance Strategist">F1 Team Performance Strategist</option>
                <option value="Motorsport Broadcast Analyst">Motorsport Broadcast Analyst</option>
                <option value="FIA Technical Regulation Analyst">FIA Technical Regulation Analyst</option>
                <option value="Academic / Portfolio Evaluator">Academic / Portfolio Evaluator</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 uppercase text-[10px] mb-1 font-semibold">
                Telemetry Evaluation Notes or Feedback
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Inquire about custom telemetry integration, Tableau workbook assets, or race modeling algorithms..."
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ef233c] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#ef233c] hover:bg-red-600 text-white font-chakra font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,35,60,0.5)] transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Evaluation Message
            </button>
          </form>
        )}

        {/* Quick Links */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono-telemetry text-[11px] text-zinc-400">
          <span>Author: Dhara Samtani</span>
          <a
            href="https://public.tableau.com/views/f1_Dashboard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ef233c] hover:underline flex items-center gap-1 font-bold"
          >
            Tableau Dashboard <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
