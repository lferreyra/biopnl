import { jsPDF } from 'jspdf';
import { KnowledgeResult } from '../types';

/**
 * Generates an elegant, minimalist A4 PDF containing the summary
 * and reflection questions for the active symptom exploration.
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

  // Helpers for text colors
  const setDark = () => doc.setTextColor(42, 33, 30); // #2A211E
  const setTerracotta = () => doc.setTextColor(217, 108, 69); // #D96C45
  const setMuted = () => doc.setTextColor(126, 113, 109); // #7E716D

  // --- 1. Minimalist Header ---
  // Top brand mark
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setTerracotta();
  doc.text('biopnl', margin, y);

  // Subtitle & date on the right
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  setMuted();
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  doc.text(`Biodecodificación & PNL · ${dateStr}`, pageWidth - margin, y, { align: 'right' });

  y += 4;
  // Subtle divider rule
  doc.setDrawColor(232, 184, 166); // #E8B8A6
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);

  y += 12;

  // --- 2. Title Section ---
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  setTerracotta();
  doc.text('REGISTRO DE INDAGACIÓN & REFLEXIÓN', margin, y);

  y += 7;

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  setDark();
  const titleLines = doc.splitTextToSize(result.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 4;

  // --- 3. Summary Box ---
  // Background container
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  setTerracotta();
  doc.text('RESUMEN', margin, y);

  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setDark();
  const summaryLines = doc.splitTextToSize(result.summary, contentWidth - 8);
  const boxHeight = summaryLines.length * 5.2 + 8;

  // Soft tinted card
  doc.setFillColor(255, 249, 245); // #FFF9F5
  doc.setDrawColor(232, 184, 166); // #E8B8A6
  doc.roundedRect(margin, y - 2, contentWidth, boxHeight, 2.5, 2.5, 'FD');

  doc.text(summaryLines, margin + 4, y + 4);
  y += boxHeight + 10;

  // --- 4. Reflection Questions Section ---
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  setTerracotta();
  doc.text('PREGUNTAS DE REFLEXIÓN INTERIOR', margin, y);

  y += 5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  setMuted();
  const guidanceText =
    'Tomate un instante de silencio para resonar con estas preguntas sin forzar una respuesta inmediata:';
  doc.text(guidanceText, margin, y);

  y += 7;

  // Render each reflection question
  result.reflectionQuestions.forEach((q, idx) => {
    // Check if we need a new page
    if (y > pageHeight - 45) {
      doc.addPage();
      y = margin;
    }

    // Number tag
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setTerracotta();
    const num = `${String(idx + 1).padStart(2, '0')}.`;
    doc.text(num, margin, y);

    // Question body
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    setDark();
    const qLines = doc.splitTextToSize(q, contentWidth - 10);
    doc.text(qLines, margin + 8, y);
    y += qLines.length * 5.5 + 4;

    // Subtle note lines for writing handwritten thoughts
    doc.setDrawColor(246, 231, 223); // very subtle line
    doc.setLineWidth(0.2);
    doc.line(margin + 8, y, pageWidth - margin, y);
    y += 5;
    doc.line(margin + 8, y, pageWidth - margin, y);
    y += 7;
  });

  // --- 5. Emotional Themes Pills (if space permits) ---
  if (result.emotionalThemes && result.emotionalThemes.length > 0 && y < pageHeight - 35) {
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setMuted();
    doc.text('TEMAS EMOCIONALES ASOCIADOS:', margin, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    setDark();
    const themesStr = result.emotionalThemes.join('   ·   ');
    doc.text(themesStr, margin, y);
  }

  // --- 6. Minimalist Ethical Footer ---
  const footerY = pageHeight - 12;
  doc.setDrawColor(232, 184, 166);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  setMuted();
  const disclaimer =
    'BioPNL ofrece un marco de indagación personal y desarrollo consciente. No constituye diagnóstico ni reemplaza atención médica profesional.';
  doc.text(disclaimer, margin, footerY);

  // Trigger download
  const safeTitle = result.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 30);
  doc.save(`biopnl_reflexion_${safeTitle}.pdf`);
};
