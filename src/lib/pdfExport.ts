import jsPDF from 'jspdf';
import { LawyerBrief } from '@/types/legal';

export function exportLawyerBriefToPdf(brief: LawyerBrief): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Deep navy
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('LEGALEASE AI — ADVOCATE CONSULTATION BRIEF', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('CONFIDENTIAL · PREPARED FOR LEGAL COUNSEL CONSULTATION', margin, 18);

  y = 32;

  // Title & Metadata
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`Matter: ${brief.matterType}`, margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Document Type: ${brief.documentType} | Brief ID: ${brief.briefId} | Date: ${new Date(brief.generatedAt).toLocaleDateString()}`, margin, y);
  y += 5;
  doc.text(`Jurisdiction: ${brief.jurisdiction}`, margin, y);
  y += 8;

  // Horizontal divider
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Parties Involved
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. PARTIES INVOLVED', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  brief.partiesInvolved.forEach((p) => {
    doc.text(`• ${p.name} — Role: ${p.role}`, margin + 4, y);
    y += 4.5;
  });
  y += 4;

  // Key Chronological Dates
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('2. KEY CHRONOLOGICAL DATES & DEADLINES', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  brief.keyDates.forEach((kd) => {
    doc.text(`• ${kd.event}: ${kd.date} (Source: Page ${kd.page})`, margin + 4, y);
    y += 4.5;
  });
  y += 4;

  // Potential Issues Flagged
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. DETECTED ISSUES & AREAS OF ATTENTION', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  brief.potentialIssues.forEach((iss) => {
    const text = `• [${iss.severity.toUpperCase()}] ${iss.issue} (Page ${iss.page})`;
    const lines = doc.splitTextToSize(text, contentWidth - 4);
    doc.text(lines, margin + 4, y);
    y += lines.length * 4.2;
  });
  y += 4;

  // Check page overflow
  if (y > 230) {
    doc.addPage();
    y = 20;
  }

  // Important Clauses
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('4. KEY RELEVANT CLAUSES', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  brief.importantClauses.forEach((c) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${c.clauseRef}: ${c.title} (Page ${c.page})`, margin + 4, y);
    y += 4;
    doc.setFont('helvetica', 'italic');
    const excerptLines = doc.splitTextToSize(`"${c.excerpt}"`, contentWidth - 8);
    doc.text(excerptLines, margin + 8, y);
    y += excerptLines.length * 3.8 + 2;
  });
  y += 3;

  // Questions for the Advocate
  if (y > 230) {
    doc.addPage();
    y = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('5. RECOMMENDED QUESTIONS TO DISCUSS WITH COUNSEL', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  brief.userQuestions.forEach((q, idx) => {
    const qText = `${idx + 1}. ${q}`;
    const lines = doc.splitTextToSize(qText, contentWidth - 4);
    doc.text(lines, margin + 4, y);
    y += lines.length * 4.2;
  });
  y += 4;

  // Missing Information
  if (brief.missingInformation.length > 0) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text('6. MISSING CONTEXT / DOCUMENTS TO COLLECT', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    brief.missingInformation.forEach((m) => {
      const lines = doc.splitTextToSize(`• ${m}`, contentWidth - 4);
      doc.text(lines, margin + 4, y);
      y += lines.length * 4.2;
    });
    y += 4;
  }

  // Footer Disclaimer
  const footerY = 282;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  const disclaimerText =
    'DISCLAIMER: LegalEase AI provides informational document structuring and preparatory analysis. It does NOT constitute formal legal advice, representation, or an attorney-client relationship. Please verify all matters with a licensed advocate.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth);
  doc.text(disclaimerLines, margin, footerY);

  // Save the PDF
  doc.save(`LegalEase_Lawyer_Brief_${brief.briefId}.pdf`);
}
