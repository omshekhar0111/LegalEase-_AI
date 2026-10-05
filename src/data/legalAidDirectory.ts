import { LegalAidResource } from '@/types/legal';

export const VERIFIED_LEGAL_AID_RESOURCES: LegalAidResource[] = [
  {
    id: 'nalsa-national',
    name: 'National Legal Services Authority (NALSA)',
    type: 'national',
    jurisdictionScope: 'All India',
    description: 'Statutory body constituted under the Legal Services Authorities Act, 1987 to provide free legal services to eligible citizens and organize Lok Adalats.',
    eligibilityCriteria: [
      'Women and children',
      'Members of Scheduled Castes (SC) or Scheduled Tribes (ST)',
      'Industrial workmen / laborers',
      'Persons with disabilities or mental health conditions',
      'Persons in custody or protective custody',
      'Victims of trafficking or mass disasters',
      'Citizens with annual income below prescribed state limit (typically ₹1,00,000 - ₹3,00,000 depending on state)'
    ],
    officialPortal: 'https://nalsa.gov.in',
    helpline: '15100 (Toll-Free National Legal Aid Helpline)',
    address: 'B-Block, Ground Floor, Additional Building Complex, Supreme Court of India, New Delhi - 110001',
    verifiedOfficial: true,
  },
  {
    id: 'tele-law',
    name: 'Tele-Law (Department of Justice, Govt. of India)',
    type: 'national',
    jurisdictionScope: 'All India (Gram Panchayat / CSC / Mobile App)',
    description: 'Mainstreaming legal aid through Common Service Centres (CSC) to connect pre-litigation advice seekers with panel lawyers via video conferencing and telephone.',
    eligibilityCriteria: [
      'Free legal consultation for marginalized categories covered under Section 12 of LSA Act 1987',
      'Available at nominal charge or free through village-level CSC centers or the Tele-Law Mobile App'
    ],
    officialPortal: 'https://www.tele-law.in',
    helpline: '1800-599-0019 / Connect via nearest CSC Center',
    verifiedOfficial: true,
  },
  {
    id: 'kslsa-karnataka',
    name: 'Karnataka State Legal Services Authority (KSLSA)',
    type: 'state',
    jurisdictionScope: 'Karnataka (Bangalore, Mysore, Hubli-Dharwad, etc.)',
    description: 'Provides free and competent legal services to eligible persons in Karnataka, offering legal counsel, document drafting assistance, and Lok Adalat dispute settlement.',
    eligibilityCriteria: [
      'Residents of Karnataka meeting Section 12 criteria of LSA Act',
      'Annual family income not exceeding ₹3,00,000 (as amended for Karnataka)',
      'Senior citizens, women, workers, and accident victims'
    ],
    officialPortal: 'https://kslsa.kar.nic.in',
    helpline: '1800-425-90900 / 080-22111725',
    address: 'Nyaya Degula, 1st Floor, H. Siddaiah Road, Bangalore - 560027',
    verifiedOfficial: true,
  },
  {
    id: 'mslsa-maharashtra',
    name: 'Maharashtra State Legal Services Authority (MSLSA)',
    type: 'state',
    jurisdictionScope: 'Maharashtra (Mumbai, Pune, Nagpur, etc.)',
    description: 'Constitutional legal aid provider overseeing High Court and District Legal Services Authorities across Maharashtra.',
    eligibilityCriteria: [
      'Residents of Maharashtra under Section 12 LSA Act',
      'Annual income threshold up to ₹3,00,000'
    ],
    officialPortal: 'https://legalservices.maharashtra.gov.in',
    helpline: '022-22623863 / DLSA Helpline',
    address: 'High Court PWD Building, Fort, Mumbai - 400032',
    verifiedOfficial: true,
  },
  {
    id: 'dslsa-delhi',
    name: 'Delhi State Legal Services Authority (DSLSA)',
    type: 'state',
    jurisdictionScope: 'National Capital Territory of Delhi',
    description: 'Apex legal aid provider across all 11 district court complexes in NCT of Delhi with dedicated 24x7 legal aid clinics and helpline.',
    eligibilityCriteria: [
      'All women and children residing in Delhi (regardless of income)',
      'General category residents with annual income below ₹3,00,000'
    ],
    officialPortal: 'https://dslsa.org',
    helpline: '1516 (24x7 Delhi Legal Aid Toll-Free)',
    address: 'Central Office, Pre-Fab Building, Patiala House Courts, New Delhi - 110001',
    verifiedOfficial: true,
  },
  {
    id: 'nch-consumer',
    name: 'National Consumer Helpline (NCH / INGRAM)',
    type: 'consumer',
    jurisdictionScope: 'All India Consumer Disputes',
    description: 'Official grievance redressal portal operated under Ministry of Consumer Affairs for unfair trade practices, warranty breaches, defective services, and e-commerce disputes.',
    eligibilityCriteria: [
      'Any end-consumer facing deficiency of service or unfair trade practice in India',
      'Guidance for filing in District / State Consumer Commission via e-Daakhil'
    ],
    officialPortal: 'https://consumerhelpline.gov.in',
    helpline: '1915 / SMS to 8800001915 / WhatsApp 8800001915',
    verifiedOfficial: true,
  },
  {
    id: 'samadhan-labour',
    name: 'SAMADHAN Portal (Ministry of Labour & Employment)',
    type: 'labour',
    jurisdictionScope: 'Industrial & Employment Disputes (Central Sphere)',
    description: 'Online conciliation and adjudication tracking system for industrial disputes, wrongful termination, gratuity delays, and wage non-payment.',
    eligibilityCriteria: [
      'Workmen and employees seeking conciliation before Regional Labour Commissioners'
    ],
    officialPortal: 'https://samadhan.labour.gov.in',
    helpline: '1800-180-1551 (Shram Suvidha Helpline)',
    verifiedOfficial: true,
  }
];

