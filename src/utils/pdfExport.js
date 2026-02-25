/**
 * PDF Export Utility
 *
 * Generates a professional A4 PDF summary of the Zakat calculation.
 * Includes per-karat gold breakdown when available.
 */

import jsPDF from 'jspdf';
import { formatCurrency } from './currency';

/**
 * Export Zakat summary as a downloadable PDF.
 *
 * @param {Object} result         - Zakat calculation result
 * @param {string} currency       - Selected currency code
 * @param {string} madhab         - hanafi | shafi
 * @param {string} nisabStandard  - gold | silver
 * @param {Array}  goldKaratBreakdown - from getGoldKaratBreakdown(), optional
 */
export function exportZakatSummary(result, currency, madhab, nisabStandard, goldKaratBreakdown = []) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(27, 107, 58);
  doc.text('Zakat Calculation Summary', pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Separator
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

  // Summary details
  doc.setFontSize(10);
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

  // Asset breakdown table
  if (result.breakdown.length > 0) {
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(27, 107, 58);
    doc.text('Asset Breakdown', 20, y);
    y += 8;

    // Table header
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('Category', 20, y);
    doc.text('Value', 110, y, { align: 'right' });
    doc.text('Zakat (2.5%)', pageWidth - 20, y, { align: 'right' });
    y += 3;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    y += 5;

    result.breakdown
      .filter((b) => b.amount > 0)
      .forEach((item) => {
        doc.setTextColor(60, 60, 60);
        doc.text(item.categoryLabel, 20, y);
        doc.text(formatCurrency(item.amount, currency), 110, y, { align: 'right' });
        doc.setTextColor(27, 107, 58);
        doc.text(formatCurrency(item.zakatAmount, currency), pageWidth - 20, y, { align: 'right' });
        y += 7;

        // Per-karat gold sub-breakdown
        if (item.categoryId === 'gold' && goldKaratBreakdown.length > 0) {
          goldKaratBreakdown.forEach(({ karat, grams, pricePerGram, value }) => {
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
              `  ${karat}  ${grams}g @ ${formatCurrency(pricePerGram, 'INR')}/g`,
              25,
              y
            );
            doc.text(formatCurrency(value, currency), 110, y, { align: 'right' });
            y += 5;
          });
          doc.setFontSize(9);
          y += 1;
        }
      });
  }

  y += 10;

  // Total Zakat due
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

  // Footer
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
