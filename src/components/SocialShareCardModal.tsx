import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, MessageCircle, Sparkles, ExternalLink, Globe } from 'lucide-react';
import { KnowledgeResult } from '../types';

interface SocialShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: KnowledgeResult;
}

export const SocialShareCardModal: React.FC<SocialShareCardModalProps> = ({
  isOpen,
  onClose,
  result
}) => {
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const symptomName = result.title || result.query || 'Bienestar Somático';

  // Extract concise, readable text
  let conflictText = '';
  if (result.summary) {
    conflictText = result.summary;
  } else if (typeof result.interpretation === 'string') {
    conflictText = result.interpretation.slice(0, 180) + '...';
  } else {
    conflictText = 'El cuerpo manifiesta a través del síntoma tensiones y emociones que la mente consciente aún no ha podido procesar.';
  }

  const affirmationText =
    (result.reflectionQuestions && result.reflectionQuestions[0]) ||
    '¿Qué necesito soltar o comunicar para que mi cuerpo recupere su tranquilidad?';

  // Helper for text wrapping on canvas that returns wrapped lines
  const wrapTextLines = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine ? currentLine + ' ' + words[n] : words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = words[n];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  // Draw rounded rectangle helper
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Draw BioPNL Logo symbol
  const drawBioPnlLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Outer circle with terracotta gradient
    const grad = ctx.createLinearGradient(0, 0, 60, 60);
    grad.addColorStop(0, '#F47A45');
    grad.addColorStop(0.5, '#D96C45');
    grad.addColorStop(1, '#8F3722');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.arc(30, 30, 28, 0, Math.PI * 2);
    ctx.fill();

    // Internal organic cellular membrane cutouts (creates BioPNL tri-lobe emblem)
    ctx.fillStyle = '#FAF3EE';
    ctx.beginPath();
    ctx.arc(22, 22, 10, 0, Math.PI * 2);
    ctx.arc(38, 24, 9, 0, Math.PI * 2);
    ctx.arc(29, 39, 10, 0, Math.PI * 2);
    ctx.fill();

    // Inner organic connectors
    ctx.beginPath();
    ctx.arc(30, 30, 6, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();
  };

  const handleDownloadPng = async () => {
    setIsExporting(true);
    try {
      // Ensure web fonts are completely loaded
      if (document.fonts) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      const size = 1080;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Warm organic sand background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, size);
      bgGrad.addColorStop(0, '#FFF9F5');
      bgGrad.addColorStop(0.4, '#FAF3EE');
      bgGrad.addColorStop(1, '#F5EAE2');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, size, size);

      // 2. Outer decorative card frame with soft terracotta border
      const pad = 44;
      ctx.strokeStyle = '#E8B8A6';
      ctx.lineWidth = 4;
      roundRect(ctx, pad, pad, size - pad * 2, size - pad * 2, 36);
      ctx.stroke();

      // Inner subtle border
      ctx.strokeStyle = 'rgba(143, 55, 34, 0.12)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, pad + 12, pad + 12, size - (pad + 12) * 2, size - (pad + 12) * 2, 28);
      ctx.stroke();

      // 3. 180° Semicircular Terracotta Arch Motif (Top center)
      ctx.save();
      ctx.beginPath();
      ctx.arc(540, 240, 160, Math.PI, 0, false);
      ctx.strokeStyle = 'rgba(143, 55, 34, 0.14)';
      ctx.lineWidth = 18;
      ctx.stroke();
      ctx.restore();

      // 4. Logo Header at Top: [Emblem] + "biopnl" in 'Comfortaa'
      drawBioPnlLogo(ctx, 420, 80, 0.85);

      ctx.fillStyle = '#1A1412';
      ctx.font = "bold 44px 'Comfortaa', -apple-system, sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('biopnl', 485, 105);

      // Category Pill
      ctx.save();
      const pillText = 'CÁPSULA DE BIODECODIFICACIÓN';
      ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
      const pillWidth = ctx.measureText(pillText).width + 36;
      ctx.fillStyle = 'rgba(143, 55, 34, 0.10)';
      roundRect(ctx, 540 - pillWidth / 2, 142, pillWidth, 34, 17);
      ctx.fill();

      ctx.fillStyle = '#8F3722';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pillText, 540, 159);
      ctx.restore();

      // 5. Symptom Title (Auto-scaling to fit perfectly)
      let titleFontSize = 46;
      if (symptomName.length > 28) titleFontSize = 38;
      if (symptomName.length > 40) titleFontSize = 32;

      ctx.font = `bold ${titleFontSize}px 'Urbanist', -apple-system, sans-serif`;
      ctx.fillStyle = '#1A1412';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      const titleMaxWidth = 840;
      const titleLines = wrapTextLines(ctx, symptomName.toUpperCase(), titleMaxWidth);
      let curY = 205;

      titleLines.forEach((line) => {
        ctx.fillText(line, 540, curY);
        curY += titleFontSize * 1.15;
      });

      curY += 20;

      // 6. Box 1: Sentido Biológico (Dynamic sizing to prevent text clipping)
      const boxWidth = 880;
      const boxLeft = (size - boxWidth) / 2;

      // Calculate conflict text font & lines
      let conflictFontSize = 26;
      let conflictLineHeight = 36;
      ctx.font = `normal ${conflictFontSize}px 'Plus Jakarta Sans', sans-serif`;
      let conflictLines = wrapTextLines(ctx, `"${conflictText}"`, boxWidth - 64);

      // If text is long, scale down to fit comfortably
      if (conflictLines.length > 4) {
        conflictFontSize = 22;
        conflictLineHeight = 30;
        ctx.font = `normal ${conflictFontSize}px 'Plus Jakarta Sans', sans-serif`;
        conflictLines = wrapTextLines(ctx, `"${conflictText}"`, boxWidth - 64);
      }

      const box1Padding = 26;
      const box1HeaderHeight = 32;
      const box1Height = box1HeaderHeight + conflictLines.length * conflictLineHeight + box1Padding * 2;

      // Draw Container Box 1
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      roundRect(ctx, boxLeft, curY, boxWidth, box1Height, 22);
      ctx.fill();
      ctx.strokeStyle = 'rgba(232, 184, 166, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Box 1 Label
      ctx.fillStyle = '#8F3722';
      ctx.font = "bold 20px 'Urbanist', sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('SENTIDO BIOLÓGICO INCONSCIENTE', boxLeft + 32, curY + box1Padding);

      // Box 1 Lines
      ctx.fillStyle = '#2A211E';
      ctx.font = `normal ${conflictFontSize}px 'Plus Jakarta Sans', sans-serif`;
      let textY = curY + box1Padding + box1HeaderHeight + 6;
      conflictLines.forEach((line) => {
        ctx.fillText(line, boxLeft + 32, textY);
        textY += conflictLineHeight;
      });
      ctx.restore();

      curY += box1Height + 20;

      // 7. Box 2: Pregunta de Reflexión / Reencuadre PNL
      let affirmFontSize = 26;
      let affirmLineHeight = 36;
      ctx.font = `italic bold ${affirmFontSize}px 'Urbanist', sans-serif`;
      let affirmLines = wrapTextLines(ctx, `"${affirmationText}"`, boxWidth - 64);

      if (affirmLines.length > 3) {
        affirmFontSize = 22;
        affirmLineHeight = 30;
        ctx.font = `italic bold ${affirmFontSize}px 'Urbanist', sans-serif`;
        affirmLines = wrapTextLines(ctx, `"${affirmationText}"`, boxWidth - 64);
      }

      const box2Padding = 24;
      const box2HeaderHeight = 32;
      const box2Height = box2HeaderHeight + affirmLines.length * affirmLineHeight + box2Padding * 2;

      ctx.save();
      // Soft terracotta background for the reflection card
      const box2Grad = ctx.createLinearGradient(boxLeft, curY, boxLeft + boxWidth, curY + box2Height);
      box2Grad.addColorStop(0, 'rgba(250, 243, 238, 0.95)');
      box2Grad.addColorStop(1, 'rgba(246, 231, 223, 0.90)');
      ctx.fillStyle = box2Grad;
      roundRect(ctx, boxLeft, curY, boxWidth, box2Height, 22);
      ctx.fill();
      ctx.strokeStyle = 'rgba(143, 55, 34, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Box 2 Label
      ctx.fillStyle = '#8F3722';
      ctx.font = "bold 20px 'Urbanist', sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('PREGUNTA DE REFLEXIÓN INTERIOR', boxLeft + 32, curY + box2Padding);

      // Box 2 Lines
      ctx.fillStyle = '#1A1412';
      ctx.font = `italic bold ${affirmFontSize}px 'Urbanist', sans-serif`;
      let affirmY = curY + box2Padding + box2HeaderHeight + 6;
      affirmLines.forEach((line) => {
        ctx.fillText(line, boxLeft + 32, affirmY);
        affirmY += affirmLineHeight;
      });
      ctx.restore();

      // 8. Footer with official website link (ALWAYS cited: biopnl.vercel.app)
      const footerY = 970;

      // Divider line
      ctx.strokeStyle = '#E8B8A6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(boxLeft, footerY);
      ctx.lineTo(boxLeft + boxWidth, footerY);
      ctx.stroke();

      // Website URL pill in center
      ctx.font = "bold 26px 'Comfortaa', -apple-system, sans-serif";
      ctx.fillStyle = '#8F3722';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('biopnl.vercel.app', 540, footerY + 36);

      // Subtitle caption
      ctx.font = "500 16px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = '#6E5D57';
      ctx.fillText('Biodecodificación somática & Programación Neurolingüística (PNL)', 540, footerY + 68);

      // Trigger high-res PNG download
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const safeFilename = symptomName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
      link.download = `biopnl-capsula-${safeFilename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating card image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `🌿 *BioPNL · Cápsula de ${symptomName}*\n\n🧠 *Sentido Biológico:* ${conflictText}\n\n✨ *Reflexión:* "${affirmationText}"\n\n🔗 Descubrí más exploraciones en https://biopnl.vercel.app`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: `BioPNL · ${symptomName}`,
          text: `Cápsula de Biodecodificación para ${symptomName}: "${affirmationText}"\n\nLeé más en https://biopnl.vercel.app`,
          url: 'https://biopnl.vercel.app'
        });
      } catch {
        // user cancelled
      }
    } else {
      handleShareWhatsApp();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg rounded-[32px] p-6 sm:p-7 bg-[#FAF3EE] dark:bg-[#1E1715] border border-[#E8B8A6]/70 dark:border-white/15 shadow-2xl text-[#1A1412] dark:text-[#FFF7F2] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#3D3532]/70 dark:text-white/70"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 rounded-full bg-[#8F3722]/10 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-xs font-bold flex items-center gap-1.5 border border-[#8F3722]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cápsula para Compartir</span>
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold tracking-tight mb-1">
            Descargar Cápsula Somática
          </h3>
          <p className="text-xs sm:text-sm text-[#4B3E39] dark:text-[#D1C4BD] leading-relaxed mb-4">
            Generada con la tipografía y logo del sitio, perfectamente formateada para redes sociales o WhatsApp.
          </p>

          {/* Visual Preview Card matching exported PNG */}
          <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#FFF9F5] via-[#FAF3EE] to-[#F5EAE2] dark:from-[#251B17] dark:via-[#1F1714] dark:to-[#251B17] border border-[#E8B8A6]/70 dark:border-white/15 shadow-lg text-center space-y-3.5 my-2">
            {/* Top Logo & Arc Motif */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-6 border-t-4 border-l-4 border-r-4 border-[#8F3722]/40 rounded-t-full" />
              <span className="font-['Comfortaa'] font-bold text-lg text-[#1A1412] dark:text-[#FFF7F2] lowercase">
                biopnl
              </span>
            </div>

            <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#1A1412] dark:text-[#FFF7F2] capitalize">
              {symptomName}
            </h4>

            {/* Meaning card */}
            <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10 text-left space-y-1">
              <span className="text-[10px] font-bold text-[#8F3722] dark:text-[#E07853] uppercase tracking-wider block">
                Sentido Biológico Inconsciente
              </span>
              <p className="text-xs sm:text-sm text-[#2E2420] dark:text-[#EAE0D9] leading-relaxed">
                "{conflictText}"
              </p>
            </div>

            {/* Reflection card */}
            <div className="p-3.5 rounded-2xl bg-[#8F3722]/5 dark:bg-[#E07853]/10 border border-[#8F3722]/20 text-left space-y-1">
              <span className="text-[10px] font-bold text-[#8F3722] dark:text-[#E07853] uppercase tracking-wider block">
                Pregunta de Reflexión Interior
              </span>
              <p className="text-xs sm:text-sm font-semibold italic text-[#1A1412] dark:text-[#FFF7F2] leading-relaxed">
                "{affirmationText}"
              </p>
            </div>

            {/* Always cited site link */}
            <div className="pt-2 border-t border-[#E8B8A6]/40 dark:border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold text-[#8F3722] dark:text-[#E07853]">
              <Globe className="w-3.5 h-3.5" />
              <span className="font-['Comfortaa']">biopnl.vercel.app</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="min-h-[48px] py-2.5 px-4 rounded-xl bg-[#8F3722] hover:bg-[#7A2818] active:scale-98 text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generando...' : 'Descargar en PNG'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="min-h-[48px] py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full mt-2.5 min-h-[44px] py-2 px-4 rounded-xl bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/15 text-xs sm:text-sm font-semibold text-[#1A1412] dark:text-[#FFF7F2] border border-[#E8B8A6]/40 dark:border-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
            <span>Compartir en otras redes con link biopnl.vercel.app</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
