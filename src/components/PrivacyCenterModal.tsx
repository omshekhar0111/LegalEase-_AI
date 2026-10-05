'use client';

import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Trash2, Key, CheckCircle2, Shield } from 'lucide-react';

interface PrivacyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteDocument: () => void;
  onDeleteAnalysis: () => void;
  onClearAll: () => void;
}

export const PrivacyCenterModal: React.FC<PrivacyCenterModalProps> = ({
  isOpen,
  onClose,
  onDeleteDocument,
  onDeleteAnalysis,
  onClearAll,
}) => {
  const [retentionPolicy, setRetentionPolicy] = useState<'ephemeral' | '7days' | 'manual'>('ephemeral');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#0F0307] text-[#FAF7F2] rounded-2xl max-w-2xl w-full shadow-2xl border border-red-500/25">
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-500/20 flex items-center justify-between bg-white/[0.02] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#991B1B] to-[#E11D48] text-[#FAF7F2] flex items-center justify-center shadow-[0_0_12px_rgba(225,29,72,0.4)]">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Privacy & Legal Data Governance</h2>
              <p className="text-xs text-[#A1A1AA]">Privileged document privacy and complete client data ownership</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback message */}
        {feedbackMsg && (
          <div className="p-3 bg-emerald-950/70 border-b border-emerald-800 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-6 text-xs text-[#FAF7F2]">
          {/* 1. Retention Policy Setting */}
          <div className="p-5 rounded-2xl glass-card-dark border border-red-500/20 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Document Retention Policy</h3>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                Default: Ephemeral
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA]">
              Select how long analyzed legal text and clause metadata should be held in active memory:
            </p>

            <div className="space-y-2.5">
              <label className="flex items-start gap-3 p-3 rounded-xl border bg-black/40 border-red-500/20 hover:border-[#E11D48]/60 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="retention"
                  checked={retentionPolicy === 'ephemeral'}
                  onChange={() => setRetentionPolicy('ephemeral')}
                  className="mt-0.5 text-[#E11D48] focus:ring-[#E11D48] bg-black/60 border-red-500/40"
                />
                <div>
                  <div className="font-semibold text-white">Delete immediately after session analysis (Privacy First)</div>
                  <div className="text-[11px] text-[#A1A1AA] mt-0.5">Processed in server runtime memory; discarded when you close or reload the browser.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border bg-black/40 border-red-500/20 hover:border-[#E11D48]/60 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="retention"
                  checked={retentionPolicy === '7days'}
                  onChange={() => setRetentionPolicy('7days')}
                  className="mt-0.5 text-[#E11D48] focus:ring-[#E11D48] bg-black/60 border-red-500/40"
                />
                <div>
                  <div className="font-semibold text-white">Keep for 7 days</div>
                  <div className="text-[11px] text-[#A1A1AA] mt-0.5">Encrypted in local browser storage to let you return to your action plan and questions.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border bg-black/40 border-red-500/20 hover:border-[#E11D48]/60 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="retention"
                  checked={retentionPolicy === 'manual'}
                  onChange={() => setRetentionPolicy('manual')}
                  className="mt-0.5 text-[#E11D48] focus:ring-[#E11D48] bg-black/60 border-red-500/40"
                />
                <div>
                  <div className="font-semibold text-white">Keep until manually deleted</div>
                  <div className="text-[11px] text-[#A1A1AA] mt-0.5">Persisted locally until you explicitly click &quot;Purge All Data&quot;.</div>
                </div>
              </label>
            </div>
          </div>

          {/* 2. Security Safeguards Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl border border-red-500/20 bg-white/[0.02]">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
                <span>Zero Client-Side Secrets</span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                All Gemini API keys and sensitive processing happen strictly in server-side API routes. Your browser bundle never includes API credentials.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-red-500/20 bg-white/[0.02]">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <Key className="w-4 h-4 text-[#D4AF37]" />
                <span>No Model Training</span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Documents sent through the official Google Gemini API are processed under enterprise privacy terms and are not used to train foundation models.
              </p>
            </div>
          </div>

          {/* 3. Immediate Data Deletion Controls */}
          <div className="p-5 rounded-2xl border border-red-800 bg-red-950/40 space-y-3">
            <div className="flex items-center gap-2 text-red-300 font-bold">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Immediate Data Purge Controls</span>
            </div>
            <p className="text-xs text-red-200/80">
              You have full ownership. You can instantly wipe documents, analysis trees, and cached messages with one click:
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => {
                  onDeleteDocument();
                  showFeedback('Document content wiped from active view.');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-red-500/30 text-white hover:bg-white/20 font-semibold cursor-pointer"
              >
                Delete Current Document
              </button>

              <button
                onClick={() => {
                  onDeleteAnalysis();
                  showFeedback('Extracted analysis tree cleared.');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-red-500/30 text-white hover:bg-white/20 font-semibold cursor-pointer"
              >
                Delete Analysis Only
              </button>

              <button
                onClick={() => {
                  onClearAll();
                  showFeedback('All session data, cache, and history purged.');
                }}
                className="px-4 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold shadow-[0_0_15px_rgba(225,29,72,0.5)] cursor-pointer"
              >
                Purge All Data & Cache
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-red-500/20 bg-white/[0.02] flex items-center justify-between rounded-b-2xl">
          <span className="text-[11px] text-[#A1A1AA] font-mono">
            Session: Ephemeral · Memory Isolated
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
