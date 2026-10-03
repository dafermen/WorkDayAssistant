import { render, screen } from '@testing-library/react';
import { AlarmStatusCard } from '../../src/components';

describe('AlarmStatusCard', () => {
  it('explains the inactive state', () => {
    render(<AlarmStatusCard status="inactive" />);
    expect(screen.getByRole('heading', { name: 'Alarm not scheduled' })).toBeInTheDocument();
  });

  it('confirms the programmed closing time and zone', () => {
    render(
      <AlarmStatusCard
        status="active"
        closingTime="14:59:30"
        timeZoneLabel="Eastern Daylight Time"
      />,
    );
    expect(screen.getByRole('heading', { name: 'Alarm active' }).parentElement).toHaveTextContent(
      '14:59:30 · Eastern Daylight Time',
    );
  });

  it('announces the ringing state', () => {
    render(<AlarmStatusCard status="ringing" />);
    expect(screen.getByRole('alert')).toHaveTextContent('It is time to close your workday.');
  });
});
