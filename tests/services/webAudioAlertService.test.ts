import { WebAudioAlertService } from '../../src/services/webAudioAlertService';

class FakeAudioParam {
  readonly setValueAtTime = vi.fn();
  readonly exponentialRampToValueAtTime = vi.fn();
}

class FakeOscillator {
  type = 'sine';
  readonly frequency = new FakeAudioParam();
  readonly connect = vi.fn();
  readonly start = vi.fn();
  readonly stop = vi.fn();
  private endedListener: (() => void) | null = null;

  addEventListener(_event: string, listener: () => void) {
    this.endedListener = listener;
  }

  end() {
    this.endedListener?.();
  }
}

class FakeGain {
  readonly gain = new FakeAudioParam();
  readonly connect = vi.fn();
}

class FakeAudioContext {
  static instances: FakeAudioContext[] = [];
  state: AudioContextState = 'suspended';
  currentTime = 10;
  readonly destination = {} as AudioDestinationNode;
  readonly resume = vi.fn(() => {
    this.state = 'running';
    return Promise.resolve();
  });
  readonly oscillators: FakeOscillator[] = [];

  constructor() {
    FakeAudioContext.instances.push(this);
  }

  createOscillator() {
    const oscillator = new FakeOscillator();
    this.oscillators.push(oscillator);
    return oscillator;
  }

  createGain() {
    return new FakeGain();
  }
}

function getCreatedContext() {
  const context = FakeAudioContext.instances.at(-1);

  if (!context) {
    throw new Error('Expected a fake audio context to be created.');
  }

  return context;
}

function getOscillator(context: FakeAudioContext, index: number) {
  const oscillator = context.oscillators[index];

  if (!oscillator) {
    throw new Error(`Expected oscillator ${index} to exist.`);
  }

  return oscillator;
}

describe('WebAudioAlertService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    FakeAudioContext.instances = [];
    vi.stubGlobal('AudioContext', FakeAudioContext);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('primes audio from a user action and repeats the selected alarm', async () => {
    const service = new WebAudioAlertService();

    await service.prime();
    const context = getCreatedContext();
    expect(context.resume).toHaveBeenCalledOnce();

    await service.play('closing-time');
    expect(context.oscillators).toHaveLength(1);
    vi.advanceTimersByTime(1200);
    expect(context.oscillators).toHaveLength(2);

    getOscillator(context, 0).end();
    service.stop();
    expect(getOscillator(context, 1).stop).toHaveBeenCalled();
  });

  it('supports the final-minute tone and reports missing Web Audio support', async () => {
    const service = new WebAudioAlertService();
    await service.play('one-minute-remaining');
    service.stop();

    vi.stubGlobal('AudioContext', undefined);
    await expect(new WebAudioAlertService().prime()).rejects.toThrow('Web Audio');
  });

  it('creates a new context after a previous one was closed', async () => {
    const service = new WebAudioAlertService();
    await service.prime();
    getCreatedContext().state = 'closed';
    await service.prime();

    expect(FakeAudioContext.instances).toHaveLength(2);
  });
});
