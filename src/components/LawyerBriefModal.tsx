'use client';

import React from 'react';
import { X, Download, Printer, Shield, FileText, Scale, Gavel } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#0F0307] text-[#FAF7F2] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-red-500/25">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-red-500/20 flex items-center justify-between bg-white/[0.02] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#991B1B] to-[#E11D48] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_12px_rgba(225,29,72,0.4)]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Advocate Consultation Brief</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                  Folio {brief.briefId}
                </span>
              </h2>
              <p className="text-xs text-[#A1A1AA]">Standardized advocate handoff dossier with evidence anchors</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(225,29,72,0.4)] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl border border-red-500/30 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors hidden sm:flex cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#A1A1AA]" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Printable Document */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#FAF7F2] font-sans print:p-0 print:text-black">
          {/* Header block */}
          <div className="border-b border-red-500/20 pb-4">
            <div className="flex items-center justify-between text-[#A1A1AA] text-[10px] font-mono mb-1">
              <span>PREPARED VIA LEGALEASE AI (INDIAN JURISDICTION)</span>
              <span>{new Date(brief.generatedAt).toLocaleDateString()}</span>
            </div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Gavel className="w-5 h-5 text-[#D4AF37]" />
              {brief.matterType}
            </h1>
            <p className="text-[#A1A1AA] text-xs mt-1">
              Governing Jurisdiction: <strong className="text-white">{brief.jurisdiction}</strong> | Base Document: {brief.documentType}
            </p>
          </div>

          {/* 1. Parties */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 border-b border-red-500/20 pb-1">
              1. Parties Involved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {brief.partiesInvolved.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-red-500/20">
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-[11px] text-[#A1A1AA] mt-0.5">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Key Dates */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 border-b border-red-500/20 pb-1">
              2. Key Chronological Dates & Deadlines
            </h3>
            <div className="space-y-1.5">
              {brief.keyDates.map((kd, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-red-500/20">
                  <span className="font-medium text-white">{kd.event}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-300">{kd.date}</span>
                    <span className="font-mono text-[10px] text-[#A1A1AA] bg-black/40 px-2 py-0.5 rounded border border-red-500/20">
                      Page {kd.page}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Potential Issues */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 border-b border-red-500/20 pb-1">
              3. Areas of Legal Attention / Flagged Provisions
            </h3>
            <div className="space-y-2">
              {brief.potentialIssues.map((iss, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-red-950/30 border border-red-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-red-200 font-mono">Issue #{idx + 1}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#A1A1AA] border border-red-800">
                      Source: Page {iss.page}
                    </span>
                  </div>
                  <p className="text-[#FAF7F2]">{iss.issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Important Clauses */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 border-b border-red-500/20 pb-1">
              4. Relevant Clauses & Excerpts
            </h3>
            <div className="space-y-2">
              {brief.importantClauses.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-red-500/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-red-300">{c.clauseRef}: {c.title}</span>
                    <span className="text-[10px] font-mono text-[#A1A1AA]">Page {c.page}</span>
                  </div>
                  <p className="italic text-[#A1A1AA] font-serif text-[11px]">&quot;{c.excerpt}&quot;</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. User Questions for Lawyer */}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 border-b border-red-500/20 pb-1">
              5. Questions to Clarify with Advocate
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-[#FAF7F2]">
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
              <h3 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 border-b border-red-500/20 pb-1">
                6. Missing Documents to Bring to Consultation
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-[#A1A1AA]">
                {brief.missingInformation.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-red-500/20 text-[11px] text-[#A1A1AA] italic">
            <div className="flex items-center gap-1.5 font-bold not-italic text-white mb-1">
              <Shield className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Informational Lawyer Brief</span>
            </div>
            {brief.professionalDisclaimer}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-red-500/20 bg-white/[0.02] flex items-center justify-between rounded-b-2xl">
          <span className="text-[11px] text-[#A1A1AA] font-mono">
            Format: Standard Legal A4 PDF
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save PDF Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
};
