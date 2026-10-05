'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, ShieldAlert, Sparkles, MapPin, ArrowRight, Lock, FileText, Cpu, Scale } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface UploadSectionProps {
  onFileProcess: (file: File, jurisdiction: string) => Promise<void>;
  onSelectDemo: (demoId: 'employment' | 'rental') => void;
  isProcessing: boolean;
  processingStageIndex: number;
}

export const PROCESSING_STAGES = [
  'Uploading document & layout tensors',
  'Multimodal visual structure extraction',
  'Parsing clauses, stamps & obligations',
  'Correlating Indian statutory precedents',
  'Executing Issue & Attention Radar',
  'Calculating chronological deadlines',
  'Synthesizing advocate consultation brief'
];

export const JURISDICTIONS = [
  'India (Federal / Central Acts)',
  'Karnataka (Bengaluru / High Court)',
  'Maharashtra (Mumbai / Bombay High Court)',
  'Delhi (NCT / Delhi High Court)',
  'Tamil Nadu (Chennai / Madras High Court)',
  'Telangana (Hyderabad)',
  'Uttar Pradesh (Allahabad / Lucknow)',
  'West Bengal (Kolkata)',
  'Other / Unspecified'
];

export const UploadSection: React.FC<UploadSectionProps> = ({
  onFileProcess,
  onSelectDemo,
  isProcessing,
  processingStageIndex,
}) => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('India (Federal / Central Acts)');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndUpload = async (file: File) => {
    setUploadError(null);
    const validExtensions = ['pdf', 'png', 'jpg', 'jpeg'];
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !validExtensions.includes(ext)) {
      setUploadError('Unsupported file format. Please upload a PDF, JPG, JPEG, or PNG document.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setUploadError('File size exceeds the 20MB limit. Please upload a compressed copy or single sections.');
      return;
    }

    try {
      await onFileProcess(file, selectedJurisdiction);
    } catch {
      setUploadError('Failed to process document. You can try a clearer scan or explore with our demo documents.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Cinematic Two-Column Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
        {/* Left Column: Hero Copy */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172554]/70 border border-[#5B7CFA]/30 text-[#5B7CFA] text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(91,124,250,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>AI Legal Document Intelligence · 2030 Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Understand your legal documents. <br />
            <span className="bg-gradient-to-r from-[#5B7CFA] via-[#93C5FD] to-[#D4A72C] bg-clip-text text-transparent">
              Know what matters. Know what to do next.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Turn dense Indian contracts, termination notices, tenancy deeds, and legal letters into clear, evidence-linked clauses, attention items, deadlines, and questions for your lawyer.
          </p>

          {/* Anti-Replacement Trust Badge */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <div className="inline-flex items-center gap-2 text-xs text-[#F8F6F1] bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#5B7CFA]" />
              <span>Doesn’t replace your lawyer. Prepares you before you meet one.</span>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-[#D4A72C] bg-[#D4A72C]/10 border border-[#D4A72C]/25 px-4 py-2 rounded-xl backdrop-blur-md">
              <Scale className="w-4 h-4" />
              <span>Statutory Grounding (Section 27 Contract Act)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Graphic */}
        <div className="lg:col-span-5 flex justify-center">
          <HeroVisual />
        </div>
      </div>

      {/* Main Upload Box (Glassmorphic Midnight Navy Surface) */}
      <div className="max-w-4xl mx-auto glass-card-dark rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 backdrop-blur-xl">
        {/* Jurisdiction Selector */}
        <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <label htmlFor="jurisdiction-select" className="text-xs font-bold text-[#F8F6F1] block">
                Target Legal Jurisdiction
              </label>
              <p className="text-[11px] text-[#94A3B8]">
                Indian states have distinct local rent control, shops & establishments, and stamp acts.
              </p>
            </div>
          </div>

          <select
            id="jurisdiction-select"
            value={selectedJurisdiction}
            onChange={(e) => setSelectedJurisdiction(e.target.value)}
            disabled={isProcessing}
            className="w-full sm:w-auto text-xs font-medium bg-[#0B1220] border border-white/20 rounded-xl px-3.5 py-2 text-[#F8F6F1] focus:outline-none focus:ring-2 focus:ring-[#5B7CFA] cursor-pointer"
          >
            {JURISDICTIONS.map((j) => (
              <option key={j} value={j} className="bg-[#0B1220] text-white">
                {j}
              </option>
            ))}
          </select>
        </div>

        {/* Drag and Drop Zone */}
        {!isProcessing ? (
          <div>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-[#5B7CFA] bg-[#5B7CFA]/10 scale-[0.99]'
                  : 'border-white/15 hover:border-[#5B7CFA]/60 hover:bg-white/[0.03]'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#172554] to-[#0B1220] border border-[#5B7CFA]/40 text-[#5B7CFA] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(91,124,250,0.25)]">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                Drag and drop your legal document here, or <span className="text-[#5B7CFA] underline">browse</span>
              </h3>
              <p className="text-xs text-[#94A3B8] mb-4">
                Supports PDF, JPG, JPEG, PNG (Up to 20MB) · Encrypted In-Memory Processing
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#94A3B8]">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[#F8F6F1] font-mono border border-white/10">Employment Agreements</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[#F8F6F1] font-mono border border-white/10">Termination Notices</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[#F8F6F1] font-mono border border-white/10">Rental Deeds</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[#F8F6F1] font-mono border border-white/10">Legal Notices</span>
              </div>
            </div>

            {uploadError && (
              <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        ) : (
          /* Processing Pipeline Indicator (7 Stages) */
          <div className="py-8 px-4 text-center">
            <div className="relative w-14 h-14 mx-auto mb-5">
              <div className="w-14 h-14 border-3 border-[#5B7CFA]/30 border-t-[#5B7CFA] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#5B7CFA]" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Analyzing Document with Gemini Multimodal Intelligence
            </h3>
            <p className="text-xs text-[#94A3B8] mb-6 max-w-md mx-auto">
              Extracting clause hierarchy, cross-checking Indian statutory precedents, and calculating deadlines...
            </p>

            {/* 7-Step Progress Stepper */}
            <div className="max-w-md mx-auto space-y-2 text-left bg-white/[0.03] p-4 rounded-xl border border-white/10">
              {PROCESSING_STAGES.map((stage, idx) => {
                const isDone = idx < processingStageIndex;
                const isCurrent = idx === processingStageIndex;
                return (
                  <div
                    key={stage}
                    className={`flex items-center gap-2.5 text-xs py-1 transition-all ${
                      isDone
                        ? 'text-emerald-400 font-medium'
                        : isCurrent
                        ? 'text-[#5B7CFA] font-bold'
                        : 'text-slate-600'
                    }`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5B7CFA] animate-ping" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                      )}
                    </div>
                    <span>{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#5B7CFA]" />
            <span>Encrypted in transit · Backend-only AI processing · User-controlled ephemeral deletion</span>
          </div>
          <div className="text-[11px] text-[#94A3B8]/70">
            Never used to train foundation models
          </div>
        </div>
      </div>

      {/* Preloaded Demo Cards (1-Click Hackathon Evaluation) */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
            Preloaded Fictional Indian Documents (1-Click Demo)
          </h2>
          <span className="text-[11px] text-[#5B7CFA] font-medium">Ready for instant judging</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Employment Termination Notice */}
          <div
            onClick={() => onSelectDemo('employment')}
            className="group p-5 glass-card-dark rounded-2xl border border-white/10 hover:border-[#5B7CFA]/50 hover:shadow-[0_10px_30px_rgba(91,124,250,0.15)] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-800">
                  Recommended Demo Flow
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">4 Pages</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#5B7CFA] transition-colors">
                Notice of Termination & Restrictive Covenants
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed line-clamp-2">
                TechSphere Solutions (Bengaluru) vs Rajesh Sharma. Highlights 24-month non-compete (Section 27 flag), gratuity forfeiture, 7-day cutoff, and conflicting notice periods.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#5B7CFA] font-bold">
              <span>Launch 3-Minute Hackathon Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Bangalore Rental Agreement */}
          <div
            onClick={() => onSelectDemo('rental')}
            className="group p-5 glass-card-dark rounded-2xl border border-white/10 hover:border-[#5B7CFA]/50 hover:shadow-[0_10px_30px_rgba(91,124,250,0.15)] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30">
                  Residential Tenancy
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">3 Pages</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#5B7CFA] transition-colors">
                Bangalore E-Stamp Residential Lease Agreement
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed line-clamp-2">
                Indiranagar apartment lease. Flags ₹3.8 Lakh (10 months) deposit lock-in forfeiture clause under Section 74 Indian Contract Act and automatic painting deduction.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#5B7CFA] font-bold">
              <span>Inspect Tenancy Agreement</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
