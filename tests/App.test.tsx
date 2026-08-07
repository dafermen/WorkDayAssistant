import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('shows the initialized application shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'WorkDay Assistant' })).toBeInTheDocument();
    expect(screen.getByText('07:29:45')).toBeInTheDocument();
    expect(screen.getByText('Initialized')).toBeInTheDocument();
  });
});
