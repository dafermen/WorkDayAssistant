import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LastTaskTimeInput } from '../../src/components';

describe('LastTaskTimeInput', () => {
  it('renders the controlled value with the final-task start label', () => {
    render(<LastTaskTimeInput value="15:20:00" onChange={() => {}} />);

    expect(screen.getByRole('textbox', { name: 'Last task start time' })).toHaveValue('15:20:00');
  });

  it('forwards edited text to the change callback', () => {
    const onChange = vi.fn();
    render(<LastTaskTimeInput value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Last task start time' }), {
      target: { value: '16:45:30' },
    });

    expect(onChange).toHaveBeenCalledWith('16:45:30');
  });

  it('forwards error and disabled states to the shared input', () => {
    render(
      <LastTaskTimeInput
        value="invalid"
        onChange={() => {}}
        error="Enter the task start as HH:mm:ss."
        disabled
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Last task start time' });

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Enter the task start as HH:mm:ss.');
  });
});
