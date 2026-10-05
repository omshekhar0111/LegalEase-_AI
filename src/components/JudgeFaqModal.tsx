'use client';

import React, { useState } from 'react';
import { X, Award, CheckCircle2, ArrowRight, Sparkles, Scale, ShieldCheck } from 'lucide-react';

interface JudgeFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDemoScript: () => void;
}

export const JudgeFaqModal: React.FC<JudgeFaqModalProps> = ({
  isOpen,
  onClose,
  onLaunchDemoScript,
}) => {
  const [activeTab, setActiveTab] = useState<'why' | 'wrong' | 'notlawyer' | 'gemini' | 'script'>('why');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#0B1220] text-[#F8F6F1] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-white/15">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#172554] border border-[#D4A72C]/40 text-[#D4A72C] flex items-center justify-center shadow-[0_0_15px_rgba(212,167,44,0.25)]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Judge & Evaluator Guide: LegalEase AI</h2>
              <p className="text-xs text-[#94A3B8]">Key differentiators, safety safeguards & 3-minute demo script</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex overflow-x-auto px-4 border-b border-white/10 bg-[#0B1220] text-xs space-x-1.5 py-2">
          <button
            onClick={() => setActiveTab('why')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
              activeTab === 'why' ? 'bg-[#5B7CFA] text-white font-bold shadow-[0_0_12px_rgba(91,124,250,0.3)]' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            1. Why Not Just Gemini?
          </button>
          <button
            onClick={() => setActiveTab('wrong')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
              activeTab === 'wrong' ? 'bg-[#5B7CFA] text-white font-bold shadow-[0_0_12px_rgba(91,124,250,0.3)]' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            2. What if AI is Wrong?
          </button>
          <button
            onClick={() => setActiveTab('notlawyer')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
              activeTab === 'notlawyer' ? 'bg-[#5B7CFA] text-white font-bold shadow-[0_0_12px_rgba(91,124,250,0.3)]' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            3. Is This a Lawyer?
          </button>
          <button
            onClick={() => setActiveTab('gemini')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
              activeTab === 'gemini' ? 'bg-[#5B7CFA] text-white font-bold shadow-[0_0_12px_rgba(91,124,250,0.3)]' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            4. What Uses Gemini?
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
              activeTab === 'script' ? 'bg-[#D4A72C] text-[#0B1220] font-bold shadow-[0_0_12px_rgba(212,167,44,0.3)]' : 'text-[#D4A72C] bg-[#D4A72C]/10 hover:bg-[#D4A72C]/20 border border-[#D4A72C]/30'
            }`}
          >
            ★ 3-Min Demo Script
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-[#94A3B8] leading-relaxed space-y-4">
          {/* TAB 1 */}
          {activeTab === 'why' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#172554]/70 border border-[#5B7CFA]/40 rounded-2xl text-white font-semibold">
                &quot;Gemini provides the multimodal intelligence, but LegalEase provides the complete legal-document workflow.&quot;
              </div>

              <p className="text-[#F8F6F1]">
                A raw chatbot cannot safely serve legal users. If a citizen pastes a PDF into a generic chat interface, they receive unverified walls of text with no evidence-grounded anchors, no deadline calculations, no contradiction detections, and dangerous hallucinated legal advice.
              </p>

              <h4 className="font-bold text-white text-sm">LegalEase Adds 15 Application-Level Workflow Layers:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Document Structure & Stamp Paper Extraction',
                  'Categorized Clause Intelligence & Plain Explanations',
                  'Split-Screen Interactive Clause-to-Source Mapping',
                  '5-Point Issue & Attention Radar (Non-arbitrary)',
                  'Chronological Deadline Extraction & Reminder Engine',
                  'Internal Contradiction Detection (e.g. 30 vs 7 days notice)',
                  'Missing Context & Unattached Annexure Flags',
                  'Document Quality Pre-Check (Blurry/Missing Pages)',
                  'Indian Jurisdiction-Aware Statutory Grounding',
                  'Strict Evidence Anchoring on Every Response',
                  'Action Planning (Checklist for immediate steps)',
                  'Contextual Lawyer-Question Generator',
                  'Exportable Advocate Consultation Brief (PDF)',
                  'Verified Indian Legal Aid Pathway (NALSA & Tele-Law)',
                  'User-Controlled Privacy & Ephemeral Retention'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5B7CFA] shrink-0" />
                    <span className="font-medium text-[#F8F6F1]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2 */}
          {activeTab === 'wrong' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#D4A72C]/10 border border-[#D4A72C]/30 rounded-2xl text-[#D4A72C] font-semibold">
                &quot;We answer the reliability question through system architecture, not by making false accuracy promises.&quot;
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="font-bold text-white mb-1">1. Every Extraction is Clickable to Exact Source</h4>
                  <p className="text-[#94A3B8]">
                    Users never have to take the AI&apos;s word. Clicking any clause, radar item, or chatbot answer instantly jumps to the exact page and clause text on the left viewer.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="font-bold text-white mb-1">2. No Definitive Legal Pronouncements</h4>
                  <p className="text-[#94A3B8]">
                    The prompt strictly forbids saying &quot;This clause is illegal&quot; or &quot;You will win&quot;. The UI strictly labels: <strong>[DOCUMENT FACT]</strong> vs <strong>[AI INTERPRETATION]</strong> vs <strong>[STATUTORY LEGAL CONTEXT]</strong> vs <strong>[PROFESSIONAL REVIEW REQUIRED]</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="font-bold text-white mb-1">3. Contradiction & Missing Information Checkers</h4>
                  <p className="text-[#94A3B8]">
                    Instead of pretending to know the whole picture, LegalEase actively warns when an agreement contradicts itself (e.g. Page 2 vs Page 4 notice duration) or omits cited schedules.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="font-bold text-white mb-1">4. Document Quality Safeguard</h4>
                  <p className="text-[#94A3B8]">
                    If pages are blurry, rotated, or incomplete, the system does not hallucinate; it issues an explicit quality warning and invites the user to provide a clearer copy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 */}
          {activeTab === 'notlawyer' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-[#172554] to-[#0B1220] border border-[#5B7CFA]/40 text-white rounded-2xl font-semibold">
                &quot;LegalEase doesn&apos;t replace a lawyer. It helps you understand your document before you meet one.&quot;
              </div>

              <p className="text-[#F8F6F1]">
                LegalEase AI is an intelligence and preparation platform for Indian citizens, tenants, employees, and small business owners.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/60">
                  <h5 className="font-bold text-red-300 mb-1.5">What LegalEase AI NEVER Does:</h5>
                  <ul className="space-y-1 list-disc pl-4 text-red-200">
                    <li>Does not provide formal legal representation</li>
                    <li>Does not create an attorney-client relationship</li>
                    <li>Does not promise court victories or guarantee outcomes</li>
                    <li>Does not execute dangerous unilateral legal actions</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/60">
                  <h5 className="font-bold text-emerald-300 mb-1.5">What LegalEase AI DOES:</h5>
                  <ul className="space-y-1 list-disc pl-4 text-emerald-200">
                    <li>Demystifies dense legalese into plain English</li>
                    <li>Highlights unfair terms (like 24-month non-competes)</li>
                    <li>Generates precise, intelligent questions for an advocate</li>
                    <li>Exports a standardized consultation brief to save consultation time and costs</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4 */}
          {activeTab === 'gemini' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#172554]/60 border border-[#5B7CFA]/40 rounded-2xl text-white font-semibold">
                &quot;Where is Google Gemini utilized throughout LegalEase AI?&quot;
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="text-white">1. Gemini Multimodal Document Understanding:</strong> Reads scanned PDF pages, headers, stamps, and layout structures without depending solely on legacy OCR.
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="text-white">2. Strict Structured Schema Extraction:</strong> Extracts 16-parameter JSON graphs mapping clauses, parties, monetary obligations, and penalties.
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="text-white">3. Reasoning Over Indian Legal Context:</strong> Identifies statutory conflicts (such as Section 27 Contract Act 1872 on restraint of trade, and Section 4(6) Gratuity Act).
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="text-white">4. Grounded Conversational Interaction:</strong> Powers &quot;Ask LegalEase&quot; with strict anti-hallucination rules and evidence tagging.
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="text-white">5. Function Calling & Tool Execution:</strong> Executes `get_clause`, `get_deadlines`, and `get_legal_aid_resources`.
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEMO SCRIPT */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#D4A72C]/10 border border-[#D4A72C]/30 rounded-2xl text-[#D4A72C] font-bold flex items-center justify-between">
                <span>The 3-Minute Hackathon Demonstration Script</span>
                <button
                  onClick={() => {
                    onClose();
                    onLaunchDemoScript();
                  }}
                  className="px-3.5 py-1.5 bg-[#5B7CFA] text-white rounded-xl text-xs hover:bg-[#5B7CFA]/85 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Run Live Demo Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  '1. Click "Try Demo" or choose "Employment Notice" on the landing page.',
                  '2. Watch the 7-stage Gemini analysis pipeline complete in real time.',
                  '3. Observe the extracted document type ("Termination Notice"), parties ("TechSphere vs Rajesh Sharma"), and 4-page structure.',
                  '4. Notice the detected deadline: 15 October 2026 (7-day asset surrender cutoff) with the [Add Reminder] feature.',
                  '5. In the Attention Radar, click the Critical issue: "Post-Employment 24-Month Non-Compete Covenant".',
                  '6. Watch the left Document Viewer instantly scroll and highlight Clause 7 on Page 3!',
                  '7. Switch to "Ask LegalEase" and click the prompt: "Why was Clause 7 flagged?".',
                  '8. Inspect the response showing [DOCUMENT FACT], [AI INTERPRETATION], and statutory citation of Section 27 Indian Contract Act 1872.',
                  '9. Open the "Contradictions & Context" tab to see the detected conflict: 30 days notice on Page 2 vs 7 days on Page 4.',
                  '10. Switch to "Next Steps", click [Copy Lawyer Questions], and then click [Generate Brief].',
                  '11. Click [Download PDF] in the brief modal to generate the clean, printable Advocate Consultation Brief!',
                  '12. Open the "Legal Aid Directory" to show verified NALSA (15100) and Tele-Law official helplines.'
                ].map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="font-semibold text-[#F8F6F1]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between rounded-b-2xl">
          <span className="text-[11px] text-[#94A3B8] font-mono">LegalEase AI · Google Gemini Hackathon 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#5B7CFA] hover:bg-[#5B7CFA]/85 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
