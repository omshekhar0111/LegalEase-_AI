import { FullLegalAnalysis } from '@/types/legal';

export const DEMO_EMPLOYMENT_TERMINATION: FullLegalAnalysis = {
  metadata: {
    id: 'demo-doc-employment-01',
    title: 'Notice of Termination of Employment & Restrictive Covenants',
    fileName: 'TechSphere_Termination_RajeshSharma_Notice.pdf',
    fileSize: 482910,
    fileType: 'application/pdf',
    uploadTimestamp: '2026-10-05T10:30:00.000Z',
    jurisdiction: 'Bengaluru, Karnataka, India',
    pageCount: 4,
    language: 'English (Indian Legal Format)',
    documentType: 'Employment Termination Notice & Severance Agreement'
  },
  quality: {
    overallStatus: 'warning',
    blurryPages: [],
    missingPages: [],
    unreadableText: false,
    rotatedPages: [],
    incompleteDocument: true,
    suspiciousBlankPages: [],
    unclearSignatures: false,
    qualityNotes: [
      'Document text layout is crisp and machine-readable across all 4 pages.',
      'Notice refers to "Annexure A: Schedule of Company Assets & NDA dated 12 March 2021", but this Annexure was not attached in the uploaded file.',
      'Signatures of Authorised Signatory present on Page 4; Employee acknowledgment section is currently unsigned.'
    ],
    confidenceScore: 92
  },
  parties: [
    {
      name: 'TechSphere Solutions India Private Limited',
      role: 'Employer / Issuing Party',
      details: 'CIN: U72200KA2018PTC112345, Registered Office: Block B, Embassy TechVillage, Outer Ring Road, Devarabeesanahalli, Bengaluru, Karnataka 560103'
    },
    {
      name: 'Rajesh Sharma',
      role: 'Employee / Recipient',
      details: 'Employee ID: TS-8842, Senior Systems Engineer, Cloud Infrastructure Unit'
    }
  ],
  clauses: [
    {
      id: 'cl-1',
      clauseNumber: 'Clause 1',
      title: 'Preamble & Reference to Employment Agreement',
      category: 'other',
      pageNumber: 1,
      sourceText: 'This Notice of Termination ("Notice") is issued in accordance with Section 11 of the Employment Agreement dated March 12, 2021 ("Master Agreement") between TechSphere Solutions India Private Limited ("Company") and Mr. Rajesh Sharma ("Employee").',
      plainExplanation: 'This states that the notice is issued under the authority of a prior employment agreement entered into on 12 March 2021.',
      importance: 'medium',
      confidence: 'high'
    },
    {
      id: 'cl-2',
      clauseNumber: 'Clause 2',
      title: 'Grounds of Termination & Effective Date',
      category: 'termination',
      pageNumber: 1,
      sourceText: 'Due to ongoing organizational restructuring and downsizing within the Cloud Infrastructure Division, your employment with the Company shall terminate effective close of business on October 15, 2026 ("Effective Date").',
      plainExplanation: 'States that employment is being ended due to corporate restructuring, with the final working day designated as 15 October 2026.',
      importance: 'critical',
      confidence: 'high'
    },
    {
      id: 'cl-3',
      clauseNumber: 'Clause 3.1',
      title: 'Notice Period Discrepancy & Payment in Lieu',
      category: 'notice_period',
      pageNumber: 2,
      sourceText: 'Pursuant to Clause 11.2 of the Master Agreement, a standard notice period of thirty (30) calendar days or salary in lieu thereof is applicable to confirmed engineering personnel.',
      plainExplanation: 'Page 2 explicitly mentions that your original contract specifies a 30-day notice period or equivalent salary in lieu.',
      importance: 'high',
      confidence: 'high'
    },
    {
      id: 'cl-4',
      clauseNumber: 'Clause 4',
      title: 'Severance, Gratuity & Full and Final Settlement',
      category: 'salary',
      pageNumber: 2,
      sourceText: 'Subject to execution of the Comprehensive Waiver and Release in Clause 9, the Company shall process payment of October salary along with accrued leave encashment within 45 working days following asset clearance.',
      plainExplanation: 'Severance and October salary settlement are conditioned upon signing a comprehensive waiver releasing the company of claims, and will take up to 45 working days.',
      importance: 'high',
      confidence: 'high'
    },
    {
      id: 'cl-5',
      clauseNumber: 'Clause 5.3',
      title: 'Conditional Forfeiture of Statutory Gratuity',
      category: 'penalties',
      pageNumber: 3,
      sourceText: 'In the event the Employee initiates any dispute, complaint before any labour conciliation officer or authority, or fails to execute the Release within seven (7) calendar days, all statutory gratuity, bonus, and severance entitlements shall be deemed voluntarily forfeited and liquidated.',
      plainExplanation: 'The company claims that if you file a complaint, dispute the termination, or do not sign within 7 days, your statutory gratuity and bonuses will be forfeited.',
      importance: 'critical',
      confidence: 'high'
    },
    {
      id: 'cl-6',
      clauseNumber: 'Clause 7',
      title: 'Post-Employment Restrictive Covenant & Non-Compete',
      category: 'restrictive_provisions',
      pageNumber: 3,
      sourceText: 'For a period of twenty-four (24) months following the Effective Date, the Employee shall not, directly or indirectly, engage in, consult for, or accept employment with any entity operating within the cloud software or infrastructure domain within the territory of the Republic of India or ASEAN countries.',
      plainExplanation: 'Imposes a strict 24-month ban across India and ASEAN countries prohibiting you from taking any cloud engineering or consulting role with competitors.',
      importance: 'critical',
      confidence: 'high'
    },
    {
      id: 'cl-7',
      clauseNumber: 'Clause 8.1',
      title: 'Surrender of Company Assets & 7-Day Deadline',
      category: 'obligations',
      pageNumber: 4,
      sourceText: 'The Employee must surrender all Company laptops, security tokens, source code repositories, and proprietary documentation to the Bengaluru Facilities Desk no later than October 15, 2026, 17:00 IST.',
      plainExplanation: 'You are required to physically surrender all company devices, tokens, and materials by 5:00 PM on 15 October 2026.',
      importance: 'high',
      confidence: 'high'
    },
    {
      id: 'cl-8',
      clauseNumber: 'Clause 9.4',
      title: 'Summary Discharge & Altered Notice Mandate',
      category: 'notice_period',
      pageNumber: 4,
      sourceText: 'Notwithstanding Clause 3 herein, the Company exercises summary termination under Special Operational Directives, providing seven (7) days notice in total from dispatch of this communication.',
      plainExplanation: 'Page 4 contradicts Page 2 by claiming summary discharge with only 7 days notice instead of the contractual 30 days notice.',
      importance: 'critical',
      confidence: 'high'
    },
    {
      id: 'cl-9',
      clauseNumber: 'Clause 12',
      title: 'Dispute Resolution & Exclusive Jurisdiction',
      category: 'jurisdiction',
      pageNumber: 4,
      sourceText: 'This Notice and any dispute arising therefrom shall be governed by the laws of India. The courts of competent jurisdiction located exclusively in Bengaluru, Karnataka shall have sole jurisdiction.',
      plainExplanation: 'Specifies that Indian law applies and any legal proceedings must be initiated solely before courts in Bengaluru, Karnataka.',
      importance: 'medium',
      confidence: 'high'
    }
  ],
  issues: [
    {
      id: 'iss-1',
      title: 'Post-Employment 24-Month Non-Compete Covenant',
      category: 'critical_attention',
      severity: 'critical',
      pageNumber: 3,
      clauseRef: 'Clause 7',
      detectedIssue: 'Broad post-employment restriction prohibiting employment in cloud infrastructure across India and ASEAN for 24 months.',
      sourceSnippet: 'For a period of twenty-four (24) months following the Effective Date, the Employee shall not, directly or indirectly, engage in, consult for, or accept employment with any entity operating within the cloud software or infrastructure domain...',
      whyItMatters: 'Under Indian law, Section 27 of the Indian Contract Act, 1872 renders agreements in restraint of trade void. Indian courts (including Supreme Court rulings such as Percept D’Mark v. Zaheer Khan) consistently hold that post-termination non-compete clauses are generally unenforceable against employees.',
      missingContext: 'The original Employment Agreement dated 12 March 2021 is not attached to check if garden leave or consideration was specified.',
      professionalConsultReason: 'Discuss with an advocate whether you can safely accept an offer from another technology company without exposing yourself to frivolous injunctive harassment.',
      disclaimer: 'This is an AI-generated issue flag, not a judicial determination that the clause is unlawful or unenforceable.',
      statutoryReference: 'Section 27, Indian Contract Act, 1872 (Agreements in restraint of trade void)',
      confidence: 'high'
    },
    {
      id: 'iss-2',
      title: 'Unilateral Forfeiture of Statutory Gratuity & Terminal Dues',
      category: 'critical_attention',
      severity: 'critical',
      pageNumber: 3,
      clauseRef: 'Clause 5.3',
      detectedIssue: 'Threatened automatic forfeiture of statutory gratuity and bonus if employee raises a legal grievance or does not sign release within 7 days.',
      sourceSnippet: '...In the event the Employee initiates any dispute, complaint before any labour conciliation officer... all statutory gratuity, bonus, and severance entitlements shall be deemed voluntarily forfeited and liquidated.',
      whyItMatters: 'Section 4(6) of the Payment of Gratuity Act, 1972 strictly limits forfeiture of gratuity to specific statutory grounds (e.g. termination for riotous/disorderly conduct involving moral turpitude or willful damage). Contractual clauses attempting to forfeit statutory gratuity for seeking legal redress are viewed with extreme skepticism by Indian courts and labour tribunals.',
      missingContext: 'Proof of completed years of continuous service (typically 5+ years required for gratuity eligibility under the Act).',
      professionalConsultReason: 'Consult a labour advocate or conciliation officer regarding legal entitlement to full gratuity settlement regardless of signing the release.',
      disclaimer: 'This is an AI-generated issue flag, not a binding legal opinion.',
      statutoryReference: 'Section 4(6), Payment of Gratuity Act, 1972',
      confidence: 'high'
    },
    {
      id: 'iss-3',
      title: 'Contradictory Notice Period: 30 Days (Page 2) vs 7 Days (Page 4)',
      category: 'high_attention',
      severity: 'high',
      pageNumber: 2,
      clauseRef: 'Clause 3.1 & Clause 9.4',
      detectedIssue: 'Internal contractual contradiction regarding whether 30 days notice or 7 days summary notice is applicable.',
      sourceSnippet: 'Page 2: "...standard notice period of thirty (30) calendar days or salary in lieu thereof..." vs Page 4: "...exercises summary termination... providing seven (7) days notice in total..."',
      whyItMatters: 'If your contract mandates 30 days notice or pay in lieu, a sudden 7-day termination without full pay for the remaining 23 days may constitute a breach of contractual notice obligations.',
      missingContext: 'Clause 11.2 of the 2021 Master Agreement which governs the exact summary discharge exceptions.',
      professionalConsultReason: 'Ask a lawyer whether you are legally entitled to 23 additional days of salary in lieu of notice.',
      disclaimer: 'This is an AI-generated comparison flag, not a conclusive breach finding.',
      confidence: 'high'
    },
    {
      id: 'iss-4',
      title: 'Mandatory Waiver of All Future Legal Claims as Condition of Pay',
      category: 'high_attention',
      severity: 'high',
      pageNumber: 2,
      clauseRef: 'Clause 4',
      detectedIssue: 'Making earned salary and leave encashment contingent on signing a blanket waiver releasing company from all statutory and common-law claims.',
      sourceSnippet: 'Subject to execution of the Comprehensive Waiver and Release in Clause 9, the Company shall process payment of October salary along with accrued leave encashment...',
      whyItMatters: 'Earned wages for days already worked cannot legally be made contingent upon waiving fundamental statutory rights.',
      missingContext: 'Full text of the Comprehensive Waiver mentioned in Clause 9.',
      professionalConsultReason: 'Have an advocate review the exact wording of the waiver before signing to ensure you do not inadvertently extinguish PF, ESIC, or gratuity entitlements.',
      disclaimer: 'This is an AI-generated issue flag.',
      confidence: 'high'
    },
    {
      id: 'iss-5',
      title: '45-Working-Day Settlement Timeline May Exceed Standard Norms',
      category: 'review',
      severity: 'medium',
      pageNumber: 2,
      clauseRef: 'Clause 4',
      detectedIssue: 'Settlement timeline extended to 45 working days (over 2 calendar months).',
      sourceSnippet: '...within 45 working days following asset clearance.',
      whyItMatters: 'Under standard Indian labour guidelines and state Shops & Establishments rules, full and final settlement is typically expected within 7 to 30 days of the last working day.',
      missingContext: 'Karnataka Shops and Commercial Establishments Act rules applicable to the establishment.',
      professionalConsultReason: 'Check if you can negotiate an expedited settlement schedule for release of PF transfer forms and Form 16.',
      disclaimer: 'This is an AI informational note.',
      confidence: 'medium'
    },
    {
      id: 'iss-6',
      title: 'Bengaluru Exclusive Court Jurisdiction Specified',
      category: 'informational',
      severity: 'low',
      pageNumber: 4,
      clauseRef: 'Clause 12',
      detectedIssue: 'Designation of Bengaluru, Karnataka as the sole forum for legal adjudication.',
      sourceSnippet: 'The courts of competent jurisdiction located exclusively in Bengaluru, Karnataka shall have sole jurisdiction.',
      whyItMatters: 'If you reside or relocate outside Bengaluru, any formal legal dispute would need to be instituted or defended within Bengaluru jurisdiction.',
      missingContext: 'Whether the employment was executed or performed primarily in Bengaluru.',
      professionalConsultReason: 'Inform your legal counsel of the jurisdiction clause if filing any conciliation petition.',
      disclaimer: 'Informational extraction.',
      confidence: 'high'
    }
  ],
  contradictions: [
    {
      id: 'contra-1',
      title: 'Notice Period Duration Contradiction',
      description: 'Page 2 stipulates a 30-day notice period or salary in lieu as per the Master Agreement, whereas Page 4 asserts summary discharge effective on 7 days notice.',
      itemA: {
        pageNumber: 2,
        location: 'Clause 3.1',
        text: 'Pursuant to Clause 11.2 of the Master Agreement, a standard notice period of thirty (30) calendar days or salary in lieu thereof is applicable...'
      },
      itemB: {
        pageNumber: 4,
        location: 'Clause 9.4',
        text: 'Notwithstanding Clause 3 herein, the Company exercises summary termination under Special Operational Directives, providing seven (7) days notice in total...'
      },
      guidance: 'Request written clarification from HR/Management regarding whether 23 days salary in lieu of notice will be included in the Full & Final Settlement.'
    }
  ],
  deadlines: [
    {
      id: 'dl-1',
      title: 'Mandatory Asset Surrender & Clearance',
      dueDate: '2026-10-15',
      dueDateFormatted: '15 October 2026, 17:00 IST',
      daysRemaining: 10,
      urgency: 'urgent',
      sourcePage: 4,
      sourceClause: 'Clause 8.1',
      calculationBasis: 'Explicit date and time stated in Clause 8.1',
      isReliable: true,
      reminderSet: false,
      reminderNotes: 'Ensure written signed receipt / acknowledgement from Facilities team.'
    },
    {
      id: 'dl-2',
      title: '7-Day Deadline to Execute Release or Contest',
      dueDate: '2026-10-15',
      dueDateFormatted: '15 October 2026 (7 days from notice receipt)',
      daysRemaining: 10,
      urgency: 'urgent',
      sourcePage: 3,
      sourceClause: 'Clause 5.3',
      calculationBasis: 'Calculated as 7 calendar days from notice date (October 8, 2026)',
      isReliable: true,
      warningIfUnclear: 'Company claims rights forfeiture after 7 days; do not sign without legal review.',
      reminderSet: false
    },
    {
      id: 'dl-3',
      title: 'Estimated Full & Final (FnF) Settlement Payout',
      dueDate: '2026-12-18',
      dueDateFormatted: '18 December 2026 (Approx. 45 working days)',
      daysRemaining: 74,
      urgency: 'standard',
      sourcePage: 2,
      sourceClause: 'Clause 4',
      calculationBasis: 'Calculated based on 45 working days following asset surrender on 15 Oct 2026',
      isReliable: false,
      warningIfUnclear: 'Exact date depends on date of clearance sign-off by department heads.',
      reminderSet: false
    }
  ],
  missingInformation: [
    'The 2021 Master Employment Agreement referenced in Clause 1 & Clause 3.1 is not attached.',
    'Annexure A (Schedule of Company Assets & Non-Disclosure Agreement) is referenced on Page 1 but omitted from this file.',
    'Exact calculation sheet for accrued leave encashment (earned leave balance) is not specified.',
    'Breakup of Gratuity computation under Payment of Gratuity Act is absent.',
    'Proof of formal service or dispatch timestamp of this notice.'
  ],
  actionPlan: {
    documentActions: [
      {
        id: 'act-1',
        text: 'Do NOT sign the Comprehensive Waiver / Release in Clause 9 until you have reviewed it with a lawyer.',
        completed: false,
        sourceRef: 'Clause 4 & Clause 9'
      },
      {
        id: 'act-2',
        text: 'Prepare inventory of all company physical assets (laptop, charger, access badges) and obtain a signed physical receipt upon handover.',
        completed: false,
        sourceRef: 'Clause 8.1'
      },
      {
        id: 'act-3',
        text: 'Send a formal email asking for written clarification on the 23-day notice pay shortfall between Clause 3.1 and Clause 9.4.',
        completed: false,
        sourceRef: 'Clause 3.1'
      },
      {
        id: 'act-4',
        text: 'Download and archive your past 12 months salary slips, Form 16, PF UAN statements, and your original 2021 appointment letter.',
        completed: false
      }
    ],
    informationToCollect: [
      {
        id: 'col-1',
        text: 'Original Employment Agreement dated 12 March 2021',
        whyNeeded: 'Required to verify the original notice period terms and non-compete clauses.',
        completed: false
      },
      {
        id: 'col-2',
        text: 'PF Passbook / EPFO UAN Portal records showing service start date',
        whyNeeded: 'Needed to confirm 5+ continuous years of service for statutory gratuity entitlement.',
        completed: false
      },
      {
        id: 'col-3',
        text: 'Written handover acknowledgment document from Bangalore Facilities desk',
        whyNeeded: 'Prevents the employer from withholding settlement on grounds of unreturned equipment.',
        completed: false
      }
    ],
    questionsForLawyer: [
      {
        id: 'q-1',
        question: 'Is the 24-month non-compete clause in Clause 7 legally enforceable against me under Section 27 of the Indian Contract Act, 1872?',
        rationale: 'Post-employment restraints in India are generally void under Section 27, but employer injunction threats can disrupt future job offers.',
        priority: 'high'
      },
      {
        id: 'q-2',
        question: 'Can the employer legally withhold or forfeit my statutory gratuity under Clause 5.3 if I decline to sign their release or raise a dispute?',
        rationale: 'Section 4(6) of Payment of Gratuity Act provides very strict, narrow exceptions that do not include refusing to sign a release.',
        priority: 'high'
      },
      {
        id: 'q-3',
        question: 'Given the conflict between Clause 3.1 (30 days notice) and Clause 9.4 (7 days notice), can I claim 23 days notice pay in lieu as part of my settlement?',
        rationale: 'Arbitrary reduction of contractual notice period without cause may constitute wrongful termination or unpaid wage liability.',
        priority: 'high'
      },
      {
        id: 'q-4',
        question: 'What are the risks of signing the "Comprehensive Waiver and Release" if the company makes it mandatory for releasing my October salary?',
        rationale: 'Signing an unconditional release may prejudice your ability to claim pending dues or challenge unlawful deductions.',
        priority: 'medium'
      }
    ],
    professionalReviewTriggers: [
      {
        id: 'rev-1',
        reason: 'Clause 7 attempts a 24-month multi-country employment bar which could impair your livelihood if not addressed with counsel.',
        severity: 'critical'
      },
      {
        id: 'rev-2',
        reason: 'Threatened forfeiture of statutory gratuity in Clause 5.3 directly conflicts with mandatory provisions of the Payment of Gratuity Act, 1972.',
        severity: 'critical'
      },
      {
        id: 'rev-3',
        reason: 'Notice period conflict creates an actionable claim for salary in lieu of notice under Karnataka Shops & Establishments Act.',
        severity: 'high'
      }
    ]
  },
  lawyerBrief: {
    briefId: 'LB-2026-TS-8842',
    generatedAt: '2026-10-05T23:15:00.000Z',
    matterType: 'Employment Dispute / Severance & Post-Employment Restraint Review',
    documentType: 'Notice of Termination & Restrictive Covenants',
    partiesInvolved: [
      { name: 'TechSphere Solutions India Private Limited', role: 'Employer (CIN: U72200KA2018PTC112345)' },
      { name: 'Rajesh Sharma', role: 'Employee (Senior Systems Engineer)' }
    ],
    jurisdiction: 'Bengaluru, Karnataka (India)',
    keyDates: [
      { event: 'Notice Issuance Date', date: '08 October 2026', page: 1 },
      { event: 'Effective Termination Date', date: '15 October 2026', page: 1 },
      { event: 'Mandatory Asset Surrender Deadline', date: '15 October 2026 (17:00 IST)', page: 4 },
      { event: 'Full & Final Payout Window', date: 'Within 45 working days post-clearance', page: 2 }
    ],
    importantClauses: [
      {
        title: 'Post-Employment 24-Month Restraint',
        clauseRef: 'Clause 7',
        excerpt: 'For a period of twenty-four (24) months... Employee shall not engage in, consult for, or accept employment with any entity operating within cloud software in India or ASEAN...',
        page: 3
      },
      {
        title: 'Forfeiture of Gratuity on Grievance',
        clauseRef: 'Clause 5.3',
        excerpt: 'In the event Employee initiates any dispute, complaint before labour conciliation officer... all statutory gratuity, bonus, and severance shall be deemed voluntarily forfeited...',
        page: 3
      },
      {
        title: 'Contradictory Notice Period',
        clauseRef: 'Clause 3.1 & 9.4',
        excerpt: 'Page 2 cites 30-day standard notice; Page 4 imposes 7-day summary notice without payment in lieu.',
        page: 2
      }
    ],
    potentialIssues: [
      { issue: 'Post-employment non-compete covenant prima facie void under Section 27, Indian Contract Act 1872', severity: 'Critical', page: 3 },
      { issue: 'Conditional forfeiture of statutory gratuity contrary to Section 4(6) Payment of Gratuity Act 1972', severity: 'Critical', page: 3 },
      { issue: 'Discrepancy in notice period creating claim for 23 days salary in lieu', severity: 'High', page: 2 },
      { issue: 'Blanket release requirement conditioning payment of earned October salary', severity: 'High', page: 2 }
    ],
    userQuestions: [
      'Is the 24-month non-compete clause in Clause 7 legally enforceable against me under Section 27 of the Indian Contract Act?',
      'Can the employer legally withhold or forfeit my statutory gratuity under Clause 5.3 if I decline to sign their release or raise a dispute?',
      'Given the conflict between Clause 3.1 (30 days notice) and Clause 9.4 (7 days notice), can I claim 23 days notice pay in lieu?',
      'What are the legal implications of signing the release prior to receiving full settlement?'
    ],
    missingInformation: [
      'Original Employment Agreement dated 12 March 2021',
      'Annexure A (Schedule of Company Assets and NDA)',
      'Detailed itemized calculation of accrued leave encashment and statutory gratuity',
      'Proof of date of delivery of notice'
    ],
    relevantPages: [1, 2, 3, 4],
    professionalDisclaimer: 'This Lawyer Brief was prepared with LegalEase AI for client-counsel consultation purposes. It constitutes structured document extraction and preliminary legal issue flagging, not formal legal opinion or legal representation.'
  },
  pages: [
    {
      pageNumber: 1,
      heading: 'TECHSPHERE SOLUTIONS INDIA PRIVATE LIMITED\nRegistered Office: Embassy TechVillage, Outer Ring Road, Bengaluru 560103\nCIN: U72200KA2018PTC112345',
      paragraphs: [
        {
          id: 'p1-date',
          text: 'Date: October 08, 2026\nTo:\nMr. Rajesh Sharma\nEmployee ID: TS-8842\nSenior Systems Engineer — Cloud Infrastructure\nBengaluru, Karnataka\n\nSUBJECT: NOTICE OF TERMINATION OF EMPLOYMENT & POST-EMPLOYMENT RESTRICTIVE COVENANTS'
        },
        {
          id: 'p1-cl1',
          clauseRef: 'Clause 1',
          text: 'Clause 1: Preamble & Reference to Employment Agreement\nThis Notice of Termination ("Notice") is issued in accordance with Section 11 of the Employment Agreement dated March 12, 2021 ("Master Agreement") between TechSphere Solutions India Private Limited ("Company") and Mr. Rajesh Sharma ("Employee").'
        },
        {
          id: 'p1-cl2',
          clauseRef: 'Clause 2',
          hasWarning: true,
          text: 'Clause 2: Grounds of Termination & Effective Date\nDue to ongoing organizational restructuring and downsizing within the Cloud Infrastructure Division, your employment with the Company shall terminate effective close of business on October 15, 2026 ("Effective Date"). After the Effective Date, you shall have no authority to represent the Company in any capacity.'
        }
      ]
    },
    {
      pageNumber: 2,
      heading: 'PAGE 2 — TERMS OF NOTICE & SEVERANCE SETTLEMENT',
      paragraphs: [
        {
          id: 'p2-cl3',
          clauseRef: 'Clause 3.1',
          hasWarning: true,
          text: 'Clause 3.1: Notice Period Discrepancy & Payment in Lieu\nPursuant to Clause 11.2 of the Master Agreement, a standard notice period of thirty (30) calendar days or salary in lieu thereof is applicable to confirmed engineering personnel.'
        },
        {
          id: 'p2-cl4',
          clauseRef: 'Clause 4',
          hasWarning: true,
          text: 'Clause 4: Severance, Gratuity & Full and Final Settlement\nSubject to execution of the Comprehensive Waiver and Release in Clause 9, the Company shall process payment of October salary along with accrued leave encashment within 45 working days following asset clearance. Payment shall be remitted to the salary account on record subject to applicable TDS deductions.'
        }
      ]
    },
    {
      pageNumber: 3,
      heading: 'PAGE 3 — RESTRICTIVE COVENANTS & STATUTORY CLAIMS',
      paragraphs: [
        {
          id: 'p3-cl5',
          clauseRef: 'Clause 5.3',
          hasWarning: true,
          text: 'Clause 5.3: Conditional Forfeiture of Statutory Gratuity\nIn the event the Employee initiates any dispute, complaint before any labour conciliation officer or authority, or fails to execute the Release within seven (7) calendar days, all statutory gratuity, bonus, and severance entitlements shall be deemed voluntarily forfeited and liquidated.'
        },
        {
          id: 'p3-cl6',
          clauseRef: 'Clause 7',
          hasWarning: true,
          text: 'Clause 7: Post-Employment Restrictive Covenant & Non-Compete\nFor a period of twenty-four (24) months following the Effective Date, the Employee shall not, directly or indirectly, engage in, consult for, or accept employment with any entity operating within the cloud software or infrastructure domain within the territory of the Republic of India or ASEAN countries.'
        }
      ]
    },
    {
      pageNumber: 4,
      heading: 'PAGE 4 — ASSET SURRENDER, SUMMARY NOTICE & JURISDICTION',
      paragraphs: [
        {
          id: 'p4-cl7',
          clauseRef: 'Clause 8.1',
          hasWarning: true,
          text: 'Clause 8.1: Surrender of Company Assets & 7-Day Deadline\nThe Employee must surrender all Company laptops, security tokens, source code repositories, and proprietary documentation to the Bengaluru Facilities Desk no later than October 15, 2026, 17:00 IST.'
        },
        {
          id: 'p4-cl8',
          clauseRef: 'Clause 9.4',
          hasWarning: true,
          text: 'Clause 9.4: Summary Discharge & Altered Notice Mandate\nNotwithstanding Clause 3 herein, the Company exercises summary termination under Special Operational Directives, providing seven (7) days notice in total from dispatch of this communication.'
        },
        {
          id: 'p4-cl9',
          clauseRef: 'Clause 12',
          text: 'Clause 12: Dispute Resolution & Exclusive Jurisdiction\nThis Notice and any dispute arising therefrom shall be governed by the laws of India. The courts of competent jurisdiction located exclusively in Bengaluru, Karnataka shall have sole jurisdiction.\n\nFor TechSphere Solutions India Pvt. Ltd.\n[Sd/- Authorized Signatory]\nDirector — Human Capital Management\n\nEmployee Acknowledgment: _______________________ (Unsigned)'
        }
      ]
    }
  ]
};

