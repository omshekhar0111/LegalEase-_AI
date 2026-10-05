'use client';

import React, { useState } from 'react';
import { X, BookOpen, ExternalLink, Phone, MapPin, CheckCircle2, ShieldAlert, Search } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Verified Indian Legal Aid Pathway</h2>
              <p className="text-xs text-slate-500">
                Official constitutional & statutory legal aid services in India
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Advisory Notice */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 text-xs text-emerald-900 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong>Consider checking whether you qualify for free legal aid in India:</strong> Under Section 12 of the Legal Services Authorities Act, 1987, free legal counsel and Lok Adalat dispute resolution are provided by the Government to eligible citizens (including women, industrial workmen, senior citizens, and lower-income families).
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'national', 'state', 'consumer', 'labour'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-colors ${
                  filterType === type
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All Authorities' : type}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by state or authority..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 w-full sm:w-56 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* List of Authorities */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{res.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Verified Official
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Jurisdiction: {res.jurisdictionScope}</span>
                  </div>
                </div>

                <a
                  href={res.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 shrink-0 self-start sm:self-auto bg-emerald-50 px-2.5 py-1 rounded-md"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-600 mb-3">{res.description}</p>

              {/* Eligibility Criteria */}
              <div className="mb-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Key Eligibility Categories:
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {res.eligibilityCriteria.map((crit, idx) => (
                    <li key={idx}>{crit}</li>
                  ))}
                </ul>
              </div>

              {/* Helpline & Address */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Helpline: {res.helpline}</span>
                </div>
                {res.address && (
                  <span className="text-[11px] text-slate-500 truncate max-w-sm" title={res.address}>
                    {res.address}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between rounded-b-2xl">
          <span>Official resources sourced directly from NALSA and Ministry of Law & Justice, Govt. of India.</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
