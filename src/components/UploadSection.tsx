'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, Sparkles, MapPin, AlertCircle, ArrowRight, Lock } from 'lucide-react';

interface UploadSectionProps {
  onFileProcess: (file: File, jurisdiction: string) => Promise<void>;
  onSelectDemo: (demoId: 'employment' | 'rental') => void;
  isProcessing: boolean;
  processingStageIndex: number;
}

export const PROCESSING_STAGES = [
  'Uploading document',
  'Reading document text & layout',
  'Multimodal layout understanding',
  'Extracting & categorizing clauses',
  'Detecting issues & attention radar',
  'Calculating chronological deadlines',
  'Synthesizing grounded analysis'
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Powered by Google Gemini 2.5 Multimodal Intelligence
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Understand your legal documents. <br />
          <span className="text-indigo-600">Know what matters. Know what to do next.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
          Turn complicated Indian contracts, termination notices, rental deeds, and legal letters into clear, evidence-linked clauses, attention items, deadlines, and questions for your lawyer.
        </p>

        {/* Anti-Replacement Trust Badge */}
        <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>LegalEase doesn’t replace your lawyer. It prepares you before you meet one.</span>
        </div>
      </div>

      {/* Main Upload Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {/* Jurisdiction Selector */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-100/60 text-indigo-800">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <label htmlFor="jurisdiction-select" className="text-xs font-bold text-slate-900 block">
                Target Legal Jurisdiction
              </label>
              <p className="text-[11px] text-slate-500">
                Indian states have distinct local rent control, shops & establishments, and stamp acts.
              </p>
            </div>
          </div>

          <select
            id="jurisdiction-select"
            value={selectedJurisdiction}
            onChange={(e) => setSelectedJurisdiction(e.target.value)}
            disabled={isProcessing}
            className="w-full sm:w-auto text-xs font-medium bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {JURISDICTIONS.map((j) => (
              <option key={j} value={j}>
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
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
                  : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/60'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-1">
                Drag and drop your legal document here, or <span className="text-indigo-600 underline">browse</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Supports PDF, JPG, JPEG, PNG (Up to 20MB)
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">Employment Agreements</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">Termination Notices</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">Rental Deeds</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">Legal Notices</span>
              </div>
            </div>

            {uploadError && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        ) : (
          /* Processing Pipeline Indicator (7 Stages) */
          <div className="py-8 px-4 text-center">
            <div className="w-12 h-12 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-5" />
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Analyzing Document with Gemini Multimodal Intelligence
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Extracting clause hierarchy, cross-checking statutory references, and calculating deadlines...
            </p>

            {/* 7-Step Progress Stepper */}
            <div className="max-w-md mx-auto space-y-2 text-left bg-slate-50 p-4 rounded-xl border border-slate-200">
              {PROCESSING_STAGES.map((stage, idx) => {
                const isDone = idx < processingStageIndex;
                const isCurrent = idx === processingStageIndex;
                return (
                  <div
                    key={stage}
                    className={`flex items-center gap-2.5 text-xs py-1 transition-all ${
                      isDone
                        ? 'text-emerald-700 font-medium'
                        : isCurrent
                        ? 'text-indigo-700 font-semibold'
                        : 'text-slate-400'
                    }`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
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
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Encrypted in transit · Backend-only AI processing · User-controlled deletion</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Never used to train foundation models
          </div>
        </div>
      </div>

      {/* Try Demo Cards (Prominently placed for hackathon judges) */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Or test instantly with pre-loaded fictional Indian documents (1-Click Demo)
          </h2>
          <span className="text-[11px] text-indigo-600 font-medium">No upload required</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Employment Termination Notice */}
          <div
            onClick={() => onSelectDemo('employment')}
            className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  Recommended Demo Flow
                </span>
                <span className="text-xs text-slate-400">4 Pages</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Notice of Termination & Restrictive Covenants
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                TechSphere Solutions (Bengaluru) vs Rajesh Sharma. Contains 24-month non-compete (Section 27 flag), gratuity forfeiture clause, 7-day cutoff, and conflicting notice periods.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
              <span>Launch 3-Minute Hackathon Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Bangalore Rental Agreement */}
          <div
            onClick={() => onSelectDemo('rental')}
            className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Residential Tenancy
                </span>
                <span className="text-xs text-slate-400">3 Pages</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Bangalore E-Stamp Residential Lease Agreement
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                Indiranagar apartment lease. Flags ₹3.8 Lakh (10 months) deposit lock-in forfeiture clause under Section 74 Indian Contract Act and automatic painting deduction.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
              <span>Inspect Tenancy Agreement</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
