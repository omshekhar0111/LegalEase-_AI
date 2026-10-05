'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Search, ChevronLeft, ChevronRight, Bookmark, AlertCircle, FileText, CornerDownRight } from 'lucide-react';
import { DocumentPageContent, DocumentMetadata } from '@/types/legal';

interface DocumentViewerPaneProps {
  pages: DocumentPageContent[];
  metadata: DocumentMetadata;
  activePage: number;
  setActivePage: (page: number) => void;
  activeClauseRef?: string | null;
  onClearHighlight?: () => void;
}

export const DocumentViewerPane: React.FC<DocumentViewerPaneProps> = ({
  pages,
  metadata,
  activePage,
  setActivePage,
  activeClauseRef,
  onClearHighlight,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchMatches, setSearchMatches] = useState<number>(0);
  const activeClauseRefElement = useRef<HTMLDivElement | null>(null);

  const currentPageData = pages.find((p) => p.pageNumber === activePage) || pages[0];

  // Auto-scroll to active highlighted clause
  useEffect(() => {
    if (activeClauseRef && activeClauseRefElement.current) {
      activeClauseRefElement.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeClauseRef, activePage]);

  // Search occurrence calculation
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchMatches(0);
      return;
    }
    let count = 0;
    const term = searchTerm.toLowerCase();
    pages.forEach((p) => {
      p.paragraphs.forEach((para) => {
        const matches = (para.text.toLowerCase().match(new RegExp(term, 'g')) || []).length;
        count += matches;
      });
    });
    setSearchMatches(count);
  }, [searchTerm, pages]);

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleNextPage = () => {
    if (activePage < pages.length) {
      setActivePage(activePage + 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 border-r border-slate-200">
      {/* Viewer Toolbar */}
      <div className="bg-white px-3 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Document Info */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-slate-100 text-slate-700">
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 truncate max-w-[180px] sm:max-w-xs" title={metadata.fileName}>
              {metadata.fileName}
            </div>
            <div className="text-[10px] text-slate-500">
              {metadata.documentType} · {metadata.jurisdiction}
            </div>
          </div>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1 border border-slate-200">
          <button
            onClick={handlePrevPage}
            disabled={activePage <= 1}
            className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent text-slate-600"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 text-xs font-semibold text-slate-700 font-mono">
            Page {activePage} of {pages.length}
          </span>
          <button
            onClick={handleNextPage}
            disabled={activePage >= pages.length}
            className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent text-slate-600"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom & Search Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 pr-12 py-1 text-xs rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-32 sm:w-40"
            />
            {searchMatches > 0 && (
              <span className="absolute right-2 top-1.5 text-[10px] font-mono text-indigo-600 bg-indigo-50 px-1 rounded">
                {searchMatches}
              </span>
            )}
          </div>

          <div className="flex items-center bg-slate-50 rounded-md border border-slate-200">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-mono text-slate-600">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Evidence Banner */}
      {activeClauseRef && (
        <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-xs text-amber-900 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-1.5">
            <CornerDownRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              Evidence Focus: <strong className="font-mono text-amber-800">{activeClauseRef}</strong> on Page {activePage}
            </span>
          </div>
          {onClearHighlight && (
            <button
              onClick={onClearHighlight}
              className="text-[11px] text-amber-700 hover:text-amber-950 font-semibold underline"
            >
              Clear focus
            </button>
          )}
        </div>
      )}

      {/* Main Document Content Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-2xl bg-white shadow-md rounded-xl border border-slate-300 transition-transform duration-200 flex flex-col p-6 sm:p-10 min-h-[750px] relative"
        >
          {/* Subtle Stamp Paper Watermark / Header */}
          <div className="border-b-2 border-slate-800 pb-4 mb-6">
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-2">
              <span>LEGAL INSTRUMENT RECORD</span>
              <span>PAGE {activePage} OF {pages.length}</span>
            </div>
            {currentPageData.heading && (
              <div className="text-center font-serif text-slate-800 whitespace-pre-line text-xs font-semibold uppercase tracking-wide leading-relaxed">
                {currentPageData.heading}
              </div>
            )}
          </div>

          {/* Paragraphs and Clauses */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif flex-1">
            {currentPageData.paragraphs.map((p) => {
              const isTargetClause =
                activeClauseRef &&
                p.clauseRef &&
                (p.clauseRef.toLowerCase().includes(activeClauseRef.toLowerCase()) ||
                  activeClauseRef.toLowerCase().includes(p.clauseRef.toLowerCase()));

              return (
                <div
                  key={p.id}
                  ref={isTargetClause ? activeClauseRefElement : null}
                  className={`p-3 rounded-lg transition-all relative ${
                    isTargetClause
                      ? 'bg-amber-50/95 border-2 border-amber-400 ring-4 ring-amber-200/50 shadow-sm'
                      : p.hasWarning
                      ? 'border border-amber-200/80 bg-amber-50/20 hover:bg-amber-50/40'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Clause Badge */}
                  {p.clauseRef && (
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isTargetClause
                          ? 'bg-amber-200 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Bookmark className="w-2.5 h-2.5" />
                        {p.clauseRef}
                      </span>

                      {isTargetClause && (
                        <span className="text-[10px] font-sans font-bold text-amber-700 animate-pulse">
                          Highlighted Evidence
                        </span>
                      )}
                    </div>
                  )}

                  {/* Paragraph text with search highlighting */}
                  <div className="whitespace-pre-line text-slate-900">
                    {searchTerm.trim() ? (
                      highlightSearchText(p.text, searchTerm)
                    ) : (
                      p.text
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer of the Document Page */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Doc ID: {metadata.id}</span>
            <span>Verified Source Extract</span>
            <span>Page {activePage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function highlightSearchText(text: string, term: string) {
  if (!term.trim()) return text;
  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 text-slate-900 px-0.5 rounded font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
