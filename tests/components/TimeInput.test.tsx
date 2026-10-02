import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TimeInput } from '../../src/components';

describe('TimeInput', () => {
  it('associates a reusable label and format guidance with the input', () => {
    render(<TimeInput id="worked-time" label="Worked time" value="01:02:03" onChange={() => {}} />);

    const input = screen.getByRole('textbox', { name: 'Worked time' });

    expect(input).toHaveValue('01:02:03');
    expect(input).toHaveAttribute('placeholder', '00:00:00');
    expect(input).toHaveAccessibleDescription('Format: HH:mm:ss');
  });

  it('reports edited text through the controlled change callback', () => {
    const onChange = vi.fn();
    render(<TimeInput id="task-start" label="Last task start" value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Last task start' }), {
      target: { value: '14:30:00' },
    });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('14:30:00');
  });

  it('exposes an accessible error without replacing the format guidance', () => {
    render(
      <TimeInput
        id="worked-time"
        label="Worked time"
        value="invalid"
        onChange={() => {}}
        error="Enter a valid time."
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Worked time' });

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Format: HH:mm:ss Enter a valid time.');
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid time.');
  });

  it('supports a disabled state', () => {
    render(
      <TimeInput
        id="worked-time"
        label="Worked time"
        value="07:00:00"
        onChange={() => {}}
        disabled
      />,
    );

    expect(screen.getByRole('textbox', { name: 'Worked time' })).toBeDisabled();
  });
});