export const DEMO_RENTAL_AGREEMENT: FullLegalAnalysis = {
  metadata: {
    id: 'demo-doc-rental-02',
    title: 'Residential Tenancy Agreement & Security Deposit Instrument',
    fileName: 'Indiranagar_Bangalore_Rental_Agreement.pdf',
    fileSize: 395120,
    fileType: 'application/pdf',
    uploadTimestamp: '2026-10-04T14:15:00.000Z',
    jurisdiction: 'Bengaluru (Karnataka), India',
    pageCount: 3,
    language: 'English',
    documentType: 'Residential Lease / Tenancy Agreement'
  },
  quality: {
    overallStatus: 'ready',
    blurryPages: [],
    missingPages: [],
    unreadableText: false,
    rotatedPages: [],
    incompleteDocument: false,
    suspiciousBlankPages: [],
    unclearSignatures: false,
    qualityNotes: [
      'Document executed on ₹100 Karnataka E-Stamp paper.',
      'Signatures of Lessor, Lessee, and two witnesses verified on Page 3.'
    ],
    confidenceScore: 96
  },
  parties: [
    { name: 'K. Venkatesh Murthy', role: 'Lessor / Landlord', details: 'Resident of Indiranagar 1st Stage, Bengaluru' },
    { name: 'Pooja Iyer', role: 'Lessee / Tenant', details: 'Employed at Manyata Tech Park, Bengaluru' }
  ],
  clauses: [
    {
      id: 'r-cl-1',
      clauseNumber: 'Clause 2',
      title: 'Monthly Rent & Maintenance',
      category: 'payment',
      pageNumber: 1,
      sourceText: 'The Lessee shall pay a monthly rent of ₹38,000 (Rupees Thirty Eight Thousand only) on or before the 5th day of every calendar month.',
      plainExplanation: 'Monthly rent is ₹38,000 payable by the 5th of each month.',
      importance: 'high',
      confidence: 'high'
    },
    {
      id: 'r-cl-2',
      clauseNumber: 'Clause 4',
      title: 'Security Deposit & Lock-In Forfeiture',
      category: 'penalties',
      pageNumber: 1,
      sourceText: 'The Lessee has deposited an interest-free refundable security deposit of ₹3,80,000 (10 months rent). If the Lessee vacates the premises prior to the completion of the 11-month lock-in period, the entire security deposit of ₹3,80,000 shall stand unconditionally forfeited as liquidated damages.',
      plainExplanation: 'Imposes a total forfeiture of the entire ₹3.8 Lakh security deposit if you vacate before 11 months.',
      importance: 'critical',
      confidence: 'high'
    },
    {
      id: 'r-cl-3',
      clauseNumber: 'Clause 6',
      title: 'One-Month Painting & Renovation Deduction',
      category: 'payment',
      pageNumber: 2,
      sourceText: 'Upon vacating the premises, the Lessor shall automatically deduct one full month rent (₹38,000) towards whitewashing and maintenance, regardless of the actual condition of the apartment.',
      plainExplanation: 'Landlord automatically deducts ₹38,000 for painting irrespective of whether repainting is needed.',
      importance: 'high',
      confidence: 'high'
    },
    {
      id: 'r-cl-4',
      clauseNumber: 'Clause 8',
      title: 'Notice Period for Vacating',
      category: 'notice_period',
      pageNumber: 2,
      sourceText: 'Either party may terminate this agreement after the lock-in period by serving two (2) full calendar months written notice.',
      plainExplanation: 'Requires two months written notice after the lock-in period expires.',
      importance: 'medium',
      confidence: 'high'
    },
    {
      id: 'r-cl-5',
      clauseNumber: 'Clause 11',
      title: 'Governing Law & Jurisdiction',
      category: 'jurisdiction',
      pageNumber: 3,
      sourceText: 'This agreement shall be subject to the jurisdiction of the Civil Courts in Bengaluru only.',
      plainExplanation: 'Bengaluru civil courts have jurisdiction.',
      importance: 'medium',
      confidence: 'high'
    }
  ],
  issues: [
    {
      id: 'r-iss-1',
      title: 'Disproportionate Total Forfeiture of 10-Month Deposit',
      category: 'critical_attention',
      severity: 'critical',
      pageNumber: 1,
      clauseRef: 'Clause 4',
      detectedIssue: 'Unconditional forfeiture of ₹3,80,000 (10 months rent) for early exit during lock-in period.',
      sourceSnippet: 'If the Lessee vacates the premises prior to the completion of the 11-month lock-in period, the entire security deposit of ₹3,80,000 shall stand unconditionally forfeited as liquidated damages.',
      whyItMatters: 'Under Section 74 of the Indian Contract Act 1872 and landmark rulings (e.g. Kailash Nath Associates v. DDA), liquidated damages must represent a genuine pre-estimate of actual loss, not an arbitrary in terrorem penalty. Forfeiting ₹3.8 Lakh without proving actual loss is legally vulnerable.',
      missingContext: 'Whether the landlord was able to re-let the flat without suffering rental loss.',
      professionalConsultReason: 'Discuss with a civil advocate whether early vacation penalty can be limited to actual vacant days or 1 month rent rather than entire 10 months deposit.',
      disclaimer: 'AI-generated issue flag, not a court ruling.',
      statutoryReference: 'Section 74, Indian Contract Act 1872 (Compensation for breach of contract where penalty stipulated for)',
      confidence: 'high'
    },
    {
      id: 'r-iss-2',
      title: 'Automatic Unconditional Painting Deduction',
      category: 'review',
      severity: 'medium',
      pageNumber: 2,
      clauseRef: 'Clause 6',
      detectedIssue: 'Mandatory deduction of 1 month rent regardless of condition or wear and tear.',
      sourceSnippet: '...automatically deduct one full month rent (₹38,000) towards whitewashing and maintenance, regardless of the actual condition...',
      whyItMatters: 'Normal wear and tear is typically excluded from tenant deductions under tenancy principles. Model Tenancy Act recommends actual bill-backed reimbursement.',
      missingContext: 'Move-in inspection checklist and photos of wall condition.',
      professionalConsultReason: 'Request amendment to state "reasonable painting costs supported by actual contractor GST invoices".',
      disclaimer: 'AI negotiation advisory.',
      confidence: 'medium'
    }
  ],
  contradictions: [],
  deadlines: [
    {
      id: 'r-dl-1',
      title: 'Monthly Rent Payment Due Date',
      dueDate: '2026-11-05',
      dueDateFormatted: '5th of Every Month',
      urgency: 'standard',
      sourcePage: 1,
      sourceClause: 'Clause 2',
      calculationBasis: '5th calendar day of each running month',
      isReliable: true,
      reminderSet: false
    }
  ],
  missingInformation: [
    'Inventory list of electrical appliances (geysers, fans, AC units) and sanitary fittings is not annexed.',
    'Bank account details for electronic rent transfer not stated.',
    'Property tax payment receipt of current assessment year.'
  ],
  actionPlan: {
    documentActions: [
      { id: 'r-act-1', text: 'Conduct written move-in photographic inspection and email dated photos of walls and fittings to landlord.', completed: false },
      { id: 'r-act-2', text: 'Propose replacing the total deposit forfeiture clause with a standard 1-month rent penalty if 2 months advance notice is provided.', completed: false }
    ],
    informationToCollect: [
      { id: 'r-col-1', text: 'Signed copy of e-stamp certificate and agreement', whyNeeded: 'Proof of tenancy for address proof and deposit recovery', completed: false }
    ],
    questionsForLawyer: [
      { id: 'r-q-1', question: 'Is the 10-month deposit forfeiture legally enforceable if I need to relocate due to employment transfer?', rationale: 'Check applicability of force majeure or Section 74 penalty limits.', priority: 'high' }
    ],
    professionalReviewTriggers: [
      { id: 'r-rev-1', reason: 'High deposit amount (₹3.8L) coupled with unconditional forfeiture poses substantial financial risk.', severity: 'high' }
    ]
  },
  lawyerBrief: {
    briefId: 'LB-RENT-2026-092',
    generatedAt: '2026-10-04T15:00:00.000Z',
    matterType: 'Residential Tenancy / Deposit Forfeiture Review',
    documentType: 'Residential Tenancy Agreement',
    partiesInvolved: [
      { name: 'K. Venkatesh Murthy', role: 'Lessor / Landlord' },
      { name: 'Pooja Iyer', role: 'Lessee / Tenant' }
    ],
    jurisdiction: 'Bengaluru, Karnataka (India)',
    keyDates: [
      { event: 'Rent Payment Date', date: '5th of each month', page: 1 },
      { event: 'Notice Period Duration', date: '2 months notice after lock-in', page: 2 }
    ],
    importantClauses: [
      { title: 'Security Deposit Lock-In Penalty', clauseRef: 'Clause 4', excerpt: '...entire security deposit of ₹3,80,000 shall stand unconditionally forfeited as liquidated damages...', page: 1 }
    ],
    potentialIssues: [
      { issue: 'Unreasonable penalty clause under Section 74 Indian Contract Act', severity: 'Critical', page: 1 }
    ],
    userQuestions: [
      'Can the landlord legally withhold all ₹3.8 Lakh if I vacate at month 8 due to job transfer?'
    ],
    missingInformation: ['Move-in inventory report', 'Landlord khata and property tax receipt'],
    relevantPages: [1, 2, 3],
    professionalDisclaimer: 'Prepared for legal consultation purposes only.'
  },
  pages: [
    {
      pageNumber: 1,
      heading: 'RESIDENTIAL LEASE AGREEMENT — INDIRANAGAR, BENGALURU\nExecuted on Karnataka Government E-Stamp Paper (IN-KA99482718910023)',
      paragraphs: [
        { id: 'rp1-1', text: 'This Agreement of Lease made at Bengaluru on this 1st day of October 2026 between Mr. K. Venkatesh Murthy, hereinafter called the LESSOR, and Ms. Pooja Iyer, hereinafter called the LESSEE.' },
        { id: 'rp1-2', clauseRef: 'Clause 2', text: 'Clause 2: Monthly Rent & Maintenance\nThe Lessee shall pay a monthly rent of ₹38,000 (Rupees Thirty Eight Thousand only) on or before the 5th day of every calendar month into the Lessor’s nominated account.' },
        { id: 'rp1-3', clauseRef: 'Clause 4', hasWarning: true, text: 'Clause 4: Security Deposit & Lock-In Forfeiture\nThe Lessee has deposited an interest-free refundable security deposit of ₹3,80,000 (10 months rent). If the Lessee vacates the premises prior to the completion of the 11-month lock-in period, the entire security deposit of ₹3,80,000 shall stand unconditionally forfeited as liquidated damages.' }
      ]
    },
    {
      pageNumber: 2,
      heading: 'PAGE 2 — MAINTENANCE, PAINTING & NOTICE TERMS',
      paragraphs: [
        { id: 'rp2-1', clauseRef: 'Clause 6', hasWarning: true, text: 'Clause 6: One-Month Painting & Renovation Deduction\nUpon vacating the premises, the Lessor shall automatically deduct one full month rent (₹38,000) towards whitewashing and maintenance, regardless of the actual condition of the apartment.' },
        { id: 'rp2-2', clauseRef: 'Clause 8', text: 'Clause 8: Notice Period for Vacating\nEither party may terminate this agreement after the lock-in period by serving two (2) full calendar months written notice to the other party.' }
      ]
    },
    {
      pageNumber: 3,
      heading: 'PAGE 3 — JURISDICTION & SIGNATURES',
      paragraphs: [
        { id: 'rp3-1', clauseRef: 'Clause 11', text: 'Clause 11: Governing Law & Jurisdiction\nThis agreement shall be subject to the jurisdiction of the Civil Courts in Bengaluru only.\n\nIN WITNESS WHEREOF the parties have set their hands on the day, month and year first above written.\n\nLessor: [Sd/- K. Venkatesh Murthy]\nLessee: [Sd/- Pooja Iyer]\nWitness 1: [Sd/-]\nWitness 2: [Sd/-]' }
      ]
    }
  ]
};

export const DEMO_DOCUMENTS = [
  DEMO_EMPLOYMENT_TERMINATION,
  DEMO_RENTAL_AGREEMENT
];
