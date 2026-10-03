// Ambient Audio Generator using Web Audio API
// 100% offline, zero external dependencies, seamless infinite loops without audio clicks.

export type SoundtrackId = 'meditacion' | 'olas' | 'lluvia' | 'viento';

export interface SoundTrackInfo {
  id: SoundtrackId;
  name: string;
  icon: string;
  description: string;
  category: string;
}

export const SOUNDTRACKS: SoundTrackInfo[] = [
  {
    id: 'meditacion',
    name: 'Meditación 432Hz',
    icon: '🧘',
    description: 'Armónicos cálidos y ondas Theta para calmar la mente',
    category: 'Música Ambiente'
  },
  {
    id: 'olas',
    name: 'Olas del Mar',
    icon: '🌊',
    description: 'Vaivén oceánico sereno que acompaña tu respiración',
    category: 'Naturaleza'
  },
  {
    id: 'lluvia',
    name: 'Lluvia Serena',
    icon: '🌧️',
    description: 'Gotas suaves cayendo sobre las hojas del bosque',
    category: 'Naturaleza'
  },
  {
    id: 'viento',
    name: 'Brisa en el Bosque',
    icon: '🍃',
    description: 'Viento templado entre los árboles para aflojar tensiones',
    category: 'Naturaleza'
  }
];

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentTrack: SoundtrackId | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.5;
  private activeNodes: { stop: () => void }[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Restore volume preference
    const savedVol = localStorage.getItem('biopnl_ambient_volume');
    if (savedVol !== null) {
      this.volume = Math.max(0, Math.min(1, parseFloat(savedVol)));
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      volume: this.volume
    };
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    localStorage.setItem('biopnl_ambient_volume', this.volume.toString());
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public async play(trackId: SoundtrackId = 'meditacion') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying && this.currentTrack === trackId) {
      return;
    }

    // Stop current track with gentle fade-out
    this.stopCurrentNodes();

    this.currentTrack = trackId;
    this.isPlaying = true;
    this.notify();

    // Create a local track gain for smooth fade-in
    const trackGain = this.ctx.createGain();
    trackGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    trackGain.gain.exponentialRampToValueAtTime(1.0, this.ctx.currentTime + 1.5);
    trackGain.connect(this.masterGain);

    switch (trackId) {
      case 'meditacion':
        this.playMeditationDrone(trackGain);
        break;
      case 'olas':
        this.playOceanWaves(trackGain);
        break;
      case 'lluvia':
        this.playGentleRain(trackGain);
        break;
      case 'viento':
        this.playForestWind(trackGain);
        break;
    }
  }

  public pause() {
    if (!this.isPlaying) return;
    this.stopCurrentNodes();
    this.isPlaying = false;
    this.notify();
  }

  public toggle(trackId?: SoundtrackId) {
    if (this.isPlaying) {
      if (trackId && trackId !== this.currentTrack) {
        this.play(trackId);
      } else {
        this.pause();
      }
    } else {
      this.play(trackId || this.currentTrack || 'meditacion');
    }
  }

  private stopCurrentNodes() {
    if (this.activeNodes.length > 0) {
      this.activeNodes.forEach((node) => {
        try {
          node.stop();
        } catch {}
      });
      this.activeNodes = [];
    }
  }

  // ==========================================
  // 1. MEDITACIÓN 432Hz (Harmonic Bowls & Theta Drone)
  // ==========================================
  private playMeditationDrone(output: GainNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Harmonic frequencies based on 432Hz & 108Hz Pythagorean tuning
    const freqs = [108, 216, 432, 648];
    const gains = [0.35, 0.25, 0.15, 0.08];

    const nodes: { stop: () => void }[] = [];

    freqs.forEach((freq, idx) => {
      // Main oscillator
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle detune creating a 4Hz Theta binaural pulse for deep relaxation
      const detuneOsc = ctx.createOscillator();
      detuneOsc.type = 'sine';
      detuneOsc.frequency.setValueAtTime(0.08, ctx.currentTime); // slow pulse

      const detuneGain = ctx.createGain();
      detuneGain.gain.setValueAtTime(4.0, ctx.currentTime);
      detuneOsc.connect(detuneGain);
      detuneGain.connect(osc.detune);

      // Filter to soften harmonics
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 1.8, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(gains[idx], ctx.currentTime);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(output);

      osc.start();
      detuneOsc.start();

      nodes.push({
        stop: () => {
          try {
            osc.stop();
            detuneOsc.stop();
          } catch {}
        }
      });
    });

    this.activeNodes = nodes;
  }

  // ==========================================
  // 2. OLAS DEL MAR (Rhythmic Ocean Swell)
  // ==========================================
  private playOceanWaves(output: GainNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Pink noise buffer
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const outputData = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      outputData[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Resonant lowpass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    // LFO to simulate 8-second wave rhythm (inhale 4s / exhale 4s)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.125, ctx.currentTime); // 8 seconds per wave cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(380, ctx.currentTime); // filter sweep depth
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Wave amplitude envelope
    const waveGain = ctx.createGain();
    const lfoAmp = ctx.createGain();
    lfoAmp.gain.setValueAtTime(0.35, ctx.currentTime);
    waveGain.gain.setValueAtTime(0.45, ctx.currentTime);
    lfo.connect(lfoAmp);
    lfoAmp.connect(waveGain.gain);

    noiseSource.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(output);

    noiseSource.start();
    lfo.start();

    this.activeNodes = [
      {
        stop: () => {
          try {
            noiseSource.stop();
            lfo.stop();
          } catch {}
        }
      }
    ];
  }

  // ==========================================
  // 3. LLUVIA SERENA (Gentle Rain)
  // ==========================================
  private playGentleRain(output: GainNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Bandpass filter to isolate raindrop timbre
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1400, ctx.currentTime);
    bandpass.Q.setValueAtTime(0.8, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.4, ctx.currentTime);

    source.connect(bandpass);
    bandpass.connect(rainGain);
    rainGain.connect(output);

    source.start();

    this.activeNodes = [
      {
        stop: () => {
          try {
            source.stop();
          } catch {}
        }
      }
    ];
  }

  // ==========================================
  // 4. BRISA EN EL BOSQUE (Forest Wind)
  // ==========================================
  private playForestWind(output: GainNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 1.8;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, ctx.currentTime);
    filter.Q.setValueAtTime(2.0, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(160, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.5, ctx.currentTime);

    source.connect(filter);
    filter.connect(windGain);
    windGain.connect(output);

    source.start();
    lfo.start();

    this.activeNodes = [
      {
        stop: () => {
          try {
            source.stop();
            lfo.stop();
          } catch {}
        }
      }
    ];
  }
}

export const ambientAudio = new AmbientAudioEngine();
