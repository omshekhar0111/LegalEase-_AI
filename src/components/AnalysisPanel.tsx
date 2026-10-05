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
  Sparkles
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
      text: `Hello! I have mapped **${analysis.metadata.title}** under ${analysis.metadata.jurisdiction} jurisdiction.\n\nYou can ask about specific clauses, calculate deadlines, or explore flagged risks like the 24-month non-compete covenant. All my answers are grounded in document evidence and statutory Indian law principles.`,
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
    <div className="flex flex-col h-full bg-[#0B1220] text-[#F8F6F1]">
      {/* Top Header & Tab Navigation */}
      <div className="border-b border-white/10 bg-[#0B1220]/90 backdrop-blur-md">
        <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Legal Intelligence Analysis</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30">
                {analysis.metadata.jurisdiction}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLawyerBrief}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#172554] to-[#1E293B] hover:from-[#1E293B] hover:to-[#172554] text-white border border-[#5B7CFA]/40 shadow-[0_0_15px_rgba(91,124,250,0.2)] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#D4A72C]" />
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
                ? 'bg-red-950/70 text-red-200 font-bold border border-red-800 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            <span>Attention Radar</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-900/80 text-red-200 font-mono">
              {analysis.issues.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('clauses')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'clauses'
                ? 'bg-[#172554] text-[#5B7CFA] font-bold border border-[#5B7CFA]/40 shadow-[0_0_12px_rgba(91,124,250,0.2)]'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#5B7CFA]" />
            <span>Clauses</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1E293B] text-[#5B7CFA] font-mono">
              {analysis.clauses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'deadlines'
                ? 'bg-amber-950/70 text-amber-200 font-bold border border-amber-800 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Deadlines</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-900/80 text-amber-200 font-mono">
              {analysis.deadlines.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contradictions')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'contradictions'
                ? 'bg-purple-950/70 text-purple-200 font-bold border border-purple-800 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-400" />
            <span>Contradictions & Context</span>
            {(analysis.contradictions.length > 0 || analysis.missingInformation.length > 0) && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-900/80 text-purple-200 font-mono">
                {analysis.contradictions.length + analysis.missingInformation.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('nextsteps')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'nextsteps'
                ? 'bg-emerald-950/70 text-emerald-200 font-bold border border-emerald-800 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next Steps</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#172554] text-[#5B7CFA] font-bold border border-[#5B7CFA]/50 shadow-[0_0_15px_rgba(91,124,250,0.3)]'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#5B7CFA]" />
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
            <div className="p-3.5 rounded-2xl glass-card-dark border border-white/10 text-xs text-[#94A3B8] flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
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
                    : 'bg-white/5 text-[#94A3B8] hover:text-white border border-white/10'
                }`}
              >
                All Issues ({analysis.issues.length})
              </button>
              <button
                onClick={() => setRadarFilter('critical_attention')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  radarFilter === 'critical_attention'
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-red-950/50 text-red-300 border border-red-800/60'
                }`}
              >
                🔴 Critical
              </button>
              <button
                onClick={() => setRadarFilter('high_attention')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  radarFilter === 'high_attention'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-amber-950/50 text-amber-300 border border-amber-800/60'
                }`}
              >
                🟠 High
              </button>
              <button
                onClick={() => setRadarFilter('review')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  radarFilter === 'review'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-blue-950/50 text-blue-300 border border-blue-800/60'
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
                        ? 'border-red-900/60 bg-red-950/25 hover:border-red-600/80 shadow-[0_4px_20px_rgba(239,68,68,0.1)]'
                        : isHigh
                        ? 'border-amber-900/60 bg-amber-950/25 hover:border-amber-600/80 shadow-[0_4px_20px_rgba(245,158,11,0.1)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-black/40 text-[#F8F6F1] border border-white/10">
                          Page {issue.pageNumber} · {issue.clauseRef}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : isHigh
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}>
                          {isCritical ? 'Critical Attention' : isHigh ? 'High Attention' : 'Review Required'}
                        </span>
                      </div>

                      {/* Jump to Evidence Button */}
                      <button
                        onClick={() => onNavigateToSource(issue.pageNumber, issue.clauseRef)}
                        className="text-xs font-bold text-[#5B7CFA] hover:text-white flex items-center gap-1 shrink-0 bg-[#172554] border border-[#5B7CFA]/30 px-2.5 py-1 rounded-lg hover:border-[#5B7CFA] transition-all cursor-pointer"
                      >
                        <span>View Source</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-2">
                      {issue.title}
                    </h3>

                    {/* Excerpt */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-serif text-[#F8F6F1]/90 italic mb-3">
                      &quot;{issue.sourceSnippet}&quot;
                    </div>

                    {/* 5-Point Transparent Structure */}
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <strong className="text-white">What was detected:</strong>{' '}
                        <span className="text-[#94A3B8]">{issue.detectedIssue}</span>
                      </div>

                      <div>
                        <strong className="text-white">Why might it matter:</strong>{' '}
                        <span className="text-[#94A3B8]">{issue.whyItMatters}</span>
                      </div>

                      {issue.statutoryReference && (
                        <div className="p-2.5 rounded-xl bg-[#172554]/70 border border-[#5B7CFA]/30 text-[#F8F6F1] text-[11px] shadow-xs">
                          <strong className="text-[#5B7CFA]">Indian Legal Reference:</strong> {issue.statutoryReference}
                        </div>
                      )}

                      {issue.missingContext && (
                        <div className="text-[11px] text-[#94A3B8]">
                          <strong className="text-white">Missing Context:</strong> {issue.missingContext}
                        </div>
                      )}

                      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-[11px]">
                        <strong>Question for Lawyer:</strong> {issue.professionalConsultReason}
                      </div>

                      {/* Safe Wording Disclaimer */}
                      <div className="text-[10px] text-[#94A3B8]/60 italic pt-1 border-t border-white/5">
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
                      : 'bg-white/5 text-[#94A3B8] hover:text-white border border-white/10'
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
                  className="p-4 rounded-2xl glass-card-dark border border-white/10 hover:border-white/20 transition-all shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30">
                        Page {clause.pageNumber} · {clause.clauseNumber}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#94A3B8] bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        {clause.category.replace('_', ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigateToSource(clause.pageNumber, clause.clauseNumber)}
                      className="text-xs font-bold text-[#5B7CFA] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Highlight</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2">
                    {clause.title}
                  </h3>

                  {/* Plain English Translation */}
                  <div className="text-xs text-[#F8F6F1] bg-white/[0.04] p-3 rounded-xl border border-white/5 mb-2.5">
                    <strong className="text-[#D4A72C] block text-[10px] font-mono uppercase tracking-wider mb-1">
                      Plain Meaning:
                    </strong>
                    {clause.plainExplanation}
                  </div>

                  {/* Exact Document Source Text */}
                  <div className="text-xs text-[#94A3B8] italic font-serif border-l-2 border-[#5B7CFA]/40 pl-3">
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
              <Calendar className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
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
                    className="p-4 rounded-2xl glass-card-dark border border-white/10 hover:border-white/20 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          dl.urgency === 'urgent'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {dl.dueDateFormatted}
                        </span>

                        {dl.daysRemaining && (
                          <span className="text-[11px] font-mono text-[#D4A72C]">
                            ({dl.daysRemaining} days remaining)
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleReminder(dl.id)}
                        className={`text-xs px-2.5 py-1 rounded-xl border font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                          isReminderActive
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                            : 'bg-white/5 text-[#94A3B8] border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Bell className={`w-3.5 h-3.5 ${isReminderActive ? 'text-emerald-400 fill-emerald-400' : 'text-[#94A3B8]'}`} />
                        <span>{isReminderActive ? 'Reminder Set' : 'Add Reminder'}</span>
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5">
                      {dl.title}
                    </h3>

                    <div className="text-xs text-[#94A3B8] space-y-1 mb-3">
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
                      className="text-xs font-bold text-[#5B7CFA] hover:text-white flex items-center gap-1 cursor-pointer"
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
              <h3 className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
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

                      <p className="text-xs text-[#94A3B8] mb-3">{contra.description}</p>

                      {/* Side by side comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs mb-3">
                        <div className="p-3 rounded-xl bg-black/40 border border-purple-800/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#F8F6F1] font-mono text-[11px]">
                              Page {contra.itemA.pageNumber} ({contra.itemA.location})
                            </span>
                            <button
                              onClick={() => onNavigateToSource(contra.itemA.pageNumber, contra.itemA.location)}
                              className="text-[10px] text-[#5B7CFA] font-semibold underline cursor-pointer"
                            >
                              Jump to Page
                            </button>
                          </div>
                          <p className="italic text-[#94A3B8] text-[11px]">&quot;{contra.itemA.text}&quot;</p>
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-purple-800/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#F8F6F1] font-mono text-[11px]">
                              Page {contra.itemB.pageNumber} ({contra.itemB.location})
                            </span>
                            <button
                              onClick={() => onNavigateToSource(contra.itemB.pageNumber, contra.itemB.location)}
                              className="text-[10px] text-[#5B7CFA] font-semibold underline cursor-pointer"
                            >
                              Jump to Page
                            </button>
                          </div>
                          <p className="italic text-[#94A3B8] text-[11px]">&quot;{contra.itemB.text}&quot;</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.04] text-xs text-purple-200 border border-purple-800/40">
                        <strong>Resolution Strategy:</strong> {contra.guidance}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#94A3B8]">
                  No internal clause contradictions detected in this document.
                </div>
              )}
            </div>

            {/* Missing Context Section */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4 text-[#D4A72C]" />
                Missing Context & Unattached References
              </h3>

              <div className="glass-card-dark border border-white/10 rounded-2xl p-4 space-y-2">
                <p className="text-xs text-[#94A3B8]">
                  Legal documents often reference external schedules or prior agreements. LegalEase identified the following missing items:
                </p>
                <ul className="space-y-1.5 text-xs text-[#F8F6F1]">
                  {analysis.missingInformation.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C] mt-1.5 shrink-0" />
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
                <p className="text-xs text-[#94A3B8]">Step-by-step safe checklist before signing or responding</p>
              </div>

              <button
                onClick={handleCopyQuestions}
                className="text-xs px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 flex items-center gap-1.5 text-[#F8F6F1] font-medium transition-colors cursor-pointer"
              >
                {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuestions ? 'Copied!' : 'Copy Lawyer Questions'}</span>
              </button>
            </div>

            {/* 1. Document-Based Actions */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
                1. Immediate Document Actions
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.documentActions.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => toggleAction(act.id)}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer text-xs transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!actionStates[act.id]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-[#5B7CFA] focus:ring-[#5B7CFA] bg-black/40 border-white/20"
                    />
                    <div className={actionStates[act.id] ? 'line-through text-slate-500' : 'text-[#F8F6F1]'}>
                      <span>{act.text}</span>
                      {act.sourceRef && (
                        <span className="ml-2 font-mono text-[10px] text-[#5B7CFA] bg-[#172554] px-1.5 py-0.5 rounded border border-[#5B7CFA]/30">
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
              <h4 className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
                2. Information & Proof to Collect
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.informationToCollect.map((info) => (
                  <div
                    key={info.id}
                    onClick={() => toggleAction(info.id)}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer text-xs transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!actionStates[info.id]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-[#5B7CFA] focus:ring-[#5B7CFA] bg-black/40 border-white/20"
                    />
                    <div className={actionStates[info.id] ? 'line-through text-slate-500' : 'text-[#F8F6F1]'}>
                      <span className="font-semibold text-white">{info.text}</span>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">Why needed: {info.whyNeeded}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Lawyer Questions */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider flex items-center justify-between">
                <span>3. Specific Questions for Your Advocate</span>
                <span className="text-[11px] text-[#5B7CFA] font-normal">Ready to ask</span>
              </h4>
              <div className="space-y-2">
                {analysis.actionPlan.questionsForLawyer.map((q, idx) => (
                  <div key={q.id} className="p-3.5 rounded-xl bg-[#172554]/50 border border-[#5B7CFA]/30 text-xs">
                    <div className="font-bold text-white mb-1">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      Rationale: {q.rationale}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Professional Review Triggers */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
                4. Why Professional Review is Advised
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.professionalReviewTriggers.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 flex items-start gap-2.5">
                    <AlertOctagon className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                    <span>{rev.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Aid Helper Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172554] to-[#0B1220] border border-[#5B7CFA]/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div>
                <h4 className="text-xs font-bold text-[#5B7CFA]">Need free legal assistance in India?</h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">
                  Check eligibility for free advocate services under NALSA or Tele-Law scheme.
                </p>
              </div>
              <button
                onClick={onOpenLegalAid}
                className="px-3.5 py-1.5 rounded-xl bg-[#5B7CFA] hover:bg-[#5B7CFA]/80 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer"
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
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-white/10 text-xs">
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
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#172554] hover:text-[#5B7CFA] text-[#94A3B8] text-[11px] border border-white/10 transition-all cursor-pointer"
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
                          ? 'bg-gradient-to-r from-[#172554] to-[#1E293B] text-white border border-[#5B7CFA]/40 rounded-br-none shadow-[0_0_15px_rgba(91,124,250,0.2)]'
                          : 'glass-card-dark text-[#F8F6F1] border border-white/10 rounded-bl-none shadow-md'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {renderFormattedChatMessage(msg.text)}
                      </div>

                      {/* Source badge link */}
                      {msg.sourceBadge && msg.sourceBadge.pageNumber && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                          <button
                            onClick={() => onNavigateToSource(msg.sourceBadge!.pageNumber!, msg.sourceBadge!.clauseRef)}
                            className="text-[11px] font-bold text-[#5B7CFA] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>[View Source — Page {msg.sourceBadge.pageNumber}{msg.sourceBadge.clauseRef ? `, ${msg.sourceBadge.clauseRef}` : ''}]</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <span className="text-[10px] text-[#94A3B8] font-mono">Evidence-Linked</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-[#94A3B8]/60 mt-1 px-1 font-mono">{msg.timestamp}</span>
                  </div>
                );
              })}

              {isChatLoading && (
                <div className="flex items-center gap-2.5 text-xs text-[#94A3B8] glass-card-dark p-3.5 rounded-2xl max-w-[70%]">
                  <div className="w-3 h-3 border-2 border-[#5B7CFA] border-t-transparent rounded-full animate-spin" />
                  <span>Grounding answer against document clauses & Indian statutes...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="pt-2.5 border-t border-white/10">
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
                  className="flex-1 text-xs border border-white/15 bg-white/5 rounded-xl px-3.5 py-2.5 text-white placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#5B7CFA]"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="p-2.5 rounded-xl bg-[#5B7CFA] text-white hover:bg-[#5B7CFA]/80 disabled:opacity-40 transition-colors shadow-[0_0_12px_rgba(91,124,250,0.3)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-[#94A3B8]/60 mt-1.5 text-center">
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
        <span key={index} className="inline-block px-2 py-0.5 rounded-md bg-[#172554] text-[#5B7CFA] font-bold font-mono text-[10px] my-1 border border-[#5B7CFA]/30">
          DOCUMENT FACT
        </span>
      );
    }
    if (part.includes('AI INTERPRETATION')) {
      return (
        <span key={index} className="inline-block px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 font-bold font-mono text-[10px] my-1 border border-amber-800">
          AI INTERPRETATION
        </span>
      );
    }
    if (part.includes('STATUTORY LEGAL CONTEXT')) {
      return (
        <span key={index} className="inline-block px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 font-bold font-mono text-[10px] my-1 border border-indigo-700">
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
