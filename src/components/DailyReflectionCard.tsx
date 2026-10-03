import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DailyReflection, getTodayReflection, DAILY_REFLECTIONS } from '../data/dailyReflections';
import { ambientAudio, SOUNDTRACKS } from '../services/ambientAudioService';
import { Sparkles, RefreshCw, PenLine, Check, Heart, Wind, Copy, Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface DailyReflectionCardProps {
  onStartBreathing?: () => void;
}

export const DailyReflectionCard: React.FC<DailyReflectionCardProps> = ({ onStartBreathing }) => {
  const [reflectionIndex, setReflectionIndex] = useState(() => {
    const today = getTodayReflection();
    const idx = DAILY_REFLECTIONS.findIndex((r) => r.id === today.id);
    return idx >= 0 ? idx : 0;
  });

  const reflection: DailyReflection = DAILY_REFLECTIONS[reflectionIndex] || DAILY_REFLECTIONS[0];

  const [isWritingNote, setIsWritingNote] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ambient sound integration
  const [audioState, setAudioState] = useState(() => ambientAudio.getState());
  useEffect(() => {
    return ambientAudio.subscribe(() => {
      setAudioState(ambientAudio.getState());
    });
  }, []);

  const todayDateKey = new Date().toISOString().split('T')[0];
  const storageKey = `biopnl_reflection_note_${todayDateKey}_${reflection.id}`;

  // Load saved note if exists
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setUserNote(saved);
      setIsWritingNote(true);
    } else {
      setUserNote('');
      setIsWritingNote(false);
    }
    setIsSaved(false);
  }, [reflection.id, storageKey]);

  const handleSaveNote = () => {
    if (userNote.trim()) {
      localStorage.setItem(storageKey, userNote.trim());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  const handleNextReflection = () => {
    setReflectionIndex((prev) => (prev + 1) % DAILY_REFLECTIONS.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${reflection.thought}" — BioPNL`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Formatted date in Spanish
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="relative bio-glass-card rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 border border-white/95 dark:border-white/10 shadow-lg overflow-hidden transition-all duration-300">
      {/* Subtle warm decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8B8A6]/25 dark:from-[#E07853]/15 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8F3722]/10 dark:bg-[#E07853]/15 text-[#8F3722] dark:text-[#E07853] text-xs font-bold border border-[#8F3722]/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reflexión del Día</span>
          </div>
          <span className="text-xs text-[#3D3532] dark:text-[#E2D7D1] font-medium hidden sm:inline">
            · {capitalizedDate}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Ambient Music Button */}
          <button
            type="button"
            onClick={() => ambientAudio.toggle('meditacion')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              audioState.isPlaying
                ? 'bg-[#8F3722] text-white border-[#8F3722] shadow-2xs'
                : 'bg-white/80 dark:bg-white/10 text-[#3D3532] dark:text-[#E2D7D1] border-[#E8B8A6]/40 hover:border-[#8F3722]'
            }`}
            title="Reproducir música suave para reflexionar"
          >
            {audioState.isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-white" />
                <span className="hidden sm:inline">Música activa</span>
                <span className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-white rounded-full animate-pulse delay-75" />
                </span>
              </>
            ) : (
              <>
                <Music className="w-3 h-3 text-[#8F3722] dark:text-[#E07853]" />
                <span>Música suave</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-[#3D3532] dark:text-[#E2D7D1] hover:text-[#8F3722] dark:hover:text-[#E07853] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Copiar reflexión"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleNextReflection}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#8F3722] dark:text-[#E07853] hover:bg-[#8F3722]/10 dark:hover:bg-[#E07853]/15 transition-colors cursor-pointer"
            title="Ver otra reflexión"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Otra</span>
          </button>
        </div>
      </div>

      {/* Main Question / Thought */}
      <div className="relative z-10 space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={reflection.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1A1412] dark:text-[#FFF7F2] leading-snug tracking-tight">
              "{reflection.thought}"
            </h3>

            {/* Bodily focus & practical guidance */}
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#8F3722] dark:text-[#E07853] uppercase tracking-wider block">
                  Cuerpo & Sensación:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#1A1412] dark:text-[#FFF7F2]">
                  {reflection.bodilyFocus}
                </p>
                <p className="text-xs text-[#3D3532] dark:text-[#E2D7D1] leading-relaxed mt-0.5 font-normal">
                  {reflection.suggestedAction}
                </p>
              </div>

              {onStartBreathing && (
                <button
                  type="button"
                  onClick={onStartBreathing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8F3722] hover:bg-[#7A2818] text-white text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-center cursor-pointer"
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Pausa de 3 min</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Personal Note Section */}
      <div className="relative z-10 mt-3 pt-3 border-t border-[#E8B8A6]/30 dark:border-white/10">
        {!isWritingNote ? (
          <button
            type="button"
            onClick={() => setIsWritingNote(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F3722] dark:text-[#E07853] hover:underline cursor-pointer"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>{userNote ? 'Ver o editar mi reflexión personal' : 'Escribir una breve reflexión personal'}</span>
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1A1412] dark:text-[#FFF7F2] flex items-center gap-1">
                <PenLine className="w-3.5 h-3.5 text-[#8F3722] dark:text-[#E07853]" />
                <span>Tu nota privada de hoy:</span>
              </label>
              <button
                type="button"
                onClick={() => setIsWritingNote(false)}
                className="text-[11px] text-[#3D3532] dark:text-[#E2D7D1] hover:underline cursor-pointer"
              >
                Ocultar
              </button>
            </div>

            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="¿Qué sentís o pensás al leer esto? Escribilo acá para vos..."
              rows={2}
              className="w-full p-2.5 text-xs sm:text-sm rounded-xl bg-white/95 dark:bg-white/5 border border-[#E8B8A6]/60 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-[#8F3722] text-[#1A1412] dark:text-white placeholder:text-neutral-400 resize-none"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#3D3532] dark:text-[#E2D7D1]">
                {isSaved ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
                    <Check className="w-3 h-3" /> Guardada en tu dispositivo
                  </span>
                ) : (
                  'Queda guardada en privado'
                )}
              </span>

              <button
                type="button"
                onClick={handleSaveNote}
                disabled={!userNote.trim()}
                className="px-3 py-1 rounded-lg bg-[#1A1412] dark:bg-[#FFF7F2] text-white dark:text-[#1A1412] text-xs font-bold hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer"
              >
                Guardar nota
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
