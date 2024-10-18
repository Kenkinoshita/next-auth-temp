import { forwardRef } from 'react';

type InputMode = React.ComponentPropsWithoutRef<'input'>['inputMode'];

type Props = {
  className?: string;
  type: 'email' | 'tel' | 'text' | 'url';
  inputMode?: InputMode;
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  describedId?: string;
  /** aria-label */
  ariaLabel?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.ChangeEventHandler<HTMLInputElement>;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  {
    className,
    id,
    name,
    type,
    inputMode,
    placeholder,
    isInvalid,
    disabled,
    value,
    describedId,
    ariaLabel,
    onChange,
    onBlur,
    onFocus,
  },
  ref,
) {
  return (
    <input
      className={`
        h-11
        rounded-sm
        px-2 text-lg
        text-gray-dark
        disabled:bg-gray-light
        sm:text-2xl
        ${isInvalid ? 'border-attention-dark bg-attention-light' : 'border-gray-semiLight bg-white'}
        w-full border
        border-solid
      ${className || ''}`}
      ref={ref}
      type={type}
      inputMode={inputMode}
      id={id}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      aria-describedby={describedId}
      aria-label={ariaLabel}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
});
