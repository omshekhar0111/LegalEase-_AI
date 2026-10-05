'use client';

import React from 'react';
import { Shield, Sparkles, Scale, CheckCircle2, FileText, CornerDownRight, Cpu } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto h-[420px] sm:h-[460px] flex items-center justify-center select-none pointer-events-none">
      {/* Background Radial Glow Spheres */}
      <div className="absolute w-72 h-72 rounded-full bg-[#5B7CFA]/15 blur-3xl animate-pulse-slow -top-10 -left-10" />
      <div className="absolute w-64 h-64 rounded-full bg-[#D4A72C]/10 blur-3xl animate-pulse-slow bottom-0 right-0" />
      <div className="absolute w-80 h-80 rounded-full bg-[#172554]/40 blur-2xl" />

      {/* Neural Constellation SVG Background */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 500 500" fill="none">
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4A72C" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Neural Network Circuit Lines */}
        <path d="M 60 140 L 160 220 L 250 180 L 380 240 L 440 180" stroke="#5B7CFA" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
        <path d="M 120 380 L 200 320 L 320 360 L 420 300" stroke="#5B7CFA" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3" />
        <path d="M 250 80 L 250 180 L 250 320 L 250 420" stroke="#D4A72C" strokeWidth="1" strokeOpacity="0.25" />

        {/* Constellation Nodes */}
        <circle cx="60" cy="140" r="3" fill="#5B7CFA" className="animate-ping" style={{ animationDuration: '4s' }} />
        <circle cx="160" cy="220" r="3" fill="#5B7CFA" />
        <circle cx="250" cy="180" r="4" fill="#D4A72C" />
        <circle cx="380" cy="240" r="3.5" fill="#5B7CFA" />
        <circle cx="440" cy="180" r="2.5" fill="#5B7CFA" />
        <circle cx="200" cy="320" r="3" fill="#D4A72C" />
        <circle cx="320" cy="360" r="3" fill="#5B7CFA" />
      </svg>

      {/* Main 3D Floating Glass Legal Document Sheet */}
      <div className="relative w-[310px] sm:w-[340px] h-[380px] rounded-2xl glass-panel-dark border border-white/15 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-float overflow-hidden flex flex-col justify-between">
        {/* Animated Laser Scanning Line */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5B7CFA] to-transparent animate-laser shadow-[0_0_12px_#5B7CFA]" />

        {/* Top of Document Sheet */}
        <div>
          {/* Document Header Watermark */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#172554] border border-[#5B7CFA]/30 flex items-center justify-center">
                <Scale className="w-3.5 h-3.5 text-[#5B7CFA]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                INSTRUMENT #2026-IN
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#D4A72C]/15 text-[#D4A72C] border border-[#D4A72C]/30 font-bold">
              VERIFIED
            </span>
          </div>

          {/* Abstract Paragraph lines */}
          <div className="space-y-2 mb-3">
            <div className="h-2 w-3/4 bg-white/20 rounded-full" />
            <div className="h-2 w-full bg-white/10 rounded-full" />
            <div className="h-2 w-5/6 bg-white/10 rounded-full" />
          </div>

          {/* Highlighted Clause 7 Card (Floating inside document) */}
          <div className="p-3 rounded-xl bg-[#172554]/60 border border-[#5B7CFA]/40 shadow-inner space-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#5B7CFA] flex items-center gap-1">
                <CornerDownRight className="w-3 h-3" /> Clause 7: Restraint of Trade
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 border border-red-800">
                CRITICAL
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] leading-tight line-clamp-2">
              &quot;...non-compete for 24 months across India...&quot;
            </p>
            <div className="text-[9px] text-[#D4A72C] font-mono flex items-center gap-1 pt-0.5">
              <Sparkles className="w-2.5 h-2.5" /> Flagged under Section 27, Contract Act 1872
            </div>
          </div>
        </div>

        {/* Bottom of Document: Extracted Deadlines */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#94A3B8]">Response Window</span>
            <span className="font-mono text-[#F8F6F1] font-bold text-[#5B7CFA]">7 Days Remaining</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#5B7CFA] to-[#D4A72C] h-full w-[70%] rounded-full shadow-[0_0_8px_#5B7CFA]" />
          </div>
        </div>
      </div>

      {/* Floating Holographic Badge 1: Top Right */}
      <div className="absolute -top-2 right-4 sm:-right-4 px-3.5 py-2 rounded-xl glass-card-dark border border-white/15 shadow-xl flex items-center gap-2 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="w-2 h-2 rounded-full bg-[#5B7CFA] animate-ping" />
        <div>
          <div className="text-[11px] font-bold text-[#F8F6F1]">Evidence Traceability</div>
          <div className="text-[9px] text-[#94A3B8] font-mono">Page 3 · Clause 7 Linked</div>
        </div>
      </div>

      {/* Floating Holographic Badge 2: Bottom Left */}
      <div className="absolute -bottom-4 left-2 sm:-left-6 px-3.5 py-2.5 rounded-xl glass-card-dark border border-[#D4A72C]/30 shadow-2xl flex items-center gap-2.5 animate-float" style={{ animationDelay: '3s' }}>
        <div className="p-1.5 rounded-lg bg-[#D4A72C]/15 text-[#D4A72C] border border-[#D4A72C]/30">
          <Cpu className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-[#F8F6F1]">Gemini 2.5 Flash</div>
          <div className="text-[9px] text-[#D4A72C] font-mono">16 Structured Vectors</div>
        </div>
      </div>
    </div>
  );
};
