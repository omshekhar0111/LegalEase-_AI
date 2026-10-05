'use client';

import React from 'react';
import { Scale, Shield, HelpCircle, Lock, BookOpen, Key, Sparkles, FileText, ArrowRight } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#0B1220]/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveView('dashboard')}>
            {/* Custom Abstract Geometric LegalEase AI Logo */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#172554] to-[#0B1220] border border-[#5B7CFA]/30 flex items-center justify-center shadow-[0_0_15px_rgba(91,124,250,0.25)] group-hover:border-[#5B7CFA]/60 transition-all">
              <Scale className="w-5 h-5 text-[#5B7CFA]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4A72C] shadow-[0_0_8px_#D4A72C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">LegalEase<span className="text-[#5B7CFA]"> AI</span></span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30">
                  2030 Platform
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] hidden sm:block">
                Understand your documents · Prepare for your lawyer
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'dashboard'
                  ? 'bg-white/10 text-white font-semibold border border-white/15'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              Dashboard
            </button>

            {hasDocument && (
              <button
                onClick={() => setActiveView('viewer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeView === 'viewer'
                    ? 'bg-[#172554] text-[#5B7CFA] font-semibold border border-[#5B7CFA]/40 shadow-[0_0_12px_rgba(91,124,250,0.2)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#5B7CFA]" />
                Document Intelligence
              </button>
            )}

            <button
              onClick={onOpenLegalAid}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#94A3B8]" />
              Legal Aid Directory
            </button>

            <button
              onClick={onOpenPrivacy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
              Privacy Center
            </button>

            <button
              onClick={onOpenJudgeFaq}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#D4A72C] bg-[#D4A72C]/10 hover:bg-[#D4A72C]/20 border border-[#D4A72C]/30 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(212,167,44,0.15)]"
              title="Architecture & Differentiation for Evaluators"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#D4A72C]" />
              Judge Guide / FAQ
            </button>
          </div>

          {/* Quick Actions & Demo CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenApiKey}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                hasCustomKey
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                  : 'border-white/10 bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10'
              }`}
              title="Configure Gemini API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">
                {hasCustomKey ? 'Gemini Active' : 'API Settings'}
              </span>
            </button>

            <div className="relative group">
              <button
                onClick={() => onSelectDemo('employment')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#172554] via-[#1E293B] to-[#172554] hover:from-[#1E293B] hover:to-[#172554] text-white border border-[#5B7CFA]/50 shadow-[0_0_20px_rgba(91,124,250,0.3)] hover:shadow-[0_0_25px_rgba(91,124,250,0.5)] flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A72C] animate-pulse" />
                <span>Try Demo</span>
              </button>

              <div className="absolute right-0 mt-2 w-64 bg-[#0B1220]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 p-2 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
                  Sample Indian Documents
                </div>
                <button
                  onClick={() => onSelectDemo('employment')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-xs text-[#F8F6F1] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white">Employment Notice</div>
                    <div className="text-[10px] text-[#94A3B8]">Non-compete · Forfeiture · 7-day cutoff</div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-red-950/80 text-red-300 rounded border border-red-800">
                    P0 DEMO
                  </span>
                </button>
                <button
                  onClick={() => onSelectDemo('rental')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-xs text-[#F8F6F1] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white">Bangalore Rental Deed</div>
                    <div className="text-[10px] text-[#94A3B8]">10-month lock-in · Deposit risk</div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-blue-950/80 text-blue-300 rounded border border-blue-800">
                    TENANCY
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust disclaimer ribbon */}
      <div className="bg-[#0B1220]/90 border-t border-white/5 px-4 py-1 text-center">
        <p className="text-[11px] text-[#94A3B8] flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3 text-[#5B7CFA]" />
          <span>
            <strong className="text-[#F8F6F1]">LegalEase AI provides informational document assistance, not formal legal advice.</strong> For important decisions, consult a licensed advocate.
          </span>
        </p>
      </div>
    </header>
  );
};
