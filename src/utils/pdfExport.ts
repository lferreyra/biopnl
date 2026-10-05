import { jsPDF } from 'jspdf';
import { KnowledgeResult } from '../types';
import { getBrandLogoDataUrl, drawEmblemOnCanvas } from './brandLogo';

/**
 * Generates an elegant, minimalist A4 PDF containing the biological meaning,
 * reflection questions, and official branding citing biopnl.vercel.app.
 */
export const generateResultPdf = async (result: KnowledgeResult): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2; // 170mm
  let y = margin;

  // Colors
  const setDark = () => doc.setTextColor(26, 20, 18); // #1A1412
  const setTerracotta = () => doc.setTextColor(143, 55, 34); // #8F3722
  const setCoral = () => doc.setTextColor(217, 108, 69); // #D96C45
  const setMuted = () => doc.setTextColor(92, 77, 70); // #5C4D46

  // --- 1. Official BioPNL Header with Brand Logo ---
  try {
    const logoDataUrl = getBrandLogoDataUrl(140, { showText: true, theme: 'light' });
    if (logoDataUrl) {
      // 36mm wide x 10mm high official logo emblem + wordmark
      doc.addImage(logoDataUrl, 'PNG', margin, y - 3, 36, 10);
    } else {
      throw new Error('Canvas unavailable');
    }
  } catch (_e) {
    // Fallback: Vector rendering of the circular emblem
    doc.setFillColor(223, 104, 65); // #DF6841
    doc.circle(margin + 5, y + 2, 5, 'F');
    doc.setFillColor(251, 236, 227); // #FBECE3
    doc.circle(margin + 3.8, y + 1.8, 2.2, 'F');
    doc.circle(margin + 6.2, y + 2.0, 1.8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(36, 27, 23); // #241B17
    doc.text('biopnl', margin + 12, y + 4);
  }

  // Link on the right (ALWAYS citing biopnl.vercel.app)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  setTerracotta();
  doc.textWithLink('biopnl.vercel.app', pageWidth - margin, y + 1, {
    url: 'https://biopnl.vercel.app',
    align: 'right'
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  setMuted();
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  doc.text(`Biodecodificación & PNL · ${dateStr}`, pageWidth - margin, y + 5.5, { align: 'right' });

  y += 9;

  // Semicircular terracotta arc divider
  doc.setDrawColor(232, 184, 166); // #E8B8A6
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);

  y += 12;

  // --- 2. Title Section ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  setCoral();
  doc.text('FICHA DE INDAGACIÓN SOMÁTICA & AUTOCONOCIMIENTO', margin, y);

  y += 6;

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  setDark();
  const titleLines = doc.splitTextToSize(result.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 2;

  // Direct site reference badge
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  setMuted();
  doc.text('Consultá más decodificaciones y ejercicios en https://biopnl.vercel.app', margin, y);
  y += 8;

  // --- 3. Biological Meaning / Summary Box ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  setTerracotta();
  doc.text('SENTIDO BIOLÓGICO INCONSCIENTE', margin, y);

  y += 4;

  const meaningText = result.summary || result.interpretation || 'Reflexión somática sobre el síntoma y su mensaje emocional.';
  const summaryLines = doc.splitTextToSize(meaningText, contentWidth - 10);
  const boxHeight = summaryLines.length * 5.2 + 8;

  // Soft cream container
  doc.setFillColor(255, 249, 245); // #FFF9F5
  doc.setDrawColor(232, 184, 166); // #E8B8A6
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  setDark();
  doc.text(summaryLines, margin + 5, y + 6);
  y += boxHeight + 10;

  // --- 4. Reflection Questions Section ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setTerracotta();
  doc.text('PREGUNTAS DE REFLEXIÓN INTERIOR', margin, y);

  y += 4.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  setMuted();
  doc.text(
    'Tomate un momento de calma para reflexionar sobre estas preguntas y anotar tus sensaciones:',
    margin,
    y
  );

  y += 7;

  // Questions loop with note-taking lines
  result.reflectionQuestions.forEach((q, idx) => {
    if (y > pageHeight - 45) {
      doc.addPage();
      y = margin;
    }

    // Number bullet
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setTerracotta();
    const num = `${String(idx + 1).padStart(2, '0')}.`;
    doc.text(num, margin, y);

    // Question text
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    setDark();
    const qLines = doc.splitTextToSize(q, contentWidth - 12);
    doc.text(qLines, margin + 8, y);
    y += qLines.length * 5.2 + 3;

    // Handwriting guide lines for personal reflections
    doc.setDrawColor(246, 231, 223); // #F6E7DF
    doc.setLineWidth(0.2);
    doc.line(margin + 8, y, pageWidth - margin, y);
    y += 5;
    doc.line(margin + 8, y, pageWidth - margin, y);
    y += 6.5;
  });

  // --- 5. Emotional Themes ---
  if (result.emotionalThemes && result.emotionalThemes.length > 0 && y < pageHeight - 35) {
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setTerracotta();
    doc.text('TEMAS EMOCIONALES ASOCIADOS:', margin, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    setDark();
    const themesStr = result.emotionalThemes.join('   ·   ');
    doc.text(themesStr, margin, y);
  }

  // --- 6. Official Footer with Brand Emblem & biopnl.vercel.app link ---
  const footerY = pageHeight - 12;
  doc.setDrawColor(232, 184, 166);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  let linkX = margin;
  try {
    const emblemDataUrl = getBrandLogoDataUrl(80, { showText: false, theme: 'light' });
    if (emblemDataUrl) {
      doc.addImage(emblemDataUrl, 'PNG', margin, footerY - 3, 4.2, 4.2);
      linkX = margin + 6;
    }
  } catch (_e) {}

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  setTerracotta();
  doc.textWithLink('biopnl.vercel.app', linkX, footerY, {
    url: 'https://biopnl.vercel.app'
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  setMuted();
  doc.text(
    '· Biodecodificación & PNL Consciente · Guía orientativa para el bienestar y la serenidad física.',
    linkX + 26,
    footerY
  );

  // Trigger download
  const safeTitle = result.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 30);
  doc.save(`biopnl_${safeTitle}_biopnl.vercel.app.pdf`);
};
