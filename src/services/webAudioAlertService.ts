import type { AlertKind, AudioAlertService } from '../types';

export class WebAudioAlertService implements AudioAlertService {
  private context: AudioContext | null = null;
  private intervalId: number | null = null;
  private readonly activeOscillators = new Set<OscillatorNode>();

  private getContext() {
    if (this.context?.state === 'closed') {
      this.context = null;
    }

    if (!this.context) {
      if (typeof AudioContext === 'undefined') {
        throw new Error('Este navegador no ofrece Web Audio.');
      }

      this.context = new AudioContext();
    }

    return this.context;
  }

  async prime() {
    const context = this.getContext();

    if (context.state === 'suspended') {
      await context.resume();
    }
  }

  async play(kind: AlertKind) {
    this.stop();
    await this.prime();
    const frequency = kind === 'closing-time' ? 880 : 660;
    this.beep(frequency);
    this.intervalId = window.setInterval(() => this.beep(frequency), 1200);
  }

  stop() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.activeOscillators.forEach((oscillator) => oscillator.stop());
    this.activeOscillators.clear();
  }

  private beep(frequency: number) {
    const context = this.getContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startAt = context.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.25, startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.35);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.addEventListener('ended', () => this.activeOscillators.delete(oscillator), {
      once: true,
    });
    this.activeOscillators.add(oscillator);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.36);
  }
}

export const webAudioAlertService: AudioAlertService = new WebAudioAlertService();
