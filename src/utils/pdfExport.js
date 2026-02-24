/**
 * PDF Export Utility
 *
 * Generates a professional A4 PDF summary of the Zakat calculation.
 * Uses jsPDF for PDF generation.
 */

import jsPDF from 'jspdf';
import { formatCurrency } from './currency';

/**
 * Export Zakat summary as a downloadable PDF.
 */
export function exportZakatSummary(result, currency, madhab, nisabStandard) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(27, 107, 58); // primary-500
  doc.text('Zakat Calculation Summary', pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Line separator
  doc.setDrawColor(27, 107, 58);
  doc.setLineWidth(0.5);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // Status
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  if (result.isLiable) {
    doc.text(`Zakat Due: ${formatCurrency(result.zakatDue, currency)}`, 20, y);
  } else {
    doc.text('Zakat is not due this year', 20, y);
  }
  y += 12;

  // Details
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);

  const details = [
    ['Madhab (School)', madhab.charAt(0).toUpperCase() + madhab.slice(1)],
    ['Nisab Standard', nisabStandard.charAt(0).toUpperCase() + nisabStandard.slice(1)],
    ['Nisab Value (INR)', formatCurrency(result.nisabValue, 'INR')],
    ['Total Assets', formatCurrency(result.totalAssets, currency)],
    ['Total Deductions', formatCurrency(result.totalDeductions, currency)],
    ['Net Zakatable Wealth', formatCurrency(result.netZakatable, currency)],
  ];

  details.forEach(([label, value]) => {
    doc.setTextColor(120, 120, 120);
    doc.text(label, 20, y);
    doc.setTextColor(0, 0, 0);
    doc.text(value, pageWidth - 20, y, { align: 'right' });
    y += 7;
  });

  y += 5;

  // Breakdown table
  if (result.breakdown.length > 0) {
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(27, 107, 58);
    doc.text('Asset Breakdown', 20, y);
    y += 8;

    doc.setFontSize(9);
    // Table header
    doc.setTextColor(120, 120, 120);
    doc.text('Category', 20, y);
    doc.text('Value', 100, y, { align: 'right' });
    doc.text('Zakat (2.5%)', pageWidth - 20, y, { align: 'right' });
    y += 3;
    doc.line(20, y, pageWidth - 20, y);
    y += 5;

    result.breakdown
      .filter((b) => b.amount > 0)
      .forEach((item) => {
        doc.setTextColor(60, 60, 60);
        doc.text(item.categoryLabel, 20, y);
        doc.text(formatCurrency(item.amount, currency), 100, y, { align: 'right' });
        doc.setTextColor(27, 107, 58);
        doc.text(formatCurrency(item.zakatAmount, currency), pageWidth - 20, y, { align: 'right' });
        y += 7;
      });
  }

  y += 10;

  // Zakat Due (bold)
  if (result.isLiable) {
    doc.setDrawColor(27, 107, 58);
    doc.setLineWidth(1);
    doc.line(20, y, pageWidth - 20, y);
    y += 8;
    doc.setFontSize(14);
    doc.setTextColor(27, 107, 58);
    doc.text(`Total Zakat Due: ${formatCurrency(result.zakatDue, currency)}`, pageWidth / 2, y, { align: 'center' });
    y += 15;
  }

  // Footer disclaimer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text(
    'Calculated using Zakat Calculator | For reference only. Consult a scholar for religious rulings.',
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );

  // Download
  const year = new Date().getFullYear();
  doc.save(`Zakat-Summary-${year}.pdf`);
}
