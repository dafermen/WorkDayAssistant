import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { WorkedTimeInput } from '../../src/components';

describe('WorkedTimeInput', () => {
  it('renders the controlled value with the worked-time label', () => {
    render(<WorkedTimeInput value="06:45:00" onChange={() => {}} />);

    expect(screen.getByRole('textbox', { name: 'Tiempo trabajado' })).toHaveValue('06:45:00');
  });

  it('forwards edited text to the change callback', () => {
    const onChange = vi.fn();
    render(<WorkedTimeInput value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Tiempo trabajado' }), {
      target: { value: '07:15:30' },
    });

    expect(onChange).toHaveBeenCalledWith('07:15:30');
  });

  it('forwards error and disabled states to the shared input', () => {
    render(
      <WorkedTimeInput
        value="invalid"
        onChange={() => {}}
        error="Enter worked time as HH:mm:ss."
        disabled
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Tiempo trabajado' });

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Enter worked time as HH:mm:ss.');
  });
});
