'use client';

import React, { useState } from 'react';
import { X, Key, CheckCircle2, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
}) => {
  const [inputVal, setInputVal] = useState<string>(apiKey);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputVal.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputVal('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#0B1220] text-[#F8F6F1] rounded-2xl max-w-lg w-full shadow-2xl border border-white/15">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#172554] border border-[#5B7CFA]/30 text-[#5B7CFA] flex items-center justify-center shadow-[0_0_12px_rgba(91,124,250,0.25)]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Google Gemini API Configuration</h2>
              <p className="text-xs text-[#94A3B8]">Enable live Gemini multimodal extraction</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-[#94A3B8]">
          <div className="p-3.5 rounded-2xl bg-[#172554]/60 border border-[#5B7CFA]/30 flex items-start gap-2.5 text-[#F8F6F1]">
            <Sparkles className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Gemini 2.5 Flash Multimodal Pipeline:</strong> When an API key is provided, document uploads trigger live multimodal extraction, JSON schema structuring, and chat reasoning.
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full text-xs font-mono p-3 border border-white/15 bg-white/5 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B7CFA]"
            />
            <p className="text-[11px] text-[#94A3B8] mt-1.5">
              Your key is kept in browser memory and passed only via headers to our server-side Next.js API routes. It is never exposed in client bundles.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 text-[#94A3B8] space-y-1 text-[11px]">
            <div className="font-semibold text-white">No Key Available? No Problem!</div>
            <p>
              LegalEase AI is equipped with an integrated high-fidelity Indian legal extraction engine. The 3-minute hackathon demo and preloaded documents work with 100% offline reliability.
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-200 border border-emerald-800/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>API key configuration updated successfully!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between rounded-b-2xl">
          <button
            onClick={handleClear}
            className="text-xs text-red-400 hover:text-red-300 font-medium cursor-pointer"
          >
            Clear Key
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-xl bg-[#5B7CFA] hover:bg-[#5B7CFA]/85 text-white text-xs font-bold shadow-[0_0_12px_rgba(91,124,250,0.3)] transition-all cursor-pointer"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
