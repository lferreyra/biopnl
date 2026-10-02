import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KnowledgeResult, Protocol } from '../types';
import { ProtocolCard } from './ProtocolCard';
import { Disclaimer } from './Disclaimer';
import { generateResultPdf } from '../utils/pdfExport';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Layers,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  BookmarkCheck,
  FileDown,
  Loader2,
  Check
} from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants } from '../utils/motionPresets';

interface ResultViewProps {
  result: KnowledgeResult;
  onBack: () => void;
  onOpenProtocol: (protocol: Protocol) => void;
  onNewSearch: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onBack,
  onOpenProtocol,
  onNewSearch
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      await generateResultPdf(result);
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3000);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-16"
    >
      {/* Top action bar */}
      <motion.div variants={fadeInUpVariants} className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#221712] text-xs sm:text-sm font-bold text-[#111111] dark:text-[#FFF4ED] hover:text-[#8F3722] transition-colors cursor-pointer border border-[#E8B8A6]/60 dark:border-white/10 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Minimalist PDF Generation Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs ${
              pdfDownloaded
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300'
                : 'bg-white dark:bg-[#221712] border-[#E8B8A6]/70 dark:border-white/15 text-[#111111] dark:text-[#FFF4ED] hover:text-[#8F3722] hover:border-[#8F3722]/60 hover:shadow-xs'
            }`}
            title="Descargar resumen y preguntas de reflexión en PDF"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8F3722]" />
                <span>Generando PDF...</span>
              </>
            ) : pdfDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>PDF Descargado</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
                <span>Guardar en PDF</span>
              </>
            )}
          </button>

          <button
            onClick={onNewSearch}
            className="text-xs sm:text-sm text-[#8F3722] dark:text-[#E07853] hover:underline font-bold cursor-pointer"
          >
            Explorar otro síntoma
          </button>
        </div>
      </motion.div>

      {/* Emergency or Warning Alert if triggered */}
      {result.medicalAlert && result.medicalAlert.isAlert && (
        <motion.div
          variants={fadeInUpVariants}
          className={`rounded-3xl p-5 sm:p-6 border flex items-start gap-4 shadow-sm ${
            result.medicalAlert.level === 'emergency'
              ? 'bg-[#8F3722]/10 border-[#8F3722]/40 text-[#111111] dark:text-[#FFF4ED]'
              : 'bg-[#E06734]/10 border-[#E06734]/30 text-[#111111] dark:text-[#FFF4ED]'
          }`}
        >
          <div className="w-10 h-10 rounded-2xl bg-[#8F3722] text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#8F3722] dark:text-[#E07853]">
              {result.medicalAlert.level === 'emergency'
                ? 'Atención médica prioritaria'
                : 'Aviso importante sobre este síntoma'}
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-[#111111] dark:text-[#FFF4ED]/90 font-medium">
              {result.medicalAlert.message}
            </p>
          </div>
        </motion.div>
      )}

      {/* Hero Header Card */}
      <motion.div
        variants={fadeInUpVariants}
        className="relative bio-glass-panel rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 overflow-hidden"
      >
        {/* Soft background aura */}
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-gradient-to-br from-[#F47A45]/20 to-[#E8B8A6]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#8F3722] dark:text-[#E07853] font-bold uppercase tracking-wider mb-2">
            <span>Resultado de tu búsqueda</span>
            {result.isDemoContent && (
              <>
                <span>·</span>
                <span className="text-[#374151] dark:text-[#BDB0A8] lowercase font-medium">
                  (contenido curado para demostración)
                </span>
              </>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight mb-4">
            {result.title}
          </h1>

          {/* Resumen Box */}
          <div className="bio-glass-card rounded-[24px] p-5 border border-white/90 dark:border-white/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#8F3722] dark:text-[#E8B8A6] mb-1.5 flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
              Resumen
            </h2>
            <p className="text-sm sm:text-base text-[#111111] dark:text-[#FFF4ED] leading-relaxed font-normal">
              {result.summary}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Interpretación según la fuente */}
      <motion.div
        variants={fadeInUpVariants}
        className="bio-glass-panel rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 space-y-3"
      >
        <div className="flex items-center gap-2 text-[#8F3722] dark:text-[#E07853] font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Interpretación según la fuente</span>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight">
          Perspectiva desde la biodecodificación
        </h3>

        <div className="text-sm sm:text-base text-[#222222] dark:text-[#FFF4ED] leading-relaxed space-y-3 pt-1 font-normal">
          <p>{result.interpretation}</p>
        </div>
      </motion.div>

      {/* Temas para reflexionar (Pill Capsules) */}
      {result.emotionalThemes && result.emotionalThemes.length > 0 && (
        <motion.div
          variants={fadeInUpVariants}
          className="bio-glass-panel rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-[#8F3722] dark:text-[#E07853] font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Temas para reflexionar</span>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight">
            Nodos emocionales asociados
          </h3>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {result.emotionalThemes.map((theme, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full bio-pill-capsule text-[#111111] dark:text-[#FFF4ED] text-xs sm:text-sm font-bold shadow-2xs hover:border-[#8F3722]/50 transition-colors"
              >
                {theme}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Preguntas para vos */}
      {result.reflectionQuestions && result.reflectionQuestions.length > 0 && (
        <motion.div
          variants={fadeInUpVariants}
          className="bio-glass-panel rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#8F3722] dark:text-[#E07853] font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas para vos</span>
            </div>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="text-xs text-[#8F3722] dark:text-[#E07853] hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer"
              title="Guardar preguntas y resumen en PDF para escribir tus reflexiones"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Descargar ficha en PDF</span>
            </button>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#FFF4ED] tracking-tight">
            Preguntas de autoindagación
          </h3>

          <p className="text-xs sm:text-sm text-[#262626] dark:text-[#BDB0A8] font-medium">
            Tomate un instante de silencio para resonar con estas interrogantes sin buscar respuestas inmediatas:
          </p>

          {/* Contemplative inner listening guidance callout with artwork */}
          <div className="flex items-center gap-4 p-4 rounded-[22px] bio-glass-card overflow-hidden shadow-2xs">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] overflow-hidden shrink-0 shadow-xs border border-white/80 dark:border-white/10">
              <img
                src="/src/assets/images/lumina_inner_presence_card_1790534397513.jpg"
                alt="Introspección y escucha interior"
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>
            <div className="text-xs sm:text-sm text-[#262626] dark:text-[#BDB0A8] leading-relaxed">
              <span className="font-bold text-[#8F3722] dark:text-[#E07853] text-xs block mb-0.5 uppercase tracking-wider">
                Sugerencia de indagación
              </span>
              Cerrá los ojos unos instantes y permití que estas preguntas se asienten en tu respiración y cuerpo, sin forzar una explicación racional inmediata.
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {result.reflectionQuestions.map((question, index) => (
              <div
                key={index}
                className="bio-glass-card rounded-[22px] p-4 sm:p-5 flex items-start gap-3.5"
              >
                <span className="font-heading text-base font-bold text-[#8F3722] dark:text-[#E07853] shrink-0 mt-0.5">
                  0{index + 1}.
                </span>
                <p className="text-sm sm:text-base text-[#111111] dark:text-[#FFF4ED] leading-relaxed font-normal">
                  "{question}"
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Protocolos relacionados */}
      {result.relatedProtocols && result.relatedProtocols.length > 0 && (
        <motion.div variants={fadeInUpVariants} className="space-y-4 pt-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#8F3722] dark:text-[#E07853] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Protocolos sugeridos según el síntoma</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#111111] dark:text-[#FFF4ED] mt-0.5">
                Ejercicios para acompañar tu proceso
              </h3>
              <p className="text-xs sm:text-sm text-[#333333] dark:text-[#BDB0A8] mt-1 font-normal">
                Prácticas seleccionadas para regular el sistema nervioso, reencuadrar el significado de la tensión y calmar el cuerpo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.relatedProtocols.map((protocol) => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                onOpen={onOpenProtocol}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Fuente consultada */}
      {result.sources && result.sources.length > 0 && (
        <motion.div
          variants={fadeInUpVariants}
          className="bio-glass-panel rounded-3xl p-6 text-xs sm:text-sm text-[#262626] dark:text-[#BDB0A8] space-y-2"
        >
          <div className="flex items-center gap-2 text-[#111111] dark:text-[#FFF4ED] font-bold">
            <BookOpen className="w-4 h-4 text-[#8F3722] dark:text-[#E07853]" />
            <span>Fuente consultada</span>
          </div>

          {result.sources.map((src, i) => (
            <div key={i} className="pl-6 border-l-2 border-[#8F3722]/40 space-y-1">
              <p className="font-bold text-[#111111] dark:text-[#FFF4ED]">{src.name}</p>
              <p className="text-xs text-[#374151] dark:text-[#BDB0A8] font-medium">{src.reference}</p>
              {src.relevantExcerpt && (
                <p className="text-xs italic text-[#262626] dark:text-[#BDB0A8]/90 pt-1 font-normal">
                  "{src.relevantExcerpt}"
                </p>
              )}
              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#8F3722] dark:text-[#E07853] hover:underline pt-1 font-bold"
                >
                  <span>Ver cuaderno fuente en NotebookLM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Bottom Medical Disclaimer */}
      <motion.div variants={fadeInUpVariants}>
        <Disclaimer
          variant="full"
          customMessage="Aviso ético: Esta información es complementaria y orientativa. No permite determinar causas biológicas ni reemplaza la evaluación médica o psicológica profesional."
        />
      </motion.div>
    </motion.div>
  );
};
