export type DocumentQualityStatus = 'ready' | 'warning' | 'critical';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type AttentionLevel = 'critical_attention' | 'high_attention' | 'review' | 'informational' | 'no_issue';

export interface DocumentMetadata {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadTimestamp: string;
  jurisdiction: string;
  pageCount: number;
  language: string;
  documentType: string;
}

export interface DocumentQuality {
  overallStatus: DocumentQualityStatus;
  blurryPages: number[];
  missingPages: number[];
  unreadableText: boolean;
  rotatedPages: number[];
  incompleteDocument: boolean;
  suspiciousBlankPages: number[];
  unclearSignatures: boolean;
  qualityNotes: string[];
  confidenceScore: number; // 0 to 100
}

export type ClauseCategory =
  | 'payment'
  | 'salary'
  | 'termination'
  | 'notice_period'
  | 'confidentiality'
  | 'liability'
  | 'indemnity'
  | 'penalties'
  | 'renewal'
  | 'cancellation'
  | 'dispute_resolution'
  | 'jurisdiction'
  | 'restrictive_provisions'
  | 'obligations'
  | 'deadlines'
  | 'other';

export interface Clause {
  id: string;
  clauseNumber: string;
  title: string;
  category: ClauseCategory;
  pageNumber: number;
  sourceText: string;
  plainExplanation: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  confidence: ConfidenceLevel;
}

export interface IssueAttentionItem {
  id: string;
  title: string;
  category: AttentionLevel;
  severity: 'critical' | 'high' | 'medium' | 'low';
  pageNumber: number;
  clauseRef: string;
  detectedIssue: string;
  sourceSnippet: string;
  whyItMatters: string;
  missingContext: string;
  professionalConsultReason: string;
  disclaimer: string;
  statutoryReference?: string;
  confidence: ConfidenceLevel;
}

export interface Contradiction {
  id: string;
  title: string;
  description: string;
  itemA: {
    pageNumber: number;
    text: string;
    location: string;
  };
  itemB: {
    pageNumber: number;
    text: string;
    location: string;
  };
  guidance: string;
}

export interface DeadlineItem {
  id: string;
  title: string;
  dueDate: string;
  dueDateFormatted: string;
  daysRemaining?: number;
  urgency: 'urgent' | 'upcoming' | 'standard';
  sourcePage: number;
  sourceClause: string;
  calculationBasis: string;
  isReliable: boolean;
  warningIfUnclear?: string;
  reminderSet?: boolean;
  reminderNotes?: string;
}

export interface ActionPlan {
  documentActions: Array<{
    id: string;
    text: string;
    completed: boolean;
    sourceRef?: string;
  }>;
  informationToCollect: Array<{
    id: string;
    text: string;
    whyNeeded: string;
    completed: boolean;
  }>;
  questionsForLawyer: Array<{
    id: string;
    question: string;
    rationale: string;
    priority: 'high' | 'medium';
  }>;
  professionalReviewTriggers: Array<{
    id: string;
    reason: string;
    severity: 'critical' | 'high';
  }>;
}

export interface LawyerBrief {
  briefId: string;
  generatedAt: string;
  matterType: string;
  documentType: string;
  partiesInvolved: Array<{
    name: string;
    role: string;
  }>;
  jurisdiction: string;
  keyDates: Array<{
    event: string;
    date: string;
    page: number;
  }>;
  importantClauses: Array<{
    title: string;
    clauseRef: string;
    excerpt: string;
    page: number;
  }>;
  potentialIssues: Array<{
    issue: string;
    severity: string;
    page: number;
  }>;
  userQuestions: string[];
  missingInformation: string[];
  relevantPages: number[];
  professionalDisclaimer: string;
}

export interface LegalAidResource {
  id: string;
  name: string;
  type: 'national' | 'state' | 'district' | 'consumer' | 'labour';
  jurisdictionScope: string;
  description: string;
  eligibilityCriteria: string[];
  officialPortal: string;
  helpline: string;
  address?: string;
  verifiedOfficial: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  sourceBadge?: {
    type: 'document' | 'external_source' | 'uncertain';
    pageNumber?: number;
    clauseRef?: string;
    sourceName?: string;
    sourceDate?: string;
  };
  confidence?: ConfidenceLevel;
  suggestedActions?: string[];
}

export interface DocumentPageContent {
  pageNumber: number;
  heading?: string;
  paragraphs: Array<{
    id: string;
    clauseRef?: string;
    text: string;
    isHighlighted?: boolean;
    hasWarning?: boolean;
  }>;
}

export interface FullLegalAnalysis {
  metadata: DocumentMetadata;
  quality: DocumentQuality;
  parties: Array<{ name: string; role: string; details?: string }>;
  clauses: Clause[];
  issues: IssueAttentionItem[];
  contradictions: Contradiction[];
  deadlines: DeadlineItem[];
  missingInformation: string[];
  actionPlan: ActionPlan;
  lawyerBrief: LawyerBrief;
  pages: DocumentPageContent[];
}
