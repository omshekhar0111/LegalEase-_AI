'use client';

import React, { useState } from 'react';
import { X, BookOpen, ExternalLink, Phone, MapPin, CheckCircle2, Search, Scale, Sparkles } from 'lucide-react';
import { VERIFIED_LEGAL_AID_RESOURCES } from '@/data/legalAidDirectory';

interface LegalAidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalAidModal: React.FC<LegalAidModalProps> = ({ isOpen, onClose }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const filtered = VERIFIED_LEGAL_AID_RESOURCES.filter((res) => {
    const matchesType = filterType === 'all' || res.type === filterType;
    const matchesSearch =
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.jurisdictionScope.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#0B1220] text-[#F8F6F1] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-white/15">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#172554] to-[#0B1220] border border-[#5B7CFA]/40 text-[#5B7CFA] flex items-center justify-center shadow-[0_0_15px_rgba(91,124,250,0.25)]">
              <Scale className="w-5 h-5 text-[#D4A72C]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Verified Indian Legal Aid Pathway</h2>
              <p className="text-xs text-[#94A3B8]">
                Official constitutional & statutory legal aid resources across India
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Advisory Notice */}
        <div className="p-4 bg-[#172554]/40 border-b border-[#5B7CFA]/20 text-xs text-[#F8F6F1] flex items-start gap-2.5 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Consider checking whether you qualify for free legal aid in India:</strong> Under Section 12 of the Legal Services Authorities Act, 1987, free legal counsel and Lok Adalat dispute resolution are provided by the Government to eligible citizens (including women, industrial workmen, senior citizens, and lower-income families).
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'national', 'state', 'consumer', 'labour'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl font-medium capitalize transition-all cursor-pointer ${
                  filterType === type
                    ? 'bg-white text-slate-900 font-bold'
                    : 'bg-white/5 text-[#94A3B8] hover:text-white border border-white/10'
                }`}
              >
                {type === 'all' ? 'All Authorities' : type}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search by state or authority..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-white/15 bg-white/5 text-white placeholder:text-[#94A3B8] w-full sm:w-60 focus:outline-none focus:ring-1 focus:ring-[#5B7CFA]"
            />
          </div>
        </div>

        {/* List of Authorities */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-2xl glass-card-dark border border-white/10 hover:border-white/20 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{res.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Verified Official
                    </span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8] flex items-center gap-1.5 mt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#5B7CFA]" />
                    <span>Jurisdiction: {res.jurisdictionScope}</span>
                  </div>
                </div>

                <a
                  href={res.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#5B7CFA] hover:text-white flex items-center gap-1.5 shrink-0 self-start sm:self-auto bg-[#172554] border border-[#5B7CFA]/30 px-3 py-1.5 rounded-xl hover:border-[#5B7CFA] transition-all"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-[#94A3B8] mb-3 leading-relaxed">{res.description}</p>

              {/* Eligibility Criteria */}
              <div className="mb-3.5 p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono font-bold text-[#D4A72C] uppercase tracking-wider mb-1.5">
                  Key Eligibility Categories:
                </div>
                <ul className="text-xs text-[#F8F6F1] space-y-1 list-disc pl-4">
                  {res.eligibilityCriteria.map((crit, idx) => (
                    <li key={idx}>{crit}</li>
                  ))}
                </ul>
              </div>

              {/* Helpline & Address */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Phone className="w-3.5 h-3.5 text-[#5B7CFA]" />
                  <span>Helpline: {res.helpline}</span>
                </div>
                {res.address && (
                  <span className="text-[11px] text-[#94A3B8] truncate max-w-sm" title={res.address}>
                    {res.address}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] text-[11px] text-[#94A3B8] flex items-center justify-between rounded-b-2xl">
          <span>Official resources sourced directly from NALSA and Ministry of Law & Justice, Govt. of India.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
