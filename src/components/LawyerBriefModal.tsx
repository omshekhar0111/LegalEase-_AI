'use client';

import React from 'react';
import { X, Download, Printer, Shield, FileText, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Advocate Consultation Brief</h2>
              <p className="text-xs text-slate-500">Brief ID: {brief.briefId} · Ready for advocate handoff</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Printable Document */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800 font-sans print:p-0">
          {/* Header block */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
              <span>PREPARED VIA LEGALEASE AI (INDIAN JURISDICTION)</span>
              <span>{new Date(brief.generatedAt).toLocaleDateString()}</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900">{brief.matterType}</h1>
            <p className="text-slate-600 text-xs mt-0.5">
              Governing Jurisdiction: <strong>{brief.jurisdiction}</strong> | Base Document: {brief.documentType}
            </p>
          </div>

          {/* 1. Parties */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
              1. Parties Involved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {brief.partiesInvolved.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-500">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Key Dates */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
              2. Key Chronological Dates & Deadlines
            </h3>
            <div className="space-y-1.5">
              {brief.keyDates.map((kd, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-medium text-slate-900">{kd.event}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-700">{kd.date}</span>
                    <span className="font-mono text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      Page {kd.page}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Potential Issues */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
              3. Areas of Legal Attention / Flagged Provisions
            </h3>
            <div className="space-y-2">
              {brief.potentialIssues.map((iss, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-red-50/40 border border-red-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-red-900">Issue #{idx + 1}</span>
                    <span className="text-[10px] font-mono px-1.5 rounded bg-white text-slate-600 border border-red-200">
                      Source: Page {iss.page}
                    </span>
                  </div>
                  <p className="text-slate-800">{iss.issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Important Clauses */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
              4. Relevant Clauses & Excerpts
            </h3>
            <div className="space-y-2">
              {brief.importantClauses.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-indigo-900">{c.clauseRef}: {c.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">Page {c.page}</span>
                  </div>
                  <p className="italic text-slate-600 font-serif text-[11px]">&quot;{c.excerpt}&quot;</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. User Questions for Lawyer */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
              5. Questions to Clarify with Advocate
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-800">
              {brief.userQuestions.map((q, idx) => (
                <li key={idx} className="font-medium text-slate-900">
                  {q}
                </li>
              ))}
            </ol>
          </div>

          {/* 6. Missing Information */}
          {brief.missingInformation.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                6. Missing Documents to Bring to Consultation
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                {brief.missingInformation.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 italic">
            <div className="flex items-center gap-1.5 font-bold not-italic text-slate-700 mb-1">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Informational Lawyer Brief</span>
            </div>
            {brief.professionalDisclaimer}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-[11px] text-slate-500">
            Export format: Standard Legal A4 PDF
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save PDF Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
};
