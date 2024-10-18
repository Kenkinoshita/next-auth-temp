import { forwardRef } from 'react';

type Props = {
  id: string;
  className?: string;
  disabled?: boolean;
  form?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  isInvalid?: boolean;

  value?: string | readonly string[] | number;
  resize?: boolean;

  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: React.ChangeEventHandler<HTMLTextAreaElement>;
};
export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { id, className, disabled, form, name, placeholder, readOnly, isInvalid, value, resize, onChange, onBlur, onFocus },
  ref,
) {
  return (
    <textarea
      id={id}
      className={`
        box-border
        min-h-12
        w-full
        rounded
        border
        border-solid
        border-gray-semiLight
        px-4
        py-3
        text-base
        ${isInvalid ? 'border-attention-dark bg-attention-light' : 'border-gray-semiLight bg-white'}
        ${resize ? 'resize' : 'resize-none'}
      ${className || ''}`}
      disabled={disabled}
      form={form}
      name={name}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      ref={ref}
    />
  );
});
