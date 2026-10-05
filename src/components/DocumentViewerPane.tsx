'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Search, ChevronLeft, ChevronRight, Bookmark, FileText, CornerDownRight, Sparkles, Scale, Gavel } from 'lucide-react';
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
    <div className="flex flex-col h-full bg-[#18040A] border-r border-red-500/20">
      {/* Viewer Toolbar (Obsidian Velvet Glass) */}
      <div className="bg-[#0F0307]/90 backdrop-blur-md px-3.5 py-2.5 border-b border-red-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Document Info */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#22060F] text-[#E11D48] border border-red-500/35 shadow-[0_0_8px_rgba(225,29,72,0.3)]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-white truncate max-w-[180px] sm:max-w-xs" title={metadata.fileName}>
              {metadata.fileName}
            </div>
            <div className="text-[10px] text-[#A1A1AA] font-mono">
              {metadata.documentType} · {metadata.jurisdiction}
            </div>
          </div>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-red-500/25">
          <button
            onClick={handlePrevPage}
            disabled={activePage <= 1}
            className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-[#A1A1AA] hover:text-white cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 text-xs font-semibold text-[#FAF7F2] font-mono">
            Page {activePage} / {pages.length}
          </span>
          <button
            onClick={handleNextPage}
            disabled={activePage >= pages.length}
            className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-[#A1A1AA] hover:text-white cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom & Search Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Search in document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-10 py-1 text-xs rounded-lg border border-red-500/30 bg-black/40 text-white placeholder:text-[#A1A1AA] focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-[#E11D48] w-32 sm:w-44"
            />
            {searchMatches > 0 && (
              <span className="absolute right-2 top-1 text-[10px] font-mono text-red-300 bg-red-950 px-1.5 rounded border border-red-800">
                {searchMatches}
              </span>
            )}
          </div>

          <div className="flex items-center bg-white/5 rounded-lg border border-red-500/20">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
              className="p-1 text-[#A1A1AA] hover:text-white cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-mono text-[#A1A1AA]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
              className="p-1 text-[#A1A1AA] hover:text-white cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Evidence Banner in Velvet Wine */}
      {activeClauseRef && (
        <div className="bg-[#22060F]/95 border-b border-red-500/40 px-3.5 py-1.5 text-xs text-[#FAF7F2] flex items-center justify-between animate-fadeIn shadow-[0_0_15px_rgba(225,29,72,0.2)]">
          <div className="flex items-center gap-2">
            <CornerDownRight className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
            <span>
              Evidence Focus: <strong className="font-mono text-[#D4AF37]">{activeClauseRef}</strong> on Page {activePage}
            </span>
          </div>
          {onClearHighlight && (
            <button
              onClick={onClearHighlight}
              className="text-[11px] text-red-300 hover:text-white underline font-semibold cursor-pointer"
            >
              Clear focus
            </button>
          )}
        </div>
      )}

      {/* Main Document Content Canvas (Warm Ivory Folio Sheet with Red Margin Line) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-[#0F0307]/70">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-2xl parchment-sheet rounded-2xl transition-transform duration-200 flex flex-col p-6 sm:p-10 pl-16 sm:pl-20 min-h-[750px] relative"
        >
          {/* Subtle Stamp Paper Header with Red Wax Seal Watermark */}
          <div className="border-b-2 border-slate-900/80 pb-4 mb-6">
            <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-2">
              <span className="flex items-center gap-1.5 font-bold text-red-900">
                <Scale className="w-3 h-3 text-[#E11D48]" />
                LEGAL FOLIO INSTRUMENT RECORD
              </span>
              <span className="font-bold text-red-950">PAGE {activePage} OF {pages.length}</span>
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
                      ? 'bg-red-50/95 border-2 border-[#E11D48] ring-4 ring-[#E11D48]/25 shadow-lg text-slate-950 font-medium'
                      : p.hasWarning
                      ? 'border border-red-300/80 bg-red-50/40 hover:bg-red-50/60'
                      : 'hover:bg-black/[0.02]'
                  }`}
                >
                  {/* Clause Badge */}
                  {p.clauseRef && (
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isTargetClause
                          ? 'bg-[#22060F] text-red-200 border border-red-500/40 shadow-xs'
                          : 'bg-[#EDE8DC] text-slate-800 border border-slate-300/70'
                      }`}>
                        <Bookmark className="w-2.5 h-2.5 text-[#E11D48]" />
                        {p.clauseRef}
                      </span>

                      {isTargetClause && (
                        <span className="text-[10px] font-sans font-bold text-red-700 animate-pulse flex items-center gap-1">
                          <Gavel className="w-3 h-3 text-[#D4AF37]" />
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
            <span className="font-serif italic text-red-950">Sealed Folio Copy</span>
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
          <mark key={i} className="bg-[#E11D48]/30 text-slate-900 px-0.5 rounded font-semibold border-b border-[#E11D48]">
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
