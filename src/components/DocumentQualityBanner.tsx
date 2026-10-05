'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, FileWarning, Eye } from 'lucide-react';
import { DocumentQuality } from '@/types/legal';

interface DocumentQualityBannerProps {
  quality: DocumentQuality;
  onUploadClarification?: () => void;
  onSelectPage?: (page: number) => void;
}

export const DocumentQualityBanner: React.FC<DocumentQualityBannerProps> = ({
  quality,
  onUploadClarification,
  onSelectPage,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (quality.overallStatus === 'ready' && quality.confidenceScore >= 95) {
    return (
      <div className="bg-emerald-950/50 border-b border-emerald-800/60 px-4 py-2 text-xs text-emerald-300 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Document Quality Check Passed:</strong> All pages are machine-readable with high optical clarity (Confidence: {quality.confidenceScore}%).
          </span>
        </div>
      </div>
    );
  }

  const isWarning = quality.overallStatus === 'warning';

  return (
    <div className={`border-b px-4 py-2.5 text-xs transition-all backdrop-blur-md ${
      isWarning ? 'bg-amber-950/60 border-amber-800/80 text-amber-200' : 'bg-red-950/60 border-red-800/80 text-red-200'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 shrink-0 ${isWarning ? 'text-[#D4A72C]' : 'text-red-400'}`} />
          <div>
            <span className="font-bold text-white">
              {isWarning ? 'Document Integrity Alert:' : 'Critical Quality Warning:'}
            </span>{' '}
            <span>
              {quality.incompleteDocument
                ? 'The document references external agreements/annexures that are not attached.'
                : 'Some parts of this document cannot be reliably interpreted.'}
            </span>
            <span className="ml-2 font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-white">
              Confidence: {quality.confidenceScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onUploadClarification && (
            <button
              onClick={onUploadClarification}
              className="text-[11px] font-semibold underline text-[#5B7CFA] hover:text-white cursor-pointer"
            >
              Upload clearer copy
            </button>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 text-white cursor-pointer"
          >
            <span>{expanded ? 'Hide Details' : 'View Quality Notes'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-2.5 border-t border-white/10 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {quality.qualityNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-1.5 bg-black/30 p-2.5 rounded-xl border border-white/10 text-[#F8F6F1]">
                <FileWarning className="w-3.5 h-3.5 text-[#D4A72C] shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>

          {quality.missingPages.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
              <span className="font-semibold text-white">Missing Page Range:</span>
              <span>Pages {quality.missingPages.join(', ')} appear omitted.</span>
            </div>
          )}

          {quality.blurryPages.length > 0 && (
            <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
              <span className="font-semibold text-white">Low Readability:</span>
              {quality.blurryPages.map((p) => (
                <button
                  key={p}
                  onClick={() => onSelectPage && onSelectPage(p)}
                  className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1 hover:bg-white/20 text-white cursor-pointer"
                >
                  <Eye className="w-3 h-3 text-[#5B7CFA]" />
                  <span>Page {p}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
