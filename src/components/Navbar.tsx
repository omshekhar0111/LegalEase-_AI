'use client';

import React from 'react';
import { Scale, Shield, HelpCircle, Lock, BookOpen, Key, Sparkles, FileText } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Scale className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">LegalEase AI</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  India Legal Tech
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Understand your documents · Prepare for your lawyer
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>

            {hasDocument && (
              <button
                onClick={() => setActiveView('viewer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeView === 'viewer'
                    ? 'bg-indigo-50 text-indigo-900 font-semibold border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Document Intelligence
              </button>
            )}

            <button
              onClick={onOpenLegalAid}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              Legal Aid Directory
            </button>

            <button
              onClick={onOpenPrivacy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Privacy Center
            </button>

            <button
              onClick={onOpenJudgeFaq}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center gap-1.5"
              title="Architecture & Differentiation for Evaluators"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              Judge Guide / Architecture
            </button>
          </div>

          {/* Quick Actions & Demo CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenApiKey}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                hasCustomKey
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Configure Gemini API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">
                {hasCustomKey ? 'Gemini Key Active' : 'API Settings'}
              </span>
            </button>

            <div className="relative group">
              <button
                onClick={() => onSelectDemo('employment')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Try Demo</span>
              </button>

              <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 hidden group-hover:block z-50">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Sample Indian Documents
                </div>
                <button
                  onClick={() => onSelectDemo('employment')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-800 hover:bg-indigo-50 hover:text-indigo-900 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">Employment Notice</div>
                    <div className="text-[10px] text-slate-500">Non-compete · Forfeiture · 7-day cutoff</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-mono">P0 Demo</span>
                </button>
                <button
                  onClick={() => onSelectDemo('rental')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-800 hover:bg-indigo-50 hover:text-indigo-900 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">Bangalore Rental Agreement</div>
                    <div className="text-[10px] text-slate-500">10-month lock-in · Deposit risk</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-mono">Tenancy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust disclaimer ribbon */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 py-1 text-center">
        <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3 text-slate-400" />
          <span>
            <strong>LegalEase AI provides informational document assistance, not formal legal advice.</strong> For important legal decisions, consult a licensed advocate.
          </span>
        </p>
      </div>
    </header>
  );
};
