import { render, screen } from '@testing-library/react';
import { Countdown } from '../../src/components';

describe('Countdown', () => {
  it('renders a normal timer without a live alarm announcement', () => {
    render(<Countdown time="01:15:00" state="running" />);

    expect(screen.getByRole('timer')).toHaveTextContent('01:15:00');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the final-minute warning', () => {
    render(<Countdown time="00:00:45" state="final-minute" />);

    expect(
      screen.getByText('Less than one minute remains before closing your workday.'),
    ).toBeInTheDocument();
  });

  it('announces the closing state', () => {
    render(<Countdown time="00:00:00" state="complete" />);

    expect(screen.getByRole('alert')).toHaveTextContent('It is time to close your workday.');
  });
});
