import { GoogleGenAI } from '@google/genai';
import { FullLegalAnalysis, DocumentQuality } from '@/types/legal';
import { DEMO_EMPLOYMENT_TERMINATION } from '@/data/demoDocuments';
import { VERIFIED_LEGAL_AID_RESOURCES, AUTHORITATIVE_LEGAL_STATUTES } from '@/data/legalAidDirectory';

export const SYSTEM_PROMPT_ANALYSIS = `
You are LegalEase AI, an expert legal document intelligence engine specialized in Indian legal documents.
Your goal is to extract structured clauses, attention items, deadlines, quality assessments, and missing context with absolute accuracy.

CORE RULES:
1. NEVER invent facts, clauses, dates, case law, or statutory citations.
2. NEVER give definitive legal conclusions like "This is illegal", "You will win", "This contract is void". Use restrained, professional language: "This may warrant review", "Under Indian law (e.g. Section 27 Indian Contract Act), such terms are frequently held unenforceable, but consult a qualified advocate."
3. Every extraction MUST cite the exact page number and provide an exact quotation or close excerpt.
4. Distinguish clearly between:
   - DOCUMENT FACT (what is explicitly written)
   - AI INTERPRETATION (potential imbalance, risk flag, or ambiguity)
   - STATUTORY CONTEXT (applicable Indian statute, e.g. Indian Contract Act 1872, Payment of Gratuity Act 1972)
   - PROFESSIONAL REVIEW (what specific question to bring to a lawyer)
5. Detect contradictions (e.g. differing notice periods across pages) and missing attachments.
6. Evaluate document quality: check for blurriness, missing pages, incomplete schedules, or unsigned blocks.
7. Return strictly valid JSON adhering to the specified schema.
`;

export const SYSTEM_PROMPT_CHAT = `
You are LegalEase AI, an evidence-grounded legal assistant for Indian documents.
You are assisting an ordinary citizen, tenant, or employee.
You do NOT replace a lawyer. You help them understand the document and prepare intelligent questions for a lawyer.

GUIDELINES:
1. Ground your answers strictly in the document content provided.
2. Always prefix information with explicit tags:
   - [DOCUMENT FACT]: For statements directly quoted or verifiable from the text with (Page X, Clause Y).
   - [AI INTERPRETATION]: For analysis of potential risk or ambiguity.
   - [STATUTORY LEGAL CONTEXT]: For relevant Indian legal principles (e.g., Section 27 Indian Contract Act 1872, Section 74 Indian Contract Act, Payment of Gratuity Act 1972).
   - [PROFESSIONAL REVIEW REQUIRED]: For questions and steps the user must verify with a qualified advocate.
3. If an answer cannot be determined from the document, explicitly say: "I couldn't find that information in the uploaded document." Do not fabricate answers.
4. Never promise court outcomes or claim an agreement is unconditionally invalid.
`;

export function getGeminiClient(customApiKey?: string): GoogleGenAI | null {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export const LEGAL_FUNCTION_DECLARATIONS = [
  {
    name: 'get_clause',
    description: 'Retrieve exact text and legal analysis for a specific clause number or category in the analyzed document.',
    parameters: {
      type: 'OBJECT',
      properties: {
        clauseNumberOrTitle: {
          type: 'STRING',
          description: 'The clause number (e.g., "Clause 7", "Clause 3.1") or topic keyword (e.g. "termination", "non-compete")'
        }
      },
      required: ['clauseNumberOrTitle']
    }
  },
  {
    name: 'get_deadlines',
    description: 'Retrieve all identified chronological deadlines, notice windows, and statutory timelines extracted from the document.',
    parameters: {
      type: 'OBJECT',
      properties: {}
    }
  },
  {
    name: 'search_verified_legal_sources',
    description: 'Search official Indian legal statutes (e.g. Indian Contract Act 1872, Gratuity Act, Consumer Protection Act 2019) relevant to the issue.',
    parameters: {
      type: 'OBJECT',
      properties: {
        topic: {
          type: 'STRING',
          description: 'Legal topic such as "non-compete restraint", "gratuity forfeiture", "liquidated damages"'
        }
      },
      required: ['topic']
    }
  },
  {
    name: 'get_legal_aid_resources',
    description: 'Retrieve verified official Indian legal aid bodies (NALSA, State Legal Services Authorities, Tele-Law) and helpline numbers.',
    parameters: {
      type: 'OBJECT',
      properties: {
        stateOrRegion: {
          type: 'STRING',
          description: 'Target Indian state or region, e.g. "Karnataka", "Delhi", "Maharashtra", or "National"'
        }
      }
    }
  }
];

export async function executeLegalTool(name: string, args: Record<string, unknown>, analysisContext?: FullLegalAnalysis) {
  const context = analysisContext || DEMO_EMPLOYMENT_TERMINATION;

  switch (name) {
    case 'get_clause': {
      const q = String(args.clauseNumberOrTitle || '').toLowerCase();
      const matched = context.clauses.filter(
        c => c.clauseNumber.toLowerCase().includes(q) ||
             c.title.toLowerCase().includes(q) ||
             c.category.toLowerCase().includes(q)
      );
      return {
        matchedCount: matched.length,
        clauses: matched.map(m => ({
          clause: m.clauseNumber,
          title: m.title,
          page: m.pageNumber,
          excerpt: m.sourceText,
          plainExplanation: m.plainExplanation
        }))
      };
    }

    case 'get_deadlines': {
      return {
        deadlines: context.deadlines.map(d => ({
          title: d.title,
          dueDate: d.dueDateFormatted,
          page: d.sourcePage,
          clause: d.sourceClause,
          basis: d.calculationBasis,
          isReliable: d.isReliable
        }))
      };
    }

    case 'search_verified_legal_sources': {
      const topic = String(args.topic || '').toLowerCase();
      const results = AUTHORITATIVE_LEGAL_STATUTES.filter(
        s => s.title.toLowerCase().includes(topic) ||
             s.subject.toLowerCase().includes(topic) ||
             s.summary.toLowerCase().includes(topic)
      );
      return {
        statutes: (results.length > 0 ? results : AUTHORITATIVE_LEGAL_STATUTES.slice(0, 2)).map(s => ({
          title: s.title,
          subject: s.subject,
          source: s.source,
          summary: s.summary
        }))
      };
    }

    case 'get_legal_aid_resources': {
      const region = String(args.stateOrRegion || '').toLowerCase();
      const matched = VERIFIED_LEGAL_AID_RESOURCES.filter(
        r => r.jurisdictionScope.toLowerCase().includes(region) || r.type === 'national'
      );
      return {
        resources: matched.map(m => ({
          name: m.name,
          helpline: m.helpline,
          portal: m.officialPortal,
          scope: m.jurisdictionScope
        }))
      };
    }

    default:
      return { error: `Tool ${name} not recognized.` };
  }
}
