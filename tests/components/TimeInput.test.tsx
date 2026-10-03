import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TimeInput } from '../../src/components';

const inputHint = 'Escribe 4 o 6 dígitos; agregamos los dos puntos. Ejemplo: 1430 → 14:30:00.';

describe('TimeInput', () => {
  it('associates a reusable label and format guidance with the input', () => {
    render(<TimeInput id="worked-time" label="Worked time" value="01:02:03" onChange={() => {}} />);
    const input = screen.getByRole('textbox', { name: 'Worked time' });
    expect(input).toHaveValue('01:02:03');
    expect(input).toHaveAttribute('placeholder', 'HHMMSS');
    expect(input).toHaveAccessibleDescription(inputHint);
  });

  it('formats digits before reporting edited text', () => {
    const onChange = vi.fn();
    render(<TimeInput id="task-start" label="Last task start" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Last task start' }), {
      target: { value: '143000' },
    });
    expect(onChange).toHaveBeenCalledWith('14:30:00');
  });

  it('supplies zero seconds after four digits lose focus', () => {
    const onChange = vi.fn();
    render(<TimeInput id="task-start" label="Last task start" value="14:30" onChange={onChange} />);
    fireEvent.blur(screen.getByRole('textbox', { name: 'Last task start' }));
    expect(onChange).toHaveBeenCalledWith('14:30:00');
  });

  it('exposes an accessible error without replacing guidance', () => {
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
    expect(input).toHaveAccessibleDescription(`${inputHint} Enter a valid time.`);
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

  it('shows an optional explanation and action', () => {
    const onAction = vi.fn();
    render(
      <TimeInput
        id="task-start"
        label="Last task start"
        value=""
        onChange={() => {}}
        description="The exact clock time."
        actionLabel="Use now"
        onAction={onAction}
      />,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      `The exact clock time. ${inputHint}`,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Use now' }));
    expect(onAction).toHaveBeenCalledOnce();
  });
});
