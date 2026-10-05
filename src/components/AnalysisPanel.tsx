'use client';

import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  Layers,
  FileCheck,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Clock,
  Bell,
  Scale,
  Send,
  HelpCircle,
  Briefcase,
  GitCompare,
  FileQuestion
} from 'lucide-react';
import {
  FullLegalAnalysis,
  AttentionLevel,
  ClauseCategory,
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
      text: `Hello! I have analyzed **${analysis.metadata.title}** under ${analysis.metadata.jurisdiction} jurisdiction.\n\nYou can ask about specific clauses, calculate deadlines, or explore flagged risks like the 24-month non-compete covenant. All my answers are grounded in document evidence and statutory Indian law principles.`,
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
        text: 'I encountered a brief connection issue. Please check the Radar and Clauses tabs for verified offline extractions.',
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
    <div className="flex flex-col h-full bg-white">
      {/* Top Header & Tab Navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Legal Intelligence Analysis</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {analysis.metadata.jurisdiction}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLawyerBrief}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1 shadow-xs"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-300" />
              <span>Generate Brief</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex overflow-x-auto px-2 space-x-1 scrollbar-none py-1.5 text-xs">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 rounded-lg font-medium shrink-0 flex items-center gap-1.5 transition-colors ${
              activeTab === 'radar'
                ? 'bg-red-50 text-red-900 font-bold border border-red-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
            <span>Attention Radar</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-100 text-red-800 font-mono">
              {analysis.issues.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('clauses')}
            className={`px-3 py-1.5 rounded-lg font-medium shrink-0 flex items-center gap-1.5 transition-colors ${
              activeTab === 'clauses'
                ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Clauses</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-mono">
              {analysis.clauses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines')}
            className={`px-3 py-1.5 rounded-lg font-medium shrink-0 flex items-center gap-1.5 transition-colors ${
              activeTab === 'deadlines'
                ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Deadlines</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-mono">
              {analysis.deadlines.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contradictions')}
            className={`px-3 py-1.5 rounded-lg font-medium shrink-0 flex items-center gap-1.5 transition-colors ${
              activeTab === 'contradictions'
                ? 'bg-purple-50 text-purple-900 font-bold border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-600" />
            <span>Contradictions & Context</span>
            {(analysis.contradictions.length > 0 || analysis.missingInformation.length > 0) && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 font-mono">
                {analysis.contradictions.length + analysis.missingInformation.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('nextsteps')}
            className={`px-3 py-1.5 rounded-lg font-medium shrink-0 flex items-center gap-1.5 transition-colors ${
              activeTab === 'nextsteps'
                ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Next Steps</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg font-medium shrink-0 flex items-center gap-1.5 transition-colors ${
              activeTab === 'chat'
                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
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
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong>Non-Arbitrary Attention Radar:</strong> Rather than an ungrounded &quot;Risk Score = 82/100&quot;, LegalEase maps specific clauses to potential imbalances, Indian statutory provisions (e.g. Section 27 Contract Act), and questions for your advocate.
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setRadarFilter('all')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  radarFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Issues ({analysis.issues.length})
              </button>
              <button
                onClick={() => setRadarFilter('critical_attention')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  radarFilter === 'critical_attention'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                🔴 Critical
              </button>
              <button
                onClick={() => setRadarFilter('high_attention')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  radarFilter === 'high_attention'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                🟠 High
              </button>
              <button
                onClick={() => setRadarFilter('review')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  radarFilter === 'review'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100'
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
                    className={`rounded-xl border p-4 transition-all shadow-xs ${
                      isCritical
                        ? 'border-red-200 bg-red-50/20 hover:border-red-300'
                        : isHigh
                        ? 'border-amber-200 bg-amber-50/20 hover:border-amber-300'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          Page {issue.pageNumber} · {issue.clauseRef}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-red-100 text-red-800'
                            : isHigh
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isCritical ? 'Critical Attention' : isHigh ? 'High Attention' : 'Review Required'}
                        </span>
                      </div>

                      {/* Jump to Evidence Button */}
                      <button
                        onClick={() => onNavigateToSource(issue.pageNumber, issue.clauseRef)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0 bg-indigo-50/60 px-2 py-1 rounded hover:bg-indigo-100 transition-colors"
                      >
                        <span>View Source</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                      {issue.title}
                    </h3>

                    {/* Excerpt */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-serif text-slate-700 italic mb-3">
                      &quot;{issue.sourceSnippet}&quot;
                    </div>

                    {/* 5-Point Transparent Structure */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-slate-900">What was detected:</strong>{' '}
                        <span className="text-slate-700">{issue.detectedIssue}</span>
                      </div>

                      <div>
                        <strong className="text-slate-900">Why might it matter:</strong>{' '}
                        <span className="text-slate-700">{issue.whyItMatters}</span>
                      </div>

                      {issue.statutoryReference && (
                        <div className="p-2 rounded bg-indigo-50/70 border border-indigo-100 text-indigo-900 text-[11px]">
                          <strong>Indian Legal Reference:</strong> {issue.statutoryReference}
                        </div>
                      )}

                      {issue.missingContext && (
                        <div className="text-[11px] text-slate-500">
                          <strong className="text-slate-700">Missing Context:</strong> {issue.missingContext}
                        </div>
                      )}

                      <div className="p-2 rounded bg-emerald-50/70 border border-emerald-100 text-emerald-900 text-[11px]">
                        <strong>Question for Lawyer:</strong> {issue.professionalConsultReason}
                      </div>

                      {/* Safe Wording Disclaimer */}
                      <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-100">
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
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    clauseFilter === c.key
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                        Page {clause.pageNumber} · {clause.clauseNumber}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {clause.category.replace('_', ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigateToSource(clause.pageNumber, clause.clauseNumber)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Highlight</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {clause.title}
                  </h3>

                  {/* Plain English Translation */}
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mb-2">
                    <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-slate-500 mb-0.5">
                      Plain Meaning:
                    </strong>
                    {clause.plainExplanation}
                  </div>

                  {/* Exact Document Source Text */}
                  <div className="text-xs text-slate-600 italic font-serif border-l-2 border-slate-300 pl-2.5">
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
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Calendar className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Evidence-Calculated Timelines:</strong> Deadlines are extracted directly from document text. If a reference trigger is missing, LegalEase flags it rather than guessing.
              </div>
            </div>

            <div className="space-y-3">
              {analysis.deadlines.map((dl) => {
                const isReminderActive = reminderStates[dl.id];
                return (
                  <div
                    key={dl.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          dl.urgency === 'urgent'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {dl.dueDateFormatted}
                        </span>

                        {dl.daysRemaining && (
                          <span className="text-[11px] font-mono text-slate-500">
                            ({dl.daysRemaining} days remaining)
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleReminder(dl.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-colors ${
                          isReminderActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Bell className={`w-3.5 h-3.5 ${isReminderActive ? 'text-emerald-600 fill-emerald-600' : 'text-slate-500'}`} />
                        <span>{isReminderActive ? 'Reminder Set' : 'Add Reminder'}</span>
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {dl.title}
                    </h3>

                    <div className="text-xs text-slate-600 space-y-1 mb-3">
                      <div>
                        <strong>Calculation Basis:</strong> {dl.calculationBasis}
                      </div>
                      <div>
                        <strong>Document Anchor:</strong> Page {dl.sourcePage} · {dl.sourceClause}
                      </div>
                      {dl.warningIfUnclear && (
                        <div className="p-2 rounded bg-amber-50 text-amber-800 text-[11px] border border-amber-200">
                          {dl.warningIfUnclear}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onNavigateToSource(dl.sourcePage, dl.sourceClause)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
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
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GitCompare className="w-4 h-4 text-purple-600" />
                Detected Contradictions in Document
              </h3>

              {analysis.contradictions.length > 0 ? (
                <div className="space-y-3">
                  {analysis.contradictions.map((contra) => (
                    <div key={contra.id} className="p-4 rounded-xl border border-purple-200 bg-purple-50/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          Contractual Conflict
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{contra.title}</h4>
                      </div>

                      <p className="text-xs text-slate-700 mb-3">{contra.description}</p>

                      {/* Side by side comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2.5 rounded-lg bg-white border border-purple-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800 font-mono text-[11px]">
                              Page {contra.itemA.pageNumber} ({contra.itemA.location})
                            </span>
                            <button
                              onClick={() => onNavigateToSource(contra.itemA.pageNumber, contra.itemA.location)}
                              className="text-[10px] text-indigo-600 font-semibold underline"
                            >
                              Jump to Page
                            </button>
                          </div>
                          <p className="italic text-slate-600 text-[11px]">&quot;{contra.itemA.text}&quot;</p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-purple-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800 font-mono text-[11px]">
                              Page {contra.itemB.pageNumber} ({contra.itemB.location})
                            </span>
                            <button
                              onClick={() => onNavigateToSource(contra.itemB.pageNumber, contra.itemB.location)}
                              className="text-[10px] text-indigo-600 font-semibold underline"
                            >
                              Jump to Page
                            </button>
                          </div>
                          <p className="italic text-slate-600 text-[11px]">&quot;{contra.itemB.text}&quot;</p>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-white text-xs text-purple-950 border border-purple-200">
                        <strong>Resolution Strategy:</strong> {contra.guidance}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  No internal clause contradictions detected in this document.
                </div>
              )}
            </div>

            {/* Missing Context Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4 text-amber-600" />
                Missing Context & Unattached References
              </h3>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <p className="text-xs text-slate-600">
                  Legal documents often reference external schedules or prior agreements. LegalEase identified the following missing items:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {analysis.missingInformation.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
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
                <h3 className="text-sm font-bold text-slate-900">Your Action Plan</h3>
                <p className="text-xs text-slate-500">Step-by-step safe checklist before signing or responding</p>
              </div>

              <button
                onClick={handleCopyQuestions}
                className="text-xs px-2.5 py-1 rounded-md border border-slate-300 hover:bg-slate-50 flex items-center gap-1 text-slate-700 font-medium"
              >
                {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuestions ? 'Copied!' : 'Copy Lawyer Questions'}</span>
              </button>
            </div>

            {/* 1. Document-Based Actions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Immediate Document Actions
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.documentActions.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => toggleAction(act.id)}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={!!actionStates[act.id]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className={actionStates[act.id] ? 'line-through text-slate-400' : 'text-slate-800'}>
                      <span>{act.text}</span>
                      {act.sourceRef && (
                        <span className="ml-2 font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
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
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Information & Proof to Collect
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.informationToCollect.map((info) => (
                  <div
                    key={info.id}
                    onClick={() => toggleAction(info.id)}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={!!actionStates[info.id]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className={actionStates[info.id] ? 'line-through text-slate-400' : 'text-slate-800'}>
                      <span className="font-semibold text-slate-900">{info.text}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Why needed: {info.whyNeeded}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Lawyer Questions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>3. Specific Questions for Your Advocate</span>
                <span className="text-[11px] text-indigo-600 font-normal">Ready to ask</span>
              </h4>
              <div className="space-y-2">
                {analysis.actionPlan.questionsForLawyer.map((q, idx) => (
                  <div key={q.id} className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs">
                    <div className="font-bold text-indigo-950 mb-0.5">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="text-[11px] text-indigo-800/80">
                      Rationale: {q.rationale}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Professional Review Triggers */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                4. Why Professional Review is Advised
              </h4>
              <div className="space-y-1.5">
                {analysis.actionPlan.professionalReviewTriggers.map((rev) => (
                  <div key={rev.id} className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{rev.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Aid Helper Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-indigo-300">Need free legal assistance in India?</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Check eligibility for free advocate services under NALSA or Tele-Law scheme.
                </p>
              </div>
              <button
                onClick={onOpenLegalAid}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0"
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
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-100 text-xs">
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
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 text-[11px] transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-xl p-3.5 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-xs'
                          : 'bg-slate-50 text-slate-900 border border-slate-200 rounded-bl-none shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {renderFormattedChatMessage(msg.text)}
                      </div>

                      {/* Source badge link */}
                      {msg.sourceBadge && msg.sourceBadge.pageNumber && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between">
                          <button
                            onClick={() => onNavigateToSource(msg.sourceBadge!.pageNumber!, msg.sourceBadge!.clauseRef)}
                            className="text-[11px] font-semibold text-indigo-700 hover:underline flex items-center gap-1"
                          >
                            <span>[View Source — Page {msg.sourceBadge.pageNumber}{msg.sourceBadge.clauseRef ? `, ${msg.sourceBadge.clauseRef}` : ''}]</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <span className="text-[10px] text-slate-400 font-mono">Evidence-Linked</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}

              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg max-w-[70%]">
                  <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <span>Grounding answer against document clauses & Indian statutes...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="pt-2 border-t border-slate-200">
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
                  className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-slate-400 mt-1 text-center">
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
  // Highlights labels like [DOCUMENT FACT], [AI INTERPRETATION], etc.
  const parts = text.split(/(\*\*\[(?:DOCUMENT FACT|AI INTERPRETATION|STATUTORY LEGAL CONTEXT|PROFESSIONAL REVIEW REQUIRED|NOTICE REGARDING LEGAL DETERMINATIONS)\]\*\*|\[(?:DOCUMENT FACT|AI INTERPRETATION|STATUTORY LEGAL CONTEXT|PROFESSIONAL REVIEW REQUIRED)\])/g);

  return parts.map((part, index) => {
    if (part.includes('DOCUMENT FACT')) {
      return (
        <span key={index} className="inline-block px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold font-mono text-[10px] my-1">
          DOCUMENT FACT
        </span>
      );
    }
    if (part.includes('AI INTERPRETATION')) {
      return (
        <span key={index} className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold font-mono text-[10px] my-1">
          AI INTERPRETATION
        </span>
      );
    }
    if (part.includes('STATUTORY LEGAL CONTEXT')) {
      return (
        <span key={index} className="inline-block px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold font-mono text-[10px] my-1">
          STATUTORY LEGAL CONTEXT
        </span>
      );
    }
    if (part.includes('PROFESSIONAL REVIEW REQUIRED') || part.includes('NOTICE REGARDING LEGAL DETERMINATIONS')) {
      return (
        <span key={index} className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold font-mono text-[10px] my-1">
          PROFESSIONAL REVIEW REQUIRED
        </span>
      );
    }
    return part;
  });
}
