import { render, screen } from '@testing-library/react';
import { AlarmStatusCard } from '../../src/components';

describe('AlarmStatusCard', () => {
  it('explains the inactive state', () => {
    render(<AlarmStatusCard status="inactive" />);
    expect(screen.getByRole('heading', { name: 'Alarma sin programar' })).toBeInTheDocument();
  });

  it('confirms the programmed closing time and zone', () => {
    render(
      <AlarmStatusCard
        status="active"
        closingTime="14:59:30"
        timeZoneLabel="hora de verano oriental"
      />,
    );
    expect(
      screen.getByRole('heading', { name: 'Alarma activada' }).parentElement,
    ).toHaveTextContent('14:59:30 · hora de verano oriental');
  });

  it('announces the ringing state', () => {
    render(<AlarmStatusCard status="ringing" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Llegó la hora de cerrar tu turno.');
  });
});
