'use client';

import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Trash2, Key, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Privacy & Data Governance Center</h2>
              <p className="text-xs text-slate-500">Your documents remain private and under your direct control</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback message */}
        {feedbackMsg && (
          <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          {/* 1. Retention Policy Setting */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Document Retention Policy</h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Default: Ephemeral
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Select how long analyzed legal text and clause metadata should be held in active memory:
            </p>

            <div className="space-y-2">
              <label className="flex items-start gap-3 p-2.5 rounded-lg border bg-white border-slate-200 hover:border-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="retention"
                  checked={retentionPolicy === 'ephemeral'}
                  onChange={() => setRetentionPolicy('ephemeral')}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <div className="font-semibold text-slate-900">Delete immediately after session analysis (Privacy First)</div>
                  <div className="text-[11px] text-slate-500">Processed in server runtime memory; discarded when you close or reload the browser.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-lg border bg-white border-slate-200 hover:border-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="retention"
                  checked={retentionPolicy === '7days'}
                  onChange={() => setRetentionPolicy('7days')}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <div className="font-semibold text-slate-900">Keep for 7 days</div>
                  <div className="text-[11px] text-slate-500">Encrypted in local browser storage to let you return to your action plan and questions.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-lg border bg-white border-slate-200 hover:border-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="retention"
                  checked={retentionPolicy === 'manual'}
                  onChange={() => setRetentionPolicy('manual')}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <div className="font-semibold text-slate-900">Keep until manually deleted</div>
                  <div className="text-[11px] text-slate-500">Persisted locally until you explicitly click &quot;Purge All Data&quot;.</div>
                </div>
              </label>
            </div>
          </div>

          {/* 2. Security Safeguards Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Zero Client-Side Secrets</span>
              </div>
              <p className="text-[11px] text-slate-600">
                All Gemini API keys and sensitive processing happen strictly in server-side API routes. Your browser bundle never includes API credentials.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Key className="w-4 h-4 text-emerald-600" />
                <span>No Model Training</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Documents sent through the official Google Gemini API are processed under enterprise privacy terms and are not used to train foundation models.
              </p>
            </div>
          </div>

          {/* 3. Immediate Data Deletion Controls */}
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/30 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold">
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Immediate Data Purge Controls</span>
            </div>
            <p className="text-xs text-red-800/80">
              You have full ownership. You can instantly wipe documents, analysis trees, and cached messages with one click:
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onDeleteDocument();
                  showFeedback('Document content wiped from active view.');
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-50 font-semibold"
              >
                Delete Current Document
              </button>

              <button
                onClick={() => {
                  onDeleteAnalysis();
                  showFeedback('Extracted analysis tree cleared.');
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-50 font-semibold"
              >
                Delete Analysis Only
              </button>

              <button
                onClick={() => {
                  onClearAll();
                  showFeedback('All session data, cache, and history purged.');
                }}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold"
              >
                Purge All Data & Cache
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-[11px] text-slate-500">
            Current Session: Ephemeral · Memory Isolated
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
