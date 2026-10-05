'use client';

import React from 'react';
import {
  FileText,
  AlertOctagon,
  Calendar,
  CheckCircle2,
  Briefcase,
  ArrowRight,
  Clock,
  Layers,
  FileCheck,
  Scale,
  Gavel,
  Landmark,
  ScrollText
} from 'lucide-react';
import { FullLegalAnalysis } from '@/types/legal';

interface DashboardOverviewProps {
  currentAnalysis: FullLegalAnalysis | null;
  onOpenViewer: () => void;
  onUploadNew: () => void;
  onSelectDemo: (demoId: 'employment' | 'rental') => void;
  onOpenLawyerBrief: () => void;
  onOpenPrivacy: () => void;
  onOpenLegalAid: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentAnalysis,
  onOpenViewer,
  onUploadNew,
  onSelectDemo,
  onOpenLawyerBrief,
  onOpenPrivacy,
  onOpenLegalAid,
}) => {
  if (!currentAnalysis) {
    return null;
  }

  const criticalIssues = currentAnalysis.issues.filter(
    (i) => i.category === 'critical_attention' || i.category === 'high_attention'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn text-[#FAF7F2]">
      {/* Top Banner / Welcome */}
      <div className="glass-card-dark rounded-2xl border border-red-500/25 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#22060F] text-red-300 border border-red-500/40 font-mono flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
              Active Legal Folio Analysis
            </span>
            <span className="text-xs text-[#A1A1AA] font-mono">
              Jurisdiction: {currentAnalysis.metadata.jurisdiction}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {currentAnalysis.metadata.title}
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-1.5 font-mono">
            {currentAnalysis.parties.map((p) => `${p.name} (${p.role})`).join(' · ')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenViewer}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#991B1B] via-[#E11D48] to-[#991B1B] hover:from-[#BE123C] hover:to-[#991B1B] text-white border border-red-500/50 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] transition-all cursor-pointer"
          >
            <span>Open Interactive Viewer</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onOpenLawyerBrief}
            className="px-4 py-2.5 rounded-xl border border-red-500/30 bg-[#22060F]/60 hover:bg-[#22060F] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-[#D4AF37]" />
            <span>Consultation Brief</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card-dark border border-red-500/20 shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-950/70 text-red-300 border border-red-700">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{criticalIssues.length}</div>
            <div className="text-xs text-[#A1A1AA] font-medium">Attention Items</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card-dark border border-red-500/20 shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-950/70 text-[#D4AF37] border border-amber-800">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{currentAnalysis.deadlines.length}</div>
            <div className="text-xs text-[#A1A1AA] font-medium">Detected Deadlines</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card-dark border border-red-500/20 shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#22060F] text-[#E11D48] border border-red-500/40">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{currentAnalysis.clauses.length}</div>
            <div className="text-xs text-[#A1A1AA] font-medium">Mapped Clauses</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card-dark border border-red-500/20 shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-950/70 text-emerald-300 border border-emerald-800">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{currentAnalysis.actionPlan.documentActions.length}</div>
            <div className="text-xs text-[#A1A1AA] font-medium">Action Checklist</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Attention Items & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top Attention Radar Items (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-[#E11D48]" />
              <span>Priority Attention Items (Non-Arbitrary Radar)</span>
            </h2>
            <button
              onClick={onOpenViewer}
              className="text-xs text-red-300 hover:text-white font-semibold cursor-pointer"
            >
              View all {currentAnalysis.issues.length} flags →
            </button>
          </div>

          <div className="space-y-3">
            {criticalIssues.slice(0, 3).map((iss) => (
              <div
                key={iss.id}
                onClick={onOpenViewer}
                className="p-5 rounded-2xl glass-card-dark border border-red-500/20 hover:border-red-500/50 transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-black/40 text-[#FAF7F2] border border-red-500/30">
                    Page {iss.pageNumber} · {iss.clauseRef}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-950 text-red-200 border border-red-700">
                    Critical
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{iss.title}</h3>
                <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">{iss.whyItMatters}</p>
                {iss.statutoryReference && (
                  <div className="mt-2.5 text-[11px] text-[#D4AF37] font-medium flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Statutory reference: {iss.statutoryReference}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Action Plan Snapshot */}
          <div className="glass-card-dark rounded-2xl border border-red-500/20 p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Next Steps Checklist</span>
              </h3>
              <button onClick={onOpenViewer} className="text-xs text-red-300 font-medium hover:underline cursor-pointer">
                Open full checklist →
              </button>
            </div>
            <div className="space-y-2">
              {currentAnalysis.actionPlan.documentActions.slice(0, 3).map((act) => (
                <div key={act.id} className="text-xs text-[#FAF7F2] flex items-start gap-2.5 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-1.5 shrink-0" />
                  <span>{act.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Quick Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Upcoming Deadlines</span>
            </h2>
            <span className="text-[11px] text-[#A1A1AA] font-mono">Chronological</span>
          </div>

          <div className="space-y-3">
            {currentAnalysis.deadlines.map((dl) => (
              <div key={dl.id} className="p-4 rounded-2xl glass-card-dark border border-red-500/20 shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-amber-200 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E11D48]" />
                    {dl.dueDateFormatted}
                  </span>
                  <span className="text-[10px] text-[#A1A1AA] font-mono">Page {dl.sourcePage}</span>
                </div>
                <div className="text-xs font-bold text-white mt-1">{dl.title}</div>
                <div className="text-[11px] text-[#A1A1AA] mt-0.5">{dl.calculationBasis}</div>
              </div>
            ))}
          </div>

          {/* Quick Hand-Off Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#350814] via-[#1C060D] to-[#0F0307] border border-red-500/40 text-white space-y-3 shadow-xl">
            <div className="flex items-center gap-2">
              <Gavel className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider">Advocate Consultation Ready</h3>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Generated questions, key clauses, and matter summary ready to be exported to a standardized PDF brief.
            </p>
            <button
              onClick={onOpenLawyerBrief}
              className="w-full py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all cursor-pointer"
            >
              Export Consultation Brief (PDF)
            </button>
          </div>

          {/* Legal Aid Quick Button */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">NALSA / State Legal Aid</div>
              <div className="text-[11px] text-emerald-300 font-mono">Toll-free: 15100</div>
            </div>
            <button
              onClick={onOpenLegalAid}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-xs transition-colors cursor-pointer"
            >
              Check Aid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
