import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MaximumWorkdayInput } from '../../src/components';

describe('MaximumWorkdayInput', () => {
  it('renders the controlled value with the maximum-workday label', () => {
    render(<MaximumWorkdayInput value="07:29:30" onChange={() => {}} />);

    expect(screen.getByRole('textbox', { name: 'Jornada máxima' })).toHaveValue('07:29:30');
  });

  it('forwards edited text to the change callback', () => {
    const onChange = vi.fn();
    render(<MaximumWorkdayInput value="07:29:30" onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Jornada máxima' }), {
      target: { value: '08:00:00' },
    });

    expect(onChange).toHaveBeenCalledWith('08:00:00');
  });

  it('forwards error and disabled states to the shared input', () => {
    render(
      <MaximumWorkdayInput
        value="invalid"
        onChange={() => {}}
        error="Ingresa una jornada válida."
        disabled
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Jornada máxima' });

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Ingresa una jornada válida.');
  });
});
