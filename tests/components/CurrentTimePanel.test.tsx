import { fireEvent, render, screen } from '@testing-library/react';
import { CurrentTimePanel } from '../../src/components';

const clock = {
  time: '12:04:05' as const,
  dateLabel: 'sábado, 3 de octubre de 2026',
  zoneLabel: 'hora de verano oriental',
};

describe('CurrentTimePanel', () => {
  it('shows the clock and changes the selected time zone', () => {
    const onTimeZoneChange = vi.fn();

    render(
      <CurrentTimePanel
        clock={clock}
        timeZone="America/New_York"
        options={[
          { value: 'America/New_York', label: 'New York' },
          { value: 'UTC', label: 'UTC' },
        ]}
        onTimeZoneChange={onTimeZoneChange}
      />,
    );

    expect(screen.getByText('12:04:05')).toBeInTheDocument();
    expect(screen.getByText(clock.dateLabel)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Zona horaria' }), {
      target: { value: 'UTC' },
    });
    expect(onTimeZoneChange).toHaveBeenCalledWith('UTC');
  });
});
