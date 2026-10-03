import { act, fireEvent, render, screen, within } from '@testing-library/react';

const audioServiceMock = vi.hoisted(() => ({
  prime: vi.fn(() => Promise.resolve()),
  play: vi.fn(() => Promise.resolve()),
  stop: vi.fn(),
}));

vi.mock('../src/services', () => ({ webAudioAlertService: audioServiceMock }));

import App from '../src/App';

function enterCalculatorValues(
  workedTime: string,
  lastTaskStartTime: string,
  maximumWorkday?: string,
) {
  if (maximumWorkday) {
    fireEvent.change(screen.getByRole('textbox', { name: 'Maximum workday' }), {
      target: { value: maximumWorkday },
    });
  }

  fireEvent.change(screen.getByRole('textbox', { name: 'Time worked' }), {
    target: { value: workedTime },
  });
  fireEvent.change(screen.getByRole('textbox', { name: 'Last task start' }), {
    target: { value: lastTaskStartTime },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Calculate and start' }));
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in English and switches the complete interface to Spanish', () => {
    render(<App />);

    expect(screen.getByRole('combobox', { name: 'Language' })).toHaveValue('en');
    expect(screen.getByRole('textbox', { name: 'Maximum workday' })).toHaveValue('07:29:30');
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    fireEvent.change(screen.getByRole('textbox', { name: 'Time worked' }), {
      target: { value: '063000' },
    });

    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'es' },
    });

    expect(screen.getByRole('combobox', { name: 'Idioma' })).toHaveValue('es');
    expect(screen.getByRole('textbox', { name: 'Jornada máxima' })).toHaveValue('07:29:30');
    expect(screen.getByRole('textbox', { name: 'Tiempo trabajado' })).toHaveValue('06:30:00');
    expect(screen.getByRole('heading', { name: 'Hora actual' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alarma sin programar' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Acciones rápidas' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'es');
  });

  it('calculates the remaining duration and recommended closing time', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '14:00:00');

    expect(screen.getByRole('heading', { name: 'Time remaining' })).toBeInTheDocument();
    expect(screen.getByText('00:59:30')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recommended closing time' })).toBeInTheDocument();
    expect(
      within(
        screen.getByRole('heading', { name: 'Recommended closing time' }).parentElement!,
      ).getByText('14:59:30'),
    ).toBeInTheDocument();
  });

  it('uses an edited maximum workday for the calculation', () => {
    render(<App />);

    enterCalculatorValues('07:30:00', '14:00:00', '08:00:00');

    expect(screen.getByText('00:30:00')).toBeInTheDocument();
    expect(
      within(
        screen.getByRole('heading', { name: 'Recommended closing time' }).parentElement!,
      ).getByText('14:30:00'),
    ).toBeInTheDocument();
  });

  it('shows validation errors when required values are missing', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Calculate and start' }));

    expect(screen.getByText('Enter the time worked.')).toBeInTheDocument();
    expect(screen.getByText('Enter the last task start time.')).toBeInTheDocument();
  });

  it('shows format errors and clears them when the corresponding value changes', () => {
    render(<App />);

    enterCalculatorValues('6:30', '25:00:00');

    expect(screen.getAllByRole('alert')).toHaveLength(2);

    fireEvent.change(screen.getByRole('textbox', { name: 'Time worked' }), {
      target: { value: '06:30:00' },
    });

    expect(screen.getAllByRole('alert')).toHaveLength(1);
  });

  it('validates and clears an invalid maximum workday', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '14:00:00', '7:29');

    expect(screen.getByRole('alert')).toHaveTextContent('Use HH:mm:ss for the maximum workday');

    fireEvent.change(screen.getByRole('textbox', { name: 'Maximum workday' }), {
      target: { value: '07:29:30' },
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('warns when worked time exceeds the maximum workday', () => {
    render(<App />);

    enterCalculatorValues('07:30:00', '14:00:00');

    expect(screen.getByRole('alert')).toHaveTextContent('You exceeded 07:29:30 by 00:00:30.');
    expect(
      screen.queryByRole('heading', { name: 'Recommended closing time' }),
    ).not.toBeInTheDocument();
  });

  it('identifies a recommended closing time on the next day', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '23:30:00');

    expect(
      within(
        screen.getByRole('heading', { name: 'Recommended closing time' }).parentElement!,
      ).getByText('00:29:30'),
    ).toBeInTheDocument();
    expect(screen.getByText('Next day')).toBeInTheDocument();
  });

  it('clears a previous result when an input is edited', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '14:00:00');
    fireEvent.change(screen.getByRole('textbox', { name: 'Time worked' }), {
      target: { value: '06:45:00' },
    });

    expect(screen.queryByRole('heading', { name: 'Time remaining' })).not.toBeInTheDocument();
  });

  it('shows New York time by default and lets the user change zones', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T16:00:00.000Z'));
    render(<App />);

    expect(screen.getByText('12:00:00')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Time zone' })).toHaveValue('America/New_York');

    fireEvent.change(screen.getByRole('combobox', { name: 'Time zone' }), {
      target: { value: 'America/Los_Angeles' },
    });

    expect(screen.getByText('09:00:00')).toBeInTheDocument();
  });

  it('starts an absolute countdown and cancels it when the zone changes', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T18:00:00.000Z'));
    render(<App />);
    enterCalculatorValues('06:30:00', '14:00:00');

    expect(audioServiceMock.prime).toHaveBeenCalledOnce();
    expect(screen.getByRole('timer')).toHaveTextContent('00:59:30');
    expect(screen.getByRole('heading', { name: 'Alarm active' })).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox', { name: 'Time zone' }), {
      target: { value: 'UTC' },
    });

    expect(screen.queryByRole('timer')).not.toBeInTheDocument();
    expect(audioServiceMock.stop).toHaveBeenCalled();
  });

  it('reaches zero, triggers the alarm once, and lets the user stop it', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T16:00:00.000Z'));
    render(<App />);
    enterCalculatorValues('07:29:28', '12:00:00');

    act(() => {
      vi.setSystemTime(new Date('2026-10-03T16:00:02.000Z'));
      vi.advanceTimersByTime(250);
    });

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
    expect(audioServiceMock.play).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Stop alarm' }));
    expect(audioServiceMock.stop).toHaveBeenCalled();
  });

  it('does not start when the calculated closing time already passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T18:00:00.000Z'));
    render(<App />);
    enterCalculatorValues('06:30:00', '12:00:00');

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The recommended closing time has already passed',
    );
    expect(screen.queryByRole('timer')).not.toBeInTheDocument();
  });

  it('uses the visible current time for the final task', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T16:04:05.000Z'));
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Use current time' }));

    expect(screen.getByRole('textbox', { name: 'Last task start' })).toHaveValue('12:04:05');
    expect(screen.getByRole('status')).toHaveTextContent('Current time entered');
  });

  it('automatically inserts separators while typing digits', () => {
    render(<App />);
    const workedTime = screen.getByRole('textbox', { name: 'Time worked' });

    fireEvent.change(workedTime, { target: { value: '063000' } });

    expect(workedTime).toHaveValue('06:30:00');
  });

  it('completes four digits with zero seconds before calculation', () => {
    render(<App />);
    const workedTime = screen.getByRole('textbox', { name: 'Time worked' });
    const taskStart = screen.getByRole('textbox', { name: 'Last task start' });

    fireEvent.change(workedTime, { target: { value: '0630' } });
    fireEvent.blur(workedTime);
    fireEvent.change(taskStart, { target: { value: '1400' } });
    fireEvent.blur(taskStart);
    fireEvent.click(screen.getByRole('button', { name: 'Calculate and start' }));

    expect(screen.getByRole('heading', { name: 'Time remaining' })).toBeInTheDocument();
  });

  it('tests the alarm and resets the form from quick actions', async () => {
    vi.useFakeTimers();
    render(<App />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Test alarm' }));
      await Promise.resolve();
    });
    expect(audioServiceMock.play).toHaveBeenCalledWith('closing-time');
    expect(screen.getByRole('status')).toHaveTextContent('Alarm test in progress');

    fireEvent.change(screen.getByRole('textbox', { name: 'Time worked' }), {
      target: { value: '063000' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'New workday' }));
    expect(screen.getByRole('textbox', { name: 'Time worked' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Maximum workday' })).toHaveValue('07:29:30');
  });
});
