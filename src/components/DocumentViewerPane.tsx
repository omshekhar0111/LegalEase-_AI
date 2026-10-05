'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Search, ChevronLeft, ChevronRight, Bookmark, FileText, CornerDownRight, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col h-full bg-[#0E172A] border-r border-white/10">
      {/* Viewer Toolbar (Midnight Navy Glass) */}
      <div className="bg-[#0B1220]/90 backdrop-blur-md px-3.5 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Document Info */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#172554] text-[#5B7CFA] border border-[#5B7CFA]/30">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-white truncate max-w-[180px] sm:max-w-xs" title={metadata.fileName}>
              {metadata.fileName}
            </div>
            <div className="text-[10px] text-[#94A3B8] font-mono">
              {metadata.documentType} · {metadata.jurisdiction}
            </div>
          </div>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
          <button
            onClick={handlePrevPage}
            disabled={activePage <= 1}
            className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-[#94A3B8] hover:text-white"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 text-xs font-semibold text-[#F8F6F1] font-mono">
            Page {activePage} / {pages.length}
          </span>
          <button
            onClick={handleNextPage}
            disabled={activePage >= pages.length}
            className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-[#94A3B8] hover:text-white"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom & Search Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search in document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-10 py-1 text-xs rounded-lg border border-white/15 bg-white/5 text-white placeholder:text-[#94A3B8] focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-[#5B7CFA] w-32 sm:w-44"
            />
            {searchMatches > 0 && (
              <span className="absolute right-2 top-1 text-[10px] font-mono text-[#5B7CFA] bg-[#172554] px-1.5 rounded border border-[#5B7CFA]/30">
                {searchMatches}
              </span>
            )}
          </div>

          <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
              className="p-1 text-[#94A3B8] hover:text-white"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-mono text-[#94A3B8]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
              className="p-1 text-[#94A3B8] hover:text-white"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Evidence Banner */}
      {activeClauseRef && (
        <div className="bg-[#172554]/95 border-b border-[#5B7CFA]/40 px-3.5 py-1.5 text-xs text-[#F8F6F1] flex items-center justify-between animate-fadeIn shadow-[0_0_15px_rgba(91,124,250,0.15)]">
          <div className="flex items-center gap-2">
            <CornerDownRight className="w-3.5 h-3.5 text-[#5B7CFA] shrink-0" />
            <span>
              Evidence Focus: <strong className="font-mono text-[#D4A72C]">{activeClauseRef}</strong> on Page {activePage}
            </span>
          </div>
          {onClearHighlight && (
            <button
              onClick={onClearHighlight}
              className="text-[11px] text-[#5B7CFA] hover:underline font-semibold"
            >
              Clear focus
            </button>
          )}
        </div>
      )}

      {/* Main Document Content Canvas (Warm Ivory Sheet) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-[#0B1220]/60">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-2xl parchment-sheet rounded-2xl transition-transform duration-200 flex flex-col p-6 sm:p-10 min-h-[750px] relative"
        >
          {/* Subtle Stamp Paper Header */}
          <div className="border-b-2 border-slate-900/80 pb-4 mb-6">
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4A72C]" />
                OFFICIAL RECORD INSTRUMENT
              </span>
              <span>PAGE {activePage} OF {pages.length}</span>
            </div>
            {currentPageData.heading && (
              <div className="text-center font-serif text-slate-900 whitespace-pre-line text-xs font-bold uppercase tracking-wider leading-relaxed">
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
                  className={`p-3.5 rounded-xl transition-all relative ${
                    isTargetClause
                      ? 'bg-amber-100/90 border-2 border-[#D4A72C] ring-4 ring-[#D4A72C]/30 shadow-lg text-slate-950 font-medium'
                      : p.hasWarning
                      ? 'border border-amber-300/80 bg-amber-50/50 hover:bg-amber-100/40'
                      : 'hover:bg-black/[0.02]'
                  }`}
                >
                  {/* Clause Badge */}
                  {p.clauseRef && (
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isTargetClause
                          ? 'bg-[#172554] text-[#F8F6F1] border border-[#5B7CFA]/40 shadow-xs'
                          : 'bg-[#EDE8DC] text-slate-800 border border-slate-300/70'
                      }`}>
                        <Bookmark className="w-2.5 h-2.5" />
                        {p.clauseRef}
                      </span>

                      {isTargetClause && (
                        <span className="text-[10px] font-sans font-bold text-amber-800 animate-pulse flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#D4A72C]" />
                          Active Evidence Focus
                        </span>
                      )}
                    </div>
                  )}

                  {/* Paragraph text with search highlighting */}
                  <div className="whitespace-pre-line text-slate-900 leading-relaxed">
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
          <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Doc ID: {metadata.id}</span>
            <span>Evidence-Mapped Document</span>
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
          <mark key={i} className="bg-[#5B7CFA]/30 text-slate-900 px-0.5 rounded font-semibold border-b border-[#5B7CFA]">
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
