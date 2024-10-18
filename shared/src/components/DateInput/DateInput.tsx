import { forwardRef, useCallback, useEffect, useState } from 'react';

type Props = {
  className?: string;
  id: string;
  name: string;
  value?: string;
  /** yyyy-MM-dd形式で指定 */
  max?: string;
  /** yyyy-MM-dd形式で指定 */
  min?: string;
  isInvalid?: boolean;
  describedId?: string;
  /** aria-label */
  ariaLabel?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
};

/**
 * !CAUTION!
 * onChangeをそのままinputに渡してしまうと11/31のようなinvalidな値の場合にブランクで伝搬されてしまうので、
 * 内部にStateを管理し値を保持している
 * @see https://dx-dev.jbk-ops.jp/rd/issues/15085
 */
export const DateInput = forwardRef<HTMLInputElement, Props>(function DateInput(
  { className, id, name, max, min, isInvalid, value, describedId, ariaLabel, onChange, onBlur },
  ref,
) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (value === 'invalid') {
      return;
    }
    setInternalValue(value);
  }, [value]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dataString =
        !e.target.value && !e.target.validity.valid
          ? 'invalid' // ブランクかつ不正な値の場合のみinvalidを設定
          : e.target.value;
      onChange?.({ target: { name: e.target.name, value: dataString } });
    },
    [onChange],
  );

  return (
    <input
      className={`
        h-11
        rounded-sm
        px-2 text-lg
        sm:text-2xl
        ${isInvalid ? 'border-attention-dark bg-attention-light' : 'border-gray-semiLight bg-white'}
        border border-solid
        hover:opacity-70
      ${className || ''}`}
      ref={ref}
      type="date"
      id={id}
      min={min}
      max={max}
      name={name}
      value={internalValue}
      aria-describedby={describedId}
      aria-label={ariaLabel}
      onChange={onChangeHandler}
      onBlur={onBlur}
    />
  );
});
