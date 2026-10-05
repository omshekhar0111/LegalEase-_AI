'use client';

import React, { useState } from 'react';
import {
  AlertOctagon,
  Calendar,
  Layers,
  FileCheck,
  MessageSquare,
  ArrowRight,
  Copy,
  Check,
  Clock,
  Bell,
  Scale,
  Send,
  Briefcase,
  GitCompare,
  FileQuestion,
  Sparkles,
  Gavel,
  ScrollText
} from 'lucide-react';
import {
  FullLegalAnalysis,
  ChatMessage,
} from '@/types/legal';

interface AnalysisPanelProps {
  analysis: FullLegalAnalysis;
  onNavigateToSource: (page: number, clauseRef?: string) => void;
  onOpenLawyerBrief: () => void;
  onOpenLegalAid: () => void;
  customApiKey?: string;
}

type TabType = 'radar' | 'clauses' | 'deadlines' | 'contradictions' | 'nextsteps' | 'chat';

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  analysis,
  onNavigateToSource,
  onOpenLawyerBrief,
  onOpenLegalAid,
  customApiKey,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('radar');
  const [clauseFilter, setClauseFilter] = useState<string>('all');
  const [radarFilter, setRadarFilter] = useState<string>('all');
  const [copiedQuestions, setCopiedQuestions] = useState<boolean>(false);
  const [actionStates, setActionStates] = useState<Record<string, boolean>>({});
  const [reminderStates, setReminderStates] = useState<Record<string, boolean>>({});

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Salutations. I have extracted and verified **${analysis.metadata.title}** under ${analysis.metadata.jurisdiction} jurisdiction.\n\nYou can inquire about specific clauses, compute statutory deadlines, or inspect flagged risks like the 24-month non-compete restraint. All responses are anchored directly in document evidence and Indian statutory law.`,
      sourceBadge: {
        type: 'document',
        pageNumber: 1,
        sourceName: 'Extracted Analysis'
      },
      confidence: 'high'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const toggleAction = (id: string) => {
    setActionStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleReminder = (id: string) => {
    setReminderStates((prev) => {
      const next = !prev[id];
      if (next && typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'default') {
          Notification.requestPermission();
        }
      }
      return { ...prev, [id]: next };
    });
  };

  const handleCopyQuestions = () => {
    const text = analysis.actionPlan.questionsForLawyer
      .map((q, idx) => `${idx + 1}. ${q.question}\n   (Context: ${q.rationale})`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2500);
  };

  const handleSendChat = async (questionText?: string) => {
    const query = questionText || chatInput;
    if (!query.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (customApiKey) {
        headers['x-gemini-api-key'] = customApiKey;
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          question: query,
          history: chatMessages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          context: analysis
        })
      });

      const data = await res.json();
      if (data.reply) {
        const assistantMsg: ChatMessage = {
          id: 'asst-' + Date.now(),
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: data.reply,
          sourceBadge: data.pageNumber
            ? {
                type: 'document',
                pageNumber: data.pageNumber,
                clauseRef: data.clauseRef,
                sourceName: `Page ${data.pageNumber}`
              }
            : undefined,
          confidence: 'high',
          suggestedActions: data.suggestedActions
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: 'asst-err-' + Date.now(),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'I encountered a brief connection issue. Please check the Radar and Clauses tabs for verified extractions.',
        confidence: 'low'
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const filteredIssues = analysis.issues.filter((iss) => {
    if (radarFilter === 'all') return true;
    return iss.category === radarFilter;
  });

  const filteredClauses = analysis.clauses.filter((c) => {
    if (clauseFilter === 'all') return true;
    return c.category === clauseFilter;
  });

  return (
    <div className="flex flex-col h-full bg-[#0F0307] text-[#FAF7F2]">
      {/* Top Header & Tab Navigation */}
      <div className="border-b border-red-500/20 bg-[#0F0307]/90 backdrop-blur-md">
        <div className="px-4 py-3 flex items-center justify-between border-b border-red-500/10">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Gavel className="w-4 h-4 text-[#D4AF37]" />
              <span>Legal Intelligence Analysis</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#22060F] text-red-300 border border-red-500/40">
                {analysis.metadata.jurisdiction}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLawyerBrief}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#991B1B] via-[#E11D48] to-[#991B1B] hover:from-[#BE123C] hover:to-[#991B1B] text-white border border-red-500/50 shadow-[0_0_15px_rgba(225,29,72,0.35)] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Generate Brief</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex overflow-x-auto px-3 space-x-1.5 scrollbar-none py-2 text-xs">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-[#E11D48] text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-white" />
            <span>Attention Radar</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-white font-mono">
              {analysis.issues.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('clauses')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'clauses'
                ? 'bg-[#22060F] text-red-300 font-bold border border-red-500/50 shadow-[0_0_12px_rgba(225,29,72,0.3)]'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Clauses</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-red-300 font-mono">
              {analysis.clauses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'deadlines'
                ? 'bg-amber-950 text-amber-200 font-bold border border-amber-800 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Deadlines</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-amber-300 font-mono">
              {analysis.deadlines.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contradictions')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'contradictions'
                ? 'bg-purple-950 text-purple-200 font-bold border border-purple-800 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-400" />
            <span>Contradictions</span>
            {(analysis.contradictions.length > 0 || analysis.missingInformation.length > 0) && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-purple-300 font-mono">
                {analysis.contradictions.length + analysis.missingInformation.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('nextsteps')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'nextsteps'
                ? 'bg-emerald-950 text-emerald-200 font-bold border border-emerald-800 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next Steps</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#22060F] text-red-300 font-bold border border-red-500/50 shadow-[0_0_15px_rgba(225,29,72,0.35)]'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Ask LegalEase</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {/* ================= TAB 1: ATTENTION RADAR ================= */}
        {activeTab === 'radar' && (
          <div className="space-y-4">
            {/* Radar Philosophy Note */}
            <div className="p-3.5 rounded-2xl glass-card-dark border border-red-500/20 text-xs text-[#A1A1AA] flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Non-Arbitrary Attention Radar:</strong> Rather than an ungrounded &quot;Risk Score = 82/100&quot;, LegalEase maps specific clauses to potential imbalances, Indian statutory provisions (e.g. Section 27 Contract Act), and questions for your advocate.
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setRadarFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  radarFilter === 'all'
                    ? 'bg-white text-slate-900 font-bold'
                    : 'bg-white/5 text-[#A1A1AA] hover:text-white border border-white/10'
                }`}
              >
                All Issues ({analysis.issues.length})
              </button>
              <button
                onClick={() => setRadarFilter('critical_attention')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  radarFilter === 'critical_attention'
                    ? 'bg-[#E11D48] text-white font-bold shadow-[0_0_10px_rgba(225,29,72,0.4)]'
                    : 'bg-red-950/70 text-red-300 border border-red-800'
                }`}
              >
                🔴 Critical
              </button>
              <button
                onClick={() => setRadarFilter('high_attention')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  radarFilter === 'high_attention'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-amber-950/70 text-amber-300 border border-amber-800'
                }`}
              >
                🟠 High
              </button>
              <button
                onClick={() => setRadarFilter('review')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  radarFilter === 'review'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-blue-950/70 text-blue-300 border border-blue-800'
                }`}
              >
                🟡 Review
              </button>
            </div>

            {/* Issue Cards */}
            <div className="space-y-3.5">
              {filteredIssues.map((issue) => {
                const isCritical = issue.category === 'critical_attention';
                const isHigh = issue.category === 'high_attention';

                return (
                  <div
                    key={issue.id}
                    className={`rounded-2xl border p-4 transition-all shadow-md ${
                      isCritical
                        ? 'border-red-600/70 bg-[#22060F]/85 hover:border-red-500 shadow-[0_4px_20px_rgba(225,29,72,0.2)]'
                        : isHigh
                        ? 'border-amber-700/60 bg-amber-950/30 hover:border-amber-600 shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-black/40 text-[#FAF7F2] border border-red-500/30">
                          Page {issue.pageNumber} · {issue.clauseRef}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-red-950 text-red-200 border border-red-700'
                            : isHigh
                            ? 'bg-amber-950 text-amber-200 border border-amber-700'
                            : 'bg-blue-950 text-blue-200 border border-blue-700'
                        }`}>
                          {isCritical ? 'Critical Attention' : isHigh ? 'High Attention' : 'Review Required'}
                        </span>
                      </div>

                      {/* Jump to Evidence Button */}
                      <button
                        onClick={() => onNavigateToSource(issue.pageNumber, issue.clauseRef)}
                        className="text-xs font-bold text-red-300 hover:text-white flex items-center gap-1 shrink-0 bg-[#22060F] border border-red-500/40 px-2.5 py-1 rounded-lg hover:border-red-400 transition-all cursor-pointer shadow-xs"
                      >
                        <span>View Source</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#E11D48]" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2">
                      {issue.title}
                    </h3>

                    {/* Excerpt */}
                    <div className="p-3 rounded-xl bg-black/40 border border-red-500/15 text-xs font-serif text-[#FAF7F2]/90 italic mb-3">
                      &quot;{issue.sourceSnippet}&quot;
                    </div>

                    {/* 5-Point Transparent Structure */}
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <strong className="text-white">What was detected:</strong>{' '}
                        <span className="text-[#A1A1AA]">{issue.detectedIssue}</span>
                      </div>

                      <div>
                        <strong className="text-white">Why might it matter:</strong>{' '}
                        <span className="text-[#A1A1AA]">{issue.whyItMatters}</span>
                      </div>

                      {issue.statutoryReference && (
                        <div className="p-2.5 rounded-xl bg-[#22060F] border border-red-500/35 text-[#FAF7F2] text-[11px] shadow-xs">
                          <strong className="text-[#D4AF37]">Indian Legal Reference:</strong> {issue.statutoryReference}
                        </div>
                      )}

                      {issue.missingContext && (
                        <div className="text-[11px] text-[#A1A1AA]">
                          <strong className="text-white">Missing Context:</strong> {issue.missingContext}
                        </div>
                      )}

                      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-[11px]">
                        <strong>Question for Lawyer:</strong> {issue.professionalConsultReason}
                      </div>

                      {/* Safe Wording Disclaimer */}
                      <div className="text-[10px] text-[#A1A1AA]/60 italic pt-1 border-t border-white/5">
                        {issue.disclaimer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: CLAUSES ================= */}
        {activeTab === 'clauses' && (
          <div className="space-y-4">
            {/* Clause Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { key: 'all', label: 'All Clauses' },
                { key: 'termination', label: 'Termination' },
                { key: 'notice_period', label: 'Notice Period' },
                { key: 'restrictive_provisions', label: 'Non-Compete' },
                { key: 'salary', label: 'Salary & Dues' },
                { key: 'penalties', label: 'Penalties' },
                { key: 'jurisdiction', label: 'Jurisdiction' }
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setClauseFilter(c.key)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    clauseFilter === c.key
                      ? 'bg-white text-slate-900 font-bold'
                      : 'bg-white/5 text-[#A1A1AA] hover:text-white border border-white/10'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Clauses List */}
            <div className="space-y-3">
              {filteredClauses.map((clause) => (
                <div
                  key={clause.id}
                  className="p-4 rounded-2xl glass-card-dark border border-red-500/20 hover:border-red-500/40 transition-all shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[#22060F] text-red-300 border border-red-500/35">
                        Page {clause.pageNumber} · {clause.clauseNumber}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#A1A1AA] bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        {clause.category.replace('_', ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigateToSource(clause.pageNumber, clause.clauseNumber)}
                      className="text-xs font-bold text-red-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Highlight</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2">
                    {clause.title}
                  </h3>

                  {/* Plain English Translation */}
                  <div className="text-xs text-[#FAF7F2] bg-white/[0.04] p-3 rounded-xl border border-red-500/15 mb-2.5">
                    <strong className="text-[#D4AF37] block text-[10px] font-mono uppercase tracking-wider mb-1">
                      Plain Meaning:
                    </strong>
                    {clause.plainExplanation}
                  </div>

                  {/* Exact Document Source Text */}
                  <div className="text-xs text-[#A1A1AA] italic font-serif border-l-2 border-[#E11D48]/50 pl-3">
                    &quot;{clause.sourceText}&quot;
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: DEADLINES ================= */}
        {activeTab === 'deadlines' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Evidence-Calculated Timelines:</strong> Deadlines are extracted directly from document text. If a reference trigger is missing, LegalEase flags it rather than guessing.
              </div>
            </div>

            <div className="space-y-3">
              {analysis.deadlines.map((dl) => {
                const isReminderActive = reminderStates[dl.id];
                return (
                  <div
                    key={dl.id}
                    className="p-4 rounded-2xl glass-card-dark border border-red-500/20 hover:border-red-500/40 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          dl.urgency === 'urgent'
                            ? 'bg-red-950 text-red-200 border border-red-700 shadow-[0_0_8px_rgba(225,29,72,0.3)]'
                            : 'bg-[#22060F] text-red-300 border border-red-500/40'
                        }`}>
                          <Clock className="w-3 h-3 text-[#E11D48]" />
                          {dl.dueDateFormatted}
                        </span>

                        {dl.daysRemaining && (
                          <span className="text-[11px] font-mono text-[#D4AF37]">
                            ({dl.daysRemaining} days remaining)
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleReminder(dl.id)}
                        className={`text-xs px-2.5 py-1 rounded-xl border font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                          isReminderActive
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                            : 'bg-white/5 text-[#A1A1AA] border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Bell className={`w-3.5 h-3.5 ${isReminderActive ? 'text-emerald-400 fill-emerald-400' : 'text-[#A1A1AA]'}`} />
                        <span>{isReminderActive ? 'Reminder Set' : 'Add Reminder'}</span>
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5">
                      {dl.title}
                    </h3>

                    <div className="text-xs text-[#A1A1AA] space-y-1 mb-3">
                      <div>
                        <strong className="text-white">Calculation Basis:</strong> {dl.calculationBasis}
                      </div>
                      <div>
                        <strong className="text-white">Document Anchor:</strong> Page {dl.sourcePage} · {dl.sourceClause}
                      </div>
                      {dl.warningIfUnclear && (
                        <div className="p-2.5 rounded-xl bg-amber-950/40 text-amber-200 text-[11px] border border-amber-800/60 mt-1">
                          {dl.warningIfUnclear}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onNavigateToSource(dl.sourcePage, dl.sourceClause)}
                      className="text-xs font-bold text-red-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect Source Clause</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: CONTRADICTIONS & MISSING CONTEXT ================= */}
        {activeTab === 'contradictions' && (
          <div className="space-y-5">
            {/* Contradiction Section */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GitCompare className="w-4 h-4 text-purple-400" />
                Detected Contradictions in Document
              </h3>

              {analysis.contradictions.length > 0 ? (
                <div className="space-y-3">
                  {analysis.contradictions.map((contra) => (
                    <div key={contra.id} className="p-4 rounded-2xl border border-purple-900/60 bg-purple-950/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-900/80 text-purple-200 border border-purple-700">
                          Contractual Conflict
                        </span>
                        <h4 className="text-sm font-bold text-white">{contra.title}</h4>
                      </div>

                      <p className="text-xs text-[#A1A1AA] mb-3">{contra.description}</p>

                      {/* Side by side comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs mb-3">
                        <div className="p-3 rounded-xl bg-black/40 border border-purple-800/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#FAF7F2] font-mono text-[11px]">
                              Page {contra.itemA.pageNumber} ({contra.itemA.location})
                            </span>
                            <button
                              onClick={() => onNavigateToSource(contra.itemA.pageNumber, contra.itemA.location)}
                              className="text-[10px] text-red-300 font-semibold underline cursor-pointer"
                            >
                              Jump to Page
                            </button>
                          </div>
                          <p className="italic text-[#A1A1AA] text-[11px]">&quot;{contra.itemA.text}&quot;</p>
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-purple-800/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#FAF7F2] font-mono text-[11px]">
                              Page {contra.itemB.pageNumber} ({contra.itemB.location})
                            </span>
                            <button
                              onClick={() => onNavigateToSource(contra.itemB.pageNumber, contra.itemB.location)}
                              className="text-[10px] text-red-300 font-semibold underline cursor-pointer"
                            >
                              Jump to Page
                            </button>
                          </div>
                          <p className="italic text-[#A1A1AA] text-[11px]">&quot;{contra.itemB.text}&quot;</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.04] text-xs text-purple-200 border border-purple-800/40">
                        <strong>Resolution Strategy:</strong> {contra.guidance}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#A1A1AA]">
                  No internal clause contradictions detected in this document.
                </div>
              )}
            </div>

            {/* Missing Context Section */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4 text-[#D4AF37]" />
                Missing Context & Unattached References
              </h3>

              <div className="glass-card-dark border border-red-500/20 rounded-2xl p-4 space-y-2">
                <p className="text-xs text-[#A1A1AA]">
                  Legal documents often reference external schedules or prior agreements. LegalEase identified the following missing items:
                </p>
                <ul className="space-y-1.5 text-xs text-[#FAF7F2]">
                  {analysis.missingInformation.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: NEXT STEPS & ACTION PLAN ================= */}
        {activeTab === 'nextsteps' && (
          <div className="space-y-5">
            {/* Header with Quick Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Your Action Plan</h3>
                <p className="text-xs text-[#A1A1AA]">Step-by-step safe checklist before signing or responding</p>
              </div>

              <button
                onClick={handleCopyQuestions}
                className="text-xs px-3 py-1.5 rounded-xl border border-red-500/30 bg-white/5 hover:bg-white/10 flex items-center gap-1.5 text-[#FAF7F2] font-medium transition-colors cursor-pointer"
              >
                {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuestions ? 'Copied!' : 'Copy Lawyer Questions'}</span>
              </button>
            </div>

            {/* 1. Document-Based Actions */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">
                1. Immediate Document Actions
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.documentActions.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => toggleAction(act.id)}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-red-500/20 bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer text-xs transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!actionStates[act.id]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-[#E11D48] focus:ring-[#E11D48] bg-black/40 border-red-500/40"
                    />
                    <div className={actionStates[act.id] ? 'line-through text-slate-500' : 'text-[#FAF7F2]'}>
                      <span>{act.text}</span>
                      {act.sourceRef && (
                        <span className="ml-2 font-mono text-[10px] text-red-300 bg-[#22060F] px-1.5 py-0.5 rounded border border-red-500/30">
                          {act.sourceRef}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Information to Collect */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">
                2. Information & Proof to Collect
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.informationToCollect.map((info) => (
                  <div
                    key={info.id}
                    onClick={() => toggleAction(info.id)}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-red-500/20 bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer text-xs transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!actionStates[info.id]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-[#E11D48] focus:ring-[#E11D48] bg-black/40 border-red-500/40"
                    />
                    <div className={actionStates[info.id] ? 'line-through text-slate-500' : 'text-[#FAF7F2]'}>
                      <span className="font-semibold text-white">{info.text}</span>
                      <p className="text-[11px] text-[#A1A1AA] mt-0.5">Why needed: {info.whyNeeded}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Lawyer Questions */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider flex items-center justify-between">
                <span>3. Specific Questions for Your Advocate</span>
                <span className="text-[11px] text-red-400 font-normal">Ready to ask</span>
              </h4>
              <div className="space-y-2">
                {analysis.actionPlan.questionsForLawyer.map((q, idx) => (
                  <div key={q.id} className="p-3.5 rounded-xl bg-[#22060F]/80 border border-red-500/35 text-xs">
                    <div className="font-bold text-white mb-1">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      Rationale: {q.rationale}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Professional Review Triggers */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider">
                4. Why Professional Review is Advised
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.professionalReviewTriggers.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 flex items-start gap-2.5">
                    <AlertOctagon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{rev.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Aid Helper Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#350814] to-[#140409] border border-red-500/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div>
                <h4 className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#D4AF37]" /> Need free legal assistance in India?
                </h4>
                <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                  Check eligibility for free advocate services under NALSA or Tele-Law scheme.
                </p>
              </div>
              <button
                onClick={onOpenLegalAid}
                className="px-3.5 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer shadow-[0_0_12px_rgba(225,29,72,0.4)]"
              >
                Legal Aid Directory
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 6: ASK LEGALEASE (CHAT) ================= */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[520px]">
            {/* Quick Questions Pills */}
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-red-500/20 text-xs">
              {[
                'Why was Clause 7 flagged?',
                'When do I need to respond by?',
                'Is the non-compete enforceable in India?',
                'What are my gratuity rights?',
                'Summarize this agreement'
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleSendChat(pill)}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#22060F] hover:text-red-300 text-[#A1A1AA] text-[11px] border border-red-500/20 transition-all cursor-pointer"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3.5">
              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-[#7F1D1D] to-[#991B1B] text-white border border-red-500/40 rounded-br-none shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                          : 'glass-card-dark text-[#FAF7F2] border border-red-500/20 rounded-bl-none shadow-md'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {renderFormattedChatMessage(msg.text)}
                      </div>

                      {/* Source badge link */}
                      {msg.sourceBadge && msg.sourceBadge.pageNumber && (
                        <div className="mt-3 pt-2.5 border-t border-red-500/20 flex items-center justify-between">
                          <button
                            onClick={() => onNavigateToSource(msg.sourceBadge!.pageNumber!, msg.sourceBadge!.clauseRef)}
                            className="text-[11px] font-bold text-red-300 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <span>[View Source — Page {msg.sourceBadge.pageNumber}{msg.sourceBadge.clauseRef ? `, ${msg.sourceBadge.clauseRef}` : ''}]</span>
                            <ArrowRight className="w-3 h-3 text-[#E11D48]" />
                          </button>
                          <span className="text-[10px] text-[#A1A1AA] font-mono">Evidence-Linked</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-[#A1A1AA]/60 mt-1 px-1 font-mono">{msg.timestamp}</span>
                  </div>
                );
              })}

              {isChatLoading && (
                <div className="flex items-center gap-2.5 text-xs text-[#A1A1AA] glass-card-dark p-3.5 rounded-2xl max-w-[70%]">
                  <div className="w-3 h-3 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
                  <span>Grounding answer against document clauses & Indian statutes...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="pt-2.5 border-t border-red-500/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask anything about this document..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 text-xs border border-red-500/30 bg-black/40 rounded-xl px-3.5 py-2.5 text-white placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="p-2.5 rounded-xl bg-[#E11D48] text-white hover:bg-[#BE123C] disabled:opacity-40 transition-colors shadow-[0_0_12px_rgba(225,29,72,0.4)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-[#A1A1AA]/60 mt-1.5 text-center">
                LegalEase AI provides informational extraction · Never hallucinating legal citations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function renderFormattedChatMessage(text: string) {
  const parts = text.split(/(\*\*\[(?:DOCUMENT FACT|AI INTERPRETATION|STATUTORY LEGAL CONTEXT|PROFESSIONAL REVIEW REQUIRED|NOTICE REGARDING LEGAL DETERMINATIONS)\]\*\*|\[(?:DOCUMENT FACT|AI INTERPRETATION|STATUTORY LEGAL CONTEXT|PROFESSIONAL REVIEW REQUIRED)\])/g);

  return parts.map((part, index) => {
    if (part.includes('DOCUMENT FACT')) {
      return (
        <span key={index} className="inline-block px-2 py-0.5 rounded-md bg-[#22060F] text-red-200 font-bold font-mono text-[10px] my-1 border border-red-500/40">
          DOCUMENT FACT
        </span>
      );
    }
    if (part.includes('AI INTERPRETATION')) {
      return (
        <span key={index} className="inline-block px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-200 font-bold font-mono text-[10px] my-1 border border-amber-700">
          AI INTERPRETATION
        </span>
      );
    }
    if (part.includes('STATUTORY LEGAL CONTEXT')) {
      return (
        <span key={index} className="inline-block px-2 py-0.5 rounded-md bg-[#350814] text-[#D4AF37] font-bold font-mono text-[10px] my-1 border border-[#D4AF37]/50">
          STATUTORY LEGAL CONTEXT
        </span>
      );
    }
    if (part.includes('PROFESSIONAL REVIEW REQUIRED') || part.includes('NOTICE REGARDING LEGAL DETERMINATIONS')) {
      return (
        <span key={index} className="inline-block px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 font-bold font-mono text-[10px] my-1 border border-emerald-700">
          PROFESSIONAL REVIEW REQUIRED
        </span>
      );
    }
    return part;
  });
}
