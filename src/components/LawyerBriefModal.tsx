'use client';

import React from 'react';
import { X, Download, Printer, Shield, FileText } from 'lucide-react';
import { LawyerBrief } from '@/types/legal';
import { exportLawyerBriefToPdf } from '@/lib/pdfExport';

interface LawyerBriefModalProps {
  brief: LawyerBrief;
  isOpen: boolean;
  onClose: () => void;
}

export const LawyerBriefModal: React.FC<LawyerBriefModalProps> = ({
  brief,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    exportLawyerBriefToPdf(brief);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#0B1220] text-[#F8F6F1] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-white/15">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30 flex items-center justify-center shadow-[0_0_12px_rgba(91,124,250,0.25)]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Advocate Consultation Brief</h2>
              <p className="text-xs text-[#94A3B8] font-mono">Brief ID: {brief.briefId} · Standardized advocate handoff</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-[#5B7CFA] hover:bg-[#5B7CFA]/85 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(91,124,250,0.3)] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl border border-white/15 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors hidden sm:flex cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Printable Document */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#F8F6F1] font-sans print:p-0 print:text-black">
          {/* Header block */}
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between text-[#94A3B8] text-[10px] font-mono mb-1">
              <span>PREPARED VIA LEGALEASE AI (INDIAN JURISDICTION)</span>
              <span>{new Date(brief.generatedAt).toLocaleDateString()}</span>
            </div>
            <h1 className="text-xl font-bold text-white">{brief.matterType}</h1>
            <p className="text-[#94A3B8] text-xs mt-1">
              Governing Jurisdiction: <strong className="text-white">{brief.jurisdiction}</strong> | Base Document: {brief.documentType}
            </p>
          </div>

          {/* 1. Parties */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4A72C] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              1. Parties Involved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {brief.partiesInvolved.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Key Dates */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4A72C] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              2. Key Chronological Dates & Deadlines
            </h3>
            <div className="space-y-1.5">
              {brief.keyDates.map((kd, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-medium text-white">{kd.event}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#5B7CFA]">{kd.date}</span>
                    <span className="font-mono text-[10px] text-[#94A3B8] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                      Page {kd.page}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Potential Issues */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4A72C] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              3. Areas of Legal Attention / Flagged Provisions
            </h3>
            <div className="space-y-2">
              {brief.potentialIssues.map((iss, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-red-950/25 border border-red-900/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-red-300 font-mono">Issue #{idx + 1}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#94A3B8] border border-red-900/60">
                      Source: Page {iss.page}
                    </span>
                  </div>
                  <p className="text-[#F8F6F1]">{iss.issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Important Clauses */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4A72C] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              4. Relevant Clauses & Excerpts
            </h3>
            <div className="space-y-2">
              {brief.importantClauses.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#5B7CFA]">{c.clauseRef}: {c.title}</span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">Page {c.page}</span>
                  </div>
                  <p className="italic text-[#94A3B8] font-serif text-[11px]">&quot;{c.excerpt}&quot;</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. User Questions for Lawyer */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4A72C] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              5. Questions to Clarify with Advocate
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-[#F8F6F1]">
              {brief.userQuestions.map((q, idx) => (
                <li key={idx} className="font-medium">
                  {q}
                </li>
              ))}
            </ol>
          </div>

          {/* 6. Missing Information */}
          {brief.missingInformation.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-bold text-[#D4A72C] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                6. Missing Documents to Bring to Consultation
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-[#94A3B8]">
                {brief.missingInformation.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-[#94A3B8] italic">
            <div className="flex items-center gap-1.5 font-bold not-italic text-white mb-1">
              <Shield className="w-3.5 h-3.5 text-[#5B7CFA]" />
              <span>Informational Lawyer Brief</span>
            </div>
            {brief.professionalDisclaimer}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between rounded-b-2xl">
          <span className="text-[11px] text-[#94A3B8] font-mono">
            Format: Standard Legal A4 PDF
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-[#5B7CFA] hover:bg-[#5B7CFA]/85 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(91,124,250,0.3)] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save PDF Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
};
