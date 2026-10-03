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
    fireEvent.change(screen.getByRole('textbox', { name: 'Jornada máxima' }), {
      target: { value: maximumWorkday },
    });
  }

  fireEvent.change(screen.getByRole('textbox', { name: 'Tiempo trabajado' }), {
    target: { value: workedTime },
  });
  fireEvent.change(screen.getByRole('textbox', { name: 'Inicio de la última tarea' }), {
    target: { value: lastTaskStartTime },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Calcular e iniciar' }));
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with the editable maximum workday default', () => {
    render(<App />);

    expect(screen.getByRole('textbox', { name: 'Jornada máxima' })).toHaveValue('07:29:30');
  });

  it('calculates the remaining duration and recommended closing time', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '14:00:00');

    expect(screen.getByRole('heading', { name: 'Tiempo restante' })).toBeInTheDocument();
    expect(screen.getByText('00:59:30')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cierre recomendado' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('heading', { name: 'Cierre recomendado' }).parentElement!).getByText(
        '14:59:30',
      ),
    ).toBeInTheDocument();
  });

  it('uses an edited maximum workday for the calculation', () => {
    render(<App />);

    enterCalculatorValues('07:30:00', '14:00:00', '08:00:00');

    expect(screen.getByText('00:30:00')).toBeInTheDocument();
    expect(
      within(screen.getByRole('heading', { name: 'Cierre recomendado' }).parentElement!).getByText(
        '14:30:00',
      ),
    ).toBeInTheDocument();
  });

  it('shows validation errors when required values are missing', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Calcular e iniciar' }));

    expect(screen.getByText('Ingresa el tiempo trabajado.')).toBeInTheDocument();
    expect(screen.getByText('Ingresa la hora de inicio de la última tarea.')).toBeInTheDocument();
  });

  it('shows format errors and clears them when the corresponding value changes', () => {
    render(<App />);

    enterCalculatorValues('6:30', '25:00:00');

    expect(screen.getAllByRole('alert')).toHaveLength(2);

    fireEvent.change(screen.getByRole('textbox', { name: 'Tiempo trabajado' }), {
      target: { value: '06:30:00' },
    });

    expect(screen.getAllByRole('alert')).toHaveLength(1);
  });

  it('validates and clears an invalid maximum workday', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '14:00:00', '7:29');

    expect(screen.getByRole('alert')).toHaveTextContent('Usa HH:mm:ss para la jornada máxima');

    fireEvent.change(screen.getByRole('textbox', { name: 'Jornada máxima' }), {
      target: { value: '07:29:30' },
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('warns when worked time exceeds the maximum workday', () => {
    render(<App />);

    enterCalculatorValues('07:30:00', '14:00:00');

    expect(screen.getByRole('alert')).toHaveTextContent('Has excedido 07:29:30 por 00:00:30.');
    expect(screen.queryByRole('heading', { name: 'Cierre recomendado' })).not.toBeInTheDocument();
  });

  it('identifies a recommended closing time on the next day', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '23:30:00');

    expect(
      within(screen.getByRole('heading', { name: 'Cierre recomendado' }).parentElement!).getByText(
        '00:29:30',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Día siguiente')).toBeInTheDocument();
  });

  it('clears a previous result when an input is edited', () => {
    render(<App />);

    enterCalculatorValues('06:30:00', '14:00:00');
    fireEvent.change(screen.getByRole('textbox', { name: 'Tiempo trabajado' }), {
      target: { value: '06:45:00' },
    });

    expect(screen.queryByRole('heading', { name: 'Tiempo restante' })).not.toBeInTheDocument();
  });

  it('shows New York time by default and lets the user change zones', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T16:00:00.000Z'));
    render(<App />);

    expect(screen.getByText('12:00:00')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Zona horaria' })).toHaveValue('America/New_York');

    fireEvent.change(screen.getByRole('combobox', { name: 'Zona horaria' }), {
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
    expect(screen.getByRole('heading', { name: 'Alarma activada' })).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox', { name: 'Zona horaria' }), {
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
    fireEvent.click(screen.getByRole('button', { name: 'Detener alarma' }));
    expect(audioServiceMock.stop).toHaveBeenCalled();
  });

  it('does not start when the calculated closing time already passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T18:00:00.000Z'));
    render(<App />);
    enterCalculatorValues('06:30:00', '12:00:00');

    expect(screen.getByRole('alert')).toHaveTextContent('La hora recomendada ya pasó');
    expect(screen.queryByRole('timer')).not.toBeInTheDocument();
  });

  it('uses the visible current time for the final task', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-03T16:04:05.000Z'));
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Usar hora actual' }));

    expect(screen.getByRole('textbox', { name: 'Inicio de la última tarea' })).toHaveValue(
      '12:04:05',
    );
    expect(screen.getByRole('status')).toHaveTextContent('Se colocó la hora actual');
  });

  it('automatically inserts separators while typing digits', () => {
    render(<App />);
    const workedTime = screen.getByRole('textbox', { name: 'Tiempo trabajado' });

    fireEvent.change(workedTime, { target: { value: '063000' } });

    expect(workedTime).toHaveValue('06:30:00');
  });

  it('completes four digits with zero seconds before calculation', () => {
    render(<App />);
    const workedTime = screen.getByRole('textbox', { name: 'Tiempo trabajado' });
    const taskStart = screen.getByRole('textbox', { name: 'Inicio de la última tarea' });

    fireEvent.change(workedTime, { target: { value: '0630' } });
    fireEvent.blur(workedTime);
    fireEvent.change(taskStart, { target: { value: '1400' } });
    fireEvent.blur(taskStart);
    fireEvent.click(screen.getByRole('button', { name: 'Calcular e iniciar' }));

    expect(screen.getByRole('heading', { name: 'Tiempo restante' })).toBeInTheDocument();
  });

  it('tests the alarm and resets the form from quick actions', async () => {
    vi.useFakeTimers();
    render(<App />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Probar alarma' }));
      await Promise.resolve();
    });
    expect(audioServiceMock.play).toHaveBeenCalledWith('closing-time');
    expect(screen.getByRole('status')).toHaveTextContent('Prueba de alarma en curso');

    fireEvent.change(screen.getByRole('textbox', { name: 'Tiempo trabajado' }), {
      target: { value: '063000' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Nueva jornada' }));
    expect(screen.getByRole('textbox', { name: 'Tiempo trabajado' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Jornada máxima' })).toHaveValue('07:29:30');
  });
});
