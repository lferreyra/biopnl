import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ambientAudio, SOUNDTRACKS, SoundtrackId } from '../services/ambientAudioService';
import { Volume2, VolumeX, Play, Pause, Music, X, Sliders, Sparkles } from 'lucide-react';

interface AmbientSoundBarProps {
  embedded?: boolean;
}

export const AmbientSoundBar: React.FC<AmbientSoundBarProps> = ({ embedded = false }) => {
  const [audioState, setAudioState] = useState(() => ambientAudio.getState());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe(() => {
      setAudioState(ambientAudio.getState());
    });
    return unsubscribe;
  }, []);

  const currentTrackInfo = SOUNDTRACKS.find((t) => t.id === audioState.currentTrack) || SOUNDTRACKS[0];

  const handleToggle = () => {
    ambientAudio.toggle();
  };

  const handleSelectTrack = (trackId: SoundtrackId) => {
    ambientAudio.play(trackId);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    ambientAudio.setVolume(val);
  };

  if (embedded) {
    return (
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E8B8A6]/40 dark:border-white/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentTrackInfo.icon}</span>
            <div>
              <p className="text-xs font-bold text-[#1A1412] dark:text-[#FFF7F2]">
                Audio Ambiente: {audioState.isPlaying ? currentTrackInfo.name : 'Pausado'}
              </p>
              <p className="text-[11px] text-[#3D3532] dark:text-[#E2D7D1]">
                {currentTrackInfo.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              audioState.isPlaying
                ? 'bg-[#8F3722] text-white hover:bg-[#7A2818]'
                : 'bg-white dark:bg-white/10 text-[#1A1412] dark:text-white border border-[#E8B8A6]/60 dark:border-white/15 hover:border-[#8F3722]'
            }`}
            aria-label={audioState.isPlaying ? 'Pausar audio de fondo' : 'Reproducir audio de fondo'}
          >
            {audioState.isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
        </div>

        {/* Track selector chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
          {SOUNDTRACKS.map((t) => {
            const isSelected = audioState.currentTrack === t.id && audioState.isPlaying;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTrack(t.id)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-[#8F3722]/15 dark:bg-[#E07853]/20 border-[#8F3722] dark:border-[#E07853] text-[#8F3722] dark:text-[#E07853] font-bold shadow-2xs'
                    : 'bg-white/60 dark:bg-white/5 border-transparent hover:border-[#E8B8A6]/40 text-[#1A1412] dark:text-white'
                }`}
              >
                <span className="mr-1">{t.icon}</span>
                <span className="truncate">{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-2 pt-1 text-xs text-[#3D3532] dark:text-[#E2D7D1]">
          {audioState.volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={audioState.volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#8F3722] h-1.5 bg-black/10 dark:bg-white/20 rounded-lg cursor-pointer"
            aria-label="Volumen del audio ambiente"
          />
          <span className="font-mono text-[10px] w-7 text-right">
            {Math.round(audioState.volume * 100)}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating persistent audio dock (bottom right) */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.div
          layout
          className="bio-glass-card rounded-full p-1.5 pr-3 shadow-xl border border-white/90 dark:border-white/15 flex items-center gap-2"
        >
          {/* Main Play/Pause circular button */}
          <button
            type="button"
            onClick={handleToggle}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              audioState.isPlaying
                ? 'bg-[#8F3722] text-white hover:bg-[#7A2818]'
                : 'bg-white dark:bg-white/10 text-[#1A1412] dark:text-white border border-[#E8B8A6]/50'
            }`}
            title={audioState.isPlaying ? 'Pausar música ambiente' : 'Reproducir música ambiente'}
          >
            {audioState.isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Track name & status - click to open drawer */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-left cursor-pointer flex items-center gap-1.5 group"
          >
            <span className="text-sm">{currentTrackInfo.icon}</span>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-[#1A1412] dark:text-[#FFF7F2] leading-tight group-hover:text-[#8F3722] transition-colors">
                {audioState.isPlaying ? currentTrackInfo.name : 'Música de fondo'}
              </p>
              <p className="text-[10px] text-[#3D3532] dark:text-[#E2D7D1] leading-tight">
                {audioState.isPlaying ? 'Sonando en calma' : 'Tocar para activar'}
              </p>
            </div>
            {audioState.isPlaying && (
              <span className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-2.5 bg-[#8F3722] dark:bg-[#E07853] rounded-full animate-pulse" />
                <span className="w-0.5 h-3.5 bg-[#8F3722] dark:bg-[#E07853] rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-[#8F3722] dark:bg-[#E07853] rounded-full animate-pulse delay-150" />
              </span>
            )}
          </button>

          {/* Quick drawer opener icon */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="p-1 rounded-full text-[#3D3532] dark:text-[#E2D7D1] hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer ml-1"
            title="Seleccionar sonido de fondo y volumen"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Expanded Soundscapes Selector Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bio-glass-card rounded-[28px] p-5 sm:p-6 border border-white/95 dark:border-white/15 shadow-2xl space-y-4 text-[#1A1412] dark:text-[#FFF7F2]"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#8F3722]/15 dark:bg-[#E07853]/20 text-[#8F3722] dark:text-[#E07853] flex items-center justify-center">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold">Sonidos de Fondo</h3>
                    <p className="text-[11px] text-[#3D3532] dark:text-[#E2D7D1]">Ambiente suave para meditar y respirar</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#3D3532] dark:text-[#E2D7D1] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tracks List */}
              <div className="space-y-2">
                {SOUNDTRACKS.map((track) => {
                  const isActive = audioState.currentTrack === track.id && audioState.isPlaying;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => handleSelectTrack(track.id)}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between border transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#8F3722]/15 dark:bg-[#E07853]/20 border-[#8F3722] dark:border-[#E07853] shadow-xs'
                          : 'bg-white/80 dark:bg-white/5 border-[#E8B8A6]/40 dark:border-white/10 hover:border-[#8F3722]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{track.icon}</span>
                        <div>
                          <p className={`text-xs font-bold ${isActive ? 'text-[#8F3722] dark:text-[#E07853]' : 'text-[#1A1412] dark:text-[#FFF7F2]'}`}>
                            {track.name}
                          </p>
                          <p className="text-[11px] text-[#3D3532] dark:text-[#E2D7D1] leading-tight mt-0.5">
                            {track.description}
                          </p>
                        </div>
                      </div>

                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#8F3722] text-white' : 'bg-black/5 dark:bg-white/10 text-[#1A1412] dark:text-white'
                      }`}>
                        {isActive ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Volume Slider Bar */}
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#E8B8A6]/30 dark:border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-[#3D3532] dark:text-[#E2D7D1]">
                    {audioState.volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>Volumen</span>
                  </span>
                  <span className="font-mono text-xs text-[#8F3722] dark:text-[#E07853]">
                    {Math.round(audioState.volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioState.volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#8F3722] h-2 bg-black/10 dark:bg-white/20 rounded-lg cursor-pointer"
                  aria-label="Ajustar volumen"
                />
              </div>

              {/* Play / Stop Master Button */}
              <button
                type="button"
                onClick={handleToggle}
                className="w-full py-2.5 rounded-xl bg-[#8F3722] hover:bg-[#7A2818] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {audioState.isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pausar sonido</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                    <span>Iniciar música ambiente</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
