'use client';

import React from 'react';
import { Scale, Shield, HelpCircle, Lock, BookOpen, Key, Sparkles, FileText, Gavel, Award } from 'lucide-react';

interface NavbarProps {
  onOpenPrivacy: () => void;
  onOpenLegalAid: () => void;
  onOpenJudgeFaq: () => void;
  onOpenApiKey: () => void;
  onSelectDemo: (demoId: 'employment' | 'rental') => void;
  activeView: 'dashboard' | 'viewer';
  setActiveView: (view: 'dashboard' | 'viewer') => void;
  hasDocument: boolean;
  hasCustomKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPrivacy,
  onOpenLegalAid,
  onOpenJudgeFaq,
  onOpenApiKey,
  onSelectDemo,
  activeView,
  setActiveView,
  hasDocument,
  hasCustomKey,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F0307]/90 backdrop-blur-xl border-b border-red-500/20 transition-colors shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Legal Seal */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveView('dashboard')}>
            {/* Custom Crimson Wax Seal Logo */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#991B1B] via-[#E11D48] to-[#7F1D1D] border-2 border-[#D4AF37]/70 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.5)] group-hover:scale-105 transition-all">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#D4AF37] border-2 border-[#0F0307] shadow-[0_0_6px_#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">LegalEase<span className="text-[#E11D48]"> AI</span></span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#22060F] text-red-300 border border-red-500/40">
                  Legal Intelligence
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] hidden sm:block">
                Understand your documents · Prepare for your lawyer
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeView === 'dashboard'
                  ? 'bg-white/10 text-white font-semibold border border-red-500/30 shadow-[0_0_10px_rgba(225,29,72,0.15)]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              Dashboard
            </button>

            {hasDocument && (
              <button
                onClick={() => setActiveView('viewer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeView === 'viewer'
                    ? 'bg-[#22060F] text-red-300 font-semibold border border-red-500/50 shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#E11D48]" />
                Document Intelligence
              </button>
            )}

            <button
              onClick={onOpenLegalAid}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#A1A1AA]" />
              Legal Aid Directory
            </button>

            <button
              onClick={onOpenPrivacy}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#A1A1AA]" />
              Privacy Center
            </button>

            <button
              onClick={onOpenJudgeFaq}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(212,175,55,0.2)]"
              title="Architecture & Differentiation for Evaluators"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              Judge Guide / FAQ
            </button>
          </div>

          {/* Quick Actions & Demo CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenApiKey}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-all ${
                hasCustomKey
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : 'border-white/10 bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10'
              }`}
              title="Configure Gemini API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">
                {hasCustomKey ? 'Gemini Active' : 'API Key'}
              </span>
            </button>

            <div className="relative group">
              <button
                onClick={() => onSelectDemo('employment')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#991B1B] via-[#E11D48] to-[#991B1B] hover:from-[#BE123C] hover:to-[#991B1B] text-white border border-red-500/50 shadow-[0_0_20px_rgba(225,29,72,0.45)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] flex items-center gap-2 transition-all cursor-pointer"
              >
                <Gavel className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Try Demo</span>
              </button>

              <div className="absolute right-0 mt-2 w-64 bg-[#0F0307]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-red-500/30 p-2 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">
                  Sample Indian Documents
                </div>
                <button
                  onClick={() => onSelectDemo('employment')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-xs text-[#FAF7F2] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white">Employment Notice</div>
                    <div className="text-[10px] text-[#A1A1AA]">Non-compete · Forfeiture · 7-day cutoff</div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-red-950 text-red-300 rounded border border-red-800">
                    P0 DEMO
                  </span>
                </button>
                <button
                  onClick={() => onSelectDemo('rental')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-xs text-[#FAF7F2] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white">Bangalore Rental Deed</div>
                    <div className="text-[10px] text-[#A1A1AA]">10-month lock-in · Deposit risk</div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-[#22060F] text-red-300 rounded border border-red-800">
                    TENANCY
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust disclaimer ribbon */}
      <div className="bg-[#0F0307]/90 border-t border-white/5 px-4 py-1 text-center">
        <p className="text-[11px] text-[#A1A1AA] flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3 text-[#E11D48]" />
          <span>
            <strong className="text-white">LegalEase AI provides informational document assistance, not formal legal advice.</strong> For important decisions, consult a licensed advocate.
          </span>
        </p>
      </div>
    </header>
  );
};