export const AUTHORITATIVE_LEGAL_STATUTES = [
  {
    title: 'Indian Contract Act, 1872 — Section 27',
    subject: 'Agreements in restraint of trade, void',
    source: 'India Code (Legislative Department, Ministry of Law and Justice)',
    url: 'https://www.indiacode.nic.in/handle/123456789/2187',
    summary: 'Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void (subject to narrow exception of sale of goodwill). Under settled Supreme Court jurisprudence (e.g., Percept D’Mark (India) (P) Ltd. v. Zaheer Khan, Niranjan Shankar Golikari v. Century Spg. & Mfg. Co.), post-employment non-compete covenants are generally void and unenforceable in India.',
    citationDate: '2026'
  },
  {
    title: 'Payment of Gratuity Act, 1972 — Section 4(6)',
    subject: 'Forfeiture of Gratuity limited to specific statutory grounds',
    source: 'Ministry of Labour and Employment, Govt. of India',
    url: 'https://www.indiacode.nic.in/handle/123456789/1575',
    summary: 'Gratuity can be forfeited ONLY to the extent of actual damage/loss caused by willful omission/negligence, or wholly if employment was terminated for riotous or disorderly conduct, or acts involving moral turpitude during course of employment. Contractual clauses imposing unilateral automatic forfeiture are heavily scrutinized.',
    citationDate: '2026'
  },
  {
    title: 'Consumer Protection Act, 2019 — Section 2(47)',
    subject: 'Unfair Contract & Unfair Trade Practice',
    source: 'Department of Consumer Affairs, Govt. of India',
    url: 'https://www.indiacode.nic.in/handle/123456789/15256',
    summary: 'Defines unfair contract terms including requiring excessive consumer deposits, imposing unreasonable penalties, or unilateral termination without cause.',
    citationDate: '2026'
  },
  {
    title: 'Specific Relief Act, 1963 — Section 14 & 41',
    subject: 'Contracts not specifically enforceable',
    source: 'India Code (Govt. of India)',
    url: 'https://www.indiacode.nic.in/handle/123456789/1583',
    summary: 'Contracts dependent on personal qualifications or violative of positive freedom cannot be specifically enforced; courts will not grant injunctions to compel personal service.',
    citationDate: '2026'
  }
];
