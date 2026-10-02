import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Wind, Brain, Compass, Search, Home, BookOpen, Heart, Volume2 } from 'lucide-react';
import { AppImages } from '../../assets/images';

interface MockupDevicesShowcaseProps {
  activeSlide?: number;
  onExploreClick?: () => void;
}

export const MockupDevicesShowcase: React.FC<MockupDevicesShowcaseProps> = ({
  activeSlide = 0,
  onExploreClick
}) => {
  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center select-none overflow-visible py-2">
      {/* Ambient background crosshair grid (faithful reproduction of uploaded reference image) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="crossGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 24 18 L 24 30 M 18 24 L 30 24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" className="text-[#8F3722] dark:text-[#E8B8A6]" />
              <circle cx="24" cy="24" r="0.6" fill="currentColor" className="text-[#8F3722]" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crossGrid)" />
        </svg>
      </div>

      {/* Floating warm radial glow aura */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#F47A45]/35 via-[#E8B8A6]/25 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Container holding the 3 layered smartphones with exact 9:19.5 aspect ratio */}
      <div className="relative w-full max-w-[440px] h-[330px] sm:h-[370px] flex items-center justify-center">

        {/* ============================================================== */}
        {/* DEVICE 2 (Center - Secondary screen: Meditaciones & Biblioteca) */}
        {/* Aspect Ratio 9:19.5 (158px x 342px on desktop, 140px x 304px on mobile) */}
        {/* ============================================================== */}
        <motion.div
          animate={{
            y: activeSlide === 1 ? -8 : activeSlide === 0 ? 2 : 6,
            scale: activeSlide === 1 ? 1.05 : 0.94,
            rotate: activeSlide === 1 ? 0 : 2,
            zIndex: activeSlide === 1 ? 30 : 10
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[140px] sm:w-[158px] h-[304px] sm:h-[342px] rounded-[34px] sm:rounded-[38px] p-2 bg-[#1C1816] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12)] cursor-pointer"
          onClick={onExploreClick}
        >
          {/* Dynamic Island Cutout */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-11 h-2.5 bg-black rounded-full z-30 flex items-center justify-end pr-1 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-[#1C1613] border border-white/20" />
          </div>

          {/* Screen */}
          <div className="w-full h-full rounded-[26px] sm:rounded-[30px] bg-gradient-to-b from-[#C4B7B0] via-[#D1C6BE] to-[#BDB0A6] text-[#2A211E] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden relative shadow-inner pt-4">
            {/* Status bar */}
            <div className="flex items-center justify-between text-[8px] font-semibold text-[#3D332F] px-1">
              <span>11:30</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D332F]/50" />
                <span className="w-3 h-1.5 rounded-xs border border-[#3D332F]" />
              </div>
            </div>

            {/* Screen Header */}
            <div className="pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase font-bold text-[#8F3722] tracking-wider">
                  Biblioteca
                </span>
                <span className="text-[7px] text-[#5A4D48] bg-white/45 px-1.5 py-0.5 rounded-full font-medium">
                  Biodecodificación
                </span>
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[#1C1613] mt-1 leading-snug">
                ¿Qué síntomas querés explorar hoy?
              </h4>

              {/* Category pills */}
              <div className="flex gap-1 overflow-hidden mt-1.5">
                <span className="text-[7px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#1C1613] shrink-0">
                  Todas
                </span>
                <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-black/10 text-[#3D332F] shrink-0">
                  Migraña
                </span>
                <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-black/10 text-[#3D332F] shrink-0">
                  Lumbar
                </span>
              </div>
            </div>

            {/* Card Preview with Seated Meditator */}
            <div className="relative my-1.5 rounded-2xl overflow-hidden flex-1 max-h-[120px] bg-white/40 border border-white/60 p-2 flex flex-col justify-between shadow-2xs">
              <img
                src={AppImages.innerPresenceCard}
                alt="Introspección y escucha interior"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="relative z-10">
                <span className="text-[7px] font-bold uppercase tracking-wider text-white bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  Simbólica somática
                </span>
              </div>
              <div className="relative z-10 text-white">
                <p className="text-[10px] font-bold leading-tight">Calma & Reencuadre</p>
                <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[#1C1613] text-[8px] font-bold shadow-xs">
                  <Play className="w-2 h-2 fill-current" />
                  <span>Explorar</span>
                </div>
              </div>
            </div>

            {/* Bottom mini card */}
            <div className="p-1.5 rounded-xl bg-white/70 flex items-center justify-between text-[8px] font-bold text-[#1C1613]">
              <div className="flex items-center gap-1">
                <Brain className="w-2.5 h-2.5 text-[#8F3722]" />
                <span>Protocolos PNL</span>
              </div>
              <span className="text-[#8F3722]">100% Gratis</span>
            </div>

            {/* Home indicator bar */}
            <div className="w-12 h-1 rounded-full bg-black/30 mx-auto mt-1 shrink-0" />
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* DEVICE 3 (Right - Dark Mode: Respiración 4-7-8 & Presencia)   */}
        {/* Aspect Ratio 9:19.5 (152px x 330px on desktop, 136px x 295px on mobile) */}
        {/* ============================================================== */}
        <motion.div
          animate={{
            x: activeSlide === 2 ? 0 : '36%',
            y: activeSlide === 2 ? -6 : activeSlide === 0 ? 10 : 14,
            scale: activeSlide === 2 ? 1.05 : 0.90,
            rotate: activeSlide === 2 ? 2 : 8,
            zIndex: activeSlide === 2 ? 30 : 15
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[136px] sm:w-[152px] h-[295px] sm:h-[330px] rounded-[34px] sm:rounded-[38px] p-2 bg-[#0E0907] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)] cursor-pointer"
          onClick={onExploreClick}
        >
          {/* Dynamic Island Cutout */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-11 h-2.5 bg-black rounded-full z-30 flex items-center justify-end pr-1 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-[#1C1613] border border-white/20" />
          </div>

          {/* Screen */}
          <div className="w-full h-full rounded-[26px] sm:rounded-[30px] bg-gradient-to-b from-[#1C120D] via-[#241711] to-[#120B08] text-[#FFF4ED] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden relative shadow-inner pt-4">
            {/* Status bar */}
            <div className="flex items-center justify-between text-[8px] font-semibold text-white/50 px-1">
              <span>11:30</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="w-3 h-1.5 rounded-xs border border-white/50" />
              </div>
            </div>

            {/* Content Header */}
            <div className="pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[7px] uppercase font-bold text-[#E07853] tracking-wider">
                  Regulación Somática
                </span>
                <span className="text-[7px] text-white/60">4 min</span>
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-white mt-1">
                Respiración 4-7-8
              </h4>
              <p className="text-[7px] text-white/70 mt-0.5 line-clamp-1">
                Inhalá profundamente y soltá...
              </p>
            </div>

            {/* Meditator Artwork Frame */}
            <div className="relative my-1.5 rounded-2xl overflow-hidden flex-1 max-h-[115px] bg-black/40 border border-white/10 p-2 flex flex-col justify-between">
              <img
                src={AppImages.innerPresenceBanner}
                alt="Consciencia somática"
                className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 flex justify-end">
                <span className="px-1.5 py-0.5 rounded-full bg-black/60 text-[7px] text-[#E07853] font-semibold">
                  Paso 2 / 4
                </span>
              </div>
              <div className="relative z-10 text-center">
                <div className="w-6 h-6 rounded-full bg-[#E07853] text-white flex items-center justify-center mx-auto mb-1 shadow-md shadow-[#E07853]/40">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <p className="text-[8px] font-bold text-white">Retener en serenidad</p>
                <p className="text-[7px] text-white/60">03:42 restantes</p>
              </div>
            </div>

            {/* Sliders / controls */}
            <div className="space-y-1">
              <div className="h-1 w-full bg-white/15 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#D96C45] to-[#E07853] rounded-full" />
              </div>
              <div className="flex justify-between text-[7px] text-white/40 px-0.5">
                <span>Calma</span>
                <span>Enfoque</span>
                <span>Paz</span>
              </div>
            </div>

            {/* Home indicator bar */}
            <div className="w-12 h-1 rounded-full bg-white/40 mx-auto mt-1 shrink-0" />
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* DEVICE 1 (Left - Foreground Main Screen: Solitary figure)      */}
        {/* Exactly matching reference image with 9:19.5 Phone Ratio      */}
        {/* (166px x 360px on desktop, 148px x 320px on mobile)            */}
        {/* ============================================================== */}
        <motion.div
          animate={{
            x: activeSlide === 0 ? 0 : activeSlide === 1 ? '-28%' : '-36%',
            y: activeSlide === 0 ? -8 : 0,
            scale: activeSlide === 0 ? 1.05 : 0.93,
            rotate: activeSlide === 0 ? -6 : -10,
            zIndex: activeSlide === 0 ? 35 : 20
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[148px] sm:w-[166px] h-[320px] sm:h-[360px] rounded-[36px] sm:rounded-[40px] p-2 bg-[#140804] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.18)] cursor-pointer"
          onClick={onExploreClick}
        >
          {/* Dynamic Island Cutout */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full z-30 flex items-center justify-end pr-1 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-[#1C1613] border border-white/20" />
          </div>

          {/* Screen with authentic rounded corners */}
          <div className="w-full h-full rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#7A2B15] via-[#C95832] to-[#3B1207] text-white p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden relative shadow-inner pt-4">
            {/* Background image of solitary figure walking towards radiant sun portal */}
            <img
              src={AppImages.inicioPortrait}
              alt="Hacia el sol interior BioPNL"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-90"
            />
            {/* Rich gradient scrim matching reference image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 via-45% to-black/60 pointer-events-none" />

            {/* Status bar */}
            <div className="relative z-10 flex items-center justify-between text-[8px] font-semibold text-white/80 px-1">
              <span>11:30</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-3 h-1.5 rounded-xs border border-white/70" />
              </div>
            </div>

            {/* Header: Lotus icon & greeting */}
            <div className="relative z-10 pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xs">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                  <Compass className="w-3 h-3" />
                </div>
              </div>

              <h3 className="font-heading text-xs sm:text-sm font-bold tracking-tight text-white leading-tight">
                ¡Hola, Lucas!
              </h3>
            </div>

            {/* Recommended Relief Practice Card overlay */}
            <div className="relative z-10 my-auto text-left space-y-1 pt-1">
              <span className="inline-block text-[7px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30">
                Recomendado
              </span>
              <h2 className="font-heading text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                Meditación de Alivio
              </h2>
              <p className="text-[8px] text-white/85 line-clamp-2 leading-tight font-light">
                Liberá tensiones corporales y sintonizá calma profunda con BioPNL.
              </p>

              <div className="pt-0.5">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#1A0B05] text-[8px] font-bold shadow-md hover:scale-103 transition-transform"
                >
                  <Play className="w-2 h-2 fill-current" />
                  <span>Comenzar</span>
                </button>
              </div>
            </div>

            {/* Mini Category Chips & Bottom Dock */}
            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center gap-1 text-[7px] overflow-hidden">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-semibold">Respirar</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 font-medium">Anclajes</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 font-medium">Síntomas</span>
              </div>

              {/* Bottom Dock Bar */}
              <div className="p-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center justify-around text-white/80">
                <div className="p-1 rounded-full bg-white text-[#1A0B05]">
                  <Home className="w-2.5 h-2.5" />
                </div>
                <Search className="w-2.5 h-2.5" />
                <BookOpen className="w-2.5 h-2.5" />
                <Heart className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Home indicator bar */}
            <div className="w-14 h-1 rounded-full bg-white/50 mx-auto mt-1 shrink-0" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};
