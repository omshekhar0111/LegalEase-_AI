# LegalEase AI — Indian Legal Document Intelligence Platform

> **"LegalEase doesn't replace a lawyer. It helps you understand your document before you meet one."**

LegalEase AI is an AI-powered legal document intelligence platform built with **Google Gemini 2.5**, **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**, designed specifically for Indian legal contexts (agreements, termination notices, tenancy deeds, and consumer notices).

---

## 🌟 Core Differentiation: 15-Layer Legal Document Workflow

LegalEase AI transforms raw LLM intelligence into an application-level legal workflow:

1. **Document Structure & Layout Analysis**: Stamp paper header identification, page numbering, and formal schedule detection.
2. **Interactive Split-Screen Viewer**: Left pane displays document with zoom and search; right pane houses intelligence tabs.
3. **Evidence Anchoring**: Clicking any issue, clause, or deadline immediately auto-scrolls and highlights the exact clause on the document viewer.
4. **Issue & Attention Radar (Non-Arbitrary)**: 5 transparent categories (🔴 Critical, 🟠 High, 🟡 Review, 🔵 Informational, 🟢 No Issue) detailing *What*, *Where*, *Why it matters*, *Missing context*, and *Questions for counsel*.
5. **No Fake Legal Conclusions**: Strict anti-hallucination rules distinguish `[DOCUMENT FACT]` from `[AI INTERPRETATION]`, `[STATUTORY LEGAL CONTEXT]`, and `[PROFESSIONAL REVIEW REQUIRED]`.
6. **Statutory Grounding (Indian Legal Framework)**:
   - Section 27, Indian Contract Act 1872 (*Restraint of trade void / non-compete unenforceability*)
   - Section 4(6), Payment of Gratuity Act 1972 (*Statutory limits on gratuity forfeiture*)
   - Section 74, Indian Contract Act 1872 (*Liquidated damages vs penalty clauses*)
   - Consumer Protection Act 2019 (*Unfair contracts and deficiency of service*)
7. **Chronological Deadline Engine**: Date detection, calculation basis, countdown timers, and active **[Add Reminder]** support.
8. **Contradiction Detector**: Detects conflicting clauses (e.g., 30-day notice on Page 2 vs 7-day summary notice on Page 4).
9. **Missing Information Detector**: Identifies omitted attachments (e.g., unattached master agreements or NDA annexures).
10. **Document Quality Checks**: Detects blurry scans, missing page numbers, rotated scans, and unsigned signature lines.
11. **Action Plan Generator**: Document actions, information to collect, questions for counsel, and professional review triggers.
12. **Lawyer Question Generator**: Tailored questions with 1-click **[Copy Questions]**.
13. **Advocate Consultation Brief (PDF Export)**: Generates a standardized consultation brief exportable to PDF using `jsPDF`.
14. **Verified Indian Legal Aid Pathway**: Verified directory for NALSA (Helpline: 15100), Tele-Law, KSLSA, MSLSA, DSLSA, and Consumer Helpline 1915.
15. **Privacy Center & Ephemeral Retention**: User controls: *Delete immediately after analysis*, *Keep for 7 days*, or *Manual deletion*.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Create `.env.local` with your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, LegalEase AI automatically activates its high-fidelity deterministic Indian legal intelligence engine, ensuring 100% offline uptime for hackathon judges.)*

### 3. Run Production Build or Dev Server
```bash
# Development mode
npm run dev

# Production build and run
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 3-Minute Hackathon Demo Script

1. Open [http://localhost:3000](http://localhost:3000).
2. Click **"Try Demo"** (loads the *TechSphere Solutions Termination Notice*).
3. Watch the 7-stage Gemini analysis pipeline complete in real time.
4. Review extracted document type, parties (*TechSphere vs Rajesh Sharma*), and 4-page structure.
5. In the **Attention Radar**, click the Critical issue: *"Post-Employment 24-Month Non-Compete Covenant"*.
6. Watch the left Document Viewer instantly scroll and highlight **Clause 7 on Page 3**!
7. Switch to **Ask LegalEase** and click the prompt: *"Why was Clause 7 flagged?"*.
8. Review the grounded response citing Section 27 of the Indian Contract Act 1872.
9. Open the **Contradictions & Context** tab to observe the detected 30-day vs 7-day notice discrepancy.
10. Switch to **Next Steps**, click **[Copy Lawyer Questions]**, and click **[Generate Brief]**.
11. Click **[Download PDF]** to generate the consultation brief.
12. Open the **Legal Aid Directory** to inspect verified NALSA (15100) and Tele-Law resources.
