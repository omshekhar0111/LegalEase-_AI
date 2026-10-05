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
      <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs text-emerald-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Document Quality Check Passed:</strong> All pages are machine-readable with high optical clarity (Confidence: {quality.confidenceScore}%).
          </span>
        </div>
      </div>
    );
  }

  const isWarning = quality.overallStatus === 'warning';

  return (
    <div className={`border-b px-4 py-2.5 text-xs transition-all ${
      isWarning ? 'bg-amber-50/90 border-amber-200 text-amber-900' : 'bg-red-50 border-red-200 text-red-900'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 shrink-0 ${isWarning ? 'text-amber-600' : 'text-red-600'}`} />
          <div>
            <span className="font-bold">
              {isWarning ? 'Document Integrity Alert:' : 'Critical Quality Warning:'}
            </span>{' '}
            <span>
              {quality.incompleteDocument
                ? 'The document references external agreements/annexures that are not attached.'
                : 'Some parts of this document cannot be reliably interpreted.'}
            </span>
            <span className="ml-2 font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/70 border border-amber-300">
              Confidence: {quality.confidenceScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onUploadClarification && (
            <button
              onClick={onUploadClarification}
              className="text-[11px] font-semibold underline hover:text-amber-950"
            >
              Upload clearer copy
            </button>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-white/80 border border-amber-300 hover:bg-white text-amber-900"
          >
            <span>{expanded ? 'Hide Details' : 'View Quality Notes'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-2.5 border-t border-amber-200/80 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {quality.qualityNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-1.5 bg-white/60 p-2 rounded border border-amber-200">
                <FileWarning className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>

          {quality.missingPages.length > 0 && (
            <div className="flex items-center gap-1 text-[11px]">
              <span className="font-semibold">Missing Page Range:</span>
              <span>Pages {quality.missingPages.join(', ')} appear omitted.</span>
            </div>
          )}

          {quality.blurryPages.length > 0 && (
            <div className="flex items-center gap-2 text-[11px]">
              <span className="font-semibold">Low Readability:</span>
              {quality.blurryPages.map((p) => (
                <button
                  key={p}
                  onClick={() => onSelectPage && onSelectPage(p)}
                  className="px-1.5 py-0.5 rounded bg-white border border-amber-300 flex items-center gap-1 hover:bg-amber-100"
                >
                  <Eye className="w-3 h-3 text-amber-700" />
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
