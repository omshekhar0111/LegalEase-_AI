'use client';

import React from 'react';
import {
  FileText,
  AlertOctagon,
  Calendar,
  CheckCircle2,
  Briefcase,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Shield,
  Layers,
  UploadCloud,
  FileCheck
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner / Welcome */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Active Legal Analysis
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Jurisdiction: {currentAnalysis.metadata.jurisdiction}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {currentAnalysis.metadata.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {currentAnalysis.parties.map((p) => `${p.name} (${p.role})`).join(' · ')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenViewer}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Open Interactive Viewer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenLawyerBrief}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-slate-600" />
            <span>Consultation Brief</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{criticalIssues.length}</div>
            <div className="text-xs text-slate-500 font-medium">Attention Items</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{currentAnalysis.deadlines.length}</div>
            <div className="text-xs text-slate-500 font-medium">Detected Deadlines</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{currentAnalysis.clauses.length}</div>
            <div className="text-xs text-slate-500 font-medium">Mapped Clauses</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{currentAnalysis.actionPlan.documentActions.length}</div>
            <div className="text-xs text-slate-500 font-medium">Action Checklist</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Attention Items & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top Attention Radar Items (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <span>Priority Attention Items (Non-Arbitrary Radar)</span>
            </h2>
            <button
              onClick={onOpenViewer}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              View all {currentAnalysis.issues.length} flags →
            </button>
          </div>

          <div className="space-y-3">
            {criticalIssues.slice(0, 3).map((iss) => (
              <div
                key={iss.id}
                onClick={onOpenViewer}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Page {iss.pageNumber} · {iss.clauseRef}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    Critical
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{iss.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{iss.whyItMatters}</p>
                {iss.statutoryReference && (
                  <div className="mt-2 text-[11px] text-indigo-700 font-medium">
                    Statutory reference: {iss.statutoryReference}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Action Plan Snapshot */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Next Steps Checklist</span>
              </h3>
              <button onClick={onOpenViewer} className="text-xs text-indigo-600 font-medium">
                Open full checklist →
              </button>
            </div>
            <div className="space-y-2">
              {currentAnalysis.actionPlan.documentActions.slice(0, 3).map((act) => (
                <div key={act.id} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{act.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Quick Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Upcoming Deadlines</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Chronological</span>
          </div>

          <div className="space-y-2.5">
            {currentAnalysis.deadlines.map((dl) => (
              <div key={dl.id} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {dl.dueDateFormatted}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Page {dl.sourcePage}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">{dl.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{dl.calculationBasis}</div>
              </div>
            ))}
          </div>

          {/* Quick Hand-Off Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold">Advocate Consultation Ready</h3>
            </div>
            <p className="text-xs text-slate-300">
              Generated questions, key clauses, and matter summary ready to be exported to a standardized PDF brief.
            </p>
            <button
              onClick={onOpenLawyerBrief}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              Export Consultation Brief (PDF)
            </button>
          </div>

          {/* Legal Aid Quick Button */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
            <div>
              <div className="font-bold">NALSA / State Legal Aid</div>
              <div className="text-[11px] text-emerald-800">Helpline: 15100</div>
            </div>
            <button
              onClick={onOpenLegalAid}
              className="px-2.5 py-1 rounded bg-white text-emerald-800 border border-emerald-300 font-medium hover:bg-emerald-100"
            >
              Check Aid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
