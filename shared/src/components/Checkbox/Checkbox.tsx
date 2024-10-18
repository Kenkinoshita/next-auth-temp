import { type ChangeEventHandler, forwardRef } from 'react';

type Props = {
  className?: string;
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  text: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { className, id, name, value, text, checked, disabled, onChange, onBlur },
  ref,
) {
  return (
    <div className={className}>
      <label
        className={`flex items-center text-base text-gray-dark hover:opacity-70 sm:text-lg ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <input
          ref={ref}
          className="peer sr-only"
          type="checkbox"
          id={id}
          value={value}
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        <CheckboxIcon className="mr-2 shrink-0" checked={checked} />
        <div className="mr-6 flex-1 font-bold peer-disabled:text-gray-semiDark">{text}</div>
      </label>
    </div>
  );
});

function CheckboxIcon({ className, checked }: { className?: string; checked?: boolean }) {
  return (
    <div
      className={`
        relative size-[22px] ${className || ''}
        ${checked ? 'before:border-corporate-dark before:bg-corporate-dark' : 'before:border-gray-semiDark'}
        before:absolute before:inset-y-0 before:left-0 before:m-auto before:size-[22px] before:rounded-sm before:border before:content-['']
        after:absolute after:left-2 after:top-1/2 after:z-appBar after:-mt-1.5 after:block after:h-2.5 after:w-[5px] after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:content-['']
      `}
    />
  );
}
