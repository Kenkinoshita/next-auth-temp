import { forwardRef } from 'react';

type Props = {
  className?: string;
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
};

export const RadioButton = forwardRef<HTMLInputElement, Props>(function RadioButton(
  { className, id, name, children, checked, defaultChecked, value, disabled, onChange, onBlur },
  ref,
) {
  return (
    <div className={`${className || ''}`}>
      <label
        className={`flex items-center pl-6 text-sm text-gray-dark hover:opacity-70 sm:text-lg ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <input
          ref={ref}
          className="peer sr-only"
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        <div
          className={`
              relative mr-3
              before:absolute before:size-5 before:-translate-x-full before:-translate-y-1/2 before:rounded-1/2 before:border-2 before:border-solid before:border-corporate-dark after:invisible
              after:absolute after:-left-1 after:size-3 after:-translate-x-full after:-translate-y-1/2 after:rounded-1/2 after:bg-corporate-dark after:peer-checked:visible before:peer-disabled:border-gray-semiDark after:peer-disabled:bg-gray-semiDark
            `}
        />
        <div className="w-full peer-checked:font-bold peer-checked:text-corporate-dark peer-disabled:text-gray-semiDark">
          {children}
        </div>
      </label>
    </div>
  );
});
