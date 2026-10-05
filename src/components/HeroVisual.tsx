'use client';

import React from 'react';
import { Scale, Sparkles, Gavel, ScrollText, CornerDownRight, Landmark, ShieldCheck } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto h-[430px] sm:h-[470px] flex items-center justify-center select-none pointer-events-none">
      {/* Background Radial Glow Spheres in Crimson and Antique Gold */}
      <div className="absolute w-72 h-72 rounded-full bg-[#E11D48]/20 blur-3xl animate-pulse-slow -top-10 -left-10" />
      <div className="absolute w-64 h-64 rounded-full bg-[#D4AF37]/15 blur-3xl animate-pulse-slow bottom-0 right-0" />
      <div className="absolute w-80 h-80 rounded-full bg-[#350814]/60 blur-2xl" />

      {/* Neural Constellation & Circuit Lines in Crimson */}
      <svg className="absolute inset-0 w-full h-full opacity-45" viewBox="0 0 500 500" fill="none">
        <defs>
          <linearGradient id="redLegalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E11D48" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Legal Geometric Lines */}
        <path d="M 50 130 L 150 210 L 250 170 L 370 230 L 450 170" stroke="#E11D48" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.5" />
        <path d="M 110 390 L 200 330 L 320 370 L 430 310" stroke="#E11D48" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.4" />
        <path d="M 250 70 L 250 170 L 250 330 L 250 430" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.3" />

        {/* Nodes */}
        <circle cx="50" cy="130" r="3.5" fill="#E11D48" className="animate-ping" style={{ animationDuration: '4s' }} />
        <circle cx="150" cy="210" r="3" fill="#E11D48" />
        <circle cx="250" cy="170" r="4.5" fill="#D4AF37" />
        <circle cx="370" cy="230" r="3.5" fill="#E11D48" />
        <circle cx="450" cy="170" r="3" fill="#E11D48" />
        <circle cx="200" cy="330" r="3" fill="#D4AF37" />
        <circle cx="320" cy="370" r="3" fill="#E11D48" />
      </svg>

      {/* Main 3D Floating Glass Legal Document Sheet (with Red Wax Seal Stamp) */}
      <div className="relative w-[310px] sm:w-[340px] h-[390px] rounded-2xl glass-panel-dark border border-red-500/30 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl animate-float overflow-hidden flex flex-col justify-between">
        {/* Animated Crimson Laser Scanning Line */}
        <div className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#E11D48] to-transparent animate-laser shadow-[0_0_15px_#E11D48]" />

        {/* Red Ribbon Top Accent */}
        <div className="absolute top-0 right-8 w-6 h-12 bg-gradient-to-b from-[#BE123C] to-[#E11D48] shadow-md clip-ribbon opacity-80" />

        {/* Top of Document Sheet */}
        <div>
          {/* Document Header Watermark */}
          <div className="flex items-center justify-between pb-3 border-b border-red-500/20 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#22060F] border border-red-500/40 flex items-center justify-center shadow-[0_0_8px_rgba(225,29,72,0.3)]">
                <Scale className="w-3.5 h-3.5 text-[#E11D48]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#E5DFD3] uppercase">
                LEGAL FOLIO RECORD
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#E11D48]/20 text-red-300 border border-red-500/40 font-bold flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-[#D4AF37]" /> ADJUDICATED
            </span>
          </div>

          {/* Abstract Legal Paragraph lines */}
          <div className="space-y-2 mb-3.5">
            <div className="h-2 w-3/4 bg-white/20 rounded-full" />
            <div className="h-2 w-full bg-white/10 rounded-full" />
            <div className="h-2 w-5/6 bg-white/10 rounded-full" />
          </div>

          {/* Highlighted Clause 7 Card (Floating inside document) */}
          <div className="p-3.5 rounded-xl bg-[#22060F]/85 border border-red-500/40 shadow-inner space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-red-300 flex items-center gap-1">
                <CornerDownRight className="w-3 h-3 text-[#E11D48]" /> Clause 7: Restraint of Trade
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-200 border border-red-700 font-bold">
                CRITICAL RADAR
              </span>
            </div>
            <p className="text-[10px] text-[#A1A1AA] leading-tight line-clamp-2 italic font-serif">
              &quot;...non-compete for 24 months across India...&quot;
            </p>
            <div className="text-[9px] text-[#D4AF37] font-mono flex items-center gap-1 pt-0.5">
              <Sparkles className="w-2.5 h-2.5" /> Void under Section 27, Contract Act 1872
            </div>
          </div>
        </div>

        {/* Bottom of Document: Extracted Deadlines & Red Wax Seal Icon */}
        <div className="pt-2.5 border-t border-red-500/20 flex items-center justify-between">
          <div className="flex-1 mr-3">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[#A1A1AA]">Statutory Response Window</span>
              <span className="font-mono text-red-400 font-bold">7 Days Cutoff</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#E11D48] to-[#D4AF37] h-full w-[70%] rounded-full shadow-[0_0_8px_#E11D48]" />
            </div>
          </div>

          {/* Red Wax Seal Graphic */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#991B1B] via-[#E11D48] to-[#7F1D1D] border-2 border-[#D4AF37]/60 shadow-[0_0_12px_rgba(225,29,72,0.6)] flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>
      </div>

      {/* Floating Holographic Badge 1: Top Right */}
      <div className="absolute -top-2 right-4 sm:-right-4 px-3.5 py-2.5 rounded-xl glass-card-dark border border-red-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-2.5 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping" />
        <div>
          <div className="text-[11px] font-bold text-white flex items-center gap-1">
            <Gavel className="w-3 h-3 text-[#D4AF37]" /> Evidence Traceability
          </div>
          <div className="text-[9px] text-[#A1A1AA] font-mono">Page 3 · Clause 7 Linked</div>
        </div>
      </div>

      {/* Floating Holographic Badge 2: Bottom Left */}
      <div className="absolute -bottom-4 left-2 sm:-left-6 px-3.5 py-2.5 rounded-xl glass-card-dark border border-[#D4AF37]/40 shadow-2xl flex items-center gap-2.5 animate-float" style={{ animationDelay: '3s' }}>
        <div className="p-1.5 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
          <Landmark className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">Gemini 2.5 Legal Reasoning</div>
          <div className="text-[9px] text-[#D4AF37] font-mono">Indian Statutory Graph</div>
        </div>
      </div>
    </div>
  );
};
